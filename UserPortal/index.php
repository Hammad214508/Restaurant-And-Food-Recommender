<head>
    <title>User Portal</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php');
    if(!$_SESSION["logged_in"][0][0]["USER_ID"]){
        header('location: /Restaurant-And-Food-Recommender/Login/User/user_login.php');
    }
    ?>

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid">
        <div class="jumbotron">
             <h1> <?php echo $_SESSION["logged_in"][0][0]["NAME"]." ".$_SESSION["logged_in"][0][0]["SURNAME"]; ?> </h1> 
             <p>Manage your profile from here</p>
        </div>
    </div>
</body>

<!-- <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?> -->
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/user_portal.js"></script>
