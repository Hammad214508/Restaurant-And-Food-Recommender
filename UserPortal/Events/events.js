$(document).ready(function(){
    var user_id;
    var users = {};
    var current_event;
    var locations;
    var vote_count;
    var all_votes = {};
    var is_creator = false;
    var my_votes = []

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

        if (!current_event){
            var first_event = $("#user_events")[0].firstChild.id
            $("#"+first_event).trigger("click");
        }else{
            $("#event_"+current_event).trigger("click");
            setTimeout(function(){ $("#edit").trigger("click");}, 500);

        }

        
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
                     $.fn.render_event_display(data);
                     $.fn.render_event_data(data)
                     $.fn.event_data_events(data);
                 }
             }
         });
    }

    $.fn.array_occcurrences = function(arr) {
        var a = [], b = [], prev;
        arr.sort();
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
          } else {
            b[b.length - 1]++;
          }
          prev = arr[i];
        }
        return [a, b];
    }

    $.fn.render_event_display = function(data){
        is_creator =  data["CREATOR_ID"] == user_id;
        vote_count = data["NUM_VOTES"];
        votes_arr = []
        my_votes = []

        if (data["VOTES"]){
            $.each(data["VOTES"].split(","), function( index, value ){
                value = value.split("-");
                if (value[0] == user_id){
                    my_votes.push(value[1])
                }
                votes_arr.push(value[1])
            });
            
            var c = $.fn.array_occcurrences(votes_arr)
            a = c[0], b = c[1];
            all_votes = {};
            for (var i=0; i<a.length; i++){
                all_votes[a[i]] = b[i]/2
            }
        }


        $("#display_name").empty()
        $("#display_name").append('<h1>'+data["EVENT_NAME"]+'</h1>')

        $("#display_num_votes").html(data["NUM_VOTES"])
        
        $("#display_date").empty()
        $("#display_date").append(data["EVENT_DATE"])
        $("#display_time").empty()
        $("#display_time").append(data["EVENT_TIME"])

        locations = []

        if (data["LOCATIONS"] != null){
            locations = data["LOCATIONS"].split(",")
        }
        $("#locations").empty()
        $.each(locations, function( index, value ){
            vote_num = all_votes[value] ? all_votes[value] : 0
            value = (my_votes.includes(value)) ? "<strong>"+value+"</strong>": value
            $("#locations").append('<li>'+value+' - '+vote_num+'</li>')
        });

        users = {};

        var user_ids =  data["IDS"].split(",")
        var user_names = data["USERS"].split(",")
        for (var i=0; i < user_ids.length; i++){
            users[user_ids[i]] = user_names[i]
        }
    
        $('#people_invited').empty()
        for (const [key, value] of Object.entries(users)) {
            if (key != user_id){
                $('#people_invited').append('<li>'+value+'</li>')
            }
        }

        $("#edit").on("click", function(){
            $("#display_event_container").hide();
            $("#selected_event_container").show();
        })
        

    }


    $.fn.render_event_data = function(event){
        parent = $("#selected_event_container");
        parent.empty()
        var user_ids =  event["IDS"].split(",")
        var user_names = event["USERS"].split(",")
        var event_name = event["EVENT_NAME"];
        var num_votes = event["NUM_VOTES"];

        for (var i=0; i < user_ids.length; i++){
            users[user_ids[i]] = user_names[i]
        }

        var voting_input = is_creator ?  $.fn.event_data_input("num_votes", "Number of Votes:", num_votes) : "";

        parent.append(
            '<h3 id="event_title" class="text-center mb-4">'+event_name+'</h3>'+
            $.fn.event_data_input("name", "Name:", event_name)+
            $.fn.event_date_picker("event_date")+
            $.fn.event_time_picker("event_time", "Time:")+
            $.fn.event_users_select2("users")+
            $.fn.event_locations()+
            $.fn.locations_box()+
            voting_input+
            '<div class="text-center"><button id="save" type="button" class="btn btn-secondary">Save</button></div>'
        )
    }



    $.fn.event_data_events = function(event){

        if (is_creator){
            $(".delete").show();
        }else{
            $(".delete").hide();
        }

        $("#save").on("click", function(){
            $.fn.get_event_data(current_event)
            $("#selected_event_container").hide();
            $("#display_event_container").show();
        })

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
            parent.append('<li class="underline">'+value+' <i class="fa fa-times usr-icon rm" aria-hidden="true" ref="'+value+'"></i></li>')
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


        $(document).on('click','.rm', function(){
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
                    "NUM_VOTES"     : is_creator ? $("#num_votes").val() : vote_count,
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
                     if (is_creator){
                        vote_count = $("#num_votes").val();
                        $("#display_num_votes").html(vote_count);
                     }
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
                           '<li class="underline">'+location+' <i class="fa fa-times usr-icon rm" aria-hidden="true" ref="'+location+'"></i></li>'
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
            '        <input id="'+id+'" type="text" class="form-control event_data" value="'+value+'" style="width:23.3em"></input>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.event_date_picker = function(id){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Date: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '        <input class="event_data form-control" type="text" id="'+id+'" style="width:23.3em;">'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }

    $.fn.event_users_select2 = function(id){
        return (
            '<div class="row mb-3">'+
            '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
            '        <p>Users: </p>'+
            '    </div>'+
            '    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">'+
            '       <select id="'+id+'" class="js-example-basic-multiple form-control" style="width:23.3em;" multiple="multiple"></select>'+
            '    </div>'+
                 $.fn.transaction_icons(id)+
            '</div>'
        )
    }


    $.fn.event_locations = function(){
    return (
        '<div class="row mb-3">'+
        '    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 my-auto">'+
        '        <p>Locations: </p>'+
        '    </div>'+
        '    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5" >'+
        '        <input id="new_location" type="text" class="form-control" style="width:19em;"></input>'+
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

  

    $.fn.get_current_date = function(){
        const dateObj = new Date();
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        return day  + '-'+ (parseInt(month)+1) + '-' + year;
    }

    $.fn.insert_new_event = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "insert_new_event",
                    "EVENT_NAME"    : "New Event",
                    "EVENT_DATE"    : $.fn.get_current_date(),
                    "EVENT_TIME"    : "07:00 pm",
                    "USER_ID"       : user_id
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR CREATING NEW EVENT!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    current_event = data.dataset["LAST_ID"];
                 }
             }
         });
    }


    $.fn.delete_event = function(){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode"	: "delete_event",
                    "EVENT_ID"      : current_event,
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR DELETING EVENT!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    $("#event_"+current_event).remove();
                    var first_event = $("#user_events")[0].firstChild.id
                    $("#"+first_event).trigger("click");
                 }
             }
         });
    }

    $.fn.update_users_vote = function(votes){
        $.ajax({
            url: "/Restaurant-And-Food-Recommender/UserPortal/user_services.php",
            method: "POST",
            data:{
                    "actionmode" : "update_users_vote",
                    "EVENT_ID"   : current_event, 
                    "USER_ID"    : user_id,
                    "VOTES"      : votes.join(),
                },
            success:function(data) {
                 data = JSON.parse(data);
                 if (!data.success){
                     $("#error").html("<b>ERROR STORING VOTES!</b>");
                     $.fn.temporary_show("#error");
                 }else{
                    $("#event_"+current_event).trigger("click");
                 }
             }
         });
    }


    var pageready = (function(){
        var thispage = {};
        thispage.init = function(){
            $.fn.activate_nav_bar()
            user_id = $("#inp_hdn_uid").val();
            $.fn.get_user_events()
            $("#new_event").on("click", function(){
                $.fn.insert_new_event();
                $.fn.get_user_events();
            })

            $(".delete").on("click", function(){
                if (confirm("Are you sure you want to delte?")){
                    $.fn.delete_event();
                }
            })

            $("#vote").on("click", function(){
                $("#locations").empty()
                $.each(locations, function( index, value ){
                    var checked = (my_votes.includes(value)) ? "checked" : "";
                    $("#locations").append('<input class="location_checkbox" type="checkbox" value='+value.replace(/\s+/g, '_')+' '+checked+'> '+value+'</input><br>')
                 
                });

                $("#locations").append(
                    '<button id="submit_vote" type="button" class="btn btn-sm btn-secondary mt-2">Vote</button>'
                )

                
                $("#submit_vote").on("click", function(){
                    var votes = [];
                    $('input:checkbox.location_checkbox').each(function () {
                        if (this.checked){
                            votes.push($(this).val().replace(/_/g, ' '))
                        }
                   });
                    $.fn.update_users_vote(votes);
                })

                $(".location_checkbox").on("change", function(){
                    if ($('input[type=checkbox]:checked').length > vote_count) {
                        $(this).prop('checked', false);
                    }
                })

                $(".location_checkbox").on("change", function(){
                    if ($('input[type=checkbox]:checked').length > vote_count) {
                        $(this).prop('checked', false);
                    }
                })
               
            })

        };
        return thispage;
    })();

    pageready.init();

});
 