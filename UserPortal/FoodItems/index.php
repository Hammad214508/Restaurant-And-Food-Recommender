<head>
    <title>Food Items</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/star.css">
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/libraries/spinning_wheel/wheel.css">



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

    <div id="chart" style="margin-left: 33%; z-index:1; display:none; margin-top: 100px;">

    </div>


    <div id="normal_food_items_page">

    <div class="container-fluid">
        <div class="jumbotron">
             <h1> Food Items </h1>
             <p>Do you need help deciding?</p>
             <button id="get_recom" type="button" class="btn btn-secondary">Get Recommendations</button>
             <button id="random" type="button" class="btn btn-secondary">Pick Random Item</button>

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
    </div>

    <div id="recommended_food_items_page" style="display:none">
    <div class="container-fluid">
        <div class="jumbotron">
            <h1>Recommended Food Items</h1>
            <p>I can help you decide what to get</p>
            <button id="back" type="button" class="btn btn-secondary">Back</button>
            <button id="wheel" type="button" class="btn btn-secondary">Pick an Item</button>

        </div>
    </div>



    <div class="container">
        <div class="row">

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-left">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        Diet type:
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-auto">
                        <select class="form-control" id="r_diet_type">
                            <option value="1">Non Vegetarian</option>
                            <option value="2">Vegetarian</option>
                            <option value="3">Vegan</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 bottom-buffer text-right">
                <div class="form-check">
                    <input id="r_available" type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="r_available">Available</label>
                </div>
            </div>


            <div id="r_more" class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 bottom-buffer text-right">
                <button class="btn btn-link">More</button> <i class="fa fa-filter" aria-hidden="true"></i>
            </div>


        </div>


        <div class="r_more_filters" style="display: none;">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left my-auto">
                    <p>Healthy rating:</p>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left mb-auto">
                    <input id="r_health_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
                    <span id="r_health_value" class="font-weight-bold text-secondary"></span>
                </div>

                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left my-auto">
                    <p>Filling rating:</p>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left mb-auto">
                    <input id="r_filling_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
                    <span id="r_filling_value" class="font-weight-bold text-secondary"></span>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-left">
                    <button id="r_reset" type="button" class="btn btn-secondary btn-sm">Reset</button>
                </div>
            </div>

        </div>

    </div>

    <div id="r_food_items_container" class="container"></div>

    </div>
    <input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>


</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/libraries/spinning_wheel/wheel.js"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/FoodItems/food_items.js"></script>
