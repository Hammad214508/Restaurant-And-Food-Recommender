<head>
    <title>Training</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php');
    if(!$_SESSION["logged_in"][0][0]["USER_ID"]){
        header('location: /Restaurant-And-Food-Recommender/Login/User/user_login.php');
    }


    if($_SESSION["logged_in"][0][0]["INITIAL_TRAINING"]){
        if ($_SESSION["logged_in"][0][0]["INITIAL_TRAINING"] == "true"){
            header('location: /Restaurant-And-Food-Recommender/UserPortal/Profile');
        }
    }

    ?>

    <style>

        .hide {
        display: none;
        }

        .clear {
        float: none;
        clear: both;
        }

        .rating {
            width: 90px;
            unicode-bidi: bidi-override;
            direction: rtl;
        }

        .rating > label {
            float: right;
            display: inline;
            padding: 0;
            margin: 0;
            position: relative;
            width: 1.1em;
            cursor: pointer;
            color: #000;
        }

        .rating > label:hover,
        .rating > label:hover ~ label,
        .rating > input.radio-btn:checked ~ label {
            color: transparent;
        }

        .rating > label:hover:before,
        .rating > label:hover ~ label:before,
        .rating > input.radio-btn:checked ~ label:before,
        .rating > input.radio-btn:checked ~ label:before {
            content: "\2605";
            position: absolute;
            left: 0;
            color: #FFD700;
        }

    </style>

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div id="normal_food_items_page"> 

    <div class="container-fluid">
        <div class="jumbotron">
             <h1>Learn about you </h1>
             <p>Help the system learn about your preferences</p>
        </div>
    </div>

    <div class="container-fluid text-center">
        <h4>Estimate the ratings as per your preferences: </h4>
        <p id="count"> </p>
        <div class="col-md-5 mb-5 text-center show_border" style="float: none; margin: 0 auto;">
            
            <h5 id="name"></h5>
            <img id="image" src="" width="150px" height="150px" class="img-thumbnail" alt="Food item image"> 
            <p id="description"></p>

            <div class="text-center" style="margin: 0 auto;">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="rating ml-4">
                            <input id="star5" name="star" type="radio" value="5" class="radio-btn hide" />
                            <label for="star5" >☆</label>
                            <input id="star4" name="star" type="radio" value="4" class="radio-btn hide" />
                            <label for="star4" >☆</label>
                            <input id="star3" name="star" type="radio" value="3" class="radio-btn hide" />
                            <label for="star3" >☆</label>
                            <input id="star2" name="star" type="radio" value="2" class="radio-btn hide" />
                            <label for="star2" >☆</label>
                            <input id="star1" name="star" type="radio" value="1" class="radio-btn hide" />
                            <label for="star1" >☆</label>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12"></div>
                </div>
            </div>


        </div>
    </div>
   
    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/InitialTraining/initial_training.js"></script>
