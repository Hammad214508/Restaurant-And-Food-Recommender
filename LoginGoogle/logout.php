<?php

//logout.php

include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/LoginGoogle/config.php');

//Reset OAuth access token

// $google_client->revokeToken();

try {
$google_client->revokeToken($_SESSION['access_token']);
} catch (Exception $e) {
    unset($e);
}

//Destroy entire session data.
session_destroy();

//redirect page to index.php
header('location:index.php');

?>
