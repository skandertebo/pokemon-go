<?php
function generateRandomLocation($lat, $lng, $r) {
    $lat=deg2rad($lat);
    $lng=deg2rad($lng);
    $earthRadius = 6378137; // Earth's radius in meters
    $distance = $r / $earthRadius; // Convert range to radians
    $rand = mt_rand() / mt_getrandmax() * 2 * pi(); // Generate a random angle (in radians)
    $lat2 = asin(sin($lat) * cos($distance) + cos($lat) * sin($distance) * cos($rand)); // Calculate the latitude of the random location
    $lng2 = $lng + atan2(sin($rand) * sin($distance) * cos($lat), cos($distance) - sin($lat) * sin($lat2)); // Calculate the longitude of the random location
    return array($lat2 * 180 / pi(), $lng2 * 180 / pi()); // Convert latitude and longitude to degrees and return as an array
  }