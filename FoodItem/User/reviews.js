$(document).ready(function(){
    var food_id;
    var user_id;
    var name, surname;
    var healthy_rating, filling_rating, rating;
    var extra_filters = false;
    var rest_lat, rest_long;
    var min_distance = 100; //metres
    var websocket = new WebSocket("ws://127.0.0.1:6789/");


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
                        rest_lat = data[0][0]["LATITUDE"]
                        rest_long = data[0][0]["LONGITUDE"]
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
                      $("#reviews").hide();
                      $("#no_reviews").show();
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
                      $("#image").attr("src", "/Restaurant-And-Food-Recommender/Images/FoodImages/"+image_name);

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
            "<p id='overall_rating'><strong>Rating:</strong> "+rating+" | <p>"+
            "<p id='healthy_rating'><strong>Healthy:</strong> "+healthy_rating+" | <p>"+
            "<p id='filling_rating'><strong>Filling:</strong> "+filling_rating+" | <p>"
        )

        $.fn.add_score($.fn.get_percentage(rating), $("#overall_rating"));
        $.fn.add_score($.fn.get_percentage(healthy_rating), $("#healthy_rating"));
        $.fn.add_score($.fn.get_percentage(filling_rating), $("#filling_rating"));


    }

    $.fn.render_food_reviews  = function(reviews){
        var parent = $("#reviews");
        parent.empty();
        $.each(reviews, function(index, value ) {
            if (value["REVIEW"]){
                parent.append($.fn.get_food_review_html(value));
                $.fn.add_score($.fn.get_percentage(value["RATING"]), $("#stars_"+value["REVIEW_ID"]))
            }
        })
    }

     
    $.fn.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(checkPosition);
        } else {
            $("#error").html("<b>ERROR GETTING LOCATION!</b>");
            $.fn.temporary_show("#error");
            $.fn.disable_review_giver();
        }
    }

    function checkPosition(position) {
        if (rest_lat){
            latitude = position.coords.latitude;
            longitude = position.coords.longitude; 
            var distance = $.fn.calcCrow(latitude, longitude, rest_lat, rest_long)
            if (distance > min_distance){
                $.fn.disable_review_giver();
            }
        }
    }

    $.fn.calcCrow = function(lat1, lon1, lat2, lon2) {
      var R = 6371000; // m
      var dLat = $.fn.toRad(lat2-lat1);
      var dLon = $.fn.toRad(lon2-lon1);
      var lat1 = $.fn.toRad(lat1);
      var lat2 = $.fn.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    $.fn.toRad = function(Value) {
        return Value * Math.PI / 180;
    }

    $.fn.disable_review_giver = function(){
        $("#give_review_div").addClass("blur");
        $("#rating_slider").prop("disabled", true);
        $("#review_txt").prop("disabled", true);
        $("#submit_review").prop("disabled", true);
        $("#review_disable_msg").show();
        $("#min_dist").html(min_distance);
        $("#more").prop("disabled", true);
        
    }

    $.fn.check_daily_review_limit = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/FoodItem/food_item_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "check_daily_review_limit",
                    "USER_ID"       : user_id,
                },
            success:function(data) {
               data = JSON.parse(data);
               if (!data.success){
                   $("#error").html("<b>ERROR GETTING USER REVIEWS!</b>");
                   $.fn.temporary_show("#error");
               }else{
                   if (data.dataset[0][0]["NUM_REVIEWS"] > 5){
                        $("#daily_review_limit").show();
                        $("#give_review_div").addClass("blur");
                        $("#rating_slider").prop("disabled", true);
                        $("#review_txt").prop("disabled", true);
                        $("#submit_review").prop("disabled", true);
                        $("#more").prop("disabled", true);
                   }
               }
           }
         });
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
                    $("#more").prop("disabled", true);
                    $("#health_slider").prop("disabled", true)
                    $("#filling_slider").prop("disabled", true)
                    $("#review_given").show();

                    
               }
           }
         });
    }

    $.fn.get_percentage = function(rating){
        return Math.ceil(((rating/5)*100)/10)*10;
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

    $.fn.insert_user_rating = function(rating){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "add_rating",
                   "FOOD_ID"       : food_id,
                   "USER_ID"       : user_id,
                   "RATING"        : rating
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR INSERT RATING!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    $("#rating_given").show();
                    $(".radio-btn").prop("disabled", true);
                }
            }
        });
    }

    $.fn.give_rating = function(){
        $(".radio-btn").on("change", function(){
            var rating = $('input[name="star"]:checked').val()
            $.fn.insert_user_rating(rating)
        })
    }

    $.fn.get_food_item_box = function(id, name, img){
        return (
            '<div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-auto text-center">'+
            '   <a href="https://localhost/Restaurant-And-Food-Recommender/FoodItem/User/?food_id='+id+'" style="color:black">'+
            '       <img id="'+id+'" src="/Restaurant-And-Food-Recommender/Images/FoodImages/'+img+'" class="img-thumbnail food_img_recommended" > '+
            '       <p>'+name+'</p>'+
            '   </a>'+
            '</div>'
        )

    }

    $.fn.render_recommended_food_item_boxes = function(recommended, order){
        var parent = $("#item_based_foods");
        parent.empty();
        for (var i=0; i<3; i++){
            item = order[i]
            var id = recommended[item]["ID"];
            var name = recommended[item]["NAME"];
            var img = recommended[item]["IMAGE"];

            parent.append($.fn.get_food_item_box(id, name, img));
        }

    }


    $.fn.get_recommended_food_items = function(){
        websocket.send(
            JSON.stringify(
                {
                    action: 'item_food_recommender',
                    "food_id": food_id,
                }));
    }

    websocket.onmessage = function (event) {
        data = JSON.parse(event.data);
        if (data.type == "recommended_items"){
            if (data["recommended"][1].length > 0){
                console.log(data)
                $.fn.render_recommended_food_item_boxes(data["recommended"][0], data["recommended"][1]);
            }else{
                var parent = $("#item_based_foods");
                parent.empty();
                parent.append("<h3>NO FOOD RECOMMENDATIONS</h3>");
            }
        }
        else{
            $("#error").html("<b>ERROR GETTING ITEM BASED FOOD RECOMMENDATIONS!</b>");
            $.fn.temporary_show("#error");
        }
    };


    websocket.onopen = function(error) {
        $.fn.get_recommended_food_items();
    };

    websocket.onerror = function(error) {
        $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
        $.fn.temporary_show("#error");
    };


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            food_id = $("#inp_hdn_food_id").length > 0 ? $("#inp_hdn_food_id").val() : "";
            user_id = $("#inp_hdn_uid").length > 0 ? $("#inp_hdn_uid").val() : "";
            $.fn.get_food_item_by_id();
            $.fn.get_image_name();
            $.fn.render_food_stats();
            $.fn.get_food_reviews();
            $.fn.check_daily_review_limit()
            $.fn.give_review_events();
            $.fn.getLocation();
            $.fn.give_rating();
            
          
        };
        return thispage;
    })();

    pageready.init();

});
