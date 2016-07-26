function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(38.0000,-97.0000),
    zoom:3,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);

// $(document).ready(function(){
//     $("dropdown1").hover(function(){
//         $("dropdown-content1").slideDown(1000);
//     });
//     $("dropdown2").hover(function(){
//         $("dropdown-content2").slideDown(1000);
//     });
// });
