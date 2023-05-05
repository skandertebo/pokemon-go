<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

use function App\createErrorResponse;

#[Route('/file', name: '_files')]
class FileController extends AbstractController
{
    #[Route('/{filename}', name: 'app_file')]
    public function serveFile($filename): Response
    {
    $path = '../public/files/images/'.$filename;

    try {
        $response = new BinaryFileResponse($path);
        $response->headers->set('Content-Type', 'image/jpg');
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $filename);
        return $response;
    } catch (FileNotFoundException $e) {
        // Handle the case where the file doesn't exist
        throw createErrorResponse('File' . $filename . 'was not found',404);
    }
    }
}
