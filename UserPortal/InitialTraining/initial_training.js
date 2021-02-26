$(document).ready(function(){
    var user_id;
    var rand_items;
    var item_count = 0;
    var total_count;

    $.fn.get_random_items = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_random_items",
                   "USER_ID"       : user_id
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR GETTING FOOD ITEMS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    rand_items = data.dataset[0]
                    total_count = rand_items.length
                    $.fn.render_item();
                }
            }
        });
    }

    $.fn.render_item = function(){
       $("#count").html(item_count+1 + " of " + total_count)
       $("#name").html(rand_items[item_count]["NAME"])
       if (rand_items[item_count]["IMAGE_NAME"]){
            $("#image").attr("src", "/Restaurant-And-Food-Recommender/Images/FoodImages/"+rand_items[item_count]["IMAGE_NAME"]);
       }else{
            $("#image").attr("src", "");
       }
       $("#description").html(rand_items[item_count]["DESCRIPTION"])
    }

    $.fn.insert_user_rating = function(food_id, rating){
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
                }
            }
        });
    }

    $.fn.training_done = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "initial_training_done",
                    "USER_ID"       : user_id,
                },
            success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR UPDATING INITIAL TRAINING!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    window.open("/Restaurant-And-Food-Recommender/UserPortal/Profile/", "_self");
                }
            }
        });

    }




    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            user_id = $("#inp_hdn_uid").val();
            $('input[name="star"]').removeAttr("checked");

            $.fn.get_random_items()
            $(".radio-btn").on("change", function(){
                var rating = $('input[name="star"]:checked').val()
                $.fn.insert_user_rating(rand_items[item_count]["FOOD_ID"], rating)
                item_count += 1;
                if (item_count == total_count){
                    $.fn.training_done();
                }else{
                    $.fn.render_item()
                    $('input[name="star"]').removeAttr("checked");
                }

            })


        };
        return thispage;
    })();

    pageready.init();

});
