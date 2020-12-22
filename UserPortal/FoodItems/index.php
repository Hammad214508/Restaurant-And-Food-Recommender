<head>
    <title>Food Items</title>
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
             <h1> Food Items </h1>
        </div>
    </div>

    <!-- FOOD ITEMS FILTERS -->
    <div class="container">
        <div class="row">

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <form class="form-inline d-flex">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input id="search_text" class="form-control ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
                </form>
            </div>

            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 bottom-buffer text-left">
                <div class="form-check">
                    <input id="available" type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="available">Available</label>
                </div>
            </div>

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-right">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        Sort by:
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-auto">
                        <select class="form-control" id="sorting">
                            <option value="none">None</option>
                            <option value="ratings">Ratings high to low</option>
                            <option value="reviews">Most popular</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="more" class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 bottom-buffer text-right">
                <button id="more" class="btn btn-link">More</button> <i class="fa fa-filter" aria-hidden="true"></i>
            </div>
            

        </div>

        
        <div class="more_filters" style="display: none;">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left my-auto">
                    <p>Healthy rating:</p>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left mb-auto">
                    <input id="health_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
                    <span id="health_value" class="font-weight-bold text-secondary"></span>
                </div>

                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left my-auto">
                    <p>Filling rating:</p>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left mb-auto">
                    <input id="filling_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
                    <span id="filling_value" class="font-weight-bold text-secondary"></span>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-left">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            Diet type:
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-auto">
                            <select class="form-control" id="diet_type">
                                <option value="1">Non Vegetarian</option>
                                <option value="2">Vegetarian</option>
                                <option value="3">Vegan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-left">
                    <button id="reset" type="button" class="btn btn-secondary btn-sm">Reset</button>
                </div>


            </div>

        </div>



    </div>

    <div id="food_items_container" class="container"></div>


</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/FoodItems/food_items.js"></script>
