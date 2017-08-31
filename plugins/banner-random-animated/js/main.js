var landor = window.landor || {};
landor.behavior = {},
landor.helper = {},
landor.loadBehaviors = function(a) {
    var b;
    b = a ? a instanceof window.jQuery ? a : $(a) : $(document),
    b.find("*[data-behavior]").each(function() {
        var a = this;
        $.each($(this).data("behavior").split(" "), function(b, c) {
            landor.behavior[c].apply(a, [$(a)])
        })
    }),
    landor.helper.custom_select(b),
    landor.helper.custom_upload(b),
    landor.helper.imgix(b)
}
,
landor.helper.analytics = function() {
    "use strict";
    if ("undefined" == typeof __gaTracker)
        return !1;
    $(document).on("newsletter_signup", function() {
        __gaTracker("send", "event", "Newsletter", "signup")
    }),
    $(document).on("footer_inquiries_click", function(a) {
        __gaTracker("send", "event", "Footer Inquiries", "click", a.eventValue)
    }),
    $("[data-footer-inquiries]").on("click", function() {
        $(document).trigger({
            type: "footer_inquiries_click",
            eventValue: $(this).data("footer-inquiries")
        })
    }),
    $(document).on("footer_social_click", function(a) {
        __gaTracker("send", "event", "Footer Social", "click", a.eventValue)
    }),
    $("[data-footer-social]").on("click", function() {
        $(document).trigger({
            type: "footer_social_click",
            eventValue: $(this).data("footer-social")
        })
    }),
    $(document).on("video_play", function(a) {
        __gaTracker("send", "event", "Video", "play")
    })
}
,
landor.behavior.case_studies_list = function(a) {
    "use strict";
    function b() {
        a.css({
            height: g.innerHeight() + 40
        }),
        $(".page-overlay__case-studies-list-nav", a).toggleClass("hide", $("ul", f).height() < e.height())
    }
    function c() {
        var a = f.scrollTop()
          , b = a + f.height();
        e.toggleClass("is-scrolling--top", a > 0),
        e.toggleClass("is-scrolling--bottom", b < $("> ul", f).height())
    }
    var d = $("[data-case-studies-img]", a)
      , e = $("[data-case-studies-list]", a)
      , f = $(".page-overlay__case-studies-list-inner", e)
      , g = a.siblings(".page-overlay__nav")
      , h = $("[data-case-studies-nav]", a);
    b(),
    c(),
    $(window).on("resize", $.debounce(100, b)),
    f.on("scroll", $.throttle(100, c)),
    $("a", e).on("mouseenter", function() {
        if (window.innerWidth >= 980) {
            var a = $(this)
              , b = a.data("img");
            if (b) {
                var c = a.position().top;
                d.html('<img src="' + b + '" style="top:' + (c + 260 > window.innerHeight ? c - 100 : c) + 'px;" />')
            } else
                $("img", d).addClass("hidden")
        }
    }),
    $("a", e).on("mouseleave", function() {
        $("img", d).addClass("hidden")
    }),
    h.on("click", function(a) {
        var b = $(this).data("case-studies-nav")
          , c = f.scrollTop();
        "up" == b ? c -= 100 : c += 100,
        f.animate({
            scrollTop: c
        }, 100),
        a.preventDefault()
    })
}
,
landor.behavior.clients_grid = function(a) {
    "use strict";
    function b() {
        if (!f) {
            var b = a.outerHeight()
              , c = d()
              , i = b / 5
              , j = !1;
            a.css({
                "transition-duration": i + "ms",
                "max-height": c
            }),
            e.on("click.clients", function(d) {
                j ? (a.css("max-height", c),
                e.text(g),
                j = !1) : (a.css("max-height", b),
                e.text(h),
                j = !0),
                e.blur(),
                d.preventDefault()
            }),
            f = !0
        }
    }
    function c() {
        f && (a.css("max-height", ""),
        e.off("click.clients"),
        f = !1)
    }
    function d() {
        var b = $("> li", a).slice(0, 4)
          , c = 0;
        return $.each(b, function(a, b) {
            var d = $(this).outerHeight(!0);
            c += d
        }),
        c
    }
    var e = a.next(".list-grid__all")
      , f = !1
      , g = e.text()
      , h = e.data("alt");
    window.innerWidth < 768 ? b() : c()
}
,
landor.helper.custom_upload = function(a) {
    "use strict";
    $("input[type=file]", a).each(function() {
        var a = $(this)
          , b = a.prop("class")
          , c = $('<input type="text" data-ignore novalidate readonly>')
          , d = $('<div class="field-button__input">')
          , e = $('<div class="field-button__button"><a href="#" class="btn">Upload</a></div>');
        d.append(c),
        a.wrap('<div class="field-button grid-row custom-file' + b + '"/>').after(e).after(d),
        e.click(function(b) {
            a.click(),
            b.preventDefault()
        }),
        a.click(function(a) {
            e.find("a").blur()
        }),
        a.change(function(a) {
            var b = $(this).val().match(/[^\\]+$/);
            b.length > 0 && c.val(b[0])
        })
    })
}
,
landor.helper.custom_select = function(a) {
    "use strict";
    $("select:not([multiple])", a).each(function() {
        var a = $(this)
          , b = $('<span class="select__text" />')
          , c = a.prop("class")
          , d = $(":selected", a).text();
        b.text(d),
        a.wrap('<div class="select ' + c + '" />').after(b),
        a.change(function(c) {
            b.html($("option:selected", a).text()),
            a.val() !== d ? b.addClass("active") : b.removeClass("active")
        })
    })
}
,
landor.behavior.featured_posts = function(a) {
    "use strict";
    function b() {
        $(".owl-item .featured-post", a).height("");
        var b = 0;
        window.innerWidth < 980 && ($(".owl-item", a).not(".cloned").each(function(a, c) {
            $(this).outerHeight() > b && (b = $(this).outerHeight())
        }),
        $(".owl-item .featured-post", a).height(b))
    }
    a.owlCarousel({
        items: 1,
        nav: !1,
        dots: !0,
        loop: !0,
        autoplay: !0,
        autoplayTimeout: 7500,
        onInitialized: b,
        onResized: b
    })
}
,
landor.helper.get_query_params = function(a) {
    "use strict";
    return (a || document.location.search).replace(/(^\?)/, "").split("&").map(function(a) {
        return a = a.split("="),
        this[a[0]] = a[1],
        this
    }
    .bind({}))[0]
}
,
landor.behavior.header_scroll = function(a) {
    "use strict";
    function b() {
        var c = window.pageYOffset;
        c != m && (f = c < m ? "up" : "down"),
        c > l ? (a.addClass("page-header--scrolling"),
        "down" == f && c > 250 && landor.smoothscroll ? (a.addClass("page-header--hide"),
        $('.page-header [data-behavior="toggle"]').hasClass("active") && $('.page-header [data-behavior="toggle"]').trigger("click").blur()) : a.removeClass("page-header--hide")) : a.removeClass("page-header--scrolling"),
        m = c,
        g(b)
    }
    function c() {
        h = d(),
        i = e(),
        j = h - i,
        l = $("body").hasClass("home") ? $(".home-hero").outerHeight() - window.innerHeight : 1,
        l = l < 1 ? 1 : l
    }
    function d() {
        return $(".page__header, .post__header", a).outerHeight()
    }
    function e() {
        return $(".page-header", a).outerHeight()
    }
    var f, g = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.onscroll, h = d(), i = e(), j = h - i, k = a.hasClass("page-header--white"), l = $("body").hasClass("home") ? $(".home-hero").outerHeight() - window.innerHeight : 1, m = window.pageYOffset;
    l = l < 1 ? 1 : l,
    b(),
    k && $(window).on("resize", $.debounce(250, function() {
        c()
    })),
    $(".home-hero").on("home_hero_resize", c)
}
,
landor.behavior.home_hero = function(a) {
    "use strict";
    function b() {
        var c = window.pageYOffset;
        if (!o) {
            var d = Math.ceil(c / m)
              , e = i.eq(d)
              , f = c / k - (d - 1)
              , n = 0;
            n = 1 === d ? 1 - f.toFixed(2) : d < 1 ? 1 : 0,
            j.css("opacity", n),
            e.css("opacity", f.toFixed(2)).nextAll(".home-hero__image").css("opacity", "")
        }
        c + k >= l ? (i.css("opacity", 1),
        o || (a.addClass("home-hero--stop"),
        i.last().css("opacity", 1),
        j.css("top", (i.length - 1) * m),
        o = !0)) : o && (a.removeClass("home-hero--stop"),
        j.css("top", ""),
        o = !1),
        g = h(b)
    }
    function c() {
        if (landor.localstorage) {
            var b = parseInt(localStorage.getItem("hero_group"));
            hero_images = $.grep(hero_images, function(a, c) {
                return a.key !== b
            })
        }
        var c = $(".home-hero__images", a)
          , d = Math.floor(Math.random() * hero_images.length)
          , e = hero_images[d];
        a.addClass("home-hero--" + (e.images.length - 1)),
        $.each(e.images, function(a, b) {
            c.append('<div class="home-hero__image imgix-fluid-bg" data-src="' + b + '"></div>')
        }),
        landor.localstorage && localStorage.setItem("hero_group", parseInt(e.key))
    }
    function d() {
        k = window.innerHeight,
        l = a.outerHeight(),
        m = i.outerHeight(),
        n = a.offset().top,
        a.trigger("home_hero_resize")
    }
    function e() {
        a.addClass("home-hero--running"),
        d(),
        g = b()
    }
    function f() {
        cancelAnimationFrame(g),
        i.css("opacity", ""),
        a.removeClass("home-hero--running")
    }
    if (c(),
    $(".home-hero__arrow", a).on("click", function(a) {
        var b = $(".home-listing").offset().top - 60;
        $("html, body").animate({
            scrollTop: b
        }, 1750),
        a.preventDefault()
    }),
    !landor.touch) {
        var g, h = window.requestAnimationFrame, i = $(".home-hero__image", a), j = $(".home-hero__content", a), k = window.innerHeight, l = a.outerHeight(), m = i.outerHeight(), n = a.offset().top, o = !1;
        i.each(function(a, b) {
            $(b).css("z-index", a + 1)
        }),
        window.innerWidth > 767 && e(),
        $(window).on("resize.home_hero", $.debounce(200, function() {
            d(),
            window.innerWidth < 768 ? f() : e()
        }))
    }
}
,
landor.behavior.home_listing = function(a) {
    "use strict";
    function b() {
        var a = window.pageYOffset
          , c = a + k;
        j.each(function(b, d) {
            var e = Math.round(this.getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop)) + l
              , f = $(this).closest(".home-listing__item--case-study");
            if (e <= c) {
                var i = this.offsetHeight
                  , j = k - (e - a)
                  , n = $(this).hasClass("home-listing__item--news") ? k / 2 : i
                  , o = j / n
                  , p = Math.floor(m - o * m);
                j <= i ? (h != o && (this.style.opacity = o,
                $(this).parent("a").is(":first-child") && $(".home-listing__main", f).css("opacity", o),
                h = o),
                g != p && p >= 0 & p <= m && ($(this).css("transform", "translateY(" + p + "%)"),
                $(this).parent("a").is(":first-child") ? $(".home-listing__main", f).css("transform", "translateY(" + p + "%)") : $(".home-listing__main", f).css("transform", "translateY(0)"),
                g = p)) : ($(".home-listing__main", f).css("opacity", 1),
                this.style.opacity = 1,
                $(this).css("transform", "translateY(0)"))
            } else
                this.style.opacity = 0,
                $(this).css("transform", "translateY(" + m + "%)")
        }),
        f = i(b)
    }
    function c() {
        k = window.innerHeight,
        l = k / 7
    }
    function d() {
        n || (a.addClass("home-listing--running"),
        c(),
        f = b(),
        n = !0)
    }
    function e() {
        n && (cancelAnimationFrame(f),
        j.css({
            opacity: "",
            transform: ""
        }),
        a.removeClass("home-listing--running"),
        n = !1)
    }
    if (landor.smoothscroll) {
        var f, g, h, i = window.requestAnimationFrame, j = $("img, .home-listing__item--news", a), k = window.innerHeight, l = k / 7, m = 30, n = !1;
        window.innerWidth > 767 && d(),
        $(window).on("resize.home_hero", $.debounce(200, function() {
            c(),
            window.innerWidth < 768 ? e() : d()
        }))
    }
}
,
landor.helper.imgix = function(a) {
    "use strict";
    var b = window.devicePixelRatio;
    b > 1 && $("img:not([data-imgix-ignore])", a).each(function(a, c) {
        var d = $(c)
          , e = d.prop("src")
          , f = e.split("?")
          , g = f[1];
        g && e.indexOf("imgix.net") >= 0 && (g.indexOf("dpr=") >= 1 ? g = g.replace(/(dpr=)[^\&]+/, "$1" + b) : g += "&dpr=" + b,
        d.prop("src", f[0] + "?" + g))
    })
}
,
landor.behavior.jobs_filter = function(a) {
    function b() {
        c(),
        d(),
        t.val() && (u = JSON.parse(t.val()),
        s.page = u.page || 0,
        o.html(u.html || ""),
        u.load_more ? p.removeClass("hidden") : p.addClass("hidden"),
        $("body,html").scrollTop(u.scrollTop))
    }
    function c() {
        n.on("change.filter", g),
        p.on("click", f)
    }
    function d() {
        $("option:selected").each(function() {
            var a = $(this);
            a.val() > -1 && (l = a.closest("select"),
            h(l))
        })
    }
    function e(a) {
        $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            dataType: "json",
            data: s,
            success: function(b) {
                if (o.removeClass("jobs-list--loading"),
                p.removeClass("btn--loading"),
                b.html) {
                    if (a ? (o.append(b.html),
                    q += 5) : (o.html(b.html),
                    q = b.total > 5 ? 5 : b.total),
                    b.total <= q ? (p.addClass("hidden"),
                    r = !0) : r && (p.removeClass("hidden"),
                    r = !1),
                    window.history.pushState) {
                        var c = window.location.origin + window.location.pathname;
                        l && (c += "?" + l.data("filter") + "=" + s[l.data("filter")]),
                        window.history.pushState({}, "Filtered Search", c)
                    }
                    k(s.page)
                }
            }
        })
    }
    function f(a) {
        a.preventDefault(),
        s.page++,
        p.addClass("btn--loading"),
        e(!0)
    }
    function g(a) {
        var b = $(a.target)
          , c = b.val();
        o.addClass("jobs-list--loading"),
        l && l[0] !== b[0] && j(),
        l = b,
        "-1" !== c ? h(l) : l && (i(l),
        l = void 0),
        s.page = 0,
        e(!1)
    }
    function h(a) {
        s[a.data("filter")] = a.val()
    }
    function i(a) {
        delete s[a.data("filter")]
    }
    function j() {
        l.prop("selectedIndex", 0).next().text(l.find("option:first").text()),
        i(l),
        l = void 0
    }
    function k(a) {
        var b = JSON.stringify({
            page: a,
            html: o.html(),
            load_more: !r,
            scrollTop: $("html,body").scrollTop()
        });
        t.val(b)
    }
    var l, m = $("[data-filter-form]", a), n = m.find("[data-filter]"), o = $(".jobs-list", a), p = $("#view-more"), q = 5, r = !(o.children("li").length > 5), s = {
        action: "get_jobs",
        page: 0
    }, t = $("#jobCache", a), u = {};
    b()
}
,
landor.behavior.load_video = function(a) {
    "use strict";
    var b = a.data("post")
      , c = a.data("field")
      , d = a.data("parent")
      , e = a.data("index")
      , f = a.data("url")
      , g = !1;
    a.on("click", function(h) {
        a.addClass("video-module--loading"),
        $(document).trigger("video_play"),
        g ? (a.after(g),
        a.removeClass("video-module--loading")) : $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            data: {
                action: f ? "get_video_from_url" : "get_video_player",
                post_id: b,
                field: c,
                field_index: e,
                parent: d,
                url: f
            },
            success: function(b) {
                g = b,
                a.after(g),
                a.removeClass("video-module--loading")
            }
        }),
        h.preventDefault()
    })
}
,
landor.behavior.media_switcher = function(a) {
    "use strict";
    var b = ($(".media-switcher__item", a),
    $(".media-switcher__nav", a));
    $("a", b).on("click", function(b) {
        var c = $(this).prop("hash");
        $(".video-module__player", a).remove(),
        $(".media-switcher__item--active", a).removeClass("media-switcher__item--active"),
        $(c).addClass("media-switcher__item--active"),
        $(".media-switcher__nav--active", a).removeClass("media-switcher__nav--active"),
        $(this).parent().addClass("media-switcher__nav--active"),
        b.preventDefault()
    });
    var c = window.location.hash;
    if (c) {
        $('a[href="' + c + '"]', b).length > 0 && $('a[href="' + c + '"]', b).click()
    }
}
,
landor.behavior.news_filter = function(a) {
    "use strict";
    function b(a, b) {
        $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            dataType: "json",
            data: {
                action: "load_more_news",
                data: a,
                append: b
            },
            success: function(d) {
                f.removeClass("news-list--loading"),
                g.removeClass("btn--loading"),
                d.html ? (g.removeClass("hidden").blur(),
                j.addClass("hidden"),
                !0 === b ? e(d) : (f.html(d.html),
                h.off("submit.filter"),
                i.off("change.filter"),
                h = $("[data-filter-form]", f),
                i = $("[data-filter]", h),
                landor.loadBehaviors(f),
                c())) : (g.addClass("hidden"),
                f.empty(),
                j.removeClass("hidden")),
                a.page < d.query.max_num_pages ? g.removeClass("hidden") : g.addClass("hidden")
            }
        })
    }
    function c() {
        h.on("submit.filter", function(a) {
            l.page = 1,
            i.each(function(a, b) {
                var c = $(this)
                  , d = parseInt(c.val());
                "year" == c.data("filter") ? l.year = -1 == d ? -1 : d : -1 == d ? (l.news_type = -1,
                delete l.tax_query) : (l.news_type = d,
                l.tax_query = [{
                    taxonomy: "news-event-type",
                    field: "id",
                    terms: d
                }])
            }),
            d(),
            f.addClass("news-list--loading"),
            b(l),
            a.preventDefault()
        }),
        i.on("change.filter", function(a) {
            h.trigger("submit.filter"),
            a.preventDefault()
        })
    }
    function d() {
        var a = {};
        l.page > 1 && (a.pg = l.page),
        -1 != l.news_type && (a.type = l.news_type),
        -1 != l.year && (a.yr = l.year);
        var b = $.param(a)
          , c = window.location.href.split("?")
          , d = c[0].split("/page")
          , e = d[0] + (b ? "?" + b : "");
        history.pushState(a, null, e)
    }
    function e(b) {
        if (b.first_date == g.data("last-date")) {
            var c = $("<div />").html(b.html)
              , d = c.find(".news-group").first()
              , e = d.find(".list-item")
              , h = $('[data-date="' + b.first_date + '"]', a);
            d.remove(),
            h.append(e),
            f.append(c.unwrap()),
            g.data("last-date", b.last_date)
        } else
            f.append(b.html)
    }
    var f = $("[data-post-container]", a)
      , g = $("[data-load-more]", a)
      , h = $("[data-filter-form]", f)
      , i = $("[data-filter]", h)
      , j = $("[data-no-results]", a)
      , k = landor.helper.get_query_params()
      , l = {
        page: parseInt(k.pg) || 1,
        yr: parseInt(k.yr) || -1,
        type: parseInt(k.type) || -1
    };
    c(),
    g.on("click", function(a) {
        l.page++,
        b(l, !0),
        g.addClass("btn--loading"),
        a.preventDefault()
    })
}
,
landor.behavior.newsletter = function(a) {
    "use strict";
    function b() {
        window.innerWidth < 768 ? e.prop("placeholder", j) : e.prop("placeholder", i)
    }
    var c = $("form", a)
      , d = $("label", c)
      , e = $('input[type="email"]', c)
      , f = $(":submit", c)
      , g = $('<span class="message message--success"></span>')
      , h = $('<span class="message message--error"></span>')
      , i = e.prop("placeholder")
      , j = e.data("mobile-placeholder");
    b(),
    $(window).on("resize", $.debounce(200, function() {
        b()
    })),
    c.on("submit", function(a) {
        f.prop("disabled", !0).addClass("btn--loading"),
        e.prop("disabled", !0),
        h.remove(),
        $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            data: {
                action: "subscribeToNewsletter",
                email: escape(e.val())
            },
            success: function(a) {
                f.removeClass("btn--loading"),
                f.prop("disabled", !1),
                e.prop("disabled", !1),
                "true" == a ? (e.val(""),
                g.insertAfter(d).text("You have successfully subscribed"),
                $(document).trigger("newsletter_signup")) : h.insertAfter(d).text(a)
            }
        }),
        a.preventDefault()
    })
}
,
landor.behavior.office_timezones = function(a) {
    "use strict";
    function b(a, b) {
        var d = b || a
          , e = a.data("timezone")
          , f = moment.tz(c, e).format("h:mm a");
        d.append("<time>" + f + "</time>")
    }
    var c = moment();
    a.hasClass("office__header") ? b(a) : $("> li", a).each(function() {
        var a = $(this);
        b(a, $("a", a))
    })
}
,
landor.behavior.overlay_trigger = function(a) {
    "use strict";
    var b = a.prop("hash")
      , c = $(b)
      , d = $('[data-overlay-close="' + b + '"]', c)
      , e = !1;
    a.add(d).on("click", function(a) {
        $("body").toggleClass("page-overlay--open"),
        c.toggleClass("page-overlay--open"),
        e = !e,
        "#overlay-language-list" == b && $("body").toggleClass("language-overlay-open"),
        $("[data-case-studies-list]", c).scrollTop(0),
        a.preventDefault()
    }),
    $(document).on("keyup", function(b) {
        e && 27 == b.keyCode && a.click()
    })
}
,
landor.behavior.popup = function(a) {
    "use strict";
    a.magnificPopup({
        type: "image",
        closeBtnInside: !0,
        callbacks: {
            elementParse: function(a) {
                var b = "&fit=max&dpr=" + window.devicePixelRatio + "&h=" + (window.innerHeight - 100);
                a.src = a.src + b
            }
        }
    })
}
,
landor.behavior.post_filter = function(a) {
    "use strict";
    function b(b, g) {
        "" === b.s && delete b.s,
        c(),
        $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            dataType: "json",
            data: {
                action: "load_more_posts",
                data: b
            },
            success: function(c) {
                if (e.removeClass("filters--loading"),
                f.removeClass("btn--loading").blur(),
                c.html ? (f.removeClass("hidden"),
                i.addClass("hidden"),
                !0 === g ? e.append(c.html) : e.html(c.html),
                h.off("click.filter"),
                h = $("[data-filter]", a),
                d()) : (f.addClass("hidden"),
                e.empty(),
                i.removeClass("hidden")),
                b.page < c.query.max_num_pages ? f.removeClass("hidden") : f.addClass("hidden"),
                e.prev(".search-query").remove(),
                b.s) {
                    var j = '<div class="search-query">Search results:<br>' + c.friendly_s + "</div>";
                    e.before(j)
                }
            }
        })
    }
    function c() {
        var a = {};
        m.page > 1 && (a.pg = m.page),
        -1 != m.cat && (a.category = m.cat),
        m.s && (a.q = m.s);
        var b = $.param(a)
          , c = window.location.href.split("?")
          , d = c[0].split("/page")
          , e = d[0] + (b ? "?" + b : "");
        history.pushState(a, null, e)
    }
    function d() {
        h.on("click.filter", function(a) {
            var c = $(this);
            c.prop("name");
            m.page = 1,
            m.cat = c.data("filter"),
            e.addClass("filters--loading"),
            $("[data-filter].filters--active", g).removeClass("filters--active"),
            $('[data-filter="' + c.data("filter") + '"]', g).addClass("filters--active"),
            b(m),
            a.preventDefault()
        })
    }
    var e = $("[data-post-container]", a)
      , f = $("[data-load-more]", a)
      , g = $(".filters__list", a)
      , h = $("[data-filter]", a)
      , i = $("[data-no-results]", a)
      , j = $("#searchform", a)
      , k = $("#s", a)
      , l = landor.helper.get_query_params()
      , m = {
        page: parseInt(l.pg) || 1,
        cat: parseInt(l.category) || -1,
        s: l.s || k.val()
    };
    d(),
    f.on("click", function(a) {
        m.page++,
        b(m, !0),
        f.addClass("btn--loading"),
        a.preventDefault()
    }),
    j.on("submit", function(a) {
        m.page = 1,
        m.s = k.val().replace(/<\/?[^>]+(>|$)/g, "").replace(/[!'()]/g, escape).replace(/\*/g, "%2A"),
        e.addClass("filters--loading"),
        b(m),
        a.preventDefault()
    })
}
,
landor.behavior.slideshow = function(a) {
    "use strict";
    function b() {
        var b = $(".owl-item.active img", a).outerHeight();
        g.css({
            top: b + 25
        })
    }
    function c() {
        $(".owl-next", a).on("click", function(a) {
            e = "left"
        }),
        $(".owl-prev", a).on("click", function(a) {
            e = "right"
        })
    }
    var d, e, f = $(".slideshow__main", a), g = $(".slideshow__counter", a), h = $(".current", g), i = $(".total", g), j = parseInt(i.text());
    f.owlCarousel({
        items: 1,
        nav: !0,
        dots: !1,
        loop: !0,
        onDragged: function() {
            e = this.state.direction
        },
        onChanged: function() {
            d = "left" == e ? d >= j ? 1 : d + 1 : d <= 1 ? j : d - 1,
            h.text(d),
            this.state.direction = !1
        },
        onInitialized: function() {
            d = 1,
            h.text(d),
            c(),
            a.imagesLoaded(function() {
                b()
            })
        },
        onResized: b
    })
}
,
landor.behavior.social = function(a) {
    "use strict";
    if ("undefined" == typeof __gaTracker)
        return !1;
    $("[data-type]", a).on("click", function(a) {
        __gaTracker("send", "social", $(this).data("type"), "Share", window.location.href)
    })
}
,
landor.behavior.sticky = function(a) {
    "use strict";
    function b() {
        var c = window.pageYOffset
          , d = a.offset().top
          , h = g.outerHeight()
          , l = a.outerHeight()
          , m = $("body").hasClass("page-header--hide") ? 40 : 150
          , n = a.offset().top + (l - h)
          , o = c + m;
        if (h + 40 >= l)
            return !0;
        o <= d ? g.removeClass(i + " " + j).width("") : o > d && o < n ? g.removeClass(j).addClass(i).width(k) : g.removeClass(i).addClass(j).width(""),
        e = f(b)
    }
    function c() {
        e = b(),
        l = !0
    }
    function d() {
        cancelAnimationFrame(e),
        g.removeClass(i + " " + j).width(""),
        l = !1
    }
    var e, f = window.requestAnimationFrame, g = $("[data-sticky]", a), h = ($(window),
    $(".home-listing__guide", a)), i = "sticky-fixed", j = "sticky-abs", k = h.width(), l = !1;
    $(document).imagesLoaded(function() {
        window.innerWidth > 767 && landor.smoothscroll && c()
    }),
    $(window).on("resize", $.debounce(200, function() {
        k = h.width(),
        g.width(k),
        window.innerWidth < 768 && l ? d() : window.innerWidth > 767 && !l && c()
    }))
}
,
landor.behavior.submit_form = function(a) {
    "use strict";
    function b(a) {
        q = a,
        a ? t.addClass("btn--loading") : t.removeClass("btn--loading"),
        s.prop("disabled", a)
    }
    function c(a) {
        a.prop("required") && e({
            test: "" === $.trim(a.val()) || "-1" === a.val(),
            input: a,
            message: "This field is required."
        })
    }
    function d(a, b) {
        var c = "";
        [{
            test: -1 === B.indexOf(a.type.replace(/\..+/, "")),
            message: "Acceptable file types are .PDF, .DOC, DOCX, .RTF, .TXT."
        }, {
            test: a.size / 1e6 > A,
            message: "Max file size is " + A + "MB."
        }].forEach(function(a) {
            if (a.test) {
                var b = c.length > 0 ? "<br/>" : "";
                c += b + a.message
            }
        }),
        e({
            test: c.length > 0,
            input: b,
            message: c
        })
    }
    function e(a) {
        var b = a.input
          , c = b.hasClass("control__select") || "file" === b.prop("type") ? b.parent() : b
          , d = c.siblings(".message--error");
        a.test ? f(b, a.message) : d.length > 0 && d.remove()
    }
    function f(a, b) {
        var c = a.closest(".control");
        c.find(".message").remove(),
        p = !1,
        c.addClass("control--error").append('<span class="message message--error">' + b + "</span>")
    }
    function g(c) {
        var d = $(".control--error", a).length > 0 ? $(".control--error", a).first() : r;
        $("html,body").animate({
            scrollTop: d.offset().top - ($(".page-header").outerHeight() + 40)
        }, 500),
        v.prependTo(r).text(c),
        b(!1)
    }
    function h(a, b) {
        var d = $(b)
          , e = d.prop("name");
        c(d),
        k(d) ? i(e, d) : "" !== e && j(e, d.val())
    }
    function i(a, b) {
        if (window.FileReader) {
            var c = b[0].files[0]
              , e = new FileReader;
            e.onloadend = function(e) {
                m.append(a, c),
                d(c, b),
                ++z === y && (m.append("action", r.data("action")),
                r.trigger("filesUploaded"))
            }
            ,
            c && (y++,
            e.readAsDataURL(c))
        }
    }
    function j(a, b) {
        m instanceof FormData ? m.append(a, b) : m[a] = b
    }
    function k(a) {
        return "file" === a.prop("type")
    }
    function l() {
        $.ajax({
            type: "POST",
            url: "/wp/wp-admin/admin-ajax.php",
            contentType: o,
            processData: n,
            data: m,
            success: function(a) {
                t.removeClass("btn--loading").prop("disabled", !0),
                "true" == a ? (u.insertAfter(t).text(w),
                t.text("Sent")) : (g("There has been a problem. Please try again later."),
                b(!1))
            }
        })
    }
    var m, n, o, p, q, r = $(this), s = $(":input:not([type=submit])", r), t = $(":submit", r), u = ($("[required]", r),
    $('<span class="message message--success"></span>')), v = $('<span class="message message--error"></span>'), w = r.data("success-message"), x = $("input[type=file]").length > 0, y = 0, z = 0, A = 10.5, B = ["application/pdf", "application/msword", "application/vnd", "application/rtf", "application/x-rtf", "text/plain", "text/rtf", "text/richtext"];
    if (x) {
        if (!(window.File && window.FileReader && window.FileList && FormData))
            return;
        m = new FormData,
        n = !1,
        o = !1
    } else
        m = {},
        n = !0,
        o = "application/x-www-form-urlencoded; charset=UTF-8";
    r.on("submit", function(a) {
        if (a.preventDefault(),
        !q) {
            if (b(!0),
            p || (v.remove(),
            $(".control--error", r).removeClass("control--error"),
            p = !0),
            s.each(h),
            !p)
                return void g("There has been an error. Please check the form.");
            x || (m.action = r.data("action"),
            l())
        }
    }),
    r.on("filesUploaded", function() {
        p ? l() : g("There has been an error. Please check the form.")
    })
}
,
landor.behavior.toggle = function(a) {
    "use strict";
    var b = a.prop("hash")
      , c = $(b);
    a.on("click", function(b) {
        $([a, c]).toggleClass("active"),
        b.stopPropagation(),
        b.preventDefault()
    }),
    c.on("click", function(a) {
        a.stopPropagation()
    }),
    $("body").on("click", function(b) {
        a.hasClass("active") && $([a, c]).toggleClass("active")
    })
}
,
landor.behavior.tooltip = function(a) {
    "use strict";
    var b;
    a.on({
        mouseenter: function(c) {
            var d = a.data("tooltip");
            a.append('<span class="tooltip__tip">' + d + "</span>"),
            b = setTimeout(function() {
                a.addClass("tooltip--active")
            }, 1)
        },
        mouseleave: function(c) {
            a.removeClass("tooltip--active"),
            b = setTimeout(function() {
                a.find(".tooltip__tip").remove()
            }, 300)
        }
    }),
    landor.touch && a.on("touchend", function() {
        a.click()
    })
}
,
$(document).ready(function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
        var d = (new Date).getTime()
          , e = Math.max(0, 16 - (d - a))
          , f = window.setTimeout(function() {
            b(d + e)
        }, e);
        return a = d + e,
        f
    }
    ),
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }
    ),
    landor.loadBehaviors(),
    landor.helper.analytics()
});
var options = {
    fluidClass: "imgix-fluid-bg",
    autoInsertCSSBestPractices: !0
};
imgix.onready(function() {
    imgix.fluid(options)
});
