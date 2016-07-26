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

  $(".dropdown1").mouseenter(
    function(){
      $(".dropdown-content1").slideDown();
    }
  );
  $(".dropdown2").mouseenter(
    function(){
      $(".dropdown-content2").slideDown();
    }
  );
  $(".dropdown1").mouseleave(
    function() {
      $(".dropdown-content1").slideUp();
    }
  );
  $(".dropdown2").mouseleave(
    function() {
      $(".dropdown-content2").slideUp();
    }
  );
}

$(document).ready(setup);
