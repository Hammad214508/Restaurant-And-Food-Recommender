$(document).ready(function(){
    var user_type = $("#inp_hdn_user_type").length > 0 ? $("#inp_hdn_user_type").val() : "";
    var name = $("#inp_hdn_name").length > 0 ? $("#inp_hdn_name").val() : "";
    var surname = $("#inp_hdn_surname").length > 0 ? $("#inp_hdn_surname").val() : "";
    var email = $("#inp_hdn_email_address").length > 0 ? $("#inp_hdn_email_address").val() : "";

    $.fn.check_registered = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "check_registered",
                   "EMAIL"      : email,
                   "USER_TYPE"  : user_type
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    $("#error").html("<b>ERROR CHECKING IF USER EXISTS!</b>");
                    $.fn.temporary_show("#error");
                }else{
                    data = data.dataset;
                    if (data[0][0]["ISTHERE"] == "1"){
                        $.fn.verify();
                    }else{
                        $.fn.register();
                    }
                }
            }
        });
    }

    $.fn.verify = function(){
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Login/log_services.php",
           method: "POST",
           data:{
                   "actionmode"	 : "verify",
                   "EMAIL"       : email,
                   "GOOGLE_LOGIN": true,
                   "USER_TYPE"   : user_type
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                   alert("ERROR VERYFYING");
              }else{
                  data = data.dataset
                  if (data[0][0]["VALID"]){
                      if (user_type == "USER"){
                        window.open("/Restaurant-And-Food-Recommender/UserPortal/", "_self");
                      }else{
                        window.open("/Restaurant-And-Food-Recommender/ManagerPortal/", "_self");
                      }
                  }else{
                      alert("NOT VALID");
                  }
              }
            }
        });
    }

    $.fn.register = function(){
        var actionmode = user_type == "USER" ? "register_user" : "register_manager";

        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Register/reg_services.php",
           method: "POST",
           data:{
                "actionmode"  : actionmode,
                "NAME"        : name,
                "SURNAME"     : surname,
                "EMAIL"       : email,
                "GOOGLE_LOGIN": true,
               },
           success:function(data) {
                data = JSON.parse(data);
                if (!data.success){
                    alert("ERROR")
                }else{
                    $.fn.verify();
                }
            }
        });
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.check_registered()
        };
        return thispage;
    })();

    pageready.init();

});
