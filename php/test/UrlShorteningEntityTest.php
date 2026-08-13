<?php
declare(strict_types=1);

// UrlShortening entity test

require_once __DIR__ . '/../yaglaurlshortener_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class UrlShorteningEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = YaglaUrlShortenerSDK::test(null, null);
        $ent = $testsdk->UrlShortening(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = url_shortening_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "url_shortening." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $url_shortening_ref01_ent = $client->UrlShortening(null);
        $url_shortening_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.url_shortening"), "url_shortening_ref01"));

        $url_shortening_ref01_data_result = $url_shortening_ref01_ent->create($url_shortening_ref01_data, null);
        $url_shortening_ref01_data = Helpers::to_map(is_object($url_shortening_ref01_data_result) && method_exists($url_shortening_ref01_data_result, 'data_get') ? $url_shortening_ref01_data_result->data_get() : $url_shortening_ref01_data_result);
        $this->assertNotNull($url_shortening_ref01_data);

    }
}

function url_shortening_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/url_shortening/UrlShorteningTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = YaglaUrlShortenerSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["url_shortening01", "url_shortening02", "url_shortening03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID" => $idmap,
        "YAGLA_URL_SHORTENER_TEST_LIVE" => "FALSE",
        "YAGLA_URL_SHORTENER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["YAGLA_URL_SHORTENER_TEST_URL_SHORTENING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["YAGLA_URL_SHORTENER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new YaglaUrlShortenerSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["YAGLA_URL_SHORTENER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["YAGLA_URL_SHORTENER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
