/**
 * Generate unique and beautiful colors from any texts or numbers
 * @version v1.1.0
 * @link https://github.com/dastoori/uniqolor#README
 * @author Rasool Dastoori
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!(function (t, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).uniqolor =
        n());
})(this, function () {
  'use strict';
  function t(t, n) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, n) {
        var r =
          null == t
            ? null
            : ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
              t['@@iterator'];
        if (null == r) return;
        var o,
          e,
          a = [],
          i = !0,
          u = !1;
        try {
          for (
            r = r.call(t);
            !(i = (o = r.next()).done) &&
            (a.push(o.value), !n || a.length !== n);
            i = !0
          );
        } catch (t) {
          (u = !0), (e = t);
        } finally {
          try {
            i || null == r.return || r.return();
          } finally {
            if (u) throw e;
          }
        }
        return a;
      })(t, n) ||
      r(t, n) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      })()
    );
  }
  function n(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return o(t);
      })(t) ||
      (function (t) {
        if (
          ('undefined' != typeof Symbol && null != t[Symbol.iterator]) ||
          null != t['@@iterator']
        )
          return Array.from(t);
      })(t) ||
      r(t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      })()
    );
  }
  function r(t, n) {
    if (t) {
      if ('string' == typeof t) return o(t, n);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      return (
        'Object' === r && t.constructor && (r = t.constructor.name),
        'Map' === r || 'Set' === r
          ? Array.from(t)
          : 'Arguments' === r ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? o(t, n)
          : void 0
      );
    }
  }
  function o(t, n) {
    (null == n || n > t.length) && (n = t.length);
    for (var r = 0, o = new Array(n); r < n; r++) o[r] = t[r];
    return o;
  }
  var e = [0, 100],
    a = [0, 100],
    i = function (t) {
      return ''.concat(1 === t.length ? '0' : '').concat(t);
    },
    u = function (t, n, r) {
      return Math.max(Math.min(t, r), n);
    },
    c = function (t, n) {
      return Math.floor(Math.random() * (n - t + 1)) + t;
    },
    l = function t(n, r, o) {
      for (var e = c(n, r), a = 0; a < (null == o ? void 0 : o.length); a++) {
        var i = o[a];
        if (2 === (null == i ? void 0 : i.length) && e >= i[0] && e <= i[1])
          return t(n, r, o);
      }
      return e;
    },
    f = function (t) {
      for (var n = t.length, r = 0, o = 0; o < n; o++)
        (r = (r << 5) - r + t.charCodeAt(o)), (r &= r);
      return r;
    },
    d = function (t, n) {
      return 'number' == typeof n ? n : (t % Math.abs(n[1] - n[0])) + n[0];
    },
    h = function (t, r) {
      return 'number' == typeof t
        ? u.apply(void 0, [Math.abs(t)].concat(n(r)))
        : 1 === t.length || t[0] === t[1]
        ? u.apply(void 0, [Math.abs(t[0])].concat(n(r)))
        : [
            Math.abs(u.apply(void 0, [t[0]].concat(n(r)))),
            u.apply(void 0, [Math.abs(t[1])].concat(n(r))),
          ];
    },
    s = function (t, n, r) {
      return (
        r < 0 ? (r += 1) : r > 1 && (r -= 1),
        r < 1 / 6
          ? t + 6 * (n - t) * r
          : r < 0.5
          ? n
          : r < 2 / 3
          ? t + (n - t) * (2 / 3 - r) * 6
          : t
      );
    },
    y = function (t, n, r) {
      var o, e, a;
      if (((t /= 360), (r /= 100), 0 === (n /= 100))) o = e = a = r;
      else {
        var i = r < 0.5 ? r * (1 + n) : r + n - r * n,
          u = 2 * r - i;
        (o = s(u, i, t + 1 / 3)), (e = s(u, i, t)), (a = s(u, i, t - 1 / 3));
      }
      return [Math.round(255 * o), Math.round(255 * e), Math.round(255 * a)];
    },
    v = function (t, n, r, o) {
      return (299 * t + 587 * n + 114 * r) / 1e3 >= o;
    },
    p = function (t, n, r) {
      return 'hsl('.concat(t, ', ').concat(n, '%, ').concat(r, '%)');
    },
    b = function (t, n, r, o) {
      return 'rgb' === o
        ? 'rgb('.concat(t, ', ').concat(n, ', ').concat(r, ')')
        : '#'
            .concat(i(t.toString(16)))
            .concat(i(n.toString(16)))
            .concat(i(r.toString(16)));
    },
    m = function (n) {
      var r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        o = r.format,
        i = void 0 === o ? 'hex' : o,
        u = r.saturation,
        c = void 0 === u ? [50, 55] : u,
        l = r.lightness,
        s = void 0 === l ? [50, 60] : l,
        m = r.differencePoint,
        g = void 0 === m ? 130 : m,
        M = Math.abs(f(String(n))),
        S = d(M, [0, 360]),
        A = d(M, h(c, e)),
        x = d(M, h(s, a)),
        w = y(S, A, x),
        j = t(w, 3),
        I = j[0],
        T = j[1],
        C = j[2];
      return {
        color: 'hsl' === i ? p(S, A, x) : b(I, T, C, i),
        isLight: v(I, T, C, g),
      };
    };
  return (
    (m.random = function () {
      var r =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        o = r.format,
        i = void 0 === o ? 'hex' : o,
        u = r.saturation,
        f = void 0 === u ? [50, 55] : u,
        d = r.lightness,
        s = void 0 === d ? [50, 60] : d,
        m = r.differencePoint,
        g = void 0 === m ? 130 : m,
        M = r.excludeHue;
      (f = h(f, e)), (s = h(s, a));
      var S = M ? l(0, 359, M) : c(0, 359),
        A = 'number' == typeof f ? f : c.apply(void 0, n(f)),
        x = 'number' == typeof s ? s : c.apply(void 0, n(s)),
        w = y(S, A, x),
        j = t(w, 3),
        I = j[0],
        T = j[1],
        C = j[2];
      return {
        color: 'hsl' === i ? p(S, A, x) : b(I, T, C, i),
        isLight: v(I, T, C, g),
      };
    }),
    m
  );
});
//# sourceMappingURL=uniqolor.min.js.map
