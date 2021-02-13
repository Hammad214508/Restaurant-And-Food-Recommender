$(document).ready(function(){

    var user_id;
    var my_prof_rendered = false;
    var my_net_rendered = false;
    var find_rendered = false;
    var num_requests;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");
    var users_data = {};
    var name = $("#user_name").html()
    name = name.split(" ")
    console.log(name)
    var titles = {};
    titles["my_prof"] = [name[1] +" "+ name[2], "Manage your profile here"]
    titles["my_net"] = ["Connections", "Manage your connections here"]
    titles["find"] = ["People", "Connect with people here"]
    titles["requests"] = ["Requests", "Manage your connections requests here"]
    var user_search = "";



    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-usr-portal").addClass("active");
    }

    websocket.onerror = function(error) {
        $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
        $.fn.temporary_show("#error");
    };

    $.fn.main = function(){
        $(".list-group-item").on('click', function(){
            $(".list-group-item.active").removeClass("active")
            $(this).addClass("active")
            var id = $(this).attr("id");
            $("#title").html(titles[id][0]);
            $("#desc").html(titles[id][1]);
        })

        $("#my_prof").on('click', function(){
            $(".connections_data").hide();
            $("#my_prof_container").show();
            if (!my_prof_rendered){
                $.fn.get_profile_data();
                my_prof_rendered = true;
            }
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
            $("#search_text").on("keyup", function(e){
                user_search = $(this).val();
                $.fn.get_recommended_users();
            }); 
        })

        $("#requests").on('click', function(){
            $(".connections_data").hide();
            $("#requests_container").show()
        })

        $("#create_group").on("click", function(){
            $("#my_net").trigger('click');
            setTimeout(function() {
                $("#connections").addClass("show_border")
                $(".user_rm").hide();
                $(".crt_group").show();}
                , 200);               

            

        })

        $("#my_prof").trigger('click');

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
                     data = data.dataset
                     var parent = $("#my_prof_container");
                     parent.empty()
                     parent.append($.fn.render_user_profile(data[0][0]))
                     $.fn.user_profile_events(data[0][0]);
                 }
             }
         });
    }


    $.fn.render_user_profile = function(data){
        return (
            '<h3 class="text-center mb-4"> MY PROFILE</h3>'+
            $.fn.user_data_input("name", "Name:", data["NAME"])+
            $.fn.user_data_input("surname", "Surname:", data["SURNAME"])+
            $.fn.user_diet_type()+
            $.fn.save_button("save_user_data")
        )
    }

    $.fn.user_data_input = function(id, label, value){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input id="'+id+'" type="text" class="form-control mb-3 prof_data" value="'+value+'"></input>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.user_diet_type = function(){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Diet Type:</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '       <select class="form-control prof_data" id="diet_type">'+
            '           <option value="1">Non Vegetarian</option>'+
            '           <option value="2">Vegetarian</option>'+
            '           <option value="3">Vegan</option>'+
            '       </select>'+
            '    </div>'+
                 $.fn.transaction_icons("diet_type")+
            '</div>'

        )
    }

    $.fn.save_button = function(id){
        return (
            '<div class="row mt-3">'+
            '    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>'+
            '    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">'+
            '        <button id="'+id+'" type="button" class="btn btn-secondary btn-lg">Save</button>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }


    $.fn.user_profile_events = function(data){
        $("#diet_type").val(data["DIET_TYPE"])

        $(".prof_data").on("change", function(){
            $.fn.update_user_profile_data($(this).attr("id"));
        })

        $("#save_user_data").on("click", function(){
            $.fn.temporary_show("#icons_save_user_data #tick");
        });
    }


    $.fn.update_user_profile_data = function(field){
        $.fn.temporary_show("#icons_"+field+" #loading");

        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "update_user_profile_data",
                    "USER_ID"       : user_id,
                    "NAME"          : $("#name").val(),
                    "SURNAME"       : $("#surname").val(),
                    "DIET_TYPE"     : $("#diet_type").val(),
                },
            success:function(data) {
                 $(".icon").hide();
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR UPDATING USER DATA!</b>");
                     $.fn.temporary_show("#error");
                     $.fn.temporary_show("#icons_"+field+" #cross");
                 }else{
                     $.fn.temporary_show("#icons_"+field+" #tick");
                 }
             }
         });
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
                        parent.append("<h3>YOU HAVE NO CONNECTIONS</h3>");
                    }
                }
            }
        });
    }


    $.fn.render_connections = function(data){
        var parent = $("#connections");
        parent.append("<hr>")
        for (var i = 0; i < data.length; i++){
            parent.append($.fn.get_user_template(data[i]));
            parent.append("<hr>")
        }

        $.fn.set_user_connections_events();
    }

    $.fn.get_user_template = function(data){
        return (
            '<div id="my_net_user_'+data["USER_ID"]+'" class="row mt-2 p-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 crt_group text-center" style="display:none">'+
            '        <div class="form-check">'+
            '            <input type="checkbox" class="user-checkbox form-check-input" type="checkbox" ref="'+data["USER_ID"]+'">'+
            '        </div>'+
            '    </div> '+
            '    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 ">'+
            '            <span id="name_'+data["USER_ID"]+'">'+data["NAME"]+'</span>'+
            '            <span id="surname_'+data["USER_ID"]+'">'+data["SURNAME"]+'</span>'+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '           <i class="fa fa-user-times usr-icon rm-user" data-toggle="modal" data-target="#exampleModalCenter" ref="'+data["USER_ID"]+'"></i>'+
            '    </div>'+
            '</div>'
        )
    }

    $.fn.set_user_connections_events = function(){
        $(".rm-user").on("click", function(){
            $("#delete_connection").attr("ref", $(this).attr("ref"));
        });

        $("#delete_connection").on("click", function(){
            $.fn.remove_connection($(this).attr("ref"));
            $("#exampleModalCenter").hide();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        })

        $("#get_recom_btn").on("click", function(){
            users = $('input[type=checkbox]:checked').map(function(_, el) {return $(el).attr("ref");}).get();

            $.each(users, function( index, value ){
                var name = $("#name_"+value).html()
                var surname = $("#surname_"+value).html()
                users_data[value] = [name, surname]
            });

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
                    "SEARCH"        : user_search
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING RECOMMENDED USERS!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     data = data.dataset
                     var num_connections =  (data.length) ? data[0].length : 0;
                     if (num_connections > 0){
                         $.fn.render_recommended_connections(data[0]);
                     }else{
                         parent = $("#recommended_users")
                         parent.empty();
                         parent.append("<h3>NO USERS TO SHOW</h3>");
                     }
                 }
             }
         });
    }

    $.fn.render_recommended_connections = function(data){
        var parent = $("#recommended_users");
        parent.empty();
        parent.append("<hr>")
        for (var i = 0; i < data.length; i++){
            if (data[i]["USER_ID"] != user_id){
                parent.append($.fn.get_user_recommended_template(data[i]));
                parent.append("<hr>")
            }

        }
        $.fn.set_user_recommended_events();
    }

    $.fn.get_user_recommended_template = function(data){
        return (
            '<div id="container_'+data["USER_ID"]+'" class="container-fluid">'+
            '<div class="row mt-2">'+
            '    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">'+
                    data["NAME"]+ ' ' + data["SURNAME"]+
            '    </div>'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 user_rm">'+
            '        <div id="icon_'+data["USER_ID"]+'">'+
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
        ' <div id="connection_confirmation" class="container mt-2 mb-2">'+
        '    <div class="row mt-2">'+
        '        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
        '            <textarea id="message" rows="4" cols="42" placeholder="Leave a message here..."></textarea>'+
        '        </div>'+
        '    </div>'+
        '    <div class="container mt-2 mb-2">'+
        '        <div class="row">'+
        '            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 text-right">'+
        '                <button id="cancel" type="button" class="btn btn-secondary">Cancel</button>'+
        '                <button id="send" type="button" class="btn btn-secondary">Send</button>'+
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
                        parent.append('<h3>NO CONNECTION REQUESTS TO SHOW</h3');
                    }
                }
             }
         });
    }

    $.fn.render_connection_requests = function(data){
        var parent = $("#requests_container");
        for (var i = 0; i < data.length; i++){
            parent.append("<hr>")
            parent.append($.fn.get_user_connection_request(data[i]));
        }
        parent.append("<hr>")
        $.fn.set_user_connection_request_events();
    }

    $.fn.get_user_connection_request = function(data){
        return (
            '<div id="request_'+data["USER_ID"]+'" class="container-fluid" >'+
            '<div class="row mt-2">'+
            '    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">'+
            '      <strong>'+data["NAME"]+ ' ' +  data["SURNAME"] +'</strong>'+
            '    </div>'+
            '    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 user_rm">'+
            '        <div class="text-left">'+
            '            <i class="fa fa-user-plus usr-icon acc-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 user_rm">'+
            '        <div class="text-left">'+
            '            <i class="fa fa-user-times usr-icon rej-user" ref="'+data["USER_ID"]+'"></i>'+
            '        </div>'+
            '    </div>'+
            '</div>'+
            '<div class="row mt-2 mb-2 ml-1">'+
            '   <p>'+data["MESSAGE"]+'</p>'+
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
                $.fn.restaurants_page_setup();
                $.fn.render_restaurant_boxes(data["recommended"][0], data["recommended"][1]);
            }
            else{
                $("#error").html("<b>ERROR GETTING RESTTAURANT RECOMMENDATIONS!</b>");
                $.fn.temporary_show("#error");
            }
        };
    }

    $.fn.get_person_in_group = function(user){
        return ("<p>"+users_data[user][0] + " " + users_data[user][1]+"</p>");
    }

    $.fn.restaurants_page_setup = function(){
        $("#connections_page").hide();
        $("#recommended_rest_page").show();
        parent = $("#group_people")
        parent.empty();
        for (var user in users_data) {
            parent.append($.fn.get_person_in_group(user))
        }
        parent.append('<button id="change_group" type="button" class="btn btn-secondary">Change Group</button>')
        $("#change_group").on("click", function(){
            $("#connections_page").show();
            $("#recommended_rest_page").hide();
        })
    }


    $.fn.render_restaurant_boxes = function(restaurants, order){
        var parent = $("#restaurants_container");
        parent.empty();
        var i = 0;
        for (var rest in order) {
            if (i % 3 == 0){
                var row = $("<div class='row'>");
                parent.append(row);
            }
            var r_id = order[rest];
            name = restaurants[r_id]["NAME"];
            email = restaurants[r_id]["EMAIL"];
            number = restaurants[r_id]["NUMBER"];
            address = restaurants[r_id]["ADDRESS"];
            rating = restaurants[r_id]["RATING"]
            opens = $.fn.formatAMPM($.fn.string_time_to_date(restaurants[r_id]["OPENING_TIME"]));
            closes = $.fn.formatAMPM($.fn.string_time_to_date(restaurants[r_id]["CLOSING_TIME"]));

            var proj = $.fn.get_restaurant_box(name, email, number, address, rating, opens, closes, i);
            row.append(proj);
            i += 1;
        }
        $.fn.add_event();
    }

    $.fn.get_restaurant_box = function(name, email, number, address, rating, opens, closes, i){
        var template = (
            "<div id='restaurant_"+i+"' class=\"col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 bottom-buffer\">"+
            "  <div class=\"grey-box\">"+
            "      <h3>"+name+"</h3>"+
            "      <p><b>Email:</b> "+email+"</p>"+
            "      <p><b>Number:</b> "+number+"</p>"+
            "      <p><b>Address:</b> "+address+"</p>"+
            "      <p><b>Rating:</b> "+rating+"</p>"+
            "      <div class=\"times\">"+
            "          <p><b>Open:</b> "+opens+" - "+closes+"</p>"+
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

    $.fn.string_time_to_date = function(string){
        var pieces = string.split(':')
        var hour = parseInt(pieces[0], 10);
        var minute = parseInt(pieces[1], 10);
        var second = parseInt(pieces[2], 10);
        return new Date(2000, 01, 02, hour, minute, second);
    };

    $.fn.formatAMPM = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
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
