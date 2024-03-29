$(document).ready(function(){
    var user_id;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");
    var available = false;
    var food_item_search = "";
    var sorting, filling_rating_filter, healthy_rating_filter, diet_type_filter ;
    var default_diet_type;
    var top_items = [];
    var random_items;

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-food-items").addClass("active");
    }

    $.fn.get_profile_data = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "get_profile_data",
                    "USER_ID"       : user_id,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING USER DATA!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     data = data.dataset[0][0];
                     diet_type_filter = data["DIET_TYPE"];
                     default_diet_type = data["DIET_TYPE"];
                 }
             }
         });
    }

    $.fn.restart_filters = function(){
        available = false;
        food_item_search = "";
        healthy_rating_filter = ""
        filling_rating_filter = ""
        sorting = ""
        diet_type_filter = default_diet_type;

        $("#diet_type").val(diet_type_filter);

        $('#health_value').html(2.5);
        $('#health_slider').val(2.5);

        $('#filling_value').html(2.5);
        $('#filling_value').val(2.5);

    }


    $.fn.restart_recommended_filters = function(){
        available = false;
        food_item_search = "";
        healthy_rating_filter = ""
        filling_rating_filter = ""
        sorting = ""
        diet_type_filter = default_diet_type;

        $("#r_diet_type").val(diet_type_filter);

        $('#r_health_value').html(2.5);
        $('#r_health_slider').val(2.5);

        $('#r_filling_value').html(2.5);
        $('#r_filling_value').val(2.5);

    }

    $.fn.get_all_food_items = function(){

        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	 : "get_all_food_items",
                    "AVAILABLE"      : available,
                    "SEARCH"         : food_item_search,
                    "SORTING"        : sorting,
                    "FILLING_RATING" : filling_rating_filter,
                    "HEALTHY_RATING" : healthy_rating_filter,
                    "DIET_TYPE"      : diet_type_filter
                },
            success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR GETTING FOOD ITEMS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    data = data.dataset
                    if (data.length > 0){
                        $.fn.render_food_item_boxes(data[0]);
                    }else{
                        parent = $("#food_items_container");
                        parent.empty();
                        parent.append("<h3>NO FOOD ITEMS</h3>");
                    }
                }
            }
        });
    }

    $.fn.render_food_item_boxes = function(food_items){
        var num_food_items = food_items.length;
        var parent = $("#food_items_container");
        parent.empty();
        for(var i = 0; i < num_food_items; i++){
            if (i % 3 == 0){
                var row = $("<div class='row'>");
                parent.append(row);
            }
            var id = food_items[i]["FOOD_ID"];
            var name = food_items[i]["NAME"];
            name = name.charAt(0).toUpperCase() + name.slice(1)
            var price = food_items[i]["PRICE"];
            var diet = $.fn.get_diet_type(food_items[i]["DIET_TYPE"]);
            var healthy_rating = food_items[i]["HEALTHY_RATING"]
            var filling_rating = food_items[i]["FILLING_RATING"]
            var rating = food_items[i]["AVG_RATING"]
            var restaurant_name = food_items[i]["RESTAURANT_NAME"]
            var proj = $.fn.get_food_item_box(id, name, price, diet, healthy_rating, filling_rating, rating, restaurant_name);
            row.append(proj);
            $.fn.add_score($.fn.get_percentage(rating), $("#food_item_"+id+" .overall_rating"))

        }
        $.fn.add_event();
    }

    $.fn.get_food_item_box = function(id, name, price, diet, healthy_rating, filling_rating, rating, restaurant_name){
        var template = (
            "<div id='food_item_"+id+"' ref="+id+" class=\"col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 bottom-buffer\">"+
            "  <div class=\"grey-box\" ref="+id+">" +
            "      <div class='mb-3'><h3 style='display: inline;' class='mb-2'>"+name+"</h3> <span style='float:right' class='overall_rating'></span></div>"+
            "      <p ><b>Price:</b> "+price+"</p>"+
            "      <p><b>Diet:</b> "+diet+"</p>"+
            "      <p><b>Healthy:</b> "+healthy_rating+"</p>"+
            "      <p><b>Filling:</b> "+filling_rating+"</p>"+
            // "      <p class='overall_rating'><b>Overall Rating:</b> "+rating+" | </p>"+
            "      <div class=\"times p-2\">"+
            "          <b>Restaurant: </b>"+restaurant_name+
            "      </div>"+
            "  </div>"+
            "</div>");
        return $(template);
    }
    // style='color:#8b0000;'

    $.fn.add_event = function(){
        $('.grey-box').on('click',function() {
            if ($(this).attr('href') != "undefined"){
                window.location.href = "https://localhost/Restaurant-And-Food-Recommender/FoodItem/User/?food_id="+$(this).attr('ref');
            }
        });

        $('.grey-box').hover(function(){
          $(this).css("background-color", "#A0A0A0");
          }, function(){
          $(this).css("background-color", "#DCDCDC");
        });
    };

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

    $.fn.food_items_filter_events = function(){
        // Available Food items
        $("#available").on("change", function(){
            available = $(this).prop("checked");
            $.fn.get_all_food_items();
        });

        // Search bar
        $("#search_text").on("keyup", function(e){
            food_item_search = $(this).val();
            $.fn.get_all_food_items();
        });

        // Sorting
        $("#sorting").on("change", function(){
            sorting = $(this).val();
            $.fn.get_all_food_items();
        });

        // Healthy rating
        $('#health_value').html($('#health_slider').val());

        $('#health_slider').on('input', function(){
          $('#health_value').html($('#health_slider').val());
        });

        $('#health_slider').on('change', function(){
            healthy_rating_filter = $('#health_slider').val();
            $.fn.get_all_food_items();
        });

        // Filling rating
        $('#filling_value').html($('#filling_slider').val());

        $('#filling_slider').on('input', function(){
          $('#filling_value').html($('#filling_slider').val());
        });

        $('#filling_slider').on('change', function(){
            filling_rating_filter = $('#filling_slider').val();
            $.fn.get_all_food_items();

        });

        // Diet type
        $("#diet_type").on("change", function(){
            diet_type_filter = $(this).val();
            $.fn.get_all_food_items();

        });

        $("#more").click(function(){
            $(".more_filters").slideToggle("slow");
        });

        $("#reset").click(function(){
            $.fn.restart_filters();
            $.fn.get_all_food_items();
            $("#more").trigger("click")
        });
    };




    $.fn.get_recommended_food_items = function(){
        websocket.send(
            JSON.stringify(
                {
                    action: 'user_food_recommender',
                    "user_id": user_id,
                    "available": available,
                    "healthy_rating_filter": healthy_rating_filter,
                    "filling_rating_filter": filling_rating_filter,
                    "diet_type_filter" : diet_type_filter
                }));
    }

    $.fn.websocket_response = function(){
        websocket.onmessage = function (event) {
            data = JSON.parse(event.data);
            if (data.type == "recommended_items"){
                if (data["recommended"][1].length > 0){
                    $.fn.render_recommended_food_item_boxes(data["recommended"][0], data["recommended"][1]);
                }else{
                    parent = $("#r_food_items_container");
                    parent.empty();
                    parent.append("<h3>NO FOOD ITEMS</h3>");
                }
            }
            else{
                $("#error").html("<b>ERROR GETTING FOOD RECOMMENDATIONS!</b>");
                $.fn.temporary_show("#error");
            }
        };
    }

    $.fn.websocket_open_and_error = function(){

        websocket.onerror = function(error) {
            $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
            $.fn.temporary_show("#error");
        };
    }

    $.fn.recommended_filter_events = function(){
        // Available Food items
        $("#r_available").off("change").on("change", function(){
            available = $(this).prop("checked");
            $.fn.get_recommended_food_items();
        });

        // Healthy rating
        $('#r_health_value').html($('#r_health_slider').val());

        $('#r_health_slider').off("input").on('input', function(){
          $('#r_health_value').html($('#r_health_slider').val());
        });

        $('#r_health_slider').off("change").on('change', function(){
            healthy_rating_filter = $('#r_health_slider').val();
            $.fn.get_recommended_food_items();
        });

        // Filling rating
        $('#r_filling_value').html($('#r_filling_slider').val());

        $('#r_filling_slider').off("input").on('input', function(){
          $('#r_filling_value').html($('#r_filling_slider').val());
        });

        $('#r_filling_slider').off("change").on('change', function(){
            filling_rating_filter = $('#r_filling_slider').val();
            $.fn.get_recommended_food_items();
        });

        // Diet type
        $("#r_diet_type").off("change").on("change", function(){
            diet_type_filter = $(this).val();
            $.fn.get_recommended_food_items();
        });

        $("#r_more").off("click").on("click",function(){
            $(".r_more_filters").slideToggle("slow");
         });

         $("#r_reset").off("click").on("click",function(){
            $.fn.restart_recommended_filters();
            $.fn.get_recommended_food_items();
            $("#r_more").trigger("click")

         });
    };

    $.fn.render_recommended_food_item_boxes = function(recommended, order){
        var parent = $("#r_food_items_container");
        parent.empty();
        var i = 0;
        var row;
        top_items = []
        order.forEach(function(item) {
            if (i % 3 == 0){
                row = $("<div class='row'>");
                parent.append(row);
            }
            if (i < 6){
              top_items.push({"label": recommended[item]["NAME"],  "ID":recommended[item]["ID"]});
            }
            var id = recommended[item]["ID"];
            var name = recommended[item]["NAME"];
            var price = recommended[item]["PRICE"];
            var diet = $.fn.get_diet_type(recommended[item]["DIET"]);
            var healthy_rating = recommended[item]["HEALTHY"]
            var filling_rating = recommended[item]["FILLING"]
            var rating = recommended[item]["AVG_RATING"]
            var restaurant_name = recommended[item]["REST_NAME"]
            var proj = $.fn.get_food_item_box(id, name, price, diet, healthy_rating, filling_rating, rating, restaurant_name);
            row.append(proj);
            $.fn.add_score($.fn.get_percentage(rating), $("#food_item_"+id+" .overall_rating"))
            i++;
        });

        $.fn.add_event();
    }

    $.fn.get_percentage = function(rating){
        return Math.ceil(((rating/5)*100)/10)*10;
    }

    $.fn.add_score = function(score, element){
        element.empty()
        $("<span class='stars-container1'>")
        .addClass("stars-" + score.toString())
        .text("★★★★★")
        .appendTo(element);
    }

    $.fn.get_random_items = function(){
      $.ajax({
          url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
          method: "POST",
          data:{
                  "actionmode"	: "get_random_items",
                  "USER_ID"     : user_id,
                  "NUM_ITEMS"   : 10
              },
          success:function(data) {
               data = JSON.parse(data);
               if (!data.success){
                   $("#error").html("<b>ERROR GETTING USER DATA!</b>");
                   $.fn.temporary_show("#error");
               }else{
                   random_items = []
                   data = data.dataset[0];
                   data.forEach(function(item){
                     random_items.push({"label" : item["NAME"]})
                   })
                   $("#chart").show();
                   $("#normal_food_items_page").addClass("blur_more")
                   Wheel(random_items)
                   $("#close_chart").on("click", function(){
                     $("#chart").hide();
                     $("#normal_food_items_page").removeClass("blur_more")
                   })
               }
           }
       });
    };

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            user_id = $("#inp_hdn_uid").val();
            $.fn.get_profile_data();
            $.fn.get_all_food_items();
            $.fn.food_items_filter_events();

            $("#get_recom").on("click", function(){
                $("#normal_food_items_page").hide();
                $.fn.websocket_open_and_error();
                $.fn.websocket_response();
                $("#recommended_food_items_page").show();
                $.fn.restart_recommended_filters();
                $.fn.get_recommended_food_items();
                $.fn.recommended_filter_events();
            });

            $("#back").on("click", function(){
                $("#recommended_food_items_page").hide();
                $("#normal_food_items_page").show();
            })

            $("#wheel").on("click", function(){
                $("#chart").show();
                $("#recommended_food_items_page").addClass("blur_more")
                Wheel(top_items);
                $("#close_chart").on("click", function(){
                  $("#chart").hide();
                  $("#recommended_food_items_page").removeClass("blur_more")
                })
            })

            $("#random").on("click", function(){
                $.fn.get_random_items();
            })



        };
        return thispage;
    })();

    pageready.init();

});
