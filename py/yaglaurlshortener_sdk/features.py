# YaglaUrlShortener SDK feature factory

from yaglaurlshortener_sdk.feature.base_feature import YaglaUrlShortenerBaseFeature
from yaglaurlshortener_sdk.feature.ratelimit_feature import YaglaUrlShortenerRatelimitFeature
from yaglaurlshortener_sdk.feature.retry_feature import YaglaUrlShortenerRetryFeature
from yaglaurlshortener_sdk.feature.test_feature import YaglaUrlShortenerTestFeature
from yaglaurlshortener_sdk.feature.timeout_feature import YaglaUrlShortenerTimeoutFeature


_FEATURES = {
    "base": lambda: YaglaUrlShortenerBaseFeature(),
    "ratelimit": lambda: YaglaUrlShortenerRatelimitFeature(),
    "retry": lambda: YaglaUrlShortenerRetryFeature(),
    "test": lambda: YaglaUrlShortenerTestFeature(),
    "timeout": lambda: YaglaUrlShortenerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
