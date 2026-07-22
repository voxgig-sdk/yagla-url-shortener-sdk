# ProjectName SDK exists test

import pytest
from yaglaurlshortener_sdk import YaglaUrlShortenerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YaglaUrlShortenerSDK.test(None, None)
        assert testsdk is not None
