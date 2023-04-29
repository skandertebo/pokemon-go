<?php
// the latitude and longitude values should be in decimal degrees, not degrees-minutes-seconds.
function getDistance($lat1,$lon1,$lat2,$lon2)
{
    $r = 6371; // Earth's radius in kilometers
  
    // Convert latitude and longitude to radians
    $lat1 = deg2rad($lat1);
    $lon1 = deg2rad($lon1);
    $lat2 = deg2rad($lat2);
    $lon2 = deg2rad($lon2);
    
    // Calculate the great-circle distance using the Haversine formula
    $deltaLat = $lat2 - $lat1;
    $deltaLon = $lon2 - $lon1;
    $a = sin($deltaLat/2) * sin($deltaLat/2) + cos($lat1) * cos($lat2) * sin($deltaLon/2) * sin($deltaLon/2);
    $c = 2 * asin(sqrt($a));
    $distance = $r * $c;
    
    // Return the distance in kilometers
    return $distance;
}