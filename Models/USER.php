<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class USER {

	public function check_registered($args){

		$conn = new Connector();

		$query = "SELECT EXISTS (SELECT * FROM USER WHERE EMAIL = :EMAIL) AS ISTHERE;";

		return $conn->get_binded_data($query, $args);
	}

	public function register_user($args){

		$conn = new Connector();

		$query = "INSERT INTO USER (NAME, SURNAME, EMAIL, PASSWORD, GOOGLE_LOGIN)
			      VALUES (:NAME, :SURNAME, :EMAIL, :PASSWORD, :GOOGLE_LOGIN);";

		return $conn->perform_transaction($query, $args);
	}

	public function get_user_data($args){

		$data = array(
			":EMAIL" => $args["EMAIL"]
		);

		$conn = new Connector();

		$query = "SELECT *
				  FROM USER
				  WHERE EMAIL = :EMAIL;";

		return $conn->get_binded_data($query, $data);
	}

	public function get_users($args){
		$data = array(
				":SEARCH1"=>"%".strtolower($args["SEARCH"])."%",
				":SEARCH2"=>"%".strtolower($args["SEARCH"])."%",
		);

		$conn = new Connector();

		$query = "SELECT USER_ID AS ID, CONCAT(NAME, ' ', SURNAME) AS ITEM
							FROM USER
							WHERE LOWER(NAME) LIKE :SEARCH1
								    OR LOWER(SURNAME) LIKE :SEARCH2;";

		return $conn->get_binded_data($query, $data);
	}

	public function get_profile_data($args){

		$conn = new Connector();

		$query = "SELECT NAME, SURNAME, EMAIL, DIET_TYPE
				  FROM USER
				  WHERE USER_ID = :USER_ID;";

		return $conn->get_binded_data($query, $args);
	}

	public function update_user_profile_data($args){

		$conn = new Connector();

		$query = "UPDATE USER
				  SET NAME =:NAME,
				      SURNAME = :SURNAME,
					  DIET_TYPE = :DIET_TYPE
				  WHERE USER_ID = :USER_ID;";

		return $conn->perform_transaction($query, $args);
	}







}
