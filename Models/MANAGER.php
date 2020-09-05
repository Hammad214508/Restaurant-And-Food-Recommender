<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Connector.php');

class MANAGER {


	public function check_registered($args){

		$conn = new Connector();

		$query = "SELECT EXISTS (SELECT * FROM MANAGER WHERE EMAIL = :EMAIL) AS ISTHERE;";

		return $conn->get_binded_data($query, $args);
	}

	public function register_manager($args){

		$conn = new Connector();

		$query = "INSERT INTO MANAGER (NAME, SURNAME, EMAIL, PASSWORD)
			      VALUES (:NAME, :SURNAME, :EMAIL, :PASSWORD);";

		return $conn->perform_transaction($query, $args);
	}



}
