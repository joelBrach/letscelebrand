        $(function () {
            $(".work-row").slice(0, 2).show();
            $("#loadMore").on('click', function (e) {
                e.preventDefault();
                $(".work-row:hidden").slice(0, 1).slideDown();
                if ($(".work-row:hidden").length == 0) {
                    $("#loadMore").fadeOut(1700);
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top
                }, 1500);
            });
        });

        $('a[href=#top]').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.totop a').fadeIn();
            } else {
                $('.totop a').fadeOut();
            }
        });