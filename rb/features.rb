# YaglaUrlShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YaglaUrlShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      YaglaUrlShortenerBaseFeature.new
    when "ratelimit"
      YaglaUrlShortenerRatelimitFeature.new
    when "retry"
      YaglaUrlShortenerRetryFeature.new
    when "test"
      YaglaUrlShortenerTestFeature.new
    when "timeout"
      YaglaUrlShortenerTimeoutFeature.new
    else
      YaglaUrlShortenerBaseFeature.new
    end
  end
end
