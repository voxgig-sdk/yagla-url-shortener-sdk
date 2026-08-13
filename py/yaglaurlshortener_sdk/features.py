# YaglaUrlShortener SDK feature factory

from yaglaurlshortener_sdk.feature.base_feature import YaglaUrlShortenerBaseFeature
from yaglaurlshortener_sdk.feature.test_feature import YaglaUrlShortenerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YaglaUrlShortenerBaseFeature(),
        "test": lambda: YaglaUrlShortenerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
