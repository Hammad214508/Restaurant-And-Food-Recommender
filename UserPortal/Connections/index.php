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

    <div class="container" >
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div id="connections_page">
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
                <div id="requests" class="list-group-item list-group-item-dark">Connection Requests <span id="num_notif" class="button__badge"></span></div>
                <button id="create_group" type="button" class="btn btn-secondary mt-5">Create Group</button>

            </div>

            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div id="my_net_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none" >
                    <div id="connections" style="overflow:scroll; height:20em;"> </div>
                    <button id="get_recom_btn" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Get Recommendations</button>
                    <button id="not_recom" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Cancel</button>

                </div>
                <div id="find_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none">
                    <div id="recommended_users" style="overflow:scroll; height:20em;"> </div>
                </div>

                <div id="requests_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none">
            
                </div>
            </div>

        </div>

    </div>
    <div id="recommended_rest_page" style="display:none" > 
        <div class="container-fluid">
            <div class="jumbotron">
                <h1>Recommended Restaurants</h1>
                <p>People in the group: </p>
                <div id="group_people"></div>
            </div>
        </div>

        <div id="restaurants_container" class="container"></div>


    </div>

    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Connections/connections.js"></script>