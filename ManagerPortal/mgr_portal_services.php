<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/USER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/MANAGER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/RESTAURANT.php');

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










?>
