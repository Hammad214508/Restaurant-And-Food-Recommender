<head>
    <title>Connections</title>
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
            <h1>Connections</h1>
            <p>Manage your network</p>
        </div>
    </div>


    <div class="container-fluid row">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
            <div id="my_net" class="list-group-item list-group-item-dark active">My Network</div>
            <div id="find" class="list-group-item list-group-item-dark">Find People</div>
            <div id="requests" class="list-group-item list-group-item-dark">Connection Requests</div>

        </div>

        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <div id="my_net_container" class="connections_data" style="padding: 0px 100px 100px 100px;"></div>
            <div id="find_container" class="connections_data" style="padding: 0px 100px 100px 100px;"></div>
            <div id="requests_container" class="connections_data" style="padding: 0px 100px 100px 100px;"></div>

        </div>



    </div>


</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Connections/connections.js"></script>
