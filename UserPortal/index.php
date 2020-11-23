<head>
    <title>User Portal</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php');
    if(!isset($_SESSION['logged_in'])){
        header('location: /Restaurant-And-Food-Recommender/Login/User/user_login.php');
    }
    ?>
</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/user_portal.js"></script>
