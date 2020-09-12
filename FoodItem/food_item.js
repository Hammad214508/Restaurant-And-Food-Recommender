$(document).ready(function(){
    var food_id;

    $.fn.get_food_item_by_id = function(){
        $.ajax({
           url: "/Online-Food-Order/FoodItem/food_item_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_food_item_by_id",
                   "FOOD_ID"       : food_id
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING RESTAURANT!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      $.fn.render_food_item(data[0][0]);
                  }
              }
            }
        });
    }

    $.fn.get_image_name = function(){
        $.ajax({
           url: "/Online-Food-Order/FoodItem/food_item_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_image",
                   "ENTITY_ID"     : food_id,
                   "ENTITY_TYPE"   : "FOOD"
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR RETRIEVING IMAGE!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      var image = data[0][0]["IMAGE_NAME"];

                  }
              }
            }
        });
    }

    $.fn.render_food_item = function(data){
        $("#food_name").append(data["NAME"])
    };

    $.fn.image_preview = function(){
        $(".browse").on("click", function() {
            var file = $(this).parent().parent().parent().find(".file");
            file.trigger("click");
        });

        $('input[type="file"]').change(function(e) {
            $("#preview").show();
            $("#upload").show();

            var fileName = e.target.files[0].name;
            $("#file").val(fileName);

            var reader = new FileReader();
            reader.onload = function(e) {
                // get loaded data and render thumbnail.
                $('#preview').attr('src', e.target.result);
            };
            // read the image file as a data URL.
            reader.readAsDataURL(this.files[0]);
        });
    }

    $.fn.image_upload = function(){
        $("#image-form").on("submit", function() {
            $("#msg").html('<div class="alert alert-info"><i class="fa fa-spin fa-spinner"></i> Please wait...!</div>');
                $.ajax({
                    type: "POST",
                    url: "upload_image.php",
                    data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                    contentType: false, // The content type used when sending data to the server.
                    cache: false, // To unable request pages to be cached
                    processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function(data) {
                    data = JSON.parse(data);
                    if (data.success){
                        $("#msg").html(
                            '<div class="alert alert-success"><i class="fa fa-thumbs-up"></i> Data updated successfully.</div>'
                        );
                        // $.fn.save_image(data["dataset"]);
                    }
                    else{
                        $("#msg").html(
                            '<div class="alert alert-info"><i class="fa fa-exclamation-triangle"></i> '+data["dataset"]+'</div>'
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

    }

    $.fn.save_image  = function(image_name){
        $.ajax({
           url: "/Online-Food-Order/FoodItem/food_item_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "save_image",
                   "ENTITY_ID"     : food_id,
                   "ENTITY_TYPE"   : "FOOD",
                   "IMAGE_NAME"    : image_name
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR SAVING IMAGE!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  console.log("SUCCESS");

              }
            }
        });
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            food_id = $("#inp_hdn_food_id").length > 0 ? $("#inp_hdn_food_id").val() : "";
            $.fn.get_food_item_by_id();
            $.fn.image_preview();
            $.fn.image_upload()
            $.fn.get_image_name()
            ;


        };
        return thispage;
    })();

    pageready.init();

});
