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
      	"animation": "spin 6s infinite linear"
      });
      $(this).find(".top").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );

  $(".wrap1").hover(
    function(){
      $(this).find(".cube1").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top1").stop().css({
      	"transform": "rotateX(-200deg) translateZ(-52px)"
      });
    }
  );
  $(".wrap1").mouseleave(
    function(){
      $(this).find(".cube1").stop().css({
      	"animation": "spin 6s infinite linear"
      });
      $(this).find(".top1").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );

  $(".wrap2").hover(
    function(){
      $(this).find(".cube2").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top2").stop().css({
      	"transform": "rotateX(-200deg) translateZ(-52px)"
      });
    }
  );
  $(".wrap2").mouseleave(
    function(){
      $(this).find(".cube2").stop().css({
      	"animation": "spin 6s infinite linear"
      });
      $(this).find(".top2").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );

  $(".wrap3").hover(
    function(){
      $(this).find(".cube3").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top3").stop().css({
      	"transform": "rotateX(-200deg) translateZ(-52px)"
      });
    }
  );
  $(".wrap3").mouseleave(
    function(){
      $(this).find(".cube3").stop().css({
      	"animation": "spin 6s infinite linear"
      });
      $(this).find(".top3").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );

  $(".wrap4").hover(
    function(){
      $(this).find(".cube4").stop().css({
      	"animation": "spin 1s infinite linear"
      });
      $(this).find(".top4").stop().css({
      	"transform": "rotateX(-200deg) translateZ(-52px)"
      });
    }
  );
  $(".wrap4").mouseleave(
    function(){
      $(this).find(".cube4").stop().css({
      	"animation": "spin 6s infinite linear"
      });
      $(this).find(".top4").stop().css({
      	"transform": "rotateX(-90deg) translateY(-52px) translateZ(0px) "
      });
    }
  );
}
$(document).ready(setup);
