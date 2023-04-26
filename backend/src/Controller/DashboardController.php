<?php
  
namespace App\Controller;
  
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Config\packages\security\access_controlConfig;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Route("/api", name="api_")
 */
  
class DashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", name="dashboard")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function adminAccess(AuthorizationCheckerInterface $authorizationChecker): Response
    {
        if (!$authorizationChecker->isGranted('ROLE_ADMIN')) {
            throw new AccessDeniedException();
        }
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/DashboardController.php',
        ]);
    }


    /**
     * @Route("/dashboardPlayer", name="dashboard1")
     * @Security("is_granted('ROLE_USER')")
     */
    public function playerAccess(AuthorizationCheckerInterface $authorizationChecker): Response
    {
        if (!$authorizationChecker->isGranted('ROLE_USER')) {
            throw new AccessDeniedException();
        }
        return $this->json([
            'message' => 'Welcome to your new Player controller!',
        ]);
    }

}