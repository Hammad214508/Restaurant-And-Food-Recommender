<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/Connector.php');

class EVENTS {

    public function get_user_events($args){

        $conn = new Connector();

        $query = "SELECT E.EVENT_ID, E.EVENT_NAME
                  FROM EVENTS E
                  INNER JOIN EVENT_USERS EU ON E.EVENT_ID = EU.EVENT_ID
                  WHERE EU.USER_ID = :USER_ID;";

        return $conn->get_binded_data($query, $args);
    }


    public function get_event_data($args){

        $conn = new Connector();

        $query = "SELECT E.EVENT_ID, E.EVENT_NAME, E.EVENT_TIME,  GROUP_CONCAT(U.USER_ID) AS IDS, GROUP_CONCAT(CONCAT(U.NAME, ' ', U.SURNAME)) AS USERS, GROUP_CONCAT(DISTINCT EL.LOCATION) AS LOCATIONS
                  FROM EVENTS E
                  INNER JOIN EVENT_USERS EU ON E.EVENT_ID = EU.EVENT_ID
                  INNER JOIN EVENT_LOCATIONS EL ON E.EVENT_ID = EL.EVENT_ID
                  INNER JOIN USER U ON EU.USER_ID = U.USER_ID
                  WHERE E.EVENT_ID = :EVENT_ID
                  GROUP BY E.EVENT_ID;";
        
        // echo $query;

        return $conn->get_binded_data($query, $args);
    }



    

}
