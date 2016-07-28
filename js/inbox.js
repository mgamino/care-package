function setup(){
  $(".wrap").hover(
    function(){
      $(this).find(".cube").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top").stop().css({
      	"transform": "rotateX(-200deg) translateZ(-52px)"
      });
    }
  );
  $(".wrap").mouseleave(
    function(){
      $(this).find(".cube").stop().css({
      	"animation": "spin 4s infinite linear"
      });
      $(this).find(".top").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );
}
