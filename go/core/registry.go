package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewUrlShorteningEntityFunc func(client *YaglaUrlShortenerSDK, entopts map[string]any) YaglaUrlShortenerEntity

