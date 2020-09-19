<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/USER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/MANAGER.php');

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;


    if($actionmode == "check_registered"){
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $user_type = isset($_POST['USER_TYPE']) ? $_POST['USER_TYPE'] : NULL;

        if ($user_type == "USER"){
            $form_data = check_user_registered($args);
        }else{
            $form_data = check_manager_registered($args);
        }

    }

    if($actionmode == "register_user"){
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["SURNAME"] = isset($_POST['SURNAME']) ? $_POST['SURNAME'] : NULL;
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        if (isset($_POST['PASSWORD'])){
            $args["PASSWORD"] = $_POST['PASSWORD'];
            $args["PASSWORD"] = password_hash($_POST['PASSWORD'], PASSWORD_DEFAULT);
        }else{
            $args["PASSWORD"] = NULL;
        }
        $args["GOOGLE_LOGIN"] = isset($_POST['GOOGLE_LOGIN']) ? $_POST['GOOGLE_LOGIN'] : false;

        $form_data = register_user($args);

    }

    if($actionmode == "register_manager"){
        $args["NAME"] = isset($_POST['NAME']) ? $_POST['NAME'] : NULL;
        $args["SURNAME"] = isset($_POST['SURNAME']) ? $_POST['SURNAME'] : NULL;
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $args["PASSWORD"] = isset($_POST['PASSWORD']) ? $_POST['PASSWORD'] : NULL;
        $args["PASSWORD"] = password_hash($_POST['PASSWORD'], PASSWORD_DEFAULT);

        $form_data = register_manager($args);

    }

    echo json_encode($form_data);

    function check_user_registered($args){
        $USER = new USER();
        return $USER -> check_registered($args);
    }

    function register_user($args){
        $USER = new USER();
        return $USER -> register_user($args);
    }

    function check_manager_registered($args){
        $MANAGER = new MANAGER();
        return $MANAGER -> check_registered($args);
    }

    function register_manager($args){
        $MANAGER = new MANAGER();
        return $MANAGER -> register_manager($args);
    }







?>
