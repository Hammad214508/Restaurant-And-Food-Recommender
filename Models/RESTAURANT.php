<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class RESTAURANT {

	public function add_restaurant($args){

		$conn = new Connector();

		$query = "INSERT INTO RESTAURANT (MANAGER_ID)
			      VALUES (:MANAGER_ID);";

		return $conn->perform_transaction($query, $args);
	}

    public function get_restaurant($args){

        $conn = new Connector();

        $query = "SELECT *
                  FROM RESTAURANT
                  WHERE MANAGER_ID = :MANAGER_ID;";

        return $conn->get_binded_data($query, $args);
    }

    public function update_restaurant($args){

        $conn = new Connector();

        $query = "UPDATE RESTAURANT
                  SET
                    NAME = :NAME,
                    EMAIL = :EMAIL,
                    NUMBER = :NUMBER,
                    ADDRESS = :ADDRESS,
                    WEBSITE = :WEBSITE,
                    OPENING_TIME = :OPENING_TIME,
                    CLOSING_TIME = :CLOSING_TIME
                  WHERE MANAGER_ID = :MANAGER_ID;";

        return $conn->perform_transaction($query, $args);
    }

    public function get_all_restaurants($args){
    
        $conn = new Connector();

        $query = "SELECT RESTAURANT_ID, NAME, EMAIL, NUMBER, ADDRESS, RATING, OPENING_TIME, CLOSING_TIME
                  FROM RESTAURANT
                  WHERE LOWER(NAME) LIKE '%".$args["SEARCH"]."%'";
                 
        if ($args["OPEN"]){
            $query .= " AND NOW() BETWEEN OPENING_TIME AND CLOSING_TIME";
        }

        if ($args["SORTING"] == "ratings"){
            $query .= " ORDER BY RATING DESC";
        }

        if ($args["SORTING"] == "reviews"){
            $query = "SELECT R.RESTAURANT_ID, R.NAME, R.EMAIL, R.NUMBER, R.ADDRESS, R.RATING, R.OPENING_TIME, R.CLOSING_TIME, COUNT(RT.FOOD_ID) AS NUM_REVIEWS
                      FROM RESTAURANT R, FOOD F, RATINGS RT
                        WHERE R.RESTAURANT_ID = F.RESTAURANT_ID 
                        AND F.FOOD_ID = RT.FOOD_ID
                      GROUP BY R.RESTAURANT_ID 
                      ORDER BY NUM_REVIEWS DESC";
        }

        return $conn->get_binded_data($query, array());
    }

}
