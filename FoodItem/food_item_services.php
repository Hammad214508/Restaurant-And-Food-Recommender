<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/FOOD.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/IMAGES.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/FOOD_REVIEWS.php');


    session_start();

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;

    if($actionmode == "get_food_item_by_id"){
        $args["FOOD_ID"] = isset($_POST['FOOD_ID']) ? $_POST['FOOD_ID'] : NULL;

        $form_data = get_food_item_by_id($args);
    }

    if($actionmode == "get_food_reviews"){
        $args["FOOD_ID"] = isset($_POST['FOOD_ID']) ? $_POST['FOOD_ID'] : NULL;

        $form_data = get_food_reviews($args);
    }

    if($actionmode == "save_image"){
        $args["ENTITY_ID"] = isset($_POST['ENTITY_ID']) ? $_POST['ENTITY_ID'] : NULL;
        $args["ENTITY_TYPE"] = isset($_POST['ENTITY_TYPE']) ? $_POST['ENTITY_TYPE'] : NULL;
        $args["IMAGE_NAME"] = isset($_POST['IMAGE_NAME']) ? $_POST['IMAGE_NAME'] : NULL;
        $args["IMAGE_EXISTS"] = isset($_POST['IMAGE_EXISTS']) ? $_POST['IMAGE_EXISTS'] : NULL;

        $form_data = save_image($args);

        // if ($args["IMAGE_EXISTS"] == "true" && $form_data["success"]){
        //     unlink($_SERVER['DOCUMENT_ROOT']."/Restaurant-And-Food-Recommender/Images/".$args["IMAGE_NAME"]);
        // }

    }

    if($actionmode == "get_image"){
        $args["ENTITY_ID"] = isset($_POST['ENTITY_ID']) ? $_POST['ENTITY_ID'] : NULL;
        $args["ENTITY_TYPE"] = isset($_POST['ENTITY_TYPE']) ? $_POST['ENTITY_TYPE'] : NULL;


        $form_data = get_image($args);
    }


    echo json_encode($form_data);


    function get_food_item_by_id($args){
        $FOOD = new FOOD();
        return $FOOD -> get_food_item_by_id($args);
    }

    function get_food_reviews($args){
        $FOOD_REVIEWS = new FOOD_REVIEWS();
        return $FOOD_REVIEWS -> get_food_reviews($args);
    }

    function save_image($args){
        $IMAGES = new IMAGES();
        return $IMAGES -> save_image($args);
    }

    function get_image($args){
        $IMAGES = new IMAGES();
        return $IMAGES -> get_image($args);
    }


















?>
