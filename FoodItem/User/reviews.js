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
        $("#food_name").html(data["NAME"]);
        $("#price").html("£ "+data["PRICE"]);
        $("#description").html(data["DESCRIPTION"]);
        $("#diet_type").html($.fn.get_diet_type(data["DIET_TYPE"]));
    };

    
    $.fn.render_food_stats  = function(){
        $("#stats").append(
            "<p>Rating: "+rating+"<p>"+
            "<p>Healthy: "+healthy_rating+"<p>"+
            "<p>Filling: "+filling_rating+"<p>"
        )
    }

    $.fn.render_food_reviews  = function(reviews){
        $.each(reviews, function( index, value ) {
          $("#reviews").append("<p>" +value["REVIEW"] + "</p>")
        })
    }

    $.fn.get_diet_type = function(diet){
        str_diet = "";
        if (diet == "1"){
            str_diet = "Non Vegetarian";
        }else if (diet == "2"){
            str_diet = "Vegetarian"
        }else{
            str_diet = "Vegan"
        }
        return str_diet;
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            food_id = $("#inp_hdn_food_id").length > 0 ? $("#inp_hdn_food_id").val() : "";
            $.fn.get_food_item_by_id();
            $.fn.get_image_name();
            $.fn.render_food_stats()
            $.fn.get_food_reviews();

        };
        return thispage;
    })();

    pageready.init();

});
