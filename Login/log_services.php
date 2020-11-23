<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/USER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/MANAGER.php');

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;


    if($actionmode == "verify"){
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $args["PASSWORD"] = isset($_POST['PASSWORD']) ? $_POST['PASSWORD'] : NULL;
        $is_google = isset($_POST['GOOGLE_LOGIN']) ? $_POST['GOOGLE_LOGIN'] : NULL;

        $user_type = isset($_POST['USER_TYPE']) ? $_POST['USER_TYPE'] : NULL;

        if ($user_type == "USER"){
            $form_data = verify_user($args, $is_google);
        }else{
            $form_data = verify_manager($args);
        }

    }

    echo json_encode($form_data);

    function verify_user($args, $is_google){
        $USER = new USER();
        $user_data = $USER -> get_user_data($args);

        if (!($user_data["success"])){
            return $user_data;
        };

        if ($is_google == "true"){
            session_start();
            $form_data = array("success" => true, "dataset" => [[["VALID" => true]]]);
            $_SESSION['logged_in'] = $user_data["dataset"];
            return $form_data;
        }

        $password = $user_data["dataset"][0][0]["PASSWORD"];

        if (password_verify($args['PASSWORD'], $password)) {
            session_start();
            $form_data = array("success" => true, "dataset" => [[["VALID" => true]]]);
            $_SESSION['logged_in'] = $user_data["dataset"];
        }else{
            $form_data = array("success" => true, "dataset" => [[["VALID" => false]]]);
        }

        return $form_data;

    }

    function verify_manager($args){
        $MANAGER = new MANAGER();
        $manager_data = $MANAGER -> get_manager_data($args);

        if (!($manager_data["success"])){
            return $manager_data;
        };

        $password = $manager_data["dataset"][0][0]["PASSWORD"];

        if (password_verify($args['PASSWORD'], $password)) {
            session_start();
            $form_data = array("success" => true, "dataset" => [[["VALID" => true]]]);
            $_SESSION['logged_in'] = $manager_data["dataset"];
        }else{
            $form_data = array("success" => true, "dataset" => [[["VALID" => false]]]);
        }

        return $form_data;

    }






?>
