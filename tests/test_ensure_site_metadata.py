"""Regression tests for site-wide, idempotent FAQPage JSON-LD normalization."""
import json
import unittest
from pathlib import Path

from scripts import ensure_site_metadata as meta


class FaqSchemaNormalizationTests(unittest.TestCase):
    @staticmethod
    def script(data):
        return ('<script type="application/ld+json">'
                + json.dumps(data, ensure_ascii=False, separators=(",", ":"))
                + '</script>')

    @staticmethod
    def page(scripts, questions=None, english=False):
        base = 'https://gaeo.ru/en/services/example/' if english else 'https://gaeo.ru/services/example/'
        language = 'en' if english else 'ru'
        questions = questions if questions is not None else [('Как работает GEO?', 'Это продвижение бренда.')]
        visible = ''.join(
            f'<details class="faq-item"><summary>{question}<span>+</span></summary>'
            f'<div class="faq-a">{answer}</div></details>'
            for question, answer in questions
        )
        return (f'<html lang="{language}"><head><link rel="canonical" href="{base}"></head>'
                '<body>' + ''.join(scripts) + visible + '</body></html>')

    @staticmethod
    def faq(english=False, answer='Это продвижение бренда.'):
        base = 'https://gaeo.ru/en/services/example/' if english else 'https://gaeo.ru/services/example/'
        return {
            '@type': 'FAQPage', '@id': base + '#faq',
            'inLanguage': 'en-US' if english else 'ru-RU',
            'mainEntity': [{
                '@type': 'Question', 'name': 'Как работает GEO?',
                'acceptedAnswer': {'@type': 'Answer', 'text': answer},
            }],
        }

    @staticmethod
    def graph(*nodes):
        return {'@context': 'https://schema.org', '@graph': list(nodes)}

    @staticmethod
    def objects(html):
        nodes = []
        for script in meta.JSONLD_RE.finditer(html):
            data = json.loads(script.group(2))
            if isinstance(data, dict) and isinstance(data.get('@graph'), list):
                nodes.extend(data['@graph'])
            elif isinstance(data, list):
                nodes.extend(data)
            else:
                nodes.append(data)
        return nodes

    def faqs(self, html):
        return [node for node in self.objects(html) if meta.has_type(node, 'FAQPage')]

    def test_existing_faq_in_later_script_is_left_untouched(self):
        page = self.page([
            self.script(self.graph({'@type': 'WebPage', 'name': 'Главная'})),
            self.script(self.graph({'@type': 'Service', 'name': 'GEO'}, self.faq())),
        ])
        self.assertEqual(meta.sync_faq_schema(page, 'case.html'), page)
        self.assertEqual(len(self.faqs(page)), 1)

    def test_deduplicates_across_several_scripts_without_losing_other_schema(self):
        good = self.faq()
        extra = self.faq(answer='Устаревшее описание')
        page = self.page([
            self.script(self.graph({'@type': 'WebPage', 'name': 'Главная'}, extra)),
            self.script(self.graph({'@type': 'BreadcrumbList', 'name': 'Путь'})),
            self.script(self.graph({'@type': 'Service', 'name': 'GEO'}, good)),
        ])
        result = meta.sync_faq_schema(page, 'case.html')
        self.assertEqual(len(self.faqs(result)), 1)
        self.assertEqual(self.faqs(result)[0]['mainEntity'][0]['acceptedAnswer']['text'], 'Это продвижение бренда.')
        self.assertCountEqual(
            [node['@type'] for node in self.objects(result) if not meta.has_type(node, 'FAQPage')],
            ['WebPage', 'BreadcrumbList', 'Service'],
        )
        self.assertEqual(meta.sync_faq_schema(result, 'case.html'), result)

    def test_regenerates_only_stale_faq_from_visible_content(self):
        stale = self.faq(answer='Старый ответ')
        page = self.page([self.script(self.graph({'@type': 'Service'}, stale))])
        result = meta.sync_faq_schema(page, 'case.html')
        self.assertEqual(len(self.faqs(result)), 1)
        self.assertEqual(self.faqs(result)[0]['mainEntity'][0]['acceptedAnswer']['text'], 'Это продвижение бренда.')
        self.assertEqual(meta.sync_faq_schema(result, 'case.html'), result)

    def test_creates_missing_faq_in_last_jsonld_script(self):
        source = self.page([
            self.script(self.graph({'@type': 'WebPage'})),
            self.script(self.graph({'@type': 'Service'})),
        ])
        result = meta.sync_faq_schema(source, 'case.html')
        self.assertEqual(len(self.faqs(result)), 1)
        self.assertEqual([x['@type'] for x in self.objects(result)], ['WebPage', 'Service', 'FAQPage'])
        self.assertEqual(meta.sync_faq_schema(result, 'case.html'), result)

    def test_stale_faq_without_visible_questions_is_removed(self):
        page = self.page([
            self.script(self.graph({'@type': 'WebPage'}, self.faq())),
        ], questions=[])
        result = meta.sync_faq_schema(page, 'case.html')
        self.assertEqual(len(self.faqs(result)), 0)
        self.assertEqual([x['@type'] for x in self.objects(result)], ['WebPage'])
        self.assertEqual(meta.sync_faq_schema(result, 'case.html'), result)

    def test_standalone_faq_script_can_be_removed_safely(self):
        page = self.page([
            self.script(self.faq()),
            self.script(self.graph({'@type': 'Service'}, self.faq())),
        ])
        result = meta.sync_faq_schema(page, 'case.html')
        self.assertEqual(len(self.faqs(result)), 1)
        self.assertEqual([x['@type'] for x in self.objects(result)], ['Service', 'FAQPage'])

    def test_mixed_type_duplicate_preserves_non_faq_type(self):
        mixed = self.faq()
        mixed['@type'] = ['Service', 'FAQPage']
        page = self.page([
            self.script(self.graph(mixed, self.faq())),
        ])
        result = meta.sync_faq_schema(page, 'case.html')
        self.assertEqual(len(self.faqs(result)), 1)
        self.assertEqual([x['@type'] for x in self.objects(result)], ['Service', 'FAQPage'])

    def test_english_canonical_id_and_language_are_correct(self):
        page = self.page([self.script(self.graph({'@type': 'Service'}))], english=True,
                         questions=[('Как работает GEO?', 'Это продвижение бренда.')])
        result = meta.sync_faq_schema(page, 'case.html')
        faq = self.faqs(result)[0]
        self.assertEqual(faq['@id'], 'https://gaeo.ru/en/services/example/#faq')
        self.assertEqual(faq['inLanguage'], 'en-US')

    def test_missing_visible_answer_fails_instead_of_inventing_it(self):
        page = self.page([self.script(self.graph({'@type': 'Service'}))], questions=[])
        page = page.replace('</body>',
                            '<details class="faq-item"><summary>Вопрос?</summary><p>Ответ без нужного класса.</p></details></body>')
        with self.assertRaisesRegex(RuntimeError, 'FAQ answers could not be read'):
            meta.sync_faq_schema(page, 'case.html')

    def test_no_faq_means_no_unnecessary_jsonld_rewrite(self):
        page = self.page([self.script(self.graph({'@type': 'WebPage'}))], questions=[])
        self.assertEqual(meta.sync_faq_schema(page, 'case.html'), page)

    def test_current_site_pages_are_idempotent_and_valid(self):
        root = Path(meta.ROOT)
        checked = 0
        for path in sorted(root.rglob('*.html')):
            relative = path.relative_to(root)
            if any(part in meta.SKIP_DIRS for part in relative.parts):
                continue
            original = path.read_text(encoding='utf-8')
            if not meta.JSONLD_RE.search(original):
                continue
            with self.subTest(page=relative.as_posix()):
                updated = meta.sync_faq_schema(original, relative.as_posix())
                self.assertEqual(updated, meta.sync_faq_schema(updated, relative.as_posix()))
                questions = meta.visible_faq_questions(updated)
                faqs = self.faqs(updated)
                self.assertEqual(len(faqs), 1 if questions else 0)
                if questions:
                    self.assertEqual(meta.faq_schema_questions(faqs[0]), questions)
                checked += 1
        self.assertGreater(checked, 250)


if __name__ == '__main__':
    unittest.main()
