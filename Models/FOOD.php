<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

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

        $query = "INSERT INTO FOOD (NAME, PRICE, DESCRIPTION, RESTAURANT_ID, AVAILABLE, DIET_TYPE, HEALTHY_RATING, FILLING_RATING)
                  VALUES (:NAME, :PRICE, :DESCRIPTION, :RESTAURANT_ID, 'false', :DIET_TYPE, :HEALTHY_RATING, :FILLING_RATING)";

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

        $query = "SELECT F.FOOD_ID, F.NAME, F.PRICE, F.DESCRIPTION, F.DIET_TYPE, F.HEALTHY_RATING, F.FILLING_RATING, F.AVG_RATING, R.NAME AS RESTAURANT_NAME, R.LATITUDE, R.LONGITUDE
                  FROM FOOD F
                  INNER JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID
                  WHERE FOOD_ID = :FOOD_ID;";

        return $conn->get_binded_data($query, $args);
    }

    public function get_all_food_items($args){

        $conn = new Connector();

        $query = "SELECT F.FOOD_ID, F.NAME, F.PRICE, F.DESCRIPTION, F.DIET_TYPE, F.HEALTHY_RATING, F.FILLING_RATING, F.AVG_RATING, R.NAME AS RESTAURANT_NAME, IM.IMAGE_NAME
                  FROM FOOD F
                  INNER JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID
                  LEFT JOIN IMAGES IM ON F.FOOD_ID = ENTITY_ID
                                         AND ENTITY_TYPE = 'FOOD'
                  WHERE LOWER(F.NAME) LIKE '%".$args["SEARCH"]."%'";

        if ($args["AVAILABLE"]){
            $query .= " AND F.AVAILABLE = 'true'
                        AND NOW() BETWEEN R.OPENING_TIME AND R.CLOSING_TIME";
        }

        if ($args["FILLING_RATING"]){
            $query .= " AND F.FILLING_RATING BETWEEN ".($args['FILLING_RATING']-1)." AND ".($args['FILLING_RATING']+1);
        }

        if ($args["HEALTHY_RATING"]){
            $query .= " AND F.FILLING_RATING BETWEEN ".($args['HEALTHY_RATING']-1)." AND ".($args['HEALTHY_RATING']+1);
        }

        if ($args["DIET_TYPE"] && $args["DIET_TYPE"] != "0"){
            $query .= " AND DIET_TYPE >= ".$args["DIET_TYPE"];
        }

        if ($args["SORTING"] == "ratings"){
            $query .= " ORDER BY AVG_RATING DESC";
        }

        if ($args["SORTING"] == "reviews"){

            $query = "SELECT F.FOOD_ID, F.NAME, F.PRICE, F.DESCRIPTION, F.DIET_TYPE, F.HEALTHY_RATING, F.FILLING_RATING, F.AVG_RATING, R.NAME AS RESTAURANT_NAME, COUNT(F.FOOD_ID) AS NUM_REVIEWS, IM.IMAGE_NAME
                      FROM RATINGS RT, RESTAURANT R, FOOD F
                      LEFT JOIN IMAGES IM ON F.FOOD_ID = IM.ENTITY_ID
                                          AND IM.ENTITY_TYPE = 'FOOD'
                      WHERE R.RESTAURANT_ID = F.RESTAURANT_ID
                            AND F.FOOD_ID = RT.FOOD_ID
                      GROUP BY F.FOOD_ID
                      ORDER BY NUM_REVIEWS DESC";
        }

        return $conn->get_binded_data($query, $args);
    }


    public function update_food_stats($food_id){
        $args = array(
            "FOOD_ID"=> $food_id,
            "FOOD_ID1"=> $food_id,
            "FOOD_ID2"=> $food_id,
            "FOOD_ID3"=> $food_id
        );

        $conn = new Connector();

        $query = "UPDATE FOOD F
                  SET AVG_RATING = (SELECT ROUND(AVG(R.RATING), 2)
                                    FROM RATINGS R
                                    WHERE R.FOOD_ID = :FOOD_ID),
                     HEALTHY_RATING = (SELECT ROUND(AVG(FR.HEALTHY), 2)
                                       FROM FOOD_REVIEWS FR
                                       WHERE FR.FOOD_ID = :FOOD_ID1),
                     FILLING_RATING = (SELECT ROUND(AVG(FR.FILLING), 2)
                                       FROM FOOD_REVIEWS FR
                                       WHERE FR.FOOD_ID = :FOOD_ID2)
                  WHERE F.FOOD_ID = :FOOD_ID3;";

        return $conn->perform_transaction($query, $args);
    }

    public function get_random_items($args, $num_items){

        $conn = new Connector();

        $query = "SELECT F.FOOD_ID, F.NAME, F.DESCRIPTION, IM.IMAGE_NAME
                  FROM FOOD F
                  LEFT JOIN IMAGES IM ON F.FOOD_ID = ENTITY_ID
                                         AND ENTITY_TYPE = 'FOOD'
                  WHERE F.FOOD_ID NOT IN (
                      SELECT FOOD_ID
                      FROM RATINGS
                      WHERE USER_ID = :USER_ID
                  )
                  ORDER BY RAND()
                  LIMIT ".$num_items;
        return $conn->get_binded_data($query, $args);
    }


}
