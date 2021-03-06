
!function(a, b) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("jquery")) : a.jQueryBridget = b(a, a.jQuery)
}(window, function(a, b) {
    "use strict";
    function c(c, f, h) {
        function i(a, b, d) {
            var e, f = "$()." + c + '("' + b + '")';
            return a.each(function(a, i) {
                var j = h.data(i, c);
                if (!j)
                    return void g(c + " not initialized. Cannot call methods, i.e. " + f);
                var k = j[b];
                if (!k || "_" == b.charAt(0))
                    return void g(f + " is not a valid method");
                var l = k.apply(j, d);
                e = void 0 === e ? l : e
            }),
            void 0 !== e ? e : a
        }
        function j(a, b) {
            a.each(function(a, d) {
                var e = h.data(d, c);
                e ? (e.option(b),
                e._init()) : (e = new f(d,b),
                h.data(d, c, e))
            })
        }
        h = h || b || a.jQuery,
        h && (f.prototype.option || (f.prototype.option = function(a) {
            h.isPlainObject(a) && (this.options = h.extend(!0, this.options, a))
        }
        ),
        h.fn[c] = function(a) {
            if ("string" == typeof a) {
                var b = e.call(arguments, 1);
                return i(this, a, b)
            }
            return j(this, a),
            this
        }
        ,
        d(h))
    }
    function d(a) {
        !a || a && a.bridget || (a.bridget = c)
    }
    var e = Array.prototype.slice
      , f = a.console
      , g = "undefined" == typeof f ? function() {}
    : function(a) {
        f.error(a)
    }
    ;
    return d(b || a.jQuery),
    c
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : a.EvEmitter = b()
}("undefined" != typeof window ? window : this, function() {
    function a() {}
    var b = a.prototype;
    return b.on = function(a, b) {
        if (a && b) {
            var c = this._events = this._events || {}
              , d = c[a] = c[a] || [];
            return -1 == d.indexOf(b) && d.push(b),
            this
        }
    }
    ,
    b.once = function(a, b) {
        if (a && b) {
            this.on(a, b);
            var c = this._onceEvents = this._onceEvents || {}
              , d = c[a] = c[a] || {};
            return d[b] = !0,
            this
        }
    }
    ,
    b.off = function(a, b) {
        var c = this._events && this._events[a];
        if (c && c.length) {
            var d = c.indexOf(b);
            return -1 != d && c.splice(d, 1),
            this
        }
    }
    ,
    b.emitEvent = function(a, b) {
        var c = this._events && this._events[a];
        if (c && c.length) {
            var d = 0
              , e = c[d];
            b = b || [];
            for (var f = this._onceEvents && this._onceEvents[a]; e; ) {
                var g = f && f[e];
                g && (this.off(a, e),
                delete f[e]),
                e.apply(this, b),
                d += g ? 0 : 1,
                e = c[d]
            }
            return this
        }
    }
    ,
    a
}),
function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : a.getSize = b()
}(window, function() {
    "use strict";
    function a(a) {
        var b = parseFloat(a)
          , c = -1 == a.indexOf("%") && !isNaN(b);
        return c && b
    }
    function b() {}
    function c() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, b = 0; j > b; b++) {
            var c = i[b];
            a[c] = 0
        }
        return a
    }
    function d(a) {
        var b = getComputedStyle(a);
        return b || h("Style returned " + b + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        b
    }
    function e() {
        if (!k) {
            k = !0;
            var b = document.createElement("div");
            b.style.width = "200px",
            b.style.padding = "1px 2px 3px 4px",
            b.style.borderStyle = "solid",
            b.style.borderWidth = "1px 2px 3px 4px",
            b.style.boxSizing = "border-box";
            var c = document.body || document.documentElement;
            c.appendChild(b);
            var e = d(b);
            f.isBoxSizeOuter = g = 200 == a(e.width),
            c.removeChild(b)
        }
    }
    function f(b) {
        if (e(),
        "string" == typeof b && (b = document.querySelector(b)),
        b && "object" == typeof b && b.nodeType) {
            var f = d(b);
            if ("none" == f.display)
                return c();
            var h = {};
            h.width = b.offsetWidth,
            h.height = b.offsetHeight;
            for (var k = h.isBorderBox = "border-box" == f.boxSizing, l = 0; j > l; l++) {
                var m = i[l]
                  , n = f[m]
                  , o = parseFloat(n);
                h[m] = isNaN(o) ? 0 : o
            }
            var p = h.paddingLeft + h.paddingRight
              , q = h.paddingTop + h.paddingBottom
              , r = h.marginLeft + h.marginRight
              , s = h.marginTop + h.marginBottom
              , t = h.borderLeftWidth + h.borderRightWidth
              , u = h.borderTopWidth + h.borderBottomWidth
              , v = k && g
              , w = a(f.width);
            w !== !1 && (h.width = w + (v ? 0 : p + t));
            var x = a(f.height);
            return x !== !1 && (h.height = x + (v ? 0 : q + u)),
            h.innerWidth = h.width - (p + t),
            h.innerHeight = h.height - (q + u),
            h.outerWidth = h.width + r,
            h.outerHeight = h.height + s,
            h
        }
    }
    var g, h = "undefined" == typeof console ? b : function(a) {
        console.error(a)
    }
    , i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], j = i.length, k = !1;
    return f
}),
function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", b) : "object" == typeof module && module.exports ? module.exports = b() : a.matchesSelector = b()
}(window, function() {
    "use strict";
    var a = function() {
        var a = Element.prototype;
        if (a.matches)
            return "matches";
        if (a.matchesSelector)
            return "matchesSelector";
        for (var b = ["webkit", "moz", "ms", "o"], c = 0; c < b.length; c++) {
            var d = b[c]
              , e = d + "MatchesSelector";
            if (a[e])
                return e
        }
    }();
    return function(b, c) {
        return b[a](c)
    }
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.matchesSelector)
}(window, function(a, b) {
    var c = {};
    c.extend = function(a, b) {
        for (var c in b)
            a[c] = b[c];
        return a
    }
    ,
    c.modulo = function(a, b) {
        return (a % b + b) % b
    }
    ,
    c.makeArray = function(a) {
        var b = [];
        if (Array.isArray(a))
            b = a;
        else if (a && "number" == typeof a.length)
            for (var c = 0; c < a.length; c++)
                b.push(a[c]);
        else
            b.push(a);
        return b
    }
    ,
    c.removeFrom = function(a, b) {
        var c = a.indexOf(b);
        -1 != c && a.splice(c, 1)
    }
    ,
    c.getParent = function(a, c) {
        for (; a != document.body; )
            if (a = a.parentNode,
            b(a, c))
                return a
    }
    ,
    c.getQueryElement = function(a) {
        return "string" == typeof a ? document.querySelector(a) : a
    }
    ,
    c.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
    }
    ,
    c.filterFindElements = function(a, d) {
        a = c.makeArray(a);
        var e = [];
        return a.forEach(function(a) {
            if (a instanceof HTMLElement) {
                if (!d)
                    return void e.push(a);
                b(a, d) && e.push(a);
                for (var c = a.querySelectorAll(d), f = 0; f < c.length; f++)
                    e.push(c[f])
            }
        }),
        e
    }
    ,
    c.debounceMethod = function(a, b, c) {
        var d = a.prototype[b]
          , e = b + "Timeout";
        a.prototype[b] = function() {
            var a = this[e];
            a && clearTimeout(a);
            var b = arguments
              , f = this;
            this[e] = setTimeout(function() {
                d.apply(f, b),
                delete f[e]
            }, c || 100)
        }
    }
    ,
    c.docReady = function(a) {
        var b = document.readyState;
        "complete" == b || "interactive" == b ? setTimeout(a) : document.addEventListener("DOMContentLoaded", a)
    }
    ,
    c.toDashed = function(a) {
        return a.replace(/(.)([A-Z])/g, function(a, b, c) {
            return b + "-" + c
        }).toLowerCase()
    }
    ;
    var d = a.console;
    return c.htmlInit = function(b, e) {
        c.docReady(function() {
            var f = c.toDashed(e)
              , g = "data-" + f
              , h = document.querySelectorAll("[" + g + "]")
              , i = document.querySelectorAll(".js-" + f)
              , j = c.makeArray(h).concat(c.makeArray(i))
              , k = g + "-options"
              , l = a.jQuery;
            j.forEach(function(a) {
                var c, f = a.getAttribute(g) || a.getAttribute(k);
                try {
                    c = f && JSON.parse(f)
                } catch (h) {
                    return void (d && d.error("Error parsing " + g + " on " + a.className + ": " + h))
                }
                var i = new b(a,c);
                l && l.data(a, e, i)
            })
        })
    }
    ,
    c
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("get-size")) : (a.Flickity = a.Flickity || {},
    a.Flickity.Cell = b(a, a.getSize))
}(window, function(a, b) {
    function c(a, b) {
        this.element = a,
        this.parent = b,
        this.create()
    }
    var d = c.prototype;
    return d.create = function() {
        this.element.style.position = "absolute",
        this.x = 0,
        this.shift = 0
    }
    ,
    d.destroy = function() {
        this.element.style.position = "";
        var a = this.parent.originSide;
        this.element.style[a] = ""
    }
    ,
    d.getSize = function() {
        this.size = b(this.element)
    }
    ,
    d.setPosition = function(a) {
        this.x = a,
        this.updateTarget(),
        this.renderPosition(a)
    }
    ,
    d.updateTarget = d.setDefaultTarget = function() {
        var a = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[a] + this.size.width * this.parent.cellAlign
    }
    ,
    d.renderPosition = function(a) {
        var b = this.parent.originSide;
        this.element.style[b] = this.parent.getPositionValue(a)
    }
    ,
    d.wrapShift = function(a) {
        this.shift = a,
        this.renderPosition(this.x + this.parent.slideableWidth * a)
    }
    ,
    d.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    c
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", b) : "object" == typeof module && module.exports ? module.exports = b() : (a.Flickity = a.Flickity || {},
    a.Flickity.Slide = b())
}(window, function() {
    "use strict";
    function a(a) {
        this.parent = a,
        this.isOriginLeft = "left" == a.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var b = a.prototype;
    return b.addCell = function(a) {
        if (this.cells.push(a),
        this.outerWidth += a.size.outerWidth,
        this.height = Math.max(a.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = a.x;
            var b = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = a.size[b]
        }
    }
    ,
    b.updateTarget = function() {
        var a = this.isOriginLeft ? "marginRight" : "marginLeft"
          , b = this.getLastCell()
          , c = b ? b.size[a] : 0
          , d = this.outerWidth - (this.firstMargin + c);
        this.target = this.x + this.firstMargin + d * this.parent.cellAlign
    }
    ,
    b.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    b.select = function() {
        this.changeSelectedClass("add")
    }
    ,
    b.unselect = function() {
        this.changeSelectedClass("remove")
    }
    ,
    b.changeSelectedClass = function(a) {
        this.cells.forEach(function(b) {
            b.element.classList[a]("is-selected")
        })
    }
    ,
    b.getCellElements = function() {
        return this.cells.map(function(a) {
            return a.element
        })
    }
    ,
    a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("fizzy-ui-utils")) : (a.Flickity = a.Flickity || {},
    a.Flickity.animatePrototype = b(a, a.fizzyUIUtils))
}(window, function(a, b) {
    var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame
      , d = 0;
    c || (c = function(a) {
        var b = (new Date).getTime()
          , c = Math.max(0, 16 - (b - d))
          , e = setTimeout(a, c);
        return d = b + c,
        e
    }
    );
    var e = {};
    e.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0,
        this.restingFrames = 0,
        this.animate())
    }
    ,
    e.animate = function() {
        this.applyDragForce(),
        this.applySelectedAttraction();
        var a = this.x;
        if (this.integratePhysics(),
        this.positionSlider(),
        this.settle(a),
        this.isAnimating) {
            var b = this;
            c(function() {
                b.animate()
            })
        }
    }
    ;
    var f = function() {
        var a = document.documentElement.style;
        return "string" == typeof a.transform ? "transform" : "WebkitTransform"
    }();
    return e.positionSlider = function() {
        var a = this.x;
        this.options.wrapAround && this.cells.length > 1 && (a = b.modulo(a, this.slideableWidth),
        a -= this.slideableWidth,
        this.shiftWrapCells(a)),
        a += this.cursorPosition,
        a = this.options.rightToLeft && f ? -a : a;
        var c = this.getPositionValue(a);
        this.slider.style[f] = this.isAnimating ? "translate3d(" + c + ",0,0)" : "translateX(" + c + ")";
        var d = this.slides[0];
        if (d) {
            var e = -this.x - d.target
              , g = e / this.slidesWidth;
            this.dispatchEvent("scroll", null, [g, e])
        }
    }
    ,
    e.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target,
        this.positionSlider())
    }
    ,
    e.getPositionValue = function(a) {
        return this.options.percentPosition ? .01 * Math.round(a / this.size.innerWidth * 1e4) + "%" : Math.round(a) + "px"
    }
    ,
    e.settle = function(a) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * a) || this.restingFrames++,
        this.restingFrames > 2 && (this.isAnimating = !1,
        delete this.isFreeScrolling,
        this.positionSlider(),
        this.dispatchEvent("settle"))
    }
    ,
    e.shiftWrapCells = function(a) {
        var b = this.cursorPosition + a;
        this._shiftCells(this.beforeShiftCells, b, -1);
        var c = this.size.innerWidth - (a + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, c, 1)
    }
    ,
    e._shiftCells = function(a, b, c) {
        for (var d = 0; d < a.length; d++) {
            var e = a[d]
              , f = b > 0 ? c : 0;
            e.wrapShift(f),
            b -= e.size.outerWidth
        }
    }
    ,
    e._unshiftCells = function(a) {
        if (a && a.length)
            for (var b = 0; b < a.length; b++)
                a[b].wrapShift(0)
    }
    ,
    e.integratePhysics = function() {
        this.x += this.velocity,
        this.velocity *= this.getFrictionFactor()
    }
    ,
    e.applyForce = function(a) {
        this.velocity += a
    }
    ,
    e.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }
    ,
    e.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }
    ,
    e.applyDragForce = function() {
        if (this.isPointerDown) {
            var a = this.dragX - this.x
              , b = a - this.velocity;
            this.applyForce(b)
        }
    }
    ,
    e.applySelectedAttraction = function() {
        if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
            var a = -1 * this.selectedSlide.target - this.x
              , b = a * this.options.selectedAttraction;
            this.applyForce(b)
        }
    }
    ,
    e
}),
function(a, b) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(c, d, e, f, g, h) {
            return b(a, c, d, e, f, g, h)
        });
    else if ("object" == typeof module && module.exports)
        module.exports = b(a, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var c = a.Flickity;
        a.Flickity = b(a, a.EvEmitter, a.getSize, a.fizzyUIUtils, c.Cell, c.Slide, c.animatePrototype)
    }
}(window, function(a, b, c, d, e, f, g) {
    function h(a, b) {
        for (a = d.makeArray(a); a.length; )
            b.appendChild(a.shift())
    }
    function i(a, b) {
        var c = d.getQueryElement(a);
        if (!c)
            return void (l && l.error("Bad element for Flickity: " + (c || a)));
        if (this.element = c,
        this.element.flickityGUID) {
            var e = n[this.element.flickityGUID];
            return e.option(b),
            e
        }
        j && (this.$element = j(this.element)),
        this.options = d.extend({}, this.constructor.defaults),
        this.option(b),
        this._create()
    }
    var j = a.jQuery
      , k = a.getComputedStyle
      , l = a.console
      , m = 0
      , n = {};
    i.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    },
    i.createMethods = [];
    var o = i.prototype;
    d.extend(o, b.prototype),
    o._create = function() {
        var b = this.guid = ++m;
        this.element.flickityGUID = b,
        n[b] = this,
        this.selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) && a.addEventListener("resize", this),
        i.createMethods.forEach(function(a) {
            this[a]()
        }, this),
        this.options.watchCSS ? this.watchCSS() : this.activate()
    }
    ,
    o.option = function(a) {
        d.extend(this.options, a)
    }
    ,
    o.activate = function() {
        if (!this.isActive) {
            this.isActive = !0,
            this.element.classList.add("flickity-enabled"),
            this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
            this.getSize();
            var a = this._filterFindCellElements(this.element.children);
            h(a, this.slider),
            this.viewport.appendChild(this.slider),
            this.element.appendChild(this.viewport),
            this.reloadCells(),
            this.options.accessibility && (this.element.tabIndex = 0,
            this.element.addEventListener("keydown", this)),
            this.emitEvent("activate");
            var b, c = this.options.initialIndex;
            b = this.isInitActivated ? this.selectedIndex : void 0 !== c && this.cells[c] ? c : 0,
            this.select(b, !1, !0),
            this.isInitActivated = !0
        }
    }
    ,
    o._createSlider = function() {
        var a = document.createElement("div");
        a.className = "flickity-slider",
        a.style[this.originSide] = 0,
        this.slider = a
    }
    ,
    o._filterFindCellElements = function(a) {
        return d.filterFindElements(a, this.options.cellSelector)
    }
    ,
    o.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    o._makeCells = function(a) {
        var b = this._filterFindCellElements(a)
          , c = b.map(function(a) {
            return new e(a,this)
        }, this);
        return c
    }
    ,
    o.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    o.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    o.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    o._positionCells = function(a) {
        a = a || 0,
        this.maxCellHeight = a ? this.maxCellHeight || 0 : 0;
        var b = 0;
        if (a > 0) {
            var c = this.cells[a - 1];
            b = c.x + c.size.outerWidth
        }
        for (var d = this.cells.length, e = a; d > e; e++) {
            var f = this.cells[e];
            f.setPosition(b),
            b += f.size.outerWidth,
            this.maxCellHeight = Math.max(f.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = b,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = d ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    o._sizeCells = function(a) {
        a.forEach(function(a) {
            a.getSize()
        })
    }
    ,
    o.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var a = new f(this);
            this.slides.push(a);
            var b = "left" == this.originSide
              , c = b ? "marginRight" : "marginLeft"
              , d = this._getCanCellFit();
            this.cells.forEach(function(b, e) {
                if (!a.cells.length)
                    return void a.addCell(b);
                var g = a.outerWidth - a.firstMargin + (b.size.outerWidth - b.size[c]);
                d.call(this, e, g) ? a.addCell(b) : (a.updateTarget(),
                a = new f(this),
                this.slides.push(a),
                a.addCell(b))
            }, this),
            a.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    o._getCanCellFit = function() {
        var a = this.options.groupCells;
        if (!a)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof a) {
            var b = parseInt(a, 10);
            return function(a) {
                return a % b !== 0
            }
        }
        var c = "string" == typeof a && a.match(/^(\d+)%$/)
          , d = c ? parseInt(c[1], 10) / 100 : 1;
        return function(a, b) {
            return b <= (this.size.innerWidth + 1) * d
        }
    }
    ,
    o._init = o.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    o.getSize = function() {
        this.size = c(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var p = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return o.setCellAlign = function() {
        var a = p[this.options.cellAlign];
        this.cellAlign = a ? a[this.originSide] : this.options.cellAlign
    }
    ,
    o.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var a = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = a + "px"
        }
    }
    ,
    o._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var a = this.cursorPosition
              , b = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(a, b, -1),
            a = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(a, 0, 1)
        }
    }
    ,
    o._getGapCells = function(a, b, c) {
        for (var d = []; a > 0; ) {
            var e = this.cells[b];
            if (!e)
                break;
            d.push(e),
            b += c,
            a -= e.size.outerWidth
        }
        return d
    }
    ,
    o._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var a = this.options.rightToLeft
              , b = a ? "marginRight" : "marginLeft"
              , c = a ? "marginLeft" : "marginRight"
              , d = this.slideableWidth - this.getLastCell().size[c]
              , e = d < this.size.innerWidth
              , f = this.cursorPosition + this.cells[0].size[b]
              , g = d - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(a) {
                e ? a.target = d * this.cellAlign : (a.target = Math.max(a.target, f),
                a.target = Math.min(a.target, g))
            }, this)
        }
    }
    ,
    o.dispatchEvent = function(a, b, c) {
        var d = b ? [b].concat(c) : c;
        if (this.emitEvent(a, d),
        j && this.$element) {
            a += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var e = a;
            if (b) {
                var f = j.Event(b);
                f.type = a,
                e = f
            }
            this.$element.trigger(e, c)
        }
    }
    ,
    o.select = function(a, b, c) {
        this.isActive && (a = parseInt(a, 10),
        this._wrapSelect(a),
        (this.options.wrapAround || b) && (a = d.modulo(a, this.slides.length)),
        this.slides[a] && (this.selectedIndex = a,
        this.updateSelectedSlide(),
        c ? this.positionSliderAtSelected() : this.startAnimation(),
        this.options.adaptiveHeight && this.setGallerySize(),
        this.dispatchEvent("select"),
        this.dispatchEvent("cellSelect")))
    }
    ,
    o._wrapSelect = function(a) {
        var b = this.slides.length
          , c = this.options.wrapAround && b > 1;
        if (!c)
            return a;
        var e = d.modulo(a, b)
          , f = Math.abs(e - this.selectedIndex)
          , g = Math.abs(e + b - this.selectedIndex)
          , h = Math.abs(e - b - this.selectedIndex);
        !this.isDragSelect && f > g ? a += b : !this.isDragSelect && f > h && (a -= b),
        0 > a ? this.x -= this.slideableWidth : a >= b && (this.x += this.slideableWidth)
    }
    ,
    o.previous = function(a, b) {
        this.select(this.selectedIndex - 1, a, b)
    }
    ,
    o.next = function(a, b) {
        this.select(this.selectedIndex + 1, a, b)
    }
    ,
    o.updateSelectedSlide = function() {
        var a = this.slides[this.selectedIndex];
        a && (this.unselectSelectedSlide(),
        this.selectedSlide = a,
        a.select(),
        this.selectedCells = a.cells,
        this.selectedElements = a.getCellElements(),
        this.selectedCell = a.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    o.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    o.selectCell = function(a, b, c) {
        var d;
        "number" == typeof a ? d = this.cells[a] : ("string" == typeof a && (a = this.element.querySelector(a)),
        d = this.getCell(a));
        for (var e = 0; d && e < this.slides.length; e++) {
            var f = this.slides[e]
              , g = f.cells.indexOf(d);
            if (-1 != g)
                return void this.select(e, b, c)
        }
    }
    ,
    o.getCell = function(a) {
        for (var b = 0; b < this.cells.length; b++) {
            var c = this.cells[b];
            if (c.element == a)
                return c
        }
    }
    ,
    o.getCells = function(a) {
        a = d.makeArray(a);
        var b = [];
        return a.forEach(function(a) {
            var c = this.getCell(a);
            c && b.push(c)
        }, this),
        b
    }
    ,
    o.getCellElements = function() {
        return this.cells.map(function(a) {
            return a.element
        })
    }
    ,
    o.getParentCell = function(a) {
        var b = this.getCell(a);
        return b ? b : (a = d.getParent(a, ".flickity-slider > *"),
        this.getCell(a))
    }
    ,
    o.getAdjacentCellElements = function(a, b) {
        if (!a)
            return this.selectedSlide.getCellElements();
        b = void 0 === b ? this.selectedIndex : b;
        var c = this.slides.length;
        if (1 + 2 * a >= c)
            return this.getCellElements();
        for (var e = [], f = b - a; b + a >= f; f++) {
            var g = this.options.wrapAround ? d.modulo(f, c) : f
              , h = this.slides[g];
            h && (e = e.concat(h.getCellElements()))
        }
        return e
    }
    ,
    o.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    o.childUIPointerDown = function(a) {
        this.emitEvent("childUIPointerDown", [a])
    }
    ,
    o.onresize = function() {
        this.watchCSS(),
        this.resize()
    }
    ,
    d.debounceMethod(i, "onresize", 150),
    o.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = d.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var a = this.selectedElements && this.selectedElements[0];
            this.selectCell(a, !1, !0)
        }
    }
    ,
    o.watchCSS = function() {
        var a = this.options.watchCSS;
        if (a) {
            var b = k(this.element, ":after").content;
            -1 != b.indexOf("flickity") ? this.activate() : this.deactivate()
        }
    }
    ,
    o.onkeydown = function(a) {
        if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
            if (37 == a.keyCode) {
                var b = this.options.rightToLeft ? "next" : "previous";
                this.uiChange(),
                this[b]()
            } else if (39 == a.keyCode) {
                var c = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(),
                this[c]()
            }
    }
    ,
    o.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.cells.forEach(function(a) {
            a.destroy()
        }),
        this.unselectSelectedSlide(),
        this.element.removeChild(this.viewport),
        h(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    o.destroy = function() {
        this.deactivate(),
        a.removeEventListener("resize", this),
        this.emitEvent("destroy"),
        j && this.$element && j.removeData(this.element, "flickity"),
        delete this.element.flickityGUID,
        delete n[this.guid]
    }
    ,
    d.extend(o, g),
    i.data = function(a) {
        a = d.getQueryElement(a);
        var b = a && a.flickityGUID;
        return b && n[b]
    }
    ,
    d.htmlInit(i, "flickity"),
    j && j.bridget && j.bridget("flickity", i),
    i.Cell = e,
    i
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.Unipointer = b(a, a.EvEmitter)
}(window, function(a, b) {
    function c() {}
    function d() {}
    var e = d.prototype = Object.create(b.prototype);
    e.bindStartEvent = function(a) {
        this._bindStartEvent(a, !0)
    }
    ,
    e.unbindStartEvent = function(a) {
        this._bindStartEvent(a, !1)
    }
    ,
    e._bindStartEvent = function(b, c) {
        c = void 0 === c || !!c;
        var d = c ? "addEventListener" : "removeEventListener";
        a.navigator.pointerEnabled ? b[d]("pointerdown", this) : a.navigator.msPointerEnabled ? b[d]("MSPointerDown", this) : (b[d]("mousedown", this),
        b[d]("touchstart", this))
    }
    ,
    e.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
    }
    ,
    e.getTouch = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.identifier == this.pointerIdentifier)
                return c
        }
    }
    ,
    e.onmousedown = function(a) {
        var b = a.button;
        b && 0 !== b && 1 !== b || this._pointerDown(a, a)
    }
    ,
    e.ontouchstart = function(a) {
        this._pointerDown(a, a.changedTouches[0])
    }
    ,
    e.onMSPointerDown = e.onpointerdown = function(a) {
        this._pointerDown(a, a)
    }
    ,
    e._pointerDown = function(a, b) {
        this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== b.pointerId ? b.pointerId : b.identifier,
        this.pointerDown(a, b))
    }
    ,
    e.pointerDown = function(a, b) {
        this._bindPostStartEvents(a),
        this.emitEvent("pointerDown", [a, b])
    }
    ;
    var f = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"],
        MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
    };
    return e._bindPostStartEvents = function(b) {
        if (b) {
            var c = f[b.type];
            c.forEach(function(b) {
                a.addEventListener(b, this)
            }, this),
            this._boundPointerEvents = c
        }
    }
    ,
    e._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(b) {
            a.removeEventListener(b, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    e.onmousemove = function(a) {
        this._pointerMove(a, a)
    }
    ,
    e.onMSPointerMove = e.onpointermove = function(a) {
        a.pointerId == this.pointerIdentifier && this._pointerMove(a, a)
    }
    ,
    e.ontouchmove = function(a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerMove(a, b)
    }
    ,
    e._pointerMove = function(a, b) {
        this.pointerMove(a, b)
    }
    ,
    e.pointerMove = function(a, b) {
        this.emitEvent("pointerMove", [a, b])
    }
    ,
    e.onmouseup = function(a) {
        this._pointerUp(a, a)
    }
    ,
    e.onMSPointerUp = e.onpointerup = function(a) {
        a.pointerId == this.pointerIdentifier && this._pointerUp(a, a)
    }
    ,
    e.ontouchend = function(a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerUp(a, b)
    }
    ,
    e._pointerUp = function(a, b) {
        this._pointerDone(),
        this.pointerUp(a, b)
    }
    ,
    e.pointerUp = function(a, b) {
        this.emitEvent("pointerUp", [a, b])
    }
    ,
    e._pointerDone = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier,
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    e.pointerDone = c,
    e.onMSPointerCancel = e.onpointercancel = function(a) {
        a.pointerId == this.pointerIdentifier && this._pointerCancel(a, a)
    }
    ,
    e.ontouchcancel = function(a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerCancel(a, b)
    }
    ,
    e._pointerCancel = function(a, b) {
        this._pointerDone(),
        this.pointerCancel(a, b)
    }
    ,
    e.pointerCancel = function(a, b) {
        this.emitEvent("pointerCancel", [a, b])
    }
    ,
    d.getPointerPoint = function(a) {
        return {
            x: a.pageX,
            y: a.pageY
        }
    }
    ,
    d
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("unipointer")) : a.Unidragger = b(a, a.Unipointer)
}(window, function(a, b) {
    function c() {}
    function d() {}
    var e = d.prototype = Object.create(b.prototype);
    e.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    e.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ;
    var f = a.navigator;
    return e._bindHandles = function(a) {
        a = void 0 === a || !!a;
        var b;
        b = f.pointerEnabled ? function(b) {
            b.style.touchAction = a ? "none" : ""
        }
        : f.msPointerEnabled ? function(b) {
            b.style.msTouchAction = a ? "none" : ""
        }
        : c;
        for (var d = a ? "addEventListener" : "removeEventListener", e = 0; e < this.handles.length; e++) {
            var g = this.handles[e];
            this._bindStartEvent(g, a),
            b(g),
            g[d]("click", this)
        }
    }
    ,
    e.pointerDown = function(a, b) {
        if ("INPUT" == a.target.nodeName && "range" == a.target.type)
            return this.isPointerDown = !1,
            void delete this.pointerIdentifier;
        this._dragPointerDown(a, b);
        var c = document.activeElement;
        c && c.blur && c.blur(),
        this._bindPostStartEvents(a),
        this.emitEvent("pointerDown", [a, b])
    }
    ,
    e._dragPointerDown = function(a, c) {
        this.pointerDownPoint = b.getPointerPoint(c);
        var d = this.canPreventDefaultOnPointerDown(a, c);
        d && a.preventDefault()
    }
    ,
    e.canPreventDefaultOnPointerDown = function(a) {
        return "SELECT" != a.target.nodeName
    }
    ,
    e.pointerMove = function(a, b) {
        var c = this._dragPointerMove(a, b);
        this.emitEvent("pointerMove", [a, b, c]),
        this._dragMove(a, b, c)
    }
    ,
    e._dragPointerMove = function(a, c) {
        var d = b.getPointerPoint(c)
          , e = {
            x: d.x - this.pointerDownPoint.x,
            y: d.y - this.pointerDownPoint.y
        };
        return !this.isDragging && this.hasDragStarted(e) && this._dragStart(a, c),
        e
    }
    ,
    e.hasDragStarted = function(a) {
        return Math.abs(a.x) > 3 || Math.abs(a.y) > 3
    }
    ,
    e.pointerUp = function(a, b) {
        this.emitEvent("pointerUp", [a, b]),
        this._dragPointerUp(a, b)
    }
    ,
    e._dragPointerUp = function(a, b) {
        this.isDragging ? this._dragEnd(a, b) : this._staticClick(a, b)
    }
    ,
    e._dragStart = function(a, c) {
        this.isDragging = !0,
        this.dragStartPoint = b.getPointerPoint(c),
        this.isPreventingClicks = !0,
        this.dragStart(a, c)
    }
    ,
    e.dragStart = function(a, b) {
        this.emitEvent("dragStart", [a, b])
    }
    ,
    e._dragMove = function(a, b, c) {
        this.isDragging && this.dragMove(a, b, c)
    }
    ,
    e.dragMove = function(a, b, c) {
        a.preventDefault(),
        this.emitEvent("dragMove", [a, b, c])
    }
    ,
    e._dragEnd = function(a, b) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(a, b)
    }
    ,
    e.dragEnd = function(a, b) {
        this.emitEvent("dragEnd", [a, b])
    }
    ,
    e.onclick = function(a) {
        this.isPreventingClicks && a.preventDefault()
    }
    ,
    e._staticClick = function(a, b) {
        if (!this.isIgnoringMouseUp || "mouseup" != a.type) {
            var c = a.target.nodeName;
            "INPUT" != c && "TEXTAREA" != c || a.target.focus(),
            this.staticClick(a, b),
            "mouseup" != a.type && (this.isIgnoringMouseUp = !0,
            setTimeout(function() {
                delete this.isIgnoringMouseUp
            }
            .bind(this), 400))
        }
    }
    ,
    e.staticClick = function(a, b) {
        this.emitEvent("staticClick", [a, b])
    }
    ,
    d.getPointerPoint = b.getPointerPoint,
    d
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(c, d, e) {
        return b(a, c, d, e)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : a.Flickity = b(a, a.Flickity, a.Unidragger, a.fizzyUIUtils)
}(window, function(a, b, c, d) {
    function e() {
        return {
            x: a.pageXOffset,
            y: a.pageYOffset
        }
    }
    d.extend(b.defaults, {
        draggable: !0,
        dragThreshold: 3
    }),
    b.createMethods.push("_createDrag");
    var f = b.prototype;
    d.extend(f, c.prototype);
    var g = "createTouch"in document
      , h = !1;
    f._createDrag = function() {
        this.on("activate", this.bindDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("childUIPointerDown", this._childUIPointerDownDrag),
        this.on("deactivate", this.unbindDrag),
        g && !h && (a.addEventListener("touchmove", function() {}),
        h = !0)
    }
    ,
    f.bindDrag = function() {
        this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"),
        this.handles = [this.viewport],
        this.bindHandles(),
        this.isDragBound = !0)
    }
    ,
    f.unbindDrag = function() {
        this.isDragBound && (this.element.classList.remove("is-draggable"),
        this.unbindHandles(),
        delete this.isDragBound)
    }
    ,
    f._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    f._childUIPointerDownDrag = function(a) {
        a.preventDefault(),
        this.pointerDownFocus(a)
    }
    ;
    var i = {
        TEXTAREA: !0,
        INPUT: !0,
        OPTION: !0
    }
      , j = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    f.pointerDown = function(b, c) {
        var d = i[b.target.nodeName] && !j[b.target.type];
        if (d)
            return this.isPointerDown = !1,
            void delete this.pointerIdentifier;
        this._dragPointerDown(b, c);
        var f = document.activeElement;
        f && f.blur && f != this.element && f != document.body && f.blur(),
        this.pointerDownFocus(b),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this._bindPostStartEvents(b),
        this.pointerDownScroll = e(),
        a.addEventListener("scroll", this),
        this.dispatchEvent("pointerDown", b, [c])
    }
    ;
    var k = {
        touchstart: !0,
        MSPointerDown: !0
    }
      , l = {
        INPUT: !0,
        SELECT: !0
    };
    return f.pointerDownFocus = function(b) {
        if (this.options.accessibility && !k[b.type] && !l[b.target.nodeName]) {
            var c = a.pageYOffset;
            this.element.focus(),
            a.pageYOffset != c && a.scrollTo(a.pageXOffset, c)
        }
    }
    ,
    f.canPreventDefaultOnPointerDown = function(a) {
        var b = "touchstart" == a.type
          , c = a.target.nodeName;
        return !b && "SELECT" != c
    }
    ,
    f.hasDragStarted = function(a) {
        return Math.abs(a.x) > this.options.dragThreshold
    }
    ,
    f.pointerUp = function(a, b) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", a, [b]),
        this._dragPointerUp(a, b)
    }
    ,
    f.pointerDone = function() {
        a.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    f.dragStart = function(b, c) {
        this.dragStartPosition = this.x,
        this.startAnimation(),
        a.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", b, [c])
    }
    ,
    f.pointerMove = function(a, b) {
        var c = this._dragPointerMove(a, b);
        this.dispatchEvent("pointerMove", a, [b, c]),
        this._dragMove(a, b, c)
    }
    ,
    f.dragMove = function(a, b, c) {
        a.preventDefault(),
        this.previousDragX = this.dragX;
        var d = this.options.rightToLeft ? -1 : 1
          , e = this.dragStartPosition + c.x * d;
        if (!this.options.wrapAround && this.slides.length) {
            var f = Math.max(-this.slides[0].target, this.dragStartPosition);
            e = e > f ? .5 * (e + f) : e;
            var g = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            e = g > e ? .5 * (e + g) : e
        }
        this.dragX = e,
        this.dragMoveTime = new Date,
        this.dispatchEvent("dragMove", a, [b, c])
    }
    ,
    f.dragEnd = function(a, b) {
        this.options.freeScroll && (this.isFreeScrolling = !0);
        var c = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var d = this.getRestingPosition();
            this.isFreeScrolling = -d > this.slides[0].target && -d < this.getLastSlide().target
        } else
            this.options.freeScroll || c != this.selectedIndex || (c += this.dragEndBoostSelect());
        delete this.previousDragX,
        this.isDragSelect = this.options.wrapAround,
        this.select(c),
        delete this.isDragSelect,
        this.dispatchEvent("dragEnd", a, [b])
    }
    ,
    f.dragEndRestingSelect = function() {
        var a = this.getRestingPosition()
          , b = Math.abs(this.getSlideDistance(-a, this.selectedIndex))
          , c = this._getClosestResting(a, b, 1)
          , d = this._getClosestResting(a, b, -1)
          , e = c.distance < d.distance ? c.index : d.index;
        return e
    }
    ,
    f._getClosestResting = function(a, b, c) {
        for (var d = this.selectedIndex, e = 1 / 0, f = this.options.contain && !this.options.wrapAround ? function(a, b) {
            return b >= a
        }
        : function(a, b) {
            return b > a
        }
        ; f(b, e) && (d += c,
        e = b,
        b = this.getSlideDistance(-a, d),
        null !== b); )
            b = Math.abs(b);
        return {
            distance: e,
            index: d - c
        }
    }
    ,
    f.getSlideDistance = function(a, b) {
        var c = this.slides.length
          , e = this.options.wrapAround && c > 1
          , f = e ? d.modulo(b, c) : b
          , g = this.slides[f];
        if (!g)
            return null;
        var h = e ? this.slideableWidth * Math.floor(b / c) : 0;
        return a - (g.target + h)
    }
    ,
    f.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100)
            return 0;
        var a = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , b = this.previousDragX - this.dragX;
        return a > 0 && b > 0 ? 1 : 0 > a && 0 > b ? -1 : 0
    }
    ,
    f.staticClick = function(a, b) {
        var c = this.getParentCell(a.target)
          , d = c && c.element
          , e = c && this.cells.indexOf(c);
        this.dispatchEvent("staticClick", a, [b, d, e])
    }
    ,
    f.onscroll = function() {
        var a = e()
          , b = this.pointerDownScroll.x - a.x
          , c = this.pointerDownScroll.y - a.y;
        (Math.abs(b) > 3 || Math.abs(c) > 3) && this._pointerDone()
    }
    ,
    b
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("unipointer")) : a.TapListener = b(a, a.Unipointer)
}(window, function(a, b) {
    function c(a) {
        this.bindTap(a)
    }
    var d = c.prototype = Object.create(b.prototype);
    return d.bindTap = function(a) {
        a && (this.unbindTap(),
        this.tapElement = a,
        this._bindStartEvent(a, !0))
    }
    ,
    d.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0),
        delete this.tapElement)
    }
    ,
    d.pointerUp = function(c, d) {
        if (!this.isIgnoringMouseUp || "mouseup" != c.type) {
            var e = b.getPointerPoint(d)
              , f = this.tapElement.getBoundingClientRect()
              , g = a.pageXOffset
              , h = a.pageYOffset
              , i = e.x >= f.left + g && e.x <= f.right + g && e.y >= f.top + h && e.y <= f.bottom + h;
            if (i && this.emitEvent("tap", [c, d]),
            "mouseup" != c.type) {
                this.isIgnoringMouseUp = !0;
                var j = this;
                setTimeout(function() {
                    delete j.isIgnoringMouseUp
                }, 400)
            }
        }
    }
    ,
    d.destroy = function() {
        this.pointerDone(),
        this.unbindTap()
    }
    ,
    c
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(c, d, e) {
        return b(a, c, d, e)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.TapListener, a.fizzyUIUtils)
}(window, function(a, b, c, d) {
    "use strict";
    function e(a, b) {
        this.direction = a,
        this.parent = b,
        this._create()
    }
    function f(a) {
        return "string" == typeof a ? a : "M " + a.x0 + ",50 L " + a.x1 + "," + (a.y1 + 50) + " L " + a.x2 + "," + (a.y2 + 50) + " L " + a.x3 + ",50  L " + a.x2 + "," + (50 - a.y2) + " L " + a.x1 + "," + (50 - a.y1) + " Z"
    }
    var g = "http://www.w3.org/2000/svg";
    e.prototype = new c,
    e.prototype._create = function() {
        this.isEnabled = !0,
        this.isPrevious = -1 == this.direction;
        var a = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == a;
        var b = this.element = document.createElement("button");
        b.className = "flickity-prev-next-button",
        b.className += this.isPrevious ? " previous" : " next",
        b.setAttribute("type", "button"),
        this.disable(),
        b.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
        var c = this.createSVG();
        b.appendChild(c),
        this.on("tap", this.onTap),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    e.prototype.activate = function() {
        this.bindTap(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    e.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        c.prototype.destroy.call(this),
        this.element.removeEventListener("click", this)
    }
    ,
    e.prototype.createSVG = function() {
        var a = document.createElementNS(g, "svg");
        a.setAttribute("viewBox", "0 0 100 100");
        var b = document.createElementNS(g, "path")
          , c = f(this.parent.options.arrowShape);
        return b.setAttribute("d", c),
        b.setAttribute("class", "arrow"),
        this.isLeft || b.setAttribute("transform", "translate(100, 100) rotate(180) "),
        a.appendChild(b),
        a
    }
    ,
    e.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var a = this.isPrevious ? "previous" : "next";
            this.parent[a]()
        }
    }
    ,
    e.prototype.handleEvent = d.handleEvent,
    e.prototype.onclick = function() {
        var a = document.activeElement;
        a && a == this.element && this.onTap()
    }
    ,
    e.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    e.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    e.prototype.update = function() {
        var a = this.parent.slides;
        if (this.parent.options.wrapAround && a.length > 1)
            return void this.enable();
        var b = a.length ? a.length - 1 : 0
          , c = this.isPrevious ? 0 : b
          , d = this.parent.selectedIndex == c ? "disable" : "enable";
        this[d]()
    }
    ,
    e.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    d.extend(b.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    b.createMethods.push("_createPrevNextButtons");
    var h = b.prototype;
    return h._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new e(-1,this),
        this.nextButton = new e(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    h.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    h.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    b.PrevNextButton = e,
    b
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(c, d, e) {
        return b(a, c, d, e)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.TapListener, a.fizzyUIUtils)
}(window, function(a, b, c, d) {
    function e(a) {
        this.parent = a,
        this._create()
    }
    e.prototype = new c,
    e.prototype._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.on("tap", this.onTap),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    e.prototype.activate = function() {
        this.setDots(),
        this.bindTap(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    e.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder),
        c.prototype.destroy.call(this)
    }
    ,
    e.prototype.setDots = function() {
        var a = this.parent.slides.length - this.dots.length;
        a > 0 ? this.addDots(a) : 0 > a && this.removeDots(-a)
    }
    ,
    e.prototype.addDots = function(a) {
        for (var b = document.createDocumentFragment(), c = []; a; ) {
            var d = document.createElement("li");
            d.className = "dot",
            b.appendChild(d),
            c.push(d),
            a--
        }
        this.holder.appendChild(b),
        this.dots = this.dots.concat(c)
    }
    ,
    e.prototype.removeDots = function(a) {
        var b = this.dots.splice(this.dots.length - a, a);
        b.forEach(function(a) {
            this.holder.removeChild(a)
        }, this)
    }
    ,
    e.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot"),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected")
    }
    ,
    e.prototype.onTap = function(a) {
        var b = a.target;
        if ("LI" == b.nodeName) {
            this.parent.uiChange();
            var c = this.dots.indexOf(b);
            this.parent.select(c)
        }
    }
    ,
    e.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    b.PageDots = e,
    d.extend(b.defaults, {
        pageDots: !0
    }),
    b.createMethods.push("_createPageDots");
    var f = b.prototype;
    return f._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new e(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    f.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    f.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    f.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    f.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    b.PageDots = e,
    b
}),

function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(c, d) {
        return b(a, c, d)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.fizzyUIUtils)
}(window, function(a, b, c) {
    function d(a) {
        var b = document.createDocumentFragment();
        return a.forEach(function(a) {
            b.appendChild(a.element)
        }),
        b
    }
    var e = b.prototype;
    return e.insert = function(a, b) {
        var c = this._makeCells(a);
        if (c && c.length) {
            var e = this.cells.length;
            b = void 0 === b ? e : b;
            var f = d(c)
              , g = b == e;
            if (g)
                this.slider.appendChild(f);
            else {
                var h = this.cells[b].element;
                this.slider.insertBefore(f, h)
            }
            if (0 === b)
                this.cells = c.concat(this.cells);
            else if (g)
                this.cells = this.cells.concat(c);
            else {
                var i = this.cells.splice(b, e - b);
                this.cells = this.cells.concat(c).concat(i)
            }
            this._sizeCells(c);
            var j = b > this.selectedIndex ? 0 : c.length;
            this._cellAddedRemoved(b, j)
        }
    }
    ,
    e.append = function(a) {
        this.insert(a, this.cells.length)
    }
    ,
    e.prepend = function(a) {
        this.insert(a, 0)
    }
    ,
    e.remove = function(a) {
        var b, d, e = this.getCells(a), f = 0, g = e.length;
        for (b = 0; g > b; b++) {
            d = e[b];
            var h = this.cells.indexOf(d) < this.selectedIndex;
            f -= h ? 1 : 0
        }
        for (b = 0; g > b; b++)
            d = e[b],
            d.remove(),
            c.removeFrom(this.cells, d);
        e.length && this._cellAddedRemoved(0, f)
    }
    ,
    e._cellAddedRemoved = function(a, b) {
        b = b || 0,
        this.selectedIndex += b,
        this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)),
        this.cellChange(a, !0),
        this.emitEvent("cellAddedRemoved", [a, b])
    }
    ,
    e.cellSizeChange = function(a) {
        var b = this.getCell(a);
        if (b) {
            b.getSize();
            var c = this.cells.indexOf(b);
            this.cellChange(c)
        }
    }
    ,
    e.cellChange = function(a, b) {
        var c = this.slideableWidth;
        if (this._positionCells(a),
        this._getWrapShiftCells(),
        this.setGallerySize(),
        this.emitEvent("cellChange", [a]),
        this.options.freeScroll) {
            var d = c - this.slideableWidth;
            this.x += d * this.cellAlign,
            this.positionSlider()
        } else
            b && this.positionSliderAtSelected(),
            this.select(this.selectedIndex)
    }
    ,
    b
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(c, d) {
        return b(a, c, d)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("./flickity"), require("fizzy-ui-utils")) : b(a, a.Flickity, a.fizzyUIUtils)
}(window, function(a, b, c) {
    "use strict";
    function d(a) {
        if ("IMG" == a.nodeName && a.getAttribute("data-flickity-lazyload") && a.getAttribute("data-flickity-lazyload-srcset"))
            return [a];
        var b = a.querySelectorAll("img[data-flickity-lazyload]", "img[data-flickity-lazyload-srcset]");
        return c.makeArray(b)
    }
    function e(a, b) {
        this.img = a,
        this.flickity = b,
        this.load()
    }
    b.createMethods.push("_createLazyload");
    var f = b.prototype;
    return f._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }
    ,
    f.lazyLoad = function() {
        var a = this.options.lazyLoad;
        if (a) {
            var b = "number" == typeof a ? a : 0
              , c = this.getAdjacentCellElements(b)
              , f = [];
            c.forEach(function(a) {
                var b = d(a);
                f = f.concat(b)
            }),
            f.forEach(function(a) {
                new e(a,this)
            }, this)
        }
    }
    ,
    e.prototype.handleEvent = c.handleEvent,
    e.prototype.load = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        var src = this.img.getAttribute('data-flickity-lazyload');
        var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
        this.img.src = src;
        if ( srcset ) {
            this.img.setAttribute( 'srcset', srcset );
        }
        this.img.removeAttribute('data-flickity-lazyload');
        this.img.removeAttribute('data-flickity-lazyload-srcset');
    }
    ,
    e.prototype.onload = function(a) {
        this.complete(a, "flickity-lazyloaded")
    }
    ,
    e.prototype.onerror = function(a) {
        this.complete(a, "flickity-lazyerror")
    }
    ,
    e.prototype.complete = function(a, b) {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
        var c = this.flickity.getParentCell(this.img)
          , d = c && c.element;
        this.flickity.cellSizeChange(d),
        this.img.classList.add(b),
        this.flickity.dispatchEvent("lazyLoad", a, d)
    }
    ,
    b.LazyLoader = e,
    b
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], b) : "object" == typeof module && module.exports && (module.exports = b(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(a) {
    return a
}),
function(a, b) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], b) : "object" == typeof module && module.exports ? module.exports = b(require("flickity"), require("fizzy-ui-utils")) : a.Flickity = b(a.Flickity, a.fizzyUIUtils)
}(window, function(a, b) {
    function c(a, b, c) {
        return (b - a) * c + a
    }
    a.createMethods.push("_createAsNavFor");
    var d = a.prototype;
    return d._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor),
        this.on("deactivate", this.deactivateAsNavFor),
        this.on("destroy", this.destroyAsNavFor);
        var a = this.options.asNavFor;
        if (a) {
            var b = this;
            setTimeout(function() {
                b.setNavCompanion(a)
            })
        }
    }
    ,
    d.setNavCompanion = function(c) {
        c = b.getQueryElement(c);
        var d = a.data(c);
        if (d && d != this) {
            this.navCompanion = d;
            var e = this;
            this.onNavCompanionSelect = function() {
                e.navCompanionSelect()
            }
            ,
            d.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0)
        }
    }
    ,
    d.navCompanionSelect = function(a) {
        if (this.navCompanion) {
            var b = this.navCompanion.selectedCells[0]
              , d = this.navCompanion.cells.indexOf(b)
              , e = d + this.navCompanion.selectedCells.length - 1
              , f = Math.floor(c(d, e, this.navCompanion.cellAlign));
            if (this.selectCell(f, !1, a),
            this.removeNavSelectedElements(),
            !(f >= this.cells.length)) {
                var g = this.cells.slice(d, e + 1);
                this.navSelectedElements = g.map(function(a) {
                    return a.element
                }),
                this.changeNavSelectedClass("add")
            }
        }
    }
    ,
    d.changeNavSelectedClass = function(a) {
        this.navSelectedElements.forEach(function(b) {
            b.classList[a]("is-nav-selected")
        })
    }
    ,
    d.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }
    ,
    d.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"),
        delete this.navSelectedElements)
    }
    ,
    d.onNavStaticClick = function(a, b, c, d) {
        "number" == typeof d && this.navCompanion.selectCell(d)
    }
    ,
    d.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }
    ,
    d.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
        this.off("staticClick", this.onNavStaticClick),
        delete this.navCompanion)
    }
    ,
    a
}),
function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(c) {
        return b(a, c)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("ev-emitter")) : a.imagesLoaded = b(a, a.EvEmitter)
}(window, function(a, b) {
    function c(a, b) {
        for (var c in b)
            a[c] = b[c];
        return a
    }
    function d(a) {
        var b = [];
        if (Array.isArray(a))
            b = a;
        else if ("number" == typeof a.length)
            for (var c = 0; c < a.length; c++)
                b.push(a[c]);
        else
            b.push(a);
        return b
    }
    function e(a, b, f) {
        return this instanceof e ? ("string" == typeof a && (a = document.querySelectorAll(a)),
        this.elements = d(a),
        this.options = c({}, this.options),
        "function" == typeof b ? f = b : c(this.options, b),
        f && this.on("always", f),
        this.getImages(),
        h && (this.jqDeferred = new h.Deferred),
        void setTimeout(function() {
            this.check()
        }
        .bind(this))) : new e(a,b,f)
    }
    function f(a) {
        this.img = a
    }
    function g(a, b) {
        this.url = a,
        this.element = b,
        this.img = new Image
    }
    var h = a.jQuery
      , i = a.console;
    e.prototype = Object.create(b.prototype),
    e.prototype.options = {},
    e.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    e.prototype.addElementImages = function(a) {
        "IMG" == a.nodeName && this.addImage(a),
        this.options.background === !0 && this.addElementBackgroundImages(a);
        var b = a.nodeType;
        if (b && j[b]) {
            for (var c = a.querySelectorAll("img"), d = 0; d < c.length; d++) {
                var e = c[d];
                this.addImage(e)
            }
            if ("string" == typeof this.options.background) {
                var f = a.querySelectorAll(this.options.background);
                for (d = 0; d < f.length; d++) {
                    var g = f[d];
                    this.addElementBackgroundImages(g)
                }
            }
        }
    }
    ;
    var j = {
        1: !0,
        9: !0,
        11: !0
    };
    return e.prototype.addElementBackgroundImages = function(a) {
        var b = getComputedStyle(a);
        if (b)
            for (var c = /url\((['"])?(.*?)\1\)/gi, d = c.exec(b.backgroundImage); null !== d; ) {
                var e = d && d[2];
                e && this.addBackground(e, a),
                d = c.exec(b.backgroundImage)
            }
    }
    ,
    e.prototype.addImage = function(a) {
        var b = new f(a);
        this.images.push(b)
    }
    ,
    e.prototype.addBackground = function(a, b) {
        var c = new g(a,b);
        this.images.push(c)
    }
    ,
    e.prototype.check = function() {
        function a(a, c, d) {
            setTimeout(function() {
                b.progress(a, c, d)
            })
        }
        var b = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(b) {
            b.once("progress", a),
            b.check()
        }) : void this.complete()
    }
    ,
    e.prototype.progress = function(a, b, c) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded,
        this.emitEvent("progress", [this, a, b]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, a),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && i && i.log("progress: " + c, a, b)
    }
    ,
    e.prototype.complete = function() {
        var a = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(a, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var b = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[b](this)
        }
    }
    ,
    f.prototype = Object.create(b.prototype),
    f.prototype.check = function() {
        var a = this.getIsImageComplete();
        return a ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    f.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }
    ,
    f.prototype.confirm = function(a, b) {
        this.isLoaded = a,
        this.emitEvent("progress", [this, this.img, b])
    }
    ,
    f.prototype.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
    }
    ,
    f.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    f.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    f.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    g.prototype = Object.create(f.prototype),
    g.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url;
        var a = this.getIsImageComplete();
        a && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    g.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    g.prototype.confirm = function(a, b) {
        this.isLoaded = a,
        this.emitEvent("progress", [this, this.element, b])
    }
    ,
    e.makeJQueryPlugin = function(b) {
        b = b || a.jQuery,
        b && (h = b,
        h.fn.imagesLoaded = function(a, b) {
            var c = new e(this,a,b);
            return c.jqDeferred.promise(h(this))
        }
        )
    }
    ,
    e.makeJQueryPlugin(),
    e
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(c, d) {
        return b(a, c, d)
    }) : "object" == typeof module && module.exports ? module.exports = b(a, require("flickity"), require("imagesloaded")) : a.Flickity = b(a, a.Flickity, a.imagesLoaded)
}(window, function(a, b, c) {
    "use strict";
    b.createMethods.push("_createImagesLoaded");
    var d = b.prototype;
    return d._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }
    ,
    d.imagesLoaded = function() {
        function a(a, c) {
            var d = b.getParentCell(c.img);
            b.cellSizeChange(d && d.element),
            b.options.freeScroll || b.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var b = this;
            c(this.slider).on("progress", a)
        }
    }
    ,
    b
}),
"object" != typeof JSON && (JSON = {}),
function() {
    "use strict";
    function f(a) {
        return 10 > a ? "0" + a : a
    }
    function quote(a) {
        return escapable.lastIndex = 0,
        escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)),
        "function" == typeof rep && (i = rep.call(b, a, i)),
        typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i)
                return "null";
            if (gap += indent,
            g = [],
            "[object Array]" === Object.prototype.toString.apply(i)) {
                for (f = i.length,
                c = 0; f > c; c += 1)
                    g[c] = str(c, i) || "null";
                return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]",
                gap = h,
                e
            }
            if (rep && "object" == typeof rep)
                for (f = rep.length,
                c = 0; f > c; c += 1)
                    "string" == typeof rep[c] && (d = rep[c],
                    e = str(d, i),
                    e && g.push(quote(d) + (gap ? ": " : ":") + e));
            else
                for (d in i)
                    Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i),
                    e && g.push(quote(d) + (gap ? ": " : ":") + e));
            return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}",
            gap = h,
            e
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf()
    }
    );
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "   ": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
        var d;
        if (gap = "",
        indent = "",
        "number" == typeof c)
            for (d = 0; c > d; d += 1)
                indent += " ";
        else
            "string" == typeof c && (indent = c);
        if (rep = b,
        !b || "function" == typeof b || "object" == typeof b && "number" == typeof b.length)
            return str("", {
                "": a
            });
        throw new Error("JSON.stringify")
    }
    ),
    "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e)
                for (c in e)
                    Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c),
                    void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"),
            "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
        throw new SyntaxError("JSON.parse")
    }
    )
}(),
function(a, b) {
    "use strict";
    var c = a.History = a.History || {}
      , d = a.jQuery;
    if ("undefined" != typeof c.Adapter)
        throw new Error("History.js Adapter has already been loaded...");
    c.Adapter = {
        bind: function(a, b, c) {
            d(a).bind(b, c)
        },
        trigger: function(a, b, c) {
            d(a).trigger(b, c)
        },
        extractEventData: function(a, c, d) {
            var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
            return e
        },
        onDomLoad: function(a) {
            d(a)
        }
    },
    "undefined" != typeof c.init && c.init()
}(window),
function(a, b) {
    "use strict";
    var c = a.document
      , d = a.setTimeout || d
      , e = a.clearTimeout || e
      , f = a.setInterval || f
      , g = a.History = a.History || {};
    if ("undefined" != typeof g.initHtml4)
        throw new Error("History.js HTML4 Support has already been loaded...");
    g.initHtml4 = function() {
        return "undefined" != typeof g.initHtml4.initialized ? !1 : (g.initHtml4.initialized = !0,
        g.enabled = !0,
        g.savedHashes = [],
        g.isLastHash = function(a) {
            var b, c = g.getHashByIndex();
            return b = a === c
        }
        ,
        g.isHashEqual = function(a, b) {
            return a = encodeURIComponent(a).replace(/%25/g, "%"),
            b = encodeURIComponent(b).replace(/%25/g, "%"),
            a === b
        }
        ,
        g.saveHash = function(a) {
            return g.isLastHash(a) ? !1 : (g.savedHashes.push(a),
            !0)
        }
        ,
        g.getHashByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? g.savedHashes[g.savedHashes.length - 1] : 0 > a ? g.savedHashes[g.savedHashes.length + a] : g.savedHashes[a]
        }
        ,
        g.discardedHashes = {},
        g.discardedStates = {},
        g.discardState = function(a, b, c) {
            var d, e = g.getHashByState(a);
            return d = {
                discardedState: a,
                backState: c,
                forwardState: b
            },
            g.discardedStates[e] = d,
            !0
        }
        ,
        g.discardHash = function(a, b, c) {
            var d = {
                discardedHash: a,
                backState: c,
                forwardState: b
            };
            return g.discardedHashes[a] = d,
            !0
        }
        ,
        g.discardedState = function(a) {
            var b, c = g.getHashByState(a);
            return b = g.discardedStates[c] || !1
        }
        ,
        g.discardedHash = function(a) {
            var b = g.discardedHashes[a] || !1;
            return b
        }
        ,
        g.recycleState = function(a) {
            var b = g.getHashByState(a);
            return g.discardedState(a) && delete g.discardedStates[b],
            !0
        }
        ,
        g.emulated.hashChange && (g.hashChangeInit = function() {
            g.checkerFunction = null;
            var b, d, e, h, i = "", j = Boolean(g.getHash());
            return g.isInternetExplorer() ? (b = "historyjs-iframe",
            d = c.createElement("iframe"),
            d.setAttribute("id", b),
            d.setAttribute("src", "#"),
            d.style.display = "none",
            c.body.appendChild(d),
            d.contentWindow.document.open(),
            d.contentWindow.document.close(),
            e = "",
            h = !1,
            g.checkerFunction = function() {
                if (h)
                    return !1;
                h = !0;
                var b = g.getHash()
                  , c = g.getHash(d.contentWindow.document);
                return b !== i ? (i = b,
                c !== b && (e = c = b,
                d.contentWindow.document.open(),
                d.contentWindow.document.close(),
                d.contentWindow.document.location.hash = g.escapeHash(b)),
                g.Adapter.trigger(a, "hashchange")) : c !== e && (e = c,
                j && "" === c ? g.back() : g.setHash(c, !1)),
                h = !1,
                !0
            }
            ) : g.checkerFunction = function() {
                var b = g.getHash() || "";
                return b !== i && (i = b,
                g.Adapter.trigger(a, "hashchange")),
                !0
            }
            ,
            g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)),
            !0
        }
        ,
        g.Adapter.onDomLoad(g.hashChangeInit)),
        g.emulated.pushState && (g.onHashChange = function(b) {
            var c, d = b && b.newURL || g.getLocationHref(), e = g.getHashByUrl(d), f = null, h = null;
            return g.isLastHash(e) ? (g.busy(!1),
            !1) : (g.doubleCheckComplete(),
            g.saveHash(e),
            e && g.isTraditionalAnchor(e) ? (g.Adapter.trigger(a, "anchorchange"),
            g.busy(!1),
            !1) : (f = g.extractState(g.getFullUrl(e || g.getLocationHref()), !0),
            g.isLastSavedState(f) ? (g.busy(!1),
            !1) : (h = g.getHashByState(f),
            c = g.discardedState(f),
            c ? (g.getHashByIndex(-2) === g.getHashByState(c.forwardState) ? g.back(!1) : g.forward(!1),
            !1) : (g.pushState(f.data, f.title, encodeURI(f.url), !1),
            !0))))
        }
        ,
        g.Adapter.bind(a, "hashchange", g.onHashChange),
        g.pushState = function(b, c, d, e) {
            if (d = encodeURI(d).replace(/%25/g, "%"),
            g.getHashByUrl(d))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (e !== !1 && g.busy())
                return g.pushQueue({
                    scope: g,
                    callback: g.pushState,
                    args: arguments,
                    queue: e
                }),
                !1;
            g.busy(!0);
            var f = g.createStateObject(b, c, d)
              , h = g.getHashByState(f)
              , i = g.getState(!1)
              , j = g.getHashByState(i)
              , k = g.getHash()
              , l = g.expectedStateId == f.id;
            return g.storeState(f),
            g.expectedStateId = f.id,
            g.recycleState(f),
            g.setTitle(f),
            h === j ? (g.busy(!1),
            !1) : (g.saveState(f),
            l || g.Adapter.trigger(a, "statechange"),
            !g.isHashEqual(h, k) && !g.isHashEqual(h, g.getShortUrl(g.getLocationHref())) && g.setHash(h, !1),
            g.busy(!1),
            !0)
        }
        ,
        g.replaceState = function(b, c, d, e) {
            if (d = encodeURI(d).replace(/%25/g, "%"),
            g.getHashByUrl(d))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (e !== !1 && g.busy())
                return g.pushQueue({
                    scope: g,
                    callback: g.replaceState,
                    args: arguments,
                    queue: e
                }),
                !1;
            g.busy(!0);
            var f = g.createStateObject(b, c, d)
              , h = g.getHashByState(f)
              , i = g.getState(!1)
              , j = g.getHashByState(i)
              , k = g.getStateByIndex(-2);
            return g.discardState(i, f, k),
            h === j ? (g.storeState(f),
            g.expectedStateId = f.id,
            g.recycleState(f),
            g.setTitle(f),
            g.saveState(f),
            g.Adapter.trigger(a, "statechange"),
            g.busy(!1)) : g.pushState(f.data, f.title, f.url, !1),
            !0
        }
        ),
        g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function() {
            g.Adapter.trigger(a, "hashchange")
        }),
        void 0)
    }
    ,
    "undefined" != typeof g.init && g.init()
}(window),
function(a, b) {
    "use strict";
    var c = a.console || b
      , d = a.document
      , e = a.navigator
      , f = a.sessionStorage || !1
      , g = a.setTimeout
      , h = a.clearTimeout
      , i = a.setInterval
      , j = a.clearInterval
      , k = a.JSON
      , l = a.alert
      , m = a.History = a.History || {}
      , n = a.history;
    try {
        f.setItem("TEST", "1"),
        f.removeItem("TEST")
    } catch (o) {
        f = !1
    }
    if (k.stringify = k.stringify || k.encode,
    k.parse = k.parse || k.decode,
    "undefined" != typeof m.init)
        throw new Error("History.js Core has already been loaded...");
    m.init = function(a) {
        return "undefined" == typeof m.Adapter ? !1 : ("undefined" != typeof m.initCore && m.initCore(),
        "undefined" != typeof m.initHtml4 && m.initHtml4(),
        !0)
    }
    ,
    m.initCore = function(o) {
        if ("undefined" != typeof m.initCore.initialized)
            return !1;
        if (m.initCore.initialized = !0,
        m.options = m.options || {},
        m.options.hashChangeInterval = m.options.hashChangeInterval || 100,
        m.options.safariPollInterval = m.options.safariPollInterval || 500,
        m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500,
        m.options.disableSuid = m.options.disableSuid || !1,
        m.options.storeInterval = m.options.storeInterval || 1e3,
        m.options.busyDelay = m.options.busyDelay || 250,
        m.options.debug = m.options.debug || !1,
        m.options.initialTitle = m.options.initialTitle || d.title,
        m.options.html4Mode = m.options.html4Mode || !1,
        m.options.delayInit = m.options.delayInit || !1,
        m.intervalList = [],
        m.clearAllIntervals = function() {
            var a, b = m.intervalList;
            if ("undefined" != typeof b && null !== b) {
                for (a = 0; a < b.length; a++)
                    j(b[a]);
                m.intervalList = null
            }
        }
        ,
        m.debug = function() {
            (m.options.debug || !1) && m.log.apply(m, arguments)
        }
        ,
        m.log = function() {
            var a, b, e, f, g, h = "undefined" != typeof c && "undefined" != typeof c.log && "undefined" != typeof c.log.apply, i = d.getElementById("log");
            for (h ? (f = Array.prototype.slice.call(arguments),
            a = f.shift(),
            "undefined" != typeof c.debug ? c.debug.apply(c, [a, f]) : c.log.apply(c, [a, f])) : a = "\n" + arguments[0] + "\n",
            b = 1,
            e = arguments.length; e > b; ++b) {
                if (g = arguments[b],
                "object" == typeof g && "undefined" != typeof k)
                    try {
                        g = k.stringify(g)
                    } catch (j) {}
                a += "\n" + g + "\n"
            }
            return i ? (i.value += a + "\n-----\n",
            i.scrollTop = i.scrollHeight - i.clientHeight) : h || l(a),
            !0
        }
        ,
        m.getInternetExplorerMajorVersion = function() {
            var a = m.getInternetExplorerMajorVersion.cached = "undefined" != typeof m.getInternetExplorerMajorVersion.cached ? m.getInternetExplorerMajorVersion.cached : function() {
                for (var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i"); (b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0]; )
                    ;
                return a > 4 ? a : !1
            }();
            return a
        }
        ,
        m.isInternetExplorer = function() {
            var a = m.isInternetExplorer.cached = "undefined" != typeof m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
            return a
        }
        ,
        m.options.html4Mode ? m.emulated = {
            pushState: !0,
            hashChange: !0
        } : m.emulated = {
            pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
            hashChange: Boolean(!("onhashchange"in a || "onhashchange"in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
        },
        m.enabled = !m.emulated.pushState,
        m.bugs = {
            setHash: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            safariPoll: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
            ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
        },
        m.isEmptyObject = function(a) {
            for (var b in a)
                if (a.hasOwnProperty(b))
                    return !1;
            return !0
        }
        ,
        m.cloneObject = function(a) {
            var b, c;
            return a ? (b = k.stringify(a),
            c = k.parse(b)) : c = {},
            c
        }
        ,
        m.getRootUrl = function() {
            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
            return d.location.port && (a += ":" + d.location.port),
            a += "/"
        }
        ,
        m.getBaseHref = function() {
            var a = d.getElementsByTagName("base")
              , b = null
              , c = "";
            return 1 === a.length && (b = a[0],
            c = b.href.replace(/[^\/]+$/, "")),
            c = c.replace(/\/+$/, ""),
            c && (c += "/"),
            c
        }
        ,
        m.getBaseUrl = function() {
            var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
            return a
        }
        ,
        m.getPageUrl = function() {
            var a, b = m.getState(!1, !1), c = (b || {}).url || m.getLocationHref();
            return a = c.replace(/\/+$/, "").replace(/[^\/]+$/, function(a, b, c) {
                return /\./.test(a) ? a : a + "/"
            })
        }
        ,
        m.getBasePageUrl = function() {
            var a = m.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a, b, c) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/";
            return a
        }
        ,
        m.getFullUrl = function(a, b) {
            var c = a
              , d = a.substring(0, 1);
            return b = "undefined" == typeof b ? !0 : b,
            /[a-z]+\:\/\//.test(a) || (c = "/" === d ? m.getRootUrl() + a.replace(/^\/+/, "") : "#" === d ? m.getPageUrl().replace(/#.*/, "") + a : "?" === d ? m.getPageUrl().replace(/[\?#].*/, "") + a : b ? m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")),
            c.replace(/\#$/, "")
        }
        ,
        m.getShortUrl = function(a) {
            var b = a
              , c = m.getBaseUrl()
              , d = m.getRootUrl();
            return m.emulated.pushState && (b = b.replace(c, "")),
            b = b.replace(d, "/"),
            m.isTraditionalAnchor(b) && (b = "./" + b),
            b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }
        ,
        m.getLocationHref = function(a) {
            return a = a || d,
            a.URL === a.location.href ? a.location.href : a.location.href === decodeURIComponent(a.URL) ? a.URL : a.location.hash && decodeURIComponent(a.location.href.replace(/^[^#]+/, "")) === a.location.hash ? a.location.href : -1 == a.URL.indexOf("#") && -1 != a.location.href.indexOf("#") ? a.location.href : a.URL || a.location.href
        }
        ,
        m.store = {},
        m.idToState = m.idToState || {},
        m.stateToId = m.stateToId || {},
        m.urlToId = m.urlToId || {},
        m.storedStates = m.storedStates || [],
        m.savedStates = m.savedStates || [],
        m.normalizeStore = function() {
            m.store.idToState = m.store.idToState || {},
            m.store.urlToId = m.store.urlToId || {},
            m.store.stateToId = m.store.stateToId || {}
        }
        ,
        m.getState = function(a, b) {
            "undefined" == typeof a && (a = !0),
            "undefined" == typeof b && (b = !0);
            var c = m.getLastSavedState();
            return !c && b && (c = m.createStateObject()),
            a && (c = m.cloneObject(c),
            c.url = c.cleanUrl || c.url),
            c
        }
        ,
        m.getIdByState = function(a) {
            var b, c = m.extractId(a.url);
            if (!c)
                if (b = m.getStateString(a),
                "undefined" != typeof m.stateToId[b])
                    c = m.stateToId[b];
                else if ("undefined" != typeof m.store.stateToId[b])
                    c = m.store.stateToId[b];
                else {
                    for (; c = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""),
                    "undefined" != typeof m.idToState[c] || "undefined" != typeof m.store.idToState[c]; )
                        ;
                    m.stateToId[b] = c,
                    m.idToState[c] = a
                }
            return c
        }
        ,
        m.normalizeState = function(a) {
            var b, c;
            return a && "object" == typeof a || (a = {}),
            "undefined" != typeof a.normalized ? a : (a.data && "object" == typeof a.data || (a.data = {}),
            b = {},
            b.normalized = !0,
            b.title = a.title || "",
            b.url = m.getFullUrl(a.url ? a.url : m.getLocationHref()),
            b.hash = m.getShortUrl(b.url),
            b.data = m.cloneObject(a.data),
            b.id = m.getIdByState(b),
            b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""),
            b.url = b.cleanUrl,
            c = !m.isEmptyObject(b.data),
            (b.title || c) && m.options.disableSuid !== !0 && (b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""),
            /\?/.test(b.hash) || (b.hash += "?"),
            b.hash += "&_suid=" + b.id),
            b.hashedUrl = m.getFullUrl(b.hash),
            (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl),
            b)
        }
        ,
        m.createStateObject = function(a, b, c) {
            var d = {
                data: a,
                title: b,
                url: c
            };
            return d = m.normalizeState(d)
        }
        ,
        m.getStateById = function(a) {
            a = String(a);
            var c = m.idToState[a] || m.store.idToState[a] || b;
            return c
        }
        ,
        m.getStateString = function(a) {
            var b, c, d;
            return b = m.normalizeState(a),
            c = {
                data: b.data,
                title: a.title,
                url: a.url
            },
            d = k.stringify(c)
        }
        ,
        m.getStateId = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.id
        }
        ,
        m.getHashByState = function(a) {
            var b, c;
            return b = m.normalizeState(a),
            c = b.hash
        }
        ,
        m.extractId = function(a) {
            var b, c, d, e;
            return e = -1 != a.indexOf("#") ? a.split("#")[0] : a,
            c = /(.*)\&_suid=([0-9]+)$/.exec(e),
            d = c ? c[1] || a : a,
            b = c ? String(c[2] || "") : "",
            b || !1
        }
        ,
        m.isTraditionalAnchor = function(a) {
            var b = !/[\/\?\.]/.test(a);
            return b
        }
        ,
        m.extractState = function(a, b) {
            var c, d, e = null;
            return b = b || !1,
            c = m.extractId(a),
            c && (e = m.getStateById(c)),
            e || (d = m.getFullUrl(a),
            c = m.getIdByUrl(d) || !1,
            c && (e = m.getStateById(c)),
            !e && b && !m.isTraditionalAnchor(a) && (e = m.createStateObject(null, null, d))),
            e
        }
        ,
        m.getIdByUrl = function(a) {
            var c = m.urlToId[a] || m.store.urlToId[a] || b;
            return c
        }
        ,
        m.getLastSavedState = function() {
            return m.savedStates[m.savedStates.length - 1] || b
        }
        ,
        m.getLastStoredState = function() {
            return m.storedStates[m.storedStates.length - 1] || b
        }
        ,
        m.hasUrlDuplicate = function(a) {
            var b, c = !1;
            return b = m.extractState(a.url),
            c = b && b.id !== a.id
        }
        ,
        m.storeState = function(a) {
            return m.urlToId[a.url] = a.id,
            m.storedStates.push(m.cloneObject(a)),
            a
        }
        ,
        m.isLastSavedState = function(a) {
            var b, c, d, e = !1;
            return m.savedStates.length && (b = a.id,
            c = m.getLastSavedState(),
            d = c.id,
            e = b === d),
            e
        }
        ,
        m.saveState = function(a) {
            return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)),
            !0)
        }
        ,
        m.getStateByIndex = function(a) {
            var b = null;
            return b = "undefined" == typeof a ? m.savedStates[m.savedStates.length - 1] : 0 > a ? m.savedStates[m.savedStates.length + a] : m.savedStates[a]
        }
        ,
        m.getCurrentIndex = function() {
            var a = null;
            return a = m.savedStates.length < 1 ? 0 : m.savedStates.length - 1
        }
        ,
        m.getHash = function(a) {
            var b, c = m.getLocationHref(a);
            return b = m.getHashByUrl(c)
        }
        ,
        m.unescapeHash = function(a) {
            var b = m.normalizeHash(a);
            return b = decodeURIComponent(b)
        }
        ,
        m.normalizeHash = function(a) {
            var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
            return b
        }
        ,
        m.setHash = function(a, b) {
            var c, e;
            return b !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.setHash,
                args: arguments,
                queue: b
            }),
            !1) : (m.busy(!0),
            c = m.extractState(a, !0),
            c && !m.emulated.pushState ? m.pushState(c.data, c.title, c.url, !1) : m.getHash() !== a && (m.bugs.setHash ? (e = m.getPageUrl(),
            m.pushState(null, null, e + "#" + a, !1)) : d.location.hash = a),
            m)
        }
        ,
        m.escapeHash = function(b) {
            var c = m.normalizeHash(b);
            return c = a.encodeURIComponent(c),
            m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
            c
        }
        ,
        m.getHashByUrl = function(a) {
            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = m.unescapeHash(b)
        }
        ,
        m.setTitle = function(a) {
            var b, c = a.title;
            c || (b = m.getStateByIndex(0),
            b && b.url === a.url && (c = b.title || m.options.initialTitle));
            try {
                d.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {}
            return d.title = c,
            m
        }
        ,
        m.queues = [],
        m.busy = function(a) {
            if ("undefined" != typeof a ? m.busy.flag = a : "undefined" == typeof m.busy.flag && (m.busy.flag = !1),
            !m.busy.flag) {
                h(m.busy.timeout);
                var b = function() {
                    var a, c, d;
                    if (!m.busy.flag)
                        for (a = m.queues.length - 1; a >= 0; --a)
                            c = m.queues[a],
                            0 !== c.length && (d = c.shift(),
                            m.fireQueueItem(d),
                            m.busy.timeout = g(b, m.options.busyDelay))
                };
                m.busy.timeout = g(b, m.options.busyDelay)
            }
            return m.busy.flag
        }
        ,
        m.busy.flag = !1,
        m.fireQueueItem = function(a) {
            return a.callback.apply(a.scope || m, a.args || [])
        }
        ,
        m.pushQueue = function(a) {
            return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [],
            m.queues[a.queue || 0].push(a),
            m
        }
        ,
        m.queue = function(a, b) {
            return "function" == typeof a && (a = {
                callback: a
            }),
            "undefined" != typeof b && (a.queue = b),
            m.busy() ? m.pushQueue(a) : m.fireQueueItem(a),
            m
        }
        ,
        m.clearQueue = function() {
            return m.busy.flag = !1,
            m.queues = [],
            m
        }
        ,
        m.stateChanged = !1,
        m.doubleChecker = !1,
        m.doubleCheckComplete = function() {
            return m.stateChanged = !0,
            m.doubleCheckClear(),
            m
        }
        ,
        m.doubleCheckClear = function() {
            return m.doubleChecker && (h(m.doubleChecker),
            m.doubleChecker = !1),
            m
        }
        ,
        m.doubleCheck = function(a) {
            return m.stateChanged = !1,
            m.doubleCheckClear(),
            m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                return m.doubleCheckClear(),
                m.stateChanged || a(),
                !0
            }, m.options.doubleCheckInterval)),
            m
        }
        ,
        m.safariStatePoll = function() {
            var b, c = m.extractState(m.getLocationHref());
            return m.isLastSavedState(c) ? void 0 : (b = c,
            b || (b = m.createStateObject()),
            m.Adapter.trigger(a, "popstate"),
            m)
        }
        ,
        m.back = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.back,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.back(!1)
            }),
            n.go(-1),
            !0)
        }
        ,
        m.forward = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({
                scope: m,
                callback: m.forward,
                args: arguments,
                queue: a
            }),
            !1) : (m.busy(!0),
            m.doubleCheck(function() {
                m.forward(!1)
            }),
            n.go(1),
            !0)
        }
        ,
        m.go = function(a, b) {
            var c;
            if (a > 0)
                for (c = 1; a >= c; ++c)
                    m.forward(b);
            else {
                if (!(0 > a))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (c = -1; c >= a; --c)
                    m.back(b)
            }
            return m
        }
        ,
        m.emulated.pushState) {
            var p = function() {};
            m.pushState = m.pushState || p,
            m.replaceState = m.replaceState || p
        } else
            m.onPopState = function(b, c) {
                var d, e, f = !1, g = !1;
                return m.doubleCheckComplete(),
                d = m.getHash(),
                d ? (e = m.extractState(d || m.getLocationHref(), !0),
                e ? m.replaceState(e.data, e.title, e.url, !1) : (m.Adapter.trigger(a, "anchorchange"),
                m.busy(!1)),
                m.expectedStateId = !1,
                !1) : (f = m.Adapter.extractEventData("state", b, c) || !1,
                g = f ? m.getStateById(f) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(m.getLocationHref()),
                g || (g = m.createStateObject(null, null, m.getLocationHref())),
                m.expectedStateId = !1,
                m.isLastSavedState(g) ? (m.busy(!1),
                !1) : (m.storeState(g),
                m.saveState(g),
                m.setTitle(g),
                m.Adapter.trigger(a, "statechange"),
                m.busy(!1),
                !0))
            }
            ,
            m.Adapter.bind(a, "popstate", m.onPopState),
            m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.pushState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.pushState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ,
            m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({
                        scope: m,
                        callback: m.replaceState,
                        args: arguments,
                        queue: e
                    }),
                    !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f),
                m.expectedStateId = f.id,
                n.replaceState(f.id, f.title, f.url),
                m.Adapter.trigger(a, "popstate")),
                !0
            }
            ;
        if (f) {
            try {
                m.store = k.parse(f.getItem("History.store")) || {}
            } catch (q) {
                m.store = {}
            }
            m.normalizeStore()
        } else
            m.store = {},
            m.normalizeStore();
        m.Adapter.bind(a, "unload", m.clearAllIntervals),
        m.saveState(m.storeState(m.extractState(m.getLocationHref(), !0))),
        f && (m.onUnload = function() {
            var a, b, c;
            try {
                a = k.parse(f.getItem("History.store")) || {}
            } catch (d) {
                a = {}
            }
            a.idToState = a.idToState || {},
            a.urlToId = a.urlToId || {},
            a.stateToId = a.stateToId || {};
            for (b in m.idToState)
                m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
            for (b in m.urlToId)
                m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
            for (b in m.stateToId)
                m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
            m.store = a,
            m.normalizeStore(),
            c = k.stringify(a);
            try {
                f.setItem("History.store", c)
            } catch (e) {
                if (e.code !== DOMException.QUOTA_EXCEEDED_ERR)
                    throw e;
                f.length && (f.removeItem("History.store"),
                f.setItem("History.store", c))
            }
        }
        ,
        m.intervalList.push(i(m.onUnload, m.options.storeInterval)),
        m.Adapter.bind(a, "beforeunload", m.onUnload),
        m.Adapter.bind(a, "unload", m.onUnload)),
        m.emulated.pushState || (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)),
        "Apple Computer, Inc." !== e.vendor && "Mozilla" !== (e.appCodeName || "") || (m.Adapter.bind(a, "hashchange", function() {
            m.Adapter.trigger(a, "popstate")
        }),
        m.getHash() && m.Adapter.onDomLoad(function() {
            m.Adapter.trigger(a, "hashchange")
        })))
    }
    ,
    (!m.options || !m.options.delayInit) && m.init()
}(window);
