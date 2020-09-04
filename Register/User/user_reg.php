<head>
    <title>Register</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>
</head>
<body>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation.php') ?>

    <div class="container-fluid text-center">
          <div class="container" style="font-size:1.5em;">
            <h3>User Registration</h3>
            <hr>

            <div class="text-center mb-3">
                <input class="reg_inp" type="text" placeholder="Name" name="name" id="name" required>
            </div>
            <div class="text-center mb-3">
                <input class="reg_inp" type="text" placeholder="Surname" name="surname" id="surname" required>
            </div>
            <div class="text-center mb-3">
                <input class="reg_inp" type="email" placeholder="Email" name="email" id="email" required>
            </div>
            <div class="text-center mb-3">
                <input class="reg_inp" type="text" placeholder="Password" name="password" id="password" required>
            </div>
            <div class="text-center mb-3">
                <input class="reg_inp" type="text" placeholder="Confirm Password" name="confirm_password" id="confirm_password" required>
            </div>

            <button id="register-btn" type="button" class="btn btn-primary btn-lg">Register</button>

            <hr>


          </div>

          <div class="container signin">
            <p>Already have an account? <a href="<?php global $basedir; ?>/Online-Food-Order/Login/login.php">Log in</a>.</p>
          </div>
    </div>
</body>

<input id="inp_hdn_root_folder" style="display:none" value="<?php $_SERVER['DOCUMENT_ROOT'] ?>"></input>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/Register/register.js"></script>
<script src="<?php global $basedir; ?>/Online-Food-Order/Register/User/user_reg.js"></script>
