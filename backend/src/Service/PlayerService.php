<?php 

namespace App\Service;


use App\Repository\PlayerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

use App\Entity\Admin;
use App\Entity\Player;

class PlayerService
{
    

    public function __construct(private PlayerRepository $playerRepository )
    { }

}