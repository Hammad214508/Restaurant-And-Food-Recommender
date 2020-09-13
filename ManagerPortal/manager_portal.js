$(document).ready(function(){
    var restaurant_id;
    var my_rest_rendered = false;
    var view_rendered = false;
    var today_rendered = false;

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-mgr-portal").addClass("active");
    }

    /*****************************************************************
    *                        MY RESTAURANT                           *
    ******************************************************************/

    $.fn.get_restaurant = function(){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_restaurant",
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING RESTAURANT!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      restaurant_id = data[0][0]["RESTAURANT_ID"]
                      $.fn.render_restaurant_view(data[0][0]);
                  }else{
                      $.fn.insert_dummy_restaurant();
                  }
              }
            }
        });
    }

    $.fn.render_restaurant_view = function(data){
        var parent = $("#my_rest_container");
        parent.append($.fn.get_restaurant_html())
        $.fn.restaurant_data_events(data);
    }

    $.fn.get_restaurant_html = function(){
        return (
            '<h3 class="text-center mb-4"> MY RESTAURANT</h3>'+
            $.fn.rest_data_input("name", "Restaurant Name:", "Your Restaurant's Name" )+
            $.fn.rest_data_input("email", "Restaurant Email:", "Your Restaurant's Email" )+
            $.fn.rest_data_input("contact", "Contact Number:", "Your Restaurant's Number" )+
            $.fn.rest_data_input("address", "Restaurant Address:", "Your Restaurant's Address" )+
            $.fn.rest_data_input("website", "Restaurant Website:", "Your Restaurant's Website" )+
            $.fn.save_button("save_rest_data")
        )
    }

    $.fn.restaurant_data_events = function(data){
        $("#name").val(data["NAME"]);
        $("#email").val(data["EMAIL"]);
        $("#contact").val(data["NUMBER"]);
        $("#address").val(data["ADDRESS"]);
        $("#website").val(data["WEBSITE"]);

        $(".icon").hide();

        $(".rest_data").on("change", function(){
            $.fn.update_restaurant($(this).attr("id"));
        });

        $("#save_rest_data").on("click", function(){
            $.fn.temporary_show("#icons_save_rest_data #tick");
        });

    }

    $.fn.update_restaurant = function(field){
        $.fn.temporary_show("#icons_"+field+" #loading")
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "update_restaurant",
                   "FIELD"         : field,
                   "NAME"          : $("#name").val(),
                   "EMAIL"         : $("#email").val(),
                   "NUMBER"        : $("#contact").val(),
                   "ADDRESS"       : $("#address").val(),
                   "WEBSITE"       : $("#website").val()
               },
           success:function(data) {
              $(".icon").hide();
              var params = $.fn.get_ajax_params(this.data)
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR UPDATING RESTAURANT!</b>");
                  $.fn.temporary_show("#error");
                  $.fn.temporary_show("#icons_"+params["FIELD"]+" #cross");
              }else{
                  $.fn.temporary_show("#icons_"+params["FIELD"]+" #tick");
              }
            }
        });

    }

    $.fn.insert_dummy_restaurant = function(){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "add_restaurant",
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR REGISTERING RESTAURANT!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  $.fn.get_restaurant()
              }
            }
        });
    }

    $.fn.save_button = function(id){
        return (
            '<div class="row" id="row_'+id+'">'+
            '    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>'+
            '    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">'+
            '        <button id="'+id+'" type="button" class="btn btn-secondary btn-lg">Save</button>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.rest_data_input = function(id, label, placeholder){
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
        )
    }


    /*****************************************************************
    *                           FOOD ITEMS                           *
    ******************************************************************/


    $.fn.get_food_items = function(){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_food_items",
                   "RESTAURANT_ID" : restaurant_id
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING FOOD ITEMS!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      $.fn.render_food_items(data[0]);
                  }else{
                      var parent = $("#view_container");
                      parent.append('<h3>NO FOOD ITEMS TO DISPLAY!</h3>');
                  }
              }
            }
        });
    }

    $.fn.render_food_items = function(data){
        var parent = $("#view_container");
        parent.append(
            '<div class="row">'+
            '    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">'+
            '       <h3 class="text-center mb-4"> YOUR FOOD ITEMS LIST</h3> '+
            '    </div>'+
            '    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
            '       <button id="new_food_btn" class="btn btn-secondary"><i class="fa fa-plus"></i></button>'+
            '    </div>'+
            '</div>'

        );
        $("#new_food_btn").on("click", function(){
            $("#new_food").trigger('click');
        })
        parent.append($.fn.get_table_template());
        $.fn.render_food_rows(data);

    }

    $.fn.get_table_template = function(){
        return (
            '<table class="table table-striped table-bordered">'+
            '   <thead class="thead-dark">'+
            '       <tr>'+
            '       <th> Food Name </th>'+
            '       <th> Price </th>'+
            '       <th> Description </th>'+
            '       <th> Available </th>'+
            '       <th> More </th>'+

            '       </tr>'+
            '   </thead>'+
            '   <tbody id="food_items">'+
            '   </tbody>'+
            '</table>'
        );
    }


    $.fn.render_food_rows = function(data){
         var parent = $("#food_items");
         for (var i = 0; i < data.length; i++){
             parent.append($.fn.food_item_row(data[i]));
             $("#checkbox_food_"+data[i]["FOOD_ID"]).on("change", function(){
                 var food_id =  $(this).parent().parent().attr('id');
                 var food_field = $(this).attr("ref");
                 var value = this.checked
                 $.fn.update_food_item(food_id, food_field, value);
             });
         }

         $(".more").on('click', function(){
             var f_id = $(this).attr("ref")
             window.open('/Online-Food-Order/FoodItem/?food_id='+f_id, '_blank');
         })

         $("td[contenteditable=true]").on('focusout',function(){
            var food_id =  $(this).parent().attr('id');
            var food_field = $(this).attr("ref");
            var value = $(this).text()

            $.fn.update_food_item(food_id, food_field, value);
         })


     };

    $.fn.food_item_row = function(data){
        var checked = data["AVAILABLE"] == "true" ? "checked" : "";
        return (
            '<tr id="'+data["FOOD_ID"]+'" class="cursor_hand">'+
            '  <td contenteditable=true ref=NAME>'+data["NAME"]+'</td>'+
            '  <td contenteditable=true ref=PRICE>'+data["PRICE"]+'</td>'+
            '  <td contenteditable=true ref=DESCRIPTION>'+data["DESCRIPTION"]+'</td>'+
            '  <td class="text-center"><input id="checkbox_food_'+data["FOOD_ID"]+'" ref="AVAILABLE" type="checkbox"'+checked+'/></td>'+
            '  <td ref="'+data["FOOD_ID"]+'" class="text-center more"><i class="fa fa-external-link-square" aria-hidden="true"></i></td>'+

            '</tr>'
        );
    }

    $.fn.update_food_item = function(food_id, food_field, value){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "update_food_item",
                   "FOOD_ID"       : food_id,
                   "COLUMN"        : food_field,
                   "VALUE"         : value,
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR UPDATING FOOD ITEM!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  today_rendered = false;
              }
            }
        });
    }


    /*****************************************************************
    *                           NEW FOOD ITEM                        *
    ******************************************************************/

    $.fn.new_food_form = function(){
        return (
            '<h3 class="text-center mb-4"> NEW FOOD ITEM</h3>'+
            $.fn.new_food_input("food_name", "Name:", "Food Name" )+
            $.fn.new_food_input("food_price", "Price:", "Food Price" )+
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Description:</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <textarea type="text" class="form-control mb-3" rows="2" maxlength = "200" id="food_description" placeholder="Food Description"></textarea>'+
            '        <span id="char_limit" style="font-size:0.6em; display:none;">Character limit: 200</span>'+
            '    </div>'+
            '</div>'+

            '<div class="text-center">'+
            '   <button id="add_new_food" type="button" class="btn btn-secondary btn-lg">ADD</button>'+
            '<div>'
        );
    }

    $.fn.new_food_input = function(id, label, placeholder){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input type="text" class="form-control mb-3" id="'+id+'" placeholder="'+placeholder+'">'+
            '    </div>'+
            '</div>'
        );
    }

    $.fn.add_new_food_events = function(){

        $("#food_description").on('focus', function(){
            $("#char_limit").show();
        })

        $("#food_description").on('blur', function(){
            $("#char_limit").hide();
        });

        $("#add_new_food").on('click', function(){
            $.fn.add_new_food();
        });
    }

    $.fn.add_new_food = function(){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "add_new_food",
                   "NAME"          : $("#food_name").val(),
                   "PRICE"         : $("#food_price").val(),
                   "DESCRIPTION"   : $("#food_description").val(),
                   "RESTAURANT_ID" : restaurant_id
               },
           success:function(data) {
              var params = $.fn.get_ajax_params(this.data);
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR ADDING FOOD ITEM!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  var parent = $("#food_items");
                  params["NAME"] = params["NAME"].replace('+', ' ');
                  params["DESCRIPTION"] = params["DESCRIPTION"].replace('+', ' ');
                  parent.append($.fn.food_item_row(params));
                  $("#view").trigger('click');
              }
            }
        });
    }

    /*****************************************************************
    *                           TODAY'S MENU                         *
    ******************************************************************/

    $.fn.get_today_menu = function(){
        $.ajax({
           url: "/Online-Food-Order/ManagerPortal/mgr_portal_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_today_menu",
                   "RESTAURANT_ID" : restaurant_id
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR GETTING TODAY'S MENU!</b>");
                  $.fn.temporary_show("#error");
              }else{
                  data = data.dataset
                  if (data.length > 0){
                      $.fn.render_menu(data[0]);
                  }else{
                      var parent = $("#today_container");
                      parent.append('<h3>NO FOOD ITEMS TO DISPLAY!</h3>');
                  }
              }
            }
        });
    }

    $.fn.render_menu = function(data){
        var parent = $("#today_container");
        parent.empty();
        parent.append('<h3 class="text-center mb-4"> TODAY\'S MENU </h3>');
        parent.append($.fn.get_menu_template_template());
        $.fn.render_today_food_rows(data);
    }

    $.fn.get_menu_template_template = function(){
        return (
            '<table class="table table-striped table-bordered">'+
            '   <thead class="thead-dark">'+
            '       <tr>'+
            '       <th> Food Name </th>'+
            '       <th> Price </th>'+
            '       <th> Description </th>'+
            '       </tr>'+
            '   </thead>'+
            '   <tbody id="today_menu">'+
            '   </tbody>'+
            '</table>'
        );
    }

    $.fn.render_today_food_rows = function(data){
         var parent = $("#today_menu");
         for (var i = 0; i < data.length; i++){
             parent.append($.fn.today_food_item_row(data[i]));
         }
    }

    $.fn.today_food_item_row = function(data){
        return (
            '<tr id="'+data["FOOD_ID"]+'">'+
            '  <td>'+data["NAME"]+'</td>'+
            '  <td>'+data["PRICE"]+'</td>'+
            '  <td>'+data["DESCRIPTION"]+'</td>'+
            '</tr>'
        )
    }


    /*****************************************************************
    *                               OTHER                            *
    ******************************************************************/


    $.fn.temporary_show = function(id){
        var obj = $(id)
        obj.fadeTo(2000, 500).slideUp(500, function() {
            obj.slideUp(500);
        })
    };

    $.fn.get_ajax_params = function(data){
        return JSON.parse('{"' + decodeURI(data.substring(0)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }

    $.fn.transaction_icons = function(id){
        return (
            '<div id="icons_'+id+'" class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">'+
            '    <i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw icon" style="font-size:2em; display:none";></i>'+
            '    <i id="tick" class="fa fa-check icon" style="font-size:2em;color:green; display:none"></i>'+
            '    <i id="cross" class="fa fa-close icon" style="font-size:2em;color:red; display:none"></i>'+
            '</div>'
        )
    }

    $.fn.main = function(){
        $(".list-group-item").on('click', function(){
            $(".list-group-item.active").removeClass("active")
            $(this).addClass("active")
        })

        $("#my_rest").on('click', function(){
            $(".mgr_portal_data").hide();
            $("#my_rest_container").show()
            if (!my_rest_rendered){
                $.fn.get_restaurant();
                my_rest_rendered = true;
            }
        })

        $("#view").on('click', function(){
            $(".mgr_portal_data").hide();
            $("#view_container").show();
            if (!view_rendered){
                $.fn.get_food_items();
                view_rendered = true;
            }
        })

        $("#new_food").on('click', function(){
            $(".mgr_portal_data").hide();
            $("#new_food_container").show();
            $("#new_food_container").empty();
            $("#new_food_container").append($.fn.new_food_form())
            $.fn.add_new_food_events();
        })

        $("#today").on('click', function(){
            $(".mgr_portal_data").hide();
            $("#today_container").show();
            if (!today_rendered){
                $.fn.get_today_menu();
                today_rendered = true;
            }
        })


        $("#my_rest").trigger('click');
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
           $.fn.activate_nav_bar();
           $.fn.main();

        };
        return thispage;
    })();

    pageready.init();

});
