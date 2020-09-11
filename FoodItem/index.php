<!DOCTYPE html>
<html lang="en">
<head>
    <title>Food Item</title>

    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/header.php') ?>
</head>

<?php $food_id = isset($_GET["food_id"]) ? $_GET["food_id"] : NULL; ?>

<body>
    <div class="container">

        <div class="text-center">
            <h1 id="food_name"></h1>
        </div>

        <div class="container">
    		<div class="row justify-content-md-center">
    		<div class="ml-2 col-sm-4">
    			<div id="msg"></div>
    			<form method="post" id="image-form" enctype="multipart/form-data" onSubmit="return false;">
    				<div class="form-group">
    					<input type="file" name="file" class="file">
    					<div class="input-group my-3">
    						<input type="text" class="form-control" disabled placeholder="Upload File" id="file">
    						<div class="input-group-append">
    							<button type="button" class="browse btn btn-primary">Browse...</button>
    						</div>
    					</div>
    				</div>
    				<div class="form-group">
    					<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail">
    				</div>
    				<div class="form-group">
    					<input type="submit" name="submit" value="Upload" class="btn btn-danger">
    				</div>
    			</form>
    		</div>
    		</div>
    	</div>
    </div>


</body>


<input id="inp_hdn_food_id" style="display:none;" value="<?php echo $food_id ?>"></input>


<?php include ($_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/footer.php') ?>
<script src="<?php global $basedir; ?>/Online-Food-Order/FoodItem/food_item.js"></script>
<script>
        $(document).on("click", ".browse", function() {
          var file = $(this)
            .parent()
            .parent()
            .parent()
            .find(".file");
          file.trigger("click");
        });
        $('input[type="file"]').change(function(e) {
          var fileName = e.target.files[0].name;
          $("#file").val(fileName);

          var reader = new FileReader();
          reader.onload = function(e) {
            // get loaded data and render thumbnail.
            document.getElementById("preview").src = e.target.result;
          };
          // read the image file as a data URL.
          reader.readAsDataURL(this.files[0]);
        });


        $(document).ready(function(e) {
          $("#image-form").on("submit", function() {
            $("#msg").html('<div class="alert alert-info"><i class="fa fa-spin fa-spinner"></i> Please wait...!</div>');
            $.ajax({
              type: "POST",
              url: "ajax/action.ajax.php",
              data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
              contentType: false, // The content type used when sending data to the server.
              cache: false, // To unable request pages to be cached
              processData: false, // To send DOMDocument or non processed data file it is set to false
              success: function(data) {
                if (data == 0 || parseInt(data) == 0) {
                  $("#msg").html(
                    '<div class="alert alert-success"><i class="fa fa-thumbs-up"></i> Data updated successfully.</div>'
                  );
                } else {
                  $("#msg").html(
                    '<div class="alert alert-info"><i class="fa fa-exclamation-triangle"></i> Extension not good only try with <strong>GIF, JPG, PNG, JPEG</strong>.</div>'
                  );
                }
              },
              error: function(data) {
                $("#msg").html(
                  '<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> There is some thing wrong.</div>'
                );
              }
            });
          });
        });
    </script>


</html>
