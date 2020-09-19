<?php

require_once ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/LoginGoogle/config.php');

if(isset($_GET["code"])){
 $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);

 if(!isset($token['error'])){

  $google_client->setAccessToken($token['access_token']);
  $_SESSION['access_token'] = $token['access_token'];
  $google_service = new Google_Service_Oauth2($google_client);
  $data = $google_service->userinfo->get();


  if(!empty($data['given_name'])){
   $_SESSION['user_first_name'] = $data['given_name'];
  }

  if(!empty($data['family_name'])){
   $_SESSION['user_last_name'] = $data['family_name'];
  }

  if(!empty($data['email'])){
   $_SESSION['user_email_address'] = $data['email'];
  }

  // echo $_SESSION['user_first_name'];
  // echo "<br>";
  // echo $_SESSION['user_last_name'];
  // echo "<br>";
  // echo $_SESSION['user_email_address'];
  // echo "<br>";

 }

}

 ?>

 <input id="inp_hdn_name" style="display:none;" value="<?php echo $_SESSION['user_first_name'] ?>"></input>
 <input id="inp_hdn_surname" style="display:none;" value="<?php echo $_SESSION['user_last_name'] ?>"></input>
 <input id="inp_hdn_email_address" style="display:none;" value="<?php echo $_SESSION['user_email_address'] ?>"></input>

 <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
 <script src="<?php global $basedir; ?>/Online-Food-Order/LoginGoogle/google_login.js"></script>
