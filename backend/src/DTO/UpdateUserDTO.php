<?php
namespace App\DTO;



use Symfony\Component\Validator\Constraints as Assert;
class UpdateUserDTO 
{

    
    #[Assert\Email]
    private  $email = null;

    
    #[Assert\Type(type:"string")]
    private  $password = null;

    
    #[Assert\Type(type:"string")]
    private  $image = null;


    #[Assert\Type(type:"string")]
    #[Assert\Length(
        min: 3,
        max: 30,
        minMessage: 'Your first name must be at least {{ limit }} characters long',
        maxMessage: 'Your first name cannot be longer than {{ limit }} characters',
    )]
    private $playerTag=null;

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->image = $data['image'] ?? null;
        $this->playerTag = $data['playerTag'] ?? null;
        
        
    }


}