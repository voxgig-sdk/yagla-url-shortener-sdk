<?php
declare(strict_types=1);

// YaglaUrlShortener SDK configuration

class YaglaUrlShortenerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YaglaUrlShortener",
                "slug" => "yagla-url-shortener",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://yagla.ru",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "url_shortening" => [],
                ],
            ],
            "entity" => [
        'url_shortening' => [
          'fields' => [
            [
              'name' => 'link',
              'req' => true,
              'short' => 'The long URL to be shortened',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'originalLink',
              'short' => 'The original long URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shortLink',
              'short' => 'The generated short URL',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'url_shortening',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/tools/generateShortLink',
                  'parts' => [
                    'tools',
                    'generateShortLink',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YaglaUrlShortenerFeatures::make_feature($name);
    }
}
