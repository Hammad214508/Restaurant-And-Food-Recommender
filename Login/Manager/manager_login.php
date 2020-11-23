<head>
    <title>Login</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php') ?>
    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid text-center">
          <div class="container" style="font-size:1.3em;">
            <h3>Manager Login</h3>

            <hr>

            <form id="log_form" method="POST">

                <div class="text-center mt-3 mb-1">
                    <input type="email" placeholder="Email" name="email" id="email">
                </div>
                <span id="email_error" class="log_error"></span>

                <div class="text-center mt-3 mb-2">
                    <input type="password" placeholder="Password" name="password" id="password">
                </div>
                <span id="password_error" class="log_error"></span>


                <div class="container mt-1">
                    <button id="log_btn" type="submit" class="btn btn-secondary btn-lg">Login</button>
                </div>

            </form>

            <div id="account_not_exists" class="alert alert-info" role="alert" style="display:none">
              Looks like you don't have an account,  <a href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Register/Manager/manager_reg.php">Register</a>.
            </div>

            <hr>

          </div>

          <div class="container signin">
            <p>Don't have have an account? <a href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Register/Manager/manager_reg.php">Register</a>.</p>
          </div>
    </div>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/login.js"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/Manager/manager_login.js"></script>
