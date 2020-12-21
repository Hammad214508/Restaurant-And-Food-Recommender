<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/RESTAURANT.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/FOOD.php');

    // session_start();

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
        $form_data = get_all_food_items($args);
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
?>
