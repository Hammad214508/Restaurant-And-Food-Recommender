$(document).ready(function(){
    var food_id;
    var user_id;
    var name, surname;
    var healthy_rating, filling_rating, rating;
    var extra_filters = false;

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
                  }else{
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
        $("#restaurant").html(data["RESTAURANT_NAME"]);

    };


    
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

    $.fn.get_percentage = function(rating){
        return Math.ceil(((rating/5)*100)/10)*10;
    }

    $.fn.give_review_events = function(){
        $('#rating_value').html($('#rating_slider').val());

        $('#rating_slider').on('input change', function(){
          $('#rating_value').html($('#rating_slider').val());
        });

        $('#health_value').html($('#health_slider').val());

        $('#health_slider').on('input change', function(){
          $('#health_value').html($('#health_slider').val());
        });

        $('#filling_value').html($('#filling_slider').val());

        $('#filling_slider').on('input change', function(){
          $('#filling_value').html($('#filling_slider').val());
        });

        $("#submit_review").on("click", function(){
            $.fn.add_review();
        })

        $("#more").click(function(){
            $(".more_filters").slideToggle("slow");
            extra_filters = !extra_filters;
        });

        $(".more_filters").hide();


        var user_name = $("#user_name").html().split(" ")
        name = user_name[1]
        surname = user_name[2]

    }

    $.fn.add_review = function(){
        var healthy = (extra_filters) ? $("#health_slider").val() : "";
        var filling =  (extra_filters) ? $("#filling_slider").val() : "";
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "add_review",
                    "FOOD_ID"       : food_id, 
                    "USER_ID"       : user_id,
                    "RATING"        : $('#rating_slider').val(), 
                    "REVIEW"        : $("#review_txt").val(),
                    "HEALTHY"       : healthy,
                    "FILLING"       : filling
                },
            success:function(data) {
               data = JSON.parse(data);
               if (!data.success){
                   $("#error").html("<b>ERROR SAVING FOOD REVIEW!</b>");
                   $.fn.temporary_show("#error");
               }else{
                    var parent = $("#reviews");
                    var data = {}
                    data["NAME"] = name;
                    data["SURNAME"] = surname;
                    data["REVIEW_ID"] = -1;
                    data["REVIEW"] = $("#review_txt").val()
                    parent.append($.fn.get_food_review_html(data));
                    $.fn.add_score($.fn.get_percentage($('#rating_slider').val()), $("#stars_"+data["REVIEW_ID"]))
                    $("#rating_slider").prop("disabled", true);
                    $("#review_txt").prop("disabled", true);
                    $("#submit_review").prop("disabled", true);
               }
           }
         });
    }


    $.fn.add_score = function(score, element){
        $("<span class='stars-container'>")
        .addClass("stars-" + score.toString())
        .text("★★★★★")
        .appendTo(element);
    }



    $.fn.get_food_review_html = function(review){
        return (
            '<p><i class="fa fa-comment" aria-hidden="true"></i> ' +review["NAME"] + ' ' + review["SURNAME"][0]+ '. <span id="stars_'+review["REVIEW_ID"]+'"></span></p> '+
            '<p>'+review["REVIEW"]+'</p>'+
            '<hr style="height:2px;border-width:0;color:gray;background-color:gray">'
        )

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
            user_id = $("#inp_hdn_uid").length > 0 ? $("#inp_hdn_uid").val() : "";
            $.fn.get_food_item_by_id();
            $.fn.get_image_name();
            $.fn.render_food_stats()
            $.fn.get_food_reviews();
            $.fn.give_review_events()

        };
        return thispage;
    })();

    pageready.init();

});
