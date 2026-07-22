# YaglaUrlShortener SDK utility: make_context

from core.context import YaglaUrlShortenerContext


def make_context_util(ctxmap, basectx):
    return YaglaUrlShortenerContext(ctxmap, basectx)
