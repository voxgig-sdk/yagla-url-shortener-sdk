<?php
declare(strict_types=1);

// YaglaUrlShortener SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

YaglaUrlShortenerUtility::setRegistrar(function (YaglaUrlShortenerUtility $u): void {
    $u->clean = [YaglaUrlShortenerClean::class, 'call'];
    $u->done = [YaglaUrlShortenerDone::class, 'call'];
    $u->make_error = [YaglaUrlShortenerMakeError::class, 'call'];
    $u->feature_add = [YaglaUrlShortenerFeatureAdd::class, 'call'];
    $u->feature_hook = [YaglaUrlShortenerFeatureHook::class, 'call'];
    $u->feature_init = [YaglaUrlShortenerFeatureInit::class, 'call'];
    $u->fetcher = [YaglaUrlShortenerFetcher::class, 'call'];
    $u->make_fetch_def = [YaglaUrlShortenerMakeFetchDef::class, 'call'];
    $u->make_context = [YaglaUrlShortenerMakeContext::class, 'call'];
    $u->make_options = [YaglaUrlShortenerMakeOptions::class, 'call'];
    $u->make_request = [YaglaUrlShortenerMakeRequest::class, 'call'];
    $u->make_response = [YaglaUrlShortenerMakeResponse::class, 'call'];
    $u->make_result = [YaglaUrlShortenerMakeResult::class, 'call'];
    $u->make_point = [YaglaUrlShortenerMakePoint::class, 'call'];
    $u->make_spec = [YaglaUrlShortenerMakeSpec::class, 'call'];
    $u->make_url = [YaglaUrlShortenerMakeUrl::class, 'call'];
    $u->param = [YaglaUrlShortenerParam::class, 'call'];
    $u->prepare_auth = [YaglaUrlShortenerPrepareAuth::class, 'call'];
    $u->prepare_body = [YaglaUrlShortenerPrepareBody::class, 'call'];
    $u->prepare_headers = [YaglaUrlShortenerPrepareHeaders::class, 'call'];
    $u->prepare_method = [YaglaUrlShortenerPrepareMethod::class, 'call'];
    $u->prepare_params = [YaglaUrlShortenerPrepareParams::class, 'call'];
    $u->prepare_path = [YaglaUrlShortenerPreparePath::class, 'call'];
    $u->prepare_query = [YaglaUrlShortenerPrepareQuery::class, 'call'];
    $u->result_basic = [YaglaUrlShortenerResultBasic::class, 'call'];
    $u->result_body = [YaglaUrlShortenerResultBody::class, 'call'];
    $u->result_headers = [YaglaUrlShortenerResultHeaders::class, 'call'];
    $u->transform_request = [YaglaUrlShortenerTransformRequest::class, 'call'];
    $u->transform_response = [YaglaUrlShortenerTransformResponse::class, 'call'];
});
