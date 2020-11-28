$(document).ready(function(){

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-manager").addClass("active");
    }

    $.fn.check_registered = function(){
        var email = $("#email").val();
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "check_registered",
                   "EMAIL"      : email,
                   "USER_TYPE"  : "MANAGER"
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR CHECKING IF MANAGER EXISTS!</b>");
                  $.fn.temporary_show("error");
              }else{
                  data = data.dataset;
                  if (data[0][0]["ISTHERE"] == "0"){
                      $.fn.temporary_show("account_not_exists")
                  }else{
                      $.fn.verify();
                  }
              }
            }
        });
    }

    $.fn.verify = function(){

        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Login/log_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "verify",
                   "EMAIL"      : email,
                   "PASSWORD"   : password,
                   "USER_TYPE"  : "MANAGER"
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR LOGGING THE USER!</b>");
                  $.fn.temporary_show("error");
              }else{
                  data = data.dataset
                  if (!data[0][0]["VALID"]){
                      $("#password_error").html("INCORRECT PASSWORD, PLEASE TRY AGAIN")
                      $.fn.temporary_show("password_error")
                  }
                  else{
                      window.open("/Restaurant-And-Food-Recommender/ManagerPortal/","_self")
                  }
              }
            }
        });
    }

    $.fn.login_events = function(){

        $("#log_form").validate({
            rules: {
              email: {
                required: true,
                email: true
              },
              password: {
                required: true,
              },
            },
            messages: {
              email: {
                 required: "Please provide an email",
                 email: "Please enter a valid email address"
              },
              password: {
                required: "Please provide a password",
              },

            },
            errorPlacement: function(error, element) {
                 //Custom position: first name
                 if (element.attr("name") == "email" ) {
                     $("#email_error").html(error);
                 }

                 else if (element.attr("name") == "password" ) {
                     $("#password_error").html(error);
                 }

             },

            submitHandler: function(form) {
              $.fn.check_registered()
            }
         });
    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            $.fn.login_events();
        };
        return thispage;
    })();

    pageready.init();

});
