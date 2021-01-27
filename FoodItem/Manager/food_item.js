$(document).ready(function(){
    var food_id;
    var image_exists = false;
    var healthy_rating, filling_rating, rating;

    $.fn.get_food_item_by_id = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
           method: "POST",
           async: false,
           data:{
                   "actionmode"	   : "get_food_item_by_id",
                   "FOOD_ID"       : food_id
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING FOOD ITEM!</b>");
                  $.fn.temporary_show("#error");
              }else{
                    data = data.dataset
                    if (data.length > 0){
                        console.log("assigning")
                        healthy_rating = data[0][0]["HEALTHY_RATING"];
                        filling_rating = data[0][0]["FILLING_RATING"];
                        rating = data[0][0]["AVG_RATING"];
                        $.fn.render_food_item(data[0][0]);
                  }
              }
            }
        });
    }

    $.fn.get_food_reviews = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_food_reviews",
                   "FOOD_ID"       : food_id
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING FOOD REVIEWS!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      $.fn.render_food_reviews(data[0]);
                  }
                  else{
                       $("#reviews").append("<h5>No reviews to show!</h5>")
                  }
              }
          }
        });
    }

    $.fn.get_image_name = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
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
                  data = data.dataset;
                  if (data.length > 0){
                      var image_name = data[0][0]["IMAGE_NAME"];
                      image_exists = true;
                      $("#image").show();
                      $("#upload").show();
                      $("#file").val(image_name);
                      $("#image").attr("src", "/Restaurant-And-Food-Recommender/Images/"+image_name);

                  }
              }
            }
        });
    }

    $.fn.render_food_item = function(data){
        $("#food_name").append(data["NAME"]);
        var parent = $("#food_item_data");
        parent.append($.fn.new_food_form());
        $.fn.add_new_food_events(data)
    };

    $.fn.new_food_form = function(){
        return (
            '<div class="row mt-4">'+
                '<div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
                    $.fn.new_food_input("food_name_inp", "Name:", "Food Name" )+
                    $.fn.new_food_input("food_price", "Price:", "Food Price" )+
                    '<div class="row">'+
                    '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
                    '        <p>Description:</p>'+
                    '    </div>'+
                    '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
                    '        <textarea type="text" class="form-control mb-3" rows="2" maxlength = "200" id="food_description" placeholder="Food Description"></textarea>'+
                    '    </div>'+
                         $.fn.transaction_icons("food_description")+
                    '</div>'+
                    '<div class="row">'+
                    '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
                    '        <p>Diet Type:</p>'+
                    '    </div>'+
                    '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">'+
                    '       <select name="diet_type" id="diet_type">'+
                    '           <option value="1">Non Vegetarian</option>'+
                    '           <option value="2">Vegetarian</option>'+
                    '           <option value="3">Vegan</option>'+
                    '       </select>'+
                    '    </div>'+
                         $.fn.transaction_icons("diet_type")+
                    '</div>'+
                    // '<div class="text-center mt-1">'+
                    // '   <button id="save" type="button" class="btn btn-secondary btn-lg">Save</button>'+
                    // '   <i id="save_tick" class="fa fa-check icon" style="font-size:2em;color:green; display:none;"></i>'+
                    // '</div>'+
                '</div>'+
                '<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>'+
            '</div>'
        );
    }


    $.fn.add_new_food_events = function(data){
        $("#food_name_inp").val(data["NAME"]);
        $("#food_price").val(data["PRICE"]);
        $("#food_description").val(data["DESCRIPTION"]);
        $("#diet_type").val(data["DIET_TYPE"]);

        $("#food_name_inp").on("change", function(){
            $("#food_name").html($(this).val());
            $.fn.update_food_item($(this).attr("id"), food_id, "NAME", $(this).val());
        });

        $("#food_price").on("change", function(){
            $.fn.update_food_item($(this).attr("id"), food_id, "PRICE", $(this).val());
        });

        $("#food_description").on("change", function(){
            $.fn.update_food_item($(this).attr("id"), food_id, "DESCRIPTION", $(this).val());
        });

        $("#diet_type").on("change", function(){
            $.fn.update_food_item($(this).attr("id"), food_id, "DIET_TYPE", $(this).val());
        });

        // $("#save").on('click', function(){
        //     $.fn.temporary_show("#save_tick")
        // })

    }

    $.fn.new_food_input = function(id, label, placeholder){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input type="text" class="form-control mb-3 rest_data" id="'+id+'" placeholder="'+placeholder+'">'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        );
    }


    $.fn.update_food_item = function(field, food_id, food_field, value){
        $.fn.temporary_show("#icons_"+field+" #loading")
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "update_food_item",
                   "FIELD"         : field,
                   "FOOD_ID"       : food_id,
                   "COLUMN"        : food_field,
                   "VALUE"         : value,
               },
           success:function(data) {
              $(".icon").hide();
              var params = $.fn.get_ajax_params(this.data);
              data = JSON.parse(data);

              if (!data.success){
                  $.fn.temporary_show("#icons_"+params["FIELD"]+" #cross");
              }else{
                  $.fn.temporary_show("#icons_"+params["FIELD"]+" #tick");
              }
            }
        });
    }

    $.fn.render_food_stats  = function(){
        $("#stats").append(
            "<p>Rating: "+rating+"<p>"+
            "<p>Healthy: "+healthy_rating+"<p>"+
            "<p>Filling: "+filling_rating+"<p>"
        )
    }

    $.fn.render_food_reviews  = function(reviews){
        var parent = $("#reviews");
        parent.empty();
        parent.append('<hr style="height:2px;border-width:0;color:gray;background-color:gray">'
        )
        $.each(reviews, function(index, value ) {
            if (value["REVIEW"]){
                parent.append($.fn.get_food_review_html(value));
                $.fn.add_score($.fn.get_percentage(value["RATING"]), $("#stars_"+value["REVIEW_ID"]))
            }
  
        })
    }

    $.fn.get_food_review_html = function(review){
        return (
            '<p><i class="fa fa-comment" aria-hidden="true"></i> ' +review["NAME"] + ' ' + review["SURNAME"][0]+ '. <span id="stars_'+review["REVIEW_ID"]+'"></span></p> '+
            '<p>'+review["REVIEW"]+'</p>'+
            '<hr style="height:2px;border-width:0;color:gray;background-color:gray">'
        )
    }

    $.fn.add_score = function(score, element){
        $("<span class='stars-container'>")
        .addClass("stars-" + score.toString())
        .text("★★★★★")
        .appendTo(element);
    }

    $.fn.get_percentage = function(rating){
        return Math.ceil(((rating/5)*100)/10)*10;
    }

    $.fn.image_preview = function(){
        $(".browse").on("click", function() {
            var file = $(this).parent().parent().parent().find(".file");
            file.trigger("click");
        });

        $('input[type="file"]').change(function(e) {
            $("#preview").show();
            $("#upload").show();
            $("#image").hide();

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
                        $.fn.temporary_show($("#msg"));
                        $.fn.save_image(data["dataset"]);
                    }
                    else{
                        $("#msg").html(
                            '<div class="alert alert-info"><i class="fa fa-exclamation-triangle"></i> '+data["dataset"]+'</div>'
                        );
                        $.fn.temporary_show($("#msg"));
                    }
                },
                });
        });

    }

    $.fn.save_image  = function(image_name){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "save_image",
                   "IMAGE_EXISTS"  : image_exists,
                   "ENTITY_ID"     : food_id,
                   "ENTITY_TYPE"   : "FOOD",
                   "IMAGE_NAME"    : image_name
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR SAVING IMAGE!</b>");
                  $.fn.temporary_show("#error");
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
            $.fn.image_upload();
            $.fn.get_image_name();
            $.fn.render_food_stats()
            // $.fn.get_food_stats();
            $.fn.get_food_reviews();



        };
        return thispage;
    })();

    pageready.init();

});
