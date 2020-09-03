$(document).ready(function(){
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
           $(".active").removeClass("active");
           $("#nav-login").addClass("active");
        };
        return thispage;
    })();

    pageready.init();

});
