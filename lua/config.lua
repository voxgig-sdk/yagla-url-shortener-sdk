-- YaglaUrlShortener SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "YaglaUrlShortener",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://yagla.ru",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["url_shortening"] = {},
      },
    },
    entity = {
      ["url_shortening"] = {
        ["fields"] = {
          {
            ["name"] = "link",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "originalLink",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "shortLink",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "url_shortening",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/tools/generateShortLink",
                ["parts"] = {
                  "tools",
                  "generateShortLink",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
