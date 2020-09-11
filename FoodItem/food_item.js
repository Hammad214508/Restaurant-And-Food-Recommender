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

     $.fn.render_food_item = function(data){
         $("#food_name").append(data["NAME"])
         console.log(data)
     };

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            food_id = $("#inp_hdn_food_id").length > 0 ? $("#inp_hdn_food_id").val() : "";
            $.fn.get_food_item_by_id();

        };
        return thispage;
    })();

    pageready.init();

});
