$(document).ready(function(){

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-mgr-portal").addClass("active");
    }

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
                  if (data){
                      $.fn.render_restaurant_view(data[0][0]);
                  }else{
                      $.fn.insert_dummy_restaurant();
                  }
              }
            }
        });
    }

    $.fn.render_restaurant_view = function(data){
        parent = $("#data_container");
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

    $.fn.transaction_icons = function(id){
        return (
            '<div id="icons_'+id+'" class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">'+
            '    <i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw icon" style="font-size:2em";></i>'+
            '    <i id="tick" class="fa fa-check icon" style="font-size:2em;color:green"></i>'+
            '    <i id="cross" class="fa fa-close icon" style="font-size:2em;color:red"></i>'+
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
            '        <input type="text" class="form-control mb-3 rest_data" id="'+id+'"  placeholder="'+placeholder+'">'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }


    $.fn.temporary_show = function(id){
        var obj = $(id)
        obj.fadeTo(2000, 500).slideUp(500, function() {
            obj.slideUp(500);
        })
    };

    $.fn.get_ajax_params = function(data){
        return JSON.parse('{"' + decodeURI(data.substring(0)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
           $.fn.activate_nav_bar();
           $.fn.get_restaurant()

        };
        return thispage;
    })();

    pageready.init();

});
