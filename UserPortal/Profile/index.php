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
                <div id="my_net_container" class="connections_data " style="padding: 0px 100px 100px 100px; display:none" >
                    <div id="connections" style="overflow:scroll; height:20em;"> </div>
                    <button id="get_recom_btn" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Get Recommendations</button>
                    <button id="not_recom" type="button" class="btn btn-secondary mt-5 crt_group" style="display:none">Cancel</button>
                </div>
                <div id="find_container" class="connections_data" style="padding: 0px 100px 100px 100px; display:none">
                    <form class="form-inline d-flex">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input id="search_text" class="form-control ml-3" type="text" placeholder="Search" aria-label="Search" style="width:19em;">
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

    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Remove Connection</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to remove this connection?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button id="delete_connection" type="button" class="btn btn-primary" ref="">Remove Connection</button>
                </div>
                </div>
            </div>
        </div>

    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Profile/profile.js"></script>
