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

var geocoder;
var map;

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(38.0000,-97.0000);
  var mapOptions = {
    zoom: 3,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  codeAddress();
}

function codeAddress() {
  for (index in local){
    address = local[index]
    console.log(address)
    geocoder.geocode( { 'address': address},
      function(results, status) {
        if (status == 'OK') {
          var image = {url:"images/gift-24.png"}
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: image,
              animation: google.maps.Animation.DROP
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });
  }
}
