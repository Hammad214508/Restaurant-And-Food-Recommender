$(document).ready(function(){
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
           $(".nav-item.active").removeClass("active");
           $("#nav-contact").addClass("active");
        };
        return thispage;
    })();

    pageready.init();

});
