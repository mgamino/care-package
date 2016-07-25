function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(37.4200280,-122.0750580),
    zoom:7,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
