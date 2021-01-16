$(document).ready(function(){

    var user_id;
    var my_net_rendered = false;

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-connections").addClass("active");
    }

    $.fn.main = function(){
        $(".list-group-item").on('click', function(){
            $(".list-group-item.active").removeClass("active")
            $(this).addClass("active")
        })

        $("#my_net").on('click', function(){
            $(".connections_data").hide();
            $("#my_net_container").show();
            if (!my_net_rendered){
                $.fn.get_connections();
                my_net_rendered = true;
            }
        })

        $("#find").on('click', function(){
            $(".connections_data").hide();
            $("#find_container").show()
            // if (!my_rest_rendered){
            //     $.fn.get_restaurant();
            //     my_rest_rendered = true;
            // }
        })

        $("#requests").on('click', function(){
            $(".connections_data").hide();
            $("#requests_container").show()
            // if (!my_rest_rendered){
            //     $.fn.get_restaurant();
            //     my_rest_rendered = true;
            // }
        })

        $("#my_net").trigger('click');

    }


    $.fn.get_connections = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_connections",
                   "USER_ID"       : user_id,
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR GETTING CONNECTIONS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    data = data.dataset
                    if (data.length > 0){
                        $.fn.render_connections(data[0]);
                    }else{
                        parent = $("#my_net_container")
                        parent.empty();
                        parent.append("<h1>YOU HAVE NO CONNECTIONS</h1>");
                    }
                }
            }
        });
    }


    $.fn.render_connections = function(data){
        var parent = $("#connections");
        for (var i = 0; i < data.length; i++){
            parent.append($.fn.get_user_template(data[i]));
        }
        $.fn.set_user_connections_events();
    }

    $.fn.get_user_template = function(data){
        // data["USER_ID"]
        return (
            '<div id="user_'+data["USER_ID"]+'" class="row mt-2">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center" style="display:none">'+
            '        <div class="form-check">'+
            '            <input type="checkbox" class="user-checkbox form-check-input" ref="'+data["USER_ID"]+'">'+
            '        </div>'+
            '    </div> '+
            '    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">'+
            '        <div class="text-center">'+
                        data["NAME"]+
            '        </div>'+
            '    </div>'+
            '    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">'+
            '        <div class="text-center">'+
                        data["SURNAME"]+
            '        </div>'+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
            '        <div class="text-right">'+
            '            <i class="fa fa-user-times rm-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '</div>'
        )
    }

    $.fn.set_user_connections_events = function(){
        $(".rm-user").on("click", function(){
            var del_id = $(this).attr("ref");
            if (confirm("Are you sure you want to remove connection?")){
                $.fn.remove_connection(del_id);
            }
        });
    }

    $.fn.remove_connection = function(user2){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"  : "delete_connection",
                    "USER1"       : user_id,
                    "USER2"       : user2
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR DELETING CONNECTION!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     console.log("#user_"+user2)
                    $("#user_"+user2).remove();
                 }
             }
         });
    }





    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            user_id = $("#inp_hdn_uid").val();
            $.fn.activate_nav_bar();
            $.fn.main();

        };
        return thispage;
    })();

    pageready.init();

});
