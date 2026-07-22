# YaglaUrlShortener SDK utility: make_context
require_relative '../core/context'
module YaglaUrlShortenerUtilities
  MakeContext = ->(ctxmap, basectx) {
    YaglaUrlShortenerContext.new(ctxmap, basectx)
  }
end
