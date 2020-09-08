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


}
