<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}if(isset($_SESSION["logged_in"][0][0]["MANAGER_ID"])){
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Navigation/navigation_mgr.php');
}
elseif(isset($_SESSION["logged_in"][0][0]["USER_ID"])){
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Navigation/navigation_user.php');
}
else{
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Navigation/navigation_home.php');
}
?>
