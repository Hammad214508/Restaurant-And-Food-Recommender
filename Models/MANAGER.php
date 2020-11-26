<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class MANAGER {


	public function check_registered($args){

		$conn = new Connector();

		$query = "SELECT EXISTS (SELECT * FROM MANAGER WHERE EMAIL = :EMAIL) AS ISTHERE;";

		return $conn->get_binded_data($query, $args);
	}

	public function register_manager($args){

		$conn = new Connector();

		$query = "INSERT INTO MANAGER (NAME, SURNAME, EMAIL, PASSWORD, GOOGLE_LOGIN)
			      VALUES (:NAME, :SURNAME, :EMAIL, :PASSWORD, :GOOGLE_LOGIN);";

		return $conn->perform_transaction($query, $args);
	}


	public function get_manager_data($args){

		$data = array(
			":EMAIL" => $args["EMAIL"]
		);

		$conn = new Connector();

		$query = "SELECT *
				  FROM MANAGER
				  WHERE EMAIL = :EMAIL;";

		return $conn->get_binded_data($query, $data);
	}


}
