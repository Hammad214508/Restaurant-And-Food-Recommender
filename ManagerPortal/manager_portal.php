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

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid">
        <div class="jumbotron">
             <h1> <?php echo $_SESSION["logged_in"][0][0]["NAME"] ." ".$_SESSION["logged_in"][0][0]["SURNAME"] ;?> </h1>
             <p>Manage your restaurant from here</p>
        </div>
    </div>

    <div class="container-fluid row">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
            <div class="list-group">
                <a class="list-group-item list-group-item-dark active">My Restaurant</a>
                <a class="list-group-item list-group-item-dark ">View Food Items</a>
                <a class="list-group-item list-group-item-dark ">Add Food Items</a>
                <a class="list-group-item list-group-item-dark ">Edit Food Items</a>
                <a class="list-group-item list-group-item-dark ">Delete Food Items</a>
            </div>
        </div>

        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <div id="data_container" style="padding: 0px 100px 100px 100px;">

            </div>
        </div>



    </div>


</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/ManagerPortal/manager_portal.js"></script>
