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

// function initialize() {
//   var mapProp = {
//     center:new google.maps.LatLng(38.0000,-97.0000),
//     zoom:3,
//     mapTypeId:google.maps.MapTypeId.ROADMAP
//   };
//   var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
// }

var geocoder;
var map;

function initialize() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(38.0000,-97.0000);
  var mapOptions = {
    zoom: 3,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress(local) {
  for (address in local){
    geocoder.geocode( { 'address': address},
      function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });
  }
}
