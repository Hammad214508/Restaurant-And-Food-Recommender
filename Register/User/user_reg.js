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
                  alert("ERROR")
              }else{
                  console.log("HERE")
              }
            }
        });
    }


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $("#register-btn").on('click', function(){
                $.fn.register()
            });

            // $(".reg_inp").on('input', function(){
            //     console.log("YH")
            // })

        };
        return thispage;
    })();

    pageready.init();

});
