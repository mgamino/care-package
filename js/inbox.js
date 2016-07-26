function setup(){
  $(".message").hover(
    function(){
      $(this).find(".cube").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top").stop().animate({
      	"transform": "0deg"
      });
    }
  );
  $(".message").mouseleave(
    function(){
      $(this).find(".cube").stop().css({
      	"animation": "spin 4s infinite linear"
      });

    }
  );
}

$(document).ready(setup);
