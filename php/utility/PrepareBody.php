<?php
declare(strict_types=1);

// YaglaUrlShortener SDK utility: prepare_body

class YaglaUrlShortenerPrepareBody
{
    public static function call(YaglaUrlShortenerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
