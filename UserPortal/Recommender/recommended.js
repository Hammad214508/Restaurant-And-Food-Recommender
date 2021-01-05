$(document).ready(function(){

    var user_id;
    var websocket = new WebSocket("ws://127.0.0.1:6789/");
  

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-recommendation").addClass("active");
    }

    $("#available").on("change", function(){
        websocket.send(JSON.stringify({action: 'recommender', "user_id": user_id}));
    })


    websocket.onmessage = function (event) {
        data = JSON.parse(event.data);
        if (data.type == "recommended_items"){
            console.log(data["recommended"])
        }
        else{
           console.error("unsupported event", data);
        }
    };

    websocket.onopen = function(e) {
        websocket.send(JSON.stringify({action: 'recommender', "user_id": user_id}));
    };

    websocket.onerror = function(error) {
        alert(`ERROR ${error.message}`);
    };

    
    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            user_id = $("#inp_hdn_uid").val();

        };
        return thispage;
    })();

    pageready.init();

});
