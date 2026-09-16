

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YaglaUrlShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('UrlShorteningEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAGLA_URL_SHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAGLA_URL_SHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YaglaUrlShortenerSDK.test()
    const ent = testsdk.UrlShortening()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAGLA_URL_SHORTENER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'url_shortening.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"link","req":true,"short":"The long URL to be shortened","type":"`$STRING`","index$":0},{"active":true,"format":"uri","name":"originalLink","req":false,"short":"The original long URL","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"shortLink","req":false,"short":"The generated short URL","type":"`$STRING`","index$":2}],"name":"url_shortening","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /tools/generateShortLink","json":"{\"operationId\":\"generateShortLink\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"example1\":{\"summary\":\"Example URL shortening request\",\"value\":{\"link\":\"http://tvs.tv\"}}},\"schema\":{\"properties\":{\"link\":{\"description\":\"The long URL to be shortened\",\"example\":\"http://tvs.tv\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"link\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example1\":{\"summary\":\"Successful response\",\"value\":{\"originalLink\":\"http://tvs.tv\",\"shortLink\":\"https://yagla.ru/abc123\"}}},\"schema\":{\"properties\":{\"originalLink\":{\"description\":\"The original long URL\",\"format\":\"uri\",\"type\":\"string\"},\"shortLink\":{\"description\":\"The generated short URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated short link\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"example1\":{\"summary\":\"Invalid URL\",\"value\":{\"error\":\"Invalid URL provided\"}}},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Invalid URL or missing parameters\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"example1\":{\"summary\":\"Server error\",\"value\":{\"error\":\"Internal server error\"}}},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Something went wrong on the server\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/tools/generateShortLink","segments":[{"lit":"tools"},{"lit":"generateShortLink"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"url_shortening","name__orig":"url_shortening","Name":"UrlShortening","name_":"url_shortening","name-":"url-shortening","NAME":"URL_SHORTENING","index$":0}, {"active":true,"entity":"url_shortening","key$":"BasicUrlShorteningFlow","kind":"basic","name":"BasicUrlShorteningFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"url_shortening_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'UrlShortening')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const url_shortening_ref01_ent = client.UrlShortening()
    let url_shortening_ref01_data = setup.data.new.url_shortening['url_shortening_ref01']

    url_shortening_ref01_data = (await url_shortening_ref01_ent.create(url_shortening_ref01_data)).data()
    assert(null != url_shortening_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/url_shortening/UrlShorteningTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YaglaUrlShortenerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['url_shortening01','url_shortening02','url_shortening03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID': idmap,
    'YAGLA_URL_SHORTENER_TEST_LIVE': 'FALSE',
    'YAGLA_URL_SHORTENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID']

  const live = 'TRUE' === env.YAGLA_URL_SHORTENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YaglaUrlShortenerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YAGLA_URL_SHORTENER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
