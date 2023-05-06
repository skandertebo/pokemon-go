<?php

namespace App\Controller;

use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;

use function App\createErrorResponse;

#[Route('public/', name: 'app_file')]
class FileController extends AbstractController
{
    #[Route('image/{filename}', name: 'app_file')]
    public function serveImage($filename): Response
    {
    $path = '../public/files/images/'.$filename;
    
    try {
        $response = new BinaryFileResponse($path);
        $response->headers->set('Content-Type', 'image/jpg');
        return $response;
    } catch (Exception $e) {
        return createErrorResponse('File' . $filename . 'was not found',404);
    }
    }



    #[Route('/file/{filename}', name: '_files')]
    public function serveModel($filename)
    {
        $path = '../public/files/3Dmodels/'.$filename;
    
        try {
            $response = new BinaryFileResponse($path);
            $array = explode(".", $filename);
            if($array[1]=="gltf")
            {
                $response->headers->set('Content-Type', 'model/gltf-binary');
            }
            else
            {
                $response->headers->set('Content-Type', 'application/octet-stream');
            }
                
            return $response;
        } catch (FileNotFoundException $e) {
            return createErrorResponse('File' . $filename . 'was not found',404);
        }
    }
}
