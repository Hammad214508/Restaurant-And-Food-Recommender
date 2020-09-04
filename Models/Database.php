<?php

class Database{

	public function connection(){
		// PDO connection parameters

        $host = 'localhost';
        $dbname = 'my_database';
        $username = 'root';
        $password = '';

	    try {
            $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
	        // set the PDO error mode to exception
	        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;

	    } catch(PDOException $e) {
            die("Could not connect to the database $dbname :" . $e->getMessage()+"\n");
	    }

	}

}
