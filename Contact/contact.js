$(document).ready(function(){
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
           $(".nav-item.active").removeClass("active");
           $("#nav-contact").addClass("active");
        };

        $("#submit").on("click", function(){
            var name = $("name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            
        })

        

        

        

        return thispage;
    })();

    pageready.init();

});
