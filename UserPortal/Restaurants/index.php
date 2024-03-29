<head>
    <title>Restaurants</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/star.css">

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

    <div id="normal_restaurants_page"> 
        <div class="container-fluid">
            <div class="jumbotron">
                <h1> Restaurants </h1>
                <p>Do you need help deciding?</p>
                <button id="get_recom" type="button" class="btn btn-secondary">Get Recommendations</button>
            </div>
        </div>
        <div class="container">
            <div class="row mb-3">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <form class="form-inline d-flex">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input id="search_text" class="form-control ml-3 " type="text" placeholder="Search" aria-label="Search">
                    </form>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <div class="form-inline d-flex mt-2">
                        <input id="open_rest" type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="open_rest">Open restaurants</label>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <form class="form-inline d-flex">
                        <select id="sorting" class="form-control ml-2 w-75" >
                            <option value="none">Sort by:</option>
                            <option value="ratings">Ratings high to low</option>
                            <option value="reviews">Most popular</option>
                        </select>                    
                    </form>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <form class="form-inline d-flex">
                        <select class="form-control w-75" id="distance">
                            <option value="-1">Distance</option>
                            <option value="500">500m</option>
                            <option value="1000">1km</option>
                            <option value="2000">2km</option>
                            <option value="1000000">5km+</option>

                        </select>                    
                    </form>
                </div>
            </div>
        </div>
        <div id="restaurants_container" class="container"></div>
    </div>
  
    <div id="r_restaurant_page"  style="display:none;" > 
        <div class="container-fluid">
            <div class="jumbotron">
                <h1> Recommended Restaurants </h1>
                <p>I can help you decide what to get</p>
                <button id="back" type="button" class="btn btn-secondary">Back</button>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 bottom-buffer text-left">
                    <div class="form-check">
                        <input id="r_open_rest" type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="r_open_rest">Open restaurants</label>
                    </div>
                </div>
            </div>
        </div>
        <div id="r_restaurants_container" class="container"></div>
    </div>
    
    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Restaurants/restaurants.js"></script>
