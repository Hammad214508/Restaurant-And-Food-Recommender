<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/FOOD.php');

    session_start();

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;



    if($actionmode == "get_food_item_by_id"){
        $args["FOOD_ID"] = isset($_POST['FOOD_ID']) ? $_POST['FOOD_ID'] : NULL;

        $form_data = get_food_item_by_id($args);
    }

    echo json_encode($form_data);


    function get_food_item_by_id($args){
        $FOOD = new FOOD();
        return $FOOD -> get_food_item_by_id($args);
    }


















?>
