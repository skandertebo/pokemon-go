<?php

use Symfony\Component\HttpFoundation\JsonResponse;


function createErrorResponse($message,$status)
{
    $response = new JsonResponse([
        'error' => [
            'code' => $status,
            'message' => $message,
        ]
    ], $status);
    return $response;
}