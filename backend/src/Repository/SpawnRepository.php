<?php

namespace App\Repository;

use App\Entity\Spawn;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Spawn>
 *
 * @method Spawn|null find($id, $lockMode = null, $lockVersion = null)
 * @method Spawn|null findOneBy(array $criteria, array $orderBy = null)
 * @method Spawn[]    findAll()
 * @method Spawn[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpawnRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Spawn::class);
    }

    public function save(Spawn $entity, bool $flush = false): Spawn
    {
        $this->getEntityManager()->persist($entity);
        if ($flush) {
            dump($entity);
            $this->getEntityManager()->flush();
        }
        return $entity;
    }

    public function remove(Spawn $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Spawn[] Returns an array of Spawn objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Spawn
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
