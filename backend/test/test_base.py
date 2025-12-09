from django.test import TestCase

class BaseTest(TestCase):
    def test_ok(self):
        self.assertEqual(1+1, 2)
