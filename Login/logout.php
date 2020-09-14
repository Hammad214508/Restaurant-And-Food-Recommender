<?php
session_start();
if(session_destroy()){
    if(isset($_SESSION["logged_in"][0][0]["MANAGER_ID"])){
        header("Location: /Online-Food-Order/Login/Manager/manager_login.php");
    }
    else{
        header("Location: /Online-Food-Order/Login/User/user_login.php");
    }
}




?>
