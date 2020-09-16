<?php
require_once 'vendor/autoload.php';

$google_client = new Google_Client();

// from  https://console.developers.google.com/apis/credentials/oauthclient/323936893284-ivgtg34l5jijjfbnrnc7qc0085n5vdgv.apps.googleusercontent.com?project=food-recommender-289713&supportedpurview=project
$google_client -> setClientId('323936893284-ivgtg34l5jijjfbnrnc7qc0085n5vdgv.apps.googleusercontent.com');
$google_client -> setClientSecret('LGHw-5SVCgwndMo1uTG5w_m6');
$google_client -> setRedirectUri('https://localhost/Online-Food-Order/LoginGoogle/');


$google_client -> addScope('email');
$google_client -> addScope('profile');

session_start();
?>
