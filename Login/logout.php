<?php
session_start();

include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/LoginGoogle/config.php');

try {
    $google_client->revokeToken($_SESSION['access_token']);
} catch (Exception $e) {
    unset($e);
}

if(session_destroy()){
    if(isset($_SESSION["logged_in"][0][0]["MANAGER_ID"])){
        header("Location: /Online-Food-Order/Login/Manager/manager_login.php");
    }
    else{
        header("Location: /Online-Food-Order/Login/User/user_login.php");
    }
}




?>
