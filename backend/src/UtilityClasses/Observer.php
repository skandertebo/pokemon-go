<?php

namespace App\UtilityClasses;

use App\Entity\Notification;

interface Observer{

  public function update(Notification $notification);
}