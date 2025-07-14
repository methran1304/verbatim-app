import {
    $ as N1,
    $a as Zn,
    $b as cn,
    $c as y3,
    A as E2,
    Aa as B,
    Ab as Tt,
    Ac as je,
    B as ar,
    Ba as W2,
    Bb as y,
    Bc as ae,
    C as P2,
    Ca as j1,
    Cb as z,
    Cc as vr,
    D as A2,
    Da as q2,
    Db as C,
    Dc as gr,
    E as V2,
    Ea as Mt,
    Eb as W,
    F as J,
    Fa as gt,
    Fb as hr,
    G as L1,
    Ga as Kt,
    Gb as ur,
    H as qt,
    Ha as ga,
    Hb as _a,
    I as Gt,
    Ia as wn,
    Ib as Fe,
    J as F2,
    Ja as Gn,
    Jb as He,
    K as ma,
    Ka as G2,
    Kb as mr,
    L as nn,
    La as K2,
    Lb as Ht,
    M as H2,
    Ma as Z2,
    Mb as o3,
    N as wt,
    Na as X2,
    Nb as pr,
    O as ft,
    Oa as Q2,
    Ob as ve,
    Oc as f3,
    P as rn,
    Pa as J2,
    Pb as a3,
    Pc as q1,
    Q as pa,
    Qa as e3,
    Qb as g,
    Qc as yr,
    R as O2,
    Ra as Zt,
    Rb as be,
    S as I2,
    Sa as t3,
    Sb as _e,
    Sc as v3,
    T as R2,
    Ta as u,
    Tb as et,
    U as L2,
    Ua as Kn,
    Ub as tt,
    Uc as zr,
    V as vt,
    Va as Ye,
    Vb as le,
    W as Pe,
    Wa as Me,
    Wb as de,
    Wc as g3,
    X as on,
    Xa as oe,
    Xb as sn,
    Y as N2,
    Ya as w,
    Yb as Ge,
    Z as me,
    Za as sr,
    Zb as G,
    _ as j,
    _a as qe,
    _b as Ot,
    a as m,
    aa as Ft,
    ab as ya,
    ac as Q,
    b as Z,
    ba as p,
    bb as n3,
    bc as se,
    c as ut,
    ca as A,
    cb as cr,
    cc as s3,
    d as rr,
    da as Y2,
    db as R,
    dc as we,
    e as mt,
    ea as b,
    eb as V,
    ec as It,
    f as T2,
    fa as x,
    fb as D,
    fc as Sn,
    g as Xe,
    ga as l,
    gb as lr,
    gc as c3,
    h as da,
    ha as $e,
    hb as Se,
    hc as l3,
    i as ha,
    ia as B2,
    ib as U1,
    ic as Dn,
    j as Y,
    ja as Ne,
    jb as te,
    jc as d3,
    k as Te,
    ka as We,
    kb as i3,
    kc as h3,
    l as F1,
    la as Ae,
    lb as r3,
    lc as wa,
    m as H1,
    ma as Ve,
    mb as X,
    mc as yt,
    n as ua,
    na as fe,
    nb as q,
    nc as nt,
    o as pt,
    oa as U,
    ob as St,
    oc as u3,
    p as Qe,
    pa as K,
    pb as za,
    pc as Xn,
    q as pe,
    qa as fa,
    qb as $1,
    qc as W1,
    r as Ee,
    ra as Y1,
    rb as Ca,
    rc as ee,
    s as S,
    sa as Ce,
    sb as ba,
    sc as m3,
    t as O1,
    ta as j2,
    tb as an,
    tc as _,
    u as I1,
    ua as U2,
    ub as Dt,
    uc as Qn,
    v as k2,
    va as B1,
    vb as E,
    vc as fr,
    w as L,
    wa as $2,
    wb as P,
    wc as p3,
    x as or,
    xa as I,
    xb as dr,
    xc as Be,
    y as Ie,
    ya as Je,
    yb as Mn,
    yc as ne,
    z as R1,
    za as va,
    zb as xt,
    zc as k,
} from "./chunk-PY6XUJ4G.js";
var b3 = null;
function zt() {
    return b3;
}
function Ma(t) {
    b3 ??= t;
}
var G1 = class {},
    K1 = (() => {
        class t {
            historyGo(e) {
                throw new Error("");
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(_3),
                providedIn: "platform",
            });
        }
        return t;
    })(),
    Sa = new b(""),
    _3 = (() => {
        class t extends K1 {
            _location;
            _history;
            _doc = l(U);
            constructor() {
                (super(),
                    (this._location = window.location),
                    (this._history = window.history));
            }
            getBaseHrefFromDOM() {
                return zt().getBaseHref(this._doc);
            }
            onPopState(e) {
                let i = zt().getGlobalEventTarget(this._doc, "window");
                return (
                    i.addEventListener("popstate", e, !1),
                    () => i.removeEventListener("popstate", e)
                );
            }
            onHashChange(e) {
                let i = zt().getGlobalEventTarget(this._doc, "window");
                return (
                    i.addEventListener("hashchange", e, !1),
                    () => i.removeEventListener("hashchange", e)
                );
            }
            get href() {
                return this._location.href;
            }
            get protocol() {
                return this._location.protocol;
            }
            get hostname() {
                return this._location.hostname;
            }
            get port() {
                return this._location.port;
            }
            get pathname() {
                return this._location.pathname;
            }
            get search() {
                return this._location.search;
            }
            get hash() {
                return this._location.hash;
            }
            set pathname(e) {
                this._location.pathname = e;
            }
            pushState(e, i, r) {
                this._history.pushState(e, i, r);
            }
            replaceState(e, i, r) {
                this._history.replaceState(e, i, r);
            }
            forward() {
                this._history.forward();
            }
            back() {
                this._history.back();
            }
            historyGo(e = 0) {
                this._history.go(e);
            }
            getState() {
                return this._history.state;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => new t(),
                providedIn: "platform",
            });
        }
        return t;
    })();
function Cr(t, n) {
    return t
        ? n
            ? t.endsWith("/")
                ? n.startsWith("/")
                    ? t + n.slice(1)
                    : t + n
                : n.startsWith("/")
                  ? t + n
                  : `${t}/${n}`
            : t
        : n;
}
function z3(t) {
    let n = t.search(/#|\?|$/);
    return t[n - 1] === "/" ? t.slice(0, n - 1) + t.slice(n) : t;
}
function kt(t) {
    return t && t[0] !== "?" ? `?${t}` : t;
}
var Et = (() => {
        class t {
            historyGo(e) {
                throw new Error("");
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(_r),
                providedIn: "root",
            });
        }
        return t;
    })(),
    br = new b(""),
    _r = (() => {
        class t extends Et {
            _platformLocation;
            _baseHref;
            _removeListenerFns = [];
            constructor(e, i) {
                (super(),
                    (this._platformLocation = e),
                    (this._baseHref =
                        i ??
                        this._platformLocation.getBaseHrefFromDOM() ??
                        l(U).location?.origin ??
                        ""));
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(e) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(e),
                    this._platformLocation.onHashChange(e),
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            prepareExternalUrl(e) {
                return Cr(this._baseHref, e);
            }
            path(e = !1) {
                let i =
                        this._platformLocation.pathname +
                        kt(this._platformLocation.search),
                    r = this._platformLocation.hash;
                return r && e ? `${i}${r}` : i;
            }
            pushState(e, i, r, o) {
                let a = this.prepareExternalUrl(r + kt(o));
                this._platformLocation.pushState(e, i, a);
            }
            replaceState(e, i, r, o) {
                let a = this.prepareExternalUrl(r + kt(o));
                this._platformLocation.replaceState(e, i, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(e = 0) {
                this._platformLocation.historyGo?.(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(x(K1), x(br, 8));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Rt = (() => {
        class t {
            _subject = new Y();
            _basePath;
            _locationStrategy;
            _urlChangeListeners = [];
            _urlChangeSubscription = null;
            constructor(e) {
                this._locationStrategy = e;
                let i = this._locationStrategy.getBaseHref();
                ((this._basePath = J0(z3(C3(i)))),
                    this._locationStrategy.onPopState((r) => {
                        this._subject.next({
                            url: this.path(!0),
                            pop: !0,
                            state: r.state,
                            type: r.type,
                        });
                    }));
            }
            ngOnDestroy() {
                (this._urlChangeSubscription?.unsubscribe(),
                    (this._urlChangeListeners = []));
            }
            path(e = !1) {
                return this.normalize(this._locationStrategy.path(e));
            }
            getState() {
                return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(e, i = "") {
                return this.path() == this.normalize(e + kt(i));
            }
            normalize(e) {
                return t.stripTrailingSlash(Q0(this._basePath, C3(e)));
            }
            prepareExternalUrl(e) {
                return (
                    e && e[0] !== "/" && (e = "/" + e),
                    this._locationStrategy.prepareExternalUrl(e)
                );
            }
            go(e, i = "", r = null) {
                (this._locationStrategy.pushState(r, "", e, i),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(e + kt(i)),
                        r,
                    ));
            }
            replaceState(e, i = "", r = null) {
                (this._locationStrategy.replaceState(r, "", e, i),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(e + kt(i)),
                        r,
                    ));
            }
            forward() {
                this._locationStrategy.forward();
            }
            back() {
                this._locationStrategy.back();
            }
            historyGo(e = 0) {
                this._locationStrategy.historyGo?.(e);
            }
            onUrlChange(e) {
                return (
                    this._urlChangeListeners.push(e),
                    (this._urlChangeSubscription ??= this.subscribe((i) => {
                        this._notifyUrlChangeListeners(i.url, i.state);
                    })),
                    () => {
                        let i = this._urlChangeListeners.indexOf(e);
                        (this._urlChangeListeners.splice(i, 1),
                            this._urlChangeListeners.length === 0 &&
                                (this._urlChangeSubscription?.unsubscribe(),
                                (this._urlChangeSubscription = null)));
                    }
                );
            }
            _notifyUrlChangeListeners(e = "", i) {
                this._urlChangeListeners.forEach((r) => r(e, i));
            }
            subscribe(e, i, r) {
                return this._subject.subscribe({
                    next: e,
                    error: i ?? void 0,
                    complete: r ?? void 0,
                });
            }
            static normalizeQueryParams = kt;
            static joinWithSlash = Cr;
            static stripTrailingSlash = z3;
            static ɵfac = function (i) {
                return new (i || t)(x(Et));
            };
            static ɵprov = p({
                token: t,
                factory: () => X0(),
                providedIn: "root",
            });
        }
        return t;
    })();
function X0() {
    return new Rt(x(Et));
}
function Q0(t, n) {
    if (!t || !n.startsWith(t)) return n;
    let e = n.substring(t.length);
    return e === "" || ["/", ";", "?", "#"].includes(e[0]) ? e : n;
}
function C3(t) {
    return t.replace(/\/index.html$/, "");
}
function J0(t) {
    if (new RegExp("^(https?:)?//").test(t)) {
        let [, e] = t.split(/\/\/[^\/]+/);
        return e;
    }
    return t;
}
var xa = (() => {
    class t extends Et {
        _platformLocation;
        _baseHref = "";
        _removeListenerFns = [];
        constructor(e, i) {
            (super(),
                (this._platformLocation = e),
                i != null && (this._baseHref = i));
        }
        ngOnDestroy() {
            for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
        }
        onPopState(e) {
            this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e),
            );
        }
        getBaseHref() {
            return this._baseHref;
        }
        path(e = !1) {
            let i = this._platformLocation.hash ?? "#";
            return i.length > 0 ? i.substring(1) : i;
        }
        prepareExternalUrl(e) {
            let i = Cr(this._baseHref, e);
            return i.length > 0 ? "#" + i : i;
        }
        pushState(e, i, r, o) {
            let a =
                this.prepareExternalUrl(r + kt(o)) ||
                this._platformLocation.pathname;
            this._platformLocation.pushState(e, i, a);
        }
        replaceState(e, i, r, o) {
            let a =
                this.prepareExternalUrl(r + kt(o)) ||
                this._platformLocation.pathname;
            this._platformLocation.replaceState(e, i, a);
        }
        forward() {
            this._platformLocation.forward();
        }
        back() {
            this._platformLocation.back();
        }
        getState() {
            return this._platformLocation.getState();
        }
        historyGo(e = 0) {
            this._platformLocation.historyGo?.(e);
        }
        static ɵfac = function (i) {
            return new (i || t)(x(K1), x(br, 8));
        };
        static ɵprov = p({ token: t, factory: t.ɵfac });
    }
    return t;
})();
var xn = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
};
function Ta(t, n) {
    let e = o3(t),
        i = e[pr.NumberSymbols][n];
    if (typeof i > "u") {
        if (n === xn.CurrencyDecimal) return e[pr.NumberSymbols][xn.Decimal];
        if (n === xn.CurrencyGroup) return e[pr.NumberSymbols][xn.Group];
    }
    return i;
}
var Da = /\s+/,
    w3 = [],
    ka = (() => {
        class t {
            _ngEl;
            _renderer;
            initialClasses = w3;
            rawClass;
            stateMap = new Map();
            constructor(e, i) {
                ((this._ngEl = e), (this._renderer = i));
            }
            set klass(e) {
                this.initialClasses = e != null ? e.trim().split(Da) : w3;
            }
            set ngClass(e) {
                this.rawClass = typeof e == "string" ? e.trim().split(Da) : e;
            }
            ngDoCheck() {
                for (let i of this.initialClasses) this._updateState(i, !0);
                let e = this.rawClass;
                if (Array.isArray(e) || e instanceof Set)
                    for (let i of e) this._updateState(i, !0);
                else if (e != null)
                    for (let i of Object.keys(e)) this._updateState(i, !!e[i]);
                this._applyStateDiff();
            }
            _updateState(e, i) {
                let r = this.stateMap.get(e);
                r !== void 0
                    ? (r.enabled !== i && ((r.changed = !0), (r.enabled = i)),
                      (r.touched = !0))
                    : this.stateMap.set(e, {
                          enabled: i,
                          changed: !0,
                          touched: !0,
                      });
            }
            _applyStateDiff() {
                for (let e of this.stateMap) {
                    let i = e[0],
                        r = e[1];
                    (r.changed
                        ? (this._toggleClass(i, r.enabled), (r.changed = !1))
                        : r.touched ||
                          (r.enabled && this._toggleClass(i, !1),
                          this.stateMap.delete(i)),
                        (r.touched = !1));
                }
            }
            _toggleClass(e, i) {
                ((e = e.trim()),
                    e.length > 0 &&
                        e.split(Da).forEach((r) => {
                            i
                                ? this._renderer.addClass(
                                      this._ngEl.nativeElement,
                                      r,
                                  )
                                : this._renderer.removeClass(
                                      this._ngEl.nativeElement,
                                      r,
                                  );
                        }));
            }
            static ɵfac = function (i) {
                return new (i || t)(w(B), w(oe));
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "ngClass", ""]],
                inputs: { klass: [0, "class", "klass"], ngClass: "ngClass" },
            });
        }
        return t;
    })();
var Lt = (() => {
    class t {
        _viewContainerRef;
        _viewRef = null;
        ngTemplateOutletContext = null;
        ngTemplateOutlet = null;
        ngTemplateOutletInjector = null;
        constructor(e) {
            this._viewContainerRef = e;
        }
        ngOnChanges(e) {
            if (this._shouldRecreateView(e)) {
                let i = this._viewContainerRef;
                if (
                    (this._viewRef && i.remove(i.indexOf(this._viewRef)),
                    !this.ngTemplateOutlet)
                ) {
                    this._viewRef = null;
                    return;
                }
                let r = this._createContextForwardProxy();
                this._viewRef = i.createEmbeddedView(this.ngTemplateOutlet, r, {
                    injector: this.ngTemplateOutletInjector ?? void 0,
                });
            }
        }
        _shouldRecreateView(e) {
            return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
        }
        _createContextForwardProxy() {
            return new Proxy(
                {},
                {
                    set: (e, i, r) =>
                        this.ngTemplateOutletContext
                            ? Reflect.set(this.ngTemplateOutletContext, i, r)
                            : !1,
                    get: (e, i, r) => {
                        if (this.ngTemplateOutletContext)
                            return Reflect.get(
                                this.ngTemplateOutletContext,
                                i,
                                r,
                            );
                    },
                },
            );
        }
        static ɵfac = function (i) {
            return new (i || t)(w(qe));
        };
        static ɵdir = D({
            type: t,
            selectors: [["", "ngTemplateOutlet", ""]],
            inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
                ngTemplateOutletInjector: "ngTemplateOutletInjector",
            },
            features: [I],
        });
    }
    return t;
})();
var Nt = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({});
    }
    return t;
})();
function Z1(t, n) {
    n = encodeURIComponent(n);
    for (let e of t.split(";")) {
        let i = e.indexOf("="),
            [r, o] = i == -1 ? [e, ""] : [e.slice(0, i), e.slice(i + 1)];
        if (r.trim() === n) return decodeURIComponent(o);
    }
    return null;
}
var Tn = class {};
var Pa = "browser";
function Jn(t) {
    return t === Pa;
}
var S3 = (() => {
        class t {
            static ɵprov = p({
                token: t,
                providedIn: "root",
                factory: () => new Ea(l(U), window),
            });
        }
        return t;
    })(),
    Ea = class {
        document;
        window;
        offset = () => [0, 0];
        constructor(n, e) {
            ((this.document = n), (this.window = e));
        }
        setOffset(n) {
            Array.isArray(n) ? (this.offset = () => n) : (this.offset = n);
        }
        getScrollPosition() {
            return [this.window.scrollX, this.window.scrollY];
        }
        scrollToPosition(n, e) {
            this.window.scrollTo(Z(m({}, e), { left: n[0], top: n[1] }));
        }
        scrollToAnchor(n, e) {
            let i = il(this.document, n);
            i && (this.scrollToElement(i, e), i.focus());
        }
        setHistoryScrollRestoration(n) {
            try {
                this.window.history.scrollRestoration = n;
            } catch {
                console.warn(N1(2400, !1));
            }
        }
        scrollToElement(n, e) {
            let i = n.getBoundingClientRect(),
                r = i.left + this.window.pageXOffset,
                o = i.top + this.window.pageYOffset,
                a = this.offset();
            this.window.scrollTo(
                Z(m({}, e), { left: r - a[0], top: o - a[1] }),
            );
        }
    };
function il(t, n) {
    let e = t.getElementById(n) || t.getElementsByName(n)[0];
    if (e) return e;
    if (
        typeof t.createTreeWalker == "function" &&
        t.body &&
        typeof t.body.attachShadow == "function"
    ) {
        let i = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
            r = i.currentNode;
        for (; r; ) {
            let o = r.shadowRoot;
            if (o) {
                let a = o.getElementById(n) || o.querySelector(`[name="${n}"]`);
                if (a) return a;
            }
            r = i.nextNode();
        }
    }
    return null;
}
var Mr = new b(""),
    Oa = (() => {
        class t {
            _zone;
            _plugins;
            _eventNameToPlugin = new Map();
            constructor(e, i) {
                ((this._zone = i),
                    e.forEach((r) => {
                        r.manager = this;
                    }),
                    (this._plugins = e.slice().reverse()));
            }
            addEventListener(e, i, r, o) {
                return this._findPluginFor(i).addEventListener(e, i, r, o);
            }
            getZone() {
                return this._zone;
            }
            _findPluginFor(e) {
                let i = this._eventNameToPlugin.get(e);
                if (i) return i;
                if (((i = this._plugins.find((o) => o.supports(e))), !i))
                    throw new j(5101, !1);
                return (this._eventNameToPlugin.set(e, i), i);
            }
            static ɵfac = function (i) {
                return new (i || t)(x(Mr), x(q));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    X1 = class {
        _doc;
        constructor(n) {
            this._doc = n;
        }
        manager;
    },
    Aa = "ng-app-id";
function x3(t) {
    for (let n of t) n.remove();
}
function T3(t, n) {
    let e = n.createElement("style");
    return ((e.textContent = t), e);
}
function rl(t, n, e, i) {
    let r = t.head?.querySelectorAll(`style[${Aa}="${n}"],link[${Aa}="${n}"]`);
    if (r)
        for (let o of r)
            (o.removeAttribute(Aa),
                o instanceof HTMLLinkElement
                    ? i.set(o.href.slice(o.href.lastIndexOf("/") + 1), {
                          usage: 0,
                          elements: [o],
                      })
                    : o.textContent &&
                      e.set(o.textContent, { usage: 0, elements: [o] }));
}
function Fa(t, n) {
    let e = n.createElement("link");
    return (e.setAttribute("rel", "stylesheet"), e.setAttribute("href", t), e);
}
var Ia = (() => {
        class t {
            doc;
            appId;
            nonce;
            inline = new Map();
            external = new Map();
            hosts = new Set();
            constructor(e, i, r, o = {}) {
                ((this.doc = e),
                    (this.appId = i),
                    (this.nonce = r),
                    rl(e, i, this.inline, this.external),
                    this.hosts.add(e.head));
            }
            addStyles(e, i) {
                for (let r of e) this.addUsage(r, this.inline, T3);
                i?.forEach((r) => this.addUsage(r, this.external, Fa));
            }
            removeStyles(e, i) {
                for (let r of e) this.removeUsage(r, this.inline);
                i?.forEach((r) => this.removeUsage(r, this.external));
            }
            addUsage(e, i, r) {
                let o = i.get(e);
                o
                    ? o.usage++
                    : i.set(e, {
                          usage: 1,
                          elements: [...this.hosts].map((a) =>
                              this.addElement(a, r(e, this.doc)),
                          ),
                      });
            }
            removeUsage(e, i) {
                let r = i.get(e);
                r && (r.usage--, r.usage <= 0 && (x3(r.elements), i.delete(e)));
            }
            ngOnDestroy() {
                for (let [, { elements: e }] of [
                    ...this.inline,
                    ...this.external,
                ])
                    x3(e);
                this.hosts.clear();
            }
            addHost(e) {
                this.hosts.add(e);
                for (let [i, { elements: r }] of this.inline)
                    r.push(this.addElement(e, T3(i, this.doc)));
                for (let [i, { elements: r }] of this.external)
                    r.push(this.addElement(e, Fa(i, this.doc)));
            }
            removeHost(e) {
                this.hosts.delete(e);
            }
            addElement(e, i) {
                return (
                    this.nonce && i.setAttribute("nonce", this.nonce),
                    e.appendChild(i)
                );
            }
            static ɵfac = function (i) {
                return new (i || t)(x(U), x(j1), x(Kt, 8), x(Mt));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Va = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
        math: "http://www.w3.org/1998/Math/MathML",
    },
    Ra = /%COMP%/g;
var E3 = "%COMP%",
    ol = `_nghost-${E3}`,
    al = `_ngcontent-${E3}`,
    sl = !0,
    cl = new b("", { providedIn: "root", factory: () => sl });
function ll(t) {
    return al.replace(Ra, t);
}
function dl(t) {
    return ol.replace(Ra, t);
}
function P3(t, n) {
    return n.map((e) => e.replace(Ra, t));
}
var kn = (() => {
        class t {
            eventManager;
            sharedStylesHost;
            appId;
            removeStylesOnCompDestroy;
            doc;
            platformId;
            ngZone;
            nonce;
            tracingService;
            rendererByCompId = new Map();
            defaultRenderer;
            platformIsServer;
            constructor(e, i, r, o, a, s, c, d = null, h = null) {
                ((this.eventManager = e),
                    (this.sharedStylesHost = i),
                    (this.appId = r),
                    (this.removeStylesOnCompDestroy = o),
                    (this.doc = a),
                    (this.platformId = s),
                    (this.ngZone = c),
                    (this.nonce = d),
                    (this.tracingService = h),
                    (this.platformIsServer = !1),
                    (this.defaultRenderer = new Q1(
                        e,
                        a,
                        c,
                        this.platformIsServer,
                        this.tracingService,
                    )));
            }
            createRenderer(e, i) {
                if (!e || !i) return this.defaultRenderer;
                let r = this.getOrCreateRenderer(e, i);
                return (
                    r instanceof wr
                        ? r.applyToHost(e)
                        : r instanceof J1 && r.applyStyles(),
                    r
                );
            }
            getOrCreateRenderer(e, i) {
                let r = this.rendererByCompId,
                    o = r.get(i.id);
                if (!o) {
                    let a = this.doc,
                        s = this.ngZone,
                        c = this.eventManager,
                        d = this.sharedStylesHost,
                        h = this.removeStylesOnCompDestroy,
                        f = this.platformIsServer,
                        v = this.tracingService;
                    switch (i.encapsulation) {
                        case ga.Emulated:
                            o = new wr(c, d, i, this.appId, h, a, s, f, v);
                            break;
                        case ga.ShadowDom:
                            return new Ha(c, d, e, i, a, s, this.nonce, f, v);
                        default:
                            o = new J1(c, d, i, h, a, s, f, v);
                            break;
                    }
                    r.set(i.id, o);
                }
                return o;
            }
            ngOnDestroy() {
                this.rendererByCompId.clear();
            }
            componentReplaced(e) {
                this.rendererByCompId.delete(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(
                    x(Oa),
                    x(Ia),
                    x(j1),
                    x(cl),
                    x(U),
                    x(Mt),
                    x(q),
                    x(Kt),
                    x(r3, 8),
                );
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Q1 = class {
        eventManager;
        doc;
        ngZone;
        platformIsServer;
        tracingService;
        data = Object.create(null);
        throwOnSyntheticProps = !0;
        constructor(n, e, i, r, o) {
            ((this.eventManager = n),
                (this.doc = e),
                (this.ngZone = i),
                (this.platformIsServer = r),
                (this.tracingService = o));
        }
        destroy() {}
        destroyNode = null;
        createElement(n, e) {
            return e
                ? this.doc.createElementNS(Va[e] || e, n)
                : this.doc.createElement(n);
        }
        createComment(n) {
            return this.doc.createComment(n);
        }
        createText(n) {
            return this.doc.createTextNode(n);
        }
        appendChild(n, e) {
            (k3(n) ? n.content : n).appendChild(e);
        }
        insertBefore(n, e, i) {
            n && (k3(n) ? n.content : n).insertBefore(e, i);
        }
        removeChild(n, e) {
            e.remove();
        }
        selectRootElement(n, e) {
            let i = typeof n == "string" ? this.doc.querySelector(n) : n;
            if (!i) throw new j(-5104, !1);
            return (e || (i.textContent = ""), i);
        }
        parentNode(n) {
            return n.parentNode;
        }
        nextSibling(n) {
            return n.nextSibling;
        }
        setAttribute(n, e, i, r) {
            if (r) {
                e = r + ":" + e;
                let o = Va[r];
                o ? n.setAttributeNS(o, e, i) : n.setAttribute(e, i);
            } else n.setAttribute(e, i);
        }
        removeAttribute(n, e, i) {
            if (i) {
                let r = Va[i];
                r ? n.removeAttributeNS(r, e) : n.removeAttribute(`${i}:${e}`);
            } else n.removeAttribute(e);
        }
        addClass(n, e) {
            n.classList.add(e);
        }
        removeClass(n, e) {
            n.classList.remove(e);
        }
        setStyle(n, e, i, r) {
            r & (Kn.DashCase | Kn.Important)
                ? n.style.setProperty(e, i, r & Kn.Important ? "important" : "")
                : (n.style[e] = i);
        }
        removeStyle(n, e, i) {
            i & Kn.DashCase ? n.style.removeProperty(e) : (n.style[e] = "");
        }
        setProperty(n, e, i) {
            n != null && (n[e] = i);
        }
        setValue(n, e) {
            n.nodeValue = e;
        }
        listen(n, e, i, r) {
            if (
                typeof n == "string" &&
                ((n = zt().getGlobalEventTarget(this.doc, n)), !n)
            )
                throw new j(5102, !1);
            let o = this.decoratePreventDefault(i);
            return (
                this.tracingService?.wrapEventListener &&
                    (o = this.tracingService.wrapEventListener(n, e, o)),
                this.eventManager.addEventListener(n, e, o, r)
            );
        }
        decoratePreventDefault(n) {
            return (e) => {
                if (e === "__ngUnwrap__") return n;
                n(e) === !1 && e.preventDefault();
            };
        }
    };
function k3(t) {
    return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var Ha = class extends Q1 {
        sharedStylesHost;
        hostEl;
        shadowRoot;
        constructor(n, e, i, r, o, a, s, c, d) {
            (super(n, o, a, c, d),
                (this.sharedStylesHost = e),
                (this.hostEl = i),
                (this.shadowRoot = i.attachShadow({ mode: "open" })),
                this.sharedStylesHost.addHost(this.shadowRoot));
            let h = r.styles;
            h = P3(r.id, h);
            for (let v of h) {
                let M = document.createElement("style");
                (s && M.setAttribute("nonce", s),
                    (M.textContent = v),
                    this.shadowRoot.appendChild(M));
            }
            let f = r.getExternalStyles?.();
            if (f)
                for (let v of f) {
                    let M = Fa(v, o);
                    (s && M.setAttribute("nonce", s),
                        this.shadowRoot.appendChild(M));
                }
        }
        nodeOrShadowRoot(n) {
            return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, e) {
            return super.appendChild(this.nodeOrShadowRoot(n), e);
        }
        insertBefore(n, e, i) {
            return super.insertBefore(this.nodeOrShadowRoot(n), e, i);
        }
        removeChild(n, e) {
            return super.removeChild(null, e);
        }
        parentNode(n) {
            return this.nodeOrShadowRoot(
                super.parentNode(this.nodeOrShadowRoot(n)),
            );
        }
        destroy() {
            this.sharedStylesHost.removeHost(this.shadowRoot);
        }
    },
    J1 = class extends Q1 {
        sharedStylesHost;
        removeStylesOnCompDestroy;
        styles;
        styleUrls;
        constructor(n, e, i, r, o, a, s, c, d) {
            (super(n, o, a, s, c),
                (this.sharedStylesHost = e),
                (this.removeStylesOnCompDestroy = r));
            let h = i.styles;
            ((this.styles = d ? P3(d, h) : h),
                (this.styleUrls = i.getExternalStyles?.(d)));
        }
        applyStyles() {
            this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
        }
        destroy() {
            this.removeStylesOnCompDestroy &&
                this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
        }
    },
    wr = class extends J1 {
        contentAttr;
        hostAttr;
        constructor(n, e, i, r, o, a, s, c, d) {
            let h = r + "-" + i.id;
            (super(n, e, i, o, a, s, c, d, h),
                (this.contentAttr = ll(h)),
                (this.hostAttr = dl(h)));
        }
        applyToHost(n) {
            (this.applyStyles(), this.setAttribute(n, this.hostAttr, ""));
        }
        createElement(n, e) {
            let i = super.createElement(n, e);
            return (super.setAttribute(i, this.contentAttr, ""), i);
        }
    };
var Sr = class t extends G1 {
        supportsDOMEvents = !0;
        static makeCurrent() {
            Ma(new t());
        }
        onAndCancel(n, e, i, r) {
            return (
                n.addEventListener(e, i, r),
                () => {
                    n.removeEventListener(e, i, r);
                }
            );
        }
        dispatchEvent(n, e) {
            n.dispatchEvent(e);
        }
        remove(n) {
            n.remove();
        }
        createElement(n, e) {
            return ((e = e || this.getDefaultDocument()), e.createElement(n));
        }
        createHtmlDocument() {
            return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
            return document;
        }
        isElementNode(n) {
            return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
            return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, e) {
            return e === "window"
                ? window
                : e === "document"
                  ? n
                  : e === "body"
                    ? n.body
                    : null;
        }
        getBaseHref(n) {
            let e = ul();
            return e == null ? null : ml(e);
        }
        resetBaseElement() {
            ei = null;
        }
        getUserAgent() {
            return window.navigator.userAgent;
        }
        getCookie(n) {
            return Z1(document.cookie, n);
        }
    },
    ei = null;
function ul() {
    return (
        (ei = ei || document.head.querySelector("base")),
        ei ? ei.getAttribute("href") : null
    );
}
function ml(t) {
    return new URL(t, document.baseURI).pathname;
}
var pl = (() => {
        class t {
            build() {
                return new XMLHttpRequest();
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    V3 = (() => {
        class t extends X1 {
            constructor(e) {
                super(e);
            }
            supports(e) {
                return !0;
            }
            addEventListener(e, i, r, o) {
                return (
                    e.addEventListener(i, r, o),
                    () => this.removeEventListener(e, i, r, o)
                );
            }
            removeEventListener(e, i, r, o) {
                return e.removeEventListener(i, r, o);
            }
            static ɵfac = function (i) {
                return new (i || t)(x(U));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    A3 = ["alt", "control", "meta", "shift"],
    fl = {
        "\b": "Backspace",
        "	": "Tab",
        "\x7F": "Delete",
        "\x1B": "Escape",
        Del: "Delete",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Up: "ArrowUp",
        Down: "ArrowDown",
        Menu: "ContextMenu",
        Scroll: "ScrollLock",
        Win: "OS",
    },
    vl = {
        alt: (t) => t.altKey,
        control: (t) => t.ctrlKey,
        meta: (t) => t.metaKey,
        shift: (t) => t.shiftKey,
    },
    F3 = (() => {
        class t extends X1 {
            constructor(e) {
                super(e);
            }
            supports(e) {
                return t.parseEventName(e) != null;
            }
            addEventListener(e, i, r, o) {
                let a = t.parseEventName(i),
                    s = t.eventCallback(a.fullKey, r, this.manager.getZone());
                return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                        zt().onAndCancel(e, a.domEventName, s, o),
                    );
            }
            static parseEventName(e) {
                let i = e.toLowerCase().split("."),
                    r = i.shift();
                if (i.length === 0 || !(r === "keydown" || r === "keyup"))
                    return null;
                let o = t._normalizeKey(i.pop()),
                    a = "",
                    s = i.indexOf("code");
                if (
                    (s > -1 && (i.splice(s, 1), (a = "code.")),
                    A3.forEach((d) => {
                        let h = i.indexOf(d);
                        h > -1 && (i.splice(h, 1), (a += d + "."));
                    }),
                    (a += o),
                    i.length != 0 || o.length === 0)
                )
                    return null;
                let c = {};
                return ((c.domEventName = r), (c.fullKey = a), c);
            }
            static matchEventFullKeyCode(e, i) {
                let r = fl[e.key] || e.key,
                    o = "";
                return (
                    i.indexOf("code.") > -1 && ((r = e.code), (o = "code.")),
                    r == null || !r
                        ? !1
                        : ((r = r.toLowerCase()),
                          r === " " ? (r = "space") : r === "." && (r = "dot"),
                          A3.forEach((a) => {
                              if (a !== r) {
                                  let s = vl[a];
                                  s(e) && (o += a + ".");
                              }
                          }),
                          (o += r),
                          o === i)
                );
            }
            static eventCallback(e, i, r) {
                return (o) => {
                    t.matchEventFullKeyCode(o, e) && r.runGuarded(() => i(o));
                };
            }
            static _normalizeKey(e) {
                return e === "esc" ? "escape" : e;
            }
            static ɵfac = function (i) {
                return new (i || t)(x(U));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })();
function La(t, n) {
    return m3(m({ rootComponent: t }, gl(n)));
}
function gl(t) {
    return {
        appProviders: [..._l, ...(t?.providers ?? [])],
        platformProviders: bl,
    };
}
function yl() {
    Sr.makeCurrent();
}
function zl() {
    return new fa();
}
function Cl() {
    return (W2(document), document);
}
var bl = [
    { provide: Mt, useValue: Pa },
    { provide: q2, useValue: yl, multi: !0 },
    { provide: U, useFactory: Cl },
];
var _l = [
    { provide: B2, useValue: "root" },
    { provide: fa, useFactory: zl },
    { provide: Mr, useClass: V3, multi: !0, deps: [U] },
    { provide: Mr, useClass: F3, multi: !0, deps: [U] },
    kn,
    Ia,
    Oa,
    { provide: Me, useExisting: kn },
    { provide: Tn, useClass: pl },
    [],
];
var n1 = class {},
    Pn = class {},
    ln = class t {
        headers;
        normalizedNames = new Map();
        lazyInit;
        lazyUpdate = null;
        constructor(n) {
            n
                ? typeof n == "string"
                    ? (this.lazyInit = () => {
                          ((this.headers = new Map()),
                              n
                                  .split(
                                      `
`,
                                  )
                                  .forEach((e) => {
                                      let i = e.indexOf(":");
                                      if (i > 0) {
                                          let r = e.slice(0, i),
                                              o = e.slice(i + 1).trim();
                                          this.addHeaderEntry(r, o);
                                      }
                                  }));
                      })
                    : typeof Headers < "u" && n instanceof Headers
                      ? ((this.headers = new Map()),
                        n.forEach((e, i) => {
                            this.addHeaderEntry(i, e);
                        }))
                      : (this.lazyInit = () => {
                            ((this.headers = new Map()),
                                Object.entries(n).forEach(([e, i]) => {
                                    this.setHeaderEntries(e, i);
                                }));
                        })
                : (this.headers = new Map());
        }
        has(n) {
            return (this.init(), this.headers.has(n.toLowerCase()));
        }
        get(n) {
            this.init();
            let e = this.headers.get(n.toLowerCase());
            return e && e.length > 0 ? e[0] : null;
        }
        keys() {
            return (this.init(), Array.from(this.normalizedNames.values()));
        }
        getAll(n) {
            return (this.init(), this.headers.get(n.toLowerCase()) || null);
        }
        append(n, e) {
            return this.clone({ name: n, value: e, op: "a" });
        }
        set(n, e) {
            return this.clone({ name: n, value: e, op: "s" });
        }
        delete(n, e) {
            return this.clone({ name: n, value: e, op: "d" });
        }
        maybeSetNormalizedName(n, e) {
            this.normalizedNames.has(e) || this.normalizedNames.set(e, n);
        }
        init() {
            this.lazyInit &&
                (this.lazyInit instanceof t
                    ? this.copyFrom(this.lazyInit)
                    : this.lazyInit(),
                (this.lazyInit = null),
                this.lazyUpdate &&
                    (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
                    (this.lazyUpdate = null)));
        }
        copyFrom(n) {
            (n.init(),
                Array.from(n.headers.keys()).forEach((e) => {
                    (this.headers.set(e, n.headers.get(e)),
                        this.normalizedNames.set(e, n.normalizedNames.get(e)));
                }));
        }
        clone(n) {
            let e = new t();
            return (
                (e.lazyInit =
                    this.lazyInit && this.lazyInit instanceof t
                        ? this.lazyInit
                        : this),
                (e.lazyUpdate = (this.lazyUpdate || []).concat([n])),
                e
            );
        }
        applyUpdate(n) {
            let e = n.name.toLowerCase();
            switch (n.op) {
                case "a":
                case "s":
                    let i = n.value;
                    if ((typeof i == "string" && (i = [i]), i.length === 0))
                        return;
                    this.maybeSetNormalizedName(n.name, e);
                    let r = (n.op === "a" ? this.headers.get(e) : void 0) || [];
                    (r.push(...i), this.headers.set(e, r));
                    break;
                case "d":
                    let o = n.value;
                    if (!o)
                        (this.headers.delete(e),
                            this.normalizedNames.delete(e));
                    else {
                        let a = this.headers.get(e);
                        if (!a) return;
                        ((a = a.filter((s) => o.indexOf(s) === -1)),
                            a.length === 0
                                ? (this.headers.delete(e),
                                  this.normalizedNames.delete(e))
                                : this.headers.set(e, a));
                    }
                    break;
            }
        }
        addHeaderEntry(n, e) {
            let i = n.toLowerCase();
            (this.maybeSetNormalizedName(n, i),
                this.headers.has(i)
                    ? this.headers.get(i).push(e)
                    : this.headers.set(i, [e]));
        }
        setHeaderEntries(n, e) {
            let i = (Array.isArray(e) ? e : [e]).map((o) => o.toString()),
                r = n.toLowerCase();
            (this.headers.set(r, i), this.maybeSetNormalizedName(n, r));
        }
        forEach(n) {
            (this.init(),
                Array.from(this.normalizedNames.keys()).forEach((e) =>
                    n(this.normalizedNames.get(e), this.headers.get(e)),
                ));
        }
    };
var xr = class {
    encodeKey(n) {
        return H3(n);
    }
    encodeValue(n) {
        return H3(n);
    }
    decodeKey(n) {
        return decodeURIComponent(n);
    }
    decodeValue(n) {
        return decodeURIComponent(n);
    }
};
function wl(t, n) {
    let e = new Map();
    return (
        t.length > 0 &&
            t
                .replace(/^\?/, "")
                .split("&")
                .forEach((r) => {
                    let o = r.indexOf("="),
                        [a, s] =
                            o == -1
                                ? [n.decodeKey(r), ""]
                                : [
                                      n.decodeKey(r.slice(0, o)),
                                      n.decodeValue(r.slice(o + 1)),
                                  ],
                        c = e.get(a) || [];
                    (c.push(s), e.set(a, c));
                }),
        e
    );
}
var Ml = /%(\d[a-f0-9])/gi,
    Sl = {
        40: "@",
        "3A": ":",
        24: "$",
        "2C": ",",
        "3B": ";",
        "3D": "=",
        "3F": "?",
        "2F": "/",
    };
function H3(t) {
    return encodeURIComponent(t).replace(Ml, (n, e) => Sl[e] ?? n);
}
function Dr(t) {
    return `${t}`;
}
var Xt = class t {
    map;
    encoder;
    updates = null;
    cloneFrom = null;
    constructor(n = {}) {
        if (((this.encoder = n.encoder || new xr()), n.fromString)) {
            if (n.fromObject) throw new j(2805, !1);
            this.map = wl(n.fromString, this.encoder);
        } else
            n.fromObject
                ? ((this.map = new Map()),
                  Object.keys(n.fromObject).forEach((e) => {
                      let i = n.fromObject[e],
                          r = Array.isArray(i) ? i.map(Dr) : [Dr(i)];
                      this.map.set(e, r);
                  }))
                : (this.map = null);
    }
    has(n) {
        return (this.init(), this.map.has(n));
    }
    get(n) {
        this.init();
        let e = this.map.get(n);
        return e ? e[0] : null;
    }
    getAll(n) {
        return (this.init(), this.map.get(n) || null);
    }
    keys() {
        return (this.init(), Array.from(this.map.keys()));
    }
    append(n, e) {
        return this.clone({ param: n, value: e, op: "a" });
    }
    appendAll(n) {
        let e = [];
        return (
            Object.keys(n).forEach((i) => {
                let r = n[i];
                Array.isArray(r)
                    ? r.forEach((o) => {
                          e.push({ param: i, value: o, op: "a" });
                      })
                    : e.push({ param: i, value: r, op: "a" });
            }),
            this.clone(e)
        );
    }
    set(n, e) {
        return this.clone({ param: n, value: e, op: "s" });
    }
    delete(n, e) {
        return this.clone({ param: n, value: e, op: "d" });
    }
    toString() {
        return (
            this.init(),
            this.keys()
                .map((n) => {
                    let e = this.encoder.encodeKey(n);
                    return this.map
                        .get(n)
                        .map((i) => e + "=" + this.encoder.encodeValue(i))
                        .join("&");
                })
                .filter((n) => n !== "")
                .join("&")
        );
    }
    clone(n) {
        let e = new t({ encoder: this.encoder });
        return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat(n)),
            e
        );
    }
    init() {
        (this.map === null && (this.map = new Map()),
            this.cloneFrom !== null &&
                (this.cloneFrom.init(),
                this.cloneFrom
                    .keys()
                    .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
                this.updates.forEach((n) => {
                    switch (n.op) {
                        case "a":
                        case "s":
                            let e =
                                (n.op === "a"
                                    ? this.map.get(n.param)
                                    : void 0) || [];
                            (e.push(Dr(n.value)), this.map.set(n.param, e));
                            break;
                        case "d":
                            if (n.value !== void 0) {
                                let i = this.map.get(n.param) || [],
                                    r = i.indexOf(Dr(n.value));
                                (r !== -1 && i.splice(r, 1),
                                    i.length > 0
                                        ? this.map.set(n.param, i)
                                        : this.map.delete(n.param));
                            } else {
                                this.map.delete(n.param);
                                break;
                            }
                    }
                }),
                (this.cloneFrom = this.updates = null)));
    }
};
var Tr = class {
    map = new Map();
    set(n, e) {
        return (this.map.set(n, e), this);
    }
    get(n) {
        return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
        );
    }
    delete(n) {
        return (this.map.delete(n), this);
    }
    has(n) {
        return this.map.has(n);
    }
    keys() {
        return this.map.keys();
    }
};
function Dl(t) {
    switch (t) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "JSONP":
            return !1;
        default:
            return !0;
    }
}
function O3(t) {
    return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
}
function I3(t) {
    return typeof Blob < "u" && t instanceof Blob;
}
function R3(t) {
    return typeof FormData < "u" && t instanceof FormData;
}
function xl(t) {
    return typeof URLSearchParams < "u" && t instanceof URLSearchParams;
}
var L3 = "Content-Type",
    N3 = "Accept",
    Y3 = "X-Request-URL",
    B3 = "text/plain",
    j3 = "application/json",
    Tl = `${j3}, ${B3}, */*`,
    e1 = class t {
        url;
        body = null;
        headers;
        context;
        reportProgress = !1;
        withCredentials = !1;
        credentials;
        keepalive = !1;
        cache;
        priority;
        mode;
        redirect;
        responseType = "json";
        method;
        params;
        urlWithParams;
        transferCache;
        timeout;
        constructor(n, e, i, r) {
            ((this.url = e), (this.method = n.toUpperCase()));
            let o;
            if (
                (Dl(this.method) || r
                    ? ((this.body = i !== void 0 ? i : null), (o = r))
                    : (o = i),
                o)
            ) {
                if (
                    ((this.reportProgress = !!o.reportProgress),
                    (this.withCredentials = !!o.withCredentials),
                    (this.keepalive = !!o.keepalive),
                    o.responseType && (this.responseType = o.responseType),
                    o.headers && (this.headers = o.headers),
                    o.context && (this.context = o.context),
                    o.params && (this.params = o.params),
                    o.priority && (this.priority = o.priority),
                    o.cache && (this.cache = o.cache),
                    o.credentials && (this.credentials = o.credentials),
                    typeof o.timeout == "number")
                ) {
                    if (o.timeout < 1 || !Number.isInteger(o.timeout))
                        throw new Error("");
                    this.timeout = o.timeout;
                }
                (o.mode && (this.mode = o.mode),
                    o.redirect && (this.redirect = o.redirect),
                    (this.transferCache = o.transferCache));
            }
            if (
                ((this.headers ??= new ln()),
                (this.context ??= new Tr()),
                !this.params)
            )
                ((this.params = new Xt()), (this.urlWithParams = e));
            else {
                let a = this.params.toString();
                if (a.length === 0) this.urlWithParams = e;
                else {
                    let s = e.indexOf("?"),
                        c = s === -1 ? "?" : s < e.length - 1 ? "&" : "";
                    this.urlWithParams = e + c + a;
                }
            }
        }
        serializeBody() {
            return this.body === null
                ? null
                : typeof this.body == "string" ||
                    O3(this.body) ||
                    I3(this.body) ||
                    R3(this.body) ||
                    xl(this.body)
                  ? this.body
                  : this.body instanceof Xt
                    ? this.body.toString()
                    : typeof this.body == "object" ||
                        typeof this.body == "boolean" ||
                        Array.isArray(this.body)
                      ? JSON.stringify(this.body)
                      : this.body.toString();
        }
        detectContentTypeHeader() {
            return this.body === null || R3(this.body)
                ? null
                : I3(this.body)
                  ? this.body.type || null
                  : O3(this.body)
                    ? null
                    : typeof this.body == "string"
                      ? B3
                      : this.body instanceof Xt
                        ? "application/x-www-form-urlencoded;charset=UTF-8"
                        : typeof this.body == "object" ||
                            typeof this.body == "number" ||
                            typeof this.body == "boolean"
                          ? j3
                          : null;
        }
        clone(n = {}) {
            let e = n.method || this.method,
                i = n.url || this.url,
                r = n.responseType || this.responseType,
                o = n.keepalive ?? this.keepalive,
                a = n.priority || this.priority,
                s = n.cache || this.cache,
                c = n.mode || this.mode,
                d = n.redirect || this.redirect,
                h = n.credentials || this.credentials,
                f = n.transferCache ?? this.transferCache,
                v = n.timeout ?? this.timeout,
                M = n.body !== void 0 ? n.body : this.body,
                F = n.withCredentials ?? this.withCredentials,
                T = n.reportProgress ?? this.reportProgress,
                H = n.headers || this.headers,
                re = n.params || this.params,
                ht = n.context ?? this.context;
            return (
                n.setHeaders !== void 0 &&
                    (H = Object.keys(n.setHeaders).reduce(
                        (_t, ze) => _t.set(ze, n.setHeaders[ze]),
                        H,
                    )),
                n.setParams &&
                    (re = Object.keys(n.setParams).reduce(
                        (_t, ze) => _t.set(ze, n.setParams[ze]),
                        re,
                    )),
                new t(e, i, M, {
                    params: re,
                    headers: H,
                    context: ht,
                    reportProgress: T,
                    responseType: r,
                    withCredentials: F,
                    transferCache: f,
                    keepalive: o,
                    cache: s,
                    priority: a,
                    timeout: v,
                    mode: c,
                    redirect: d,
                    credentials: h,
                })
            );
        }
    },
    En = (function (t) {
        return (
            (t[(t.Sent = 0)] = "Sent"),
            (t[(t.UploadProgress = 1)] = "UploadProgress"),
            (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
            (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
            (t[(t.Response = 4)] = "Response"),
            (t[(t.User = 5)] = "User"),
            t
        );
    })(En || {}),
    i1 = class {
        headers;
        status;
        statusText;
        url;
        ok;
        type;
        constructor(n, e = 200, i = "OK") {
            ((this.headers = n.headers || new ln()),
                (this.status = n.status !== void 0 ? n.status : e),
                (this.statusText = n.statusText || i),
                (this.url = n.url || null),
                (this.ok = this.status >= 200 && this.status < 300));
        }
    },
    kr = class t extends i1 {
        constructor(n = {}) {
            super(n);
        }
        type = En.ResponseHeader;
        clone(n = {}) {
            return new t({
                headers: n.headers || this.headers,
                status: n.status !== void 0 ? n.status : this.status,
                statusText: n.statusText || this.statusText,
                url: n.url || this.url || void 0,
            });
        }
    },
    ti = class t extends i1 {
        body;
        constructor(n = {}) {
            (super(n), (this.body = n.body !== void 0 ? n.body : null));
        }
        type = En.Response;
        clone(n = {}) {
            return new t({
                body: n.body !== void 0 ? n.body : this.body,
                headers: n.headers || this.headers,
                status: n.status !== void 0 ? n.status : this.status,
                statusText: n.statusText || this.statusText,
                url: n.url || this.url || void 0,
            });
        }
    },
    t1 = class extends i1 {
        name = "HttpErrorResponse";
        message;
        error;
        ok = !1;
        constructor(n) {
            (super(n, 0, "Unknown Error"),
                this.status >= 200 && this.status < 300
                    ? (this.message = `Http failure during parsing for ${n.url || "(unknown url)"}`)
                    : (this.message = `Http failure response for ${n.url || "(unknown url)"}: ${n.status} ${n.statusText}`),
                (this.error = n.error || null));
        }
    },
    kl = 200,
    El = 204;
function Na(t, n) {
    return {
        body: n,
        headers: t.headers,
        context: t.context,
        observe: t.observe,
        params: t.params,
        reportProgress: t.reportProgress,
        responseType: t.responseType,
        withCredentials: t.withCredentials,
        transferCache: t.transferCache,
        keepalive: t.keepalive,
        priority: t.priority,
        cache: t.cache,
        mode: t.mode,
        redirect: t.redirect,
    };
}
var r1 = (() => {
    class t {
        handler;
        constructor(e) {
            this.handler = e;
        }
        request(e, i, r = {}) {
            let o;
            if (e instanceof e1) o = e;
            else {
                let c;
                r.headers instanceof ln
                    ? (c = r.headers)
                    : (c = new ln(r.headers));
                let d;
                (r.params &&
                    (r.params instanceof Xt
                        ? (d = r.params)
                        : (d = new Xt({ fromObject: r.params }))),
                    (o = new e1(e, i, r.body !== void 0 ? r.body : null, {
                        headers: c,
                        context: r.context,
                        params: d,
                        reportProgress: r.reportProgress,
                        responseType: r.responseType || "json",
                        withCredentials: r.withCredentials,
                        transferCache: r.transferCache,
                        keepalive: r.keepalive,
                        priority: r.priority,
                        cache: r.cache,
                        mode: r.mode,
                        redirect: r.redirect,
                        credentials: r.credentials,
                    })));
            }
            let a = S(o).pipe(Gt((c) => this.handler.handle(c)));
            if (e instanceof e1 || r.observe === "events") return a;
            let s = a.pipe(J((c) => c instanceof ti));
            switch (r.observe || "body") {
                case "body":
                    switch (o.responseType) {
                        case "arraybuffer":
                            return s.pipe(
                                L((c) => {
                                    if (
                                        c.body !== null &&
                                        !(c.body instanceof ArrayBuffer)
                                    )
                                        throw new j(2806, !1);
                                    return c.body;
                                }),
                            );
                        case "blob":
                            return s.pipe(
                                L((c) => {
                                    if (
                                        c.body !== null &&
                                        !(c.body instanceof Blob)
                                    )
                                        throw new j(2807, !1);
                                    return c.body;
                                }),
                            );
                        case "text":
                            return s.pipe(
                                L((c) => {
                                    if (
                                        c.body !== null &&
                                        typeof c.body != "string"
                                    )
                                        throw new j(2808, !1);
                                    return c.body;
                                }),
                            );
                        case "json":
                        default:
                            return s.pipe(L((c) => c.body));
                    }
                case "response":
                    return s;
                default:
                    throw new j(2809, !1);
            }
        }
        delete(e, i = {}) {
            return this.request("DELETE", e, i);
        }
        get(e, i = {}) {
            return this.request("GET", e, i);
        }
        head(e, i = {}) {
            return this.request("HEAD", e, i);
        }
        jsonp(e, i) {
            return this.request("JSONP", e, {
                params: new Xt().append(i, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json",
            });
        }
        options(e, i = {}) {
            return this.request("OPTIONS", e, i);
        }
        patch(e, i, r = {}) {
            return this.request("PATCH", e, Na(r, i));
        }
        post(e, i, r = {}) {
            return this.request("POST", e, Na(r, i));
        }
        put(e, i, r = {}) {
            return this.request("PUT", e, Na(r, i));
        }
        static ɵfac = function (i) {
            return new (i || t)(x(n1));
        };
        static ɵprov = p({ token: t, factory: t.ɵfac });
    }
    return t;
})();
var Pl = new b("");
function Al(t, n) {
    return n(t);
}
function Vl(t, n, e) {
    return (i, r) => We(e, () => n(i, (o) => t(o, r)));
}
var U3 = new b(""),
    $3 = new b(""),
    W3 = new b("", { providedIn: "root", factory: () => !0 });
var Er = (() => {
    class t extends n1 {
        backend;
        injector;
        chain = null;
        pendingTasks = l(B1);
        contributeToStability = l(W3);
        constructor(e, i) {
            (super(), (this.backend = e), (this.injector = i));
        }
        handle(e) {
            if (this.chain === null) {
                let i = Array.from(
                    new Set([
                        ...this.injector.get(U3),
                        ...this.injector.get($3, []),
                    ]),
                );
                this.chain = i.reduceRight(
                    (r, o) => Vl(r, o, this.injector),
                    Al,
                );
            }
            if (this.contributeToStability) {
                let i = this.pendingTasks.add();
                return this.chain(e, (r) => this.backend.handle(r)).pipe(ft(i));
            } else return this.chain(e, (i) => this.backend.handle(i));
        }
        static ɵfac = function (i) {
            return new (i || t)(x(Pn), x(Ne));
        };
        static ɵprov = p({ token: t, factory: t.ɵfac });
    }
    return t;
})();
var Fl = /^\)\]\}',?\n/,
    Hl = RegExp(`^${Y3}:`, "m");
function Ol(t) {
    return "responseURL" in t && t.responseURL
        ? t.responseURL
        : Hl.test(t.getAllResponseHeaders())
          ? t.getResponseHeader(Y3)
          : null;
}
var Ya = (() => {
        class t {
            xhrFactory;
            constructor(e) {
                this.xhrFactory = e;
            }
            handle(e) {
                if (e.method === "JSONP") throw new j(-2800, !1);
                let i = this.xhrFactory;
                return S(null).pipe(
                    Pe(
                        () =>
                            new Xe((o) => {
                                let a = i.build();
                                if (
                                    (a.open(e.method, e.urlWithParams),
                                    e.withCredentials &&
                                        (a.withCredentials = !0),
                                    e.headers.forEach((H, re) =>
                                        a.setRequestHeader(H, re.join(",")),
                                    ),
                                    e.headers.has(N3) ||
                                        a.setRequestHeader(N3, Tl),
                                    !e.headers.has(L3))
                                ) {
                                    let H = e.detectContentTypeHeader();
                                    H !== null && a.setRequestHeader(L3, H);
                                }
                                if (
                                    (e.timeout && (a.timeout = e.timeout),
                                    e.responseType)
                                ) {
                                    let H = e.responseType.toLowerCase();
                                    a.responseType = H !== "json" ? H : "text";
                                }
                                let s = e.serializeBody(),
                                    c = null,
                                    d = () => {
                                        if (c !== null) return c;
                                        let H = a.statusText || "OK",
                                            re = new ln(
                                                a.getAllResponseHeaders(),
                                            ),
                                            ht = Ol(a) || e.url;
                                        return (
                                            (c = new kr({
                                                headers: re,
                                                status: a.status,
                                                statusText: H,
                                                url: ht,
                                            })),
                                            c
                                        );
                                    },
                                    h = () => {
                                        let {
                                                headers: H,
                                                status: re,
                                                statusText: ht,
                                                url: _t,
                                            } = d(),
                                            ze = null;
                                        (re !== El &&
                                            (ze =
                                                typeof a.response > "u"
                                                    ? a.responseText
                                                    : a.response),
                                            re === 0 && (re = ze ? kl : 0));
                                        let la = re >= 200 && re < 300;
                                        if (
                                            e.responseType === "json" &&
                                            typeof ze == "string"
                                        ) {
                                            let K0 = ze;
                                            ze = ze.replace(Fl, "");
                                            try {
                                                ze =
                                                    ze !== ""
                                                        ? JSON.parse(ze)
                                                        : null;
                                            } catch (Z0) {
                                                ((ze = K0),
                                                    la &&
                                                        ((la = !1),
                                                        (ze = {
                                                            error: Z0,
                                                            text: ze,
                                                        })));
                                            }
                                        }
                                        la
                                            ? (o.next(
                                                  new ti({
                                                      body: ze,
                                                      headers: H,
                                                      status: re,
                                                      statusText: ht,
                                                      url: _t || void 0,
                                                  }),
                                              ),
                                              o.complete())
                                            : o.error(
                                                  new t1({
                                                      error: ze,
                                                      headers: H,
                                                      status: re,
                                                      statusText: ht,
                                                      url: _t || void 0,
                                                  }),
                                              );
                                    },
                                    f = (H) => {
                                        let { url: re } = d(),
                                            ht = new t1({
                                                error: H,
                                                status: a.status || 0,
                                                statusText:
                                                    a.statusText ||
                                                    "Unknown Error",
                                                url: re || void 0,
                                            });
                                        o.error(ht);
                                    },
                                    v = f;
                                e.timeout &&
                                    (v = (H) => {
                                        let { url: re } = d(),
                                            ht = new t1({
                                                error: new DOMException(
                                                    "Request timed out",
                                                    "TimeoutError",
                                                ),
                                                status: a.status || 0,
                                                statusText:
                                                    a.statusText ||
                                                    "Request timeout",
                                                url: re || void 0,
                                            });
                                        o.error(ht);
                                    });
                                let M = !1,
                                    F = (H) => {
                                        M || (o.next(d()), (M = !0));
                                        let re = {
                                            type: En.DownloadProgress,
                                            loaded: H.loaded,
                                        };
                                        (H.lengthComputable &&
                                            (re.total = H.total),
                                            e.responseType === "text" &&
                                                a.responseText &&
                                                (re.partialText =
                                                    a.responseText),
                                            o.next(re));
                                    },
                                    T = (H) => {
                                        let re = {
                                            type: En.UploadProgress,
                                            loaded: H.loaded,
                                        };
                                        (H.lengthComputable &&
                                            (re.total = H.total),
                                            o.next(re));
                                    };
                                return (
                                    a.addEventListener("load", h),
                                    a.addEventListener("error", f),
                                    a.addEventListener("timeout", v),
                                    a.addEventListener("abort", f),
                                    e.reportProgress &&
                                        (a.addEventListener("progress", F),
                                        s !== null &&
                                            a.upload &&
                                            a.upload.addEventListener(
                                                "progress",
                                                T,
                                            )),
                                    a.send(s),
                                    o.next({ type: En.Sent }),
                                    () => {
                                        (a.removeEventListener("error", f),
                                            a.removeEventListener("abort", f),
                                            a.removeEventListener("load", h),
                                            a.removeEventListener("timeout", v),
                                            e.reportProgress &&
                                                (a.removeEventListener(
                                                    "progress",
                                                    F,
                                                ),
                                                s !== null &&
                                                    a.upload &&
                                                    a.upload.removeEventListener(
                                                        "progress",
                                                        T,
                                                    )),
                                            a.readyState !== a.DONE &&
                                                a.abort());
                                    }
                                );
                            }),
                    ),
                );
            }
            static ɵfac = function (i) {
                return new (i || t)(x(Tn));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    q3 = new b(""),
    Il = "XSRF-TOKEN",
    Rl = new b("", { providedIn: "root", factory: () => Il }),
    Ll = "X-XSRF-TOKEN",
    Nl = new b("", { providedIn: "root", factory: () => Ll }),
    ni = class {},
    Yl = (() => {
        class t {
            doc;
            cookieName;
            lastCookieString = "";
            lastToken = null;
            parseCount = 0;
            constructor(e, i) {
                ((this.doc = e), (this.cookieName = i));
            }
            getToken() {
                let e = this.doc.cookie || "";
                return (
                    e !== this.lastCookieString &&
                        (this.parseCount++,
                        (this.lastToken = Z1(e, this.cookieName)),
                        (this.lastCookieString = e)),
                    this.lastToken
                );
            }
            static ɵfac = function (i) {
                return new (i || t)(x(U), x(Rl));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })();
function Bl(t, n) {
    let e = t.url.toLowerCase();
    if (
        !l(q3) ||
        t.method === "GET" ||
        t.method === "HEAD" ||
        e.startsWith("http://") ||
        e.startsWith("https://")
    )
        return n(t);
    let i = l(ni).getToken(),
        r = l(Nl);
    return (
        i != null &&
            !t.headers.has(r) &&
            (t = t.clone({ headers: t.headers.set(r, i) })),
        n(t)
    );
}
function Ba(...t) {
    let n = [
        r1,
        Ya,
        Er,
        { provide: n1, useExisting: Er },
        { provide: Pn, useFactory: () => l(Pl, { optional: !0 }) ?? l(Ya) },
        { provide: U3, useValue: Bl, multi: !0 },
        { provide: q3, useValue: !0 },
        { provide: ni, useClass: Yl },
    ];
    for (let e of t) n.push(...e.ɵproviders);
    return $e(n);
}
var G3 = (() => {
    class t {
        _doc;
        constructor(e) {
            this._doc = e;
        }
        getTitle() {
            return this._doc.title;
        }
        setTitle(e) {
            this._doc.title = e || "";
        }
        static ɵfac = function (i) {
            return new (i || t)(x(U));
        };
        static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var ja = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: function (i) {
                    let r = null;
                    return (i ? (r = new (i || t)()) : (r = x(Wl)), r);
                },
                providedIn: "root",
            });
        }
        return t;
    })(),
    Wl = (() => {
        class t extends ja {
            _doc;
            constructor(e) {
                (super(), (this._doc = e));
            }
            sanitize(e, i) {
                if (i == null) return null;
                switch (e) {
                    case Zt.NONE:
                        return i;
                    case Zt.HTML:
                        return Gn(i, "HTML")
                            ? wn(i)
                            : e3(this._doc, String(i)).toString();
                    case Zt.STYLE:
                        return Gn(i, "Style") ? wn(i) : i;
                    case Zt.SCRIPT:
                        if (Gn(i, "Script")) return wn(i);
                        throw new j(5200, !1);
                    case Zt.URL:
                        return Gn(i, "URL") ? wn(i) : J2(String(i));
                    case Zt.RESOURCE_URL:
                        if (Gn(i, "ResourceURL")) return wn(i);
                        throw new j(5201, !1);
                    default:
                        throw new j(5202, !1);
                }
            }
            bypassSecurityTrustHtml(e) {
                return G2(e);
            }
            bypassSecurityTrustStyle(e) {
                return K2(e);
            }
            bypassSecurityTrustScript(e) {
                return Z2(e);
            }
            bypassSecurityTrustUrl(e) {
                return X2(e);
            }
            bypassSecurityTrustResourceUrl(e) {
                return Q2(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(x(U));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var $ = "primary",
    fi = Symbol("RouteTitle"),
    Ga = class {
        params;
        constructor(n) {
            this.params = n || {};
        }
        has(n) {
            return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
            if (this.has(n)) {
                let e = this.params[n];
                return Array.isArray(e) ? e[0] : e;
            }
            return null;
        }
        getAll(n) {
            if (this.has(n)) {
                let e = this.params[n];
                return Array.isArray(e) ? e : [e];
            }
            return [];
        }
        get keys() {
            return Object.keys(this.params);
        }
    };
function Fn(t) {
    return new Ga(t);
}
function ns(t, n, e) {
    let i = e.path.split("/");
    if (
        i.length > t.length ||
        (e.pathMatch === "full" && (n.hasChildren() || i.length < t.length))
    )
        return null;
    let r = {};
    for (let o = 0; o < i.length; o++) {
        let a = i[o],
            s = t[o];
        if (a[0] === ":") r[a.substring(1)] = s;
        else if (a !== s.path) return null;
    }
    return { consumed: t.slice(0, i.length), posParams: r };
}
function Gl(t, n) {
    if (t.length !== n.length) return !1;
    for (let e = 0; e < t.length; ++e) if (!Yt(t[e], n[e])) return !1;
    return !0;
}
function Yt(t, n) {
    let e = t ? Ka(t) : void 0,
        i = n ? Ka(n) : void 0;
    if (!e || !i || e.length != i.length) return !1;
    let r;
    for (let o = 0; o < e.length; o++)
        if (((r = e[o]), !is(t[r], n[r]))) return !1;
    return !0;
}
function Ka(t) {
    return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function is(t, n) {
    if (Array.isArray(t) && Array.isArray(n)) {
        if (t.length !== n.length) return !1;
        let e = [...t].sort(),
            i = [...n].sort();
        return e.every((r, o) => i[o] === r);
    } else return t === n;
}
function rs(t) {
    return t.length > 0 ? t[t.length - 1] : null;
}
function Qt(t) {
    return I1(t) ? t : $1(t) ? Ee(Promise.resolve(t)) : S(t);
}
var Kl = { exact: as, subset: ss },
    os = { exact: Zl, subset: Xl, ignored: () => !0 };
function K3(t, n, e) {
    return (
        Kl[e.paths](t.root, n.root, e.matrixParams) &&
        os[e.queryParams](t.queryParams, n.queryParams) &&
        !(e.fragment === "exact" && t.fragment !== n.fragment)
    );
}
function Zl(t, n) {
    return Yt(t, n);
}
function as(t, n, e) {
    if (
        !An(t.segments, n.segments) ||
        !Vr(t.segments, n.segments, e) ||
        t.numberOfChildren !== n.numberOfChildren
    )
        return !1;
    for (let i in n.children)
        if (!t.children[i] || !as(t.children[i], n.children[i], e)) return !1;
    return !0;
}
function Xl(t, n) {
    return (
        Object.keys(n).length <= Object.keys(t).length &&
        Object.keys(n).every((e) => is(t[e], n[e]))
    );
}
function ss(t, n, e) {
    return cs(t, n, n.segments, e);
}
function cs(t, n, e, i) {
    if (t.segments.length > e.length) {
        let r = t.segments.slice(0, e.length);
        return !(!An(r, e) || n.hasChildren() || !Vr(r, e, i));
    } else if (t.segments.length === e.length) {
        if (!An(t.segments, e) || !Vr(t.segments, e, i)) return !1;
        for (let r in n.children)
            if (!t.children[r] || !ss(t.children[r], n.children[r], i))
                return !1;
        return !0;
    } else {
        let r = e.slice(0, t.segments.length),
            o = e.slice(t.segments.length);
        return !An(t.segments, r) || !Vr(t.segments, r, i) || !t.children[$]
            ? !1
            : cs(t.children[$], n, o, i);
    }
}
function Vr(t, n, e) {
    return n.every((i, r) => os[e](t[r].parameters, i.parameters));
}
var jt = class {
        root;
        queryParams;
        fragment;
        _queryParamMap;
        constructor(n = new ie([], {}), e = {}, i = null) {
            ((this.root = n), (this.queryParams = e), (this.fragment = i));
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= Fn(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            return e5.serialize(this);
        }
    },
    ie = class {
        segments;
        children;
        parent = null;
        constructor(n, e) {
            ((this.segments = n),
                (this.children = e),
                Object.values(e).forEach((i) => (i.parent = this)));
        }
        hasChildren() {
            return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
            return Object.keys(this.children).length;
        }
        toString() {
            return Fr(this);
        }
    },
    dn = class {
        path;
        parameters;
        _parameterMap;
        constructor(n, e) {
            ((this.path = n), (this.parameters = e));
        }
        get parameterMap() {
            return (
                (this._parameterMap ??= Fn(this.parameters)),
                this._parameterMap
            );
        }
        toString() {
            return ds(this);
        }
    };
function Ql(t, n) {
    return An(t, n) && t.every((e, i) => Yt(e.parameters, n[i].parameters));
}
function An(t, n) {
    return t.length !== n.length ? !1 : t.every((e, i) => e.path === n[i].path);
}
function Jl(t, n) {
    let e = [];
    return (
        Object.entries(t.children).forEach(([i, r]) => {
            i === $ && (e = e.concat(n(r, i)));
        }),
        Object.entries(t.children).forEach(([i, r]) => {
            i !== $ && (e = e.concat(n(r, i)));
        }),
        e
    );
}
var Hn = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => new hn(),
                providedIn: "root",
            });
        }
        return t;
    })(),
    hn = class {
        parse(n) {
            let e = new Xa(n);
            return new jt(
                e.parseRootSegment(),
                e.parseQueryParams(),
                e.parseFragment(),
            );
        }
        serialize(n) {
            let e = `/${ii(n.root, !0)}`,
                i = i5(n.queryParams),
                r = typeof n.fragment == "string" ? `#${t5(n.fragment)}` : "";
            return `${e}${i}${r}`;
        }
    },
    e5 = new hn();
function Fr(t) {
    return t.segments.map((n) => ds(n)).join("/");
}
function ii(t, n) {
    if (!t.hasChildren()) return Fr(t);
    if (n) {
        let e = t.children[$] ? ii(t.children[$], !1) : "",
            i = [];
        return (
            Object.entries(t.children).forEach(([r, o]) => {
                r !== $ && i.push(`${r}:${ii(o, !1)}`);
            }),
            i.length > 0 ? `${e}(${i.join("//")})` : e
        );
    } else {
        let e = Jl(t, (i, r) =>
            r === $ ? [ii(t.children[$], !1)] : [`${r}:${ii(i, !1)}`],
        );
        return Object.keys(t.children).length === 1 && t.children[$] != null
            ? `${Fr(t)}/${e[0]}`
            : `${Fr(t)}/(${e.join("//")})`;
    }
}
function ls(t) {
    return encodeURIComponent(t)
        .replace(/%40/g, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",");
}
function Pr(t) {
    return ls(t).replace(/%3B/gi, ";");
}
function t5(t) {
    return encodeURI(t);
}
function Za(t) {
    return ls(t)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/%26/gi, "&");
}
function Hr(t) {
    return decodeURIComponent(t);
}
function Z3(t) {
    return Hr(t.replace(/\+/g, "%20"));
}
function ds(t) {
    return `${Za(t.path)}${n5(t.parameters)}`;
}
function n5(t) {
    return Object.entries(t)
        .map(([n, e]) => `;${Za(n)}=${Za(e)}`)
        .join("");
}
function i5(t) {
    let n = Object.entries(t)
        .map(([e, i]) =>
            Array.isArray(i)
                ? i.map((r) => `${Pr(e)}=${Pr(r)}`).join("&")
                : `${Pr(e)}=${Pr(i)}`,
        )
        .filter((e) => e);
    return n.length ? `?${n.join("&")}` : "";
}
var r5 = /^[^\/()?;#]+/;
function Ua(t) {
    let n = t.match(r5);
    return n ? n[0] : "";
}
var o5 = /^[^\/()?;=#]+/;
function a5(t) {
    let n = t.match(o5);
    return n ? n[0] : "";
}
var s5 = /^[^=?&#]+/;
function c5(t) {
    let n = t.match(s5);
    return n ? n[0] : "";
}
var l5 = /^[^&#]+/;
function d5(t) {
    let n = t.match(l5);
    return n ? n[0] : "";
}
var Xa = class {
    url;
    remaining;
    constructor(n) {
        ((this.url = n), (this.remaining = n));
    }
    parseRootSegment() {
        return (
            this.consumeOptional("/"),
            this.remaining === "" ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
                ? new ie([], {})
                : new ie([], this.parseChildren())
        );
    }
    parseQueryParams() {
        let n = {};
        if (this.consumeOptional("?"))
            do this.parseQueryParam(n);
            while (this.consumeOptional("&"));
        return n;
    }
    parseFragment() {
        return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
    }
    parseChildren() {
        if (this.remaining === "") return {};
        this.consumeOptional("/");
        let n = [];
        for (
            this.peekStartsWith("(") || n.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

        )
            (this.capture("/"), n.push(this.parseSegment()));
        let e = {};
        this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
        let i = {};
        return (
            this.peekStartsWith("(") && (i = this.parseParens(!1)),
            (n.length > 0 || Object.keys(e).length > 0) &&
                (i[$] = new ie(n, e)),
            i
        );
    }
    parseSegment() {
        let n = Ua(this.remaining);
        if (n === "" && this.peekStartsWith(";")) throw new j(4009, !1);
        return (this.capture(n), new dn(Hr(n), this.parseMatrixParams()));
    }
    parseMatrixParams() {
        let n = {};
        for (; this.consumeOptional(";"); ) this.parseParam(n);
        return n;
    }
    parseParam(n) {
        let e = a5(this.remaining);
        if (!e) return;
        this.capture(e);
        let i = "";
        if (this.consumeOptional("=")) {
            let r = Ua(this.remaining);
            r && ((i = r), this.capture(i));
        }
        n[Hr(e)] = Hr(i);
    }
    parseQueryParam(n) {
        let e = c5(this.remaining);
        if (!e) return;
        this.capture(e);
        let i = "";
        if (this.consumeOptional("=")) {
            let a = d5(this.remaining);
            a && ((i = a), this.capture(i));
        }
        let r = Z3(e),
            o = Z3(i);
        if (n.hasOwnProperty(r)) {
            let a = n[r];
            (Array.isArray(a) || ((a = [a]), (n[r] = a)), a.push(o));
        } else n[r] = o;
    }
    parseParens(n) {
        let e = {};
        for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

        ) {
            let i = Ua(this.remaining),
                r = this.remaining[i.length];
            if (r !== "/" && r !== ")" && r !== ";") throw new j(4010, !1);
            let o;
            i.indexOf(":") > -1
                ? ((o = i.slice(0, i.indexOf(":"))),
                  this.capture(o),
                  this.capture(":"))
                : n && (o = $);
            let a = this.parseChildren();
            ((e[o] = Object.keys(a).length === 1 ? a[$] : new ie([], a)),
                this.consumeOptional("//"));
        }
        return e;
    }
    peekStartsWith(n) {
        return this.remaining.startsWith(n);
    }
    consumeOptional(n) {
        return this.peekStartsWith(n)
            ? ((this.remaining = this.remaining.substring(n.length)), !0)
            : !1;
    }
    capture(n) {
        if (!this.consumeOptional(n)) throw new j(4011, !1);
    }
};
function hs(t) {
    return t.segments.length > 0 ? new ie([], { [$]: t }) : t;
}
function us(t) {
    let n = {};
    for (let [i, r] of Object.entries(t.children)) {
        let o = us(r);
        if (i === $ && o.segments.length === 0 && o.hasChildren())
            for (let [a, s] of Object.entries(o.children)) n[a] = s;
        else (o.segments.length > 0 || o.hasChildren()) && (n[i] = o);
    }
    let e = new ie(t.segments, n);
    return h5(e);
}
function h5(t) {
    if (t.numberOfChildren === 1 && t.children[$]) {
        let n = t.children[$];
        return new ie(t.segments.concat(n.segments), n.children);
    }
    return t;
}
function un(t) {
    return t instanceof jt;
}
function ms(t, n, e = null, i = null) {
    let r = ps(t);
    return fs(r, n, e, i);
}
function ps(t) {
    let n;
    function e(o) {
        let a = {};
        for (let c of o.children) {
            let d = e(c);
            a[c.outlet] = d;
        }
        let s = new ie(o.url, a);
        return (o === t && (n = s), s);
    }
    let i = e(t.root),
        r = hs(i);
    return n ?? r;
}
function fs(t, n, e, i) {
    let r = t;
    for (; r.parent; ) r = r.parent;
    if (n.length === 0) return $a(r, r, r, e, i);
    let o = u5(n);
    if (o.toRoot()) return $a(r, r, new ie([], {}), e, i);
    let a = m5(o, r, t),
        s = a.processChildren
            ? oi(a.segmentGroup, a.index, o.commands)
            : gs(a.segmentGroup, a.index, o.commands);
    return $a(r, a.segmentGroup, s, e, i);
}
function Or(t) {
    return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function si(t) {
    return typeof t == "object" && t != null && t.outlets;
}
function $a(t, n, e, i, r) {
    let o = {};
    i &&
        Object.entries(i).forEach(([c, d]) => {
            o[c] = Array.isArray(d) ? d.map((h) => `${h}`) : `${d}`;
        });
    let a;
    t === n ? (a = e) : (a = vs(t, n, e));
    let s = hs(us(a));
    return new jt(s, o, r);
}
function vs(t, n, e) {
    let i = {};
    return (
        Object.entries(t.children).forEach(([r, o]) => {
            o === n ? (i[r] = e) : (i[r] = vs(o, n, e));
        }),
        new ie(t.segments, i)
    );
}
var Ir = class {
    isAbsolute;
    numberOfDoubleDots;
    commands;
    constructor(n, e, i) {
        if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = e),
            (this.commands = i),
            n && i.length > 0 && Or(i[0]))
        )
            throw new j(4003, !1);
        let r = i.find(si);
        if (r && r !== rs(i)) throw new j(4004, !1);
    }
    toRoot() {
        return (
            this.isAbsolute &&
            this.commands.length === 1 &&
            this.commands[0] == "/"
        );
    }
};
function u5(t) {
    if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
        return new Ir(!0, 0, t);
    let n = 0,
        e = !1,
        i = t.reduce((r, o, a) => {
            if (typeof o == "object" && o != null) {
                if (o.outlets) {
                    let s = {};
                    return (
                        Object.entries(o.outlets).forEach(([c, d]) => {
                            s[c] = typeof d == "string" ? d.split("/") : d;
                        }),
                        [...r, { outlets: s }]
                    );
                }
                if (o.segmentPath) return [...r, o.segmentPath];
            }
            return typeof o != "string"
                ? [...r, o]
                : a === 0
                  ? (o.split("/").forEach((s, c) => {
                        (c == 0 && s === ".") ||
                            (c == 0 && s === ""
                                ? (e = !0)
                                : s === ".."
                                  ? n++
                                  : s != "" && r.push(s));
                    }),
                    r)
                  : [...r, o];
        }, []);
    return new Ir(e, n, i);
}
var s1 = class {
    segmentGroup;
    processChildren;
    index;
    constructor(n, e, i) {
        ((this.segmentGroup = n), (this.processChildren = e), (this.index = i));
    }
};
function m5(t, n, e) {
    if (t.isAbsolute) return new s1(n, !0, 0);
    if (!e) return new s1(n, !1, NaN);
    if (e.parent === null) return new s1(e, !0, 0);
    let i = Or(t.commands[0]) ? 0 : 1,
        r = e.segments.length - 1 + i;
    return p5(e, r, t.numberOfDoubleDots);
}
function p5(t, n, e) {
    let i = t,
        r = n,
        o = e;
    for (; o > r; ) {
        if (((o -= r), (i = i.parent), !i)) throw new j(4005, !1);
        r = i.segments.length;
    }
    return new s1(i, !1, r - o);
}
function f5(t) {
    return si(t[0]) ? t[0].outlets : { [$]: t };
}
function gs(t, n, e) {
    if (((t ??= new ie([], {})), t.segments.length === 0 && t.hasChildren()))
        return oi(t, n, e);
    let i = v5(t, n, e),
        r = e.slice(i.commandIndex);
    if (i.match && i.pathIndex < t.segments.length) {
        let o = new ie(t.segments.slice(0, i.pathIndex), {});
        return (
            (o.children[$] = new ie(t.segments.slice(i.pathIndex), t.children)),
            oi(o, 0, r)
        );
    } else
        return i.match && r.length === 0
            ? new ie(t.segments, {})
            : i.match && !t.hasChildren()
              ? Qa(t, n, e)
              : i.match
                ? oi(t, 0, r)
                : Qa(t, n, e);
}
function oi(t, n, e) {
    if (e.length === 0) return new ie(t.segments, {});
    {
        let i = f5(e),
            r = {};
        if (
            Object.keys(i).some((o) => o !== $) &&
            t.children[$] &&
            t.numberOfChildren === 1 &&
            t.children[$].segments.length === 0
        ) {
            let o = oi(t.children[$], n, e);
            return new ie(t.segments, o.children);
        }
        return (
            Object.entries(i).forEach(([o, a]) => {
                (typeof a == "string" && (a = [a]),
                    a !== null && (r[o] = gs(t.children[o], n, a)));
            }),
            Object.entries(t.children).forEach(([o, a]) => {
                i[o] === void 0 && (r[o] = a);
            }),
            new ie(t.segments, r)
        );
    }
}
function v5(t, n, e) {
    let i = 0,
        r = n,
        o = { match: !1, pathIndex: 0, commandIndex: 0 };
    for (; r < t.segments.length; ) {
        if (i >= e.length) return o;
        let a = t.segments[r],
            s = e[i];
        if (si(s)) break;
        let c = `${s}`,
            d = i < e.length - 1 ? e[i + 1] : null;
        if (r > 0 && c === void 0) break;
        if (c && d && typeof d == "object" && d.outlets === void 0) {
            if (!Q3(c, d, a)) return o;
            i += 2;
        } else {
            if (!Q3(c, {}, a)) return o;
            i++;
        }
        r++;
    }
    return { match: !0, pathIndex: r, commandIndex: i };
}
function Qa(t, n, e) {
    let i = t.segments.slice(0, n),
        r = 0;
    for (; r < e.length; ) {
        let o = e[r];
        if (si(o)) {
            let c = g5(o.outlets);
            return new ie(i, c);
        }
        if (r === 0 && Or(e[0])) {
            let c = t.segments[n];
            (i.push(new dn(c.path, X3(e[0]))), r++);
            continue;
        }
        let a = si(o) ? o.outlets[$] : `${o}`,
            s = r < e.length - 1 ? e[r + 1] : null;
        a && s && Or(s)
            ? (i.push(new dn(a, X3(s))), (r += 2))
            : (i.push(new dn(a, {})), r++);
    }
    return new ie(i, {});
}
function g5(t) {
    let n = {};
    return (
        Object.entries(t).forEach(([e, i]) => {
            (typeof i == "string" && (i = [i]),
                i !== null && (n[e] = Qa(new ie([], {}), 0, i)));
        }),
        n
    );
}
function X3(t) {
    let n = {};
    return (Object.entries(t).forEach(([e, i]) => (n[e] = `${i}`)), n);
}
function Q3(t, n, e) {
    return t == e.path && Yt(n, e.parameters);
}
var c1 = "imperative",
    De = (function (t) {
        return (
            (t[(t.NavigationStart = 0)] = "NavigationStart"),
            (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
            (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
            (t[(t.NavigationError = 3)] = "NavigationError"),
            (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
            (t[(t.ResolveStart = 5)] = "ResolveStart"),
            (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
            (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
            (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
            (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
            (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
            (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
            (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
            (t[(t.ActivationStart = 13)] = "ActivationStart"),
            (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
            (t[(t.Scroll = 15)] = "Scroll"),
            (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
            t
        );
    })(De || {}),
    rt = class {
        id;
        url;
        constructor(n, e) {
            ((this.id = n), (this.url = e));
        }
    },
    mn = class extends rt {
        type = De.NavigationStart;
        navigationTrigger;
        restoredState;
        constructor(n, e, i = "imperative", r = null) {
            (super(n, e),
                (this.navigationTrigger = i),
                (this.restoredState = r));
        }
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
    },
    ot = class extends rt {
        urlAfterRedirects;
        type = De.NavigationEnd;
        constructor(n, e, i) {
            (super(n, e), (this.urlAfterRedirects = i));
        }
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
    },
    Ue = (function (t) {
        return (
            (t[(t.Redirect = 0)] = "Redirect"),
            (t[(t.SupersededByNewNavigation = 1)] =
                "SupersededByNewNavigation"),
            (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
            (t[(t.GuardRejected = 3)] = "GuardRejected"),
            (t[(t.Aborted = 4)] = "Aborted"),
            t
        );
    })(Ue || {}),
    d1 = (function (t) {
        return (
            (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
            (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
                "IgnoredByUrlHandlingStrategy"),
            t
        );
    })(d1 || {}),
    Bt = class extends rt {
        reason;
        code;
        type = De.NavigationCancel;
        constructor(n, e, i, r) {
            (super(n, e), (this.reason = i), (this.code = r));
        }
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
    },
    Ut = class extends rt {
        reason;
        code;
        type = De.NavigationSkipped;
        constructor(n, e, i, r) {
            (super(n, e), (this.reason = i), (this.code = r));
        }
    },
    h1 = class extends rt {
        error;
        target;
        type = De.NavigationError;
        constructor(n, e, i, r) {
            (super(n, e), (this.error = i), (this.target = r));
        }
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
    },
    ci = class extends rt {
        urlAfterRedirects;
        state;
        type = De.RoutesRecognized;
        constructor(n, e, i, r) {
            (super(n, e), (this.urlAfterRedirects = i), (this.state = r));
        }
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Rr = class extends rt {
        urlAfterRedirects;
        state;
        type = De.GuardsCheckStart;
        constructor(n, e, i, r) {
            (super(n, e), (this.urlAfterRedirects = i), (this.state = r));
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Lr = class extends rt {
        urlAfterRedirects;
        state;
        shouldActivate;
        type = De.GuardsCheckEnd;
        constructor(n, e, i, r, o) {
            (super(n, e),
                (this.urlAfterRedirects = i),
                (this.state = r),
                (this.shouldActivate = o));
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
    },
    Nr = class extends rt {
        urlAfterRedirects;
        state;
        type = De.ResolveStart;
        constructor(n, e, i, r) {
            (super(n, e), (this.urlAfterRedirects = i), (this.state = r));
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Yr = class extends rt {
        urlAfterRedirects;
        state;
        type = De.ResolveEnd;
        constructor(n, e, i, r) {
            (super(n, e), (this.urlAfterRedirects = i), (this.state = r));
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Br = class {
        route;
        type = De.RouteConfigLoadStart;
        constructor(n) {
            this.route = n;
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
    },
    jr = class {
        route;
        type = De.RouteConfigLoadEnd;
        constructor(n) {
            this.route = n;
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
    },
    Ur = class {
        snapshot;
        type = De.ChildActivationStart;
        constructor(n) {
            this.snapshot = n;
        }
        toString() {
            return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
    },
    $r = class {
        snapshot;
        type = De.ChildActivationEnd;
        constructor(n) {
            this.snapshot = n;
        }
        toString() {
            return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
    },
    Wr = class {
        snapshot;
        type = De.ActivationStart;
        constructor(n) {
            this.snapshot = n;
        }
        toString() {
            return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
    },
    qr = class {
        snapshot;
        type = De.ActivationEnd;
        constructor(n) {
            this.snapshot = n;
        }
        toString() {
            return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
        }
    },
    u1 = class {
        routerEvent;
        position;
        anchor;
        type = De.Scroll;
        constructor(n, e, i) {
            ((this.routerEvent = n), (this.position = e), (this.anchor = i));
        }
        toString() {
            let n = this.position
                ? `${this.position[0]}, ${this.position[1]}`
                : null;
            return `Scroll(anchor: '${this.anchor}', position: '${n}')`;
        }
    },
    li = class {},
    m1 = class {
        url;
        navigationBehaviorOptions;
        constructor(n, e) {
            ((this.url = n), (this.navigationBehaviorOptions = e));
        }
    };
function y5(t) {
    return !(t instanceof li) && !(t instanceof m1);
}
function z5(t, n) {
    return (
        t.providers &&
            !t._injector &&
            (t._injector = cr(t.providers, n, `Route: ${t.path}`)),
        t._injector ?? n
    );
}
function Pt(t) {
    return t.outlet || $;
}
function C5(t, n) {
    let e = t.filter((i) => Pt(i) === n);
    return (e.push(...t.filter((i) => Pt(i) !== n)), e);
}
function v1(t) {
    if (!t) return null;
    if (t.routeConfig?._injector) return t.routeConfig._injector;
    for (let n = t.parent; n; n = n.parent) {
        let e = n.routeConfig;
        if (e?._loadedInjector) return e._loadedInjector;
        if (e?._injector) return e._injector;
    }
    return null;
}
var Gr = class {
        rootInjector;
        outlet = null;
        route = null;
        children;
        attachRef = null;
        get injector() {
            return v1(this.route?.snapshot) ?? this.rootInjector;
        }
        constructor(n) {
            ((this.rootInjector = n),
                (this.children = new On(this.rootInjector)));
        }
    },
    On = (() => {
        class t {
            rootInjector;
            contexts = new Map();
            constructor(e) {
                this.rootInjector = e;
            }
            onChildOutletCreated(e, i) {
                let r = this.getOrCreateContext(e);
                ((r.outlet = i), this.contexts.set(e, r));
            }
            onChildOutletDestroyed(e) {
                let i = this.getContext(e);
                i && ((i.outlet = null), (i.attachRef = null));
            }
            onOutletDeactivated() {
                let e = this.contexts;
                return ((this.contexts = new Map()), e);
            }
            onOutletReAttached(e) {
                this.contexts = e;
            }
            getOrCreateContext(e) {
                let i = this.getContext(e);
                return (
                    i ||
                        ((i = new Gr(this.rootInjector)),
                        this.contexts.set(e, i)),
                    i
                );
            }
            getContext(e) {
                return this.contexts.get(e) || null;
            }
            static ɵfac = function (i) {
                return new (i || t)(x(Ne));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Kr = class {
        _root;
        constructor(n) {
            this._root = n;
        }
        get root() {
            return this._root.value;
        }
        parent(n) {
            let e = this.pathFromRoot(n);
            return e.length > 1 ? e[e.length - 2] : null;
        }
        children(n) {
            let e = Ja(n, this._root);
            return e ? e.children.map((i) => i.value) : [];
        }
        firstChild(n) {
            let e = Ja(n, this._root);
            return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(n) {
            let e = e4(n, this._root);
            return e.length < 2
                ? []
                : e[e.length - 2].children
                      .map((r) => r.value)
                      .filter((r) => r !== n);
        }
        pathFromRoot(n) {
            return e4(n, this._root).map((e) => e.value);
        }
    };
function Ja(t, n) {
    if (t === n.value) return n;
    for (let e of n.children) {
        let i = Ja(t, e);
        if (i) return i;
    }
    return null;
}
function e4(t, n) {
    if (t === n.value) return [n];
    for (let e of n.children) {
        let i = e4(t, e);
        if (i.length) return (i.unshift(n), i);
    }
    return [];
}
var it = class {
    value;
    children;
    constructor(n, e) {
        ((this.value = n), (this.children = e));
    }
    toString() {
        return `TreeNode(${this.value})`;
    }
};
function a1(t) {
    let n = {};
    return (t && t.children.forEach((e) => (n[e.value.outlet] = e)), n);
}
var di = class extends Kr {
    snapshot;
    constructor(n, e) {
        (super(n), (this.snapshot = e), c4(this, n));
    }
    toString() {
        return this.snapshot.toString();
    }
};
function ys(t) {
    let n = b5(t),
        e = new Te([new dn("", {})]),
        i = new Te({}),
        r = new Te({}),
        o = new Te({}),
        a = new Te(""),
        s = new $t(e, i, o, a, r, $, t, n.root);
    return ((s.snapshot = n.root), new di(new it(s, []), n));
}
function b5(t) {
    let n = {},
        e = {},
        i = {},
        r = "",
        o = new Vn([], n, i, r, e, $, t, null, {});
    return new hi("", new it(o, []));
}
var $t = class {
    urlSubject;
    paramsSubject;
    queryParamsSubject;
    fragmentSubject;
    dataSubject;
    outlet;
    component;
    snapshot;
    _futureSnapshot;
    _routerState;
    _paramMap;
    _queryParamMap;
    title;
    url;
    params;
    queryParams;
    fragment;
    data;
    constructor(n, e, i, r, o, a, s, c) {
        ((this.urlSubject = n),
            (this.paramsSubject = e),
            (this.queryParamsSubject = i),
            (this.fragmentSubject = r),
            (this.dataSubject = o),
            (this.outlet = a),
            (this.component = s),
            (this._futureSnapshot = c),
            (this.title = this.dataSubject?.pipe(L((d) => d[fi])) ?? S(void 0)),
            (this.url = n),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o));
    }
    get routeConfig() {
        return this._futureSnapshot.routeConfig;
    }
    get root() {
        return this._routerState.root;
    }
    get parent() {
        return this._routerState.parent(this);
    }
    get firstChild() {
        return this._routerState.firstChild(this);
    }
    get children() {
        return this._routerState.children(this);
    }
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
        return (
            (this._paramMap ??= this.params.pipe(L((n) => Fn(n)))),
            this._paramMap
        );
    }
    get queryParamMap() {
        return (
            (this._queryParamMap ??= this.queryParams.pipe(L((n) => Fn(n)))),
            this._queryParamMap
        );
    }
    toString() {
        return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
    }
};
function Zr(t, n, e = "emptyOnly") {
    let i,
        { routeConfig: r } = t;
    return (
        n !== null &&
        (e === "always" ||
            r?.path === "" ||
            (!n.component && !n.routeConfig?.loadComponent))
            ? (i = {
                  params: m(m({}, n.params), t.params),
                  data: m(m({}, n.data), t.data),
                  resolve: m(
                      m(m(m({}, t.data), n.data), r?.data),
                      t._resolvedData,
                  ),
              })
            : (i = {
                  params: m({}, t.params),
                  data: m({}, t.data),
                  resolve: m(m({}, t.data), t._resolvedData ?? {}),
              }),
        r && Cs(r) && (i.resolve[fi] = r.title),
        i
    );
}
var Vn = class {
        url;
        params;
        queryParams;
        fragment;
        data;
        outlet;
        component;
        routeConfig;
        _resolve;
        _resolvedData;
        _routerState;
        _paramMap;
        _queryParamMap;
        get title() {
            return this.data?.[fi];
        }
        constructor(n, e, i, r, o, a, s, c, d) {
            ((this.url = n),
                (this.params = e),
                (this.queryParams = i),
                (this.fragment = r),
                (this.data = o),
                (this.outlet = a),
                (this.component = s),
                (this.routeConfig = c),
                (this._resolve = d));
        }
        get root() {
            return this._routerState.root;
        }
        get parent() {
            return this._routerState.parent(this);
        }
        get firstChild() {
            return this._routerState.firstChild(this);
        }
        get children() {
            return this._routerState.children(this);
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
            return ((this._paramMap ??= Fn(this.params)), this._paramMap);
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= Fn(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            let n = this.url.map((i) => i.toString()).join("/"),
                e = this.routeConfig ? this.routeConfig.path : "";
            return `Route(url:'${n}', path:'${e}')`;
        }
    },
    hi = class extends Kr {
        url;
        constructor(n, e) {
            (super(e), (this.url = n), c4(this, e));
        }
        toString() {
            return zs(this._root);
        }
    };
function c4(t, n) {
    ((n.value._routerState = t), n.children.forEach((e) => c4(t, e)));
}
function zs(t) {
    let n =
        t.children.length > 0 ? ` { ${t.children.map(zs).join(", ")} } ` : "";
    return `${t.value}${n}`;
}
function Wa(t) {
    if (t.snapshot) {
        let n = t.snapshot,
            e = t._futureSnapshot;
        ((t.snapshot = e),
            Yt(n.queryParams, e.queryParams) ||
                t.queryParamsSubject.next(e.queryParams),
            n.fragment !== e.fragment && t.fragmentSubject.next(e.fragment),
            Yt(n.params, e.params) || t.paramsSubject.next(e.params),
            Gl(n.url, e.url) || t.urlSubject.next(e.url),
            Yt(n.data, e.data) || t.dataSubject.next(e.data));
    } else
        ((t.snapshot = t._futureSnapshot),
            t.dataSubject.next(t._futureSnapshot.data));
}
function t4(t, n) {
    let e = Yt(t.params, n.params) && Ql(t.url, n.url),
        i = !t.parent != !n.parent;
    return e && !i && (!t.parent || t4(t.parent, n.parent));
}
function Cs(t) {
    return typeof t.title == "string" || t.title === null;
}
var bs = new b(""),
    In = (() => {
        class t {
            activated = null;
            get activatedComponentRef() {
                return this.activated;
            }
            _activatedRoute = null;
            name = $;
            activateEvents = new X();
            deactivateEvents = new X();
            attachEvents = new X();
            detachEvents = new X();
            routerOutletData = Xn(void 0);
            parentContexts = l(On);
            location = l(qe);
            changeDetector = l(ee);
            inputBinder = l(vi, { optional: !0 });
            supportsBindingToComponentInputs = !0;
            ngOnChanges(e) {
                if (e.name) {
                    let { firstChange: i, previousValue: r } = e.name;
                    if (i) return;
                    (this.isTrackedInParentContexts(r) &&
                        (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(r)),
                        this.initializeOutletWithName());
                }
            }
            ngOnDestroy() {
                (this.isTrackedInParentContexts(this.name) &&
                    this.parentContexts.onChildOutletDestroyed(this.name),
                    this.inputBinder?.unsubscribeFromRouteData(this));
            }
            isTrackedInParentContexts(e) {
                return this.parentContexts.getContext(e)?.outlet === this;
            }
            ngOnInit() {
                this.initializeOutletWithName();
            }
            initializeOutletWithName() {
                if (
                    (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                )
                    return;
                let e = this.parentContexts.getContext(this.name);
                e?.route &&
                    (e.attachRef
                        ? this.attach(e.attachRef, e.route)
                        : this.activateWith(e.route, e.injector));
            }
            get isActivated() {
                return !!this.activated;
            }
            get component() {
                if (!this.activated) throw new j(4012, !1);
                return this.activated.instance;
            }
            get activatedRoute() {
                if (!this.activated) throw new j(4012, !1);
                return this._activatedRoute;
            }
            get activatedRouteData() {
                return this._activatedRoute
                    ? this._activatedRoute.snapshot.data
                    : {};
            }
            detach() {
                if (!this.activated) throw new j(4012, !1);
                this.location.detach();
                let e = this.activated;
                return (
                    (this.activated = null),
                    (this._activatedRoute = null),
                    this.detachEvents.emit(e.instance),
                    e
                );
            }
            attach(e, i) {
                ((this.activated = e),
                    (this._activatedRoute = i),
                    this.location.insert(e.hostView),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.attachEvents.emit(e.instance));
            }
            deactivate() {
                if (this.activated) {
                    let e = this.component;
                    (this.activated.destroy(),
                        (this.activated = null),
                        (this._activatedRoute = null),
                        this.deactivateEvents.emit(e));
                }
            }
            activateWith(e, i) {
                if (this.isActivated) throw new j(4013, !1);
                this._activatedRoute = e;
                let r = this.location,
                    a = e.snapshot.component,
                    s = this.parentContexts.getOrCreateContext(
                        this.name,
                    ).children,
                    c = new n4(e, s, r.injector, this.routerOutletData);
                ((this.activated = r.createComponent(a, {
                    index: r.length,
                    injector: c,
                    environmentInjector: i,
                })),
                    this.changeDetector.markForCheck(),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.activateEvents.emit(this.activated.instance));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [["router-outlet"]],
                inputs: {
                    name: "name",
                    routerOutletData: [1, "routerOutletData"],
                },
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach",
                },
                exportAs: ["outlet"],
                features: [I],
            });
        }
        return t;
    })(),
    n4 = class {
        route;
        childContexts;
        parent;
        outletData;
        constructor(n, e, i, r) {
            ((this.route = n),
                (this.childContexts = e),
                (this.parent = i),
                (this.outletData = r));
        }
        get(n, e) {
            return n === $t
                ? this.route
                : n === On
                  ? this.childContexts
                  : n === bs
                    ? this.outletData
                    : this.parent.get(n, e);
        }
    },
    vi = new b(""),
    l4 = (() => {
        class t {
            outletDataSubscriptions = new Map();
            bindActivatedRouteToOutletComponent(e) {
                (this.unsubscribeFromRouteData(e),
                    this.subscribeToRouteData(e));
            }
            unsubscribeFromRouteData(e) {
                (this.outletDataSubscriptions.get(e)?.unsubscribe(),
                    this.outletDataSubscriptions.delete(e));
            }
            subscribeToRouteData(e) {
                let { activatedRoute: i } = e,
                    r = or([i.queryParams, i.params, i.data])
                        .pipe(
                            Pe(
                                ([o, a, s], c) => (
                                    (s = m(m(m({}, o), a), s)),
                                    c === 0 ? S(s) : Promise.resolve(s)
                                ),
                            ),
                        )
                        .subscribe((o) => {
                            if (
                                !e.isActivated ||
                                !e.activatedComponentRef ||
                                e.activatedRoute !== i ||
                                i.component === null
                            ) {
                                this.unsubscribeFromRouteData(e);
                                return;
                            }
                            let a = p3(i.component);
                            if (!a) {
                                this.unsubscribeFromRouteData(e);
                                return;
                            }
                            for (let { templateName: s } of a.inputs)
                                e.activatedComponentRef.setInput(s, o[s]);
                        });
                this.outletDataSubscriptions.set(e, r);
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    d4 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["ng-component"]],
                exportAs: ["emptyRouterOutlet"],
                decls: 1,
                vars: 0,
                template: function (i, r) {
                    i & 1 && W(0, "router-outlet");
                },
                dependencies: [In],
                encapsulation: 2,
            });
        }
        return t;
    })();
function h4(t) {
    let n = t.children && t.children.map(h4),
        e = n ? Z(m({}, t), { children: n }) : m({}, t);
    return (
        !e.component &&
            !e.loadComponent &&
            (n || e.loadChildren) &&
            e.outlet &&
            e.outlet !== $ &&
            (e.component = d4),
        e
    );
}
function _5(t, n, e) {
    let i = ui(t, n._root, e ? e._root : void 0);
    return new di(i, n);
}
function ui(t, n, e) {
    if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
        let i = e.value;
        i._futureSnapshot = n.value;
        let r = w5(t, n, e);
        return new it(i, r);
    } else {
        if (t.shouldAttach(n.value)) {
            let o = t.retrieve(n.value);
            if (o !== null) {
                let a = o.route;
                return (
                    (a.value._futureSnapshot = n.value),
                    (a.children = n.children.map((s) => ui(t, s))),
                    a
                );
            }
        }
        let i = M5(n.value),
            r = n.children.map((o) => ui(t, o));
        return new it(i, r);
    }
}
function w5(t, n, e) {
    return n.children.map((i) => {
        for (let r of e.children)
            if (t.shouldReuseRoute(i.value, r.value.snapshot))
                return ui(t, i, r);
        return ui(t, i);
    });
}
function M5(t) {
    return new $t(
        new Te(t.url),
        new Te(t.params),
        new Te(t.queryParams),
        new Te(t.fragment),
        new Te(t.data),
        t.outlet,
        t.component,
        t,
    );
}
var p1 = class {
        redirectTo;
        navigationBehaviorOptions;
        constructor(n, e) {
            ((this.redirectTo = n), (this.navigationBehaviorOptions = e));
        }
    },
    _s = "ngNavigationCancelingError";
function Xr(t, n) {
    let { redirectTo: e, navigationBehaviorOptions: i } = un(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
        r = ws(!1, Ue.Redirect);
    return ((r.url = e), (r.navigationBehaviorOptions = i), r);
}
function ws(t, n) {
    let e = new Error(`NavigationCancelingError: ${t || ""}`);
    return ((e[_s] = !0), (e.cancellationCode = n), e);
}
function S5(t) {
    return Ms(t) && un(t.url);
}
function Ms(t) {
    return !!t && t[_s];
}
var D5 = (t, n, e, i) =>
        L(
            (r) => (
                new i4(
                    n,
                    r.targetRouterState,
                    r.currentRouterState,
                    e,
                    i,
                ).activate(t),
                r
            ),
        ),
    i4 = class {
        routeReuseStrategy;
        futureState;
        currState;
        forwardEvent;
        inputBindingEnabled;
        constructor(n, e, i, r, o) {
            ((this.routeReuseStrategy = n),
                (this.futureState = e),
                (this.currState = i),
                (this.forwardEvent = r),
                (this.inputBindingEnabled = o));
        }
        activate(n) {
            let e = this.futureState._root,
                i = this.currState ? this.currState._root : null;
            (this.deactivateChildRoutes(e, i, n),
                Wa(this.futureState.root),
                this.activateChildRoutes(e, i, n));
        }
        deactivateChildRoutes(n, e, i) {
            let r = a1(e);
            (n.children.forEach((o) => {
                let a = o.value.outlet;
                (this.deactivateRoutes(o, r[a], i), delete r[a]);
            }),
                Object.values(r).forEach((o) => {
                    this.deactivateRouteAndItsChildren(o, i);
                }));
        }
        deactivateRoutes(n, e, i) {
            let r = n.value,
                o = e ? e.value : null;
            if (r === o)
                if (r.component) {
                    let a = i.getContext(r.outlet);
                    a && this.deactivateChildRoutes(n, e, a.children);
                } else this.deactivateChildRoutes(n, e, i);
            else o && this.deactivateRouteAndItsChildren(e, i);
        }
        deactivateRouteAndItsChildren(n, e) {
            n.value.component &&
            this.routeReuseStrategy.shouldDetach(n.value.snapshot)
                ? this.detachAndStoreRouteSubtree(n, e)
                : this.deactivateRouteAndOutlet(n, e);
        }
        detachAndStoreRouteSubtree(n, e) {
            let i = e.getContext(n.value.outlet),
                r = i && n.value.component ? i.children : e,
                o = a1(n);
            for (let a of Object.values(o))
                this.deactivateRouteAndItsChildren(a, r);
            if (i && i.outlet) {
                let a = i.outlet.detach(),
                    s = i.children.onOutletDeactivated();
                this.routeReuseStrategy.store(n.value.snapshot, {
                    componentRef: a,
                    route: n,
                    contexts: s,
                });
            }
        }
        deactivateRouteAndOutlet(n, e) {
            let i = e.getContext(n.value.outlet),
                r = i && n.value.component ? i.children : e,
                o = a1(n);
            for (let a of Object.values(o))
                this.deactivateRouteAndItsChildren(a, r);
            i &&
                (i.outlet &&
                    (i.outlet.deactivate(), i.children.onOutletDeactivated()),
                (i.attachRef = null),
                (i.route = null));
        }
        activateChildRoutes(n, e, i) {
            let r = a1(e);
            (n.children.forEach((o) => {
                (this.activateRoutes(o, r[o.value.outlet], i),
                    this.forwardEvent(new qr(o.value.snapshot)));
            }),
                n.children.length &&
                    this.forwardEvent(new $r(n.value.snapshot)));
        }
        activateRoutes(n, e, i) {
            let r = n.value,
                o = e ? e.value : null;
            if ((Wa(r), r === o))
                if (r.component) {
                    let a = i.getOrCreateContext(r.outlet);
                    this.activateChildRoutes(n, e, a.children);
                } else this.activateChildRoutes(n, e, i);
            else if (r.component) {
                let a = i.getOrCreateContext(r.outlet);
                if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                    let s = this.routeReuseStrategy.retrieve(r.snapshot);
                    (this.routeReuseStrategy.store(r.snapshot, null),
                        a.children.onOutletReAttached(s.contexts),
                        (a.attachRef = s.componentRef),
                        (a.route = s.route.value),
                        a.outlet &&
                            a.outlet.attach(s.componentRef, s.route.value),
                        Wa(s.route.value),
                        this.activateChildRoutes(n, null, a.children));
                } else
                    ((a.attachRef = null),
                        (a.route = r),
                        a.outlet && a.outlet.activateWith(r, a.injector),
                        this.activateChildRoutes(n, null, a.children));
            } else this.activateChildRoutes(n, null, i);
        }
    },
    Qr = class {
        path;
        route;
        constructor(n) {
            ((this.path = n), (this.route = this.path[this.path.length - 1]));
        }
    },
    l1 = class {
        component;
        route;
        constructor(n, e) {
            ((this.component = n), (this.route = e));
        }
    };
function x5(t, n, e) {
    let i = t._root,
        r = n ? n._root : null;
    return ri(i, r, e, [i.value]);
}
function T5(t) {
    let n = t.routeConfig ? t.routeConfig.canActivateChild : null;
    return !n || n.length === 0 ? null : { node: t, guards: n };
}
function g1(t, n) {
    let e = Symbol(),
        i = n.get(t, e);
    return i === e ? (typeof t == "function" && !Y2(t) ? t : n.get(t)) : i;
}
function ri(
    t,
    n,
    e,
    i,
    r = { canDeactivateChecks: [], canActivateChecks: [] },
) {
    let o = a1(n);
    return (
        t.children.forEach((a) => {
            (k5(a, o[a.value.outlet], e, i.concat([a.value]), r),
                delete o[a.value.outlet]);
        }),
        Object.entries(o).forEach(([a, s]) => ai(s, e.getContext(a), r)),
        r
    );
}
function k5(
    t,
    n,
    e,
    i,
    r = { canDeactivateChecks: [], canActivateChecks: [] },
) {
    let o = t.value,
        a = n ? n.value : null,
        s = e ? e.getContext(t.value.outlet) : null;
    if (a && o.routeConfig === a.routeConfig) {
        let c = E5(a, o, o.routeConfig.runGuardsAndResolvers);
        (c
            ? r.canActivateChecks.push(new Qr(i))
            : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
            o.component
                ? ri(t, n, s ? s.children : null, i, r)
                : ri(t, n, e, i, r),
            c &&
                s &&
                s.outlet &&
                s.outlet.isActivated &&
                r.canDeactivateChecks.push(new l1(s.outlet.component, a)));
    } else
        (a && ai(n, s, r),
            r.canActivateChecks.push(new Qr(i)),
            o.component
                ? ri(t, null, s ? s.children : null, i, r)
                : ri(t, null, e, i, r));
    return r;
}
function E5(t, n, e) {
    if (typeof e == "function") return e(t, n);
    switch (e) {
        case "pathParamsChange":
            return !An(t.url, n.url);
        case "pathParamsOrQueryParamsChange":
            return !An(t.url, n.url) || !Yt(t.queryParams, n.queryParams);
        case "always":
            return !0;
        case "paramsOrQueryParamsChange":
            return !t4(t, n) || !Yt(t.queryParams, n.queryParams);
        case "paramsChange":
        default:
            return !t4(t, n);
    }
}
function ai(t, n, e) {
    let i = a1(t),
        r = t.value;
    (Object.entries(i).forEach(([o, a]) => {
        r.component
            ? n
                ? ai(a, n.children.getContext(o), e)
                : ai(a, null, e)
            : ai(a, n, e);
    }),
        r.component
            ? n && n.outlet && n.outlet.isActivated
                ? e.canDeactivateChecks.push(new l1(n.outlet.component, r))
                : e.canDeactivateChecks.push(new l1(null, r))
            : e.canDeactivateChecks.push(new l1(null, r)));
}
function gi(t) {
    return typeof t == "function";
}
function P5(t) {
    return typeof t == "boolean";
}
function A5(t) {
    return t && gi(t.canLoad);
}
function V5(t) {
    return t && gi(t.canActivate);
}
function F5(t) {
    return t && gi(t.canActivateChild);
}
function H5(t) {
    return t && gi(t.canDeactivate);
}
function O5(t) {
    return t && gi(t.canMatch);
}
function Ss(t) {
    return t instanceof k2 || t?.name === "EmptyError";
}
var Ar = Symbol("INITIAL_VALUE");
function f1() {
    return Pe((t) =>
        or(t.map((n) => n.pipe(nn(1), vt(Ar)))).pipe(
            L((n) => {
                for (let e of n)
                    if (e !== !0) {
                        if (e === Ar) return Ar;
                        if (e === !1 || I5(e)) return e;
                    }
                return !0;
            }),
            J((n) => n !== Ar),
            nn(1),
        ),
    );
}
function I5(t) {
    return un(t) || t instanceof p1;
}
function R5(t, n) {
    return Ie((e) => {
        let {
            targetSnapshot: i,
            currentSnapshot: r,
            guards: { canActivateChecks: o, canDeactivateChecks: a },
        } = e;
        return a.length === 0 && o.length === 0
            ? S(Z(m({}, e), { guardsResult: !0 }))
            : L5(a, i, r, t).pipe(
                  Ie((s) => (s && P5(s) ? N5(i, o, t, n) : S(s))),
                  L((s) => Z(m({}, e), { guardsResult: s })),
              );
    });
}
function L5(t, n, e, i) {
    return Ee(t).pipe(
        Ie((r) => $5(r.component, r.route, e, n, i)),
        rn((r) => r !== !0, !0),
    );
}
function N5(t, n, e, i) {
    return Ee(n).pipe(
        Gt((r) =>
            E2(
                B5(r.route.parent, i),
                Y5(r.route, i),
                U5(t, r.path, e),
                j5(t, r.route, e),
            ),
        ),
        rn((r) => r !== !0, !0),
    );
}
function Y5(t, n) {
    return (t !== null && n && n(new Wr(t)), S(!0));
}
function B5(t, n) {
    return (t !== null && n && n(new Ur(t)), S(!0));
}
function j5(t, n, e) {
    let i = n.routeConfig ? n.routeConfig.canActivate : null;
    if (!i || i.length === 0) return S(!0);
    let r = i.map((o) =>
        ar(() => {
            let a = v1(n) ?? e,
                s = g1(o, a),
                c = V5(s) ? s.canActivate(n, t) : We(a, () => s(n, t));
            return Qt(c).pipe(rn());
        }),
    );
    return S(r).pipe(f1());
}
function U5(t, n, e) {
    let i = n[n.length - 1],
        o = n
            .slice(0, n.length - 1)
            .reverse()
            .map((a) => T5(a))
            .filter((a) => a !== null)
            .map((a) =>
                ar(() => {
                    let s = a.guards.map((c) => {
                        let d = v1(a.node) ?? e,
                            h = g1(c, d),
                            f = F5(h)
                                ? h.canActivateChild(i, t)
                                : We(d, () => h(i, t));
                        return Qt(f).pipe(rn());
                    });
                    return S(s).pipe(f1());
                }),
            );
    return S(o).pipe(f1());
}
function $5(t, n, e, i, r) {
    let o = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
    if (!o || o.length === 0) return S(!0);
    let a = o.map((s) => {
        let c = v1(n) ?? r,
            d = g1(s, c),
            h = H5(d)
                ? d.canDeactivate(t, n, e, i)
                : We(c, () => d(t, n, e, i));
        return Qt(h).pipe(rn());
    });
    return S(a).pipe(f1());
}
function W5(t, n, e, i) {
    let r = n.canLoad;
    if (r === void 0 || r.length === 0) return S(!0);
    let o = r.map((a) => {
        let s = g1(a, t),
            c = A5(s) ? s.canLoad(n, e) : We(t, () => s(n, e));
        return Qt(c);
    });
    return S(o).pipe(f1(), Ds(i));
}
function Ds(t) {
    return T2(
        me((n) => {
            if (typeof n != "boolean") throw Xr(t, n);
        }),
        L((n) => n === !0),
    );
}
function q5(t, n, e, i) {
    let r = n.canMatch;
    if (!r || r.length === 0) return S(!0);
    let o = r.map((a) => {
        let s = g1(a, t),
            c = O5(s) ? s.canMatch(n, e) : We(t, () => s(n, e));
        return Qt(c);
    });
    return S(o).pipe(f1(), Ds(i));
}
var mi = class {
        segmentGroup;
        constructor(n) {
            this.segmentGroup = n || null;
        }
    },
    pi = class extends Error {
        urlTree;
        constructor(n) {
            (super(), (this.urlTree = n));
        }
    };
function o1(t) {
    return O1(new mi(t));
}
function G5(t) {
    return O1(new j(4e3, !1));
}
function K5(t) {
    return O1(ws(!1, Ue.GuardRejected));
}
var r4 = class {
    urlSerializer;
    urlTree;
    constructor(n, e) {
        ((this.urlSerializer = n), (this.urlTree = e));
    }
    lineralizeSegments(n, e) {
        let i = [],
            r = e.root;
        for (;;) {
            if (((i = i.concat(r.segments)), r.numberOfChildren === 0))
                return S(i);
            if (r.numberOfChildren > 1 || !r.children[$])
                return G5(`${n.redirectTo}`);
            r = r.children[$];
        }
    }
    applyRedirectCommands(n, e, i, r, o) {
        return Z5(e, r, o).pipe(
            L((a) => {
                if (a instanceof jt) throw new pi(a);
                let s = this.applyRedirectCreateUrlTree(
                    a,
                    this.urlSerializer.parse(a),
                    n,
                    i,
                );
                if (a[0] === "/") throw new pi(s);
                return s;
            }),
        );
    }
    applyRedirectCreateUrlTree(n, e, i, r) {
        let o = this.createSegmentGroup(n, e.root, i, r);
        return new jt(
            o,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment,
        );
    }
    createQueryParams(n, e) {
        let i = {};
        return (
            Object.entries(n).forEach(([r, o]) => {
                if (typeof o == "string" && o[0] === ":") {
                    let s = o.substring(1);
                    i[r] = e[s];
                } else i[r] = o;
            }),
            i
        );
    }
    createSegmentGroup(n, e, i, r) {
        let o = this.createSegments(n, e.segments, i, r),
            a = {};
        return (
            Object.entries(e.children).forEach(([s, c]) => {
                a[s] = this.createSegmentGroup(n, c, i, r);
            }),
            new ie(o, a)
        );
    }
    createSegments(n, e, i, r) {
        return e.map((o) =>
            o.path[0] === ":"
                ? this.findPosParam(n, o, r)
                : this.findOrReturn(o, i),
        );
    }
    findPosParam(n, e, i) {
        let r = i[e.path.substring(1)];
        if (!r) throw new j(4001, !1);
        return r;
    }
    findOrReturn(n, e) {
        let i = 0;
        for (let r of e) {
            if (r.path === n.path) return (e.splice(i), r);
            i++;
        }
        return n;
    }
};
function Z5(t, n, e) {
    if (typeof t == "string") return S(t);
    let i = t,
        {
            queryParams: r,
            fragment: o,
            routeConfig: a,
            url: s,
            outlet: c,
            params: d,
            data: h,
            title: f,
        } = n;
    return Qt(
        We(e, () =>
            i({
                params: d,
                data: h,
                queryParams: r,
                fragment: o,
                routeConfig: a,
                url: s,
                outlet: c,
                title: f,
            }),
        ),
    );
}
var o4 = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
};
function X5(t, n, e, i, r) {
    let o = xs(t, n, e);
    return o.matched
        ? ((i = z5(n, i)),
          q5(i, n, e, r).pipe(L((a) => (a === !0 ? o : m({}, o4)))))
        : S(o);
}
function xs(t, n, e) {
    if (n.path === "**") return Q5(e);
    if (n.path === "")
        return n.pathMatch === "full" && (t.hasChildren() || e.length > 0)
            ? m({}, o4)
            : {
                  matched: !0,
                  consumedSegments: [],
                  remainingSegments: e,
                  parameters: {},
                  positionalParamSegments: {},
              };
    let r = (n.matcher || ns)(e, t, n);
    if (!r) return m({}, o4);
    let o = {};
    Object.entries(r.posParams ?? {}).forEach(([s, c]) => {
        o[s] = c.path;
    });
    let a =
        r.consumed.length > 0
            ? m(m({}, o), r.consumed[r.consumed.length - 1].parameters)
            : o;
    return {
        matched: !0,
        consumedSegments: r.consumed,
        remainingSegments: e.slice(r.consumed.length),
        parameters: a,
        positionalParamSegments: r.posParams ?? {},
    };
}
function Q5(t) {
    return {
        matched: !0,
        parameters: t.length > 0 ? rs(t).parameters : {},
        consumedSegments: t,
        remainingSegments: [],
        positionalParamSegments: {},
    };
}
function J3(t, n, e, i) {
    return e.length > 0 && t7(t, e, i)
        ? {
              segmentGroup: new ie(n, e7(i, new ie(e, t.children))),
              slicedSegments: [],
          }
        : e.length === 0 && n7(t, e, i)
          ? {
                segmentGroup: new ie(t.segments, J5(t, e, i, t.children)),
                slicedSegments: e,
            }
          : { segmentGroup: new ie(t.segments, t.children), slicedSegments: e };
}
function J5(t, n, e, i) {
    let r = {};
    for (let o of e)
        if (eo(t, n, o) && !i[Pt(o)]) {
            let a = new ie([], {});
            r[Pt(o)] = a;
        }
    return m(m({}, i), r);
}
function e7(t, n) {
    let e = {};
    e[$] = n;
    for (let i of t)
        if (i.path === "" && Pt(i) !== $) {
            let r = new ie([], {});
            e[Pt(i)] = r;
        }
    return e;
}
function t7(t, n, e) {
    return e.some((i) => eo(t, n, i) && Pt(i) !== $);
}
function n7(t, n, e) {
    return e.some((i) => eo(t, n, i));
}
function eo(t, n, e) {
    return (t.hasChildren() || n.length > 0) && e.pathMatch === "full"
        ? !1
        : e.path === "";
}
function i7(t, n, e) {
    return n.length === 0 && !t.children[e];
}
var a4 = class {};
function r7(t, n, e, i, r, o, a = "emptyOnly") {
    return new s4(t, n, e, i, r, a, o).recognize();
}
var o7 = 31,
    s4 = class {
        injector;
        configLoader;
        rootComponentType;
        config;
        urlTree;
        paramsInheritanceStrategy;
        urlSerializer;
        applyRedirects;
        absoluteRedirectCount = 0;
        allowRedirects = !0;
        constructor(n, e, i, r, o, a, s) {
            ((this.injector = n),
                (this.configLoader = e),
                (this.rootComponentType = i),
                (this.config = r),
                (this.urlTree = o),
                (this.paramsInheritanceStrategy = a),
                (this.urlSerializer = s),
                (this.applyRedirects = new r4(
                    this.urlSerializer,
                    this.urlTree,
                )));
        }
        noMatchError(n) {
            return new j(4002, `'${n.segmentGroup}'`);
        }
        recognize() {
            let n = J3(this.urlTree.root, [], [], this.config).segmentGroup;
            return this.match(n).pipe(
                L(({ children: e, rootSnapshot: i }) => {
                    let r = new it(i, e),
                        o = new hi("", r),
                        a = ms(
                            i,
                            [],
                            this.urlTree.queryParams,
                            this.urlTree.fragment,
                        );
                    return (
                        (a.queryParams = this.urlTree.queryParams),
                        (o.url = this.urlSerializer.serialize(a)),
                        { state: o, tree: a }
                    );
                }),
            );
        }
        match(n) {
            let e = new Vn(
                [],
                Object.freeze({}),
                Object.freeze(m({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Object.freeze({}),
                $,
                this.rootComponentType,
                null,
                {},
            );
            return this.processSegmentGroup(
                this.injector,
                this.config,
                n,
                $,
                e,
            ).pipe(
                L((i) => ({ children: i, rootSnapshot: e })),
                qt((i) => {
                    if (i instanceof pi)
                        return (
                            (this.urlTree = i.urlTree),
                            this.match(i.urlTree.root)
                        );
                    throw i instanceof mi ? this.noMatchError(i) : i;
                }),
            );
        }
        processSegmentGroup(n, e, i, r, o) {
            return i.segments.length === 0 && i.hasChildren()
                ? this.processChildren(n, e, i, o)
                : this.processSegment(n, e, i, i.segments, r, !0, o).pipe(
                      L((a) => (a instanceof it ? [a] : [])),
                  );
        }
        processChildren(n, e, i, r) {
            let o = [];
            for (let a of Object.keys(i.children))
                a === "primary" ? o.unshift(a) : o.push(a);
            return Ee(o).pipe(
                Gt((a) => {
                    let s = i.children[a],
                        c = C5(e, a);
                    return this.processSegmentGroup(n, c, s, a, r);
                }),
                I2((a, s) => (a.push(...s), a)),
                ma(null),
                O2(),
                Ie((a) => {
                    if (a === null) return o1(i);
                    let s = Ts(a);
                    return (a7(s), S(s));
                }),
            );
        }
        processSegment(n, e, i, r, o, a, s) {
            return Ee(e).pipe(
                Gt((c) =>
                    this.processSegmentAgainstRoute(
                        c._injector ?? n,
                        e,
                        c,
                        i,
                        r,
                        o,
                        a,
                        s,
                    ).pipe(
                        qt((d) => {
                            if (d instanceof mi) return S(null);
                            throw d;
                        }),
                    ),
                ),
                rn((c) => !!c),
                qt((c) => {
                    if (Ss(c)) return i7(i, r, o) ? S(new a4()) : o1(i);
                    throw c;
                }),
            );
        }
        processSegmentAgainstRoute(n, e, i, r, o, a, s, c) {
            return Pt(i) !== a && (a === $ || !eo(r, o, i))
                ? o1(r)
                : i.redirectTo === void 0
                  ? this.matchSegmentAgainstRoute(n, r, i, o, a, c)
                  : this.allowRedirects && s
                    ? this.expandSegmentAgainstRouteUsingRedirect(
                          n,
                          r,
                          e,
                          i,
                          o,
                          a,
                          c,
                      )
                    : o1(r);
        }
        expandSegmentAgainstRouteUsingRedirect(n, e, i, r, o, a, s) {
            let {
                matched: c,
                parameters: d,
                consumedSegments: h,
                positionalParamSegments: f,
                remainingSegments: v,
            } = xs(e, r, o);
            if (!c) return o1(e);
            typeof r.redirectTo == "string" &&
                r.redirectTo[0] === "/" &&
                (this.absoluteRedirectCount++,
                this.absoluteRedirectCount > o7 && (this.allowRedirects = !1));
            let M = new Vn(
                    o,
                    d,
                    Object.freeze(m({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    es(r),
                    Pt(r),
                    r.component ?? r._loadedComponent ?? null,
                    r,
                    ts(r),
                ),
                F = Zr(M, s, this.paramsInheritanceStrategy);
            return (
                (M.params = Object.freeze(F.params)),
                (M.data = Object.freeze(F.data)),
                this.applyRedirects
                    .applyRedirectCommands(h, r.redirectTo, f, M, n)
                    .pipe(
                        Pe((H) => this.applyRedirects.lineralizeSegments(r, H)),
                        Ie((H) =>
                            this.processSegment(n, i, e, H.concat(v), a, !1, s),
                        ),
                    )
            );
        }
        matchSegmentAgainstRoute(n, e, i, r, o, a) {
            let s = X5(e, i, r, n, this.urlSerializer);
            return (
                i.path === "**" && (e.children = {}),
                s.pipe(
                    Pe((c) =>
                        c.matched
                            ? ((n = i._injector ?? n),
                              this.getChildConfig(n, i, r).pipe(
                                  Pe(({ routes: d }) => {
                                      let h = i._loadedInjector ?? n,
                                          {
                                              parameters: f,
                                              consumedSegments: v,
                                              remainingSegments: M,
                                          } = c,
                                          F = new Vn(
                                              v,
                                              f,
                                              Object.freeze(
                                                  m(
                                                      {},
                                                      this.urlTree.queryParams,
                                                  ),
                                              ),
                                              this.urlTree.fragment,
                                              es(i),
                                              Pt(i),
                                              i.component ??
                                                  i._loadedComponent ??
                                                  null,
                                              i,
                                              ts(i),
                                          ),
                                          T = Zr(
                                              F,
                                              a,
                                              this.paramsInheritanceStrategy,
                                          );
                                      ((F.params = Object.freeze(T.params)),
                                          (F.data = Object.freeze(T.data)));
                                      let {
                                          segmentGroup: H,
                                          slicedSegments: re,
                                      } = J3(e, v, M, d);
                                      if (re.length === 0 && H.hasChildren())
                                          return this.processChildren(
                                              h,
                                              d,
                                              H,
                                              F,
                                          ).pipe(L((_t) => new it(F, _t)));
                                      if (d.length === 0 && re.length === 0)
                                          return S(new it(F, []));
                                      let ht = Pt(i) === o;
                                      return this.processSegment(
                                          h,
                                          d,
                                          H,
                                          re,
                                          ht ? $ : o,
                                          !0,
                                          F,
                                      ).pipe(
                                          L(
                                              (_t) =>
                                                  new it(
                                                      F,
                                                      _t instanceof it
                                                          ? [_t]
                                                          : [],
                                                  ),
                                          ),
                                      );
                                  }),
                              ))
                            : o1(e),
                    ),
                )
            );
        }
        getChildConfig(n, e, i) {
            return e.children
                ? S({ routes: e.children, injector: n })
                : e.loadChildren
                  ? e._loadedRoutes !== void 0
                      ? S({
                            routes: e._loadedRoutes,
                            injector: e._loadedInjector,
                        })
                      : W5(n, e, i, this.urlSerializer).pipe(
                            Ie((r) =>
                                r
                                    ? this.configLoader.loadChildren(n, e).pipe(
                                          me((o) => {
                                              ((e._loadedRoutes = o.routes),
                                                  (e._loadedInjector =
                                                      o.injector));
                                          }),
                                      )
                                    : K5(e),
                            ),
                        )
                  : S({ routes: [], injector: n });
        }
    };
function a7(t) {
    t.sort((n, e) =>
        n.value.outlet === $
            ? -1
            : e.value.outlet === $
              ? 1
              : n.value.outlet.localeCompare(e.value.outlet),
    );
}
function s7(t) {
    let n = t.value.routeConfig;
    return n && n.path === "";
}
function Ts(t) {
    let n = [],
        e = new Set();
    for (let i of t) {
        if (!s7(i)) {
            n.push(i);
            continue;
        }
        let r = n.find((o) => i.value.routeConfig === o.value.routeConfig);
        r !== void 0 ? (r.children.push(...i.children), e.add(r)) : n.push(i);
    }
    for (let i of e) {
        let r = Ts(i.children);
        n.push(new it(i.value, r));
    }
    return n.filter((i) => !e.has(i));
}
function es(t) {
    return t.data || {};
}
function ts(t) {
    return t.resolve || {};
}
function c7(t, n, e, i, r, o) {
    return Ie((a) =>
        r7(t, n, e, i, a.extractedUrl, r, o).pipe(
            L(({ state: s, tree: c }) =>
                Z(m({}, a), { targetSnapshot: s, urlAfterRedirects: c }),
            ),
        ),
    );
}
function l7(t, n) {
    return Ie((e) => {
        let {
            targetSnapshot: i,
            guards: { canActivateChecks: r },
        } = e;
        if (!r.length) return S(e);
        let o = new Set(r.map((c) => c.route)),
            a = new Set();
        for (let c of o) if (!a.has(c)) for (let d of ks(c)) a.add(d);
        let s = 0;
        return Ee(a).pipe(
            Gt((c) =>
                o.has(c)
                    ? d7(c, i, t, n)
                    : ((c.data = Zr(c, c.parent, t).resolve), S(void 0)),
            ),
            me(() => s++),
            pa(1),
            Ie((c) => (s === a.size ? S(e) : pt)),
        );
    });
}
function ks(t) {
    let n = t.children.map((e) => ks(e)).flat();
    return [t, ...n];
}
function d7(t, n, e, i) {
    let r = t.routeConfig,
        o = t._resolve;
    return (
        r?.title !== void 0 && !Cs(r) && (o[fi] = r.title),
        ar(
            () => (
                (t.data = Zr(t, t.parent, e).resolve),
                h7(o, t, n, i).pipe(
                    L(
                        (a) => (
                            (t._resolvedData = a),
                            (t.data = m(m({}, t.data), a)),
                            null
                        ),
                    ),
                )
            ),
        )
    );
}
function h7(t, n, e, i) {
    let r = Ka(t);
    if (r.length === 0) return S({});
    let o = {};
    return Ee(r).pipe(
        Ie((a) =>
            u7(t[a], n, e, i).pipe(
                rn(),
                me((s) => {
                    if (s instanceof p1) throw Xr(new hn(), s);
                    o[a] = s;
                }),
            ),
        ),
        pa(1),
        L(() => o),
        qt((a) => (Ss(a) ? pt : O1(a))),
    );
}
function u7(t, n, e, i) {
    let r = v1(n) ?? i,
        o = g1(t, r),
        a = o.resolve ? o.resolve(n, e) : We(r, () => o(n, e));
    return Qt(a);
}
function qa(t) {
    return Pe((n) => {
        let e = t(n);
        return e ? Ee(e).pipe(L(() => n)) : S(n);
    });
}
var u4 = (() => {
        class t {
            buildTitle(e) {
                let i,
                    r = e.root;
                for (; r !== void 0; )
                    ((i = this.getResolvedTitleForRoute(r) ?? i),
                        (r = r.children.find((o) => o.outlet === $)));
                return i;
            }
            getResolvedTitleForRoute(e) {
                return e.data[fi];
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(Es),
                providedIn: "root",
            });
        }
        return t;
    })(),
    Es = (() => {
        class t extends u4 {
            title;
            constructor(e) {
                (super(), (this.title = e));
            }
            updateTitle(e) {
                let i = this.buildTitle(e);
                i !== void 0 && this.title.setTitle(i);
            }
            static ɵfac = function (i) {
                return new (i || t)(x(G3));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    pn = new b("", { providedIn: "root", factory: () => ({}) }),
    Rn = new b(""),
    to = (() => {
        class t {
            componentLoaders = new WeakMap();
            childrenLoaders = new WeakMap();
            onLoadStartListener;
            onLoadEndListener;
            compiler = l(d3);
            loadComponent(e, i) {
                if (this.componentLoaders.get(i))
                    return this.componentLoaders.get(i);
                if (i._loadedComponent) return S(i._loadedComponent);
                this.onLoadStartListener && this.onLoadStartListener(i);
                let r = Qt(We(e, () => i.loadComponent())).pipe(
                        L(As),
                        me((a) => {
                            (this.onLoadEndListener &&
                                this.onLoadEndListener(i),
                                (i._loadedComponent = a));
                        }),
                        ft(() => {
                            this.componentLoaders.delete(i);
                        }),
                    ),
                    o = new ha(r, () => new Y()).pipe(da());
                return (this.componentLoaders.set(i, o), o);
            }
            loadChildren(e, i) {
                if (this.childrenLoaders.get(i))
                    return this.childrenLoaders.get(i);
                if (i._loadedRoutes)
                    return S({
                        routes: i._loadedRoutes,
                        injector: i._loadedInjector,
                    });
                this.onLoadStartListener && this.onLoadStartListener(i);
                let o = Ps(i, this.compiler, e, this.onLoadEndListener).pipe(
                        ft(() => {
                            this.childrenLoaders.delete(i);
                        }),
                    ),
                    a = new ha(o, () => new Y()).pipe(da());
                return (this.childrenLoaders.set(i, a), a);
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function Ps(t, n, e, i) {
    return Qt(We(e, () => t.loadChildren())).pipe(
        L(As),
        Ie((r) =>
            r instanceof n3 || Array.isArray(r)
                ? S(r)
                : Ee(n.compileModuleAsync(r)),
        ),
        L((r) => {
            i && i(t);
            let o,
                a,
                s = !1;
            return (
                Array.isArray(r)
                    ? ((a = r), (s = !0))
                    : ((o = r.create(e).injector),
                      (a = o.get(Rn, [], { optional: !0, self: !0 }).flat())),
                { routes: a.map(h4), injector: o }
            );
        }),
    );
}
function m7(t) {
    return t && typeof t == "object" && "default" in t;
}
function As(t) {
    return m7(t) ? t.default : t;
}
var no = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(p7),
                providedIn: "root",
            });
        }
        return t;
    })(),
    p7 = (() => {
        class t {
            shouldProcessUrl(e) {
                return !0;
            }
            extract(e) {
                return e;
            }
            merge(e, i) {
                return e;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    m4 = new b(""),
    p4 = new b("");
function Vs(t, n, e) {
    let i = t.get(p4),
        r = t.get(U);
    if (!r.startViewTransition || i.skipNextTransition)
        return ((i.skipNextTransition = !1), new Promise((d) => setTimeout(d)));
    let o,
        a = new Promise((d) => {
            o = d;
        }),
        s = r.startViewTransition(() => (o(), f7(t))),
        { onViewTransitionCreated: c } = i;
    return (c && We(t, () => c({ transition: s, from: n, to: e })), a);
}
function f7(t) {
    return new Promise((n) => {
        St({ read: () => setTimeout(n) }, { injector: t });
    });
}
var f4 = new b(""),
    io = (() => {
        class t {
            currentNavigation = null;
            currentTransition = null;
            lastSuccessfulNavigation = null;
            events = new Y();
            transitionAbortWithErrorSubject = new Y();
            configLoader = l(to);
            environmentInjector = l(Ne);
            destroyRef = l(K);
            urlSerializer = l(Hn);
            rootContexts = l(On);
            location = l(Rt);
            inputBindingEnabled = l(vi, { optional: !0 }) !== null;
            titleStrategy = l(u4);
            options = l(pn, { optional: !0 }) || {};
            paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly";
            urlHandlingStrategy = l(no);
            createViewTransition = l(m4, { optional: !0 });
            navigationErrorHandler = l(f4, { optional: !0 });
            navigationId = 0;
            get hasRequestedNavigation() {
                return this.navigationId !== 0;
            }
            transitions;
            afterPreactivation = () => S(void 0);
            rootComponentType = null;
            destroyed = !1;
            constructor() {
                let e = (r) => this.events.next(new Br(r)),
                    i = (r) => this.events.next(new jr(r));
                ((this.configLoader.onLoadEndListener = i),
                    (this.configLoader.onLoadStartListener = e),
                    this.destroyRef.onDestroy(() => {
                        this.destroyed = !0;
                    }));
            }
            complete() {
                this.transitions?.complete();
            }
            handleNavigationRequest(e) {
                let i = ++this.navigationId;
                this.transitions?.next(
                    Z(m({}, e), {
                        extractedUrl: this.urlHandlingStrategy.extract(
                            e.rawUrl,
                        ),
                        targetSnapshot: null,
                        targetRouterState: null,
                        guards: {
                            canActivateChecks: [],
                            canDeactivateChecks: [],
                        },
                        guardsResult: null,
                        abortController: new AbortController(),
                        id: i,
                    }),
                );
            }
            setupNavigations(e) {
                return (
                    (this.transitions = new Te(null)),
                    this.transitions.pipe(
                        J((i) => i !== null),
                        Pe((i) => {
                            let r = !1;
                            return S(i).pipe(
                                Pe((o) => {
                                    if (this.navigationId > i.id)
                                        return (
                                            this.cancelNavigationTransition(
                                                i,
                                                "",
                                                Ue.SupersededByNewNavigation,
                                            ),
                                            pt
                                        );
                                    ((this.currentTransition = i),
                                        (this.currentNavigation = {
                                            id: o.id,
                                            initialUrl: o.rawUrl,
                                            extractedUrl: o.extractedUrl,
                                            targetBrowserUrl:
                                                typeof o.extras.browserUrl ==
                                                "string"
                                                    ? this.urlSerializer.parse(
                                                          o.extras.browserUrl,
                                                      )
                                                    : o.extras.browserUrl,
                                            trigger: o.source,
                                            extras: o.extras,
                                            previousNavigation: this
                                                .lastSuccessfulNavigation
                                                ? Z(
                                                      m(
                                                          {},
                                                          this
                                                              .lastSuccessfulNavigation,
                                                      ),
                                                      {
                                                          previousNavigation:
                                                              null,
                                                      },
                                                  )
                                                : null,
                                            abort: () =>
                                                o.abortController.abort(),
                                        }));
                                    let a =
                                            !e.navigated ||
                                            this.isUpdatingInternalState() ||
                                            this.isUpdatedBrowserUrl(),
                                        s =
                                            o.extras.onSameUrlNavigation ??
                                            e.onSameUrlNavigation;
                                    if (!a && s !== "reload") {
                                        let c = "";
                                        return (
                                            this.events.next(
                                                new Ut(
                                                    o.id,
                                                    this.urlSerializer.serialize(
                                                        o.rawUrl,
                                                    ),
                                                    c,
                                                    d1.IgnoredSameUrlNavigation,
                                                ),
                                            ),
                                            o.resolve(!1),
                                            pt
                                        );
                                    }
                                    if (
                                        this.urlHandlingStrategy.shouldProcessUrl(
                                            o.rawUrl,
                                        )
                                    )
                                        return S(o).pipe(
                                            Pe(
                                                (c) => (
                                                    this.events.next(
                                                        new mn(
                                                            c.id,
                                                            this.urlSerializer.serialize(
                                                                c.extractedUrl,
                                                            ),
                                                            c.source,
                                                            c.restoredState,
                                                        ),
                                                    ),
                                                    c.id !== this.navigationId
                                                        ? pt
                                                        : Promise.resolve(c)
                                                ),
                                            ),
                                            c7(
                                                this.environmentInjector,
                                                this.configLoader,
                                                this.rootComponentType,
                                                e.config,
                                                this.urlSerializer,
                                                this.paramsInheritanceStrategy,
                                            ),
                                            me((c) => {
                                                ((i.targetSnapshot =
                                                    c.targetSnapshot),
                                                    (i.urlAfterRedirects =
                                                        c.urlAfterRedirects),
                                                    (this.currentNavigation = Z(
                                                        m(
                                                            {},
                                                            this
                                                                .currentNavigation,
                                                        ),
                                                        {
                                                            finalUrl:
                                                                c.urlAfterRedirects,
                                                        },
                                                    )));
                                                let d = new ci(
                                                    c.id,
                                                    this.urlSerializer.serialize(
                                                        c.extractedUrl,
                                                    ),
                                                    this.urlSerializer.serialize(
                                                        c.urlAfterRedirects,
                                                    ),
                                                    c.targetSnapshot,
                                                );
                                                this.events.next(d);
                                            }),
                                        );
                                    if (
                                        a &&
                                        this.urlHandlingStrategy.shouldProcessUrl(
                                            o.currentRawUrl,
                                        )
                                    ) {
                                        let {
                                                id: c,
                                                extractedUrl: d,
                                                source: h,
                                                restoredState: f,
                                                extras: v,
                                            } = o,
                                            M = new mn(
                                                c,
                                                this.urlSerializer.serialize(d),
                                                h,
                                                f,
                                            );
                                        this.events.next(M);
                                        let F = ys(
                                            this.rootComponentType,
                                        ).snapshot;
                                        return (
                                            (this.currentTransition = i =
                                                Z(m({}, o), {
                                                    targetSnapshot: F,
                                                    urlAfterRedirects: d,
                                                    extras: Z(m({}, v), {
                                                        skipLocationChange: !1,
                                                        replaceUrl: !1,
                                                    }),
                                                })),
                                            (this.currentNavigation.finalUrl =
                                                d),
                                            S(i)
                                        );
                                    } else {
                                        let c = "";
                                        return (
                                            this.events.next(
                                                new Ut(
                                                    o.id,
                                                    this.urlSerializer.serialize(
                                                        o.extractedUrl,
                                                    ),
                                                    c,
                                                    d1.IgnoredByUrlHandlingStrategy,
                                                ),
                                            ),
                                            o.resolve(!1),
                                            pt
                                        );
                                    }
                                }),
                                me((o) => {
                                    let a = new Rr(
                                        o.id,
                                        this.urlSerializer.serialize(
                                            o.extractedUrl,
                                        ),
                                        this.urlSerializer.serialize(
                                            o.urlAfterRedirects,
                                        ),
                                        o.targetSnapshot,
                                    );
                                    this.events.next(a);
                                }),
                                L(
                                    (o) => (
                                        (this.currentTransition = i =
                                            Z(m({}, o), {
                                                guards: x5(
                                                    o.targetSnapshot,
                                                    o.currentSnapshot,
                                                    this.rootContexts,
                                                ),
                                            })),
                                        i
                                    ),
                                ),
                                R5(this.environmentInjector, (o) =>
                                    this.events.next(o),
                                ),
                                me((o) => {
                                    if (
                                        ((i.guardsResult = o.guardsResult),
                                        o.guardsResult &&
                                            typeof o.guardsResult != "boolean")
                                    )
                                        throw Xr(
                                            this.urlSerializer,
                                            o.guardsResult,
                                        );
                                    let a = new Lr(
                                        o.id,
                                        this.urlSerializer.serialize(
                                            o.extractedUrl,
                                        ),
                                        this.urlSerializer.serialize(
                                            o.urlAfterRedirects,
                                        ),
                                        o.targetSnapshot,
                                        !!o.guardsResult,
                                    );
                                    this.events.next(a);
                                }),
                                J((o) =>
                                    o.guardsResult
                                        ? !0
                                        : (this.cancelNavigationTransition(
                                              o,
                                              "",
                                              Ue.GuardRejected,
                                          ),
                                          !1),
                                ),
                                qa((o) => {
                                    if (o.guards.canActivateChecks.length !== 0)
                                        return S(o).pipe(
                                            me((a) => {
                                                let s = new Nr(
                                                    a.id,
                                                    this.urlSerializer.serialize(
                                                        a.extractedUrl,
                                                    ),
                                                    this.urlSerializer.serialize(
                                                        a.urlAfterRedirects,
                                                    ),
                                                    a.targetSnapshot,
                                                );
                                                this.events.next(s);
                                            }),
                                            Pe((a) => {
                                                let s = !1;
                                                return S(a).pipe(
                                                    l7(
                                                        this
                                                            .paramsInheritanceStrategy,
                                                        this
                                                            .environmentInjector,
                                                    ),
                                                    me({
                                                        next: () => (s = !0),
                                                        complete: () => {
                                                            s ||
                                                                this.cancelNavigationTransition(
                                                                    a,
                                                                    "",
                                                                    Ue.NoDataFromResolver,
                                                                );
                                                        },
                                                    }),
                                                );
                                            }),
                                            me((a) => {
                                                let s = new Yr(
                                                    a.id,
                                                    this.urlSerializer.serialize(
                                                        a.extractedUrl,
                                                    ),
                                                    this.urlSerializer.serialize(
                                                        a.urlAfterRedirects,
                                                    ),
                                                    a.targetSnapshot,
                                                );
                                                this.events.next(s);
                                            }),
                                        );
                                }),
                                qa((o) => {
                                    let a = (s) => {
                                        let c = [];
                                        if (
                                            s.routeConfig?.loadComponent &&
                                            !s.routeConfig._loadedComponent
                                        ) {
                                            let d =
                                                v1(s) ??
                                                this.environmentInjector;
                                            c.push(
                                                this.configLoader
                                                    .loadComponent(
                                                        d,
                                                        s.routeConfig,
                                                    )
                                                    .pipe(
                                                        me((h) => {
                                                            s.component = h;
                                                        }),
                                                        L(() => {}),
                                                    ),
                                            );
                                        }
                                        for (let d of s.children)
                                            c.push(...a(d));
                                        return c;
                                    };
                                    return or(a(o.targetSnapshot.root)).pipe(
                                        ma(null),
                                        nn(1),
                                    );
                                }),
                                qa(() => this.afterPreactivation()),
                                Pe(() => {
                                    let {
                                            currentSnapshot: o,
                                            targetSnapshot: a,
                                        } = i,
                                        s = this.createViewTransition?.(
                                            this.environmentInjector,
                                            o.root,
                                            a.root,
                                        );
                                    return s ? Ee(s).pipe(L(() => i)) : S(i);
                                }),
                                L((o) => {
                                    let a = _5(
                                        e.routeReuseStrategy,
                                        o.targetSnapshot,
                                        o.currentRouterState,
                                    );
                                    return (
                                        (this.currentTransition = i =
                                            Z(m({}, o), {
                                                targetRouterState: a,
                                            })),
                                        (this.currentNavigation.targetRouterState =
                                            a),
                                        i
                                    );
                                }),
                                me(() => {
                                    this.events.next(new li());
                                }),
                                D5(
                                    this.rootContexts,
                                    e.routeReuseStrategy,
                                    (o) => this.events.next(o),
                                    this.inputBindingEnabled,
                                ),
                                nn(1),
                                on(
                                    new Xe((o) => {
                                        let a = i.abortController.signal,
                                            s = () => o.next();
                                        return (
                                            a.addEventListener("abort", s),
                                            () =>
                                                a.removeEventListener(
                                                    "abort",
                                                    s,
                                                )
                                        );
                                    }).pipe(
                                        J(() => !r && !i.targetRouterState),
                                        me(() => {
                                            this.cancelNavigationTransition(
                                                i,
                                                i.abortController.signal
                                                    .reason + "",
                                                Ue.Aborted,
                                            );
                                        }),
                                    ),
                                ),
                                me({
                                    next: (o) => {
                                        ((r = !0),
                                            (this.lastSuccessfulNavigation =
                                                this.currentNavigation),
                                            this.events.next(
                                                new ot(
                                                    o.id,
                                                    this.urlSerializer.serialize(
                                                        o.extractedUrl,
                                                    ),
                                                    this.urlSerializer.serialize(
                                                        o.urlAfterRedirects,
                                                    ),
                                                ),
                                            ),
                                            this.titleStrategy?.updateTitle(
                                                o.targetRouterState.snapshot,
                                            ),
                                            o.resolve(!0));
                                    },
                                    complete: () => {
                                        r = !0;
                                    },
                                }),
                                on(
                                    this.transitionAbortWithErrorSubject.pipe(
                                        me((o) => {
                                            throw o;
                                        }),
                                    ),
                                ),
                                ft(() => {
                                    (r ||
                                        this.cancelNavigationTransition(
                                            i,
                                            "",
                                            Ue.SupersededByNewNavigation,
                                        ),
                                        this.currentTransition?.id === i.id &&
                                            ((this.currentNavigation = null),
                                            (this.currentTransition = null)));
                                }),
                                qt((o) => {
                                    if (this.destroyed)
                                        return (i.resolve(!1), pt);
                                    if (((r = !0), Ms(o)))
                                        (this.events.next(
                                            new Bt(
                                                i.id,
                                                this.urlSerializer.serialize(
                                                    i.extractedUrl,
                                                ),
                                                o.message,
                                                o.cancellationCode,
                                            ),
                                        ),
                                            S5(o)
                                                ? this.events.next(
                                                      new m1(
                                                          o.url,
                                                          o.navigationBehaviorOptions,
                                                      ),
                                                  )
                                                : i.resolve(!1));
                                    else {
                                        let a = new h1(
                                            i.id,
                                            this.urlSerializer.serialize(
                                                i.extractedUrl,
                                            ),
                                            o,
                                            i.targetSnapshot ?? void 0,
                                        );
                                        try {
                                            let s = We(
                                                this.environmentInjector,
                                                () =>
                                                    this.navigationErrorHandler?.(
                                                        a,
                                                    ),
                                            );
                                            if (s instanceof p1) {
                                                let {
                                                    message: c,
                                                    cancellationCode: d,
                                                } = Xr(this.urlSerializer, s);
                                                (this.events.next(
                                                    new Bt(
                                                        i.id,
                                                        this.urlSerializer.serialize(
                                                            i.extractedUrl,
                                                        ),
                                                        c,
                                                        d,
                                                    ),
                                                ),
                                                    this.events.next(
                                                        new m1(
                                                            s.redirectTo,
                                                            s.navigationBehaviorOptions,
                                                        ),
                                                    ));
                                            } else
                                                throw (this.events.next(a), o);
                                        } catch (s) {
                                            this.options
                                                .resolveNavigationPromiseOnError
                                                ? i.resolve(!1)
                                                : i.reject(s);
                                        }
                                    }
                                    return pt;
                                }),
                            );
                        }),
                    )
                );
            }
            cancelNavigationTransition(e, i, r) {
                let o = new Bt(
                    e.id,
                    this.urlSerializer.serialize(e.extractedUrl),
                    i,
                    r,
                );
                (this.events.next(o), e.resolve(!1));
            }
            isUpdatingInternalState() {
                return (
                    this.currentTransition?.extractedUrl.toString() !==
                    this.currentTransition?.currentUrlTree.toString()
                );
            }
            isUpdatedBrowserUrl() {
                let e = this.urlHandlingStrategy.extract(
                        this.urlSerializer.parse(this.location.path(!0)),
                    ),
                    i =
                        this.currentNavigation?.targetBrowserUrl ??
                        this.currentNavigation?.extractedUrl;
                return (
                    e.toString() !== i?.toString() &&
                    !this.currentNavigation?.extras.skipLocationChange
                );
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function v7(t) {
    return t !== c1;
}
var Fs = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(g7),
                providedIn: "root",
            });
        }
        return t;
    })(),
    Jr = class {
        shouldDetach(n) {
            return !1;
        }
        store(n, e) {}
        shouldAttach(n) {
            return !1;
        }
        retrieve(n) {
            return null;
        }
        shouldReuseRoute(n, e) {
            return n.routeConfig === e.routeConfig;
        }
    },
    g7 = (() => {
        class t extends Jr {
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Hs = (() => {
        class t {
            urlSerializer = l(Hn);
            options = l(pn, { optional: !0 }) || {};
            canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace";
            location = l(Rt);
            urlHandlingStrategy = l(no);
            urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
            currentUrlTree = new jt();
            getCurrentUrlTree() {
                return this.currentUrlTree;
            }
            rawUrlTree = this.currentUrlTree;
            getRawUrlTree() {
                return this.rawUrlTree;
            }
            createBrowserPath({
                finalUrl: e,
                initialUrl: i,
                targetBrowserUrl: r,
            }) {
                let o = e !== void 0 ? this.urlHandlingStrategy.merge(e, i) : i,
                    a = r ?? o;
                return a instanceof jt ? this.urlSerializer.serialize(a) : a;
            }
            commitTransition({
                targetRouterState: e,
                finalUrl: i,
                initialUrl: r,
            }) {
                i && e
                    ? ((this.currentUrlTree = i),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(i, r)),
                      (this.routerState = e))
                    : (this.rawUrlTree = r);
            }
            routerState = ys(null);
            getRouterState() {
                return this.routerState;
            }
            stateMemento = this.createStateMemento();
            updateStateMemento() {
                this.stateMemento = this.createStateMemento();
            }
            createStateMemento() {
                return {
                    rawUrlTree: this.rawUrlTree,
                    currentUrlTree: this.currentUrlTree,
                    routerState: this.routerState,
                };
            }
            resetInternalState({ finalUrl: e }) {
                ((this.routerState = this.stateMemento.routerState),
                    (this.currentUrlTree = this.stateMemento.currentUrlTree),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        this.currentUrlTree,
                        e ?? this.rawUrlTree,
                    )));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({
                token: t,
                factory: () => l(y7),
                providedIn: "root",
            });
        }
        return t;
    })(),
    y7 = (() => {
        class t extends Hs {
            currentPageId = 0;
            lastSuccessfulId = -1;
            restoredState() {
                return this.location.getState();
            }
            get browserPageId() {
                return this.canceledNavigationResolution !== "computed"
                    ? this.currentPageId
                    : (this.restoredState()?.ɵrouterPageId ??
                          this.currentPageId);
            }
            registerNonRouterCurrentEntryChangeListener(e) {
                return this.location.subscribe((i) => {
                    i.type === "popstate" &&
                        setTimeout(() => {
                            e(i.url, i.state, "popstate");
                        });
                });
            }
            handleRouterEvent(e, i) {
                e instanceof mn
                    ? this.updateStateMemento()
                    : e instanceof Ut
                      ? this.commitTransition(i)
                      : e instanceof ci
                        ? this.urlUpdateStrategy === "eager" &&
                          (i.extras.skipLocationChange ||
                              this.setBrowserUrl(this.createBrowserPath(i), i))
                        : e instanceof li
                          ? (this.commitTransition(i),
                            this.urlUpdateStrategy === "deferred" &&
                                !i.extras.skipLocationChange &&
                                this.setBrowserUrl(
                                    this.createBrowserPath(i),
                                    i,
                                ))
                          : e instanceof Bt &&
                              e.code !== Ue.SupersededByNewNavigation &&
                              e.code !== Ue.Redirect
                            ? this.restoreHistory(i)
                            : e instanceof h1
                              ? this.restoreHistory(i, !0)
                              : e instanceof ot &&
                                ((this.lastSuccessfulId = e.id),
                                (this.currentPageId = this.browserPageId));
            }
            setBrowserUrl(e, { extras: i, id: r }) {
                let { replaceUrl: o, state: a } = i;
                if (this.location.isCurrentPathEqualTo(e) || o) {
                    let s = this.browserPageId,
                        c = m(m({}, a), this.generateNgRouterState(r, s));
                    this.location.replaceState(e, "", c);
                } else {
                    let s = m(
                        m({}, a),
                        this.generateNgRouterState(r, this.browserPageId + 1),
                    );
                    this.location.go(e, "", s);
                }
            }
            restoreHistory(e, i = !1) {
                if (this.canceledNavigationResolution === "computed") {
                    let r = this.browserPageId,
                        o = this.currentPageId - r;
                    o !== 0
                        ? this.location.historyGo(o)
                        : this.getCurrentUrlTree() === e.finalUrl &&
                          o === 0 &&
                          (this.resetInternalState(e),
                          this.resetUrlToCurrentUrlTree());
                } else
                    this.canceledNavigationResolution === "replace" &&
                        (i && this.resetInternalState(e),
                        this.resetUrlToCurrentUrlTree());
            }
            resetUrlToCurrentUrlTree() {
                this.location.replaceState(
                    this.urlSerializer.serialize(this.getRawUrlTree()),
                    "",
                    this.generateNgRouterState(
                        this.lastSuccessfulId,
                        this.currentPageId,
                    ),
                );
            }
            generateNgRouterState(e, i) {
                return this.canceledNavigationResolution === "computed"
                    ? { navigationId: e, ɵrouterPageId: i }
                    : { navigationId: e };
            }
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function ro(t, n) {
    t.events
        .pipe(
            J(
                (e) =>
                    e instanceof ot ||
                    e instanceof Bt ||
                    e instanceof h1 ||
                    e instanceof Ut,
            ),
            L((e) =>
                e instanceof ot || e instanceof Ut
                    ? 0
                    : (
                            e instanceof Bt
                                ? e.code === Ue.Redirect ||
                                  e.code === Ue.SupersededByNewNavigation
                                : !1
                        )
                      ? 2
                      : 1,
            ),
            J((e) => e !== 2),
            nn(1),
        )
        .subscribe(() => {
            n();
        });
}
var z7 = {
        paths: "exact",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "exact",
    },
    C7 = {
        paths: "subset",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "subset",
    },
    ge = (() => {
        class t {
            get currentUrlTree() {
                return this.stateManager.getCurrentUrlTree();
            }
            get rawUrlTree() {
                return this.stateManager.getRawUrlTree();
            }
            disposed = !1;
            nonRouterCurrentEntryChangeSubscription;
            console = l(za);
            stateManager = l(Hs);
            options = l(pn, { optional: !0 }) || {};
            pendingTasks = l(U2);
            urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
            navigationTransitions = l(io);
            urlSerializer = l(Hn);
            location = l(Rt);
            urlHandlingStrategy = l(no);
            injector = l(Ne);
            _events = new Y();
            get events() {
                return this._events;
            }
            get routerState() {
                return this.stateManager.getRouterState();
            }
            navigated = !1;
            routeReuseStrategy = l(Fs);
            onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
            config = l(Rn, { optional: !0 })?.flat() ?? [];
            componentInputBindingEnabled = !!l(vi, { optional: !0 });
            constructor() {
                (this.resetConfig(this.config),
                    this.navigationTransitions
                        .setupNavigations(this)
                        .subscribe({
                            error: (e) => {
                                this.console.warn(e);
                            },
                        }),
                    this.subscribeToNavigationEvents());
            }
            eventsSubscription = new mt();
            subscribeToNavigationEvents() {
                let e = this.navigationTransitions.events.subscribe((i) => {
                    try {
                        let r = this.navigationTransitions.currentTransition,
                            o = this.navigationTransitions.currentNavigation;
                        if (r !== null && o !== null) {
                            if (
                                (this.stateManager.handleRouterEvent(i, o),
                                i instanceof Bt &&
                                    i.code !== Ue.Redirect &&
                                    i.code !== Ue.SupersededByNewNavigation)
                            )
                                this.navigated = !0;
                            else if (i instanceof ot) this.navigated = !0;
                            else if (i instanceof m1) {
                                let a = i.navigationBehaviorOptions,
                                    s = this.urlHandlingStrategy.merge(
                                        i.url,
                                        r.currentRawUrl,
                                    ),
                                    c = m(
                                        {
                                            browserUrl: r.extras.browserUrl,
                                            info: r.extras.info,
                                            skipLocationChange:
                                                r.extras.skipLocationChange,
                                            replaceUrl:
                                                r.extras.replaceUrl ||
                                                this.urlUpdateStrategy ===
                                                    "eager" ||
                                                v7(r.source),
                                        },
                                        a,
                                    );
                                this.scheduleNavigation(s, c1, null, c, {
                                    resolve: r.resolve,
                                    reject: r.reject,
                                    promise: r.promise,
                                });
                            }
                        }
                        y5(i) && this._events.next(i);
                    } catch (r) {
                        this.navigationTransitions.transitionAbortWithErrorSubject.next(
                            r,
                        );
                    }
                });
                this.eventsSubscription.add(e);
            }
            resetRootComponentType(e) {
                ((this.routerState.root.component = e),
                    (this.navigationTransitions.rootComponentType = e));
            }
            initialNavigation() {
                (this.setUpLocationChangeListener(),
                    this.navigationTransitions.hasRequestedNavigation ||
                        this.navigateToSyncWithBrowser(
                            this.location.path(!0),
                            c1,
                            this.stateManager.restoredState(),
                        ));
            }
            setUpLocationChangeListener() {
                this.nonRouterCurrentEntryChangeSubscription ??=
                    this.stateManager.registerNonRouterCurrentEntryChangeListener(
                        (e, i, r) => {
                            this.navigateToSyncWithBrowser(e, r, i);
                        },
                    );
            }
            navigateToSyncWithBrowser(e, i, r) {
                let o = { replaceUrl: !0 },
                    a = r?.navigationId ? r : null;
                if (r) {
                    let c = m({}, r);
                    (delete c.navigationId,
                        delete c.ɵrouterPageId,
                        Object.keys(c).length !== 0 && (o.state = c));
                }
                let s = this.parseUrl(e);
                this.scheduleNavigation(s, i, a, o).catch((c) => {
                    this.disposed || this.injector.get(Y1)(c);
                });
            }
            get url() {
                return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
                return this.navigationTransitions.currentNavigation;
            }
            get lastSuccessfulNavigation() {
                return this.navigationTransitions.lastSuccessfulNavigation;
            }
            resetConfig(e) {
                ((this.config = e.map(h4)), (this.navigated = !1));
            }
            ngOnDestroy() {
                this.dispose();
            }
            dispose() {
                (this._events.unsubscribe(),
                    this.navigationTransitions.complete(),
                    this.nonRouterCurrentEntryChangeSubscription &&
                        (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
                        (this.nonRouterCurrentEntryChangeSubscription =
                            void 0)),
                    (this.disposed = !0),
                    this.eventsSubscription.unsubscribe());
            }
            createUrlTree(e, i = {}) {
                let {
                        relativeTo: r,
                        queryParams: o,
                        fragment: a,
                        queryParamsHandling: s,
                        preserveFragment: c,
                    } = i,
                    d = c ? this.currentUrlTree.fragment : a,
                    h = null;
                switch (s ?? this.options.defaultQueryParamsHandling) {
                    case "merge":
                        h = m(m({}, this.currentUrlTree.queryParams), o);
                        break;
                    case "preserve":
                        h = this.currentUrlTree.queryParams;
                        break;
                    default:
                        h = o || null;
                }
                h !== null && (h = this.removeEmptyProps(h));
                let f;
                try {
                    let v = r ? r.snapshot : this.routerState.snapshot.root;
                    f = ps(v);
                } catch {
                    ((typeof e[0] != "string" || e[0][0] !== "/") && (e = []),
                        (f = this.currentUrlTree.root));
                }
                return fs(f, e, h, d ?? null);
            }
            navigateByUrl(e, i = { skipLocationChange: !1 }) {
                let r = un(e) ? e : this.parseUrl(e),
                    o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
                return this.scheduleNavigation(o, c1, null, i);
            }
            navigate(e, i = { skipLocationChange: !1 }) {
                return (b7(e), this.navigateByUrl(this.createUrlTree(e, i), i));
            }
            serializeUrl(e) {
                return this.urlSerializer.serialize(e);
            }
            parseUrl(e) {
                try {
                    return this.urlSerializer.parse(e);
                } catch {
                    return this.urlSerializer.parse("/");
                }
            }
            isActive(e, i) {
                let r;
                if (
                    (i === !0
                        ? (r = m({}, z7))
                        : i === !1
                          ? (r = m({}, C7))
                          : (r = i),
                    un(e))
                )
                    return K3(this.currentUrlTree, e, r);
                let o = this.parseUrl(e);
                return K3(this.currentUrlTree, o, r);
            }
            removeEmptyProps(e) {
                return Object.entries(e).reduce(
                    (i, [r, o]) => (o != null && (i[r] = o), i),
                    {},
                );
            }
            scheduleNavigation(e, i, r, o, a) {
                if (this.disposed) return Promise.resolve(!1);
                let s, c, d;
                a
                    ? ((s = a.resolve), (c = a.reject), (d = a.promise))
                    : (d = new Promise((f, v) => {
                          ((s = f), (c = v));
                      }));
                let h = this.pendingTasks.add();
                return (
                    ro(this, () => {
                        queueMicrotask(() => this.pendingTasks.remove(h));
                    }),
                    this.navigationTransitions.handleNavigationRequest({
                        source: i,
                        restoredState: r,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: e,
                        extras: o,
                        resolve: s,
                        reject: c,
                        promise: d,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState,
                    }),
                    d.catch((f) => Promise.reject(f))
                );
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function b7(t) {
    for (let n = 0; n < t.length; n++) if (t[n] == null) throw new j(4008, !1);
}
var oo = (() => {
        class t {
            router;
            route;
            tabIndexAttribute;
            renderer;
            el;
            locationStrategy;
            reactiveHref = Ce(null);
            get href() {
                return yt(this.reactiveHref);
            }
            set href(e) {
                this.reactiveHref.set(e);
            }
            target;
            queryParams;
            fragment;
            queryParamsHandling;
            state;
            info;
            relativeTo;
            isAnchorElement;
            subscription;
            onChanges = new Y();
            applicationErrorHandler = l(Y1);
            options = l(pn, { optional: !0 });
            constructor(e, i, r, o, a, s) {
                ((this.router = e),
                    (this.route = i),
                    (this.tabIndexAttribute = r),
                    (this.renderer = o),
                    (this.el = a),
                    (this.locationStrategy = s),
                    this.reactiveHref.set(l(new u3("href"), { optional: !0 })));
                let c = a.nativeElement.tagName?.toLowerCase();
                ((this.isAnchorElement =
                    c === "a" ||
                    c === "area" ||
                    !!(
                        typeof customElements == "object" &&
                        customElements
                            .get(c)
                            ?.observedAttributes?.includes?.("href")
                    )),
                    this.isAnchorElement
                        ? this.setTabIndexIfNotOnNativeEl("0")
                        : this.subscribeToNavigationEventsIfNecessary());
            }
            subscribeToNavigationEventsIfNecessary() {
                if (this.subscription !== void 0 || !this.isAnchorElement)
                    return;
                let e = this.preserveFragment,
                    i = (r) => r === "merge" || r === "preserve";
                ((e ||= i(this.queryParamsHandling)),
                    (e ||=
                        !this.queryParamsHandling &&
                        !i(this.options?.defaultQueryParamsHandling)),
                    e &&
                        (this.subscription = this.router.events.subscribe(
                            (r) => {
                                r instanceof ot && this.updateHref();
                            },
                        )));
            }
            preserveFragment = !1;
            skipLocationChange = !1;
            replaceUrl = !1;
            setTabIndexIfNotOnNativeEl(e) {
                this.tabIndexAttribute != null ||
                    this.isAnchorElement ||
                    this.applyAttributeValue("tabindex", e);
            }
            ngOnChanges(e) {
                (this.isAnchorElement &&
                    (this.updateHref(),
                    this.subscribeToNavigationEventsIfNecessary()),
                    this.onChanges.next(this));
            }
            routerLinkInput = null;
            set routerLink(e) {
                e == null
                    ? ((this.routerLinkInput = null),
                      this.setTabIndexIfNotOnNativeEl(null))
                    : (un(e)
                          ? (this.routerLinkInput = e)
                          : (this.routerLinkInput = Array.isArray(e) ? e : [e]),
                      this.setTabIndexIfNotOnNativeEl("0"));
            }
            onClick(e, i, r, o, a) {
                let s = this.urlTree;
                if (
                    s === null ||
                    (this.isAnchorElement &&
                        (e !== 0 ||
                            i ||
                            r ||
                            o ||
                            a ||
                            (typeof this.target == "string" &&
                                this.target != "_self")))
                )
                    return !0;
                let c = {
                    skipLocationChange: this.skipLocationChange,
                    replaceUrl: this.replaceUrl,
                    state: this.state,
                    info: this.info,
                };
                return (
                    this.router.navigateByUrl(s, c)?.catch((d) => {
                        this.applicationErrorHandler(d);
                    }),
                    !this.isAnchorElement
                );
            }
            ngOnDestroy() {
                this.subscription?.unsubscribe();
            }
            updateHref() {
                let e = this.urlTree;
                this.reactiveHref.set(
                    e !== null && this.locationStrategy
                        ? (this.locationStrategy?.prepareExternalUrl(
                              this.router.serializeUrl(e),
                          ) ?? "")
                        : null,
                );
            }
            applyAttributeValue(e, i) {
                let r = this.renderer,
                    o = this.el.nativeElement;
                i !== null ? r.setAttribute(o, e, i) : r.removeAttribute(o, e);
            }
            get urlTree() {
                return this.routerLinkInput === null
                    ? null
                    : un(this.routerLinkInput)
                      ? this.routerLinkInput
                      : this.router.createUrlTree(this.routerLinkInput, {
                            relativeTo:
                                this.relativeTo !== void 0
                                    ? this.relativeTo
                                    : this.route,
                            queryParams: this.queryParams,
                            fragment: this.fragment,
                            queryParamsHandling: this.queryParamsHandling,
                            preserveFragment: this.preserveFragment,
                        });
            }
            static ɵfac = function (i) {
                return new (i || t)(
                    w(ge),
                    w($t),
                    va("tabindex"),
                    w(oe),
                    w(B),
                    w(Et),
                );
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "routerLink", ""]],
                hostVars: 2,
                hostBindings: function (i, r) {
                    (i & 1 &&
                        ve("click", function (a) {
                            return r.onClick(
                                a.button,
                                a.ctrlKey,
                                a.shiftKey,
                                a.altKey,
                                a.metaKey,
                            );
                        }),
                        i & 2 &&
                            Dt(
                                "href",
                                r.reactiveHref(),
                                t3,
                            )("target", r.target));
                },
                inputs: {
                    target: "target",
                    queryParams: "queryParams",
                    fragment: "fragment",
                    queryParamsHandling: "queryParamsHandling",
                    state: "state",
                    info: "info",
                    relativeTo: "relativeTo",
                    preserveFragment: [
                        2,
                        "preserveFragment",
                        "preserveFragment",
                        _,
                    ],
                    skipLocationChange: [
                        2,
                        "skipLocationChange",
                        "skipLocationChange",
                        _,
                    ],
                    replaceUrl: [2, "replaceUrl", "replaceUrl", _],
                    routerLink: "routerLink",
                },
                features: [I],
            });
        }
        return t;
    })(),
    g4 = (() => {
        class t {
            router;
            element;
            renderer;
            cdr;
            link;
            links;
            classes = [];
            routerEventsSubscription;
            linkInputChangesSubscription;
            _isActive = !1;
            get isActive() {
                return this._isActive;
            }
            routerLinkActiveOptions = { exact: !1 };
            ariaCurrentWhenActive;
            isActiveChange = new X();
            constructor(e, i, r, o, a) {
                ((this.router = e),
                    (this.element = i),
                    (this.renderer = r),
                    (this.cdr = o),
                    (this.link = a),
                    (this.routerEventsSubscription = e.events.subscribe((s) => {
                        s instanceof ot && this.update();
                    })));
            }
            ngAfterContentInit() {
                S(this.links.changes, S(null))
                    .pipe(R1())
                    .subscribe((e) => {
                        (this.update(), this.subscribeToEachLinkOnChanges());
                    });
            }
            subscribeToEachLinkOnChanges() {
                this.linkInputChangesSubscription?.unsubscribe();
                let e = [...this.links.toArray(), this.link]
                    .filter((i) => !!i)
                    .map((i) => i.onChanges);
                this.linkInputChangesSubscription = Ee(e)
                    .pipe(R1())
                    .subscribe((i) => {
                        this._isActive !== this.isLinkActive(this.router)(i) &&
                            this.update();
                    });
            }
            set routerLinkActive(e) {
                let i = Array.isArray(e) ? e : e.split(" ");
                this.classes = i.filter((r) => !!r);
            }
            ngOnChanges(e) {
                this.update();
            }
            ngOnDestroy() {
                (this.routerEventsSubscription.unsubscribe(),
                    this.linkInputChangesSubscription?.unsubscribe());
            }
            update() {
                !this.links ||
                    !this.router.navigated ||
                    queueMicrotask(() => {
                        let e = this.hasActiveLinks();
                        (this.classes.forEach((i) => {
                            e
                                ? this.renderer.addClass(
                                      this.element.nativeElement,
                                      i,
                                  )
                                : this.renderer.removeClass(
                                      this.element.nativeElement,
                                      i,
                                  );
                        }),
                            e && this.ariaCurrentWhenActive !== void 0
                                ? this.renderer.setAttribute(
                                      this.element.nativeElement,
                                      "aria-current",
                                      this.ariaCurrentWhenActive.toString(),
                                  )
                                : this.renderer.removeAttribute(
                                      this.element.nativeElement,
                                      "aria-current",
                                  ),
                            this._isActive !== e &&
                                ((this._isActive = e),
                                this.cdr.markForCheck(),
                                this.isActiveChange.emit(e)));
                    });
            }
            isLinkActive(e) {
                let i = _7(this.routerLinkActiveOptions)
                    ? this.routerLinkActiveOptions
                    : this.routerLinkActiveOptions.exact || !1;
                return (r) => {
                    let o = r.urlTree;
                    return o ? e.isActive(o, i) : !1;
                };
            }
            hasActiveLinks() {
                let e = this.isLinkActive(this.router);
                return (this.link && e(this.link)) || this.links.some(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(w(ge), w(B), w(oe), w(ee), w(oo, 8));
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "routerLinkActive", ""]],
                contentQueries: function (i, r, o) {
                    if ((i & 1 && et(o, oo, 5), i & 2)) {
                        let a;
                        le((a = de())) && (r.links = a);
                    }
                },
                inputs: {
                    routerLinkActiveOptions: "routerLinkActiveOptions",
                    ariaCurrentWhenActive: "ariaCurrentWhenActive",
                    routerLinkActive: "routerLinkActive",
                },
                outputs: { isActiveChange: "isActiveChange" },
                exportAs: ["routerLinkActive"],
                features: [I],
            });
        }
        return t;
    })();
function _7(t) {
    return !!t.paths;
}
var yi = class {};
var Os = (() => {
        class t {
            router;
            injector;
            preloadingStrategy;
            loader;
            subscription;
            constructor(e, i, r, o) {
                ((this.router = e),
                    (this.injector = i),
                    (this.preloadingStrategy = r),
                    (this.loader = o));
            }
            setUpPreloading() {
                this.subscription = this.router.events
                    .pipe(
                        J((e) => e instanceof ot),
                        Gt(() => this.preload()),
                    )
                    .subscribe(() => {});
            }
            preload() {
                return this.processRoutes(this.injector, this.router.config);
            }
            ngOnDestroy() {
                this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(e, i) {
                let r = [];
                for (let o of i) {
                    o.providers &&
                        !o._injector &&
                        (o._injector = cr(o.providers, e, `Route: ${o.path}`));
                    let a = o._injector ?? e,
                        s = o._loadedInjector ?? a;
                    (((o.loadChildren &&
                        !o._loadedRoutes &&
                        o.canLoad === void 0) ||
                        (o.loadComponent && !o._loadedComponent)) &&
                        r.push(this.preloadConfig(a, o)),
                        (o.children || o._loadedRoutes) &&
                            r.push(
                                this.processRoutes(
                                    s,
                                    o.children ?? o._loadedRoutes,
                                ),
                            ));
                }
                return Ee(r).pipe(R1());
            }
            preloadConfig(e, i) {
                return this.preloadingStrategy.preload(i, () => {
                    let r;
                    i.loadChildren && i.canLoad === void 0
                        ? (r = this.loader.loadChildren(e, i))
                        : (r = S(null));
                    let o = r.pipe(
                        Ie((a) =>
                            a === null
                                ? S(void 0)
                                : ((i._loadedRoutes = a.routes),
                                  (i._loadedInjector = a.injector),
                                  this.processRoutes(
                                      a.injector ?? e,
                                      a.routes,
                                  )),
                        ),
                    );
                    if (i.loadComponent && !i._loadedComponent) {
                        let a = this.loader.loadComponent(e, i);
                        return Ee([o, a]).pipe(R1());
                    } else return o;
                });
            }
            static ɵfac = function (i) {
                return new (i || t)(x(ge), x(Ne), x(yi), x(to));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Is = new b(""),
    w7 = (() => {
        class t {
            urlSerializer;
            transitions;
            viewportScroller;
            zone;
            options;
            routerEventsSubscription;
            scrollEventsSubscription;
            lastId = 0;
            lastSource = c1;
            restoredId = 0;
            store = {};
            constructor(e, i, r, o, a = {}) {
                ((this.urlSerializer = e),
                    (this.transitions = i),
                    (this.viewportScroller = r),
                    (this.zone = o),
                    (this.options = a),
                    (a.scrollPositionRestoration ||= "disabled"),
                    (a.anchorScrolling ||= "disabled"));
            }
            init() {
                (this.options.scrollPositionRestoration !== "disabled" &&
                    this.viewportScroller.setHistoryScrollRestoration("manual"),
                    (this.routerEventsSubscription = this.createScrollEvents()),
                    (this.scrollEventsSubscription =
                        this.consumeScrollEvents()));
            }
            createScrollEvents() {
                return this.transitions.events.subscribe((e) => {
                    e instanceof mn
                        ? ((this.store[this.lastId] =
                              this.viewportScroller.getScrollPosition()),
                          (this.lastSource = e.navigationTrigger),
                          (this.restoredId = e.restoredState
                              ? e.restoredState.navigationId
                              : 0))
                        : e instanceof ot
                          ? ((this.lastId = e.id),
                            this.scheduleScrollEvent(
                                e,
                                this.urlSerializer.parse(e.urlAfterRedirects)
                                    .fragment,
                            ))
                          : e instanceof Ut &&
                            e.code === d1.IgnoredSameUrlNavigation &&
                            ((this.lastSource = void 0),
                            (this.restoredId = 0),
                            this.scheduleScrollEvent(
                                e,
                                this.urlSerializer.parse(e.url).fragment,
                            ));
                });
            }
            consumeScrollEvents() {
                return this.transitions.events.subscribe((e) => {
                    e instanceof u1 &&
                        (e.position
                            ? this.options.scrollPositionRestoration === "top"
                                ? this.viewportScroller.scrollToPosition([0, 0])
                                : this.options.scrollPositionRestoration ===
                                      "enabled" &&
                                  this.viewportScroller.scrollToPosition(
                                      e.position,
                                  )
                            : e.anchor &&
                                this.options.anchorScrolling === "enabled"
                              ? this.viewportScroller.scrollToAnchor(e.anchor)
                              : this.options.scrollPositionRestoration !==
                                    "disabled" &&
                                this.viewportScroller.scrollToPosition([0, 0]));
                });
            }
            scheduleScrollEvent(e, i) {
                this.zone.runOutsideAngular(() =>
                    rr(this, null, function* () {
                        (yield new Promise((r) => {
                            (setTimeout(r),
                                typeof requestAnimationFrame < "u" &&
                                    requestAnimationFrame(r));
                        }),
                            this.zone.run(() => {
                                this.transitions.events.next(
                                    new u1(
                                        e,
                                        this.lastSource === "popstate"
                                            ? this.store[this.restoredId]
                                            : null,
                                        i,
                                    ),
                                );
                            }));
                    }),
                );
            }
            ngOnDestroy() {
                (this.routerEventsSubscription?.unsubscribe(),
                    this.scrollEventsSubscription?.unsubscribe());
            }
            static ɵfac = function (i) {
                sr();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })();
function y4(t, ...n) {
    return $e([
        { provide: Rn, multi: !0, useValue: t },
        [],
        { provide: $t, useFactory: Rs, deps: [ge] },
        { provide: ba, multi: !0, useFactory: Ls },
        n.map((e) => e.ɵproviders),
    ]);
}
function Rs(t) {
    return t.routerState.root;
}
function zi(t, n) {
    return { ɵkind: t, ɵproviders: n };
}
function Ls() {
    let t = l(fe);
    return (n) => {
        let e = t.get(an);
        if (n !== e.components[0]) return;
        let i = t.get(ge),
            r = t.get(Ns);
        (t.get(z4) === 1 && i.initialNavigation(),
            t.get(js, null, { optional: !0 })?.setUpPreloading(),
            t.get(Is, null, { optional: !0 })?.init(),
            i.resetRootComponentType(e.componentTypes[0]),
            r.closed || (r.next(), r.complete(), r.unsubscribe()));
    };
}
var Ns = new b("", { factory: () => new Y() }),
    z4 = new b("", { providedIn: "root", factory: () => 1 });
function Ys() {
    let t = [
        { provide: z4, useValue: 0 },
        Ca(() => {
            let n = l(fe);
            return n.get(Sa, Promise.resolve()).then(
                () =>
                    new Promise((i) => {
                        let r = n.get(ge),
                            o = n.get(Ns);
                        (ro(r, () => {
                            i(!0);
                        }),
                            (n.get(io).afterPreactivation = () => (
                                i(!0),
                                o.closed ? S(void 0) : o
                            )),
                            r.initialNavigation());
                    }),
            );
        }),
    ];
    return zi(2, t);
}
function Bs() {
    let t = [
        Ca(() => {
            l(ge).setUpLocationChangeListener();
        }),
        { provide: z4, useValue: 2 },
    ];
    return zi(3, t);
}
var js = new b("");
function Us(t) {
    return zi(0, [
        { provide: js, useExisting: Os },
        { provide: yi, useExisting: t },
    ]);
}
function $s() {
    return zi(8, [l4, { provide: vi, useExisting: l4 }]);
}
function Ws(t) {
    Zn("NgRouterViewTransitions");
    let n = [
        { provide: m4, useValue: Vs },
        {
            provide: p4,
            useValue: m({ skipNextTransition: !!t?.skipInitialTransition }, t),
        },
    ];
    return zi(9, n);
}
var qs = [
        Rt,
        { provide: Hn, useClass: hn },
        ge,
        On,
        { provide: $t, useFactory: Rs, deps: [ge] },
        to,
        [],
    ],
    C4 = (() => {
        class t {
            constructor() {}
            static forRoot(e, i) {
                return {
                    ngModule: t,
                    providers: [
                        qs,
                        [],
                        { provide: Rn, multi: !0, useValue: e },
                        [],
                        i?.errorHandler
                            ? { provide: f4, useValue: i.errorHandler }
                            : [],
                        { provide: pn, useValue: i || {} },
                        i?.useHash ? S7() : D7(),
                        M7(),
                        i?.preloadingStrategy
                            ? Us(i.preloadingStrategy).ɵproviders
                            : [],
                        i?.initialNavigation ? x7(i) : [],
                        i?.bindToComponentInputs ? $s().ɵproviders : [],
                        i?.enableViewTransitions ? Ws().ɵproviders : [],
                        T7(),
                    ],
                };
            }
            static forChild(e) {
                return {
                    ngModule: t,
                    providers: [{ provide: Rn, multi: !0, useValue: e }],
                };
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
function M7() {
    return {
        provide: Is,
        useFactory: () => {
            let t = l(S3),
                n = l(q),
                e = l(pn),
                i = l(io),
                r = l(Hn);
            return (
                e.scrollOffset && t.setOffset(e.scrollOffset),
                new w7(r, i, t, n, e)
            );
        },
    };
}
function S7() {
    return { provide: Et, useClass: xa };
}
function D7() {
    return { provide: Et, useClass: _r };
}
function x7(t) {
    return [
        t.initialNavigation === "disabled" ? Bs().ɵproviders : [],
        t.initialNavigation === "enabledBlocking" ? Ys().ɵproviders : [],
    ];
}
var v4 = new b("");
function T7() {
    return [
        { provide: v4, useFactory: Ls },
        { provide: ba, multi: !0, useExisting: v4 },
    ];
}
var ao = class t {
    constructor(n) {
        this.router = n;
    }
    switchTo(n) {
        this.router.navigate(["/auth", n]);
    }
    static ɵfac = function (e) {
        return new (e || t)(w(ge));
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-auth"]],
        decls: 7,
        vars: 0,
        consts: [
            [1, "auth-container"],
            [1, "auth-toggle"],
            ["routerLinkActive", "active", 3, "click"],
        ],
        template: function (e, i) {
            e & 1 &&
                (z(0, "div", 0)(1, "div", 1)(2, "button", 2),
                ve("click", function () {
                    return i.switchTo("login");
                }),
                Q(3, "Login"),
                C(),
                z(4, "button", 2),
                ve("click", function () {
                    return i.switchTo("register");
                }),
                Q(5, "Register"),
                C()(),
                W(6, "router-outlet"),
                C());
        },
        dependencies: [C4, In, g4],
        styles: [
            ".auth-container[_ngcontent-%COMP%]{max-width:500px;margin:2rem auto;padding:0}.auth-toggle[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:2rem;background:#fff;border-radius:8px;padding:4px;box-shadow:0 2px 8px #0000001a}.auth-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:12px 24px;font-weight:500;background:none;border:none;cursor:pointer;border-radius:6px;transition:all .3s ease}.auth-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background-color:#1890ff;color:#fff;box-shadow:0 2px 4px #1890ff4d}.auth-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(.active){background-color:#f5f5f5}",
        ],
    });
};
var tc = (() => {
        class t {
            _renderer;
            _elementRef;
            onChange = (e) => {};
            onTouched = () => {};
            constructor(e, i) {
                ((this._renderer = e), (this._elementRef = i));
            }
            setProperty(e, i) {
                this._renderer.setProperty(
                    this._elementRef.nativeElement,
                    e,
                    i,
                );
            }
            registerOnTouched(e) {
                this.onTouched = e;
            }
            registerOnChange(e) {
                this.onChange = e;
            }
            setDisabledState(e) {
                this.setProperty("disabled", e);
            }
            static ɵfac = function (i) {
                return new (i || t)(w(oe), w(B));
            };
            static ɵdir = D({ type: t });
        }
        return t;
    })(),
    k7 = (() => {
        class t extends tc {
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵdir = D({ type: t, features: [Se] });
        }
        return t;
    })(),
    b1 = new b("");
var E7 = { provide: b1, useExisting: Ft(() => gn), multi: !0 };
function P7() {
    let t = zt() ? zt().getUserAgent() : "";
    return /android (\d+)/.test(t.toLowerCase());
}
var A7 = new b(""),
    gn = (() => {
        class t extends tc {
            _compositionMode;
            _composing = !1;
            constructor(e, i, r) {
                (super(e, i),
                    (this._compositionMode = r),
                    this._compositionMode == null &&
                        (this._compositionMode = !P7()));
            }
            writeValue(e) {
                let i = e ?? "";
                this.setProperty("value", i);
            }
            _handleInput(e) {
                (!this._compositionMode ||
                    (this._compositionMode && !this._composing)) &&
                    this.onChange(e);
            }
            _compositionStart() {
                this._composing = !0;
            }
            _compositionEnd(e) {
                ((this._composing = !1),
                    this._compositionMode && this.onChange(e));
            }
            static ɵfac = function (i) {
                return new (i || t)(w(oe), w(B), w(A7, 8));
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["input", "formControlName", "", 3, "type", "checkbox"],
                    ["textarea", "formControlName", ""],
                    ["input", "formControl", "", 3, "type", "checkbox"],
                    ["textarea", "formControl", ""],
                    ["input", "ngModel", "", 3, "type", "checkbox"],
                    ["textarea", "ngModel", ""],
                    ["", "ngDefaultControl", ""],
                ],
                hostBindings: function (i, r) {
                    i & 1 &&
                        ve("input", function (a) {
                            return r._handleInput(a.target.value);
                        })("blur", function () {
                            return r.onTouched();
                        })("compositionstart", function () {
                            return r._compositionStart();
                        })("compositionend", function (a) {
                            return r._compositionEnd(a.target.value);
                        });
                },
                standalone: !1,
                features: [we([E7]), Se],
            });
        }
        return t;
    })();
function x4(t) {
    return t == null || T4(t) === 0;
}
function T4(t) {
    return t == null
        ? null
        : Array.isArray(t) || typeof t == "string"
          ? t.length
          : t instanceof Set
            ? t.size
            : null;
}
var Si = new b(""),
    zo = new b(""),
    V7 =
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    at = class {
        static min(n) {
            return F7(n);
        }
        static max(n) {
            return H7(n);
        }
        static required(n) {
            return O7(n);
        }
        static requiredTrue(n) {
            return I7(n);
        }
        static email(n) {
            return R7(n);
        }
        static minLength(n) {
            return L7(n);
        }
        static maxLength(n) {
            return nc(n);
        }
        static pattern(n) {
            return N7(n);
        }
        static nullValidator(n) {
            return co();
        }
        static compose(n) {
            return cc(n);
        }
        static composeAsync(n) {
            return dc(n);
        }
    };
function F7(t) {
    return (n) => {
        if (n.value == null || t == null) return null;
        let e = parseFloat(n.value);
        return !isNaN(e) && e < t ? { min: { min: t, actual: n.value } } : null;
    };
}
function H7(t) {
    return (n) => {
        if (n.value == null || t == null) return null;
        let e = parseFloat(n.value);
        return !isNaN(e) && e > t ? { max: { max: t, actual: n.value } } : null;
    };
}
function O7(t) {
    return x4(t.value) ? { required: !0 } : null;
}
function I7(t) {
    return t.value === !0 ? null : { required: !0 };
}
function R7(t) {
    return x4(t.value) || V7.test(t.value) ? null : { email: !0 };
}
function L7(t) {
    return (n) => {
        let e = n.value?.length ?? T4(n.value);
        return e === null || e === 0
            ? null
            : e < t
              ? { minlength: { requiredLength: t, actualLength: e } }
              : null;
    };
}
function nc(t) {
    return (n) => {
        let e = n.value?.length ?? T4(n.value);
        return e !== null && e > t
            ? { maxlength: { requiredLength: t, actualLength: e } }
            : null;
    };
}
function N7(t) {
    if (!t) return co;
    let n, e;
    return (
        typeof t == "string"
            ? ((e = ""),
              t.charAt(0) !== "^" && (e += "^"),
              (e += t),
              t.charAt(t.length - 1) !== "$" && (e += "$"),
              (n = new RegExp(e)))
            : ((e = t.toString()), (n = t)),
        (i) => {
            if (x4(i.value)) return null;
            let r = i.value;
            return n.test(r)
                ? null
                : { pattern: { requiredPattern: e, actualValue: r } };
        }
    );
}
function co(t) {
    return null;
}
function ic(t) {
    return t != null;
}
function rc(t) {
    return $1(t) ? Ee(t) : t;
}
function oc(t) {
    let n = {};
    return (
        t.forEach((e) => {
            n = e != null ? m(m({}, n), e) : n;
        }),
        Object.keys(n).length === 0 ? null : n
    );
}
function ac(t, n) {
    return n.map((e) => e(t));
}
function Y7(t) {
    return !t.validate;
}
function sc(t) {
    return t.map((n) => (Y7(n) ? n : (e) => n.validate(e)));
}
function cc(t) {
    if (!t) return null;
    let n = t.filter(ic);
    return n.length == 0
        ? null
        : function (e) {
              return oc(ac(e, n));
          };
}
function lc(t) {
    return t != null ? cc(sc(t)) : null;
}
function dc(t) {
    if (!t) return null;
    let n = t.filter(ic);
    return n.length == 0
        ? null
        : function (e) {
              let i = ac(e, n).map(rc);
              return P2(i).pipe(L(oc));
          };
}
function hc(t) {
    return t != null ? dc(sc(t)) : null;
}
function Gs(t, n) {
    return t === null ? [n] : Array.isArray(t) ? [...t, n] : [t, n];
}
function uc(t) {
    return t._rawValidators;
}
function mc(t) {
    return t._rawAsyncValidators;
}
function _4(t) {
    return t ? (Array.isArray(t) ? t : [t]) : [];
}
function lo(t, n) {
    return Array.isArray(t) ? t.includes(n) : t === n;
}
function Ks(t, n) {
    let e = _4(n);
    return (
        _4(t).forEach((r) => {
            lo(e, r) || e.push(r);
        }),
        e
    );
}
function Zs(t, n) {
    return _4(n).filter((e) => !lo(t, e));
}
var ho = class {
        get value() {
            return this.control ? this.control.value : null;
        }
        get valid() {
            return this.control ? this.control.valid : null;
        }
        get invalid() {
            return this.control ? this.control.invalid : null;
        }
        get pending() {
            return this.control ? this.control.pending : null;
        }
        get disabled() {
            return this.control ? this.control.disabled : null;
        }
        get enabled() {
            return this.control ? this.control.enabled : null;
        }
        get errors() {
            return this.control ? this.control.errors : null;
        }
        get pristine() {
            return this.control ? this.control.pristine : null;
        }
        get dirty() {
            return this.control ? this.control.dirty : null;
        }
        get touched() {
            return this.control ? this.control.touched : null;
        }
        get status() {
            return this.control ? this.control.status : null;
        }
        get untouched() {
            return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
            return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
            return this.control ? this.control.valueChanges : null;
        }
        get path() {
            return null;
        }
        _composedValidatorFn;
        _composedAsyncValidatorFn;
        _rawValidators = [];
        _rawAsyncValidators = [];
        _setValidators(n) {
            ((this._rawValidators = n || []),
                (this._composedValidatorFn = lc(this._rawValidators)));
        }
        _setAsyncValidators(n) {
            ((this._rawAsyncValidators = n || []),
                (this._composedAsyncValidatorFn = hc(
                    this._rawAsyncValidators,
                )));
        }
        get validator() {
            return this._composedValidatorFn || null;
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn || null;
        }
        _onDestroyCallbacks = [];
        _registerOnDestroy(n) {
            this._onDestroyCallbacks.push(n);
        }
        _invokeOnDestroyCallbacks() {
            (this._onDestroyCallbacks.forEach((n) => n()),
                (this._onDestroyCallbacks = []));
        }
        reset(n = void 0) {
            this.control && this.control.reset(n);
        }
        hasError(n, e) {
            return this.control ? this.control.hasError(n, e) : !1;
        }
        getError(n, e) {
            return this.control ? this.control.getError(n, e) : null;
        }
    },
    Ln = class extends ho {
        name;
        get formDirective() {
            return null;
        }
        get path() {
            return null;
        }
    },
    st = class extends ho {
        _parent = null;
        name = null;
        valueAccessor = null;
    },
    uo = class {
        _cd;
        constructor(n) {
            this._cd = n;
        }
        get isTouched() {
            return (
                this._cd?.control?._touched?.(),
                !!this._cd?.control?.touched
            );
        }
        get isUntouched() {
            return !!this._cd?.control?.untouched;
        }
        get isPristine() {
            return (
                this._cd?.control?._pristine?.(),
                !!this._cd?.control?.pristine
            );
        }
        get isDirty() {
            return !!this._cd?.control?.dirty;
        }
        get isValid() {
            return (this._cd?.control?._status?.(), !!this._cd?.control?.valid);
        }
        get isInvalid() {
            return !!this._cd?.control?.invalid;
        }
        get isPending() {
            return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
            return (this._cd?._submitted?.(), !!this._cd?.submitted);
        }
    },
    B7 = {
        "[class.ng-untouched]": "isUntouched",
        "[class.ng-touched]": "isTouched",
        "[class.ng-pristine]": "isPristine",
        "[class.ng-dirty]": "isDirty",
        "[class.ng-valid]": "isValid",
        "[class.ng-invalid]": "isInvalid",
        "[class.ng-pending]": "isPending",
    },
    vg = Z(m({}, B7), { "[class.ng-submitted]": "isSubmitted" }),
    _1 = (() => {
        class t extends uo {
            constructor(e) {
                super(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(w(st, 2));
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "formControlName", ""],
                    ["", "ngModel", ""],
                    ["", "formControl", ""],
                ],
                hostVars: 14,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ng-untouched", r.isUntouched)(
                            "ng-touched",
                            r.isTouched,
                        )("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)(
                            "ng-valid",
                            r.isValid,
                        )("ng-invalid", r.isInvalid)("ng-pending", r.isPending);
                },
                standalone: !1,
                features: [Se],
            });
        }
        return t;
    })(),
    Co = (() => {
        class t extends uo {
            constructor(e) {
                super(e);
            }
            static ɵfac = function (i) {
                return new (i || t)(w(Ln, 10));
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "formGroupName", ""],
                    ["", "formArrayName", ""],
                    ["", "ngModelGroup", ""],
                    ["", "formGroup", ""],
                    ["form", 3, "ngNoForm", ""],
                    ["", "ngForm", ""],
                ],
                hostVars: 16,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ng-untouched", r.isUntouched)(
                            "ng-touched",
                            r.isTouched,
                        )("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)(
                            "ng-valid",
                            r.isValid,
                        )("ng-invalid", r.isInvalid)("ng-pending", r.isPending)(
                            "ng-submitted",
                            r.isSubmitted,
                        );
                },
                standalone: !1,
                features: [Se],
            });
        }
        return t;
    })();
var Ci = "VALID",
    so = "INVALID",
    z1 = "PENDING",
    bi = "DISABLED",
    fn = class {},
    mo = class extends fn {
        value;
        source;
        constructor(n, e) {
            (super(), (this.value = n), (this.source = e));
        }
    },
    _i = class extends fn {
        pristine;
        source;
        constructor(n, e) {
            (super(), (this.pristine = n), (this.source = e));
        }
    },
    wi = class extends fn {
        touched;
        source;
        constructor(n, e) {
            (super(), (this.touched = n), (this.source = e));
        }
    },
    C1 = class extends fn {
        status;
        source;
        constructor(n, e) {
            (super(), (this.status = n), (this.source = e));
        }
    },
    w4 = class extends fn {
        source;
        constructor(n) {
            (super(), (this.source = n));
        }
    },
    M4 = class extends fn {
        source;
        constructor(n) {
            (super(), (this.source = n));
        }
    };
function k4(t) {
    return (bo(t) ? t.validators : t) || null;
}
function j7(t) {
    return Array.isArray(t) ? lc(t) : t || null;
}
function E4(t, n) {
    return (bo(n) ? n.asyncValidators : t) || null;
}
function U7(t) {
    return Array.isArray(t) ? hc(t) : t || null;
}
function bo(t) {
    return t != null && !Array.isArray(t) && typeof t == "object";
}
function pc(t, n, e) {
    let i = t.controls;
    if (!(n ? Object.keys(i) : i).length) throw new j(1e3, "");
    if (!i[e]) throw new j(1001, "");
}
function fc(t, n, e) {
    t._forEachChild((i, r) => {
        if (e[r] === void 0) throw new j(1002, "");
    });
}
var vn = class {
        _pendingDirty = !1;
        _hasOwnPendingAsyncValidator = null;
        _pendingTouched = !1;
        _onCollectionChange = () => {};
        _updateOn;
        _parent = null;
        _asyncValidationSubscription;
        _composedValidatorFn;
        _composedAsyncValidatorFn;
        _rawValidators;
        _rawAsyncValidators;
        value;
        constructor(n, e) {
            (this._assignValidators(n), this._assignAsyncValidators(e));
        }
        get validator() {
            return this._composedValidatorFn;
        }
        set validator(n) {
            this._rawValidators = this._composedValidatorFn = n;
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn;
        }
        set asyncValidator(n) {
            this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
        }
        get parent() {
            return this._parent;
        }
        get status() {
            return yt(this.statusReactive);
        }
        set status(n) {
            yt(() => this.statusReactive.set(n));
        }
        _status = nt(() => this.statusReactive());
        statusReactive = Ce(void 0);
        get valid() {
            return this.status === Ci;
        }
        get invalid() {
            return this.status === so;
        }
        get pending() {
            return this.status == z1;
        }
        get disabled() {
            return this.status === bi;
        }
        get enabled() {
            return this.status !== bi;
        }
        errors;
        get pristine() {
            return yt(this.pristineReactive);
        }
        set pristine(n) {
            yt(() => this.pristineReactive.set(n));
        }
        _pristine = nt(() => this.pristineReactive());
        pristineReactive = Ce(!0);
        get dirty() {
            return !this.pristine;
        }
        get touched() {
            return yt(this.touchedReactive);
        }
        set touched(n) {
            yt(() => this.touchedReactive.set(n));
        }
        _touched = nt(() => this.touchedReactive());
        touchedReactive = Ce(!1);
        get untouched() {
            return !this.touched;
        }
        _events = new Y();
        events = this._events.asObservable();
        valueChanges;
        statusChanges;
        get updateOn() {
            return this._updateOn
                ? this._updateOn
                : this.parent
                  ? this.parent.updateOn
                  : "change";
        }
        setValidators(n) {
            this._assignValidators(n);
        }
        setAsyncValidators(n) {
            this._assignAsyncValidators(n);
        }
        addValidators(n) {
            this.setValidators(Ks(n, this._rawValidators));
        }
        addAsyncValidators(n) {
            this.setAsyncValidators(Ks(n, this._rawAsyncValidators));
        }
        removeValidators(n) {
            this.setValidators(Zs(n, this._rawValidators));
        }
        removeAsyncValidators(n) {
            this.setAsyncValidators(Zs(n, this._rawAsyncValidators));
        }
        hasValidator(n) {
            return lo(this._rawValidators, n);
        }
        hasAsyncValidator(n) {
            return lo(this._rawAsyncValidators, n);
        }
        clearValidators() {
            this.validator = null;
        }
        clearAsyncValidators() {
            this.asyncValidator = null;
        }
        markAsTouched(n = {}) {
            let e = this.touched === !1;
            this.touched = !0;
            let i = n.sourceControl ?? this;
            (this._parent &&
                !n.onlySelf &&
                this._parent.markAsTouched(Z(m({}, n), { sourceControl: i })),
                e && n.emitEvent !== !1 && this._events.next(new wi(!0, i)));
        }
        markAllAsDirty(n = {}) {
            (this.markAsDirty({
                onlySelf: !0,
                emitEvent: n.emitEvent,
                sourceControl: this,
            }),
                this._forEachChild((e) => e.markAllAsDirty(n)));
        }
        markAllAsTouched(n = {}) {
            (this.markAsTouched({
                onlySelf: !0,
                emitEvent: n.emitEvent,
                sourceControl: this,
            }),
                this._forEachChild((e) => e.markAllAsTouched(n)));
        }
        markAsUntouched(n = {}) {
            let e = this.touched === !0;
            ((this.touched = !1), (this._pendingTouched = !1));
            let i = n.sourceControl ?? this;
            (this._forEachChild((r) => {
                r.markAsUntouched({
                    onlySelf: !0,
                    emitEvent: n.emitEvent,
                    sourceControl: i,
                });
            }),
                this._parent &&
                    !n.onlySelf &&
                    this._parent._updateTouched(n, i),
                e && n.emitEvent !== !1 && this._events.next(new wi(!1, i)));
        }
        markAsDirty(n = {}) {
            let e = this.pristine === !0;
            this.pristine = !1;
            let i = n.sourceControl ?? this;
            (this._parent &&
                !n.onlySelf &&
                this._parent.markAsDirty(Z(m({}, n), { sourceControl: i })),
                e && n.emitEvent !== !1 && this._events.next(new _i(!1, i)));
        }
        markAsPristine(n = {}) {
            let e = this.pristine === !1;
            ((this.pristine = !0), (this._pendingDirty = !1));
            let i = n.sourceControl ?? this;
            (this._forEachChild((r) => {
                r.markAsPristine({ onlySelf: !0, emitEvent: n.emitEvent });
            }),
                this._parent &&
                    !n.onlySelf &&
                    this._parent._updatePristine(n, i),
                e && n.emitEvent !== !1 && this._events.next(new _i(!0, i)));
        }
        markAsPending(n = {}) {
            this.status = z1;
            let e = n.sourceControl ?? this;
            (n.emitEvent !== !1 &&
                (this._events.next(new C1(this.status, e)),
                this.statusChanges.emit(this.status)),
                this._parent &&
                    !n.onlySelf &&
                    this._parent.markAsPending(
                        Z(m({}, n), { sourceControl: e }),
                    ));
        }
        disable(n = {}) {
            let e = this._parentMarkedDirty(n.onlySelf);
            ((this.status = bi),
                (this.errors = null),
                this._forEachChild((r) => {
                    r.disable(Z(m({}, n), { onlySelf: !0 }));
                }),
                this._updateValue());
            let i = n.sourceControl ?? this;
            (n.emitEvent !== !1 &&
                (this._events.next(new mo(this.value, i)),
                this._events.next(new C1(this.status, i)),
                this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._updateAncestors(
                    Z(m({}, n), { skipPristineCheck: e }),
                    this,
                ),
                this._onDisabledChange.forEach((r) => r(!0)));
        }
        enable(n = {}) {
            let e = this._parentMarkedDirty(n.onlySelf);
            ((this.status = Ci),
                this._forEachChild((i) => {
                    i.enable(Z(m({}, n), { onlySelf: !0 }));
                }),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: n.emitEvent,
                }),
                this._updateAncestors(
                    Z(m({}, n), { skipPristineCheck: e }),
                    this,
                ),
                this._onDisabledChange.forEach((i) => i(!1)));
        }
        _updateAncestors(n, e) {
            this._parent &&
                !n.onlySelf &&
                (this._parent.updateValueAndValidity(n),
                n.skipPristineCheck || this._parent._updatePristine({}, e),
                this._parent._updateTouched({}, e));
        }
        setParent(n) {
            this._parent = n;
        }
        getRawValue() {
            return this.value;
        }
        updateValueAndValidity(n = {}) {
            if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
                let i = this._cancelExistingSubscription();
                ((this.errors = this._runValidator()),
                    (this.status = this._calculateStatus()),
                    (this.status === Ci || this.status === z1) &&
                        this._runAsyncValidator(i, n.emitEvent));
            }
            let e = n.sourceControl ?? this;
            (n.emitEvent !== !1 &&
                (this._events.next(new mo(this.value, e)),
                this._events.next(new C1(this.status, e)),
                this.valueChanges.emit(this.value),
                this.statusChanges.emit(this.status)),
                this._parent &&
                    !n.onlySelf &&
                    this._parent.updateValueAndValidity(
                        Z(m({}, n), { sourceControl: e }),
                    ));
        }
        _updateTreeValidity(n = { emitEvent: !0 }) {
            (this._forEachChild((e) => e._updateTreeValidity(n)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: n.emitEvent,
                }));
        }
        _setInitialStatus() {
            this.status = this._allControlsDisabled() ? bi : Ci;
        }
        _runValidator() {
            return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(n, e) {
            if (this.asyncValidator) {
                ((this.status = z1),
                    (this._hasOwnPendingAsyncValidator = {
                        emitEvent: e !== !1,
                        shouldHaveEmitted: n !== !1,
                    }));
                let i = rc(this.asyncValidator(this));
                this._asyncValidationSubscription = i.subscribe((r) => {
                    ((this._hasOwnPendingAsyncValidator = null),
                        this.setErrors(r, {
                            emitEvent: e,
                            shouldHaveEmitted: n,
                        }));
                });
            }
        }
        _cancelExistingSubscription() {
            if (this._asyncValidationSubscription) {
                this._asyncValidationSubscription.unsubscribe();
                let n =
                    (this._hasOwnPendingAsyncValidator?.emitEvent ||
                        this._hasOwnPendingAsyncValidator?.shouldHaveEmitted) ??
                    !1;
                return ((this._hasOwnPendingAsyncValidator = null), n);
            }
            return !1;
        }
        setErrors(n, e = {}) {
            ((this.errors = n),
                this._updateControlsErrors(
                    e.emitEvent !== !1,
                    this,
                    e.shouldHaveEmitted,
                ));
        }
        get(n) {
            let e = n;
            return e == null ||
                (Array.isArray(e) || (e = e.split(".")), e.length === 0)
                ? null
                : e.reduce((i, r) => i && i._find(r), this);
        }
        getError(n, e) {
            let i = e ? this.get(e) : this;
            return i && i.errors ? i.errors[n] : null;
        }
        hasError(n, e) {
            return !!this.getError(n, e);
        }
        get root() {
            let n = this;
            for (; n._parent; ) n = n._parent;
            return n;
        }
        _updateControlsErrors(n, e, i) {
            ((this.status = this._calculateStatus()),
                n && this.statusChanges.emit(this.status),
                (n || i) && this._events.next(new C1(this.status, e)),
                this._parent && this._parent._updateControlsErrors(n, e, i));
        }
        _initObservables() {
            ((this.valueChanges = new X()), (this.statusChanges = new X()));
        }
        _calculateStatus() {
            return this._allControlsDisabled()
                ? bi
                : this.errors
                  ? so
                  : this._hasOwnPendingAsyncValidator ||
                      this._anyControlsHaveStatus(z1)
                    ? z1
                    : this._anyControlsHaveStatus(so)
                      ? so
                      : Ci;
        }
        _anyControlsHaveStatus(n) {
            return this._anyControls((e) => e.status === n);
        }
        _anyControlsDirty() {
            return this._anyControls((n) => n.dirty);
        }
        _anyControlsTouched() {
            return this._anyControls((n) => n.touched);
        }
        _updatePristine(n, e) {
            let i = !this._anyControlsDirty(),
                r = this.pristine !== i;
            ((this.pristine = i),
                this._parent &&
                    !n.onlySelf &&
                    this._parent._updatePristine(n, e),
                r && this._events.next(new _i(this.pristine, e)));
        }
        _updateTouched(n = {}, e) {
            ((this.touched = this._anyControlsTouched()),
                this._events.next(new wi(this.touched, e)),
                this._parent &&
                    !n.onlySelf &&
                    this._parent._updateTouched(n, e));
        }
        _onDisabledChange = [];
        _registerOnCollectionChange(n) {
            this._onCollectionChange = n;
        }
        _setUpdateStrategy(n) {
            bo(n) && n.updateOn != null && (this._updateOn = n.updateOn);
        }
        _parentMarkedDirty(n) {
            let e = this._parent && this._parent.dirty;
            return !n && !!e && !this._parent._anyControlsDirty();
        }
        _find(n) {
            return null;
        }
        _assignValidators(n) {
            ((this._rawValidators = Array.isArray(n) ? n.slice() : n),
                (this._composedValidatorFn = j7(this._rawValidators)));
        }
        _assignAsyncValidators(n) {
            ((this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
                (this._composedAsyncValidatorFn = U7(
                    this._rawAsyncValidators,
                )));
        }
    },
    po = class extends vn {
        constructor(n, e, i) {
            (super(k4(e), E4(i, e)),
                (this.controls = n),
                this._initObservables(),
                this._setUpdateStrategy(e),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator,
                }));
        }
        controls;
        registerControl(n, e) {
            return this.controls[n]
                ? this.controls[n]
                : ((this.controls[n] = e),
                  e.setParent(this),
                  e._registerOnCollectionChange(this._onCollectionChange),
                  e);
        }
        addControl(n, e, i = {}) {
            (this.registerControl(n, e),
                this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                this._onCollectionChange());
        }
        removeControl(n, e = {}) {
            (this.controls[n] &&
                this.controls[n]._registerOnCollectionChange(() => {}),
                delete this.controls[n],
                this.updateValueAndValidity({ emitEvent: e.emitEvent }),
                this._onCollectionChange());
        }
        setControl(n, e, i = {}) {
            (this.controls[n] &&
                this.controls[n]._registerOnCollectionChange(() => {}),
                delete this.controls[n],
                e && this.registerControl(n, e),
                this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                this._onCollectionChange());
        }
        contains(n) {
            return this.controls.hasOwnProperty(n) && this.controls[n].enabled;
        }
        setValue(n, e = {}) {
            (fc(this, !0, n),
                Object.keys(n).forEach((i) => {
                    (pc(this, !0, i),
                        this.controls[i].setValue(n[i], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        }));
                }),
                this.updateValueAndValidity(e));
        }
        patchValue(n, e = {}) {
            n != null &&
                (Object.keys(n).forEach((i) => {
                    let r = this.controls[i];
                    r &&
                        r.patchValue(n[i], {
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        });
                }),
                this.updateValueAndValidity(e));
        }
        reset(n = {}, e = {}) {
            (this._forEachChild((i, r) => {
                i.reset(n ? n[r] : null, {
                    onlySelf: !0,
                    emitEvent: e.emitEvent,
                });
            }),
                this._updatePristine(e, this),
                this._updateTouched(e, this),
                this.updateValueAndValidity(e));
        }
        getRawValue() {
            return this._reduceChildren(
                {},
                (n, e, i) => ((n[i] = e.getRawValue()), n),
            );
        }
        _syncPendingControls() {
            let n = this._reduceChildren(!1, (e, i) =>
                i._syncPendingControls() ? !0 : e,
            );
            return (n && this.updateValueAndValidity({ onlySelf: !0 }), n);
        }
        _forEachChild(n) {
            Object.keys(this.controls).forEach((e) => {
                let i = this.controls[e];
                i && n(i, e);
            });
        }
        _setUpControls() {
            this._forEachChild((n) => {
                (n.setParent(this),
                    n._registerOnCollectionChange(this._onCollectionChange));
            });
        }
        _updateValue() {
            this.value = this._reduceValue();
        }
        _anyControls(n) {
            for (let [e, i] of Object.entries(this.controls))
                if (this.contains(e) && n(i)) return !0;
            return !1;
        }
        _reduceValue() {
            let n = {};
            return this._reduceChildren(
                n,
                (e, i, r) => (
                    (i.enabled || this.disabled) && (e[r] = i.value),
                    e
                ),
            );
        }
        _reduceChildren(n, e) {
            let i = n;
            return (
                this._forEachChild((r, o) => {
                    i = e(i, r, o);
                }),
                i
            );
        }
        _allControlsDisabled() {
            for (let n of Object.keys(this.controls))
                if (this.controls[n].enabled) return !1;
            return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(n) {
            return this.controls.hasOwnProperty(n) ? this.controls[n] : null;
        }
    };
var S4 = class extends po {};
var _o = new b("", { providedIn: "root", factory: () => P4 }),
    P4 = "always";
function vc(t, n) {
    return [...n.path, t];
}
function fo(t, n, e = P4) {
    (A4(t, n),
        n.valueAccessor.writeValue(t.value),
        (t.disabled || e === "always") &&
            n.valueAccessor.setDisabledState?.(t.disabled),
        W7(t, n),
        G7(t, n),
        q7(t, n),
        $7(t, n));
}
function vo(t, n, e = !0) {
    let i = () => {};
    (n.valueAccessor &&
        (n.valueAccessor.registerOnChange(i),
        n.valueAccessor.registerOnTouched(i)),
        yo(t, n),
        t &&
            (n._invokeOnDestroyCallbacks(),
            t._registerOnCollectionChange(() => {})));
}
function go(t, n) {
    t.forEach((e) => {
        e.registerOnValidatorChange && e.registerOnValidatorChange(n);
    });
}
function $7(t, n) {
    if (n.valueAccessor.setDisabledState) {
        let e = (i) => {
            n.valueAccessor.setDisabledState(i);
        };
        (t.registerOnDisabledChange(e),
            n._registerOnDestroy(() => {
                t._unregisterOnDisabledChange(e);
            }));
    }
}
function A4(t, n) {
    let e = uc(t);
    n.validator !== null
        ? t.setValidators(Gs(e, n.validator))
        : typeof e == "function" && t.setValidators([e]);
    let i = mc(t);
    n.asyncValidator !== null
        ? t.setAsyncValidators(Gs(i, n.asyncValidator))
        : typeof i == "function" && t.setAsyncValidators([i]);
    let r = () => t.updateValueAndValidity();
    (go(n._rawValidators, r), go(n._rawAsyncValidators, r));
}
function yo(t, n) {
    let e = !1;
    if (t !== null) {
        if (n.validator !== null) {
            let r = uc(t);
            if (Array.isArray(r) && r.length > 0) {
                let o = r.filter((a) => a !== n.validator);
                o.length !== r.length && ((e = !0), t.setValidators(o));
            }
        }
        if (n.asyncValidator !== null) {
            let r = mc(t);
            if (Array.isArray(r) && r.length > 0) {
                let o = r.filter((a) => a !== n.asyncValidator);
                o.length !== r.length && ((e = !0), t.setAsyncValidators(o));
            }
        }
    }
    let i = () => {};
    return (go(n._rawValidators, i), go(n._rawAsyncValidators, i), e);
}
function W7(t, n) {
    n.valueAccessor.registerOnChange((e) => {
        ((t._pendingValue = e),
            (t._pendingChange = !0),
            (t._pendingDirty = !0),
            t.updateOn === "change" && gc(t, n));
    });
}
function q7(t, n) {
    n.valueAccessor.registerOnTouched(() => {
        ((t._pendingTouched = !0),
            t.updateOn === "blur" && t._pendingChange && gc(t, n),
            t.updateOn !== "submit" && t.markAsTouched());
    });
}
function gc(t, n) {
    (t._pendingDirty && t.markAsDirty(),
        t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
        n.viewToModelUpdate(t._pendingValue),
        (t._pendingChange = !1));
}
function G7(t, n) {
    let e = (i, r) => {
        (n.valueAccessor.writeValue(i), r && n.viewToModelUpdate(i));
    };
    (t.registerOnChange(e),
        n._registerOnDestroy(() => {
            t._unregisterOnChange(e);
        }));
}
function K7(t, n) {
    (t == null, A4(t, n));
}
function Z7(t, n) {
    return yo(t, n);
}
function V4(t, n) {
    if (!t.hasOwnProperty("model")) return !1;
    let e = t.model;
    return e.isFirstChange() ? !0 : !Object.is(n, e.currentValue);
}
function X7(t) {
    return Object.getPrototypeOf(t.constructor) === k7;
}
function Q7(t, n) {
    (t._syncPendingControls(),
        n.forEach((e) => {
            let i = e.control;
            i.updateOn === "submit" &&
                i._pendingChange &&
                (e.viewToModelUpdate(i._pendingValue), (i._pendingChange = !1));
        }));
}
function F4(t, n) {
    if (!n) return null;
    Array.isArray(n);
    let e, i, r;
    return (
        n.forEach((o) => {
            o.constructor === gn ? (e = o) : X7(o) ? (i = o) : (r = o);
        }),
        r || i || e || null
    );
}
function J7(t, n) {
    let e = t.indexOf(n);
    e > -1 && t.splice(e, 1);
}
function Xs(t, n) {
    let e = t.indexOf(n);
    e > -1 && t.splice(e, 1);
}
function Qs(t) {
    return (
        typeof t == "object" &&
        t !== null &&
        Object.keys(t).length === 2 &&
        "value" in t &&
        "disabled" in t
    );
}
var Mi = class extends vn {
    defaultValue = null;
    _onChange = [];
    _pendingValue;
    _pendingChange = !1;
    constructor(n = null, e, i) {
        (super(k4(e), E4(i, e)),
            this._applyFormState(n),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
            }),
            bo(e) &&
                (e.nonNullable || e.initialValueIsDefault) &&
                (Qs(n)
                    ? (this.defaultValue = n.value)
                    : (this.defaultValue = n)));
    }
    setValue(n, e = {}) {
        ((this.value = this._pendingValue = n),
            this._onChange.length &&
                e.emitModelToViewChange !== !1 &&
                this._onChange.forEach((i) =>
                    i(this.value, e.emitViewToModelChange !== !1),
                ),
            this.updateValueAndValidity(e));
    }
    patchValue(n, e = {}) {
        this.setValue(n, e);
    }
    reset(n = this.defaultValue, e = {}) {
        (this._applyFormState(n),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1));
    }
    _updateValue() {}
    _anyControls(n) {
        return !1;
    }
    _allControlsDisabled() {
        return this.disabled;
    }
    registerOnChange(n) {
        this._onChange.push(n);
    }
    _unregisterOnChange(n) {
        Xs(this._onChange, n);
    }
    registerOnDisabledChange(n) {
        this._onDisabledChange.push(n);
    }
    _unregisterOnDisabledChange(n) {
        Xs(this._onDisabledChange, n);
    }
    _forEachChild(n) {}
    _syncPendingControls() {
        return this.updateOn === "submit" &&
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            this._pendingChange)
            ? (this.setValue(this._pendingValue, {
                  onlySelf: !0,
                  emitModelToViewChange: !1,
              }),
              !0)
            : !1;
    }
    _applyFormState(n) {
        Qs(n)
            ? ((this.value = this._pendingValue = n.value),
              n.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = n);
    }
};
var ed = (t) => t instanceof Mi;
var td = { provide: st, useExisting: Ft(() => H4) },
    Js = Promise.resolve(),
    H4 = (() => {
        class t extends st {
            _changeDetectorRef;
            callSetDisabledState;
            control = new Mi();
            static ngAcceptInputType_isDisabled;
            _registered = !1;
            viewModel;
            name = "";
            isDisabled;
            model;
            options;
            update = new X();
            constructor(e, i, r, o, a, s) {
                (super(),
                    (this._changeDetectorRef = a),
                    (this.callSetDisabledState = s),
                    (this._parent = e),
                    this._setValidators(i),
                    this._setAsyncValidators(r),
                    (this.valueAccessor = F4(this, o)));
            }
            ngOnChanges(e) {
                if (
                    (this._checkForErrors(), !this._registered || "name" in e)
                ) {
                    if (
                        this._registered &&
                        (this._checkName(), this.formDirective)
                    ) {
                        let i = e.name.previousValue;
                        this.formDirective.removeControl({
                            name: i,
                            path: this._getPath(i),
                        });
                    }
                    this._setUpControl();
                }
                ("isDisabled" in e && this._updateDisabled(e),
                    V4(e, this.viewModel) &&
                        (this._updateValue(this.model),
                        (this.viewModel = this.model)));
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
                return this._getPath(this.name);
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(e) {
                ((this.viewModel = e), this.update.emit(e));
            }
            _setUpControl() {
                (this._setUpdateStrategy(),
                    this._isStandalone()
                        ? this._setUpStandalone()
                        : this.formDirective.addControl(this),
                    (this._registered = !0));
            }
            _setUpdateStrategy() {
                this.options &&
                    this.options.updateOn != null &&
                    (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
                return (
                    !this._parent || !!(this.options && this.options.standalone)
                );
            }
            _setUpStandalone() {
                (fo(this.control, this, this.callSetDisabledState),
                    this.control.updateValueAndValidity({ emitEvent: !1 }));
            }
            _checkForErrors() {
                this._checkName();
            }
            _checkName() {
                (this.options &&
                    this.options.name &&
                    (this.name = this.options.name),
                    !this._isStandalone() && this.name);
            }
            _updateValue(e) {
                Js.then(() => {
                    (this.control.setValue(e, { emitViewToModelChange: !1 }),
                        this._changeDetectorRef?.markForCheck());
                });
            }
            _updateDisabled(e) {
                let i = e.isDisabled.currentValue,
                    r = i !== 0 && _(i);
                Js.then(() => {
                    (r && !this.control.disabled
                        ? this.control.disable()
                        : !r && this.control.disabled && this.control.enable(),
                        this._changeDetectorRef?.markForCheck());
                });
            }
            _getPath(e) {
                return this._parent ? vc(e, this._parent) : [e];
            }
            static ɵfac = function (i) {
                return new (i || t)(
                    w(Ln, 9),
                    w(Si, 10),
                    w(zo, 10),
                    w(b1, 10),
                    w(ee, 8),
                    w(_o, 8),
                );
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    [
                        "",
                        "ngModel",
                        "",
                        3,
                        "formControlName",
                        "",
                        3,
                        "formControl",
                        "",
                    ],
                ],
                inputs: {
                    name: "name",
                    isDisabled: [0, "disabled", "isDisabled"],
                    model: [0, "ngModel", "model"],
                    options: [0, "ngModelOptions", "options"],
                },
                outputs: { update: "ngModelChange" },
                exportAs: ["ngModel"],
                standalone: !1,
                features: [we([td]), Se, I],
            });
        }
        return t;
    })();
var wo = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵdir = D({
            type: t,
            selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
            hostAttrs: ["novalidate", ""],
            standalone: !1,
        });
    }
    return t;
})();
var O4 = new b(""),
    nd = { provide: st, useExisting: Ft(() => Di) },
    Di = (() => {
        class t extends st {
            _ngModelWarningConfig;
            callSetDisabledState;
            viewModel;
            form;
            set isDisabled(e) {}
            model;
            update = new X();
            static _ngModelWarningSentOnce = !1;
            _ngModelWarningSent = !1;
            constructor(e, i, r, o, a) {
                (super(),
                    (this._ngModelWarningConfig = o),
                    (this.callSetDisabledState = a),
                    this._setValidators(e),
                    this._setAsyncValidators(i),
                    (this.valueAccessor = F4(this, r)));
            }
            ngOnChanges(e) {
                if (this._isControlChanged(e)) {
                    let i = e.form.previousValue;
                    (i && vo(i, this, !1),
                        fo(this.form, this, this.callSetDisabledState),
                        this.form.updateValueAndValidity({ emitEvent: !1 }));
                }
                V4(e, this.viewModel) &&
                    (this.form.setValue(this.model),
                    (this.viewModel = this.model));
            }
            ngOnDestroy() {
                this.form && vo(this.form, this, !1);
            }
            get path() {
                return [];
            }
            get control() {
                return this.form;
            }
            viewToModelUpdate(e) {
                ((this.viewModel = e), this.update.emit(e));
            }
            _isControlChanged(e) {
                return e.hasOwnProperty("form");
            }
            static ɵfac = function (i) {
                return new (i || t)(
                    w(Si, 10),
                    w(zo, 10),
                    w(b1, 10),
                    w(O4, 8),
                    w(_o, 8),
                );
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "formControl", ""]],
                inputs: {
                    form: [0, "formControl", "form"],
                    isDisabled: [0, "disabled", "isDisabled"],
                    model: [0, "ngModel", "model"],
                },
                outputs: { update: "ngModelChange" },
                exportAs: ["ngForm"],
                standalone: !1,
                features: [we([nd]), Se, I],
            });
        }
        return t;
    })(),
    id = { provide: Ln, useExisting: Ft(() => xi) },
    xi = (() => {
        class t extends Ln {
            callSetDisabledState;
            get submitted() {
                return yt(this._submittedReactive);
            }
            set submitted(e) {
                this._submittedReactive.set(e);
            }
            _submitted = nt(() => this._submittedReactive());
            _submittedReactive = Ce(!1);
            _oldForm;
            _onCollectionChange = () => this._updateDomValue();
            directives = [];
            form = null;
            ngSubmit = new X();
            constructor(e, i, r) {
                (super(),
                    (this.callSetDisabledState = r),
                    this._setValidators(e),
                    this._setAsyncValidators(i));
            }
            ngOnChanges(e) {
                e.hasOwnProperty("form") &&
                    (this._updateValidators(),
                    this._updateDomValue(),
                    this._updateRegistrations(),
                    (this._oldForm = this.form));
            }
            ngOnDestroy() {
                this.form &&
                    (yo(this.form, this),
                    this.form._onCollectionChange ===
                        this._onCollectionChange &&
                        this.form._registerOnCollectionChange(() => {}));
            }
            get formDirective() {
                return this;
            }
            get control() {
                return this.form;
            }
            get path() {
                return [];
            }
            addControl(e) {
                let i = this.form.get(e.path);
                return (
                    fo(i, e, this.callSetDisabledState),
                    i.updateValueAndValidity({ emitEvent: !1 }),
                    this.directives.push(e),
                    i
                );
            }
            getControl(e) {
                return this.form.get(e.path);
            }
            removeControl(e) {
                (vo(e.control || null, e, !1), J7(this.directives, e));
            }
            addFormGroup(e) {
                this._setUpFormContainer(e);
            }
            removeFormGroup(e) {
                this._cleanUpFormContainer(e);
            }
            getFormGroup(e) {
                return this.form.get(e.path);
            }
            addFormArray(e) {
                this._setUpFormContainer(e);
            }
            removeFormArray(e) {
                this._cleanUpFormContainer(e);
            }
            getFormArray(e) {
                return this.form.get(e.path);
            }
            updateModel(e, i) {
                this.form.get(e.path).setValue(i);
            }
            onSubmit(e) {
                return (
                    this._submittedReactive.set(!0),
                    Q7(this.form, this.directives),
                    this.ngSubmit.emit(e),
                    this.form._events.next(new w4(this.control)),
                    e?.target?.method === "dialog"
                );
            }
            onReset() {
                this.resetForm();
            }
            resetForm(e = void 0, i = {}) {
                (this.form.reset(e, i),
                    this._submittedReactive.set(!1),
                    i?.emitEvent !== !1 &&
                        this.form._events.next(new M4(this.form)));
            }
            _updateDomValue() {
                (this.directives.forEach((e) => {
                    let i = e.control,
                        r = this.form.get(e.path);
                    i !== r &&
                        (vo(i || null, e),
                        ed(r) &&
                            (fo(r, e, this.callSetDisabledState),
                            (e.control = r)));
                }),
                    this.form._updateTreeValidity({ emitEvent: !1 }));
            }
            _setUpFormContainer(e) {
                let i = this.form.get(e.path);
                (K7(i, e), i.updateValueAndValidity({ emitEvent: !1 }));
            }
            _cleanUpFormContainer(e) {
                if (this.form) {
                    let i = this.form.get(e.path);
                    i &&
                        Z7(i, e) &&
                        i.updateValueAndValidity({ emitEvent: !1 });
                }
            }
            _updateRegistrations() {
                (this.form._registerOnCollectionChange(
                    this._onCollectionChange,
                ),
                    this._oldForm &&
                        this._oldForm._registerOnCollectionChange(() => {}));
            }
            _updateValidators() {
                (A4(this.form, this), this._oldForm && yo(this._oldForm, this));
            }
            static ɵfac = function (i) {
                return new (i || t)(w(Si, 10), w(zo, 10), w(_o, 8));
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "formGroup", ""]],
                hostBindings: function (i, r) {
                    i & 1 &&
                        ve("submit", function (a) {
                            return r.onSubmit(a);
                        })("reset", function () {
                            return r.onReset();
                        });
                },
                inputs: { form: [0, "formGroup", "form"] },
                outputs: { ngSubmit: "ngSubmit" },
                exportAs: ["ngForm"],
                standalone: !1,
                features: [we([id]), Se, I],
            });
        }
        return t;
    })();
var rd = { provide: st, useExisting: Ft(() => Nn) },
    Nn = (() => {
        class t extends st {
            _ngModelWarningConfig;
            _added = !1;
            viewModel;
            control;
            name = null;
            set isDisabled(e) {}
            model;
            update = new X();
            static _ngModelWarningSentOnce = !1;
            _ngModelWarningSent = !1;
            constructor(e, i, r, o, a) {
                (super(),
                    (this._ngModelWarningConfig = a),
                    (this._parent = e),
                    this._setValidators(i),
                    this._setAsyncValidators(r),
                    (this.valueAccessor = F4(this, o)));
            }
            ngOnChanges(e) {
                (this._added || this._setUpControl(),
                    V4(e, this.viewModel) &&
                        ((this.viewModel = this.model),
                        this.formDirective.updateModel(this, this.model)));
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(e) {
                ((this.viewModel = e), this.update.emit(e));
            }
            get path() {
                return vc(
                    this.name == null ? this.name : this.name.toString(),
                    this._parent,
                );
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null;
            }
            _setUpControl() {
                ((this.control = this.formDirective.addControl(this)),
                    (this._added = !0));
            }
            static ɵfac = function (i) {
                return new (i || t)(
                    w(Ln, 13),
                    w(Si, 10),
                    w(zo, 10),
                    w(b1, 10),
                    w(O4, 8),
                );
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "formControlName", ""]],
                inputs: {
                    name: [0, "formControlName", "name"],
                    isDisabled: [0, "disabled", "isDisabled"],
                    model: [0, "ngModel", "model"],
                },
                outputs: { update: "ngModelChange" },
                standalone: !1,
                features: [we([rd]), Se, I],
            });
        }
        return t;
    })();
function od(t) {
    return typeof t == "number" ? t : parseInt(t, 10);
}
var ad = (() => {
    class t {
        _validator = co;
        _onChange;
        _enabled;
        ngOnChanges(e) {
            if (this.inputName in e) {
                let i = this.normalizeInput(e[this.inputName].currentValue);
                ((this._enabled = this.enabled(i)),
                    (this._validator = this._enabled
                        ? this.createValidator(i)
                        : co),
                    this._onChange && this._onChange());
            }
        }
        validate(e) {
            return this._validator(e);
        }
        registerOnValidatorChange(e) {
            this._onChange = e;
        }
        enabled(e) {
            return e != null;
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵdir = D({ type: t, features: [I] });
    }
    return t;
})();
var sd = { provide: Si, useExisting: Ft(() => I4), multi: !0 },
    I4 = (() => {
        class t extends ad {
            maxlength;
            inputName = "maxlength";
            normalizeInput = (e) => od(e);
            createValidator = (e) => nc(e);
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "maxlength", "", "formControlName", ""],
                    ["", "maxlength", "", "formControl", ""],
                    ["", "maxlength", "", "ngModel", ""],
                ],
                hostVars: 1,
                hostBindings: function (i, r) {
                    i & 2 && Dt("maxlength", r._enabled ? r.maxlength : null);
                },
                inputs: { maxlength: "maxlength" },
                standalone: !1,
                features: [we([sd]), Se],
            });
        }
        return t;
    })();
var cd = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })(),
    D4 = class extends vn {
        constructor(n, e, i) {
            (super(k4(e), E4(i, e)),
                (this.controls = n),
                this._initObservables(),
                this._setUpdateStrategy(e),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator,
                }));
        }
        controls;
        at(n) {
            return this.controls[this._adjustIndex(n)];
        }
        push(n, e = {}) {
            (this.controls.push(n),
                this._registerControl(n),
                this.updateValueAndValidity({ emitEvent: e.emitEvent }),
                this._onCollectionChange());
        }
        insert(n, e, i = {}) {
            (this.controls.splice(n, 0, e),
                this._registerControl(e),
                this.updateValueAndValidity({ emitEvent: i.emitEvent }));
        }
        removeAt(n, e = {}) {
            let i = this._adjustIndex(n);
            (i < 0 && (i = 0),
                this.controls[i] &&
                    this.controls[i]._registerOnCollectionChange(() => {}),
                this.controls.splice(i, 1),
                this.updateValueAndValidity({ emitEvent: e.emitEvent }));
        }
        setControl(n, e, i = {}) {
            let r = this._adjustIndex(n);
            (r < 0 && (r = 0),
                this.controls[r] &&
                    this.controls[r]._registerOnCollectionChange(() => {}),
                this.controls.splice(r, 1),
                e && (this.controls.splice(r, 0, e), this._registerControl(e)),
                this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                this._onCollectionChange());
        }
        get length() {
            return this.controls.length;
        }
        setValue(n, e = {}) {
            (fc(this, !1, n),
                n.forEach((i, r) => {
                    (pc(this, !1, r),
                        this.at(r).setValue(i, {
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        }));
                }),
                this.updateValueAndValidity(e));
        }
        patchValue(n, e = {}) {
            n != null &&
                (n.forEach((i, r) => {
                    this.at(r) &&
                        this.at(r).patchValue(i, {
                            onlySelf: !0,
                            emitEvent: e.emitEvent,
                        });
                }),
                this.updateValueAndValidity(e));
        }
        reset(n = [], e = {}) {
            (this._forEachChild((i, r) => {
                i.reset(n[r], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
                this._updatePristine(e, this),
                this._updateTouched(e, this),
                this.updateValueAndValidity(e));
        }
        getRawValue() {
            return this.controls.map((n) => n.getRawValue());
        }
        clear(n = {}) {
            this.controls.length < 1 ||
                (this._forEachChild((e) =>
                    e._registerOnCollectionChange(() => {}),
                ),
                this.controls.splice(0),
                this.updateValueAndValidity({ emitEvent: n.emitEvent }));
        }
        _adjustIndex(n) {
            return n < 0 ? n + this.length : n;
        }
        _syncPendingControls() {
            let n = this.controls.reduce(
                (e, i) => (i._syncPendingControls() ? !0 : e),
                !1,
            );
            return (n && this.updateValueAndValidity({ onlySelf: !0 }), n);
        }
        _forEachChild(n) {
            this.controls.forEach((e, i) => {
                n(e, i);
            });
        }
        _updateValue() {
            this.value = this.controls
                .filter((n) => n.enabled || this.disabled)
                .map((n) => n.value);
        }
        _anyControls(n) {
            return this.controls.some((e) => e.enabled && n(e));
        }
        _setUpControls() {
            this._forEachChild((n) => this._registerControl(n));
        }
        _allControlsDisabled() {
            for (let n of this.controls) if (n.enabled) return !1;
            return this.controls.length > 0 || this.disabled;
        }
        _registerControl(n) {
            (n.setParent(this),
                n._registerOnCollectionChange(this._onCollectionChange));
        }
        _find(n) {
            return this.at(n) ?? null;
        }
    };
function ec(t) {
    return (
        !!t &&
        (t.asyncValidators !== void 0 ||
            t.validators !== void 0 ||
            t.updateOn !== void 0)
    );
}
var w1 = (() => {
    class t {
        useNonNullable = !1;
        get nonNullable() {
            let e = new t();
            return ((e.useNonNullable = !0), e);
        }
        group(e, i = null) {
            let r = this._reduceControls(e),
                o = {};
            return (
                ec(i)
                    ? (o = i)
                    : i !== null &&
                      ((o.validators = i.validator),
                      (o.asyncValidators = i.asyncValidator)),
                new po(r, o)
            );
        }
        record(e, i = null) {
            let r = this._reduceControls(e);
            return new S4(r, i);
        }
        control(e, i, r) {
            let o = {};
            return this.useNonNullable
                ? (ec(i)
                      ? (o = i)
                      : ((o.validators = i), (o.asyncValidators = r)),
                  new Mi(e, Z(m({}, o), { nonNullable: !0 })))
                : new Mi(e, i, r);
        }
        array(e, i, r) {
            let o = e.map((a) => this._createControl(a));
            return new D4(o, i, r);
        }
        _reduceControls(e) {
            let i = {};
            return (
                Object.keys(e).forEach((r) => {
                    i[r] = this._createControl(e[r]);
                }),
                i
            );
        }
        _createControl(e) {
            if (e instanceof Mi) return e;
            if (e instanceof vn) return e;
            if (Array.isArray(e)) {
                let i = e[0],
                    r = e.length > 1 ? e[1] : null,
                    o = e.length > 2 ? e[2] : null;
                return this.control(i, r, o);
            } else return this.control(e);
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var M1 = (() => {
    class t {
        static withConfig(e) {
            return {
                ngModule: t,
                providers: [
                    {
                        provide: O4,
                        useValue: e.warnOnNgModelWithFormControl ?? "always",
                    },
                    { provide: _o, useValue: e.callSetDisabledState ?? P4 },
                ],
            };
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({ imports: [cd] });
    }
    return t;
})();
var ld = new b("cdk-dir-doc", { providedIn: "root", factory: dd });
function dd() {
    return l(U);
}
var hd =
    /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function yc(t) {
    let n = t?.toLowerCase() || "";
    return n === "auto" && typeof navigator < "u" && navigator?.language
        ? hd.test(navigator.language)
            ? "rtl"
            : "ltr"
        : n === "rtl"
          ? "rtl"
          : "ltr";
}
var he = (() => {
    class t {
        get value() {
            return this.valueSignal();
        }
        valueSignal = Ce("ltr");
        change = new X();
        constructor() {
            let e = l(ld, { optional: !0 });
            if (e) {
                let i = e.body ? e.body.dir : null,
                    r = e.documentElement ? e.documentElement.dir : null;
                this.valueSignal.set(yc(i || r || "ltr"));
            }
        }
        ngOnDestroy() {
            this.change.complete();
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var Yn = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({});
    }
    return t;
})();
function N(t) {
    t || (t = l(K));
    let n = new Xe((e) => {
        if (t.destroyed) {
            e.next();
            return;
        }
        return t.onDestroy(e.next.bind(e));
    });
    return (e) => e.pipe(on(n));
}
function zc(t, n) {
    let i = !n?.manualCleanup ? (n?.injector?.get(K) ?? l(K)) : null,
        r = ud(n?.equal),
        o;
    n?.requireSync
        ? (o = Ce({ kind: 0 }, { equal: r }))
        : (o = Ce({ kind: 1, value: n?.initialValue }, { equal: r }));
    let a,
        s = t.subscribe({
            next: (c) => o.set({ kind: 1, value: c }),
            error: (c) => {
                (o.set({ kind: 2, error: c }), a?.());
            },
            complete: () => {
                a?.();
            },
        });
    if (n?.requireSync && o().kind === 0) throw new j(601, !1);
    return (
        (a = i?.onDestroy(s.unsubscribe.bind(s))),
        nt(
            () => {
                let c = o();
                switch (c.kind) {
                    case 1:
                        return c.value;
                    case 2:
                        throw c.error;
                    case 0:
                        throw new j(601, !1);
                }
            },
            { equal: n?.equal },
        )
    );
}
function ud(t = Object.is) {
    return (n, e) => n.kind === 1 && e.kind === 1 && t(n.value, e.value);
}
function xe(t, n) {
    md(t) && (t = "100%");
    var e = pd(t);
    return (
        (t = n === 360 ? t : Math.min(n, Math.max(0, parseFloat(t)))),
        e && (t = parseInt(String(t * n), 10) / 100),
        Math.abs(t - n) < 1e-6
            ? 1
            : (n === 360
                  ? (t = (t < 0 ? (t % n) + n : t % n) / parseFloat(String(n)))
                  : (t = (t % n) / parseFloat(String(n))),
              t)
    );
}
function Ti(t) {
    return Math.min(1, Math.max(0, t));
}
function md(t) {
    return typeof t == "string" && t.indexOf(".") !== -1 && parseFloat(t) === 1;
}
function pd(t) {
    return typeof t == "string" && t.indexOf("%") !== -1;
}
function Mo(t) {
    return ((t = parseFloat(t)), (isNaN(t) || t < 0 || t > 1) && (t = 1), t);
}
function ki(t) {
    return t <= 1 ? "".concat(Number(t) * 100, "%") : t;
}
function yn(t) {
    return t.length === 1 ? "0" + t : String(t);
}
function Cc(t, n, e) {
    return { r: xe(t, 255) * 255, g: xe(n, 255) * 255, b: xe(e, 255) * 255 };
}
function N4(t, n, e) {
    ((t = xe(t, 255)), (n = xe(n, 255)), (e = xe(e, 255)));
    var i = Math.max(t, n, e),
        r = Math.min(t, n, e),
        o = 0,
        a = 0,
        s = (i + r) / 2;
    if (i === r) ((a = 0), (o = 0));
    else {
        var c = i - r;
        switch (((a = s > 0.5 ? c / (2 - i - r) : c / (i + r)), i)) {
            case t:
                o = (n - e) / c + (n < e ? 6 : 0);
                break;
            case n:
                o = (e - t) / c + 2;
                break;
            case e:
                o = (t - n) / c + 4;
                break;
            default:
                break;
        }
        o /= 6;
    }
    return { h: o, s: a, l: s };
}
function L4(t, n, e) {
    return (
        e < 0 && (e += 1),
        e > 1 && (e -= 1),
        e < 1 / 6
            ? t + (n - t) * (6 * e)
            : e < 1 / 2
              ? n
              : e < 2 / 3
                ? t + (n - t) * (2 / 3 - e) * 6
                : t
    );
}
function bc(t, n, e) {
    var i, r, o;
    if (((t = xe(t, 360)), (n = xe(n, 100)), (e = xe(e, 100)), n === 0))
        ((r = e), (o = e), (i = e));
    else {
        var a = e < 0.5 ? e * (1 + n) : e + n - e * n,
            s = 2 * e - a;
        ((i = L4(s, a, t + 1 / 3)),
            (r = L4(s, a, t)),
            (o = L4(s, a, t - 1 / 3)));
    }
    return { r: i * 255, g: r * 255, b: o * 255 };
}
function Ei(t, n, e) {
    ((t = xe(t, 255)), (n = xe(n, 255)), (e = xe(e, 255)));
    var i = Math.max(t, n, e),
        r = Math.min(t, n, e),
        o = 0,
        a = i,
        s = i - r,
        c = i === 0 ? 0 : s / i;
    if (i === r) o = 0;
    else {
        switch (i) {
            case t:
                o = (n - e) / s + (n < e ? 6 : 0);
                break;
            case n:
                o = (e - t) / s + 2;
                break;
            case e:
                o = (t - n) / s + 4;
                break;
            default:
                break;
        }
        o /= 6;
    }
    return { h: o, s: c, v: a };
}
function _c(t, n, e) {
    ((t = xe(t, 360) * 6), (n = xe(n, 100)), (e = xe(e, 100)));
    var i = Math.floor(t),
        r = t - i,
        o = e * (1 - n),
        a = e * (1 - r * n),
        s = e * (1 - (1 - r) * n),
        c = i % 6,
        d = [e, a, o, o, s, e][c],
        h = [s, e, e, a, o, o][c],
        f = [o, o, s, e, e, a][c];
    return { r: d * 255, g: h * 255, b: f * 255 };
}
function Pi(t, n, e, i) {
    var r = [
        yn(Math.round(t).toString(16)),
        yn(Math.round(n).toString(16)),
        yn(Math.round(e).toString(16)),
    ];
    return i &&
        r[0].startsWith(r[0].charAt(1)) &&
        r[1].startsWith(r[1].charAt(1)) &&
        r[2].startsWith(r[2].charAt(1))
        ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0)
        : r.join("");
}
function wc(t, n, e, i, r) {
    var o = [
        yn(Math.round(t).toString(16)),
        yn(Math.round(n).toString(16)),
        yn(Math.round(e).toString(16)),
        yn(fd(i)),
    ];
    return r &&
        o[0].startsWith(o[0].charAt(1)) &&
        o[1].startsWith(o[1].charAt(1)) &&
        o[2].startsWith(o[2].charAt(1)) &&
        o[3].startsWith(o[3].charAt(1))
        ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0)
        : o.join("");
}
function fd(t) {
    return Math.round(parseFloat(t) * 255).toString(16);
}
function Y4(t) {
    return Ke(t) / 255;
}
function Ke(t) {
    return parseInt(t, 16);
}
function Mc(t) {
    return { r: t >> 16, g: (t & 65280) >> 8, b: t & 255 };
}
var Ai = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
};
function Cn(t) {
    var n = { r: 0, g: 0, b: 0 },
        e = 1,
        i = null,
        r = null,
        o = null,
        a = !1,
        s = !1;
    return (
        typeof t == "string" && (t = yd(t)),
        typeof t == "object" &&
            (Jt(t.r) && Jt(t.g) && Jt(t.b)
                ? ((n = Cc(t.r, t.g, t.b)),
                  (a = !0),
                  (s = String(t.r).substr(-1) === "%" ? "prgb" : "rgb"))
                : Jt(t.h) && Jt(t.s) && Jt(t.v)
                  ? ((i = ki(t.s)),
                    (r = ki(t.v)),
                    (n = _c(t.h, i, r)),
                    (a = !0),
                    (s = "hsv"))
                  : Jt(t.h) &&
                    Jt(t.s) &&
                    Jt(t.l) &&
                    ((i = ki(t.s)),
                    (o = ki(t.l)),
                    (n = bc(t.h, i, o)),
                    (a = !0),
                    (s = "hsl")),
            Object.prototype.hasOwnProperty.call(t, "a") && (e = t.a)),
        (e = Mo(e)),
        {
            ok: a,
            format: t.format || s,
            r: Math.min(255, Math.max(n.r, 0)),
            g: Math.min(255, Math.max(n.g, 0)),
            b: Math.min(255, Math.max(n.b, 0)),
            a: e,
        }
    );
}
var vd = "[-\\+]?\\d+%?",
    gd = "[-\\+]?\\d*\\.\\d+%?",
    zn = "(?:".concat(gd, ")|(?:").concat(vd, ")"),
    B4 = "[\\s|\\(]+("
        .concat(zn, ")[,|\\s]+(")
        .concat(zn, ")[,|\\s]+(")
        .concat(zn, ")\\s*\\)?"),
    j4 = "[\\s|\\(]+("
        .concat(zn, ")[,|\\s]+(")
        .concat(zn, ")[,|\\s]+(")
        .concat(zn, ")[,|\\s]+(")
        .concat(zn, ")\\s*\\)?"),
    At = {
        CSS_UNIT: new RegExp(zn),
        rgb: new RegExp("rgb" + B4),
        rgba: new RegExp("rgba" + j4),
        hsl: new RegExp("hsl" + B4),
        hsla: new RegExp("hsla" + j4),
        hsv: new RegExp("hsv" + B4),
        hsva: new RegExp("hsva" + j4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    };
function yd(t) {
    if (((t = t.trim().toLowerCase()), t.length === 0)) return !1;
    var n = !1;
    if (Ai[t]) ((t = Ai[t]), (n = !0));
    else if (t === "transparent")
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    var e = At.rgb.exec(t);
    return e
        ? { r: e[1], g: e[2], b: e[3] }
        : ((e = At.rgba.exec(t)),
          e
              ? { r: e[1], g: e[2], b: e[3], a: e[4] }
              : ((e = At.hsl.exec(t)),
                e
                    ? { h: e[1], s: e[2], l: e[3] }
                    : ((e = At.hsla.exec(t)),
                      e
                          ? { h: e[1], s: e[2], l: e[3], a: e[4] }
                          : ((e = At.hsv.exec(t)),
                            e
                                ? { h: e[1], s: e[2], v: e[3] }
                                : ((e = At.hsva.exec(t)),
                                  e
                                      ? { h: e[1], s: e[2], v: e[3], a: e[4] }
                                      : ((e = At.hex8.exec(t)),
                                        e
                                            ? {
                                                  r: Ke(e[1]),
                                                  g: Ke(e[2]),
                                                  b: Ke(e[3]),
                                                  a: Y4(e[4]),
                                                  format: n ? "name" : "hex8",
                                              }
                                            : ((e = At.hex6.exec(t)),
                                              e
                                                  ? {
                                                        r: Ke(e[1]),
                                                        g: Ke(e[2]),
                                                        b: Ke(e[3]),
                                                        format: n
                                                            ? "name"
                                                            : "hex",
                                                    }
                                                  : ((e = At.hex4.exec(t)),
                                                    e
                                                        ? {
                                                              r: Ke(
                                                                  e[1] + e[1],
                                                              ),
                                                              g: Ke(
                                                                  e[2] + e[2],
                                                              ),
                                                              b: Ke(
                                                                  e[3] + e[3],
                                                              ),
                                                              a: Y4(
                                                                  e[4] + e[4],
                                                              ),
                                                              format: n
                                                                  ? "name"
                                                                  : "hex8",
                                                          }
                                                        : ((e =
                                                              At.hex3.exec(t)),
                                                          e
                                                              ? {
                                                                    r: Ke(
                                                                        e[1] +
                                                                            e[1],
                                                                    ),
                                                                    g: Ke(
                                                                        e[2] +
                                                                            e[2],
                                                                    ),
                                                                    b: Ke(
                                                                        e[3] +
                                                                            e[3],
                                                                    ),
                                                                    format: n
                                                                        ? "name"
                                                                        : "hex",
                                                                }
                                                              : !1)))))))));
}
function Jt(t) {
    return !!At.CSS_UNIT.exec(String(t));
}
var So = (function () {
    function t(n, e) {
        (n === void 0 && (n = ""), e === void 0 && (e = {}));
        var i;
        if (n instanceof t) return n;
        (typeof n == "number" && (n = Mc(n)), (this.originalInput = n));
        var r = Cn(n);
        ((this.originalInput = n),
            (this.r = r.r),
            (this.g = r.g),
            (this.b = r.b),
            (this.a = r.a),
            (this.roundA = Math.round(100 * this.a) / 100),
            (this.format =
                (i = e.format) !== null && i !== void 0 ? i : r.format),
            (this.gradientType = e.gradientType),
            this.r < 1 && (this.r = Math.round(this.r)),
            this.g < 1 && (this.g = Math.round(this.g)),
            this.b < 1 && (this.b = Math.round(this.b)),
            (this.isValid = r.ok));
    }
    return (
        (t.prototype.isDark = function () {
            return this.getBrightness() < 128;
        }),
        (t.prototype.isLight = function () {
            return !this.isDark();
        }),
        (t.prototype.getBrightness = function () {
            var n = this.toRgb();
            return (n.r * 299 + n.g * 587 + n.b * 114) / 1e3;
        }),
        (t.prototype.getLuminance = function () {
            var n = this.toRgb(),
                e,
                i,
                r,
                o = n.r / 255,
                a = n.g / 255,
                s = n.b / 255;
            return (
                o <= 0.03928
                    ? (e = o / 12.92)
                    : (e = Math.pow((o + 0.055) / 1.055, 2.4)),
                a <= 0.03928
                    ? (i = a / 12.92)
                    : (i = Math.pow((a + 0.055) / 1.055, 2.4)),
                s <= 0.03928
                    ? (r = s / 12.92)
                    : (r = Math.pow((s + 0.055) / 1.055, 2.4)),
                0.2126 * e + 0.7152 * i + 0.0722 * r
            );
        }),
        (t.prototype.getAlpha = function () {
            return this.a;
        }),
        (t.prototype.setAlpha = function (n) {
            return (
                (this.a = Mo(n)),
                (this.roundA = Math.round(100 * this.a) / 100),
                this
            );
        }),
        (t.prototype.isMonochrome = function () {
            var n = this.toHsl().s;
            return n === 0;
        }),
        (t.prototype.toHsv = function () {
            var n = Ei(this.r, this.g, this.b);
            return { h: n.h * 360, s: n.s, v: n.v, a: this.a };
        }),
        (t.prototype.toHsvString = function () {
            var n = Ei(this.r, this.g, this.b),
                e = Math.round(n.h * 360),
                i = Math.round(n.s * 100),
                r = Math.round(n.v * 100);
            return this.a === 1
                ? "hsv(".concat(e, ", ").concat(i, "%, ").concat(r, "%)")
                : "hsva("
                      .concat(e, ", ")
                      .concat(i, "%, ")
                      .concat(r, "%, ")
                      .concat(this.roundA, ")");
        }),
        (t.prototype.toHsl = function () {
            var n = N4(this.r, this.g, this.b);
            return { h: n.h * 360, s: n.s, l: n.l, a: this.a };
        }),
        (t.prototype.toHslString = function () {
            var n = N4(this.r, this.g, this.b),
                e = Math.round(n.h * 360),
                i = Math.round(n.s * 100),
                r = Math.round(n.l * 100);
            return this.a === 1
                ? "hsl(".concat(e, ", ").concat(i, "%, ").concat(r, "%)")
                : "hsla("
                      .concat(e, ", ")
                      .concat(i, "%, ")
                      .concat(r, "%, ")
                      .concat(this.roundA, ")");
        }),
        (t.prototype.toHex = function (n) {
            return (n === void 0 && (n = !1), Pi(this.r, this.g, this.b, n));
        }),
        (t.prototype.toHexString = function (n) {
            return (n === void 0 && (n = !1), "#" + this.toHex(n));
        }),
        (t.prototype.toHex8 = function (n) {
            return (
                n === void 0 && (n = !1),
                wc(this.r, this.g, this.b, this.a, n)
            );
        }),
        (t.prototype.toHex8String = function (n) {
            return (n === void 0 && (n = !1), "#" + this.toHex8(n));
        }),
        (t.prototype.toHexShortString = function (n) {
            return (
                n === void 0 && (n = !1),
                this.a === 1 ? this.toHexString(n) : this.toHex8String(n)
            );
        }),
        (t.prototype.toRgb = function () {
            return {
                r: Math.round(this.r),
                g: Math.round(this.g),
                b: Math.round(this.b),
                a: this.a,
            };
        }),
        (t.prototype.toRgbString = function () {
            var n = Math.round(this.r),
                e = Math.round(this.g),
                i = Math.round(this.b);
            return this.a === 1
                ? "rgb(".concat(n, ", ").concat(e, ", ").concat(i, ")")
                : "rgba("
                      .concat(n, ", ")
                      .concat(e, ", ")
                      .concat(i, ", ")
                      .concat(this.roundA, ")");
        }),
        (t.prototype.toPercentageRgb = function () {
            var n = function (e) {
                return "".concat(Math.round(xe(e, 255) * 100), "%");
            };
            return { r: n(this.r), g: n(this.g), b: n(this.b), a: this.a };
        }),
        (t.prototype.toPercentageRgbString = function () {
            var n = function (e) {
                return Math.round(xe(e, 255) * 100);
            };
            return this.a === 1
                ? "rgb("
                      .concat(n(this.r), "%, ")
                      .concat(n(this.g), "%, ")
                      .concat(n(this.b), "%)")
                : "rgba("
                      .concat(n(this.r), "%, ")
                      .concat(n(this.g), "%, ")
                      .concat(n(this.b), "%, ")
                      .concat(this.roundA, ")");
        }),
        (t.prototype.toName = function () {
            if (this.a === 0) return "transparent";
            if (this.a < 1) return !1;
            for (
                var n = "#" + Pi(this.r, this.g, this.b, !1),
                    e = 0,
                    i = Object.entries(Ai);
                e < i.length;
                e++
            ) {
                var r = i[e],
                    o = r[0],
                    a = r[1];
                if (n === a) return o;
            }
            return !1;
        }),
        (t.prototype.toString = function (n) {
            var e = !!n;
            n = n ?? this.format;
            var i = !1,
                r = this.a < 1 && this.a >= 0,
                o = !e && r && (n.startsWith("hex") || n === "name");
            return o
                ? n === "name" && this.a === 0
                    ? this.toName()
                    : this.toRgbString()
                : (n === "rgb" && (i = this.toRgbString()),
                  n === "prgb" && (i = this.toPercentageRgbString()),
                  (n === "hex" || n === "hex6") && (i = this.toHexString()),
                  n === "hex3" && (i = this.toHexString(!0)),
                  n === "hex4" && (i = this.toHex8String(!0)),
                  n === "hex8" && (i = this.toHex8String()),
                  n === "name" && (i = this.toName()),
                  n === "hsl" && (i = this.toHslString()),
                  n === "hsv" && (i = this.toHsvString()),
                  i || this.toHexString());
        }),
        (t.prototype.toNumber = function () {
            return (
                (Math.round(this.r) << 16) +
                (Math.round(this.g) << 8) +
                Math.round(this.b)
            );
        }),
        (t.prototype.clone = function () {
            return new t(this.toString());
        }),
        (t.prototype.lighten = function (n) {
            n === void 0 && (n = 10);
            var e = this.toHsl();
            return ((e.l += n / 100), (e.l = Ti(e.l)), new t(e));
        }),
        (t.prototype.brighten = function (n) {
            n === void 0 && (n = 10);
            var e = this.toRgb();
            return (
                (e.r = Math.max(
                    0,
                    Math.min(255, e.r - Math.round(255 * -(n / 100))),
                )),
                (e.g = Math.max(
                    0,
                    Math.min(255, e.g - Math.round(255 * -(n / 100))),
                )),
                (e.b = Math.max(
                    0,
                    Math.min(255, e.b - Math.round(255 * -(n / 100))),
                )),
                new t(e)
            );
        }),
        (t.prototype.darken = function (n) {
            n === void 0 && (n = 10);
            var e = this.toHsl();
            return ((e.l -= n / 100), (e.l = Ti(e.l)), new t(e));
        }),
        (t.prototype.tint = function (n) {
            return (n === void 0 && (n = 10), this.mix("white", n));
        }),
        (t.prototype.shade = function (n) {
            return (n === void 0 && (n = 10), this.mix("black", n));
        }),
        (t.prototype.desaturate = function (n) {
            n === void 0 && (n = 10);
            var e = this.toHsl();
            return ((e.s -= n / 100), (e.s = Ti(e.s)), new t(e));
        }),
        (t.prototype.saturate = function (n) {
            n === void 0 && (n = 10);
            var e = this.toHsl();
            return ((e.s += n / 100), (e.s = Ti(e.s)), new t(e));
        }),
        (t.prototype.greyscale = function () {
            return this.desaturate(100);
        }),
        (t.prototype.spin = function (n) {
            var e = this.toHsl(),
                i = (e.h + n) % 360;
            return ((e.h = i < 0 ? 360 + i : i), new t(e));
        }),
        (t.prototype.mix = function (n, e) {
            e === void 0 && (e = 50);
            var i = this.toRgb(),
                r = new t(n).toRgb(),
                o = e / 100,
                a = {
                    r: (r.r - i.r) * o + i.r,
                    g: (r.g - i.g) * o + i.g,
                    b: (r.b - i.b) * o + i.b,
                    a: (r.a - i.a) * o + i.a,
                };
            return new t(a);
        }),
        (t.prototype.analogous = function (n, e) {
            (n === void 0 && (n = 6), e === void 0 && (e = 30));
            var i = this.toHsl(),
                r = 360 / e,
                o = [this];
            for (i.h = (i.h - ((r * n) >> 1) + 720) % 360; --n; )
                ((i.h = (i.h + r) % 360), o.push(new t(i)));
            return o;
        }),
        (t.prototype.complement = function () {
            var n = this.toHsl();
            return ((n.h = (n.h + 180) % 360), new t(n));
        }),
        (t.prototype.monochromatic = function (n) {
            n === void 0 && (n = 6);
            for (
                var e = this.toHsv(),
                    i = e.h,
                    r = e.s,
                    o = e.v,
                    a = [],
                    s = 1 / n;
                n--;

            )
                (a.push(new t({ h: i, s: r, v: o })), (o = (o + s) % 1));
            return a;
        }),
        (t.prototype.splitcomplement = function () {
            var n = this.toHsl(),
                e = n.h;
            return [
                this,
                new t({ h: (e + 72) % 360, s: n.s, l: n.l }),
                new t({ h: (e + 216) % 360, s: n.s, l: n.l }),
            ];
        }),
        (t.prototype.onBackground = function (n) {
            var e = this.toRgb(),
                i = new t(n).toRgb(),
                r = e.a + i.a * (1 - e.a);
            return new t({
                r: (e.r * e.a + i.r * i.a * (1 - e.a)) / r,
                g: (e.g * e.a + i.g * i.a * (1 - e.a)) / r,
                b: (e.b * e.a + i.b * i.a * (1 - e.a)) / r,
                a: r,
            });
        }),
        (t.prototype.triad = function () {
            return this.polyad(3);
        }),
        (t.prototype.tetrad = function () {
            return this.polyad(4);
        }),
        (t.prototype.polyad = function (n) {
            for (
                var e = this.toHsl(), i = e.h, r = [this], o = 360 / n, a = 1;
                a < n;
                a++
            )
                r.push(new t({ h: (i + a * o) % 360, s: e.s, l: e.l }));
            return r;
        }),
        (t.prototype.equals = function (n) {
            return this.toRgbString() === new t(n).toRgbString();
        }),
        t
    );
})();
var U4 = ["success", "processing", "error", "default", "warning"],
    $4 = [
        "pink",
        "red",
        "yellow",
        "orange",
        "cyan",
        "green",
        "blue",
        "purple",
        "geekblue",
        "magenta",
        "volcano",
        "gold",
        "lime",
    ];
function To(t) {
    return $4.indexOf(t) !== -1;
}
function Ec(t) {
    return U4.indexOf(t) !== -1;
}
var Do = 2,
    Sc = 0.16,
    zd = 0.05,
    Cd = 0.05,
    bd = 0.15,
    Pc = 5,
    Ac = 4,
    _d = [
        { index: 7, opacity: 0.15 },
        { index: 6, opacity: 0.25 },
        { index: 5, opacity: 0.3 },
        { index: 5, opacity: 0.45 },
        { index: 5, opacity: 0.65 },
        { index: 5, opacity: 0.85 },
        { index: 4, opacity: 0.9 },
        { index: 3, opacity: 0.95 },
        { index: 2, opacity: 0.97 },
        { index: 1, opacity: 0.98 },
    ];
function Dc({ r: t, g: n, b: e }) {
    let i = Ei(t, n, e);
    return { h: i.h * 360, s: i.s, v: i.v };
}
function xo({ r: t, g: n, b: e }) {
    return `#${Pi(t, n, e, !1)}`;
}
function wd(t, n, e) {
    let i = e / 100;
    return {
        r: (n.r - t.r) * i + t.r,
        g: (n.g - t.g) * i + t.g,
        b: (n.b - t.b) * i + t.b,
    };
}
function xc(t, n, e) {
    let i;
    return (
        Math.round(t.h) >= 60 && Math.round(t.h) <= 240
            ? (i = e ? Math.round(t.h) - Do * n : Math.round(t.h) + Do * n)
            : (i = e ? Math.round(t.h) + Do * n : Math.round(t.h) - Do * n),
        i < 0 ? (i += 360) : i >= 360 && (i -= 360),
        i
    );
}
function Tc(t, n, e) {
    if (t.h === 0 && t.s === 0) return t.s;
    let i;
    return (
        e ? (i = t.s - Sc * n) : n === Ac ? (i = t.s + Sc) : (i = t.s + zd * n),
        i > 1 && (i = 1),
        e && n === Pc && i > 0.1 && (i = 0.1),
        i < 0.06 && (i = 0.06),
        Number(i.toFixed(2))
    );
}
function kc(t, n, e) {
    let i;
    return (
        e ? (i = t.v + Cd * n) : (i = t.v - bd * n),
        i > 1 && (i = 1),
        Number(i.toFixed(2))
    );
}
function W4(t, n = {}) {
    let e = [],
        i = Cn(t);
    for (let r = Pc; r > 0; r -= 1) {
        let o = Dc(i),
            a = xo(Cn({ h: xc(o, r, !0), s: Tc(o, r, !0), v: kc(o, r, !0) }));
        e.push(a);
    }
    e.push(xo(i));
    for (let r = 1; r <= Ac; r += 1) {
        let o = Dc(i),
            a = xo(Cn({ h: xc(o, r), s: Tc(o, r), v: kc(o, r) }));
        e.push(a);
    }
    return n.theme === "dark"
        ? _d.map(({ index: r, opacity: o }) =>
              xo(wd(Cn(n.backgroundColor || "#141414"), Cn(e[r]), o * 100)),
          )
        : e;
}
var Vc = { isTestMode: !1 };
var Fc = {},
    Md = "[NG-ZORRO]:";
function Sd(...t) {
    let n = t.reduce((e, i) => e + i.toString(), "");
    return Fc[n] ? !1 : ((Fc[n] = !0), !0);
}
function Dd(t, ...n) {
    (Vc.isTestMode || (W1() && Sd(...n))) && t(...n);
}
var Bn = (...t) => Dd((...n) => console.warn(Md, ...n), ...t);
function S1(t) {
    return t instanceof B ? t.nativeElement : t;
}
function q4(t) {
    return Array.isArray(t) ? t : [t];
}
function ue(t) {
    return t == null ? "" : typeof t == "string" ? t : `${t}px`;
}
function Hc(t) {
    return t != null && `${t}` != "false";
}
function Vt(t) {
    return typeof t < "u" && t !== null;
}
function Vi(t) {
    return t instanceof Ye;
}
function ko(t) {
    return Hc(t);
}
function Ic(t) {
    return ue(t);
}
function Rc(t, n, e) {
    if (t.length > n) return t;
    let i = `${Td(n, e)}${t}`;
    return i.slice(i.length - n, i.length);
}
function Td(t, n) {
    return Array(t).fill(n).join("");
}
function kd(t) {
    return !!t && typeof t.then == "function" && typeof t.catch == "function";
}
var Ed = typeof window < "u",
    dy = Ed && window.mozInnerScreenX != null;
function Lc(t) {
    return I1(t)
        ? t
        : kd(t)
          ? new Xe((n) => {
                Promise.resolve(t)
                    .then((e) => {
                        (n.next(e), n.complete());
                    })
                    .catch((e) => n.error(e));
            })
          : S(t);
}
function K4() {
    return !!(
        typeof window < "u" &&
        window.document &&
        window.document.createElement
    );
}
var Pd = "rc-util-key";
function Nc({ mark: t } = {}) {
    return t ? (t.startsWith("data-") ? t : `data-${t}`) : Pd;
}
function Z4(t) {
    return t.attachTo
        ? t.attachTo
        : document.querySelector("head") || document.body;
}
function Oc(t, n = {}) {
    if (!K4()) return null;
    let e = document.createElement("style");
    (n.cspNonce && (e.nonce = n.cspNonce), (e.innerHTML = t));
    let i = Z4(n),
        { firstChild: r } = i;
    return (
        n.prepend && i.prepend
            ? i.prepend(e)
            : n.prepend && r
              ? i.insertBefore(e, r)
              : i.appendChild(e),
        e
    );
}
var G4 = new Map();
function Ad(t, n = {}) {
    let e = Z4(n);
    return Array.from(G4.get(e)?.children || []).find(
        (i) => i.tagName === "STYLE" && i.getAttribute(Nc(n)) === t,
    );
}
function Yc(t, n, e = {}) {
    let i = Z4(e);
    if (!G4.has(i)) {
        let a = Oc("", e),
            { parentNode: s } = a;
        (G4.set(i, s), s.removeChild(a));
    }
    let r = Ad(n, e);
    if (r)
        return (
            e.cspNonce && r.nonce !== e.cspNonce && (r.nonce = e.cspNonce),
            r.innerHTML !== t && (r.innerHTML = t),
            r
        );
    let o = Oc(t, e);
    return (o?.setAttribute(Nc(e), n), o);
}
function Fi(t, n, e) {
    return {
        [`${t}-status-success`]: n === "success",
        [`${t}-status-warning`]: n === "warning",
        [`${t}-status-error`]: n === "error",
        [`${t}-status-validating`]: n === "validating",
        [`${t}-has-feedback`]: e,
    };
}
function Vd(t) {
    return typeof Zone < "u" ? Zone.root.run(t) : t();
}
function Bc(t, n, e) {
    return t ? new Xe((i) => Vd(() => A2(t, n, e).subscribe(i))) : pt;
}
var Fd = new b("nz-config");
var Hd = `-ant-${Date.now()}-${Math.random()}`;
function Od(t, n) {
    let e = {},
        i = (a, s) => {
            let c = a.clone();
            return ((c = s?.(c) || c), c.toRgbString());
        },
        r = (a, s) => {
            let c = new So(a),
                d = W4(c.toRgbString());
            ((e[`${s}-color`] = i(c)),
                (e[`${s}-color-disabled`] = d[1]),
                (e[`${s}-color-hover`] = d[4]),
                (e[`${s}-color-active`] = d[7]),
                (e[`${s}-color-outline`] = c
                    .clone()
                    .setAlpha(0.2)
                    .toRgbString()),
                (e[`${s}-color-deprecated-bg`] = d[1]),
                (e[`${s}-color-deprecated-border`] = d[3]));
        };
    if (n.primaryColor) {
        r(n.primaryColor, "primary");
        let a = new So(n.primaryColor),
            s = W4(a.toRgbString());
        (s.forEach((d, h) => {
            e[`primary-${h + 1}`] = d;
        }),
            (e["primary-color-deprecated-l-35"] = i(a, (d) => d.lighten(35))),
            (e["primary-color-deprecated-l-20"] = i(a, (d) => d.lighten(20))),
            (e["primary-color-deprecated-t-20"] = i(a, (d) => d.tint(20))),
            (e["primary-color-deprecated-t-50"] = i(a, (d) => d.tint(50))),
            (e["primary-color-deprecated-f-12"] = i(a, (d) =>
                d.setAlpha(d.getAlpha() * 0.12),
            )));
        let c = new So(s[0]);
        ((e["primary-color-active-deprecated-f-30"] = i(c, (d) =>
            d.setAlpha(d.getAlpha() * 0.3),
        )),
            (e["primary-color-active-deprecated-d-02"] = i(c, (d) =>
                d.darken(2),
            )));
    }
    return (
        n.successColor && r(n.successColor, "success"),
        n.warningColor && r(n.warningColor, "warning"),
        n.errorColor && r(n.errorColor, "error"),
        n.infoColor && r(n.infoColor, "info"),
        `
  :root {
    ${Object.keys(e).map((a) => `--${t}-${a}: ${e[a]};`).join(`
`)}
  }
  `.trim()
    );
}
function jc(t, n, e) {
    let i = Od(t, n);
    K4()
        ? Yc(i, `${Hd}-dynamic-theme`, { cspNonce: e })
        : Bn(
              "NzConfigService: SSR do not support dynamic theme with css variables.",
          );
}
var Uc = function (t) {
        return t !== void 0;
    },
    $c = "ant",
    bn = (() => {
        class t {
            configUpdated$ = new Y();
            config = l(Fd, { optional: !0 }) || {};
            cspNonce = l(Kt, { optional: !0 });
            constructor() {
                this.config.theme &&
                    jc(
                        this.getConfig().prefixCls?.prefixCls || $c,
                        this.config.theme,
                        this.cspNonce,
                    );
            }
            getConfig() {
                return this.config;
            }
            getConfigForComponent(e) {
                return this.config[e];
            }
            getConfigChangeEventForComponent(e) {
                return this.configUpdated$.pipe(
                    J((i) => i === e),
                    L(() => {}),
                );
            }
            set(e, i) {
                ((this.config[e] = m(m({}, this.config[e]), i)),
                    e === "theme" &&
                        this.config.theme &&
                        jc(
                            this.getConfig().prefixCls?.prefixCls || $c,
                            this.config.theme,
                            this.cspNonce,
                        ),
                    this.configUpdated$.next(e));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function D1(t, n) {
    let e = l(K),
        i = l(bn),
        r = null,
        o = St(() => {
            r = i.getConfigChangeEventForComponent(t).pipe(N(e)).subscribe(n);
        });
    return () => {
        (o.destroy(), r?.unsubscribe());
    };
}
function ct() {
    return function (t, n) {
        n.addInitializer(function () {
            let e = l(bn),
                i = this[n.name],
                r,
                o = !1;
            Object.defineProperty(this, n.name, {
                get: () => {
                    let a = e.getConfigForComponent(this._nzModuleName)?.[
                        n.name
                    ];
                    return o ? r : Uc(a) ? a : i;
                },
                set: (a) => {
                    ((o = Uc(a)), (r = a));
                },
                enumerable: !0,
                configurable: !0,
            });
        });
    };
}
function jn(t) {
    "@babel/helpers - typeof";
    return (
        (jn =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (n) {
                      return typeof n;
                  }
                : function (n) {
                      return n &&
                          typeof Symbol == "function" &&
                          n.constructor === Symbol &&
                          n !== Symbol.prototype
                          ? "symbol"
                          : typeof n;
                  }),
        jn(t)
    );
}
function Wc(t, n) {
    if (jn(t) != "object" || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (e !== void 0) {
        var i = e.call(t, n || "default");
        if (jn(i) != "object") return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (n === "string" ? String : Number)(t);
}
function qc(t) {
    var n = Wc(t, "string");
    return jn(n) == "symbol" ? n : n + "";
}
function lt(t, n, e) {
    return (
        (n = qc(n)) in t
            ? Object.defineProperty(t, n, {
                  value: e,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (t[n] = e),
        t
    );
}
var ke = Math.round;
function X4(t, n) {
    let e =
            t
                .replace(/^[^(]*\((.*)/, "$1")
                .replace(/\).*/, "")
                .match(/\d*\.?\d+%?/g) || [],
        i = e.map((r) => parseFloat(r));
    for (let r = 0; r < 3; r += 1) i[r] = n(i[r] || 0, e[r] || "", r);
    return (
        e[3] ? (i[3] = e[3].includes("%") ? i[3] / 100 : i[3]) : (i[3] = 1),
        i
    );
}
var Gc = (t, n, e) => (e === 0 ? t : t / 100);
function Hi(t, n) {
    let e = n || 255;
    return t > e ? e : t < 0 ? 0 : t;
}
var Un = class t {
    constructor(n) {
        (lt(this, "isValid", !0),
            lt(this, "r", 0),
            lt(this, "g", 0),
            lt(this, "b", 0),
            lt(this, "a", 1),
            lt(this, "_h", void 0),
            lt(this, "_s", void 0),
            lt(this, "_l", void 0),
            lt(this, "_v", void 0),
            lt(this, "_max", void 0),
            lt(this, "_min", void 0),
            lt(this, "_brightness", void 0));
        function e(r) {
            return r[0] in n && r[1] in n && r[2] in n;
        }
        if (n)
            if (typeof n == "string") {
                let o = function (a) {
                    return r.startsWith(a);
                };
                var i = o;
                let r = n.trim();
                /^#?[A-F\d]{3,8}$/i.test(r)
                    ? this.fromHexString(r)
                    : o("rgb")
                      ? this.fromRgbString(r)
                      : o("hsl")
                        ? this.fromHslString(r)
                        : (o("hsv") || o("hsb")) && this.fromHsvString(r);
            } else if (n instanceof t)
                ((this.r = n.r),
                    (this.g = n.g),
                    (this.b = n.b),
                    (this.a = n.a),
                    (this._h = n._h),
                    (this._s = n._s),
                    (this._l = n._l),
                    (this._v = n._v));
            else if (e("rgb"))
                ((this.r = Hi(n.r)),
                    (this.g = Hi(n.g)),
                    (this.b = Hi(n.b)),
                    (this.a = typeof n.a == "number" ? Hi(n.a, 1) : 1));
            else if (e("hsl")) this.fromHsl(n);
            else if (e("hsv")) this.fromHsv(n);
            else
                throw new Error(
                    "@ant-design/fast-color: unsupported input " +
                        JSON.stringify(n),
                );
    }
    setR(n) {
        return this._sc("r", n);
    }
    setG(n) {
        return this._sc("g", n);
    }
    setB(n) {
        return this._sc("b", n);
    }
    setA(n) {
        return this._sc("a", n, 1);
    }
    setHue(n) {
        let e = this.toHsv();
        return ((e.h = n), this._c(e));
    }
    getLuminance() {
        function n(o) {
            let a = o / 255;
            return a <= 0.03928
                ? a / 12.92
                : Math.pow((a + 0.055) / 1.055, 2.4);
        }
        let e = n(this.r),
            i = n(this.g),
            r = n(this.b);
        return 0.2126 * e + 0.7152 * i + 0.0722 * r;
    }
    getHue() {
        if (typeof this._h > "u") {
            let n = this.getMax() - this.getMin();
            n === 0
                ? (this._h = 0)
                : (this._h = ke(
                      60 *
                          (this.r === this.getMax()
                              ? (this.g - this.b) / n +
                                (this.g < this.b ? 6 : 0)
                              : this.g === this.getMax()
                                ? (this.b - this.r) / n + 2
                                : (this.r - this.g) / n + 4),
                  ));
        }
        return this._h;
    }
    getSaturation() {
        if (typeof this._s > "u") {
            let n = this.getMax() - this.getMin();
            n === 0 ? (this._s = 0) : (this._s = n / this.getMax());
        }
        return this._s;
    }
    getLightness() {
        return (
            typeof this._l > "u" &&
                (this._l = (this.getMax() + this.getMin()) / 510),
            this._l
        );
    }
    getValue() {
        return (
            typeof this._v > "u" && (this._v = this.getMax() / 255),
            this._v
        );
    }
    getBrightness() {
        return (
            typeof this._brightness > "u" &&
                (this._brightness =
                    (this.r * 299 + this.g * 587 + this.b * 114) / 1e3),
            this._brightness
        );
    }
    darken(n = 10) {
        let e = this.getHue(),
            i = this.getSaturation(),
            r = this.getLightness() - n / 100;
        return (r < 0 && (r = 0), this._c({ h: e, s: i, l: r, a: this.a }));
    }
    lighten(n = 10) {
        let e = this.getHue(),
            i = this.getSaturation(),
            r = this.getLightness() + n / 100;
        return (r > 1 && (r = 1), this._c({ h: e, s: i, l: r, a: this.a }));
    }
    mix(n, e = 50) {
        let i = this._c(n),
            r = e / 100,
            o = (s) => (i[s] - this[s]) * r + this[s],
            a = {
                r: ke(o("r")),
                g: ke(o("g")),
                b: ke(o("b")),
                a: ke(o("a") * 100) / 100,
            };
        return this._c(a);
    }
    tint(n = 10) {
        return this.mix({ r: 255, g: 255, b: 255, a: 1 }, n);
    }
    shade(n = 10) {
        return this.mix({ r: 0, g: 0, b: 0, a: 1 }, n);
    }
    onBackground(n) {
        let e = this._c(n),
            i = this.a + e.a * (1 - this.a),
            r = (o) => ke((this[o] * this.a + e[o] * e.a * (1 - this.a)) / i);
        return this._c({ r: r("r"), g: r("g"), b: r("b"), a: i });
    }
    isDark() {
        return this.getBrightness() < 128;
    }
    isLight() {
        return this.getBrightness() >= 128;
    }
    equals(n) {
        return (
            this.r === n.r && this.g === n.g && this.b === n.b && this.a === n.a
        );
    }
    clone() {
        return this._c(this);
    }
    toHexString() {
        let n = "#",
            e = (this.r || 0).toString(16);
        n += e.length === 2 ? e : "0" + e;
        let i = (this.g || 0).toString(16);
        n += i.length === 2 ? i : "0" + i;
        let r = (this.b || 0).toString(16);
        if (
            ((n += r.length === 2 ? r : "0" + r),
            typeof this.a == "number" && this.a >= 0 && this.a < 1)
        ) {
            let o = ke(this.a * 255).toString(16);
            n += o.length === 2 ? o : "0" + o;
        }
        return n;
    }
    toHsl() {
        return {
            h: this.getHue(),
            s: this.getSaturation(),
            l: this.getLightness(),
            a: this.a,
        };
    }
    toHslString() {
        let n = this.getHue(),
            e = ke(this.getSaturation() * 100),
            i = ke(this.getLightness() * 100);
        return this.a !== 1
            ? `hsla(${n},${e}%,${i}%,${this.a})`
            : `hsl(${n},${e}%,${i}%)`;
    }
    toHsv() {
        return {
            h: this.getHue(),
            s: this.getSaturation(),
            v: this.getValue(),
            a: this.a,
        };
    }
    toRgb() {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    }
    toRgbString() {
        return this.a !== 1
            ? `rgba(${this.r},${this.g},${this.b},${this.a})`
            : `rgb(${this.r},${this.g},${this.b})`;
    }
    toString() {
        return this.toRgbString();
    }
    _sc(n, e, i) {
        let r = this.clone();
        return ((r[n] = Hi(e, i)), r);
    }
    _c(n) {
        return new this.constructor(n);
    }
    getMax() {
        return (
            typeof this._max > "u" &&
                (this._max = Math.max(this.r, this.g, this.b)),
            this._max
        );
    }
    getMin() {
        return (
            typeof this._min > "u" &&
                (this._min = Math.min(this.r, this.g, this.b)),
            this._min
        );
    }
    fromHexString(n) {
        let e = n.replace("#", "");
        function i(r, o) {
            return parseInt(e[r] + e[o || r], 16);
        }
        e.length < 6
            ? ((this.r = i(0)),
              (this.g = i(1)),
              (this.b = i(2)),
              (this.a = e[3] ? i(3) / 255 : 1))
            : ((this.r = i(0, 1)),
              (this.g = i(2, 3)),
              (this.b = i(4, 5)),
              (this.a = e[6] ? i(6, 7) / 255 : 1));
    }
    fromHsl({ h: n, s: e, l: i, a: r }) {
        if (
            ((this._h = n % 360),
            (this._s = e),
            (this._l = i),
            (this.a = typeof r == "number" ? r : 1),
            e <= 0)
        ) {
            let v = ke(i * 255);
            ((this.r = v), (this.g = v), (this.b = v));
        }
        let o = 0,
            a = 0,
            s = 0,
            c = n / 60,
            d = (1 - Math.abs(2 * i - 1)) * e,
            h = d * (1 - Math.abs((c % 2) - 1));
        c >= 0 && c < 1
            ? ((o = d), (a = h))
            : c >= 1 && c < 2
              ? ((o = h), (a = d))
              : c >= 2 && c < 3
                ? ((a = d), (s = h))
                : c >= 3 && c < 4
                  ? ((a = h), (s = d))
                  : c >= 4 && c < 5
                    ? ((o = h), (s = d))
                    : c >= 5 && c < 6 && ((o = d), (s = h));
        let f = i - d / 2;
        ((this.r = ke((o + f) * 255)),
            (this.g = ke((a + f) * 255)),
            (this.b = ke((s + f) * 255)));
    }
    fromHsv({ h: n, s: e, v: i, a: r }) {
        ((this._h = n % 360),
            (this._s = e),
            (this._v = i),
            (this.a = typeof r == "number" ? r : 1));
        let o = ke(i * 255);
        if (((this.r = o), (this.g = o), (this.b = o), e <= 0)) return;
        let a = n / 60,
            s = Math.floor(a),
            c = a - s,
            d = ke(i * (1 - e) * 255),
            h = ke(i * (1 - e * c) * 255),
            f = ke(i * (1 - e * (1 - c)) * 255);
        switch (s) {
            case 0:
                ((this.g = f), (this.b = d));
                break;
            case 1:
                ((this.r = h), (this.b = d));
                break;
            case 2:
                ((this.r = d), (this.b = f));
                break;
            case 3:
                ((this.r = d), (this.g = h));
                break;
            case 4:
                ((this.r = f), (this.g = d));
                break;
            case 5:
            default:
                ((this.g = d), (this.b = h));
                break;
        }
    }
    fromHsvString(n) {
        let e = X4(n, Gc);
        this.fromHsv({ h: e[0], s: e[1], v: e[2], a: e[3] });
    }
    fromHslString(n) {
        let e = X4(n, Gc);
        this.fromHsl({ h: e[0], s: e[1], l: e[2], a: e[3] });
    }
    fromRgbString(n) {
        let e = X4(n, (i, r) => (r.includes("%") ? ke((i / 100) * 255) : i));
        ((this.r = e[0]), (this.g = e[1]), (this.b = e[2]), (this.a = e[3]));
    }
};
var Eo = 2,
    Kc = 0.16,
    Id = 0.05,
    Rd = 0.05,
    Ld = 0.15,
    Jc = 5,
    e6 = 4,
    Nd = [
        { index: 7, amount: 15 },
        { index: 6, amount: 25 },
        { index: 5, amount: 30 },
        { index: 5, amount: 45 },
        { index: 5, amount: 65 },
        { index: 5, amount: 85 },
        { index: 4, amount: 90 },
        { index: 3, amount: 95 },
        { index: 2, amount: 97 },
        { index: 1, amount: 98 },
    ];
function Zc(t, n, e) {
    var i;
    return (
        Math.round(t.h) >= 60 && Math.round(t.h) <= 240
            ? (i = e ? Math.round(t.h) - Eo * n : Math.round(t.h) + Eo * n)
            : (i = e ? Math.round(t.h) + Eo * n : Math.round(t.h) - Eo * n),
        i < 0 ? (i += 360) : i >= 360 && (i -= 360),
        i
    );
}
function Xc(t, n, e) {
    if (t.h === 0 && t.s === 0) return t.s;
    var i;
    return (
        e ? (i = t.s - Kc * n) : n === e6 ? (i = t.s + Kc) : (i = t.s + Id * n),
        i > 1 && (i = 1),
        e && n === Jc && i > 0.1 && (i = 0.1),
        i < 0.06 && (i = 0.06),
        Math.round(i * 100) / 100
    );
}
function Qc(t, n, e) {
    var i;
    return (
        e ? (i = t.v + Rd * n) : (i = t.v - Ld * n),
        (i = Math.max(0, Math.min(1, i))),
        Math.round(i * 100) / 100
    );
}
function Po(t) {
    for (
        var n =
                arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : {},
            e = [],
            i = new Un(t),
            r = i.toHsv(),
            o = Jc;
        o > 0;
        o -= 1
    ) {
        var a = new Un({ h: Zc(r, o, !0), s: Xc(r, o, !0), v: Qc(r, o, !0) });
        e.push(a);
    }
    e.push(i);
    for (var s = 1; s <= e6; s += 1) {
        var c = new Un({ h: Zc(r, s), s: Xc(r, s), v: Qc(r, s) });
        e.push(c);
    }
    return n.theme === "dark"
        ? Nd.map(function (d) {
              var h = d.index,
                  f = d.amount;
              return new Un(n.backgroundColor || "#141414")
                  .mix(e[h], f)
                  .toHexString();
          })
        : e.map(function (d) {
              return d.toHexString();
          });
}
var t6 = [
    "#fff1f0",
    "#ffccc7",
    "#ffa39e",
    "#ff7875",
    "#ff4d4f",
    "#f5222d",
    "#cf1322",
    "#a8071a",
    "#820014",
    "#5c0011",
];
t6.primary = t6[5];
var n6 = [
    "#fff2e8",
    "#ffd8bf",
    "#ffbb96",
    "#ff9c6e",
    "#ff7a45",
    "#fa541c",
    "#d4380d",
    "#ad2102",
    "#871400",
    "#610b00",
];
n6.primary = n6[5];
var i6 = [
    "#fff7e6",
    "#ffe7ba",
    "#ffd591",
    "#ffc069",
    "#ffa940",
    "#fa8c16",
    "#d46b08",
    "#ad4e00",
    "#873800",
    "#612500",
];
i6.primary = i6[5];
var r6 = [
    "#fffbe6",
    "#fff1b8",
    "#ffe58f",
    "#ffd666",
    "#ffc53d",
    "#faad14",
    "#d48806",
    "#ad6800",
    "#874d00",
    "#613400",
];
r6.primary = r6[5];
var o6 = [
    "#feffe6",
    "#ffffb8",
    "#fffb8f",
    "#fff566",
    "#ffec3d",
    "#fadb14",
    "#d4b106",
    "#ad8b00",
    "#876800",
    "#614700",
];
o6.primary = o6[5];
var a6 = [
    "#fcffe6",
    "#f4ffb8",
    "#eaff8f",
    "#d3f261",
    "#bae637",
    "#a0d911",
    "#7cb305",
    "#5b8c00",
    "#3f6600",
    "#254000",
];
a6.primary = a6[5];
var s6 = [
    "#f6ffed",
    "#d9f7be",
    "#b7eb8f",
    "#95de64",
    "#73d13d",
    "#52c41a",
    "#389e0d",
    "#237804",
    "#135200",
    "#092b00",
];
s6.primary = s6[5];
var c6 = [
    "#e6fffb",
    "#b5f5ec",
    "#87e8de",
    "#5cdbd3",
    "#36cfc9",
    "#13c2c2",
    "#08979c",
    "#006d75",
    "#00474f",
    "#002329",
];
c6.primary = c6[5];
var l6 = [
    "#e6f4ff",
    "#bae0ff",
    "#91caff",
    "#69b1ff",
    "#4096ff",
    "#1677ff",
    "#0958d9",
    "#003eb3",
    "#002c8c",
    "#001d66",
];
l6.primary = l6[5];
var d6 = [
    "#f0f5ff",
    "#d6e4ff",
    "#adc6ff",
    "#85a5ff",
    "#597ef7",
    "#2f54eb",
    "#1d39c4",
    "#10239e",
    "#061178",
    "#030852",
];
d6.primary = d6[5];
var h6 = [
    "#f9f0ff",
    "#efdbff",
    "#d3adf7",
    "#b37feb",
    "#9254de",
    "#722ed1",
    "#531dab",
    "#391085",
    "#22075e",
    "#120338",
];
h6.primary = h6[5];
var u6 = [
    "#fff0f6",
    "#ffd6e7",
    "#ffadd2",
    "#ff85c0",
    "#f759ab",
    "#eb2f96",
    "#c41d7f",
    "#9e1068",
    "#780650",
    "#520339",
];
u6.primary = u6[5];
var m6 = [
    "#a6a6a6",
    "#999999",
    "#8c8c8c",
    "#808080",
    "#737373",
    "#666666",
    "#404040",
    "#1a1a1a",
    "#000000",
    "#000000",
];
m6.primary = m6[5];
var p6 = [
    "#2a1215",
    "#431418",
    "#58181c",
    "#791a1f",
    "#a61d24",
    "#d32029",
    "#e84749",
    "#f37370",
    "#f89f9a",
    "#fac8c3",
];
p6.primary = p6[5];
var f6 = [
    "#2b1611",
    "#441d12",
    "#592716",
    "#7c3118",
    "#aa3e19",
    "#d84a1b",
    "#e87040",
    "#f3956a",
    "#f8b692",
    "#fad4bc",
];
f6.primary = f6[5];
var v6 = [
    "#2b1d11",
    "#442a11",
    "#593815",
    "#7c4a15",
    "#aa6215",
    "#d87a16",
    "#e89a3c",
    "#f3b765",
    "#f8cf8d",
    "#fae3b7",
];
v6.primary = v6[5];
var g6 = [
    "#2b2111",
    "#443111",
    "#594214",
    "#7c5914",
    "#aa7714",
    "#d89614",
    "#e8b339",
    "#f3cc62",
    "#f8df8b",
    "#faedb5",
];
g6.primary = g6[5];
var y6 = [
    "#2b2611",
    "#443b11",
    "#595014",
    "#7c6e14",
    "#aa9514",
    "#d8bd14",
    "#e8d639",
    "#f3ea62",
    "#f8f48b",
    "#fafab5",
];
y6.primary = y6[5];
var z6 = [
    "#1f2611",
    "#2e3c10",
    "#3e4f13",
    "#536d13",
    "#6f9412",
    "#8bbb11",
    "#a9d134",
    "#c9e75d",
    "#e4f88b",
    "#f0fab5",
];
z6.primary = z6[5];
var C6 = [
    "#162312",
    "#1d3712",
    "#274916",
    "#306317",
    "#3c8618",
    "#49aa19",
    "#6abe39",
    "#8fd460",
    "#b2e58b",
    "#d5f2bb",
];
C6.primary = C6[5];
var b6 = [
    "#112123",
    "#113536",
    "#144848",
    "#146262",
    "#138585",
    "#13a8a8",
    "#33bcb7",
    "#58d1c9",
    "#84e2d8",
    "#b2f1e8",
];
b6.primary = b6[5];
var _6 = [
    "#111a2c",
    "#112545",
    "#15325b",
    "#15417e",
    "#1554ad",
    "#1668dc",
    "#3c89e8",
    "#65a9f3",
    "#8dc5f8",
    "#b7dcfa",
];
_6.primary = _6[5];
var w6 = [
    "#131629",
    "#161d40",
    "#1c2755",
    "#203175",
    "#263ea0",
    "#2b4acb",
    "#5273e0",
    "#7f9ef3",
    "#a8c1f8",
    "#d2e0fa",
];
w6.primary = w6[5];
var M6 = [
    "#1a1325",
    "#24163a",
    "#301c4d",
    "#3e2069",
    "#51258f",
    "#642ab5",
    "#854eca",
    "#ab7ae0",
    "#cda8f0",
    "#ebd7fa",
];
M6.primary = M6[5];
var S6 = [
    "#291321",
    "#40162f",
    "#551c3b",
    "#75204f",
    "#a02669",
    "#cb2b83",
    "#e0529c",
    "#f37fb7",
    "#f8a8cc",
    "#fad2e3",
];
S6.primary = S6[5];
var D6 = [
    "#151515",
    "#1f1f1f",
    "#2d2d2d",
    "#393939",
    "#494949",
    "#5a5a5a",
    "#6a6a6a",
    "#7b7b7b",
    "#888888",
    "#969696",
];
D6.primary = D6[5];
var en = "[@ant-design/icons-angular]:";
function Yd(t) {
    console.error(`${en} ${t}.`);
}
function k6(t) {
    W1() && console.warn(`${en} ${t}.`);
}
function x6(t) {
    return Po(t)[0];
}
function Ao(t, n) {
    switch (n) {
        case "fill":
            return `${t}-fill`;
        case "outline":
            return `${t}-o`;
        case "twotone":
            return `${t}-twotone`;
        case void 0:
            return t;
        default:
            throw new Error(`${en}Theme "${n}" is not a recognized theme!`);
    }
}
function Bd(t, n, e, i) {
    return `${Ao(t, n)}-${e}-${i}`;
}
function jd(t) {
    return t === "o" ? "outline" : t;
}
function Ud(t) {
    return t.endsWith("-fill") || t.endsWith("-o") || t.endsWith("-twotone");
}
function E6(t) {
    return (
        typeof t == "object" &&
        typeof t.name == "string" &&
        (typeof t.theme == "string" || t.theme === void 0) &&
        typeof t.icon == "string"
    );
}
function $d(t) {
    let n = t.split("-"),
        e = jd(n.splice(n.length - 1, 1)[0]);
    return { name: n.join("-"), theme: e, icon: "" };
}
function Wd(t) {
    return t.cloneNode(!0);
}
function qd(t) {
    return t
        .replace(/['"]#333['"]/g, '"primaryColor"')
        .replace(/['"]#E6E6E6['"]/g, '"secondaryColor"')
        .replace(/['"]#D9D9D9['"]/g, '"secondaryColor"')
        .replace(/['"]#D8D8D8['"]/g, '"secondaryColor"');
}
function Vo(t) {
    let n = t.split(":");
    switch (n.length) {
        case 1:
            return [t, ""];
        case 2:
            return [n[1], n[0]];
        default:
            throw new Error(`${en}The icon type ${t} is not valid!`);
    }
}
function Gd(t) {
    return Vo(t)[1] !== "";
}
function Kd() {
    return new Error(
        `${en}Type should have a namespace. Try "namespace:${name}".`,
    );
}
function T6(t) {
    return new Error(`${en}the icon ${t} does not exist or is not registered.`);
}
function Zd() {
    return (
        Yd('you need to import "HttpClientModule" to use dynamic importing.'),
        null
    );
}
function Xd(t) {
    return new Error(`${en}The url "${t}" is unsafe.`);
}
function Qd() {
    return new Error(`${en}<svg> tag not found.`);
}
function Jd() {
    return new Error(`${en}Importing timeout error.`);
}
var eh = "__ant_icon_load",
    th = new b("ant_icons"),
    Q4 = (() => {
        let n = class n {
            set twoToneColor({ primaryColor: i, secondaryColor: r }) {
                ((this._twoToneColorPalette.primaryColor = i),
                    (this._twoToneColorPalette.secondaryColor = r || x6(i)));
            }
            get twoToneColor() {
                return m({}, this._twoToneColorPalette);
            }
            get _disableDynamicLoading() {
                return !1;
            }
            constructor(i) {
                ((this._antIcons = i),
                    (this.defaultTheme = "outline"),
                    (this._svgDefinitions = new Map()),
                    (this._svgRenderedDefinitions = new Map()),
                    (this._inProgressFetches = new Map()),
                    (this._assetsUrlRoot = ""),
                    (this._twoToneColorPalette = {
                        primaryColor: "#333333",
                        secondaryColor: "#E6E6E6",
                    }),
                    (this._enableJsonpLoading = !1),
                    (this._jsonpIconLoad$ = new Y()),
                    (this._rendererFactory = l(Me)),
                    (this._handler = l(Pn, { optional: !0 })),
                    (this._document = l(U)),
                    (this.sanitizer = l(ja)),
                    (this._renderer = this._rendererFactory.createRenderer(
                        null,
                        null,
                    )),
                    this._handler && (this._http = new r1(this._handler)),
                    this._antIcons && this.addIcon(...this._antIcons));
            }
            useJsonpLoading() {
                this._enableJsonpLoading
                    ? k6("You are already using jsonp loading.")
                    : ((this._enableJsonpLoading = !0),
                      (window[eh] = (i) => {
                          this._jsonpIconLoad$.next(i);
                      }));
            }
            changeAssetsSource(i) {
                this._assetsUrlRoot = i.endsWith("/") ? i : i + "/";
            }
            addIcon(...i) {
                i.forEach((r) => {
                    this._svgDefinitions.set(Ao(r.name, r.theme), r);
                });
            }
            addIconLiteral(i, r) {
                let [o, a] = Vo(i);
                if (!a) throw Kd();
                this.addIcon({ name: i, icon: r });
            }
            clear() {
                (this._svgDefinitions.clear(),
                    this._svgRenderedDefinitions.clear());
            }
            getRenderedContent(i, r) {
                let o = E6(i) ? i : this._svgDefinitions.get(i) || null;
                if (!o && this._disableDynamicLoading) throw T6(i);
                return (o ? S(o) : this._loadIconDynamically(i)).pipe(
                    L((s) => {
                        if (!s) throw T6(i);
                        return this._loadSVGFromCacheOrCreateNew(s, r);
                    }),
                );
            }
            getCachedIcons() {
                return this._svgDefinitions;
            }
            _loadIconDynamically(i) {
                if (!this._http && !this._enableJsonpLoading) return S(Zd());
                let r = this._inProgressFetches.get(i);
                if (!r) {
                    let [o, a] = Vo(i),
                        s = a ? { name: i, icon: "" } : $d(o),
                        c = this._enableJsonpLoading ? ".js" : ".svg",
                        d =
                            (a
                                ? `${this._assetsUrlRoot}assets/${a}/${o}`
                                : `${this._assetsUrlRoot}assets/${s.theme}/${s.name}`) +
                            c,
                        h = this.sanitizer.sanitize(Zt.URL, d);
                    if (!h) throw Xd(d);
                    ((r = (
                        this._enableJsonpLoading
                            ? this._loadIconDynamicallyWithJsonp(s, h)
                            : this._http
                                  .get(h, { responseType: "text" })
                                  .pipe(L((v) => Z(m({}, s), { icon: v })))
                    ).pipe(
                        me((v) => this.addIcon(v)),
                        ft(() => this._inProgressFetches.delete(i)),
                        qt(() => S(null)),
                        R2(),
                    )),
                        this._inProgressFetches.set(i, r));
                }
                return r;
            }
            _loadIconDynamicallyWithJsonp(i, r) {
                return new Xe((o) => {
                    let a = this._document.createElement("script"),
                        s = setTimeout(() => {
                            (c(), o.error(Jd()));
                        }, 6e3);
                    a.src = r;
                    function c() {
                        (a.parentNode.removeChild(a), clearTimeout(s));
                    }
                    (this._document.body.appendChild(a),
                        this._jsonpIconLoad$
                            .pipe(
                                J(
                                    (d) =>
                                        d.name === i.name &&
                                        d.theme === i.theme,
                                ),
                                nn(1),
                            )
                            .subscribe((d) => {
                                (o.next(d), c());
                            }));
                });
            }
            _loadSVGFromCacheOrCreateNew(i, r) {
                let o,
                    a = r || this._twoToneColorPalette.primaryColor,
                    s = x6(a) || this._twoToneColorPalette.secondaryColor,
                    c =
                        i.theme === "twotone"
                            ? Bd(i.name, i.theme, a, s)
                            : i.theme === void 0
                              ? i.name
                              : Ao(i.name, i.theme),
                    d = this._svgRenderedDefinitions.get(c);
                return (
                    d
                        ? (o = d.icon)
                        : ((o = this._setSVGAttribute(
                              this._colorizeSVGIcon(
                                  this._createSVGElementFromString(
                                      Gd(i.name) ? i.icon : qd(i.icon),
                                  ),
                                  i.theme === "twotone",
                                  a,
                                  s,
                              ),
                          )),
                          this._svgRenderedDefinitions.set(
                              c,
                              Z(m({}, i), { icon: o }),
                          )),
                    Wd(o)
                );
            }
            _createSVGElementFromString(i) {
                let r = this._document.createElement("div");
                r.innerHTML = i;
                let o = r.querySelector("svg");
                if (!o) throw Qd;
                return o;
            }
            _setSVGAttribute(i) {
                return (
                    this._renderer.setAttribute(i, "width", "1em"),
                    this._renderer.setAttribute(i, "height", "1em"),
                    i
                );
            }
            _colorizeSVGIcon(i, r, o, a) {
                if (r) {
                    let s = i.childNodes,
                        c = s.length;
                    for (let d = 0; d < c; d++) {
                        let h = s[d];
                        h.getAttribute("fill") === "secondaryColor"
                            ? this._renderer.setAttribute(h, "fill", a)
                            : this._renderer.setAttribute(h, "fill", o);
                    }
                }
                return (
                    this._renderer.setAttribute(i, "fill", "currentColor"),
                    i
                );
            }
        };
        ((n.ɵfac = function (r) {
            return new (r || n)(x(th, 8));
        }),
            (n.ɵprov = p({ token: n, factory: n.ɵfac, providedIn: "root" })));
        let t = n;
        return t;
    })();
function nh(t, n) {
    return (
        t.type === n.type &&
        t.theme === n.theme &&
        t.twoToneColor === n.twoToneColor
    );
}
var P6 = (() => {
    let n = class n {
        constructor(i) {
            ((this._iconService = i),
                (this._elementRef = l(B)),
                (this._renderer = l(oe)));
        }
        ngOnChanges(i) {
            (i.type || i.theme || i.twoToneColor) && this._changeIcon();
        }
        _changeIcon() {
            return new Promise((i) => {
                if (!this.type) {
                    (this._clearSVGElement(), i(null));
                    return;
                }
                let r = this._getSelfRenderMeta();
                this._iconService
                    .getRenderedContent(
                        this._parseIconType(this.type, this.theme),
                        this.twoToneColor,
                    )
                    .subscribe((o) => {
                        let a = this._getSelfRenderMeta();
                        nh(r, a) ? (this._setSVGElement(o), i(o)) : i(null);
                    });
            });
        }
        _getSelfRenderMeta() {
            return {
                type: this.type,
                theme: this.theme,
                twoToneColor: this.twoToneColor,
            };
        }
        _parseIconType(i, r) {
            if (E6(i)) return i;
            {
                let [o, a] = Vo(i);
                return a
                    ? i
                    : Ud(o)
                      ? (r &&
                            k6(
                                `'type' ${o} already gets a theme inside so 'theme' ${r} would be ignored`,
                            ),
                        o)
                      : Ao(o, r || this._iconService.defaultTheme);
            }
        }
        _setSVGElement(i) {
            (this._clearSVGElement(),
                this._renderer.appendChild(this._elementRef.nativeElement, i));
        }
        _clearSVGElement() {
            let i = this._elementRef.nativeElement,
                r = i.childNodes,
                o = r.length;
            for (let a = o - 1; a >= 0; a--) {
                let s = r[a];
                s.tagName?.toLowerCase() === "svg" &&
                    this._renderer.removeChild(i, s);
            }
        }
    };
    ((n.ɵfac = function (r) {
        return new (r || n)(w(Q4));
    }),
        (n.ɵdir = D({
            type: n,
            selectors: [["", "antIcon", ""]],
            inputs: {
                type: "type",
                theme: "theme",
                twoToneColor: "twoToneColor",
            },
            features: [I],
        })));
    let t = n;
    return t;
})();
var J4;
try {
    J4 = typeof Intl < "u" && Intl.v8BreakIterator;
} catch {
    J4 = !1;
}
var ye = (() => {
    class t {
        _platformId = l(Mt);
        isBrowser = this._platformId
            ? Jn(this._platformId)
            : typeof document == "object" && !!document;
        EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        BLINK =
            this.isBrowser &&
            !!(window.chrome || J4) &&
            typeof CSS < "u" &&
            !this.EDGE &&
            !this.TRIDENT;
        WEBKIT =
            this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) &&
            !this.BLINK &&
            !this.EDGE &&
            !this.TRIDENT;
        IOS =
            this.isBrowser &&
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !("MSStream" in window);
        FIREFOX =
            this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        ANDROID =
            this.isBrowser &&
            /android/i.test(navigator.userAgent) &&
            !this.TRIDENT;
        SAFARI =
            this.isBrowser &&
            /safari/i.test(navigator.userAgent) &&
            this.WEBKIT;
        constructor() {}
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var Oi;
function ih() {
    if (Oi == null && typeof window < "u")
        try {
            window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Oi = !0) }),
            );
        } finally {
            Oi = Oi || !1;
        }
    return Oi;
}
function A6(t) {
    return ih() ? t : !!t.capture;
}
var $n;
function V6() {
    if ($n == null) {
        if (
            typeof document != "object" ||
            !document ||
            typeof Element != "function" ||
            !Element
        )
            return (($n = !1), $n);
        if ("scrollBehavior" in document.documentElement.style) $n = !0;
        else {
            let t = Element.prototype.scrollTo;
            t
                ? ($n = !/\{\s*\[native code\]\s*\}/.test(t.toString()))
                : ($n = !1);
        }
    }
    return $n;
}
var e2;
function F6() {
    if (e2 == null) {
        let t = typeof document < "u" ? document.head : null;
        e2 = !!(t && (t.createShadowRoot || t.attachShadow));
    }
    return e2;
}
function t2(t) {
    if (F6()) {
        let n = t.getRootNode ? t.getRootNode() : null;
        if (typeof ShadowRoot < "u" && ShadowRoot && n instanceof ShadowRoot)
            return n;
    }
    return null;
}
function dt(t) {
    return t.composedPath ? t.composedPath()[0] : t.target;
}
function n2() {
    return (
        (typeof __karma__ < "u" && !!__karma__) ||
        (typeof jasmine < "u" && !!jasmine) ||
        (typeof jest < "u" && !!jest) ||
        (typeof Mocha < "u" && !!Mocha)
    );
}
var H6 = {
    name: "bars",
    theme: "outline",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z" /></svg>',
};
var O6 = {
    name: "caret-down",
    theme: "fill",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>',
};
var I6 = {
    name: "caret-down",
    theme: "outline",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>',
};
var R6 = {
    name: "caret-up",
    theme: "fill",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>',
};
var L6 = {
    name: "caret-up",
    theme: "outline",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>',
};
var N6 = {
    name: "check-circle",
    theme: "fill",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" /></svg>',
};
var Y6 = {
    name: "check-circle",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" /><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /></svg>',
};
var B6 = {
    name: "check",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" /></svg>',
};
var j6 = {
    name: "calendar",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" /></svg>',
};
var U6 = {
        name: "close-circle",
        theme: "fill",
        icon: '<svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" /></svg>',
    },
    $6 = {
        name: "clock-circle",
        theme: "outline",
        icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" /></svg>',
    };
var W6 = {
        name: "close",
        theme: "outline",
        icon: '<svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" /></svg>',
    },
    q6 = {
        name: "close-circle",
        theme: "outline",
        icon: '<svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z" /></svg>',
    };
var G6 = {
    name: "copy",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" /></svg>',
};
var K6 = {
    name: "delete",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" /></svg>',
};
var Z6 = {
    name: "double-left",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" /></svg>',
};
var X6 = {
        name: "double-right",
        theme: "outline",
        icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" /></svg>',
    },
    Q6 = {
        name: "down",
        theme: "outline",
        icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" /></svg>',
    };
var J6 = {
    name: "edit",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" /></svg>',
};
var e8 = {
    name: "ellipsis",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" /></svg>',
};
var t8 = {
    name: "exclamation-circle",
    theme: "fill",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" /></svg>',
};
var n8 = {
    name: "exclamation-circle",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>',
};
var i8 = {
    name: "eye",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" /></svg>',
};
var r8 = {
    name: "file",
    theme: "fill",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2z" /></svg>',
};
var o8 = {
    name: "file",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" /></svg>',
};
var a8 = {
    name: "filter",
    theme: "fill",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" /></svg>',
};
var s8 = {
    name: "left",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" /></svg>',
};
var c8 = {
        name: "info-circle",
        theme: "fill",
        icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" /></svg>',
    },
    l8 = {
        name: "info-circle",
        theme: "outline",
        icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" /></svg>',
    };
var d8 = {
    name: "loading",
    theme: "outline",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" /></svg>',
};
var h8 = {
    name: "paper-clip",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z" /></svg>',
};
var u8 = {
    name: "question-circle",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" /></svg>',
};
var m8 = {
    name: "right",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" /></svg>',
};
var p8 = {
    name: "rotate-left",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><defs><style /></defs><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" /><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" /></svg>',
};
var f8 = {
    name: "rotate-right",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><defs><style /></defs><path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" /><path d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" /></svg>',
};
var v8 = {
    name: "search",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" /></svg>',
};
var i2 = {
    name: "star",
    theme: "fill",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" /></svg>',
};
var g8 = {
    name: "swap",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" /></svg>',
};
var y8 = {
    name: "swap-right",
    theme: "outline",
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z" /></svg>',
};
var z8 = {
    name: "up",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" /></svg>',
};
var C8 = {
    name: "upload",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" /></svg>',
};
var b8 = {
    name: "vertical-align-top",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" /></svg>',
};
var _8 = {
    name: "zoom-in",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" /></svg>',
};
var w8 = {
    name: "zoom-out",
    theme: "outline",
    icon: '<svg viewBox="64 64 896 896" focusable="false"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" /></svg>',
};
var rh = [
        H6,
        j6,
        R6,
        L6,
        O6,
        I6,
        N6,
        Y6,
        B6,
        $6,
        q6,
        U6,
        W6,
        G6,
        K6,
        Z6,
        X6,
        Q6,
        J6,
        e8,
        t8,
        n8,
        i8,
        r8,
        o8,
        a8,
        c8,
        l8,
        s8,
        d8,
        h8,
        u8,
        m8,
        f8,
        p8,
        i2,
        v8,
        i2,
        C8,
        b8,
        z8,
        g8,
        y8,
        _8,
        w8,
    ],
    S8 = new b("nz_icons"),
    kz = new b("nz_icon_default_twotone_color"),
    M8 = "#1890ff",
    D8 = (() => {
        class t extends Q4 {
            nzConfigService = l(bn);
            platform = l(ye);
            configUpdated$ = new Y();
            get _disableDynamicLoading() {
                return !this.platform.isBrowser;
            }
            iconfontCache = new Set();
            normalizeSvgElement(e) {
                (e.getAttribute("viewBox") ||
                    this._renderer.setAttribute(e, "viewBox", "0 0 1024 1024"),
                    (!e.getAttribute("width") || !e.getAttribute("height")) &&
                        (this._renderer.setAttribute(e, "width", "1em"),
                        this._renderer.setAttribute(e, "height", "1em")),
                    e.getAttribute("fill") ||
                        this._renderer.setAttribute(e, "fill", "currentColor"));
            }
            fetchFromIconfont(e) {
                let { scriptUrl: i } = e;
                if (this._document && !this.iconfontCache.has(i)) {
                    let r = this._renderer.createElement("script");
                    (this._renderer.setAttribute(r, "src", i),
                        this._renderer.setAttribute(
                            r,
                            "data-namespace",
                            i.replace(/^(https?|http):/g, ""),
                        ),
                        this._renderer.appendChild(this._document.body, r),
                        this.iconfontCache.add(i));
                }
            }
            createIconfontIcon(e) {
                return this._createSVGElementFromString(
                    `<svg><use xlink:href="${e}"></svg>`,
                );
            }
            constructor() {
                (super([...rh, ...(l(S8, { optional: !0 }) || [])]),
                    this.onConfigChange(),
                    this.configDefaultTwotoneColor(),
                    this.configDefaultTheme());
            }
            onConfigChange() {
                D1("icon", () => {
                    (this.configDefaultTwotoneColor(),
                        this.configDefaultTheme(),
                        this.configUpdated$.next());
                });
            }
            configDefaultTheme() {
                let e = this.getConfig();
                this.defaultTheme = e.nzTheme || "outline";
            }
            configDefaultTwotoneColor() {
                let i = this.getConfig().nzTwotoneColor || M8,
                    r = M8;
                (i &&
                    (i.startsWith("#")
                        ? (r = i)
                        : Bn("Twotone color must be a hex color!")),
                    (this.twoToneColor = { primaryColor: r }));
            }
            getConfig() {
                return this.nzConfigService.getConfigForComponent("icon") || {};
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    x8 = new b("nz_icons_patch"),
    T8 = (() => {
        class t {
            rootIconService;
            patched = !1;
            extraIcons = l(x8, { self: !0 });
            constructor(e) {
                this.rootIconService = e;
            }
            doPatch() {
                this.patched ||
                    (this.extraIcons.forEach((e) =>
                        this.rootIconService.addIcon(e),
                    ),
                    (this.patched = !0));
            }
            static ɵfac = function (i) {
                return new (i || t)(x(D8));
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Ct = (() => {
        class t extends P6 {
            iconService;
            ngZone = l(q);
            changeDetectorRef = l(ee);
            renderer = l(oe);
            destroyRef = l(K);
            pendingTasks = l(B1);
            isBrowser = Jn(l(Mt));
            cacheClassName = null;
            set nzSpin(e) {
                this.spin = e;
            }
            nzRotate = 0;
            set nzType(e) {
                this.type = e;
            }
            set nzTheme(e) {
                this.theme = e;
            }
            set nzTwotoneColor(e) {
                this.twoToneColor = e;
            }
            set nzIconfont(e) {
                this.iconfont = e;
            }
            hostClass;
            el;
            iconfont;
            spin = !1;
            constructor(e) {
                (super(e),
                    (this.iconService = e),
                    l(T8, { optional: !0 })?.doPatch(),
                    (this.el = this._elementRef.nativeElement));
            }
            ngOnChanges(e) {
                let {
                    nzType: i,
                    nzTwotoneColor: r,
                    nzSpin: o,
                    nzTheme: a,
                    nzRotate: s,
                } = e;
                i || r || o || a
                    ? this.ngZone.runOutsideAngular(() => this.changeIcon2())
                    : s
                      ? this.handleRotate(this.el.firstChild)
                      : this._setSVGElement(
                            this.iconService.createIconfontIcon(
                                `#${this.iconfont}`,
                            ),
                        );
            }
            ngAfterContentChecked() {
                if (!this.type) {
                    let e = this.el.children,
                        i = e.length;
                    if (!this.type && e.length)
                        for (; i--; ) {
                            let r = e[i];
                            r.tagName.toLowerCase() === "svg" &&
                                this.iconService.normalizeSvgElement(r);
                        }
                }
            }
            changeIcon2() {
                this.setClassName();
                let e = this.pendingTasks.add();
                Lc(this._changeIcon())
                    .pipe(
                        F2(0, this.isBrowser ? ua : H1),
                        N(this.destroyRef),
                        ft(e),
                    )
                    .subscribe({
                        next: (r) => {
                            this.ngZone.run(() => {
                                (this.changeDetectorRef.detectChanges(),
                                    r &&
                                        (this.setSVGData(r),
                                        this.handleSpin(r),
                                        this.handleRotate(r)));
                            });
                        },
                        error: Bn,
                    });
            }
            handleSpin(e) {
                this.spin || this.type === "loading"
                    ? this.renderer.addClass(e, "anticon-spin")
                    : this.renderer.removeClass(e, "anticon-spin");
            }
            handleRotate(e) {
                this.nzRotate
                    ? this.renderer.setAttribute(
                          e,
                          "style",
                          `transform: rotate(${this.nzRotate}deg)`,
                      )
                    : this.renderer.removeAttribute(e, "style");
            }
            setClassName() {
                (this.cacheClassName &&
                    this.renderer.removeClass(this.el, this.cacheClassName),
                    (this.cacheClassName = `anticon-${this.type}`),
                    this.renderer.addClass(this.el, this.cacheClassName));
            }
            setSVGData(e) {
                (this.renderer.setAttribute(e, "data-icon", this.type),
                    this.renderer.setAttribute(e, "aria-hidden", "true"));
            }
            static ɵfac = function (i) {
                return new (i || t)(w(D8));
            };
            static ɵdir = D({
                type: t,
                selectors: [["nz-icon"], ["", "nz-icon", ""]],
                hostAttrs: [1, "anticon"],
                inputs: {
                    nzSpin: [2, "nzSpin", "nzSpin", _],
                    nzRotate: [2, "nzRotate", "nzRotate", Qn],
                    nzType: "nzType",
                    nzTheme: "nzTheme",
                    nzTwotoneColor: "nzTwotoneColor",
                    nzIconfont: "nzIconfont",
                },
                exportAs: ["nzIcon"],
                features: [Se, I],
            });
        }
        return t;
    })(),
    oh = (t) => $e([{ provide: S8, useValue: t }]),
    ah = (t) => [T8, { provide: x8, useValue: t }],
    Wt = (() => {
        class t {
            static forRoot(e) {
                return { ngModule: t, providers: [oh(e)] };
            }
            static forChild(e) {
                return { ngModule: t, providers: [ah(e)] };
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var Ze = (() => {
        class t {
            viewContainer = l(qe);
            templateRef = l(Ye);
            embeddedViewRef = null;
            context = new r2();
            nzStringTemplateOutletContext = null;
            nzStringTemplateOutlet = null;
            static ngTemplateContextGuard(e, i) {
                return !0;
            }
            recreateView() {
                (this.viewContainer.clear(),
                    Vi(this.nzStringTemplateOutlet)
                        ? (this.embeddedViewRef =
                              this.viewContainer.createEmbeddedView(
                                  this.nzStringTemplateOutlet,
                                  this.nzStringTemplateOutletContext,
                              ))
                        : (this.embeddedViewRef =
                              this.viewContainer.createEmbeddedView(
                                  this.templateRef,
                                  this.context,
                              )));
            }
            updateContext() {
                let e = Vi(this.nzStringTemplateOutlet)
                        ? this.nzStringTemplateOutletContext
                        : this.context,
                    i = this.embeddedViewRef.context;
                if (e) for (let r of Object.keys(e)) i[r] = e[r];
            }
            ngOnChanges(e) {
                let {
                        nzStringTemplateOutletContext: i,
                        nzStringTemplateOutlet: r,
                    } = e,
                    o = () => {
                        let s = !1;
                        return (
                            r &&
                                (s =
                                    r.firstChange ||
                                    Vi(r.previousValue) ||
                                    Vi(r.currentValue)),
                            (i &&
                                ((h) => {
                                    let f = Object.keys(h.previousValue || {}),
                                        v = Object.keys(h.currentValue || {});
                                    if (f.length === v.length) {
                                        for (let M of v)
                                            if (f.indexOf(M) === -1) return !0;
                                        return !1;
                                    } else return !0;
                                })(i)) ||
                                s
                        );
                    };
                (r && (this.context.$implicit = r.currentValue),
                    o() ? this.recreateView() : this.updateContext());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "nzStringTemplateOutlet", ""]],
                inputs: {
                    nzStringTemplateOutletContext:
                        "nzStringTemplateOutletContext",
                    nzStringTemplateOutlet: "nzStringTemplateOutlet",
                },
                exportAs: ["nzStringTemplateOutlet"],
                features: [I],
            });
        }
        return t;
    })(),
    r2 = class {
        $implicit;
    },
    bt = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var E8 = ["*"],
    sh = (t) => ({ $implicit: t });
function ch(t, n) {
    if ((t & 1 && Q(0), t & 2)) {
        let e = g(3);
        se(e.nzSplit);
    }
}
function lh(t, n) {
    if (
        (t & 1 && (z(0, "span", 3), te(1, ch, 1, 1, "ng-template", 4), C()),
        t & 2)
    ) {
        let e = g(),
            i = e.$index,
            r = e.$count,
            o = g();
        (Ge(
            "margin-block-end",
            o.nzDirection === "vertical"
                ? i === r - 1
                    ? null
                    : o.spaceSize
                : null,
            "px",
        )(
            "margin-inline-end",
            o.nzDirection === "horizontal"
                ? i === r - 1
                    ? null
                    : o.spaceSize
                : null,
            "px",
        ),
            u(),
            y("nzStringTemplateOutlet", o.nzSplit)(
                "nzStringTemplateOutletContext",
                Sn(6, sh, i),
            ));
    }
}
function dh(t, n) {
    if (
        (t & 1 && (z(0, "div", 0), mr(1, 1), C(), E(2, lh, 2, 8, "span", 2)),
        t & 2)
    ) {
        let e = n.$implicit,
            i = n.$index,
            r = n.$count,
            o = g();
        (Ge(
            "margin-block-end",
            o.nzDirection === "vertical"
                ? i === r - 1
                    ? null
                    : o.spaceSize
                : null,
            "px",
        )(
            "margin-inline-end",
            o.nzDirection === "horizontal"
                ? i === r - 1
                    ? null
                    : o.spaceSize
                : null,
            "px",
        ),
            u(),
            y("ngTemplateOutlet", e),
            u(),
            P(o.nzSplit && i !== r - 1 ? 2 : -1));
    }
}
var Li = new b("NZ_SPACE_COMPACT_SIZE"),
    P8 = new b("NZ_SPACE_COMPACT_ITEMS"),
    x1 = new b("NZ_SPACE_COMPACT_ITEM_TYPE"),
    hh = (() => {
        class t {
            nzBlock = Xn(!1, { transform: _ });
            nzDirection = Xn("horizontal");
            nzSize = Xn("default");
            elementRef = l(B);
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-space-compact"]],
                hostAttrs: [1, "ant-space-compact"],
                hostVars: 4,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-space-compact-block", r.nzBlock())(
                            "ant-space-compact-vertical",
                            r.nzDirection() === "vertical",
                        );
                },
                inputs: {
                    nzBlock: [1, "nzBlock"],
                    nzDirection: [1, "nzDirection"],
                    nzSize: [1, "nzSize"],
                },
                exportAs: ["nzSpaceCompact"],
                features: [
                    we([
                        { provide: Li, useFactory: () => l(t).nzSize },
                        { provide: P8, useFactory: () => Ce([]) },
                    ]),
                ],
                ngContentSelectors: E8,
                decls: 1,
                vars: 0,
                template: function (i, r) {
                    i & 1 && (be(), _e(0));
                },
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    Ni = (() => {
        class t {
            spaceCompactCmp = l(hh, { host: !0, optional: !0 });
            items = l(P8, { host: !0, optional: !0 });
            type = l(x1);
            elementRef = l(B);
            directionality = l(he);
            dir = zc(this.directionality.change, {
                initialValue: this.directionality.value,
            });
            get parentElement() {
                return this.elementRef.nativeElement?.parentElement;
            }
            class = nt(() => {
                if (
                    !this.spaceCompactCmp ||
                    !this.items ||
                    this.parentElement !==
                        this.spaceCompactCmp.elementRef.nativeElement
                )
                    return null;
                let e = this.items(),
                    i = this.spaceCompactCmp.nzDirection(),
                    r = [uh(this.type, i, this.dir() === "rtl")],
                    o = e.indexOf(this),
                    a = e.findIndex((s) => s);
                return (
                    o === a && r.push(mh(this.type, i)),
                    o === e.length - 1 && r.push(ph(this.type, i)),
                    r
                );
            });
            constructor() {
                !this.spaceCompactCmp ||
                    !this.items ||
                    (St(() => {
                        if (
                            this.parentElement ===
                            this.spaceCompactCmp.elementRef.nativeElement
                        ) {
                            let e = Array.from(
                                this.parentElement.children,
                            ).indexOf(this.elementRef.nativeElement);
                            this.items.update((i) => {
                                let r = i.slice();
                                return (r.splice(e, 0, this), r);
                            });
                        }
                    }),
                    l(K).onDestroy(() => {
                        this.items?.update((e) => e.filter((i) => i !== this));
                    }));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                hostVars: 2,
                hostBindings: function (i, r) {
                    i & 2 && cn(r.class());
                },
                exportAs: ["nzSpaceCompactItem"],
            });
        }
        return t;
    })();
function o2(t, n, e) {
    return `ant-${t}-compact-${n === "vertical" ? "vertical-" : ""}${e}`;
}
function uh(t, n, e) {
    let i = e ? "-rtl" : "";
    return `${o2(t, n, "item")}${i}`;
}
function mh(t, n) {
    return o2(t, n, "first-item");
}
function ph(t, n) {
    return o2(t, n, "last-item");
}
var fh = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({ type: t, selectors: [["", "nzSpaceItem", ""]] });
        }
        return t;
    })(),
    vh = "space",
    k8 = { small: 8, middle: 16, large: 24 },
    Gz = (() => {
        var i;
        let t,
            n = [],
            e = [];
        return (
            (i = class {
                _nzModuleName = vh;
                nzConfigService = l(bn);
                cdr = l(ee);
                destroyRef = l(K);
                nzDirection = "horizontal";
                nzAlign;
                nzSplit = null;
                nzWrap = !1;
                nzSize = pe(this, n, "small");
                items = pe(this, e);
                mergedAlign;
                spaceSize = k8.small;
                updateSpaceItems() {
                    let o =
                        typeof this.nzSize == "string"
                            ? k8[this.nzSize]
                            : this.nzSize;
                    ((this.spaceSize = o / (this.nzSplit ? 2 : 1)),
                        this.cdr.markForCheck());
                }
                ngOnChanges() {
                    (this.updateSpaceItems(),
                        (this.mergedAlign =
                            this.nzAlign === void 0 &&
                            this.nzDirection === "horizontal"
                                ? "center"
                                : this.nzAlign));
                }
                ngAfterContentInit() {
                    (this.updateSpaceItems(),
                        this.items.changes
                            .pipe(N(this.destroyRef))
                            .subscribe(() => {
                                this.cdr.markForCheck();
                            }));
                }
            }),
            (() => {
                let o =
                    typeof Symbol == "function" && Symbol.metadata
                        ? Object.create(null)
                        : void 0;
                ((t = [ct()]),
                    Qe(
                        null,
                        null,
                        t,
                        {
                            kind: "field",
                            name: "nzSize",
                            static: !1,
                            private: !1,
                            access: {
                                has: (a) => "nzSize" in a,
                                get: (a) => a.nzSize,
                                set: (a, s) => {
                                    a.nzSize = s;
                                },
                            },
                            metadata: o,
                        },
                        n,
                        e,
                    ),
                    o &&
                        Object.defineProperty(i, Symbol.metadata, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: o,
                        }));
            })(),
            ut(i, "\u0275fac", function (a) {
                return new (a || i)();
            }),
            ut(
                i,
                "\u0275cmp",
                R({
                    type: i,
                    selectors: [["nz-space"], ["", "nz-space", ""]],
                    contentQueries: function (a, s, c) {
                        if ((a & 1 && et(c, fh, 4, Ye), a & 2)) {
                            let d;
                            le((d = de())) && (s.items = d);
                        }
                    },
                    hostAttrs: [1, "ant-space"],
                    hostVars: 14,
                    hostBindings: function (a, s) {
                        a & 2 &&
                            (Ge("flex-wrap", s.nzWrap ? "wrap" : null),
                            G(
                                "ant-space-horizontal",
                                s.nzDirection === "horizontal",
                            )(
                                "ant-space-vertical",
                                s.nzDirection === "vertical",
                            )(
                                "ant-space-align-start",
                                s.mergedAlign === "start",
                            )("ant-space-align-end", s.mergedAlign === "end")(
                                "ant-space-align-center",
                                s.mergedAlign === "center",
                            )(
                                "ant-space-align-baseline",
                                s.mergedAlign === "baseline",
                            ));
                    },
                    inputs: {
                        nzDirection: "nzDirection",
                        nzAlign: "nzAlign",
                        nzSplit: "nzSplit",
                        nzWrap: [2, "nzWrap", "nzWrap", _],
                        nzSize: "nzSize",
                    },
                    exportAs: ["nzSpace"],
                    features: [I],
                    ngContentSelectors: E8,
                    decls: 3,
                    vars: 0,
                    consts: [
                        [1, "ant-space-item"],
                        [3, "ngTemplateOutlet"],
                        [
                            1,
                            "ant-space-split",
                            3,
                            "margin-block-end",
                            "margin-inline-end",
                        ],
                        [1, "ant-space-split"],
                        [
                            3,
                            "nzStringTemplateOutlet",
                            "nzStringTemplateOutletContext",
                        ],
                    ],
                    template: function (a, s) {
                        (a & 1 &&
                            (be(), _e(0), xt(1, dh, 3, 6, null, null, Mn)),
                            a & 2 && (u(), Tt(s.items)));
                    },
                    dependencies: [Lt, Ze],
                    encapsulation: 2,
                    changeDetection: 0,
                }),
            ),
            i
        );
    })();
var Fo = (() => {
        class t {
            elementRef = l(B);
            renderer = l(oe);
            hidden = null;
            setHiddenAttribute() {
                this.hidden
                    ? typeof this.hidden == "string"
                        ? this.renderer.setAttribute(
                              this.elementRef.nativeElement,
                              "hidden",
                              this.hidden,
                          )
                        : this.renderer.setAttribute(
                              this.elementRef.nativeElement,
                              "hidden",
                              "",
                          )
                    : this.renderer.removeAttribute(
                          this.elementRef.nativeElement,
                          "hidden",
                      );
            }
            constructor() {
                this.renderer.setAttribute(
                    this.elementRef.nativeElement,
                    "hidden",
                    "",
                );
            }
            ngOnChanges() {
                this.setHiddenAttribute();
            }
            ngAfterViewInit() {
                this.setHiddenAttribute();
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "nz-button", ""],
                    ["", "nz-icon", ""],
                    ["nz-icon"],
                    ["", "nz-menu-item", ""],
                    ["", "nz-submenu", ""],
                    ["nz-select-top-control"],
                    ["nz-select-placeholder"],
                    ["nz-input-group"],
                ],
                inputs: { hidden: "hidden" },
                features: [I],
            });
        }
        return t;
    })(),
    V8 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var gh = (() => {
    class t extends zr {
        constructor(e, i, r) {
            super(e, i, r);
        }
        ngOnDestroy() {
            this.flush();
        }
        static ɵfac = function (i) {
            return new (i || t)(x(U), x(q1), x(yr));
        };
        static ɵprov = p({ token: t, factory: t.ɵfac });
    }
    return t;
})();
function yh() {
    return new v3();
}
function zh(t, n, e) {
    return new y3(t, n, e);
}
var H8 = [
        { provide: yr, useFactory: yh },
        { provide: zr, useClass: gh },
        { provide: Me, useFactory: zh, deps: [kn, zr, q] },
    ],
    cC = [
        { provide: q1, useClass: f3 },
        { provide: gt, useValue: "NoopAnimations" },
        ...H8,
    ],
    lC = [
        { provide: q1, useFactory: () => new g3() },
        { provide: gt, useFactory: () => "BrowserAnimations" },
        ...H8,
    ];
var a2 = class {
        triggerElement;
        ngZone;
        insertExtraNode;
        platform;
        cspNonce;
        waveTransitionDuration = 400;
        styleForPseudo = null;
        extraNode = null;
        lastTime = 0;
        clickHandler;
        get waveAttributeName() {
            return this.insertExtraNode
                ? "ant-click-animating"
                : "ant-click-animating-without-extra-node";
        }
        constructor(n, e, i, r, o) {
            ((this.triggerElement = n),
                (this.ngZone = e),
                (this.insertExtraNode = i),
                (this.platform = r),
                (this.cspNonce = o),
                (this.clickHandler = this.onClick.bind(this)),
                this.bindTriggerEvent());
        }
        onClick = (n) => {
            !this.triggerElement ||
                !this.triggerElement.getAttribute ||
                this.triggerElement.getAttribute("disabled") ||
                n.target.tagName === "INPUT" ||
                this.triggerElement.className.indexOf("disabled") >= 0 ||
                this.fadeOutWave();
        };
        bindTriggerEvent() {
            this.platform.isBrowser &&
                this.ngZone.runOutsideAngular(() => {
                    (this.removeTriggerEvent(),
                        this.triggerElement &&
                            this.triggerElement.addEventListener(
                                "click",
                                this.clickHandler,
                                !0,
                            ));
                });
        }
        removeTriggerEvent() {
            this.triggerElement &&
                this.triggerElement.removeEventListener(
                    "click",
                    this.clickHandler,
                    !0,
                );
        }
        removeStyleAndExtraNode() {
            (this.styleForPseudo &&
                document.body.contains(this.styleForPseudo) &&
                (document.body.removeChild(this.styleForPseudo),
                (this.styleForPseudo = null)),
                this.insertExtraNode &&
                    this.triggerElement.contains(this.extraNode) &&
                    this.triggerElement.removeChild(this.extraNode));
        }
        destroy() {
            (this.removeTriggerEvent(), this.removeStyleAndExtraNode());
        }
        fadeOutWave() {
            let n = this.triggerElement,
                e = this.getWaveColor(n);
            (n.setAttribute(this.waveAttributeName, "true"),
                !(Date.now() < this.lastTime + this.waveTransitionDuration) &&
                    (this.isValidColor(e) &&
                        (this.styleForPseudo ||
                            ((this.styleForPseudo =
                                document.createElement("style")),
                            this.cspNonce &&
                                (this.styleForPseudo.nonce = this.cspNonce)),
                        (this.styleForPseudo.innerHTML = `
      [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {
        --antd-wave-shadow-color: ${e};
      }`),
                        document.body.appendChild(this.styleForPseudo)),
                    this.insertExtraNode &&
                        (this.extraNode ||
                            (this.extraNode = document.createElement("div")),
                        (this.extraNode.className = "ant-click-animating-node"),
                        n.appendChild(this.extraNode)),
                    (this.lastTime = Date.now()),
                    this.runTimeoutOutsideZone(() => {
                        (n.removeAttribute(this.waveAttributeName),
                            this.removeStyleAndExtraNode());
                    }, this.waveTransitionDuration)));
        }
        isValidColor(n) {
            return (
                !!n &&
                n !== "#ffffff" &&
                n !== "rgb(255, 255, 255)" &&
                this.isNotGrey(n) &&
                !/rgba\(\d*, \d*, \d*, 0\)/.test(n) &&
                n !== "transparent"
            );
        }
        isNotGrey(n) {
            let e = n.match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
            return e && e[1] && e[2] && e[3]
                ? !(e[1] === e[2] && e[2] === e[3])
                : !0;
        }
        getWaveColor(n) {
            let e = getComputedStyle(n);
            return (
                e.getPropertyValue("border-top-color") ||
                e.getPropertyValue("border-color") ||
                e.getPropertyValue("background-color")
            );
        }
        runTimeoutOutsideZone(n, e) {
            this.ngZone.runOutsideAngular(() => setTimeout(n, e));
        }
    },
    Ch = { disabled: !1 },
    O8 = new b("nz-wave-global-options");
function bh(t) {
    return $e([{ provide: O8, useValue: t }]);
}
var Ho = (() => {
        class t {
            nzWaveExtraNode = !1;
            waveRenderer;
            waveDisabled = !1;
            get disabled() {
                return this.waveDisabled;
            }
            get rendererRef() {
                return this.waveRenderer;
            }
            cspNonce = l(Kt, { optional: !0 });
            platform = l(ye);
            config = l(O8, { optional: !0 });
            animationType = l(gt, { optional: !0 });
            ngZone = l(q);
            elementRef = l(B);
            constructor() {
                this.waveDisabled = this.isConfigDisabled();
            }
            isConfigDisabled() {
                let e = !1;
                return (
                    this.config &&
                        typeof this.config.disabled == "boolean" &&
                        (e = this.config.disabled),
                    this.animationType === "NoopAnimations" && (e = !0),
                    e
                );
            }
            ngOnDestroy() {
                this.waveRenderer && this.waveRenderer.destroy();
            }
            ngOnInit() {
                this.renderWaveIfEnabled();
            }
            renderWaveIfEnabled() {
                !this.waveDisabled &&
                    this.elementRef.nativeElement &&
                    (this.waveRenderer = new a2(
                        this.elementRef.nativeElement,
                        this.ngZone,
                        this.nzWaveExtraNode,
                        this.platform,
                        this.cspNonce,
                    ));
            }
            disable() {
                ((this.waveDisabled = !0),
                    this.waveRenderer &&
                        (this.waveRenderer.removeTriggerEvent(),
                        this.waveRenderer.removeStyleAndExtraNode()));
            }
            enable() {
                ((this.waveDisabled = this.isConfigDisabled() || !1),
                    this.waveRenderer && this.waveRenderer.bindTriggerEvent());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "nz-wave", ""],
                    [
                        "button",
                        "nz-button",
                        "",
                        3,
                        "nzType",
                        "link",
                        3,
                        "nzType",
                        "text",
                    ],
                ],
                inputs: { nzWaveExtraNode: "nzWaveExtraNode" },
                exportAs: ["nzWave"],
            });
        }
        return t;
    })(),
    I8 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ providers: [bh(Ch)] });
        }
        return t;
    })();
var _h = ["nz-button", ""],
    wh = ["*"];
function Mh(t, n) {
    t & 1 && W(0, "nz-icon", 0);
}
var L8 = "button",
    Yi = (() => {
        var i;
        let t,
            n = [],
            e = [];
        return (
            (i = class {
                elementRef = l(B);
                cdr = l(ee);
                renderer = l(oe);
                directionality = l(he);
                destroyRef = l(K);
                _nzModuleName = L8;
                nzIconDirectiveElement;
                nzBlock = !1;
                nzGhost = !1;
                nzSearch = !1;
                nzLoading = !1;
                nzDanger = !1;
                disabled = !1;
                tabIndex = null;
                nzType = null;
                nzShape = null;
                nzSize = pe(this, n, "default");
                dir = (pe(this, e), "ltr");
                finalSize = nt(() =>
                    this.compactSize ? this.compactSize() : this.size(),
                );
                size = Ce(this.nzSize);
                compactSize = l(Li, { optional: !0 });
                loading$ = new Y();
                insertSpan(o, a) {
                    o.forEach((s) => {
                        if (s.nodeName === "#text") {
                            let c = a.createElement("span"),
                                d = a.parentNode(s);
                            (a.insertBefore(d, c, s), a.appendChild(c, s));
                        }
                    });
                }
                get iconOnly() {
                    let o = Array.from(
                            this.elementRef?.nativeElement?.childNodes || [],
                        ),
                        a = o.every((c) => c.nodeName !== "#text"),
                        s =
                            o.filter(
                                (c) =>
                                    !(
                                        c.nodeName === "#comment" ||
                                        c?.classList?.contains("anticon")
                                    ),
                            ).length == 0;
                    return !!this.nzIconDirectiveElement && s && a;
                }
                constructor() {
                    D1(L8, () => {
                        (this.size.set(this.nzSize), this.cdr.markForCheck());
                    });
                }
                ngOnInit() {
                    (this.size.set(this.nzSize),
                        this.directionality.change
                            ?.pipe(N(this.destroyRef))
                            .subscribe((o) => {
                                ((this.dir = o), this.cdr.detectChanges());
                            }),
                        (this.dir = this.directionality.value),
                        Bc(this.elementRef.nativeElement, "click", {
                            capture: !0,
                        })
                            .pipe(N(this.destroyRef))
                            .subscribe((o) => {
                                ((this.disabled && o.target?.tagName === "A") ||
                                    this.nzLoading) &&
                                    (o.preventDefault(),
                                    o.stopImmediatePropagation());
                            }));
                }
                ngOnChanges({ nzLoading: o, nzSize: a }) {
                    (o && this.loading$.next(this.nzLoading),
                        a && this.size.set(a.currentValue));
                }
                ngAfterViewInit() {
                    this.insertSpan(
                        this.elementRef.nativeElement.childNodes,
                        this.renderer,
                    );
                }
                ngAfterContentInit() {
                    this.loading$
                        .pipe(
                            vt(this.nzLoading),
                            J(() => !!this.nzIconDirectiveElement),
                            N(this.destroyRef),
                        )
                        .subscribe((o) => {
                            let a = this.nzIconDirectiveElement.nativeElement;
                            o
                                ? this.renderer.setStyle(a, "display", "none")
                                : this.renderer.removeStyle(a, "display");
                        });
                }
            }),
            (() => {
                let o =
                    typeof Symbol == "function" && Symbol.metadata
                        ? Object.create(null)
                        : void 0;
                ((t = [ct()]),
                    Qe(
                        null,
                        null,
                        t,
                        {
                            kind: "field",
                            name: "nzSize",
                            static: !1,
                            private: !1,
                            access: {
                                has: (a) => "nzSize" in a,
                                get: (a) => a.nzSize,
                                set: (a, s) => {
                                    a.nzSize = s;
                                },
                            },
                            metadata: o,
                        },
                        n,
                        e,
                    ),
                    o &&
                        Object.defineProperty(i, Symbol.metadata, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: o,
                        }));
            })(),
            ut(i, "\u0275fac", function (a) {
                return new (a || i)();
            }),
            ut(
                i,
                "\u0275cmp",
                R({
                    type: i,
                    selectors: [
                        ["button", "nz-button", ""],
                        ["a", "nz-button", ""],
                    ],
                    contentQueries: function (a, s, c) {
                        if ((a & 1 && et(c, Ct, 5, B), a & 2)) {
                            let d;
                            le((d = de())) &&
                                (s.nzIconDirectiveElement = d.first);
                        }
                    },
                    hostAttrs: [1, "ant-btn"],
                    hostVars: 34,
                    hostBindings: function (a, s) {
                        a & 2 &&
                            (Dt(
                                "tabindex",
                                s.disabled
                                    ? -1
                                    : s.tabIndex === null
                                      ? null
                                      : s.tabIndex,
                            )("disabled", s.disabled || null),
                            G("ant-btn-default", s.nzType === "default")(
                                "ant-btn-primary",
                                s.nzType === "primary",
                            )("ant-btn-dashed", s.nzType === "dashed")(
                                "ant-btn-link",
                                s.nzType === "link",
                            )("ant-btn-text", s.nzType === "text")(
                                "ant-btn-circle",
                                s.nzShape === "circle",
                            )("ant-btn-round", s.nzShape === "round")(
                                "ant-btn-lg",
                                s.finalSize() === "large",
                            )("ant-btn-sm", s.finalSize() === "small")(
                                "ant-btn-dangerous",
                                s.nzDanger,
                            )("ant-btn-loading", s.nzLoading)(
                                "ant-btn-background-ghost",
                                s.nzGhost,
                            )("ant-btn-block", s.nzBlock)(
                                "ant-input-search-button",
                                s.nzSearch,
                            )("ant-btn-rtl", s.dir === "rtl")(
                                "ant-btn-icon-only",
                                s.iconOnly,
                            ));
                    },
                    inputs: {
                        nzBlock: [2, "nzBlock", "nzBlock", _],
                        nzGhost: [2, "nzGhost", "nzGhost", _],
                        nzSearch: [2, "nzSearch", "nzSearch", _],
                        nzLoading: [2, "nzLoading", "nzLoading", _],
                        nzDanger: [2, "nzDanger", "nzDanger", _],
                        disabled: [2, "disabled", "disabled", _],
                        tabIndex: "tabIndex",
                        nzType: "nzType",
                        nzShape: "nzShape",
                        nzSize: "nzSize",
                    },
                    exportAs: ["nzButton"],
                    features: [
                        we([{ provide: x1, useValue: "btn" }]),
                        U1([Ni]),
                        I,
                    ],
                    attrs: _h,
                    ngContentSelectors: wh,
                    decls: 2,
                    vars: 1,
                    consts: [["nzType", "loading"]],
                    template: function (a, s) {
                        (a & 1 && (be(), E(0, Mh, 1, 0, "nz-icon", 0), _e(1)),
                            a & 2 && P(s.nzLoading ? 0 : -1));
                    },
                    dependencies: [Wt, Ct],
                    encapsulation: 2,
                    changeDetection: 0,
                }),
            ),
            i
        );
    })(),
    Oo = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ imports: [Yi, V8, I8] });
        }
        return t;
    })();
var Y8 = new Set(),
    Wn,
    Bi = (() => {
        class t {
            _platform = l(ye);
            _nonce = l(Kt, { optional: !0 });
            _matchMedia;
            constructor() {
                this._matchMedia =
                    this._platform.isBrowser && window.matchMedia
                        ? window.matchMedia.bind(window)
                        : Dh;
            }
            matchMedia(e) {
                return (
                    (this._platform.WEBKIT || this._platform.BLINK) &&
                        Sh(e, this._nonce),
                    this._matchMedia(e)
                );
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function Sh(t, n) {
    if (!Y8.has(t))
        try {
            (Wn ||
                ((Wn = document.createElement("style")),
                n && Wn.setAttribute("nonce", n),
                Wn.setAttribute("type", "text/css"),
                document.head.appendChild(Wn)),
                Wn.sheet &&
                    (Wn.sheet.insertRule(`@media ${t} {body{ }}`, 0),
                    Y8.add(t)));
        } catch (e) {
            console.error(e);
        }
}
function Dh(t) {
    return {
        matches: t === "all" || t === "",
        media: t,
        addListener: () => {},
        removeListener: () => {},
    };
}
var s2 = () => {},
    xh = (() => {
        class t {
            ngZone = l(q);
            destroyRef = l(K);
            resizeSource$ = new Y();
            listeners = 0;
            renderer = l(Me).createRenderer(null, null);
            disposeHandle = s2;
            handler = () => {
                this.ngZone.run(() => {
                    this.resizeSource$.next();
                });
            };
            constructor() {
                this.destroyRef.onDestroy(() => {
                    this.handler = s2;
                });
            }
            connect() {
                return (
                    this.registerListener(),
                    this.resizeSource$.pipe(
                        L1(16),
                        ft(() => this.unregisterListener()),
                    )
                );
            }
            disconnet() {
                this.unregisterListener();
            }
            registerListener() {
                (this.listeners === 0 &&
                    this.ngZone.runOutsideAngular(() => {
                        this.disposeHandle = this.renderer.listen(
                            "window",
                            "resize",
                            this.handler,
                        );
                    }),
                    (this.listeners += 1));
            }
            unregisterListener() {
                ((this.listeners -= 1),
                    this.listeners === 0 &&
                        (this.disposeHandle(), (this.disposeHandle = s2)));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var B8 = (function (t) {
        return (
            (t.xxl = "xxl"),
            (t.xl = "xl"),
            (t.lg = "lg"),
            (t.md = "md"),
            (t.sm = "sm"),
            (t.xs = "xs"),
            t
        );
    })(B8 || {}),
    ji = {
        xs: "(max-width: 575px)",
        sm: "(min-width: 576px)",
        md: "(min-width: 768px)",
        lg: "(min-width: 992px)",
        xl: "(min-width: 1200px)",
        xxl: "(min-width: 1600px)",
    };
var j8 = (() => {
    class t {
        resizeService = l(xh);
        mediaMatcher = l(Bi);
        constructor() {
            this.resizeService
                .connect()
                .pipe(N())
                .subscribe(() => {});
        }
        subscribe(e, i) {
            if (i) {
                let r = () => this.matchMedia(e, !0);
                return this.resizeService.connect().pipe(
                    L(r),
                    vt(r()),
                    wt((o, a) => o[0] === a[0]),
                    L((o) => o[1]),
                );
            } else {
                let r = () => this.matchMedia(e);
                return this.resizeService.connect().pipe(L(r), vt(r()), wt());
            }
        }
        matchMedia(e, i) {
            let r = B8.md,
                o = {};
            return (
                Object.keys(e).map((a) => {
                    let s = a,
                        c = this.mediaMatcher.matchMedia(ji[s]).matches;
                    ((o[a] = c), c && (r = s));
                }),
                i ? [r, o] : r
            );
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var Ui = (() => {
        class t {
            elementRef = l(B);
            renderer = l(oe);
            mediaMatcher = l(Bi);
            ngZone = l(q);
            platform = l(ye);
            breakpointService = l(j8);
            directionality = l(he);
            destroyRef = l(K);
            nzAlign = null;
            nzJustify = null;
            nzGutter = null;
            actualGutter$ = new F1(1);
            dir = "ltr";
            destroy$ = new Y();
            getGutter() {
                let e = [null, null],
                    i = this.nzGutter || 0;
                return (
                    (Array.isArray(i) ? i : [i, null]).forEach((o, a) => {
                        typeof o == "object" && o !== null
                            ? ((e[a] = null),
                              Object.keys(ji).map((s) => {
                                  let c = s;
                                  this.mediaMatcher.matchMedia(ji[c]).matches &&
                                      o[c] &&
                                      (e[a] = o[c]);
                              }))
                            : (e[a] = Number(o) || null);
                    }),
                    e
                );
            }
            setGutterStyle() {
                let [e, i] = this.getGutter();
                this.actualGutter$.next([e, i]);
                let r = (o, a) => {
                    let s = this.elementRef.nativeElement;
                    a !== null && this.renderer.setStyle(s, o, `-${a / 2}px`);
                };
                (r("margin-left", e),
                    r("margin-right", e),
                    r("margin-top", i),
                    r("margin-bottom", i));
            }
            ngOnInit() {
                ((this.dir = this.directionality.value),
                    this.directionality.change
                        ?.pipe(N(this.destroyRef))
                        .subscribe((e) => {
                            this.dir = e;
                        }),
                    this.setGutterStyle());
            }
            ngOnChanges(e) {
                e.nzGutter && this.setGutterStyle();
            }
            ngAfterViewInit() {
                this.platform.isBrowser &&
                    this.breakpointService
                        .subscribe(ji)
                        .pipe(N(this.destroyRef))
                        .subscribe(() => {
                            this.setGutterStyle();
                        });
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "nz-row", ""], ["nz-row"], ["nz-form-item"]],
                hostAttrs: [1, "ant-row"],
                hostVars: 20,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-row-top", r.nzAlign === "top")(
                            "ant-row-middle",
                            r.nzAlign === "middle",
                        )("ant-row-bottom", r.nzAlign === "bottom")(
                            "ant-row-start",
                            r.nzJustify === "start",
                        )("ant-row-end", r.nzJustify === "end")(
                            "ant-row-center",
                            r.nzJustify === "center",
                        )(
                            "ant-row-space-around",
                            r.nzJustify === "space-around",
                        )(
                            "ant-row-space-between",
                            r.nzJustify === "space-between",
                        )(
                            "ant-row-space-evenly",
                            r.nzJustify === "space-evenly",
                        )("ant-row-rtl", r.dir === "rtl");
                },
                inputs: {
                    nzAlign: "nzAlign",
                    nzJustify: "nzJustify",
                    nzGutter: "nzGutter",
                },
                exportAs: ["nzRow"],
                features: [I],
            });
        }
        return t;
    })(),
    Io = (() => {
        class t {
            elementRef = l(B);
            renderer = l(oe);
            directionality = l(he);
            destroyRef = l(K);
            classMap = {};
            hostFlexStyle = null;
            dir = "ltr";
            nzFlex = null;
            nzSpan = null;
            nzOrder = null;
            nzOffset = null;
            nzPush = null;
            nzPull = null;
            nzXs = null;
            nzSm = null;
            nzMd = null;
            nzLg = null;
            nzXl = null;
            nzXXl = null;
            setHostClassMap() {
                let e = m(
                    {
                        "ant-col": !0,
                        [`ant-col-${this.nzSpan}`]: Vt(this.nzSpan),
                        [`ant-col-order-${this.nzOrder}`]: Vt(this.nzOrder),
                        [`ant-col-offset-${this.nzOffset}`]: Vt(this.nzOffset),
                        [`ant-col-pull-${this.nzPull}`]: Vt(this.nzPull),
                        [`ant-col-push-${this.nzPush}`]: Vt(this.nzPush),
                        "ant-col-rtl": this.dir === "rtl",
                    },
                    this.generateClass(),
                );
                for (let i in this.classMap)
                    this.classMap.hasOwnProperty(i) &&
                        this.renderer.removeClass(
                            this.elementRef.nativeElement,
                            i,
                        );
                this.classMap = m({}, e);
                for (let i in this.classMap)
                    this.classMap.hasOwnProperty(i) &&
                        this.classMap[i] &&
                        this.renderer.addClass(
                            this.elementRef.nativeElement,
                            i,
                        );
            }
            setHostFlexStyle() {
                this.hostFlexStyle = this.parseFlex(this.nzFlex);
            }
            parseFlex(e) {
                return typeof e == "number"
                    ? `${e} ${e} auto`
                    : typeof e == "string" &&
                        /^\d+(\.\d+)?(px|em|rem|%)$/.test(e)
                      ? `0 0 ${e}`
                      : e;
            }
            generateClass() {
                let e = ["nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"],
                    i = {};
                return (
                    e.forEach((r) => {
                        let o = r.replace("nz", "").toLowerCase();
                        if (Vt(this[r]))
                            if (
                                typeof this[r] == "number" ||
                                typeof this[r] == "string"
                            )
                                i[`ant-col-${o}-${this[r]}`] = !0;
                            else {
                                let a = this[r];
                                [
                                    "span",
                                    "pull",
                                    "push",
                                    "offset",
                                    "order",
                                ].forEach((c) => {
                                    let d = c === "span" ? "-" : `-${c}-`;
                                    i[`ant-col-${o}${d}${a[c]}`] =
                                        a && Vt(a[c]);
                                });
                            }
                    }),
                    i
                );
            }
            nzRowDirective = l(Ui, { host: !0, optional: !0 });
            ngOnInit() {
                ((this.dir = this.directionality.value),
                    this.directionality.change
                        ?.pipe(N(this.destroyRef))
                        .subscribe((e) => {
                            ((this.dir = e), this.setHostClassMap());
                        }),
                    this.setHostClassMap(),
                    this.setHostFlexStyle());
            }
            ngOnChanges(e) {
                this.setHostClassMap();
                let { nzFlex: i } = e;
                i && this.setHostFlexStyle();
            }
            ngAfterViewInit() {
                this.nzRowDirective &&
                    this.nzRowDirective.actualGutter$
                        .pipe(N(this.destroyRef))
                        .subscribe(([e, i]) => {
                            let r = (o, a) => {
                                let s = this.elementRef.nativeElement;
                                a !== null &&
                                    this.renderer.setStyle(s, o, `${a / 2}px`);
                            };
                            (r("padding-left", e),
                                r("padding-right", e),
                                r("padding-top", i),
                                r("padding-bottom", i));
                        });
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "nz-col", ""],
                    ["nz-col"],
                    ["nz-form-control"],
                    ["nz-form-label"],
                ],
                hostVars: 2,
                hostBindings: function (i, r) {
                    i & 2 && Ge("flex", r.hostFlexStyle);
                },
                inputs: {
                    nzFlex: "nzFlex",
                    nzSpan: "nzSpan",
                    nzOrder: "nzOrder",
                    nzOffset: "nzOffset",
                    nzPush: "nzPush",
                    nzPull: "nzPull",
                    nzXs: "nzXs",
                    nzSm: "nzSm",
                    nzMd: "nzMd",
                    nzLg: "nzLg",
                    nzXl: "nzXl",
                    nzXXl: "nzXXl",
                },
                exportAs: ["nzCol"],
                features: [I],
            });
        }
        return t;
    })(),
    U8 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var Oe = (() => {
        class t {
            static SLOW = "0.3s";
            static BASE = "0.2s";
            static FAST = "0.1s";
        }
        return t;
    })(),
    Re = (() => {
        class t {
            static EASE_BASE_OUT = "cubic-bezier(0.7, 0.3, 0.1, 1)";
            static EASE_BASE_IN = "cubic-bezier(0.9, 0, 0.3, 0.7)";
            static EASE_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
            static EASE_IN = "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
            static EASE_IN_OUT = "cubic-bezier(0.645, 0.045, 0.355, 1)";
            static EASE_OUT_BACK = "cubic-bezier(0.12, 0.4, 0.29, 1.46)";
            static EASE_IN_BACK = "cubic-bezier(0.71, -0.46, 0.88, 0.6)";
            static EASE_IN_OUT_BACK = "cubic-bezier(0.71, -0.46, 0.29, 1.46)";
            static EASE_OUT_CIRC = "cubic-bezier(0.08, 0.82, 0.17, 1)";
            static EASE_IN_CIRC = "cubic-bezier(0.6, 0.04, 0.98, 0.34)";
            static EASE_IN_OUT_CIRC = "cubic-bezier(0.78, 0.14, 0.15, 0.86)";
            static EASE_OUT_QUINT = "cubic-bezier(0.23, 1, 0.32, 1)";
            static EASE_IN_QUINT = "cubic-bezier(0.755, 0.05, 0.855, 0.06)";
            static EASE_IN_OUT_QUINT = "cubic-bezier(0.86, 0, 0.07, 1)";
        }
        return t;
    })(),
    wb = Be("collapseMotion", [
        je("expanded", k({ height: "*" })),
        je("collapsed", k({ height: 0, overflow: "hidden" })),
        je("hidden", k({ height: 0, overflow: "hidden", borderTopWidth: "0" })),
        ae("expanded => collapsed", ne(`150ms ${Re.EASE_IN_OUT}`)),
        ae("expanded => hidden", ne(`150ms ${Re.EASE_IN_OUT}`)),
        ae("collapsed => expanded", ne(`150ms ${Re.EASE_IN_OUT}`)),
        ae("hidden => expanded", ne(`150ms ${Re.EASE_IN_OUT}`)),
    ]),
    Mb = Be("treeCollapseMotion", [
        ae("* => *", [
            vr(
                "nz-tree-node:leave,nz-tree-builtin-node:leave",
                [
                    k({ overflow: "hidden" }),
                    gr(0, [
                        ne(
                            `150ms ${Re.EASE_IN_OUT}`,
                            k({ height: 0, opacity: 0, "padding-bottom": 0 }),
                        ),
                    ]),
                ],
                { optional: !0 },
            ),
            vr(
                "nz-tree-node:enter,nz-tree-builtin-node:enter",
                [
                    k({
                        overflow: "hidden",
                        height: 0,
                        opacity: 0,
                        "padding-bottom": 0,
                    }),
                    gr(0, [
                        ne(
                            `150ms ${Re.EASE_IN_OUT}`,
                            k({
                                overflow: "hidden",
                                height: "*",
                                opacity: "*",
                                "padding-bottom": "*",
                            }),
                        ),
                    ]),
                ],
                { optional: !0 },
            ),
        ]),
    ]),
    Sb = Be("drawerMaskMotion", [
        ae(":enter", [k({ opacity: 0 }), ne(`${Oe.SLOW}`, k({ opacity: 1 }))]),
        ae(":leave", [k({ opacity: 1 }), ne(`${Oe.SLOW}`, k({ opacity: 0 }))]),
    ]),
    Db = Be("fadeMotion", [
        ae("* => enter", [
            k({ opacity: 0 }),
            ne(`${Oe.BASE}`, k({ opacity: 1 })),
        ]),
        ae("* => leave, :leave", [
            k({ opacity: 1 }),
            ne(`${Oe.BASE}`, k({ opacity: 0 })),
        ]),
    ]),
    W8 = Be("helpMotion", [
        ae(":enter", [
            k({ opacity: 0, transform: "translateY(-5px)" }),
            ne(
                `${Oe.SLOW} ${Re.EASE_IN_OUT}`,
                k({ opacity: 1, transform: "translateY(0)" }),
            ),
        ]),
        ae(":leave", [
            k({ opacity: 1, transform: "translateY(0)" }),
            ne(
                `${Oe.SLOW} ${Re.EASE_IN_OUT}`,
                k({ opacity: 0, transform: "translateY(-5px)" }),
            ),
        ]),
    ]),
    xb = Be("moveUpMotion", [
        ae("* => enter", [
            k({
                transformOrigin: "0 0",
                transform: "translateY(-100%)",
                opacity: 0,
            }),
            ne(
                `${Oe.BASE}`,
                k({
                    transformOrigin: "0 0",
                    transform: "translateY(0%)",
                    opacity: 1,
                }),
            ),
        ]),
        ae("* => leave", [
            k({
                transformOrigin: "0 0",
                transform: "translateY(0%)",
                opacity: 1,
            }),
            ne(
                `${Oe.BASE}`,
                k({
                    transformOrigin: "0 0",
                    transform: "translateY(-100%)",
                    opacity: 0,
                }),
            ),
        ]),
    ]),
    Tb = Be("notificationMotion", [
        je("enterRight", k({ opacity: 1, transform: "translateX(0)" })),
        ae("* => enterRight", [
            k({ opacity: 0, transform: "translateX(5%)" }),
            ne("100ms linear"),
        ]),
        je("enterLeft", k({ opacity: 1, transform: "translateX(0)" })),
        ae("* => enterLeft", [
            k({ opacity: 0, transform: "translateX(-5%)" }),
            ne("100ms linear"),
        ]),
        je("enterTop", k({ opacity: 1, transform: "translateY(0)" })),
        ae("* => enterTop", [
            k({ opacity: 0, transform: "translateY(-5%)" }),
            ne("100ms linear"),
        ]),
        je("enterBottom", k({ opacity: 1, transform: "translateY(0)" })),
        ae("* => enterBottom", [
            k({ opacity: 0, transform: "translateY(5%)" }),
            ne("100ms linear"),
        ]),
        je(
            "leave",
            k({
                opacity: 0,
                transform: "scaleY(0.8)",
                transformOrigin: "0% 0%",
            }),
        ),
        ae("* => leave", [
            k({ opacity: 1, transform: "scaleY(1)", transformOrigin: "0% 0%" }),
            ne("100ms linear"),
        ]),
    ]),
    Th = `${Oe.BASE} ${Re.EASE_OUT_QUINT}`,
    kh = `${Oe.BASE} ${Re.EASE_IN_QUINT}`,
    kb = Be("slideMotion", [
        je("void", k({ opacity: 0, transform: "scaleY(0.8)" })),
        je("enter", k({ opacity: 1, transform: "scaleY(1)" })),
        ae("void => *", [ne(Th)]),
        ae("* => void", [ne(kh)]),
    ]),
    Eb = Be("slideAlertMotion", [
        ae(":leave", [
            k({ opacity: 1, transform: "scaleY(1)", transformOrigin: "0% 0%" }),
            ne(
                `${Oe.SLOW} ${Re.EASE_IN_OUT_CIRC}`,
                k({
                    opacity: 0,
                    transform: "scaleY(0)",
                    transformOrigin: "0% 0%",
                }),
            ),
        ]),
    ]),
    Pb = Be("tabSwitchMotion", [
        je("leave", k({ display: "none" })),
        ae("* => enter", [k({ display: "block", opacity: 0 }), ne(Oe.SLOW)]),
        ae("* => leave, :leave", [
            k({ position: "absolute", top: 0, left: 0, width: "100%" }),
            ne(Oe.SLOW, k({ opacity: 0 })),
            k({ display: "none" }),
        ]),
    ]),
    Ab = Be("thumbMotion", [
        je(
            "from",
            k({
                transform: "translateX({{ transform }}px)",
                width: "{{ width }}px",
            }),
            { params: { transform: 0, width: 0 } },
        ),
        je(
            "to",
            k({
                transform: "translateX({{ transform }}px)",
                width: "{{ width }}px",
            }),
            { params: { transform: 100, width: 0 } },
        ),
        ae("from => to", ne(`300ms ${Re.EASE_IN_OUT}`)),
    ]),
    q8 = Be("zoomBigMotion", [
        ae("void => active", [
            k({ opacity: 0, transform: "scale(0.8)" }),
            ne(
                `${Oe.BASE} ${Re.EASE_OUT_CIRC}`,
                k({ opacity: 1, transform: "scale(1)" }),
            ),
        ]),
        ae("active => void", [
            k({ opacity: 1, transform: "scale(1)" }),
            ne(
                `${Oe.BASE} ${Re.EASE_IN_OUT_CIRC}`,
                k({ opacity: 0, transform: "scale(0.8)" }),
            ),
        ]),
    ]),
    Vb = Be("zoomBadgeMotion", [
        ae(":enter", [
            k({ opacity: 0, transform: "scale(0) translate(50%, -50%)" }),
            ne(
                `${Oe.SLOW} ${Re.EASE_OUT_BACK}`,
                k({ opacity: 1, transform: "scale(1) translate(50%, -50%)" }),
            ),
        ]),
        ae(":leave", [
            k({ opacity: 1, transform: "scale(1) translate(50%, -50%)" }),
            ne(
                `${Oe.SLOW} ${Re.EASE_IN_BACK}`,
                k({ opacity: 0, transform: "scale(0) translate(50%, -50%)" }),
            ),
        ]),
    ]);
function Eh(t, n) {
    if ((t & 1 && W(0, "nz-icon", 0), t & 2)) {
        let e = g();
        y("nzType", e.iconType);
    }
}
var T1 = (() => {
        class t {
            formStatusChanges = new F1(1);
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Ro = (() => {
        class t {
            noFormStatus = new Te(!1);
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Ph = {
        error: "close-circle-fill",
        validating: "loading",
        success: "check-circle-fill",
        warning: "exclamation-circle-fill",
    },
    c2 = (() => {
        class t {
            cdr = l(ee);
            status = "";
            iconType = null;
            ngOnChanges(e) {
                this.updateIcon();
            }
            updateIcon() {
                ((this.iconType = this.status ? Ph[this.status] : null),
                    this.cdr.markForCheck());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-form-item-feedback-icon"]],
                hostAttrs: [1, "ant-form-item-feedback-icon"],
                hostVars: 8,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G(
                            "ant-form-item-feedback-icon-error",
                            r.status === "error",
                        )(
                            "ant-form-item-feedback-icon-warning",
                            r.status === "warning",
                        )(
                            "ant-form-item-feedback-icon-success",
                            r.status === "success",
                        )(
                            "ant-form-item-feedback-icon-validating",
                            r.status === "validating",
                        );
                },
                inputs: { status: "status" },
                exportAs: ["nzFormFeedbackIcon"],
                features: [I],
                decls: 1,
                vars: 1,
                consts: [[3, "nzType"]],
                template: function (i, r) {
                    (i & 1 && E(0, Eh, 1, 1, "nz-icon", 0),
                        i & 2 && P(r.iconType ? 0 : -1));
                },
                dependencies: [Wt, Ct],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })();
var G8 = [
    ["Y", 1e3 * 60 * 60 * 24 * 365],
    ["M", 1e3 * 60 * 60 * 24 * 30],
    ["D", 1e3 * 60 * 60 * 24],
    ["H", 1e3 * 60 * 60],
    ["m", 1e3 * 60],
    ["s", 1e3],
    ["S", 1],
];
var Ah = {
        locale: "en",
        Pagination: {
            items_per_page: "/ page",
            jump_to: "Go to",
            jump_to_confirm: "confirm",
            page: "Page",
            prev_page: "Previous Page",
            next_page: "Next Page",
            prev_5: "Previous 5 Pages",
            next_5: "Next 5 Pages",
            prev_3: "Previous 3 Pages",
            next_3: "Next 3 Pages",
            page_size: "Page Size",
        },
        DatePicker: {
            lang: {
                placeholder: "Select date",
                yearPlaceholder: "Select year",
                quarterPlaceholder: "Select quarter",
                monthPlaceholder: "Select month",
                weekPlaceholder: "Select week",
                rangePlaceholder: ["Start date", "End date"],
                rangeYearPlaceholder: ["Start year", "End year"],
                rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
                rangeMonthPlaceholder: ["Start month", "End month"],
                rangeWeekPlaceholder: ["Start week", "End week"],
                locale: "en_US",
                today: "Today",
                now: "Now",
                backToToday: "Back to today",
                ok: "Ok",
                clear: "Clear",
                month: "Month",
                year: "Year",
                timeSelect: "select time",
                dateSelect: "select date",
                weekSelect: "Choose a week",
                monthSelect: "Choose a month",
                yearSelect: "Choose a year",
                decadeSelect: "Choose a decade",
                yearFormat: "YYYY",
                dateFormat: "M/D/YYYY",
                dayFormat: "D",
                dateTimeFormat: "M/D/YYYY HH:mm:ss",
                monthBeforeYear: !0,
                previousMonth: "Previous month (PageUp)",
                nextMonth: "Next month (PageDown)",
                previousYear: "Last year (Control + left)",
                nextYear: "Next year (Control + right)",
                previousDecade: "Last decade",
                nextDecade: "Next decade",
                previousCentury: "Last century",
                nextCentury: "Next century",
            },
            timePickerLocale: {
                placeholder: "Select time",
                rangePlaceholder: ["Start time", "End time"],
            },
        },
        TimePicker: {
            placeholder: "Select time",
            rangePlaceholder: ["Start time", "End time"],
        },
        Calendar: {
            lang: {
                placeholder: "Select date",
                yearPlaceholder: "Select year",
                quarterPlaceholder: "Select quarter",
                monthPlaceholder: "Select month",
                weekPlaceholder: "Select week",
                rangePlaceholder: ["Start date", "End date"],
                rangeYearPlaceholder: ["Start year", "End year"],
                rangeMonthPlaceholder: ["Start month", "End month"],
                rangeWeekPlaceholder: ["Start week", "End week"],
                locale: "en_US",
                today: "Today",
                now: "Now",
                backToToday: "Back to today",
                ok: "Ok",
                clear: "Clear",
                month: "Month",
                year: "Year",
                timeSelect: "select time",
                dateSelect: "select date",
                weekSelect: "Choose a week",
                monthSelect: "Choose a month",
                yearSelect: "Choose a year",
                decadeSelect: "Choose a decade",
                yearFormat: "YYYY",
                dateFormat: "M/D/YYYY",
                dayFormat: "D",
                dateTimeFormat: "M/D/YYYY HH:mm:ss",
                monthBeforeYear: !0,
                previousMonth: "Previous month (PageUp)",
                nextMonth: "Next month (PageDown)",
                previousYear: "Last year (Control + left)",
                nextYear: "Next year (Control + right)",
                previousDecade: "Last decade",
                nextDecade: "Next decade",
                previousCentury: "Last century",
                nextCentury: "Next century",
            },
            timePickerLocale: {
                placeholder: "Select time",
                rangePlaceholder: ["Start time", "End time"],
            },
        },
        global: { placeholder: "Please select" },
        Table: {
            filterTitle: "Filter menu",
            filterConfirm: "OK",
            filterReset: "Reset",
            filterEmptyText: "No filters",
            emptyText: "No data",
            selectAll: "Select current page",
            selectInvert: "Invert current page",
            selectionAll: "Select all data",
            sortTitle: "Sort",
            expand: "Expand row",
            collapse: "Collapse row",
            triggerDesc: "Click to sort descending",
            triggerAsc: "Click to sort ascending",
            cancelSort: "Click to cancel sorting",
            filterCheckall: "Select all items",
            filterSearchPlaceholder: "Search in filters",
            selectNone: "Clear all data",
        },
        Modal: { okText: "OK", cancelText: "Cancel", justOkText: "OK" },
        Popconfirm: { okText: "OK", cancelText: "Cancel" },
        Transfer: {
            titles: ["", ""],
            searchPlaceholder: "Search here",
            itemUnit: "item",
            itemsUnit: "items",
            remove: "Remove",
            selectCurrent: "Select current page",
            removeCurrent: "Remove current page",
            selectAll: "Select all data",
            removeAll: "Remove all data",
            selectInvert: "Invert current page",
        },
        Upload: {
            uploading: "Uploading...",
            removeFile: "Remove file",
            uploadError: "Upload error",
            previewFile: "Preview file",
            downloadFile: "Download file",
        },
        Empty: { description: "No Data" },
        Icon: { icon: "icon" },
        Text: {
            edit: "Edit",
            copy: "Copy",
            copied: "Copied",
            expand: "Expand",
        },
        PageHeader: { back: "Back" },
        Image: { preview: "Preview" },
        CronExpression: {
            cronError: "Invalid cron expression",
            second: "second",
            minute: "minute",
            hour: "hour",
            day: "day",
            month: "month",
            week: "week",
        },
        QRCode: {
            expired: "QR code expired",
            refresh: "Refresh",
            scanned: "Scanned",
        },
        CheckList: {
            checkList: "Check List",
            checkListFinish: "You have successfully completed the list!",
            checkListClose: "Close",
            checkListFooter: "Check list is no longer required",
            checkListCheck: "Do you want to close the list?",
            ok: "OK",
            cancel: "Cancel",
            checkListCheckOther: "No longer required to show",
        },
    },
    Vh = {
        locale: "zh-cn",
        Pagination: {
            items_per_page: "\u6761/\u9875",
            jump_to: "\u8DF3\u81F3",
            jump_to_confirm: "\u786E\u5B9A",
            page: "\u9875",
            prev_page: "\u4E0A\u4E00\u9875",
            next_page: "\u4E0B\u4E00\u9875",
            prev_5: "\u5411\u524D 5 \u9875",
            next_5: "\u5411\u540E 5 \u9875",
            prev_3: "\u5411\u524D 3 \u9875",
            next_3: "\u5411\u540E 3 \u9875",
            page_size: "\u9875\u7801",
        },
        DatePicker: {
            lang: {
                placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
                yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
                quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
                monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
                weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
                rangePlaceholder: [
                    "\u5F00\u59CB\u65E5\u671F",
                    "\u7ED3\u675F\u65E5\u671F",
                ],
                rangeYearPlaceholder: [
                    "\u5F00\u59CB\u5E74\u4EFD",
                    "\u7ED3\u675F\u5E74\u4EFD",
                ],
                rangeQuarterPlaceholder: [
                    "\u5F00\u59CB\u5B63\u5EA6",
                    "\u7ED3\u675F\u5B63\u5EA6",
                ],
                rangeMonthPlaceholder: [
                    "\u5F00\u59CB\u6708\u4EFD",
                    "\u7ED3\u675F\u6708\u4EFD",
                ],
                rangeWeekPlaceholder: [
                    "\u5F00\u59CB\u5468",
                    "\u7ED3\u675F\u5468",
                ],
                locale: "zh_CN",
                today: "\u4ECA\u5929",
                now: "\u6B64\u523B",
                backToToday: "\u8FD4\u56DE\u4ECA\u5929",
                ok: "\u786E\u5B9A",
                timeSelect: "\u9009\u62E9\u65F6\u95F4",
                dateSelect: "\u9009\u62E9\u65E5\u671F",
                weekSelect: "\u9009\u62E9\u5468",
                clear: "\u6E05\u9664",
                month: "\u6708",
                year: "\u5E74",
                previousMonth: "\u4E0A\u4E2A\u6708 (\u7FFB\u9875\u4E0A\u952E)",
                nextMonth: "\u4E0B\u4E2A\u6708 (\u7FFB\u9875\u4E0B\u952E)",
                monthSelect: "\u9009\u62E9\u6708\u4EFD",
                yearSelect: "\u9009\u62E9\u5E74\u4EFD",
                decadeSelect: "\u9009\u62E9\u5E74\u4EE3",
                yearFormat: "YYYY\u5E74",
                dayFormat: "D\u65E5",
                dateFormat: "YYYY\u5E74M\u6708D\u65E5",
                dateTimeFormat:
                    "YYYY\u5E74M\u6708D\u65E5 HH\u65F6mm\u5206ss\u79D2",
                previousYear:
                    "\u4E0A\u4E00\u5E74 (Control\u952E\u52A0\u5DE6\u65B9\u5411\u952E)",
                nextYear:
                    "\u4E0B\u4E00\u5E74 (Control\u952E\u52A0\u53F3\u65B9\u5411\u952E)",
                previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
                nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
                previousCentury: "\u4E0A\u4E00\u4E16\u7EAA",
                nextCentury: "\u4E0B\u4E00\u4E16\u7EAA",
            },
            timePickerLocale: {
                placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
                rangePlaceholder: [
                    "\u5F00\u59CB\u65F6\u95F4",
                    "\u7ED3\u675F\u65F6\u95F4",
                ],
            },
        },
        TimePicker: {
            placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
            rangePlaceholder: [
                "\u5F00\u59CB\u65F6\u95F4",
                "\u7ED3\u675F\u65F6\u95F4",
            ],
        },
        Calendar: {
            lang: {
                placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
                yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
                quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
                monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
                weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
                rangePlaceholder: [
                    "\u5F00\u59CB\u65E5\u671F",
                    "\u7ED3\u675F\u65E5\u671F",
                ],
                rangeYearPlaceholder: [
                    "\u5F00\u59CB\u5E74\u4EFD",
                    "\u7ED3\u675F\u5E74\u4EFD",
                ],
                rangeMonthPlaceholder: [
                    "\u5F00\u59CB\u6708\u4EFD",
                    "\u7ED3\u675F\u6708\u4EFD",
                ],
                rangeWeekPlaceholder: [
                    "\u5F00\u59CB\u5468",
                    "\u7ED3\u675F\u5468",
                ],
                locale: "zh_CN",
                today: "\u4ECA\u5929",
                now: "\u6B64\u523B",
                backToToday: "\u8FD4\u56DE\u4ECA\u5929",
                ok: "\u786E\u5B9A",
                timeSelect: "\u9009\u62E9\u65F6\u95F4",
                dateSelect: "\u9009\u62E9\u65E5\u671F",
                weekSelect: "\u9009\u62E9\u5468",
                clear: "\u6E05\u9664",
                month: "\u6708",
                year: "\u5E74",
                previousMonth: "\u4E0A\u4E2A\u6708 (\u7FFB\u9875\u4E0A\u952E)",
                nextMonth: "\u4E0B\u4E2A\u6708 (\u7FFB\u9875\u4E0B\u952E)",
                monthSelect: "\u9009\u62E9\u6708\u4EFD",
                yearSelect: "\u9009\u62E9\u5E74\u4EFD",
                decadeSelect: "\u9009\u62E9\u5E74\u4EE3",
                yearFormat: "YYYY\u5E74",
                dayFormat: "D\u65E5",
                dateFormat: "YYYY\u5E74M\u6708D\u65E5",
                dateTimeFormat:
                    "YYYY\u5E74M\u6708D\u65E5 HH\u65F6mm\u5206ss\u79D2",
                previousYear:
                    "\u4E0A\u4E00\u5E74 (Control\u952E\u52A0\u5DE6\u65B9\u5411\u952E)",
                nextYear:
                    "\u4E0B\u4E00\u5E74 (Control\u952E\u52A0\u53F3\u65B9\u5411\u952E)",
                previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
                nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
                previousCentury: "\u4E0A\u4E00\u4E16\u7EAA",
                nextCentury: "\u4E0B\u4E00\u4E16\u7EAA",
            },
            timePickerLocale: {
                placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
                rangePlaceholder: [
                    "\u5F00\u59CB\u65F6\u95F4",
                    "\u7ED3\u675F\u65F6\u95F4",
                ],
            },
        },
        global: { placeholder: "\u8BF7\u9009\u62E9" },
        Table: {
            filterTitle: "\u7B5B\u9009",
            filterConfirm: "\u786E\u5B9A",
            filterReset: "\u91CD\u7F6E",
            filterEmptyText: "\u65E0\u7B5B\u9009\u9879",
            selectAll: "\u5168\u9009\u5F53\u9875",
            selectInvert: "\u53CD\u9009\u5F53\u9875",
            selectionAll: "\u5168\u9009\u6240\u6709",
            sortTitle: "\u6392\u5E8F",
            expand: "\u5C55\u5F00\u884C",
            collapse: "\u5173\u95ED\u884C",
            triggerDesc: "\u70B9\u51FB\u964D\u5E8F",
            triggerAsc: "\u70B9\u51FB\u5347\u5E8F",
            cancelSort: "\u53D6\u6D88\u6392\u5E8F",
            filterCheckall: "\u5168\u9009",
            filterSearchPlaceholder:
                "\u5728\u7B5B\u9009\u9879\u4E2D\u641C\u7D22",
            selectNone: "\u6E05\u7A7A\u6240\u6709",
        },
        Modal: {
            okText: "\u786E\u5B9A",
            cancelText: "\u53D6\u6D88",
            justOkText: "\u77E5\u9053\u4E86",
        },
        Popconfirm: { cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A" },
        Transfer: {
            searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
            itemUnit: "\u9879",
            itemsUnit: "\u9879",
            remove: "\u5220\u9664",
            selectCurrent: "\u5168\u9009\u5F53\u9875",
            removeCurrent: "\u5220\u9664\u5F53\u9875",
            selectAll: "\u5168\u9009\u6240\u6709",
            removeAll: "\u5220\u9664\u5168\u90E8",
            selectInvert: "\u53CD\u9009\u5F53\u9875",
        },
        Upload: {
            uploading: "\u6587\u4EF6\u4E0A\u4F20\u4E2D",
            removeFile: "\u5220\u9664\u6587\u4EF6",
            uploadError: "\u4E0A\u4F20\u9519\u8BEF",
            previewFile: "\u9884\u89C8\u6587\u4EF6",
            downloadFile: "\u4E0B\u8F7D\u6587\u4EF6",
        },
        Empty: { description: "\u6682\u65E0\u6570\u636E" },
        Icon: { icon: "\u56FE\u6807" },
        Text: {
            edit: "\u7F16\u8F91",
            copy: "\u590D\u5236",
            copied: "\u590D\u5236\u6210\u529F",
            expand: "\u5C55\u5F00",
        },
        PageHeader: { back: "\u8FD4\u56DE" },
        Image: { preview: "\u9884\u89C8" },
        CronExpression: {
            cronError: "cron \u8868\u8FBE\u5F0F\u4E0D\u5408\u6CD5",
            second: "\u79D2",
            minute: "\u5206\u949F",
            hour: "\u5C0F\u65F6",
            day: "\u65E5",
            month: "\u6708",
            week: "\u5468",
        },
        QRCode: {
            expired: "\u4E8C\u7EF4\u7801\u8FC7\u671F",
            refresh: "\u70B9\u51FB\u5237\u65B0",
            scanned: "\u5DF2\u626B\u63CF",
        },
        CheckList: {
            checkList: "\u4EFB\u52A1\u6E05\u5355",
            checkListFinish:
                "\u4F60\u5DF2\u6210\u529F\u5B8C\u6210\u4EFB\u52A1\u6E05\u5355\uFF01",
            checkListClose: "\u5173\u95ED",
            checkListFooter: "\u4E0D\u9700\u8981\u64CD\u4F5C\u6307\u5F15",
            checkListCheck:
                "\u4F60\u8981\u5173\u95ED\u64CD\u4F5C\u6E05\u5355\u5417",
            ok: "\u786E\u5B9A",
            cancel: "\u53D6\u6D88",
            checkListCheckOther:
                "\u4EE5\u540E\u4E0D\u518D\u9700\u8981\u64CD\u4F5C\u6E05\u5355",
        },
    },
    Fh = new b("nz-i18n");
var Hh = new b("nz-date-locale"),
    K8 = (() => {
        class t {
            _locale;
            _change = new Te(this._locale);
            dateLocale;
            get localeChange() {
                return this._change.asObservable();
            }
            constructor() {
                (this.setLocale(l(Fh, { optional: !0 }) || Vh),
                    this.setDateLocale(l(Hh, { optional: !0 })));
            }
            translate(e, i) {
                let r = this._getObjectPath(this._locale, e);
                return typeof r == "string"
                    ? (i &&
                          Object.keys(i).forEach(
                              (o) =>
                                  (r = r.replace(
                                      new RegExp(`%${o}%`, "g"),
                                      i[o],
                                  )),
                          ),
                      r)
                    : e;
            }
            setLocale(e) {
                (this._locale && this._locale.locale === e.locale) ||
                    ((this._locale = e), this._change.next(e));
            }
            getLocale() {
                return this._locale;
            }
            getLocaleId() {
                return this._locale ? this._locale.locale : "";
            }
            setDateLocale(e) {
                this.dateLocale = e;
            }
            getDateLocale() {
                return this.dateLocale;
            }
            getLocaleData(e, i) {
                let r = e ? this._getObjectPath(this._locale, e) : this._locale;
                return (
                    !r &&
                        !i &&
                        Bn(`Missing translations for "${e}" in language "${this._locale.locale}".
You can use "NzI18nService.setLocale" as a temporary fix.
Welcome to submit a pull request to help us optimize the translations!
https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md`),
                    r || i || this._getObjectPath(Ah, e) || {}
                );
            }
            _getObjectPath(e, i) {
                let r = e,
                    o = i.split("."),
                    a = o.length,
                    s = 0;
                for (; r && s < a; ) r = r[o[s++]];
                return s === a ? r : null;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var Xb = new b("date-config");
var Lo = new WeakMap(),
    l2 = (() => {
        class t {
            _appRef;
            _injector = l(fe);
            _environmentInjector = l(Ne);
            load(e) {
                let i = (this._appRef = this._appRef || this._injector.get(an)),
                    r = Lo.get(i);
                (r ||
                    ((r = { loaders: new Set(), refs: [] }),
                    Lo.set(i, r),
                    i.onDestroy(() => {
                        (Lo.get(i)?.refs.forEach((o) => o.destroy()),
                            Lo.delete(i));
                    })),
                    r.loaders.has(e) ||
                        (r.loaders.add(e),
                        r.refs.push(
                            fr(e, {
                                environmentInjector: this._environmentInjector,
                            }),
                        )));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var Oh = 20,
    d2 = (() => {
        class t {
            _ngZone = l(q);
            _platform = l(ye);
            _renderer = l(Me).createRenderer(null, null);
            _cleanupGlobalListener;
            constructor() {}
            _scrolled = new Y();
            _scrolledCount = 0;
            scrollContainers = new Map();
            register(e) {
                this.scrollContainers.has(e) ||
                    this.scrollContainers.set(
                        e,
                        e
                            .elementScrolled()
                            .subscribe(() => this._scrolled.next(e)),
                    );
            }
            deregister(e) {
                let i = this.scrollContainers.get(e);
                i && (i.unsubscribe(), this.scrollContainers.delete(e));
            }
            scrolled(e = Oh) {
                return this._platform.isBrowser
                    ? new Xe((i) => {
                          this._cleanupGlobalListener ||
                              (this._cleanupGlobalListener =
                                  this._ngZone.runOutsideAngular(() =>
                                      this._renderer.listen(
                                          "document",
                                          "scroll",
                                          () => this._scrolled.next(),
                                      ),
                                  ));
                          let r =
                              e > 0
                                  ? this._scrolled.pipe(L1(e)).subscribe(i)
                                  : this._scrolled.subscribe(i);
                          return (
                              this._scrolledCount++,
                              () => {
                                  (r.unsubscribe(),
                                      this._scrolledCount--,
                                      this._scrolledCount ||
                                          (this._cleanupGlobalListener?.(),
                                          (this._cleanupGlobalListener =
                                              void 0)));
                              }
                          );
                      })
                    : S();
            }
            ngOnDestroy() {
                (this._cleanupGlobalListener?.(),
                    (this._cleanupGlobalListener = void 0),
                    this.scrollContainers.forEach((e, i) => this.deregister(i)),
                    this._scrolled.complete());
            }
            ancestorScrolled(e, i) {
                let r = this.getAncestorScrollContainers(e);
                return this.scrolled(i).pipe(J((o) => !o || r.indexOf(o) > -1));
            }
            getAncestorScrollContainers(e) {
                let i = [];
                return (
                    this.scrollContainers.forEach((r, o) => {
                        this._scrollableContainsElement(o, e) && i.push(o);
                    }),
                    i
                );
            }
            _scrollableContainsElement(e, i) {
                let r = S1(i),
                    o = e.getElementRef().nativeElement;
                do if (r == o) return !0;
                while ((r = r.parentElement));
                return !1;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var Ih = 20,
    $i = (() => {
        class t {
            _platform = l(ye);
            _listeners;
            _viewportSize;
            _change = new Y();
            _document = l(U);
            constructor() {
                let e = l(q),
                    i = l(Me).createRenderer(null, null);
                e.runOutsideAngular(() => {
                    if (this._platform.isBrowser) {
                        let r = (o) => this._change.next(o);
                        this._listeners = [
                            i.listen("window", "resize", r),
                            i.listen("window", "orientationchange", r),
                        ];
                    }
                    this.change().subscribe(() => (this._viewportSize = null));
                });
            }
            ngOnDestroy() {
                (this._listeners?.forEach((e) => e()), this._change.complete());
            }
            getViewportSize() {
                this._viewportSize || this._updateViewportSize();
                let e = {
                    width: this._viewportSize.width,
                    height: this._viewportSize.height,
                };
                return (
                    this._platform.isBrowser || (this._viewportSize = null),
                    e
                );
            }
            getViewportRect() {
                let e = this.getViewportScrollPosition(),
                    { width: i, height: r } = this.getViewportSize();
                return {
                    top: e.top,
                    left: e.left,
                    bottom: e.top + r,
                    right: e.left + i,
                    height: r,
                    width: i,
                };
            }
            getViewportScrollPosition() {
                if (!this._platform.isBrowser) return { top: 0, left: 0 };
                let e = this._document,
                    i = this._getWindow(),
                    r = e.documentElement,
                    o = r.getBoundingClientRect(),
                    a =
                        -o.top ||
                        e.body.scrollTop ||
                        i.scrollY ||
                        r.scrollTop ||
                        0,
                    s =
                        -o.left ||
                        e.body.scrollLeft ||
                        i.scrollX ||
                        r.scrollLeft ||
                        0;
                return { top: a, left: s };
            }
            change(e = Ih) {
                return e > 0 ? this._change.pipe(L1(e)) : this._change;
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _updateViewportSize() {
                let e = this._getWindow();
                this._viewportSize = this._platform.isBrowser
                    ? { width: e.innerWidth, height: e.innerHeight }
                    : { width: 0, height: 0 };
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var Z8 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })(),
    h2 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ imports: [Yn, Z8, Yn, Z8] });
        }
        return t;
    })();
var Wi = class {
        _attachedHost;
        attach(n) {
            return ((this._attachedHost = n), n.attach(this));
        }
        detach() {
            let n = this._attachedHost;
            n != null && ((this._attachedHost = null), n.detach());
        }
        get isAttached() {
            return this._attachedHost != null;
        }
        setAttachedHost(n) {
            this._attachedHost = n;
        }
    },
    u2 = class extends Wi {
        component;
        viewContainerRef;
        injector;
        projectableNodes;
        constructor(n, e, i, r) {
            (super(),
                (this.component = n),
                (this.viewContainerRef = e),
                (this.injector = i),
                (this.projectableNodes = r));
        }
    },
    qi = class extends Wi {
        templateRef;
        viewContainerRef;
        context;
        injector;
        constructor(n, e, i, r) {
            (super(),
                (this.templateRef = n),
                (this.viewContainerRef = e),
                (this.context = i),
                (this.injector = r));
        }
        get origin() {
            return this.templateRef.elementRef;
        }
        attach(n, e = this.context) {
            return ((this.context = e), super.attach(n));
        }
        detach() {
            return ((this.context = void 0), super.detach());
        }
    },
    m2 = class extends Wi {
        element;
        constructor(n) {
            (super(), (this.element = n instanceof B ? n.nativeElement : n));
        }
    },
    p2 = class {
        _attachedPortal;
        _disposeFn;
        _isDisposed = !1;
        hasAttached() {
            return !!this._attachedPortal;
        }
        attach(n) {
            if (n instanceof u2)
                return (
                    (this._attachedPortal = n),
                    this.attachComponentPortal(n)
                );
            if (n instanceof qi)
                return (
                    (this._attachedPortal = n),
                    this.attachTemplatePortal(n)
                );
            if (this.attachDomPortal && n instanceof m2)
                return ((this._attachedPortal = n), this.attachDomPortal(n));
        }
        attachDomPortal = null;
        detach() {
            (this._attachedPortal &&
                (this._attachedPortal.setAttachedHost(null),
                (this._attachedPortal = null)),
                this._invokeDisposeFn());
        }
        dispose() {
            (this.hasAttached() && this.detach(),
                this._invokeDisposeFn(),
                (this._isDisposed = !0));
        }
        setDisposeFn(n) {
            this._disposeFn = n;
        }
        _invokeDisposeFn() {
            this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
    },
    No = class extends p2 {
        outletElement;
        _appRef;
        _defaultInjector;
        constructor(n, e, i) {
            (super(),
                (this.outletElement = n),
                (this._appRef = e),
                (this._defaultInjector = i));
        }
        attachComponentPortal(n) {
            let e;
            if (n.viewContainerRef) {
                let i = n.injector || n.viewContainerRef.injector,
                    r = i.get(ya, null, { optional: !0 }) || void 0;
                ((e = n.viewContainerRef.createComponent(n.component, {
                    index: n.viewContainerRef.length,
                    injector: i,
                    ngModuleRef: r,
                    projectableNodes: n.projectableNodes || void 0,
                })),
                    this.setDisposeFn(() => e.destroy()));
            } else {
                let i = this._appRef,
                    r = n.injector || this._defaultInjector || fe.NULL,
                    o = r.get(Ne, i.injector);
                ((e = fr(n.component, {
                    elementInjector: r,
                    environmentInjector: o,
                    projectableNodes: n.projectableNodes || void 0,
                })),
                    i.attachView(e.hostView),
                    this.setDisposeFn(() => {
                        (i.viewCount > 0 && i.detachView(e.hostView),
                            e.destroy());
                    }));
            }
            return (
                this.outletElement.appendChild(this._getComponentRootNode(e)),
                (this._attachedPortal = n),
                e
            );
        }
        attachTemplatePortal(n) {
            let e = n.viewContainerRef,
                i = e.createEmbeddedView(n.templateRef, n.context, {
                    injector: n.injector,
                });
            return (
                i.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
                i.detectChanges(),
                this.setDisposeFn(() => {
                    let r = e.indexOf(i);
                    r !== -1 && e.remove(r);
                }),
                (this._attachedPortal = n),
                i
            );
        }
        attachDomPortal = (n) => {
            let e = n.element;
            e.parentNode;
            let i =
                this.outletElement.ownerDocument.createComment("dom-portal");
            (e.parentNode.insertBefore(i, e),
                this.outletElement.appendChild(e),
                (this._attachedPortal = n),
                super.setDisposeFn(() => {
                    i.parentNode && i.parentNode.replaceChild(e, i);
                }));
        };
        dispose() {
            (super.dispose(), this.outletElement.remove());
        }
        _getComponentRootNode(n) {
            return n.hostView.rootNodes[0];
        }
    };
var X8 = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({});
    }
    return t;
})();
var f2 = {},
    Q8 = (() => {
        class t {
            _appId = l(j1);
            getId(e) {
                return (
                    this._appId !== "ng" && (e += this._appId),
                    f2.hasOwnProperty(e) || (f2[e] = 0),
                    `${e}${f2[e]++}`
                );
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function J8(t, ...n) {
    return n.length
        ? n.some((e) => t[e])
        : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
}
var e0 = V6();
function s0(t) {
    return new Yo(t.get($i), t.get(U));
}
var Yo = class {
    _viewportRuler;
    _previousHTMLStyles = { top: "", left: "" };
    _previousScrollPosition;
    _isEnabled = !1;
    _document;
    constructor(n, e) {
        ((this._viewportRuler = n), (this._document = e));
    }
    attach() {}
    enable() {
        if (this._canBeEnabled()) {
            let n = this._document.documentElement;
            ((this._previousScrollPosition =
                this._viewportRuler.getViewportScrollPosition()),
                (this._previousHTMLStyles.left = n.style.left || ""),
                (this._previousHTMLStyles.top = n.style.top || ""),
                (n.style.left = ue(-this._previousScrollPosition.left)),
                (n.style.top = ue(-this._previousScrollPosition.top)),
                n.classList.add("cdk-global-scrollblock"),
                (this._isEnabled = !0));
        }
    }
    disable() {
        if (this._isEnabled) {
            let n = this._document.documentElement,
                e = this._document.body,
                i = n.style,
                r = e.style,
                o = i.scrollBehavior || "",
                a = r.scrollBehavior || "";
            ((this._isEnabled = !1),
                (i.left = this._previousHTMLStyles.left),
                (i.top = this._previousHTMLStyles.top),
                n.classList.remove("cdk-global-scrollblock"),
                e0 && (i.scrollBehavior = r.scrollBehavior = "auto"),
                window.scroll(
                    this._previousScrollPosition.left,
                    this._previousScrollPosition.top,
                ),
                e0 && ((i.scrollBehavior = o), (r.scrollBehavior = a)));
        }
    }
    _canBeEnabled() {
        if (
            this._document.documentElement.classList.contains(
                "cdk-global-scrollblock",
            ) ||
            this._isEnabled
        )
            return !1;
        let e = this._document.documentElement,
            i = this._viewportRuler.getViewportSize();
        return e.scrollHeight > i.height || e.scrollWidth > i.width;
    }
};
function c0(t, n) {
    return new Bo(t.get(d2), t.get(q), t.get($i), n);
}
var Bo = class {
    _scrollDispatcher;
    _ngZone;
    _viewportRuler;
    _config;
    _scrollSubscription = null;
    _overlayRef;
    _initialScrollPosition;
    constructor(n, e, i, r) {
        ((this._scrollDispatcher = n),
            (this._ngZone = e),
            (this._viewportRuler = i),
            (this._config = r));
    }
    attach(n) {
        (this._overlayRef, (this._overlayRef = n));
    }
    enable() {
        if (this._scrollSubscription) return;
        let n = this._scrollDispatcher
            .scrolled(0)
            .pipe(
                J(
                    (e) =>
                        !e ||
                        !this._overlayRef.overlayElement.contains(
                            e.getElementRef().nativeElement,
                        ),
                ),
            );
        this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition =
                  this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = n.subscribe(() => {
                  let e = this._viewportRuler.getViewportScrollPosition().top;
                  Math.abs(e - this._initialScrollPosition) >
                  this._config.threshold
                      ? this._detach()
                      : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = n.subscribe(this._detach));
    }
    disable() {
        this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
    }
    detach() {
        (this.disable(), (this._overlayRef = null));
    }
    _detach = () => {
        (this.disable(),
            this._overlayRef.hasAttached() &&
                this._ngZone.run(() => this._overlayRef.detach()));
    };
};
var Gi = class {
    enable() {}
    disable() {}
    attach() {}
};
function v2(t, n) {
    return n.some((e) => {
        let i = t.bottom < e.top,
            r = t.top > e.bottom,
            o = t.right < e.left,
            a = t.left > e.right;
        return i || r || o || a;
    });
}
function t0(t, n) {
    return n.some((e) => {
        let i = t.top < e.top,
            r = t.bottom > e.bottom,
            o = t.left < e.left,
            a = t.right > e.right;
        return i || r || o || a;
    });
}
function Go(t, n) {
    return new jo(t.get(d2), t.get($i), t.get(q), n);
}
var jo = class {
        _scrollDispatcher;
        _viewportRuler;
        _ngZone;
        _config;
        _scrollSubscription = null;
        _overlayRef;
        constructor(n, e, i, r) {
            ((this._scrollDispatcher = n),
                (this._viewportRuler = e),
                (this._ngZone = i),
                (this._config = r));
        }
        attach(n) {
            (this._overlayRef, (this._overlayRef = n));
        }
        enable() {
            if (!this._scrollSubscription) {
                let n = this._config ? this._config.scrollThrottle : 0;
                this._scrollSubscription = this._scrollDispatcher
                    .scrolled(n)
                    .subscribe(() => {
                        if (
                            (this._overlayRef.updatePosition(),
                            this._config && this._config.autoClose)
                        ) {
                            let e =
                                    this._overlayRef.overlayElement.getBoundingClientRect(),
                                { width: i, height: r } =
                                    this._viewportRuler.getViewportSize();
                            v2(e, [
                                {
                                    width: i,
                                    height: r,
                                    bottom: r,
                                    right: i,
                                    top: 0,
                                    left: 0,
                                },
                            ]) &&
                                (this.disable(),
                                this._ngZone.run(() =>
                                    this._overlayRef.detach(),
                                ));
                        }
                    });
            }
        }
        disable() {
            this._scrollSubscription &&
                (this._scrollSubscription.unsubscribe(),
                (this._scrollSubscription = null));
        }
        detach() {
            (this.disable(), (this._overlayRef = null));
        }
    },
    l0 = (() => {
        class t {
            _injector = l(fe);
            constructor() {}
            noop = () => new Gi();
            close = (e) => c0(this._injector, e);
            block = () => s0(this._injector);
            reposition = (e) => Go(this._injector, e);
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Ki = class {
        positionStrategy;
        scrollStrategy = new Gi();
        panelClass = "";
        hasBackdrop = !1;
        backdropClass = "cdk-overlay-dark-backdrop";
        disableAnimations;
        width;
        height;
        minWidth;
        minHeight;
        maxWidth;
        maxHeight;
        direction;
        disposeOnNavigation = !1;
        constructor(n) {
            if (n) {
                let e = Object.keys(n);
                for (let i of e) n[i] !== void 0 && (this[i] = n[i]);
            }
        }
    },
    ce = class {
        offsetX;
        offsetY;
        panelClass;
        originX;
        originY;
        overlayX;
        overlayY;
        constructor(n, e, i, r, o) {
            ((this.offsetX = i),
                (this.offsetY = r),
                (this.panelClass = o),
                (this.originX = n.originX),
                (this.originY = n.originY),
                (this.overlayX = e.overlayX),
                (this.overlayY = e.overlayY));
        }
    };
var Uo = class {
    connectionPair;
    scrollableViewProperties;
    constructor(n, e) {
        ((this.connectionPair = n), (this.scrollableViewProperties = e));
    }
};
var d0 = (() => {
        class t {
            _attachedOverlays = [];
            _document = l(U);
            _isAttached;
            constructor() {}
            ngOnDestroy() {
                this.detach();
            }
            add(e) {
                (this.remove(e), this._attachedOverlays.push(e));
            }
            remove(e) {
                let i = this._attachedOverlays.indexOf(e);
                (i > -1 && this._attachedOverlays.splice(i, 1),
                    this._attachedOverlays.length === 0 && this.detach());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    h0 = (() => {
        class t extends d0 {
            _ngZone = l(q);
            _renderer = l(Me).createRenderer(null, null);
            _cleanupKeydown;
            add(e) {
                (super.add(e),
                    this._isAttached ||
                        (this._ngZone.runOutsideAngular(() => {
                            this._cleanupKeydown = this._renderer.listen(
                                "body",
                                "keydown",
                                this._keydownListener,
                            );
                        }),
                        (this._isAttached = !0)));
            }
            detach() {
                this._isAttached &&
                    (this._cleanupKeydown?.(), (this._isAttached = !1));
            }
            _keydownListener = (e) => {
                let i = this._attachedOverlays;
                for (let r = i.length - 1; r > -1; r--)
                    if (i[r]._keydownEvents.observers.length > 0) {
                        this._ngZone.run(() => i[r]._keydownEvents.next(e));
                        break;
                    }
            };
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    u0 = (() => {
        class t extends d0 {
            _platform = l(ye);
            _ngZone = l(q);
            _renderer = l(Me).createRenderer(null, null);
            _cursorOriginalValue;
            _cursorStyleIsSet = !1;
            _pointerDownEventTarget;
            _cleanups;
            add(e) {
                if ((super.add(e), !this._isAttached)) {
                    let i = this._document.body,
                        r = { capture: !0 },
                        o = this._renderer;
                    ((this._cleanups = this._ngZone.runOutsideAngular(() => [
                        o.listen(
                            i,
                            "pointerdown",
                            this._pointerDownListener,
                            r,
                        ),
                        o.listen(i, "click", this._clickListener, r),
                        o.listen(i, "auxclick", this._clickListener, r),
                        o.listen(i, "contextmenu", this._clickListener, r),
                    ])),
                        this._platform.IOS &&
                            !this._cursorStyleIsSet &&
                            ((this._cursorOriginalValue = i.style.cursor),
                            (i.style.cursor = "pointer"),
                            (this._cursorStyleIsSet = !0)),
                        (this._isAttached = !0));
                }
            }
            detach() {
                this._isAttached &&
                    (this._cleanups?.forEach((e) => e()),
                    (this._cleanups = void 0),
                    this._platform.IOS &&
                        this._cursorStyleIsSet &&
                        ((this._document.body.style.cursor =
                            this._cursorOriginalValue),
                        (this._cursorStyleIsSet = !1)),
                    (this._isAttached = !1));
            }
            _pointerDownListener = (e) => {
                this._pointerDownEventTarget = dt(e);
            };
            _clickListener = (e) => {
                let i = dt(e),
                    r =
                        e.type === "click" && this._pointerDownEventTarget
                            ? this._pointerDownEventTarget
                            : i;
                this._pointerDownEventTarget = null;
                let o = this._attachedOverlays.slice();
                for (let a = o.length - 1; a > -1; a--) {
                    let s = o[a];
                    if (
                        s._outsidePointerEvents.observers.length < 1 ||
                        !s.hasAttached()
                    )
                        continue;
                    if (n0(s.overlayElement, i) || n0(s.overlayElement, r))
                        break;
                    let c = s._outsidePointerEvents;
                    this._ngZone
                        ? this._ngZone.run(() => c.next(e))
                        : c.next(e);
                }
            };
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function n0(t, n) {
    let e = typeof ShadowRoot < "u" && ShadowRoot,
        i = n;
    for (; i; ) {
        if (i === t) return !0;
        i = e && i instanceof ShadowRoot ? i.host : i.parentNode;
    }
    return !1;
}
var m0 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["ng-component"]],
                hostAttrs: ["cdk-overlay-style-loader", ""],
                decls: 0,
                vars: 0,
                template: function (i, r) {},
                styles: [
                    `.cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed}@layer cdk-overlay{.cdk-overlay-container{z-index:1000}}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute}@layer cdk-overlay{.cdk-global-overlay-wrapper{z-index:1000}}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%}@layer cdk-overlay{.cdk-overlay-pane{z-index:1000}}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);opacity:0;touch-action:manipulation}@layer cdk-overlay{.cdk-overlay-backdrop{z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}}@media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}.cdk-overlay-backdrop-showing{opacity:1}@media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}@layer cdk-overlay{.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}}.cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}.cdk-overlay-backdrop-noop-animation{transition:none}.cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px}@layer cdk-overlay{.cdk-overlay-connected-position-bounding-box{z-index:1000}}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}
`,
                ],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    p0 = (() => {
        class t {
            _platform = l(ye);
            _containerElement;
            _document = l(U);
            _styleLoader = l(l2);
            constructor() {}
            ngOnDestroy() {
                this._containerElement?.remove();
            }
            getContainerElement() {
                return (
                    this._loadStyles(),
                    this._containerElement || this._createContainer(),
                    this._containerElement
                );
            }
            _createContainer() {
                let e = "cdk-overlay-container";
                if (this._platform.isBrowser || n2()) {
                    let r = this._document.querySelectorAll(
                        `.${e}[platform="server"], .${e}[platform="test"]`,
                    );
                    for (let o = 0; o < r.length; o++) r[o].remove();
                }
                let i = this._document.createElement("div");
                (i.classList.add(e),
                    n2()
                        ? i.setAttribute("platform", "test")
                        : this._platform.isBrowser ||
                          i.setAttribute("platform", "server"),
                    this._document.body.appendChild(i),
                    (this._containerElement = i));
            }
            _loadStyles() {
                this._styleLoader.load(m0);
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    g2 = class {
        _renderer;
        _ngZone;
        element;
        _cleanupClick;
        _cleanupTransitionEnd;
        _fallbackTimeout;
        constructor(n, e, i, r) {
            ((this._renderer = e),
                (this._ngZone = i),
                (this.element = n.createElement("div")),
                this.element.classList.add("cdk-overlay-backdrop"),
                (this._cleanupClick = e.listen(this.element, "click", r)));
        }
        detach() {
            this._ngZone.runOutsideAngular(() => {
                let n = this.element;
                (clearTimeout(this._fallbackTimeout),
                    this._cleanupTransitionEnd?.(),
                    (this._cleanupTransitionEnd = this._renderer.listen(
                        n,
                        "transitionend",
                        this.dispose,
                    )),
                    (this._fallbackTimeout = setTimeout(this.dispose, 500)),
                    (n.style.pointerEvents = "none"),
                    n.classList.remove("cdk-overlay-backdrop-showing"));
            });
        }
        dispose = () => {
            (clearTimeout(this._fallbackTimeout),
                this._cleanupClick?.(),
                this._cleanupTransitionEnd?.(),
                (this._cleanupClick =
                    this._cleanupTransitionEnd =
                    this._fallbackTimeout =
                        void 0),
                this.element.remove());
        };
    },
    $o = class {
        _portalOutlet;
        _host;
        _pane;
        _config;
        _ngZone;
        _keyboardDispatcher;
        _document;
        _location;
        _outsideClickDispatcher;
        _animationsDisabled;
        _injector;
        _renderer;
        _backdropClick = new Y();
        _attachments = new Y();
        _detachments = new Y();
        _positionStrategy;
        _scrollStrategy;
        _locationChanges = mt.EMPTY;
        _backdropRef = null;
        _detachContentMutationObserver;
        _detachContentAfterRenderRef;
        _previousHostParent;
        _keydownEvents = new Y();
        _outsidePointerEvents = new Y();
        _afterNextRenderRef;
        constructor(n, e, i, r, o, a, s, c, d, h = !1, f, v) {
            ((this._portalOutlet = n),
                (this._host = e),
                (this._pane = i),
                (this._config = r),
                (this._ngZone = o),
                (this._keyboardDispatcher = a),
                (this._document = s),
                (this._location = c),
                (this._outsideClickDispatcher = d),
                (this._animationsDisabled = h),
                (this._injector = f),
                (this._renderer = v),
                r.scrollStrategy &&
                    ((this._scrollStrategy = r.scrollStrategy),
                    this._scrollStrategy.attach(this)),
                (this._positionStrategy = r.positionStrategy));
        }
        get overlayElement() {
            return this._pane;
        }
        get backdropElement() {
            return this._backdropRef?.element || null;
        }
        get hostElement() {
            return this._host;
        }
        attach(n) {
            !this._host.parentElement &&
                this._previousHostParent &&
                this._previousHostParent.appendChild(this._host);
            let e = this._portalOutlet.attach(n);
            return (
                this._positionStrategy && this._positionStrategy.attach(this),
                this._updateStackingOrder(),
                this._updateElementSize(),
                this._updateElementDirection(),
                this._scrollStrategy && this._scrollStrategy.enable(),
                this._afterNextRenderRef?.destroy(),
                (this._afterNextRenderRef = St(
                    () => {
                        this.hasAttached() && this.updatePosition();
                    },
                    { injector: this._injector },
                )),
                this._togglePointerEvents(!0),
                this._config.hasBackdrop && this._attachBackdrop(),
                this._config.panelClass &&
                    this._toggleClasses(
                        this._pane,
                        this._config.panelClass,
                        !0,
                    ),
                this._attachments.next(),
                this._completeDetachContent(),
                this._keyboardDispatcher.add(this),
                this._config.disposeOnNavigation &&
                    (this._locationChanges = this._location.subscribe(() =>
                        this.dispose(),
                    )),
                this._outsideClickDispatcher.add(this),
                typeof e?.onDestroy == "function" &&
                    e.onDestroy(() => {
                        this.hasAttached() &&
                            this._ngZone.runOutsideAngular(() =>
                                Promise.resolve().then(() => this.detach()),
                            );
                    }),
                e
            );
        }
        detach() {
            if (!this.hasAttached()) return;
            (this.detachBackdrop(),
                this._togglePointerEvents(!1),
                this._positionStrategy &&
                    this._positionStrategy.detach &&
                    this._positionStrategy.detach(),
                this._scrollStrategy && this._scrollStrategy.disable());
            let n = this._portalOutlet.detach();
            return (
                this._detachments.next(),
                this._completeDetachContent(),
                this._keyboardDispatcher.remove(this),
                this._detachContentWhenEmpty(),
                this._locationChanges.unsubscribe(),
                this._outsideClickDispatcher.remove(this),
                n
            );
        }
        dispose() {
            let n = this.hasAttached();
            (this._positionStrategy && this._positionStrategy.dispose(),
                this._disposeScrollStrategy(),
                this._backdropRef?.dispose(),
                this._locationChanges.unsubscribe(),
                this._keyboardDispatcher.remove(this),
                this._portalOutlet.dispose(),
                this._attachments.complete(),
                this._backdropClick.complete(),
                this._keydownEvents.complete(),
                this._outsidePointerEvents.complete(),
                this._outsideClickDispatcher.remove(this),
                this._host?.remove(),
                this._afterNextRenderRef?.destroy(),
                (this._previousHostParent =
                    this._pane =
                    this._host =
                    this._backdropRef =
                        null),
                n && this._detachments.next(),
                this._detachments.complete(),
                this._completeDetachContent());
        }
        hasAttached() {
            return this._portalOutlet.hasAttached();
        }
        backdropClick() {
            return this._backdropClick;
        }
        attachments() {
            return this._attachments;
        }
        detachments() {
            return this._detachments;
        }
        keydownEvents() {
            return this._keydownEvents;
        }
        outsidePointerEvents() {
            return this._outsidePointerEvents;
        }
        getConfig() {
            return this._config;
        }
        updatePosition() {
            this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(n) {
            n !== this._positionStrategy &&
                (this._positionStrategy && this._positionStrategy.dispose(),
                (this._positionStrategy = n),
                this.hasAttached() && (n.attach(this), this.updatePosition()));
        }
        updateSize(n) {
            ((this._config = m(m({}, this._config), n)),
                this._updateElementSize());
        }
        setDirection(n) {
            ((this._config = Z(m({}, this._config), { direction: n })),
                this._updateElementDirection());
        }
        addPanelClass(n) {
            this._pane && this._toggleClasses(this._pane, n, !0);
        }
        removePanelClass(n) {
            this._pane && this._toggleClasses(this._pane, n, !1);
        }
        getDirection() {
            let n = this._config.direction;
            return n ? (typeof n == "string" ? n : n.value) : "ltr";
        }
        updateScrollStrategy(n) {
            n !== this._scrollStrategy &&
                (this._disposeScrollStrategy(),
                (this._scrollStrategy = n),
                this.hasAttached() && (n.attach(this), n.enable()));
        }
        _updateElementDirection() {
            this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
            if (!this._pane) return;
            let n = this._pane.style;
            ((n.width = ue(this._config.width)),
                (n.height = ue(this._config.height)),
                (n.minWidth = ue(this._config.minWidth)),
                (n.minHeight = ue(this._config.minHeight)),
                (n.maxWidth = ue(this._config.maxWidth)),
                (n.maxHeight = ue(this._config.maxHeight)));
        }
        _togglePointerEvents(n) {
            this._pane.style.pointerEvents = n ? "" : "none";
        }
        _attachBackdrop() {
            let n = "cdk-overlay-backdrop-showing";
            (this._backdropRef?.dispose(),
                (this._backdropRef = new g2(
                    this._document,
                    this._renderer,
                    this._ngZone,
                    (e) => {
                        this._backdropClick.next(e);
                    },
                )),
                this._animationsDisabled &&
                    this._backdropRef.element.classList.add(
                        "cdk-overlay-backdrop-noop-animation",
                    ),
                this._config.backdropClass &&
                    this._toggleClasses(
                        this._backdropRef.element,
                        this._config.backdropClass,
                        !0,
                    ),
                this._host.parentElement.insertBefore(
                    this._backdropRef.element,
                    this._host,
                ),
                !this._animationsDisabled && typeof requestAnimationFrame < "u"
                    ? this._ngZone.runOutsideAngular(() => {
                          requestAnimationFrame(() =>
                              this._backdropRef?.element.classList.add(n),
                          );
                      })
                    : this._backdropRef.element.classList.add(n));
        }
        _updateStackingOrder() {
            this._host.nextSibling &&
                this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
            this._animationsDisabled
                ? (this._backdropRef?.dispose(), (this._backdropRef = null))
                : this._backdropRef?.detach();
        }
        _toggleClasses(n, e, i) {
            let r = q4(e || []).filter((o) => !!o);
            r.length && (i ? n.classList.add(...r) : n.classList.remove(...r));
        }
        _detachContentWhenEmpty() {
            let n = !1;
            try {
                this._detachContentAfterRenderRef = St(
                    () => {
                        ((n = !0), this._detachContent());
                    },
                    { injector: this._injector },
                );
            } catch (e) {
                if (n) throw e;
                this._detachContent();
            }
            globalThis.MutationObserver &&
                this._pane &&
                ((this._detachContentMutationObserver ||=
                    new globalThis.MutationObserver(() => {
                        this._detachContent();
                    })),
                this._detachContentMutationObserver.observe(this._pane, {
                    childList: !0,
                }));
        }
        _detachContent() {
            (!this._pane || !this._host || this._pane.children.length === 0) &&
                (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                        this._pane,
                        this._config.panelClass,
                        !1,
                    ),
                this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._host.remove()),
                this._completeDetachContent());
        }
        _completeDetachContent() {
            (this._detachContentAfterRenderRef?.destroy(),
                (this._detachContentAfterRenderRef = void 0),
                this._detachContentMutationObserver?.disconnect());
        }
        _disposeScrollStrategy() {
            let n = this._scrollStrategy;
            (n?.disable(), n?.detach?.());
        }
    },
    i0 = "cdk-overlay-connected-position-bounding-box",
    Rh = /([A-Za-z%]+)$/;
function y2(t, n) {
    return new Wo(n, t.get($i), t.get(U), t.get(ye), t.get(p0));
}
var Wo = class {
    _viewportRuler;
    _document;
    _platform;
    _overlayContainer;
    _overlayRef;
    _isInitialRender;
    _lastBoundingBoxSize = { width: 0, height: 0 };
    _isPushed = !1;
    _canPush = !0;
    _growAfterOpen = !1;
    _hasFlexibleDimensions = !0;
    _positionLocked = !1;
    _originRect;
    _overlayRect;
    _viewportRect;
    _containerRect;
    _viewportMargin = 0;
    _scrollables = [];
    _preferredPositions = [];
    _origin;
    _pane;
    _isDisposed;
    _boundingBox;
    _lastPosition;
    _lastScrollVisibility;
    _positionChanges = new Y();
    _resizeSubscription = mt.EMPTY;
    _offsetX = 0;
    _offsetY = 0;
    _transformOriginSelector;
    _appliedPanelClasses = [];
    _previousPushAmount;
    positionChanges = this._positionChanges;
    get positions() {
        return this._preferredPositions;
    }
    constructor(n, e, i, r, o) {
        ((this._viewportRuler = e),
            (this._document = i),
            (this._platform = r),
            (this._overlayContainer = o),
            this.setOrigin(n));
    }
    attach(n) {
        (this._overlayRef && this._overlayRef,
            this._validatePositions(),
            n.hostElement.classList.add(i0),
            (this._overlayRef = n),
            (this._boundingBox = n.hostElement),
            (this._pane = n.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
                .change()
                .subscribe(() => {
                    ((this._isInitialRender = !0), this.apply());
                })));
    }
    apply() {
        if (this._isDisposed || !this._platform.isBrowser) return;
        if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
        ) {
            this.reapplyLastPosition();
            return;
        }
        (this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect()),
            (this._containerRect = this._overlayContainer
                .getContainerElement()
                .getBoundingClientRect()));
        let n = this._originRect,
            e = this._overlayRect,
            i = this._viewportRect,
            r = this._containerRect,
            o = [],
            a;
        for (let s of this._preferredPositions) {
            let c = this._getOriginPoint(n, r, s),
                d = this._getOverlayPoint(c, e, s),
                h = this._getOverlayFit(d, e, i, s);
            if (h.isCompletelyWithinViewport) {
                ((this._isPushed = !1), this._applyPosition(s, c));
                return;
            }
            if (this._canFitWithFlexibleDimensions(h, d, i)) {
                o.push({
                    position: s,
                    origin: c,
                    overlayRect: e,
                    boundingBoxRect: this._calculateBoundingBoxRect(c, s),
                });
                continue;
            }
            (!a || a.overlayFit.visibleArea < h.visibleArea) &&
                (a = {
                    overlayFit: h,
                    overlayPoint: d,
                    originPoint: c,
                    position: s,
                    overlayRect: e,
                });
        }
        if (o.length) {
            let s = null,
                c = -1;
            for (let d of o) {
                let h =
                    d.boundingBoxRect.width *
                    d.boundingBoxRect.height *
                    (d.position.weight || 1);
                h > c && ((c = h), (s = d));
            }
            ((this._isPushed = !1), this._applyPosition(s.position, s.origin));
            return;
        }
        if (this._canPush) {
            ((this._isPushed = !0),
                this._applyPosition(a.position, a.originPoint));
            return;
        }
        this._applyPosition(a.position, a.originPoint);
    }
    detach() {
        (this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe());
    }
    dispose() {
        this._isDisposed ||
            (this._boundingBox &&
                qn(this._boundingBox.style, {
                    top: "",
                    left: "",
                    right: "",
                    bottom: "",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: "",
                }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
                this._overlayRef.hostElement.classList.remove(i0),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
    }
    reapplyLastPosition() {
        if (this._isDisposed || !this._platform.isBrowser) return;
        let n = this._lastPosition;
        if (n) {
            ((this._originRect = this._getOriginRect()),
                (this._overlayRect = this._pane.getBoundingClientRect()),
                (this._viewportRect = this._getNarrowedViewportRect()),
                (this._containerRect = this._overlayContainer
                    .getContainerElement()
                    .getBoundingClientRect()));
            let e = this._getOriginPoint(
                this._originRect,
                this._containerRect,
                n,
            );
            this._applyPosition(n, e);
        } else this.apply();
    }
    withScrollableContainers(n) {
        return ((this._scrollables = n), this);
    }
    withPositions(n) {
        return (
            (this._preferredPositions = n),
            n.indexOf(this._lastPosition) === -1 && (this._lastPosition = null),
            this._validatePositions(),
            this
        );
    }
    withViewportMargin(n) {
        return ((this._viewportMargin = n), this);
    }
    withFlexibleDimensions(n = !0) {
        return ((this._hasFlexibleDimensions = n), this);
    }
    withGrowAfterOpen(n = !0) {
        return ((this._growAfterOpen = n), this);
    }
    withPush(n = !0) {
        return ((this._canPush = n), this);
    }
    withLockedPosition(n = !0) {
        return ((this._positionLocked = n), this);
    }
    setOrigin(n) {
        return ((this._origin = n), this);
    }
    withDefaultOffsetX(n) {
        return ((this._offsetX = n), this);
    }
    withDefaultOffsetY(n) {
        return ((this._offsetY = n), this);
    }
    withTransformOriginOn(n) {
        return ((this._transformOriginSelector = n), this);
    }
    _getOriginPoint(n, e, i) {
        let r;
        if (i.originX == "center") r = n.left + n.width / 2;
        else {
            let a = this._isRtl() ? n.right : n.left,
                s = this._isRtl() ? n.left : n.right;
            r = i.originX == "start" ? a : s;
        }
        e.left < 0 && (r -= e.left);
        let o;
        return (
            i.originY == "center"
                ? (o = n.top + n.height / 2)
                : (o = i.originY == "top" ? n.top : n.bottom),
            e.top < 0 && (o -= e.top),
            { x: r, y: o }
        );
    }
    _getOverlayPoint(n, e, i) {
        let r;
        i.overlayX == "center"
            ? (r = -e.width / 2)
            : i.overlayX === "start"
              ? (r = this._isRtl() ? -e.width : 0)
              : (r = this._isRtl() ? 0 : -e.width);
        let o;
        return (
            i.overlayY == "center"
                ? (o = -e.height / 2)
                : (o = i.overlayY == "top" ? 0 : -e.height),
            { x: n.x + r, y: n.y + o }
        );
    }
    _getOverlayFit(n, e, i, r) {
        let o = o0(e),
            { x: a, y: s } = n,
            c = this._getOffset(r, "x"),
            d = this._getOffset(r, "y");
        (c && (a += c), d && (s += d));
        let h = 0 - a,
            f = a + o.width - i.width,
            v = 0 - s,
            M = s + o.height - i.height,
            F = this._subtractOverflows(o.width, h, f),
            T = this._subtractOverflows(o.height, v, M),
            H = F * T;
        return {
            visibleArea: H,
            isCompletelyWithinViewport: o.width * o.height === H,
            fitsInViewportVertically: T === o.height,
            fitsInViewportHorizontally: F == o.width,
        };
    }
    _canFitWithFlexibleDimensions(n, e, i) {
        if (this._hasFlexibleDimensions) {
            let r = i.bottom - e.y,
                o = i.right - e.x,
                a = r0(this._overlayRef.getConfig().minHeight),
                s = r0(this._overlayRef.getConfig().minWidth),
                c = n.fitsInViewportVertically || (a != null && a <= r),
                d = n.fitsInViewportHorizontally || (s != null && s <= o);
            return c && d;
        }
        return !1;
    }
    _pushOverlayOnScreen(n, e, i) {
        if (this._previousPushAmount && this._positionLocked)
            return {
                x: n.x + this._previousPushAmount.x,
                y: n.y + this._previousPushAmount.y,
            };
        let r = o0(e),
            o = this._viewportRect,
            a = Math.max(n.x + r.width - o.width, 0),
            s = Math.max(n.y + r.height - o.height, 0),
            c = Math.max(o.top - i.top - n.y, 0),
            d = Math.max(o.left - i.left - n.x, 0),
            h = 0,
            f = 0;
        return (
            r.width <= o.width
                ? (h = d || -a)
                : (h = n.x < this._viewportMargin ? o.left - i.left - n.x : 0),
            r.height <= o.height
                ? (f = c || -s)
                : (f = n.y < this._viewportMargin ? o.top - i.top - n.y : 0),
            (this._previousPushAmount = { x: h, y: f }),
            { x: n.x + h, y: n.y + f }
        );
    }
    _applyPosition(n, e) {
        if (
            (this._setTransformOrigin(n),
            this._setOverlayElementStyles(e, n),
            this._setBoundingBoxStyles(e, n),
            n.panelClass && this._addPanelClasses(n.panelClass),
            this._positionChanges.observers.length)
        ) {
            let i = this._getScrollVisibility();
            if (
                n !== this._lastPosition ||
                !this._lastScrollVisibility ||
                !Lh(this._lastScrollVisibility, i)
            ) {
                let r = new Uo(n, i);
                this._positionChanges.next(r);
            }
            this._lastScrollVisibility = i;
        }
        ((this._lastPosition = n), (this._isInitialRender = !1));
    }
    _setTransformOrigin(n) {
        if (!this._transformOriginSelector) return;
        let e = this._boundingBox.querySelectorAll(
                this._transformOriginSelector,
            ),
            i,
            r = n.overlayY;
        n.overlayX === "center"
            ? (i = "center")
            : this._isRtl()
              ? (i = n.overlayX === "start" ? "right" : "left")
              : (i = n.overlayX === "start" ? "left" : "right");
        for (let o = 0; o < e.length; o++)
            e[o].style.transformOrigin = `${i} ${r}`;
    }
    _calculateBoundingBoxRect(n, e) {
        let i = this._viewportRect,
            r = this._isRtl(),
            o,
            a,
            s;
        if (e.overlayY === "top")
            ((a = n.y), (o = i.height - a + this._viewportMargin));
        else if (e.overlayY === "bottom")
            ((s = i.height - n.y + this._viewportMargin * 2),
                (o = i.height - s + this._viewportMargin));
        else {
            let M = Math.min(i.bottom - n.y + i.top, n.y),
                F = this._lastBoundingBoxSize.height;
            ((o = M * 2),
                (a = n.y - M),
                o > F &&
                    !this._isInitialRender &&
                    !this._growAfterOpen &&
                    (a = n.y - F / 2));
        }
        let c = (e.overlayX === "start" && !r) || (e.overlayX === "end" && r),
            d = (e.overlayX === "end" && !r) || (e.overlayX === "start" && r),
            h,
            f,
            v;
        if (d)
            ((v = i.width - n.x + this._viewportMargin * 2),
                (h = n.x - this._viewportMargin));
        else if (c) ((f = n.x), (h = i.right - n.x));
        else {
            let M = Math.min(i.right - n.x + i.left, n.x),
                F = this._lastBoundingBoxSize.width;
            ((h = M * 2),
                (f = n.x - M),
                h > F &&
                    !this._isInitialRender &&
                    !this._growAfterOpen &&
                    (f = n.x - F / 2));
        }
        return { top: a, left: f, bottom: s, right: v, width: h, height: o };
    }
    _setBoundingBoxStyles(n, e) {
        let i = this._calculateBoundingBoxRect(n, e);
        !this._isInitialRender &&
            !this._growAfterOpen &&
            ((i.height = Math.min(i.height, this._lastBoundingBoxSize.height)),
            (i.width = Math.min(i.width, this._lastBoundingBoxSize.width)));
        let r = {};
        if (this._hasExactPosition())
            ((r.top = r.left = "0"),
                (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
                (r.width = r.height = "100%"));
        else {
            let o = this._overlayRef.getConfig().maxHeight,
                a = this._overlayRef.getConfig().maxWidth;
            ((r.height = ue(i.height)),
                (r.top = ue(i.top)),
                (r.bottom = ue(i.bottom)),
                (r.width = ue(i.width)),
                (r.left = ue(i.left)),
                (r.right = ue(i.right)),
                e.overlayX === "center"
                    ? (r.alignItems = "center")
                    : (r.alignItems =
                          e.overlayX === "end" ? "flex-end" : "flex-start"),
                e.overlayY === "center"
                    ? (r.justifyContent = "center")
                    : (r.justifyContent =
                          e.overlayY === "bottom" ? "flex-end" : "flex-start"),
                o && (r.maxHeight = ue(o)),
                a && (r.maxWidth = ue(a)));
        }
        ((this._lastBoundingBoxSize = i), qn(this._boundingBox.style, r));
    }
    _resetBoundingBoxStyles() {
        qn(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
        });
    }
    _resetOverlayElementStyles() {
        qn(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
        });
    }
    _setOverlayElementStyles(n, e) {
        let i = {},
            r = this._hasExactPosition(),
            o = this._hasFlexibleDimensions,
            a = this._overlayRef.getConfig();
        if (r) {
            let h = this._viewportRuler.getViewportScrollPosition();
            (qn(i, this._getExactOverlayY(e, n, h)),
                qn(i, this._getExactOverlayX(e, n, h)));
        } else i.position = "static";
        let s = "",
            c = this._getOffset(e, "x"),
            d = this._getOffset(e, "y");
        (c && (s += `translateX(${c}px) `),
            d && (s += `translateY(${d}px)`),
            (i.transform = s.trim()),
            a.maxHeight &&
                (r ? (i.maxHeight = ue(a.maxHeight)) : o && (i.maxHeight = "")),
            a.maxWidth &&
                (r ? (i.maxWidth = ue(a.maxWidth)) : o && (i.maxWidth = "")),
            qn(this._pane.style, i));
    }
    _getExactOverlayY(n, e, i) {
        let r = { top: "", bottom: "" },
            o = this._getOverlayPoint(e, this._overlayRect, n);
        if (
            (this._isPushed &&
                (o = this._pushOverlayOnScreen(o, this._overlayRect, i)),
            n.overlayY === "bottom")
        ) {
            let a = this._document.documentElement.clientHeight;
            r.bottom = `${a - (o.y + this._overlayRect.height)}px`;
        } else r.top = ue(o.y);
        return r;
    }
    _getExactOverlayX(n, e, i) {
        let r = { left: "", right: "" },
            o = this._getOverlayPoint(e, this._overlayRect, n);
        this._isPushed &&
            (o = this._pushOverlayOnScreen(o, this._overlayRect, i));
        let a;
        if (
            (this._isRtl()
                ? (a = n.overlayX === "end" ? "left" : "right")
                : (a = n.overlayX === "end" ? "right" : "left"),
            a === "right")
        ) {
            let s = this._document.documentElement.clientWidth;
            r.right = `${s - (o.x + this._overlayRect.width)}px`;
        } else r.left = ue(o.x);
        return r;
    }
    _getScrollVisibility() {
        let n = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            i = this._scrollables.map((r) =>
                r.getElementRef().nativeElement.getBoundingClientRect(),
            );
        return {
            isOriginClipped: t0(n, i),
            isOriginOutsideView: v2(n, i),
            isOverlayClipped: t0(e, i),
            isOverlayOutsideView: v2(e, i),
        };
    }
    _subtractOverflows(n, ...e) {
        return e.reduce((i, r) => i - Math.max(r, 0), n);
    }
    _getNarrowedViewportRect() {
        let n = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
        return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + n - this._viewportMargin,
            bottom: i.top + e - this._viewportMargin,
            width: n - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
        };
    }
    _isRtl() {
        return this._overlayRef.getDirection() === "rtl";
    }
    _hasExactPosition() {
        return !this._hasFlexibleDimensions || this._isPushed;
    }
    _getOffset(n, e) {
        return e === "x"
            ? n.offsetX == null
                ? this._offsetX
                : n.offsetX
            : n.offsetY == null
              ? this._offsetY
              : n.offsetY;
    }
    _validatePositions() {}
    _addPanelClasses(n) {
        this._pane &&
            q4(n).forEach((e) => {
                e !== "" &&
                    this._appliedPanelClasses.indexOf(e) === -1 &&
                    (this._appliedPanelClasses.push(e),
                    this._pane.classList.add(e));
            });
    }
    _clearPanelClasses() {
        this._pane &&
            (this._appliedPanelClasses.forEach((n) => {
                this._pane.classList.remove(n);
            }),
            (this._appliedPanelClasses = []));
    }
    _getOriginRect() {
        let n = this._origin;
        if (n instanceof B) return n.nativeElement.getBoundingClientRect();
        if (n instanceof Element) return n.getBoundingClientRect();
        let e = n.width || 0,
            i = n.height || 0;
        return {
            top: n.y,
            bottom: n.y + i,
            left: n.x,
            right: n.x + e,
            height: i,
            width: e,
        };
    }
};
function qn(t, n) {
    for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
    return t;
}
function r0(t) {
    if (typeof t != "number" && t != null) {
        let [n, e] = t.split(Rh);
        return !e || e === "px" ? parseFloat(n) : null;
    }
    return t || null;
}
function o0(t) {
    return {
        top: Math.floor(t.top),
        right: Math.floor(t.right),
        bottom: Math.floor(t.bottom),
        left: Math.floor(t.left),
        width: Math.floor(t.width),
        height: Math.floor(t.height),
    };
}
function Lh(t, n) {
    return t === n
        ? !0
        : t.isOriginClipped === n.isOriginClipped &&
              t.isOriginOutsideView === n.isOriginOutsideView &&
              t.isOverlayClipped === n.isOverlayClipped &&
              t.isOverlayOutsideView === n.isOverlayOutsideView;
}
var a0 = "cdk-global-overlay-wrapper";
function f0(t) {
    return new qo();
}
var qo = class {
        _overlayRef;
        _cssPosition = "static";
        _topOffset = "";
        _bottomOffset = "";
        _alignItems = "";
        _xPosition = "";
        _xOffset = "";
        _width = "";
        _height = "";
        _isDisposed = !1;
        attach(n) {
            let e = n.getConfig();
            ((this._overlayRef = n),
                this._width && !e.width && n.updateSize({ width: this._width }),
                this._height &&
                    !e.height &&
                    n.updateSize({ height: this._height }),
                n.hostElement.classList.add(a0),
                (this._isDisposed = !1));
        }
        top(n = "") {
            return (
                (this._bottomOffset = ""),
                (this._topOffset = n),
                (this._alignItems = "flex-start"),
                this
            );
        }
        left(n = "") {
            return ((this._xOffset = n), (this._xPosition = "left"), this);
        }
        bottom(n = "") {
            return (
                (this._topOffset = ""),
                (this._bottomOffset = n),
                (this._alignItems = "flex-end"),
                this
            );
        }
        right(n = "") {
            return ((this._xOffset = n), (this._xPosition = "right"), this);
        }
        start(n = "") {
            return ((this._xOffset = n), (this._xPosition = "start"), this);
        }
        end(n = "") {
            return ((this._xOffset = n), (this._xPosition = "end"), this);
        }
        width(n = "") {
            return (
                this._overlayRef
                    ? this._overlayRef.updateSize({ width: n })
                    : (this._width = n),
                this
            );
        }
        height(n = "") {
            return (
                this._overlayRef
                    ? this._overlayRef.updateSize({ height: n })
                    : (this._height = n),
                this
            );
        }
        centerHorizontally(n = "") {
            return (this.left(n), (this._xPosition = "center"), this);
        }
        centerVertically(n = "") {
            return (this.top(n), (this._alignItems = "center"), this);
        }
        apply() {
            if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
            let n = this._overlayRef.overlayElement.style,
                e = this._overlayRef.hostElement.style,
                i = this._overlayRef.getConfig(),
                { width: r, height: o, maxWidth: a, maxHeight: s } = i,
                c =
                    (r === "100%" || r === "100vw") &&
                    (!a || a === "100%" || a === "100vw"),
                d =
                    (o === "100%" || o === "100vh") &&
                    (!s || s === "100%" || s === "100vh"),
                h = this._xPosition,
                f = this._xOffset,
                v = this._overlayRef.getConfig().direction === "rtl",
                M = "",
                F = "",
                T = "";
            (c
                ? (T = "flex-start")
                : h === "center"
                  ? ((T = "center"), v ? (F = f) : (M = f))
                  : v
                    ? h === "left" || h === "end"
                        ? ((T = "flex-end"), (M = f))
                        : (h === "right" || h === "start") &&
                          ((T = "flex-start"), (F = f))
                    : h === "left" || h === "start"
                      ? ((T = "flex-start"), (M = f))
                      : (h === "right" || h === "end") &&
                        ((T = "flex-end"), (F = f)),
                (n.position = this._cssPosition),
                (n.marginLeft = c ? "0" : M),
                (n.marginTop = d ? "0" : this._topOffset),
                (n.marginBottom = this._bottomOffset),
                (n.marginRight = c ? "0" : F),
                (e.justifyContent = T),
                (e.alignItems = d ? "flex-start" : this._alignItems));
        }
        dispose() {
            if (this._isDisposed || !this._overlayRef) return;
            let n = this._overlayRef.overlayElement.style,
                e = this._overlayRef.hostElement,
                i = e.style;
            (e.classList.remove(a0),
                (i.justifyContent =
                    i.alignItems =
                    n.marginTop =
                    n.marginBottom =
                    n.marginLeft =
                    n.marginRight =
                    n.position =
                        ""),
                (this._overlayRef = null),
                (this._isDisposed = !0));
        }
    },
    v0 = (() => {
        class t {
            _injector = l(fe);
            constructor() {}
            global() {
                return f0();
            }
            flexibleConnectedTo(e) {
                return y2(this._injector, e);
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
function z2(t, n) {
    t.get(l2).load(m0);
    let e = t.get(p0),
        i = t.get(U),
        r = t.get(Q8),
        o = t.get(an),
        a = t.get(he),
        s = i.createElement("div"),
        c = i.createElement("div");
    ((c.id = r.getId("cdk-overlay-")),
        c.classList.add("cdk-overlay-pane"),
        s.appendChild(c),
        e.getContainerElement().appendChild(s));
    let d = new No(c, o, t),
        h = new Ki(n),
        f =
            t.get(oe, null, { optional: !0 }) ||
            t.get(Me).createRenderer(null, null);
    return (
        (h.direction = h.direction || a.value),
        new $o(
            d,
            s,
            c,
            h,
            t.get(q),
            t.get(h0),
            i,
            t.get(Rt),
            t.get(u0),
            n?.disableAnimations ??
                t.get(gt, null, { optional: !0 }) === "NoopAnimations",
            t.get(Ne),
            f,
        )
    );
}
var g0 = (() => {
        class t {
            scrollStrategies = l(l0);
            _positionBuilder = l(v0);
            _injector = l(fe);
            constructor() {}
            create(e) {
                return z2(this._injector, e);
            }
            position() {
                return this._positionBuilder;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Nh = [
        {
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top",
        },
        {
            originX: "start",
            originY: "top",
            overlayX: "start",
            overlayY: "bottom",
        },
        { originX: "end", originY: "top", overlayX: "end", overlayY: "bottom" },
        { originX: "end", originY: "bottom", overlayX: "end", overlayY: "top" },
    ],
    y0 = new b("cdk-connected-overlay-scroll-strategy", {
        providedIn: "root",
        factory: () => {
            let t = l(fe);
            return () => Go(t);
        },
    }),
    Zi = (() => {
        class t {
            elementRef = l(B);
            constructor() {}
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "cdk-overlay-origin", ""],
                    ["", "overlay-origin", ""],
                    ["", "cdkOverlayOrigin", ""],
                ],
                exportAs: ["cdkOverlayOrigin"],
            });
        }
        return t;
    })(),
    Xi = (() => {
        class t {
            _dir = l(he, { optional: !0 });
            _injector = l(fe);
            _overlayRef;
            _templatePortal;
            _backdropSubscription = mt.EMPTY;
            _attachSubscription = mt.EMPTY;
            _detachSubscription = mt.EMPTY;
            _positionSubscription = mt.EMPTY;
            _offsetX;
            _offsetY;
            _position;
            _scrollStrategyFactory = l(y0);
            _disposeOnNavigation = !1;
            _ngZone = l(q);
            origin;
            positions;
            positionStrategy;
            get offsetX() {
                return this._offsetX;
            }
            set offsetX(e) {
                ((this._offsetX = e),
                    this._position &&
                        this._updatePositionStrategy(this._position));
            }
            get offsetY() {
                return this._offsetY;
            }
            set offsetY(e) {
                ((this._offsetY = e),
                    this._position &&
                        this._updatePositionStrategy(this._position));
            }
            width;
            height;
            minWidth;
            minHeight;
            backdropClass;
            panelClass;
            viewportMargin = 0;
            scrollStrategy;
            open = !1;
            disableClose = !1;
            transformOriginSelector;
            hasBackdrop = !1;
            lockPosition = !1;
            flexibleDimensions = !1;
            growAfterOpen = !1;
            push = !1;
            get disposeOnNavigation() {
                return this._disposeOnNavigation;
            }
            set disposeOnNavigation(e) {
                this._disposeOnNavigation = e;
            }
            backdropClick = new X();
            positionChange = new X();
            attach = new X();
            detach = new X();
            overlayKeydown = new X();
            overlayOutsideClick = new X();
            constructor() {
                let e = l(Ye),
                    i = l(qe);
                ((this._templatePortal = new qi(e, i)),
                    (this.scrollStrategy = this._scrollStrategyFactory()));
            }
            get overlayRef() {
                return this._overlayRef;
            }
            get dir() {
                return this._dir ? this._dir.value : "ltr";
            }
            ngOnDestroy() {
                (this._attachSubscription.unsubscribe(),
                    this._detachSubscription.unsubscribe(),
                    this._backdropSubscription.unsubscribe(),
                    this._positionSubscription.unsubscribe(),
                    this._overlayRef?.dispose());
            }
            ngOnChanges(e) {
                (this._position &&
                    (this._updatePositionStrategy(this._position),
                    this._overlayRef?.updateSize({
                        width: this.width,
                        minWidth: this.minWidth,
                        height: this.height,
                        minHeight: this.minHeight,
                    }),
                    e.origin && this.open && this._position.apply()),
                    e.open &&
                        (this.open
                            ? this.attachOverlay()
                            : this.detachOverlay()));
            }
            _createOverlay() {
                (!this.positions || !this.positions.length) &&
                    (this.positions = Nh);
                let e = (this._overlayRef = z2(
                    this._injector,
                    this._buildConfig(),
                ));
                ((this._attachSubscription = e
                    .attachments()
                    .subscribe(() => this.attach.emit())),
                    (this._detachSubscription = e
                        .detachments()
                        .subscribe(() => this.detach.emit())),
                    e.keydownEvents().subscribe((i) => {
                        (this.overlayKeydown.next(i),
                            i.keyCode === 27 &&
                                !this.disableClose &&
                                !J8(i) &&
                                (i.preventDefault(), this.detachOverlay()));
                    }),
                    this._overlayRef.outsidePointerEvents().subscribe((i) => {
                        let r = this._getOriginElement(),
                            o = dt(i);
                        (!r || (r !== o && !r.contains(o))) &&
                            this.overlayOutsideClick.next(i);
                    }));
            }
            _buildConfig() {
                let e = (this._position =
                        this.positionStrategy ||
                        this._createPositionStrategy()),
                    i = new Ki({
                        direction: this._dir || "ltr",
                        positionStrategy: e,
                        scrollStrategy: this.scrollStrategy,
                        hasBackdrop: this.hasBackdrop,
                        disposeOnNavigation: this.disposeOnNavigation,
                    });
                return (
                    (this.width || this.width === 0) && (i.width = this.width),
                    (this.height || this.height === 0) &&
                        (i.height = this.height),
                    (this.minWidth || this.minWidth === 0) &&
                        (i.minWidth = this.minWidth),
                    (this.minHeight || this.minHeight === 0) &&
                        (i.minHeight = this.minHeight),
                    this.backdropClass &&
                        (i.backdropClass = this.backdropClass),
                    this.panelClass && (i.panelClass = this.panelClass),
                    i
                );
            }
            _updatePositionStrategy(e) {
                let i = this.positions.map((r) => ({
                    originX: r.originX,
                    originY: r.originY,
                    overlayX: r.overlayX,
                    overlayY: r.overlayY,
                    offsetX: r.offsetX || this.offsetX,
                    offsetY: r.offsetY || this.offsetY,
                    panelClass: r.panelClass || void 0,
                }));
                return e
                    .setOrigin(this._getOrigin())
                    .withPositions(i)
                    .withFlexibleDimensions(this.flexibleDimensions)
                    .withPush(this.push)
                    .withGrowAfterOpen(this.growAfterOpen)
                    .withViewportMargin(this.viewportMargin)
                    .withLockedPosition(this.lockPosition)
                    .withTransformOriginOn(this.transformOriginSelector);
            }
            _createPositionStrategy() {
                let e = y2(this._injector, this._getOrigin());
                return (this._updatePositionStrategy(e), e);
            }
            _getOrigin() {
                return this.origin instanceof Zi
                    ? this.origin.elementRef
                    : this.origin;
            }
            _getOriginElement() {
                return this.origin instanceof Zi
                    ? this.origin.elementRef.nativeElement
                    : this.origin instanceof B
                      ? this.origin.nativeElement
                      : typeof Element < "u" && this.origin instanceof Element
                        ? this.origin
                        : null;
            }
            attachOverlay() {
                (this._overlayRef
                    ? (this._overlayRef.getConfig().hasBackdrop =
                          this.hasBackdrop)
                    : this._createOverlay(),
                    this._overlayRef.hasAttached() ||
                        this._overlayRef.attach(this._templatePortal),
                    this.hasBackdrop
                        ? (this._backdropSubscription = this._overlayRef
                              .backdropClick()
                              .subscribe((e) => {
                                  this.backdropClick.emit(e);
                              }))
                        : this._backdropSubscription.unsubscribe(),
                    this._positionSubscription.unsubscribe(),
                    this.positionChange.observers.length > 0 &&
                        (this._positionSubscription =
                            this._position.positionChanges
                                .pipe(
                                    N2(
                                        () =>
                                            this.positionChange.observers
                                                .length > 0,
                                    ),
                                )
                                .subscribe((e) => {
                                    (this._ngZone.run(() =>
                                        this.positionChange.emit(e),
                                    ),
                                        this.positionChange.observers.length ===
                                            0 &&
                                            this._positionSubscription.unsubscribe());
                                })),
                    (this.open = !0));
            }
            detachOverlay() {
                (this._overlayRef?.detach(),
                    this._backdropSubscription.unsubscribe(),
                    this._positionSubscription.unsubscribe(),
                    (this.open = !1));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "cdk-connected-overlay", ""],
                    ["", "connected-overlay", ""],
                    ["", "cdkConnectedOverlay", ""],
                ],
                inputs: {
                    origin: [0, "cdkConnectedOverlayOrigin", "origin"],
                    positions: [0, "cdkConnectedOverlayPositions", "positions"],
                    positionStrategy: [
                        0,
                        "cdkConnectedOverlayPositionStrategy",
                        "positionStrategy",
                    ],
                    offsetX: [0, "cdkConnectedOverlayOffsetX", "offsetX"],
                    offsetY: [0, "cdkConnectedOverlayOffsetY", "offsetY"],
                    width: [0, "cdkConnectedOverlayWidth", "width"],
                    height: [0, "cdkConnectedOverlayHeight", "height"],
                    minWidth: [0, "cdkConnectedOverlayMinWidth", "minWidth"],
                    minHeight: [0, "cdkConnectedOverlayMinHeight", "minHeight"],
                    backdropClass: [
                        0,
                        "cdkConnectedOverlayBackdropClass",
                        "backdropClass",
                    ],
                    panelClass: [
                        0,
                        "cdkConnectedOverlayPanelClass",
                        "panelClass",
                    ],
                    viewportMargin: [
                        0,
                        "cdkConnectedOverlayViewportMargin",
                        "viewportMargin",
                    ],
                    scrollStrategy: [
                        0,
                        "cdkConnectedOverlayScrollStrategy",
                        "scrollStrategy",
                    ],
                    open: [0, "cdkConnectedOverlayOpen", "open"],
                    disableClose: [
                        0,
                        "cdkConnectedOverlayDisableClose",
                        "disableClose",
                    ],
                    transformOriginSelector: [
                        0,
                        "cdkConnectedOverlayTransformOriginOn",
                        "transformOriginSelector",
                    ],
                    hasBackdrop: [
                        2,
                        "cdkConnectedOverlayHasBackdrop",
                        "hasBackdrop",
                        _,
                    ],
                    lockPosition: [
                        2,
                        "cdkConnectedOverlayLockPosition",
                        "lockPosition",
                        _,
                    ],
                    flexibleDimensions: [
                        2,
                        "cdkConnectedOverlayFlexibleDimensions",
                        "flexibleDimensions",
                        _,
                    ],
                    growAfterOpen: [
                        2,
                        "cdkConnectedOverlayGrowAfterOpen",
                        "growAfterOpen",
                        _,
                    ],
                    push: [2, "cdkConnectedOverlayPush", "push", _],
                    disposeOnNavigation: [
                        2,
                        "cdkConnectedOverlayDisposeOnNavigation",
                        "disposeOnNavigation",
                        _,
                    ],
                },
                outputs: {
                    backdropClick: "backdropClick",
                    positionChange: "positionChange",
                    attach: "attach",
                    detach: "detach",
                    overlayKeydown: "overlayKeydown",
                    overlayOutsideClick: "overlayOutsideClick",
                },
                exportAs: ["cdkConnectedOverlay"],
                features: [I],
            });
        }
        return t;
    })();
function Yh(t) {
    let n = l(fe);
    return () => Go(n);
}
var Bh = { provide: y0, useFactory: Yh },
    C2 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ providers: [g0, Bh], imports: [Yn, X8, h2, h2] });
        }
        return t;
    })();
var Ko = (() => {
    class t {
        animationType = l(gt, { optional: !0 });
        nzNoAnimation = !1;
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵdir = D({
            type: t,
            selectors: [["", "nzNoAnimation", ""]],
            hostVars: 2,
            hostBindings: function (i, r) {
                i & 2 &&
                    G(
                        "nz-animate-disabled",
                        r.nzNoAnimation || r.animationType === "NoopAnimations",
                    );
            },
            inputs: { nzNoAnimation: [2, "nzNoAnimation", "nzNoAnimation", _] },
            exportAs: ["nzNoAnimation"],
        });
    }
    return t;
})();
var Le = {
        top: new ce(
            { originX: "center", originY: "top" },
            { overlayX: "center", overlayY: "bottom" },
        ),
        topCenter: new ce(
            { originX: "center", originY: "top" },
            { overlayX: "center", overlayY: "bottom" },
        ),
        topLeft: new ce(
            { originX: "start", originY: "top" },
            { overlayX: "start", overlayY: "bottom" },
        ),
        topRight: new ce(
            { originX: "end", originY: "top" },
            { overlayX: "end", overlayY: "bottom" },
        ),
        right: new ce(
            { originX: "end", originY: "center" },
            { overlayX: "start", overlayY: "center" },
        ),
        rightTop: new ce(
            { originX: "end", originY: "top" },
            { overlayX: "start", overlayY: "top" },
        ),
        rightBottom: new ce(
            { originX: "end", originY: "bottom" },
            { overlayX: "start", overlayY: "bottom" },
        ),
        bottom: new ce(
            { originX: "center", originY: "bottom" },
            { overlayX: "center", overlayY: "top" },
        ),
        bottomCenter: new ce(
            { originX: "center", originY: "bottom" },
            { overlayX: "center", overlayY: "top" },
        ),
        bottomLeft: new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "start", overlayY: "top" },
        ),
        bottomRight: new ce(
            { originX: "end", originY: "bottom" },
            { overlayX: "end", overlayY: "top" },
        ),
        left: new ce(
            { originX: "start", originY: "center" },
            { overlayX: "end", overlayY: "center" },
        ),
        leftTop: new ce(
            { originX: "start", originY: "top" },
            { overlayX: "end", overlayY: "top" },
        ),
        leftBottom: new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "end", overlayY: "bottom" },
        ),
    },
    b2 = [Le.top, Le.right, Le.bottom, Le.left],
    Sw = [Le.bottomLeft, Le.bottomRight, Le.topLeft, Le.topRight],
    Dw = [
        new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "start", overlayY: "bottom" },
        ),
        new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "end", overlayY: "bottom" },
        ),
    ],
    xw = [
        Le.bottomLeft,
        new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "end", overlayY: "top" },
        ),
    ];
function _2(t) {
    for (let n in Le)
        if (
            t.connectionPair.originX === Le[n].originX &&
            t.connectionPair.originY === Le[n].originY &&
            t.connectionPair.overlayX === Le[n].overlayX &&
            t.connectionPair.overlayY === Le[n].overlayY
        )
            return n;
}
var Zo = {
        bottomLeft: new ce(
            { originX: "start", originY: "bottom" },
            { overlayX: "start", overlayY: "top" },
            void 0,
            2,
        ),
        topLeft: new ce(
            { originX: "start", originY: "top" },
            { overlayX: "start", overlayY: "bottom" },
            void 0,
            -2,
        ),
        bottomRight: new ce(
            { originX: "end", originY: "bottom" },
            { overlayX: "end", overlayY: "top" },
            void 0,
            2,
        ),
        topRight: new ce(
            { originX: "end", originY: "top" },
            { overlayX: "end", overlayY: "bottom" },
            void 0,
            -2,
        ),
    },
    Tw = [Zo.bottomLeft, Zo.topLeft, Zo.bottomRight, Zo.topRight],
    z0 = (() => {
        class t {
            cdkConnectedOverlay = l(Xi);
            nzArrowPointAtCenter = !1;
            constructor() {
                ((this.cdkConnectedOverlay.backdropClass =
                    "nz-overlay-transparent-backdrop"),
                    this.cdkConnectedOverlay.positionChange
                        .pipe(N())
                        .subscribe((e) => {
                            this.nzArrowPointAtCenter &&
                                this.updateArrowPosition(e);
                        }));
            }
            updateArrowPosition(e) {
                let i = this.getOriginRect(),
                    r = _2(e),
                    o = 0,
                    a = 0;
                (r === "topLeft" || r === "bottomLeft"
                    ? (o = i.width / 2 - 14)
                    : r === "topRight" || r === "bottomRight"
                      ? (o = -(i.width / 2 - 14))
                      : r === "leftTop" || r === "rightTop"
                        ? (a = i.height / 2 - 10)
                        : (r === "leftBottom" || r === "rightBottom") &&
                          (a = -(i.height / 2 - 10)),
                    (this.cdkConnectedOverlay.offsetX !== o ||
                        this.cdkConnectedOverlay.offsetY !== a) &&
                        ((this.cdkConnectedOverlay.offsetY = a),
                        (this.cdkConnectedOverlay.offsetX = o),
                        this.cdkConnectedOverlay.overlayRef.updatePosition()));
            }
            getFlexibleConnectedPositionStrategyOrigin() {
                return this.cdkConnectedOverlay.origin instanceof Zi
                    ? this.cdkConnectedOverlay.origin.elementRef
                    : this.cdkConnectedOverlay.origin;
            }
            getOriginRect() {
                let e = this.getFlexibleConnectedPositionStrategyOrigin();
                if (e instanceof B)
                    return e.nativeElement.getBoundingClientRect();
                if (e instanceof Element) return e.getBoundingClientRect();
                let i = e.width || 0,
                    r = e.height || 0;
                return {
                    top: e.y,
                    bottom: e.y + r,
                    left: e.x,
                    right: e.x + i,
                    height: r,
                    width: i,
                };
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["", "cdkConnectedOverlay", "", "nzConnectedOverlay", ""],
                ],
                inputs: {
                    nzArrowPointAtCenter: [
                        2,
                        "nzArrowPointAtCenter",
                        "nzArrowPointAtCenter",
                        _,
                    ],
                },
                exportAs: ["nzConnectedOverlay"],
            });
        }
        return t;
    })(),
    C0 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var $h = ["overlay"];
function Wh(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(2);
        (u(), se(e.nzTitle));
    }
}
function qh(t, n) {
    if (
        (t & 1 &&
            (z(0, "div", 2)(1, "div", 3)(2, "div", 4),
            W(3, "span", 5),
            C(),
            z(4, "div", 6),
            te(5, Wh, 2, 1, "ng-container", 7),
            C()()()),
        t & 2)
    ) {
        let e = g();
        (Ot(e.nzOverlayStyle),
            cn(e._classMap),
            G("ant-tooltip-rtl", e.dir === "rtl"),
            y(
                "@.disabled",
                !!(e.noAnimation != null && e.noAnimation.nzNoAnimation),
            )(
                "nzNoAnimation",
                e.noAnimation == null ? null : e.noAnimation.nzNoAnimation,
            )("@zoomBigMotion", "active"),
            u(3),
            Ot(e._contentStyleMap),
            u(),
            Ot(e._contentStyleMap),
            u(),
            y("nzStringTemplateOutlet", e.nzTitle)(
                "nzStringTemplateOutletContext",
                e.nzTitleContext,
            ));
    }
}
var Gh = (() => {
        class t {
            componentType;
            config;
            cdkConnectedOverlayPush;
            visibleChange = new X();
            get _title() {
                return this.title || this.directiveTitle || null;
            }
            get _content() {
                return this.content || this.directiveContent || null;
            }
            get _trigger() {
                return typeof this.trigger < "u" ? this.trigger : "hover";
            }
            get _placement() {
                let e = this.placement;
                return Array.isArray(e) && e.length > 0
                    ? e
                    : typeof e == "string" && e
                      ? [e]
                      : ["top"];
            }
            get _visible() {
                return (
                    (typeof this.visible < "u"
                        ? this.visible
                        : this.internalVisible) || !1
                );
            }
            get _mouseEnterDelay() {
                return this.mouseEnterDelay || 0.15;
            }
            get _mouseLeaveDelay() {
                return this.mouseLeaveDelay || 0.1;
            }
            get _overlayClassName() {
                return this.overlayClassName || null;
            }
            get _overlayStyle() {
                return this.overlayStyle || null;
            }
            get _overlayClickable() {
                return this.overlayClickable ?? !0;
            }
            internalVisible = !1;
            getProxyPropertyMap() {
                return {
                    noAnimation: ["noAnimation", () => !!this.noAnimation],
                };
            }
            component;
            destroy$ = new Y();
            triggerDisposables = [];
            delayTimer;
            elementRef = l(B);
            hostView = l(qe);
            renderer = l(oe);
            noAnimation = l(Ko, { host: !0, optional: !0 });
            nzConfigService = l(bn);
            destroyRef = l(K);
            platformId = l(Mt);
            constructor(e) {
                ((this.componentType = e),
                    this.destroyRef.onDestroy(() => {
                        (this.clearTogglingTimer(),
                            this.removeTriggerListeners());
                    }));
            }
            ngAfterViewInit() {
                Jn(this.platformId) &&
                    (this.createComponent(), this.registerTriggers());
            }
            ngOnChanges(e) {
                let { trigger: i } = e;
                (i && !i.isFirstChange() && this.registerTriggers(),
                    this.component && this.updatePropertiesByChanges(e));
            }
            show() {
                this.component?.show();
            }
            hide() {
                this.component?.hide();
            }
            updatePosition() {
                this.component && this.component.updatePosition();
            }
            createComponent() {
                let e = this.hostView.createComponent(this.componentType);
                ((this.component = e.instance),
                    this.renderer.removeChild(
                        this.renderer.parentNode(this.elementRef.nativeElement),
                        e.location.nativeElement,
                    ),
                    this.component.setOverlayOrigin(
                        this.origin || this.elementRef,
                    ),
                    this.initProperties());
                let i = this.component.nzVisibleChange.pipe(wt());
                (i.pipe(N(this.destroyRef)).subscribe((r) => {
                    ((this.internalVisible = r), this.visibleChange.emit(r));
                }),
                    i
                        .pipe(
                            J((r) => r),
                            H2(0, H1),
                            J(() => !!this.component?.overlay?.overlayRef),
                            N(this.destroyRef),
                        )
                        .subscribe(() => {
                            this.component?.updatePosition();
                        }));
            }
            registerTriggers() {
                let e = this.elementRef.nativeElement,
                    i = this.trigger;
                if ((this.removeTriggerListeners(), i === "hover")) {
                    let r;
                    (this.triggerDisposables.push(
                        this.renderer.listen(e, "mouseenter", () => {
                            this.delayEnterLeave(!0, !0, this._mouseEnterDelay);
                        }),
                    ),
                        this.triggerDisposables.push(
                            this.renderer.listen(e, "mouseleave", () => {
                                (this.delayEnterLeave(
                                    !0,
                                    !1,
                                    this._mouseLeaveDelay,
                                ),
                                    this.component?.overlay.overlayRef &&
                                        !r &&
                                        ((r =
                                            this.component.overlay.overlayRef
                                                .overlayElement),
                                        this.triggerDisposables.push(
                                            this.renderer.listen(
                                                r,
                                                "mouseenter",
                                                () => {
                                                    this.delayEnterLeave(
                                                        !1,
                                                        !0,
                                                        this._mouseEnterDelay,
                                                    );
                                                },
                                            ),
                                        ),
                                        this.triggerDisposables.push(
                                            this.renderer.listen(
                                                r,
                                                "mouseleave",
                                                () => {
                                                    this.delayEnterLeave(
                                                        !1,
                                                        !1,
                                                        this._mouseLeaveDelay,
                                                    );
                                                },
                                            ),
                                        )));
                            }),
                        ));
                } else
                    i === "focus"
                        ? (this.triggerDisposables.push(
                              this.renderer.listen(e, "focusin", () =>
                                  this.show(),
                              ),
                          ),
                          this.triggerDisposables.push(
                              this.renderer.listen(e, "focusout", () =>
                                  this.hide(),
                              ),
                          ))
                        : i === "click" &&
                          this.triggerDisposables.push(
                              this.renderer.listen(e, "click", (r) => {
                                  (r.preventDefault(), this.show());
                              }),
                          );
            }
            updatePropertiesByChanges(e) {
                this.updatePropertiesByKeys(Object.keys(e));
            }
            updatePropertiesByKeys(e) {
                let i = m(
                    {
                        title: ["nzTitle", () => this._title],
                        directiveTitle: ["nzTitle", () => this._title],
                        content: ["nzContent", () => this._content],
                        directiveContent: ["nzContent", () => this._content],
                        trigger: ["nzTrigger", () => this._trigger],
                        placement: ["nzPlacement", () => this._placement],
                        visible: ["nzVisible", () => this._visible],
                        mouseEnterDelay: [
                            "nzMouseEnterDelay",
                            () => this._mouseEnterDelay,
                        ],
                        mouseLeaveDelay: [
                            "nzMouseLeaveDelay",
                            () => this._mouseLeaveDelay,
                        ],
                        overlayClassName: [
                            "nzOverlayClassName",
                            () => this._overlayClassName,
                        ],
                        overlayStyle: [
                            "nzOverlayStyle",
                            () => this._overlayStyle,
                        ],
                        overlayClickable: [
                            "nzOverlayClickable",
                            () => this._overlayClickable,
                        ],
                        arrowPointAtCenter: [
                            "nzArrowPointAtCenter",
                            () => this.arrowPointAtCenter,
                        ],
                        cdkConnectedOverlayPush: [
                            "cdkConnectedOverlayPush",
                            () => this.cdkConnectedOverlayPush,
                        ],
                    },
                    this.getProxyPropertyMap(),
                );
                ((
                    e ||
                    Object.keys(i).filter((r) => !r.startsWith("directive"))
                ).forEach((r) => {
                    if (i[r]) {
                        let [o, a] = i[r];
                        this.updateComponentValue(o, a());
                    }
                }),
                    this.component?.updateByDirective());
            }
            initProperties() {
                this.updatePropertiesByKeys();
            }
            updateComponentValue(e, i) {
                typeof i < "u" && (this.component[e] = i);
            }
            delayEnterLeave(e, i, r = -1) {
                this.delayTimer
                    ? this.clearTogglingTimer()
                    : r > 0
                      ? (this.delayTimer = setTimeout(() => {
                            ((this.delayTimer = void 0),
                                i ? this.show() : this.hide());
                        }, r * 1e3))
                      : i && e
                        ? this.show()
                        : this.hide();
            }
            removeTriggerListeners() {
                (this.triggerDisposables.forEach((e) => e()),
                    (this.triggerDisposables.length = 0));
            }
            clearTogglingTimer() {
                this.delayTimer &&
                    (clearTimeout(this.delayTimer), (this.delayTimer = void 0));
            }
            static ɵfac = function (i) {
                return new (i || t)(w($2));
            };
            static ɵdir = D({ type: t, features: [I] });
        }
        return t;
    })(),
    Kh = (() => {
        class t {
            overlay;
            noAnimation = l(Ko, { host: !0, optional: !0 });
            directionality = l(he);
            cdr = l(ee);
            elementRef = l(B);
            destroyRef = l(K);
            nzTitle = null;
            nzContent = null;
            nzArrowPointAtCenter = !1;
            nzOverlayClassName;
            nzOverlayStyle = {};
            nzOverlayClickable = !0;
            nzBackdrop = !1;
            nzMouseEnterDelay;
            nzMouseLeaveDelay;
            cdkConnectedOverlayPush = !0;
            nzVisibleChange = new Y();
            set nzVisible(e) {
                let i = ko(e);
                this._visible !== i &&
                    ((this._visible = i), this.nzVisibleChange.next(i));
            }
            get nzVisible() {
                return this._visible;
            }
            _visible = !1;
            set nzTrigger(e) {
                this._trigger = e;
            }
            get nzTrigger() {
                return this._trigger;
            }
            _trigger = "hover";
            set nzPlacement(e) {
                let i = e.map((r) => Le[r]);
                this._positions = [...i, ...b2];
            }
            preferredPlacement = "top";
            origin;
            dir = "ltr";
            _classMap = {};
            _prefix = "ant-tooltip";
            _positions = [...b2];
            constructor() {
                this.destroyRef.onDestroy(() => {
                    this.nzVisibleChange.complete();
                });
            }
            ngOnInit() {
                (this.directionality.change
                    ?.pipe(N(this.destroyRef))
                    .subscribe((e) => {
                        ((this.dir = e), this.cdr.detectChanges());
                    }),
                    (this.dir = this.directionality.value));
            }
            show() {
                this.nzVisible ||
                    (this.isEmpty() ||
                        ((this.nzVisible = !0),
                        this.nzVisibleChange.next(!0),
                        this.cdr.detectChanges()),
                    this.origin &&
                        this.overlay &&
                        this.overlay.overlayRef &&
                        this.overlay.overlayRef.getDirection() === "rtl" &&
                        this.overlay.overlayRef.setDirection("ltr"));
            }
            hide() {
                this.nzVisible &&
                    ((this.nzVisible = !1),
                    this.nzVisibleChange.next(!1),
                    this.cdr.detectChanges());
            }
            updateByDirective() {
                (this.updateStyles(),
                    this.cdr.detectChanges(),
                    Promise.resolve().then(() => {
                        (this.updatePosition(), this.updateVisibilityByTitle());
                    }));
            }
            updatePosition() {
                this.origin &&
                    this.overlay &&
                    this.overlay.overlayRef &&
                    this.overlay.overlayRef.updatePosition();
            }
            onPositionChange(e) {
                ((this.preferredPlacement = _2(e)),
                    this.updateStyles(),
                    this.cdr.detectChanges());
            }
            setOverlayOrigin(e) {
                ((this.origin = e), this.cdr.markForCheck());
            }
            onClickOutside(e) {
                if (!this.nzOverlayClickable) return;
                let i = dt(e);
                !this.origin.nativeElement.contains(i) &&
                    this.nzTrigger !== null &&
                    this.hide();
            }
            updateVisibilityByTitle() {
                this.isEmpty() && this.hide();
            }
            updateStyles() {
                this._classMap = Z(
                    m(
                        {},
                        this.transformClassListToMap(this.nzOverlayClassName),
                    ),
                    {
                        [`${this._prefix}-placement-${this.preferredPlacement}`]:
                            !0,
                    },
                );
            }
            transformClassListToMap(e) {
                let i = {};
                return (
                    (e !== null ? e.split(/\s+/) : []).forEach(
                        (o) => (i[o] = !0),
                    ),
                    i
                );
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                viewQuery: function (i, r) {
                    if ((i & 1 && tt($h, 5), i & 2)) {
                        let o;
                        le((o = de())) && (r.overlay = o.first);
                    }
                },
            });
        }
        return t;
    })();
function Zh(t) {
    return t instanceof Ye ? !1 : t === "" || !Vt(t);
}
var b0 = (() => {
        class t extends Gh {
            title;
            titleContext = null;
            directiveTitle;
            trigger = "hover";
            placement = "top";
            origin;
            visible;
            mouseEnterDelay;
            mouseLeaveDelay;
            overlayClassName;
            overlayStyle;
            arrowPointAtCenter;
            cdkConnectedOverlayPush = !0;
            nzTooltipColor;
            directiveContent = null;
            content = null;
            overlayClickable;
            visibleChange = new X();
            constructor() {
                super(Xh);
            }
            getProxyPropertyMap() {
                return Z(m({}, super.getProxyPropertyMap()), {
                    nzTooltipColor: ["nzColor", () => this.nzTooltipColor],
                    titleContext: ["nzTitleContext", () => this.titleContext],
                });
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "nz-tooltip", ""]],
                hostVars: 2,
                hostBindings: function (i, r) {
                    i & 2 && G("ant-tooltip-open", r.visible);
                },
                inputs: {
                    title: [0, "nzTooltipTitle", "title"],
                    titleContext: [0, "nzTooltipTitleContext", "titleContext"],
                    directiveTitle: [0, "nz-tooltip", "directiveTitle"],
                    trigger: [0, "nzTooltipTrigger", "trigger"],
                    placement: [0, "nzTooltipPlacement", "placement"],
                    origin: [0, "nzTooltipOrigin", "origin"],
                    visible: [0, "nzTooltipVisible", "visible"],
                    mouseEnterDelay: [
                        0,
                        "nzTooltipMouseEnterDelay",
                        "mouseEnterDelay",
                    ],
                    mouseLeaveDelay: [
                        0,
                        "nzTooltipMouseLeaveDelay",
                        "mouseLeaveDelay",
                    ],
                    overlayClassName: [
                        0,
                        "nzTooltipOverlayClassName",
                        "overlayClassName",
                    ],
                    overlayStyle: [0, "nzTooltipOverlayStyle", "overlayStyle"],
                    arrowPointAtCenter: [
                        2,
                        "nzTooltipArrowPointAtCenter",
                        "arrowPointAtCenter",
                        _,
                    ],
                    cdkConnectedOverlayPush: [
                        2,
                        "cdkConnectedOverlayPush",
                        "cdkConnectedOverlayPush",
                        _,
                    ],
                    nzTooltipColor: "nzTooltipColor",
                },
                outputs: { visibleChange: "nzTooltipVisibleChange" },
                exportAs: ["nzTooltip"],
                features: [Se],
            });
        }
        return t;
    })(),
    Xh = (() => {
        class t extends Kh {
            nzTitle = null;
            nzTitleContext = null;
            nzColor;
            _contentStyleMap = {};
            isEmpty() {
                return Zh(this.nzTitle);
            }
            updateStyles() {
                let e = this.nzColor && To(this.nzColor);
                ((this._classMap = Z(
                    m(
                        {},
                        this.transformClassListToMap(this.nzOverlayClassName),
                    ),
                    {
                        [`${this._prefix}-placement-${this.preferredPlacement}`]:
                            !0,
                        [`${this._prefix}-${this.nzColor}`]: e,
                    },
                )),
                    (this._contentStyleMap = {
                        backgroundColor:
                            this.nzColor && !e ? this.nzColor : null,
                        "--antd-arrow-background-color": this.nzColor,
                    }));
            }
            static ɵfac = (() => {
                let e;
                return function (r) {
                    return (e || (e = Je(t)))(r || t);
                };
            })();
            static ɵcmp = R({
                type: t,
                selectors: [["nz-tooltip"]],
                exportAs: ["nzTooltipComponent"],
                features: [Se],
                decls: 2,
                vars: 5,
                consts: [
                    ["overlay", "cdkConnectedOverlay"],
                    [
                        "cdkConnectedOverlay",
                        "",
                        "nzConnectedOverlay",
                        "",
                        3,
                        "overlayOutsideClick",
                        "detach",
                        "positionChange",
                        "cdkConnectedOverlayOrigin",
                        "cdkConnectedOverlayOpen",
                        "cdkConnectedOverlayPositions",
                        "cdkConnectedOverlayPush",
                        "nzArrowPointAtCenter",
                    ],
                    [1, "ant-tooltip", 3, "nzNoAnimation"],
                    [1, "ant-tooltip-content"],
                    [1, "ant-tooltip-arrow"],
                    [1, "ant-tooltip-arrow-content"],
                    [1, "ant-tooltip-inner"],
                    [
                        4,
                        "nzStringTemplateOutlet",
                        "nzStringTemplateOutletContext",
                    ],
                ],
                template: function (i, r) {
                    if (i & 1) {
                        let o = Ht();
                        (te(0, qh, 6, 15, "ng-template", 1, 0, Dn),
                            ve("overlayOutsideClick", function (s) {
                                return (Ae(o), Ve(r.onClickOutside(s)));
                            })("detach", function () {
                                return (Ae(o), Ve(r.hide()));
                            })("positionChange", function (s) {
                                return (Ae(o), Ve(r.onPositionChange(s)));
                            }));
                    }
                    i & 2 &&
                        y("cdkConnectedOverlayOrigin", r.origin)(
                            "cdkConnectedOverlayOpen",
                            r._visible,
                        )("cdkConnectedOverlayPositions", r._positions)(
                            "cdkConnectedOverlayPush",
                            r.cdkConnectedOverlayPush,
                        )("nzArrowPointAtCenter", r.nzArrowPointAtCenter);
                },
                dependencies: [C2, Xi, Ko, bt, Ze, C0, z0],
                encapsulation: 2,
                data: { animation: [q8] },
                changeDetection: 0,
            });
        }
        return t;
    })();
var w2 = ["*"],
    Qh = (t) => [t],
    Jh = (t) => ({ $implicit: t });
function eu(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(2);
        (u(), se(e.innerTip));
    }
}
function tu(t, n) {
    if (
        (t & 1 &&
            (z(0, "div", 2)(1, "div", 4),
            te(2, eu, 2, 1, "ng-container", 5),
            C()()),
        t & 2)
    ) {
        let e = g();
        (y("@helpMotion", void 0),
            u(),
            cn(Sn(5, Qh, "ant-form-item-explain-" + e.status)),
            u(),
            y("nzStringTemplateOutlet", e.innerTip)(
                "nzStringTemplateOutletContext",
                Sn(7, Jh, e.validateControl),
            ));
    }
}
function nu(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(2);
        (u(), se(e.nzExtra));
    }
}
function iu(t, n) {
    if (
        (t & 1 && (z(0, "div", 3), te(1, nu, 2, 1, "ng-container", 6), C()),
        t & 2)
    ) {
        let e = g();
        (u(), y("nzStringTemplateOutlet", e.nzExtra));
    }
}
function ru(t, n) {
    if ((t & 1 && (Fe(0), W(1, "nz-icon", 2), He()), t & 2)) {
        let e = n.$implicit,
            i = g(2);
        (u(), y("nzType", e)("nzTheme", i.tooltipIcon.theme));
    }
}
function ou(t, n) {
    if (
        (t & 1 && (z(0, "span", 0), te(1, ru, 2, 2, "ng-container", 1), C()),
        t & 2)
    ) {
        let e = g();
        (y("nzTooltipTitle", e.nzTooltipTitle),
            u(),
            y("nzStringTemplateOutlet", e.tooltipIcon.type));
    }
}
var Qi = (() => {
        class t {
            cdr = l(ee);
            status = "";
            hasFeedback = !1;
            withHelpClass = !1;
            setWithHelpViaTips(e) {
                ((this.withHelpClass = e), this.cdr.markForCheck());
            }
            setStatus(e) {
                ((this.status = e), this.cdr.markForCheck());
            }
            setHasFeedback(e) {
                ((this.hasFeedback = e), this.cdr.markForCheck());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-form-item"]],
                hostAttrs: [1, "ant-form-item"],
                hostVars: 12,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-form-item-has-success", r.status === "success")(
                            "ant-form-item-has-warning",
                            r.status === "warning",
                        )("ant-form-item-has-error", r.status === "error")(
                            "ant-form-item-is-validating",
                            r.status === "validating",
                        )(
                            "ant-form-item-has-feedback",
                            r.hasFeedback && r.status,
                        )("ant-form-item-with-help", r.withHelpClass);
                },
                exportAs: ["nzFormItem"],
                ngContentSelectors: w2,
                decls: 1,
                vars: 0,
                template: function (i, r) {
                    i & 1 && (be(), _e(0));
                },
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    au = "form",
    M2 = { type: "question-circle", theme: "outline" },
    k1 = (() => {
        var v;
        let t,
            n = [],
            e = [],
            i,
            r = [],
            o = [],
            a,
            s = [],
            c = [],
            d,
            h = [],
            f = [];
        return (
            (v = class {
                destroyRef = l(K);
                directionality = l(he);
                _nzModuleName = au;
                nzLayout = "horizontal";
                nzNoColon = pe(this, n, !1);
                nzAutoTips = (pe(this, e), pe(this, r, {}));
                nzDisableAutoTips = (pe(this, o), !1);
                nzTooltipIcon = pe(this, s, M2);
                nzLabelAlign = (pe(this, c), "right");
                nzLabelWrap = pe(this, h, !1);
                dir = (pe(this, f), "ltr");
                inputChanges$ = new Y();
                getInputObservable(F) {
                    return this.inputChanges$.pipe(
                        J((T) => F in T),
                        L((T) => T[F]),
                    );
                }
                constructor() {
                    ((this.dir = this.directionality.value),
                        this.directionality.change?.pipe(N()).subscribe((F) => {
                            this.dir = F;
                        }),
                        this.destroyRef.onDestroy(() => {
                            this.inputChanges$.complete();
                        }));
                }
                ngOnChanges(F) {
                    this.inputChanges$.next(F);
                }
            }),
            (() => {
                let F =
                    typeof Symbol == "function" && Symbol.metadata
                        ? Object.create(null)
                        : void 0;
                ((t = [ct()]),
                    (i = [ct()]),
                    (a = [ct()]),
                    (d = [ct()]),
                    Qe(
                        null,
                        null,
                        t,
                        {
                            kind: "field",
                            name: "nzNoColon",
                            static: !1,
                            private: !1,
                            access: {
                                has: (T) => "nzNoColon" in T,
                                get: (T) => T.nzNoColon,
                                set: (T, H) => {
                                    T.nzNoColon = H;
                                },
                            },
                            metadata: F,
                        },
                        n,
                        e,
                    ),
                    Qe(
                        null,
                        null,
                        i,
                        {
                            kind: "field",
                            name: "nzAutoTips",
                            static: !1,
                            private: !1,
                            access: {
                                has: (T) => "nzAutoTips" in T,
                                get: (T) => T.nzAutoTips,
                                set: (T, H) => {
                                    T.nzAutoTips = H;
                                },
                            },
                            metadata: F,
                        },
                        r,
                        o,
                    ),
                    Qe(
                        null,
                        null,
                        a,
                        {
                            kind: "field",
                            name: "nzTooltipIcon",
                            static: !1,
                            private: !1,
                            access: {
                                has: (T) => "nzTooltipIcon" in T,
                                get: (T) => T.nzTooltipIcon,
                                set: (T, H) => {
                                    T.nzTooltipIcon = H;
                                },
                            },
                            metadata: F,
                        },
                        s,
                        c,
                    ),
                    Qe(
                        null,
                        null,
                        d,
                        {
                            kind: "field",
                            name: "nzLabelWrap",
                            static: !1,
                            private: !1,
                            access: {
                                has: (T) => "nzLabelWrap" in T,
                                get: (T) => T.nzLabelWrap,
                                set: (T, H) => {
                                    T.nzLabelWrap = H;
                                },
                            },
                            metadata: F,
                        },
                        h,
                        f,
                    ),
                    F &&
                        Object.defineProperty(v, Symbol.metadata, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: F,
                        }));
            })(),
            ut(v, "\u0275fac", function (T) {
                return new (T || v)();
            }),
            ut(
                v,
                "\u0275dir",
                D({
                    type: v,
                    selectors: [["", "nz-form", ""]],
                    hostAttrs: [1, "ant-form"],
                    hostVars: 8,
                    hostBindings: function (T, H) {
                        T & 2 &&
                            G(
                                "ant-form-horizontal",
                                H.nzLayout === "horizontal",
                            )("ant-form-vertical", H.nzLayout === "vertical")(
                                "ant-form-inline",
                                H.nzLayout === "inline",
                            )("ant-form-rtl", H.dir === "rtl");
                    },
                    inputs: {
                        nzLayout: "nzLayout",
                        nzNoColon: [2, "nzNoColon", "nzNoColon", _],
                        nzAutoTips: "nzAutoTips",
                        nzDisableAutoTips: [
                            2,
                            "nzDisableAutoTips",
                            "nzDisableAutoTips",
                            _,
                        ],
                        nzTooltipIcon: "nzTooltipIcon",
                        nzLabelAlign: "nzLabelAlign",
                        nzLabelWrap: [2, "nzLabelWrap", "nzLabelWrap", _],
                    },
                    exportAs: ["nzForm"],
                    features: [I],
                }),
            ),
            v
        );
    })(),
    Ji = (() => {
        class t {
            cdr = l(ee);
            i18n = l(K8);
            nzFormStatusService = l(T1);
            destroyRef = l(K);
            _hasFeedback = !1;
            validateChanges = mt.EMPTY;
            validateString = null;
            localeId;
            autoErrorTip;
            get disableAutoTips() {
                return this.nzDisableAutoTips !== void 0
                    ? ko(this.nzDisableAutoTips)
                    : !!this.nzFormDirective?.nzDisableAutoTips;
            }
            status = "";
            validateControl = null;
            innerTip = null;
            defaultValidateControl;
            nzSuccessTip;
            nzWarningTip;
            nzErrorTip;
            nzValidatingTip;
            nzExtra;
            nzAutoTips = {};
            nzDisableAutoTips;
            set nzHasFeedback(e) {
                ((this._hasFeedback = e),
                    this.nzFormStatusService.formStatusChanges.next({
                        status: this.status,
                        hasFeedback: this._hasFeedback,
                    }),
                    this.nzFormItemComponent &&
                        this.nzFormItemComponent.setHasFeedback(
                            this._hasFeedback,
                        ));
            }
            get nzHasFeedback() {
                return this._hasFeedback;
            }
            set nzValidateStatus(e) {
                e instanceof vn || e instanceof H4
                    ? ((this.validateControl = e),
                      (this.validateString = null),
                      this.watchControl())
                    : e instanceof Nn
                      ? ((this.validateControl = e.control),
                        (this.validateString = null),
                        this.watchControl())
                      : ((this.validateString = e),
                        (this.validateControl = null),
                        this.setStatus());
            }
            watchControl() {
                (this.validateChanges.unsubscribe(),
                    this.validateControl &&
                        this.validateControl.statusChanges &&
                        (this.validateChanges =
                            this.validateControl.statusChanges
                                .pipe(vt(null), N(this.destroyRef))
                                .subscribe(() => {
                                    (this.disableAutoTips ||
                                        this.updateAutoErrorTip(),
                                        this.setStatus(),
                                        this.cdr.markForCheck());
                                })));
            }
            setStatus() {
                ((this.status = this.getControlStatus(this.validateString)),
                    (this.innerTip = this.getInnerTip(this.status)),
                    this.nzFormStatusService.formStatusChanges.next({
                        status: this.status,
                        hasFeedback: this.nzHasFeedback,
                    }),
                    this.nzFormItemComponent &&
                        (this.nzFormItemComponent.setWithHelpViaTips(
                            !!this.innerTip,
                        ),
                        this.nzFormItemComponent.setStatus(this.status)));
            }
            getControlStatus(e) {
                let i;
                return (
                    e === "warning" ||
                    this.validateControlStatus("INVALID", "warning")
                        ? (i = "warning")
                        : e === "error" || this.validateControlStatus("INVALID")
                          ? (i = "error")
                          : e === "validating" ||
                              e === "pending" ||
                              this.validateControlStatus("PENDING")
                            ? (i = "validating")
                            : e === "success" ||
                                this.validateControlStatus("VALID")
                              ? (i = "success")
                              : (i = ""),
                    i
                );
            }
            validateControlStatus(e, i) {
                if (this.validateControl) {
                    let {
                        dirty: r,
                        touched: o,
                        status: a,
                    } = this.validateControl;
                    return (
                        (!!r || !!o) &&
                        (i ? this.validateControl.hasError(i) : a === e)
                    );
                } else return !1;
            }
            getInnerTip(e) {
                switch (e) {
                    case "error":
                        return (
                            (!this.disableAutoTips && this.autoErrorTip) ||
                            this.nzErrorTip ||
                            null
                        );
                    case "validating":
                        return this.nzValidatingTip || null;
                    case "success":
                        return this.nzSuccessTip || null;
                    case "warning":
                        return this.nzWarningTip || null;
                    default:
                        return null;
                }
            }
            updateAutoErrorTip() {
                if (this.validateControl) {
                    let e = this.validateControl.errors || {},
                        i = "";
                    for (let r in e)
                        if (
                            (e.hasOwnProperty(r) &&
                                (i =
                                    e[r]?.[this.localeId] ??
                                    this.nzAutoTips?.[this.localeId]?.[r] ??
                                    this.nzAutoTips.default?.[r] ??
                                    this.nzFormDirective?.nzAutoTips?.[
                                        this.localeId
                                    ]?.[r] ??
                                    this.nzFormDirective?.nzAutoTips.default?.[
                                        r
                                    ]),
                            i)
                        )
                            break;
                    this.autoErrorTip = i;
                }
            }
            subscribeAutoTips(e) {
                e?.pipe(N(this.destroyRef)).subscribe(() => {
                    this.disableAutoTips ||
                        (this.updateAutoErrorTip(),
                        this.setStatus(),
                        this.cdr.markForCheck());
                });
            }
            nzFormItemComponent = l(Qi, { host: !0, optional: !0 });
            nzFormDirective = l(k1, { optional: !0 });
            constructor() {
                (this.subscribeAutoTips(
                    this.i18n.localeChange.pipe(
                        me((e) => (this.localeId = e.locale)),
                    ),
                ),
                    this.subscribeAutoTips(
                        this.nzFormDirective?.getInputObservable("nzAutoTips"),
                    ),
                    this.subscribeAutoTips(
                        this.nzFormDirective
                            ?.getInputObservable("nzDisableAutoTips")
                            .pipe(J(() => this.nzDisableAutoTips === void 0)),
                    ));
            }
            ngOnChanges(e) {
                let {
                    nzDisableAutoTips: i,
                    nzAutoTips: r,
                    nzSuccessTip: o,
                    nzWarningTip: a,
                    nzErrorTip: s,
                    nzValidatingTip: c,
                } = e;
                i || r
                    ? (this.updateAutoErrorTip(), this.setStatus())
                    : (o || a || s || c) && this.setStatus();
            }
            ngOnInit() {
                this.setStatus();
            }
            ngAfterContentInit() {
                !this.validateControl &&
                    !this.validateString &&
                    (this.defaultValidateControl instanceof Di
                        ? (this.nzValidateStatus =
                              this.defaultValidateControl.control)
                        : (this.nzValidateStatus =
                              this.defaultValidateControl));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-form-control"]],
                contentQueries: function (i, r, o) {
                    if ((i & 1 && et(o, st, 5), i & 2)) {
                        let a;
                        le((a = de())) && (r.defaultValidateControl = a.first);
                    }
                },
                hostAttrs: [1, "ant-form-item-control"],
                inputs: {
                    nzSuccessTip: "nzSuccessTip",
                    nzWarningTip: "nzWarningTip",
                    nzErrorTip: "nzErrorTip",
                    nzValidatingTip: "nzValidatingTip",
                    nzExtra: "nzExtra",
                    nzAutoTips: "nzAutoTips",
                    nzDisableAutoTips: [
                        2,
                        "nzDisableAutoTips",
                        "nzDisableAutoTips",
                        _,
                    ],
                    nzHasFeedback: [2, "nzHasFeedback", "nzHasFeedback", _],
                    nzValidateStatus: "nzValidateStatus",
                },
                exportAs: ["nzFormControl"],
                features: [we([T1]), I],
                ngContentSelectors: w2,
                decls: 5,
                vars: 2,
                consts: [
                    [1, "ant-form-item-control-input"],
                    [1, "ant-form-item-control-input-content"],
                    [
                        1,
                        "ant-form-item-explain",
                        "ant-form-item-explain-connected",
                    ],
                    [1, "ant-form-item-extra"],
                    ["role", "alert"],
                    [
                        4,
                        "nzStringTemplateOutlet",
                        "nzStringTemplateOutletContext",
                    ],
                    [4, "nzStringTemplateOutlet"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (be(),
                        z(0, "div", 0)(1, "div", 1),
                        _e(2),
                        C()(),
                        E(3, tu, 3, 9, "div", 2),
                        E(4, iu, 2, 1, "div", 3)),
                        i & 2 &&
                            (u(3),
                            P(r.innerTip ? 3 : -1),
                            u(),
                            P(r.nzExtra ? 4 : -1)));
                },
                dependencies: [bt, Ze],
                encapsulation: 2,
                data: { animation: [W8] },
                changeDetection: 0,
            });
        }
        return t;
    })();
function _0(t) {
    let n = typeof t == "string" ? { type: t } : t;
    return m(m({}, M2), n);
}
var er = (() => {
    class t {
        cdr = l(ee);
        nzFor;
        nzRequired = !1;
        set nzNoColon(e) {
            this.noColon = e;
        }
        get nzNoColon() {
            return this.noColon !== "default"
                ? this.noColon
                : !!this.nzFormDirective?.nzNoColon;
        }
        noColon = "default";
        nzTooltipTitle;
        set nzTooltipIcon(e) {
            this._tooltipIcon = _0(e);
        }
        get tooltipIcon() {
            return this._tooltipIcon !== "default"
                ? this._tooltipIcon
                : _0(this.nzFormDirective?.nzTooltipIcon || M2);
        }
        _tooltipIcon = "default";
        set nzLabelAlign(e) {
            this.labelAlign = e;
        }
        get nzLabelAlign() {
            return this.labelAlign !== "default"
                ? this.labelAlign
                : this.nzFormDirective?.nzLabelAlign || "right";
        }
        labelAlign = "default";
        set nzLabelWrap(e) {
            this.labelWrap = e;
        }
        get nzLabelWrap() {
            return this.labelWrap !== "default"
                ? this.labelWrap
                : !!this.nzFormDirective?.nzLabelWrap;
        }
        labelWrap = "default";
        nzFormDirective = l(k1, { skipSelf: !0, optional: !0 });
        constructor() {
            this.nzFormDirective &&
                (this.nzFormDirective
                    .getInputObservable("nzNoColon")
                    .pipe(
                        J(() => this.noColon === "default"),
                        N(),
                    )
                    .subscribe(() => this.cdr.markForCheck()),
                this.nzFormDirective
                    .getInputObservable("nzTooltipIcon")
                    .pipe(
                        J(() => this._tooltipIcon === "default"),
                        N(),
                    )
                    .subscribe(() => this.cdr.markForCheck()),
                this.nzFormDirective
                    .getInputObservable("nzLabelAlign")
                    .pipe(
                        J(() => this.labelAlign === "default"),
                        N(),
                    )
                    .subscribe(() => this.cdr.markForCheck()),
                this.nzFormDirective
                    .getInputObservable("nzLabelWrap")
                    .pipe(
                        J(() => this.labelWrap === "default"),
                        N(),
                    )
                    .subscribe(() => this.cdr.markForCheck()));
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵcmp = R({
            type: t,
            selectors: [["nz-form-label"]],
            hostAttrs: [1, "ant-form-item-label"],
            hostVars: 4,
            hostBindings: function (i, r) {
                i & 2 &&
                    G("ant-form-item-label-left", r.nzLabelAlign === "left")(
                        "ant-form-item-label-wrap",
                        r.nzLabelWrap,
                    );
            },
            inputs: {
                nzFor: "nzFor",
                nzRequired: [2, "nzRequired", "nzRequired", _],
                nzNoColon: [2, "nzNoColon", "nzNoColon", _],
                nzTooltipTitle: "nzTooltipTitle",
                nzTooltipIcon: "nzTooltipIcon",
                nzLabelAlign: "nzLabelAlign",
                nzLabelWrap: [2, "nzLabelWrap", "nzLabelWrap", _],
            },
            exportAs: ["nzFormLabel"],
            ngContentSelectors: w2,
            decls: 3,
            vars: 6,
            consts: [
                [
                    "nz-tooltip",
                    "",
                    1,
                    "ant-form-item-tooltip",
                    3,
                    "nzTooltipTitle",
                ],
                [4, "nzStringTemplateOutlet"],
                [3, "nzType", "nzTheme"],
            ],
            template: function (i, r) {
                (i & 1 &&
                    (be(),
                    z(0, "label"),
                    _e(1),
                    E(2, ou, 2, 2, "span", 0),
                    C()),
                    i & 2 &&
                        (G("ant-form-item-no-colon", r.nzNoColon)(
                            "ant-form-item-required",
                            r.nzRequired,
                        ),
                        Dt("for", r.nzFor),
                        u(2),
                        P(r.nzTooltipTitle ? 2 : -1)));
            },
            dependencies: [bt, Ze, b0, Wt, Ct],
            encapsulation: 2,
            changeDetection: 0,
        });
    }
    return t;
})();
var Xo = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({ imports: [er, Ji, U8] });
    }
    return t;
})();
function M0(t) {
    return t.buttons === 0 || t.detail === 0;
}
function S0(t) {
    let n =
        (t.touches && t.touches[0]) ||
        (t.changedTouches && t.changedTouches[0]);
    return (
        !!n &&
        n.identifier === -1 &&
        (n.radiusX == null || n.radiusX === 1) &&
        (n.radiusY == null || n.radiusY === 1)
    );
}
var D0 = new b("cdk-input-modality-detector-options"),
    x0 = { ignoreKeys: [18, 17, 224, 91, 16] },
    T0 = 650,
    S2 = { passive: !0, capture: !0 },
    k0 = (() => {
        class t {
            _platform = l(ye);
            _listenerCleanups;
            modalityDetected;
            modalityChanged;
            get mostRecentModality() {
                return this._modality.value;
            }
            _mostRecentTarget = null;
            _modality = new Te(null);
            _options;
            _lastTouchMs = 0;
            _onKeydown = (e) => {
                this._options?.ignoreKeys?.some((i) => i === e.keyCode) ||
                    (this._modality.next("keyboard"),
                    (this._mostRecentTarget = dt(e)));
            };
            _onMousedown = (e) => {
                Date.now() - this._lastTouchMs < T0 ||
                    (this._modality.next(M0(e) ? "keyboard" : "mouse"),
                    (this._mostRecentTarget = dt(e)));
            };
            _onTouchstart = (e) => {
                if (S0(e)) {
                    this._modality.next("keyboard");
                    return;
                }
                ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = dt(e)));
            };
            constructor() {
                let e = l(q),
                    i = l(U),
                    r = l(D0, { optional: !0 });
                if (
                    ((this._options = m(m({}, x0), r)),
                    (this.modalityDetected = this._modality.pipe(L2(1))),
                    (this.modalityChanged = this.modalityDetected.pipe(wt())),
                    this._platform.isBrowser)
                ) {
                    let o = l(Me).createRenderer(null, null);
                    this._listenerCleanups = e.runOutsideAngular(() => [
                        o.listen(i, "keydown", this._onKeydown, S2),
                        o.listen(i, "mousedown", this._onMousedown, S2),
                        o.listen(i, "touchstart", this._onTouchstart, S2),
                    ]);
                }
            }
            ngOnDestroy() {
                (this._modality.complete(),
                    this._listenerCleanups?.forEach((e) => e()));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    tr = (function (t) {
        return (
            (t[(t.IMMEDIATE = 0)] = "IMMEDIATE"),
            (t[(t.EVENTUAL = 1)] = "EVENTUAL"),
            t
        );
    })(tr || {}),
    E0 = new b("cdk-focus-monitor-default-options"),
    Qo = A6({ passive: !0, capture: !0 }),
    E1 = (() => {
        class t {
            _ngZone = l(q);
            _platform = l(ye);
            _inputModalityDetector = l(k0);
            _origin = null;
            _lastFocusOrigin;
            _windowFocused = !1;
            _windowFocusTimeoutId;
            _originTimeoutId;
            _originFromTouchInteraction = !1;
            _elementInfo = new Map();
            _monitoredElementCount = 0;
            _rootNodeFocusListenerCount = new Map();
            _detectionMode;
            _windowFocusListener = () => {
                ((this._windowFocused = !0),
                    (this._windowFocusTimeoutId = setTimeout(
                        () => (this._windowFocused = !1),
                    )));
            };
            _document = l(U);
            _stopInputModalityDetector = new Y();
            constructor() {
                let e = l(E0, { optional: !0 });
                this._detectionMode = e?.detectionMode || tr.IMMEDIATE;
            }
            _rootNodeFocusAndBlurListener = (e) => {
                let i = dt(e);
                for (let r = i; r; r = r.parentElement)
                    e.type === "focus"
                        ? this._onFocus(e, r)
                        : this._onBlur(e, r);
            };
            monitor(e, i = !1) {
                let r = S1(e);
                if (!this._platform.isBrowser || r.nodeType !== 1) return S();
                let o = t2(r) || this._document,
                    a = this._elementInfo.get(r);
                if (a) return (i && (a.checkChildren = !0), a.subject);
                let s = { checkChildren: i, subject: new Y(), rootNode: o };
                return (
                    this._elementInfo.set(r, s),
                    this._registerGlobalListeners(s),
                    s.subject
                );
            }
            stopMonitoring(e) {
                let i = S1(e),
                    r = this._elementInfo.get(i);
                r &&
                    (r.subject.complete(),
                    this._setClasses(i),
                    this._elementInfo.delete(i),
                    this._removeGlobalListeners(r));
            }
            focusVia(e, i, r) {
                let o = S1(e),
                    a = this._document.activeElement;
                o === a
                    ? this._getClosestElementsInfo(o).forEach(([s, c]) =>
                          this._originChanged(s, i, c),
                      )
                    : (this._setOrigin(i),
                      typeof o.focus == "function" && o.focus(r));
            }
            ngOnDestroy() {
                this._elementInfo.forEach((e, i) => this.stopMonitoring(i));
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _getFocusOrigin(e) {
                return this._origin
                    ? this._originFromTouchInteraction
                        ? this._shouldBeAttributedToTouch(e)
                            ? "touch"
                            : "program"
                        : this._origin
                    : this._windowFocused && this._lastFocusOrigin
                      ? this._lastFocusOrigin
                      : e && this._isLastInteractionFromInputLabel(e)
                        ? "mouse"
                        : "program";
            }
            _shouldBeAttributedToTouch(e) {
                return (
                    this._detectionMode === tr.EVENTUAL ||
                    !!e?.contains(this._inputModalityDetector._mostRecentTarget)
                );
            }
            _setClasses(e, i) {
                (e.classList.toggle("cdk-focused", !!i),
                    e.classList.toggle("cdk-touch-focused", i === "touch"),
                    e.classList.toggle(
                        "cdk-keyboard-focused",
                        i === "keyboard",
                    ),
                    e.classList.toggle("cdk-mouse-focused", i === "mouse"),
                    e.classList.toggle("cdk-program-focused", i === "program"));
            }
            _setOrigin(e, i = !1) {
                this._ngZone.runOutsideAngular(() => {
                    if (
                        ((this._origin = e),
                        (this._originFromTouchInteraction = e === "touch" && i),
                        this._detectionMode === tr.IMMEDIATE)
                    ) {
                        clearTimeout(this._originTimeoutId);
                        let r = this._originFromTouchInteraction ? T0 : 1;
                        this._originTimeoutId = setTimeout(
                            () => (this._origin = null),
                            r,
                        );
                    }
                });
            }
            _onFocus(e, i) {
                let r = this._elementInfo.get(i),
                    o = dt(e);
                !r ||
                    (!r.checkChildren && i !== o) ||
                    this._originChanged(i, this._getFocusOrigin(o), r);
            }
            _onBlur(e, i) {
                let r = this._elementInfo.get(i);
                !r ||
                    (r.checkChildren &&
                        e.relatedTarget instanceof Node &&
                        i.contains(e.relatedTarget)) ||
                    (this._setClasses(i), this._emitOrigin(r, null));
            }
            _emitOrigin(e, i) {
                e.subject.observers.length &&
                    this._ngZone.run(() => e.subject.next(i));
            }
            _registerGlobalListeners(e) {
                if (!this._platform.isBrowser) return;
                let i = e.rootNode,
                    r = this._rootNodeFocusListenerCount.get(i) || 0;
                (r ||
                    this._ngZone.runOutsideAngular(() => {
                        (i.addEventListener(
                            "focus",
                            this._rootNodeFocusAndBlurListener,
                            Qo,
                        ),
                            i.addEventListener(
                                "blur",
                                this._rootNodeFocusAndBlurListener,
                                Qo,
                            ));
                    }),
                    this._rootNodeFocusListenerCount.set(i, r + 1),
                    ++this._monitoredElementCount === 1 &&
                        (this._ngZone.runOutsideAngular(() => {
                            this._getWindow().addEventListener(
                                "focus",
                                this._windowFocusListener,
                            );
                        }),
                        this._inputModalityDetector.modalityDetected
                            .pipe(on(this._stopInputModalityDetector))
                            .subscribe((o) => {
                                this._setOrigin(o, !0);
                            })));
            }
            _removeGlobalListeners(e) {
                let i = e.rootNode;
                if (this._rootNodeFocusListenerCount.has(i)) {
                    let r = this._rootNodeFocusListenerCount.get(i);
                    r > 1
                        ? this._rootNodeFocusListenerCount.set(i, r - 1)
                        : (i.removeEventListener(
                              "focus",
                              this._rootNodeFocusAndBlurListener,
                              Qo,
                          ),
                          i.removeEventListener(
                              "blur",
                              this._rootNodeFocusAndBlurListener,
                              Qo,
                          ),
                          this._rootNodeFocusListenerCount.delete(i));
                }
                --this._monitoredElementCount ||
                    (this._getWindow().removeEventListener(
                        "focus",
                        this._windowFocusListener,
                    ),
                    this._stopInputModalityDetector.next(),
                    clearTimeout(this._windowFocusTimeoutId),
                    clearTimeout(this._originTimeoutId));
            }
            _originChanged(e, i, r) {
                (this._setClasses(e, i),
                    this._emitOrigin(r, i),
                    (this._lastFocusOrigin = i));
            }
            _getClosestElementsInfo(e) {
                let i = [];
                return (
                    this._elementInfo.forEach((r, o) => {
                        (o === e || (r.checkChildren && o.contains(e))) &&
                            i.push([o, r]);
                    }),
                    i
                );
            }
            _isLastInteractionFromInputLabel(e) {
                let { _mostRecentTarget: i, mostRecentModality: r } =
                    this._inputModalityDetector;
                if (
                    r !== "mouse" ||
                    !i ||
                    i === e ||
                    (e.nodeName !== "INPUT" && e.nodeName !== "TEXTAREA") ||
                    e.disabled
                )
                    return !1;
                let o = e.labels;
                if (o) {
                    for (let a = 0; a < o.length; a++)
                        if (o[a].contains(i)) return !0;
                }
                return !1;
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var cu = ["nz-input-group-slot", ""],
    P0 = ["*"];
function lu(t, n) {
    if ((t & 1 && W(0, "nz-icon", 0), t & 2)) {
        let e = g();
        y("nzType", e.icon);
    }
}
function du(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g();
        (u(), se(e.template));
    }
}
function hu(t, n) {
    if ((t & 1 && W(0, "span", 3), t & 2)) {
        let e = g(2);
        y("icon", e.nzAddOnBeforeIcon)("template", e.nzAddOnBefore);
    }
}
function uu(t, n) {}
function mu(t, n) {
    if (
        (t & 1 && (z(0, "span", 6), te(1, uu, 0, 0, "ng-template", 5), C()),
        t & 2)
    ) {
        let e = g(2),
            i = sn(3);
        (cn(e.affixInGroupStatusCls),
            G("ant-input-affix-wrapper-disabled", e.disabled)(
                "ant-input-affix-wrapper-sm",
                e.isSmall,
            )("ant-input-affix-wrapper-lg", e.isLarge)(
                "ant-input-affix-wrapper-focused",
                e.focused,
            ),
            u(),
            y("ngTemplateOutlet", i));
    }
}
function pu(t, n) {}
function fu(t, n) {
    if ((t & 1 && te(0, pu, 0, 0, "ng-template", 5), t & 2)) {
        g(2);
        let e = sn(5);
        y("ngTemplateOutlet", e);
    }
}
function vu(t, n) {
    if ((t & 1 && W(0, "span", 3), t & 2)) {
        let e = g(2);
        y("icon", e.nzAddOnAfterIcon)("template", e.nzAddOnAfter);
    }
}
function gu(t, n) {
    if (
        (t & 1 &&
            (z(0, "span", 2),
            E(1, hu, 1, 2, "span", 3),
            E(2, mu, 2, 11, "span", 4)(3, fu, 1, 1, null, 5),
            E(4, vu, 1, 2, "span", 3),
            C()),
        t & 2)
    ) {
        let e = g();
        (u(),
            P(e.nzAddOnBefore || e.nzAddOnBeforeIcon ? 1 : -1),
            u(),
            P(e.isAffix || e.hasFeedback ? 2 : 3),
            u(2),
            P(e.nzAddOnAfter || e.nzAddOnAfterIcon ? 4 : -1));
    }
}
function yu(t, n) {}
function zu(t, n) {
    if ((t & 1 && te(0, yu, 0, 0, "ng-template", 5), t & 2)) {
        g(2);
        let e = sn(3);
        y("ngTemplateOutlet", e);
    }
}
function Cu(t, n) {}
function bu(t, n) {
    if ((t & 1 && te(0, Cu, 0, 0, "ng-template", 5), t & 2)) {
        g(2);
        let e = sn(5);
        y("ngTemplateOutlet", e);
    }
}
function _u(t, n) {
    if ((t & 1 && E(0, zu, 1, 1, null, 5)(1, bu, 1, 1, null, 5), t & 2)) {
        let e = g();
        P(e.isAffix ? 0 : 1);
    }
}
function wu(t, n) {
    if ((t & 1 && W(0, "span", 7), t & 2)) {
        let e = g(2);
        y("icon", e.nzPrefixIcon)("template", e.nzPrefix);
    }
}
function Mu(t, n) {}
function Su(t, n) {
    if ((t & 1 && W(0, "nz-form-item-feedback-icon", 9), t & 2)) {
        let e = g(3);
        y("status", e.status);
    }
}
function Du(t, n) {
    if (
        (t & 1 &&
            (z(0, "span", 8),
            E(1, Su, 1, 1, "nz-form-item-feedback-icon", 9),
            C()),
        t & 2)
    ) {
        let e = g(2);
        (y("icon", e.nzSuffixIcon)("template", e.nzSuffix),
            u(),
            P(e.isFeedback ? 1 : -1));
    }
}
function xu(t, n) {
    if (
        (t & 1 &&
            (E(0, wu, 1, 2, "span", 7),
            te(1, Mu, 0, 0, "ng-template", 5),
            E(2, Du, 2, 3, "span", 8)),
        t & 2)
    ) {
        let e = g(),
            i = sn(5);
        (P(e.nzPrefix || e.nzPrefixIcon ? 0 : -1),
            u(),
            y("ngTemplateOutlet", i),
            u(),
            P(e.nzSuffix || e.nzSuffixIcon || e.isFeedback ? 2 : -1));
    }
}
function Tu(t, n) {
    if (
        (t & 1 &&
            (z(0, "span", 10), W(1, "nz-form-item-feedback-icon", 9), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("status", e.status));
    }
}
function ku(t, n) {
    if ((t & 1 && (_e(0), E(1, Tu, 2, 1, "span", 10)), t & 2)) {
        let e = g();
        (u(), P(!e.isAddOn && !e.isAffix && e.isFeedback ? 1 : -1));
    }
}
var Eu = ["otpInput"];
function Pu(t, n) {
    if (t & 1) {
        let e = Ht();
        (z(0, "input", 2, 0),
            ve("input", function (r) {
                let o = Ae(e).$index,
                    a = g();
                return Ve(a.onInput(o, r));
            })("focus", function (r) {
                Ae(e);
                let o = g();
                return Ve(o.onFocus(r));
            })("keydown", function (r) {
                let o = Ae(e).$index,
                    a = g();
                return Ve(a.onKeyDown(o, r));
            })("paste", function (r) {
                let o = Ae(e).$index,
                    a = g();
                return Ve(a.onPaste(o, r));
            }),
            C());
    }
    if (t & 2) {
        let e = n.$implicit,
            i = g();
        y("nzSize", i.nzSize)("formControl", e)("nzStatus", i.nzStatus);
    }
}
var A0 = (() => {
        class t {
            icon = null;
            type = null;
            template = null;
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["", "nz-input-group-slot", ""]],
                hostVars: 6,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-input-group-addon", r.type === "addon")(
                            "ant-input-prefix",
                            r.type === "prefix",
                        )("ant-input-suffix", r.type === "suffix");
                },
                inputs: { icon: "icon", type: "type", template: "template" },
                attrs: cu,
                ngContentSelectors: P0,
                decls: 3,
                vars: 2,
                consts: [
                    [3, "nzType"],
                    [4, "nzStringTemplateOutlet"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (be(),
                        E(0, lu, 1, 1, "nz-icon", 0),
                        te(1, du, 2, 1, "ng-container", 1),
                        _e(2)),
                        i & 2 &&
                            (P(r.icon ? 0 : -1),
                            u(),
                            y("nzStringTemplateOutlet", r.template)));
                },
                dependencies: [Wt, Ct, bt, Ze],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    P1 = (() => {
        class t {
            renderer = l(oe);
            elementRef = l(B);
            hostView = l(qe);
            directionality = l(he);
            compactSize = l(Li, { optional: !0 });
            destroyRef = l(K);
            nzFormStatusService = l(T1, { optional: !0 });
            nzFormNoStatusService = l(Ro, { optional: !0 });
            focusMonitor = l(E1);
            nzBorderless = !1;
            nzVariant = "outlined";
            nzSize = "default";
            nzStepperless = !0;
            nzStatus = "";
            get disabled() {
                return this.ngControl && this.ngControl.disabled !== null
                    ? this.ngControl.disabled
                    : this._disabled;
            }
            set disabled(e) {
                this._disabled = e;
            }
            _disabled = !1;
            disabled$ = new Y();
            dir = "ltr";
            prefixCls = "ant-input";
            status = "";
            statusCls = {};
            hasFeedback = !1;
            feedbackRef = null;
            components = [];
            ngControl = l(st, { self: !0, optional: !0 });
            focused = Ce(!1);
            finalSize = nt(() =>
                this.compactSize ? this.compactSize() : this.size(),
            );
            size = Ce(this.nzSize);
            constructor() {
                this.destroyRef.onDestroy(() => {
                    this.focusMonitor.stopMonitoring(this.elementRef);
                });
            }
            ngOnInit() {
                (this.nzFormStatusService?.formStatusChanges
                    .pipe(
                        wt(
                            (e, i) =>
                                e.status === i.status &&
                                e.hasFeedback === i.hasFeedback,
                        ),
                        N(this.destroyRef),
                    )
                    .subscribe(({ status: e, hasFeedback: i }) => {
                        this.setStatusStyles(e, i);
                    }),
                    this.ngControl &&
                        this.ngControl.statusChanges
                            ?.pipe(
                                J(() => this.ngControl.disabled !== null),
                                N(this.destroyRef),
                            )
                            .subscribe(() => {
                                this.disabled$.next(this.ngControl.disabled);
                            }),
                    (this.dir = this.directionality.value),
                    this.directionality.change
                        ?.pipe(N(this.destroyRef))
                        .subscribe((e) => {
                            this.dir = e;
                        }),
                    this.focusMonitor
                        .monitor(this.elementRef, !1)
                        .pipe(N(this.destroyRef))
                        .subscribe((e) => this.focused.set(!!e)));
            }
            ngOnChanges({ disabled: e, nzStatus: i, nzSize: r }) {
                (e && this.disabled$.next(this.disabled),
                    i && this.setStatusStyles(this.nzStatus, this.hasFeedback),
                    r && this.size.set(r.currentValue));
            }
            setStatusStyles(e, i) {
                ((this.status = e),
                    (this.hasFeedback = i),
                    this.renderFeedbackIcon(),
                    (this.statusCls = Fi(this.prefixCls, e, i)),
                    Object.keys(this.statusCls).forEach((r) => {
                        this.statusCls[r]
                            ? this.renderer.addClass(
                                  this.elementRef.nativeElement,
                                  r,
                              )
                            : this.renderer.removeClass(
                                  this.elementRef.nativeElement,
                                  r,
                              );
                    }));
            }
            renderFeedbackIcon() {
                if (
                    !this.status ||
                    !this.hasFeedback ||
                    this.nzFormNoStatusService
                ) {
                    (this.hostView.clear(), (this.feedbackRef = null));
                    return;
                }
                ((this.feedbackRef =
                    this.feedbackRef || this.hostView.createComponent(c2)),
                    this.feedbackRef.location.nativeElement.classList.add(
                        "ant-input-suffix",
                    ),
                    (this.feedbackRef.instance.status = this.status),
                    this.feedbackRef.instance.updateIcon());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [
                    ["input", "nz-input", ""],
                    ["textarea", "nz-input", ""],
                ],
                hostAttrs: [1, "ant-input"],
                hostVars: 19,
                hostBindings: function (i, r) {
                    i & 2 &&
                        (Dt("disabled", r.disabled || null),
                        G("ant-input-disabled", r.disabled)(
                            "ant-input-borderless",
                            r.nzVariant === "borderless" ||
                                (r.nzVariant === "outlined" && r.nzBorderless),
                        )("ant-input-filled", r.nzVariant === "filled")(
                            "ant-input-underlined",
                            r.nzVariant === "underlined",
                        )("ant-input-lg", r.finalSize() === "large")(
                            "ant-input-sm",
                            r.finalSize() === "small",
                        )("ant-input-rtl", r.dir === "rtl")(
                            "ant-input-stepperless",
                            r.nzStepperless,
                        )("ant-input-focused", r.focused()));
                },
                inputs: {
                    nzBorderless: [2, "nzBorderless", "nzBorderless", _],
                    nzVariant: "nzVariant",
                    nzSize: "nzSize",
                    nzStepperless: [2, "nzStepperless", "nzStepperless", _],
                    nzStatus: "nzStatus",
                    disabled: [2, "disabled", "disabled", _],
                },
                exportAs: ["nzInput"],
                features: [
                    we([{ provide: x1, useValue: "input" }]),
                    U1([Ni]),
                    I,
                ],
            });
        }
        return t;
    })();
var Au = (() => {
        class t {
            focusMonitor = l(E1);
            elementRef = l(B);
            renderer = l(oe);
            cdr = l(ee);
            directionality = l(he);
            destroyRef = l(K);
            nzFormStatusService = l(T1, { optional: !0 });
            nzFormNoStatusService = l(Ro, { optional: !0 });
            listOfNzInputDirective;
            nzAddOnBeforeIcon = null;
            nzAddOnAfterIcon = null;
            nzPrefixIcon = null;
            nzSuffixIcon = null;
            nzAddOnBefore;
            nzAddOnAfter;
            nzPrefix;
            nzStatus = "";
            nzSuffix;
            nzSize = "default";
            nzSearch = !1;
            isLarge = !1;
            isSmall = !1;
            isAffix = !1;
            isAddOn = !1;
            isFeedback = !1;
            focused = !1;
            disabled = !1;
            dir = "ltr";
            prefixCls = "ant-input";
            affixStatusCls = {};
            groupStatusCls = {};
            affixInGroupStatusCls = {};
            status = "";
            hasFeedback = !1;
            constructor() {
                this.destroyRef.onDestroy(() =>
                    this.focusMonitor.stopMonitoring(this.elementRef),
                );
            }
            updateChildrenInputSize() {
                this.listOfNzInputDirective &&
                    this.listOfNzInputDirective.forEach((e) =>
                        e.size.set(this.nzSize),
                    );
            }
            ngOnInit() {
                (this.nzFormStatusService?.formStatusChanges
                    .pipe(
                        wt(
                            (e, i) =>
                                e.status === i.status &&
                                e.hasFeedback === i.hasFeedback,
                        ),
                        N(this.destroyRef),
                    )
                    .subscribe(({ status: e, hasFeedback: i }) => {
                        this.setStatusStyles(e, i);
                    }),
                    this.focusMonitor
                        .monitor(this.elementRef, !0)
                        .pipe(N(this.destroyRef))
                        .subscribe((e) => {
                            ((this.focused = !!e), this.cdr.markForCheck());
                        }),
                    (this.dir = this.directionality.value),
                    this.directionality.change
                        ?.pipe(N(this.destroyRef))
                        .subscribe((e) => {
                            this.dir = e;
                        }));
            }
            ngAfterContentInit() {
                this.updateChildrenInputSize();
                let e = this.listOfNzInputDirective.changes.pipe(
                    vt(this.listOfNzInputDirective),
                );
                e.pipe(
                    Pe((i) => V2(e, ...i.map((r) => r.disabled$))),
                    Ie(() => e),
                    L((i) => i.some((r) => r.disabled)),
                    N(this.destroyRef),
                ).subscribe((i) => {
                    ((this.disabled = i), this.cdr.markForCheck());
                });
            }
            ngOnChanges(e) {
                let {
                    nzSize: i,
                    nzSuffix: r,
                    nzPrefix: o,
                    nzPrefixIcon: a,
                    nzSuffixIcon: s,
                    nzAddOnAfter: c,
                    nzAddOnBefore: d,
                    nzAddOnAfterIcon: h,
                    nzAddOnBeforeIcon: f,
                    nzStatus: v,
                } = e;
                (i &&
                    (this.updateChildrenInputSize(),
                    (this.isLarge = this.nzSize === "large"),
                    (this.isSmall = this.nzSize === "small")),
                    (r || o || a || s) &&
                        (this.isAffix = !!(
                            this.nzSuffix ||
                            this.nzPrefix ||
                            this.nzPrefixIcon ||
                            this.nzSuffixIcon
                        )),
                    (c || d || h || f) &&
                        ((this.isAddOn = !!(
                            this.nzAddOnAfter ||
                            this.nzAddOnBefore ||
                            this.nzAddOnAfterIcon ||
                            this.nzAddOnBeforeIcon
                        )),
                        this.nzFormNoStatusService?.noFormStatus?.next(
                            this.isAddOn,
                        )),
                    v && this.setStatusStyles(this.nzStatus, this.hasFeedback));
            }
            setStatusStyles(e, i) {
                ((this.status = e),
                    (this.hasFeedback = i),
                    (this.isFeedback = !!e && i));
                let r = !!(
                    this.nzSuffix ||
                    this.nzPrefix ||
                    this.nzPrefixIcon ||
                    this.nzSuffixIcon
                );
                ((this.isAffix = r || (!this.isAddOn && i)),
                    (this.affixInGroupStatusCls =
                        this.isAffix || this.isFeedback
                            ? (this.affixStatusCls = Fi(
                                  `${this.prefixCls}-affix-wrapper`,
                                  e,
                                  i,
                              ))
                            : {}),
                    this.cdr.markForCheck(),
                    (this.affixStatusCls = Fi(
                        `${this.prefixCls}-affix-wrapper`,
                        this.isAddOn ? "" : e,
                        this.isAddOn ? !1 : i,
                    )),
                    (this.groupStatusCls = Fi(
                        `${this.prefixCls}-group-wrapper`,
                        this.isAddOn ? e : "",
                        this.isAddOn ? i : !1,
                    )));
                let o = m(m({}, this.affixStatusCls), this.groupStatusCls);
                Object.keys(o).forEach((a) => {
                    o[a]
                        ? this.renderer.addClass(
                              this.elementRef.nativeElement,
                              a,
                          )
                        : this.renderer.removeClass(
                              this.elementRef.nativeElement,
                              a,
                          );
                });
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-input-group"]],
                contentQueries: function (i, r, o) {
                    if ((i & 1 && et(o, P1, 4), i & 2)) {
                        let a;
                        le((a = de())) && (r.listOfNzInputDirective = a);
                    }
                },
                hostVars: 38,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-input-search-enter-button", r.nzSearch)(
                            "ant-input-search",
                            r.nzSearch,
                        )("ant-input-search-rtl", r.dir === "rtl")(
                            "ant-input-search-sm",
                            r.nzSearch && r.isSmall,
                        )("ant-input-search-large", r.nzSearch && r.isLarge)(
                            "ant-input-group-wrapper",
                            r.isAddOn,
                        )("ant-input-group-wrapper-rtl", r.dir === "rtl")(
                            "ant-input-group-wrapper-lg",
                            r.isAddOn && r.isLarge,
                        )("ant-input-group-wrapper-sm", r.isAddOn && r.isSmall)(
                            "ant-input-affix-wrapper",
                            r.isAffix && !r.isAddOn,
                        )("ant-input-affix-wrapper-rtl", r.dir === "rtl")(
                            "ant-input-affix-wrapper-focused",
                            r.isAffix && r.focused,
                        )(
                            "ant-input-affix-wrapper-disabled",
                            r.isAffix && r.disabled,
                        )(
                            "ant-input-affix-wrapper-lg",
                            r.isAffix && !r.isAddOn && r.isLarge,
                        )(
                            "ant-input-affix-wrapper-sm",
                            r.isAffix && !r.isAddOn && r.isSmall,
                        )("ant-input-group", !r.isAffix && !r.isAddOn)(
                            "ant-input-group-rtl",
                            r.dir === "rtl",
                        )(
                            "ant-input-group-lg",
                            !r.isAffix && !r.isAddOn && r.isLarge,
                        )(
                            "ant-input-group-sm",
                            !r.isAffix && !r.isAddOn && r.isSmall,
                        );
                },
                inputs: {
                    nzAddOnBeforeIcon: "nzAddOnBeforeIcon",
                    nzAddOnAfterIcon: "nzAddOnAfterIcon",
                    nzPrefixIcon: "nzPrefixIcon",
                    nzSuffixIcon: "nzSuffixIcon",
                    nzAddOnBefore: "nzAddOnBefore",
                    nzAddOnAfter: "nzAddOnAfter",
                    nzPrefix: "nzPrefix",
                    nzStatus: "nzStatus",
                    nzSuffix: "nzSuffix",
                    nzSize: "nzSize",
                    nzSearch: [2, "nzSearch", "nzSearch", _],
                },
                exportAs: ["nzInputGroup"],
                features: [
                    we([Ro, { provide: x1, useValue: "input" }]),
                    U1([Ni]),
                    I,
                ],
                ngContentSelectors: P0,
                decls: 6,
                vars: 1,
                consts: [
                    ["affixTemplate", ""],
                    ["contentTemplate", ""],
                    [1, "ant-input-wrapper", "ant-input-group"],
                    [
                        "nz-input-group-slot",
                        "",
                        "type",
                        "addon",
                        3,
                        "icon",
                        "template",
                    ],
                    [
                        1,
                        "ant-input-affix-wrapper",
                        3,
                        "ant-input-affix-wrapper-disabled",
                        "ant-input-affix-wrapper-sm",
                        "ant-input-affix-wrapper-lg",
                        "ant-input-affix-wrapper-focused",
                        "class",
                    ],
                    [3, "ngTemplateOutlet"],
                    [1, "ant-input-affix-wrapper"],
                    [
                        "nz-input-group-slot",
                        "",
                        "type",
                        "prefix",
                        3,
                        "icon",
                        "template",
                    ],
                    [
                        "nz-input-group-slot",
                        "",
                        "type",
                        "suffix",
                        3,
                        "icon",
                        "template",
                    ],
                    [3, "status"],
                    ["nz-input-group-slot", "", "type", "suffix"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (be(),
                        E(0, gu, 5, 3, "span", 2)(1, _u, 2, 1),
                        te(2, xu, 3, 3, "ng-template", null, 0, Dn)(
                            4,
                            ku,
                            2,
                            1,
                            "ng-template",
                            null,
                            1,
                            Dn,
                        )),
                        i & 2 && P(r.isAddOn ? 0 : 1));
                },
                dependencies: [A0, Lt, c2],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    Vu = (() => {
        class t {
            formBuilder = l(w1);
            destroyRef = l(K);
            otpInputs;
            nzLength = 6;
            nzSize = "default";
            disabled = !1;
            nzStatus = "";
            nzFormatter = (e) => e;
            nzMask = null;
            otpArray;
            internalValue = [];
            onChangeCallback;
            onTouched = () => {};
            constructor() {
                this.createFormArray();
            }
            ngOnChanges(e) {
                (e.nzLength?.currentValue && this.createFormArray(),
                    e.disabled && this.setDisabledState(this.disabled));
            }
            onInput(e, i) {
                let r = i.target,
                    o = this.otpInputs.toArray()[e + 1];
                r.value && o
                    ? o.nativeElement.focus()
                    : o || this.selectInputBox(e);
            }
            onFocus(e) {
                e.target.select();
            }
            onKeyDown(e, i) {
                let r = this.otpInputs.toArray()[e - 1];
                i.keyCode === 8 &&
                    (i.preventDefault(),
                    (this.internalValue[e] = ""),
                    this.otpArray.at(e).setValue("", { emitEvent: !1 }),
                    r && this.selectInputBox(e - 1),
                    this.emitValue());
            }
            writeValue(e) {
                if (!e) {
                    this.otpArray.reset();
                    return;
                }
                let i = e.split("");
                ((this.internalValue = i),
                    i.forEach((r, o) => {
                        let a = this.nzFormatter(r),
                            s = this.nzMask ? this.nzMask : a;
                        this.otpArray.at(o).setValue(s, { emitEvent: !1 });
                    }));
            }
            registerOnChange(e) {
                this.onChangeCallback = e;
            }
            registerOnTouched(e) {
                this.onTouched = e;
            }
            setDisabledState(e) {
                e ? this.otpArray.disable() : this.otpArray.enable();
            }
            onPaste(e, i) {
                let r = i.clipboardData?.getData("text") || "";
                if (!r) return;
                let o = e;
                for (let a of r.split(""))
                    if (o < this.nzLength) {
                        let s = this.nzFormatter(a);
                        this.internalValue[o] = a;
                        let c = this.nzMask ? this.nzMask : s;
                        (this.otpArray.at(o).setValue(c, { emitEvent: !1 }),
                            o++);
                    } else break;
                (i.preventDefault(), this.selectInputBox(o), this.emitValue());
            }
            createFormArray() {
                ((this.otpArray = this.formBuilder.array([])),
                    (this.internalValue = new Array(this.nzLength).fill("")));
                for (let e = 0; e < this.nzLength; e++) {
                    let i = this.formBuilder.nonNullable.control("", [
                        at.required,
                    ]);
                    (i.valueChanges
                        .pipe(
                            me((r) => {
                                let o = this.nzFormatter(r);
                                ((this.internalValue[e] = o),
                                    i.setValue(this.nzMask ?? o, {
                                        emitEvent: !1,
                                    }),
                                    this.emitValue());
                            }),
                            N(this.destroyRef),
                        )
                        .subscribe(),
                        this.otpArray.push(i));
                }
            }
            emitValue() {
                let e = this.internalValue.join("");
                this.onChangeCallback && this.onChangeCallback(e);
            }
            selectInputBox(e) {
                let i = this.otpInputs.toArray();
                (e >= i.length && (e = i.length - 1),
                    i[e].nativeElement.select());
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-input-otp"]],
                viewQuery: function (i, r) {
                    if ((i & 1 && tt(Eu, 5), i & 2)) {
                        let o;
                        le((o = de())) && (r.otpInputs = o);
                    }
                },
                hostAttrs: [1, "ant-otp"],
                inputs: {
                    nzLength: [2, "nzLength", "nzLength", Qn],
                    nzSize: "nzSize",
                    disabled: [2, "disabled", "disabled", _],
                    nzStatus: "nzStatus",
                    nzFormatter: "nzFormatter",
                    nzMask: "nzMask",
                },
                exportAs: ["nzInputOtp"],
                features: [
                    we([{ provide: b1, useExisting: Ft(() => t), multi: !0 }]),
                    I,
                ],
                decls: 2,
                vars: 0,
                consts: [
                    ["otpInput", ""],
                    [
                        "nz-input",
                        "",
                        "type",
                        "text",
                        "maxlength",
                        "1",
                        "size",
                        "1",
                        1,
                        "ant-otp-input",
                        3,
                        "nzSize",
                        "formControl",
                        "nzStatus",
                    ],
                    [
                        "nz-input",
                        "",
                        "type",
                        "text",
                        "maxlength",
                        "1",
                        "size",
                        "1",
                        1,
                        "ant-otp-input",
                        3,
                        "input",
                        "focus",
                        "keydown",
                        "paste",
                        "nzSize",
                        "formControl",
                        "nzStatus",
                    ],
                ],
                template: function (i, r) {
                    (i & 1 && xt(0, Pu, 2, 3, "input", 1, dr),
                        i & 2 && Tt(r.otpArray.controls));
                },
                dependencies: [P1, M1, gn, _1, I4, Di],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })();
var Jo = (() => {
    class t {
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵmod = V({ type: t });
        static ɵinj = A({ imports: [Au, A0, Vu] });
    }
    return t;
})();
var Fu = ["nzType", "avatar"];
var Hu = ["*"];
function Ou(t, n) {
    if (
        (t & 1 && (z(0, "div", 0), W(1, "nz-skeleton-element", 4), C()), t & 2)
    ) {
        let e = g(2);
        (u(),
            y("nzSize", e.avatar.size || "default")(
                "nzShape",
                e.avatar.shape || "circle",
            ));
    }
}
function Iu(t, n) {
    if ((t & 1 && W(0, "h3", 5), t & 2)) {
        let e = g(2);
        Ge("width", e.toCSSUnit(e.title.width));
    }
}
function Ru(t, n) {
    if ((t & 1 && W(0, "li"), t & 2)) {
        let e = n.$index,
            i = g(3);
        Ge("width", i.toCSSUnit(i.widthList[e]));
    }
}
function Lu(t, n) {
    if ((t & 1 && (z(0, "ul", 3), xt(1, Ru, 1, 2, "li", 6, Mn), C()), t & 2)) {
        let e = g(2);
        (u(), Tt(e.rowsList));
    }
}
function Nu(t, n) {
    if (
        (t & 1 &&
            (E(0, Ou, 2, 2, "div", 0),
            z(1, "div", 1),
            E(2, Iu, 1, 2, "h3", 2),
            E(3, Lu, 3, 0, "ul", 3),
            C()),
        t & 2)
    ) {
        let e = g();
        (P(e.nzAvatar ? 0 : -1),
            u(2),
            P(e.nzTitle ? 2 : -1),
            u(),
            P(e.nzParagraph ? 3 : -1));
    }
}
function Yu(t, n) {
    t & 1 && _e(0);
}
var Bu = (() => {
    class t {
        nzActive = !1;
        nzType;
        nzBlock = !1;
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵdir = D({
            type: t,
            selectors: [["nz-skeleton-element"]],
            hostAttrs: [1, "ant-skeleton", "ant-skeleton-element"],
            hostVars: 4,
            hostBindings: function (i, r) {
                i & 2 &&
                    G("ant-skeleton-active", r.nzActive)(
                        "ant-skeleton-block",
                        r.nzBlock,
                    );
            },
            inputs: {
                nzActive: [2, "nzActive", "nzActive", _],
                nzType: "nzType",
                nzBlock: [2, "nzBlock", "nzBlock", _],
            },
        });
    }
    return t;
})();
var ju = (() => {
    class t {
        nzShape = "circle";
        nzSize = "default";
        styleMap = {};
        ngOnChanges(e) {
            if (e.nzSize && typeof this.nzSize == "number") {
                let i = `${this.nzSize}px`;
                this.styleMap = { width: i, height: i, "line-height": i };
            } else this.styleMap = {};
        }
        static ɵfac = function (i) {
            return new (i || t)();
        };
        static ɵcmp = R({
            type: t,
            selectors: [["nz-skeleton-element", "nzType", "avatar"]],
            inputs: { nzShape: "nzShape", nzSize: "nzSize" },
            features: [I],
            attrs: Fu,
            decls: 1,
            vars: 10,
            consts: [[1, "ant-skeleton-avatar"]],
            template: function (i, r) {
                (i & 1 && _a(0, "span", 0),
                    i & 2 &&
                        (Ot(r.styleMap),
                        G("ant-skeleton-avatar-square", r.nzShape === "square")(
                            "ant-skeleton-avatar-circle",
                            r.nzShape === "circle",
                        )("ant-skeleton-avatar-lg", r.nzSize === "large")(
                            "ant-skeleton-avatar-sm",
                            r.nzSize === "small",
                        )));
            },
            encapsulation: 2,
            changeDetection: 0,
        });
    }
    return t;
})();
var ea = (() => {
        class t {
            cdr = l(ee);
            nzActive = !1;
            nzLoading = !0;
            nzRound = !1;
            nzTitle = !0;
            nzAvatar = !1;
            nzParagraph = !0;
            title;
            avatar;
            paragraph;
            rowsList = [];
            widthList = [];
            toCSSUnit(e = "") {
                return Ic(e);
            }
            getTitleProps() {
                let e = !!this.nzAvatar,
                    i = !!this.nzParagraph,
                    r = "";
                return (
                    !e && i ? (r = "38%") : e && i && (r = "50%"),
                    m({ width: r }, this.getProps(this.nzTitle))
                );
            }
            getAvatarProps() {
                let e = this.nzTitle && !this.nzParagraph ? "square" : "circle";
                return m(
                    { shape: e, size: "large" },
                    this.getProps(this.nzAvatar),
                );
            }
            getParagraphProps() {
                let e = !!this.nzAvatar,
                    i = !!this.nzTitle,
                    r = {};
                return (
                    (!e || !i) && (r.width = "61%"),
                    !e && i ? (r.rows = 3) : (r.rows = 2),
                    m(m({}, r), this.getProps(this.nzParagraph))
                );
            }
            getProps(e) {
                return e && typeof e == "object" ? e : {};
            }
            getWidthList() {
                let { width: e, rows: i } = this.paragraph,
                    r = [];
                return (
                    e && Array.isArray(e)
                        ? (r = e)
                        : e && !Array.isArray(e) && ((r = []), (r[i - 1] = e)),
                    r
                );
            }
            updateProps() {
                ((this.title = this.getTitleProps()),
                    (this.avatar = this.getAvatarProps()),
                    (this.paragraph = this.getParagraphProps()),
                    (this.rowsList = [...Array(this.paragraph.rows)]),
                    (this.widthList = this.getWidthList()),
                    this.cdr.markForCheck());
            }
            ngOnInit() {
                this.updateProps();
            }
            ngOnChanges(e) {
                (e.nzTitle || e.nzAvatar || e.nzParagraph) &&
                    this.updateProps();
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-skeleton"]],
                hostAttrs: [1, "ant-skeleton"],
                hostVars: 6,
                hostBindings: function (i, r) {
                    i & 2 &&
                        G("ant-skeleton-with-avatar", !!r.nzAvatar)(
                            "ant-skeleton-active",
                            r.nzActive,
                        )("ant-skeleton-round", r.nzRound);
                },
                inputs: {
                    nzActive: [2, "nzActive", "nzActive", _],
                    nzLoading: [2, "nzLoading", "nzLoading", _],
                    nzRound: [2, "nzRound", "nzRound", _],
                    nzTitle: "nzTitle",
                    nzAvatar: "nzAvatar",
                    nzParagraph: "nzParagraph",
                },
                exportAs: ["nzSkeleton"],
                features: [I],
                ngContentSelectors: Hu,
                decls: 2,
                vars: 1,
                consts: [
                    [1, "ant-skeleton-header"],
                    [1, "ant-skeleton-content"],
                    [1, "ant-skeleton-title", 3, "width"],
                    [1, "ant-skeleton-paragraph"],
                    ["nzType", "avatar", 3, "nzSize", "nzShape"],
                    [1, "ant-skeleton-title"],
                    [3, "width"],
                ],
                template: function (i, r) {
                    (i & 1 && (be(), E(0, Nu, 4, 3)(1, Yu, 1, 0)),
                        i & 2 && P(r.nzLoading ? 0 : 1));
                },
                dependencies: [Bu, ju],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    ta = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
function Uu(t, n) {}
function $u(t, n) {
    if (
        (t & 1 && (z(0, "div", 0), te(1, Uu, 0, 0, "ng-template", 2), C()),
        t & 2)
    ) {
        let e = g();
        (u(), y("ngTemplateOutlet", e.nzAvatar));
    }
}
function Wu(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzTitle));
    }
}
function qu(t, n) {
    if (
        (t & 1 && (z(0, "div", 3), te(1, Wu, 2, 1, "ng-container", 5), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzTitle));
    }
}
function Gu(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzDescription));
    }
}
function Ku(t, n) {
    if (
        (t & 1 && (z(0, "div", 4), te(1, Gu, 2, 1, "ng-container", 5), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzDescription));
    }
}
function Zu(t, n) {
    if (
        (t & 1 &&
            (z(0, "div", 1),
            E(1, qu, 2, 1, "div", 3),
            E(2, Ku, 2, 1, "div", 4),
            C()),
        t & 2)
    ) {
        let e = g();
        (u(), P(e.nzTitle ? 1 : -1), u(), P(e.nzDescription ? 2 : -1));
    }
}
var O0 = ["*"];
function Xu(t, n) {
    t & 1 && _e(0);
}
var Qu = () => ({ rows: 4 });
function Ju(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzTitle));
    }
}
function e9(t, n) {
    if (
        (t & 1 && (z(0, "div", 6), te(1, Ju, 2, 1, "ng-container", 9), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzTitle));
    }
}
function t9(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzExtra));
    }
}
function n9(t, n) {
    if (
        (t & 1 && (z(0, "div", 7), te(1, t9, 2, 1, "ng-container", 9), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzExtra));
    }
}
function i9(t, n) {}
function r9(t, n) {
    if ((t & 1 && te(0, i9, 0, 0, "ng-template", 8), t & 2)) {
        let e = g(2);
        y("ngTemplateOutlet", e.listOfNzCardTabComponent.template);
    }
}
function o9(t, n) {
    if (
        (t & 1 &&
            (z(0, "div", 0)(1, "div", 5),
            E(2, e9, 2, 1, "div", 6),
            E(3, n9, 2, 1, "div", 7),
            C(),
            E(4, r9, 1, 1, null, 8),
            C()),
        t & 2)
    ) {
        let e = g();
        (u(2),
            P(e.nzTitle ? 2 : -1),
            u(),
            P(e.nzExtra ? 3 : -1),
            u(),
            P(e.listOfNzCardTabComponent ? 4 : -1));
    }
}
function a9(t, n) {}
function s9(t, n) {
    if (
        (t & 1 && (z(0, "div", 1), te(1, a9, 0, 0, "ng-template", 8), C()),
        t & 2)
    ) {
        let e = g();
        (u(), y("ngTemplateOutlet", e.nzCover));
    }
}
function c9(t, n) {
    (t & 1 && W(0, "nz-skeleton", 3),
        t & 2 && y("nzActive", !0)("nzTitle", !1)("nzParagraph", It(3, Qu)));
}
function l9(t, n) {
    t & 1 && _e(0);
}
function d9(t, n) {}
function h9(t, n) {
    if (
        (t & 1 &&
            (z(0, "li")(1, "span"), te(2, d9, 0, 0, "ng-template", 8), C()()),
        t & 2)
    ) {
        let e = n.$implicit,
            i = g(2);
        (Ge("width", 100 / i.nzActions.length, "%"),
            u(2),
            y("ngTemplateOutlet", e));
    }
}
function u9(t, n) {
    if ((t & 1 && (z(0, "ul", 4), xt(1, h9, 3, 3, "li", 10, dr), C()), t & 2)) {
        let e = g();
        (u(), Tt(e.nzActions));
    }
}
var m9 = (() => {
        class t {
            nzHoverable = !0;
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵdir = D({
                type: t,
                selectors: [["", "nz-card-grid", ""]],
                hostAttrs: [1, "ant-card-grid"],
                hostVars: 2,
                hostBindings: function (i, r) {
                    i & 2 && G("ant-card-hoverable", r.nzHoverable);
                },
                inputs: { nzHoverable: [2, "nzHoverable", "nzHoverable", _] },
                exportAs: ["nzCardGrid"],
            });
        }
        return t;
    })(),
    p9 = (() => {
        class t {
            nzTitle = null;
            nzDescription = null;
            nzAvatar = null;
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-card-meta"]],
                hostAttrs: [1, "ant-card-meta"],
                inputs: {
                    nzTitle: "nzTitle",
                    nzDescription: "nzDescription",
                    nzAvatar: "nzAvatar",
                },
                exportAs: ["nzCardMeta"],
                decls: 2,
                vars: 2,
                consts: [
                    [1, "ant-card-meta-avatar"],
                    [1, "ant-card-meta-detail"],
                    [3, "ngTemplateOutlet"],
                    [1, "ant-card-meta-title"],
                    [1, "ant-card-meta-description"],
                    [4, "nzStringTemplateOutlet"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (E(0, $u, 2, 1, "div", 0), E(1, Zu, 3, 2, "div", 1)),
                        i & 2 &&
                            (P(r.nzAvatar ? 0 : -1),
                            u(),
                            P(r.nzTitle || r.nzDescription ? 1 : -1)));
                },
                dependencies: [Lt, bt, Ze],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    f9 = (() => {
        class t {
            template;
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-card-tab"]],
                viewQuery: function (i, r) {
                    if ((i & 1 && tt(Ye, 7), i & 2)) {
                        let o;
                        le((o = de())) && (r.template = o.first);
                    }
                },
                exportAs: ["nzCardTab"],
                ngContentSelectors: O0,
                decls: 1,
                vars: 0,
                template: function (i, r) {
                    i & 1 && (be(), i3(0, Xu, 1, 0, "ng-template"));
                },
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    H0 = "card",
    tn = (() => {
        var d;
        let t,
            n = [],
            e = [],
            i,
            r = [],
            o = [],
            a,
            s = [],
            c = [];
        return (
            (d = class {
                cdr = l(ee);
                directionality = l(he);
                destroyRef = l(K);
                _nzModuleName = H0;
                nzBordered = pe(this, n, !0);
                nzLoading = (pe(this, e), !1);
                nzHoverable = pe(this, r, !1);
                nzBodyStyle = (pe(this, o), null);
                nzCover;
                nzActions = [];
                nzType = null;
                nzSize = pe(this, s, "default");
                nzTitle = pe(this, c);
                nzExtra;
                listOfNzCardTabComponent;
                listOfNzCardGridDirective;
                dir = "ltr";
                constructor() {
                    D1(H0, () => this.cdr.markForCheck());
                }
                ngOnInit() {
                    (this.directionality.change
                        ?.pipe(N(this.destroyRef))
                        .subscribe((f) => {
                            ((this.dir = f), this.cdr.detectChanges());
                        }),
                        (this.dir = this.directionality.value));
                }
            }),
            (() => {
                let f =
                    typeof Symbol == "function" && Symbol.metadata
                        ? Object.create(null)
                        : void 0;
                ((t = [ct()]),
                    (i = [ct()]),
                    (a = [ct()]),
                    Qe(
                        null,
                        null,
                        t,
                        {
                            kind: "field",
                            name: "nzBordered",
                            static: !1,
                            private: !1,
                            access: {
                                has: (v) => "nzBordered" in v,
                                get: (v) => v.nzBordered,
                                set: (v, M) => {
                                    v.nzBordered = M;
                                },
                            },
                            metadata: f,
                        },
                        n,
                        e,
                    ),
                    Qe(
                        null,
                        null,
                        i,
                        {
                            kind: "field",
                            name: "nzHoverable",
                            static: !1,
                            private: !1,
                            access: {
                                has: (v) => "nzHoverable" in v,
                                get: (v) => v.nzHoverable,
                                set: (v, M) => {
                                    v.nzHoverable = M;
                                },
                            },
                            metadata: f,
                        },
                        r,
                        o,
                    ),
                    Qe(
                        null,
                        null,
                        a,
                        {
                            kind: "field",
                            name: "nzSize",
                            static: !1,
                            private: !1,
                            access: {
                                has: (v) => "nzSize" in v,
                                get: (v) => v.nzSize,
                                set: (v, M) => {
                                    v.nzSize = M;
                                },
                            },
                            metadata: f,
                        },
                        s,
                        c,
                    ),
                    f &&
                        Object.defineProperty(d, Symbol.metadata, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: f,
                        }));
            })(),
            ut(d, "\u0275fac", function (v) {
                return new (v || d)();
            }),
            ut(
                d,
                "\u0275cmp",
                R({
                    type: d,
                    selectors: [["nz-card"]],
                    contentQueries: function (v, M, F) {
                        if ((v & 1 && (et(F, f9, 5), et(F, m9, 4)), v & 2)) {
                            let T;
                            (le((T = de())) &&
                                (M.listOfNzCardTabComponent = T.first),
                                le((T = de())) &&
                                    (M.listOfNzCardGridDirective = T));
                        }
                    },
                    hostAttrs: [1, "ant-card"],
                    hostVars: 16,
                    hostBindings: function (v, M) {
                        v & 2 &&
                            G("ant-card-loading", M.nzLoading)(
                                "ant-card-bordered",
                                M.nzBordered,
                            )("ant-card-hoverable", M.nzHoverable)(
                                "ant-card-small",
                                M.nzSize === "small",
                            )(
                                "ant-card-contain-grid",
                                M.listOfNzCardGridDirective &&
                                    M.listOfNzCardGridDirective.length,
                            )("ant-card-type-inner", M.nzType === "inner")(
                                "ant-card-contain-tabs",
                                !!M.listOfNzCardTabComponent,
                            )("ant-card-rtl", M.dir === "rtl");
                    },
                    inputs: {
                        nzBordered: [2, "nzBordered", "nzBordered", _],
                        nzLoading: [2, "nzLoading", "nzLoading", _],
                        nzHoverable: [2, "nzHoverable", "nzHoverable", _],
                        nzBodyStyle: "nzBodyStyle",
                        nzCover: "nzCover",
                        nzActions: "nzActions",
                        nzType: "nzType",
                        nzSize: "nzSize",
                        nzTitle: "nzTitle",
                        nzExtra: "nzExtra",
                    },
                    exportAs: ["nzCard"],
                    ngContentSelectors: O0,
                    decls: 6,
                    vars: 6,
                    consts: [
                        [1, "ant-card-head"],
                        [1, "ant-card-cover"],
                        [1, "ant-card-body"],
                        [3, "nzActive", "nzTitle", "nzParagraph"],
                        [1, "ant-card-actions"],
                        [1, "ant-card-head-wrapper"],
                        [1, "ant-card-head-title"],
                        [1, "ant-card-extra"],
                        [3, "ngTemplateOutlet"],
                        [4, "nzStringTemplateOutlet"],
                        [3, "width"],
                    ],
                    template: function (v, M) {
                        (v & 1 &&
                            (be(),
                            E(0, o9, 5, 3, "div", 0),
                            E(1, s9, 2, 1, "div", 1),
                            z(2, "div", 2),
                            E(3, c9, 1, 4, "nz-skeleton", 3)(4, l9, 1, 0),
                            C(),
                            E(5, u9, 3, 0, "ul", 4)),
                            v & 2 &&
                                (P(
                                    M.nzTitle ||
                                        M.nzExtra ||
                                        M.listOfNzCardTabComponent
                                        ? 0
                                        : -1,
                                ),
                                u(),
                                P(M.nzCover ? 1 : -1),
                                u(),
                                Ot(M.nzBodyStyle),
                                u(),
                                P(M.nzLoading ? 3 : 4),
                                u(2),
                                P(M.nzActions.length ? 5 : -1)));
                    },
                    dependencies: [bt, Ze, Lt, ta, ea],
                    encapsulation: 2,
                    changeDetection: 0,
                }),
            ),
            d
        );
    })(),
    _n = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ imports: [tn, p9, Yn] });
        }
        return t;
    })();
var I0 = { production: !1, apiBaseUrl: "http://localhost:5079/api" };
var A1 = class t {
    constructor(n) {
        this.http = n;
    }
    baseUrl = `${I0.apiBaseUrl}/auth`;
    register(n) {
        return this.http.post(`${this.baseUrl}/register`, n);
    }
    login(n) {
        return this.http.post(`${this.baseUrl}/login`, n);
    }
    refreshToken(n) {
        return this.http.post(`${this.baseUrl}/refresh-token`, n);
    }
    logout() {
        (localStorage.removeItem("accessToken"),
            localStorage.removeItem("refreshToken"));
    }
    static ɵfac = function (e) {
        return new (e || t)(x(r1));
    };
    static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
};
var v9 = () => ({ padding: "24px" });
function g9(t, n) {
    if (
        (t & 1 &&
            (z(0, "nz-form-item")(1, "nz-form-control", 7)(2, "div", 9),
            Q(3),
            C()()()),
        t & 2)
    ) {
        let e = g();
        (u(), y("nzSpan", 24), u(2), se(e.errorMessage));
    }
}
var ia = class t {
    constructor(n, e, i) {
        this.fb = n;
        this.authService = e;
        this.router = i;
        this.loginForm = this.fb.group({
            emailAddress: ["", [at.required, at.email]],
            password: ["", [at.required]],
        });
    }
    loginForm;
    loading = !1;
    errorMessage = "";
    onSubmit() {
        if (this.loginForm.invalid) return;
        ((this.loading = !0), (this.errorMessage = ""));
        let n = this.loginForm.value;
        this.authService.login(n).subscribe({
            next: (e) => {
                (localStorage.setItem("accessToken", e.accessToken),
                    localStorage.setItem("refreshToken", e.refreshToken),
                    this.router.navigate(["/drill"]));
            },
            error: (e) => {
                ((this.loading = !1),
                    (this.errorMessage = e?.error || "Login Failed"));
            },
        });
    }
    static ɵfac = function (e) {
        return new (e || t)(w(w1), w(A1), w(ge));
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-login"]],
        decls: 17,
        vars: 11,
        consts: [
            ["nzTitle", "Login", 3, "nzBodyStyle"],
            ["nz-form", "", 1, "login-form", 3, "ngSubmit", "formGroup"],
            ["nzRequired", "", 3, "nzSpan"],
            ["nzErrorTip", "Please input your email!", 3, "nzSpan"],
            [
                "nz-input",
                "",
                "formControlName",
                "emailAddress",
                "placeholder",
                "Enter your email",
            ],
            ["nzErrorTip", "Please input your password!", 3, "nzSpan"],
            [
                "nz-input",
                "",
                "nzType",
                "password",
                "formControlName",
                "password",
                "placeholder",
                "Enter your password",
            ],
            [3, "nzSpan"],
            [
                "nz-button",
                "",
                "nzType",
                "primary",
                "nzSize",
                "large",
                1,
                "login-button",
                3,
                "disabled",
                "nzLoading",
            ],
            [1, "error-message"],
        ],
        template: function (e, i) {
            (e & 1 &&
                (z(0, "nz-card", 0)(1, "form", 1),
                ve("ngSubmit", function () {
                    return i.onSubmit();
                }),
                z(2, "nz-form-item")(3, "nz-form-label", 2),
                Q(4, "Email Address"),
                C(),
                z(5, "nz-form-control", 3),
                W(6, "input", 4),
                C()(),
                z(7, "nz-form-item")(8, "nz-form-label", 2),
                Q(9, "Password"),
                C(),
                z(10, "nz-form-control", 5),
                W(11, "input", 6),
                C()(),
                E(12, g9, 4, 2, "nz-form-item"),
                z(13, "nz-form-item")(14, "nz-form-control", 7)(
                    15,
                    "button",
                    8,
                ),
                Q(16, " Login "),
                C()()()()()),
                e & 2 &&
                    (y("nzBodyStyle", It(10, v9)),
                    u(),
                    y("formGroup", i.loginForm),
                    u(2),
                    y("nzSpan", 24),
                    u(2),
                    y("nzSpan", 24),
                    u(3),
                    y("nzSpan", 24),
                    u(2),
                    y("nzSpan", 24),
                    u(2),
                    P(i.errorMessage ? 12 : -1),
                    u(2),
                    y("nzSpan", 24),
                    u(),
                    y("disabled", i.loading)("nzLoading", i.loading)));
        },
        dependencies: [
            Nt,
            M1,
            wo,
            gn,
            _1,
            Co,
            xi,
            Nn,
            Oo,
            Yi,
            Fo,
            Ho,
            Xo,
            Io,
            Ui,
            k1,
            Qi,
            er,
            Ji,
            Jo,
            P1,
            _n,
            tn,
        ],
        styles: [
            ".login-form[_ngcontent-%COMP%]   .login-button[_ngcontent-%COMP%]{width:100%;height:40px;font-weight:500}.login-form[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]{color:#ff4d4f;font-size:14px;text-align:center}[_nghost-%COMP%]     .ant-card{border-radius:8px;box-shadow:0 2px 8px #0000001a}[_nghost-%COMP%]     .ant-form-item{margin-bottom:16px}[_nghost-%COMP%]     .ant-input{height:40px;border-radius:6px}",
        ],
    });
};
var y9 = () => ({ padding: "24px" });
function z9(t, n) {
    if (
        (t & 1 &&
            (z(0, "nz-form-item")(1, "nz-form-control", 9)(2, "div", 11),
            Q(3),
            C()()()),
        t & 2)
    ) {
        let e = g();
        (u(), y("nzSpan", 24), u(2), se(e.errorMessage));
    }
}
var ra = class t {
    constructor(n, e, i) {
        this.fb = n;
        this.authService = e;
        this.router = i;
        this.registerForm = this.fb.group({
            emailAddress: ["", [at.required, at.email]],
            username: ["", [at.required]],
            password: ["", [at.required]],
        });
    }
    registerForm;
    loading = !1;
    errorMessage = "";
    onSubmit() {
        if (this.registerForm.invalid) return;
        this.loading = !0;
        let n = this.registerForm.value;
        this.authService.register(n).subscribe({
            next: (e) => {
                this.router.navigate(["/auth/login"]);
            },
            error: (e) => {
                ((this.loading = !1),
                    (this.errorMessage = e?.error || "Registration Failed"));
            },
        });
    }
    static ɵfac = function (e) {
        return new (e || t)(w(w1), w(A1), w(ge));
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-register"]],
        decls: 22,
        vars: 13,
        consts: [
            ["nzTitle", "Register", 3, "nzBodyStyle"],
            ["nz-form", "", 1, "register-form", 3, "ngSubmit", "formGroup"],
            ["nzRequired", "", 3, "nzSpan"],
            ["nzErrorTip", "Please input your email!", 3, "nzSpan"],
            [
                "nz-input",
                "",
                "formControlName",
                "emailAddress",
                "placeholder",
                "Enter your email",
            ],
            ["nzErrorTip", "Please input your username!", 3, "nzSpan"],
            [
                "nz-input",
                "",
                "formControlName",
                "username",
                "placeholder",
                "Enter your username",
            ],
            ["nzErrorTip", "Please input your password!", 3, "nzSpan"],
            [
                "nz-input",
                "",
                "nzType",
                "password",
                "formControlName",
                "password",
                "placeholder",
                "Enter your password",
            ],
            [3, "nzSpan"],
            [
                "nz-button",
                "",
                "nzType",
                "primary",
                "nzSize",
                "large",
                1,
                "register-button",
                3,
                "disabled",
                "nzLoading",
            ],
            [1, "error-message"],
        ],
        template: function (e, i) {
            (e & 1 &&
                (z(0, "nz-card", 0)(1, "form", 1),
                ve("ngSubmit", function () {
                    return i.onSubmit();
                }),
                z(2, "nz-form-item")(3, "nz-form-label", 2),
                Q(4, "Email Address"),
                C(),
                z(5, "nz-form-control", 3),
                W(6, "input", 4),
                C()(),
                z(7, "nz-form-item")(8, "nz-form-label", 2),
                Q(9, "Username"),
                C(),
                z(10, "nz-form-control", 5),
                W(11, "input", 6),
                C()(),
                z(12, "nz-form-item")(13, "nz-form-label", 2),
                Q(14, "Password"),
                C(),
                z(15, "nz-form-control", 7),
                W(16, "input", 8),
                C()(),
                E(17, z9, 4, 2, "nz-form-item"),
                z(18, "nz-form-item")(19, "nz-form-control", 9)(
                    20,
                    "button",
                    10,
                ),
                Q(21, " Register "),
                C()()()()()),
                e & 2 &&
                    (y("nzBodyStyle", It(12, y9)),
                    u(),
                    y("formGroup", i.registerForm),
                    u(2),
                    y("nzSpan", 24),
                    u(2),
                    y("nzSpan", 24),
                    u(3),
                    y("nzSpan", 24),
                    u(2),
                    y("nzSpan", 24),
                    u(3),
                    y("nzSpan", 24),
                    u(2),
                    y("nzSpan", 24),
                    u(2),
                    P(i.errorMessage ? 17 : -1),
                    u(2),
                    y("nzSpan", 24),
                    u(),
                    y("disabled", i.loading)("nzLoading", i.loading)));
        },
        dependencies: [
            Nt,
            M1,
            wo,
            gn,
            _1,
            Co,
            xi,
            Nn,
            Oo,
            Yi,
            Fo,
            Ho,
            Xo,
            Io,
            Ui,
            k1,
            Qi,
            er,
            Ji,
            Jo,
            P1,
            _n,
            tn,
        ],
        styles: [
            ".register-form[_ngcontent-%COMP%]   .register-button[_ngcontent-%COMP%]{width:100%;height:40px;font-weight:500}.register-form[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]{color:#ff4d4f;font-size:14px;text-align:center}[_nghost-%COMP%]     .ant-card{border-radius:8px;box-shadow:0 2px 8px #0000001a}[_nghost-%COMP%]     .ant-form-item{margin-bottom:16px}[_nghost-%COMP%]     .ant-input{height:40px;border-radius:6px}",
        ],
    });
};
var C9 = ["*"];
function b9(t, n) {
    if (t & 1) {
        let e = Ht();
        (z(0, "nz-icon", 1),
            ve("click", function (r) {
                Ae(e);
                let o = g();
                return Ve(o.closeTag(r));
            }),
            C());
    }
}
var D2 = (() => {
        class t {
            cdr = l(ee);
            renderer = l(oe);
            el = l(B).nativeElement;
            directionality = l(he);
            destroyRef = l(K);
            nzMode = "default";
            nzColor;
            nzChecked = !1;
            nzBordered = !0;
            nzOnClose = new X();
            nzCheckedChange = new X();
            dir = "ltr";
            isPresetColor = !1;
            updateCheckedStatus() {
                this.nzMode === "checkable" &&
                    ((this.nzChecked = !this.nzChecked),
                    this.nzCheckedChange.emit(this.nzChecked));
            }
            closeTag(e) {
                (this.nzOnClose.emit(e),
                    e.defaultPrevented ||
                        this.renderer.removeChild(
                            this.renderer.parentNode(this.el),
                            this.el,
                        ));
            }
            clearPresetColor() {
                let e = new RegExp(
                        `(ant-tag-(?:${[...$4, ...U4].join("|")}))`,
                        "g",
                    ),
                    i = this.el.classList.toString(),
                    r = [],
                    o = e.exec(i);
                for (; o !== null; ) (r.push(o[1]), (o = e.exec(i)));
                this.el.classList.remove(...r);
            }
            setPresetColor() {
                (this.clearPresetColor(),
                    this.nzColor
                        ? (this.isPresetColor =
                              To(this.nzColor) || Ec(this.nzColor))
                        : (this.isPresetColor = !1),
                    this.isPresetColor &&
                        this.el.classList.add(`ant-tag-${this.nzColor}`));
            }
            ngOnInit() {
                (this.directionality.change
                    ?.pipe(N(this.destroyRef))
                    .subscribe((e) => {
                        ((this.dir = e), this.cdr.detectChanges());
                    }),
                    (this.dir = this.directionality.value));
            }
            ngOnChanges(e) {
                let { nzColor: i } = e;
                i && this.setPresetColor();
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-tag"]],
                hostAttrs: [1, "ant-tag"],
                hostVars: 12,
                hostBindings: function (i, r) {
                    (i & 1 &&
                        ve("click", function () {
                            return r.updateCheckedStatus();
                        }),
                        i & 2 &&
                            (Ge(
                                "background-color",
                                r.isPresetColor ? "" : r.nzColor,
                            ),
                            G(
                                "ant-tag-has-color",
                                r.nzColor && !r.isPresetColor,
                            )("ant-tag-checkable", r.nzMode === "checkable")(
                                "ant-tag-checkable-checked",
                                r.nzChecked,
                            )("ant-tag-rtl", r.dir === "rtl")(
                                "ant-tag-borderless",
                                !r.nzBordered,
                            )));
                },
                inputs: {
                    nzMode: "nzMode",
                    nzColor: "nzColor",
                    nzChecked: [2, "nzChecked", "nzChecked", _],
                    nzBordered: [2, "nzBordered", "nzBordered", _],
                },
                outputs: {
                    nzOnClose: "nzOnClose",
                    nzCheckedChange: "nzCheckedChange",
                },
                exportAs: ["nzTag"],
                features: [I],
                ngContentSelectors: C9,
                decls: 2,
                vars: 1,
                consts: [
                    [
                        "nzType",
                        "close",
                        "tabindex",
                        "-1",
                        1,
                        "ant-tag-close-icon",
                    ],
                    [
                        "nzType",
                        "close",
                        "tabindex",
                        "-1",
                        1,
                        "ant-tag-close-icon",
                        3,
                        "click",
                    ],
                ],
                template: function (i, r) {
                    (i & 1 && (be(), _e(0), E(1, b9, 1, 0, "nz-icon", 0)),
                        i & 2 && (u(), P(r.nzMode === "closeable" ? 1 : -1)));
                },
                dependencies: [Wt, Ct],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    L0 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ imports: [D2] });
        }
        return t;
    })();
var w9 = ["wordRef"];
function M9(t, n) {
    if ((t & 1 && (z(0, "span", 4), Q(1), C()), t & 2)) {
        let e = n.$implicit,
            i = n.$index,
            r = g().$index,
            o = g();
        (y(
            "ngClass",
            o.getLetterClass(r, i) +
                (e === " " && o.getLetterClass(r, i) === "letter-active"
                    ? " letter-active-space"
                    : ""),
        ),
            u(),
            s3(" ", e === " " ? "\u2423" : e, " "));
    }
}
function S9(t, n) {
    if (
        (t & 1 && (z(0, "nz-tag", 3, 1), xt(2, M9, 2, 2, "span", 4, Mn), C()),
        t & 2)
    ) {
        let e = n.$implicit,
            i = n.$index,
            r = g();
        (y("ngClass", r.getWordClass(i)), u(2), Tt(e));
    }
}
var oa = class t {
    sourceText = [];
    typedInput = [];
    currentWordIndex = 0;
    currentCharIndex = 0;
    isFocused = !0;
    wordElements;
    ngAfterViewChecked() {
        let n = this.wordElements.get(this.currentWordIndex);
        n &&
            n.nativeElement.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
    }
    getLetterClass(n, e) {
        let i = this.typedInput[n]?.[e];
        return i
            ? i.correct
                ? "letter-correct"
                : "letter-incorrect"
            : n === this.currentWordIndex && e === this.currentCharIndex
              ? "letter-active"
              : "";
    }
    getWordClass(n) {
        if (this.isActive(n))
            return this.isFocused ? "word-active" : "word-active-blur";
        let e = this.typedInput[n],
            i = this.sourceText[n];
        return !e || e.every((o) => !o)
            ? ""
            : e.every((o, a) => o?.key === i[a])
              ? "word-correct"
              : "word-incorrect";
    }
    isActive(n) {
        return n === this.currentWordIndex;
    }
    static ɵfac = function (e) {
        return new (e || t)();
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-drill-text"]],
        viewQuery: function (e, i) {
            if ((e & 1 && tt(w9, 5), e & 2)) {
                let r;
                le((r = de())) && (i.wordElements = r);
            }
        },
        inputs: {
            sourceText: "sourceText",
            typedInput: "typedInput",
            currentWordIndex: "currentWordIndex",
            currentCharIndex: "currentCharIndex",
            isFocused: "isFocused",
        },
        decls: 4,
        vars: 0,
        consts: [
            ["drillText", ""],
            ["wordRef", ""],
            [1, "drill-text"],
            [1, "word", 3, "ngClass"],
            [3, "ngClass"],
        ],
        template: function (e, i) {
            (e & 1 &&
                (z(0, "nz-card", 2, 0), xt(2, S9, 4, 1, "nz-tag", 3, Mn), C()),
                e & 2 && (u(2), Tt(i.sourceText)));
        },
        dependencies: [Nt, ka, _n, tn, L0, D2],
        styles: [
            ".drill-text[_ngcontent-%COMP%]{padding:2rem 2.5rem;background:#fafcff;border-radius:12px;box-shadow:0 4px 24px #1890ff0f,0 1.5px 6px #00000008;border:none;margin-bottom:1.5rem;display:flex;flex-wrap:wrap;font-size:1.05rem;font-family:monospace;line-height:1.7rem;overflow-y:visible;scrollbar-width:auto;-ms-overflow-style:auto}.drill-text[_ngcontent-%COMP%]::-webkit-scrollbar{display:block}.word[_ngcontent-%COMP%]{display:inline-flex;align-items:center;margin:0 .4rem .4rem 0;padding:.12rem .55rem;border-radius:7px;background:#f7f9fa;color:#222;border:1px solid #f0f0f0;font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:1em;font-weight:500;min-height:2.2rem;transition:background .25s cubic-bezier(.4,0,.2,1),box-shadow .25s cubic-bezier(.4,0,.2,1),border .25s cubic-bezier(.4,0,.2,1),color .25s cubic-bezier(.4,0,.2,1)}.word[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline;padding:0 .05rem}.letter[_ngcontent-%COMP%]{display:inline-block;padding:0 .5px 6px;font-weight:500;line-height:2.2rem;position:relative;transition:color .25s cubic-bezier(.4,0,.2,1),background .25s cubic-bezier(.4,0,.2,1)}.letter-correct[_ngcontent-%COMP%]{color:#389e0d}.letter-incorrect[_ngcontent-%COMP%]{color:#cf1322}.letter-active[_ngcontent-%COMP%]{color:#1890ff;box-shadow:0 2px #1890ff;transition:color .25s cubic-bezier(.4,0,.2,1),box-shadow .25s cubic-bezier(.4,0,.2,1);padding-bottom:6px;animation:_ngcontent-%COMP%_underline-fade-in .25s cubic-bezier(.4,0,.2,1)}.letter-active-space[_ngcontent-%COMP%]{box-shadow:none!important;animation:none!important}@keyframes _ngcontent-%COMP%_underline-fade-in{0%{box-shadow:0 2px #1890ff00}to{box-shadow:0 2px #1890ff}}.word-active[_ngcontent-%COMP%]{background:#f0f7ff;border:1px solid #e6f4ff;color:#1890ff;box-shadow:none}.word-correct[_ngcontent-%COMP%]{background:#f3fff7;border:1px solid #b7eb8f;color:#389e0d;animation:_ngcontent-%COMP%_word-pulse-green .32s cubic-bezier(.4,0,.2,1)}.word-incorrect[_ngcontent-%COMP%]{background:#fff6f6;border:1px solid #ffccc7;color:#cf1322;animation:_ngcontent-%COMP%_word-pulse-red .32s cubic-bezier(.4,0,.2,1)}@keyframes _ngcontent-%COMP%_word-pulse-green{0%{box-shadow:0 0 #52c41a1a}60%{box-shadow:0 0 0 4px #52c41a0f}to{box-shadow:0 0 #52c41a00}}@keyframes _ngcontent-%COMP%_word-pulse-red{0%{box-shadow:0 0 #ff4d4f1a}60%{box-shadow:0 0 0 4px #ff4d4f0f}to{box-shadow:0 0 #ff4d4f00}}.word-active-blur[_ngcontent-%COMP%]{background:#f5f5f5;border:1px solid #f0f0f0;color:#222}",
        ],
    });
};
var x9 = ["drillInput"],
    nr = class t {
        constructor(n) {
            this.focusMonitor = n;
        }
        keyTyped = new X();
        focusEvent = new X();
        blurEvent = new X();
        drillInput;
        ngAfterViewInit() {
            (this.focusMonitor.monitor(this.drillInput).subscribe((n) => {
                n ? this.focusEvent.emit() : this.blurEvent.emit();
            }),
                this.focusInput());
        }
        ngOnDestroy() {
            this.focusMonitor.stopMonitoring(this.drillInput);
        }
        onKeyDown(n) {
            let e = n.key;
            (e === "Backspace" && (n.ctrlKey || n.altKey)
                ? this.keyTyped.emit("CTRL_BACKSPACE")
                : e === "Escape"
                  ? this.keyTyped.emit("ESCAPE")
                  : (/^[a-zA-Z0-9 ]$/.test(e) || e === "Backspace") &&
                    this.keyTyped.emit(e),
                n.preventDefault());
        }
        clearDrillInput() {
            this.drillInput?.nativeElement &&
                (this.drillInput.nativeElement.value = "");
        }
        focusInput() {
            this.drillInput.nativeElement.focus();
        }
        blurInput() {
            this.drillInput.nativeElement.blur();
        }
        static ɵfac = function (e) {
            return new (e || t)(w(E1));
        };
        static ɵcmp = R({
            type: t,
            selectors: [["app-drill-input"]],
            viewQuery: function (e, i) {
                if ((e & 1 && tt(x9, 5), e & 2)) {
                    let r;
                    le((r = de())) && (i.drillInput = r.first);
                }
            },
            outputs: {
                keyTyped: "keyTyped",
                focusEvent: "focusEvent",
                blurEvent: "blurEvent",
            },
            decls: 2,
            vars: 0,
            consts: [
                ["drillInput", ""],
                [
                    "name",
                    "drillInput",
                    "type",
                    "text",
                    "autocomplete",
                    "off",
                    1,
                    "drill-input",
                    3,
                    "keydown",
                ],
            ],
            template: function (e, i) {
                if (e & 1) {
                    let r = Ht();
                    (hr(0, "input", 1, 0),
                        a3("keydown", function (a) {
                            return (Ae(r), Ve(i.onKeyDown(a)));
                        }),
                        ur());
                }
            },
            styles: [
                "input[_ngcontent-%COMP%]{font-family:monospace;font-size:1.25rem;padding:.5rem;width:100%;box-sizing:border-box}.drill-input[_ngcontent-%COMP%]{opacity:0;position:absolute;width:0;height:0;z-index:-1}",
            ],
        });
    };
var N0 = { Test: 10, Short: 50, Medium: 70, Long: 100, Marathon: 1e3 };
var Y0 = (() => {
        class t {
            transform(e, i = "HH:mm:ss") {
                let r = Number(e || 0);
                return G8.reduce((o, [a, s]) => {
                    if (o.indexOf(a) !== -1) {
                        let c = Math.floor(r / s);
                        return (
                            (r -= c * s),
                            o.replace(new RegExp(`${a}+`, "g"), (d) =>
                                Rc(c.toString(), d.length, "0"),
                            )
                        );
                    }
                    return o;
                }, i);
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵpipe = lr({ name: "nzTimeRange", type: t, pure: !0 });
        }
        return t;
    })(),
    B0 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({});
        }
        return t;
    })();
var k9 = (t) => ({ $implicit: t });
function E9(t, n) {
    if ((t & 1 && mr(0, 1), t & 2)) {
        let e = g();
        y("ngTemplateOutlet", e.nzValueTemplate)(
            "ngTemplateOutletContext",
            Sn(2, k9, e.nzValue),
        );
    }
}
function P9(t, n) {
    if ((t & 1 && (z(0, "span", 2), Q(1), C()), t & 2)) {
        let e = g(2);
        (u(), se(e.displayInt));
    }
}
function A9(t, n) {
    if ((t & 1 && (z(0, "span", 3), Q(1), C()), t & 2)) {
        let e = g(2);
        (u(), se(e.displayDecimal));
    }
}
function V9(t, n) {
    if (
        (t & 1 && (E(0, P9, 2, 1, "span", 2), E(1, A9, 2, 1, "span", 3)), t & 2)
    ) {
        let e = g();
        (P(e.displayInt ? 0 : -1), u(), P(e.displayDecimal ? 1 : -1));
    }
}
function F9(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g();
        (u(), se(e.nzTitle));
    }
}
function H9(t, n) {
    (t & 1 && W(0, "nz-skeleton", 2), t & 2 && y("nzParagraph", !1));
}
function O9(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzPrefix));
    }
}
function I9(t, n) {
    if (
        (t & 1 && (z(0, "span", 5), te(1, O9, 2, 1, "ng-container", 1), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzPrefix));
    }
}
function R9(t, n) {
    if ((t & 1 && (Fe(0), Q(1), He()), t & 2)) {
        let e = g(3);
        (u(), se(e.nzSuffix));
    }
}
function L9(t, n) {
    if (
        (t & 1 && (z(0, "span", 7), te(1, R9, 2, 1, "ng-container", 1), C()),
        t & 2)
    ) {
        let e = g(2);
        (u(), y("nzStringTemplateOutlet", e.nzSuffix));
    }
}
function N9(t, n) {
    if (
        (t & 1 &&
            (z(0, "div", 4),
            E(1, I9, 2, 1, "span", 5),
            W(2, "nz-statistic-number", 6),
            E(3, L9, 2, 1, "span", 7),
            C()),
        t & 2)
    ) {
        let e = g();
        (Ot(e.nzValueStyle),
            u(),
            P(e.nzPrefix ? 1 : -1),
            u(),
            y("nzValue", e.nzValue)("nzValueTemplate", e.nzValueTemplate),
            u(),
            P(e.nzSuffix ? 3 : -1));
    }
}
function Y9(t, n) {
    if ((t & 1 && (Q(0), c3(1, "nzTimeRange")), t & 2)) {
        let e = g();
        se(l3(1, 1, e.diff, e.nzFormat));
    }
}
var B9 = (() => {
        class t {
            nzValue;
            nzValueTemplate;
            displayInt = "";
            displayDecimal = "";
            locale_id = l(wa);
            ngOnChanges() {
                this.formatNumber();
            }
            formatNumber() {
                let e =
                        typeof this.nzValue == "number"
                            ? "."
                            : Ta(this.locale_id, xn.Decimal),
                    i = String(this.nzValue),
                    [r, o] = i.split(e);
                ((this.displayInt = r),
                    (this.displayDecimal = o ? `${e}${o}` : ""));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-statistic-number"]],
                inputs: {
                    nzValue: "nzValue",
                    nzValueTemplate: "nzValueTemplate",
                },
                exportAs: ["nzStatisticNumber"],
                features: [I],
                decls: 3,
                vars: 1,
                consts: [
                    [1, "ant-statistic-content-value"],
                    [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                    [1, "ant-statistic-content-value-int"],
                    [1, "ant-statistic-content-value-decimal"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (z(0, "span", 0),
                        E(1, E9, 1, 4, "ng-container", 1)(2, V9, 2, 2),
                        C()),
                        i & 2 && (u(), P(r.nzValueTemplate ? 1 : 2)));
                },
                dependencies: [Lt],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    ir = (() => {
        class t {
            nzPrefix;
            nzSuffix;
            nzTitle;
            nzValue;
            nzValueStyle = {};
            nzValueTemplate;
            nzLoading = !1;
            dir = "ltr";
            cdr = l(ee);
            destroyRef = l(K);
            directionality = l(he);
            ngOnInit() {
                (this.directionality.change
                    ?.pipe(N(this.destroyRef))
                    .subscribe((e) => {
                        ((this.dir = e), this.cdr.detectChanges());
                    }),
                    (this.dir = this.directionality.value));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-statistic"]],
                hostAttrs: [1, "ant-statistic"],
                hostVars: 2,
                hostBindings: function (i, r) {
                    i & 2 && G("ant-statistic-rtl", r.dir === "rtl");
                },
                inputs: {
                    nzPrefix: "nzPrefix",
                    nzSuffix: "nzSuffix",
                    nzTitle: "nzTitle",
                    nzValue: "nzValue",
                    nzValueStyle: "nzValueStyle",
                    nzValueTemplate: "nzValueTemplate",
                    nzLoading: [2, "nzLoading", "nzLoading", _],
                },
                exportAs: ["nzStatistic"],
                decls: 4,
                vars: 2,
                consts: [
                    [1, "ant-statistic-title"],
                    [4, "nzStringTemplateOutlet"],
                    [1, "ant-statistic-skeleton", 3, "nzParagraph"],
                    [1, "ant-statistic-content", 3, "style"],
                    [1, "ant-statistic-content"],
                    [1, "ant-statistic-content-prefix"],
                    [3, "nzValue", "nzValueTemplate"],
                    [1, "ant-statistic-content-suffix"],
                ],
                template: function (i, r) {
                    (i & 1 &&
                        (z(0, "div", 0),
                        te(1, F9, 2, 1, "ng-container", 1),
                        C(),
                        E(2, H9, 1, 1, "nz-skeleton", 2)(
                            3,
                            N9,
                            4,
                            6,
                            "div",
                            3,
                        )),
                        i & 2 &&
                            (u(),
                            y("nzStringTemplateOutlet", r.nzTitle),
                            u(),
                            P(r.nzLoading ? 2 : 3)));
                },
                dependencies: [ta, ea, B9, bt, Ze],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    j9 = 1e3 / 30,
    U9 = (() => {
        class t extends ir {
            ngZone = l(q);
            platform = l(ye);
            nzFormat = "HH:mm:ss";
            nzCountdownFinish = new X();
            diff;
            target = 0;
            intervalId = null;
            constructor() {
                (super(),
                    this.destroyRef.onDestroy(() => {
                        this.stopTimer();
                    }));
            }
            ngOnChanges(e) {
                let { nzValue: i } = e;
                i &&
                    ((this.target = Number(i.currentValue)),
                    i.isFirstChange() || this.syncTimer());
            }
            ngOnInit() {
                (super.ngOnInit(), this.syncTimer());
            }
            syncTimer() {
                this.target >= Date.now()
                    ? this.startTimer()
                    : this.stopTimer();
            }
            startTimer() {
                this.platform.isBrowser &&
                    this.ngZone.runOutsideAngular(() => {
                        (this.stopTimer(),
                            (this.intervalId = setInterval(() => {
                                (this.updateValue(), this.cdr.detectChanges());
                            }, j9)));
                    });
            }
            stopTimer() {
                this.intervalId &&
                    (clearInterval(this.intervalId), (this.intervalId = null));
            }
            updateValue() {
                ((this.diff = Math.max(this.target - Date.now(), 0)),
                    this.diff === 0 &&
                        (this.stopTimer(),
                        this.nzCountdownFinish.observers.length &&
                            this.ngZone.run(() =>
                                this.nzCountdownFinish.emit(),
                            )));
            }
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵcmp = R({
                type: t,
                selectors: [["nz-countdown"]],
                inputs: { nzFormat: "nzFormat" },
                outputs: { nzCountdownFinish: "nzCountdownFinish" },
                exportAs: ["nzCountdown"],
                features: [Se, I],
                decls: 3,
                vars: 6,
                consts: [
                    ["countDownTpl", ""],
                    [
                        3,
                        "nzValue",
                        "nzValueStyle",
                        "nzValueTemplate",
                        "nzTitle",
                        "nzPrefix",
                        "nzSuffix",
                    ],
                ],
                template: function (i, r) {
                    if (
                        (i & 1 &&
                            (W(0, "nz-statistic", 1),
                            te(1, Y9, 2, 4, "ng-template", null, 0, Dn)),
                        i & 2)
                    ) {
                        let o = sn(2);
                        y("nzValue", r.diff)("nzValueStyle", r.nzValueStyle)(
                            "nzValueTemplate",
                            r.nzValueTemplate || o,
                        )("nzTitle", r.nzTitle)("nzPrefix", r.nzPrefix)(
                            "nzSuffix",
                            r.nzSuffix,
                        );
                    }
                },
                dependencies: [ir, B0, Y0],
                encapsulation: 2,
                changeDetection: 0,
            });
        }
        return t;
    })(),
    j0 = (() => {
        class t {
            static ɵfac = function (i) {
                return new (i || t)();
            };
            static ɵmod = V({ type: t });
            static ɵinj = A({ imports: [ir, U9] });
        }
        return t;
    })();
var V1 = {
    Common: [
        "and",
        "but",
        "or",
        "so",
        "because",
        "although",
        "however",
        "moreover",
        "therefore",
        "then",
        "also",
        "besides",
        "thus",
        "hence",
        "yet",
        "still",
        "meanwhile",
        "while",
        "as",
        "since",
        "after",
        "before",
        "until",
        "once",
        "when",
        "whenever",
        "whereas",
        "where",
        "whether",
        "that",
        "which",
        "who",
        "whom",
        "whose",
        "this",
        "these",
        "those",
        "each",
        "every",
        "any",
        "some",
        "none",
        "no",
        "not",
        "never",
        "always",
        "often",
        "sometimes",
        "seldom",
        "rarely",
        "above",
        "below",
        "over",
        "under",
        "between",
        "among",
        "inside",
        "outside",
        "onto",
        "into",
        "upon",
        "of",
        "for",
        "with",
        "without",
        "about",
        "around",
        "through",
        "across",
        "during",
        "in",
        "on",
        "at",
        "to",
        "from",
        "by",
        "off",
        "up",
        "down",
        "out",
        "go",
        "come",
        "make",
        "do",
        "have",
        "get",
        "take",
        "keep",
        "give",
        "send",
        "put",
        "bring",
        "let",
        "say",
        "tell",
        "ask",
        "see",
        "look",
        "hear",
        "feel",
        "think",
        "know",
        "believe",
        "hope",
        "want",
        "need",
        "like",
        "love",
        "hate",
        "prefer",
        "good",
        "bad",
        "better",
        "worse",
        "best",
        "worst",
        "same",
        "different",
        "similar",
        "opposite",
        "first",
        "last",
        "next",
        "previous",
        "early",
        "late",
        "new",
        "old",
        "young",
        "long",
        "short",
        "high",
        "low",
        "big",
        "small",
        "great",
        "little",
        "many",
        "much",
        "few",
        "more",
        "less",
        "most",
        "least",
        "one",
        "two",
        "three",
        "four",
        "five",
        "ten",
        "hundred",
        "thousand",
        "million",
        "day",
        "week",
        "month",
        "year",
        "time",
        "hour",
        "minute",
        "man",
        "woman",
        "boy",
        "girl",
        "child",
        "people",
        "person",
        "friend",
        "family",
        "group",
        "work",
        "job",
        "task",
        "home",
        "school",
        "place",
        "thing",
        "idea",
        "case",
        "part",
    ],
    Beginner: [
        "book",
        "tree",
        "milk",
        "blue",
        "cold",
        "warm",
        "fast",
        "slow",
        "lamp",
        "road",
        "fish",
        "bird",
        "hand",
        "foot",
        "face",
        "head",
        "shoe",
        "rain",
        "snow",
        "wind",
        "cat",
        "dog",
        "sun",
        "moon",
        "star",
        "ship",
        "coat",
        "fork",
        "plate",
        "soap",
        "door",
        "bell",
        "farm",
        "bank",
        "shop",
        "clay",
        "coin",
        "note",
        "card",
        "post",
        "flag",
        "line",
        "wire",
        "pipe",
        "ball",
        "game",
        "ring",
        "wood",
        "rock",
        "hill",
        "sand",
        "salt",
        "nest",
        "leaf",
        "bush",
        "seed",
        "root",
        "hole",
        "path",
        "barn",
        "desk",
        "hall",
        "wall",
        "roof",
        "seat",
        "cave",
        "road",
        "mile",
        "pond",
        "lake",
        "drop",
        "fire",
        "coal",
        "cook",
        "bake",
        "boil",
        "grill",
        "draw",
        "paint",
        "read",
        "write",
        "play",
        "jump",
        "walk",
        "run",
        "skip",
        "push",
        "pull",
        "lift",
        "hold",
        "bend",
        "look",
        "peek",
        "peek",
        "grab",
        "yell",
        "sing",
        "rest",
        "stay",
        "move",
        "stop",
        "turn",
        "open",
        "shut",
        "lock",
        "wash",
        "dry",
        "dust",
        "sweep",
        "mop",
        "pick",
        "drop",
        "pack",
        "wrap",
        "seal",
        "mark",
        "mail",
        "call",
        "chat",
        "text",
        "send",
        "note",
        "news",
        "sign",
        "word",
        "line",
        "page",
        "list",
        "quiz",
        "test",
        "math",
        "arts",
        "draw",
        "code",
        "edit",
        "film",
        "clip",
        "snap",
        "zoom",
        "crop",
        "link",
        "view",
        "like",
        "love",
        "rate",
        "vote",
        "save",
        "copy",
        "move",
        "drag",
        "swap",
        "flip",
        "hold",
        "grab",
        "spin",
        "roll",
        "ride",
        "bike",
        "tram",
        "rail",
        "bus",
        "lane",
        "gear",
        "horn",
        "seat",
        "belt",
        "stop",
        "slow",
        "goes",
        "wait",
        "turn",
        "exit",
        "gate",
        "door",
        "lock",
        "bell",
        "call",
        "text",
        "buzz",
        "knob",
        "step",
        "tile",
        "room",
        "lift",
        "floor",
        "keys",
        "lamp",
        "sofa",
        "film",
        "draw",
        "read",
        "rest",
        "game",
        "jump",
        "play",
        "goal",
        "kick",
        "pass",
        "win",
        "lose",
        "rank",
        "lead",
        "team",
        "club",
        "fans",
        "news",
        "blog",
        "post",
        "feed",
        "site",
        "link",
        "menu",
        "file",
        "note",
        "memo",
        "form",
        "list",
        "font",
        "page",
        "card",
        "clip",
        "pen",
        "ruler",
        "eraser",
        "chair",
        "board",
        "class",
        "group",
        "quiz",
        "exam",
        "mark",
        "rank",
        "file",
        "save",
        "type",
        "edit",
        "code",
        "repo",
        "data",
        "task",
        "job",
        "send",
        "sync",
        "ping",
        "load",
        "boot",
        "disk",
        "core",
        "bits",
        "byte",
        "port",
        "node",
        "link",
        "wire",
        "plug",
        "pair",
        "grid",
        "hash",
        "loop",
        "list",
        "tree",
        "leaf",
        "path",
        "test",
        "mock",
        "bug",
        "fix",
        "hint",
        "warn",
        "note",
    ],
    Intermediate: [
        "awkward",
        "banquet",
        "buzzing",
        "complex",
        "exhibit",
        "frequent",
        "gazette",
        "hijack",
        "injured",
        "jewelry",
        "keyword",
        "lawyers",
        "maximum",
        "network",
        "oxidise",
        "payment",
        "qualify",
        "request",
        "service",
        "texture",
        "unaware",
        "voucher",
        "waxwork",
        "zealous",
        "zipping",
        "whisper",
        "workout",
        "vampire",
        "voltage",
        "welfare",
        "wrecked",
        "voyager",
        "violate",
        "venison",
        "velocity",
        "whistle",
        "waffles",
        "virtue",
        "jubilee",
        "jetskis",
        "horizon",
        "hijinks",
        "journey",
        "justine",
        "knavery",
        "knuckle",
        "keynote",
        "jukebox",
        "justice",
        "quicken",
        "vaccine",
        "zealots",
        "zippers",
        "warzone",
        "viewing",
        "boxwood",
        "wizards",
        "village",
        "joggers",
        "vividly",
        "waxiest",
        "boxfish",
        "equator",
        "zoology",
        "waivers",
        "jubiler",
        "volcano",
        "examine",
        "vulture",
        "extinct",
        "waggish",
        "javelin",
        "wheezed",
        "boxcars",
        "zesting",
        "velvets",
        "awkward",
        "example",
        "exactly",
        "quality",
        "waxlike",
        "wolfish",
        "wickeds",
        "vouched",
        "hacksaw",
        "jetting",
        "zippers",
        "quizzer",
        "ziplock",
        "viewers",
        "waltzes",
        "vaguest",
        "jackals",
        "fixable",
        "hawkish",
        "jabbing",
        "jumping",
        "valleys",
        "walkman",
        "voluble",
        "zigzags",
        "quickly",
        "quieter",
        "exotics",
        "wetland",
        "voxlink",
        "exiting",
        "jaggery",
        "wackily",
        "boxlike",
        "wishing",
        "whimper",
        "equally",
        "jughead",
        "waisted",
        "vexedly",
        "fizzled",
        "vintner",
        "jobsite",
        "voltage",
        "zigging",
        "hexagon",
        "voicing",
        "wizardy",
        "waxhead",
        "junkers",
        "volumes",
        "wrecked",
        "jawbone",
    ],
    Advanced: [
        "accommodating",
        "unforgettable",
        "disappearance",
        "embarrassment",
        "accommodation",
        "disapproving",
        "illustrations",
        "announcement",
        "unacceptable",
        "unnecessarily",
        "interruption",
        "inflammation",
        "acclimatising",
        "counterattack",
        "recollection",
        "cooperation",
        "battlegrounds",
        "reappearance",
        "disconnection",
        "cheeseburgers",
        "commissioners",
        "correspondence",
        "overconfidence",
        "recommending",
        "unintelligent",
        "disobediently",
        "reoccurrence",
        "accomplishing",
        "acceleration",
        "acclimatisers",
        "inappropriate",
        "encouragement",
        "inattentively",
        "acknowledging",
        "reconciliation",
        "reestablished",
        "misunderstand",
        "recommendable",
        "counterfeiting",
        "questionnaire",
        "acquaintances",
        "refrigeration",
        "retransmitted",
        "differentiates",
        "accomplishment",
        "accreditations",
        "rehabilitation",
        "overwhelmingly",
        "hypersensitive",
        "inconsiderable",
        "infrastructure",
        "overstatement",
        "reintroduction",
        "decontaminated",
        "oversimplified",
        "counterclaimed",
        "circumference",
        "unquestionable",
        "retransmission",
        "inappropriately",
        "misinterpretation",
        "telecommunication",
    ],
};
var aa = class t {
    getRandomDrillText(n, e) {
        let i = V1.Common.concat(V1.Beginner),
            r = N0[e],
            o = [];
        switch (n) {
            case "Beginner":
                o = V1.Beginner;
                break;
            case "Intermediate":
                o = V1.Intermediate;
                break;
            case "Advanced":
                o = V1.Advanced;
                break;
        }
        let a = Math.floor(0.8 * r),
            s = Math.floor(0.2 * r),
            c = [...i].sort(() => Math.random() - 0.5),
            d = [...o].sort(() => Math.random() - 0.5),
            h = c.slice(0, a),
            f = d.slice(0, s);
        return [...h, ...f].sort(() => Math.random() - 0.5);
    }
    static ɵfac = function (e) {
        return new (e || t)();
    };
    static ɵprov = p({ token: t, factory: t.ɵfac, providedIn: "root" });
};
var G9 = () => ({ color: "#1890ff" }),
    K9 = () => ({ color: "#52c41a" }),
    Z9 = () => ({ color: "#fa8c16" });
function X9(t, n) {
    if (t & 1) {
        let e = Ht();
        (z(0, "app-drill-input", 7),
            ve("keyTyped", function (r) {
                Ae(e);
                let o = g();
                return Ve(o.onKeyTyped(r));
            })("focusEvent", function () {
                Ae(e);
                let r = g();
                return Ve(r.onInputFocus());
            })("blurEvent", function () {
                Ae(e);
                let r = g();
                return Ve(r.onInputBlur());
            }),
            C());
    }
}
var sa = class t {
    constructor(n, e) {
        this.drillTextService = n;
        this.ngZone = e;
    }
    drillInputComponent;
    isDrillActive = !1;
    sourceText = [];
    wordLocked = [];
    typedText = [];
    currentWordIndex = 0;
    currentCharIndex = 0;
    startTime = 0;
    totalTimeInSeconds = 60;
    remainingTime = "01:00";
    endTime = 0;
    timerInterval;
    wpm = 0;
    accuracy = 100;
    drillStats;
    isInputFocused = !0;
    ngOnInit() {
        this.startDrill();
    }
    startDrill() {
        ((this.isDrillActive = !0),
            (this.drillStats = {
                wpm: 0,
                accuracy: 0,
                errorMap: { wordErrorMap: {}, charErrorMap: {} },
                corrections: 0,
            }));
        let n = this.drillTextService.getRandomDrillText("Advanced", "Long");
        ((this.sourceText = n.map((e, i) => {
            let r = e.split("");
            return i < n.length - 1 ? [...r, " "] : r;
        })),
            (this.typedText = this.sourceText.map((e) =>
                new Array(e.length).fill(void 0),
            )),
            (this.wordLocked = this.sourceText.map(() => !1)),
            (this.currentWordIndex = 0),
            (this.currentCharIndex = 0));
    }
    stopDrill() {
        ((this.isDrillActive = !1),
            this.stopTimer(),
            (this.drillStats.wpm = this.wpm),
            (this.drillStats.accuracy = this.accuracy));
    }
    resumeDrill() {
        this.focusInput();
    }
    onKeyTyped(n) {
        if (n === "CTRL_BACKSPACE") {
            this.clearCurrentWord();
            return;
        } else if (n === "ESCAPE") {
            this.drillInputComponent.blurInput();
            return;
        }
        if (n === "Backspace".toString()) {
            (this.drillStats.corrections++, this.handleBackspace());
            return;
        }
        this.startTime || this.startTimer();
        let e = this.sourceText[this.currentWordIndex],
            i = e[this.currentCharIndex],
            o = i === n;
        if (
            (o ||
                ((this.drillStats.errorMap.charErrorMap[i] ??= 0),
                this.drillStats.errorMap.charErrorMap[i]++),
            !(this.currentCharIndex >= e.length) &&
                ((this.typedText[this.currentWordIndex][this.currentCharIndex] =
                    { key: n, correct: o }),
                this.currentCharIndex++,
                this.currentCharIndex === e.length))
        ) {
            console.log(this.drillStats);
            let a = this.typedText[this.currentWordIndex].every(
                (s, c) => s?.key === this.sourceText[this.currentWordIndex][c],
            );
            if (!a) {
                let s = e.join("").trim();
                ((this.drillStats.errorMap.wordErrorMap[s] ??= 0),
                    this.drillStats.errorMap.wordErrorMap[s]++);
            }
            if (
                ((this.wordLocked[this.currentWordIndex] = a),
                this.drillInputComponent.clearDrillInput(),
                this.currentWordIndex++,
                (this.currentCharIndex = 0),
                this.currentWordIndex >= this.sourceText.length)
            ) {
                this.stopDrill();
                return;
            }
        }
    }
    clearCurrentWord() {
        if (this.currentCharIndex === 0 && this.currentWordIndex > 0) {
            let e = this.currentWordIndex - 1;
            if (this.wordLocked[e]) return;
            let i = this.sourceText[e].length;
            ((this.typedText[e] = new Array(i).fill(void 0)),
                (this.currentWordIndex = e),
                (this.currentCharIndex = 0),
                this.drillInputComponent.clearDrillInput());
            return;
        }
        if (this.wordLocked[this.currentWordIndex]) return;
        let n = this.sourceText[this.currentWordIndex]?.length ?? 0;
        ((this.typedText[this.currentWordIndex] = new Array(n).fill(void 0)),
            (this.currentCharIndex = 0),
            this.drillInputComponent.clearDrillInput());
    }
    handleBackspace() {
        if (this.currentCharIndex === 0) {
            if (this.currentWordIndex === 0) return;
            let n = this.currentWordIndex - 1;
            if (this.wordLocked[n]) return;
            ((this.currentWordIndex = n),
                (this.currentCharIndex = this.sourceText[n].length));
        }
        (this.currentCharIndex--,
            (this.typedText[this.currentWordIndex][this.currentCharIndex] =
                void 0));
    }
    updateWPMAndAccuracy() {
        let e = this.typedText.flat().filter((a) => a !== void 0),
            i = e.filter((a) => a?.correct).length,
            r = (Date.now() - this.startTime) / 6e4;
        this.wpm = Math.floor(i / 5 / r);
        let o = e.length;
        this.accuracy = o ? Math.floor((i / o) * 100) : 100;
    }
    startTimer() {
        ((this.startTime = Date.now()),
            (this.endTime = this.startTime + this.totalTimeInSeconds * 1e3),
            (this.timerInterval = setInterval(() => {
                let n = this.endTime - Date.now(),
                    e = Math.max(0, Math.floor(n / 1e3)),
                    i = Math.floor(e / 60),
                    r = e % 60;
                ((this.remainingTime = `${this.pad(i)}:${this.pad(r)}`),
                    this.updateWPMAndAccuracy(),
                    n <= 0 && this.stopDrill());
            }, 1e3)));
    }
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    pad(n) {
        return n.toString().padStart(2, "0");
    }
    focusInput() {
        this.drillInputComponent?.focusInput();
    }
    onInputFocus() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.isInputFocused = !0;
                });
            });
        });
    }
    onInputBlur() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.isInputFocused = !1;
                });
            });
        });
    }
    static ɵfac = function (e) {
        return new (e || t)(w(aa), w(q));
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-drill-engine"]],
        viewQuery: function (e, i) {
            if ((e & 1 && tt(nr, 5), e & 2)) {
                let r;
                le((r = de())) && (i.drillInputComponent = r.first);
            }
        },
        decls: 8,
        vars: 15,
        consts: [
            [1, "drill-engine-center", 3, "click"],
            [1, "drill-metrics-card"],
            [1, "drill-metrics"],
            ["nzTitle", "WPM", 3, "nzValue", "nzValueStyle"],
            [
                "nzTitle",
                "Accuracy",
                "nzSuffix",
                "%",
                3,
                "nzValue",
                "nzValueStyle",
            ],
            ["nzTitle", "Time Left", 3, "nzValue", "nzValueStyle"],
            [
                3,
                "sourceText",
                "typedInput",
                "currentWordIndex",
                "currentCharIndex",
                "isFocused",
            ],
            [3, "keyTyped", "focusEvent", "blurEvent"],
        ],
        template: function (e, i) {
            (e & 1 &&
                (z(0, "div", 0),
                ve("click", function () {
                    return i.focusInput();
                }),
                z(1, "nz-card", 1)(2, "div", 2),
                W(3, "nz-statistic", 3)(4, "nz-statistic", 4)(
                    5,
                    "nz-statistic",
                    5,
                ),
                C()(),
                W(6, "app-drill-text", 6),
                E(7, X9, 1, 0, "app-drill-input"),
                C()),
                e & 2 &&
                    (u(3),
                    y("nzValue", i.wpm)("nzValueStyle", It(12, G9)),
                    u(),
                    y("nzValue", i.accuracy)("nzValueStyle", It(13, K9)),
                    u(),
                    y("nzValue", i.remainingTime)("nzValueStyle", It(14, Z9)),
                    u(),
                    y("sourceText", i.sourceText)("typedInput", i.typedText)(
                        "currentWordIndex",
                        i.currentWordIndex,
                    )("currentCharIndex", i.currentCharIndex)(
                        "isFocused",
                        i.isInputFocused,
                    ),
                    u(),
                    P(i.isDrillActive ? 7 : -1)));
        },
        dependencies: [Nt, oa, nr, _n, tn, j0, ir],
        styles: [
            ".drill-metrics-card[_ngcontent-%COMP%]{margin-bottom:1rem;border-radius:8px;box-shadow:0 2px 8px #0000001a}.drill-metrics[_ngcontent-%COMP%]{display:flex;justify-content:space-around;gap:2rem;padding:.5rem 0}.drill-engine-center[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;max-width:900px;margin:0 auto;padding:2rem;box-sizing:border-box;position:relative}.pause-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;z-index:10;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;font-weight:700;text-align:center;background-color:#0000001a;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:all;-webkit-user-select:none;user-select:none;transition:opacity .3s ease}.pause-message[_ngcontent-%COMP%]{text-align:center;color:#fff;font-family:monospace}.pause-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2rem;margin-bottom:.5rem}.pause-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.1rem;opacity:.8}",
        ],
    });
};
var U0 = () => {
    let t = l(ge);
    return localStorage.getItem("accessToken")
        ? !0
        : (t.navigate(["/auth/login"]), !1);
};
var $0 = () => {
    let t = l(ge);
    return localStorage.getItem("accessToken")
        ? (t.navigate(["/drill"]), !1)
        : !0;
};
var W0 = [
    {
        path: "auth",
        component: ao,
        canActivate: [$0],
        children: [
            { path: "login", component: ia, children: [] },
            { path: "register", component: ra, children: [] },
        ],
    },
    { path: "drill", component: sa, canActivate: [U0] },
    { path: "", redirectTo: "drill", pathMatch: "full" },
    { path: "**", redirectTo: "auth/login" },
];
var Q9 = "@",
    J9 = (() => {
        class t {
            doc;
            delegate;
            zone;
            animationType;
            moduleImpl;
            _rendererFactoryPromise = null;
            scheduler = null;
            injector = l(fe);
            loadingSchedulerFn = l(em, { optional: !0 });
            _engine;
            constructor(e, i, r, o, a) {
                ((this.doc = e),
                    (this.delegate = i),
                    (this.zone = r),
                    (this.animationType = o),
                    (this.moduleImpl = a));
            }
            ngOnDestroy() {
                this._engine?.flush();
            }
            loadImpl() {
                let e = () =>
                        this.moduleImpl ??
                        import("./chunk-K3HJZURW.js").then((r) => r),
                    i;
                return (
                    this.loadingSchedulerFn
                        ? (i = this.loadingSchedulerFn(e))
                        : (i = e()),
                    i
                        .catch((r) => {
                            throw new j(5300, !1);
                        })
                        .then(
                            ({
                                ɵcreateEngine: r,
                                ɵAnimationRendererFactory: o,
                            }) => {
                                this._engine = r(this.animationType, this.doc);
                                let a = new o(
                                    this.delegate,
                                    this._engine,
                                    this.zone,
                                );
                                return ((this.delegate = a), a);
                            },
                        )
                );
            }
            createRenderer(e, i) {
                let r = this.delegate.createRenderer(e, i);
                if (r.ɵtype === 0) return r;
                typeof r.throwOnSyntheticProps == "boolean" &&
                    (r.throwOnSyntheticProps = !1);
                let o = new x2(r);
                return (
                    i?.data?.animation &&
                        !this._rendererFactoryPromise &&
                        (this._rendererFactoryPromise = this.loadImpl()),
                    this._rendererFactoryPromise
                        ?.then((a) => {
                            let s = a.createRenderer(e, i);
                            (o.use(s),
                                (this.scheduler ??= this.injector.get(
                                    j2,
                                    null,
                                    { optional: !0 },
                                )),
                                this.scheduler?.notify(10));
                        })
                        .catch((a) => {
                            o.use(r);
                        }),
                    o
                );
            }
            begin() {
                this.delegate.begin?.();
            }
            end() {
                this.delegate.end?.();
            }
            whenRenderingDone() {
                return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
            }
            componentReplaced(e) {
                (this._engine?.flush(), this.delegate.componentReplaced?.(e));
            }
            static ɵfac = function (i) {
                sr();
            };
            static ɵprov = p({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    x2 = class {
        delegate;
        replay = [];
        ɵtype = 1;
        constructor(n) {
            this.delegate = n;
        }
        use(n) {
            if (((this.delegate = n), this.replay !== null)) {
                for (let e of this.replay) e(n);
                this.replay = null;
            }
        }
        get data() {
            return this.delegate.data;
        }
        destroy() {
            ((this.replay = null), this.delegate.destroy());
        }
        createElement(n, e) {
            return this.delegate.createElement(n, e);
        }
        createComment(n) {
            return this.delegate.createComment(n);
        }
        createText(n) {
            return this.delegate.createText(n);
        }
        get destroyNode() {
            return this.delegate.destroyNode;
        }
        appendChild(n, e) {
            this.delegate.appendChild(n, e);
        }
        insertBefore(n, e, i, r) {
            this.delegate.insertBefore(n, e, i, r);
        }
        removeChild(n, e, i) {
            this.delegate.removeChild(n, e, i);
        }
        selectRootElement(n, e) {
            return this.delegate.selectRootElement(n, e);
        }
        parentNode(n) {
            return this.delegate.parentNode(n);
        }
        nextSibling(n) {
            return this.delegate.nextSibling(n);
        }
        setAttribute(n, e, i, r) {
            this.delegate.setAttribute(n, e, i, r);
        }
        removeAttribute(n, e, i) {
            this.delegate.removeAttribute(n, e, i);
        }
        addClass(n, e) {
            this.delegate.addClass(n, e);
        }
        removeClass(n, e) {
            this.delegate.removeClass(n, e);
        }
        setStyle(n, e, i, r) {
            this.delegate.setStyle(n, e, i, r);
        }
        removeStyle(n, e, i) {
            this.delegate.removeStyle(n, e, i);
        }
        setProperty(n, e, i) {
            (this.shouldReplay(e) &&
                this.replay.push((r) => r.setProperty(n, e, i)),
                this.delegate.setProperty(n, e, i));
        }
        setValue(n, e) {
            this.delegate.setValue(n, e);
        }
        listen(n, e, i, r) {
            return (
                this.shouldReplay(e) &&
                    this.replay.push((o) => o.listen(n, e, i, r)),
                this.delegate.listen(n, e, i, r)
            );
        }
        shouldReplay(n) {
            return this.replay !== null && n.startsWith(Q9);
        }
    },
    em = new b("");
function q0(t = "animations") {
    return (
        Zn("NgAsyncAnimations"),
        $e([
            {
                provide: Me,
                useFactory: (n, e, i) => new J9(n, e, i, t),
                deps: [U, kn, q],
            },
            {
                provide: gt,
                useValue: t === "noop" ? "NoopAnimations" : "BrowserAnimations",
            },
        ])
    );
}
var G0 = { providers: [h3({ eventCoalescing: !0 }), y4(W0), Ba(), q0()] };
var ca = class t {
    title = "verbatim.app";
    static ɵfac = function (e) {
        return new (e || t)();
    };
    static ɵcmp = R({
        type: t,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function (e, i) {
            e & 1 && W(0, "router-outlet");
        },
        dependencies: [In],
        encapsulation: 2,
    });
};
La(ca, G0).catch((t) => console.error(t));
