<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Database.php');

class Connector{
	// Creating and returning a database connection

	public function perform_transaction($query, $data){
		try {
			$database = new Database();
			$conn  = $database -> connection();
			$stmt = $conn->prepare($query);
			$res = $stmt->execute($data);
			return array("success" => true, "dataset" => array("LAST_ID" => $conn->lastInsertId(), "Transaction went through successfully..."));
		} catch(PDOException $e) {
			return array("success" => false, "dataset" => $e->getMessage());
		}
	}

	public function get_binded_data($query, $data){
		try {
			$database = new Database();
			$conn  = $database -> connection();
			$stmt = $conn->prepare($query);
			$stmt->execute($data);
			// Create an array with all the rows
			$data = array();
			while($row = $stmt->fetchAll(PDO::FETCH_ASSOC)){
				array_push($data, $row);
			}
			// Close connection
			unset($stmt);
			return array("success" => true, "dataset" => $data);

		} catch(PDOException $e) {
			return array("success" => false, "dataset" => $e->getMessage());
		}
	}
}
