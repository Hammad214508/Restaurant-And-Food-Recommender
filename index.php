<!DOCTYPE html>
<html lang="en">
<head>
    <title>Home</title>

    <?php $basedir = realpath(__DIR__); ?>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>

<body style="background-image: url('img.png') ; background-repeat: no-repeat; background-position: 0% 120%; background-size: 27em 27em;">
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php') ?>
    <div class="container-fluid mb-5">
    <div class="text-center black_font" style="margin-top:14em;">
      <div>
        <h1 style="font-family: URW Chancery L, cursive" class="display-4">Welcome to Food-AI!</h1>
        <h1>Restaurant and Food Recommendations</h1>
        <h5>Hammad Muhammad Mehmood</h5>
        <button onclick='window.open("https://localhost/Restaurant-And-Food-Recommender/UserPortal/Profile/", "_self")' type="button" class="btn btn-lg btn-secondary mt-3">Create Profile</button>
      </div>
    </div>
  </div>
</body>



<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>

</html>
