<?php
session_start();
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div class="container-fluid">

    <div class="navbar-header">
      <a class="navbar-brand" href="<?php global $basedir; ?>/Online-Food-Order/index.php">Online Food Order</a>
    </div>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="main-menu" class="collapse navbar-collapse">
        <ul class="nav navbar-nav mr-auto mt-2 mt-lg-0">
            <li id="nav-home" class="nav-item active"><a class="nav-link" href="<?php global $basedir; ?>/Online-Food-Order/index.php">Home</a></li>
            <li id="nav-about" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Online-Food-Order/About/about.php">About Us</a></li>
            <li id="nav-contact" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Online-Food-Order/Contact/contact.php">Contact Us</a></li>
        </ul>

        <?php
            if(isset($_SESSION['logged_in'])):?>
                <ul class="nav navbar-nav">
                    <li id="nav-mgr-portal" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Online-Food-Order/ManagerPortal/manager_portal.php"> <?php echo $_SESSION["logged_in"][0][0]["NAME"] ." ".$_SESSION["logged_in"][0][0]["SURNAME"] ;?> </a></li>
                    <li id="nav-logout" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Online-Food-Order/Login/Manager/manager_logout.php">Log Out</a></li>
                </ul>
            <?php
            else:?>
            <ul class="nav navbar-nav">
                <li id="nav-register" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="register-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Register</a>
                    <div class="dropdown-menu" aria-labelledby="register-dropdown">
                        <a class="dropdown-item" href="<?php global $basedir; ?>/Online-Food-Order/Register/User/user_reg.php">User</a>
                        <a class="dropdown-item" href="<?php global $basedir; ?>/Online-Food-Order/Register/Manager/manager_reg.php">Manager</a>
                    </div>
                </li>
                <li id="nav-login" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="login-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                    <div class="dropdown-menu" aria-labelledby="login-dropdown">
                        <a class="dropdown-item" href="<?php global $basedir; ?>/Online-Food-Order/Login/User/user_login.php">User</a>
                        <a class="dropdown-item" href="<?php global $basedir; ?>/Online-Food-Order/Login/Manager/manager_login.php">Manager</a>
                    </div>
                </li>
            </ul>

            <?php endif;
        ?>


    </div>

  </div>
</nav>
