<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class NOTIFICATIONS {


	public function send_connection_request($args){

		$conn = new Connector();

		$query = "INSERT INTO NOTIFICATIONS (TYPE, FROM_UID, TO_UID, MESSAGE)
				  VALUES (:TYPE, :FROM, :TO, :MESSAGE)";

		return $conn->perform_transaction($query, $args);
	}

	
}
