$(document).ready(function() {

  let $w = $(window);
  let lastScrollTop = $w.scrollTop();
  let _y = 0;

  $w.scroll(function(event) {
    // assign variables to scrollTop and window height expression
    let st = $w.scrollTop();
    let comeUp = (st / $w.height()-5.2)*5;
    let sunVertical = ((st / $w.height())*97.5)+5;
    let sunHorizontal = (-(st / $w.height()))+5;
    lastScrollTop = st;
    $('#sun').css('top', `${sunVertical}vh`);
    $('#sun').css('left', `${sunHorizontal}vw`);

    if (comeUp > 0) {
      $('#button_container').css('bottom','3vh');
      $('#button_container').css('opacity',comeUp);
    } else {
      $('#button_container').css('bottom','-3vh');
    };


  });
})
