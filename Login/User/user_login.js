$(document).ready(function(){
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            console.log("HELLO");
        };
        return thispage;
    })();

    pageready.init();

});
