<!DOCTYPE html>
<html lang="en">
<head>
    <title>Food Item</title>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>

</head>

<?php $food_id = isset($_GET["food_id"]) ? $_GET["food_id"] : NULL; ?>

<body>
    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container">

        <div class="text-center">
            <h1 id="food_name"></h1>
        </div>

        <div class="container">
    		<div class="row justify-content-md-center">
    		<div class="ml-2 col-sm-4">
    			<div id="msg" style="display:none;"></div>
    			<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
    				<div class="form-group">
    					<input type="file" name="file" class="file">
    					<div class="input-group my-3">
    						<input type="text" class="form-control" disabled placeholder="Upload File" id="file">
    						<div class="input-group-append">
    							<button type="button" class="browse btn btn-secondary">Browse...</button>
    						</div>
    					</div>
    				</div>
    				<div class="form-group text-center">
    					<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail" style="display:none;">
                        <img id="image" src="" style="display:none;">
    				</div>
    				<div class="form-group text-center">
    					<input id="upload" type="submit" name="submit" value="Upload" class="btn btn-primary" style="display:none;">
    				</div>
    			</form>
    		</div>
    		</div>
    	</div>

        <div id="food_item_data" class="container text-center"></div>

        <div class="container text-center mt-2">
            <h3>REVIEWS</h3>
            <div id="reviews_container">

            </div>
        </div>

    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/FoodItem/food_item.js"></script>


</html>
