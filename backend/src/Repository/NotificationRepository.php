<?php

namespace App\Repository;

use App\Entity\Notification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Notification>
 *
 * @method Notification|null find($id, $lockMode = null, $lockVersion = null)
 * @method Notification|null findOneBy(array $criteria, array $orderBy = null)
 * @method Notification[]    findAll()
 * @method Notification[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notification::class);
    }

    public function save(Notification $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Notification $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function update(Notification $entity, $content): void
    {
        $entity->setContenu($content);
        $this->getEntityManager()->flush();
    }

    public function getNotificationsByPagination($page, $rows, $user = null){
        if(is_null($user)){
            $notifications = $this->createQueryBuilder('n')
                ->orderBy('n.id', 'DESC')
                ->setFirstResult($rows * ($page - 1))
                ->setMaxResults($rows)
                ->getQuery()
                ->getResult();
        }else{
            $notifications = $this->createQueryBuilder('n')
                ->leftJoin('n.userNotifications', 'un')
                ->where('un.user = :user')
                ->setParameter('user', $user)
                ->orderBy('n.id', 'DESC')
                ->setFirstResult($rows * ($page - 1))
                ->setMaxResults($rows)
                ->getQuery()
                ->getResult();
        }
    }

//    /**
//     * @return Notification[] Returns an array of Notification objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Notification
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
