$(document).ready(function(){

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-food-items").addClass("active");
    }

    $.fn.get_all_food_items = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	   : "get_all_food_items",
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
                        parent.append("<h1>NO RESTAURANTS</h1>");
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
            id = food_items[i]["FOOD_ID"];
            name = food_items[i]["NAME"];
            price = food_items[i]["PRICE"];
            diet = $.fn.get_diet_type(food_items[i]["DIET_TYPE"]);
            healthy_rating = food_items[i]["HEALTHY_RATING"]
            filling_rating = food_items[i]["FILLING_RATING"]
            restaurant_name = food_items[i]["RESTAURANT_NAME"]
            var proj = $.fn.get_food_item_box(id, name, price, diet, healthy_rating, filling_rating, restaurant_name);
            row.append(proj);
        }
        $.fn.add_event();
    }

    $.fn.get_food_item_box = function(id, name, price, diet, healthy_rating, filling_rating, restaurant_name){
        var template = (
            "<div id='food_item_"+id+"' ref="+id+" class=\"col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 bottom-buffer\">"+
            "  <div class=\"grey-box\">"+
            "      <h3>"+name+"</h3>"+
            "      <p><b>Price:</b> "+price+"</p>"+
            "      <p><b>Diet:</b> "+diet+"</p>"+
            "      <p><b>Healthy:</b> "+healthy_rating+"</p>"+
            "      <p><b>Filling:</b> "+filling_rating+"</p>"+
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


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            $.fn.get_all_food_items();
        };
        return thispage;
    })();

    pageready.init();

});
 