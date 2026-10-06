import io
import json
import ssl
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch, MagicMock
from urllib.error import HTTPError, URLError
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import indexnow_submit as m


class IndexNowTests(unittest.TestCase):
    def response(self, body='', status=200, url=m.KEY_LOCATION):
        r = MagicMock()
        r.__enter__.return_value = r
        r.status = status
        r.read.return_value = body.encode()
        r.geturl.return_value = url
        return r

    def http_error(self, code):
        return HTTPError(m.ENDPOINT, code, 'test', {}, io.BytesIO(b'error'))

    def test_dns_and_ssl_are_temporary(self):
        for exc in [URLError('DNS'), URLError(ssl.SSLCertVerificationError('hostname mismatch'))]:
            with self.subTest(error=exc), patch.object(m.request, 'urlopen', side_effect=exc):
                with self.assertRaises(m.TemporaryIndexNowError):
                    m.wait_for_key(max_attempts=1, delay=0)

    def test_key_recovers_after_404(self):
        with patch.object(m.request, 'urlopen', side_effect=[self.http_error(404), self.response(m.KEY)]), patch.object(m.time, 'sleep'):
            m.wait_for_key(max_attempts=2, delay=0)

    def test_wrong_key_and_redirect_are_not_deferred(self):
        for r in [self.response('wrong key'), self.response(m.KEY, url='https://other.example/key')]:
            with patch.object(m.request, 'urlopen', return_value=r):
                with self.assertRaises(RuntimeError) as exc:
                    m.wait_for_key(max_attempts=1)
                self.assertNotIsInstance(exc.exception, m.TemporaryIndexNowError)

    def test_api_accepts_200_and_202(self):
        for code in (200, 202):
            with patch.object(m.request, 'urlopen', return_value=self.response(status=code)):
                self.assertEqual(m.post_indexnow([m.BASE + '/']), code)

    def test_api_temporary_failures(self):
        for code in (429, 503):
            with patch.object(m.request, 'urlopen', side_effect=self.http_error(code)), patch.object(m.time, 'sleep'):
                with self.assertRaises(m.TemporaryIndexNowError):
                    m.post_indexnow([m.BASE + '/'])

    def test_api_configuration_errors_remain_visible(self):
        for code in (400, 403, 422):
            with patch.object(m.request, 'urlopen', side_effect=self.http_error(code)):
                with self.assertRaises(HTTPError):
                    m.post_indexnow([m.BASE + '/'])

    def run_main(self, queue, urls, failure=None, extra=()):
        argv = ['indexnow_submit.py', '--pending-file', str(queue), '--defer-unavailable', *extra]
        with patch.object(sys, 'argv', argv), patch.object(m, 'site_mode', return_value='production'), patch.object(m, 'changed_urls', return_value=urls), patch.object(m, 'wait_for_key', side_effect=failure), patch.object(m, 'post_indexnow', return_value=202) as post:
            m.main()
            return post

    def test_pending_deleted_urls_are_retained_until_acceptance(self):
        with tempfile.TemporaryDirectory() as d:
            queue = Path(d) / 'pending.json'
            old = m.BASE + '/removed/'
            m.save_pending(queue, [old])
            post = self.run_main(queue, [m.BASE + '/'], m.TemporaryIndexNowError('DNS'))
            post.assert_not_called()
            self.assertEqual(m.load_pending(queue), sorted([old, m.BASE + '/']))
            post = self.run_main(queue, [], extra=['--pending-only'])
            post.assert_called_once_with(sorted([old, m.BASE + '/']))
            self.assertFalse(queue.exists())

    def test_dry_run_preserves_queue_and_never_posts(self):
        with tempfile.TemporaryDirectory() as d:
            queue = Path(d) / 'pending.json'
            m.save_pending(queue, [m.BASE + '/removed/'])
            before = queue.read_bytes()
            post = self.run_main(queue, [m.BASE + '/'], extra=['--dry-run'])
            post.assert_not_called()
            self.assertEqual(queue.read_bytes(), before)

    def test_nonproduction_never_posts_or_creates_queue(self):
        with tempfile.TemporaryDirectory() as d:
            queue = Path(d) / 'pending.json'
            with patch.object(sys, 'argv', ['indexnow_submit.py', '--all', '--defer-unavailable', '--pending-file', str(queue)]), patch.object(m, 'site_mode', return_value='prelaunch'), patch.object(m, 'changed_urls', return_value=[m.BASE + '/']), patch.object(m, 'post_indexnow') as post:
                with self.assertRaises(SystemExit):
                    m.main()
                post.assert_not_called()
                self.assertFalse(queue.exists())

    def test_foreign_pending_urls_are_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            queue = Path(d) / 'pending.json'
            queue.write_text(json.dumps(m.payload_for(['https://other.example/'])))
            with self.assertRaises(ValueError):
                m.load_pending(queue)


if __name__ == '__main__':
    unittest.main()
