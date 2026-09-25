

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"link":{"a":true,"fo":"uri","h":"Link","n":"link","r":true,"sh":"The long URL to be shortened","t":"`$STRING`","key$":"link","index$":0},"originalLink":{"a":true,"fo":"uri","h":"Original Link","n":"originalLink","r":false,"sh":"The original long URL","t":"`$STRING`","key$":"originalLink","index$":1},"shortLink":{"a":true,"fo":"uri","h":"Short Link","n":"shortLink","r":false,"sh":"The generated short URL","t":"`$STRING`","key$":"shortLink","index$":2}},"name":"url_shortening","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /tools/generateShortLink","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/tools/generateShortLink","q":{},"r":{},"s":[{"lit":"tools"},{"lit":"generateShortLink"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"url_shortening","name__orig":"url_shortening","Name":"UrlShortening","name_":"url_shortening","name-":"url-shortening","NAME":"URL_SHORTENING","index$":0}, {"active":true,"entity":"url_shortening","key$":"BasicUrlShorteningFlow","kind":"basic","name":"BasicUrlShorteningFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"url_shortening_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'UrlShortening', {"POST /tools/generateShortLink":{"protocol":"http","operationId":"generateShortLink","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["link"],"properties":{"link":{"type":"string","format":"uri","description":"The long URL to be shortened","example":"http://tvs.tv","key$":"link"}},"index$":1},"examples":{"example1":{"summary":"Example URL shortening request","value":{"link":"http://tvs.tv"}}}}}},"responses":{"200":{"description":"Successfully generated short link","content":{"application/json":{"schema":{"type":"object","properties":{"shortLink":{"type":"string","format":"uri","description":"The generated short URL","key$":"shortLink"},"originalLink":{"type":"string","format":"uri","description":"The original long URL","key$":"originalLink"}},"index$":0},"examples":{"example1":{"summary":"Successful response","value":{"shortLink":"https://yagla.ru/abc123","originalLink":"http://tvs.tv"}}}}}},"400":{"description":"Bad Request - Invalid URL or missing parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}}},"examples":{"example1":{"summary":"Invalid URL","value":{"error":"Invalid URL provided"}}}}}},"500":{"description":"Internal Server Error - Something went wrong on the server","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}},"examples":{"example1":{"summary":"Server error","value":{"error":"Internal server error"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
