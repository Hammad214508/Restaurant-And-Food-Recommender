<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class CONNECTIONS {

	public function get_connections($args){

		$conn = new Connector();

		$query = "SELECT U.USER_ID, U.NAME, U.SURNAME, U.EMAIL
              FROM  CONNECTIONS C
              INNER JOIN USER U ON U.USER_ID = C.USER2
							WHERE C.USER1 = :USER_ID";

		return $conn->get_binded_data($query, $args);
	}

	public function delete_connection($args){

		$conn = new Connector();

		$query = "DELETE 
				  FROM  CONNECTIONS 
				  WHERE USER1 = :USER1 
				  		AND USER2 = :USER2";

		return $conn->perform_transaction($query, $args);
	}

	public function get_recommended_users($args){

		$conn = new Connector();

		$query = "SELECT  U.USER_ID, U.NAME, U.SURNAME, U.EMAIL
				  FROM  USER U 
				  WHERE U.USER_ID NOT IN
				  		(SELECT USER2 
						 FROM CONNECTIONS 
						 WHERE USER1 = :USER_ID)";

		return $conn->get_binded_data($query, $args);
	}

	



	

}
