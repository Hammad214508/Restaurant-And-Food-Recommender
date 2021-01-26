<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class RATINGS {

    // public function get_connection_requests($args){

	// 	$conn = new Connector();

	// 	$query = "SELECT U.USER_ID, U.NAME, U.SURNAME, U.EMAIL, N.MESSAGE 
    //               FROM NOTIFICATIONS N
    //               INNER JOIN USER U ON U.USER_ID = N.FROM_UID
    //               WHERE N.TYPE = 'connection_request' 
    //                     AND N.TO_UID = :USER_ID;";
        
	// 	return $conn->get_binded_data($query, $args);
	// }


    public function add_rating($args){

		$conn = new Connector();

		$query = "INSERT INTO RATINGS (USER_ID, FOOD_ID, RATING)
				  VALUES (:USER_ID, :FOOD_ID, :RATING)";
        
		return $conn->perform_transaction($query, $args);
	}
	

    


    

	
}
