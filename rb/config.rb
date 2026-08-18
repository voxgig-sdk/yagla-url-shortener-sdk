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
              "name" => "link",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "originalLink",
              "type" => "`$STRING`",
            },
            {
              "name" => "shortLink",
              "type" => "`$STRING`",
            },
          ],
          "name" => "url_shortening",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
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
