"""Regression tests for one-date Article display and synced metadata in RU/EN."""
from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from scripts import ensure_article_dates as dates

BASE = "https://gaeo.ru/cases/example/"


def page(published="2026-10-26", modified="2026-10-26", lang="ru", ranking=False, extra=False, kind="Article"):
    graph = {
        "@context": "https://schema.org",
        "@graph": [{"@type": kind, "@id": BASE + "#article",
                    "datePublished": published, "dateModified": modified}],
    }
    if ranking:
        spans = '<span>Published: October 26, 2026</span><span>Updated: October 26, 2026</span><span>5 min read</span>'
    elif lang == "en":
        spans = '<span>Alexey Yakovlev</span><span>Published: October 26, 2026</span><span>Updated: October 26, 2026</span>'
    else:
        spans = ('<span>Алексей Яковлев</span><span>Опубликовано: 26 октября 2026</span>'
                 '<span>Обновлено: 26 октября 2026</span>'
                 + ('<span>Практическое руководство</span>' if extra else ''))
    return (f'<html lang="{lang}"><head><link rel="canonical" href="{BASE}">'
            f'<script type="application/ld+json">{json.dumps(graph, ensure_ascii=False)}</script>'
            '</head><body><h1>Test</h1>'
            f'<div class="article-meta">{spans}</div></body></html>')


def normalize_twice(source):
    with tempfile.TemporaryDirectory(dir=dates.ROOT) as directory:
        target = Path(directory) / "index.html"
        target.write_text(source, encoding="utf-8")
        dates.normalize(target)
        first = target.read_text(encoding="utf-8")
        dates.normalize(target)
        second = target.read_text(encoding="utf-8")
        return first, second


class DatePolicyTests(unittest.TestCase):
    def test_unedited_ru_has_one_date_preserves_badges(self):
        first, second = normalize_twice(page(extra=True))
        self.assertEqual(first, second)
        self.assertIn('<time datetime="2026-10-26">26 октября 2026</time>', first)
        self.assertEqual(first.count('class="article-date"'), 1)
        self.assertIn("Алексей Яковлев", first)
        self.assertIn("Практическое руководство", first)
        self.assertNotIn("Опубликовано:", first)
        self.assertNotIn("Обновлено:", first)
        self.assertEqual(first.count('property="article:published_time"'), 1)
        self.assertEqual(first.count('property="article:modified_time"'), 1)

    def test_updated_ru_has_labeled_date(self):
        first, _ = normalize_twice(page(modified="2026-11-12"))
        self.assertIn('<time datetime="2026-11-12">Обновлено 12 ноября 2026</time>', first)
        self.assertNotIn("Опубликовано:", first)
        self.assertNotIn("Обновлено:", first)
        self.assertIn('content="2026-10-26"', first)
        self.assertIn('content="2026-11-12"', first)

    def test_english_changed_date(self):
        first, _ = normalize_twice(page(modified="2026-11-12", lang="en"))
        self.assertIn('<time datetime="2026-11-12">Updated November 12, 2026</time>', first)
        self.assertIn("Alexey Yakovlev", first)
        self.assertNotIn("Published:", first)
        self.assertNotIn("Updated:", first)

    def test_ranking_keeps_reading_time_no_fake_author(self):
        first, _ = normalize_twice(page(ranking=True, lang="en"))
        self.assertIn('<time datetime="2026-10-26">October 26, 2026</time>', first)
        self.assertIn("<span>5 min read</span>", first)
        self.assertEqual(first.count('class="article-date"'), 1)

    def test_creativework_case_normalized_with_og_dates(self):
        first, second = normalize_twice(page(lang="en", kind="CreativeWork"))
        self.assertEqual(first, second)
        self.assertIn('<time datetime="2026-10-26">October 26, 2026</time>', first)
        self.assertEqual(first.count('property="article:published_time"'), 1)
        self.assertEqual(first.count('property="article:modified_time"'), 1)
        self.assertNotIn("Published:", first)
        self.assertNotIn("Updated:", first)

    def test_bad_chronology_rejected(self):
        with tempfile.TemporaryDirectory(dir=dates.ROOT) as directory:
            target = Path(directory) / "bad.html"
            target.write_text(page(modified="2026-10-25"), encoding="utf-8")
            with self.assertRaises(RuntimeError):
                dates.normalize(target)

    def test_invalid_date_rejected(self):
        with tempfile.TemporaryDirectory(dir=dates.ROOT) as directory:
            target = Path(directory) / "bad.html"
            target.write_text(page(published="2026-13-40"), encoding="utf-8")
            with self.assertRaises(RuntimeError):
                dates.normalize(target)


if __name__ == "__main__":
    unittest.main()
