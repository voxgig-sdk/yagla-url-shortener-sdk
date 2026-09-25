"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UrlShorteningEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YAGLA_URL_SHORTENER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YAGLA_URL_SHORTENER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YaglaUrlShortenerSDK.test();
        const ent = testsdk.UrlShortening();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YAGLA_URL_SHORTENER_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'url_shortening.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "link": { "a": true, "fo": "uri", "h": "Link", "n": "link", "r": true, "sh": "The long URL to be shortened", "t": "`$STRING`", "key$": "link", "index$": 0 }, "originalLink": { "a": true, "fo": "uri", "h": "Original Link", "n": "originalLink", "r": false, "sh": "The original long URL", "t": "`$STRING`", "key$": "originalLink", "index$": 1 }, "shortLink": { "a": true, "fo": "uri", "h": "Short Link", "n": "shortLink", "r": false, "sh": "The generated short URL", "t": "`$STRING`", "key$": "shortLink", "index$": 2 } }, "name": "url_shortening", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /tools/generateShortLink", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/tools/generateShortLink", "q": {}, "r": {}, "s": [{ "lit": "tools" }, { "lit": "generateShortLink" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "url_shortening", "name__orig": "url_shortening", "Name": "UrlShortening", "name_": "url_shortening", "name-": "url-shortening", "NAME": "URL_SHORTENING", "index$": 0 }, { "active": true, "entity": "url_shortening", "key$": "BasicUrlShorteningFlow", "kind": "basic", "name": "BasicUrlShorteningFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "url_shortening_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'UrlShortening', { "POST /tools/generateShortLink": { "protocol": "http", "operationId": "generateShortLink", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["link"], "properties": { "link": { "type": "string", "format": "uri", "description": "The long URL to be shortened", "example": "http://tvs.tv", "key$": "link" } }, "index$": 1 }, "examples": { "example1": { "summary": "Example URL shortening request", "value": { "link": "http://tvs.tv" } } } } } }, "responses": { "200": { "description": "Successfully generated short link", "content": { "application/json": { "schema": { "type": "object", "properties": { "shortLink": { "type": "string", "format": "uri", "description": "The generated short URL", "key$": "shortLink" }, "originalLink": { "type": "string", "format": "uri", "description": "The original long URL", "key$": "originalLink" } }, "index$": 0 }, "examples": { "example1": { "summary": "Successful response", "value": { "shortLink": "https://yagla.ru/abc123", "originalLink": "http://tvs.tv" } } } } } }, "400": { "description": "Bad Request - Invalid URL or missing parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" } } }, "examples": { "example1": { "summary": "Invalid URL", "value": { "error": "Invalid URL provided" } } } } } }, "500": { "description": "Internal Server Error - Something went wrong on the server", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } }, "examples": { "example1": { "summary": "Server error", "value": { "error": "Internal server error" } } } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const url_shortening_ref01_ent = client.UrlShortening();
        let url_shortening_ref01_data = setup.data.new.url_shortening['url_shortening_ref01'];
        url_shortening_ref01_data = (await url_shortening_ref01_ent.create(url_shortening_ref01_data)).data();
        (0, node_assert_1.default)(null != url_shortening_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/url_shortening/UrlShorteningTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YaglaUrlShortenerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['url_shortening01', 'url_shortening02', 'url_shortening03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID': idmap,
        'YAGLA_URL_SHORTENER_TEST_LIVE': 'FALSE',
        'YAGLA_URL_SHORTENER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID'];
    const live = 'TRUE' === env.YAGLA_URL_SHORTENER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.YaglaUrlShortenerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=UrlShorteningEntity.test.js.map