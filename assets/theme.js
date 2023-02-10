(function ($) {
    var $body = $('body'),
        $doc = $(document),
        $html = $('html'),
        $win = $(window);

    $doc.ready(() => {
        $doc.ajaxStart(() => {
            enviro.isAjaxLoading = true;
        });

        $doc.ajaxStop(() => {
            enviro.isAjaxLoading = false;
        });

        // enviro.ready();
    });


    window.onload = function() { 
        enviro.init();
    }

document.addEventListener("shopify:section:load", function(event) {
    enviro.init();
});

document.addEventListener('shopify:block:select', function(event) {
    enviro.init();
		
});



    var enviro = {
        enviroTimeout: null,
        isAjaxLoading: false,
        init: function () {
            this.closeAnnouncementBar();
            this.sliderAnnouncementBar();
        },

        closeAnnouncementBar: function (){
            var announcementEml = $('.announcement-bar'),
                closeAnnouncementElm = announcementEml.find('[data-close-announcement]');

            if ($.cookie('announcement') == 'closed') {
                announcementEml.remove();
            } else {
                announcementEml.css('opacity',1);
                announcementEml.css('visibility','visible');
            };
            closeAnnouncementElm.off('click.closeAnnouncementBar').on('click.closeAnnouncementBar', function (e) {
                e.preventDefault();
                e.stopPropagation();

                announcementEml.remove();
                $.cookie('announcement', 'closed', {
                    expires: 1,
                    path: '/'
                });
            });
        },

        sliderAnnouncementBar: function(){
            var announcement_bar = $('[data-announcement-bar]');
            var announcement_item = announcement_bar.find('.announcement-bar__message');

            if(announcement_item.length > 1){
                if(!announcement_bar.hasClass('slick-initialized')){
                    announcement_bar.slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        arrows: announcement_bar.data('arrows'),
                        autoplay: true,
                        autoplaySpeed: 3000,
                        nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 478.448 478.448" class="icon icon-chevron-right" id="icon-chevron-right"><g><g><polygon points="131.659,0 100.494,32.035 313.804,239.232 100.494,446.373 131.65,478.448 377.954,239.232"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>',
                        prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 370.814 370.814" class="icon icon-chevron-left" id="icon-chevron-left"><g><g><polygon points="292.92,24.848 268.781,0 77.895,185.401 268.781,370.814 292.92,345.961 127.638,185.401"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>',
                    });
                }
            }
        },
    }


})(jQuery);