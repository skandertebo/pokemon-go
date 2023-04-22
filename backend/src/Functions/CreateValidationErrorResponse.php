<?php

use Symfony\Component\HttpFoundation\JsonResponse;


//this functions gets an array of errors (you get this whene you use the ValidationInterface) and returns a JsonResponse which you can return to the client
function createValidationErrorResponse($errors)
{
    $details = [];
    foreach ($errors as $error) {
        $details[] = [
            'field' => $error->getPropertyPath(),
            'message' => $error->getMessage()
        ];
    }
    $response = new JsonResponse([
        'error' => [
            'code' => 400,
            'message' => 'Validation error',
            'details' => $details
        ]
    ], 400);
    return $response;
}