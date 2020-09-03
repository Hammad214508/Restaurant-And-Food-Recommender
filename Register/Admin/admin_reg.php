<head>
    <title>Register</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>
</head>
<body>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation.php') ?>

    <div class="container-fluid text-center">
          <div class="container" style="font-size:1.5em;">
            <h3>Admin Registration</h3>
            <hr>

            <div class="text-center mb-3">
                <input type="text" placeholder="Enter Name" name="name" id="name" required>
            </div>
            <div class="text-center mb-3">
                <input type="text" placeholder="Enter Name" name="name" id="name" required>
            </div>
            <div class="text-center mb-3">
                <input type="text" placeholder="Enter Name" name="name" id="name" required>
            </div>

            <hr>

          </div>

          <div class="container signin">
            <p>Already have an account? <a href="<?php global $basedir; ?>/Online-Food-Order/Login/login.php">Log in</a>.</p>
          </div>
    </div>
</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/Register/register.js"></script>
