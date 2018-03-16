    function fixedPanel(){
        var doc = document.documentElement;
        var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        var offsetTop = $('.header-logo-fixed').position().top + $('.header-logo-fixed').height();
        offsetTop +=100;
        var $body = $('body');

        if (scrollTop > offsetTop) {
            $body.addClass('fixed_top_panel').css('padding-top', $('.header-logo-fixed').height());
        } else {
            $body.removeClass('fixed_top_panel').css('padding-top','0');
            $('.iseeu_menu ul').hide();
        }
    }

        if (!window.matchMedia("screen and (max-width: 992px)").matches) {
            fixedPanel();
        }
        $(document).on('scroll', function() {
            if (window.matchMedia("screen and (min-width: 992px)").matches) {
                fixedPanel();
            }
        });
        
        if (window.matchMedia("screen and (max-width: 992px)").matches) {
            $('body').removeClass('fixed_top_panel').css('padding-top','0');
        }
        else{
            fixedPanel();
        }