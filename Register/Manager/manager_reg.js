$(document).ready(function(){

    $.fn.check_registered = function(){
        var email = $("#email").val();
        $.ajax({
           url: "/Online-Food-Order/Register/reg_services.php",
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
           url: "/Online-Food-Order/Register/reg_services.php",
           method: "POST",
           data:{
                   "actionmode"	: "register_manager",
                   "NAME"       : name,
                   "SURNAME"    : surname,
                   "EMAIL"      : email,
                   "PASSWORD"   : password
               },
           success:function(data) {
              data = JSON.parse(data);
              if (!data.success){
                  $("#error").html("<b>ERROR REGISTERING THE MANAGER!</b>");
                  $.fn.temporary_show("error");
              }else{
                  window.open("/Online-Food-Order/Login/Manager/manager_login.php","_self")
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