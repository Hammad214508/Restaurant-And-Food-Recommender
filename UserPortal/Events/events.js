$(document).ready(function(){
    var user_id;
    var users = {};
    var current_event;

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
            current_event = event_id;
            $.fn.get_event_data(event_id);
        });

        var first_event = $("#user_events")[0].firstChild.id
        $("#"+first_event).trigger("click");
        
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
                     $.fn.event_data_events(data);
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

        for (var i=0; i < user_ids.length; i++){
            users[user_ids[i]] = user_names[i]
        }

        
        parent.append(
            '<h3 id="event_title" class="text-center mb-4">'+event_name+'</h3>'+
            $.fn.event_data_input("name", "Name:", event_name)+
            $.fn.event_date_picker()+
            $.fn.event_time_picker("event_time", "Time:")+
            $.fn.event_users_select2()+
            $.fn.event_locations()+
            $.fn.locations_box()
        )
    }



    $.fn.event_data_events = function(event){

        $("#event_date").datepicker({ dateFormat: "dd-mm-yy" });
        $("#event_date").datepicker("setDate", event["EVENT_DATE"]);

        $('#event_time').timepicker();
        $('#event_time').timepicker({ 'timeFormat': 'h:i a' });
        $('#event_time').timepicker('setTime', event["EVENT_TIME"]);

        $("#users").select2({
            minimumInputLength: 0,
            maximumSelectionLength: 0,
            multiple: true,
            allowClear: false,
            placeholder: "Click to select",
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

        var locations = []

        if (event["LOCATIONS"] != null){
            locations = event["LOCATIONS"].split(",")
        }

        parent = $("#locations_box")
        $.each(locations, function( index, value ){
            parent.append('<li class="underline">'+value+' <i class="fa fa-times usr-icon" aria-hidden="true" ref="'+value+'"></i></li>')
        });

        $("#name").on("change", function(){
            $("#event_title").html($(this).val())
            $("#event_"+current_event).html($(this).val())
        })

        $(".event_data").on("change", function(){
            $.fn.update_event_data($(this).attr("id"));
        })


        $("#users").on('select2:select', function(e) {
            // users[e.params.data.id] = e.params.data.text
            $.fn.update_event_users("insert", e.params.data.id);
        });

        $("#users").on('select2:unselect', function(e) {
            // delete users[e.params.data.id]
            $.fn.update_event_users("delete", e.params.data.id);
        });

        // $(".usr-icon").on("click", function(){
        //     $.fn.update_event_locations("delete", $(this).attr("ref"));
        //     $(this).parent().remove()
        // })

        $(document).on('click','.usr-icon', function(){
            $.fn.update_event_locations("delete", $(this).attr("ref"), $(this).parent());
        }) 

        $("#add_locations").on("click", function(){
            if ($("#new_location").val()){
                var loc = $("#new_location").val().charAt(0).toUpperCase() + $("#new_location").val().slice(1)
                $.fn.update_event_locations("insert", loc, $(this).parent());
            }
        })

    }

    $.fn.update_event_data = function(field){
        $.fn.temporary_show("#icons_"+field+" #loading");
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "update_event_data",
                    "EVENT_ID"      : current_event,
                    "EVENT_NAME"    : $("#name").val(),
                    "EVENT_DATE"    : $("#event_date").val(),
                    "EVENT_TIME"    : $("#event_time").val(),
                },
            success:function(data) {
                 $(".icon").hide();
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR UPDATING EVENT DETAILS!</b>");
                     $.fn.temporary_show("#error");
                     $.fn.temporary_show("#icons_"+field+" #cross");
                 }else{
                     $.fn.temporary_show("#icons_"+field+" #tick");
                 }
             }
         });
    }

    $.fn.update_event_users = function(type, uid){
        $.fn.temporary_show("#icons_users #loading");
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "update_event_users",
                    "TYPE"          : type,
                    "EVENT_ID"      : current_event,
                    "USER_ID"       : uid,
                },
            success:function(data) {
                 $(".icon").hide();
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR UPDATING EVENT USERS!</b>");
                     $.fn.temporary_show("#error");
                     $.fn.temporary_show("#icons_users #cross");
                 }else{
                     $.fn.temporary_show("#icons_users #tick");
                 }
             }
         });
    }

    $.fn.update_event_locations = function(type, location, parent){
        $.fn.temporary_show("#icons_locations #loading");
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "update_event_locations",
                    "TYPE"          : type,
                    "EVENT_ID"      : current_event,
                    "LOCATION"      : location,
                },
            success:function(data) {
                 $(".icon").hide();
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR UPDATING USER DATA!</b>");
                     $.fn.temporary_show("#error");
                     $.fn.temporary_show("#icons_locations #cross");
                 }else{
                     $.fn.temporary_show("#icons_locations #tick");
                     if (type == "insert"){
                        $("#new_location").val("")
                        $("#locations_box").prepend(
                           '<li class="underline">'+location+' <i class="fa fa-times usr-icon" aria-hidden="true" ref="'+location+'"></i></li>'
                        )
                     }else{
                        parent.remove();
                     }

                 }
             }
         });
    }


    $.fn.event_data_input = function(id, label, value){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input id="'+id+'" type="text" class="form-control event_data" value="'+value+'"></input>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.event_date_picker = function(){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Date: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input class="event_data form-control" type="text" id="event_date" style="width:23.3em;">'+
            '    </div>'+
                 $.fn.transaction_icons("event_date")+
            '</div>'
        )
    }

    $.fn.event_users_select2 = function(){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Users: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '       <select id="users" class="js-example-basic-multiple form-control" style="width:23.3em;" multiple="multiple"></select>'+
            '    </div>'+
                 $.fn.transaction_icons("users")+
            '</div>'
        )
    }


    $.fn.event_locations = function(){
    return (
        '<div class="row mb-3">'+
        '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
        '        <p>Locations: </p>'+
        '    </div>'+
        '    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
        '        <input id="new_location" type="text" class="form-control"></input>'+
        '    </div>'+
        '    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
        '       <button id="add_locations" type="button" class="btn btn-secondary">Add</button>'+
        '    </div>'+
                $.fn.transaction_icons("locations")+
        '</div>'
        )
    }


    $.fn.locations_box = function(){
        return (
            '<div class="row mb-3">'+
            '   <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"></div>'+
            '   <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8">'+
            '       <ul id="locations_box"></ul>'+
            '   </div>'+
            '</div>'
        )
    }

    $.fn.event_time_picker = function(id, label){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>'+label+'</p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input id="'+id+'" type="text" class="time ui-timepicker-input event_data form-control" autocomplete="off" style="width:23.3em">'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
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
 