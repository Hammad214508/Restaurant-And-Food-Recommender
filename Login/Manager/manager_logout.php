<?php
session_start();
if(session_destroy()){
    header("Location: /Online-Food-Order/Login/Manager/manager_login.php"); // Redirecting To Home Page
}

?>
