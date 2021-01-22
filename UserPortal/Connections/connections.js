$(document).ready(function(){

    var user_id;
    var my_net_rendered = false;
    var find_rendered = false;
    var num_requests;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");

    websocket.onerror = function(error) {
        $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
        $.fn.temporary_show("#error");    
    };


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
            if (!find_rendered){
                $.fn.get_recommended_users();
                find_rendered = true;
            }
        })

        $("#requests").on('click', function(){
            $(".connections_data").hide();
            $("#requests_container").show()
        })

        $("#create_group").on("click", function(){
            $("#my_net").trigger('click');
            $("#connections").addClass("show_border")
            $(".user_rm").hide();;
            $(".crt_group").show();
        })

        $("#my_net").trigger('click');
        // $("#find").trigger('click');
        // $("#requests").trigger('click');


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
        return (
            '<div id="my_net_user_'+data["USER_ID"]+'" class="row mt-2">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 crt_group text-center" style="display:none">'+
            '        <div class="form-check">'+
            '            <input type="checkbox" class="user-checkbox form-check-input" type="checkbox" ref="'+data["USER_ID"]+'">'+
            '        </div>'+
            '    </div> '+
            '    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">'+
                        data["NAME"]+
            '    </div>'+
            '    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">'+
                        data["SURNAME"]+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '        <div class="text-right">'+
            '            <i class="fa fa-user-times usr-icon rm-user" ref="'+data["USER_ID"]+'"></i>'+
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

        $("#get_recom_btn").on("click", function(){
            users = $('input[type=checkbox]:checked').map(function(_, el) {return $(el).attr("ref");}).get();
            $.fn.get_group_recommedations(users);
            $.fn.websocket_response();
        })

        $("#not_recom").on("click", function(){
            $("#connections").removeClass("show_border")
            $(".user_rm").show();;
            $(".crt_group").hide();
        })
  
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
                    $("#my_net_user_"+user2).remove();
                 }
             }
         });
    }

    $.fn.get_recommended_users = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "get_recommended_users",
                    "USER_ID"       : user_id,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING RECOMMENDED USERS!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     data = data.dataset
                     var num_connections =  (data.length) ? data[0].length : 0;
                     if (num_connections > 1){
                         $.fn.render_recommended_connections(data[0]);
                     }else{
                         parent = $("#find_container")
                         parent.empty();
                         parent.append("<h1>NO USERS TO SHOW</h1>");
                     }
                 }
             }
         });
    }

    $.fn.render_recommended_connections = function(data){
        var parent = $("#recommended_users");
        for (var i = 0; i < data.length; i++){
            if (data[i]["USER_ID"] != user_id){
                parent.append($.fn.get_user_recommended_template(data[i]));
            }
        }
        $.fn.set_user_recommended_events();
    }

    $.fn.get_user_recommended_template = function(data){
        return (
            '<div id="container_'+data["USER_ID"]+'" class="container-fluid">'+
            '<div class="row mt-2">'+
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
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '        <div id="icon_'+data["USER_ID"]+'" class="text-right">'+
            '            <i  class="fa fa-user-plus usr-icon add-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '</div>'+
            '</div>'
        )
    }
    

    $.fn.set_user_recommended_events = function(){
        $(".add-user").on("click", function(){
            var uid = $(this).attr("ref");
            $("#connection_confirmation").remove();
            $("#container_"+uid).append($.fn.get_connection_confirmation());
            $.fn.connection_confirmation_events(uid);
        });
    }

    $.fn.get_connection_confirmation = function(){
        return (
        '    <div id="connection_confirmation" class="container mt-2">'+
        '    <div class="row mt-2">'+
        '        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>'+
        '        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
        '            <textarea id="message" rows="4" cols="42" placeholder="Leave a message here..."></textarea>'+
        '        </div>'+
        '        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>'+
        '    </div>'+
        '    <div class="container mt-2 mb-2">'+
        '        <div class="row">'+
        '            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>'+
        '            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">'+
        '                <button id="send" type="button" class="btn btn-secondary">Send</button>'+
        '            </div>'+
        '            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">'+
        '                <button id="cancel" type="button" class="btn btn-secondary">Cancel</button>'+
        '            </div>        '+
        '            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>'+
        '            </div>'+
        '        </div>'+
        '    </div>  '+
        '</div>'
        )
 
    }

    $.fn.connection_confirmation_events = function(uid){
        $("#send").on('click', function(){
            $.fn.send_connection_request(uid);
        })

        $("#cancel").on('click', function(){
            $("#connection_confirmation").remove();
        })

    }


    $.fn.send_connection_request = function(user2){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"  : "send_connection_request",
                    "TYPE"        : "connection_request",
                    "FROM"        : user_id,
                    "TO"          : user2,
                    "MESSAGE"     : $("#message").val()
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR SENDING CONNECTION REQUEST!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    $("#connection_confirmation").remove();
                    $("#icon_"+user2).empty();
                    $("#icon_"+user2).append(
                        '<i class="fa fa-check" aria-hidden="true"></i>'
                    );
                 }
             }
         });
    }

    $.fn.get_connection_requests = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"  : "get_connection_requests",
                    "USER_ID"     : user_id
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING CONNECTION REQUEST!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    data = data.dataset
                    num_requests =  (data.length) ? data[0].length : 0;
                    $("#num_notif").html(num_requests)
                    if (num_requests > 0){
                        $.fn.render_connection_requests(data[0]);
                    }else{
                        parent = $("#requests_container")
                        parent.empty();
                        parent.append("<h1>NO CONNECTION REQUESTS TO SHOW</h1>");
                    }
                }
             }
         });
    }

    $.fn.render_connection_requests = function(data){
        var parent = $("#requests_container");
        for (var i = 0; i < data.length; i++){
            parent.append($.fn.get_user_connection_request(data[i]));
        }
        $.fn.set_user_connection_request_events();
    }

    $.fn.get_user_connection_request = function(data){
        return (
            '<div id="request_'+data["USER_ID"]+'" class="container-fluid" >'+
            '<div class="row mt-2">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
                        data["NAME"]+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
                        data["SURNAME"]+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '        <div class="text-left">'+
            '            <i class="fa fa-user-plus usr-icon acc-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '        <div class="text-left">'+
            '            <i class="fa fa-user-times usr-icon rej-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '</div>'+
            '<div class="row mt-2 mb-2">'+
            '    <textarea rows="4" cols="42">'+data["MESSAGE"]+'</textarea>'+
            '</div>'+
            '</div>'
        )
    }

    $.fn.set_user_connection_request_events = function(){
        $(".acc-user").on('click', function(){
            var uid = $(this).attr("ref");
            $.fn.accept_reject_request(uid, "accept")
        })

        $(".rej-user").on('click', function(){
            var uid = $(this).attr("ref");
            $.fn.accept_reject_request(uid, "reject")
        })
    }

    $.fn.accept_reject_request = function(uid, response){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"  : "connection_request_response",
                    "RESPONSE"    : response,
                    "MY_ID"       : user_id,
                    "OTHER_ID"    : uid,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     var txt = (response == "accept") ? "ACCEPTING" : "REJECTING";
                     $("#error").html("<b>ERROR "+txt+" REQUEST!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    $("#request_"+uid).remove();
                    num_requests -= 1;
                    $("#num_notif").html(num_requests);
                 }
             }
         });

    }

    $.fn.get_group_recommedations = function(users){
        users.push(user_id)
        websocket.send(
            JSON.stringify(
                {
                    action: 'group_recommender', 
                    "users": users,
                }));
    }


    $.fn.websocket_response = function(){
        websocket.onmessage = function (event) {
            data = JSON.parse(event.data);
            if (data.type == "recommended_items"){
                $.fn.render_restaurant_boxes(data["recommended"][0], data["recommended"][1]);
            }
            else{
                $("#error").html("<b>ERROR GETTING RESTTAURANT RECOMMENDATIONS!</b>");
                $.fn.temporary_show("#error");        
            }
        };
    }

    $.fn.render_restaurant_boxes = function(restaurants, order){
        

    }


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            user_id = $("#inp_hdn_uid").val();
            $.fn.activate_nav_bar();
            $.fn.get_connection_requests();
            $.fn.main();

        };
        return thispage;
    })();

    pageready.init();

});
