$(document).ready(function(){
    var name = $("#inp_hdn_name").length > 0 ? $("#inp_hdn_name").val() : "";
    var surname = $("#inp_hdn_surname").length > 0 ? $("#inp_hdn_surname").val() : "";
    var email = $("#inp_hdn_email_address").length > 0 ? $("#inp_hdn_email_address").val() : "";


    $.fn.check_registered = function(){
        $.ajax({
           url: "/Online-Food-Order/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "check_registered",
                   "EMAIL"      : email,
                   "USER_TYPE"  : "USER"
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR CHECKING IF USER EXISTS!</b>");
                  $.fn.temporary_show("error");
              }else{
                  data = data.dataset;
                  if (data[0][0]["ISTHERE"] == "1"){
                      $.fn.verify();
                      // window.open("/Online-Food-Order/UserPortal/","_self")
                  }else{
                      $.fn.register();
                  }
              }
            }
        });
    }

    $.fn.register = function(){

        $.ajax({
           url: "/Online-Food-Order/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	 : "register_user",
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

    $.fn.verify = function(){


        $.ajax({
           url: "/Online-Food-Order/Login/log_services.php",
           method: "POST",
           data:{
                   "actionmode"	 : "verify",
                   "EMAIL"       : email,
                   "GOOGLE_LOGIN": true,
                   "USER_TYPE"   : "USER"
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                   alert("ERROR VERYFYING");
              }else{
                  data = data.dataset
                  if (data[0][0]["VALID"]){
                      window.open("/Online-Food-Order/UserPortal/","_self")
                  }else{
                      alert("NOT VALID");
                  }
              }
            }
        });
    }

    $.fn.temporary_show = function(id){
        var obj = $("#"+id)
        obj.fadeTo(2000, 500).slideUp(500, function() {
            obj.slideUp(500);
        })
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
