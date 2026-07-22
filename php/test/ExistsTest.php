<?php
declare(strict_types=1);

// YaglaUrlShortener SDK exists test

require_once __DIR__ . '/../yaglaurlshortener_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = YaglaUrlShortenerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
