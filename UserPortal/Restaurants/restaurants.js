$(document).ready(function(){
    var user_id;
    var rest_search = "";
    var sorting = "none";
    var open = false;
    var r_open = false;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");  

    
    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-restaurants").addClass("active");
    }

    $.fn.get_all_restaurants = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
           method: "POST",
           data:{
                   "actionmode"	   : "get_all_restaurants",
                   "OPEN"          : open, 
                   "SEARCH"        : rest_search,
                   "SORTING"       : sorting
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR GETTING RESTAURANTS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    data = data.dataset
                    if (data.length > 0){
                        $.fn.render_restaurant_boxes(data[0]);
                    }else{
                        parent = $("#restaurants_container")
                        parent.empty();
                        parent.append("<h3>NO RESTAURANTS</h3>");
                    }
                }
            }
        });
    }

    $.fn.render_restaurant_boxes = function(restaurants){
        var num_restaurants = restaurants.length;
        var parent = $("#restaurants_container");
        parent.empty();
        for(var i = 0; i < num_restaurants; i++){
            if (i % 3 == 0){
                var row = $("<div class='row'>");
                parent.append(row);
            }
            name = restaurants[i]["NAME"];
            email = restaurants[i]["EMAIL"];
            number = restaurants[i]["NUMBER"];
            address = restaurants[i]["ADDRESS"];
            rating = restaurants[i]["RATING"]
            opens = $.fn.formatAMPM($.fn.string_time_to_date(restaurants[i]["OPENING_TIME"]));
            closes = $.fn.formatAMPM($.fn.string_time_to_date(restaurants[i]["CLOSING_TIME"]));

            var proj = $.fn.get_restaurant_box(name, email, number, address, rating, opens, closes, i);
            row.append(proj);
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

    $.fn.restaurant_filter_events = function(){
        // Open restaurants
        $("#open_rest").on("change", function(){
            open = $(this).prop("checked");
            $.fn.get_all_restaurants();
        });

        // Search bar
        $("#search_text").on("keyup", function(e){
            rest_search = $(this).val();
            $.fn.get_all_restaurants();
        }); 

        // Sorting 
        $("#sorting").on("change", function(){
            sorting = $(this).val();
            $.fn.get_all_restaurants();
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


    $.fn.render_recommended_restaurant_boxes = function(restaurants, order){
        var parent = $("#r_restaurants_container");
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

    $.fn.recommended_restaurant_filter_events = function(){
        // Open restaurants
        $("#r_open_rest").on("change", function(){
            r_open = $(this).prop("checked");
            $.fn.get_recommended_restaurants()
        });
    };


    $.fn.get_recommended_restaurants = function(){
        websocket.send(
            JSON.stringify(
                {
                    action: 'user_restaurant_recommender', 
                    "user_id": user_id, 
                    "open" : r_open
                }));
    }

    $.fn.websocket_response = function(){
        websocket.onmessage = function (event) {
            data = JSON.parse(event.data);
            if (data.type == "recommended_items"){
                if (data["recommended"][1].length > 0){
                    $.fn.render_recommended_restaurant_boxes(data["recommended"][0], data["recommended"][1]);
                }else{
                    parent = $("#r_restaurants_container");
                    parent.empty();
                    parent.append("<h3>NO RESTAURANTS</h3>");
                }
            }
            else{
                $("#error").html("<b>ERROR GETTING RESTAURANT RECOMMENDATIONS!</b>");
                $.fn.temporary_show("#error");        
            }
        };
    }

    $.fn.websocket_open_and_error = function(){

        websocket.onerror = function(error) {
            $("#error").html("<b>ERROR WITH WEBSOCKET SERVER</b>");
            $.fn.temporary_show("#error");    
        };
    }



    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            user_id = $("#inp_hdn_uid").val();
            $.fn.activate_nav_bar();
            $.fn.get_all_restaurants();
            $.fn.restaurant_filter_events();

            $("#get_recom").on("click", function(){
                $("#normal_restaurants_page").hide();
                $.fn.websocket_open_and_error();
                $.fn.websocket_response();
                $("#r_restaurant_page").show();
                $.fn.get_recommended_restaurants();
                $.fn.recommended_restaurant_filter_events()
            
            });


            $("#back").on("click", function(){
                $("#r_restaurant_page").hide();
                $("#normal_restaurants_page").show();
            })

        };
        return thispage;
    })();

    pageready.init();

});
 