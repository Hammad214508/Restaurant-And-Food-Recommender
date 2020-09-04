$(document).ready(function(){

    $.fn.register = function(){
        var name = $("#name").val();
        var surname = $("#surname").val()
        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
           url: "/Online-Food-Order/Register/reg_services.php",
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
                  window.open("/Online-Food-Order/Login/User/user_login.php","_self")
              }
            }
        });
    }

    $.fn.registration_events = function(){
        
        $(".toggle-password").click(function() {
          $(this).toggleClass("fa-eye fa-eye-slash");
          var input = $("#password");
          if (input.attr("type") == "password") {
            input.attr("type", "text");
          } else {
            input.attr("type", "password");
          }
        });

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
              $.fn.register();
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
            $.fn.registration_events()

        };
        return thispage;
    })();

    pageready.init();

});
