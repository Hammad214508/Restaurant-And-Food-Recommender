<?php
include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Database.php');

class Connector{
	// Creating and returning a database connection


	public function perform_transaction($query, $data){
		try {
			$database = new Database();
			$conn  = $database -> connection();
			$stmt = $conn->prepare($query);
			$res = $stmt->execute($data);
			return array("success" => true, "dataset" => "Transaction went through successfully...");
		} catch(PDOException $e) {
			return array("success" => false, "dataset" => $e->getMessage());
		}
	}

	public function get_binded_data($query){
		try {
			$database = new Database();
			$conn  = $database -> connection();
			$result = $conn->query($query);

			// Create an array with all the rows
			$data = array();
			while($row = $result->fetchAll(PDO::FETCH_ASSOC)){
				array_push($data, $row);
			}

			// Close connection
			unset($result);

			return array("success" => true, "dataset" => $data);

		} catch(PDOException $e) {
			return array("success" => false, "dataset" => $e->getMessage());
		}
	}
}
