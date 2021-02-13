<head>
    <title>Training</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/InitialTraining/initial_training.css">

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
        <div class="col-md-5 mb-5 text-center" style="float: none; margin: 0 auto; ">
            <div class="show_border" style="padding: 50px 50px 50px 50px;">
                <h3 id="name"></h3>
                <div style="height:250px; display: inline-block;">
                    <img id="image" src="" class="img-thumbnail food_img" alt="Food item image"> 
                </div>
                <strong ><p id="description" class="mt-2"></p></strong>

                <div class="text-center">
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12"></div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div class="rating">
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
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12"></div>
                    </div>
                </div>
            </div>



        </div>
    </div>
   
    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/InitialTraining/initial_training.js"></script>
