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
                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9"> 
                            <div id="display_name"></div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto text-left">
                            <h1>
                                <i id="edit" class="fa fa-edit usr-icon"></i> 
                                <i class="fa fa-trash usr-icon delete"  data-toggle="modal" data-target="#exampleModalCenter" style="font-size: 42px; display:none;" aria-hidden="true"></i>
                            </h1>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"><h5>Date:</h5></div>
                        <div id="display_date" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"><h5>Time:</h5></div>
                        <div id="display_time" class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                    </div>

                    
                    <div class="row mt-3">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <h5>People Invited:</h5>
                            <ul id="people_invited"></ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                            <h5>Locations: <i id="vote" class="fa fa-envelope-o usr-icon" aria-hidden="true"></i></h5>
                            <ul id="locations"></ul>
                        </div>
                    </div>

                    <div class="row" id="num_votes_row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"> 
                             <p style="font-size:12px;" class="ml-4">Number of Votes Allowed: <span id="display_num_votes"></span></p> 
                        </div>
                    </div>
          
                </div>
                <div id="selected_event_container" class="" style="padding: 0px 100px 100px 100px; display:none"></div>                    
                
                </div>
        </div>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Delete Event</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this event?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button id="delete_event" type="button" class="btn btn-primary">Delete Event</button>
                </div>
                </div>
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