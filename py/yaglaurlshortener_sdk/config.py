# YaglaUrlShortener SDK configuration


def make_config():
    return {
        "main": {
            "name": "YaglaUrlShortener",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://yagla.ru",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "url_shortening": {},
            },
        },
        "entity": {
      "url_shortening": {
        "fields": [
          {
            "active": True,
            "name": "link",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "originalLink",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "shortLink",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "url_shortening",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/tools/generateShortLink",
                "parts": [
                  "tools",
                  "generateShortLink",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
