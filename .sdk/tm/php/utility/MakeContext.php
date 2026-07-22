<?php
declare(strict_types=1);

// YaglaUrlShortener SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YaglaUrlShortenerMakeContext
{
    public static function call(array $ctxmap, ?YaglaUrlShortenerContext $basectx): YaglaUrlShortenerContext
    {
        return new YaglaUrlShortenerContext($ctxmap, $basectx);
    }
}
