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
							<div id="reviews"></div>
						</div>
					</div>
				</div>

			</div>

    	</div>



    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/User/reviews.js"></script>


</html>
