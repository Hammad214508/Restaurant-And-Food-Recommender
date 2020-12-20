<head>
    <title>Restaurants</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php');
    if(!isset($_SESSION['logged_in'])){
        header('location: /Restaurant-And-Food-Recommender/Login/User/user_login.php');
    }
    ?>

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid">
        <div class="jumbotron">
             <h1> Restaurants </h1>
        </div>
    </div>

    <!-- RESTAURANT FILTERS -->
    <div class="container">
        <div class="row">

            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <form class="form-inline d-flex">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input id="search_text" class="form-control ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
                </form>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 bottom-buffer text-left">
                <div class="form-check">
                    <input id="open_rest" type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="open_rest">Open restaurants</label>
                </div>
            </div>

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 bottom-buffer text-left">
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

        </div>

    </div>



    <div id="restaurants_container" class="container"></div>

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/Restaurants/restaurants.js"></script>
