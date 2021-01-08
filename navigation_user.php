<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div class="container-fluid">

    <div class="navbar-header">
      <a class="navbar-brand" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/index.php">Online Food Order</a>
    </div>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="main-menu" class="collapse navbar-collapse">
        <ul class="nav navbar-nav mr-auto mt-2 mt-lg-0">
            <li id="nav-home" class="nav-item active"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/index.php">Home</a></li>
            <li id="nav-about" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/About/about.php">About Us</a></li>
            <li id="nav-contact" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Contact/contact.php">Contact Us</a></li>
        </ul>

        <ul class="nav navbar-nav">
            <li id="nav-usr-portal" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/"> <?php echo $_SESSION["logged_in"][0][0]["NAME"] ." ".$_SESSION["logged_in"][0][0]["SURNAME"] ;?> </a></li>
            <li id="nav-restaurants" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Restaurants"> Restaurants </a></li>
            <li id="nav-food-items" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/FoodItems"> Food Items </a></li>
            <li id="nav-recommendation" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Recommender/"> Recommended </a></li>
            <li id="nav-connections" class="nav-item align-bottom" ><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Connections/"> <i class="fa fa-users"></i> </a></li>

            <li id="nav-logout" class="nav-item"><a class="nav-link" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Login/logout.php">Log Out <i class="fa fa-sign-out"></i> </a></li>
        </ul>
    </div>

  </div>
</nav>
