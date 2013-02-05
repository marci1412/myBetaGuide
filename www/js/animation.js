$(document).ready(function(){
    
    var previous_page="";
                  
    /*$('.nav_listitem').hover(function() {
        $(this).css("background-color", "#000000");
    });*/
    
    /*Geste um das Menü auf zu wischen*/
    $('#mainsite').wipetouch({
        tapToClick: true,
        wipeRight: function(result){$.mobile.changePage("sites/_navigation.html", {transition:"slide", reverse:true}); previous_page="../index.html";},
        wipeLeft: function(result){}
    });
    
    /*Sollte eigentlich auch anders herum gehen*/
    /*$('#navigation').wipetouch({
        tapToClick: true,
        wipeRight: function(result){},
        wipeLeft: function(result){$.mobile.changePage("#mainsite", {transition:"slide"});}
    });*/
});