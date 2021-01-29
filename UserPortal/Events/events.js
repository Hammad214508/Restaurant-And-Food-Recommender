$(document).ready(function(){
    var user_id;
    var users = {};

    $.fn.activate_nav_bar = function(){
        $(".nav-item.active").removeClass("active");
        $("#nav-events").addClass("active");
    }

    $.fn.get_user_events = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "get_user_events",
                    "USER_ID"       : user_id,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING USER EVENTS!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     data = data.dataset[0];
                     if (data.length > 0){
                        $.fn.render_user_events(data)
                        $.fn.user_events_events();
                     }else{
                        parent = $("#user_events")
                        parent.empty();
                        parent.append("<h5>You have no upcoming events</h5>")
                     }  
                 }
             }
         });
    }

    $.fn.render_user_events = function(events){
        parent = $("#user_events")
        parent.empty();
        $.each(events , function(index, val) { 
            parent.append(
            '<div id="event_'+val["EVENT_ID"]+'" class="list-group-item list-group-item-dark" ref="'+val["EVENT_ID"]+'">'+val["EVENT_NAME"]+'</div>'
            )
        });
    }

    $.fn.user_events_events = function(){
        $(".list-group-item").on('click', function(){
            $(".list-group-item.active").removeClass("active");
            $(this).addClass("active");
            var event_id = $(this).attr("ref")
            $.fn.get_event_data(event_id);
        });
    }

    $.fn.get_event_data = function(event_id){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "get_event_data",
                    "EVENT_ID"       : event_id,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR GETTING EVENT DATA!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                     data = data.dataset[0][0];
                     $.fn.render_event_data(data)
                 }
             }
         });
    }


    $.fn.render_event_data = function(event){
        parent = $("#selected_event_container");
        parent.empty()
        var user_ids =  event["IDS"].split(",")
        var user_names = event["USERS"].split(",")
        var event_name = event["EVENT_NAME"];
        var locations = event["LOCATIONS"].split(",")

        for (var i=0; i < user_ids.length; i++){
            users[user_ids[i]] = user_names[i]
        }

        
        parent.append(
            '<h3 class="text-center mb-4">'+event_name+'</h3>'+
            $.fn.event_data_input("name", "Name:", event_name)+
            $.fn.event_date_picker()+
            $.fn.event_users_select2()
        )


        $("#event_date").datepicker(
            { dateFormat: "dd-mm-yy" }
        );


        var date = new Date(event["EVENT_TIME"])
        newdate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        

        $("#event_date").datepicker("setDate", newdate);

        $("#users").select2({
            minimumInputLength: 0,
            maximumSelectionLength: 0,
            multiple: true,
            allowClear: false,
            placeholder: "click to select",
            tags : false,
            ajax: {
                type	: 'POST',
                url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
                dataType: 'JSON',
                delay: 250,
                multiple: true,
                data: function (term){
                    return {
                        actionmode: "get_connections",
                        "USER_ID": user_id,
                        search: term["term"],
                        page_mode: "SELECT"
                    };
                },
                processResults: function (data){
                    parent = $('#test');
                    return {
                        results: $.map(data.dataset[0], function (item){
                            return {
                                text: item["NAME"] +" "+ item["SURNAME"],
                                id: item["USER_ID"]
                            }
                        })
                    };
                },
                cache: true
            },
        });

        for (const [key, value] of Object.entries(users)) {
            if (key != user_id){
                $('#users').append(new Option(value, key, true, true)).trigger('change');
            }
        }
        

    }


    $.fn.event_data_input = function(id, label, value){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input id="'+id+'" type="text" class="form-control mb-3 prof_data" value="'+value+'"></input>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.event_date_picker = function(){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Date: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input type="text" id="event_date">'+
            '    </div>'+
                 $.fn.transaction_icons("event_date")+
            '</div>'
        )
    }

    $.fn.event_users_select2 = function(){
        return (
            '<div class="row">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Users: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '       <select id="users" class="js-example-basic-multiple" style="width:20em" multiple="multiple"></select>'+
            '    </div>'+
                 $.fn.transaction_icons("event_date")+
            '</div>'
        )
    }

    



    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar()
            user_id = $("#inp_hdn_uid").val();
            $.fn.get_user_events()

        };
        return thispage;
    })();

    pageready.init();

});
 