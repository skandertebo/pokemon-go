<?php
namespace App\DTO;



use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\GroupSequenceProviderInterface;
class AddUserDTO implements GroupSequenceProviderInterface
{

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Email]
    private  $email = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    private  $password = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Choice(
        choices: ['admin', 'player'],
        message: 'Choose a valid role.',
    )]
    private  $role= null;

    #[Assert\NotBlank(groups: ['playerSpecific'])]
    #[Assert\NotNull(groups: ['playerSpecific'])]
    #[ORM\Column(length: 255,nullable:true)]
    #[Assert\Type(type:"string")]
    private  $image = null;

    #[Assert\NotBlank(groups: ['playerSpecific'])]
    #[Assert\NotNull(groups: ['playerSpecific'])]
    #[ORM\Column(length: 180, unique: true)]
    #[Assert\Type(type:"string")]
    private $playerTag;

    public function getGroupSequence(): array
    {    dd('getGroupSequence() called');
        $groups = ['Default'];
        if ($this->role === 'player') {
            $groups[] = 'playerSpecific';
        }
        return $groups;
    }

   

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->role = $data['role'] ?? null;
        if ($this->role==='player' ){
        $this->image = $data['image'] ?? null;
        $this->playerTag = $data['playerTag'] ?? null;}
    }
}
