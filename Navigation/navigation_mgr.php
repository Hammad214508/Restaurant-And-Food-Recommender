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
            <li id="nav-mgr-portal" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/ManagerPortal/"> <?php echo $_SESSION["logged_in"][0][0]["NAME"] ." ".$_SESSION["logged_in"][0][0]["SURNAME"] ;?> </a></li>
            <li id="nav-logout" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/logout.php">Log Out<i class="fa fa-sign-out"></i></a></li>
        </ul>

    </div>

  </div>
</nav>

<button onclick="topFunction()" id="scroll_top" title="Go to top">
  <i class="fa fa-chevron-up" aria-hidden="true"></i>
</button>
