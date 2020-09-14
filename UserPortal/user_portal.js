$(document).ready(function(){
    
    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-usr-portal").addClass("active");
    }


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            console.log("HERE")

        };
        return thispage;
    })();

    pageready.init();

});
