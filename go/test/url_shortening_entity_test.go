package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yagla-url-shortener-sdk/go"
	"github.com/voxgig-sdk/yagla-url-shortener-sdk/go/core"

	vs "github.com/voxgig-sdk/yagla-url-shortener-sdk/go/utility/struct"
)

func TestUrlShorteningEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.UrlShortening(nil)
		if ent == nil {
			t.Fatal("expected non-nil UrlShorteningEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := url_shorteningBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "url_shortening." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YAGLAURLSHORTENER_TEST_URL_SHORTENING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		urlShorteningRef01Ent := client.UrlShortening(nil)
		urlShorteningRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "url_shortening"}, setup.data), "url_shortening_ref01"))

		urlShorteningRef01DataResult, err := urlShorteningRef01Ent.Create(urlShorteningRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		urlShorteningRef01Data = core.ToMapAny(urlShorteningRef01DataResult)
		if urlShorteningRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func url_shorteningBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "url_shortening", "UrlShorteningTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read url_shortening test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse url_shortening test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"url_shortening01", "url_shortening02", "url_shortening03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YAGLAURLSHORTENER_TEST_URL_SHORTENING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YAGLAURLSHORTENER_TEST_URL_SHORTENING_ENTID": idmap,
		"YAGLAURLSHORTENER_TEST_LIVE":      "FALSE",
		"YAGLAURLSHORTENER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["YAGLAURLSHORTENER_TEST_URL_SHORTENING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YAGLAURLSHORTENER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewYaglaUrlShortenerSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YAGLAURLSHORTENER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YAGLAURLSHORTENER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
