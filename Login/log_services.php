<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/USER.php');
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Models/MANAGER.php');

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;


    if($actionmode == "verify"){
        $args["EMAIL"] = isset($_POST['EMAIL']) ? $_POST['EMAIL'] : NULL;
        $args["PASSWORD"] = isset($_POST['PASSWORD']) ? $_POST['PASSWORD'] : NULL;
        $user_type = isset($_POST['USER_TYPE']) ? $_POST['USER_TYPE'] : NULL;

        if ($user_type == "USER"){
            $form_data = verify_user($args);
        }else{
            $form_data = check_manager_account($args);
        }

    }


    echo json_encode($form_data);

    function verify_user($args){
        $USER = new USER();
        $password = $USER -> get_password($args);

        if (!($password["success"])){
            return $password;
        };

        $password = $password["dataset"][0][0]["PASSWORD"];

        if (password_verify($args['PASSWORD'], $password)) {
            $form_data = array("success" => true, "dataset" => [[["VALID" => true]]]);
        }else{
            $form_data = array("success" => true, "dataset" => [[["VALID" => false]]]);
        }

        return $form_data;

    }



?>
