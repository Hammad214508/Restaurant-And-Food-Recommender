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
		if(!$_SESSION["logged_in"][0][0]["MANAGER_ID"]){
			header('location: /Restaurant-And-Food-Recommender/Login/Manager/manager_login.php');
		}
    ?>
    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

	<div class="container">

		<div class="row">
			<div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
				<h1 id="food_name"></h1>
				<div class="ml-2">
					<div id="msg" style="display:none;"></div>
					<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
						<div class="form-group" style="width:17em">
							<input type="file" name="file" class="file">
							<div class="input-group my-3">
								<input type="text" class="form-control" disabled placeholder="Upload File" id="file">
								<div class="input-group-append">
									<button type="button" class="browse btn btn-secondary">Browse...</button>
								</div>
							</div>
						</div>
						<div class="form-group">
							<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail" style="display:none;">
							<img id="image" src="" style="display:none;">
						</div>
						<div class="form-group">
							<input id="upload" type="submit" name="submit" value="Upload" class="btn btn-primary" style="display:none;">
						</div>
					</form>
				</div>
			</div>

			<div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
				<h2>Details</h2>
				<div id="food_item_data"></div>


			</div>
		</div>
	</div>
	
	<div class="container">
		<div class="row">
			<div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">
				<h3>Statistics</h3>
				<div id="stats"></div>
			</div>
			<div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7">
				<div id="reviews_container">
					<h3>REVIEWS</h3>
					<div id="reviews" style="height:25em; overflow-y: scroll;"></div>
				</div>
			</div>

		</div>
	</div>


	

</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/FoodItem/Manager/food_item.js"></script>


</html>
