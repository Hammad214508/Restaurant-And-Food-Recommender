<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/USER.php');

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;


    if($actionmode == "check_registered"){
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;

        $form_data = check_registered($args);

    }

    if($actionmode == "register_user"){
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["SURNAME"] = isset($_POST['SURNAME']) ? $_POST['SURNAME'] : NULL;
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $args["PASSWORD"] = isset($_POST['PASSWORD']) ? $_POST['PASSWORD'] : NULL;

        $form_data = register_user($args);

    }

    echo json_encode($form_data);

    function check_registered($args){
        $USER = new USER();
        return $USER -> check_registered($args);
    }

    function register_user($args){
        $USER = new USER();
        return $USER -> register_user($args);
    }

?>
