<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Connector.php');

class FOOD {


    public function get_food_items($args){

        $conn = new Connector();

        $query = "SELECT *
                  FROM FOOD
                  WHERE RESTAURANT_ID = :RESTAURANT_ID;";

        return $conn->get_binded_data($query, $args);
    }

    public function update_food_item($args){
        $data = array(
            "VALUE" => $args["VALUE"],
            "FOOD_ID" => $args["FOOD_ID"]
        );

        $conn = new Connector();

        $query = "UPDATE FOOD SET ".$args['COLUMN']."=:VALUE WHERE FOOD_ID = :FOOD_ID";

        return $conn->perform_transaction($query, $data);
    }


    public function add_new_food($args){

        $conn = new Connector();

        $query = "INSERT INTO FOOD (NAME, PRICE, DESCRIPTION, RESTAURANT_ID, AVAILABLE)
                  VALUES (:NAME, :PRICE, :DESCRIPTION, :RESTAURANT_ID, 'Y')";

        return $conn->perform_transaction($query, $args);
    }


    public function get_today_menu($args){

        $conn = new Connector();

        $query = "SELECT *
                  FROM FOOD
                  WHERE
                    RESTAURANT_ID = :RESTAURANT_ID
                    AND AVAILABLE = 'true'";

        return $conn->get_binded_data($query, $args);
    }

    public function get_food_item_by_id($args){

        $conn = new Connector();

        $query = "SELECT *
                  FROM FOOD
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }








}
