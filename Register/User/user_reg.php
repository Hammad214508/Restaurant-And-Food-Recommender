<head>
    <title>Register</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>
</head>
<body>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation.php') ?>

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

                <div class="container mt-1">
                    <button id="reg_btn" type="submit" class="btn btn-primary btn-lg">Register</button>
                </div>

            </form>

            <div id="account_exists" class="alert alert-info" role="alert" style="display:none">
              Looks like you already have an account,  <a href="<?php global $basedir; ?>/Online-Food-Order/Login/User/user_login.php">Log in</a>.
            </div>

            <hr>

          </div>

          <div class="container signin">
            <p>Already have an account? <a href="<?php global $basedir; ?>/Online-Food-Order/Login/User/user_login.php">Log in</a>.</p>
          </div>
    </div>
</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/Register/register.js"></script>
<script src="<?php global $basedir; ?>/Online-Food-Order/Register/User/user_reg.js"></script>
