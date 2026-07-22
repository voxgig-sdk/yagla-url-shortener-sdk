<?php
declare(strict_types=1);

// YaglaUrlShortener SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YaglaUrlShortenerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YaglaUrlShortenerBaseFeature();
            case "test":
                return new YaglaUrlShortenerTestFeature();
            default:
                return new YaglaUrlShortenerBaseFeature();
        }
    }
}
