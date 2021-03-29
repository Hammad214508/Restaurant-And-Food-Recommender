<!DOCTYPE html>
<html lang="en">
<head>
    <title>Food Item</title>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
	<link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/star.css">
    <link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/UserPortal/InitialTraining/initial_training.css">

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

    <div class="container-fluid mb-5 mt-5">
		<div class="row">
			<div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" style="border-right: 0.5px solid grey;">
				<p id="food_name" class="display-3" style="font-family: Georgia, serif;"></p>
				<hr>
				<div id="image_div">
					<div id="msg" style="display:none;"></div>
					<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
						<div class="mb-3">
							<img id="image" src="" class="img-thumbnail food_img" style="display:none"> 
						</div>
					</form>
				</div>
				<div id="food_data">
					<div class="row">
						<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
							<p><strong>Price:</strong></p>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
							<p id="price"></p>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
							<p><strong>Description: </strong></p>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
							<p id="description"></p>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
							<p><strong>Diet Type:</strong></p>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
							<p id="diet_type"></p>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
							<p><strong>Restaurant:</strong></p>
						</div>
						<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
							<p id="restaurant"></p>
						</div>
					</div>
				</div>

				<h3 class="mt-5">Statistics</h3>
				<div id="stats"></div>

				<h3 class="mt-5">You might also like</h3>
				<div id="item_based_foods" class="row mt-3"></div>
			</div>
			<div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7 "> 
				
				<div class="container">
					<div id="reviews_container">
						<h3>Reviews</h3>
						<hr>
						<div id="reviews" style="height:20em; overflow-y: scroll;"></div>
						<h5 id="no_reviews" style="display:none;">No reviews to show!</h5>
					</div>
				</div>

				<hr class="mt-5">
				<div class="row ml-1">
					
					<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
						<h5>Rating:</h5>
					</div>
					<div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left">
						<div class="rating" style="font-size:1.2rem;">
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
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<span id="rating_given" style="color:green; font-size:14px; display:none;">Thank you for you feedback!</span>
					</div>

					
				</div>

				<hr>
				
				<h5 id="review_disable_msg"  class="text-danger mt-5 ml-3" style="display:none">  Sorry! You need to be within <span id="min_dist"></span> metres to leave a review</h5>
				<h5 id="daily_review_limit"  class="text-danger mt-5 ml-3" style="display:none"> Sorry! You are reached your maximum daily reviews limit</h5>

				<div id="give_review_div" class="container mt-5">
					<div id="review_form">
						<div class="row">
							<div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
								<h3>Give Review</h3>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 my-auto">
								<span id="review_given" style="color:green; font-size:14px; display:none;">Thank you for you feedback!</span>
							</div>
						</div>
						<div id="rating_div">
							<p>Rating:</p>
							<input id="rating_slider" class="border-0" type="range" min="0" max="5" step="0.25"/>
							<span id="rating_value" class="font-weight-bold text-secondary"></span>
						</div>
						
						<div id="review_msg_div">
							<p>Review:</p> 
							<textarea id="review_txt" rows="4" cols="50"></textarea>
						</div>
						
						<div class="mt-2">
							<i class="fa fa-filter" aria-hidden="true"></i><button id="more"class="btn btn-link">More</button>
							<div class="more_filters row"> 
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<p>Healthy rating:</p>
								<input id="health_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
								<span id="health_value" class="font-weight-bold text-secondary"></span>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<p>Filling rating:</p>
								<input id="filling_slider" class="border-0" type="range" min="0" max="5" step="0.25" />
								<span id="filling_value" class="font-weight-bold text-secondary"></span>
							</div>

							</div>
						</div>


						<div class="mt-3 mb-2">
								<button id="submit_review" type="button" class="btn btn-secondary">Send</button>
						</div>
					</div>
				</div>

			</div>

		</div>
    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>
<input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/User/reviews.js"></script>


</html>
