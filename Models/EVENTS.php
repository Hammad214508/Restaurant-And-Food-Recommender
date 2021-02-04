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

        $query = "SELECT E.EVENT_ID, E.CREATOR_ID, E.NUM_VOTES, E.EVENT_NAME, DATE_FORMAT(E.EVENT_DATE, '%d-%m-%Y') EVENT_DATE, 
                         E.EVENT_TIME,  GROUP_CONCAT(EU.USER_ID) AS IDS, GROUP_CONCAT(CONCAT(U.NAME, ' ', U.SURNAME)) AS USERS, 
                         GROUP_CONCAT(DISTINCT EL.LOCATION) AS LOCATIONS
                  FROM EVENTS E
                  INNER JOIN EVENT_USERS EU ON E.EVENT_ID = EU.EVENT_ID
                  LEFT JOIN EVENT_LOCATIONS EL ON E.EVENT_ID = EL.EVENT_ID
                  LEFT JOIN USER U ON EU.USER_ID = U.USER_ID
                  WHERE E.EVENT_ID = :EVENT_ID
                  GROUP BY E.EVENT_ID;";
        
        return $conn->get_binded_data($query, $args);
    }

    public function update_event_data($args){

        $conn = new Connector();

        $query = "UPDATE EVENTS
                    SET EVENT_NAME = :EVENT_NAME,
                        EVENT_DATE = :EVENT_DATE, 
                        EVENT_TIME = :EVENT_TIME,
                        NUM_VOTES = :NUM_VOTES
                  WHERE EVENT_ID = :EVENT_ID;";

        return $conn->perform_transaction($query, $args);
    }


    public function insert_event_user($args){

        $conn = new Connector();

        $query = "INSERT INTO EVENT_USERS(EVENT_ID, USER_ID)
                  VALUES (:EVENT_ID, :USER_ID)";

        return $conn->perform_transaction($query, $args);
    }


    public function delete_event_user($args){

        $conn = new Connector();

        $query = "DELETE FROM EVENT_USERS
                  WHERE EVENT_ID = :EVENT_ID
                        AND USER_ID = :USER_ID;";

        return $conn->perform_transaction($query, $args);
    }

    public function insert_event_location($args){

        $conn = new Connector();

        $query = "INSERT INTO EVENT_LOCATIONS(EVENT_ID, LOCATION)
                  VALUES (:EVENT_ID, :LOCATION)";

        return $conn->perform_transaction($query, $args);
    }


    public function delete_event_location($args){

        $conn = new Connector();

        $query = "DELETE FROM EVENT_LOCATIONS
                  WHERE EVENT_ID = :EVENT_ID
                        AND LOCATION = :LOCATION;";

        return $conn->perform_transaction($query, $args);
    }

    public function insert_new_event($args){

        $conn = new Connector();

        $query = "INSERT INTO EVENTS(EVENT_NAME, EVENT_DATE, EVENT_TIME, CREATOR_ID)
                  VALUES (:EVENT_NAME, :EVENT_DATE, :EVENT_TIME, :USER_ID);";

        return $conn->perform_transaction($query, $args);
    }


    public function delete_event($args){

        $conn = new Connector();


        $query = "DELETE FROM EVENTS WHERE EVENT_ID = :EVENT_ID1;
                  DELETE FROM EVENT_LOCATIONS WHERE EVENT_ID = :EVENT_ID2;
                  DELETE FROM EVENT_USERS WHERE EVENT_ID = :EVENT_ID3;";

        return $conn->perform_transaction($query, $args);
    }

    public function get_users_votes($args){

        $conn = new Connector();

        $query = "SELECT USER_ID, VOTES
                  FROM EVENT_USERS
                  WHERE EVENT_ID = :EVENT_ID";

        return $conn->get_binded_data($query, $args);
    }
    

    public function update_users_vote($args){

        $conn = new Connector();

        $query = "UPDATE EVENT_USERS
                  SET VOTES = :VOTES
                  WHERE EVENT_ID = :EVENT_ID
                        AND USER_ID = :USER_ID";

        return $conn->perform_transaction($query, $args);
    }
    

    


    

}
