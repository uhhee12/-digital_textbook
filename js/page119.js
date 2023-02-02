document.addEventListener("DOMContentLoaded", function () {
  /* view function complete */
  EDUTSS.complete = {
    tab: function (obj) { /* console.log(obj); */ },
    slide: function (obj) { /* console.log(obj); */ },
    openPopup: function (target, btn) { /* console.log(target, btn); */ },
    closeAllPopup: function () { /* console.log('closeAllPopup') */ },
    showHide: function (target) { /* console.log(target); */ },
    sound: function (target, type) { /* console.log(type, target); */ },
    turnAudio: function (target, type, idx) { /* console.log(type, idx, target); */ },
    animate: function (obj) { /* console.log(obj); */ },
    quizResult: function (obj) { /* console.log(obj); */ },
    quizReset: function (obj) { /* console.log(obj); */ },
    dragDrop: function (obj, start, end) { /* console.log(obj, start, end); */ },
    drawLine: function (obj, start, end) { /* console.log(obj, start, end); */ },
    checkList: function (obj, target) { /* console.log(obj, target); */ },
    zoom: function (obj) { /* console.log(obj); */ },
    mediaPlayer: function (obj, type) { /* console.log(type); */ },
  };

/* page - JS */
var pageEvent = {
    init: function () {
        
        }
    }
    pageEvent.init();

    
    $('.toast_area').click(function(){
        $(this).parent().addClass('on');
        $('.toast_area').not(this).parent().removeClass('on');
         $('.replay_Div button').css('opacity','1');
    });

     $('.replay_Div').on('click', function () {
         $('.replay_Div button').css('opacity','0');
        $('.click_box ').removeClass('on');
         
       });
    

    }
);