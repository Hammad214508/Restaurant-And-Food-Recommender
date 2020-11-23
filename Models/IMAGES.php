<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class IMAGES {

    public function save_image($args){

        $conn = new Connector();

        $data = array(
            "ENTITY_ID" => $args["ENTITY_ID"],
            "ENTITY_TYPE" => $args["ENTITY_TYPE"],
            "IMAGE_NAME" => $args["IMAGE_NAME"]
        );

        if ($args["IMAGE_EXISTS"] == "true"){
            $query = "UPDATE IMAGES
                      SET IMAGE_NAME = :IMAGE_NAME
                      WHERE ENTITY_ID = :ENTITY_ID
                            AND ENTITY_TYPE = :ENTITY_TYPE";
        }else{
            $query = "INSERT INTO IMAGES (ENTITY_ID, ENTITY_TYPE, IMAGE_NAME)
                      VALUES (:ENTITY_ID, :ENTITY_TYPE, :IMAGE_NAME)";
        }

        return $conn->perform_transaction($query, $data);
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
