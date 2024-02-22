!(function (e) {
  "use strict";
  var t,
    o,
    i,
    n,
    s,
    a,
    r,
    l,
    c,
    h,
    u,
    d,
    p,
    m,
    f,
    v,
    g,
    b,
    w,
    y,
    C,
    A = document,
    x = window,
    T = [],
    k = [],
    L = -1,
    E = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    O = !("placeholder" in A.createElement("input")),
    D = !!x.ActiveXObject,
    M = "ontouchend" in A,
    N = e(),
    z =
      "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    H = Y("transformOrigin"),
    I = Y("transition"),
    P = {},
    X = new Image(),
    B = new Image(),
    W = {
      loop: !0,
      thumbs: !0,
      counter: !0,
      title: !0,
      autoplay: !1,
      time: 3e3,
      history: !0,
      hideFlash: !0,
      zoomable: !0,
      keys: { close: "27, 88, 67", prev: "37, 80", next: "39, 78" },
    },
    S = e('<div id="pbOverlay">').append(
      e('<div class="pbLoader"><b></b><b></b><b></b></div>'),
      (w = e('<div class="imageWrap">').append(
        (d = e("<img>")),
        (p = e('<div id="pbPrevBtn" class="prevNext"><b></b></div>').on(
          "click",
          j
        )),
        (m = e('<div id="pbNextBtn" class="prevNext"><b></b></div>').on(
          "click",
          j
        ))
      )),
      e('<div id="pbCloseBtn">').on("click", ee)[0],
      (g = e('<div id="pbAutoplayBtn">').append(e('<div class="pbProgress">'))),
      (f = e('<div id="pbCaption">').append(
        (v = e('<div class="pbCaptionText">').append(
          '<div class="title"></div><div class="counter">'
        )),
        (b = e("<div>").addClass("pbThumbs"))
      ))
    );
  function F() {
    O && S.addClass("msie"),
      D && S.hide(),
      g.on("click", c.toggle),
      b.on("click", "a", r.click),
      M && b.css("overflow", "auto"),
      S.on("click", "img", function (e) {
        e.stopPropagation();
      }),
      e(A.body).prepend(e(S)),
      (l = A.documentElement);
  }
  function R(e, t, o) {
    1 == t
      ? (d.css({ transform: "translateX(25%)", transition: ".7s", opacity: 0 }),
        setTimeout(function () {
          U(s);
        }, 200))
      : -1 == t &&
        (d.css({
          transform: "translateX(-25%)",
          transition: ".7s",
          opacity: 0,
        }),
        setTimeout(function () {
          U(a);
        }, 200)),
      1 == o ? b.addClass("show") : -1 == o && b.removeClass("show");
  }
  function Y(e) {
    var t,
      o = A.createElement("p").style,
      i = ["ms", "O", "Moz", "Webkit"];
    if ("" == o[e]) return e;
    for (e = e.charAt(0).toUpperCase() + e.slice(1), t = i.length; t--; )
      if ("" == o[i[t] + e]) return i[t] + e;
  }
  function _(e) {
    var t = e.keyCode,
      o = i.keys;
    return (
      (o.close.indexOf(t) >= 0 && ee()) ||
      (o.next.indexOf(t) >= 0 && U(a)) ||
      (o.prev.indexOf(t) >= 0 && U(s)) ||
      !0
    );
  }
  function j() {
    return U("pbPrevBtn" == this.id ? s : a), !1;
  }
  function U(e, t, o) {
    (!e || e < 0) && (e = 0),
      S.removeClass("error").addClass(e > L ? "next" : "prev"),
      (L = e),
      (n = k[e][0]),
      (s = (L || (i.loop ? k.length : 0)) - 1),
      (a = (L + 1) % k.length || (i.loop ? 0 : -1)),
      $();
    var l = setTimeout(function () {
      S.addClass("pbLoading");
    }, 50);
    function h() {
      v.off(E).removeClass("change"),
        i.counter &&
          f.find(".counter").text("(" + (L + 1) + " / " + k.length + ")"),
        i.title && f.find(".title").text(k[L][1]);
    }
    i.loop ||
      (m[e == k.length - 1 ? "addClass" : "removeClass"]("hide"),
      p[0 == e ? "addClass" : "removeClass"]("hide")),
      v.on(E, h).addClass("change"),
      (t || O) && h(),
      i.thumbs && r.changeActive(e, t, o),
      s >= 0 && (X.src = k[s][0]),
      a >= 0 && (B.src = k[a][0]),
      O && S.addClass("hide"),
      d.data("zoom", 1),
      i.autoplay && c.progress.reset(),
      ((P = new Image()).onload = function () {
        clearTimeout(l),
          (function (e) {
            S.removeClass("pbLoading").addClass("hide"),
              d.removeAttr("style").removeClass("zoomable"),
              e || O ? t() : d.on(E, t);
            function t() {
              d.off(E).css({ transition: "none" }),
                (d[0].src = n),
                (d[0].className = "prepare"),
                setTimeout(function () {
                  (d.removeAttr("style")[0].className = ""),
                    S.removeClass("hide next prev"),
                    setTimeout(function () {
                      (d[0].className = ""), d.on(E, G), O && G();
                    }, 0);
                }, 50);
            }
          })(t);
      }),
      (P.onerror = q),
      (P.src = n),
      Q.save();
  }
  e(A).ready(F),
    (e.fn.photobox = function (o, i, n) {
      if (("string" != typeof o && (o = "a"), "prepareDOM" === o))
        return F(), this;
      var s = e.extend({}, W, i || {}),
        a = new t(s, this, o);
      return (
        e(this).data("_photobox", a),
        (a.callback = n),
        T.push(a),
        Q.load(),
        this
      );
    }),
    ((t = function (t, o, i) {
      (this.options = e.extend({}, t)),
        (this.target = i),
        (this.selector = e(o || A)),
        (this.thumbsList = null);
      var n = this.imageLinksFilter(o.find(i));
      (this.imageLinks = n[0]), (this.images = n[1]), this.init();
    }).prototype = {
      init: function () {
        var e = this;
        this.options.thumbs && (this.thumbsList = r.generate(this.imageLinks)),
          this.selector.on("click.photobox", this.target, function (t) {
            t.preventDefault(), e.open(this);
          }),
          (this.observerTimeout = null),
          1 == this.selector[0].nodeType &&
            e.observeDOM(e.selector[0], function () {
              clearTimeout(e.observerTimeout),
                (e.observerTimeout = setTimeout(function () {
                  var t = e.imageLinksFilter(e.selector.find(e.target));
                  (e.imageLinks = t[0]),
                    (e.images = t[1]),
                    (e.thumbsList = r.generate(e.imageLinks));
                }, 50));
            });
      },
      open: function (t) {
        var n = e.inArray(t, this.imageLinks);
        return (
          -1 != n &&
          ((i = this.options),
          (k = this.images),
          (o = this),
          this.setup(1),
          S.on(E, function () {
            S.off(E).addClass("on"), U(n, !0);
          }).addClass("show"),
          O && S.trigger("MSTransitionEnd"),
          !1)
        );
      },
      imageLinksFilter: function (t) {
        var o = [];
        return [
          t.filter(function (t) {
            var i = e(this).find("img")[0];
            return (
              !!i &&
              (o.push([
                this.href,
                i.getAttribute("alt") || i.getAttribute("title") || "",
              ]),
              !0)
            );
          }),
          o,
        ];
      },
      observeDOM:
        ((y = x.MutationObserver || x.WebKitMutationObserver),
        (C = x.addEventListener),
        function (e, t) {
          y
            ? new y(function (e, o) {
                (e[0].addedNodes.length || e[0].removedNodes.length) && t();
              }).observe(e, { childList: !0, subtree: !0 })
            : C &&
              (e.addEventListener("DOMNodeInserted", t, !1),
              e.addEventListener("DOMNodeRemoved", t, !1));
        }),
      setup: function (t) {
        var o = t ? "on" : "off";
        (d[0].src = z),
          t
            ? (d.css({ transition: "0s" }).removeAttr("style"),
              S.show(),
              b.html(this.thumbsList),
              S[i.thumbs ? "addClass" : "removeClass"]("thumbs"),
              i.thumbs &&
                (N.removeAttr("class"),
                e(x).on("resize.photobox", r.calc),
                r.calc()),
              this.images.length < 2
                ? S.removeClass("thumbs hasArrows hasCounter hasAutoplay")
                : (S.addClass("hasArrows hasCounter"),
                  i.time > 1e3
                    ? (S.addClass("hasAutoplay"),
                      i.autoplay ? c.progress.start() : c.pause())
                    : S.removeClass("hasAutoplay")))
            : e(x).off("resize.photobox"),
          i.hideFlash &&
            e.each(["object", "embed"], function (o, i) {
              e(i).each(function () {
                t && (this._photobox = this.style.visibility),
                  (this.style.visibility = t ? "hidden" : this._photobox);
              });
            }),
          e(A)[o]({ "keydown.photobox": _ }),
          "ontouchstart" in document.documentElement &&
            (S.removeClass("hasArrows"), w[o]("swipe", R)),
          i.zoomable &&
            (w[o]({ "mousewheel.photobox": Z }),
            O || b[o]({ "mousewheel.photobox": J }));
      },
      destroy: function () {
        return (
          this.selector
            .off("click.photobox", this.target)
            .removeData("_photobox"),
          ee(),
          this.selector
        );
      },
    }),
    (r = {
      generate: function (t) {
        var o,
          i,
          n,
          s = e("<ul>"),
          a = [],
          r = t.toArray().length;
        for (i = 0; i < r; i++)
          (n = (o = t[i]).children[0].title || o.children[0].alt || ""),
            a.push(
              '<li><a href="' +
                o.href +
                '"><img src="' +
                o.children[0].src +
                '" alt="" title="' +
                n +
                '" /></a></li>'
            );
        return s.html(a.join("")), s;
      },
      click: function (t) {
        return (
          t.preventDefault(),
          N.removeClass("active"),
          (N = e(this).parent().addClass("active")),
          U(e(this.parentNode).index(), 0, 1)
        );
      },
      changeActiveTimeout: null,
      changeActive: function (e, t, o) {
        N.index();
        N.removeClass("active"),
          (N = b.find("li").eq(e).addClass("active")),
          o ||
            (clearTimeout(this.changeActiveTimeout),
            (this.changeActiveTimeout = setTimeout(function () {
              var e =
                N[0].offsetLeft + N[0].clientWidth / 2 - l.clientWidth / 2;
              t ? b.delay(800) : b.stop(),
                b.animate({ scrollLeft: e }, 500, "swing");
            }, 200)));
      },
      calc: function () {
        return (
          (h = b[0].clientWidth),
          (u = b[0].firstChild.clientWidth),
          !M && b[u > h ? "on" : "off"]("mousemove", r.move),
          this
        );
      },
      move: function (e) {
        var t = u / h;
        b[0].scrollLeft = e.pageX * t - 500;
      },
    }),
    (c = {
      autoPlayTimer: !1,
      play: function () {
        (c.autoPlayTimer = setTimeout(function () {
          U(a);
        }, i.time)),
          c.progress.start(),
          g.removeClass("play"),
          c.setTitle("Click to stop autoplay"),
          (i.autoplay = !0);
      },
      pause: function () {
        clearTimeout(c.autoPlayTimer),
          c.progress.reset(),
          g.addClass("play"),
          c.setTitle("Click to resume autoplay"),
          (i.autoplay = !1);
      },
      progress: {
        reset: function () {
          g.find("div").removeAttr("style"),
            setTimeout(function () {
              g.removeClass("playing");
            }, 200);
        },
        start: function () {
          O || g.find("div").css(I, i.time + "ms"), g.addClass("playing");
        },
      },
      setTitle: function (e) {
        e && g.prop("title", e + " (every " + i.time / 1e3 + " seconds)");
      },
      toggle: function (e) {
        e.stopPropagation(), c[i.autoplay ? "pause" : "play"]();
      },
    });
  var K,
    Q = {
      save: function () {
        "pushState" in window.history &&
          decodeURIComponent(window.location.hash.slice(1)) != n &&
          i.history &&
          window.history.pushState(
            "photobox",
            A.title + "-" + k[L][1],
            window.location.pathname +
              window.location.search +
              "#" +
              encodeURIComponent(n)
          );
      },
      load: function () {
        if (i && !i.history) return !1;
        var e,
          t,
          o = decodeURIComponent(window.location.hash.slice(1));
        if (!o && S.hasClass("show")) ee();
        else
          for (e = 0; e < T.length; e++)
            for (t in T[e].images)
              if (T[e].images[t][0] == o)
                return T[e].open(T[e].imageLinks[t]), !0;
      },
      clear: function () {
        i.history &&
          "pushState" in window.history &&
          window.history.pushState(
            "photobox",
            A.title,
            window.location.pathname + window.location.search
          );
      },
    };
  function q() {
    S.addClass("error"), (d[0].src = z), (P.onerror = null);
  }
  function G() {
    d.off(E),
      d.addClass("zoomable"),
      g && i.autoplay && c.play(),
      "function" == typeof o.callback && o.callback();
  }
  function Z(t, o) {
    var i = d.data("zoom") || 1,
      n = d[0].getBoundingClientRect();
    return (
      (i += o / 10) < 0.1 && (i = 0.1),
      d.data("zoom", i).css({ transform: "scale(" + i + ")" }),
      n.height > l.clientHeight || n.width > l.clientWidth
        ? e(A).on("mousemove.photobox", V)
        : (e(A).off("mousemove.photobox"), (d[0].style[H] = "50% 50%")),
      !1
    );
  }
  function J(e, t) {
    e.preventDefault();
    var i = o.thumbsList;
    i.css("height", i[0].clientHeight + 10 * t);
    var n = f[0].clientHeight / 2;
    (w[0].style.cssText = "margin-top: -" + n + "px; padding: " + n + "px 0;"),
      b.hide().show(0),
      r.calc();
  }
  function V(e) {
    var t =
        (((e.clientY / l.clientHeight) * (l.clientHeight + 200) - 100) /
          l.clientHeight) *
        100,
      o =
        ((e.clientX / l.clientWidth) * 100).toFixed(2) +
        "% " +
        t.toFixed(2) +
        "%";
    d[0].style[H] = o;
  }
  function $() {
    clearTimeout(c.autoPlayTimer),
      e(A).off("mousemove.photobox"),
      (P.onload = function () {}),
      (P.src = X.src = B.src = n);
  }
  function ee() {
    function e() {
      "" != S[0].className &&
        (S.removeClass("show hide error pbLoading"),
        d.removeAttr("class").removeAttr("style").off().data("zoom", 1),
        D &&
          setTimeout(function () {
            S.hide();
          }, 200));
    }
    $(),
      t.prototype.setup(),
      Q.clear(),
      S.removeClass("on").addClass("hide"),
      d.on(E, e),
      O && e(),
      setTimeout(e, 500);
  }
  window.onpopstate =
    ((K = window.onpopstate),
    function (e) {
      K && K.apply(this, arguments), "photobox" == e.state && Q.load();
    });
  var te = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks)
    for (var oe = te.length; oe; )
      e.event.fixHooks[te[--oe]] = e.event.mouseHooks;
  function ie(t) {
    var o = t || x.event,
      i = [].slice.call(arguments, 1),
      n = 0,
      s = 0,
      a = 0;
    return (
      ((t = e.event.fix(o)).type = "mousewheel"),
      o.wheelDelta && (n = o.wheelDelta / 120),
      o.detail && (n = -o.detail / 3),
      (a = n),
      void 0 !== o.axis &&
        o.axis === o.HORIZONTAL_AXIS &&
        ((a = 0), (s = -1 * n)),
      void 0 !== o.wheelDeltaY && (a = o.wheelDeltaY / 120),
      void 0 !== o.wheelDeltaX && (s = (-1 * o.wheelDeltaX) / 120),
      i.unshift(t, n, s, a),
      (e.event.dispatch || e.event.handle).apply(this, i)
    );
  }
  (e.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener)
        for (var e = te.length; e; ) this.addEventListener(te[--e], ie, !1);
      else this.onmousewheel = ie;
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var e = te.length; e; ) this.removeEventListener(te[--e], ie, !1);
      else this.onmousewheel = null;
    },
  }),
    e.fn.extend({
      mousewheel: function (e) {
        return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
      },
      unmousewheel: function (e) {
        return this.unbind("mousewheel", e);
      },
    }),
    (e.event.special.swipe = {
      setup: function () {
        e(this).bind("touchstart", e.event.special.swipe.handler);
      },
      teardown: function () {
        e(this).unbind("touchstart", e.event.special.swipe.handler);
      },
      handler: function (t) {
        var o,
          i,
          n = [].slice.call(arguments, 1),
          s = t.originalEvent.touches,
          a = 0,
          r = 0,
          l = this;
        function c() {
          l.removeEventListener("touchmove", h), (o = i = null);
        }
        function h(s) {
          s.preventDefault();
          var h = o - s.touches[0].pageX,
            u = i - s.touches[0].pageY;
          return (
            Math.abs(h) >= 20
              ? (c(), (a = h > 0 ? -1 : 1))
              : Math.abs(u) >= 20 && (c(), (r = u > 0 ? 1 : -1)),
            (t.type = "swipe"),
            n.unshift(t, a, r),
            (e.event.dispatch || e.event.handle).apply(l, n)
          );
        }
        (t = e.event.fix(t)),
          1 == s.length &&
            ((o = s[0].pageX),
            (i = s[0].pageY),
            this.addEventListener("touchmove", h, !1));
      },
    });
})(jQuery);
