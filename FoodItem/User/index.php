<!DOCTYPE html>
<html lang="en">
<head>
    <title>Food Item</title>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
	<link rel="stylesheet" href="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/star.css">

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

        <div class="container mt-5">
			<div class="row">
				<div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
					<h1 id="food_name"></h1>
					<div id="image_div">
						<div id="msg" style="display:none;"></div>
						<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
							<div class="mb-3">
								<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail" style="display:none;">
								<img id="image" src="" style="display:none;">
							</div>
						</form>
					</div>
					<div id="food_data">
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
						<div class="row">
							<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">
								<p>Restaurant:</p>
							</div>
							<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
								<p id="restaurant"></p>
							</div>
						</div>
					</div>

					<h3 class="mt-3">Statistics</h3>
					<div id="stats"></div>
				</div>
				<div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"> 
					
					<div class="container">
						<div id="reviews_container">
							<h3>REVIEWS</h3>
							<div id="reviews" style="height:25em; overflow-y: scroll;"></div>
						</div>
					</div>

					<div class="container mt-5">
						<div id="review_form">
							<h3>GIVE REVIEW</h3>
							<div id="rating_div">
								<p>Rating:</p>
								<input id="rating_slider" class="border-0" type="range" min="0" max="5" step="0.25"/>
								<span id="rating_value" class="font-weight-bold text-secondary"></span>
							</div>
							<!-- <p>Filling Rating:</p>
							<p>Healthy Rating:</p> -->
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


    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>
<input id="inp_hdn_uid" style="display:none" value="<?php echo $_SESSION["logged_in"][0][0]["USER_ID"] ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/User/reviews.js"></script>


</html>
