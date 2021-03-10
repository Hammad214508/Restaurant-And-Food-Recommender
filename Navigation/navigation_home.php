<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div class="container-fluid">

    <div class="navbar-header">
      <a class="navbar-brand" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/index.php">
      <!-- Online Food Order -->
      <img style="max-width:100px; margin-top: -7px;" src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Images/OtherImages/logo.png">
      </a>
     
    </div>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="main-menu" class="collapse navbar-collapse">
        <ul class="nav navbar-nav mr-auto mt-2 mt-lg-0">
            <li id="nav-contact" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Contact/contact.php">Contact</a></li>
        </ul>

        <ul class="nav navbar-nav">
            <li id="nav-user" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="user-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a>
                <div class="dropdown-menu" aria-labelledby="user-dropdown">
                    <a class="dropdown-item" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Register/User/user_reg.php">Registration</a>
                    <a class="dropdown-item" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/User/user_login.php">Login</a>
                </div>
            </li>
            <li id="nav-manager" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="manager-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Manager</a>
                <div class="dropdown-menu" aria-labelledby="manager-dropdown">
                  <a class="dropdown-item" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Register/Manager/manager_reg.php">Registration</a>
                    <a class="dropdown-item" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/Manager/manager_login.php">Login</a>
                </div>
            </li>
        </ul>

    </div>

  </div>
</nav>

<button onclick="topFunction()" id="scroll_top" title="Go to top">
  <i class="fa fa-chevron-up" aria-hidden="true"></i>
</button>