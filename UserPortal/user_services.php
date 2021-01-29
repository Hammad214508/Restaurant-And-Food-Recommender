<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/RESTAURANT.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/FOOD.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/CONNECTIONS.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/NOTIFICATIONS.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/USER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/EVENTS.php');

    
    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;

    if($actionmode == "get_all_restaurants"){
        $open = isset($_POST['OPEN']) ? $_POST['OPEN'] : NULL;
        $args["OPEN"] = $open  == "true" ? true : false;
        $args["SEARCH"] = isset($_POST['SEARCH']) ? $_POST['SEARCH'] : NULL;
        $args["SORTING"] = isset($_POST['SORTING']) ? $_POST['SORTING'] : NULL;

        $form_data = get_all_restaurants($args);
    }

    if($actionmode == "get_all_food_items"){
        $available = isset($_POST['AVAILABLE']) ? $_POST['AVAILABLE'] : NULL;
        $args["AVAILABLE"] = $available  == "true" ? true : false;
        $args["SEARCH"] = isset($_POST['SEARCH']) ? $_POST['SEARCH'] : NULL;
        $args["SORTING"] = isset($_POST['SORTING']) ? $_POST['SORTING'] : NULL;
        $args["FILLING_RATING"] = isset($_POST['FILLING_RATING']) ? $_POST['FILLING_RATING'] : NULL;
        $args["HEALTHY_RATING"] = isset($_POST['HEALTHY_RATING']) ? $_POST['HEALTHY_RATING'] : NULL;
        $args["DIET_TYPE"] = isset($_POST['DIET_TYPE']) ? $_POST['DIET_TYPE'] : NULL;

        $form_data = get_all_food_items($args);
    }

    if($actionmode == "get_connections"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;

        $form_data = get_connections($args);
    }

    if($actionmode == "delete_connection"){
        $args["USER1"] = isset($_POST['USER1']) ? $_POST['USER1'] : NULL;
        $args["USER2"] = isset($_POST['USER2']) ? $_POST['USER2'] : NULL;
        $args["USER1cp"] = $args["USER1"];
        $args["USER2cp"] = $args["USER2"];
        $form_data = delete_connection($args);
    }

    if($actionmode == "get_recommended_users"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;
        $search = isset($_POST['SEARCH']) ? $_POST['SEARCH'] : NULL;

        $form_data = get_recommended_users($args, $search);
    }

    if($actionmode == "send_connection_request"){
        $args["TYPE"] = isset($_POST['TYPE']) ? $_POST['TYPE'] : NULL;
        $args["FROM"] = isset($_POST['FROM']) ? $_POST['FROM'] : NULL;
        $args["TO"] = isset($_POST['TO']) ? $_POST['TO'] : NULL;
        $args["MESSAGE"] = isset($_POST['MESSAGE']) ? $_POST['MESSAGE'] : NULL;

        $form_data = send_connection_request($args);
    }

    if($actionmode == "get_connection_requests"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;

        $form_data = get_connection_requests($args);
    }

    if($actionmode == "connection_request_response"){
        $args["MY_ID"] = isset($_POST['MY_ID']) ? $_POST['MY_ID'] : NULL;
        $args["OTHER_ID"] = isset($_POST['OTHER_ID']) ? $_POST['OTHER_ID'] : NULL;

        if ($_POST['RESPONSE'] == "reject"){
            $form_data = delete_request($args);
        }else{
            $deleted = delete_request($args);
            $args["MY_ID1"] =  $args["MY_ID"];
            $args["OTHER_ID1"] =  $args["OTHER_ID"];
            if ($deleted["success"]){
                $form_data = add_connection($args);
            }
        }
    }

    if($actionmode == "get_profile_data"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;

        $form_data = get_profile_data($args);
    }
    
    if($actionmode == "update_user_profile_data"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["SURNAME"] = isset($_POST['SURNAME']) ? $_POST['SURNAME'] : NULL;
        $args["DIET_TYPE"] = isset($_POST['DIET_TYPE']) ? $_POST['DIET_TYPE'] : NULL;

        $form_data = update_user_profile_data($args);
    }


    if($actionmode == "get_user_events"){
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;

        $form_data = get_user_events($args);
    }

    if($actionmode == "get_event_data"){
        $args["EVENT_ID"] = isset($_POST['EVENT_ID']) ? $_POST['EVENT_ID'] : NULL;
        $form_data = get_event_data($args);
    }


    if($actionmode == "update_event_data"){
        $args["EVENT_ID"] = isset($_POST['EVENT_ID']) ? $_POST['EVENT_ID'] : NULL;
        $args["EVENT_NAME"] = isset($_POST['EVENT_NAME']) ? $_POST['EVENT_NAME'] : NULL;
        $args["EVENT_DATE"] = isset($_POST['EVENT_DATE']) ?  date('Y-m-d', strtotime($_POST['EVENT_DATE'])) : NULL;
        $args["EVENT_TIME"] = isset($_POST['EVENT_TIME']) ? date('H:i:s', strtotime($_POST['EVENT_TIME'])) : NULL;

        $form_data = update_event_data($args);
    }



    if($actionmode == "update_event_users"){
        $action = isset($_POST['TYPE']) ? $_POST['TYPE'] : NULL;
        $args["EVENT_ID"] = isset($_POST['EVENT_ID']) ? $_POST['EVENT_ID'] : NULL;
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;

        if ($action == "insert"){
            $form_data = insert_event_user($args);
        }else{
            $form_data = delete_event_user($args);
        }
    }

    if($actionmode == "update_event_locations"){
        $action = isset($_POST['TYPE']) ? $_POST['TYPE'] : NULL;
        $args["EVENT_ID"] = isset($_POST['EVENT_ID']) ? $_POST['EVENT_ID'] : NULL;
        $args["LOCATION"] = isset($_POST['LOCATION']) ? $_POST['LOCATION'] : NULL;

        if ($action == "insert"){
            $form_data = insert_event_location($args);
        }else{
            $form_data = delete_event_location($args);
        }
    }



    echo json_encode($form_data);

    function get_all_restaurants($args){
        $RESTAURANT = new RESTAURANT();
        return $RESTAURANT -> get_all_restaurants($args);
    }

    function get_all_food_items($args){
        $FOOD = new FOOD();
        return $FOOD -> get_all_food_items($args);
    }

    function get_connections($args){
        $CONNECTIONS = new CONNECTIONS();
        return $CONNECTIONS -> get_connections($args);
    }

    function delete_connection($args){
        $CONNECTIONS = new CONNECTIONS();
        return $CONNECTIONS -> delete_connection($args);
    }

    function get_recommended_users($args, $search){
        $CONNECTIONS = new CONNECTIONS();
        return $CONNECTIONS -> get_recommended_users($args, $search);
    }

    function send_connection_request($args){
        $NOTIFICATIONS = new NOTIFICATIONS();
        return $NOTIFICATIONS -> send_connection_request($args);
    }

    function get_connection_requests($args){
        $NOTIFICATIONS = new NOTIFICATIONS();
        return $NOTIFICATIONS -> get_connection_requests($args);
    }

    function delete_request($args){
        $NOTIFICATIONS = new NOTIFICATIONS();
        return $NOTIFICATIONS -> delete_request($args);
    }

    function add_connection($args){
        $CONNECTIONS = new CONNECTIONS();
        return $CONNECTIONS -> add_connection($args);
    }

    function get_profile_data($args){
        $USER = new USER();
        return $USER -> get_profile_data($args);
    }

    function update_user_profile_data($args){
        $USER = new USER();
        return $USER -> update_user_profile_data($args);
    }

    function get_user_events($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> get_user_events($args);
    }

    function get_event_data($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> get_event_data($args);
    }

    function update_event_data($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> update_event_data($args);
    }
    
    function insert_event_user($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> insert_event_user($args);
    }

    function delete_event_user($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> delete_event_user($args);
    }

    function insert_event_location($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> insert_event_location($args);
    }

    function delete_event_location($args){
        $EVENTS = new EVENTS();
        return $EVENTS -> delete_event_location($args);
    }

    

    

    

    






?>
