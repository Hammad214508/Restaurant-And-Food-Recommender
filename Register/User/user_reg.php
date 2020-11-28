<head>
    <title>Register</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php') ?>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/LoginGoogle/config.php'); ?>

    <?php
        $_SESSION['user_type'] = "USER";
        // if(isset($_GET["code"])){
        //  // echo "<script type='text/javascript'>alert('HERE');</script>";
        //  $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);
        //
        //  if(!isset($token['error'])){
        //
        //   $google_client->setAccessToken($token['access_token']);
        //   $_SESSION['access_token'] = $token['access_token'];
        //   $google_service = new Google_Service_Oauth2($google_client);
        //   $data = $google_service->userinfo->get();
        //
        //   if(!empty($data['given_name'])){
        //    $_SESSION['user_first_name'] = $data['given_name'];
        //   }
        //
        //   if(!empty($data['family_name'])){
        //    $_SESSION['user_last_name'] = $data['family_name'];
        //   }
        //
        //   if(!empty($data['email'])){
        //    $_SESSION['user_email_address'] = $data['email'];
        //   }
        //  }
        //
        // }
     ?>

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid text-center">
          <div class="container" style="font-size:1.3em;">
            <h3>User Registration</h3>

            <hr>

            <form id="reg_form" method="POST">
                <div class="text-center mt-3 mb-1">
                    <input  type="text" placeholder="Name" name="name" id="name">
                </div>
                <span id="name_error" class="reg_error"></span>


                <div class="text-center mt-3 mb-1">
                    <input  type="text" placeholder="Surname" name="surname" id="surname">
                </div>
                <span id="surname_error" class="reg_error"></span>


                <div class="text-center mt-3 mb-1">
                    <input  type="email" placeholder="Email" name="email" id="email">
                </div>
                <span id="email_error" class="reg_error"></span>

                <div class="text-center mt-3 mb-1">
                    <input  type="password" placeholder="Password" name="password" id="password">
                </div>
                <span id="password_error" class="reg_error"></span>


                <div class="text-center mt-3 mb-2">
                    <input  type="password" placeholder="Confirm Password" name="confirm_password" id="confirm_password">
                </div>
                <span id="confirm_password_error" class="reg_error"></span>

                <div class="container mt-1 mb-1">
                    <button id="reg_btn" type="submit" class="btn btn-secondary btn-lg">Register</button>
                </div>

                <?php
                // if(!isset($_SESSION['access_token'])){
                    echo "OR";
                    echo '<div class="container mt-2"><a href="'.$google_client->createAuthUrl().'"><img src="'.$basedir.'/Restaurant-And-Food-Recommender/LoginGoogle/sign_in_with_google.png" style="width:25%;"></a></div>';
                // }
                 ?>

            </form>

            <div id="account_exists" class="alert alert-info" role="alert" style="display:none">
              Looks like you already have an account,  <a href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/User/user_login.php">Log in</a>.
            </div>

            <hr>

          </div>

          <div class="container signin">
            <p>Already have an account? <a href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/User/user_login.php">Log in</a>.</p>
          </div>
    </div>
</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Register/User/user_reg.js"></script>
