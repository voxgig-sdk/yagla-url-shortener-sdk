# YaglaUrlShortener SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

YaglaUrlShortenerUtility.registrar = ->(u) {
  u.clean = YaglaUrlShortenerUtilities::Clean
  u.done = YaglaUrlShortenerUtilities::Done
  u.make_error = YaglaUrlShortenerUtilities::MakeError
  u.feature_add = YaglaUrlShortenerUtilities::FeatureAdd
  u.feature_hook = YaglaUrlShortenerUtilities::FeatureHook
  u.feature_init = YaglaUrlShortenerUtilities::FeatureInit
  u.fetcher = YaglaUrlShortenerUtilities::Fetcher
  u.make_fetch_def = YaglaUrlShortenerUtilities::MakeFetchDef
  u.make_context = YaglaUrlShortenerUtilities::MakeContext
  u.make_options = YaglaUrlShortenerUtilities::MakeOptions
  u.make_request = YaglaUrlShortenerUtilities::MakeRequest
  u.make_response = YaglaUrlShortenerUtilities::MakeResponse
  u.make_result = YaglaUrlShortenerUtilities::MakeResult
  u.make_point = YaglaUrlShortenerUtilities::MakePoint
  u.make_spec = YaglaUrlShortenerUtilities::MakeSpec
  u.make_url = YaglaUrlShortenerUtilities::MakeUrl
  u.param = YaglaUrlShortenerUtilities::Param
  u.prepare_auth = YaglaUrlShortenerUtilities::PrepareAuth
  u.prepare_body = YaglaUrlShortenerUtilities::PrepareBody
  u.prepare_headers = YaglaUrlShortenerUtilities::PrepareHeaders
  u.prepare_method = YaglaUrlShortenerUtilities::PrepareMethod
  u.prepare_params = YaglaUrlShortenerUtilities::PrepareParams
  u.prepare_path = YaglaUrlShortenerUtilities::PreparePath
  u.prepare_query = YaglaUrlShortenerUtilities::PrepareQuery
  u.result_basic = YaglaUrlShortenerUtilities::ResultBasic
  u.result_body = YaglaUrlShortenerUtilities::ResultBody
  u.result_headers = YaglaUrlShortenerUtilities::ResultHeaders
  u.transform_request = YaglaUrlShortenerUtilities::TransformRequest
  u.transform_response = YaglaUrlShortenerUtilities::TransformResponse
}
