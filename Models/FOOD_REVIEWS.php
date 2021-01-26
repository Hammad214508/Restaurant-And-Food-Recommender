<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class FOOD_REVIEWS {

    public function get_food_reviews($args){

        $conn = new Connector();

        $query = "SELECT FR.REVIEW_ID, FR.REVIEW, FR.RATING, FR.HEALTHY, FR.FILLING, U.NAME, U.SURNAME 
                  FROM FOOD_REVIEWS FR
                  INNER JOIN USER U ON FR.USER_ID = U.USER_ID
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }


    public function add_review($args){

        $conn = new Connector();

        $query = "INSERT INTO FOOD_REVIEWS(FOOD_ID, USER_ID, RATING, REVIEW, HEALTHY, FILLING)
                  VALUES (:FOOD_ID, :USER_ID, :RATING, :REVIEW, :HEALTHY, :FILLING)";

        return $conn->perform_transaction($query, $args);
    }
    



}
