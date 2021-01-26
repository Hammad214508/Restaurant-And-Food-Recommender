<!DOCTYPE html>
<html lang="en">
<head>
    <title>Food Item</title>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>

</head>

<?php $food_id = isset($_GET["food_id"]) ? $_GET["food_id"] : NULL; ?>

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

    <div class="container">

        <div class="text-center">
            <h1 id="food_name"></h1>
        </div>

        <div class="container">
    		<div class="row justify-content-md-center">
    		<div class=" col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
    			<div id="msg" style="display:none;"></div>
    			<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
    				<div class="form-group text-center">
    					<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail" style="display:none;">
                        <img id="image" src="" style="display:none;">
    				</div>
    			</form>
    		</div>
    		</div>
    	</div>

        <div id="food_item_data" class="container">
			<div class="row mt-4">
				<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
					<div class="row">
						<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
							<p>Price:</p>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
							<p id="price"></p>
						</div>
					</div>
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
                            <p>Description:</p>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <p id="description"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
                            <p>Diet Type:</p>
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
							<p id="diet_type"></p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
            </div>
        </div>

        <div class="container text-center mt-2">
            <div id="reviews_container">
                <h3>REVIEWS</h3>
                <div id="reviews"></div>
                <br>
                <h3>Statistics</h3>
                <div id="stats"></div>
            </div>
        </div>

    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/User/reviews.js"></script>


</html>
