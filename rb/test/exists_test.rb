# YaglaUrlShortener SDK exists test

require "minitest/autorun"
require_relative "../YaglaUrlShortener_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YaglaUrlShortenerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
