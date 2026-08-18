
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'YaglaUrlShortener',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://yagla.ru",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      url_shortening: {
      },

    }
  }


  entity = {
    "url_shortening": {
      "fields": [
        {
          "name": "link",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "originalLink",
          "type": "`$STRING`"
        },
        {
          "name": "shortLink",
          "type": "`$STRING`"
        }
      ],
      "name": "url_shortening",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/tools/generateShortLink",
              "parts": [
                "tools",
                "generateShortLink"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

