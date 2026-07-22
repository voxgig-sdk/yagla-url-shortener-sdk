-- YaglaUrlShortener SDK exists test

local sdk = require("yagla-url-shortener_sdk")

describe("YaglaUrlShortenerSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
