<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class JwtRequestSubscriber implements EventSubscriberInterface
{
    private $jwtEncoder;
    public function __construct(JWTEncoderInterface $jwtEncoder)
    {
        $this->jwtEncoder = $jwtEncoder;
    }
    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        // Check if the Authorization header exists and starts with 'Bearer '
        $authorizationHeader = $request->headers->get('Authorization');
        if ($authorizationHeader && preg_match('/Bearer\s+(.*)$/i', $authorizationHeader, $matches)) {
            $jwt = $matches[1];

            // Decode the JWT and get the payload
            $payload = $this->jwtEncoder->decode($jwt);

            // Add the payload as an attribute to the request object
            $request->attributes->set('jwt_payload', $payload);
    }}

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }
}
