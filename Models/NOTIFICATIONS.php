<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class NOTIFICATIONS {

	public function send_connection_request($args){

		$conn = new Connector();

		$query = "INSERT INTO NOTIFICATIONS (TYPE, FROM_UID, TO_UID, MESSAGE)
				  VALUES (:TYPE, :FROM, :TO, :MESSAGE)";

		return $conn->perform_transaction($query, $args);
    }


    public function get_connection_requests($args){

		$conn = new Connector();

		$query = "SELECT U.USER_ID, U.NAME, U.SURNAME, U.EMAIL, N.MESSAGE 
                  FROM NOTIFICATIONS N
                  INNER JOIN USER U ON U.USER_ID = N.FROM_UID
                  WHERE N.TYPE = 'connection_request' 
                        AND N.TO_UID = :USER_ID;";
        
		return $conn->get_binded_data($query, $args);
	}


    public function delete_request($args){

		$conn = new Connector();

		$query = "DELETE 
				  FROM  NOTIFICATIONS 
				  WHERE TYPE = 'connection_request' 
				  		AND TO_UID = :MY_ID 
				  		AND FROM_UID = :OTHER_ID";
        
		return $conn->perform_transaction($query, $args);
	}
	

    


    

	
}
