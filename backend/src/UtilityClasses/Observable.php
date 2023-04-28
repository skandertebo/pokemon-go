<?php

namespace App\UtilityClasses;

class Observable {
    private array $observers = [];

    public function addObserver(Observer $observer): void {
        $this->observers[] = $observer;
    }

    public function notifyObservers(): void {
        foreach ($this->observers as $observer) {
            $observer->update();
        }
    }

    public function removeObserver(Observer $observer): void {
        $index = array_search($observer, $this->observers);
        if ($index !== false) {
            unset($this->observers[$index]);
        }
    }


}
