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

        $rating = "(SELECT AVG(RATING) AS RATING
                    FROM RATINGS
                    WHERE FOOD_ID IN
                        (SELECT FOOD_ID 
                        FROM FOOD 
                        WHERE FOOD.RESTAURANT_ID = RESTAURANT.RESTAURANT_ID))";

        $query = "SELECT RESTAURANT_ID, NAME, EMAIL, NUMBER, ADDRESS, ROUND(".$rating.", 2) AS RATING, OPENING_TIME, CLOSING_TIME
                  FROM RESTAURANT
                  WHERE LOWER(NAME) LIKE '%".$args["SEARCH"]."%'";
                 
        if ($args["OPEN"]){
            $query .= " AND NOW() BETWEEN OPENING_TIME AND CLOSING_TIME;";
        }

        return $conn->get_binded_data($query, array());
    }

}
