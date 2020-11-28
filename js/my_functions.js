$.fn.temporary_show = function(id){
    var obj = $(id)
    obj.fadeTo(2000, 500).slideUp(500, function() {
        obj.slideUp(500);
    })
};

$.fn.get_ajax_params = function(data){
    return JSON.parse('{"' + decodeURI(data.substring(0)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}

$.fn.transaction_icons = function(id){
    return (
        '<div id="icons_'+id+'" class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">'+
        '    <i id="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw icon" style="font-size:2em; display:none";></i>'+
        '    <i id="tick" class="fa fa-check icon" style="font-size:2em;color:green; display:none"></i>'+
        '    <i id="cross" class="fa fa-close icon" style="font-size:2em;color:red; display:none"></i>'+
        '</div>'
    )
}