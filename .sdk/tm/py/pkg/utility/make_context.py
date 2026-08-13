# YaglaUrlShortener SDK utility: make_context

from projectname_sdk.core.context import YaglaUrlShortenerContext


def make_context_util(ctxmap, basectx):
    return YaglaUrlShortenerContext(ctxmap, basectx)
