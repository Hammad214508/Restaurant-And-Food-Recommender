<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Connector.php');

class FOOD_REVIEWS {


    public function get_food_stats($args){

        $conn = new Connector();

        $query = "SELECT round(AVG(RATING), 2) AS RATING, round(AVG(HEALTHY), 2) AS HEALTHY, round(AVG(FILLING), 2) AS FILLING
                  FROM FOOD_REVIEWS
                       INNER JOIN RATINGS ON FOOD_REVIEWS.FOOD_ID = RATINGS.FOOD_ID
                  WHERE FOOD_REVIEWS.FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }

    public function get_food_reviews($args){

        $conn = new Connector();

        $query = "SELECT REVIEW
                  FROM FOOD_REVIEWS
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }

}
