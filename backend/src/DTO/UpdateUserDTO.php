<?php
namespace App\DTO;



use Symfony\Component\Validator\Constraints as Assert;
class UpdateUserDTO 
{

    
    #[Assert\Email]
    private  $email = null;

    
    #[Assert\Type(type:"string")]
    private  $password = null;

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        
        
    }


}