(window.webpackJsonp = window.webpackJsonp || []).push([
    [1],
    {
        20: function (e, t, n) {
            'use strict';
            n.r(t);
            var o = n(8),
                r = n.n(o),
                s = n(2),
                a = n.n(s);
            var c = (e, t = '', n = 512) => {
                    const o = atob(e),
                        r = [];
                    for (let s = 0; s < o.length; s += n) {
                        const e = o.slice(s, s + n),
                            t = new Array(e.length);
                        for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                        const a = new Uint8Array(t);
                        r.push(a);
                    }
                    return new Blob(r, { type: t });
                },
                i = (e) => {
                    if (!e) throw new Error('input must be one of File object, image url, image base64');
                    let t = null;
                    return '[object File]' === Object.prototype.toString.call(e)
                        ? ((t = e.slice()), l(t))
                        : (function (e) {
                              try {
                                  return btoa(atob(e)) === e;
                              } catch (t) {
                                  return !1;
                              }
                          })(e)
                        ? ((t = c(e)), l(t))
                        : new Promise((n, o) => {
                              const r = new XMLHttpRequest();
                              r.open('GET', e),
                                  (r.responseType = 'blob'),
                                  (r.onload = () => {
                                      r.status >= 200 && r.status < 300
                                          ? ((t = r.response),
                                            l(t)
                                                .then((e) => n(e))
                                                .catch((e) => o(e)))
                                          : o(r.statusText);
                                  }),
                                  (r.onerror = () => o(r.statusText)),
                                  r.send();
                          });
                };
            function l(e) {
                return new Promise((t, n) => {
                    const o = new FileReader();
                    o.readAsArrayBuffer(e),
                        o.addEventListener('loadend', (e) => {
                            const o = e.srcElement.result,
                                s = a.a.decode(o),
                                c = a.a.toRGBA8(s)[0],
                                i = r()(new Uint8ClampedArray(c), s.width, s.height);
                            i ? t(i) : n(new Error('decode failed'));
                        });
                });
            }
            // i('https://i.imgur.com/2S3N16R.png').then((e) => {
            //     document.getElementById('content').innerText = e.data;
            // });
            const d = document.getElementById('file');
            d.addEventListener(
                'change',
                () => {
                    const e = d.files[0];
                    i(e).then((e) => {
                        //alert(e.data);

                        // Create the event
                        var event = new CustomEvent('name-of-event', { detail: e.data });
                        console.log('event', event);

                        // Dispatch/Trigger/Fire the event
                        document.dispatchEvent(event);
                    });
                },
                !1
            );
        },
        9: function (e, t, n) {
            e.exports = n(20);
        },
    },
    [[9, 2, 0]],
]);
