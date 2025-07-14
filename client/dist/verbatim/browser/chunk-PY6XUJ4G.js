var mg = Object.defineProperty,
    gg = Object.defineProperties;
var yg = Object.getOwnPropertyDescriptors;
var Xr = Object.getOwnPropertySymbols;
var Du = Object.prototype.hasOwnProperty,
    wu = Object.prototype.propertyIsEnumerable;
var Ds = (t, e, n) =>
        e in t
            ? mg(t, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: n,
              })
            : (t[e] = n),
    ee = (t, e) => {
        for (var n in (e ||= {})) Du.call(e, n) && Ds(t, n, e[n]);
        if (Xr) for (var n of Xr(e)) wu.call(e, n) && Ds(t, n, e[n]);
        return t;
    },
    ye = (t, e) => gg(t, yg(e));
var Tu = (t, e) => {
    var n = {};
    for (var r in t) Du.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
    if (t != null && Xr)
        for (var r of Xr(t)) e.indexOf(r) < 0 && wu.call(t, r) && (n[r] = t[r]);
    return n;
};
var UT = (t, e, n) => Ds(t, typeof e != "symbol" ? e + "" : e, n);
var bu = (t, e, n) =>
    new Promise((r, o) => {
        var i = (l) => {
                try {
                    a(n.next(l));
                } catch (c) {
                    o(c);
                }
            },
            s = (l) => {
                try {
                    a(n.throw(l));
                } catch (c) {
                    o(c);
                }
            },
            a = (l) =>
                l.done ? r(l.value) : Promise.resolve(l.value).then(i, s);
        a((n = n.apply(t, e)).next());
    });
var ws;
function eo() {
    return ws;
}
function Be(t) {
    let e = ws;
    return ((ws = t), e);
}
var Cu = Symbol("NotFound"),
    Zn = class extends Error {
        name = "\u0275NotFound";
        constructor(e) {
            super(e);
        }
    };
function Nt(t) {
    return t === Cu || t?.name === "\u0275NotFound";
}
function io(t, e) {
    return Object.is(t, e);
}
var W = null,
    to = !1,
    Ts = 1,
    vg = null,
    oe = Symbol("SIGNAL");
function S(t) {
    let e = W;
    return ((W = t), e);
}
function so() {
    return W;
}
var Mt = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    kind: "unknown",
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {},
};
function cn(t) {
    if (to) throw new Error("");
    if (W === null) return;
    W.consumerOnSignalRead(t);
    let e = W.nextProducerIndex++;
    if (
        (uo(W), e < W.producerNode.length && W.producerNode[e] !== t && Jn(W))
    ) {
        let n = W.producerNode[e];
        co(n, W.producerIndexOfThis[e]);
    }
    (W.producerNode[e] !== t &&
        ((W.producerNode[e] = t),
        (W.producerIndexOfThis[e] = Jn(W) ? Nu(t, W, e) : 0)),
        (W.producerLastReadVersion[e] = t.version));
}
function Su() {
    Ts++;
}
function ao(t) {
    if (!(Jn(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === Ts)) {
        if (!t.producerMustRecompute(t) && !Xn(t)) {
            oo(t);
            return;
        }
        (t.producerRecomputeValue(t), oo(t));
    }
}
function bs(t) {
    if (t.liveConsumerNode === void 0) return;
    let e = to;
    to = !0;
    try {
        for (let n of t.liveConsumerNode) n.dirty || Eg(n);
    } finally {
        to = e;
    }
}
function Cs() {
    return W?.consumerAllowSignalWrites !== !1;
}
function Eg(t) {
    ((t.dirty = !0), bs(t), t.consumerMarkedDirty?.(t));
}
function oo(t) {
    ((t.dirty = !1), (t.lastCleanEpoch = Ts));
}
function xt(t) {
    return (t && (t.nextProducerIndex = 0), S(t));
}
function un(t, e) {
    if (
        (S(e),
        !(
            !t ||
            t.producerNode === void 0 ||
            t.producerIndexOfThis === void 0 ||
            t.producerLastReadVersion === void 0
        ))
    ) {
        if (Jn(t))
            for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
                co(t.producerNode[n], t.producerIndexOfThis[n]);
        for (; t.producerNode.length > t.nextProducerIndex; )
            (t.producerNode.pop(),
                t.producerLastReadVersion.pop(),
                t.producerIndexOfThis.pop());
    }
}
function Xn(t) {
    uo(t);
    for (let e = 0; e < t.producerNode.length; e++) {
        let n = t.producerNode[e],
            r = t.producerLastReadVersion[e];
        if (r !== n.version || (ao(n), r !== n.version)) return !0;
    }
    return !1;
}
function lo(t) {
    if ((uo(t), Jn(t)))
        for (let e = 0; e < t.producerNode.length; e++)
            co(t.producerNode[e], t.producerIndexOfThis[e]);
    ((t.producerNode.length =
        t.producerLastReadVersion.length =
        t.producerIndexOfThis.length =
            0),
        t.liveConsumerNode &&
            (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0));
}
function Nu(t, e, n) {
    if ((Mu(t), t.liveConsumerNode.length === 0 && xu(t)))
        for (let r = 0; r < t.producerNode.length; r++)
            t.producerIndexOfThis[r] = Nu(t.producerNode[r], t, r);
    return (t.liveConsumerIndexOfThis.push(n), t.liveConsumerNode.push(e) - 1);
}
function co(t, e) {
    if ((Mu(t), t.liveConsumerNode.length === 1 && xu(t)))
        for (let r = 0; r < t.producerNode.length; r++)
            co(t.producerNode[r], t.producerIndexOfThis[r]);
    let n = t.liveConsumerNode.length - 1;
    if (
        ((t.liveConsumerNode[e] = t.liveConsumerNode[n]),
        (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[n]),
        t.liveConsumerNode.length--,
        t.liveConsumerIndexOfThis.length--,
        e < t.liveConsumerNode.length)
    ) {
        let r = t.liveConsumerIndexOfThis[e],
            o = t.liveConsumerNode[e];
        (uo(o), (o.producerIndexOfThis[r] = e));
    }
}
function Jn(t) {
    return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function uo(t) {
    ((t.producerNode ??= []),
        (t.producerIndexOfThis ??= []),
        (t.producerLastReadVersion ??= []));
}
function Mu(t) {
    ((t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []));
}
function xu(t) {
    return t.producerNode !== void 0;
}
function fo(t) {
    vg?.(t);
}
function po(t, e) {
    let n = Object.create(Ig);
    ((n.computation = t), e !== void 0 && (n.equal = e));
    let r = () => {
        if ((ao(n), cn(n), n.value === Yn)) throw n.error;
        return n.value;
    };
    return ((r[oe] = n), fo(n), r);
}
var no = Symbol("UNSET"),
    ro = Symbol("COMPUTING"),
    Yn = Symbol("ERRORED"),
    Ig = ye(ee({}, Mt), {
        value: no,
        dirty: !0,
        error: null,
        equal: io,
        kind: "computed",
        producerMustRecompute(t) {
            return t.value === no || t.value === ro;
        },
        producerRecomputeValue(t) {
            if (t.value === ro) throw new Error("");
            let e = t.value;
            t.value = ro;
            let n = xt(t),
                r,
                o = !1;
            try {
                ((r = t.computation()),
                    S(null),
                    (o = e !== no && e !== Yn && r !== Yn && t.equal(e, r)));
            } catch (i) {
                ((r = Yn), (t.error = i));
            } finally {
                un(t, n);
            }
            if (o) {
                t.value = e;
                return;
            }
            ((t.value = r), t.version++);
        },
    });
function _g() {
    throw new Error();
}
var Au = _g;
function Ru(t) {
    Au(t);
}
function Ss(t) {
    Au = t;
}
var Dg = null;
function Ns(t, e) {
    let n = Object.create(ho);
    ((n.value = t), e !== void 0 && (n.equal = e));
    let r = () => Ou(n);
    return ((r[oe] = n), fo(n), [r, (s) => dn(n, s), (s) => Ms(n, s)]);
}
function Ou(t) {
    return (cn(t), t.value);
}
function dn(t, e) {
    (Cs() || Ru(t), t.equal(t.value, e) || ((t.value = e), wg(t)));
}
function Ms(t, e) {
    (Cs() || Ru(t), dn(t, e(t.value)));
}
var ho = ye(ee({}, Mt), { equal: io, value: void 0, kind: "signal" });
function wg(t) {
    (t.version++, Su(), bs(t), Dg?.(t));
}
function D(t) {
    return typeof t == "function";
}
function fn(t) {
    let n = t((r) => {
        (Error.call(r), (r.stack = new Error().stack));
    });
    return (
        (n.prototype = Object.create(Error.prototype)),
        (n.prototype.constructor = n),
        n
    );
}
var mo = fn(
    (t) =>
        function (n) {
            (t(this),
                (this.message = n
                    ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
                    : ""),
                (this.name = "UnsubscriptionError"),
                (this.errors = n));
        },
);
function At(t, e) {
    if (t) {
        let n = t.indexOf(e);
        0 <= n && t.splice(n, 1);
    }
}
var U = class t {
    constructor(e) {
        ((this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null));
    }
    unsubscribe() {
        let e;
        if (!this.closed) {
            this.closed = !0;
            let { _parentage: n } = this;
            if (n)
                if (((this._parentage = null), Array.isArray(n)))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let { initialTeardown: r } = this;
            if (D(r))
                try {
                    r();
                } catch (i) {
                    e = i instanceof mo ? i.errors : [i];
                }
            let { _finalizers: o } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o)
                    try {
                        ku(i);
                    } catch (s) {
                        ((e = e ?? []),
                            s instanceof mo
                                ? (e = [...e, ...s.errors])
                                : e.push(s));
                    }
            }
            if (e) throw new mo(e);
        }
    }
    add(e) {
        var n;
        if (e && e !== this)
            if (this.closed) ku(e);
            else {
                if (e instanceof t) {
                    if (e.closed || e._hasParent(this)) return;
                    e._addParent(this);
                }
                (this._finalizers =
                    (n = this._finalizers) !== null && n !== void 0
                        ? n
                        : []).push(e);
            }
    }
    _hasParent(e) {
        let { _parentage: n } = this;
        return n === e || (Array.isArray(n) && n.includes(e));
    }
    _addParent(e) {
        let { _parentage: n } = this;
        this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
    }
    _removeParent(e) {
        let { _parentage: n } = this;
        n === e ? (this._parentage = null) : Array.isArray(n) && At(n, e);
    }
    remove(e) {
        let { _finalizers: n } = this;
        (n && At(n, e), e instanceof t && e._removeParent(this));
    }
};
U.EMPTY = (() => {
    let t = new U();
    return ((t.closed = !0), t);
})();
var xs = U.EMPTY;
function go(t) {
    return (
        t instanceof U ||
        (t && "closed" in t && D(t.remove) && D(t.add) && D(t.unsubscribe))
    );
}
function ku(t) {
    D(t) ? t() : t.unsubscribe();
}
var Ne = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
};
var pn = {
    setTimeout(t, e, ...n) {
        let { delegate: r } = pn;
        return r?.setTimeout
            ? r.setTimeout(t, e, ...n)
            : setTimeout(t, e, ...n);
    },
    clearTimeout(t) {
        let { delegate: e } = pn;
        return (e?.clearTimeout || clearTimeout)(t);
    },
    delegate: void 0,
};
function yo(t) {
    pn.setTimeout(() => {
        let { onUnhandledError: e } = Ne;
        if (e) e(t);
        else throw t;
    });
}
function Rt() {}
var Pu = As("C", void 0, void 0);
function Fu(t) {
    return As("E", void 0, t);
}
function Lu(t) {
    return As("N", t, void 0);
}
function As(t, e, n) {
    return { kind: t, value: e, error: n };
}
var Ot = null;
function hn(t) {
    if (Ne.useDeprecatedSynchronousErrorHandling) {
        let e = !Ot;
        if ((e && (Ot = { errorThrown: !1, error: null }), t(), e)) {
            let { errorThrown: n, error: r } = Ot;
            if (((Ot = null), n)) throw r;
        }
    } else t();
}
function ju(t) {
    Ne.useDeprecatedSynchronousErrorHandling &&
        Ot &&
        ((Ot.errorThrown = !0), (Ot.error = t));
}
var kt = class extends U {
        constructor(e) {
            (super(),
                (this.isStopped = !1),
                e
                    ? ((this.destination = e), go(e) && e.add(this))
                    : (this.destination = Cg));
        }
        static create(e, n, r) {
            return new Xe(e, n, r);
        }
        next(e) {
            this.isStopped ? Os(Lu(e), this) : this._next(e);
        }
        error(e) {
            this.isStopped
                ? Os(Fu(e), this)
                : ((this.isStopped = !0), this._error(e));
        }
        complete() {
            this.isStopped
                ? Os(Pu, this)
                : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
            this.closed ||
                ((this.isStopped = !0),
                super.unsubscribe(),
                (this.destination = null));
        }
        _next(e) {
            this.destination.next(e);
        }
        _error(e) {
            try {
                this.destination.error(e);
            } finally {
                this.unsubscribe();
            }
        }
        _complete() {
            try {
                this.destination.complete();
            } finally {
                this.unsubscribe();
            }
        }
    },
    Tg = Function.prototype.bind;
function Rs(t, e) {
    return Tg.call(t, e);
}
var ks = class {
        constructor(e) {
            this.partialObserver = e;
        }
        next(e) {
            let { partialObserver: n } = this;
            if (n.next)
                try {
                    n.next(e);
                } catch (r) {
                    vo(r);
                }
        }
        error(e) {
            let { partialObserver: n } = this;
            if (n.error)
                try {
                    n.error(e);
                } catch (r) {
                    vo(r);
                }
            else vo(e);
        }
        complete() {
            let { partialObserver: e } = this;
            if (e.complete)
                try {
                    e.complete();
                } catch (n) {
                    vo(n);
                }
        }
    },
    Xe = class extends kt {
        constructor(e, n, r) {
            super();
            let o;
            if (D(e) || !e)
                o = {
                    next: e ?? void 0,
                    error: n ?? void 0,
                    complete: r ?? void 0,
                };
            else {
                let i;
                this && Ne.useDeprecatedNextContext
                    ? ((i = Object.create(e)),
                      (i.unsubscribe = () => this.unsubscribe()),
                      (o = {
                          next: e.next && Rs(e.next, i),
                          error: e.error && Rs(e.error, i),
                          complete: e.complete && Rs(e.complete, i),
                      }))
                    : (o = e);
            }
            this.destination = new ks(o);
        }
    };
function vo(t) {
    Ne.useDeprecatedSynchronousErrorHandling ? ju(t) : yo(t);
}
function bg(t) {
    throw t;
}
function Os(t, e) {
    let { onStoppedNotification: n } = Ne;
    n && pn.setTimeout(() => n(t, e));
}
var Cg = { closed: !0, next: Rt, error: bg, complete: Rt };
var mn = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function ie(t) {
    return t;
}
function Sg(...t) {
    return Ps(t);
}
function Ps(t) {
    return t.length === 0
        ? ie
        : t.length === 1
          ? t[0]
          : function (n) {
                return t.reduce((r, o) => o(r), n);
            };
}
var R = (() => {
    class t {
        constructor(n) {
            n && (this._subscribe = n);
        }
        lift(n) {
            let r = new t();
            return ((r.source = this), (r.operator = n), r);
        }
        subscribe(n, r, o) {
            let i = Mg(n) ? n : new Xe(n, r, o);
            return (
                hn(() => {
                    let { operator: s, source: a } = this;
                    i.add(
                        s
                            ? s.call(i, a)
                            : a
                              ? this._subscribe(i)
                              : this._trySubscribe(i),
                    );
                }),
                i
            );
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n);
            } catch (r) {
                n.error(r);
            }
        }
        forEach(n, r) {
            return (
                (r = Vu(r)),
                new r((o, i) => {
                    let s = new Xe({
                        next: (a) => {
                            try {
                                n(a);
                            } catch (l) {
                                (i(l), s.unsubscribe());
                            }
                        },
                        error: i,
                        complete: o,
                    });
                    this.subscribe(s);
                })
            );
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0
                ? void 0
                : r.subscribe(n);
        }
        [mn]() {
            return this;
        }
        pipe(...n) {
            return Ps(n)(this);
        }
        toPromise(n) {
            return (
                (n = Vu(n)),
                new n((r, o) => {
                    let i;
                    this.subscribe(
                        (s) => (i = s),
                        (s) => o(s),
                        () => r(i),
                    );
                })
            );
        }
    }
    return ((t.create = (e) => new t(e)), t);
})();
function Vu(t) {
    var e;
    return (e = t ?? Ne.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ng(t) {
    return t && D(t.next) && D(t.error) && D(t.complete);
}
function Mg(t) {
    return (t && t instanceof kt) || (Ng(t) && go(t));
}
function Fs(t) {
    return D(t?.lift);
}
function b(t) {
    return (e) => {
        if (Fs(e))
            return e.lift(function (n) {
                try {
                    return t(n, this);
                } catch (r) {
                    this.error(r);
                }
            });
        throw new TypeError("Unable to lift unknown Observable type");
    };
}
function T(t, e, n, r, o) {
    return new Ls(t, e, n, r, o);
}
var Ls = class extends kt {
    constructor(e, n, r, o, i, s) {
        (super(e),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
                ? function (a) {
                      try {
                          n(a);
                      } catch (l) {
                          e.error(l);
                      }
                  }
                : super._next),
            (this._error = o
                ? function (a) {
                      try {
                          o(a);
                      } catch (l) {
                          e.error(l);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._error),
            (this._complete = r
                ? function () {
                      try {
                          r();
                      } catch (a) {
                          e.error(a);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._complete));
    }
    unsubscribe() {
        var e;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let { closed: n } = this;
            (super.unsubscribe(),
                !n &&
                    ((e = this.onFinalize) === null ||
                        e === void 0 ||
                        e.call(this)));
        }
    }
};
function js() {
    return b((t, e) => {
        let n = null;
        t._refCount++;
        let r = T(e, void 0, void 0, void 0, () => {
            if (!t || t._refCount <= 0 || 0 < --t._refCount) {
                n = null;
                return;
            }
            let o = t._connection,
                i = n;
            ((n = null),
                o && (!i || o === i) && o.unsubscribe(),
                e.unsubscribe());
        });
        (t.subscribe(r), r.closed || (n = t.connect()));
    });
}
var Vs = class extends R {
    constructor(e, n) {
        (super(),
            (this.source = e),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Fs(e) && (this.lift = e.lift));
    }
    _subscribe(e) {
        return this.getSubject().subscribe(e);
    }
    getSubject() {
        let e = this._subject;
        return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
        );
    }
    _teardown() {
        this._refCount = 0;
        let { _connection: e } = this;
        ((this._subject = this._connection = null), e?.unsubscribe());
    }
    connect() {
        let e = this._connection;
        if (!e) {
            e = this._connection = new U();
            let n = this.getSubject();
            (e.add(
                this.source.subscribe(
                    T(
                        n,
                        void 0,
                        () => {
                            (this._teardown(), n.complete());
                        },
                        (r) => {
                            (this._teardown(), n.error(r));
                        },
                        () => this._teardown(),
                    ),
                ),
            ),
                e.closed && ((this._connection = null), (e = U.EMPTY)));
        }
        return e;
    }
    refCount() {
        return js()(this);
    }
};
var gn = {
    schedule(t) {
        let e = requestAnimationFrame,
            n = cancelAnimationFrame,
            { delegate: r } = gn;
        r && ((e = r.requestAnimationFrame), (n = r.cancelAnimationFrame));
        let o = e((i) => {
            ((n = void 0), t(i));
        });
        return new U(() => n?.(o));
    },
    requestAnimationFrame(...t) {
        let { delegate: e } = gn;
        return (e?.requestAnimationFrame || requestAnimationFrame)(...t);
    },
    cancelAnimationFrame(...t) {
        let { delegate: e } = gn;
        return (e?.cancelAnimationFrame || cancelAnimationFrame)(...t);
    },
    delegate: void 0,
};
var Hu = fn(
    (t) =>
        function () {
            (t(this),
                (this.name = "ObjectUnsubscribedError"),
                (this.message = "object unsubscribed"));
        },
);
var De = (() => {
        class t extends R {
            constructor() {
                (super(),
                    (this.closed = !1),
                    (this.currentObservers = null),
                    (this.observers = []),
                    (this.isStopped = !1),
                    (this.hasError = !1),
                    (this.thrownError = null));
            }
            lift(n) {
                let r = new Eo(this, this);
                return ((r.operator = n), r);
            }
            _throwIfClosed() {
                if (this.closed) throw new Hu();
            }
            next(n) {
                hn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.currentObservers ||
                            (this.currentObservers = Array.from(
                                this.observers,
                            ));
                        for (let r of this.currentObservers) r.next(n);
                    }
                });
            }
            error(n) {
                hn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        ((this.hasError = this.isStopped = !0),
                            (this.thrownError = n));
                        let { observers: r } = this;
                        for (; r.length; ) r.shift().error(n);
                    }
                });
            }
            complete() {
                hn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.isStopped = !0;
                        let { observers: n } = this;
                        for (; n.length; ) n.shift().complete();
                    }
                });
            }
            unsubscribe() {
                ((this.isStopped = this.closed = !0),
                    (this.observers = this.currentObservers = null));
            }
            get observed() {
                var n;
                return (
                    ((n = this.observers) === null || n === void 0
                        ? void 0
                        : n.length) > 0
                );
            }
            _trySubscribe(n) {
                return (this._throwIfClosed(), super._trySubscribe(n));
            }
            _subscribe(n) {
                return (
                    this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                );
            }
            _innerSubscribe(n) {
                let { hasError: r, isStopped: o, observers: i } = this;
                return r || o
                    ? xs
                    : ((this.currentObservers = null),
                      i.push(n),
                      new U(() => {
                          ((this.currentObservers = null), At(i, n));
                      }));
            }
            _checkFinalizedStatuses(n) {
                let { hasError: r, thrownError: o, isStopped: i } = this;
                r ? n.error(o) : i && n.complete();
            }
            asObservable() {
                let n = new R();
                return ((n.source = this), n);
            }
        }
        return ((t.create = (e, n) => new Eo(e, n)), t);
    })(),
    Eo = class extends De {
        constructor(e, n) {
            (super(), (this.destination = e), (this.source = n));
        }
        next(e) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.next) === null ||
                r === void 0 ||
                r.call(n, e);
        }
        error(e) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.error) === null ||
                r === void 0 ||
                r.call(n, e);
        }
        complete() {
            var e, n;
            (n =
                (e = this.destination) === null || e === void 0
                    ? void 0
                    : e.complete) === null ||
                n === void 0 ||
                n.call(e);
        }
        _subscribe(e) {
            var n, r;
            return (r =
                (n = this.source) === null || n === void 0
                    ? void 0
                    : n.subscribe(e)) !== null && r !== void 0
                ? r
                : xs;
        }
    };
var er = class extends De {
    constructor(e) {
        (super(), (this._value = e));
    }
    get value() {
        return this.getValue();
    }
    _subscribe(e) {
        let n = super._subscribe(e);
        return (!n.closed && e.next(this._value), n);
    }
    getValue() {
        let { hasError: e, thrownError: n, _value: r } = this;
        if (e) throw n;
        return (this._throwIfClosed(), r);
    }
    next(e) {
        super.next((this._value = e));
    }
};
var tr = {
    now() {
        return (tr.delegate || Date).now();
    },
    delegate: void 0,
};
var Hs = class extends De {
    constructor(e = 1 / 0, n = 1 / 0, r = tr) {
        (super(),
            (this._bufferSize = e),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, e)),
            (this._windowTime = Math.max(1, n)));
    }
    next(e) {
        let {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
        } = this;
        (n || (r.push(e), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(e));
    }
    _subscribe(e) {
        (this._throwIfClosed(), this._trimBuffer());
        let n = this._innerSubscribe(e),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
        for (let s = 0; s < i.length && !e.closed; s += r ? 1 : 2) e.next(i[s]);
        return (this._checkFinalizedStatuses(e), n);
    }
    _trimBuffer() {
        let {
                _bufferSize: e,
                _timestampProvider: n,
                _buffer: r,
                _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * e;
        if ((e < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            let s = n.now(),
                a = 0;
            for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
            a && r.splice(0, a + 1);
        }
    }
};
var Io = class extends U {
    constructor(e, n) {
        super();
    }
    schedule(e, n = 0) {
        return this;
    }
};
var nr = {
    setInterval(t, e, ...n) {
        let { delegate: r } = nr;
        return r?.setInterval
            ? r.setInterval(t, e, ...n)
            : setInterval(t, e, ...n);
    },
    clearInterval(t) {
        let { delegate: e } = nr;
        return (e?.clearInterval || clearInterval)(t);
    },
    delegate: void 0,
};
var dt = class extends Io {
    constructor(e, n) {
        (super(e, n),
            (this.scheduler = e),
            (this.work = n),
            (this.pending = !1));
    }
    schedule(e, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = e;
        let o = this.id,
            i = this.scheduler;
        return (
            o != null && (this.id = this.recycleAsyncId(i, o, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
                (r = this.id) !== null && r !== void 0
                    ? r
                    : this.requestAsyncId(i, this.id, n)),
            this
        );
    }
    requestAsyncId(e, n, r = 0) {
        return nr.setInterval(e.flush.bind(e, this), r);
    }
    recycleAsyncId(e, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && nr.clearInterval(n);
    }
    execute(e, n) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        let r = this._execute(e, n);
        if (r) return r;
        this.pending === !1 &&
            this.id != null &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }
    _execute(e, n) {
        let r = !1,
            o;
        try {
            this.work(e);
        } catch (i) {
            ((r = !0),
                (o = i || new Error("Scheduled action threw falsy error")));
        }
        if (r) return (this.unsubscribe(), o);
    }
    unsubscribe() {
        if (!this.closed) {
            let { id: e, scheduler: n } = this,
                { actions: r } = n;
            ((this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                At(r, this),
                e != null && (this.id = this.recycleAsyncId(n, e, null)),
                (this.delay = null),
                super.unsubscribe());
        }
    }
};
var xg = 1,
    Bs,
    $s = {};
function Bu(t) {
    return t in $s ? (delete $s[t], !0) : !1;
}
var $u = {
    setImmediate(t) {
        let e = xg++;
        return (
            ($s[e] = !0),
            Bs || (Bs = Promise.resolve()),
            Bs.then(() => Bu(e) && t()),
            e
        );
    },
    clearImmediate(t) {
        Bu(t);
    },
};
var { setImmediate: Ag, clearImmediate: Rg } = $u,
    rr = {
        setImmediate(...t) {
            let { delegate: e } = rr;
            return (e?.setImmediate || Ag)(...t);
        },
        clearImmediate(t) {
            let { delegate: e } = rr;
            return (e?.clearImmediate || Rg)(t);
        },
        delegate: void 0,
    };
var _o = class extends dt {
    constructor(e, n) {
        (super(e, n), (this.scheduler = e), (this.work = n));
    }
    requestAsyncId(e, n, r = 0) {
        return r !== null && r > 0
            ? super.requestAsyncId(e, n, r)
            : (e.actions.push(this),
              e._scheduled ||
                  (e._scheduled = rr.setImmediate(e.flush.bind(e, void 0))));
    }
    recycleAsyncId(e, n, r = 0) {
        var o;
        if (r != null ? r > 0 : this.delay > 0)
            return super.recycleAsyncId(e, n, r);
        let { actions: i } = e;
        n != null &&
            ((o = i[i.length - 1]) === null || o === void 0 ? void 0 : o.id) !==
                n &&
            (rr.clearImmediate(n),
            e._scheduled === n && (e._scheduled = void 0));
    }
};
var yn = class t {
    constructor(e, n = t.now) {
        ((this.schedulerActionCtor = e), (this.now = n));
    }
    schedule(e, n = 0, r) {
        return new this.schedulerActionCtor(this, e).schedule(r, n);
    }
};
yn.now = tr.now;
var ft = class extends yn {
    constructor(e, n = yn.now) {
        (super(e, n), (this.actions = []), (this._active = !1));
    }
    flush(e) {
        let { actions: n } = this;
        if (this._active) {
            n.push(e);
            return;
        }
        let r;
        this._active = !0;
        do if ((r = e.execute(e.state, e.delay))) break;
        while ((e = n.shift()));
        if (((this._active = !1), r)) {
            for (; (e = n.shift()); ) e.unsubscribe();
            throw r;
        }
    }
};
var Do = class extends ft {
    flush(e) {
        this._active = !0;
        let n = this._scheduled;
        this._scheduled = void 0;
        let { actions: r } = this,
            o;
        e = e || r.shift();
        do if ((o = e.execute(e.state, e.delay))) break;
        while ((e = r[0]) && e.id === n && r.shift());
        if (((this._active = !1), o)) {
            for (; (e = r[0]) && e.id === n && r.shift(); ) e.unsubscribe();
            throw o;
        }
    }
};
var Og = new Do(_o);
var Pt = new ft(dt),
    Uu = Pt;
var wo = class extends dt {
    constructor(e, n) {
        (super(e, n), (this.scheduler = e), (this.work = n));
    }
    requestAsyncId(e, n, r = 0) {
        return r !== null && r > 0
            ? super.requestAsyncId(e, n, r)
            : (e.actions.push(this),
              e._scheduled ||
                  (e._scheduled = gn.requestAnimationFrame(() =>
                      e.flush(void 0),
                  )));
    }
    recycleAsyncId(e, n, r = 0) {
        var o;
        if (r != null ? r > 0 : this.delay > 0)
            return super.recycleAsyncId(e, n, r);
        let { actions: i } = e;
        n != null &&
            n === e._scheduled &&
            ((o = i[i.length - 1]) === null || o === void 0 ? void 0 : o.id) !==
                n &&
            (gn.cancelAnimationFrame(n), (e._scheduled = void 0));
    }
};
var To = class extends ft {
    flush(e) {
        this._active = !0;
        let n;
        e ? (n = e.id) : ((n = this._scheduled), (this._scheduled = void 0));
        let { actions: r } = this,
            o;
        e = e || r.shift();
        do if ((o = e.execute(e.state, e.delay))) break;
        while ((e = r[0]) && e.id === n && r.shift());
        if (((this._active = !1), o)) {
            for (; (e = r[0]) && e.id === n && r.shift(); ) e.unsubscribe();
            throw o;
        }
    }
};
var kg = new To(wo);
var Ft = new R((t) => t.complete());
function bo(t) {
    return t && D(t.schedule);
}
function Us(t) {
    return t[t.length - 1];
}
function Co(t) {
    return D(Us(t)) ? t.pop() : void 0;
}
function $e(t) {
    return bo(Us(t)) ? t.pop() : void 0;
}
function qu(t, e) {
    return typeof Us(t) == "number" ? t.pop() : e;
}
function QC(t, e, n, r, o, i) {
    function s(g) {
        if (g !== void 0 && typeof g != "function")
            throw new TypeError("Function expected");
        return g;
    }
    for (
        var a = r.kind,
            l = a === "getter" ? "get" : a === "setter" ? "set" : "value",
            c = !e && t ? (r.static ? t : t.prototype) : null,
            u = e || (c ? Object.getOwnPropertyDescriptor(c, r.name) : {}),
            d,
            p = !1,
            f = n.length - 1;
        f >= 0;
        f--
    ) {
        var h = {};
        for (var m in r) h[m] = m === "access" ? {} : r[m];
        for (var m in r.access) h.access[m] = r.access[m];
        h.addInitializer = function (g) {
            if (p)
                throw new TypeError(
                    "Cannot add initializers after decoration has completed",
                );
            i.push(s(g || null));
        };
        var v = (0, n[f])(
            a === "accessor" ? { get: u.get, set: u.set } : u[l],
            h,
        );
        if (a === "accessor") {
            if (v === void 0) continue;
            if (v === null || typeof v != "object")
                throw new TypeError("Object expected");
            ((d = s(v.get)) && (u.get = d),
                (d = s(v.set)) && (u.set = d),
                (d = s(v.init)) && o.unshift(d));
        } else (d = s(v)) && (a === "field" ? o.unshift(d) : (u[l] = d));
    }
    (c && Object.defineProperty(c, r.name, u), (p = !0));
}
function KC(t, e, n) {
    for (var r = arguments.length > 2, o = 0; o < e.length; o++)
        n = r ? e[o].call(t, n) : e[o].call(t);
    return r ? n : void 0;
}
function Wu(t, e, n, r) {
    function o(i) {
        return i instanceof n
            ? i
            : new n(function (s) {
                  s(i);
              });
    }
    return new (n || (n = Promise))(function (i, s) {
        function a(u) {
            try {
                c(r.next(u));
            } catch (d) {
                s(d);
            }
        }
        function l(u) {
            try {
                c(r.throw(u));
            } catch (d) {
                s(d);
            }
        }
        function c(u) {
            u.done ? i(u.value) : o(u.value).then(a, l);
        }
        c((r = r.apply(t, e || [])).next());
    });
}
function zu(t) {
    var e = typeof Symbol == "function" && Symbol.iterator,
        n = e && t[e],
        r = 0;
    if (n) return n.call(t);
    if (t && typeof t.length == "number")
        return {
            next: function () {
                return (
                    t && r >= t.length && (t = void 0),
                    { value: t && t[r++], done: !t }
                );
            },
        };
    throw new TypeError(
        e ? "Object is not iterable." : "Symbol.iterator is not defined.",
    );
}
function Lt(t) {
    return this instanceof Lt ? ((this.v = t), this) : new Lt(t);
}
function Gu(t, e, n) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = n.apply(t, e || []),
        o,
        i = [];
    return (
        (o = Object.create(
            (typeof AsyncIterator == "function" ? AsyncIterator : Object)
                .prototype,
        )),
        a("next"),
        a("throw"),
        a("return", s),
        (o[Symbol.asyncIterator] = function () {
            return this;
        }),
        o
    );
    function s(f) {
        return function (h) {
            return Promise.resolve(h).then(f, d);
        };
    }
    function a(f, h) {
        r[f] &&
            ((o[f] = function (m) {
                return new Promise(function (v, g) {
                    i.push([f, m, v, g]) > 1 || l(f, m);
                });
            }),
            h && (o[f] = h(o[f])));
    }
    function l(f, h) {
        try {
            c(r[f](h));
        } catch (m) {
            p(i[0][3], m);
        }
    }
    function c(f) {
        f.value instanceof Lt
            ? Promise.resolve(f.value.v).then(u, d)
            : p(i[0][2], f);
    }
    function u(f) {
        l("next", f);
    }
    function d(f) {
        l("throw", f);
    }
    function p(f, h) {
        (f(h), i.shift(), i.length && l(i[0][0], i[0][1]));
    }
}
function Qu(t) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var e = t[Symbol.asyncIterator],
        n;
    return e
        ? e.call(t)
        : ((t = typeof zu == "function" ? zu(t) : t[Symbol.iterator]()),
          (n = {}),
          r("next"),
          r("throw"),
          r("return"),
          (n[Symbol.asyncIterator] = function () {
              return this;
          }),
          n);
    function r(i) {
        n[i] =
            t[i] &&
            function (s) {
                return new Promise(function (a, l) {
                    ((s = t[i](s)), o(a, l, s.done, s.value));
                });
            };
    }
    function o(i, s, a, l) {
        Promise.resolve(l).then(function (c) {
            i({ value: c, done: a });
        }, s);
    }
}
var vn = (t) => t && typeof t.length == "number" && typeof t != "function";
function So(t) {
    return D(t?.then);
}
function No(t) {
    return D(t[mn]);
}
function Mo(t) {
    return Symbol.asyncIterator && D(t?.[Symbol.asyncIterator]);
}
function xo(t) {
    return new TypeError(
        `You provided ${t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
    );
}
function Pg() {
    return typeof Symbol != "function" || !Symbol.iterator
        ? "@@iterator"
        : Symbol.iterator;
}
var Ao = Pg();
function Ro(t) {
    return D(t?.[Ao]);
}
function Oo(t) {
    return Gu(this, arguments, function* () {
        let n = t.getReader();
        try {
            for (;;) {
                let { value: r, done: o } = yield Lt(n.read());
                if (o) return yield Lt(void 0);
                yield yield Lt(r);
            }
        } finally {
            n.releaseLock();
        }
    });
}
function ko(t) {
    return D(t?.getReader);
}
function k(t) {
    if (t instanceof R) return t;
    if (t != null) {
        if (No(t)) return Fg(t);
        if (vn(t)) return Lg(t);
        if (So(t)) return jg(t);
        if (Mo(t)) return Ku(t);
        if (Ro(t)) return Vg(t);
        if (ko(t)) return Hg(t);
    }
    throw xo(t);
}
function Fg(t) {
    return new R((e) => {
        let n = t[mn]();
        if (D(n.subscribe)) return n.subscribe(e);
        throw new TypeError(
            "Provided object does not correctly implement Symbol.observable",
        );
    });
}
function Lg(t) {
    return new R((e) => {
        for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
        e.complete();
    });
}
function jg(t) {
    return new R((e) => {
        t.then(
            (n) => {
                e.closed || (e.next(n), e.complete());
            },
            (n) => e.error(n),
        ).then(null, yo);
    });
}
function Vg(t) {
    return new R((e) => {
        for (let n of t) if ((e.next(n), e.closed)) return;
        e.complete();
    });
}
function Ku(t) {
    return new R((e) => {
        Bg(t, e).catch((n) => e.error(n));
    });
}
function Hg(t) {
    return Ku(Oo(t));
}
function Bg(t, e) {
    var n, r, o, i;
    return Wu(this, void 0, void 0, function* () {
        try {
            for (n = Qu(t); (r = yield n.next()), !r.done; ) {
                let s = r.value;
                if ((e.next(s), e.closed)) return;
            }
        } catch (s) {
            o = { error: s };
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n));
            } finally {
                if (o) throw o.error;
            }
        }
        e.complete();
    });
}
function fe(t, e, n, r = 0, o = !1) {
    let i = e.schedule(function () {
        (n(), o ? t.add(this.schedule(null, r)) : this.unsubscribe());
    }, r);
    if ((t.add(i), !o)) return i;
}
function Po(t, e = 0) {
    return b((n, r) => {
        n.subscribe(
            T(
                r,
                (o) => fe(r, t, () => r.next(o), e),
                () => fe(r, t, () => r.complete(), e),
                (o) => fe(r, t, () => r.error(o), e),
            ),
        );
    });
}
function Fo(t, e = 0) {
    return b((n, r) => {
        r.add(t.schedule(() => n.subscribe(r), e));
    });
}
function Zu(t, e) {
    return k(t).pipe(Fo(e), Po(e));
}
function Yu(t, e) {
    return k(t).pipe(Fo(e), Po(e));
}
function Ju(t, e) {
    return new R((n) => {
        let r = 0;
        return e.schedule(function () {
            r === t.length
                ? n.complete()
                : (n.next(t[r++]), n.closed || this.schedule());
        });
    });
}
function Xu(t, e) {
    return new R((n) => {
        let r;
        return (
            fe(n, e, () => {
                ((r = t[Ao]()),
                    fe(
                        n,
                        e,
                        () => {
                            let o, i;
                            try {
                                ({ value: o, done: i } = r.next());
                            } catch (s) {
                                n.error(s);
                                return;
                            }
                            i ? n.complete() : n.next(o);
                        },
                        0,
                        !0,
                    ));
            }),
            () => D(r?.return) && r.return()
        );
    });
}
function Lo(t, e) {
    if (!t) throw new Error("Iterable cannot be null");
    return new R((n) => {
        fe(n, e, () => {
            let r = t[Symbol.asyncIterator]();
            fe(
                n,
                e,
                () => {
                    r.next().then((o) => {
                        o.done ? n.complete() : n.next(o.value);
                    });
                },
                0,
                !0,
            );
        });
    });
}
function ed(t, e) {
    return Lo(Oo(t), e);
}
function td(t, e) {
    if (t != null) {
        if (No(t)) return Zu(t, e);
        if (vn(t)) return Ju(t, e);
        if (So(t)) return Yu(t, e);
        if (Mo(t)) return Lo(t, e);
        if (Ro(t)) return Xu(t, e);
        if (ko(t)) return ed(t, e);
    }
    throw xo(t);
}
function Ue(t, e) {
    return e ? td(t, e) : k(t);
}
function $g(...t) {
    let e = $e(t);
    return Ue(t, e);
}
function Ug(t, e) {
    let n = D(t) ? t : () => t,
        r = (o) => o.error(n());
    return new R(e ? (o) => e.schedule(r, 0, o) : r);
}
function qg(t) {
    return !!t && (t instanceof R || (D(t.lift) && D(t.subscribe)));
}
var jt = fn(
    (t) =>
        function () {
            (t(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence"));
        },
);
function nd(t) {
    return t instanceof Date && !isNaN(t);
}
function et(t, e) {
    return b((n, r) => {
        let o = 0;
        n.subscribe(
            T(r, (i) => {
                r.next(t.call(e, i, o++));
            }),
        );
    });
}
var { isArray: zg } = Array;
function Wg(t, e) {
    return zg(e) ? t(...e) : t(e);
}
function En(t) {
    return et((e) => Wg(t, e));
}
var { isArray: Gg } = Array,
    { getPrototypeOf: Qg, prototype: Kg, keys: Zg } = Object;
function jo(t) {
    if (t.length === 1) {
        let e = t[0];
        if (Gg(e)) return { args: e, keys: null };
        if (Yg(e)) {
            let n = Zg(e);
            return { args: n.map((r) => e[r]), keys: n };
        }
    }
    return { args: t, keys: null };
}
function Yg(t) {
    return t && typeof t == "object" && Qg(t) === Kg;
}
function Vo(t, e) {
    return t.reduce((n, r, o) => ((n[r] = e[o]), n), {});
}
function Jg(...t) {
    let e = $e(t),
        n = Co(t),
        { args: r, keys: o } = jo(t);
    if (r.length === 0) return Ue([], e);
    let i = new R(Xg(r, e, o ? (s) => Vo(o, s) : ie));
    return n ? i.pipe(En(n)) : i;
}
function Xg(t, e, n = ie) {
    return (r) => {
        rd(
            e,
            () => {
                let { length: o } = t,
                    i = new Array(o),
                    s = o,
                    a = o;
                for (let l = 0; l < o; l++)
                    rd(
                        e,
                        () => {
                            let c = Ue(t[l], e),
                                u = !1;
                            c.subscribe(
                                T(
                                    r,
                                    (d) => {
                                        ((i[l] = d),
                                            u || ((u = !0), a--),
                                            a || r.next(n(i.slice())));
                                    },
                                    () => {
                                        --s || r.complete();
                                    },
                                ),
                            );
                        },
                        r,
                    );
            },
            r,
        );
    };
}
function rd(t, e, n) {
    t ? fe(n, t, e) : e();
}
function od(t, e, n, r, o, i, s, a) {
    let l = [],
        c = 0,
        u = 0,
        d = !1,
        p = () => {
            d && !l.length && !c && e.complete();
        },
        f = (m) => (c < r ? h(m) : l.push(m)),
        h = (m) => {
            (i && e.next(m), c++);
            let v = !1;
            k(n(m, u++)).subscribe(
                T(
                    e,
                    (g) => {
                        (o?.(g), i ? f(g) : e.next(g));
                    },
                    () => {
                        v = !0;
                    },
                    void 0,
                    () => {
                        if (v)
                            try {
                                for (c--; l.length && c < r; ) {
                                    let g = l.shift();
                                    s ? fe(e, s, () => h(g)) : h(g);
                                }
                                p();
                            } catch (g) {
                                e.error(g);
                            }
                    },
                ),
            );
        };
    return (
        t.subscribe(
            T(e, f, () => {
                ((d = !0), p());
            }),
        ),
        () => {
            a?.();
        }
    );
}
function Me(t, e, n = 1 / 0) {
    return D(e)
        ? Me((r, o) => et((i, s) => e(r, i, o, s))(k(t(r, o))), n)
        : (typeof e == "number" && (n = e), b((r, o) => od(r, o, t, n)));
}
function or(t = 1 / 0) {
    return Me(ie, t);
}
function id() {
    return or(1);
}
function In(...t) {
    return id()(Ue(t, $e(t)));
}
function ey(t) {
    return new R((e) => {
        k(t()).subscribe(e);
    });
}
function ty(...t) {
    let e = Co(t),
        { args: n, keys: r } = jo(t),
        o = new R((i) => {
            let { length: s } = n;
            if (!s) {
                i.complete();
                return;
            }
            let a = new Array(s),
                l = s,
                c = s;
            for (let u = 0; u < s; u++) {
                let d = !1;
                k(n[u]).subscribe(
                    T(
                        i,
                        (p) => {
                            (d || ((d = !0), c--), (a[u] = p));
                        },
                        () => l--,
                        void 0,
                        () => {
                            (!l || !d) &&
                                (c || i.next(r ? Vo(r, a) : a), i.complete());
                        },
                    ),
                );
            }
        });
    return e ? o.pipe(En(e)) : o;
}
var ny = ["addListener", "removeListener"],
    ry = ["addEventListener", "removeEventListener"],
    oy = ["on", "off"];
function qs(t, e, n, r) {
    if ((D(n) && ((r = n), (n = void 0)), r)) return qs(t, e, n).pipe(En(r));
    let [o, i] = ay(t)
        ? ry.map((s) => (a) => t[s](e, a, n))
        : iy(t)
          ? ny.map(sd(t, e))
          : sy(t)
            ? oy.map(sd(t, e))
            : [];
    if (!o && vn(t)) return Me((s) => qs(s, e, n))(k(t));
    if (!o) throw new TypeError("Invalid event target");
    return new R((s) => {
        let a = (...l) => s.next(1 < l.length ? l : l[0]);
        return (o(a), () => i(a));
    });
}
function sd(t, e) {
    return (n) => (r) => t[n](e, r);
}
function iy(t) {
    return D(t.addListener) && D(t.removeListener);
}
function sy(t) {
    return D(t.on) && D(t.off);
}
function ay(t) {
    return D(t.addEventListener) && D(t.removeEventListener);
}
function Ho(t = 0, e, n = Uu) {
    let r = -1;
    return (
        e != null && (bo(e) ? (n = e) : (r = e)),
        new R((o) => {
            let i = nd(t) ? +t - n.now() : t;
            i < 0 && (i = 0);
            let s = 0;
            return n.schedule(function () {
                o.closed ||
                    (o.next(s++),
                    0 <= r ? this.schedule(void 0, r) : o.complete());
            }, i);
        })
    );
}
function ly(...t) {
    let e = $e(t),
        n = qu(t, 1 / 0),
        r = t;
    return r.length ? (r.length === 1 ? k(r[0]) : or(n)(Ue(r, e))) : Ft;
}
function Vt(t, e) {
    return b((n, r) => {
        let o = 0;
        n.subscribe(T(r, (i) => t.call(e, i, o++) && r.next(i)));
    });
}
function ad(t) {
    return b((e, n) => {
        let r = !1,
            o = null,
            i = null,
            s = !1,
            a = () => {
                if ((i?.unsubscribe(), (i = null), r)) {
                    r = !1;
                    let c = o;
                    ((o = null), n.next(c));
                }
                s && n.complete();
            },
            l = () => {
                ((i = null), s && n.complete());
            };
        e.subscribe(
            T(
                n,
                (c) => {
                    ((r = !0),
                        (o = c),
                        i || k(t(c)).subscribe((i = T(n, a, l))));
                },
                () => {
                    ((s = !0), (!r || !i || i.closed) && n.complete());
                },
            ),
        );
    });
}
function cy(t, e = Pt) {
    return ad(() => Ho(t, e));
}
function ld(t) {
    return b((e, n) => {
        let r = null,
            o = !1,
            i;
        ((r = e.subscribe(
            T(n, void 0, void 0, (s) => {
                ((i = k(t(s, ld(t)(e)))),
                    r
                        ? (r.unsubscribe(), (r = null), i.subscribe(n))
                        : (o = !0));
            }),
        )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n)));
    });
}
function cd(t, e, n, r, o) {
    return (i, s) => {
        let a = n,
            l = e,
            c = 0;
        i.subscribe(
            T(
                s,
                (u) => {
                    let d = c++;
                    ((l = a ? t(l, u, d) : ((a = !0), u)), r && s.next(l));
                },
                o &&
                    (() => {
                        (a && s.next(l), s.complete());
                    }),
            ),
        );
    };
}
function uy(t, e) {
    return D(e) ? Me(t, e, 1) : Me(t, 1);
}
function dy(t, e = Pt) {
    return b((n, r) => {
        let o = null,
            i = null,
            s = null,
            a = () => {
                if (o) {
                    (o.unsubscribe(), (o = null));
                    let c = i;
                    ((i = null), r.next(c));
                }
            };
        function l() {
            let c = s + t,
                u = e.now();
            if (u < c) {
                ((o = this.schedule(void 0, c - u)), r.add(o));
                return;
            }
            a();
        }
        n.subscribe(
            T(
                r,
                (c) => {
                    ((i = c),
                        (s = e.now()),
                        o || ((o = e.schedule(l, t)), r.add(o)));
                },
                () => {
                    (a(), r.complete());
                },
                void 0,
                () => {
                    i = o = null;
                },
            ),
        );
    });
}
function ir(t) {
    return b((e, n) => {
        let r = !1;
        e.subscribe(
            T(
                n,
                (o) => {
                    ((r = !0), n.next(o));
                },
                () => {
                    (r || n.next(t), n.complete());
                },
            ),
        );
    });
}
function _n(t) {
    return t <= 0
        ? () => Ft
        : b((e, n) => {
              let r = 0;
              e.subscribe(
                  T(n, (o) => {
                      ++r <= t && (n.next(o), t <= r && n.complete());
                  }),
              );
          });
}
function ud() {
    return b((t, e) => {
        t.subscribe(T(e, Rt));
    });
}
function dd(t) {
    return et(() => t);
}
function zs(t, e) {
    return e
        ? (n) => In(e.pipe(_n(1), ud()), n.pipe(zs(t)))
        : Me((n, r) => k(t(n, r)).pipe(_n(1), dd(n)));
}
function fy(t, e = Pt) {
    let n = Ho(t, e);
    return zs(() => n);
}
function py(t, e = ie) {
    return (
        (t = t ?? hy),
        b((n, r) => {
            let o,
                i = !0;
            n.subscribe(
                T(r, (s) => {
                    let a = e(s);
                    (i || !t(o, a)) && ((i = !1), (o = a), r.next(s));
                }),
            );
        })
    );
}
function hy(t, e) {
    return t === e;
}
function Bo(t = my) {
    return b((e, n) => {
        let r = !1;
        e.subscribe(
            T(
                n,
                (o) => {
                    ((r = !0), n.next(o));
                },
                () => (r ? n.complete() : n.error(t())),
            ),
        );
    });
}
function my() {
    return new jt();
}
function fd(t) {
    return b((e, n) => {
        try {
            e.subscribe(n);
        } finally {
            n.add(t);
        }
    });
}
function gy(t, e) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            t ? Vt((o, i) => t(o, i, r)) : ie,
            _n(1),
            n ? ir(e) : Bo(() => new jt()),
        );
}
function Ws(t) {
    return t <= 0
        ? () => Ft
        : b((e, n) => {
              let r = [];
              e.subscribe(
                  T(
                      n,
                      (o) => {
                          (r.push(o), t < r.length && r.shift());
                      },
                      () => {
                          for (let o of r) n.next(o);
                          n.complete();
                      },
                      void 0,
                      () => {
                          r = null;
                      },
                  ),
              );
          });
}
function yy(t, e) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            t ? Vt((o, i) => t(o, i, r)) : ie,
            Ws(1),
            n ? ir(e) : Bo(() => new jt()),
        );
}
function vy(t, e) {
    return b(cd(t, e, arguments.length >= 2, !0));
}
function Ey(t = {}) {
    let {
        connector: e = () => new De(),
        resetOnError: n = !0,
        resetOnComplete: r = !0,
        resetOnRefCountZero: o = !0,
    } = t;
    return (i) => {
        let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1,
            p = () => {
                (a?.unsubscribe(), (a = void 0));
            },
            f = () => {
                (p(), (s = l = void 0), (u = d = !1));
            },
            h = () => {
                let m = s;
                (f(), m?.unsubscribe());
            };
        return b((m, v) => {
            (c++, !d && !u && p());
            let g = (l = l ?? e());
            (v.add(() => {
                (c--, c === 0 && !d && !u && (a = Gs(h, o)));
            }),
                g.subscribe(v),
                !s &&
                    c > 0 &&
                    ((s = new Xe({
                        next: (F) => g.next(F),
                        error: (F) => {
                            ((d = !0), p(), (a = Gs(f, n, F)), g.error(F));
                        },
                        complete: () => {
                            ((u = !0), p(), (a = Gs(f, r)), g.complete());
                        },
                    })),
                    k(m).subscribe(s)));
        })(i);
    };
}
function Gs(t, e, ...n) {
    if (e === !0) {
        t();
        return;
    }
    if (e === !1) return;
    let r = new Xe({
        next: () => {
            (r.unsubscribe(), t());
        },
    });
    return k(e(...n)).subscribe(r);
}
function Iy(t) {
    return Vt((e, n) => t <= n);
}
function _y(...t) {
    let e = $e(t);
    return b((n, r) => {
        (e ? In(t, n, e) : In(t, n)).subscribe(r);
    });
}
function Dy(t, e) {
    return b((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(
            T(
                r,
                (l) => {
                    o?.unsubscribe();
                    let c = 0,
                        u = i++;
                    k(t(l, u)).subscribe(
                        (o = T(
                            r,
                            (d) => r.next(e ? e(l, d, u, c++) : d),
                            () => {
                                ((o = null), a());
                            },
                        )),
                    );
                },
                () => {
                    ((s = !0), a());
                },
            ),
        );
    });
}
function wy(t) {
    return b((e, n) => {
        (k(t).subscribe(T(n, () => n.complete(), Rt)),
            !n.closed && e.subscribe(n));
    });
}
function Ty(t, e = !1) {
    return b((n, r) => {
        let o = 0;
        n.subscribe(
            T(r, (i) => {
                let s = t(i, o++);
                ((s || e) && r.next(i), !s && r.complete());
            }),
        );
    });
}
function by(t, e, n) {
    let r = D(t) || e || n ? { next: t, error: e, complete: n } : t;
    return r
        ? b((o, i) => {
              var s;
              (s = r.subscribe) === null || s === void 0 || s.call(r);
              let a = !0;
              o.subscribe(
                  T(
                      i,
                      (l) => {
                          var c;
                          ((c = r.next) === null ||
                              c === void 0 ||
                              c.call(r, l),
                              i.next(l));
                      },
                      () => {
                          var l;
                          ((a = !1),
                              (l = r.complete) === null ||
                                  l === void 0 ||
                                  l.call(r),
                              i.complete());
                      },
                      (l) => {
                          var c;
                          ((a = !1),
                              (c = r.error) === null ||
                                  c === void 0 ||
                                  c.call(r, l),
                              i.error(l));
                      },
                      () => {
                          var l, c;
                          (a &&
                              ((l = r.unsubscribe) === null ||
                                  l === void 0 ||
                                  l.call(r)),
                              (c = r.finalize) === null ||
                                  c === void 0 ||
                                  c.call(r));
                      },
                  ),
              );
          })
        : ie;
}
function pd(t) {
    let e = S(null);
    try {
        return t();
    } finally {
        S(e);
    }
}
var Wo =
        "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",
    y = class extends Error {
        code;
        constructor(e, n) {
            (super(ia(e, n)), (this.code = e));
        }
    };
function Cy(t) {
    return `NG0${Math.abs(t)}`;
}
function ia(t, e) {
    return `${Cy(t)}${e ? ": " + e : ""}`;
}
var ze = globalThis;
function V(t) {
    for (let e in t) if (t[e] === V) return e;
    throw Error("");
}
function yd(t, e) {
    for (let n in e)
        e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function pe(t) {
    if (typeof t == "string") return t;
    if (Array.isArray(t)) return `[${t.map(pe).join(", ")}]`;
    if (t == null) return "" + t;
    let e = t.overriddenName || t.name;
    if (e) return `${e}`;
    let n = t.toString();
    if (n == null) return "" + n;
    let r = n.indexOf(`
`);
    return r >= 0 ? n.slice(0, r) : n;
}
function Go(t, e) {
    return t ? (e ? `${t} ${e}` : t) : e || "";
}
var Sy = V({ __forward_ref__: V });
function Qo(t) {
    return (
        (t.__forward_ref__ = Qo),
        (t.toString = function () {
            return pe(this());
        }),
        t
    );
}
function G(t) {
    return sa(t) ? t() : t;
}
function sa(t) {
    return (
        typeof t == "function" &&
        t.hasOwnProperty(Sy) &&
        t.__forward_ref__ === Qo
    );
}
function vd(t, e, n, r) {
    throw new Error(
        `ASSERTION ERROR: ${t}` +
            (r == null ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`),
    );
}
function z(t) {
    return {
        token: t.token,
        providedIn: t.providedIn || null,
        factory: t.factory,
        value: void 0,
    };
}
function Ed(t) {
    return { providers: t.providers || [], imports: t.imports || [] };
}
function cr(t) {
    return My(t, Ko);
}
function Ny(t) {
    return cr(t) !== null;
}
function My(t, e) {
    return (t.hasOwnProperty(e) && t[e]) || null;
}
function xy(t) {
    let e = t?.[Ko] ?? null;
    return e || null;
}
function Ks(t) {
    return t && t.hasOwnProperty(Uo) ? t[Uo] : null;
}
var Ko = V({ ɵprov: V }),
    Uo = V({ ɵinj: V }),
    P = class {
        _desc;
        ngMetadataName = "InjectionToken";
        ɵprov;
        constructor(e, n) {
            ((this._desc = e),
                (this.ɵprov = void 0),
                typeof n == "number"
                    ? (this.__NG_ELEMENT_ID__ = n)
                    : n !== void 0 &&
                      (this.ɵprov = z({
                          token: this,
                          providedIn: n.providedIn || "root",
                          factory: n.factory,
                      })));
        }
        get multi() {
            return this;
        }
        toString() {
            return `InjectionToken ${this._desc}`;
        }
    };
function aa(t) {
    return t && !!t.ɵproviders;
}
var la = V({ ɵcmp: V }),
    ca = V({ ɵdir: V }),
    ua = V({ ɵpipe: V }),
    da = V({ ɵmod: V }),
    ar = V({ ɵfac: V }),
    qt = V({ __NG_ELEMENT_ID__: V }),
    hd = V({ __NG_ENV_ID__: V });
function ur(t) {
    return typeof t == "string" ? t : t == null ? "" : String(t);
}
function Id(t) {
    return typeof t == "function"
        ? t.name || t.toString()
        : typeof t == "object" && t != null && typeof t.type == "function"
          ? t.type.name || t.type.toString()
          : ur(t);
}
function fa(t, e) {
    throw new y(-200, t);
}
function Zo(t, e) {
    throw new y(-201, !1);
}
var Zs;
function _d() {
    return Zs;
}
function se(t) {
    let e = Zs;
    return ((Zs = t), e);
}
function pa(t, e, n) {
    let r = cr(t);
    if (r && r.providedIn == "root")
        return r.value === void 0 ? (r.value = r.factory()) : r.value;
    if (n & 8) return null;
    if (e !== void 0) return e;
    Zo(t, "Injector");
}
var Ay = {},
    Ht = Ay,
    Ry = "__NG_DI_FLAG__",
    Ys = class {
        injector;
        constructor(e) {
            this.injector = e;
        }
        retrieve(e, n) {
            let r = Bt(n) || 0;
            try {
                return this.injector.get(e, r & 8 ? null : Ht, r);
            } catch (o) {
                if (Nt(o)) return o;
                throw o;
            }
        }
    },
    qo = "ngTempTokenPath",
    Oy = "ngTokenPath",
    ky = /\n/gm,
    Py = "\u0275",
    md = "__source";
function Fy(t, e = 0) {
    let n = eo();
    if (n === void 0) throw new y(-203, !1);
    if (n === null) return pa(t, void 0, e);
    {
        let r = Ly(e),
            o = n.retrieve(t, r);
        if (Nt(o)) {
            if (r.optional) return null;
            throw o;
        }
        return o;
    }
}
function qe(t, e = 0) {
    return (_d() || Fy)(G(t), e);
}
function x(t, e) {
    return qe(t, Bt(e));
}
function Bt(t) {
    return typeof t > "u" || typeof t == "number"
        ? t
        : 0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4);
}
function Ly(t) {
    return {
        optional: !!(t & 8),
        host: !!(t & 1),
        self: !!(t & 2),
        skipSelf: !!(t & 4),
    };
}
function Js(t) {
    let e = [];
    for (let n = 0; n < t.length; n++) {
        let r = G(t[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new y(900, !1);
            let o,
                i = 0;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    l = jy(a);
                typeof l == "number"
                    ? l === -1
                        ? (o = a.token)
                        : (i |= l)
                    : (o = a);
            }
            e.push(qe(o, i));
        } else e.push(qe(r));
    }
    return e;
}
function jy(t) {
    return t[Ry];
}
function Vy(t, e, n, r) {
    let o = t[qo];
    throw (
        e[md] && o.unshift(e[md]),
        (t.message = Hy(
            `
` + t.message,
            o,
            n,
            r,
        )),
        (t[Oy] = o),
        (t[qo] = null),
        t
    );
}
function Hy(t, e, n, r = null) {
    t =
        t &&
        t.charAt(0) ===
            `
` &&
        t.charAt(1) == Py
            ? t.slice(2)
            : t;
    let o = pe(e);
    if (Array.isArray(e)) o = e.map(pe).join(" -> ");
    else if (typeof e == "object") {
        let i = [];
        for (let s in e)
            if (e.hasOwnProperty(s)) {
                let a = e[s];
                i.push(
                    s +
                        ":" +
                        (typeof a == "string" ? JSON.stringify(a) : pe(a)),
                );
            }
        o = `{${i.join(", ")}}`;
    }
    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${t.replace(
        ky,
        `
  `,
    )}`;
}
function pt(t, e) {
    let n = t.hasOwnProperty(ar);
    return n ? t[ar] : null;
}
function Dd(t, e, n) {
    if (t.length !== e.length) return !1;
    for (let r = 0; r < t.length; r++) {
        let o = t[r],
            i = e[r];
        if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
    }
    return !0;
}
function wd(t) {
    return t.flat(Number.POSITIVE_INFINITY);
}
function Yo(t, e) {
    t.forEach((n) => (Array.isArray(n) ? Yo(n, e) : e(n)));
}
function ha(t, e, n) {
    e >= t.length ? t.push(n) : t.splice(e, 0, n);
}
function dr(t, e) {
    return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function Td(t, e) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(e);
    return n;
}
function bd(t, e, n, r) {
    let o = t.length;
    if (o == e) t.push(n, r);
    else if (o === 1) (t.push(r, t[0]), (t[0] = n));
    else {
        for (o--, t.push(t[o - 1], t[o]); o > e; ) {
            let i = o - 2;
            ((t[o] = t[i]), o--);
        }
        ((t[e] = n), (t[e + 1] = r));
    }
}
function fr(t, e, n) {
    let r = wn(t, e);
    return (r >= 0 ? (t[r | 1] = n) : ((r = ~r), bd(t, r, e, n)), r);
}
function Jo(t, e) {
    let n = wn(t, e);
    if (n >= 0) return t[n | 1];
}
function wn(t, e) {
    return By(t, e, 1);
}
function By(t, e, n) {
    let r = 0,
        o = t.length >> n;
    for (; o !== r; ) {
        let i = r + ((o - r) >> 1),
            s = t[i << n];
        if (e === s) return i << n;
        s > e ? (o = i) : (r = i + 1);
    }
    return ~(o << n);
}
var xe = {},
    ae = [],
    zt = new P(""),
    ma = new P("", -1),
    ga = new P(""),
    lr = class {
        get(e, n = Ht) {
            if (n === Ht)
                throw new Zn(`NullInjectorError: No provider for ${pe(e)}!`);
            return n;
        }
    };
function ya(t) {
    return t[da] || null;
}
function We(t) {
    return t[la] || null;
}
function Xo(t) {
    return t[ca] || null;
}
function Cd(t) {
    return t[ua] || null;
}
function ei(t) {
    return { ɵproviders: t };
}
function Sd(...t) {
    return { ɵproviders: va(!0, t), ɵfromNgModule: !0 };
}
function va(t, ...e) {
    let n = [],
        r = new Set(),
        o,
        i = (s) => {
            n.push(s);
        };
    return (
        Yo(e, (s) => {
            let a = s;
            zo(a, i, [], r) && ((o ||= []), o.push(a));
        }),
        o !== void 0 && Nd(o, i),
        n
    );
}
function Nd(t, e) {
    for (let n = 0; n < t.length; n++) {
        let { ngModule: r, providers: o } = t[n];
        Ea(o, (i) => {
            e(i, r);
        });
    }
}
function zo(t, e, n, r) {
    if (((t = G(t)), !t)) return !1;
    let o = null,
        i = Ks(t),
        s = !i && We(t);
    if (!i && !s) {
        let l = t.ngModule;
        if (((i = Ks(l)), i)) o = l;
        else return !1;
    } else {
        if (s && !s.standalone) return !1;
        o = t;
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if ((r.add(o), s.dependencies)) {
            let l =
                typeof s.dependencies == "function"
                    ? s.dependencies()
                    : s.dependencies;
            for (let c of l) zo(c, e, n, r);
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let c;
            try {
                Yo(i.imports, (u) => {
                    zo(u, e, n, r) && ((c ||= []), c.push(u));
                });
            } finally {
            }
            c !== void 0 && Nd(c, e);
        }
        if (!a) {
            let c = pt(o) || (() => new o());
            (e({ provide: o, useFactory: c, deps: ae }, o),
                e({ provide: ga, useValue: o, multi: !0 }, o),
                e({ provide: zt, useValue: () => qe(o), multi: !0 }, o));
        }
        let l = i.providers;
        if (l != null && !a) {
            let c = t;
            Ea(l, (u) => {
                e(u, c);
            });
        }
    } else return !1;
    return o !== t && t.providers !== void 0;
}
function Ea(t, e) {
    for (let n of t)
        (aa(n) && (n = n.ɵproviders), Array.isArray(n) ? Ea(n, e) : e(n));
}
var $y = V({ provide: String, useValue: V });
function Md(t) {
    return t !== null && typeof t == "object" && $y in t;
}
function Uy(t) {
    return !!(t && t.useExisting);
}
function qy(t) {
    return !!(t && t.useFactory);
}
function $t(t) {
    return typeof t == "function";
}
function xd(t) {
    return !!t.useClass;
}
var Ia = new P(""),
    $o = {},
    gd = {},
    Qs;
function Tn() {
    return (Qs === void 0 && (Qs = new lr()), Qs);
}
var we = class {},
    Ut = class extends we {
        parent;
        source;
        scopes;
        records = new Map();
        _ngOnDestroyHooks = new Set();
        _onDestroyHooks = [];
        get destroyed() {
            return this._destroyed;
        }
        _destroyed = !1;
        injectorDefTypes;
        constructor(e, n, r, o) {
            (super(),
                (this.parent = n),
                (this.source = r),
                (this.scopes = o),
                ea(e, (s) => this.processProvider(s)),
                this.records.set(ma, Dn(void 0, this)),
                o.has("environment") && this.records.set(we, Dn(void 0, this)));
            let i = this.records.get(Ia);
            (i != null &&
                typeof i.value == "string" &&
                this.scopes.add(i.value),
                (this.injectorDefTypes = new Set(
                    this.get(ga, ae, { self: !0 }),
                )));
        }
        retrieve(e, n) {
            let r = Bt(n) || 0;
            try {
                return this.get(e, Ht, r);
            } catch (o) {
                if (Nt(o)) return o;
                throw o;
            }
        }
        destroy() {
            (sr(this), (this._destroyed = !0));
            let e = S(null);
            try {
                for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                let n = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let r of n) r();
            } finally {
                (this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    S(e));
            }
        }
        onDestroy(e) {
            return (
                sr(this),
                this._onDestroyHooks.push(e),
                () => this.removeOnDestroy(e)
            );
        }
        runInContext(e) {
            sr(this);
            let n = Be(this),
                r = se(void 0),
                o;
            try {
                return e();
            } finally {
                (Be(n), se(r));
            }
        }
        get(e, n = Ht, r) {
            if ((sr(this), e.hasOwnProperty(hd))) return e[hd](this);
            let o = Bt(r),
                i,
                s = Be(this),
                a = se(void 0);
            try {
                if (!(o & 4)) {
                    let c = this.records.get(e);
                    if (c === void 0) {
                        let u = Ky(e) && cr(e);
                        (u && this.injectableDefInScope(u)
                            ? (c = Dn(Xs(e), $o))
                            : (c = null),
                            this.records.set(e, c));
                    }
                    if (c != null) return this.hydrate(e, c, o);
                }
                let l = o & 2 ? Tn() : this.parent;
                return ((n = o & 8 && n === Ht ? null : n), l.get(e, n));
            } catch (l) {
                if (Nt(l)) {
                    if (((l[qo] = l[qo] || []).unshift(pe(e)), s)) throw l;
                    return Vy(l, e, "R3InjectorError", this.source);
                } else throw l;
            } finally {
                (se(a), Be(s));
            }
        }
        resolveInjectorInitializers() {
            let e = S(null),
                n = Be(this),
                r = se(void 0),
                o;
            try {
                let i = this.get(zt, ae, { self: !0 });
                for (let s of i) s();
            } finally {
                (Be(n), se(r), S(e));
            }
        }
        toString() {
            let e = [],
                n = this.records;
            for (let r of n.keys()) e.push(pe(r));
            return `R3Injector[${e.join(", ")}]`;
        }
        processProvider(e) {
            e = G(e);
            let n = $t(e) ? e : G(e && e.provide),
                r = Wy(e);
            if (!$t(e) && e.multi === !0) {
                let o = this.records.get(n);
                (o ||
                    ((o = Dn(void 0, $o, !0)),
                    (o.factory = () => Js(o.multi)),
                    this.records.set(n, o)),
                    (n = e),
                    o.multi.push(e));
            }
            this.records.set(n, r);
        }
        hydrate(e, n, r) {
            let o = S(null);
            try {
                return (
                    n.value === gd
                        ? fa(pe(e))
                        : n.value === $o &&
                          ((n.value = gd), (n.value = n.factory(void 0, r))),
                    typeof n.value == "object" &&
                        n.value &&
                        Qy(n.value) &&
                        this._ngOnDestroyHooks.add(n.value),
                    n.value
                );
            } finally {
                S(o);
            }
        }
        injectableDefInScope(e) {
            if (!e.providedIn) return !1;
            let n = G(e.providedIn);
            return typeof n == "string"
                ? n === "any" || this.scopes.has(n)
                : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(e) {
            let n = this._onDestroyHooks.indexOf(e);
            n !== -1 && this._onDestroyHooks.splice(n, 1);
        }
    };
function Xs(t) {
    let e = cr(t),
        n = e !== null ? e.factory : pt(t);
    if (n !== null) return n;
    if (t instanceof P) throw new y(204, !1);
    if (t instanceof Function) return zy(t);
    throw new y(204, !1);
}
function zy(t) {
    if (t.length > 0) throw new y(204, !1);
    let n = xy(t);
    return n !== null ? () => n.factory(t) : () => new t();
}
function Wy(t) {
    if (Md(t)) return Dn(void 0, t.useValue);
    {
        let e = _a(t);
        return Dn(e, $o);
    }
}
function _a(t, e, n) {
    let r;
    if ($t(t)) {
        let o = G(t);
        return pt(o) || Xs(o);
    } else if (Md(t)) r = () => G(t.useValue);
    else if (qy(t)) r = () => t.useFactory(...Js(t.deps || []));
    else if (Uy(t))
        r = (o, i) => qe(G(t.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
    else {
        let o = G(t && (t.useClass || t.provide));
        if (Gy(t)) r = () => new o(...Js(t.deps));
        else return pt(o) || Xs(o);
    }
    return r;
}
function sr(t) {
    if (t.destroyed) throw new y(205, !1);
}
function Dn(t, e, n = !1) {
    return { factory: t, value: e, multi: n ? [] : void 0 };
}
function Gy(t) {
    return !!t.deps;
}
function Qy(t) {
    return (
        t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
    );
}
function Ky(t) {
    return (
        typeof t == "function" ||
        (typeof t == "object" && t.ngMetadataName === "InjectionToken")
    );
}
function ea(t, e) {
    for (let n of t)
        Array.isArray(n) ? ea(n, e) : n && aa(n) ? ea(n.ɵproviders, e) : e(n);
}
function ti(t, e) {
    let n;
    t instanceof Ut ? (sr(t), (n = t)) : (n = new Ys(t));
    let r,
        o = Be(n),
        i = se(void 0);
    try {
        return e();
    } finally {
        (Be(o), se(i));
    }
}
function Ad() {
    return _d() !== void 0 || eo() != null;
}
var Ae = 0,
    _ = 1,
    N = 2,
    Q = 3,
    Te = 4,
    le = 5,
    Wt = 6,
    bn = 7,
    q = 8,
    Gt = 9,
    Ge = 10,
    j = 11,
    Cn = 12,
    Da = 13,
    Qt = 14,
    ce = 15,
    yt = 16,
    Kt = 17,
    Qe = 18,
    pr = 19,
    wa = 20,
    tt = 21,
    ni = 22,
    hr = 23,
    ve = 24,
    Zt = 25,
    H = 26,
    Rd = 1,
    Ta = 6,
    vt = 7,
    mr = 8,
    Yt = 9,
    J = 10;
function Ke(t) {
    return Array.isArray(t) && typeof t[Rd] == "object";
}
function Re(t) {
    return Array.isArray(t) && t[Rd] === !0;
}
function ba(t) {
    return (t.flags & 4) !== 0;
}
function Et(t) {
    return t.componentOffset > -1;
}
function Sn(t) {
    return (t.flags & 1) === 1;
}
function Oe(t) {
    return !!t.template;
}
function Nn(t) {
    return (t[N] & 512) !== 0;
}
function Jt(t) {
    return (t[N] & 256) === 256;
}
var Od = "svg",
    kd = "math";
function be(t) {
    for (; Array.isArray(t); ) t = t[Ae];
    return t;
}
function Ca(t, e) {
    return be(e[t]);
}
function ke(t, e) {
    return be(e[t.index]);
}
function gr(t, e) {
    return t.data[e];
}
function Sa(t, e) {
    return t[e];
}
function Na(t, e, n, r) {
    (n >= t.data.length && ((t.data[n] = null), (t.blueprint[n] = null)),
        (e[n] = r));
}
function Ce(t, e) {
    let n = e[t];
    return Ke(n) ? n : n[Ae];
}
function Pd(t) {
    return (t[N] & 4) === 4;
}
function ri(t) {
    return (t[N] & 128) === 128;
}
function Fd(t) {
    return Re(t[Q]);
}
function Ee(t, e) {
    return e == null ? null : t[e];
}
function Ma(t) {
    t[Kt] = 0;
}
function xa(t) {
    t[N] & 1024 || ((t[N] |= 1024), ri(t) && Mn(t));
}
function Ld(t, e) {
    for (; t > 0; ) ((e = e[Qt]), t--);
    return e;
}
function yr(t) {
    return !!(t[N] & 9216 || t[ve]?.dirty);
}
function oi(t) {
    (t[Ge].changeDetectionScheduler?.notify(8),
        t[N] & 64 && (t[N] |= 1024),
        yr(t) && Mn(t));
}
function Mn(t) {
    t[Ge].changeDetectionScheduler?.notify(0);
    let e = ht(t);
    for (; e !== null && !(e[N] & 8192 || ((e[N] |= 8192), !ri(e))); )
        e = ht(e);
}
function Aa(t, e) {
    if (Jt(t)) throw new y(911, !1);
    (t[tt] === null && (t[tt] = []), t[tt].push(e));
}
function jd(t, e) {
    if (t[tt] === null) return;
    let n = t[tt].indexOf(e);
    n !== -1 && t[tt].splice(n, 1);
}
function ht(t) {
    let e = t[Q];
    return Re(e) ? e[Q] : e;
}
function Ra(t) {
    return (t[bn] ??= []);
}
function Oa(t) {
    return (t.cleanup ??= []);
}
function Vd(t, e, n, r) {
    let o = Ra(e);
    (o.push(n), t.firstCreatePass && Oa(t).push(r, o.length - 1));
}
var A = { lFrame: Jd(null), bindingsEnabled: !0, skipHydrationRootTNode: null },
    vr = (function (t) {
        return (
            (t[(t.Off = 0)] = "Off"),
            (t[(t.Exhaustive = 1)] = "Exhaustive"),
            (t[(t.OnlyDirtyViews = 2)] = "OnlyDirtyViews"),
            t
        );
    })(vr || {}),
    Zy = 0,
    ta = !1;
function Hd() {
    return A.lFrame.elementDepthCount;
}
function Bd() {
    A.lFrame.elementDepthCount++;
}
function ka() {
    A.lFrame.elementDepthCount--;
}
function ii() {
    return A.bindingsEnabled;
}
function Pa() {
    return A.skipHydrationRootTNode !== null;
}
function Fa(t) {
    return A.skipHydrationRootTNode === t;
}
function La() {
    A.skipHydrationRootTNode = null;
}
function C() {
    return A.lFrame.lView;
}
function $() {
    return A.lFrame.tView;
}
function $d(t) {
    return ((A.lFrame.contextLView = t), t[q]);
}
function Ud(t) {
    return ((A.lFrame.contextLView = null), t);
}
function K() {
    let t = ja();
    for (; t !== null && t.type === 64; ) t = t.parent;
    return t;
}
function ja() {
    return A.lFrame.currentTNode;
}
function qd() {
    let t = A.lFrame,
        e = t.currentTNode;
    return t.isParent ? e : e.parent;
}
function xn(t, e) {
    let n = A.lFrame;
    ((n.currentTNode = t), (n.isParent = e));
}
function Va() {
    return A.lFrame.isParent;
}
function Ha() {
    A.lFrame.isParent = !1;
}
function zd() {
    return A.lFrame.contextLView;
}
function Ba(t) {
    (vd("Must never be called in production mode"), (Zy = t));
}
function $a() {
    return ta;
}
function Ua(t) {
    let e = ta;
    return ((ta = t), e);
}
function si() {
    let t = A.lFrame,
        e = t.bindingRootIndex;
    return (
        e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex),
        e
    );
}
function Wd(t) {
    return (A.lFrame.bindingIndex = t);
}
function An() {
    return A.lFrame.bindingIndex++;
}
function qa(t) {
    let e = A.lFrame,
        n = e.bindingIndex;
    return ((e.bindingIndex = e.bindingIndex + t), n);
}
function Gd() {
    return A.lFrame.inI18n;
}
function Qd(t, e) {
    let n = A.lFrame;
    ((n.bindingIndex = n.bindingRootIndex = t), ai(e));
}
function Kd() {
    return A.lFrame.currentDirectiveIndex;
}
function ai(t) {
    A.lFrame.currentDirectiveIndex = t;
}
function Zd(t) {
    let e = A.lFrame.currentDirectiveIndex;
    return e === -1 ? null : t[e];
}
function za() {
    return A.lFrame.currentQueryIndex;
}
function li(t) {
    A.lFrame.currentQueryIndex = t;
}
function Yy(t) {
    let e = t[_];
    return e.type === 2 ? e.declTNode : e.type === 1 ? t[le] : null;
}
function Wa(t, e, n) {
    if (n & 4) {
        let o = e,
            i = t;
        for (; (o = o.parent), o === null && !(n & 1); )
            if (((o = Yy(i)), o === null || ((i = i[Qt]), o.type & 10))) break;
        if (o === null) return !1;
        ((e = o), (t = i));
    }
    let r = (A.lFrame = Yd());
    return ((r.currentTNode = e), (r.lView = t), !0);
}
function ci(t) {
    let e = Yd(),
        n = t[_];
    ((A.lFrame = e),
        (e.currentTNode = n.firstChild),
        (e.lView = t),
        (e.tView = n),
        (e.contextLView = t),
        (e.bindingIndex = n.bindingStartIndex),
        (e.inI18n = !1));
}
function Yd() {
    let t = A.lFrame,
        e = t === null ? null : t.child;
    return e === null ? Jd(t) : e;
}
function Jd(t) {
    let e = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: t,
        child: null,
        inI18n: !1,
    };
    return (t !== null && (t.child = e), e);
}
function Xd() {
    let t = A.lFrame;
    return (
        (A.lFrame = t.parent),
        (t.currentTNode = null),
        (t.lView = null),
        t
    );
}
var Ga = Xd;
function ui() {
    let t = Xd();
    ((t.isParent = !0),
        (t.tView = null),
        (t.selectedIndex = -1),
        (t.contextLView = null),
        (t.elementDepthCount = 0),
        (t.currentDirectiveIndex = -1),
        (t.currentNamespace = null),
        (t.bindingRootIndex = -1),
        (t.bindingIndex = -1),
        (t.currentQueryIndex = 0));
}
function ef(t) {
    return (A.lFrame.contextLView = Ld(t, A.lFrame.contextLView))[q];
}
function rt() {
    return A.lFrame.selectedIndex;
}
function It(t) {
    A.lFrame.selectedIndex = t;
}
function Qa() {
    let t = A.lFrame;
    return gr(t.tView, t.selectedIndex);
}
function tf() {
    return A.lFrame.currentNamespace;
}
var nf = !0;
function di() {
    return nf;
}
function Er(t) {
    nf = t;
}
function na(t, e = null, n = null, r) {
    let o = Ka(t, e, n, r);
    return (o.resolveInjectorInitializers(), o);
}
function Ka(t, e = null, n = null, r, o = new Set()) {
    let i = [n || ae, Sd(t)];
    return (
        (r = r || (typeof t == "object" ? void 0 : pe(t))),
        new Ut(i, e || Tn(), r || null, o)
    );
}
var mt = class t {
        static THROW_IF_NOT_FOUND = Ht;
        static NULL = new lr();
        static create(e, n) {
            if (Array.isArray(e)) return na({ name: "" }, n, e, "");
            {
                let r = e.name ?? "";
                return na({ name: r }, e.parent, e.providers, r);
            }
        }
        static ɵprov = z({
            token: t,
            providedIn: "any",
            factory: () => qe(ma),
        });
        static __NG_ELEMENT_ID__ = -1;
    },
    Jy = new P(""),
    Ir = (() => {
        class t {
            static __NG_ELEMENT_ID__ = Xy;
            static __NG_ENV_ID__ = (n) => n;
        }
        return t;
    })(),
    ra = class extends Ir {
        _lView;
        constructor(e) {
            (super(), (this._lView = e));
        }
        get destroyed() {
            return Jt(this._lView);
        }
        onDestroy(e) {
            let n = this._lView;
            return (Aa(n, e), () => jd(n, e));
        }
    };
function Xy() {
    return new ra(C());
}
var gt = class {
        _console = console;
        handleError(e) {
            this._console.error("ERROR", e);
        }
    },
    ot = new P("", {
        providedIn: "root",
        factory: () => {
            let t = x(we),
                e;
            return (n) => {
                t.destroyed && !e
                    ? setTimeout(() => {
                          throw n;
                      })
                    : ((e ??= t.get(gt)), e.handleError(n));
            };
        },
    }),
    rf = { provide: zt, useValue: () => void x(gt), multi: !0 };
function of(t, e) {
    let [n, r, o] = Ns(t, e?.equal),
        i = n,
        s = i[oe];
    return ((i.set = r), (i.update = o), (i.asReadonly = sf.bind(i)), i);
}
function sf() {
    let t = this[oe];
    if (t.readonlyFn === void 0) {
        let e = () => this();
        ((e[oe] = t), (t.readonlyFn = e));
    }
    return t.readonlyFn;
}
var nt = class {},
    _r = new P("", { providedIn: "root", factory: () => !1 });
var Za = new P(""),
    Ya = new P("");
var fi = (() => {
    class t {
        view;
        node;
        constructor(n, r) {
            ((this.view = n), (this.node = r));
        }
        static __NG_ELEMENT_ID__ = ev;
    }
    return t;
})();
function ev() {
    return new fi(C(), K());
}
var Xt = (() => {
        class t {
            taskId = 0;
            pendingTasks = new Set();
            destroyed = !1;
            pendingTask = new er(!1);
            get hasPendingTasks() {
                return this.destroyed ? !1 : this.pendingTask.value;
            }
            get hasPendingTasksObservable() {
                return this.destroyed
                    ? new R((n) => {
                          (n.next(!1), n.complete());
                      })
                    : this.pendingTask;
            }
            add() {
                !this.hasPendingTasks &&
                    !this.destroyed &&
                    this.pendingTask.next(!0);
                let n = this.taskId++;
                return (this.pendingTasks.add(n), n);
            }
            has(n) {
                return this.pendingTasks.has(n);
            }
            remove(n) {
                (this.pendingTasks.delete(n),
                    this.pendingTasks.size === 0 &&
                        this.hasPendingTasks &&
                        this.pendingTask.next(!1));
            }
            ngOnDestroy() {
                (this.pendingTasks.clear(),
                    this.hasPendingTasks && this.pendingTask.next(!1),
                    (this.destroyed = !0),
                    this.pendingTask.unsubscribe());
            }
            static ɵprov = z({
                token: t,
                providedIn: "root",
                factory: () => new t(),
            });
        }
        return t;
    })(),
    af = (() => {
        class t {
            internalPendingTasks = x(Xt);
            scheduler = x(nt);
            errorHandler = x(ot);
            add() {
                let n = this.internalPendingTasks.add();
                return () => {
                    this.internalPendingTasks.has(n) &&
                        (this.scheduler.notify(11),
                        this.internalPendingTasks.remove(n));
                };
            }
            run(n) {
                let r = this.add();
                n().catch(this.errorHandler).finally(r);
            }
            static ɵprov = z({
                token: t,
                providedIn: "root",
                factory: () => new t(),
            });
        }
        return t;
    })();
function Dr(...t) {}
var Ja = (() => {
        class t {
            static ɵprov = z({
                token: t,
                providedIn: "root",
                factory: () => new oa(),
            });
        }
        return t;
    })(),
    oa = class {
        dirtyEffectCount = 0;
        queues = new Map();
        add(e) {
            (this.enqueue(e), this.schedule(e));
        }
        schedule(e) {
            e.dirty && this.dirtyEffectCount++;
        }
        remove(e) {
            let n = e.zone,
                r = this.queues.get(n);
            r.has(e) && (r.delete(e), e.dirty && this.dirtyEffectCount--);
        }
        enqueue(e) {
            let n = e.zone;
            this.queues.has(n) || this.queues.set(n, new Set());
            let r = this.queues.get(n);
            r.has(e) || r.add(e);
        }
        flush() {
            for (; this.dirtyEffectCount > 0; ) {
                let e = !1;
                for (let [n, r] of this.queues)
                    n === null
                        ? (e ||= this.flushQueue(r))
                        : (e ||= n.run(() => this.flushQueue(r)));
                e || (this.dirtyEffectCount = 0);
            }
        }
        flushQueue(e) {
            let n = !1;
            for (let r of e)
                r.dirty && (this.dirtyEffectCount--, (n = !0), r.run());
            return n;
        }
    };
function Rr(t) {
    return { toString: t }.toString();
}
var uv = Function;
function dv(t) {
    return typeof t == "function";
}
var Di = class {
    previousValue;
    currentValue;
    firstChange;
    constructor(e, n, r) {
        ((this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r));
    }
    isFirstChange() {
        return this.firstChange;
    }
};
function qf(t, e, n, r) {
    e !== null ? e.applyValueToInputSignal(e, r) : (t[n] = r);
}
var fv = (() => {
    let t = () => zf;
    return ((t.ngInherit = !0), t);
})();
function zf(t) {
    return (t.type.prototype.ngOnChanges && (t.setInput = hv), pv);
}
function pv() {
    let t = Gf(this),
        e = t?.current;
    if (e) {
        let n = t.previous;
        if (n === xe) t.previous = e;
        else for (let r in e) n[r] = e[r];
        ((t.current = null), this.ngOnChanges(e));
    }
}
function hv(t, e, n, r, o) {
    let i = this.declaredInputs[r],
        s = Gf(t) || mv(t, { previous: xe, current: null }),
        a = s.current || (s.current = {}),
        l = s.previous,
        c = l[i];
    ((a[i] = new Di(c && c.currentValue, n, l === xe)), qf(t, e, o, n));
}
var Wf = "__ngSimpleChanges__";
function Gf(t) {
    return t[Wf] || null;
}
function mv(t, e) {
    return (t[Wf] = e);
}
var lf = [];
var L = function (t, e = null, n) {
    for (let r = 0; r < lf.length; r++) {
        let o = lf[r];
        o(t, e, n);
    }
};
function gv(t, e, n) {
    let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = e.type.prototype;
    if (r) {
        let s = zf(e);
        ((n.preOrderHooks ??= []).push(t, s),
            (n.preOrderCheckHooks ??= []).push(t, s));
    }
    (o && (n.preOrderHooks ??= []).push(0 - t, o),
        i &&
            ((n.preOrderHooks ??= []).push(t, i),
            (n.preOrderCheckHooks ??= []).push(t, i)));
}
function Qf(t, e) {
    for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
        let i = t.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: l,
                ngAfterViewChecked: c,
                ngOnDestroy: u,
            } = i;
        (s && (t.contentHooks ??= []).push(-n, s),
            a &&
                ((t.contentHooks ??= []).push(n, a),
                (t.contentCheckHooks ??= []).push(n, a)),
            l && (t.viewHooks ??= []).push(-n, l),
            c &&
                ((t.viewHooks ??= []).push(n, c),
                (t.viewCheckHooks ??= []).push(n, c)),
            u != null && (t.destroyHooks ??= []).push(n, u));
    }
}
function yi(t, e, n) {
    Kf(t, e, 3, n);
}
function vi(t, e, n, r) {
    (t[N] & 3) === n && Kf(t, e, n, r);
}
function Xa(t, e) {
    let n = t[N];
    (n & 3) === e && ((n &= 16383), (n += 1), (t[N] = n));
}
function Kf(t, e, n, r) {
    let o = r !== void 0 ? t[Kt] & 65535 : 0,
        i = r ?? -1,
        s = e.length - 1,
        a = 0;
    for (let l = o; l < s; l++)
        if (typeof e[l + 1] == "number") {
            if (((a = e[l]), r != null && a >= r)) break;
        } else
            (e[l] < 0 && (t[Kt] += 65536),
                (a < i || i == -1) &&
                    (yv(t, n, e, l), (t[Kt] = (t[Kt] & 4294901760) + l + 2)),
                l++);
}
function cf(t, e) {
    L(4, t, e);
    let n = S(null);
    try {
        e.call(t);
    } finally {
        (S(n), L(5, t, e));
    }
}
function yv(t, e, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = t[s];
    o
        ? t[N] >> 14 < t[Kt] >> 16 &&
          (t[N] & 3) === e &&
          ((t[N] += 16384), cf(a, i))
        : cf(a, i);
}
var On = -1,
    nn = class {
        factory;
        injectImpl;
        resolving = !1;
        canSeeViewProviders;
        multi;
        componentProviders;
        index;
        providerFactory;
        constructor(e, n, r) {
            ((this.factory = e),
                (this.canSeeViewProviders = n),
                (this.injectImpl = r));
        }
    };
function vv(t) {
    return (t.flags & 8) !== 0;
}
function Ev(t) {
    return (t.flags & 16) !== 0;
}
function Iv(t, e, n) {
    let r = 0;
    for (; r < n.length; ) {
        let o = n[r];
        if (typeof o == "number") {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            t.setAttribute(e, s, a, i);
        } else {
            let i = o,
                s = n[++r];
            (_v(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), r++);
        }
    }
    return r;
}
function Zf(t) {
    return t === 3 || t === 4 || t === 6;
}
function _v(t) {
    return t.charCodeAt(0) === 64;
}
function kn(t, e) {
    if (!(e === null || e.length === 0))
        if (t === null || t.length === 0) t = e.slice();
        else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
                let o = e[r];
                typeof o == "number"
                    ? (n = o)
                    : n === 0 ||
                      (n === -1 || n === 2
                          ? uf(t, n, o, null, e[++r])
                          : uf(t, n, o, null, null));
            }
        }
    return t;
}
function uf(t, e, n, r, o) {
    let i = 0,
        s = t.length;
    if (e === -1) s = -1;
    else
        for (; i < t.length; ) {
            let a = t[i++];
            if (typeof a == "number") {
                if (a === e) {
                    s = -1;
                    break;
                } else if (a > e) {
                    s = i - 1;
                    break;
                }
            }
        }
    for (; i < t.length; ) {
        let a = t[i];
        if (typeof a == "number") break;
        if (a === n) {
            o !== null && (t[i + 1] = o);
            return;
        }
        (i++, o !== null && i++);
    }
    (s !== -1 && (t.splice(s, 0, e), (i = s + 1)),
        t.splice(i++, 0, n),
        o !== null && t.splice(i++, 0, o));
}
function Yf(t) {
    return t !== On;
}
function wi(t) {
    return t & 32767;
}
function Dv(t) {
    return t >> 16;
}
function Ti(t, e) {
    let n = Dv(t),
        r = e;
    for (; n > 0; ) ((r = r[Qt]), n--);
    return r;
}
var ul = !0;
function bi(t) {
    let e = ul;
    return ((ul = t), e);
}
var wv = 256,
    Jf = wv - 1,
    Xf = 5,
    Tv = 0,
    Ze = {};
function bv(t, e, n) {
    let r;
    (typeof n == "string"
        ? (r = n.charCodeAt(0) || 0)
        : n.hasOwnProperty(qt) && (r = n[qt]),
        r == null && (r = n[qt] = Tv++));
    let o = r & Jf,
        i = 1 << o;
    e.data[t + (o >> Xf)] |= i;
}
function Ci(t, e) {
    let n = ep(t, e);
    if (n !== -1) return n;
    let r = e[_];
    r.firstCreatePass &&
        ((t.injectorIndex = e.length),
        el(r.data, t),
        el(e, null),
        el(r.blueprint, null));
    let o = Kl(t, e),
        i = t.injectorIndex;
    if (Yf(o)) {
        let s = wi(o),
            a = Ti(o, e),
            l = a[_].data;
        for (let c = 0; c < 8; c++) e[i + c] = a[s + c] | l[s + c];
    }
    return ((e[i + 8] = o), i);
}
function el(t, e) {
    t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function ep(t, e) {
    return t.injectorIndex === -1 ||
        (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
        e[t.injectorIndex + 8] === null
        ? -1
        : t.injectorIndex;
}
function Kl(t, e) {
    if (t.parent && t.parent.injectorIndex !== -1)
        return t.parent.injectorIndex;
    let n = 0,
        r = null,
        o = e;
    for (; o !== null; ) {
        if (((r = ip(o)), r === null)) return On;
        if ((n++, (o = o[Qt]), r.injectorIndex !== -1))
            return r.injectorIndex | (n << 16);
    }
    return On;
}
function dl(t, e, n) {
    bv(t, e, n);
}
function Cv(t, e) {
    if (e === "class") return t.classes;
    if (e === "style") return t.styles;
    let n = t.attrs;
    if (n) {
        let r = n.length,
            o = 0;
        for (; o < r; ) {
            let i = n[o];
            if (Zf(i)) break;
            if (i === 0) o = o + 2;
            else if (typeof i == "number")
                for (o++; o < r && typeof n[o] == "string"; ) o++;
            else {
                if (i === e) return n[o + 1];
                o = o + 2;
            }
        }
    }
    return null;
}
function tp(t, e, n) {
    if (n & 8 || t !== void 0) return t;
    Zo(e, "NodeInjector");
}
function np(t, e, n, r) {
    if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
        let o = t[Gt],
            i = se(void 0);
        try {
            return o ? o.get(e, r, n & 8) : pa(e, r, n & 8);
        } finally {
            se(i);
        }
    }
    return tp(r, e, n);
}
function rp(t, e, n, r = 0, o) {
    if (t !== null) {
        if (e[N] & 2048 && !(r & 2)) {
            let s = Av(t, e, n, r, Ze);
            if (s !== Ze) return s;
        }
        let i = op(t, e, n, r, Ze);
        if (i !== Ze) return i;
    }
    return np(e, n, r, o);
}
function op(t, e, n, r, o) {
    let i = Nv(n);
    if (typeof i == "function") {
        if (!Wa(e, t, r)) return r & 1 ? tp(o, n, r) : np(e, n, r, o);
        try {
            let s;
            if (((s = i(r)), s == null && !(r & 8))) Zo(n);
            else return s;
        } finally {
            Ga();
        }
    } else if (typeof i == "number") {
        let s = null,
            a = ep(t, e),
            l = On,
            c = r & 1 ? e[ce][le] : null;
        for (
            (a === -1 || r & 4) &&
            ((l = a === -1 ? Kl(t, e) : e[a + 8]),
            l === On || !ff(r, !1)
                ? (a = -1)
                : ((s = e[_]), (a = wi(l)), (e = Ti(l, e))));
            a !== -1;

        ) {
            let u = e[_];
            if (df(i, a, u.data)) {
                let d = Sv(a, e, n, s, r, c);
                if (d !== Ze) return d;
            }
            ((l = e[a + 8]),
                l !== On && ff(r, e[_].data[a + 8] === c) && df(i, a, e)
                    ? ((s = u), (a = wi(l)), (e = Ti(l, e)))
                    : (a = -1));
        }
    }
    return o;
}
function Sv(t, e, n, r, o, i) {
    let s = e[_],
        a = s.data[t + 8],
        l = r == null ? Et(a) && ul : r != s && (a.type & 3) !== 0,
        c = o & 1 && i === a,
        u = Ei(a, s, n, l, c);
    return u !== null ? br(e, s, u, a, o) : Ze;
}
function Ei(t, e, n, r, o) {
    let i = t.providerIndexes,
        s = e.data,
        a = i & 1048575,
        l = t.directiveStart,
        c = t.directiveEnd,
        u = i >> 20,
        d = r ? a : a + u,
        p = o ? a + u : c;
    for (let f = d; f < p; f++) {
        let h = s[f];
        if ((f < l && n === h) || (f >= l && h.type === n)) return f;
    }
    if (o) {
        let f = s[l];
        if (f && Oe(f) && f.type === n) return l;
    }
    return null;
}
function br(t, e, n, r, o) {
    let i = t[n],
        s = e.data;
    if (i instanceof nn) {
        let a = i;
        a.resolving && fa(Id(s[n]));
        let l = bi(a.canSeeViewProviders);
        a.resolving = !0;
        let c = s[n].type || s[n],
            u,
            d = a.injectImpl ? se(a.injectImpl) : null,
            p = Wa(t, r, 0);
        try {
            ((i = t[n] = a.factory(void 0, o, s, t, r)),
                e.firstCreatePass && n >= r.directiveStart && gv(n, s[n], e));
        } finally {
            (d !== null && se(d), bi(l), (a.resolving = !1), Ga());
        }
    }
    return i;
}
function Nv(t) {
    if (typeof t == "string") return t.charCodeAt(0) || 0;
    let e = t.hasOwnProperty(qt) ? t[qt] : void 0;
    return typeof e == "number" ? (e >= 0 ? e & Jf : Mv) : e;
}
function df(t, e, n) {
    let r = 1 << t;
    return !!(n[e + (t >> Xf)] & r);
}
function ff(t, e) {
    return !(t & 2) && !(t & 1 && e);
}
var tn = class {
    _tNode;
    _lView;
    constructor(e, n) {
        ((this._tNode = e), (this._lView = n));
    }
    get(e, n, r) {
        return rp(this._tNode, this._lView, e, Bt(r), n);
    }
};
function Mv() {
    return new tn(K(), C());
}
function xv(t) {
    return Rr(() => {
        let e = t.prototype.constructor,
            n = e[ar] || fl(e),
            r = Object.prototype,
            o = Object.getPrototypeOf(t.prototype).constructor;
        for (; o && o !== r; ) {
            let i = o[ar] || fl(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
        }
        return (i) => new i();
    });
}
function fl(t) {
    return sa(t)
        ? () => {
              let e = fl(G(t));
              return e && e();
          }
        : pt(t);
}
function Av(t, e, n, r, o) {
    let i = t,
        s = e;
    for (; i !== null && s !== null && s[N] & 2048 && !Nn(s); ) {
        let a = op(i, s, n, r | 2, Ze);
        if (a !== Ze) return a;
        let l = i.parent;
        if (!l) {
            let c = s[wa];
            if (c) {
                let u = c.get(n, Ze, r);
                if (u !== Ze) return u;
            }
            ((l = ip(s)), (s = s[Qt]));
        }
        i = l;
    }
    return o;
}
function ip(t) {
    let e = t[_],
        n = e.type;
    return n === 2 ? e.declTNode : n === 1 ? t[le] : null;
}
function sp(t) {
    return Cv(K(), t);
}
function Rv() {
    return $n(K(), C());
}
function $n(t, e) {
    return new Or(ke(t, e));
}
var Or = (() => {
    class t {
        nativeElement;
        constructor(n) {
            this.nativeElement = n;
        }
        static __NG_ELEMENT_ID__ = Rv;
    }
    return t;
})();
function Ov(t) {
    return t instanceof Or ? t.nativeElement : t;
}
function kv() {
    return this._results[Symbol.iterator]();
}
var Si = class {
    _emitDistinctChangesOnly;
    dirty = !0;
    _onDirty = void 0;
    _results = [];
    _changesDetected = !1;
    _changes = void 0;
    length = 0;
    first = void 0;
    last = void 0;
    get changes() {
        return (this._changes ??= new De());
    }
    constructor(e = !1) {
        this._emitDistinctChangesOnly = e;
    }
    get(e) {
        return this._results[e];
    }
    map(e) {
        return this._results.map(e);
    }
    filter(e) {
        return this._results.filter(e);
    }
    find(e) {
        return this._results.find(e);
    }
    reduce(e, n) {
        return this._results.reduce(e, n);
    }
    forEach(e) {
        this._results.forEach(e);
    }
    some(e) {
        return this._results.some(e);
    }
    toArray() {
        return this._results.slice();
    }
    toString() {
        return this._results.toString();
    }
    reset(e, n) {
        this.dirty = !1;
        let r = wd(e);
        (this._changesDetected = !Dd(this._results, r, n)) &&
            ((this._results = r),
            (this.length = r.length),
            (this.last = r[this.length - 1]),
            (this.first = r[0]));
    }
    notifyOnChanges() {
        this._changes !== void 0 &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.next(this);
    }
    onDirty(e) {
        this._onDirty = e;
    }
    setDirty() {
        ((this.dirty = !0), this._onDirty?.());
    }
    destroy() {
        this._changes !== void 0 &&
            (this._changes.complete(), this._changes.unsubscribe());
    }
    [Symbol.iterator] = kv;
};
function ap(t) {
    return (t.flags & 128) === 128;
}
var Zl = (function (t) {
        return (
            (t[(t.OnPush = 0)] = "OnPush"),
            (t[(t.Default = 1)] = "Default"),
            t
        );
    })(Zl || {}),
    lp = new Map(),
    Pv = 0;
function Fv() {
    return Pv++;
}
function Lv(t) {
    lp.set(t[pr], t);
}
function pl(t) {
    lp.delete(t[pr]);
}
var pf = "__ngContext__";
function Pn(t, e) {
    Ke(e) ? ((t[pf] = e[pr]), Lv(e)) : (t[pf] = e);
}
function cp(t) {
    return dp(t[Cn]);
}
function up(t) {
    return dp(t[Te]);
}
function dp(t) {
    for (; t !== null && !Re(t); ) t = t[Te];
    return t;
}
var hl;
function jv(t) {
    hl = t;
}
function fp() {
    if (hl !== void 0) return hl;
    if (typeof document < "u") return document;
    throw new y(210, !1);
}
var Vv = new P("", { providedIn: "root", factory: () => Hv }),
    Hv = "ng",
    pp = new P(""),
    Bv = new P("", { providedIn: "platform", factory: () => "unknown" });
var $v = new P(""),
    Uv = new P("", {
        providedIn: "root",
        factory: () =>
            fp()
                .body?.querySelector("[ngCspNonce]")
                ?.getAttribute("ngCspNonce") || null,
    });
var qv = "h",
    zv = "b";
var hp = "r";
var mp = "di";
var gp = !1,
    yp = new P("", { providedIn: "root", factory: () => gp });
var Wv = (t, e, n, r) => {};
function Gv(t, e, n, r) {
    Wv(t, e, n, r);
}
function qi(t) {
    return (t.flags & 32) === 32;
}
var Qv = () => null;
function vp(t, e, n = !1) {
    return Qv(t, e, n);
}
function Ep(t, e) {
    let n = t.contentQueries;
    if (n !== null) {
        let r = S(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = t.data[s];
                    (li(i), a.contentQueries(2, e[s], s));
                }
            }
        } finally {
            S(r);
        }
    }
}
function ml(t, e, n) {
    li(0);
    let r = S(null);
    try {
        e(t, n);
    } finally {
        S(r);
    }
}
function Yl(t, e, n) {
    if (ba(e)) {
        let r = S(null);
        try {
            let o = e.directiveStart,
                i = e.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = t.data[s];
                if (a.contentQueries) {
                    let l = n[s];
                    a.contentQueries(1, l, s);
                }
            }
        } finally {
            S(r);
        }
    }
}
var Fn = (function (t) {
        return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
        );
    })(Fn || {}),
    pi;
function Kv() {
    if (pi === void 0 && ((pi = null), ze.trustedTypes))
        try {
            pi = ze.trustedTypes.createPolicy("angular", {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return pi;
}
function zi(t) {
    return Kv()?.createHTML(t) || t;
}
var hi;
function Zv() {
    if (hi === void 0 && ((hi = null), ze.trustedTypes))
        try {
            hi = ze.trustedTypes.createPolicy("angular#unsafe-bypass", {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return hi;
}
function hf(t) {
    return Zv()?.createScriptURL(t) || t;
}
var st = class {
        changingThisBreaksApplicationSecurity;
        constructor(e) {
            this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Wo})`;
        }
    },
    gl = class extends st {
        getTypeName() {
            return "HTML";
        }
    },
    yl = class extends st {
        getTypeName() {
            return "Style";
        }
    },
    vl = class extends st {
        getTypeName() {
            return "Script";
        }
    },
    El = class extends st {
        getTypeName() {
            return "URL";
        }
    },
    Il = class extends st {
        getTypeName() {
            return "ResourceURL";
        }
    };
function Un(t) {
    return t instanceof st ? t.changingThisBreaksApplicationSecurity : t;
}
function Jl(t, e) {
    let n = Ip(t);
    if (n != null && n !== e) {
        if (n === "ResourceURL" && e === "URL") return !0;
        throw new Error(`Required a safe ${e}, got a ${n} (see ${Wo})`);
    }
    return n === e;
}
function Ip(t) {
    return (t instanceof st && t.getTypeName()) || null;
}
function Yv(t) {
    return new gl(t);
}
function Jv(t) {
    return new yl(t);
}
function Xv(t) {
    return new vl(t);
}
function eE(t) {
    return new El(t);
}
function tE(t) {
    return new Il(t);
}
function nE(t) {
    let e = new Dl(t);
    return rE() ? new _l(e) : e;
}
var _l = class {
        inertDocumentHelper;
        constructor(e) {
            this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
            e = "<body><remove></remove>" + e;
            try {
                let n = new window.DOMParser().parseFromString(
                    zi(e),
                    "text/html",
                ).body;
                return n === null
                    ? this.inertDocumentHelper.getInertBodyElement(e)
                    : (n.firstChild?.remove(), n);
            } catch {
                return null;
            }
        }
    },
    Dl = class {
        defaultDoc;
        inertDocument;
        constructor(e) {
            ((this.defaultDoc = e),
                (this.inertDocument =
                    this.defaultDoc.implementation.createHTMLDocument(
                        "sanitization-inert",
                    )));
        }
        getInertBodyElement(e) {
            let n = this.inertDocument.createElement("template");
            return ((n.innerHTML = zi(e)), n);
        }
    };
function rE() {
    try {
        return !!new window.DOMParser().parseFromString(zi(""), "text/html");
    } catch {
        return !1;
    }
}
var oE = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Xl(t) {
    return ((t = String(t)), t.match(oE) ? t : "unsafe:" + t);
}
function at(t) {
    let e = {};
    for (let n of t.split(",")) e[n] = !0;
    return e;
}
function kr(...t) {
    let e = {};
    for (let n of t) for (let r in n) n.hasOwnProperty(r) && (e[r] = !0);
    return e;
}
var _p = at("area,br,col,hr,img,wbr"),
    Dp = at("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    wp = at("rp,rt"),
    iE = kr(wp, Dp),
    sE = kr(
        Dp,
        at(
            "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul",
        ),
    ),
    aE = kr(
        wp,
        at(
            "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video",
        ),
    ),
    mf = kr(_p, sE, aE, iE),
    Tp = at("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
    lE = at(
        "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width",
    ),
    cE = at(
        "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext",
    ),
    uE = kr(Tp, lE, cE),
    dE = at("script,style,template"),
    wl = class {
        sanitizedSomething = !1;
        buf = [];
        sanitizeChildren(e) {
            let n = e.firstChild,
                r = !0,
                o = [];
            for (; n; ) {
                if (
                    (n.nodeType === Node.ELEMENT_NODE
                        ? (r = this.startElement(n))
                        : n.nodeType === Node.TEXT_NODE
                          ? this.chars(n.nodeValue)
                          : (this.sanitizedSomething = !0),
                    r && n.firstChild)
                ) {
                    (o.push(n), (n = hE(n)));
                    continue;
                }
                for (; n; ) {
                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                    let i = pE(n);
                    if (i) {
                        n = i;
                        break;
                    }
                    n = o.pop();
                }
            }
            return this.buf.join("");
        }
        startElement(e) {
            let n = gf(e).toLowerCase();
            if (!mf.hasOwnProperty(n))
                return ((this.sanitizedSomething = !0), !dE.hasOwnProperty(n));
            (this.buf.push("<"), this.buf.push(n));
            let r = e.attributes;
            for (let o = 0; o < r.length; o++) {
                let i = r.item(o),
                    s = i.name,
                    a = s.toLowerCase();
                if (!uE.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue;
                }
                let l = i.value;
                (Tp[a] && (l = Xl(l)), this.buf.push(" ", s, '="', yf(l), '"'));
            }
            return (this.buf.push(">"), !0);
        }
        endElement(e) {
            let n = gf(e).toLowerCase();
            mf.hasOwnProperty(n) &&
                !_p.hasOwnProperty(n) &&
                (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(e) {
            this.buf.push(yf(e));
        }
    };
function fE(t, e) {
    return (
        (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
        Node.DOCUMENT_POSITION_CONTAINED_BY
    );
}
function pE(t) {
    let e = t.nextSibling;
    if (e && t !== e.previousSibling) throw bp(e);
    return e;
}
function hE(t) {
    let e = t.firstChild;
    if (e && fE(t, e)) throw bp(e);
    return e;
}
function gf(t) {
    let e = t.nodeName;
    return typeof e == "string" ? e : "FORM";
}
function bp(t) {
    return new Error(
        `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`,
    );
}
var mE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    gE = /([^\#-~ |!])/g;
function yf(t) {
    return t
        .replace(/&/g, "&amp;")
        .replace(mE, function (e) {
            let n = e.charCodeAt(0),
                r = e.charCodeAt(1);
            return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";";
        })
        .replace(gE, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
        })
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
var mi;
function yE(t, e) {
    let n = null;
    try {
        mi = mi || nE(t);
        let r = e ? String(e) : "";
        n = mi.getInertBodyElement(r);
        let o = 5,
            i = r;
        do {
            if (o === 0)
                throw new Error(
                    "Failed to sanitize html because the input is unstable",
                );
            (o--, (r = i), (i = n.innerHTML), (n = mi.getInertBodyElement(r)));
        } while (r !== i);
        let a = new wl().sanitizeChildren(vf(n) || n);
        return zi(a);
    } finally {
        if (n) {
            let r = vf(n) || n;
            for (; r.firstChild; ) r.firstChild.remove();
        }
    }
}
function vf(t) {
    return "content" in t && vE(t) ? t.content : null;
}
function vE(t) {
    return t.nodeType === Node.ELEMENT_NODE && t.nodeName === "TEMPLATE";
}
var Wi = (function (t) {
    return (
        (t[(t.NONE = 0)] = "NONE"),
        (t[(t.HTML = 1)] = "HTML"),
        (t[(t.STYLE = 2)] = "STYLE"),
        (t[(t.SCRIPT = 3)] = "SCRIPT"),
        (t[(t.URL = 4)] = "URL"),
        (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        t
    );
})(Wi || {});
function Cp(t) {
    let e = Np();
    return e ? e.sanitize(Wi.URL, t) || "" : Jl(t, "URL") ? Un(t) : Xl(ur(t));
}
function Sp(t) {
    let e = Np();
    if (e) return hf(e.sanitize(Wi.RESOURCE_URL, t) || "");
    if (Jl(t, "ResourceURL")) return hf(Un(t));
    throw new y(904, !1);
}
function EE(t, e) {
    return (e === "src" &&
        (t === "embed" ||
            t === "frame" ||
            t === "iframe" ||
            t === "media" ||
            t === "script")) ||
        (e === "href" && (t === "base" || t === "link"))
        ? Sp
        : Cp;
}
function IE(t, e, n) {
    return EE(e, n)(t);
}
function Np() {
    let t = C();
    return t && t[Ge].sanitizer;
}
var _E = /^>|^->|<!--|-->|--!>|<!-$/g,
    DE = /(<|>)/g,
    wE = "\u200B$1\u200B";
function TE(t) {
    return t.replace(_E, (e) => e.replace(DE, wE));
}
function Mp(t) {
    return t instanceof Function ? t() : t;
}
function bE(t, e, n) {
    let r = t.length;
    for (;;) {
        let o = t.indexOf(e, n);
        if (o === -1) return o;
        if (o === 0 || t.charCodeAt(o - 1) <= 32) {
            let i = e.length;
            if (o + i === r || t.charCodeAt(o + i) <= 32) return o;
        }
        n = o + 1;
    }
}
var xp = "ng-template";
function CE(t, e, n, r) {
    let o = 0;
    if (r) {
        for (; o < e.length && typeof e[o] == "string"; o += 2)
            if (e[o] === "class" && bE(e[o + 1].toLowerCase(), n, 0) !== -1)
                return !0;
    } else if (ec(t)) return !1;
    if (((o = e.indexOf(1, o)), o > -1)) {
        let i;
        for (; ++o < e.length && typeof (i = e[o]) == "string"; )
            if (i.toLowerCase() === n) return !0;
    }
    return !1;
}
function ec(t) {
    return t.type === 4 && t.value !== xp;
}
function SE(t, e, n) {
    let r = t.type === 4 && !n ? xp : t.value;
    return e === r;
}
function NE(t, e, n) {
    let r = 4,
        o = t.attrs,
        i = o !== null ? AE(o) : 0,
        s = !1;
    for (let a = 0; a < e.length; a++) {
        let l = e[a];
        if (typeof l == "number") {
            if (!s && !Pe(r) && !Pe(l)) return !1;
            if (s && Pe(l)) continue;
            ((s = !1), (r = l | (r & 1)));
            continue;
        }
        if (!s)
            if (r & 4) {
                if (
                    ((r = 2 | (r & 1)),
                    (l !== "" && !SE(t, l, n)) || (l === "" && e.length === 1))
                ) {
                    if (Pe(r)) return !1;
                    s = !0;
                }
            } else if (r & 8) {
                if (o === null || !CE(t, o, l, n)) {
                    if (Pe(r)) return !1;
                    s = !0;
                }
            } else {
                let c = e[++a],
                    u = ME(l, o, ec(t), n);
                if (u === -1) {
                    if (Pe(r)) return !1;
                    s = !0;
                    continue;
                }
                if (c !== "") {
                    let d;
                    if (
                        (u > i ? (d = "") : (d = o[u + 1].toLowerCase()),
                        r & 2 && c !== d)
                    ) {
                        if (Pe(r)) return !1;
                        s = !0;
                    }
                }
            }
    }
    return Pe(r) || s;
}
function Pe(t) {
    return (t & 1) === 0;
}
function ME(t, e, n, r) {
    if (e === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < e.length; ) {
            let s = e[o];
            if (s === t) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = e[++o];
                for (; typeof a == "string"; ) a = e[++o];
                continue;
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue;
                }
            }
            o += i ? 1 : 2;
        }
        return -1;
    } else return RE(e, t);
}
function Ap(t, e, n = !1) {
    for (let r = 0; r < e.length; r++) if (NE(t, e[r], n)) return !0;
    return !1;
}
function xE(t) {
    let e = t.attrs;
    if (e != null) {
        let n = e.indexOf(5);
        if ((n & 1) === 0) return e[n + 1];
    }
    return null;
}
function AE(t) {
    for (let e = 0; e < t.length; e++) {
        let n = t[e];
        if (Zf(n)) return e;
    }
    return t.length;
}
function RE(t, e) {
    let n = t.indexOf(4);
    if (n > -1)
        for (n++; n < t.length; ) {
            let r = t[n];
            if (typeof r == "number") return -1;
            if (r === e) return n;
            n++;
        }
    return -1;
}
function OE(t, e) {
    e: for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (t.length === r.length) {
            for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) continue e;
            return !0;
        }
    }
    return !1;
}
function Ef(t, e) {
    return t ? ":not(" + e.trim() + ")" : e;
}
function kE(t) {
    let e = t[0],
        n = 1,
        r = 2,
        o = "",
        i = !1;
    for (; n < t.length; ) {
        let s = t[n];
        if (typeof s == "string")
            if (r & 2) {
                let a = t[++n];
                o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else r & 8 ? (o += "." + s) : r & 4 && (o += " " + s);
        else
            (o !== "" && !Pe(s) && ((e += Ef(i, o)), (o = "")),
                (r = s),
                (i = i || !Pe(r)));
        n++;
    }
    return (o !== "" && (e += Ef(i, o)), e);
}
function PE(t) {
    return t.map(kE).join(",");
}
function FE(t) {
    let e = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < t.length; ) {
        let i = t[r];
        if (typeof i == "string")
            o === 2 ? i !== "" && e.push(i, t[++r]) : o === 8 && n.push(i);
        else {
            if (!Pe(o)) break;
            o = i;
        }
        r++;
    }
    return (n.length && e.push(1, ...n), e);
}
var Ie = {};
function LE(t, e) {
    return t.createText(e);
}
function jE(t, e, n) {
    t.setValue(e, n);
}
function VE(t, e) {
    return t.createComment(TE(e));
}
function Rp(t, e, n) {
    return t.createElement(e, n);
}
function Ni(t, e, n, r, o) {
    t.insertBefore(e, n, r, o);
}
function Op(t, e, n) {
    t.appendChild(e, n);
}
function If(t, e, n, r, o) {
    r !== null ? Ni(t, e, n, r, o) : Op(t, e, n);
}
function kp(t, e, n) {
    t.removeChild(null, e, n);
}
function HE(t, e, n) {
    t.setAttribute(e, "style", n);
}
function BE(t, e, n) {
    n === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n);
}
function Pp(t, e, n) {
    let { mergedAttrs: r, classes: o, styles: i } = n;
    (r !== null && Iv(t, e, r),
        o !== null && BE(t, e, o),
        i !== null && HE(t, e, i));
}
function tc(t, e, n, r, o, i, s, a, l, c, u) {
    let d = H + r,
        p = d + o,
        f = $E(d, p),
        h = typeof c == "function" ? c() : c;
    return (f[_] = {
        type: t,
        blueprint: f,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: e,
        data: f.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: p,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == "function" ? i() : i,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: l,
        consts: h,
        incompleteFirstPass: !1,
        ssrId: u,
    });
}
function $E(t, e) {
    let n = [];
    for (let r = 0; r < e; r++) n.push(r < t ? null : Ie);
    return n;
}
function UE(t) {
    let e = t.tView;
    return e === null || e.incompleteFirstPass
        ? (t.tView = tc(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
              t.id,
          ))
        : e;
}
function nc(t, e, n, r, o, i, s, a, l, c, u) {
    let d = e.blueprint.slice();
    return (
        (d[Ae] = o),
        (d[N] = r | 4 | 128 | 8 | 64 | 1024),
        (c !== null || (t && t[N] & 2048)) && (d[N] |= 2048),
        Ma(d),
        (d[Q] = d[Qt] = t),
        (d[q] = n),
        (d[Ge] = s || (t && t[Ge])),
        (d[j] = a || (t && t[j])),
        (d[Gt] = l || (t && t[Gt]) || null),
        (d[le] = i),
        (d[pr] = Fv()),
        (d[Wt] = u),
        (d[wa] = c),
        (d[ce] = e.type == 2 ? t[ce] : d),
        d
    );
}
function qE(t, e, n) {
    let r = ke(e, t),
        o = UE(n),
        i = t[Ge].rendererFactory,
        s = rc(
            t,
            nc(
                t,
                o,
                null,
                Fp(n),
                r,
                e,
                null,
                i.createRenderer(r, n),
                null,
                null,
                null,
            ),
        );
    return (t[e.index] = s);
}
function Fp(t) {
    let e = 16;
    return (t.signals ? (e = 4096) : t.onPush && (e = 64), e);
}
function Lp(t, e, n, r) {
    if (n === 0) return -1;
    let o = e.length;
    for (let i = 0; i < n; i++)
        (e.push(r), t.blueprint.push(r), t.data.push(null));
    return o;
}
function rc(t, e) {
    return (t[Cn] ? (t[Da][Te] = e) : (t[Cn] = e), (t[Da] = e), e);
}
function zE(t = 1) {
    jp($(), C(), rt() + t, !1);
}
function jp(t, e, n, r) {
    if (!r)
        if ((e[N] & 3) === 3) {
            let i = t.preOrderCheckHooks;
            i !== null && yi(e, i, n);
        } else {
            let i = t.preOrderHooks;
            i !== null && vi(e, i, 0, n);
        }
    It(n);
}
var Gi = (function (t) {
    return (
        (t[(t.None = 0)] = "None"),
        (t[(t.SignalBased = 1)] = "SignalBased"),
        (t[(t.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
        t
    );
})(Gi || {});
function Tl(t, e, n, r) {
    let o = S(null);
    try {
        let [i, s, a] = t.inputs[n],
            l = null;
        ((s & Gi.SignalBased) !== 0 && (l = e[i][oe]),
            l !== null && l.transformFn !== void 0
                ? (r = l.transformFn(r))
                : a !== null && (r = a.call(e, r)),
            t.setInput !== null ? t.setInput(e, l, r, n, i) : qf(e, l, i, r));
    } finally {
        S(o);
    }
}
var Mi = (function (t) {
        return (
            (t[(t.Important = 1)] = "Important"),
            (t[(t.DashCase = 2)] = "DashCase"),
            t
        );
    })(Mi || {}),
    WE;
function oc(t, e) {
    return WE(t, e);
}
function Rn(t, e, n, r, o) {
    if (r != null) {
        let i,
            s = !1;
        Re(r) ? (i = r) : Ke(r) && ((s = !0), (r = r[Ae]));
        let a = be(r);
        (t === 0 && n !== null
            ? o == null
                ? Op(e, n, a)
                : Ni(e, n, a, o || null, !0)
            : t === 1 && n !== null
              ? Ni(e, n, a, o || null, !0)
              : t === 2
                ? kp(e, a, s)
                : t === 3 && e.destroyNode(a),
            i != null && nI(e, t, i, n, o));
    }
}
function GE(t, e) {
    (Vp(t, e), (e[Ae] = null), (e[le] = null));
}
function QE(t, e, n, r, o, i) {
    ((r[Ae] = o), (r[le] = e), Ki(t, r, n, 1, o, i));
}
function Vp(t, e) {
    (e[Ge].changeDetectionScheduler?.notify(9), Ki(t, e, e[j], 2, null, null));
}
function KE(t) {
    let e = t[Cn];
    if (!e) return tl(t[_], t);
    for (; e; ) {
        let n = null;
        if (Ke(e)) n = e[Cn];
        else {
            let r = e[J];
            r && (n = r);
        }
        if (!n) {
            for (; e && !e[Te] && e !== t; ) (Ke(e) && tl(e[_], e), (e = e[Q]));
            (e === null && (e = t), Ke(e) && tl(e[_], e), (n = e && e[Te]));
        }
        e = n;
    }
}
function ic(t, e) {
    let n = t[Yt],
        r = n.indexOf(e);
    n.splice(r, 1);
}
function Qi(t, e) {
    if (Jt(e)) return;
    let n = e[j];
    (n.destroyNode && Ki(t, e, n, 3, null, null), KE(e));
}
function tl(t, e) {
    if (Jt(e)) return;
    let n = S(null);
    try {
        ((e[N] &= -129),
            (e[N] |= 256),
            e[ve] && lo(e[ve]),
            YE(t, e),
            ZE(t, e),
            e[_].type === 1 && e[j].destroy());
        let r = e[yt];
        if (r !== null && Re(e[Q])) {
            r !== e[Q] && ic(r, e);
            let o = e[Qe];
            o !== null && o.detachView(t);
        }
        pl(e);
    } finally {
        S(n);
    }
}
function ZE(t, e) {
    let n = t.cleanup,
        r = e[bn];
    if (n !== null)
        for (let s = 0; s < n.length - 1; s += 2)
            if (typeof n[s] == "string") {
                let a = n[s + 3];
                (a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2));
            } else {
                let a = r[n[s + 1]];
                n[s].call(a);
            }
    r !== null && (e[bn] = null);
    let o = e[tt];
    if (o !== null) {
        e[tt] = null;
        for (let s = 0; s < o.length; s++) {
            let a = o[s];
            a();
        }
    }
    let i = e[hr];
    if (i !== null) {
        e[hr] = null;
        for (let s of i) s.destroy();
    }
}
function YE(t, e) {
    let n;
    if (t != null && (n = t.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = e[n[r]];
            if (!(o instanceof nn)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            l = i[s + 1];
                        L(4, a, l);
                        try {
                            l.call(a);
                        } finally {
                            L(5, a, l);
                        }
                    }
                else {
                    L(4, o, i);
                    try {
                        i.call(o);
                    } finally {
                        L(5, o, i);
                    }
                }
            }
        }
}
function Hp(t, e, n) {
    return JE(t, e.parent, n);
}
function JE(t, e, n) {
    let r = e;
    for (; r !== null && r.type & 168; ) ((e = r), (r = e.parent));
    if (r === null) return n[Ae];
    if (Et(r)) {
        let { encapsulation: o } = t.data[r.directiveStart + r.componentOffset];
        if (o === Fn.None || o === Fn.Emulated) return null;
    }
    return ke(r, n);
}
function Bp(t, e, n) {
    return eI(t, e, n);
}
function XE(t, e, n) {
    return t.type & 40 ? ke(t, n) : null;
}
var eI = XE,
    _f;
function sc(t, e, n, r) {
    let o = Hp(t, r, e),
        i = e[j],
        s = r.parent || e[le],
        a = Bp(s, r, e);
    if (o != null)
        if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) If(i, o, n[l], a, !1);
        else If(i, o, n, a, !1);
    _f !== void 0 && _f(i, r, e, n, o);
}
function wr(t, e) {
    if (e !== null) {
        let n = e.type;
        if (n & 3) return ke(e, t);
        if (n & 4) return bl(-1, t[e.index]);
        if (n & 8) {
            let r = e.child;
            if (r !== null) return wr(t, r);
            {
                let o = t[e.index];
                return Re(o) ? bl(-1, o) : be(o);
            }
        } else {
            if (n & 128) return wr(t, e.next);
            if (n & 32) return oc(e, t)() || be(t[e.index]);
            {
                let r = $p(t, e);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = ht(t[ce]);
                    return wr(o, r);
                } else return wr(t, e.next);
            }
        }
    }
    return null;
}
function $p(t, e) {
    if (e !== null) {
        let r = t[ce][le],
            o = e.projection;
        return r.projection[o];
    }
    return null;
}
function bl(t, e) {
    let n = J + t + 1;
    if (n < e.length) {
        let r = e[n],
            o = r[_].firstChild;
        if (o !== null) return wr(r, o);
    }
    return e[vt];
}
function ac(t, e, n, r, o, i, s) {
    for (; n != null; ) {
        if (n.type === 128) {
            n = n.next;
            continue;
        }
        let a = r[n.index],
            l = n.type;
        if ((s && e === 0 && (a && Pn(be(a), r), (n.flags |= 2)), !qi(n)))
            if (l & 8) (ac(t, e, n.child, r, o, i, !1), Rn(e, t, o, a, i));
            else if (l & 32) {
                let c = oc(n, r),
                    u;
                for (; (u = c()); ) Rn(e, t, o, u, i);
                Rn(e, t, o, a, i);
            } else l & 16 ? Up(t, e, r, n, o, i) : Rn(e, t, o, a, i);
        n = s ? n.projectionNext : n.next;
    }
}
function Ki(t, e, n, r, o, i) {
    ac(n, r, t.firstChild, e, o, i, !1);
}
function tI(t, e, n) {
    let r = e[j],
        o = Hp(t, n, e),
        i = n.parent || e[le],
        s = Bp(i, n, e);
    Up(r, 0, e, n, o, s);
}
function Up(t, e, n, r, o, i) {
    let s = n[ce],
        l = s[le].projection[r.projection];
    if (Array.isArray(l))
        for (let c = 0; c < l.length; c++) {
            let u = l[c];
            Rn(e, t, o, u, i);
        }
    else {
        let c = l,
            u = s[Q];
        (ap(r) && (c.flags |= 128), ac(t, e, c, u, o, i, !0));
    }
}
function nI(t, e, n, r, o) {
    let i = n[vt],
        s = be(n);
    i !== s && Rn(e, t, r, i, o);
    for (let a = J; a < n.length; a++) {
        let l = n[a];
        Ki(l[_], l, t, e, r, i);
    }
}
function rI(t, e, n, r, o) {
    if (e) o ? t.addClass(n, r) : t.removeClass(n, r);
    else {
        let i = r.indexOf("-") === -1 ? void 0 : Mi.DashCase;
        o == null
            ? t.removeStyle(n, r, i)
            : (typeof o == "string" &&
                  o.endsWith("!important") &&
                  ((o = o.slice(0, -10)), (i |= Mi.Important)),
              t.setStyle(n, r, o, i));
    }
}
function qp(t, e, n, r, o) {
    let i = rt(),
        s = r & 2;
    try {
        (It(-1),
            s && e.length > H && jp(t, e, H, !1),
            L(s ? 2 : 0, o, n),
            n(r, o));
    } finally {
        (It(i), L(s ? 3 : 1, o, n));
    }
}
function Zi(t, e, n) {
    (dI(t, e, n), (n.flags & 64) === 64 && fI(t, e, n));
}
function Pr(t, e, n = ke) {
    let r = e.localNames;
    if (r !== null) {
        let o = e.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(e, t) : t[s];
            t[o++] = a;
        }
    }
}
function oI(t, e, n, r) {
    let i = r.get(yp, gp) || n === Fn.ShadowDom,
        s = t.selectRootElement(e, i);
    return (iI(s), s);
}
function iI(t) {
    sI(t);
}
var sI = () => null;
function aI(t) {
    return t === "class"
        ? "className"
        : t === "for"
          ? "htmlFor"
          : t === "formaction"
            ? "formAction"
            : t === "innerHtml"
              ? "innerHTML"
              : t === "readonly"
                ? "readOnly"
                : t === "tabindex"
                  ? "tabIndex"
                  : t;
}
function lI(t, e, n, r, o, i) {
    let s = e[_];
    if (dc(t, s, e, n, r)) {
        Et(t) && uI(e, t.index);
        return;
    }
    (t.type & 3 && (n = aI(n)), cI(t, e, n, r, o, i));
}
function cI(t, e, n, r, o, i) {
    if (t.type & 3) {
        let s = ke(t, e);
        ((r = i != null ? i(r, t.value || "", n) : r), o.setProperty(s, n, r));
    } else t.type & 12;
}
function uI(t, e) {
    let n = Ce(e, t);
    n[N] & 16 || (n[N] |= 64);
}
function dI(t, e, n) {
    let r = n.directiveStart,
        o = n.directiveEnd;
    (Et(n) && qE(e, n, t.data[r + n.componentOffset]),
        t.firstCreatePass || Ci(n, e));
    let i = n.initialInputs;
    for (let s = r; s < o; s++) {
        let a = t.data[s],
            l = br(e, t, s, n);
        if ((Pn(l, e), i !== null && gI(e, s - r, l, a, n, i), Oe(a))) {
            let c = Ce(n.index, e);
            c[q] = br(e, t, s, n);
        }
    }
}
function fI(t, e, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = Kd();
    try {
        It(i);
        for (let a = r; a < o; a++) {
            let l = t.data[a],
                c = e[a];
            (ai(a),
                (l.hostBindings !== null ||
                    l.hostVars !== 0 ||
                    l.hostAttrs !== null) &&
                    pI(l, c));
        }
    } finally {
        (It(-1), ai(s));
    }
}
function pI(t, e) {
    t.hostBindings !== null && t.hostBindings(1, e);
}
function lc(t, e) {
    let n = t.directiveRegistry,
        r = null;
    if (n)
        for (let o = 0; o < n.length; o++) {
            let i = n[o];
            Ap(e, i.selectors, !1) &&
                ((r ??= []), Oe(i) ? r.unshift(i) : r.push(i));
        }
    return r;
}
function hI(t, e, n, r, o, i) {
    let s = ke(t, e);
    mI(e[j], s, i, t.value, n, r, o);
}
function mI(t, e, n, r, o, i, s) {
    if (i == null) t.removeAttribute(e, o, n);
    else {
        let a = s == null ? ur(i) : s(i, r || "", o);
        t.setAttribute(e, o, a, n);
    }
}
function gI(t, e, n, r, o, i) {
    let s = i[e];
    if (s !== null)
        for (let a = 0; a < s.length; a += 2) {
            let l = s[a],
                c = s[a + 1];
            Tl(r, n, l, c);
        }
}
function cc(t, e, n, r, o) {
    let i = H + n,
        s = e[_],
        a = o(s, e, t, r, n);
    ((e[i] = a), xn(t, !0));
    let l = t.type === 2;
    return (
        l
            ? (Pp(e[j], a, t), (Hd() === 0 || Sn(t)) && Pn(a, e), Bd())
            : Pn(a, e),
        di() && (!l || !qi(t)) && sc(s, e, a, t),
        t
    );
}
function uc(t) {
    let e = t;
    return (Va() ? Ha() : ((e = e.parent), xn(e, !1)), e);
}
function yI(t, e) {
    let n = t[Gt];
    if (!n) return;
    n.get(ot, null)?.(e);
}
function dc(t, e, n, r, o) {
    let i = t.inputs?.[r],
        s = t.hostDirectiveInputs?.[r],
        a = !1;
    if (s)
        for (let l = 0; l < s.length; l += 2) {
            let c = s[l],
                u = s[l + 1],
                d = e.data[c];
            (Tl(d, n[c], u, o), (a = !0));
        }
    if (i)
        for (let l of i) {
            let c = n[l],
                u = e.data[l];
            (Tl(u, c, r, o), (a = !0));
        }
    return a;
}
function vI(t, e) {
    let n = Ce(e, t),
        r = n[_];
    EI(r, n);
    let o = n[Ae];
    (o !== null && n[Wt] === null && (n[Wt] = vp(o, n[Gt])),
        L(18),
        fc(r, n, n[q]),
        L(19, n[q]));
}
function EI(t, e) {
    for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
}
function fc(t, e, n) {
    ci(e);
    try {
        let r = t.viewQuery;
        r !== null && ml(1, r, n);
        let o = t.template;
        (o !== null && qp(t, e, o, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            e[Qe]?.finishViewCreation(t),
            t.staticContentQueries && Ep(t, e),
            t.staticViewQueries && ml(2, t.viewQuery, n));
        let i = t.components;
        i !== null && II(e, i);
    } catch (r) {
        throw (
            t.firstCreatePass &&
                ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r
        );
    } finally {
        ((e[N] &= -5), ui());
    }
}
function II(t, e) {
    for (let n = 0; n < e.length; n++) vI(t, e[n]);
}
function Fr(t, e, n, r) {
    let o = S(null);
    try {
        let i = e.tView,
            a = t[N] & 4096 ? 4096 : 16,
            l = nc(
                t,
                i,
                n,
                a,
                null,
                e,
                null,
                null,
                r?.injector ?? null,
                r?.embeddedViewInjector ?? null,
                r?.dehydratedView ?? null,
            ),
            c = t[e.index];
        l[yt] = c;
        let u = t[Qe];
        return (
            u !== null && (l[Qe] = u.createEmbeddedView(i)),
            fc(i, l, n),
            l
        );
    } finally {
        S(o);
    }
}
function Ln(t, e) {
    return !e || e.firstChild === null || ap(t);
}
var Df = !1,
    _I = new P("");
function Cr(t, e, n, r, o = !1) {
    for (; n !== null; ) {
        if (n.type === 128) {
            n = o ? n.projectionNext : n.next;
            continue;
        }
        let i = e[n.index];
        (i !== null && r.push(be(i)), Re(i) && zp(i, r));
        let s = n.type;
        if (s & 8) Cr(t, e, n.child, r);
        else if (s & 32) {
            let a = oc(n, e),
                l;
            for (; (l = a()); ) r.push(l);
        } else if (s & 16) {
            let a = $p(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let l = ht(e[ce]);
                Cr(l[_], l, a, r, !0);
            }
        }
        n = o ? n.projectionNext : n.next;
    }
    return r;
}
function zp(t, e) {
    for (let n = J; n < t.length; n++) {
        let r = t[n],
            o = r[_].firstChild;
        o !== null && Cr(r[_], r, o, e);
    }
    t[vt] !== t[Ae] && e.push(t[vt]);
}
function Wp(t) {
    if (t[Zt] !== null) {
        for (let e of t[Zt]) e.impl.addSequence(e);
        t[Zt].length = 0;
    }
}
var Gp = [];
function DI(t) {
    return t[ve] ?? wI(t);
}
function wI(t) {
    let e = Gp.pop() ?? Object.create(bI);
    return ((e.lView = t), e);
}
function TI(t) {
    t.lView[ve] !== t && ((t.lView = null), Gp.push(t));
}
var bI = ye(ee({}, Mt), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: (t) => {
        Mn(t.lView);
    },
    consumerOnSignalRead() {
        this.lView[ve] = this;
    },
});
function CI(t) {
    let e = t[ve] ?? Object.create(SI);
    return ((e.lView = t), e);
}
var SI = ye(ee({}, Mt), {
    consumerIsAlwaysLive: !0,
    kind: "template",
    consumerMarkedDirty: (t) => {
        let e = ht(t.lView);
        for (; e && !Qp(e[_]); ) e = ht(e);
        e && xa(e);
    },
    consumerOnSignalRead() {
        this.lView[ve] = this;
    },
});
function Qp(t) {
    return t.type !== 2;
}
function Kp(t) {
    if (t[hr] === null) return;
    let e = !0;
    for (; e; ) {
        let n = !1;
        for (let r of t[hr])
            r.dirty &&
                ((n = !0),
                r.zone === null || Zone.current === r.zone
                    ? r.run()
                    : r.zone.run(() => r.run()));
        e = n && !!(t[N] & 8192);
    }
}
var NI = 100;
function pc(t, e = 0) {
    let r = t[Ge].rendererFactory,
        o = !1;
    o || r.begin?.();
    try {
        MI(t, e);
    } finally {
        o || r.end?.();
    }
}
function MI(t, e) {
    let n = $a();
    try {
        (Ua(!0), Cl(t, e));
        let r = 0;
        for (; yr(t); ) {
            if (r === NI) throw new y(103, !1);
            (r++, Cl(t, 1));
        }
    } finally {
        Ua(n);
    }
}
function Zp(t, e) {
    Ba(e ? vr.Exhaustive : vr.OnlyDirtyViews);
    try {
        pc(t);
    } finally {
        Ba(vr.Off);
    }
}
function xI(t, e, n, r) {
    if (Jt(e)) return;
    let o = e[N],
        i = !1,
        s = !1;
    ci(e);
    let a = !0,
        l = null,
        c = null;
    i ||
        (Qp(t)
            ? ((c = DI(e)), (l = xt(c)))
            : so() === null
              ? ((a = !1), (c = CI(e)), (l = xt(c)))
              : e[ve] && (lo(e[ve]), (e[ve] = null)));
    try {
        (Ma(e), Wd(t.bindingStartIndex), n !== null && qp(t, e, n, 2, r));
        let u = (o & 3) === 3;
        if (!i)
            if (u) {
                let f = t.preOrderCheckHooks;
                f !== null && yi(e, f, null);
            } else {
                let f = t.preOrderHooks;
                (f !== null && vi(e, f, 0, null), Xa(e, 0));
            }
        if (
            (s || AI(e),
            Kp(e),
            Yp(e, 0),
            t.contentQueries !== null && Ep(t, e),
            !i)
        )
            if (u) {
                let f = t.contentCheckHooks;
                f !== null && yi(e, f);
            } else {
                let f = t.contentHooks;
                (f !== null && vi(e, f, 1), Xa(e, 1));
            }
        OI(t, e);
        let d = t.components;
        d !== null && Xp(e, d, 0);
        let p = t.viewQuery;
        if ((p !== null && ml(2, p, r), !i))
            if (u) {
                let f = t.viewCheckHooks;
                f !== null && yi(e, f);
            } else {
                let f = t.viewHooks;
                (f !== null && vi(e, f, 2), Xa(e, 2));
            }
        if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[ni])) {
            for (let f of e[ni]) f();
            e[ni] = null;
        }
        i || (Wp(e), (e[N] &= -73));
    } catch (u) {
        throw (i || Mn(e), u);
    } finally {
        (c !== null && (un(c, l), a && TI(c)), ui());
    }
}
function Yp(t, e) {
    for (let n = cp(t); n !== null; n = up(n))
        for (let r = J; r < n.length; r++) {
            let o = n[r];
            Jp(o, e);
        }
}
function AI(t) {
    for (let e = cp(t); e !== null; e = up(e)) {
        if (!(e[N] & 2)) continue;
        let n = e[Yt];
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            xa(o);
        }
    }
}
function RI(t, e, n) {
    L(18);
    let r = Ce(e, t);
    (Jp(r, n), L(19, r[q]));
}
function Jp(t, e) {
    ri(t) && Cl(t, e);
}
function Cl(t, e) {
    let r = t[_],
        o = t[N],
        i = t[ve],
        s = !!(e === 0 && o & 16);
    if (
        ((s ||= !!(o & 64 && e === 0)),
        (s ||= !!(o & 1024)),
        (s ||= !!(i?.dirty && Xn(i))),
        (s ||= !1),
        i && (i.dirty = !1),
        (t[N] &= -9217),
        s)
    )
        xI(r, t, r.template, t[q]);
    else if (o & 8192) {
        let a = S(null);
        try {
            (Kp(t), Yp(t, 1));
            let l = r.components;
            (l !== null && Xp(t, l, 1), Wp(t));
        } finally {
            S(a);
        }
    }
}
function Xp(t, e, n) {
    for (let r = 0; r < e.length; r++) RI(t, e[r], n);
}
function OI(t, e) {
    let n = t.hostBindingOpCodes;
    if (n !== null)
        try {
            for (let r = 0; r < n.length; r++) {
                let o = n[r];
                if (o < 0) It(~o);
                else {
                    let i = o,
                        s = n[++r],
                        a = n[++r];
                    Qd(s, i);
                    let l = e[i];
                    (L(24, l), a(2, l), L(25, l));
                }
            }
        } finally {
            It(-1);
        }
}
function hc(t, e) {
    let n = $a() ? 64 : 1088;
    for (t[Ge].changeDetectionScheduler?.notify(e); t; ) {
        t[N] |= n;
        let r = ht(t);
        if (Nn(t) && !r) return t;
        t = r;
    }
    return null;
}
function eh(t, e, n, r) {
    return [t, !0, 0, e, null, r, null, n, null, null];
}
function th(t, e) {
    let n = J + e;
    if (n < t.length) return t[n];
}
function Lr(t, e, n, r = !0) {
    let o = e[_];
    if ((kI(o, e, t, n), r)) {
        let s = bl(n, t),
            a = e[j],
            l = a.parentNode(t[vt]);
        l !== null && QE(o, t[le], a, e, l, s);
    }
    let i = e[Wt];
    i !== null && i.firstChild !== null && (i.firstChild = null);
}
function nh(t, e) {
    let n = Sr(t, e);
    return (n !== void 0 && Qi(n[_], n), n);
}
function Sr(t, e) {
    if (t.length <= J) return;
    let n = J + e,
        r = t[n];
    if (r) {
        let o = r[yt];
        (o !== null && o !== t && ic(o, r), e > 0 && (t[n - 1][Te] = r[Te]));
        let i = dr(t, J + e);
        GE(r[_], r);
        let s = i[Qe];
        (s !== null && s.detachView(i[_]),
            (r[Q] = null),
            (r[Te] = null),
            (r[N] &= -129));
    }
    return r;
}
function kI(t, e, n, r) {
    let o = J + r,
        i = n.length;
    (r > 0 && (n[o - 1][Te] = e),
        r < i - J
            ? ((e[Te] = n[o]), ha(n, J + r, e))
            : (n.push(e), (e[Te] = null)),
        (e[Q] = n));
    let s = e[yt];
    s !== null && n !== s && rh(s, e);
    let a = e[Qe];
    (a !== null && a.insertView(t), oi(e), (e[N] |= 128));
}
function rh(t, e) {
    let n = t[Yt],
        r = e[Q];
    if (Ke(r)) t[N] |= 2;
    else {
        let o = r[Q][ce];
        e[ce] !== o && (t[N] |= 2);
    }
    n === null ? (t[Yt] = [e]) : n.push(e);
}
var _t = class {
    _lView;
    _cdRefInjectingView;
    _appRef = null;
    _attachedToViewContainer = !1;
    exhaustive;
    get rootNodes() {
        let e = this._lView,
            n = e[_];
        return Cr(n, e, n.firstChild, []);
    }
    constructor(e, n) {
        ((this._lView = e), (this._cdRefInjectingView = n));
    }
    get context() {
        return this._lView[q];
    }
    set context(e) {
        this._lView[q] = e;
    }
    get destroyed() {
        return Jt(this._lView);
    }
    destroy() {
        if (this._appRef) this._appRef.detachView(this);
        else if (this._attachedToViewContainer) {
            let e = this._lView[Q];
            if (Re(e)) {
                let n = e[mr],
                    r = n ? n.indexOf(this) : -1;
                r > -1 && (Sr(e, r), dr(n, r));
            }
            this._attachedToViewContainer = !1;
        }
        Qi(this._lView[_], this._lView);
    }
    onDestroy(e) {
        Aa(this._lView, e);
    }
    markForCheck() {
        hc(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
        this._lView[N] &= -129;
    }
    reattach() {
        (oi(this._lView), (this._lView[N] |= 128));
    }
    detectChanges() {
        ((this._lView[N] |= 1024), pc(this._lView));
    }
    checkNoChanges() {
        return;
        try {
            this.exhaustive ??= this._lView[Gt].get(_I, Df);
        } catch {
            this.exhaustive = Df;
        }
    }
    attachToViewContainerRef() {
        if (this._appRef) throw new y(902, !1);
        this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
        this._appRef = null;
        let e = Nn(this._lView),
            n = this._lView[yt];
        (n !== null && !e && ic(n, this._lView),
            Vp(this._lView[_], this._lView));
    }
    attachToAppRef(e) {
        if (this._attachedToViewContainer) throw new y(902, !1);
        this._appRef = e;
        let n = Nn(this._lView),
            r = this._lView[yt];
        (r !== null && !n && rh(r, this._lView), oi(this._lView));
    }
};
var Nr = (() => {
    class t {
        _declarationLView;
        _declarationTContainer;
        elementRef;
        static __NG_ELEMENT_ID__ = PI;
        constructor(n, r, o) {
            ((this._declarationLView = n),
                (this._declarationTContainer = r),
                (this.elementRef = o));
        }
        get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
        }
        createEmbeddedView(n, r) {
            return this.createEmbeddedViewImpl(n, r);
        }
        createEmbeddedViewImpl(n, r, o) {
            let i = Fr(this._declarationLView, this._declarationTContainer, n, {
                embeddedViewInjector: r,
                dehydratedView: o,
            });
            return new _t(i);
        }
    }
    return t;
})();
function PI() {
    return Yi(K(), C());
}
function Yi(t, e) {
    return t.type & 4 ? new Nr(e, t, $n(t, e)) : null;
}
function qn(t, e, n, r, o) {
    let i = t.data[e];
    if (i === null) ((i = FI(t, e, n, r, o)), Gd() && (i.flags |= 32));
    else if (i.type & 64) {
        ((i.type = n), (i.value = r), (i.attrs = o));
        let s = qd();
        i.injectorIndex = s === null ? -1 : s.injectorIndex;
    }
    return (xn(i, !0), i);
}
function FI(t, e, n, r, o) {
    let i = ja(),
        s = Va(),
        a = s ? i : i && i.parent,
        l = (t.data[e] = jI(t, a, n, e, r, o));
    return (LI(t, l, i, s), l);
}
function LI(t, e, n, r) {
    (t.firstChild === null && (t.firstChild = e),
        n !== null &&
            (r
                ? n.child == null && e.parent !== null && (n.child = e)
                : n.next === null && ((n.next = e), (e.prev = n))));
}
function jI(t, e, n, r, o, i) {
    let s = e ? e.injectorIndex : -1,
        a = 0;
    return (
        Pa() && (a |= 128),
        {
            type: n,
            index: r,
            insertBeforeIndex: null,
            injectorIndex: s,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            componentOffset: -1,
            propertyBindings: null,
            flags: a,
            providerIndexes: 0,
            value: o,
            attrs: i,
            mergedAttrs: null,
            localNames: null,
            initialInputs: null,
            inputs: null,
            hostDirectiveInputs: null,
            outputs: null,
            hostDirectiveOutputs: null,
            directiveToIndex: null,
            tView: null,
            next: null,
            prev: null,
            projectionNext: null,
            child: null,
            parent: e,
            projection: null,
            styles: null,
            stylesWithoutHost: null,
            residualStyles: void 0,
            classes: null,
            classesWithoutHost: null,
            residualClasses: void 0,
            classBindings: 0,
            styleBindings: 0,
        }
    );
}
var fk = new RegExp(`^(\\d+)*(${zv}|${qv})*(.*)`);
function VI(t) {
    let e = t[Ta] ?? [],
        r = t[Q][j],
        o = [];
    for (let i of e) i.data[mp] !== void 0 ? o.push(i) : HI(i, r);
    t[Ta] = o;
}
function HI(t, e) {
    let n = 0,
        r = t.firstChild;
    if (r) {
        let o = t.data[hp];
        for (; n < o; ) {
            let i = r.nextSibling;
            (kp(e, r, !1), (r = i), n++);
        }
    }
}
var BI = () => null,
    $I = () => null;
function xi(t, e) {
    return BI(t, e);
}
function oh(t, e, n) {
    return $I(t, e, n);
}
var ih = class {},
    Ji = class {},
    Sl = class {
        resolveComponentFactory(e) {
            throw new y(917, !1);
        }
    },
    jr = class {
        static NULL = new Sl();
    },
    Mr = class {},
    UI = (() => {
        class t {
            destroyNode = null;
            static __NG_ELEMENT_ID__ = () => qI();
        }
        return t;
    })();
function qI() {
    let t = C(),
        e = K(),
        n = Ce(e.index, t);
    return (Ke(n) ? n : t)[j];
}
var sh = (() => {
    class t {
        static ɵprov = z({ token: t, providedIn: "root", factory: () => null });
    }
    return t;
})();
var Ii = {},
    Nl = class {
        injector;
        parentInjector;
        constructor(e, n) {
            ((this.injector = e), (this.parentInjector = n));
        }
        get(e, n, r) {
            let o = this.injector.get(e, Ii, r);
            return o !== Ii || n === Ii ? o : this.parentInjector.get(e, n, r);
        }
    };
function Ai(t, e, n) {
    let r = n ? t.styles : null,
        o = n ? t.classes : null,
        i = 0;
    if (e !== null)
        for (let s = 0; s < e.length; s++) {
            let a = e[s];
            if (typeof a == "number") i = a;
            else if (i == 1) o = Go(o, a);
            else if (i == 2) {
                let l = a,
                    c = e[++s];
                r = Go(r, l + ": " + c + ";");
            }
        }
    (n ? (t.styles = r) : (t.stylesWithoutHost = r),
        n ? (t.classes = o) : (t.classesWithoutHost = o));
}
function Vr(t, e = 0) {
    let n = C();
    if (n === null) return qe(t, e);
    let r = K();
    return rp(r, n, G(t), e);
}
function zI() {
    let t = "invalid";
    throw new Error(t);
}
function ah(t, e, n, r, o) {
    let i = r === null ? null : { "": -1 },
        s = o(t, n);
    if (s !== null) {
        let a = s,
            l = null,
            c = null;
        for (let u of s)
            if (u.resolveHostDirectives !== null) {
                [a, l, c] = u.resolveHostDirectives(s);
                break;
            }
        QI(t, e, n, a, i, l, c);
    }
    i !== null && r !== null && WI(n, r, i);
}
function WI(t, e, n) {
    let r = (t.localNames = []);
    for (let o = 0; o < e.length; o += 2) {
        let i = n[e[o + 1]];
        if (i == null) throw new y(-301, !1);
        r.push(e[o], i);
    }
}
function GI(t, e, n) {
    ((e.componentOffset = n), (t.components ??= []).push(e.index));
}
function QI(t, e, n, r, o, i, s) {
    let a = r.length,
        l = !1;
    for (let p = 0; p < a; p++) {
        let f = r[p];
        (!l && Oe(f) && ((l = !0), GI(t, n, p)), dl(Ci(n, e), t, f.type));
    }
    e_(n, t.data.length, a);
    for (let p = 0; p < a; p++) {
        let f = r[p];
        f.providersResolver && f.providersResolver(f);
    }
    let c = !1,
        u = !1,
        d = Lp(t, e, a, null);
    a > 0 && (n.directiveToIndex = new Map());
    for (let p = 0; p < a; p++) {
        let f = r[p];
        if (
            ((n.mergedAttrs = kn(n.mergedAttrs, f.hostAttrs)),
            ZI(t, n, e, d, f),
            XI(d, f, o),
            s !== null && s.has(f))
        ) {
            let [m, v] = s.get(f);
            n.directiveToIndex.set(f.type, [
                d,
                m + n.directiveStart,
                v + n.directiveStart,
            ]);
        } else (i === null || !i.has(f)) && n.directiveToIndex.set(f.type, d);
        (f.contentQueries !== null && (n.flags |= 4),
            (f.hostBindings !== null ||
                f.hostAttrs !== null ||
                f.hostVars !== 0) &&
                (n.flags |= 64));
        let h = f.type.prototype;
        (!c &&
            (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
            ((t.preOrderHooks ??= []).push(n.index), (c = !0)),
            !u &&
                (h.ngOnChanges || h.ngDoCheck) &&
                ((t.preOrderCheckHooks ??= []).push(n.index), (u = !0)),
            d++);
    }
    KI(t, n, i);
}
function KI(t, e, n) {
    for (let r = e.directiveStart; r < e.directiveEnd; r++) {
        let o = t.data[r];
        if (n === null || !n.has(o))
            (wf(0, e, o, r), wf(1, e, o, r), bf(e, r, !1));
        else {
            let i = n.get(o);
            (Tf(0, e, i, r), Tf(1, e, i, r), bf(e, r, !0));
        }
    }
}
function wf(t, e, n, r) {
    let o = t === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s;
            (t === 0 ? (s = e.inputs ??= {}) : (s = e.outputs ??= {}),
                (s[i] ??= []),
                s[i].push(r),
                lh(e, i));
        }
}
function Tf(t, e, n, r) {
    let o = t === 0 ? n.inputs : n.outputs;
    for (let i in o)
        if (o.hasOwnProperty(i)) {
            let s = o[i],
                a;
            (t === 0
                ? (a = e.hostDirectiveInputs ??= {})
                : (a = e.hostDirectiveOutputs ??= {}),
                (a[s] ??= []),
                a[s].push(r, i),
                lh(e, s));
        }
}
function lh(t, e) {
    e === "class" ? (t.flags |= 8) : e === "style" && (t.flags |= 16);
}
function bf(t, e, n) {
    let { attrs: r, inputs: o, hostDirectiveInputs: i } = t;
    if (r === null || (!n && o === null) || (n && i === null) || ec(t)) {
        ((t.initialInputs ??= []), t.initialInputs.push(null));
        return;
    }
    let s = null,
        a = 0;
    for (; a < r.length; ) {
        let l = r[a];
        if (l === 0) {
            a += 4;
            continue;
        } else if (l === 5) {
            a += 2;
            continue;
        } else if (typeof l == "number") break;
        if (!n && o.hasOwnProperty(l)) {
            let c = o[l];
            for (let u of c)
                if (u === e) {
                    ((s ??= []), s.push(l, r[a + 1]));
                    break;
                }
        } else if (n && i.hasOwnProperty(l)) {
            let c = i[l];
            for (let u = 0; u < c.length; u += 2)
                if (c[u] === e) {
                    ((s ??= []), s.push(c[u + 1], r[a + 1]));
                    break;
                }
        }
        a += 2;
    }
    ((t.initialInputs ??= []), t.initialInputs.push(s));
}
function ZI(t, e, n, r, o) {
    t.data[r] = o;
    let i = o.factory || (o.factory = pt(o.type, !0)),
        s = new nn(i, Oe(o), Vr);
    ((t.blueprint[r] = s),
        (n[r] = s),
        YI(t, e, r, Lp(t, n, o.hostVars, Ie), o));
}
function YI(t, e, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = t.hostBindingOpCodes;
        s === null && (s = t.hostBindingOpCodes = []);
        let a = ~e.index;
        (JI(s) != a && s.push(a), s.push(n, r, i));
    }
}
function JI(t) {
    let e = t.length;
    for (; e > 0; ) {
        let n = t[--e];
        if (typeof n == "number" && n < 0) return n;
    }
    return 0;
}
function XI(t, e, n) {
    if (n) {
        if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
        Oe(e) && (n[""] = t);
    }
}
function e_(t, e, n) {
    ((t.flags |= 1),
        (t.directiveStart = e),
        (t.directiveEnd = e + n),
        (t.providerIndexes = e));
}
function mc(t, e, n, r, o, i, s, a) {
    let l = e[_],
        c = l.consts,
        u = Ee(c, s),
        d = qn(l, t, n, r, u);
    return (
        i && ah(l, e, d, Ee(c, a), o),
        (d.mergedAttrs = kn(d.mergedAttrs, d.attrs)),
        d.attrs !== null && Ai(d, d.attrs, !1),
        d.mergedAttrs !== null && Ai(d, d.mergedAttrs, !0),
        l.queries !== null && l.queries.elementStart(l, d),
        d
    );
}
function gc(t, e) {
    (Qf(t, e), ba(e) && t.queries.elementEnd(e));
}
function t_(t, e, n, r, o, i) {
    let s = e.consts,
        a = Ee(s, o),
        l = qn(e, t, n, r, a);
    if (((l.mergedAttrs = kn(l.mergedAttrs, l.attrs)), i != null)) {
        let c = Ee(s, i);
        l.localNames = [];
        for (let u = 0; u < c.length; u += 2) l.localNames.push(c[u], -1);
    }
    return (
        l.attrs !== null && Ai(l, l.attrs, !1),
        l.mergedAttrs !== null && Ai(l, l.mergedAttrs, !0),
        e.queries !== null && e.queries.elementStart(e, l),
        l
    );
}
function yc(t, e, n) {
    return (t[e] = n);
}
function n_(t, e) {
    return t[e];
}
function Ye(t, e, n) {
    if (n === Ie) return !1;
    let r = t[e];
    return Object.is(r, n) ? !1 : ((t[e] = n), !0);
}
function r_(t, e, n, r) {
    let o = Ye(t, e, n);
    return Ye(t, e + 1, r) || o;
}
function _i(t, e, n) {
    return function r(o) {
        let i = Et(t) ? Ce(t.index, e) : e;
        hc(i, 5);
        let s = e[q],
            a = Cf(e, s, n, o),
            l = r.__ngNextListenerFn__;
        for (; l; ) ((a = Cf(e, s, l, o) && a), (l = l.__ngNextListenerFn__));
        return a;
    };
}
function Cf(t, e, n, r) {
    let o = S(null);
    try {
        return (L(6, e, n), n(r) !== !1);
    } catch (i) {
        return (yI(t, i), !1);
    } finally {
        (L(7, e, n), S(o));
    }
}
function ch(t, e, n, r, o, i, s, a) {
    let l = Sn(t),
        c = !1,
        u = null;
    if ((!r && l && (u = o_(e, n, i, t.index)), u !== null)) {
        let d = u.__ngLastListenerFn__ || u;
        ((d.__ngNextListenerFn__ = s), (u.__ngLastListenerFn__ = s), (c = !0));
    } else {
        let d = ke(t, n),
            p = r ? r(d) : d;
        Gv(n, p, i, a);
        let f = o.listen(p, i, a),
            h = r ? (m) => r(be(m[t.index])) : t.index;
        uh(h, e, n, i, a, f, !1);
    }
    return c;
}
function o_(t, e, n, r) {
    let o = t.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = e[bn],
                    l = o[i + 2];
                return a && a.length > l ? a[l] : null;
            }
            typeof s == "string" && (i += 2);
        }
    return null;
}
function uh(t, e, n, r, o, i, s) {
    let a = e.firstCreatePass ? Oa(e) : null,
        l = Ra(n),
        c = l.length;
    (l.push(o, i), a && a.push(r, t, c, (c + 1) * (s ? -1 : 1)));
}
function Sf(t, e, n, r, o, i) {
    let s = e[n],
        a = e[_],
        c = a.data[n].outputs[r],
        d = s[c].subscribe(i);
    uh(t.index, a, e, o, i, d, !0);
}
var Ml = Symbol("BINDING");
var Ri = class extends jr {
    ngModule;
    constructor(e) {
        (super(), (this.ngModule = e));
    }
    resolveComponentFactory(e) {
        let n = We(e);
        return new Dt(n, this.ngModule);
    }
};
function i_(t) {
    return Object.keys(t).map((e) => {
        let [n, r, o] = t[e],
            i = {
                propName: n,
                templateName: e,
                isSignal: (r & Gi.SignalBased) !== 0,
            };
        return (o && (i.transform = o), i);
    });
}
function s_(t) {
    return Object.keys(t).map((e) => ({ propName: t[e], templateName: e }));
}
function a_(t, e, n) {
    let r = e instanceof we ? e : e?.injector;
    return (
        r &&
            t.getStandaloneInjector !== null &&
            (r = t.getStandaloneInjector(r) || r),
        r ? new Nl(n, r) : n
    );
}
function l_(t) {
    let e = t.get(Mr, null);
    if (e === null) throw new y(407, !1);
    let n = t.get(sh, null),
        r = t.get(nt, null);
    return {
        rendererFactory: e,
        sanitizer: n,
        changeDetectionScheduler: r,
        ngReflect: !1,
    };
}
function c_(t, e) {
    let n = (t.selectors[0][0] || "div").toLowerCase();
    return Rp(e, n, n === "svg" ? Od : n === "math" ? kd : null);
}
var Dt = class extends Ji {
    componentDef;
    ngModule;
    selector;
    componentType;
    ngContentSelectors;
    isBoundToModule;
    cachedInputs = null;
    cachedOutputs = null;
    get inputs() {
        return (
            (this.cachedInputs ??= i_(this.componentDef.inputs)),
            this.cachedInputs
        );
    }
    get outputs() {
        return (
            (this.cachedOutputs ??= s_(this.componentDef.outputs)),
            this.cachedOutputs
        );
    }
    constructor(e, n) {
        (super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = PE(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors ?? []),
            (this.isBoundToModule = !!n));
    }
    create(e, n, r, o, i, s) {
        L(22);
        let a = S(null);
        try {
            let l = this.componentDef,
                c = u_(r, l, s, i),
                u = a_(l, o || this.ngModule, e),
                d = l_(u),
                p = d.rendererFactory.createRenderer(null, l),
                f = r ? oI(p, r, l.encapsulation, u) : c_(l, p),
                h =
                    s?.some(Nf) ||
                    i?.some(
                        (g) => typeof g != "function" && g.bindings.some(Nf),
                    ),
                m = nc(
                    null,
                    c,
                    null,
                    512 | Fp(l),
                    null,
                    null,
                    d,
                    p,
                    u,
                    null,
                    vp(f, u, !0),
                );
            ((m[H] = f), ci(m));
            let v = null;
            try {
                let g = mc(H, m, 2, "#host", () => c.directiveRegistry, !0, 0);
                (f && (Pp(p, f, g), Pn(f, m)),
                    Zi(c, m, g),
                    Yl(c, g, m),
                    gc(c, g),
                    n !== void 0 && f_(g, this.ngContentSelectors, n),
                    (v = Ce(g.index, m)),
                    (m[q] = v[q]),
                    fc(c, m, null));
            } catch (g) {
                throw (v !== null && pl(v), pl(m), g);
            } finally {
                (L(23), ui());
            }
            return new Oi(this.componentType, m, !!h);
        } finally {
            S(a);
        }
    }
};
function u_(t, e, n, r) {
    let o = t ? ["ng-version", "20.1.0"] : FE(e.selectors[0]),
        i = null,
        s = null,
        a = 0;
    if (n)
        for (let u of n)
            ((a += u[Ml].requiredVars),
                u.create && ((u.targetIdx = 0), (i ??= []).push(u)),
                u.update && ((u.targetIdx = 0), (s ??= []).push(u)));
    if (r)
        for (let u = 0; u < r.length; u++) {
            let d = r[u];
            if (typeof d != "function")
                for (let p of d.bindings) {
                    a += p[Ml].requiredVars;
                    let f = u + 1;
                    (p.create && ((p.targetIdx = f), (i ??= []).push(p)),
                        p.update && ((p.targetIdx = f), (s ??= []).push(p)));
                }
        }
    let l = [e];
    if (r)
        for (let u of r) {
            let d = typeof u == "function" ? u : u.type,
                p = Xo(d);
            l.push(p);
        }
    return tc(0, null, d_(i, s), 1, a, l, null, null, null, [o], null);
}
function d_(t, e) {
    return !t && !e
        ? null
        : (n) => {
              if (n & 1 && t) for (let r of t) r.create();
              if (n & 2 && e) for (let r of e) r.update();
          };
}
function Nf(t) {
    let e = t[Ml].kind;
    return e === "input" || e === "twoWay";
}
var Oi = class extends ih {
    _rootLView;
    _hasInputBindings;
    instance;
    hostView;
    changeDetectorRef;
    componentType;
    location;
    previousInputValues = null;
    _tNode;
    constructor(e, n, r) {
        (super(),
            (this._rootLView = n),
            (this._hasInputBindings = r),
            (this._tNode = gr(n[_], H)),
            (this.location = $n(this._tNode, n)),
            (this.instance = Ce(this._tNode.index, n)[q]),
            (this.hostView = this.changeDetectorRef = new _t(n, void 0)),
            (this.componentType = e));
    }
    setInput(e, n) {
        this._hasInputBindings;
        let r = this._tNode;
        if (
            ((this.previousInputValues ??= new Map()),
            this.previousInputValues.has(e) &&
                Object.is(this.previousInputValues.get(e), n))
        )
            return;
        let o = this._rootLView,
            i = dc(r, o[_], o, e, n);
        this.previousInputValues.set(e, n);
        let s = Ce(r.index, o);
        hc(s, 1);
    }
    get injector() {
        return new tn(this._tNode, this._rootLView);
    }
    destroy() {
        this.hostView.destroy();
    }
    onDestroy(e) {
        this.hostView.onDestroy(e);
    }
};
function f_(t, e, n) {
    let r = (t.projection = []);
    for (let o = 0; o < e.length; o++) {
        let i = n[o];
        r.push(i != null && i.length ? Array.from(i) : null);
    }
}
var Xi = (() => {
    class t {
        static __NG_ELEMENT_ID__ = p_;
    }
    return t;
})();
function p_() {
    let t = K();
    return fh(t, C());
}
var h_ = Xi,
    dh = class extends h_ {
        _lContainer;
        _hostTNode;
        _hostLView;
        constructor(e, n, r) {
            (super(),
                (this._lContainer = e),
                (this._hostTNode = n),
                (this._hostLView = r));
        }
        get element() {
            return $n(this._hostTNode, this._hostLView);
        }
        get injector() {
            return new tn(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
            let e = Kl(this._hostTNode, this._hostLView);
            if (Yf(e)) {
                let n = Ti(e, this._hostLView),
                    r = wi(e),
                    o = n[_].data[r + 8];
                return new tn(o, n);
            } else return new tn(null, this._hostLView);
        }
        clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
        }
        get(e) {
            let n = Mf(this._lContainer);
            return (n !== null && n[e]) || null;
        }
        get length() {
            return this._lContainer.length - J;
        }
        createEmbeddedView(e, n, r) {
            let o, i;
            typeof r == "number"
                ? (o = r)
                : r != null && ((o = r.index), (i = r.injector));
            let s = xi(this._lContainer, e.ssrId),
                a = e.createEmbeddedViewImpl(n || {}, i, s);
            return (this.insertImpl(a, o, Ln(this._hostTNode, s)), a);
        }
        createComponent(e, n, r, o, i, s, a) {
            let l = e && !dv(e),
                c;
            if (l) c = n;
            else {
                let v = n || {};
                ((c = v.index),
                    (r = v.injector),
                    (o = v.projectableNodes),
                    (i = v.environmentInjector || v.ngModuleRef),
                    (s = v.directives),
                    (a = v.bindings));
            }
            let u = l ? e : new Dt(We(e)),
                d = r || this.parentInjector;
            if (!i && u.ngModule == null) {
                let g = (l ? d : this.parentInjector).get(we, null);
                g && (i = g);
            }
            let p = We(u.componentType ?? {}),
                f = xi(this._lContainer, p?.id ?? null),
                h = f?.firstChild ?? null,
                m = u.create(d, o, h, i, s, a);
            return (this.insertImpl(m.hostView, c, Ln(this._hostTNode, f)), m);
        }
        insert(e, n) {
            return this.insertImpl(e, n, !0);
        }
        insertImpl(e, n, r) {
            let o = e._lView;
            if (Fd(o)) {
                let a = this.indexOf(e);
                if (a !== -1) this.detach(a);
                else {
                    let l = o[Q],
                        c = new dh(l, l[le], l[Q]);
                    c.detach(c.indexOf(e));
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return (
                Lr(s, o, i, r),
                e.attachToViewContainerRef(),
                ha(nl(s), i, e),
                e
            );
        }
        move(e, n) {
            return this.insert(e, n);
        }
        indexOf(e) {
            let n = Mf(this._lContainer);
            return n !== null ? n.indexOf(e) : -1;
        }
        remove(e) {
            let n = this._adjustIndex(e, -1),
                r = Sr(this._lContainer, n);
            r && (dr(nl(this._lContainer), n), Qi(r[_], r));
        }
        detach(e) {
            let n = this._adjustIndex(e, -1),
                r = Sr(this._lContainer, n);
            return r && dr(nl(this._lContainer), n) != null ? new _t(r) : null;
        }
        _adjustIndex(e, n = 0) {
            return e ?? this.length + n;
        }
    };
function Mf(t) {
    return t[mr];
}
function nl(t) {
    return t[mr] || (t[mr] = []);
}
function fh(t, e) {
    let n,
        r = e[t.index];
    return (
        Re(r) ? (n = r) : ((n = eh(r, e, null, t)), (e[t.index] = n), rc(e, n)),
        g_(n, e, t, r),
        new dh(n, t, e)
    );
}
function m_(t, e) {
    let n = t[j],
        r = n.createComment(""),
        o = ke(e, t),
        i = n.parentNode(o);
    return (Ni(n, i, r, n.nextSibling(o), !1), r);
}
var g_ = E_,
    y_ = () => !1;
function v_(t, e, n) {
    return y_(t, e, n);
}
function E_(t, e, n, r) {
    if (t[vt]) return;
    let o;
    (n.type & 8 ? (o = be(r)) : (o = m_(e, n)), (t[vt] = o));
}
var xl = class t {
        queryList;
        matches = null;
        constructor(e) {
            this.queryList = e;
        }
        clone() {
            return new t(this.queryList);
        }
        setDirty() {
            this.queryList.setDirty();
        }
    },
    Al = class t {
        queries;
        constructor(e = []) {
            this.queries = e;
        }
        createEmbeddedView(e) {
            let n = e.queries;
            if (n !== null) {
                let r =
                        e.contentQueries !== null
                            ? e.contentQueries[0]
                            : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone());
                }
                return new t(o);
            }
            return null;
        }
        insertView(e) {
            this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
            this.dirtyQueriesWithMatches(e);
        }
        finishViewCreation(e) {
            this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
            for (let n = 0; n < this.queries.length; n++)
                vc(e, n).matches !== null && this.queries[n].setDirty();
        }
    },
    ki = class {
        flags;
        read;
        predicate;
        constructor(e, n, r = null) {
            ((this.flags = n),
                (this.read = r),
                typeof e == "string"
                    ? (this.predicate = S_(e))
                    : (this.predicate = e));
        }
    },
    Rl = class t {
        queries;
        constructor(e = []) {
            this.queries = e;
        }
        elementStart(e, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].elementStart(e, n);
        }
        elementEnd(e) {
            for (let n = 0; n < this.queries.length; n++)
                this.queries[n].elementEnd(e);
        }
        embeddedTView(e) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(e, o);
                i &&
                    ((i.indexInDeclarationView = r),
                    n !== null ? n.push(i) : (n = [i]));
            }
            return n !== null ? new t(n) : null;
        }
        template(e, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].template(e, n);
        }
        getByIndex(e) {
            return this.queries[e];
        }
        get length() {
            return this.queries.length;
        }
        track(e) {
            this.queries.push(e);
        }
    },
    Ol = class t {
        metadata;
        matches = null;
        indexInDeclarationView = -1;
        crossesNgTemplate = !1;
        _declarationNodeIndex;
        _appliesToNextNode = !0;
        constructor(e, n = -1) {
            ((this.metadata = e), (this._declarationNodeIndex = n));
        }
        elementStart(e, n) {
            this.isApplyingToNode(n) && this.matchTNode(e, n);
        }
        elementEnd(e) {
            this._declarationNodeIndex === e.index &&
                (this._appliesToNextNode = !1);
        }
        template(e, n) {
            this.elementStart(e, n);
        }
        embeddedTView(e, n) {
            return this.isApplyingToNode(e)
                ? ((this.crossesNgTemplate = !0),
                  this.addMatch(-e.index, n),
                  new t(this.metadata))
                : null;
        }
        isApplyingToNode(e) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = e.parent;
                for (; r !== null && r.type & 8 && r.index !== n; )
                    r = r.parent;
                return n === (r !== null ? r.index : -1);
            }
            return this._appliesToNextNode;
        }
        matchTNode(e, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    (this.matchTNodeWithReadOption(e, n, I_(n, i)),
                        this.matchTNodeWithReadOption(
                            e,
                            n,
                            Ei(n, e, i, !1, !1),
                        ));
                }
            else
                r === Nr
                    ? n.type & 4 && this.matchTNodeWithReadOption(e, n, -1)
                    : this.matchTNodeWithReadOption(e, n, Ei(n, e, r, !1, !1));
        }
        matchTNodeWithReadOption(e, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === Or || o === Xi || (o === Nr && n.type & 4))
                        this.addMatch(n.index, -2);
                    else {
                        let i = Ei(n, e, o, !1, !1);
                        i !== null && this.addMatch(n.index, i);
                    }
                else this.addMatch(n.index, r);
            }
        }
        addMatch(e, n) {
            this.matches === null
                ? (this.matches = [e, n])
                : this.matches.push(e, n);
        }
    };
function I_(t, e) {
    let n = t.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
    }
    return null;
}
function __(t, e) {
    return t.type & 11 ? $n(t, e) : t.type & 4 ? Yi(t, e) : null;
}
function D_(t, e, n, r) {
    return n === -1 ? __(e, t) : n === -2 ? w_(t, e, r) : br(t, t[_], n, e);
}
function w_(t, e, n) {
    if (n === Or) return $n(e, t);
    if (n === Nr) return Yi(e, t);
    if (n === Xi) return fh(e, t);
}
function ph(t, e, n, r) {
    let o = e[Qe].queries[r];
    if (o.matches === null) {
        let i = t.data,
            s = n.matches,
            a = [];
        for (let l = 0; s !== null && l < s.length; l += 2) {
            let c = s[l];
            if (c < 0) a.push(null);
            else {
                let u = i[c];
                a.push(D_(e, u, s[l + 1], n.metadata.read));
            }
        }
        o.matches = a;
    }
    return o.matches;
}
function kl(t, e, n, r) {
    let o = t.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = ph(t, e, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let l = i[a];
            if (l > 0) r.push(s[a / 2]);
            else {
                let c = i[a + 1],
                    u = e[-l];
                for (let d = J; d < u.length; d++) {
                    let p = u[d];
                    p[yt] === p[Q] && kl(p[_], p, c, r);
                }
                if (u[Yt] !== null) {
                    let d = u[Yt];
                    for (let p = 0; p < d.length; p++) {
                        let f = d[p];
                        kl(f[_], f, c, r);
                    }
                }
            }
        }
    }
    return r;
}
function T_(t, e) {
    return t[Qe].queries[e].queryList;
}
function hh(t, e, n) {
    let r = new Si((n & 4) === 4);
    return (
        Vd(t, e, r, r.destroy),
        (e[Qe] ??= new Al()).queries.push(new xl(r)) - 1
    );
}
function b_(t, e, n) {
    let r = $();
    return (
        r.firstCreatePass &&
            (mh(r, new ki(t, e, n), -1),
            (e & 2) === 2 && (r.staticViewQueries = !0)),
        hh(r, C(), e)
    );
}
function C_(t, e, n, r) {
    let o = $();
    if (o.firstCreatePass) {
        let i = K();
        (mh(o, new ki(e, n, r), i.index),
            N_(o, t),
            (n & 2) === 2 && (o.staticContentQueries = !0));
    }
    return hh(o, C(), n);
}
function S_(t) {
    return t.split(",").map((e) => e.trim());
}
function mh(t, e, n) {
    (t.queries === null && (t.queries = new Rl()),
        t.queries.track(new Ol(e, n)));
}
function N_(t, e) {
    let n = t.contentQueries || (t.contentQueries = []),
        r = n.length ? n[n.length - 1] : -1;
    e !== r && n.push(t.queries.length - 1, e);
}
function vc(t, e) {
    return t.queries.getByIndex(e);
}
function M_(t, e) {
    let n = t[_],
        r = vc(n, e);
    return r.crossesNgTemplate ? kl(n, t, e, []) : ph(n, t, r, e);
}
var xf = new Set();
function wt(t) {
    xf.has(t) ||
        (xf.add(t),
        performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
var jn = class {},
    gh = class {};
var Pi = class extends jn {
        ngModuleType;
        _parent;
        _bootstrapComponents = [];
        _r3Injector;
        instance;
        destroyCbs = [];
        componentFactoryResolver = new Ri(this);
        constructor(e, n, r, o = !0) {
            (super(), (this.ngModuleType = e), (this._parent = n));
            let i = ya(e);
            ((this._bootstrapComponents = Mp(i.bootstrap)),
                (this._r3Injector = Ka(
                    e,
                    n,
                    [
                        { provide: jn, useValue: this },
                        {
                            provide: jr,
                            useValue: this.componentFactoryResolver,
                        },
                        ...r,
                    ],
                    pe(e),
                    new Set(["environment"]),
                )),
                o && this.resolveInjectorInitializers());
        }
        resolveInjectorInitializers() {
            (this._r3Injector.resolveInjectorInitializers(),
                (this.instance = this._r3Injector.get(this.ngModuleType)));
        }
        get injector() {
            return this._r3Injector;
        }
        destroy() {
            let e = this._r3Injector;
            (!e.destroyed && e.destroy(),
                this.destroyCbs.forEach((n) => n()),
                (this.destroyCbs = null));
        }
        onDestroy(e) {
            this.destroyCbs.push(e);
        }
    },
    Fi = class extends gh {
        moduleType;
        constructor(e) {
            (super(), (this.moduleType = e));
        }
        create(e) {
            return new Pi(this.moduleType, e, []);
        }
    };
var xr = class extends jn {
    injector;
    componentFactoryResolver = new Ri(this);
    instance = null;
    constructor(e) {
        super();
        let n = new Ut(
            [
                ...e.providers,
                { provide: jn, useValue: this },
                { provide: jr, useValue: this.componentFactoryResolver },
            ],
            e.parent || Tn(),
            e.debugName,
            new Set(["environment"]),
        );
        ((this.injector = n),
            e.runEnvironmentInitializers && n.resolveInjectorInitializers());
    }
    destroy() {
        this.injector.destroy();
    }
    onDestroy(e) {
        this.injector.onDestroy(e);
    }
};
function yh(t, e, n = null) {
    return new xr({
        providers: t,
        parent: e,
        debugName: n,
        runEnvironmentInitializers: !0,
    }).injector;
}
var x_ = (() => {
    class t {
        _injector;
        cachedInjectors = new Map();
        constructor(n) {
            this._injector = n;
        }
        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let r = va(!1, n.type),
                    o =
                        r.length > 0
                            ? yh(
                                  [r],
                                  this._injector,
                                  `Standalone[${n.type.name}]`,
                              )
                            : null;
                this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
        }
        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values())
                    n !== null && n.destroy();
            } finally {
                this.cachedInjectors.clear();
            }
        }
        static ɵprov = z({
            token: t,
            providedIn: "environment",
            factory: () => new t(qe(we)),
        });
    }
    return t;
})();
function A_(t) {
    return Rr(() => {
        let e = vh(t),
            n = ye(ee({}, e), {
                decls: t.decls,
                vars: t.vars,
                template: t.template,
                consts: t.consts || null,
                ngContentSelectors: t.ngContentSelectors,
                onPush: t.changeDetection === Zl.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: (e.standalone && t.dependencies) || null,
                getStandaloneInjector: e.standalone
                    ? (o) => o.get(x_).getOrCreateStandaloneInjector(n)
                    : null,
                getExternalStyles: null,
                signals: t.signals ?? !1,
                data: t.data || {},
                encapsulation: t.encapsulation || Fn.Emulated,
                styles: t.styles || ae,
                _: null,
                schemas: t.schemas || null,
                tView: null,
                id: "",
            });
        (e.standalone && wt("NgStandalone"), Eh(n));
        let r = t.dependencies;
        return (
            (n.directiveDefs = Af(r, R_)),
            (n.pipeDefs = Af(r, Cd)),
            (n.id = j_(n)),
            n
        );
    });
}
function R_(t) {
    return We(t) || Xo(t);
}
function O_(t) {
    return Rr(() => ({
        type: t.type,
        bootstrap: t.bootstrap || ae,
        declarations: t.declarations || ae,
        imports: t.imports || ae,
        exports: t.exports || ae,
        transitiveCompileScopes: null,
        schemas: t.schemas || null,
        id: t.id || null,
    }));
}
function k_(t, e) {
    if (t == null) return xe;
    let n = {};
    for (let r in t)
        if (t.hasOwnProperty(r)) {
            let o = t[r],
                i,
                s,
                a,
                l;
            (Array.isArray(o)
                ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i), (l = o[3] || null))
                : ((i = o), (s = o), (a = Gi.None), (l = null)),
                (n[i] = [r, a, l]),
                (e[i] = s));
        }
    return n;
}
function P_(t) {
    if (t == null) return xe;
    let e = {};
    for (let n in t) t.hasOwnProperty(n) && (e[t[n]] = n);
    return e;
}
function F_(t) {
    return Rr(() => {
        let e = vh(t);
        return (Eh(e), e);
    });
}
function L_(t) {
    return {
        type: t.type,
        name: t.name,
        factory: null,
        pure: t.pure !== !1,
        standalone: t.standalone ?? !0,
        onDestroy: t.type.prototype.ngOnDestroy || null,
    };
}
function vh(t) {
    let e = {};
    return {
        type: t.type,
        providersResolver: null,
        factory: null,
        hostBindings: t.hostBindings || null,
        hostVars: t.hostVars || 0,
        hostAttrs: t.hostAttrs || null,
        contentQueries: t.contentQueries || null,
        declaredInputs: e,
        inputConfig: t.inputs || xe,
        exportAs: t.exportAs || null,
        standalone: t.standalone ?? !0,
        signals: t.signals === !0,
        selectors: t.selectors || ae,
        viewQuery: t.viewQuery || null,
        features: t.features || null,
        setInput: null,
        resolveHostDirectives: null,
        hostDirectives: null,
        inputs: k_(t.inputs, e),
        outputs: P_(t.outputs),
        debugInfo: null,
    };
}
function Eh(t) {
    t.features?.forEach((e) => e(t));
}
function Af(t, e) {
    return t
        ? () => {
              let n = typeof t == "function" ? t() : t,
                  r = [];
              for (let o of n) {
                  let i = e(o);
                  i !== null && r.push(i);
              }
              return r;
          }
        : null;
}
function j_(t) {
    let e = 0,
        n = typeof t.consts == "function" ? "" : t.consts,
        r = [
            t.selectors,
            t.ngContentSelectors,
            t.hostVars,
            t.hostAttrs,
            n,
            t.vars,
            t.decls,
            t.encapsulation,
            t.standalone,
            t.signals,
            t.exportAs,
            JSON.stringify(t.inputs),
            JSON.stringify(t.outputs),
            Object.getOwnPropertyNames(t.type.prototype),
            !!t.contentQueries,
            !!t.viewQuery,
        ];
    for (let i of r.join("|")) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
    return ((e += 2147483648), "c" + e);
}
function V_(t) {
    return Object.getPrototypeOf(t.prototype).constructor;
}
function Ih(t) {
    let e = V_(t.type),
        n = !0,
        r = [t];
    for (; e; ) {
        let o;
        if (Oe(t)) o = e.ɵcmp || e.ɵdir;
        else {
            if (e.ɵcmp) throw new y(903, !1);
            o = e.ɵdir;
        }
        if (o) {
            if (n) {
                r.push(o);
                let s = t;
                ((s.inputs = rl(t.inputs)),
                    (s.declaredInputs = rl(t.declaredInputs)),
                    (s.outputs = rl(t.outputs)));
                let a = o.hostBindings;
                a && q_(t, a);
                let l = o.viewQuery,
                    c = o.contentQueries;
                if (
                    (l && $_(t, l),
                    c && U_(t, c),
                    H_(t, o),
                    yd(t.outputs, o.outputs),
                    Oe(o) && o.data.animation)
                ) {
                    let u = t.data;
                    u.animation = (u.animation || []).concat(o.data.animation);
                }
            }
            let i = o.features;
            if (i)
                for (let s = 0; s < i.length; s++) {
                    let a = i[s];
                    (a && a.ngInherit && a(t), a === Ih && (n = !1));
                }
        }
        e = Object.getPrototypeOf(e);
    }
    B_(r);
}
function H_(t, e) {
    for (let n in e.inputs) {
        if (!e.inputs.hasOwnProperty(n) || t.inputs.hasOwnProperty(n)) continue;
        let r = e.inputs[n];
        r !== void 0 &&
            ((t.inputs[n] = r), (t.declaredInputs[n] = e.declaredInputs[n]));
    }
}
function B_(t) {
    let e = 0,
        n = null;
    for (let r = t.length - 1; r >= 0; r--) {
        let o = t[r];
        ((o.hostVars = e += o.hostVars),
            (o.hostAttrs = kn(o.hostAttrs, (n = kn(n, o.hostAttrs)))));
    }
}
function rl(t) {
    return t === xe ? {} : t === ae ? [] : t;
}
function $_(t, e) {
    let n = t.viewQuery;
    n
        ? (t.viewQuery = (r, o) => {
              (e(r, o), n(r, o));
          })
        : (t.viewQuery = e);
}
function U_(t, e) {
    let n = t.contentQueries;
    n
        ? (t.contentQueries = (r, o, i) => {
              (e(r, o, i), n(r, o, i));
          })
        : (t.contentQueries = e);
}
function q_(t, e) {
    let n = t.hostBindings;
    n
        ? (t.hostBindings = (r, o) => {
              (e(r, o), n(r, o));
          })
        : (t.hostBindings = e);
}
function z_(t) {
    let e = (n) => {
        let r = Array.isArray(t);
        n.hostDirectives === null
            ? ((n.resolveHostDirectives = W_),
              (n.hostDirectives = r ? t.map(Pl) : [t]))
            : r
              ? n.hostDirectives.unshift(...t.map(Pl))
              : n.hostDirectives.unshift(t);
    };
    return ((e.ngInherit = !0), e);
}
function W_(t) {
    let e = [],
        n = !1,
        r = null,
        o = null;
    for (let i = 0; i < t.length; i++) {
        let s = t[i];
        if (s.hostDirectives !== null) {
            let a = e.length;
            ((r ??= new Map()),
                (o ??= new Map()),
                _h(s, e, r),
                o.set(s, [a, e.length - 1]));
        }
        i === 0 && Oe(s) && ((n = !0), e.push(s));
    }
    for (let i = n ? 1 : 0; i < t.length; i++) e.push(t[i]);
    return [e, r, o];
}
function _h(t, e, n) {
    if (t.hostDirectives !== null)
        for (let r of t.hostDirectives)
            if (typeof r == "function") {
                let o = r();
                for (let i of o) Rf(Pl(i), e, n);
            } else Rf(r, e, n);
}
function Rf(t, e, n) {
    let r = Xo(t.directive);
    (G_(r.declaredInputs, t.inputs), _h(r, e, n), n.set(r, t), e.push(r));
}
function Pl(t) {
    return typeof t == "function"
        ? { directive: G(t), inputs: xe, outputs: xe }
        : {
              directive: G(t.directive),
              inputs: Of(t.inputs),
              outputs: Of(t.outputs),
          };
}
function Of(t) {
    if (t === void 0 || t.length === 0) return xe;
    let e = {};
    for (let n = 0; n < t.length; n += 2) e[t[n]] = t[n + 1];
    return e;
}
function G_(t, e) {
    for (let n in e)
        if (e.hasOwnProperty(n)) {
            let r = e[n],
                o = t[n];
            t[r] = o;
        }
}
function Dh(t, e, n, r, o, i, s, a) {
    if (n.firstCreatePass) {
        t.mergedAttrs = kn(t.mergedAttrs, t.attrs);
        let u = (t.tView = tc(
            2,
            t,
            o,
            i,
            s,
            n.directiveRegistry,
            n.pipeRegistry,
            null,
            n.schemas,
            n.consts,
            null,
        ));
        n.queries !== null &&
            (n.queries.template(n, t),
            (u.queries = n.queries.embeddedTView(t)));
    }
    (a && (t.flags |= a), xn(t, !1));
    let l = K_(n, e, t, r);
    (di() && sc(n, e, l, t), Pn(l, e));
    let c = eh(l, e, l, t);
    ((e[r + H] = c), rc(e, c), v_(c, t, e));
}
function Q_(t, e, n, r, o, i, s, a, l, c, u) {
    let d = n + H,
        p;
    return (
        e.firstCreatePass
            ? ((p = qn(e, d, 4, s || null, a || null)),
              ii() && ah(e, t, p, Ee(e.consts, c), lc),
              Qf(e, p))
            : (p = e.data[d]),
        Dh(p, t, e, n, r, o, i, l),
        Sn(p) && Zi(e, t, p),
        c != null && Pr(t, p, u),
        p
    );
}
function Vn(t, e, n, r, o, i, s, a, l, c, u) {
    let d = n + H,
        p;
    if (e.firstCreatePass) {
        if (((p = qn(e, d, 4, s || null, a || null)), c != null)) {
            let f = Ee(e.consts, c);
            p.localNames = [];
            for (let h = 0; h < f.length; h += 2) p.localNames.push(f[h], -1);
        }
    } else p = e.data[d];
    return (Dh(p, t, e, n, r, o, i, l), c != null && Pr(t, p, u), p);
}
function wh(t, e, n, r, o, i, s, a) {
    let l = C(),
        c = $(),
        u = Ee(c.consts, i);
    return (Q_(l, c, t, e, n, r, o, u, void 0, s, a), wh);
}
function Th(t, e, n, r, o, i, s, a) {
    let l = C(),
        c = $(),
        u = Ee(c.consts, i);
    return (Vn(l, c, t, e, n, r, o, u, void 0, s, a), Th);
}
var K_ = Z_;
function Z_(t, e, n, r) {
    return (Er(!0), e[j].createComment(""));
}
var es = (function (t) {
        return (
            (t[(t.CHANGE_DETECTION = 0)] = "CHANGE_DETECTION"),
            (t[(t.AFTER_NEXT_RENDER = 1)] = "AFTER_NEXT_RENDER"),
            t
        );
    })(es || {}),
    Hr = new P(""),
    bh = !1,
    Fl = class extends De {
        __isAsync;
        destroyRef = void 0;
        pendingTasks = void 0;
        constructor(e = !1) {
            (super(),
                (this.__isAsync = e),
                Ad() &&
                    ((this.destroyRef = x(Ir, { optional: !0 }) ?? void 0),
                    (this.pendingTasks = x(Xt, { optional: !0 }) ?? void 0)));
        }
        emit(e) {
            let n = S(null);
            try {
                super.next(e);
            } finally {
                S(n);
            }
        }
        subscribe(e, n, r) {
            let o = e,
                i = n || (() => null),
                s = r;
            if (e && typeof e == "object") {
                let l = e;
                ((o = l.next?.bind(l)),
                    (i = l.error?.bind(l)),
                    (s = l.complete?.bind(l)));
            }
            this.__isAsync &&
                ((i = this.wrapInTimeout(i)),
                o && (o = this.wrapInTimeout(o)),
                s && (s = this.wrapInTimeout(s)));
            let a = super.subscribe({ next: o, error: i, complete: s });
            return (e instanceof U && e.add(a), a);
        }
        wrapInTimeout(e) {
            return (n) => {
                let r = this.pendingTasks?.add();
                setTimeout(() => {
                    try {
                        e(n);
                    } finally {
                        r !== void 0 && this.pendingTasks?.remove(r);
                    }
                });
            };
        }
    },
    it = Fl;
function Ch(t) {
    let e, n;
    function r() {
        t = Dr;
        try {
            (n !== void 0 &&
                typeof cancelAnimationFrame == "function" &&
                cancelAnimationFrame(n),
                e !== void 0 && clearTimeout(e));
        } catch {}
    }
    return (
        (e = setTimeout(() => {
            (t(), r());
        })),
        typeof requestAnimationFrame == "function" &&
            (n = requestAnimationFrame(() => {
                (t(), r());
            })),
        () => r()
    );
}
function kf(t) {
    return (
        queueMicrotask(() => t()),
        () => {
            t = Dr;
        }
    );
}
var Ec = "isAngularZone",
    Li = Ec + "_ID",
    Y_ = 0,
    ue = class t {
        hasPendingMacrotasks = !1;
        hasPendingMicrotasks = !1;
        isStable = !0;
        onUnstable = new it(!1);
        onMicrotaskEmpty = new it(!1);
        onStable = new it(!1);
        onError = new it(!1);
        constructor(e) {
            let {
                enableLongStackTrace: n = !1,
                shouldCoalesceEventChangeDetection: r = !1,
                shouldCoalesceRunChangeDetection: o = !1,
                scheduleInRootZone: i = bh,
            } = e;
            if (typeof Zone > "u") throw new y(908, !1);
            Zone.assertZonePatched();
            let s = this;
            ((s._nesting = 0),
                (s._outer = s._inner = Zone.current),
                Zone.TaskTrackingZoneSpec &&
                    (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
                n &&
                    Zone.longStackTraceZoneSpec &&
                    (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
                (s.shouldCoalesceEventChangeDetection = !o && r),
                (s.shouldCoalesceRunChangeDetection = o),
                (s.callbackScheduled = !1),
                (s.scheduleInRootZone = i),
                eD(s));
        }
        static isInAngularZone() {
            return typeof Zone < "u" && Zone.current.get(Ec) === !0;
        }
        static assertInAngularZone() {
            if (!t.isInAngularZone()) throw new y(909, !1);
        }
        static assertNotInAngularZone() {
            if (t.isInAngularZone()) throw new y(909, !1);
        }
        run(e, n, r) {
            return this._inner.run(e, n, r);
        }
        runTask(e, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask("NgZoneEvent: " + o, e, J_, Dr, Dr);
            try {
                return i.runTask(s, n, r);
            } finally {
                i.cancelTask(s);
            }
        }
        runGuarded(e, n, r) {
            return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
            return this._outer.run(e);
        }
    },
    J_ = {};
function Ic(t) {
    if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
        try {
            (t._nesting++, t.onMicrotaskEmpty.emit(null));
        } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
                try {
                    t.runOutsideAngular(() => t.onStable.emit(null));
                } finally {
                    t.isStable = !0;
                }
        }
}
function X_(t) {
    if (t.isCheckStableRunning || t.callbackScheduled) return;
    t.callbackScheduled = !0;
    function e() {
        Ch(() => {
            ((t.callbackScheduled = !1),
                Ll(t),
                (t.isCheckStableRunning = !0),
                Ic(t),
                (t.isCheckStableRunning = !1));
        });
    }
    (t.scheduleInRootZone
        ? Zone.root.run(() => {
              e();
          })
        : t._outer.run(() => {
              e();
          }),
        Ll(t));
}
function eD(t) {
    let e = () => {
            X_(t);
        },
        n = Y_++;
    t._inner = t._inner.fork({
        name: "angular",
        properties: { [Ec]: !0, [Li]: n, [Li + n]: !0 },
        onInvokeTask: (r, o, i, s, a, l) => {
            if (tD(l)) return r.invokeTask(i, s, a, l);
            try {
                return (Pf(t), r.invokeTask(i, s, a, l));
            } finally {
                (((t.shouldCoalesceEventChangeDetection &&
                    s.type === "eventTask") ||
                    t.shouldCoalesceRunChangeDetection) &&
                    e(),
                    Ff(t));
            }
        },
        onInvoke: (r, o, i, s, a, l, c) => {
            try {
                return (Pf(t), r.invoke(i, s, a, l, c));
            } finally {
                (t.shouldCoalesceRunChangeDetection &&
                    !t.callbackScheduled &&
                    !nD(l) &&
                    e(),
                    Ff(t));
            }
        },
        onHasTask: (r, o, i, s) => {
            (r.hasTask(i, s),
                o === i &&
                    (s.change == "microTask"
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Ll(t),
                          Ic(t))
                        : s.change == "macroTask" &&
                          (t.hasPendingMacrotasks = s.macroTask)));
        },
        onHandleError: (r, o, i, s) => (
            r.handleError(i, s),
            t.runOutsideAngular(() => t.onError.emit(s)),
            !1
        ),
    });
}
function Ll(t) {
    t._hasPendingMicrotasks ||
    ((t.shouldCoalesceEventChangeDetection ||
        t.shouldCoalesceRunChangeDetection) &&
        t.callbackScheduled === !0)
        ? (t.hasPendingMicrotasks = !0)
        : (t.hasPendingMicrotasks = !1);
}
function Pf(t) {
    (t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null)));
}
function Ff(t) {
    (t._nesting--, Ic(t));
}
var ji = class {
    hasPendingMicrotasks = !1;
    hasPendingMacrotasks = !1;
    isStable = !0;
    onUnstable = new it();
    onMicrotaskEmpty = new it();
    onStable = new it();
    onError = new it();
    run(e, n, r) {
        return e.apply(n, r);
    }
    runGuarded(e, n, r) {
        return e.apply(n, r);
    }
    runOutsideAngular(e) {
        return e();
    }
    runTask(e, n, r, o) {
        return e.apply(n, r);
    }
};
function tD(t) {
    return Sh(t, "__ignore_ng_zone__");
}
function nD(t) {
    return Sh(t, "__scheduler_tick__");
}
function Sh(t, e) {
    return !Array.isArray(t) || t.length !== 1 ? !1 : t[0]?.data?.[e] === !0;
}
var _c = (() => {
        class t {
            impl = null;
            execute() {
                this.impl?.execute();
            }
            static ɵprov = z({
                token: t,
                providedIn: "root",
                factory: () => new t(),
            });
        }
        return t;
    })(),
    Nh = [0, 1, 2, 3],
    Mh = (() => {
        class t {
            ngZone = x(ue);
            scheduler = x(nt);
            errorHandler = x(gt, { optional: !0 });
            sequences = new Set();
            deferredRegistrations = new Set();
            executing = !1;
            constructor() {
                x(Hr, { optional: !0 });
            }
            execute() {
                let n = this.sequences.size > 0;
                (n && L(16), (this.executing = !0));
                for (let r of Nh)
                    for (let o of this.sequences)
                        if (!(o.erroredOrDestroyed || !o.hooks[r]))
                            try {
                                o.pipelinedValue =
                                    this.ngZone.runOutsideAngular(() =>
                                        this.maybeTrace(() => {
                                            let i = o.hooks[r];
                                            return i(o.pipelinedValue);
                                        }, o.snapshot),
                                    );
                            } catch (i) {
                                ((o.erroredOrDestroyed = !0),
                                    this.errorHandler?.handleError(i));
                            }
                this.executing = !1;
                for (let r of this.sequences)
                    (r.afterRun(),
                        r.once && (this.sequences.delete(r), r.destroy()));
                for (let r of this.deferredRegistrations) this.sequences.add(r);
                (this.deferredRegistrations.size > 0 &&
                    this.scheduler.notify(7),
                    this.deferredRegistrations.clear(),
                    n && L(17));
            }
            register(n) {
                let { view: r } = n;
                r !== void 0
                    ? ((r[Zt] ??= []).push(n), Mn(r), (r[N] |= 8192))
                    : this.executing
                      ? this.deferredRegistrations.add(n)
                      : this.addSequence(n);
            }
            addSequence(n) {
                (this.sequences.add(n), this.scheduler.notify(7));
            }
            unregister(n) {
                this.executing && this.sequences.has(n)
                    ? ((n.erroredOrDestroyed = !0),
                      (n.pipelinedValue = void 0),
                      (n.once = !0))
                    : (this.sequences.delete(n),
                      this.deferredRegistrations.delete(n));
            }
            maybeTrace(n, r) {
                return r ? r.run(es.AFTER_NEXT_RENDER, n) : n();
            }
            static ɵprov = z({
                token: t,
                providedIn: "root",
                factory: () => new t(),
            });
        }
        return t;
    })(),
    Vi = class {
        impl;
        hooks;
        view;
        once;
        snapshot;
        erroredOrDestroyed = !1;
        pipelinedValue = void 0;
        unregisterOnDestroy;
        constructor(e, n, r, o, i, s = null) {
            ((this.impl = e),
                (this.hooks = n),
                (this.view = r),
                (this.once = o),
                (this.snapshot = s),
                (this.unregisterOnDestroy = i?.onDestroy(() =>
                    this.destroy(),
                )));
        }
        afterRun() {
            ((this.erroredOrDestroyed = !1),
                (this.pipelinedValue = void 0),
                this.snapshot?.dispose(),
                (this.snapshot = null));
        }
        destroy() {
            (this.impl.unregister(this), this.unregisterOnDestroy?.());
            let e = this.view?.[Zt];
            e && (this.view[Zt] = e.filter((n) => n !== this));
        }
    };
function rD(t, e) {
    let n = e?.injector ?? x(mt);
    return (wt("NgAfterNextRender"), iD(t, n, e, !0));
}
function oD(t) {
    return t instanceof Function
        ? [void 0, void 0, t, void 0]
        : [t.earlyRead, t.write, t.mixedReadWrite, t.read];
}
function iD(t, e, n, r) {
    let o = e.get(_c);
    o.impl ??= e.get(Mh);
    let i = e.get(Hr, null, { optional: !0 }),
        s = n?.manualCleanup !== !0 ? e.get(Ir) : null,
        a = e.get(fi, null, { optional: !0 }),
        l = new Vi(o.impl, oD(t), a?.view, r, s, i?.snapshot(null));
    return (o.impl.register(l), l);
}
var sD = (() => {
    class t {
        log(n) {
            console.log(n);
        }
        warn(n) {
            console.warn(n);
        }
        static ɵfac = function (r) {
            return new (r || t)();
        };
        static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "platform" });
    }
    return t;
})();
var xh = new P("");
function Dc(t) {
    return !!t && typeof t.then == "function";
}
function Ah(t) {
    return !!t && typeof t.subscribe == "function";
}
var wc = new P("");
function aD(t) {
    return ei([{ provide: wc, multi: !0, useValue: t }]);
}
var Tc = (() => {
        class t {
            resolve;
            reject;
            initialized = !1;
            done = !1;
            donePromise = new Promise((n, r) => {
                ((this.resolve = n), (this.reject = r));
            });
            appInits = x(wc, { optional: !0 }) ?? [];
            injector = x(mt);
            constructor() {}
            runInitializers() {
                if (this.initialized) return;
                let n = [];
                for (let o of this.appInits) {
                    let i = ti(this.injector, o);
                    if (Dc(i)) n.push(i);
                    else if (Ah(i)) {
                        let s = new Promise((a, l) => {
                            i.subscribe({ complete: a, error: l });
                        });
                        n.push(s);
                    }
                }
                let r = () => {
                    ((this.done = !0), this.resolve());
                };
                (Promise.all(n)
                    .then(() => {
                        r();
                    })
                    .catch((o) => {
                        this.reject(o);
                    }),
                    n.length === 0 && r(),
                    (this.initialized = !0));
            }
            static ɵfac = function (r) {
                return new (r || t)();
            };
            static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    Rh = new P("");
function Oh() {
    Ss(() => {
        let t = "";
        throw new y(600, t);
    });
}
function kh(t) {
    return t.isBoundToModule;
}
var lD = 10;
var Br = (() => {
    class t {
        _runningTick = !1;
        _destroyed = !1;
        _destroyListeners = [];
        _views = [];
        internalErrorHandler = x(ot);
        afterRenderManager = x(_c);
        zonelessEnabled = x(_r);
        rootEffectScheduler = x(Ja);
        dirtyFlags = 0;
        tracingSnapshot = null;
        allTestViews = new Set();
        autoDetectTestViews = new Set();
        includeAllTestViews = !1;
        afterTick = new De();
        get allViews() {
            return [
                ...(this.includeAllTestViews
                    ? this.allTestViews
                    : this.autoDetectTestViews
                ).keys(),
                ...this._views,
            ];
        }
        get destroyed() {
            return this._destroyed;
        }
        componentTypes = [];
        components = [];
        internalPendingTask = x(Xt);
        get isStable() {
            return this.internalPendingTask.hasPendingTasksObservable.pipe(
                et((n) => !n),
            );
        }
        constructor() {
            x(Hr, { optional: !0 });
        }
        whenStable() {
            let n;
            return new Promise((r) => {
                n = this.isStable.subscribe({
                    next: (o) => {
                        o && r();
                    },
                });
            }).finally(() => {
                n.unsubscribe();
            });
        }
        _injector = x(we);
        _rendererFactory = null;
        get injector() {
            return this._injector;
        }
        bootstrap(n, r) {
            return this.bootstrapImpl(n, r);
        }
        bootstrapImpl(n, r, o = mt.NULL) {
            return this._injector.get(ue).run(() => {
                L(10);
                let s = n instanceof Ji;
                if (!this._injector.get(Tc).done) {
                    let h = "";
                    throw new y(405, h);
                }
                let l;
                (s
                    ? (l = n)
                    : (l = this._injector.get(jr).resolveComponentFactory(n)),
                    this.componentTypes.push(l.componentType));
                let c = kh(l) ? void 0 : this._injector.get(jn),
                    u = r || l.selector,
                    d = l.create(o, [], u, c),
                    p = d.location.nativeElement,
                    f = d.injector.get(xh, null);
                return (
                    f?.registerApplication(p),
                    d.onDestroy(() => {
                        (this.detachView(d.hostView),
                            Tr(this.components, d),
                            f?.unregisterApplication(p));
                    }),
                    this._loadComponent(d),
                    L(11, d),
                    d
                );
            });
        }
        tick() {
            (this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick());
        }
        _tick() {
            (L(12),
                this.tracingSnapshot !== null
                    ? this.tracingSnapshot.run(
                          es.CHANGE_DETECTION,
                          this.tickImpl,
                      )
                    : this.tickImpl());
        }
        tickImpl = () => {
            if (this._runningTick) throw new y(101, !1);
            let n = S(null);
            try {
                ((this._runningTick = !0), this.synchronize());
            } finally {
                ((this._runningTick = !1),
                    this.tracingSnapshot?.dispose(),
                    (this.tracingSnapshot = null),
                    S(n),
                    this.afterTick.next(),
                    L(13));
            }
        };
        synchronize() {
            this._rendererFactory === null &&
                !this._injector.destroyed &&
                (this._rendererFactory = this._injector.get(Mr, null, {
                    optional: !0,
                }));
            let n = 0;
            for (; this.dirtyFlags !== 0 && n++ < lD; )
                (L(14), this.synchronizeOnce(), L(15));
        }
        synchronizeOnce() {
            this.dirtyFlags & 16 &&
                ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
            let n = !1;
            if (this.dirtyFlags & 7) {
                let r = !!(this.dirtyFlags & 1);
                ((this.dirtyFlags &= -8), (this.dirtyFlags |= 8));
                for (let { _lView: o } of this.allViews) {
                    if (!r && !yr(o)) continue;
                    let i = r && !this.zonelessEnabled ? 0 : 1;
                    (pc(o, i), (n = !0));
                }
                if (
                    ((this.dirtyFlags &= -5),
                    this.syncDirtyFlagsWithViews(),
                    this.dirtyFlags & 23)
                )
                    return;
            }
            (n ||
                (this._rendererFactory?.begin?.(),
                this._rendererFactory?.end?.()),
                this.dirtyFlags & 8 &&
                    ((this.dirtyFlags &= -9),
                    this.afterRenderManager.execute()),
                this.syncDirtyFlagsWithViews());
        }
        syncDirtyFlagsWithViews() {
            if (this.allViews.some(({ _lView: n }) => yr(n))) {
                this.dirtyFlags |= 2;
                return;
            } else this.dirtyFlags &= -8;
        }
        attachView(n) {
            let r = n;
            (this._views.push(r), r.attachToAppRef(this));
        }
        detachView(n) {
            let r = n;
            (Tr(this._views, r), r.detachFromAppRef());
        }
        _loadComponent(n) {
            this.attachView(n.hostView);
            try {
                this.tick();
            } catch (o) {
                this.internalErrorHandler(o);
            }
            (this.components.push(n),
                this._injector.get(Rh, []).forEach((o) => o(n)));
        }
        ngOnDestroy() {
            if (!this._destroyed)
                try {
                    (this._destroyListeners.forEach((n) => n()),
                        this._views.slice().forEach((n) => n.destroy()));
                } finally {
                    ((this._destroyed = !0),
                        (this._views = []),
                        (this._destroyListeners = []));
                }
        }
        onDestroy(n) {
            return (
                this._destroyListeners.push(n),
                () => Tr(this._destroyListeners, n)
            );
        }
        destroy() {
            if (this._destroyed) throw new y(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
        }
        get viewCount() {
            return this._views.length;
        }
        static ɵfac = function (r) {
            return new (r || t)();
        };
        static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
function Tr(t, e) {
    let n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
}
function Ph(t, e, n, r) {
    let o = C(),
        i = An();
    if (Ye(o, i, e)) {
        let s = $(),
            a = Qa();
        hI(a, o, t, e, n, r);
    }
    return Ph;
}
var jl = class {
    destroy(e) {}
    updateValue(e, n) {}
    swap(e, n) {
        let r = Math.min(e, n),
            o = Math.max(e, n),
            i = this.detach(o);
        if (o - r > 1) {
            let s = this.detach(r);
            (this.attach(r, i), this.attach(o, s));
        } else this.attach(r, i);
    }
    move(e, n) {
        this.attach(n, this.detach(e));
    }
};
function ol(t, e, n, r, o) {
    return t === n && Object.is(e, r)
        ? 1
        : Object.is(o(t, e), o(n, r))
          ? -1
          : 0;
}
function cD(t, e, n) {
    let r,
        o,
        i = 0,
        s = t.length - 1,
        a = void 0;
    if (Array.isArray(e)) {
        let l = e.length - 1;
        for (; i <= s && i <= l; ) {
            let c = t.at(i),
                u = e[i],
                d = ol(i, c, i, u, n);
            if (d !== 0) {
                (d < 0 && t.updateValue(i, u), i++);
                continue;
            }
            let p = t.at(s),
                f = e[l],
                h = ol(s, p, l, f, n);
            if (h !== 0) {
                (h < 0 && t.updateValue(s, f), s--, l--);
                continue;
            }
            let m = n(i, c),
                v = n(s, p),
                g = n(i, u);
            if (Object.is(g, v)) {
                let F = n(l, f);
                (Object.is(F, m)
                    ? (t.swap(i, s), t.updateValue(s, f), l--, s--)
                    : t.move(s, i),
                    t.updateValue(i, u),
                    i++);
                continue;
            }
            if (((r ??= new Hi()), (o ??= jf(t, i, s, n)), Vl(t, r, i, g)))
                (t.updateValue(i, u), i++, s++);
            else if (o.has(g)) (r.set(m, t.detach(i)), s--);
            else {
                let F = t.create(i, e[i]);
                (t.attach(i, F), i++, s++);
            }
        }
        for (; i <= l; ) (Lf(t, r, n, i, e[i]), i++);
    } else if (e != null) {
        let l = e[Symbol.iterator](),
            c = l.next();
        for (; !c.done && i <= s; ) {
            let u = t.at(i),
                d = c.value,
                p = ol(i, u, i, d, n);
            if (p !== 0) (p < 0 && t.updateValue(i, d), i++, (c = l.next()));
            else {
                ((r ??= new Hi()), (o ??= jf(t, i, s, n)));
                let f = n(i, d);
                if (Vl(t, r, i, f))
                    (t.updateValue(i, d), i++, s++, (c = l.next()));
                else if (!o.has(f))
                    (t.attach(i, t.create(i, d)), i++, s++, (c = l.next()));
                else {
                    let h = n(i, u);
                    (r.set(h, t.detach(i)), s--);
                }
            }
        }
        for (; !c.done; ) (Lf(t, r, n, t.length, c.value), (c = l.next()));
    }
    for (; i <= s; ) t.destroy(t.detach(s--));
    r?.forEach((l) => {
        t.destroy(l);
    });
}
function Vl(t, e, n, r) {
    return e !== void 0 && e.has(r)
        ? (t.attach(n, e.get(r)), e.delete(r), !0)
        : !1;
}
function Lf(t, e, n, r, o) {
    if (Vl(t, e, r, n(r, o))) t.updateValue(r, o);
    else {
        let i = t.create(r, o);
        t.attach(r, i);
    }
}
function jf(t, e, n, r) {
    let o = new Set();
    for (let i = e; i <= n; i++) o.add(r(i, t.at(i)));
    return o;
}
var Hi = class {
    kvMap = new Map();
    _vMap = void 0;
    has(e) {
        return this.kvMap.has(e);
    }
    delete(e) {
        if (!this.has(e)) return !1;
        let n = this.kvMap.get(e);
        return (
            this._vMap !== void 0 && this._vMap.has(n)
                ? (this.kvMap.set(e, this._vMap.get(n)), this._vMap.delete(n))
                : this.kvMap.delete(e),
            !0
        );
    }
    get(e) {
        return this.kvMap.get(e);
    }
    set(e, n) {
        if (this.kvMap.has(e)) {
            let r = this.kvMap.get(e);
            this._vMap === void 0 && (this._vMap = new Map());
            let o = this._vMap;
            for (; o.has(r); ) r = o.get(r);
            o.set(r, n);
        } else this.kvMap.set(e, n);
    }
    forEach(e) {
        for (let [n, r] of this.kvMap)
            if ((e(r, n), this._vMap !== void 0)) {
                let o = this._vMap;
                for (; o.has(r); ) ((r = o.get(r)), e(r, n));
            }
    }
};
function uD(t, e, n, r, o, i, s, a) {
    wt("NgControlFlow");
    let l = C(),
        c = $(),
        u = Ee(c.consts, i);
    return (Vn(l, c, t, e, n, r, o, u, 256, s, a), bc);
}
function bc(t, e, n, r, o, i, s, a) {
    wt("NgControlFlow");
    let l = C(),
        c = $(),
        u = Ee(c.consts, i);
    return (Vn(l, c, t, e, n, r, o, u, 512, s, a), bc);
}
function dD(t, e) {
    wt("NgControlFlow");
    let n = C(),
        r = An(),
        o = n[r] !== Ie ? n[r] : -1,
        i = o !== -1 ? Bi(n, H + o) : void 0,
        s = 0;
    if (Ye(n, r, t)) {
        let a = S(null);
        try {
            if ((i !== void 0 && nh(i, s), t !== -1)) {
                let l = H + t,
                    c = Bi(n, l),
                    u = Ul(n[_], l),
                    d = oh(c, u, n),
                    p = Fr(n, u, e, { dehydratedView: d });
                Lr(c, p, s, Ln(u, d));
            }
        } finally {
            S(a);
        }
    } else if (i !== void 0) {
        let a = th(i, s);
        a !== void 0 && (a[q] = e);
    }
}
var Hl = class {
    lContainer;
    $implicit;
    $index;
    constructor(e, n, r) {
        ((this.lContainer = e), (this.$implicit = n), (this.$index = r));
    }
    get $count() {
        return this.lContainer.length - J;
    }
};
function fD(t) {
    return t;
}
function pD(t, e) {
    return e;
}
var Bl = class {
    hasEmptyBlock;
    trackByFn;
    liveCollection;
    constructor(e, n, r) {
        ((this.hasEmptyBlock = e),
            (this.trackByFn = n),
            (this.liveCollection = r));
    }
};
function hD(t, e, n, r, o, i, s, a, l, c, u, d, p) {
    wt("NgControlFlow");
    let f = C(),
        h = $(),
        m = l !== void 0,
        v = C(),
        g = a ? s.bind(v[ce][q]) : s,
        F = new Bl(m, g);
    ((v[H + t] = F),
        Vn(f, h, t + 1, e, n, r, o, Ee(h.consts, i), 256),
        m && Vn(f, h, t + 2, l, c, u, d, Ee(h.consts, p), 512));
}
var $l = class extends jl {
    lContainer;
    hostLView;
    templateTNode;
    operationsCounter = void 0;
    needsIndexUpdate = !1;
    constructor(e, n, r) {
        (super(),
            (this.lContainer = e),
            (this.hostLView = n),
            (this.templateTNode = r));
    }
    get length() {
        return this.lContainer.length - J;
    }
    at(e) {
        return this.getLView(e)[q].$implicit;
    }
    attach(e, n) {
        let r = n[Wt];
        ((this.needsIndexUpdate ||= e !== this.length),
            Lr(this.lContainer, n, e, Ln(this.templateTNode, r)));
    }
    detach(e) {
        return (
            (this.needsIndexUpdate ||= e !== this.length - 1),
            gD(this.lContainer, e)
        );
    }
    create(e, n) {
        let r = xi(this.lContainer, this.templateTNode.tView.ssrId),
            o = Fr(
                this.hostLView,
                this.templateTNode,
                new Hl(this.lContainer, n, e),
                { dehydratedView: r },
            );
        return (this.operationsCounter?.recordCreate(), o);
    }
    destroy(e) {
        (Qi(e[_], e), this.operationsCounter?.recordDestroy());
    }
    updateValue(e, n) {
        this.getLView(e)[q].$implicit = n;
    }
    reset() {
        ((this.needsIndexUpdate = !1), this.operationsCounter?.reset());
    }
    updateIndexes() {
        if (this.needsIndexUpdate)
            for (let e = 0; e < this.length; e++)
                this.getLView(e)[q].$index = e;
    }
    getLView(e) {
        return yD(this.lContainer, e);
    }
};
function mD(t) {
    let e = S(null),
        n = rt();
    try {
        let r = C(),
            o = r[_],
            i = r[n],
            s = n + 1,
            a = Bi(r, s);
        if (i.liveCollection === void 0) {
            let c = Ul(o, s);
            i.liveCollection = new $l(a, r, c);
        } else i.liveCollection.reset();
        let l = i.liveCollection;
        if ((cD(l, t, i.trackByFn), l.updateIndexes(), i.hasEmptyBlock)) {
            let c = An(),
                u = l.length === 0;
            if (Ye(r, c, u)) {
                let d = n + 2,
                    p = Bi(r, d);
                if (u) {
                    let f = Ul(o, d),
                        h = oh(p, f, r),
                        m = Fr(r, f, void 0, { dehydratedView: h });
                    Lr(p, m, 0, Ln(f, h));
                } else (o.firstUpdatePass && VI(p), nh(p, 0));
            }
        }
    } finally {
        S(e);
    }
}
function Bi(t, e) {
    return t[e];
}
function gD(t, e) {
    return Sr(t, e);
}
function yD(t, e) {
    return th(t, e);
}
function Ul(t, e) {
    return gr(t, e);
}
function Fh(t, e, n) {
    let r = C(),
        o = An();
    if (Ye(r, o, e)) {
        let i = $(),
            s = Qa();
        lI(s, r, t, e, r[j], n);
    }
    return Fh;
}
function ql(t, e, n, r, o) {
    dc(e, t, n, o ? "class" : "style", r);
}
function Cc(t, e, n, r) {
    let o = C(),
        i = o[_],
        s = t + H,
        a = i.firstCreatePass ? mc(s, o, 2, e, lc, ii(), n, r) : i.data[s];
    if ((cc(a, o, t, e, Vh), Sn(a))) {
        let l = o[_];
        (Zi(l, o, a), Yl(l, a, o));
    }
    return (r != null && Pr(o, a), Cc);
}
function Sc() {
    let t = $(),
        e = K(),
        n = uc(e);
    return (
        t.firstCreatePass && gc(t, n),
        Fa(n) && La(),
        ka(),
        n.classesWithoutHost != null &&
            vv(n) &&
            ql(t, n, C(), n.classesWithoutHost, !0),
        n.stylesWithoutHost != null &&
            Ev(n) &&
            ql(t, n, C(), n.stylesWithoutHost, !1),
        Sc
    );
}
function Lh(t, e, n, r) {
    return (Cc(t, e, n, r), Sc(), Lh);
}
function Nc(t, e, n, r) {
    let o = C(),
        i = o[_],
        s = t + H,
        a = i.firstCreatePass ? t_(s, i, 2, e, n, r) : i.data[s];
    return (cc(a, o, t, e, Vh), r != null && Pr(o, a), Nc);
}
function Mc() {
    let t = K(),
        e = uc(t);
    return (Fa(e) && La(), ka(), Mc);
}
function jh(t, e, n, r) {
    return (Nc(t, e, n, r), Mc(), jh);
}
var Vh = (t, e, n, r, o) => (Er(!0), Rp(e[j], r, tf()));
function xc(t, e, n) {
    let r = C(),
        o = r[_],
        i = t + H,
        s = o.firstCreatePass
            ? mc(i, r, 8, "ng-container", lc, ii(), e, n)
            : o.data[i];
    if ((cc(s, r, t, "ng-container", vD), Sn(s))) {
        let a = r[_];
        (Zi(a, r, s), Yl(a, s, r));
    }
    return (n != null && Pr(r, s), xc);
}
function Ac() {
    let t = $(),
        e = K(),
        n = uc(e);
    return (t.firstCreatePass && gc(t, n), Ac);
}
function Hh(t, e, n) {
    return (xc(t, e, n), Ac(), Hh);
}
var vD = (t, e, n, r, o) => (Er(!0), VE(e[j], ""));
function ED() {
    return C();
}
var en = void 0;
function ID(t) {
    let e = Math.floor(Math.abs(t)),
        n = t.toString().replace(/^[^.]*\.?/, "").length;
    return e === 1 && n === 0 ? 1 : 5;
}
var _D = [
        "en",
        [["a", "p"], ["AM", "PM"], en],
        [["AM", "PM"], en, en],
        [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        en,
        [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        ],
        en,
        [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", en, "{1} 'at' {0}", en],
        [
            ".",
            ",",
            ";",
            "%",
            "+",
            "-",
            "E",
            "\xD7",
            "\u2030",
            "\u221E",
            "NaN",
            ":",
        ],
        ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        ID,
    ],
    il = {};
function DD(t) {
    let e = wD(t),
        n = Vf(e);
    if (n) return n;
    let r = e.split("-")[0];
    if (((n = Vf(r)), n)) return n;
    if (r === "en") return _D;
    throw new y(701, !1);
}
function Vf(t) {
    return (
        t in il ||
            (il[t] =
                ze.ng &&
                ze.ng.common &&
                ze.ng.common.locales &&
                ze.ng.common.locales[t]),
        il[t]
    );
}
var Bh = (function (t) {
    return (
        (t[(t.LocaleId = 0)] = "LocaleId"),
        (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (t[(t.DaysFormat = 3)] = "DaysFormat"),
        (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
        (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
        (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
        (t[(t.Eras = 7)] = "Eras"),
        (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (t[(t.WeekendRange = 9)] = "WeekendRange"),
        (t[(t.DateFormat = 10)] = "DateFormat"),
        (t[(t.TimeFormat = 11)] = "TimeFormat"),
        (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
        (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
        (t[(t.NumberFormats = 14)] = "NumberFormats"),
        (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
        (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
        (t[(t.CurrencyName = 17)] = "CurrencyName"),
        (t[(t.Currencies = 18)] = "Currencies"),
        (t[(t.Directionality = 19)] = "Directionality"),
        (t[(t.PluralCase = 20)] = "PluralCase"),
        (t[(t.ExtraData = 21)] = "ExtraData"),
        t
    );
})(Bh || {});
function wD(t) {
    return t.toLowerCase().replace(/_/g, "-");
}
var $r = "en-US";
var TD = $r;
function $h(t) {
    typeof t == "string" && (TD = t.toLowerCase().replace(/_/g, "-"));
}
function Uh(t, e, n) {
    let r = C(),
        o = $(),
        i = K();
    return (bD(o, r, r[j], i, t, e, n), Uh);
}
function qh(t, e, n) {
    let r = C(),
        o = $(),
        i = K();
    return ((i.type & 3 || n) && ch(i, o, r, n, r[j], t, e, _i(i, r, e)), qh);
}
function bD(t, e, n, r, o, i, s) {
    let a = !0,
        l = null;
    if (
        ((r.type & 3 || s) &&
            ((l ??= _i(r, e, i)), ch(r, t, e, s, n, o, i, l) && (a = !1)),
        a)
    ) {
        let c = r.outputs?.[o],
            u = r.hostDirectiveOutputs?.[o];
        if (u && u.length)
            for (let d = 0; d < u.length; d += 2) {
                let p = u[d],
                    f = u[d + 1];
                ((l ??= _i(r, e, i)), Sf(r, e, p, f, o, l));
            }
        if (c && c.length)
            for (let d of c) ((l ??= _i(r, e, i)), Sf(r, e, d, o, o, l));
    }
}
function CD(t = 1) {
    return ef(t);
}
function SD(t, e) {
    let n = null,
        r = xE(t);
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        if (i === "*") {
            n = o;
            continue;
        }
        if (r === null ? Ap(t, i, !0) : OE(r, i)) return o;
    }
    return n;
}
function ND(t) {
    let e = C()[ce][le];
    if (!e.projection) {
        let n = t ? t.length : 1,
            r = (e.projection = Td(n, null)),
            o = r.slice(),
            i = e.child;
        for (; i !== null; ) {
            if (i.type !== 128) {
                let s = t ? SD(i, t) : 0;
                s !== null &&
                    (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
            }
            i = i.next;
        }
    }
}
function MD(t, e = 0, n, r, o, i) {
    let s = C(),
        a = $(),
        l = r ? t + 1 : null;
    l !== null && Vn(s, a, l, r, o, i, null, n);
    let c = qn(a, H + t, 16, null, n || null);
    (c.projection === null && (c.projection = e), Ha());
    let d = !s[Wt] || Pa();
    s[ce][le].projection[c.projection] === null && l !== null
        ? xD(s, a, l)
        : d && !qi(c) && tI(a, s, c);
}
function xD(t, e, n) {
    let r = H + n,
        o = e.data[r],
        i = t[r],
        s = xi(i, o.tView.ssrId),
        a = Fr(t, o, void 0, { dehydratedView: s });
    Lr(i, a, 0, Ln(o, s));
}
function AD(t, e, n, r) {
    C_(t, e, n, r);
}
function RD(t, e, n) {
    b_(t, e, n);
}
function OD(t) {
    let e = C(),
        n = $(),
        r = za();
    li(r + 1);
    let o = vc(n, r);
    if (t.dirty && Pd(e) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) t.reset([]);
        else {
            let i = M_(e, r);
            (t.reset(i, Ov), t.notifyOnChanges());
        }
        return !0;
    }
    return !1;
}
function kD() {
    return T_(C(), za());
}
function PD(t) {
    let e = zd();
    return Sa(e, H + t);
}
function gi(t, e) {
    return (t << 17) | (e << 2);
}
function rn(t) {
    return (t >> 17) & 32767;
}
function FD(t) {
    return (t & 2) == 2;
}
function LD(t, e) {
    return (t & 131071) | (e << 17);
}
function zl(t) {
    return t | 2;
}
function Hn(t) {
    return (t & 131068) >> 2;
}
function sl(t, e) {
    return (t & -131069) | (e << 2);
}
function jD(t) {
    return (t & 1) === 1;
}
function Wl(t) {
    return t | 1;
}
function VD(t, e, n, r, o, i) {
    let s = i ? e.classBindings : e.styleBindings,
        a = rn(s),
        l = Hn(s);
    t[r] = n;
    let c = !1,
        u;
    if (Array.isArray(n)) {
        let d = n;
        ((u = d[1]), (u === null || wn(d, u) > 0) && (c = !0));
    } else u = n;
    if (o)
        if (l !== 0) {
            let p = rn(t[a + 1]);
            ((t[r + 1] = gi(p, a)),
                p !== 0 && (t[p + 1] = sl(t[p + 1], r)),
                (t[a + 1] = LD(t[a + 1], r)));
        } else
            ((t[r + 1] = gi(a, 0)),
                a !== 0 && (t[a + 1] = sl(t[a + 1], r)),
                (a = r));
    else
        ((t[r + 1] = gi(l, 0)),
            a === 0 ? (a = r) : (t[l + 1] = sl(t[l + 1], r)),
            (l = r));
    (c && (t[r + 1] = zl(t[r + 1])),
        Hf(t, u, r, !0),
        Hf(t, u, r, !1),
        HD(e, u, t, r, i),
        (s = gi(a, l)),
        i ? (e.classBindings = s) : (e.styleBindings = s));
}
function HD(t, e, n, r, o) {
    let i = o ? t.residualClasses : t.residualStyles;
    i != null &&
        typeof e == "string" &&
        wn(i, e) >= 0 &&
        (n[r + 1] = Wl(n[r + 1]));
}
function Hf(t, e, n, r) {
    let o = t[n + 1],
        i = e === null,
        s = r ? rn(o) : Hn(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i); ) {
        let l = t[s],
            c = t[s + 1];
        (BD(l, e) && ((a = !0), (t[s + 1] = r ? Wl(c) : zl(c))),
            (s = r ? rn(c) : Hn(c)));
    }
    a && (t[n + 1] = r ? zl(o) : Wl(o));
}
function BD(t, e) {
    return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
        ? !0
        : Array.isArray(t) && typeof e == "string"
          ? wn(t, e) >= 0
          : !1;
}
var Z = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function zh(t) {
    return t.substring(Z.key, Z.keyEnd);
}
function $D(t) {
    return t.substring(Z.value, Z.valueEnd);
}
function UD(t) {
    return (Qh(t), Wh(t, Bn(t, 0, Z.textEnd)));
}
function Wh(t, e) {
    let n = Z.textEnd;
    return n === e ? -1 : ((e = Z.keyEnd = zD(t, (Z.key = e), n)), Bn(t, e, n));
}
function qD(t) {
    return (Qh(t), Gh(t, Bn(t, 0, Z.textEnd)));
}
function Gh(t, e) {
    let n = Z.textEnd,
        r = (Z.key = Bn(t, e, n));
    return n === r
        ? -1
        : ((r = Z.keyEnd = WD(t, r, n)),
          (r = Bf(t, r, n, 58)),
          (r = Z.value = Bn(t, r, n)),
          (r = Z.valueEnd = GD(t, r, n)),
          Bf(t, r, n, 59));
}
function Qh(t) {
    ((Z.key = 0),
        (Z.keyEnd = 0),
        (Z.value = 0),
        (Z.valueEnd = 0),
        (Z.textEnd = t.length));
}
function Bn(t, e, n) {
    for (; e < n && t.charCodeAt(e) <= 32; ) e++;
    return e;
}
function zD(t, e, n) {
    for (; e < n && t.charCodeAt(e) > 32; ) e++;
    return e;
}
function WD(t, e, n) {
    let r;
    for (
        ;
        e < n &&
        ((r = t.charCodeAt(e)) === 45 ||
            r === 95 ||
            ((r & -33) >= 65 && (r & -33) <= 90) ||
            (r >= 48 && r <= 57));

    )
        e++;
    return e;
}
function Bf(t, e, n, r) {
    return ((e = Bn(t, e, n)), e < n && e++, e);
}
function GD(t, e, n) {
    let r = -1,
        o = -1,
        i = -1,
        s = e,
        a = s;
    for (; s < n; ) {
        let l = t.charCodeAt(s++);
        if (l === 59) return a;
        (l === 34 || l === 39
            ? (a = s = $f(t, l, s, n))
            : e === s - 4 && i === 85 && o === 82 && r === 76 && l === 40
              ? (a = s = $f(t, 41, s, n))
              : l > 32 && (a = s),
            (i = o),
            (o = r),
            (r = l & -33));
    }
    return a;
}
function $f(t, e, n, r) {
    let o = -1,
        i = n;
    for (; i < r; ) {
        let s = t.charCodeAt(i++);
        if (s == e && o !== 92) return i;
        s == 92 && o === 92 ? (o = 0) : (o = s);
    }
    throw new Error();
}
function Kh(t, e, n) {
    return (Yh(t, e, n, !1), Kh);
}
function Zh(t, e) {
    return (Yh(t, e, null, !0), Zh);
}
function QD(t) {
    Jh(tm, KD, t, !1);
}
function KD(t, e) {
    for (let n = qD(e); n >= 0; n = Gh(e, n)) tm(t, zh(e), $D(e));
}
function ZD(t) {
    Jh(rw, YD, t, !0);
}
function YD(t, e) {
    for (let n = UD(e); n >= 0; n = Wh(e, n)) fr(t, zh(e), !0);
}
function Yh(t, e, n, r) {
    let o = C(),
        i = $(),
        s = qa(2);
    if ((i.firstUpdatePass && em(i, t, s, r), e !== Ie && Ye(o, s, e))) {
        let a = i.data[rt()];
        nm(i, a, o, o[j], t, (o[s + 1] = iw(e, n)), r, s);
    }
}
function Jh(t, e, n, r) {
    let o = $(),
        i = qa(2);
    o.firstUpdatePass && em(o, null, i, r);
    let s = C();
    if (n !== Ie && Ye(s, i, n)) {
        let a = o.data[rt()];
        if (rm(a, r) && !Xh(o, i)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            (l !== null && (n = Go(l, n || "")), ql(o, a, s, n, r));
        } else ow(o, a, s, s[j], s[i + 1], (s[i + 1] = nw(t, e, n)), r, i);
    }
}
function Xh(t, e) {
    return e >= t.expandoStartIndex;
}
function em(t, e, n, r) {
    let o = t.data;
    if (o[n + 1] === null) {
        let i = o[rt()],
            s = Xh(t, n);
        (rm(i, r) && e === null && !s && (e = !1),
            (e = JD(o, i, e, r)),
            VD(o, i, e, n, s, r));
    }
}
function JD(t, e, n, r) {
    let o = Zd(t),
        i = r ? e.residualClasses : e.residualStyles;
    if (o === null)
        (r ? e.classBindings : e.styleBindings) === 0 &&
            ((n = al(null, t, e, n, r)), (n = Ar(n, e.attrs, r)), (i = null));
    else {
        let s = e.directiveStylingLast;
        if (s === -1 || t[s] !== o)
            if (((n = al(o, t, e, n, r)), i === null)) {
                let l = XD(t, e, r);
                l !== void 0 &&
                    Array.isArray(l) &&
                    ((l = al(null, t, e, l[1], r)),
                    (l = Ar(l, e.attrs, r)),
                    ew(t, e, r, l));
            } else i = tw(t, e, r);
    }
    return (
        i !== void 0 && (r ? (e.residualClasses = i) : (e.residualStyles = i)),
        n
    );
}
function XD(t, e, n) {
    let r = n ? e.classBindings : e.styleBindings;
    if (Hn(r) !== 0) return t[rn(r)];
}
function ew(t, e, n, r) {
    let o = n ? e.classBindings : e.styleBindings;
    t[rn(o)] = r;
}
function tw(t, e, n) {
    let r,
        o = e.directiveEnd;
    for (let i = 1 + e.directiveStylingLast; i < o; i++) {
        let s = t[i].hostAttrs;
        r = Ar(r, s, n);
    }
    return Ar(r, e.attrs, n);
}
function al(t, e, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (
        a === -1 ? (a = n.directiveStart) : a++;
        a < s && ((i = e[a]), (r = Ar(r, i.hostAttrs, o)), i !== t);

    )
        a++;
    return (t !== null && (n.directiveStylingLast = a), r);
}
function Ar(t, e, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (e !== null)
        for (let i = 0; i < e.length; i++) {
            let s = e[i];
            typeof s == "number"
                ? (o = s)
                : o === r &&
                  (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
                  fr(t, s, n ? !0 : e[++i]));
        }
    return t === void 0 ? null : t;
}
function nw(t, e, n) {
    if (n == null || n === "") return ae;
    let r = [],
        o = Un(n);
    if (Array.isArray(o)) for (let i = 0; i < o.length; i++) t(r, o[i], !0);
    else if (typeof o == "object")
        for (let i in o) o.hasOwnProperty(i) && t(r, i, o[i]);
    else typeof o == "string" && e(r, o);
    return r;
}
function tm(t, e, n) {
    fr(t, e, Un(n));
}
function rw(t, e, n) {
    let r = String(e);
    r !== "" && !r.includes(" ") && fr(t, r, n);
}
function ow(t, e, n, r, o, i, s, a) {
    o === Ie && (o = ae);
    let l = 0,
        c = 0,
        u = 0 < o.length ? o[0] : null,
        d = 0 < i.length ? i[0] : null;
    for (; u !== null || d !== null; ) {
        let p = l < o.length ? o[l + 1] : void 0,
            f = c < i.length ? i[c + 1] : void 0,
            h = null,
            m;
        (u === d
            ? ((l += 2), (c += 2), p !== f && ((h = d), (m = f)))
            : d === null || (u !== null && u < d)
              ? ((l += 2), (h = u))
              : ((c += 2), (h = d), (m = f)),
            h !== null && nm(t, e, n, r, h, m, s, a),
            (u = l < o.length ? o[l] : null),
            (d = c < i.length ? i[c] : null));
    }
}
function nm(t, e, n, r, o, i, s, a) {
    if (!(e.type & 3)) return;
    let l = t.data,
        c = l[a + 1],
        u = jD(c) ? Uf(l, e, n, o, Hn(c), s) : void 0;
    if (!$i(u)) {
        $i(i) || (FD(c) && (i = Uf(l, null, n, o, a, s)));
        let d = Ca(rt(), n);
        rI(r, s, d, o, i);
    }
}
function Uf(t, e, n, r, o, i) {
    let s = e === null,
        a;
    for (; o > 0; ) {
        let l = t[o],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = u === null,
            p = n[o + 1];
        p === Ie && (p = d ? ae : void 0);
        let f = d ? Jo(p, r) : u === r ? p : void 0;
        if ((c && !$i(f) && (f = Jo(l, r)), $i(f) && ((a = f), s))) return a;
        let h = t[o + 1];
        o = s ? rn(h) : Hn(h);
    }
    if (e !== null) {
        let l = i ? e.residualClasses : e.residualStyles;
        l != null && (a = Jo(l, r));
    }
    return a;
}
function $i(t) {
    return t !== void 0;
}
function iw(t, e) {
    return (
        t == null ||
            t === "" ||
            (typeof e == "string"
                ? (t = t + e)
                : typeof t == "object" && (t = pe(Un(t)))),
        t
    );
}
function rm(t, e) {
    return (t.flags & (e ? 8 : 16)) !== 0;
}
function sw(t, e = "") {
    let n = C(),
        r = $(),
        o = t + H,
        i = r.firstCreatePass ? qn(r, o, 1, e, null) : r.data[o],
        s = aw(r, n, i, e, t);
    ((n[o] = s), di() && sc(r, n, s, i), xn(i, !1));
}
var aw = (t, e, n, r, o) => (Er(!0), LE(e[j], r));
function lw(t, e, n, r = "") {
    return Ye(t, An(), n) ? e + ur(n) + r : Ie;
}
function om(t) {
    return (Rc("", t), om);
}
function Rc(t, e, n) {
    let r = C(),
        o = lw(r, t, e, n);
    return (o !== Ie && cw(r, rt(), o), Rc);
}
function cw(t, e, n) {
    let r = Ca(e, t);
    jE(t[j], r, n);
}
function uw(t, e, n) {
    let r = $();
    if (r.firstCreatePass) {
        let o = Oe(t);
        (Gl(n, r.data, r.blueprint, o, !0), Gl(e, r.data, r.blueprint, o, !1));
    }
}
function Gl(t, e, n, r, o) {
    if (((t = G(t)), Array.isArray(t)))
        for (let i = 0; i < t.length; i++) Gl(t[i], e, n, r, o);
    else {
        let i = $(),
            s = C(),
            a = K(),
            l = $t(t) ? t : G(t.provide),
            c = _a(t),
            u = a.providerIndexes & 1048575,
            d = a.directiveStart,
            p = a.providerIndexes >> 20;
        if ($t(t) || !t.multi) {
            let f = new nn(c, o, Vr),
                h = cl(l, e, o ? u : u + p, d);
            h === -1
                ? (dl(Ci(a, s), i, l),
                  ll(i, t, e.length),
                  e.push(l),
                  a.directiveStart++,
                  a.directiveEnd++,
                  o && (a.providerIndexes += 1048576),
                  n.push(f),
                  s.push(f))
                : ((n[h] = f), (s[h] = f));
        } else {
            let f = cl(l, e, u + p, d),
                h = cl(l, e, u, u + p),
                m = f >= 0 && n[f],
                v = h >= 0 && n[h];
            if ((o && !v) || (!o && !m)) {
                dl(Ci(a, s), i, l);
                let g = pw(o ? fw : dw, n.length, o, r, c);
                (!o && v && (n[h].providerFactory = g),
                    ll(i, t, e.length, 0),
                    e.push(l),
                    a.directiveStart++,
                    a.directiveEnd++,
                    o && (a.providerIndexes += 1048576),
                    n.push(g),
                    s.push(g));
            } else {
                let g = im(n[o ? h : f], c, !o && r);
                ll(i, t, f > -1 ? f : h, g);
            }
            !o && r && v && n[h].componentProviders++;
        }
    }
}
function ll(t, e, n, r) {
    let o = $t(e),
        i = xd(e);
    if (o || i) {
        let l = (i ? G(e.useClass) : e).prototype.ngOnDestroy;
        if (l) {
            let c = t.destroyHooks || (t.destroyHooks = []);
            if (!o && e.multi) {
                let u = c.indexOf(n);
                u === -1 ? c.push(n, [r, l]) : c[u + 1].push(r, l);
            } else c.push(n, l);
        }
    }
}
function im(t, e, n) {
    return (n && t.componentProviders++, t.multi.push(e) - 1);
}
function cl(t, e, n, r) {
    for (let o = n; o < r; o++) if (e[o] === t) return o;
    return -1;
}
function dw(t, e, n, r, o) {
    return Ql(this.multi, []);
}
function fw(t, e, n, r, o) {
    let i = this.multi,
        s;
    if (this.providerFactory) {
        let a = this.providerFactory.componentProviders,
            l = br(r, r[_], this.providerFactory.index, o);
        ((s = l.slice(0, a)), Ql(i, s));
        for (let c = a; c < l.length; c++) s.push(l[c]);
    } else ((s = []), Ql(i, s));
    return s;
}
function Ql(t, e) {
    for (let n = 0; n < t.length; n++) {
        let r = t[n];
        e.push(r());
    }
    return e;
}
function pw(t, e, n, r, o) {
    let i = new nn(t, n, Vr);
    return (
        (i.multi = []),
        (i.index = e),
        (i.componentProviders = 0),
        im(i, o, r && !n),
        i
    );
}
function hw(t, e = []) {
    return (n) => {
        n.providersResolver = (r, o) => uw(r, o ? o(t) : t, e);
    };
}
function mw(t, e, n) {
    let r = si() + t,
        o = C();
    return o[r] === Ie ? yc(o, r, n ? e.call(n) : e()) : n_(o, r);
}
function gw(t, e, n, r) {
    return yw(C(), si(), t, e, n, r);
}
function sm(t, e) {
    let n = t[e];
    return n === Ie ? void 0 : n;
}
function yw(t, e, n, r, o, i) {
    let s = e + n;
    return Ye(t, s, o) ? yc(t, s + 1, i ? r.call(i, o) : r(o)) : sm(t, s + 1);
}
function vw(t, e, n, r, o, i, s) {
    let a = e + n;
    return r_(t, a, o, i)
        ? yc(t, a + 2, s ? r.call(s, o, i) : r(o, i))
        : sm(t, a + 2);
}
function Ew(t, e) {
    let n = $(),
        r,
        o = t + H;
    n.firstCreatePass
        ? ((r = Iw(e, n.pipeRegistry)),
          (n.data[o] = r),
          r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
        : (r = n.data[o]);
    let i = r.factory || (r.factory = pt(r.type, !0)),
        s,
        a = se(Vr);
    try {
        let l = bi(!1),
            c = i();
        return (bi(l), Na(n, C(), o, c), c);
    } finally {
        se(a);
    }
}
function Iw(t, e) {
    if (e)
        for (let n = e.length - 1; n >= 0; n--) {
            let r = e[n];
            if (t === r.name) return r;
        }
}
function _w(t, e, n, r) {
    let o = t + H,
        i = C(),
        s = Sa(i, o);
    return Dw(i, o) ? vw(i, si(), e, s.transform, n, r, s) : s.transform(n, r);
}
function Dw(t, e) {
    return t[_].data[e].pure;
}
function ww(t, e) {
    return Yi(t, e);
}
var Ui = class {
        ngModuleFactory;
        componentFactories;
        constructor(e, n) {
            ((this.ngModuleFactory = e), (this.componentFactories = n));
        }
    },
    Tw = (() => {
        class t {
            compileModuleSync(n) {
                return new Fi(n);
            }
            compileModuleAsync(n) {
                return Promise.resolve(this.compileModuleSync(n));
            }
            compileModuleAndAllComponentsSync(n) {
                let r = this.compileModuleSync(n),
                    o = ya(n),
                    i = Mp(o.declarations).reduce((s, a) => {
                        let l = We(a);
                        return (l && s.push(new Dt(l)), s);
                    }, []);
                return new Ui(r, i);
            }
            compileModuleAndAllComponentsAsync(n) {
                return Promise.resolve(
                    this.compileModuleAndAllComponentsSync(n),
                );
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
            static ɵfac = function (r) {
                return new (r || t)();
            };
            static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })();
var bw = (() => {
        class t {
            zone = x(ue);
            changeDetectionScheduler = x(nt);
            applicationRef = x(Br);
            applicationErrorHandler = x(ot);
            _onMicrotaskEmptySubscription;
            initialize() {
                this._onMicrotaskEmptySubscription ||
                    (this._onMicrotaskEmptySubscription =
                        this.zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this.changeDetectionScheduler.runningTick ||
                                    this.zone.run(() => {
                                        try {
                                            ((this.applicationRef.dirtyFlags |= 1),
                                                this.applicationRef._tick());
                                        } catch (n) {
                                            this.applicationErrorHandler(n);
                                        }
                                    });
                            },
                        }));
            }
            ngOnDestroy() {
                this._onMicrotaskEmptySubscription?.unsubscribe();
            }
            static ɵfac = function (r) {
                return new (r || t)();
            };
            static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
        }
        return t;
    })(),
    am = new P("", { factory: () => !1 });
function Oc({
    ngZoneFactory: t,
    ignoreChangesOutsideZone: e,
    scheduleInRootZone: n,
}) {
    return (
        (t ??= () => new ue(ye(ee({}, kc()), { scheduleInRootZone: n }))),
        [
            { provide: ue, useFactory: t },
            {
                provide: zt,
                multi: !0,
                useFactory: () => {
                    let r = x(bw, { optional: !0 });
                    return () => r.initialize();
                },
            },
            {
                provide: zt,
                multi: !0,
                useFactory: () => {
                    let r = x(Sw);
                    return () => {
                        r.initialize();
                    };
                },
            },
            e === !0 ? { provide: Za, useValue: !0 } : [],
            { provide: Ya, useValue: n ?? bh },
            {
                provide: ot,
                useFactory: () => {
                    let r = x(ue),
                        o = x(we),
                        i;
                    return (s) => {
                        r.runOutsideAngular(() => {
                            o.destroyed && !i
                                ? setTimeout(() => {
                                      throw s;
                                  })
                                : ((i ??= o.get(gt)), i.handleError(s));
                        });
                    };
                },
            },
        ]
    );
}
function Cw(t) {
    let e = t?.ignoreChangesOutsideZone,
        n = t?.scheduleInRootZone,
        r = Oc({
            ngZoneFactory: () => {
                let o = kc(t);
                return (
                    (o.scheduleInRootZone = n),
                    o.shouldCoalesceEventChangeDetection &&
                        wt("NgZone_CoalesceEvent"),
                    new ue(o)
                );
            },
            ignoreChangesOutsideZone: e,
            scheduleInRootZone: n,
        });
    return ei([
        { provide: am, useValue: !0 },
        { provide: _r, useValue: !1 },
        r,
    ]);
}
function kc(t) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
    };
}
var Sw = (() => {
    class t {
        subscription = new U();
        initialized = !1;
        zone = x(ue);
        pendingTasks = x(Xt);
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            (!this.zone.isStable &&
                !this.zone.hasPendingMacrotasks &&
                !this.zone.hasPendingMicrotasks &&
                (n = this.pendingTasks.add()),
                this.zone.runOutsideAngular(() => {
                    this.subscription.add(
                        this.zone.onStable.subscribe(() => {
                            (ue.assertNotInAngularZone(),
                                queueMicrotask(() => {
                                    n !== null &&
                                        !this.zone.hasPendingMacrotasks &&
                                        !this.zone.hasPendingMicrotasks &&
                                        (this.pendingTasks.remove(n),
                                        (n = null));
                                }));
                        }),
                    );
                }),
                this.subscription.add(
                    this.zone.onUnstable.subscribe(() => {
                        (ue.assertInAngularZone(),
                            (n ??= this.pendingTasks.add()));
                    }),
                ));
        }
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
        static ɵfac = function (r) {
            return new (r || t)();
        };
        static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
var lm = (() => {
    class t {
        applicationErrorHandler = x(ot);
        appRef = x(Br);
        taskService = x(Xt);
        ngZone = x(ue);
        zonelessEnabled = x(_r);
        tracing = x(Hr, { optional: !0 });
        disableScheduling = x(Za, { optional: !0 }) ?? !1;
        zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
        schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
        subscriptions = new U();
        angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Li) : null;
        scheduleInRootZone =
            !this.zonelessEnabled &&
            this.zoneIsDefined &&
            (x(Ya, { optional: !0 }) ?? !1);
        cancelScheduledCallback = null;
        useMicrotaskScheduler = !1;
        runningTick = !1;
        pendingRenderTaskId = null;
        constructor() {
            (this.subscriptions.add(
                this.appRef.afterTick.subscribe(() => {
                    this.runningTick || this.cleanup();
                }),
            ),
                this.subscriptions.add(
                    this.ngZone.onUnstable.subscribe(() => {
                        this.runningTick || this.cleanup();
                    }),
                ),
                (this.disableScheduling ||=
                    !this.zonelessEnabled &&
                    (this.ngZone instanceof ji || !this.zoneIsDefined)));
        }
        notify(n) {
            if (!this.zonelessEnabled && n === 5) return;
            let r = !1;
            switch (n) {
                case 0: {
                    this.appRef.dirtyFlags |= 2;
                    break;
                }
                case 3:
                case 2:
                case 4:
                case 5:
                case 1: {
                    this.appRef.dirtyFlags |= 4;
                    break;
                }
                case 6: {
                    ((this.appRef.dirtyFlags |= 2), (r = !0));
                    break;
                }
                case 12: {
                    ((this.appRef.dirtyFlags |= 16), (r = !0));
                    break;
                }
                case 13: {
                    ((this.appRef.dirtyFlags |= 2), (r = !0));
                    break;
                }
                case 11: {
                    r = !0;
                    break;
                }
                case 9:
                case 8:
                case 7:
                case 10:
                default:
                    this.appRef.dirtyFlags |= 8;
            }
            if (
                ((this.appRef.tracingSnapshot =
                    this.tracing?.snapshot(this.appRef.tracingSnapshot) ??
                    null),
                !this.shouldScheduleTick(r))
            )
                return;
            let o = this.useMicrotaskScheduler ? kf : Ch;
            ((this.pendingRenderTaskId = this.taskService.add()),
                this.scheduleInRootZone
                    ? (this.cancelScheduledCallback = Zone.root.run(() =>
                          o(() => this.tick()),
                      ))
                    : (this.cancelScheduledCallback =
                          this.ngZone.runOutsideAngular(() =>
                              o(() => this.tick()),
                          )));
        }
        shouldScheduleTick(n) {
            return !(
                (this.disableScheduling && !n) ||
                this.appRef.destroyed ||
                this.pendingRenderTaskId !== null ||
                this.runningTick ||
                this.appRef._runningTick ||
                (!this.zonelessEnabled &&
                    this.zoneIsDefined &&
                    Zone.current.get(Li + this.angularZoneId))
            );
        }
        tick() {
            if (this.runningTick || this.appRef.destroyed) return;
            if (this.appRef.dirtyFlags === 0) {
                this.cleanup();
                return;
            }
            !this.zonelessEnabled &&
                this.appRef.dirtyFlags & 7 &&
                (this.appRef.dirtyFlags |= 1);
            let n = this.taskService.add();
            try {
                this.ngZone.run(
                    () => {
                        ((this.runningTick = !0), this.appRef._tick());
                    },
                    void 0,
                    this.schedulerTickApplyArgs,
                );
            } catch (r) {
                (this.taskService.remove(n), this.applicationErrorHandler(r));
            } finally {
                this.cleanup();
            }
            ((this.useMicrotaskScheduler = !0),
                kf(() => {
                    ((this.useMicrotaskScheduler = !1),
                        this.taskService.remove(n));
                }));
        }
        ngOnDestroy() {
            (this.subscriptions.unsubscribe(), this.cleanup());
        }
        cleanup() {
            if (
                ((this.runningTick = !1),
                this.cancelScheduledCallback?.(),
                (this.cancelScheduledCallback = null),
                this.pendingRenderTaskId !== null)
            ) {
                let n = this.pendingRenderTaskId;
                ((this.pendingRenderTaskId = null), this.taskService.remove(n));
            }
        }
        static ɵfac = function (r) {
            return new (r || t)();
        };
        static ɵprov = z({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
})();
function Nw() {
    return (typeof $localize < "u" && $localize.locale) || $r;
}
var Pc = new P("", {
    providedIn: "root",
    factory: () => x(Pc, { optional: !0, skipSelf: !0 }) || Nw(),
});
function Mw(t) {
    return pd(t);
}
function xw(t, e) {
    return po(t, e?.equal);
}
var cm = class {
    [oe];
    constructor(e) {
        this[oe] = e;
    }
    destroy() {
        this[oe].destroy();
    }
};
var fm = Symbol("InputSignalNode#UNSET"),
    Rw = ye(ee({}, ho), {
        transformFn: void 0,
        applyValueToInputSignal(t, e) {
            dn(t, e);
        },
    });
function pm(t, e) {
    let n = Object.create(Rw);
    ((n.value = t), (n.transformFn = e?.transform));
    function r() {
        if ((cn(n), n.value === fm)) {
            let o = null;
            throw new y(-950, o);
        }
        return n.value;
    }
    return ((r[oe] = n), r);
}
var um = class {
        attributeName;
        constructor(e) {
            this.attributeName = e;
        }
        __NG_ELEMENT_ID__ = () => sp(this.attributeName);
        toString() {
            return `HostAttributeToken ${this.attributeName}`;
        }
    },
    Ow = new P("");
Ow.__NG_ELEMENT_ID__ = (t) => {
    let e = K();
    if (e === null) throw new y(204, !1);
    if (e.type & 2) return e.value;
    if (t & 8) return null;
    throw new y(204, !1);
};
function dm(t, e) {
    return pm(t, e);
}
function kw(t) {
    return pm(fm, t);
}
var mj = ((dm.required = kw), dm);
var Fc = new P(""),
    Pw = new P("");
function Ur(t) {
    return !t.moduleRef;
}
function Fw(t) {
    let e = Ur(t) ? t.r3Injector : t.moduleRef.injector,
        n = e.get(ue);
    return n.run(() => {
        Ur(t)
            ? t.r3Injector.resolveInjectorInitializers()
            : t.moduleRef.resolveInjectorInitializers();
        let r = e.get(ot),
            o;
        if (
            (n.runOutsideAngular(() => {
                o = n.onError.subscribe({ next: r });
            }),
            Ur(t))
        ) {
            let i = () => e.destroy(),
                s = t.platformInjector.get(Fc);
            (s.add(i),
                e.onDestroy(() => {
                    (o.unsubscribe(), s.delete(i));
                }));
        } else {
            let i = () => t.moduleRef.destroy(),
                s = t.platformInjector.get(Fc);
            (s.add(i),
                t.moduleRef.onDestroy(() => {
                    (Tr(t.allPlatformModules, t.moduleRef),
                        o.unsubscribe(),
                        s.delete(i));
                }));
        }
        return jw(r, n, () => {
            let i = e.get(Tc);
            return (
                i.runInitializers(),
                i.donePromise.then(() => {
                    let s = e.get(Pc, $r);
                    if (($h(s || $r), !e.get(Pw, !0)))
                        return Ur(t)
                            ? e.get(Br)
                            : (t.allPlatformModules.push(t.moduleRef),
                              t.moduleRef);
                    if (Ur(t)) {
                        let l = e.get(Br);
                        return (
                            t.rootComponent !== void 0 &&
                                l.bootstrap(t.rootComponent),
                            l
                        );
                    } else
                        return (
                            Lw?.(t.moduleRef, t.allPlatformModules),
                            t.moduleRef
                        );
                })
            );
        });
    });
}
var Lw;
function jw(t, e, n) {
    try {
        let r = n();
        return Dc(r)
            ? r.catch((o) => {
                  throw (e.runOutsideAngular(() => t(o)), o);
              })
            : r;
    } catch (r) {
        throw (e.runOutsideAngular(() => t(r)), r);
    }
}
var ts = null;
function Vw(t = [], e) {
    return mt.create({
        name: e,
        providers: [
            { provide: Ia, useValue: "platform" },
            { provide: Fc, useValue: new Set([() => (ts = null)]) },
            ...t,
        ],
    });
}
function Hw(t = []) {
    if (ts) return ts;
    let e = Vw(t);
    return ((ts = e), Oh(), Bw(e), e);
}
function Bw(t) {
    let e = t.get(pp, null);
    ti(t, () => {
        e?.forEach((n) => n());
    });
}
function gj() {
    return !1;
}
var yj = (() => {
    class t {
        static __NG_ELEMENT_ID__ = $w;
    }
    return t;
})();
function $w(t) {
    return Uw(K(), C(), (t & 16) === 16);
}
function Uw(t, e, n) {
    if (Et(t) && !n) {
        let r = Ce(t.index, e);
        return new _t(r, r);
    } else if (t.type & 175) {
        let r = e[ce];
        return new _t(r, e);
    }
    return null;
}
function vj(t) {
    L(8);
    try {
        let { rootComponent: e, appProviders: n, platformProviders: r } = t,
            o = Hw(r),
            i = [Oc({}), { provide: nt, useExisting: lm }, rf, ...(n || [])],
            s = new xr({
                providers: i,
                parent: o,
                debugName: "",
                runEnvironmentInitializers: !1,
            });
        return Fw({
            r3Injector: s.injector,
            platformInjector: o,
            rootComponent: e,
        });
    } catch (e) {
        return Promise.reject(e);
    } finally {
        L(9);
    }
}
function Ej(t) {
    return typeof t == "boolean" ? t : t != null && t !== "false";
}
function Ij(t, e = NaN) {
    return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e;
}
function _j(t, e) {
    let n = We(t),
        r = e.elementInjector || Tn();
    return new Dt(n).create(
        r,
        e.projectableNodes,
        e.hostElement,
        e.environmentInjector,
        e.directives,
        e.bindings,
    );
}
function Dj(t) {
    let e = We(t);
    if (!e) return null;
    let n = new Dt(e);
    return {
        get selector() {
            return n.selector;
        },
        get type() {
            return n.componentType;
        },
        get inputs() {
            return n.inputs;
        },
        get outputs() {
            return n.outputs;
        },
        get ngContentSelectors() {
            return n.ngContentSelectors;
        },
        get isStandalone() {
            return e.standalone;
        },
        get isSignal() {
            return e.signals;
        },
    };
}
var M = (function (t) {
        return (
            (t[(t.State = 0)] = "State"),
            (t[(t.Transition = 1)] = "Transition"),
            (t[(t.Sequence = 2)] = "Sequence"),
            (t[(t.Group = 3)] = "Group"),
            (t[(t.Animate = 4)] = "Animate"),
            (t[(t.Keyframes = 5)] = "Keyframes"),
            (t[(t.Style = 6)] = "Style"),
            (t[(t.Trigger = 7)] = "Trigger"),
            (t[(t.Reference = 8)] = "Reference"),
            (t[(t.AnimateChild = 9)] = "AnimateChild"),
            (t[(t.AnimateRef = 10)] = "AnimateRef"),
            (t[(t.Query = 11)] = "Query"),
            (t[(t.Stagger = 12)] = "Stagger"),
            t
        );
    })(M || {}),
    Fe = "*";
function Sj(t, e) {
    return { type: M.Trigger, name: t, definitions: e, options: {} };
}
function Nj(t, e = null) {
    return { type: M.Animate, styles: e, timings: t };
}
function hm(t, e = null) {
    return { type: M.Sequence, steps: t, options: e };
}
function Lc(t) {
    return { type: M.Style, styles: t, offset: null };
}
function Mj(t, e, n) {
    return { type: M.State, name: t, styles: e, options: n };
}
function xj(t, e, n = null) {
    return { type: M.Transition, expr: t, animation: e, options: n };
}
function Aj(t, e, n = null) {
    return { type: M.Query, selector: t, animation: e, options: n };
}
function Rj(t, e) {
    return { type: M.Stagger, timings: t, animation: e };
}
var lt = class {
        _onDoneFns = [];
        _onStartFns = [];
        _onDestroyFns = [];
        _originalOnDoneFns = [];
        _originalOnStartFns = [];
        _started = !1;
        _destroyed = !1;
        _finished = !1;
        _position = 0;
        parentPlayer = null;
        totalTime;
        constructor(e = 0, n = 0) {
            this.totalTime = e + n;
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        onStart(e) {
            (this._originalOnStartFns.push(e), this._onStartFns.push(e));
        }
        onDone(e) {
            (this._originalOnDoneFns.push(e), this._onDoneFns.push(e));
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        init() {}
        play() {
            (this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                (this._started = !0));
        }
        triggerMicrotask() {
            queueMicrotask(() => this._onFinish());
        }
        _onStart() {
            (this._onStartFns.forEach((e) => e()), (this._onStartFns = []));
        }
        pause() {}
        restart() {}
        finish() {
            this._onFinish();
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this.hasStarted() || this._onStart(),
                this.finish(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            ((this._started = !1),
                (this._finished = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns));
        }
        setPosition(e) {
            this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
            return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
            let n = e == "start" ? this._onStartFns : this._onDoneFns;
            (n.forEach((r) => r()), (n.length = 0));
        }
    },
    zn = class {
        _onDoneFns = [];
        _onStartFns = [];
        _finished = !1;
        _started = !1;
        _destroyed = !1;
        _onDestroyFns = [];
        parentPlayer = null;
        totalTime = 0;
        players;
        constructor(e) {
            this.players = e;
            let n = 0,
                r = 0,
                o = 0,
                i = this.players.length;
            (i == 0
                ? queueMicrotask(() => this._onFinish())
                : this.players.forEach((s) => {
                      (s.onDone(() => {
                          ++n == i && this._onFinish();
                      }),
                          s.onDestroy(() => {
                              ++r == i && this._onDestroy();
                          }),
                          s.onStart(() => {
                              ++o == i && this._onStart();
                          }));
                  }),
                (this.totalTime = this.players.reduce(
                    (s, a) => Math.max(s, a.totalTime),
                    0,
                )));
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            this.players.forEach((e) => e.init());
        }
        onStart(e) {
            this._onStartFns.push(e);
        }
        _onStart() {
            this.hasStarted() ||
                ((this._started = !0),
                this._onStartFns.forEach((e) => e()),
                (this._onStartFns = []));
        }
        onDone(e) {
            this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        play() {
            (this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach((e) => e.play()));
        }
        pause() {
            this.players.forEach((e) => e.pause());
        }
        restart() {
            this.players.forEach((e) => e.restart());
        }
        finish() {
            (this._onFinish(), this.players.forEach((e) => e.finish()));
        }
        destroy() {
            this._onDestroy();
        }
        _onDestroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._onFinish(),
                this.players.forEach((e) => e.destroy()),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            (this.players.forEach((e) => e.reset()),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1));
        }
        setPosition(e) {
            let n = e * this.totalTime;
            this.players.forEach((r) => {
                let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
                r.setPosition(o);
            });
        }
        getPosition() {
            let e = this.players.reduce(
                (n, r) => (n === null || r.totalTime > n.totalTime ? r : n),
                null,
            );
            return e != null ? e.getPosition() : 0;
        }
        beforeDestroy() {
            this.players.forEach((e) => {
                e.beforeDestroy && e.beforeDestroy();
            });
        }
        triggerCallback(e) {
            let n = e == "start" ? this._onStartFns : this._onDoneFns;
            (n.forEach((r) => r()), (n.length = 0));
        }
    },
    qr = "!";
function mm(t) {
    return new y(3e3, !1);
}
function zw() {
    return new y(3100, !1);
}
function Ww() {
    return new y(3101, !1);
}
function Gw(t) {
    return new y(3001, !1);
}
function Qw(t) {
    return new y(3003, !1);
}
function Kw(t) {
    return new y(3004, !1);
}
function ym(t, e) {
    return new y(3005, !1);
}
function vm() {
    return new y(3006, !1);
}
function Em() {
    return new y(3007, !1);
}
function Im(t, e) {
    return new y(3008, !1);
}
function _m(t) {
    return new y(3002, !1);
}
function Dm(t, e, n, r, o) {
    return new y(3010, !1);
}
function wm() {
    return new y(3011, !1);
}
function Tm() {
    return new y(3012, !1);
}
function bm() {
    return new y(3200, !1);
}
function Cm() {
    return new y(3202, !1);
}
function Sm() {
    return new y(3013, !1);
}
function Nm(t) {
    return new y(3014, !1);
}
function Mm(t) {
    return new y(3015, !1);
}
function xm(t) {
    return new y(3016, !1);
}
function Am(t) {
    return new y(3500, !1);
}
function Rm(t) {
    return new y(3501, !1);
}
function Om(t, e) {
    return new y(3404, !1);
}
function Zw(t) {
    return new y(3502, !1);
}
function km(t) {
    return new y(3503, !1);
}
function Pm() {
    return new y(3300, !1);
}
function Fm(t) {
    return new y(3504, !1);
}
function Lm(t) {
    return new y(3301, !1);
}
function jm(t, e) {
    return new y(3302, !1);
}
function Vm(t) {
    return new y(3303, !1);
}
function Hm(t, e) {
    return new y(3400, !1);
}
function Bm(t) {
    return new y(3401, !1);
}
function $m(t) {
    return new y(3402, !1);
}
function Um(t, e) {
    return new y(3505, !1);
}
var Yw = new Set([
    "-moz-outline-radius",
    "-moz-outline-radius-bottomleft",
    "-moz-outline-radius-bottomright",
    "-moz-outline-radius-topleft",
    "-moz-outline-radius-topright",
    "-ms-grid-columns",
    "-ms-grid-rows",
    "-webkit-line-clamp",
    "-webkit-text-fill-color",
    "-webkit-text-stroke",
    "-webkit-text-stroke-color",
    "accent-color",
    "all",
    "backdrop-filter",
    "background",
    "background-color",
    "background-position",
    "background-size",
    "block-size",
    "border",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-width",
    "border-color",
    "border-end-end-radius",
    "border-end-start-radius",
    "border-image-outset",
    "border-image-slice",
    "border-image-width",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-width",
    "border-left",
    "border-left-color",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-width",
    "border-start-end-radius",
    "border-start-start-radius",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-width",
    "border-width",
    "bottom",
    "box-shadow",
    "caret-color",
    "clip",
    "clip-path",
    "color",
    "column-count",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-width",
    "column-width",
    "columns",
    "filter",
    "flex",
    "flex-basis",
    "flex-grow",
    "flex-shrink",
    "font",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-variation-settings",
    "font-weight",
    "gap",
    "grid-column-gap",
    "grid-gap",
    "grid-row-gap",
    "grid-template-columns",
    "grid-template-rows",
    "height",
    "inline-size",
    "input-security",
    "inset",
    "inset-block",
    "inset-block-end",
    "inset-block-start",
    "inset-inline",
    "inset-inline-end",
    "inset-inline-start",
    "left",
    "letter-spacing",
    "line-clamp",
    "line-height",
    "margin",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "mask",
    "mask-border",
    "mask-position",
    "mask-size",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-lines",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "object-position",
    "offset",
    "offset-anchor",
    "offset-distance",
    "offset-path",
    "offset-position",
    "offset-rotate",
    "opacity",
    "order",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-width",
    "padding",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "perspective",
    "perspective-origin",
    "right",
    "rotate",
    "row-gap",
    "scale",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-coordinate",
    "scroll-snap-destination",
    "scrollbar-color",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "tab-size",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-thickness",
    "text-emphasis",
    "text-emphasis-color",
    "text-indent",
    "text-shadow",
    "text-underline-offset",
    "top",
    "transform",
    "transform-origin",
    "translate",
    "vertical-align",
    "visibility",
    "width",
    "word-spacing",
    "z-index",
    "zoom",
]);
function ct(t) {
    switch (t.length) {
        case 0:
            return new lt();
        case 1:
            return t[0];
        default:
            return new zn(t);
    }
}
function Bc(t, e, n = new Map(), r = new Map()) {
    let o = [],
        i = [],
        s = -1,
        a = null;
    if (
        (e.forEach((l) => {
            let c = l.get("offset"),
                u = c == s,
                d = (u && a) || new Map();
            (l.forEach((p, f) => {
                let h = f,
                    m = p;
                if (f !== "offset")
                    switch (((h = t.normalizePropertyName(h, o)), m)) {
                        case qr:
                            m = n.get(f);
                            break;
                        case Fe:
                            m = r.get(f);
                            break;
                        default:
                            m = t.normalizeStyleValue(f, h, m, o);
                            break;
                    }
                d.set(h, m);
            }),
                u || i.push(d),
                (a = d),
                (s = c));
        }),
        o.length)
    )
        throw Zw(o);
    return i;
}
function ns(t, e, n, r) {
    switch (e) {
        case "start":
            t.onStart(() => r(n && jc(n, "start", t)));
            break;
        case "done":
            t.onDone(() => r(n && jc(n, "done", t)));
            break;
        case "destroy":
            t.onDestroy(() => r(n && jc(n, "destroy", t)));
            break;
    }
}
function jc(t, e, n) {
    let r = n.totalTime,
        o = !!n.disabled,
        i = rs(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            r ?? t.totalTime,
            o,
        ),
        s = t._data;
    return (s != null && (i._data = s), i);
}
function rs(t, e, n, r, o = "", i = 0, s) {
    return {
        element: t,
        triggerName: e,
        fromState: n,
        toState: r,
        phaseName: o,
        totalTime: i,
        disabled: !!s,
    };
}
function he(t, e, n) {
    let r = t.get(e);
    return (r || t.set(e, (r = n)), r);
}
function $c(t) {
    let e = t.indexOf(":"),
        n = t.substring(1, e),
        r = t.slice(e + 1);
    return [n, r];
}
var Jw = typeof document > "u" ? null : document.documentElement;
function os(t) {
    let e = t.parentNode || t.host || null;
    return e === Jw ? null : e;
}
function Xw(t) {
    return t.substring(1, 6) == "ebkit";
}
var on = null,
    gm = !1;
function qm(t) {
    on ||
        ((on = tT() || {}),
        (gm = on.style ? "WebkitAppearance" in on.style : !1));
    let e = !0;
    return (
        on.style &&
            !Xw(t) &&
            ((e = t in on.style),
            !e &&
                gm &&
                (e =
                    "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in
                    on.style)),
        e
    );
}
function eT(t) {
    return Yw.has(t);
}
function tT() {
    return typeof document < "u" ? document.body : null;
}
function Uc(t, e) {
    for (; e; ) {
        if (e === t) return !0;
        e = os(e);
    }
    return !1;
}
function qc(t, e, n) {
    if (n) return Array.from(t.querySelectorAll(e));
    let r = t.querySelector(e);
    return r ? [r] : [];
}
var nT = 1e3,
    zc = "{{",
    rT = "}}",
    is = "ng-enter",
    zr = "ng-leave",
    Wr = "ng-trigger",
    Gr = ".ng-trigger",
    Wc = "ng-animating",
    ss = ".ng-animating";
function Je(t) {
    if (typeof t == "number") return t;
    let e = t.match(/^(-?[\.\d]+)(m?s)/);
    return !e || e.length < 2 ? 0 : Vc(parseFloat(e[1]), e[2]);
}
function Vc(t, e) {
    switch (e) {
        case "s":
            return t * nT;
        default:
            return t;
    }
}
function Qr(t, e, n) {
    return t.hasOwnProperty("duration") ? t : oT(t, e, n);
}
function oT(t, e, n) {
    let r =
            /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
        o,
        i = 0,
        s = "";
    if (typeof t == "string") {
        let a = t.match(r);
        if (a === null)
            return (e.push(mm(t)), { duration: 0, delay: 0, easing: "" });
        o = Vc(parseFloat(a[1]), a[2]);
        let l = a[3];
        l != null && (i = Vc(parseFloat(l), a[4]));
        let c = a[5];
        c && (s = c);
    } else o = t;
    if (!n) {
        let a = !1,
            l = e.length;
        (o < 0 && (e.push(zw()), (a = !0)),
            i < 0 && (e.push(Ww()), (a = !0)),
            a && e.splice(l, 0, mm(t)));
    }
    return { duration: o, delay: i, easing: s };
}
function zm(t) {
    return t.length
        ? t[0] instanceof Map
            ? t
            : t.map((e) => new Map(Object.entries(e)))
        : [];
}
function Gc(t) {
    return Array.isArray(t) ? new Map(...t) : new Map(t);
}
function Le(t, e, n) {
    e.forEach((r, o) => {
        let i = as(o);
        (n && !n.has(o) && n.set(o, t.style[i]), (t.style[i] = r));
    });
}
function Tt(t, e) {
    e.forEach((n, r) => {
        let o = as(r);
        t.style[o] = "";
    });
}
function Wn(t) {
    return Array.isArray(t) ? (t.length == 1 ? t[0] : hm(t)) : t;
}
function Wm(t, e, n) {
    let r = e.params || {},
        o = Qc(t);
    o.length &&
        o.forEach((i) => {
            r.hasOwnProperty(i) || n.push(Gw(i));
        });
}
var Hc = new RegExp(`${zc}\\s*(.+?)\\s*${rT}`, "g");
function Qc(t) {
    let e = [];
    if (typeof t == "string") {
        let n;
        for (; (n = Hc.exec(t)); ) e.push(n[1]);
        Hc.lastIndex = 0;
    }
    return e;
}
function Gn(t, e, n) {
    let r = `${t}`,
        o = r.replace(Hc, (i, s) => {
            let a = e[s];
            return (a == null && (n.push(Qw(s)), (a = "")), a.toString());
        });
    return o == r ? t : o;
}
var iT = /-+([a-z0-9])/g;
function as(t) {
    return t.replace(iT, (...e) => e[1].toUpperCase());
}
function sT(t) {
    return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Gm(t, e) {
    return t === 0 || e === 0;
}
function Qm(t, e, n) {
    if (n.size && e.length) {
        let r = e[0],
            o = [];
        if (
            (n.forEach((i, s) => {
                (r.has(s) || o.push(s), r.set(s, i));
            }),
            o.length)
        )
            for (let i = 1; i < e.length; i++) {
                let s = e[i];
                o.forEach((a) => s.set(a, ls(t, a)));
            }
    }
    return e;
}
function me(t, e, n) {
    switch (e.type) {
        case M.Trigger:
            return t.visitTrigger(e, n);
        case M.State:
            return t.visitState(e, n);
        case M.Transition:
            return t.visitTransition(e, n);
        case M.Sequence:
            return t.visitSequence(e, n);
        case M.Group:
            return t.visitGroup(e, n);
        case M.Animate:
            return t.visitAnimate(e, n);
        case M.Keyframes:
            return t.visitKeyframes(e, n);
        case M.Style:
            return t.visitStyle(e, n);
        case M.Reference:
            return t.visitReference(e, n);
        case M.AnimateChild:
            return t.visitAnimateChild(e, n);
        case M.AnimateRef:
            return t.visitAnimateRef(e, n);
        case M.Query:
            return t.visitQuery(e, n);
        case M.Stagger:
            return t.visitStagger(e, n);
        default:
            throw Kw(e.type);
    }
}
function ls(t, e) {
    return window.getComputedStyle(t)[e];
}
var lg = (() => {
        class t {
            validateStyleProperty(n) {
                return qm(n);
            }
            containsElement(n, r) {
                return Uc(n, r);
            }
            getParentElement(n) {
                return os(n);
            }
            query(n, r, o) {
                return qc(n, r, o);
            }
            computeStyle(n, r, o) {
                return o || "";
            }
            animate(n, r, o, i, s, a = [], l) {
                return new lt(o, i);
            }
            static ɵfac = function (r) {
                return new (r || t)();
            };
            static ɵprov = z({ token: t, factory: t.ɵfac });
        }
        return t;
    })(),
    Km = class {
        static NOOP = new lg();
    },
    eu = class {},
    tu = class {
        normalizePropertyName(e, n) {
            return e;
        }
        normalizeStyleValue(e, n, r, o) {
            return r;
        }
    },
    aT = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
    ]),
    nu = class extends eu {
        normalizePropertyName(e, n) {
            return as(e);
        }
        normalizeStyleValue(e, n, r, o) {
            let i = "",
                s = r.toString().trim();
            if (aT.has(n) && r !== 0 && r !== "0")
                if (typeof r == "number") i = "px";
                else {
                    let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    a && a[1].length == 0 && o.push(ym(e, r));
                }
            return s + i;
        }
    };
var ps = "*";
function lT(t, e) {
    let n = [];
    return (
        typeof t == "string"
            ? t.split(/\s*,\s*/).forEach((r) => cT(r, n, e))
            : n.push(t),
        n
    );
}
function cT(t, e, n) {
    if (t[0] == ":") {
        let l = uT(t, n);
        if (typeof l == "function") {
            e.push(l);
            return;
        }
        t = l;
    }
    let r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (r == null || r.length < 4) return (n.push(Mm(t)), e);
    let o = r[1],
        i = r[2],
        s = r[3];
    e.push(Zm(o, s));
    let a = o == ps && s == ps;
    i[0] == "<" && !a && e.push(Zm(s, o));
}
function uT(t, e) {
    switch (t) {
        case ":enter":
            return "void => *";
        case ":leave":
            return "* => void";
        case ":increment":
            return (n, r) => parseFloat(r) > parseFloat(n);
        case ":decrement":
            return (n, r) => parseFloat(r) < parseFloat(n);
        default:
            return (e.push(xm(t)), "* => *");
    }
}
var cs = new Set(["true", "1"]),
    us = new Set(["false", "0"]);
function Zm(t, e) {
    let n = cs.has(t) || us.has(t),
        r = cs.has(e) || us.has(e);
    return (o, i) => {
        let s = t == ps || t == o,
            a = e == ps || e == i;
        return (
            !s && n && typeof o == "boolean" && (s = o ? cs.has(t) : us.has(t)),
            !a && r && typeof i == "boolean" && (a = i ? cs.has(e) : us.has(e)),
            s && a
        );
    };
}
var cg = ":self",
    dT = new RegExp(`s*${cg}s*,?`, "g");
function mu(t, e, n, r) {
    return new ru(t).build(e, n, r);
}
var Ym = "",
    ru = class {
        _driver;
        constructor(e) {
            this._driver = e;
        }
        build(e, n, r) {
            let o = new ou(n);
            return (this._resetContextStyleTimingState(o), me(this, Wn(e), o));
        }
        _resetContextStyleTimingState(e) {
            ((e.currentQuerySelector = Ym),
                (e.collectedStyles = new Map()),
                e.collectedStyles.set(Ym, new Map()),
                (e.currentTime = 0));
        }
        visitTrigger(e, n) {
            let r = (n.queryCount = 0),
                o = (n.depCount = 0),
                i = [],
                s = [];
            return (
                e.name.charAt(0) == "@" && n.errors.push(vm()),
                e.definitions.forEach((a) => {
                    if (
                        (this._resetContextStyleTimingState(n),
                        a.type == M.State)
                    ) {
                        let l = a,
                            c = l.name;
                        (c
                            .toString()
                            .split(/\s*,\s*/)
                            .forEach((u) => {
                                ((l.name = u), i.push(this.visitState(l, n)));
                            }),
                            (l.name = c));
                    } else if (a.type == M.Transition) {
                        let l = this.visitTransition(a, n);
                        ((r += l.queryCount), (o += l.depCount), s.push(l));
                    } else n.errors.push(Em());
                }),
                {
                    type: M.Trigger,
                    name: e.name,
                    states: i,
                    transitions: s,
                    queryCount: r,
                    depCount: o,
                    options: null,
                }
            );
        }
        visitState(e, n) {
            let r = this.visitStyle(e.styles, n),
                o = (e.options && e.options.params) || null;
            if (r.containsDynamicStyles) {
                let i = new Set(),
                    s = o || {};
                (r.styles.forEach((a) => {
                    a instanceof Map &&
                        a.forEach((l) => {
                            Qc(l).forEach((c) => {
                                s.hasOwnProperty(c) || i.add(c);
                            });
                        });
                }),
                    i.size && n.errors.push(Im(e.name, [...i.values()])));
            }
            return {
                type: M.State,
                name: e.name,
                style: r,
                options: o ? { params: o } : null,
            };
        }
        visitTransition(e, n) {
            ((n.queryCount = 0), (n.depCount = 0));
            let r = me(this, Wn(e.animation), n),
                o = lT(e.expr, n.errors);
            return {
                type: M.Transition,
                matchers: o,
                animation: r,
                queryCount: n.queryCount,
                depCount: n.depCount,
                options: sn(e.options),
            };
        }
        visitSequence(e, n) {
            return {
                type: M.Sequence,
                steps: e.steps.map((r) => me(this, r, n)),
                options: sn(e.options),
            };
        }
        visitGroup(e, n) {
            let r = n.currentTime,
                o = 0,
                i = e.steps.map((s) => {
                    n.currentTime = r;
                    let a = me(this, s, n);
                    return ((o = Math.max(o, n.currentTime)), a);
                });
            return (
                (n.currentTime = o),
                { type: M.Group, steps: i, options: sn(e.options) }
            );
        }
        visitAnimate(e, n) {
            let r = mT(e.timings, n.errors);
            n.currentAnimateTimings = r;
            let o,
                i = e.styles ? e.styles : Lc({});
            if (i.type == M.Keyframes) o = this.visitKeyframes(i, n);
            else {
                let s = e.styles,
                    a = !1;
                if (!s) {
                    a = !0;
                    let c = {};
                    (r.easing && (c.easing = r.easing), (s = Lc(c)));
                }
                n.currentTime += r.duration + r.delay;
                let l = this.visitStyle(s, n);
                ((l.isEmptyStep = a), (o = l));
            }
            return (
                (n.currentAnimateTimings = null),
                { type: M.Animate, timings: r, style: o, options: null }
            );
        }
        visitStyle(e, n) {
            let r = this._makeStyleAst(e, n);
            return (this._validateStyleAst(r, n), r);
        }
        _makeStyleAst(e, n) {
            let r = [],
                o = Array.isArray(e.styles) ? e.styles : [e.styles];
            for (let a of o)
                typeof a == "string"
                    ? a === Fe
                        ? r.push(a)
                        : n.errors.push(_m(a))
                    : r.push(new Map(Object.entries(a)));
            let i = !1,
                s = null;
            return (
                r.forEach((a) => {
                    if (
                        a instanceof Map &&
                        (a.has("easing") &&
                            ((s = a.get("easing")), a.delete("easing")),
                        !i)
                    ) {
                        for (let l of a.values())
                            if (l.toString().indexOf(zc) >= 0) {
                                i = !0;
                                break;
                            }
                    }
                }),
                {
                    type: M.Style,
                    styles: r,
                    easing: s,
                    offset: e.offset,
                    containsDynamicStyles: i,
                    options: null,
                }
            );
        }
        _validateStyleAst(e, n) {
            let r = n.currentAnimateTimings,
                o = n.currentTime,
                i = n.currentTime;
            (r && i > 0 && (i -= r.duration + r.delay),
                e.styles.forEach((s) => {
                    typeof s != "string" &&
                        s.forEach((a, l) => {
                            let c = n.collectedStyles.get(
                                    n.currentQuerySelector,
                                ),
                                u = c.get(l),
                                d = !0;
                            (u &&
                                (i != o &&
                                    i >= u.startTime &&
                                    o <= u.endTime &&
                                    (n.errors.push(
                                        Dm(l, u.startTime, u.endTime, i, o),
                                    ),
                                    (d = !1)),
                                (i = u.startTime)),
                                d && c.set(l, { startTime: i, endTime: o }),
                                n.options && Wm(a, n.options, n.errors));
                        });
                }));
        }
        visitKeyframes(e, n) {
            let r = { type: M.Keyframes, styles: [], options: null };
            if (!n.currentAnimateTimings) return (n.errors.push(wm()), r);
            let o = 1,
                i = 0,
                s = [],
                a = !1,
                l = !1,
                c = 0,
                u = e.steps.map((g) => {
                    let F = this._makeStyleAst(g, n),
                        ne = F.offset != null ? F.offset : hT(F.styles),
                        X = 0;
                    return (
                        ne != null && (i++, (X = F.offset = ne)),
                        (l = l || X < 0 || X > 1),
                        (a = a || X < c),
                        (c = X),
                        s.push(X),
                        F
                    );
                });
            (l && n.errors.push(Tm()), a && n.errors.push(bm()));
            let d = e.steps.length,
                p = 0;
            i > 0 && i < d ? n.errors.push(Cm()) : i == 0 && (p = o / (d - 1));
            let f = d - 1,
                h = n.currentTime,
                m = n.currentAnimateTimings,
                v = m.duration;
            return (
                u.forEach((g, F) => {
                    let ne = p > 0 ? (F == f ? 1 : p * F) : s[F],
                        X = ne * v;
                    ((n.currentTime = h + m.delay + X),
                        (m.duration = X),
                        this._validateStyleAst(g, n),
                        (g.offset = ne),
                        r.styles.push(g));
                }),
                r
            );
        }
        visitReference(e, n) {
            return {
                type: M.Reference,
                animation: me(this, Wn(e.animation), n),
                options: sn(e.options),
            };
        }
        visitAnimateChild(e, n) {
            return (
                n.depCount++,
                { type: M.AnimateChild, options: sn(e.options) }
            );
        }
        visitAnimateRef(e, n) {
            return {
                type: M.AnimateRef,
                animation: this.visitReference(e.animation, n),
                options: sn(e.options),
            };
        }
        visitQuery(e, n) {
            let r = n.currentQuerySelector,
                o = e.options || {};
            (n.queryCount++, (n.currentQuery = e));
            let [i, s] = fT(e.selector);
            ((n.currentQuerySelector = r.length ? r + " " + i : i),
                he(n.collectedStyles, n.currentQuerySelector, new Map()));
            let a = me(this, Wn(e.animation), n);
            return (
                (n.currentQuery = null),
                (n.currentQuerySelector = r),
                {
                    type: M.Query,
                    selector: i,
                    limit: o.limit || 0,
                    optional: !!o.optional,
                    includeSelf: s,
                    animation: a,
                    originalSelector: e.selector,
                    options: sn(e.options),
                }
            );
        }
        visitStagger(e, n) {
            n.currentQuery || n.errors.push(Sm());
            let r =
                e.timings === "full"
                    ? { duration: 0, delay: 0, easing: "full" }
                    : Qr(e.timings, n.errors, !0);
            return {
                type: M.Stagger,
                animation: me(this, Wn(e.animation), n),
                timings: r,
                options: null,
            };
        }
    };
function fT(t) {
    let e = !!t.split(/\s*,\s*/).find((n) => n == cg);
    return (
        e && (t = t.replace(dT, "")),
        (t = t
            .replace(/@\*/g, Gr)
            .replace(/@\w+/g, (n) => Gr + "-" + n.slice(1))
            .replace(/:animating/g, ss)),
        [t, e]
    );
}
function pT(t) {
    return t ? ee({}, t) : null;
}
var ou = class {
    errors;
    queryCount = 0;
    depCount = 0;
    currentTransition = null;
    currentQuery = null;
    currentQuerySelector = null;
    currentAnimateTimings = null;
    currentTime = 0;
    collectedStyles = new Map();
    options = null;
    unsupportedCSSPropertiesFound = new Set();
    constructor(e) {
        this.errors = e;
    }
};
function hT(t) {
    if (typeof t == "string") return null;
    let e = null;
    if (Array.isArray(t))
        t.forEach((n) => {
            if (n instanceof Map && n.has("offset")) {
                let r = n;
                ((e = parseFloat(r.get("offset"))), r.delete("offset"));
            }
        });
    else if (t instanceof Map && t.has("offset")) {
        let n = t;
        ((e = parseFloat(n.get("offset"))), n.delete("offset"));
    }
    return e;
}
function mT(t, e) {
    if (t.hasOwnProperty("duration")) return t;
    if (typeof t == "number") {
        let i = Qr(t, e).duration;
        return Kc(i, 0, "");
    }
    let n = t;
    if (n.split(/\s+/).some((i) => i.charAt(0) == "{" && i.charAt(1) == "{")) {
        let i = Kc(0, 0, "");
        return ((i.dynamic = !0), (i.strValue = n), i);
    }
    let o = Qr(n, e);
    return Kc(o.duration, o.delay, o.easing);
}
function sn(t) {
    return (
        t ? ((t = ee({}, t)), t.params && (t.params = pT(t.params))) : (t = {}),
        t
    );
}
function Kc(t, e, n) {
    return { duration: t, delay: e, easing: n };
}
function gu(t, e, n, r, o, i, s = null, a = !1) {
    return {
        type: 1,
        element: t,
        keyframes: e,
        preStyleProps: n,
        postStyleProps: r,
        duration: o,
        delay: i,
        totalTime: o + i,
        easing: s,
        subTimeline: a,
    };
}
var Kn = class {
        _map = new Map();
        get(e) {
            return this._map.get(e) || [];
        }
        append(e, n) {
            let r = this._map.get(e);
            (r || this._map.set(e, (r = [])), r.push(...n));
        }
        has(e) {
            return this._map.has(e);
        }
        clear() {
            this._map.clear();
        }
    },
    gT = 1,
    yT = ":enter",
    vT = new RegExp(yT, "g"),
    ET = ":leave",
    IT = new RegExp(ET, "g");
function yu(t, e, n, r, o, i = new Map(), s = new Map(), a, l, c = []) {
    return new iu().buildKeyframes(t, e, n, r, o, i, s, a, l, c);
}
var iu = class {
        buildKeyframes(e, n, r, o, i, s, a, l, c, u = []) {
            c = c || new Kn();
            let d = new su(e, n, c, o, i, u, []);
            d.options = l;
            let p = l.delay ? Je(l.delay) : 0;
            (d.currentTimeline.delayNextStep(p),
                d.currentTimeline.setStyles([s], null, d.errors, l),
                me(this, r, d));
            let f = d.timelines.filter((h) => h.containsAnimation());
            if (f.length && a.size) {
                let h;
                for (let m = f.length - 1; m >= 0; m--) {
                    let v = f[m];
                    if (v.element === n) {
                        h = v;
                        break;
                    }
                }
                h &&
                    !h.allowOnlyTimelineStyles() &&
                    h.setStyles([a], null, d.errors, l);
            }
            return f.length
                ? f.map((h) => h.buildKeyframes())
                : [gu(n, [], [], [], 0, p, "", !1)];
        }
        visitTrigger(e, n) {}
        visitState(e, n) {}
        visitTransition(e, n) {}
        visitAnimateChild(e, n) {
            let r = n.subInstructions.get(n.element);
            if (r) {
                let o = n.createSubContext(e.options),
                    i = n.currentTimeline.currentTime,
                    s = this._visitSubInstructions(r, o, o.options);
                i != s && n.transformIntoNewTimeline(s);
            }
            n.previousNode = e;
        }
        visitAnimateRef(e, n) {
            let r = n.createSubContext(e.options);
            (r.transformIntoNewTimeline(),
                this._applyAnimationRefDelays(
                    [e.options, e.animation.options],
                    n,
                    r,
                ),
                this.visitReference(e.animation, r),
                n.transformIntoNewTimeline(r.currentTimeline.currentTime),
                (n.previousNode = e));
        }
        _applyAnimationRefDelays(e, n, r) {
            for (let o of e) {
                let i = o?.delay;
                if (i) {
                    let s =
                        typeof i == "number"
                            ? i
                            : Je(Gn(i, o?.params ?? {}, n.errors));
                    r.delayNextStep(s);
                }
            }
        }
        _visitSubInstructions(e, n, r) {
            let i = n.currentTimeline.currentTime,
                s = r.duration != null ? Je(r.duration) : null,
                a = r.delay != null ? Je(r.delay) : null;
            return (
                s !== 0 &&
                    e.forEach((l) => {
                        let c = n.appendInstructionToTimeline(l, s, a);
                        i = Math.max(i, c.duration + c.delay);
                    }),
                i
            );
        }
        visitReference(e, n) {
            (n.updateOptions(e.options, !0),
                me(this, e.animation, n),
                (n.previousNode = e));
        }
        visitSequence(e, n) {
            let r = n.subContextCount,
                o = n,
                i = e.options;
            if (
                i &&
                (i.params || i.delay) &&
                ((o = n.createSubContext(i)),
                o.transformIntoNewTimeline(),
                i.delay != null)
            ) {
                o.previousNode.type == M.Style &&
                    (o.currentTimeline.snapshotCurrentStyles(),
                    (o.previousNode = hs));
                let s = Je(i.delay);
                o.delayNextStep(s);
            }
            (e.steps.length &&
                (e.steps.forEach((s) => me(this, s, o)),
                o.currentTimeline.applyStylesToKeyframe(),
                o.subContextCount > r && o.transformIntoNewTimeline()),
                (n.previousNode = e));
        }
        visitGroup(e, n) {
            let r = [],
                o = n.currentTimeline.currentTime,
                i = e.options && e.options.delay ? Je(e.options.delay) : 0;
            (e.steps.forEach((s) => {
                let a = n.createSubContext(e.options);
                (i && a.delayNextStep(i),
                    me(this, s, a),
                    (o = Math.max(o, a.currentTimeline.currentTime)),
                    r.push(a.currentTimeline));
            }),
                r.forEach((s) =>
                    n.currentTimeline.mergeTimelineCollectedStyles(s),
                ),
                n.transformIntoNewTimeline(o),
                (n.previousNode = e));
        }
        _visitTiming(e, n) {
            if (e.dynamic) {
                let r = e.strValue,
                    o = n.params ? Gn(r, n.params, n.errors) : r;
                return Qr(o, n.errors);
            } else
                return {
                    duration: e.duration,
                    delay: e.delay,
                    easing: e.easing,
                };
        }
        visitAnimate(e, n) {
            let r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
                o = n.currentTimeline;
            r.delay && (n.incrementTime(r.delay), o.snapshotCurrentStyles());
            let i = e.style;
            (i.type == M.Keyframes
                ? this.visitKeyframes(i, n)
                : (n.incrementTime(r.duration),
                  this.visitStyle(i, n),
                  o.applyStylesToKeyframe()),
                (n.currentAnimateTimings = null),
                (n.previousNode = e));
        }
        visitStyle(e, n) {
            let r = n.currentTimeline,
                o = n.currentAnimateTimings;
            !o && r.hasCurrentStyleProperties() && r.forwardFrame();
            let i = (o && o.easing) || e.easing;
            (e.isEmptyStep
                ? r.applyEmptyStep(i)
                : r.setStyles(e.styles, i, n.errors, n.options),
                (n.previousNode = e));
        }
        visitKeyframes(e, n) {
            let r = n.currentAnimateTimings,
                o = n.currentTimeline.duration,
                i = r.duration,
                a = n.createSubContext().currentTimeline;
            ((a.easing = r.easing),
                e.styles.forEach((l) => {
                    let c = l.offset || 0;
                    (a.forwardTime(c * i),
                        a.setStyles(l.styles, l.easing, n.errors, n.options),
                        a.applyStylesToKeyframe());
                }),
                n.currentTimeline.mergeTimelineCollectedStyles(a),
                n.transformIntoNewTimeline(o + i),
                (n.previousNode = e));
        }
        visitQuery(e, n) {
            let r = n.currentTimeline.currentTime,
                o = e.options || {},
                i = o.delay ? Je(o.delay) : 0;
            i &&
                (n.previousNode.type === M.Style ||
                    (r == 0 &&
                        n.currentTimeline.hasCurrentStyleProperties())) &&
                (n.currentTimeline.snapshotCurrentStyles(),
                (n.previousNode = hs));
            let s = r,
                a = n.invokeQuery(
                    e.selector,
                    e.originalSelector,
                    e.limit,
                    e.includeSelf,
                    !!o.optional,
                    n.errors,
                );
            n.currentQueryTotal = a.length;
            let l = null;
            (a.forEach((c, u) => {
                n.currentQueryIndex = u;
                let d = n.createSubContext(e.options, c);
                (i && d.delayNextStep(i),
                    c === n.element && (l = d.currentTimeline),
                    me(this, e.animation, d),
                    d.currentTimeline.applyStylesToKeyframe());
                let p = d.currentTimeline.currentTime;
                s = Math.max(s, p);
            }),
                (n.currentQueryIndex = 0),
                (n.currentQueryTotal = 0),
                n.transformIntoNewTimeline(s),
                l &&
                    (n.currentTimeline.mergeTimelineCollectedStyles(l),
                    n.currentTimeline.snapshotCurrentStyles()),
                (n.previousNode = e));
        }
        visitStagger(e, n) {
            let r = n.parentContext,
                o = n.currentTimeline,
                i = e.timings,
                s = Math.abs(i.duration),
                a = s * (n.currentQueryTotal - 1),
                l = s * n.currentQueryIndex;
            switch (i.duration < 0 ? "reverse" : i.easing) {
                case "reverse":
                    l = a - l;
                    break;
                case "full":
                    l = r.currentStaggerTime;
                    break;
            }
            let u = n.currentTimeline;
            l && u.delayNextStep(l);
            let d = u.currentTime;
            (me(this, e.animation, n),
                (n.previousNode = e),
                (r.currentStaggerTime =
                    o.currentTime -
                    d +
                    (o.startTime - r.currentTimeline.startTime)));
        }
    },
    hs = {},
    su = class t {
        _driver;
        element;
        subInstructions;
        _enterClassName;
        _leaveClassName;
        errors;
        timelines;
        parentContext = null;
        currentTimeline;
        currentAnimateTimings = null;
        previousNode = hs;
        subContextCount = 0;
        options = {};
        currentQueryIndex = 0;
        currentQueryTotal = 0;
        currentStaggerTime = 0;
        constructor(e, n, r, o, i, s, a, l) {
            ((this._driver = e),
                (this.element = n),
                (this.subInstructions = r),
                (this._enterClassName = o),
                (this._leaveClassName = i),
                (this.errors = s),
                (this.timelines = a),
                (this.currentTimeline = l || new ms(this._driver, n, 0)),
                a.push(this.currentTimeline));
        }
        get params() {
            return this.options.params;
        }
        updateOptions(e, n) {
            if (!e) return;
            let r = e,
                o = this.options;
            (r.duration != null && (o.duration = Je(r.duration)),
                r.delay != null && (o.delay = Je(r.delay)));
            let i = r.params;
            if (i) {
                let s = o.params;
                (s || (s = this.options.params = {}),
                    Object.keys(i).forEach((a) => {
                        (!n || !s.hasOwnProperty(a)) &&
                            (s[a] = Gn(i[a], s, this.errors));
                    }));
            }
        }
        _copyOptions() {
            let e = {};
            if (this.options) {
                let n = this.options.params;
                if (n) {
                    let r = (e.params = {});
                    Object.keys(n).forEach((o) => {
                        r[o] = n[o];
                    });
                }
            }
            return e;
        }
        createSubContext(e = null, n, r) {
            let o = n || this.element,
                i = new t(
                    this._driver,
                    o,
                    this.subInstructions,
                    this._enterClassName,
                    this._leaveClassName,
                    this.errors,
                    this.timelines,
                    this.currentTimeline.fork(o, r || 0),
                );
            return (
                (i.previousNode = this.previousNode),
                (i.currentAnimateTimings = this.currentAnimateTimings),
                (i.options = this._copyOptions()),
                i.updateOptions(e),
                (i.currentQueryIndex = this.currentQueryIndex),
                (i.currentQueryTotal = this.currentQueryTotal),
                (i.parentContext = this),
                this.subContextCount++,
                i
            );
        }
        transformIntoNewTimeline(e) {
            return (
                (this.previousNode = hs),
                (this.currentTimeline = this.currentTimeline.fork(
                    this.element,
                    e,
                )),
                this.timelines.push(this.currentTimeline),
                this.currentTimeline
            );
        }
        appendInstructionToTimeline(e, n, r) {
            let o = {
                    duration: n ?? e.duration,
                    delay:
                        this.currentTimeline.currentTime + (r ?? 0) + e.delay,
                    easing: "",
                },
                i = new au(
                    this._driver,
                    e.element,
                    e.keyframes,
                    e.preStyleProps,
                    e.postStyleProps,
                    o,
                    e.stretchStartingKeyframe,
                );
            return (this.timelines.push(i), o);
        }
        incrementTime(e) {
            this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
            e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, n, r, o, i, s) {
            let a = [];
            if ((o && a.push(this.element), e.length > 0)) {
                ((e = e.replace(vT, "." + this._enterClassName)),
                    (e = e.replace(IT, "." + this._leaveClassName)));
                let l = r != 1,
                    c = this._driver.query(this.element, e, l);
                (r !== 0 &&
                    (c =
                        r < 0
                            ? c.slice(c.length + r, c.length)
                            : c.slice(0, r)),
                    a.push(...c));
            }
            return (!i && a.length == 0 && s.push(Nm(n)), a);
        }
    },
    ms = class t {
        _driver;
        element;
        startTime;
        _elementTimelineStylesLookup;
        duration = 0;
        easing = null;
        _previousKeyframe = new Map();
        _currentKeyframe = new Map();
        _keyframes = new Map();
        _styleSummary = new Map();
        _localTimelineStyles = new Map();
        _globalTimelineStyles;
        _pendingStyles = new Map();
        _backFill = new Map();
        _currentEmptyStepKeyframe = null;
        constructor(e, n, r, o) {
            ((this._driver = e),
                (this.element = n),
                (this.startTime = r),
                (this._elementTimelineStylesLookup = o),
                this._elementTimelineStylesLookup ||
                    (this._elementTimelineStylesLookup = new Map()),
                (this._globalTimelineStyles =
                    this._elementTimelineStylesLookup.get(n)),
                this._globalTimelineStyles ||
                    ((this._globalTimelineStyles = this._localTimelineStyles),
                    this._elementTimelineStylesLookup.set(
                        n,
                        this._localTimelineStyles,
                    )),
                this._loadKeyframe());
        }
        containsAnimation() {
            switch (this._keyframes.size) {
                case 0:
                    return !1;
                case 1:
                    return this.hasCurrentStyleProperties();
                default:
                    return !0;
            }
        }
        hasCurrentStyleProperties() {
            return this._currentKeyframe.size > 0;
        }
        get currentTime() {
            return this.startTime + this.duration;
        }
        delayNextStep(e) {
            let n = this._keyframes.size === 1 && this._pendingStyles.size;
            this.duration || n
                ? (this.forwardTime(this.currentTime + e),
                  n && this.snapshotCurrentStyles())
                : (this.startTime += e);
        }
        fork(e, n) {
            return (
                this.applyStylesToKeyframe(),
                new t(
                    this._driver,
                    e,
                    n || this.currentTime,
                    this._elementTimelineStylesLookup,
                )
            );
        }
        _loadKeyframe() {
            (this._currentKeyframe &&
                (this._previousKeyframe = this._currentKeyframe),
                (this._currentKeyframe = this._keyframes.get(this.duration)),
                this._currentKeyframe ||
                    ((this._currentKeyframe = new Map()),
                    this._keyframes.set(this.duration, this._currentKeyframe)));
        }
        forwardFrame() {
            ((this.duration += gT), this._loadKeyframe());
        }
        forwardTime(e) {
            (this.applyStylesToKeyframe(),
                (this.duration = e),
                this._loadKeyframe());
        }
        _updateStyle(e, n) {
            (this._localTimelineStyles.set(e, n),
                this._globalTimelineStyles.set(e, n),
                this._styleSummary.set(e, {
                    time: this.currentTime,
                    value: n,
                }));
        }
        allowOnlyTimelineStyles() {
            return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
            e && this._previousKeyframe.set("easing", e);
            for (let [n, r] of this._globalTimelineStyles)
                (this._backFill.set(n, r || Fe),
                    this._currentKeyframe.set(n, Fe));
            this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, n, r, o) {
            n && this._previousKeyframe.set("easing", n);
            let i = (o && o.params) || {},
                s = _T(e, this._globalTimelineStyles);
            for (let [a, l] of s) {
                let c = Gn(l, i, r);
                (this._pendingStyles.set(a, c),
                    this._localTimelineStyles.has(a) ||
                        this._backFill.set(
                            a,
                            this._globalTimelineStyles.get(a) ?? Fe,
                        ),
                    this._updateStyle(a, c));
            }
        }
        applyStylesToKeyframe() {
            this._pendingStyles.size != 0 &&
                (this._pendingStyles.forEach((e, n) => {
                    this._currentKeyframe.set(n, e);
                }),
                this._pendingStyles.clear(),
                this._localTimelineStyles.forEach((e, n) => {
                    this._currentKeyframe.has(n) ||
                        this._currentKeyframe.set(n, e);
                }));
        }
        snapshotCurrentStyles() {
            for (let [e, n] of this._localTimelineStyles)
                (this._pendingStyles.set(e, n), this._updateStyle(e, n));
        }
        getFinalKeyframe() {
            return this._keyframes.get(this.duration);
        }
        get properties() {
            let e = [];
            for (let n in this._currentKeyframe) e.push(n);
            return e;
        }
        mergeTimelineCollectedStyles(e) {
            e._styleSummary.forEach((n, r) => {
                let o = this._styleSummary.get(r);
                (!o || n.time > o.time) && this._updateStyle(r, n.value);
            });
        }
        buildKeyframes() {
            this.applyStylesToKeyframe();
            let e = new Set(),
                n = new Set(),
                r = this._keyframes.size === 1 && this.duration === 0,
                o = [];
            this._keyframes.forEach((a, l) => {
                let c = new Map([...this._backFill, ...a]);
                (c.forEach((u, d) => {
                    u === qr ? e.add(d) : u === Fe && n.add(d);
                }),
                    r || c.set("offset", l / this.duration),
                    o.push(c));
            });
            let i = [...e.values()],
                s = [...n.values()];
            if (r) {
                let a = o[0],
                    l = new Map(a);
                (a.set("offset", 0), l.set("offset", 1), (o = [a, l]));
            }
            return gu(
                this.element,
                o,
                i,
                s,
                this.duration,
                this.startTime,
                this.easing,
                !1,
            );
        }
    },
    au = class extends ms {
        keyframes;
        preStyleProps;
        postStyleProps;
        _stretchStartingKeyframe;
        timings;
        constructor(e, n, r, o, i, s, a = !1) {
            (super(e, n, s.delay),
                (this.keyframes = r),
                (this.preStyleProps = o),
                (this.postStyleProps = i),
                (this._stretchStartingKeyframe = a),
                (this.timings = {
                    duration: s.duration,
                    delay: s.delay,
                    easing: s.easing,
                }));
        }
        containsAnimation() {
            return this.keyframes.length > 1;
        }
        buildKeyframes() {
            let e = this.keyframes,
                { delay: n, duration: r, easing: o } = this.timings;
            if (this._stretchStartingKeyframe && n) {
                let i = [],
                    s = r + n,
                    a = n / s,
                    l = new Map(e[0]);
                (l.set("offset", 0), i.push(l));
                let c = new Map(e[0]);
                (c.set("offset", Jm(a)), i.push(c));
                let u = e.length - 1;
                for (let d = 1; d <= u; d++) {
                    let p = new Map(e[d]),
                        f = p.get("offset"),
                        h = n + f * r;
                    (p.set("offset", Jm(h / s)), i.push(p));
                }
                ((r = s), (n = 0), (o = ""), (e = i));
            }
            return gu(
                this.element,
                e,
                this.preStyleProps,
                this.postStyleProps,
                r,
                n,
                o,
                !0,
            );
        }
    };
function Jm(t, e = 3) {
    let n = Math.pow(10, e - 1);
    return Math.round(t * n) / n;
}
function _T(t, e) {
    let n = new Map(),
        r;
    return (
        t.forEach((o) => {
            if (o === "*") {
                r ??= e.keys();
                for (let i of r) n.set(i, Fe);
            } else for (let [i, s] of o) n.set(i, s);
        }),
        n
    );
}
function Xm(t, e, n, r, o, i, s, a, l, c, u, d, p) {
    return {
        type: 0,
        element: t,
        triggerName: e,
        isRemovalTransition: o,
        fromState: n,
        fromStyles: i,
        toState: r,
        toStyles: s,
        timelines: a,
        queriedElements: l,
        preStyleProps: c,
        postStyleProps: u,
        totalTime: d,
        errors: p,
    };
}
var Zc = {},
    gs = class {
        _triggerName;
        ast;
        _stateStyles;
        constructor(e, n, r) {
            ((this._triggerName = e), (this.ast = n), (this._stateStyles = r));
        }
        match(e, n, r, o) {
            return DT(this.ast.matchers, e, n, r, o);
        }
        buildStyles(e, n, r) {
            let o = this._stateStyles.get("*");
            return (
                e !== void 0 && (o = this._stateStyles.get(e?.toString()) || o),
                o ? o.buildStyles(n, r) : new Map()
            );
        }
        build(e, n, r, o, i, s, a, l, c, u) {
            let d = [],
                p = (this.ast.options && this.ast.options.params) || Zc,
                f = (a && a.params) || Zc,
                h = this.buildStyles(r, f, d),
                m = (l && l.params) || Zc,
                v = this.buildStyles(o, m, d),
                g = new Set(),
                F = new Map(),
                ne = new Map(),
                X = o === "void",
                an = { params: ug(m, p), delay: this.ast.options?.delay },
                Ve = u
                    ? []
                    : yu(e, n, this.ast.animation, i, s, h, v, an, c, d),
                re = 0;
            return (
                Ve.forEach((de) => {
                    re = Math.max(de.duration + de.delay, re);
                }),
                d.length
                    ? Xm(
                          n,
                          this._triggerName,
                          r,
                          o,
                          X,
                          h,
                          v,
                          [],
                          [],
                          F,
                          ne,
                          re,
                          d,
                      )
                    : (Ve.forEach((de) => {
                          let bt = de.element,
                              ln = he(F, bt, new Set());
                          de.preStyleProps.forEach((Ct) => ln.add(Ct));
                          let vu = he(ne, bt, new Set());
                          (de.postStyleProps.forEach((Ct) => vu.add(Ct)),
                              bt !== n && g.add(bt));
                      }),
                      Xm(
                          n,
                          this._triggerName,
                          r,
                          o,
                          X,
                          h,
                          v,
                          Ve,
                          [...g.values()],
                          F,
                          ne,
                          re,
                      ))
            );
        }
    };
function DT(t, e, n, r, o) {
    return t.some((i) => i(e, n, r, o));
}
function ug(t, e) {
    let n = ee({}, e);
    return (
        Object.entries(t).forEach(([r, o]) => {
            o != null && (n[r] = o);
        }),
        n
    );
}
var lu = class {
    styles;
    defaultParams;
    normalizer;
    constructor(e, n, r) {
        ((this.styles = e), (this.defaultParams = n), (this.normalizer = r));
    }
    buildStyles(e, n) {
        let r = new Map(),
            o = ug(e, this.defaultParams);
        return (
            this.styles.styles.forEach((i) => {
                typeof i != "string" &&
                    i.forEach((s, a) => {
                        s && (s = Gn(s, o, n));
                        let l = this.normalizer.normalizePropertyName(a, n);
                        ((s = this.normalizer.normalizeStyleValue(a, l, s, n)),
                            r.set(a, s));
                    });
            }),
            r
        );
    }
};
function wT(t, e, n) {
    return new cu(t, e, n);
}
var cu = class {
    name;
    ast;
    _normalizer;
    transitionFactories = [];
    fallbackTransition;
    states = new Map();
    constructor(e, n, r) {
        ((this.name = e),
            (this.ast = n),
            (this._normalizer = r),
            n.states.forEach((o) => {
                let i = (o.options && o.options.params) || {};
                this.states.set(o.name, new lu(o.style, i, r));
            }),
            eg(this.states, "true", "1"),
            eg(this.states, "false", "0"),
            n.transitions.forEach((o) => {
                this.transitionFactories.push(new gs(e, o, this.states));
            }),
            (this.fallbackTransition = TT(e, this.states)));
    }
    get containsQueries() {
        return this.ast.queryCount > 0;
    }
    matchTransition(e, n, r, o) {
        return (
            this.transitionFactories.find((s) => s.match(e, n, r, o)) || null
        );
    }
    matchStyles(e, n, r) {
        return this.fallbackTransition.buildStyles(e, n, r);
    }
};
function TT(t, e, n) {
    let r = [(s, a) => !0],
        o = { type: M.Sequence, steps: [], options: null },
        i = {
            type: M.Transition,
            animation: o,
            matchers: r,
            options: null,
            queryCount: 0,
            depCount: 0,
        };
    return new gs(t, i, e);
}
function eg(t, e, n) {
    t.has(e) ? t.has(n) || t.set(n, t.get(e)) : t.has(n) && t.set(e, t.get(n));
}
var bT = new Kn(),
    uu = class {
        bodyNode;
        _driver;
        _normalizer;
        _animations = new Map();
        _playersById = new Map();
        players = [];
        constructor(e, n, r) {
            ((this.bodyNode = e), (this._driver = n), (this._normalizer = r));
        }
        register(e, n) {
            let r = [],
                o = [],
                i = mu(this._driver, n, r, o);
            if (r.length) throw km(r);
            this._animations.set(e, i);
        }
        _buildPlayer(e, n, r) {
            let o = e.element,
                i = Bc(this._normalizer, e.keyframes, n, r);
            return this._driver.animate(
                o,
                i,
                e.duration,
                e.delay,
                e.easing,
                [],
                !0,
            );
        }
        create(e, n, r = {}) {
            let o = [],
                i = this._animations.get(e),
                s,
                a = new Map();
            if (
                (i
                    ? ((s = yu(
                          this._driver,
                          n,
                          i,
                          is,
                          zr,
                          new Map(),
                          new Map(),
                          r,
                          bT,
                          o,
                      )),
                      s.forEach((u) => {
                          let d = he(a, u.element, new Map());
                          u.postStyleProps.forEach((p) => d.set(p, null));
                      }))
                    : (o.push(Pm()), (s = [])),
                o.length)
            )
                throw Fm(o);
            a.forEach((u, d) => {
                u.forEach((p, f) => {
                    u.set(f, this._driver.computeStyle(d, f, Fe));
                });
            });
            let l = s.map((u) => {
                    let d = a.get(u.element);
                    return this._buildPlayer(u, new Map(), d);
                }),
                c = ct(l);
            return (
                this._playersById.set(e, c),
                c.onDestroy(() => this.destroy(e)),
                this.players.push(c),
                c
            );
        }
        destroy(e) {
            let n = this._getPlayer(e);
            (n.destroy(), this._playersById.delete(e));
            let r = this.players.indexOf(n);
            r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
            let n = this._playersById.get(e);
            if (!n) throw Lm(e);
            return n;
        }
        listen(e, n, r, o) {
            let i = rs(n, "", "", "");
            return (ns(this._getPlayer(e), r, i, o), () => {});
        }
        command(e, n, r, o) {
            if (r == "register") {
                this.register(e, o[0]);
                return;
            }
            if (r == "create") {
                let s = o[0] || {};
                this.create(e, n, s);
                return;
            }
            let i = this._getPlayer(e);
            switch (r) {
                case "play":
                    i.play();
                    break;
                case "pause":
                    i.pause();
                    break;
                case "reset":
                    i.reset();
                    break;
                case "restart":
                    i.restart();
                    break;
                case "finish":
                    i.finish();
                    break;
                case "init":
                    i.init();
                    break;
                case "setPosition":
                    i.setPosition(parseFloat(o[0]));
                    break;
                case "destroy":
                    this.destroy(e);
                    break;
            }
        }
    },
    tg = "ng-animate-queued",
    CT = ".ng-animate-queued",
    Yc = "ng-animate-disabled",
    ST = ".ng-animate-disabled",
    NT = "ng-star-inserted",
    MT = ".ng-star-inserted",
    xT = [],
    dg = {
        namespaceId: "",
        setForRemoval: !1,
        setForMove: !1,
        hasAnimation: !1,
        removedBeforeQueried: !1,
    },
    AT = {
        namespaceId: "",
        setForMove: !1,
        setForRemoval: !1,
        hasAnimation: !1,
        removedBeforeQueried: !0,
    },
    je = "__ng_removed",
    Zr = class {
        namespaceId;
        value;
        options;
        get params() {
            return this.options.params;
        }
        constructor(e, n = "") {
            this.namespaceId = n;
            let r = e && e.hasOwnProperty("value"),
                o = r ? e.value : e;
            if (((this.value = OT(o)), r)) {
                let i = e,
                    { value: s } = i,
                    a = Tu(i, ["value"]);
                this.options = a;
            } else this.options = {};
            this.options.params || (this.options.params = {});
        }
        absorbOptions(e) {
            let n = e.params;
            if (n) {
                let r = this.options.params;
                Object.keys(n).forEach((o) => {
                    r[o] == null && (r[o] = n[o]);
                });
            }
        }
    },
    Kr = "void",
    Jc = new Zr(Kr),
    du = class {
        id;
        hostElement;
        _engine;
        players = [];
        _triggers = new Map();
        _queue = [];
        _elementListeners = new Map();
        _hostClassName;
        constructor(e, n, r) {
            ((this.id = e),
                (this.hostElement = n),
                (this._engine = r),
                (this._hostClassName = "ng-tns-" + e),
                Se(n, this._hostClassName));
        }
        listen(e, n, r, o) {
            if (!this._triggers.has(n)) throw jm(r, n);
            if (r == null || r.length == 0) throw Vm(n);
            if (!kT(r)) throw Hm(r, n);
            let i = he(this._elementListeners, e, []),
                s = { name: n, phase: r, callback: o };
            i.push(s);
            let a = he(this._engine.statesByElement, e, new Map());
            return (
                a.has(n) || (Se(e, Wr), Se(e, Wr + "-" + n), a.set(n, Jc)),
                () => {
                    this._engine.afterFlush(() => {
                        let l = i.indexOf(s);
                        (l >= 0 && i.splice(l, 1),
                            this._triggers.has(n) || a.delete(n));
                    });
                }
            );
        }
        register(e, n) {
            return this._triggers.has(e) ? !1 : (this._triggers.set(e, n), !0);
        }
        _getTrigger(e) {
            let n = this._triggers.get(e);
            if (!n) throw Bm(e);
            return n;
        }
        trigger(e, n, r, o = !0) {
            let i = this._getTrigger(n),
                s = new Yr(this.id, n, e),
                a = this._engine.statesByElement.get(e);
            a ||
                (Se(e, Wr),
                Se(e, Wr + "-" + n),
                this._engine.statesByElement.set(e, (a = new Map())));
            let l = a.get(n),
                c = new Zr(r, this.id);
            if (
                (!(r && r.hasOwnProperty("value")) &&
                    l &&
                    c.absorbOptions(l.options),
                a.set(n, c),
                l || (l = Jc),
                !(c.value === Kr) && l.value === c.value)
            ) {
                if (!LT(l.params, c.params)) {
                    let m = [],
                        v = i.matchStyles(l.value, l.params, m),
                        g = i.matchStyles(c.value, c.params, m);
                    m.length
                        ? this._engine.reportError(m)
                        : this._engine.afterFlush(() => {
                              (Tt(e, v), Le(e, g));
                          });
                }
                return;
            }
            let p = he(this._engine.playersByElement, e, []);
            p.forEach((m) => {
                m.namespaceId == this.id &&
                    m.triggerName == n &&
                    m.queued &&
                    m.destroy();
            });
            let f = i.matchTransition(l.value, c.value, e, c.params),
                h = !1;
            if (!f) {
                if (!o) return;
                ((f = i.fallbackTransition), (h = !0));
            }
            return (
                this._engine.totalQueuedPlayers++,
                this._queue.push({
                    element: e,
                    triggerName: n,
                    transition: f,
                    fromState: l,
                    toState: c,
                    player: s,
                    isFallbackTransition: h,
                }),
                h ||
                    (Se(e, tg),
                    s.onStart(() => {
                        Qn(e, tg);
                    })),
                s.onDone(() => {
                    let m = this.players.indexOf(s);
                    m >= 0 && this.players.splice(m, 1);
                    let v = this._engine.playersByElement.get(e);
                    if (v) {
                        let g = v.indexOf(s);
                        g >= 0 && v.splice(g, 1);
                    }
                }),
                this.players.push(s),
                p.push(s),
                s
            );
        }
        deregister(e) {
            (this._triggers.delete(e),
                this._engine.statesByElement.forEach((n) => n.delete(e)),
                this._elementListeners.forEach((n, r) => {
                    this._elementListeners.set(
                        r,
                        n.filter((o) => o.name != e),
                    );
                }));
        }
        clearElementCache(e) {
            (this._engine.statesByElement.delete(e),
                this._elementListeners.delete(e));
            let n = this._engine.playersByElement.get(e);
            n &&
                (n.forEach((r) => r.destroy()),
                this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, n) {
            let r = this._engine.driver.query(e, Gr, !0);
            (r.forEach((o) => {
                if (o[je]) return;
                let i = this._engine.fetchNamespacesByElement(o);
                i.size
                    ? i.forEach((s) => s.triggerLeaveAnimation(o, n, !1, !0))
                    : this.clearElementCache(o);
            }),
                this._engine.afterFlushAnimationsDone(() =>
                    r.forEach((o) => this.clearElementCache(o)),
                ));
        }
        triggerLeaveAnimation(e, n, r, o) {
            let i = this._engine.statesByElement.get(e),
                s = new Map();
            if (i) {
                let a = [];
                if (
                    (i.forEach((l, c) => {
                        if ((s.set(c, l.value), this._triggers.has(c))) {
                            let u = this.trigger(e, c, Kr, o);
                            u && a.push(u);
                        }
                    }),
                    a.length)
                )
                    return (
                        this._engine.markElementAsRemoved(this.id, e, !0, n, s),
                        r &&
                            ct(a).onDone(() =>
                                this._engine.processLeaveNode(e),
                            ),
                        !0
                    );
            }
            return !1;
        }
        prepareLeaveAnimationListeners(e) {
            let n = this._elementListeners.get(e),
                r = this._engine.statesByElement.get(e);
            if (n && r) {
                let o = new Set();
                n.forEach((i) => {
                    let s = i.name;
                    if (o.has(s)) return;
                    o.add(s);
                    let l = this._triggers.get(s).fallbackTransition,
                        c = r.get(s) || Jc,
                        u = new Zr(Kr),
                        d = new Yr(this.id, s, e);
                    (this._engine.totalQueuedPlayers++,
                        this._queue.push({
                            element: e,
                            triggerName: s,
                            transition: l,
                            fromState: c,
                            toState: u,
                            player: d,
                            isFallbackTransition: !0,
                        }));
                });
            }
        }
        removeNode(e, n) {
            let r = this._engine;
            if (
                (e.childElementCount &&
                    this._signalRemovalForInnerTriggers(e, n),
                this.triggerLeaveAnimation(e, n, !0))
            )
                return;
            let o = !1;
            if (r.totalAnimations) {
                let i = r.players.length
                    ? r.playersByQueriedElement.get(e)
                    : [];
                if (i && i.length) o = !0;
                else {
                    let s = e;
                    for (; (s = s.parentNode); )
                        if (r.statesByElement.get(s)) {
                            o = !0;
                            break;
                        }
                }
            }
            if ((this.prepareLeaveAnimationListeners(e), o))
                r.markElementAsRemoved(this.id, e, !1, n);
            else {
                let i = e[je];
                (!i || i === dg) &&
                    (r.afterFlush(() => this.clearElementCache(e)),
                    r.destroyInnerAnimations(e),
                    r._onRemovalComplete(e, n));
            }
        }
        insertNode(e, n) {
            Se(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
            let n = [];
            return (
                this._queue.forEach((r) => {
                    let o = r.player;
                    if (o.destroyed) return;
                    let i = r.element,
                        s = this._elementListeners.get(i);
                    (s &&
                        s.forEach((a) => {
                            if (a.name == r.triggerName) {
                                let l = rs(
                                    i,
                                    r.triggerName,
                                    r.fromState.value,
                                    r.toState.value,
                                );
                                ((l._data = e),
                                    ns(r.player, a.phase, l, a.callback));
                            }
                        }),
                        o.markedForDestroy
                            ? this._engine.afterFlush(() => {
                                  o.destroy();
                              })
                            : n.push(r));
                }),
                (this._queue = []),
                n.sort((r, o) => {
                    let i = r.transition.ast.depCount,
                        s = o.transition.ast.depCount;
                    return i == 0 || s == 0
                        ? i - s
                        : this._engine.driver.containsElement(
                                r.element,
                                o.element,
                            )
                          ? 1
                          : -1;
                })
            );
        }
        destroy(e) {
            (this.players.forEach((n) => n.destroy()),
                this._signalRemovalForInnerTriggers(this.hostElement, e));
        }
    },
    fu = class {
        bodyNode;
        driver;
        _normalizer;
        players = [];
        newHostElements = new Map();
        playersByElement = new Map();
        playersByQueriedElement = new Map();
        statesByElement = new Map();
        disabledNodes = new Set();
        totalAnimations = 0;
        totalQueuedPlayers = 0;
        _namespaceLookup = {};
        _namespaceList = [];
        _flushFns = [];
        _whenQuietFns = [];
        namespacesByHostElement = new Map();
        collectedEnterElements = [];
        collectedLeaveElements = [];
        onRemovalComplete = (e, n) => {};
        _onRemovalComplete(e, n) {
            this.onRemovalComplete(e, n);
        }
        constructor(e, n, r) {
            ((this.bodyNode = e), (this.driver = n), (this._normalizer = r));
        }
        get queuedPlayers() {
            let e = [];
            return (
                this._namespaceList.forEach((n) => {
                    n.players.forEach((r) => {
                        r.queued && e.push(r);
                    });
                }),
                e
            );
        }
        createNamespace(e, n) {
            let r = new du(e, n, this);
            return (
                this.bodyNode && this.driver.containsElement(this.bodyNode, n)
                    ? this._balanceNamespaceList(r, n)
                    : (this.newHostElements.set(n, r),
                      this.collectEnterElement(n)),
                (this._namespaceLookup[e] = r)
            );
        }
        _balanceNamespaceList(e, n) {
            let r = this._namespaceList,
                o = this.namespacesByHostElement;
            if (r.length - 1 >= 0) {
                let s = !1,
                    a = this.driver.getParentElement(n);
                for (; a; ) {
                    let l = o.get(a);
                    if (l) {
                        let c = r.indexOf(l);
                        (r.splice(c + 1, 0, e), (s = !0));
                        break;
                    }
                    a = this.driver.getParentElement(a);
                }
                s || r.unshift(e);
            } else r.push(e);
            return (o.set(n, e), e);
        }
        register(e, n) {
            let r = this._namespaceLookup[e];
            return (r || (r = this.createNamespace(e, n)), r);
        }
        registerTrigger(e, n, r) {
            let o = this._namespaceLookup[e];
            o && o.register(n, r) && this.totalAnimations++;
        }
        destroy(e, n) {
            e &&
                (this.afterFlush(() => {}),
                this.afterFlushAnimationsDone(() => {
                    let r = this._fetchNamespace(e);
                    this.namespacesByHostElement.delete(r.hostElement);
                    let o = this._namespaceList.indexOf(r);
                    (o >= 0 && this._namespaceList.splice(o, 1),
                        r.destroy(n),
                        delete this._namespaceLookup[e]);
                }));
        }
        _fetchNamespace(e) {
            return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
            let n = new Set(),
                r = this.statesByElement.get(e);
            if (r) {
                for (let o of r.values())
                    if (o.namespaceId) {
                        let i = this._fetchNamespace(o.namespaceId);
                        i && n.add(i);
                    }
            }
            return n;
        }
        trigger(e, n, r, o) {
            if (ds(n)) {
                let i = this._fetchNamespace(e);
                if (i) return (i.trigger(n, r, o), !0);
            }
            return !1;
        }
        insertNode(e, n, r, o) {
            if (!ds(n)) return;
            let i = n[je];
            if (i && i.setForRemoval) {
                ((i.setForRemoval = !1), (i.setForMove = !0));
                let s = this.collectedLeaveElements.indexOf(n);
                s >= 0 && this.collectedLeaveElements.splice(s, 1);
            }
            if (e) {
                let s = this._fetchNamespace(e);
                s && s.insertNode(n, r);
            }
            o && this.collectEnterElement(n);
        }
        collectEnterElement(e) {
            this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, n) {
            n
                ? this.disabledNodes.has(e) ||
                  (this.disabledNodes.add(e), Se(e, Yc))
                : this.disabledNodes.has(e) &&
                  (this.disabledNodes.delete(e), Qn(e, Yc));
        }
        removeNode(e, n, r) {
            if (ds(n)) {
                let o = e ? this._fetchNamespace(e) : null;
                o ? o.removeNode(n, r) : this.markElementAsRemoved(e, n, !1, r);
                let i = this.namespacesByHostElement.get(n);
                i && i.id !== e && i.removeNode(n, r);
            } else this._onRemovalComplete(n, r);
        }
        markElementAsRemoved(e, n, r, o, i) {
            (this.collectedLeaveElements.push(n),
                (n[je] = {
                    namespaceId: e,
                    setForRemoval: o,
                    hasAnimation: r,
                    removedBeforeQueried: !1,
                    previousTriggersValues: i,
                }));
        }
        listen(e, n, r, o, i) {
            return ds(n)
                ? this._fetchNamespace(e).listen(n, r, o, i)
                : () => {};
        }
        _buildInstruction(e, n, r, o, i) {
            return e.transition.build(
                this.driver,
                e.element,
                e.fromState.value,
                e.toState.value,
                r,
                o,
                e.fromState.options,
                e.toState.options,
                n,
                i,
            );
        }
        destroyInnerAnimations(e) {
            let n = this.driver.query(e, Gr, !0);
            (n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
                this.playersByQueriedElement.size != 0 &&
                    ((n = this.driver.query(e, ss, !0)),
                    n.forEach((r) =>
                        this.finishActiveQueriedAnimationOnElement(r),
                    )));
        }
        destroyActiveAnimationsForElement(e) {
            let n = this.playersByElement.get(e);
            n &&
                n.forEach((r) => {
                    r.queued ? (r.markedForDestroy = !0) : r.destroy();
                });
        }
        finishActiveQueriedAnimationOnElement(e) {
            let n = this.playersByQueriedElement.get(e);
            n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
            return new Promise((e) => {
                if (this.players.length)
                    return ct(this.players).onDone(() => e());
                e();
            });
        }
        processLeaveNode(e) {
            let n = e[je];
            if (n && n.setForRemoval) {
                if (((e[je] = dg), n.namespaceId)) {
                    this.destroyInnerAnimations(e);
                    let r = this._fetchNamespace(n.namespaceId);
                    r && r.clearElementCache(e);
                }
                this._onRemovalComplete(e, n.setForRemoval);
            }
            (e.classList?.contains(Yc) && this.markElementAsDisabled(e, !1),
                this.driver.query(e, ST, !0).forEach((r) => {
                    this.markElementAsDisabled(r, !1);
                }));
        }
        flush(e = -1) {
            let n = [];
            if (
                (this.newHostElements.size &&
                    (this.newHostElements.forEach((r, o) =>
                        this._balanceNamespaceList(r, o),
                    ),
                    this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
            )
                for (let r = 0; r < this.collectedEnterElements.length; r++) {
                    let o = this.collectedEnterElements[r];
                    Se(o, NT);
                }
            if (
                this._namespaceList.length &&
                (this.totalQueuedPlayers || this.collectedLeaveElements.length)
            ) {
                let r = [];
                try {
                    n = this._flushAnimations(r, e);
                } finally {
                    for (let o = 0; o < r.length; o++) r[o]();
                }
            } else
                for (let r = 0; r < this.collectedLeaveElements.length; r++) {
                    let o = this.collectedLeaveElements[r];
                    this.processLeaveNode(o);
                }
            if (
                ((this.totalQueuedPlayers = 0),
                (this.collectedEnterElements.length = 0),
                (this.collectedLeaveElements.length = 0),
                this._flushFns.forEach((r) => r()),
                (this._flushFns = []),
                this._whenQuietFns.length)
            ) {
                let r = this._whenQuietFns;
                ((this._whenQuietFns = []),
                    n.length
                        ? ct(n).onDone(() => {
                              r.forEach((o) => o());
                          })
                        : r.forEach((o) => o()));
            }
        }
        reportError(e) {
            throw $m(e);
        }
        _flushAnimations(e, n) {
            let r = new Kn(),
                o = [],
                i = new Map(),
                s = [],
                a = new Map(),
                l = new Map(),
                c = new Map(),
                u = new Set();
            this.disabledNodes.forEach((E) => {
                u.add(E);
                let I = this.driver.query(E, CT, !0);
                for (let w = 0; w < I.length; w++) u.add(I[w]);
            });
            let d = this.bodyNode,
                p = Array.from(this.statesByElement.keys()),
                f = og(p, this.collectedEnterElements),
                h = new Map(),
                m = 0;
            f.forEach((E, I) => {
                let w = is + m++;
                (h.set(I, w), E.forEach((O) => Se(O, w)));
            });
            let v = [],
                g = new Set(),
                F = new Set();
            for (let E = 0; E < this.collectedLeaveElements.length; E++) {
                let I = this.collectedLeaveElements[E],
                    w = I[je];
                w &&
                    w.setForRemoval &&
                    (v.push(I),
                    g.add(I),
                    w.hasAnimation
                        ? this.driver.query(I, MT, !0).forEach((O) => g.add(O))
                        : F.add(I));
            }
            let ne = new Map(),
                X = og(p, Array.from(g));
            (X.forEach((E, I) => {
                let w = zr + m++;
                (ne.set(I, w), E.forEach((O) => Se(O, w)));
            }),
                e.push(() => {
                    (f.forEach((E, I) => {
                        let w = h.get(I);
                        E.forEach((O) => Qn(O, w));
                    }),
                        X.forEach((E, I) => {
                            let w = ne.get(I);
                            E.forEach((O) => Qn(O, w));
                        }),
                        v.forEach((E) => {
                            this.processLeaveNode(E);
                        }));
                }));
            let an = [],
                Ve = [];
            for (let E = this._namespaceList.length - 1; E >= 0; E--)
                this._namespaceList[E].drainQueuedTransitions(n).forEach(
                    (w) => {
                        let O = w.player,
                            Y = w.element;
                        if ((an.push(O), this.collectedEnterElements.length)) {
                            let te = Y[je];
                            if (te && te.setForMove) {
                                if (
                                    te.previousTriggersValues &&
                                    te.previousTriggersValues.has(w.triggerName)
                                ) {
                                    let St = te.previousTriggersValues.get(
                                            w.triggerName,
                                        ),
                                        _e = this.statesByElement.get(
                                            w.element,
                                        );
                                    if (_e && _e.has(w.triggerName)) {
                                        let Jr = _e.get(w.triggerName);
                                        ((Jr.value = St),
                                            _e.set(w.triggerName, Jr));
                                    }
                                }
                                O.destroy();
                                return;
                            }
                        }
                        let He = !d || !this.driver.containsElement(d, Y),
                            ge = ne.get(Y),
                            ut = h.get(Y),
                            B = this._buildInstruction(w, r, ut, ge, He);
                        if (B.errors && B.errors.length) {
                            Ve.push(B);
                            return;
                        }
                        if (He) {
                            (O.onStart(() => Tt(Y, B.fromStyles)),
                                O.onDestroy(() => Le(Y, B.toStyles)),
                                o.push(O));
                            return;
                        }
                        if (w.isFallbackTransition) {
                            (O.onStart(() => Tt(Y, B.fromStyles)),
                                O.onDestroy(() => Le(Y, B.toStyles)),
                                o.push(O));
                            return;
                        }
                        let _u = [];
                        (B.timelines.forEach((te) => {
                            ((te.stretchStartingKeyframe = !0),
                                this.disabledNodes.has(te.element) ||
                                    _u.push(te));
                        }),
                            (B.timelines = _u),
                            r.append(Y, B.timelines));
                        let hg = { instruction: B, player: O, element: Y };
                        (s.push(hg),
                            B.queriedElements.forEach((te) =>
                                he(a, te, []).push(O),
                            ),
                            B.preStyleProps.forEach((te, St) => {
                                if (te.size) {
                                    let _e = l.get(St);
                                    (_e || l.set(St, (_e = new Set())),
                                        te.forEach((Jr, _s) => _e.add(_s)));
                                }
                            }),
                            B.postStyleProps.forEach((te, St) => {
                                let _e = c.get(St);
                                (_e || c.set(St, (_e = new Set())),
                                    te.forEach((Jr, _s) => _e.add(_s)));
                            }));
                    },
                );
            if (Ve.length) {
                let E = [];
                (Ve.forEach((I) => {
                    E.push(Um(I.triggerName, I.errors));
                }),
                    an.forEach((I) => I.destroy()),
                    this.reportError(E));
            }
            let re = new Map(),
                de = new Map();
            (s.forEach((E) => {
                let I = E.element;
                r.has(I) &&
                    (de.set(I, I),
                    this._beforeAnimationBuild(
                        E.player.namespaceId,
                        E.instruction,
                        re,
                    ));
            }),
                o.forEach((E) => {
                    let I = E.element;
                    this._getPreviousPlayers(
                        I,
                        !1,
                        E.namespaceId,
                        E.triggerName,
                        null,
                    ).forEach((O) => {
                        (he(re, I, []).push(O), O.destroy());
                    });
                }));
            let bt = v.filter((E) => ig(E, l, c)),
                ln = new Map();
            rg(ln, this.driver, F, c, Fe).forEach((E) => {
                ig(E, l, c) && bt.push(E);
            });
            let Ct = new Map();
            (f.forEach((E, I) => {
                rg(Ct, this.driver, new Set(E), l, qr);
            }),
                bt.forEach((E) => {
                    let I = ln.get(E),
                        w = Ct.get(E);
                    ln.set(
                        E,
                        new Map([
                            ...(I?.entries() ?? []),
                            ...(w?.entries() ?? []),
                        ]),
                    );
                }));
            let Is = [],
                Eu = [],
                Iu = {};
            (s.forEach((E) => {
                let { element: I, player: w, instruction: O } = E;
                if (r.has(I)) {
                    if (u.has(I)) {
                        (w.onDestroy(() => Le(I, O.toStyles)),
                            (w.disabled = !0),
                            w.overrideTotalTime(O.totalTime),
                            o.push(w));
                        return;
                    }
                    let Y = Iu;
                    if (de.size > 1) {
                        let ge = I,
                            ut = [];
                        for (; (ge = ge.parentNode); ) {
                            let B = de.get(ge);
                            if (B) {
                                Y = B;
                                break;
                            }
                            ut.push(ge);
                        }
                        ut.forEach((B) => de.set(B, Y));
                    }
                    let He = this._buildAnimation(
                        w.namespaceId,
                        O,
                        re,
                        i,
                        Ct,
                        ln,
                    );
                    if ((w.setRealPlayer(He), Y === Iu)) Is.push(w);
                    else {
                        let ge = this.playersByElement.get(Y);
                        (ge && ge.length && (w.parentPlayer = ct(ge)),
                            o.push(w));
                    }
                } else
                    (Tt(I, O.fromStyles),
                        w.onDestroy(() => Le(I, O.toStyles)),
                        Eu.push(w),
                        u.has(I) && o.push(w));
            }),
                Eu.forEach((E) => {
                    let I = i.get(E.element);
                    if (I && I.length) {
                        let w = ct(I);
                        E.setRealPlayer(w);
                    }
                }),
                o.forEach((E) => {
                    E.parentPlayer
                        ? E.syncPlayerEvents(E.parentPlayer)
                        : E.destroy();
                }));
            for (let E = 0; E < v.length; E++) {
                let I = v[E],
                    w = I[je];
                if ((Qn(I, zr), w && w.hasAnimation)) continue;
                let O = [];
                if (a.size) {
                    let He = a.get(I);
                    He && He.length && O.push(...He);
                    let ge = this.driver.query(I, ss, !0);
                    for (let ut = 0; ut < ge.length; ut++) {
                        let B = a.get(ge[ut]);
                        B && B.length && O.push(...B);
                    }
                }
                let Y = O.filter((He) => !He.destroyed);
                Y.length ? PT(this, I, Y) : this.processLeaveNode(I);
            }
            return (
                (v.length = 0),
                Is.forEach((E) => {
                    (this.players.push(E),
                        E.onDone(() => {
                            E.destroy();
                            let I = this.players.indexOf(E);
                            this.players.splice(I, 1);
                        }),
                        E.play());
                }),
                Is
            );
        }
        afterFlush(e) {
            this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
            this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, n, r, o, i) {
            let s = [];
            if (n) {
                let a = this.playersByQueriedElement.get(e);
                a && (s = a);
            } else {
                let a = this.playersByElement.get(e);
                if (a) {
                    let l = !i || i == Kr;
                    a.forEach((c) => {
                        c.queued || (!l && c.triggerName != o) || s.push(c);
                    });
                }
            }
            return (
                (r || o) &&
                    (s = s.filter(
                        (a) =>
                            !(
                                (r && r != a.namespaceId) ||
                                (o && o != a.triggerName)
                            ),
                    )),
                s
            );
        }
        _beforeAnimationBuild(e, n, r) {
            let o = n.triggerName,
                i = n.element,
                s = n.isRemovalTransition ? void 0 : e,
                a = n.isRemovalTransition ? void 0 : o;
            for (let l of n.timelines) {
                let c = l.element,
                    u = c !== i,
                    d = he(r, c, []);
                this._getPreviousPlayers(c, u, s, a, n.toState).forEach((f) => {
                    let h = f.getRealPlayer();
                    (h.beforeDestroy && h.beforeDestroy(),
                        f.destroy(),
                        d.push(f));
                });
            }
            Tt(i, n.fromStyles);
        }
        _buildAnimation(e, n, r, o, i, s) {
            let a = n.triggerName,
                l = n.element,
                c = [],
                u = new Set(),
                d = new Set(),
                p = n.timelines.map((h) => {
                    let m = h.element;
                    u.add(m);
                    let v = m[je];
                    if (v && v.removedBeforeQueried)
                        return new lt(h.duration, h.delay);
                    let g = m !== l,
                        F = FT(
                            (r.get(m) || xT).map((re) => re.getRealPlayer()),
                        ).filter((re) => {
                            let de = re;
                            return de.element ? de.element === m : !1;
                        }),
                        ne = i.get(m),
                        X = s.get(m),
                        an = Bc(this._normalizer, h.keyframes, ne, X),
                        Ve = this._buildPlayer(h, an, F);
                    if ((h.subTimeline && o && d.add(m), g)) {
                        let re = new Yr(e, a, m);
                        (re.setRealPlayer(Ve), c.push(re));
                    }
                    return Ve;
                });
            (c.forEach((h) => {
                (he(this.playersByQueriedElement, h.element, []).push(h),
                    h.onDone(() =>
                        RT(this.playersByQueriedElement, h.element, h),
                    ));
            }),
                u.forEach((h) => Se(h, Wc)));
            let f = ct(p);
            return (
                f.onDestroy(() => {
                    (u.forEach((h) => Qn(h, Wc)), Le(l, n.toStyles));
                }),
                d.forEach((h) => {
                    he(o, h, []).push(f);
                }),
                f
            );
        }
        _buildPlayer(e, n, r) {
            return n.length > 0
                ? this.driver.animate(
                      e.element,
                      n,
                      e.duration,
                      e.delay,
                      e.easing,
                      r,
                  )
                : new lt(e.duration, e.delay);
        }
    },
    Yr = class {
        namespaceId;
        triggerName;
        element;
        _player = new lt();
        _containsRealPlayer = !1;
        _queuedCallbacks = new Map();
        destroyed = !1;
        parentPlayer = null;
        markedForDestroy = !1;
        disabled = !1;
        queued = !0;
        totalTime = 0;
        constructor(e, n, r) {
            ((this.namespaceId = e),
                (this.triggerName = n),
                (this.element = r));
        }
        setRealPlayer(e) {
            this._containsRealPlayer ||
                ((this._player = e),
                this._queuedCallbacks.forEach((n, r) => {
                    n.forEach((o) => ns(e, r, void 0, o));
                }),
                this._queuedCallbacks.clear(),
                (this._containsRealPlayer = !0),
                this.overrideTotalTime(e.totalTime),
                (this.queued = !1));
        }
        getRealPlayer() {
            return this._player;
        }
        overrideTotalTime(e) {
            this.totalTime = e;
        }
        syncPlayerEvents(e) {
            let n = this._player;
            (n.triggerCallback && e.onStart(() => n.triggerCallback("start")),
                e.onDone(() => this.finish()),
                e.onDestroy(() => this.destroy()));
        }
        _queueEvent(e, n) {
            he(this._queuedCallbacks, e, []).push(n);
        }
        onDone(e) {
            (this.queued && this._queueEvent("done", e),
                this._player.onDone(e));
        }
        onStart(e) {
            (this.queued && this._queueEvent("start", e),
                this._player.onStart(e));
        }
        onDestroy(e) {
            (this.queued && this._queueEvent("destroy", e),
                this._player.onDestroy(e));
        }
        init() {
            this._player.init();
        }
        hasStarted() {
            return this.queued ? !1 : this._player.hasStarted();
        }
        play() {
            !this.queued && this._player.play();
        }
        pause() {
            !this.queued && this._player.pause();
        }
        restart() {
            !this.queued && this._player.restart();
        }
        finish() {
            this._player.finish();
        }
        destroy() {
            ((this.destroyed = !0), this._player.destroy());
        }
        reset() {
            !this.queued && this._player.reset();
        }
        setPosition(e) {
            this.queued || this._player.setPosition(e);
        }
        getPosition() {
            return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
            let n = this._player;
            n.triggerCallback && n.triggerCallback(e);
        }
    };
function RT(t, e, n) {
    let r = t.get(e);
    if (r) {
        if (r.length) {
            let o = r.indexOf(n);
            r.splice(o, 1);
        }
        r.length == 0 && t.delete(e);
    }
    return r;
}
function OT(t) {
    return t ?? null;
}
function ds(t) {
    return t && t.nodeType === 1;
}
function kT(t) {
    return t == "start" || t == "done";
}
function ng(t, e) {
    let n = t.style.display;
    return ((t.style.display = e ?? "none"), n);
}
function rg(t, e, n, r, o) {
    let i = [];
    n.forEach((l) => i.push(ng(l)));
    let s = [];
    r.forEach((l, c) => {
        let u = new Map();
        (l.forEach((d) => {
            let p = e.computeStyle(c, d, o);
            (u.set(d, p), (!p || p.length == 0) && ((c[je] = AT), s.push(c)));
        }),
            t.set(c, u));
    });
    let a = 0;
    return (n.forEach((l) => ng(l, i[a++])), s);
}
function og(t, e) {
    let n = new Map();
    if ((t.forEach((a) => n.set(a, [])), e.length == 0)) return n;
    let r = 1,
        o = new Set(e),
        i = new Map();
    function s(a) {
        if (!a) return r;
        let l = i.get(a);
        if (l) return l;
        let c = a.parentNode;
        return (
            n.has(c) ? (l = c) : o.has(c) ? (l = r) : (l = s(c)),
            i.set(a, l),
            l
        );
    }
    return (
        e.forEach((a) => {
            let l = s(a);
            l !== r && n.get(l).push(a);
        }),
        n
    );
}
function Se(t, e) {
    t.classList?.add(e);
}
function Qn(t, e) {
    t.classList?.remove(e);
}
function PT(t, e, n) {
    ct(n).onDone(() => t.processLeaveNode(e));
}
function FT(t) {
    let e = [];
    return (fg(t, e), e);
}
function fg(t, e) {
    for (let n = 0; n < t.length; n++) {
        let r = t[n];
        r instanceof zn ? fg(r.players, e) : e.push(r);
    }
}
function LT(t, e) {
    let n = Object.keys(t),
        r = Object.keys(e);
    if (n.length != r.length) return !1;
    for (let o = 0; o < n.length; o++) {
        let i = n[o];
        if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
    }
    return !0;
}
function ig(t, e, n) {
    let r = n.get(t);
    if (!r) return !1;
    let o = e.get(t);
    return (o ? r.forEach((i) => o.add(i)) : e.set(t, r), n.delete(t), !0);
}
var ys = class {
    _driver;
    _normalizer;
    _transitionEngine;
    _timelineEngine;
    _triggerCache = {};
    onRemovalComplete = (e, n) => {};
    constructor(e, n, r) {
        ((this._driver = n),
            (this._normalizer = r),
            (this._transitionEngine = new fu(e.body, n, r)),
            (this._timelineEngine = new uu(e.body, n, r)),
            (this._transitionEngine.onRemovalComplete = (o, i) =>
                this.onRemovalComplete(o, i)));
    }
    registerTrigger(e, n, r, o, i) {
        let s = e + "-" + o,
            a = this._triggerCache[s];
        if (!a) {
            let l = [],
                c = [],
                u = mu(this._driver, i, l, c);
            if (l.length) throw Om(o, l);
            ((a = wT(o, u, this._normalizer)), (this._triggerCache[s] = a));
        }
        this._transitionEngine.registerTrigger(n, o, a);
    }
    register(e, n) {
        this._transitionEngine.register(e, n);
    }
    destroy(e, n) {
        this._transitionEngine.destroy(e, n);
    }
    onInsert(e, n, r, o) {
        this._transitionEngine.insertNode(e, n, r, o);
    }
    onRemove(e, n, r) {
        this._transitionEngine.removeNode(e, n, r);
    }
    disableAnimations(e, n) {
        this._transitionEngine.markElementAsDisabled(e, n);
    }
    process(e, n, r, o) {
        if (r.charAt(0) == "@") {
            let [i, s] = $c(r),
                a = o;
            this._timelineEngine.command(i, n, s, a);
        } else this._transitionEngine.trigger(e, n, r, o);
    }
    listen(e, n, r, o, i) {
        if (r.charAt(0) == "@") {
            let [s, a] = $c(r);
            return this._timelineEngine.listen(s, n, a, i);
        }
        return this._transitionEngine.listen(e, n, r, o, i);
    }
    flush(e = -1) {
        this._transitionEngine.flush(e);
    }
    get players() {
        return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
        ];
    }
    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone();
    }
    afterFlushAnimationsDone(e) {
        this._transitionEngine.afterFlushAnimationsDone(e);
    }
};
function jT(t, e) {
    let n = null,
        r = null;
    return (
        Array.isArray(e) && e.length
            ? ((n = Xc(e[0])), e.length > 1 && (r = Xc(e[e.length - 1])))
            : e instanceof Map && (n = Xc(e)),
        n || r ? new VT(t, n, r) : null
    );
}
var VT = (() => {
    class t {
        _element;
        _startStyles;
        _endStyles;
        static initialStylesByElement = new WeakMap();
        _state = 0;
        _initialStyles;
        constructor(n, r, o) {
            ((this._element = n),
                (this._startStyles = r),
                (this._endStyles = o));
            let i = t.initialStylesByElement.get(n);
            (i || t.initialStylesByElement.set(n, (i = new Map())),
                (this._initialStyles = i));
        }
        start() {
            this._state < 1 &&
                (this._startStyles &&
                    Le(this._element, this._startStyles, this._initialStyles),
                (this._state = 1));
        }
        finish() {
            (this.start(),
                this._state < 2 &&
                    (Le(this._element, this._initialStyles),
                    this._endStyles &&
                        (Le(this._element, this._endStyles),
                        (this._endStyles = null)),
                    (this._state = 1)));
        }
        destroy() {
            (this.finish(),
                this._state < 3 &&
                    (t.initialStylesByElement.delete(this._element),
                    this._startStyles &&
                        (Tt(this._element, this._startStyles),
                        (this._endStyles = null)),
                    this._endStyles &&
                        (Tt(this._element, this._endStyles),
                        (this._endStyles = null)),
                    Le(this._element, this._initialStyles),
                    (this._state = 3)));
        }
    }
    return t;
})();
function Xc(t) {
    let e = null;
    return (
        t.forEach((n, r) => {
            HT(r) && ((e = e || new Map()), e.set(r, n));
        }),
        e
    );
}
function HT(t) {
    return t === "display" || t === "position";
}
var vs = class {
        element;
        keyframes;
        options;
        _specialStyles;
        _onDoneFns = [];
        _onStartFns = [];
        _onDestroyFns = [];
        _duration;
        _delay;
        _initialized = !1;
        _finished = !1;
        _started = !1;
        _destroyed = !1;
        _finalKeyframe;
        _originalOnDoneFns = [];
        _originalOnStartFns = [];
        domPlayer;
        time = 0;
        parentPlayer = null;
        currentSnapshot = new Map();
        constructor(e, n, r, o) {
            ((this.element = e),
                (this.keyframes = n),
                (this.options = r),
                (this._specialStyles = o),
                (this._duration = r.duration),
                (this._delay = r.delay || 0),
                (this.time = this._duration + this._delay));
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            (this._buildPlayer(), this._preparePlayerBeforeStart());
        }
        _buildPlayer() {
            if (this._initialized) return;
            this._initialized = !0;
            let e = this.keyframes;
            ((this.domPlayer = this._triggerWebAnimation(
                this.element,
                e,
                this.options,
            )),
                (this._finalKeyframe = e.length ? e[e.length - 1] : new Map()));
            let n = () => this._onFinish();
            (this.domPlayer.addEventListener("finish", n),
                this.onDestroy(() => {
                    this.domPlayer.removeEventListener("finish", n);
                }));
        }
        _preparePlayerBeforeStart() {
            this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
            let n = [];
            return (
                e.forEach((r) => {
                    n.push(Object.fromEntries(r));
                }),
                n
            );
        }
        _triggerWebAnimation(e, n, r) {
            return e.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(e) {
            (this._originalOnStartFns.push(e), this._onStartFns.push(e));
        }
        onDone(e) {
            (this._originalOnDoneFns.push(e), this._onDoneFns.push(e));
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        play() {
            (this._buildPlayer(),
                this.hasStarted() ||
                    (this._onStartFns.forEach((e) => e()),
                    (this._onStartFns = []),
                    (this._started = !0),
                    this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play());
        }
        pause() {
            (this.init(), this.domPlayer.pause());
        }
        finish() {
            (this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish());
        }
        reset() {
            (this._resetDomPlayerState(),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns));
        }
        _resetDomPlayerState() {
            this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
            (this.reset(), this.play());
        }
        hasStarted() {
            return this._started;
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._resetDomPlayerState(),
                this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        setPosition(e) {
            (this.domPlayer === void 0 && this.init(),
                (this.domPlayer.currentTime = e * this.time));
        }
        getPosition() {
            return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
            return this._delay + this._duration;
        }
        beforeDestroy() {
            let e = new Map();
            (this.hasStarted() &&
                this._finalKeyframe.forEach((r, o) => {
                    o !== "offset" &&
                        e.set(o, this._finished ? r : ls(this.element, o));
                }),
                (this.currentSnapshot = e));
        }
        triggerCallback(e) {
            let n = e === "start" ? this._onStartFns : this._onDoneFns;
            (n.forEach((r) => r()), (n.length = 0));
        }
    },
    pu = class {
        validateStyleProperty(e) {
            return !0;
        }
        validateAnimatableStyleProperty(e) {
            return !0;
        }
        containsElement(e, n) {
            return Uc(e, n);
        }
        getParentElement(e) {
            return os(e);
        }
        query(e, n, r) {
            return qc(e, n, r);
        }
        computeStyle(e, n, r) {
            return ls(e, n);
        }
        animate(e, n, r, o, i, s = []) {
            let a = o == 0 ? "both" : "forwards",
                l = { duration: r, delay: o, fill: a };
            i && (l.easing = i);
            let c = new Map(),
                u = s.filter((f) => f instanceof vs);
            Gm(r, o) &&
                u.forEach((f) => {
                    f.currentSnapshot.forEach((h, m) => c.set(m, h));
                });
            let d = zm(n).map((f) => new Map(f));
            d = Qm(e, d, c);
            let p = jT(e, d);
            return new vs(e, d, l, p);
        }
    };
function Vj(t, e) {
    return t === "noop"
        ? new ys(e, new lg(), new tu())
        : new ys(e, new pu(), new nu());
}
var sg = class {
        _driver;
        _animationAst;
        constructor(e, n) {
            this._driver = e;
            let r = [],
                i = mu(e, n, r, []);
            if (r.length) throw Am(r);
            this._animationAst = i;
        }
        buildTimelines(e, n, r, o, i) {
            let s = Array.isArray(n) ? Gc(n) : n,
                a = Array.isArray(r) ? Gc(r) : r,
                l = [];
            i = i || new Kn();
            let c = yu(
                this._driver,
                e,
                this._animationAst,
                is,
                zr,
                s,
                a,
                o,
                i,
                l,
            );
            if (l.length) throw Rm(l);
            return c;
        }
    },
    fs = "@",
    pg = "@.disabled",
    Es = class {
        namespaceId;
        delegate;
        engine;
        _onDestroy;
        ɵtype = 0;
        constructor(e, n, r, o) {
            ((this.namespaceId = e),
                (this.delegate = n),
                (this.engine = r),
                (this._onDestroy = o));
        }
        get data() {
            return this.delegate.data;
        }
        destroyNode(e) {
            this.delegate.destroyNode?.(e);
        }
        destroy() {
            (this.engine.destroy(this.namespaceId, this.delegate),
                this.engine.afterFlushAnimationsDone(() => {
                    queueMicrotask(() => {
                        this.delegate.destroy();
                    });
                }),
                this._onDestroy?.());
        }
        createElement(e, n) {
            return this.delegate.createElement(e, n);
        }
        createComment(e) {
            return this.delegate.createComment(e);
        }
        createText(e) {
            return this.delegate.createText(e);
        }
        appendChild(e, n) {
            (this.delegate.appendChild(e, n),
                this.engine.onInsert(this.namespaceId, n, e, !1));
        }
        insertBefore(e, n, r, o = !0) {
            (this.delegate.insertBefore(e, n, r),
                this.engine.onInsert(this.namespaceId, n, e, o));
        }
        removeChild(e, n, r) {
            this.parentNode(n) &&
                this.engine.onRemove(this.namespaceId, n, this.delegate);
        }
        selectRootElement(e, n) {
            return this.delegate.selectRootElement(e, n);
        }
        parentNode(e) {
            return this.delegate.parentNode(e);
        }
        nextSibling(e) {
            return this.delegate.nextSibling(e);
        }
        setAttribute(e, n, r, o) {
            this.delegate.setAttribute(e, n, r, o);
        }
        removeAttribute(e, n, r) {
            this.delegate.removeAttribute(e, n, r);
        }
        addClass(e, n) {
            this.delegate.addClass(e, n);
        }
        removeClass(e, n) {
            this.delegate.removeClass(e, n);
        }
        setStyle(e, n, r, o) {
            this.delegate.setStyle(e, n, r, o);
        }
        removeStyle(e, n, r) {
            this.delegate.removeStyle(e, n, r);
        }
        setProperty(e, n, r) {
            n.charAt(0) == fs && n == pg
                ? this.disableAnimations(e, !!r)
                : this.delegate.setProperty(e, n, r);
        }
        setValue(e, n) {
            this.delegate.setValue(e, n);
        }
        listen(e, n, r, o) {
            return this.delegate.listen(e, n, r, o);
        }
        disableAnimations(e, n) {
            this.engine.disableAnimations(e, n);
        }
    },
    hu = class extends Es {
        factory;
        constructor(e, n, r, o, i) {
            (super(n, r, o, i), (this.factory = e), (this.namespaceId = n));
        }
        setProperty(e, n, r) {
            n.charAt(0) == fs
                ? n.charAt(1) == "." && n == pg
                    ? ((r = r === void 0 ? !0 : !!r),
                      this.disableAnimations(e, r))
                    : this.engine.process(this.namespaceId, e, n.slice(1), r)
                : this.delegate.setProperty(e, n, r);
        }
        listen(e, n, r, o) {
            if (n.charAt(0) == fs) {
                let i = BT(e),
                    s = n.slice(1),
                    a = "";
                return (
                    s.charAt(0) != fs && ([s, a] = $T(s)),
                    this.engine.listen(this.namespaceId, i, s, a, (l) => {
                        let c = l._data || -1;
                        this.factory.scheduleListenerCallback(c, r, l);
                    })
                );
            }
            return this.delegate.listen(e, n, r, o);
        }
    };
function BT(t) {
    switch (t) {
        case "body":
            return document.body;
        case "document":
            return document;
        case "window":
            return window;
        default:
            return t;
    }
}
function $T(t) {
    let e = t.indexOf("."),
        n = t.substring(0, e),
        r = t.slice(e + 1);
    return [n, r];
}
var ag = class {
    delegate;
    engine;
    _zone;
    _currentId = 0;
    _microtaskId = 1;
    _animationCallbacksBuffer = [];
    _rendererCache = new Map();
    _cdRecurDepth = 0;
    constructor(e, n, r) {
        ((this.delegate = e),
            (this.engine = n),
            (this._zone = r),
            (n.onRemovalComplete = (o, i) => {
                i?.removeChild(null, o);
            }));
    }
    createRenderer(e, n) {
        let r = "",
            o = this.delegate.createRenderer(e, n);
        if (!e || !n?.data?.animation) {
            let c = this._rendererCache,
                u = c.get(o);
            if (!u) {
                let d = () => c.delete(o);
                ((u = new Es(r, o, this.engine, d)), c.set(o, u));
            }
            return u;
        }
        let i = n.id,
            s = n.id + "-" + this._currentId;
        (this._currentId++, this.engine.register(s, e));
        let a = (c) => {
            Array.isArray(c)
                ? c.forEach(a)
                : this.engine.registerTrigger(i, s, e, c.name, c);
        };
        return (n.data.animation.forEach(a), new hu(this, s, o, this.engine));
    }
    begin() {
        (this._cdRecurDepth++, this.delegate.begin && this.delegate.begin());
    }
    _scheduleCountTask() {
        queueMicrotask(() => {
            this._microtaskId++;
        });
    }
    scheduleListenerCallback(e, n, r) {
        if (e >= 0 && e < this._microtaskId) {
            this._zone.run(() => n(r));
            return;
        }
        let o = this._animationCallbacksBuffer;
        (o.length == 0 &&
            queueMicrotask(() => {
                this._zone.run(() => {
                    (o.forEach((i) => {
                        let [s, a] = i;
                        s(a);
                    }),
                        (this._animationCallbacksBuffer = []));
                });
            }),
            o.push([n, r]));
    }
    end() {
        (this._cdRecurDepth--,
            this._cdRecurDepth == 0 &&
                this._zone.runOutsideAngular(() => {
                    (this._scheduleCountTask(),
                        this.engine.flush(this._microtaskId));
                }),
            this.delegate.end && this.delegate.end());
    }
    whenRenderingDone() {
        return this.engine.whenRenderingDone();
    }
    componentReplaced(e) {
        (this.engine.flush(), this.delegate.componentReplaced?.(e));
    }
};
export {
    ee as a,
    ye as b,
    UT as c,
    bu as d,
    U as e,
    Sg as f,
    R as g,
    js as h,
    Vs as i,
    De as j,
    er as k,
    Hs as l,
    Og as m,
    kg as n,
    Ft as o,
    QC as p,
    KC as q,
    Ue as r,
    $g as s,
    Ug as t,
    qg as u,
    jt as v,
    et as w,
    Jg as x,
    Me as y,
    or as z,
    In as A,
    ey as B,
    ty as C,
    qs as D,
    ly as E,
    Vt as F,
    cy as G,
    ld as H,
    uy as I,
    dy as J,
    ir as K,
    _n as L,
    fy as M,
    py as N,
    fd as O,
    gy as P,
    Ws as Q,
    yy as R,
    vy as S,
    Ey as T,
    Iy as U,
    _y as V,
    Dy as W,
    wy as X,
    Ty as Y,
    by as Z,
    y as _,
    ia as $,
    Qo as aa,
    z as ba,
    Ed as ca,
    Ny as da,
    P as ea,
    qe as fa,
    x as ga,
    ei as ha,
    Ia as ia,
    we as ja,
    ti as ka,
    $d as la,
    Ud as ma,
    mt as na,
    Jy as oa,
    Ir as pa,
    gt as qa,
    ot as ra,
    of as sa,
    nt as ta,
    Xt as ua,
    af as va,
    uv as wa,
    fv as xa,
    xv as ya,
    sp as za,
    Or as Aa,
    jv as Ba,
    Vv as Ca,
    pp as Da,
    Bv as Ea,
    $v as Fa,
    Uv as Ga,
    Fn as Ha,
    Un as Ia,
    Jl as Ja,
    Yv as Ka,
    Jv as La,
    Xv as Ma,
    eE as Na,
    tE as Oa,
    Xl as Pa,
    yE as Qa,
    Wi as Ra,
    IE as Sa,
    zE as Ta,
    Mi as Ua,
    Nr as Va,
    Mr as Wa,
    UI as Xa,
    Vr as Ya,
    zI as Za,
    Xi as _a,
    wt as $a,
    jn as ab,
    gh as bb,
    yh as cb,
    A_ as db,
    O_ as eb,
    F_ as fb,
    L_ as gb,
    Ih as hb,
    z_ as ib,
    wh as jb,
    Th as kb,
    Hr as lb,
    it as mb,
    ue as nb,
    rD as ob,
    sD as pb,
    Dc as qb,
    aD as rb,
    Rh as sb,
    Br as tb,
    Ph as ub,
    uD as vb,
    dD as wb,
    fD as xb,
    pD as yb,
    hD as zb,
    mD as Ab,
    Fh as Bb,
    Cc as Cb,
    Sc as Db,
    Lh as Eb,
    Nc as Fb,
    Mc as Gb,
    jh as Hb,
    xc as Ib,
    Ac as Jb,
    Hh as Kb,
    ED as Lb,
    DD as Mb,
    Bh as Nb,
    Uh as Ob,
    qh as Pb,
    CD as Qb,
    ND as Rb,
    MD as Sb,
    AD as Tb,
    RD as Ub,
    OD as Vb,
    kD as Wb,
    PD as Xb,
    Kh as Yb,
    Zh as Zb,
    QD as _b,
    ZD as $b,
    sw as ac,
    om as bc,
    Rc as cc,
    hw as dc,
    mw as ec,
    gw as fc,
    Ew as gc,
    _w as hc,
    ww as ic,
    Tw as jc,
    Cw as kc,
    Pc as lc,
    Mw as mc,
    xw as nc,
    um as oc,
    mj as pc,
    gj as qc,
    yj as rc,
    vj as sc,
    Ej as tc,
    Ij as uc,
    _j as vc,
    Dj as wc,
    Sj as xc,
    Nj as yc,
    Lc as zc,
    Mj as Ac,
    xj as Bc,
    Aj as Cc,
    Rj as Dc,
    os as Ec,
    qm as Fc,
    eT as Gc,
    Uc as Hc,
    qc as Ic,
    is as Jc,
    zr as Kc,
    zm as Lc,
    sT as Mc,
    Gm as Nc,
    lg as Oc,
    Km as Pc,
    eu as Qc,
    tu as Rc,
    nu as Sc,
    Yr as Tc,
    ys as Uc,
    vs as Vc,
    pu as Wc,
    Vj as Xc,
    sg as Yc,
    Es as Zc,
    hu as _c,
    ag as $c,
};
