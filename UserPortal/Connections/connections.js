$(document).ready(function(){

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
            $("#my_rest_container").show()
            // if (!my_rest_rendered){
            //     $.fn.get_restaurant();
            //     my_rest_rendered = true;
            // }
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

        

        // $("#my_rest").trigger('click');
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
 