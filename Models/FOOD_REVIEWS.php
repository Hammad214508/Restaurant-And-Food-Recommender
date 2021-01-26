<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class FOOD_REVIEWS {

    public function get_food_reviews($args){

        $conn = new Connector();

        $query = "SELECT FR.REVIEW, FR.RATING, FR.HEALTHY, FR.FILLING, U.NAME, U.SURNAME 
                  FROM FOOD_REVIEWS FR
                  INNER JOIN USER U ON FR.USER_ID = U.USER_ID
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }



}
