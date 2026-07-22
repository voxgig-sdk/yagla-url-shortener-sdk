<?php
declare(strict_types=1);

// YaglaUrlShortener SDK utility: result_body

class YaglaUrlShortenerResultBody
{
    public static function call(YaglaUrlShortenerContext $ctx): ?YaglaUrlShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
