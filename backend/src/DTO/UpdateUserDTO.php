<?php
namespace App\DTO;



use Symfony\Component\Validator\Constraints as Assert;
class UpdateUserDTO 
{

    
    #[Assert\Email]
    public $email = null;

    
    #[Assert\Type(type:"string")]
    public   $password = null;

    
    #[Assert\File(
        maxSize: '5120k',
        extensions: ['jpg','png'],
        extensionsMessage: 'Please upload a valid image: max size is 1MB and allowed extensions are jpg and png',
    )]
    public  $image = null;


    #[Assert\Type(type:"string")]
    #[Assert\Length(
        min: 3,
        max: 30,
        minMessage: 'Your first name must be at least {{ limit }} characters long',
        maxMessage: 'Your first name cannot be longer than {{ limit }} characters',
    )]
    public $playerTag=null;

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? null;
        $this->password = $data['password'] ?? null;
        $this->image = $data['image'] ?? null;
        $this->playerTag = $data['playerTag'] ?? null;
        
        
    }


}