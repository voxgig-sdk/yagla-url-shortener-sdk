package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YaglaUrlShortener",
			"slug": "yagla-url-shortener",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://yagla.ru",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"url_shortening": map[string]any{},
			},
		},
		"entity": map[string]any{
			"url_shortening": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "uri",
						"name": "link",
						"req": true,
						"short": "The long URL to be shortened",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "originalLink",
						"short": "The original long URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "shortLink",
						"short": "The generated short URL",
						"type": "`$STRING`",
					},
				},
				"name": "url_shortening",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/tools/generateShortLink",
								"segments": []any{
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "generateShortLink",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"tools",
									"generateShortLink",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
