<?php
session_start();
if(isset($_SESSION["logged_in"][0][0]["MANAGER_ID"])){
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation_mgr.php');
}
elseif(isset($_SESSION["logged_in"][0][0]["USER_ID"])){
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation_user.php');
}
else{
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation_home.php');
}
?>
