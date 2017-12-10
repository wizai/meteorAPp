$(function(){$(document).ready(function(){$(".form-groupAdd input").focus(function(){$(this).parents(".groupInput").addClass("focused")}),$(".form-groupAdd input").blur(function(){var s=$(this).val();""===s?($(this).removeClass("filled"),$(this).parents(".groupInput").removeClass("focused")):$(this).addClass("filled")})})});
$(document).ready(function(){});var swiper=new Swiper(".swiper-container",{slidesPerView:4,spaceBetween:30,centeredSlides:!0,pagination:{el:".swiper-pagination",clickable:!0}});

