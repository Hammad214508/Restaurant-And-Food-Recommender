$(document).ready(function(){

    var user_id;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");

    var available = false;
    var filling_rating_filter, healthy_rating_filter;
    var diet_type_filter = 1;

    $.fn.restart_filters = function(){
        available = false;
        healthy_rating_filter = ""
        filling_rating_filter = ""
        diet_type_filter = 1;

        $('#health_value').html(2.5);
        $('#health_slider').val(2.5);

        $('#filling_value').html(2.5);
        $('#filling_value').val(2.5);

    }
  
    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-recommendation").addClass("active");
    }

    $.fn.get_recommended_food_items = function(){
        websocket.send(
            JSON.stringify(
                {
                    action: 'recommender', 
                    "user_id": user_id,
                    "available": available,
                    "healthy_rating_filter": healthy_rating_filter,
                    "filling_rating_filter": filling_rating_filter, 
                    "diet_type_filter" : diet_type_filter
                }));
    }


    websocket.onmessage = function (event) {
        data = JSON.parse(event.data);
        if (data.type == "recommended_items"){
            $.fn.render_food_item_boxes(data["recommended"], data["order"]);
        }
        else{
            $("#error").html("<b>ERROR GETTING FOOD RECOMMENDATIONS!</b>");
            $.fn.temporary_show("#error");        
        }
    };

    websocket.onopen = function(e) {
        $.fn.get_recommended_food_items();
    };

    websocket.onerror = function(error) {
        $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
        $.fn.temporary_show("#error");    
    };


    $.fn.render_food_item_boxes = function(recommended, order){
        var parent = $("#food_items_container");
        parent.empty();
        var i = 0;
        var row;
        order.forEach(function(item) {
            if (i % 3 == 0){
                row = $("<div class='row'>");
                parent.append(row);
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
            i++;
        }); 
 
        $.fn.add_event();
    }

    $.fn.get_food_item_box = function(id, name, price, diet, healthy_rating, filling_rating, rating, restaurant_name){
        var template = (
            "<div id='food_item_"+id+"' ref="+id+" class=\"col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 bottom-buffer\">"+
            "  <div class=\"grey-box\">"+
            "      <h3>"+name+"</h3>"+
            "      <p><b>Price:</b> "+price+"</p>"+
            "      <p><b>Diet:</b> "+diet+"</p>"+
            "      <p><b>Healthy:</b> "+healthy_rating+"</p>"+
            "      <p><b>Filling:</b> "+filling_rating+"</p>"+
            "      <p><b>Overall Rating:</b> "+rating+"</p>"+
            "      <div class=\"times align-items-end\">"+
            "          <p><b>Restaurant: </b>"+restaurant_name+" </p>"+
            "      </div>"+
            "  </div>"+
            "</div>");
        return $(template);
    }

    $.fn.add_event = function(){
        // $('.white-box').on('click',function() {
        //     if ($(this).attr('href') != "undefined"){
        //         window.location.href = $(this).attr('href');
        //     }
        // })
        $('.grey-box').hover(function(){
          $(this).css("background-color", "grey");
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
            $.fn.get_recommended_food_items();
        });

        // Healthy rating 
        $('#health_value').html($('#health_slider').val());

        $('#health_slider').on('input', function(){
          $('#health_value').html($('#health_slider').val());
        });

        $('#health_slider').on('change', function(){
            healthy_rating_filter = $('#health_slider').val();
            $.fn.get_recommended_food_items();
        });

        // Filling rating
        $('#filling_value').html($('#filling_slider').val());

        $('#filling_slider').on('input', function(){
          $('#filling_value').html($('#filling_slider').val());
        });

        $('#filling_slider').on('change', function(){
            filling_rating_filter = $('#filling_slider').val();
            $.fn.get_recommended_food_items();
        });

        // Diet type
        $("#diet_type").on("change", function(){
            diet_type_filter = $(this).val();
            $.fn.get_recommended_food_items();
        }); 

        $("#more").click(function(){
            $(".more_filters").slideToggle("slow");
         });

         $("#reset").click(function(){
            $.fn.restart_filters();
            $.fn.get_recommended_food_items();
         });
    };

    
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            user_id = $("#inp_hdn_uid").val();
            $.fn.food_items_filter_events();

        };
        return thispage;
    })();

    pageready.init();

});
