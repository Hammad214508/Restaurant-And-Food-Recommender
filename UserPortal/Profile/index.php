<head>
    <title>Profile</title>
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
                <h1 id="title"></h1> 
                <p id="desc"></p>
            </div>
        </div>


        <div class="container-fluid row">
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div id="my_prof" class="list-group-item list-group-item-dark active">My Profile <i class="fa fa-user"></i></div>
                <div id="my_net" class="list-group-item list-group-item-dark">My Network <i class="fa fa-users"></i></div>
                <div id="find" class="list-group-item list-group-item-dark">Find People <i class="fa fa-search" aria-hidden="true"></i></div>
                <div id="requests" class="list-group-item list-group-item-dark">Connection Requests <span id="num_notif" class="button__badge"></span></div>
                <button id="create_group" type="button" class="btn btn-secondary mt-5">Create Group</button>

            </div>

            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div id="my_prof_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none" ></div>
                <div id="my_net_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none" >
                    <div id="connections" style="overflow:scroll; height:20em;"> </div>
                    <button id="get_recom_btn" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Get Recommendations</button>
                    <button id="not_recom" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Cancel</button>
                </div>
                <div id="find_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none">
                    <form class="form-inline d-flex">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input id="search_text" class="form-control ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
                    </form>
                    <div id="recommended_users" style="overflow:scroll; height:20em;"> </div>
                </div>
                <div id="requests_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none"> </div>
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
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Profile/profile.js"></script>