<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/Connector.php');

class IMAGES {

    public function save_image($args){

        $conn = new Connector();

        $query = "INSERT INTO IMAGES (ENTITY_ID, ENTITY_TYPE, IMAGE_NAME)
                  VALUES (:ENTITY_ID, :ENTITY_TYPE, :IMAGE_NAME)";

        return $conn->perform_transaction($query, $args);
    }

    public function get_image($args){

        $conn = new Connector();

        $query = "SELECT IMAGE_NAME
                  FROM IMAGES
                  WHERE ENTITY_ID = :ENTITY_ID
                        AND ENTITY_TYPE = :ENTITY_TYPE;";

        return $conn->get_binded_data($query, $args);
    }



}
