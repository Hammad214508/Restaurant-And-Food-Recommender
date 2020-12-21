<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class FOOD_REVIEWS {

    public function get_food_reviews($args){

        $conn = new Connector();

        $query = "SELECT REVIEW
                  FROM FOOD_REVIEWS
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }



}
