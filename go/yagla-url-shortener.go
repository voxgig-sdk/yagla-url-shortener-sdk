package voxgigyaglaurlshortenersdk

import (
	"github.com/voxgig-sdk/yagla-url-shortener-sdk/go/core"
	"github.com/voxgig-sdk/yagla-url-shortener-sdk/go/entity"
	"github.com/voxgig-sdk/yagla-url-shortener-sdk/go/feature"
	_ "github.com/voxgig-sdk/yagla-url-shortener-sdk/go/utility"
)

// Type aliases preserve external API.
type YaglaUrlShortenerSDK = core.YaglaUrlShortenerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type YaglaUrlShortenerEntity = core.YaglaUrlShortenerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type YaglaUrlShortenerError = core.YaglaUrlShortenerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewUrlShorteningEntityFunc = func(client *core.YaglaUrlShortenerSDK, entopts map[string]any) core.YaglaUrlShortenerEntity {
		return entity.NewUrlShorteningEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewYaglaUrlShortenerSDK = core.NewYaglaUrlShortenerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewYaglaUrlShortenerSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *YaglaUrlShortenerSDK  { return NewYaglaUrlShortenerSDK(nil) }
func Test() *YaglaUrlShortenerSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
