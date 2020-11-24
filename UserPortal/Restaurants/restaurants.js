$(document).ready(function(){

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
                        console.log("No restaurants")
                    }
              }
            }
        });
    }

    $.fn.render_restaurant_boxes = function(restaurants){
        var num_restaurants = restaurants.length;
        var parent = $("#restaurants_container");
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
            $.fn.get_all_restaurants();

        };
        return thispage;
    })();

    pageready.init();

});
 