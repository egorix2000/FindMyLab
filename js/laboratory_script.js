

//setup masonry and baguetteBox
window.onload = function() {
        baguetteBox.run('.grid');
    }
    $(window).on('load', function(){
      $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 270,
        gutter: 10,
      });
    });
//end of setup