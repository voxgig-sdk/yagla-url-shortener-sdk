# YaglaUrlShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YaglaUrlShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      YaglaUrlShortenerBaseFeature.new
    when "test"
      YaglaUrlShortenerTestFeature.new
    else
      YaglaUrlShortenerBaseFeature.new
    end
  end
end
