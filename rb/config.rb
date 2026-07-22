# YaglaUrlShortener SDK configuration

module YaglaUrlShortenerConfig
  def self.make_config
    {
      "main" => {
        "name" => "YaglaUrlShortener",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://yagla.ru",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "url_shortening" => {},
        },
      },
      "entity" => {
        "url_shortening" => {
          "fields" => [
            {
              "active" => true,
              "name" => "link",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "original_link",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "short_link",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "url_shortening",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "POST",
                  "orig" => "/tools/generateShortLink",
                  "parts" => [
                    "tools",
                    "generateShortLink",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YaglaUrlShortenerFeatures.make_feature(name)
  end
end
