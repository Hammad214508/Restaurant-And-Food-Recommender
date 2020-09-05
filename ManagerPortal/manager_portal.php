<head>
    <title>Manager Portal</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/navigation.php');
    if(!isset($_SESSION['logged_in'])){
        header('location: /Online-Food-Order/Login/Manager/manager_login.php');
    }
    ?>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/ManagerPortal/manager_portal.js"></script>
