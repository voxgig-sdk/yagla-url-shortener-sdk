# YaglaUrlShortener SDK configuration

module YaglaUrlShortenerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "YaglaUrlShortener",
        "slug" => "yagla-url-shortener",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The long URL to be shortened",
              "format" => "uri",
            },
            {
              "name" => "originalLink",
              "title" => "Original Link",
              "type" => "`$STRING`",
              "short" => "The original long URL",
              "format" => "uri",
            },
            {
              "name" => "shortLink",
              "title" => "Short Link",
              "type" => "`$STRING`",
              "short" => "The generated short URL",
              "format" => "uri",
            },
          ],
          "name" => "url_shortening",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/tools/generateShortLink",
                  "segments" => [
                    {
                      "lit" => "tools",
                    },
                    {
                      "lit" => "generateShortLink",
                    },
                  ],
                  "parts" => [
                    "tools",
                    "generateShortLink",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
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
