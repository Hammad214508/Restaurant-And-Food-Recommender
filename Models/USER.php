<?php
include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Connector.php');

class USER {


	public function check_registered($args){

		$conn = new Connector();

		$query = "SELECT EXISTS (SELECT * FROM USER WHERE EMAIL = :EMAIL) AS ISTHERE;";

		return $conn->get_binded_data($query, $args);
	}

	public function register_user($args){

		$conn = new Connector();

		$query = "INSERT INTO USER (NAME, SURNAME, EMAIL, PASSWORD)
			      VALUES (:NAME, :SURNAME, :EMAIL, :PASSWORD);";

		return $conn->perform_transaction($query, $args);
	}



}
