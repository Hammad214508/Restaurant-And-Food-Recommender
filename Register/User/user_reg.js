$(document).ready(function(){

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-user").addClass("active");
    }

    $.fn.check_registered = function(){
        var email = $("#email").val();
        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Register/reg_services.php",
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
                      $.fn.temporary_show("account_exists")
                  }else{
                      $.fn.register();
                  }
              }
            }
        });
    }

    $.fn.register = function(){

        var name = $("#name").val();
        var surname = $("#surname").val()
        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
           url: "/Restaurant-And-Food-Recommender/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "register_user",
                   "NAME"       : name,
                   "SURNAME"    : surname,
                   "EMAIL"      : email,
                   "PASSWORD"   : password
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR REGISTERING THE USER!</b>");
                  $.fn.temporary_show("error");
              }else{
                  window.open("/Restaurant-And-Food-Recommender/Login/User/user_login.php","_self")
              }
            }
        });
    }

    $.fn.registration_events = function(){

        $("#reg_form").validate({
            rules: {
              name: "required",
              surname: "required",
              email: {
                required: true,
                email: true
              },
              password: {
                required: true,
                minlength: 8
              },
              confirm_password: {
                required: true,
                equalTo: "#password"
              }
            },
            messages: {
              name: "Please enter your firstname",
              surname: "Please enter your lastname",
              email: {
                 required: "Please provide an email",
                 email: "Please enter a valid email address"
              },
              password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
              },
              confirm_password: {
                required: "Please confirm your password",
                equalTo: "Your passwords must match"
              },
            },
            errorPlacement: function(error, element) {
                 //Custom position: first name
                 if (element.attr("name") == "name" ) {
                     $("#name_error").html(error);
                 }
                 else if (element.attr("name") == "surname" ) {
                     $("#surname_error").html(error);
                 }
                 else if (element.attr("name") == "email" ) {
                     $("#email_error").html(error);
                 }
                 else if (element.attr("name") == "password" ) {
                     $("#password_error").html(error);
                 }
                 else if (element.attr("name") == "confirm_password" ) {
                     $("#confirm_password_error").html(error);
                 }

             },

            submitHandler: function(form) {
              $.fn.check_registered()
            }
         });

         $("#show_password").on("change", function(){
            if ($(this).prop("checked")){
                $("#password").attr("type", "text");
                $("#confirm_password").attr("type", "text");

            }else{
                $("#password").attr("type", "password");
                $("#confirm_password").attr("type", "password");
            }
         })

    }

    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar();
            $.fn.registration_events();
        };
        return thispage;
    })();

    pageready.init();

});
