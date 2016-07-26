function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(38.0000,-97.0000),
    zoom:3,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);

function setup(){

  $(".dropdown1").hover(
    function(){
      $(".dropdown-content1").stop().slideDown();
    }
  );
  $(".dropdown2").hover(
    function(){
      $(".dropdown-content2").stop().slideDown();
    }
  );
  $(".dropdown1").mouseleave(
    function() {
      $(".dropdown-content1").stop().slideUp();
    }
  );
  $(".dropdown2").mouseleave(
    function() {
      $(".dropdown-content2").stop().slideUp();
    }
  );
}

$(document).ready(setup);
