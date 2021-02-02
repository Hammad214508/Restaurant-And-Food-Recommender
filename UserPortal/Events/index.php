<head>
    <title>Events</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
    <link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Practice/select2/select2.min.css">
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/libraries/timepicker/jquery.timepicker.css">

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

    <div class="container-fluid">
        <div class="jumbotron">
             <h1>Events </h1>
             <p>Create and manage events here</p>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <h3 class="mb-3">Your Events:</h3>
                <div id="user_events"></div>
                <button id="new_event" type="button" class="btn btn-secondary mt-3">New Event</button>

            </div>

            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div id="display_event_container" class="" style="padding: 0px 100px 100px 100px;">
                    <div class="row">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8"> 
                            <div id="display_name"></div>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 my-auto"><h1><i id="edit" class="fa fa-edit usr-icon"></i> <i class="fa fa-trash usr-icon delete" style="font-size: 42px" aria-hidden="true"></i></h1></div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"><h5>Date: </h5></div>
                        <div id="display_date" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"><h5>Time:</h5></div>
                        <div id="display_time" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <h5 class="">People Invited:</h5>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <h5 class="">Locations:</h5>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    </div>

                    <div class="row">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <div id="people_invited"></div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <div id="locations"></div>
                        </div>

                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    </div>
          
                </div>
                <div id="selected_event_container" class="" style="padding: 0px 100px 100px 100px; display:none"></div>                    
                
                </div>

        </div>
    </div>



    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Libraries/select2/select2.min.js"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/libraries/timepicker/jquery.timepicker.min.js"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Events/events.js"></script>
</html>