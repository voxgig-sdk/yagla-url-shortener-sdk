<?php
declare(strict_types=1);

// YaglaUrlShortener SDK configuration

class YaglaUrlShortenerConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YaglaUrlShortener",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'link',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'original_link',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'short_link',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'url_shortening',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
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
