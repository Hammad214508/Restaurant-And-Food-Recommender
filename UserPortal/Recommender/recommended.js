$(document).ready(function(){

    var user_id;

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-recommendation").addClass("active");
    }

    $.fn.get_recommended_food_items = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/Recommender/recommender.php",
            method: "POST",
            data:{
                    "actionmode"	 : "get_recommended_food_items",
                    "USER_ID"        : user_id,
                    // "AVAILABLE"      : available,
                    // "SEARCH"         : food_item_search,
                    // "SORTING"        : sorting,
                    // "FILLING_RATING" : filling_rating_filter, 
                    // "HEALTHY_RATING" : healthy_rating_filter, 
                    // "DIET_TYPE"      : diet_type_filter
                },
            success:function(data) {
                console.log(data)
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR GETTING FOOD ITEMS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    data = data.dataset
                    if (data.length > 0){
                        // $.fn.render_food_item_boxes(data[0]);
                    }else{
                        // parent = $("#food_items_container");
                        // parent.empty();
                        // parent.append("<h1>NO FOOD ITEMS</h1>");
                    }
                }
            }
        });
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            user_id = $("#inp_hdn_uid").val();
            $.fn.get_recommended_food_items();
        };
        return thispage;
    })();

    pageready.init();

});
