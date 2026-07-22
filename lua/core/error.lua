-- YaglaUrlShortener SDK error

local YaglaUrlShortenerError = {}
YaglaUrlShortenerError.__index = YaglaUrlShortenerError


function YaglaUrlShortenerError.new(code, msg, ctx)
  local self = setmetatable({}, YaglaUrlShortenerError)
  self.is_sdk_error = true
  self.sdk = "YaglaUrlShortener"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YaglaUrlShortenerError:error()
  return self.msg
end


function YaglaUrlShortenerError:__tostring()
  return self.msg
end


return YaglaUrlShortenerError
