<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class RATINGS {

    public function add_rating($args){

		$conn = new Connector();

		$query = "INSERT INTO RATINGS (USER_ID, FOOD_ID, RATING)
				  VALUES (:USER_ID, :FOOD_ID, :RATING)";
        
		return $conn->perform_transaction($query, $args);
	}
	

    


    

	
}
