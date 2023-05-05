<?php

namespace App\UtilityClasses;

class FormData
{
    public array $inputs = [];
    public array $files = [];

    public function __construct(private string $content)
    {
        $this->parseContent($this->content);
    }

    private function parseContent(string $content): void
    {
        $parts = $this->getParts($content);

        foreach ($parts as $part) {
            $this->processContent($part);
        }
    }

    private function getParts(string $content): array
    {
        $boundary = $this->getBoundary($content);

        if (is_null($boundary)) return [];

        $parts = explode($boundary, $content);

        return array_filter($parts, function (string $part): bool {
            return mb_strlen($part) > 0 && $part !== "--\r\n";
        });
    }

    private function getBoundary(string $content): ?string
    {
        $firstNewLinePosition = strpos($content, "\r\n");

        return $firstNewLinePosition ? substr($content, 0, $firstNewLinePosition) : null;
    }

    private function processContent(string $content): void
    {
        $content = ltrim($content, "\r\n");
        [$rawHeaders, $rawContent] = explode("\r\n\r\n", $content, 2);

        $headers = $this->parseHeaders($rawHeaders);

        if (isset($headers['content-disposition'])) {
            $this->parseContentDisposition($headers, $rawContent);
        }
    }

    private function parseHeaders(string $headers): array
    {
        $data = [];

        $headers = explode("\r\n", $headers);

        foreach ($headers as $header) {
            [$name, $value] = explode(':', $header);

            $name = strtolower($name);

            $data[$name] = ltrim($value, ' ');
        }

        return $data;
    }

    private function parseContentDisposition(array $headers, string $content): void
    {
        $content = substr($content, 0, strlen($content) - 2);

        preg_match('/^form-data; *name="([^"]+)"(; *filename="([^"]+)")?/', $headers['content-disposition'], $matches);
        $fieldName = $matches[1];

        $fileName = $matches[3] ?? null;

        if (is_null($fileName)) {
            $input = $this->transformContent($fieldName, $content);

            $this->inputs = array_merge_recursive($this->inputs, $input);
        } else {
            $file = $this->storeFile($fileName, $headers['content-type'], $content);

            $file = $this->transformContent($fieldName, $file);

            $this->files = array_merge_recursive($this->files, $file);
        }
    }

    private function transformContent(string $name, mixed $value): array
    {
        parse_str($name, $parsedName);

        $transform = function (array $array, mixed $value) use (&$transform) {
            foreach ($array as &$val) {
                $val = is_array($val) ? $transform($val, $value) : $value;
            }

            return $array;
        };

        return $transform($parsedName, $value);
    }

    private function storeFile(string $name, string $type, string $content): array
    {
        $tempDirectory = sys_get_temp_dir();
        $tempName = tempnam($tempDirectory, 'AliReaza');

        file_put_contents($tempName, $content);

        register_shutdown_function(function () use ($tempName): void {
            if (file_exists($tempName)) {
                unlink($tempName);
            }
        });

        return [
            'name' => $name,
            'type' => $type,
            'tmp_name' => $tempName,
            'error' => 0,
            'size' => filesize($tempName),
        ];
    }
}
