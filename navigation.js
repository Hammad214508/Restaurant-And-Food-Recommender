$(document).ready(function(){


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            // $(".nav-item").on('click', function(){
                // $(".active").removeClass("active")
                // $(this).addClass("active")
            // })
            $(".nav a").on("click", function(){
               $(".nav").find(".active").removeClass("active");
               $(this).parent().addClass("active");
            });        

        };
        return thispage;
    })();

    pageready.init();

});
