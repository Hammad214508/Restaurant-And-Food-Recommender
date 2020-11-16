<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/RESTAURANT.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/FOOD.php');

    session_start();

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;

    if($actionmode == "add_restaurant"){
        $args["MANAGER_ID"] = $_SESSION["logged_in"][0][0]["MANAGER_ID"];

        $form_data = add_restaurant($args);
    }

    if($actionmode == "get_restaurant"){

        $args["MANAGER_ID"] = $_SESSION["logged_in"][0][0]["MANAGER_ID"];

        $form_data = get_restaurant($args);
    }

    if($actionmode == "update_restaurant"){
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $args["NUMBER"] = isset($_POST['NUMBER']) ? $_POST['NUMBER'] : NULL;
        $args["ADDRESS"] = isset($_POST['ADDRESS']) ? $_POST['ADDRESS'] : NULL;
        $args["WEBSITE"] = isset($_POST['WEBSITE']) ? $_POST['WEBSITE'] : NULL;
        $args["MANAGER_ID"] = $_SESSION["logged_in"][0][0]["MANAGER_ID"];

        $form_data = update_restaurant($args);
    }

    if($actionmode == "get_food_items"){
        $args["RESTAURANT_ID"] = isset($_POST['RESTAURANT_ID']) ? $_POST['RESTAURANT_ID'] : NULL;

        $form_data = get_food_items($args);
    }

    if($actionmode == "update_food_item"){
        $args["FOOD_ID"] = isset($_POST['FOOD_ID']) ? $_POST['FOOD_ID'] : NULL;
        $args["COLUMN"] = isset($_POST['COLUMN']) ? $_POST['COLUMN'] : NULL;
        $args["VALUE"] = isset($_POST['VALUE']) ? $_POST['VALUE'] : NULL;

        $form_data = update_food_item($args);
    }

    if($actionmode == "add_new_food"){
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["PRICE"] = isset($_POST['PRICE']) ? $_POST['PRICE'] : NULL;
        $args["DESCRIPTION"] = isset($_POST['DESCRIPTION']) ? $_POST['DESCRIPTION'] : NULL;
        $args["DIET_TYPE"] = isset($_POST['DIET_TYPE']) ? $_POST['DIET_TYPE'] : NULL;
        $args["HEALTHY_RATING"] = isset($_POST['HEALTHY_RATING']) ? $_POST['HEALTHY_RATING'] : NULL;
        $args["FILLING_RATING"] = isset($_POST['FILLING_RATING']) ? $_POST['FILLING_RATING'] : NULL;
        $args["RESTAURANT_ID"] = isset($_POST['RESTAURANT_ID']) ? $_POST['RESTAURANT_ID'] : NULL;

        $form_data = add_new_food($args);
    }

    if($actionmode == "get_today_menu"){
        $args["RESTAURANT_ID"] = isset($_POST['RESTAURANT_ID']) ? $_POST['RESTAURANT_ID'] : NULL;

        $form_data = get_today_menu($args);
    }

    echo json_encode($form_data);

    function add_restaurant($args){
        $RESTAURANT = new RESTAURANT();
        return $RESTAURANT -> add_restaurant($args);
    }


    function get_restaurant($args){
        $RESTAURANT = new RESTAURANT();
        return $RESTAURANT -> get_restaurant($args);
    }

    function update_restaurant($args){
        $RESTAURANT = new RESTAURANT();
        return $RESTAURANT -> update_restaurant($args);
    }

    function get_food_items($args){
        $FOOD = new FOOD();
        return $FOOD -> get_food_items($args);
    }

    function update_food_item($args){
        $FOOD = new FOOD();
        return $FOOD -> update_food_item($args);
    }

    function add_new_food($args){
        $FOOD = new FOOD();
        return $FOOD -> add_new_food($args);
    }

    function get_today_menu($args){
        $FOOD = new FOOD();
        return $FOOD -> get_today_menu($args);
    }


















?>
