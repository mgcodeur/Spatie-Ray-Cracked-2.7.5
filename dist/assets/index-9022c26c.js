import {
  j as e,
  r,
  T as I,
  g as T,
  f as m,
  P as H,
  h as $,
  B,
  k as A,
  l as L,
} from "./index-12d27707.js";
function x({ onChange: s = () => {}, ...t }) {
  return e.jsx("input", {
    ...t,
    className: `
                app-region-no-drag
                w-full px-4 h-10
                bg-gray-100 outline-none rounded-sm
                text-gray-700 focus:text-indigo-700 focus:bg-indigo-50
            `,
    onChange: (a) => s(a.target.value),
  });
}
function p({ htmlFor: s, children: t }) {
  return e.jsx("label", {
    htmlFor: s,
    className: "font-semibold text-sm text-gray-500 dark:text-gray-400",
    children: t,
  });
}
function P({ id: s, children: t, disabled: a, onClick: i }) {
  return e.jsx("button", {
    id: s,
    className: `
                py-2 px-4
                text-white font-medium 
                focus:outline-none focus:ring-0
                disabled:bg-gray-500 bg-indigo-500 enabled:hover:bg-indigo-600
                rounded
                transform active:translate-y-px
                cursor-default select-none app-region-no-drag
            `,
    disabled: a,
    onClick: i,
    children: t,
  });
}
function _({ privateKeyPath: s, onSubmit: t, onCancel: a }) {
  const [i, l] = r.useState("");
  function n() {
    window.Ray.servers.updatePrivateKeyPassphrase({
      privateKeyPath: s,
      privateKeyPassphrase: i,
    }),
      t(i);
  }
  function d() {
    a();
  }
  return e.jsx("div", {
    className: `
                animation-overlay
                fixed inset-0
                flex items-center justify-center overflow-y-auto
                bg-opacity-50 bg-black z-50
            `,
    onClick: () => d(),
    children: e.jsx("div", {
      className: "relative px-10 w-full max-w-xl max-h-screen",
      onClick: (c) => c.stopPropagation(),
      children: e.jsxs("div", {
        className: `
                        animation-dialog
                        relative bg-white dark:bg-gray-900 shadow-2xl rounded-sm
                        text-gray-900 dark:text-gray-300
                        px-8 sm:px-16 py-12
                    `,
        children: [
          e.jsx("span", {
            className: `
                                absolute top-0 right-0 p-4
                                leading-none text-xl text-gray-400 hover:text-gray-600 transition-colors
                            `,
            onClick: () => d(),
            children: e.jsx("span", {
              className: "inline-block w-4 h-4",
              children: e.jsx(I, {}),
            }),
          }),
          e.jsxs("div", {
            className: "relative mx-auto max-w-xl grid gap-4",
            children: [
              e.jsx("h1", {
                className: "markup-h1",
                children: "Encrypted private key",
              }),
              e.jsxs("p", {
                children: [
                  "The private key for this server (",
                  e.jsx("code", { children: s }),
                  ") is encrypted with a passphrase.",
                ],
              }),
              e.jsxs("div", {
                className: "grid gap-2",
                children: [
                  e.jsx(p, {
                    htmlFor: "username",
                    children: "Private key passphrase",
                  }),
                  e.jsx(x, {
                    type: "password",
                    onChange: (c) => l(c),
                    value: i,
                  }),
                ],
              }),
              e.jsx("div", {
                children: e.jsx(P, { onClick: () => n(), children: "Save" }),
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
function D() {}
var z = D;
const M = T(z);
function O({ server: s, onRemove: t, onEdit: a, onChange: i }) {
  const [l, n] = r.useState(!1),
    [d, c] = r.useState(!1),
    [C, u] = r.useState(!1),
    f = r.useMemo(() => window.Ray.servers.connection(s.uuid), [s.uuid]);
  r.useEffect(() => {
    (async function () {
      n(await f.isConnected());
    })(),
      f.onDisconnect(() => {
        n(!1);
      });
  }, []);
  function y(g = null) {
    c(!0),
      (async function () {
        try {
          await window.Ray.servers.connectSsh(g || s), n(!0);
        } catch (o) {
          if (
            (console.log(o),
            n(!1),
            o
              .toString()
              .includes("private key detected, but no passphrase given"))
          ) {
            u(!0);
            return;
          }
          if (
            o
              .toString()
              .includes("private OpenSSH key detected, but no passphrase given")
          ) {
            u(!0);
            return;
          }
          if (o.toString().toLowerCase().includes("bad passphrase")) {
            alert(
              `The provided passphrase for private key \`${s.privateKeyPath}\` is incorrect.`,
            ),
              u(!0);
            return;
          }
          if (o.toString().includes("Unable to bind to")) {
            alert(
              "Ray was unable to bind to the remote server's port. Is the port in use or is someone else using ray on this server?",
            );
            return;
          }
          if (o.toString().includes("Timed out while waiting for handshake")) {
            alert(
              "Ray timed out while waiting for a handshake from your server. Are your credentials correct and can you SSH to your server?",
            );
            return;
          }
          if (o.toString().includes("Connection lost before handshake")) {
            alert(
              "Ray lost the connection before the handshake with your server. Are your credentials correct and can you SSH to your server?",
            );
            return;
          }
          alert(o);
        } finally {
          c(!1);
        }
      })();
  }
  function j() {
    window.Ray.servers.disconnectSsh(s), n(!1), c(!1);
  }
  function w() {
    j(), window.Ray.servers.remove(s), t();
  }
  function b() {
    a();
  }
  function h(g) {
    const o = { ...s, privateKeyPassphrase: g };
    u(!1), i(o), y(o);
  }
  return e.jsxs("li", {
    className: `
                py-3 w-full
                flex items-center
                border-b border-gray-400 dark:border-gray-600 border-opacity-50 dark:border-opacity-50
                ${
                  s.needsCredentialsUpdate
                    ? "bg-yellow-50 px-2 mb-2 rounded"
                    : ""
                }
            `,
    children: [
      C &&
        e.jsx(_, {
          onCancel: () => u(!1),
          onSubmit: h,
          privateKeyPath: s.privateKeyPath || "~/.ssh/id_rsa",
        }),
      e.jsx("div", {
        className: "flex-none",
        children: e.jsx(q, {
          isConnected: l,
          isConnecting: d,
          needsCredentialsUpdate: s.needsCredentialsUpdate || !1,
          connect: () => y(),
          disconnect: () => j(),
          edit: () => b(),
        }),
      }),
      e.jsxs("div", {
        className: `min-w-0 mx-4 flex ${!l && "text-gray-500"}`,
        children: [
          s.label &&
            e.jsxs("span", {
              className: "mr-1",
              children: [
                e.jsx("span", { className: "font-bold", children: s.label }),
                " -",
              ],
            }),
          e.jsxs("span", { children: [s.username, "@"] }),
          e.jsx("span", {
            className: "min-w-0 truncate font-semibold",
            children: s.host,
          }),
          e.jsxs("span", { children: [":", s.port] }),
          s.needsCredentialsUpdate &&
            e.jsx("span", {
              className: "text-yellow-500 ml-1",
              children: "- update credentials",
            }),
        ],
      }),
      e.jsxs("div", {
        className: "ml-auto flex-none flex space-x-2",
        children: [
          e.jsx(m, {
            title: "Edit",
            disabled: l || d,
            onClick: () => b(),
            children: e.jsx(H, {}),
          }),
          e.jsx(m, {
            title: "Remove",
            disabled: l || d,
            onClick: () => w(),
            children: e.jsx($, {}),
          }),
        ],
      }),
    ],
  });
}
function q({
  isConnected: s,
  isConnecting: t,
  needsCredentialsUpdate: a,
  connect: i,
  disconnect: l,
  edit: n,
}) {
  return s
    ? e.jsx(m, {
        title: "Disconnect",
        active: !0,
        onClick: () => l(),
        children: e.jsx(B, {}),
      })
    : t
    ? e.jsx(m, { active: !0, disabled: !0, onClick: M, children: e.jsx(A, {}) })
    : a
    ? e.jsx(m, { title: "Edit", onClick: () => n(), children: e.jsx(H, {}) })
    : e.jsx(m, {
        title: "Connect",
        onClick: () => i(),
        children: e.jsx(L, {}),
      });
}
function G({ server: s, onChange: t, onCancel: a }) {
  var R;
  const [i, l] = r.useState(s.label || ""),
    [n, d] = r.useState(s.host || "localhost"),
    [c, C] = r.useState(((R = s.port) == null ? void 0 : R.toString()) || "22"),
    [u, f] = r.useState(s.password || ""),
    [y, j] = r.useState(s.privateKeyPath || "~/.ssh/id_rsa"),
    [w, b] = r.useState(s.username || "forge"),
    [h, g] = r.useState(!s.password);
  function o() {
    h && f("");
    const v = {
      label: i,
      uuid: (s.uuid || Math.random().toString()).replace(".", ""),
      host: n,
      port: parseInt(c),
      password: h ? "" : u,
      privateKeyPath: y,
      username: w,
      needsCredentialsUpdate: !1,
    };
    window.Ray.servers.update(v), window.Ray.servers.disconnectSsh(v), t(v);
  }
  function K() {
    a();
  }
  function U() {
    g(!0);
  }
  function F() {
    g(!1);
  }
  return e.jsx("div", {
    className: `
                animation-overlay
                fixed inset-0
                flex items-center justify-center overflow-y-auto
                bg-opacity-50 bg-black z-50
            `,
    onClick: K,
    children: e.jsx("div", {
      className: "relative px-10 w-full max-w-xl max-h-screen",
      onClick: (v) => v.stopPropagation(),
      children: e.jsxs("div", {
        className: `
                        animation-dialog
                        relative bg-white dark:bg-gray-900 shadow-2xl rounded-sm
                        text-gray-900 dark:text-gray-300
                        px-8 sm:px-16 py-12
                    `,
        children: [
          e.jsx("span", {
            className: `
                                absolute top-0 right-0 p-4
                                leading-none text-xl text-gray-400 hover:text-gray-600 transition-colors
                            `,
            onClick: K,
            children: e.jsx("span", {
              className: "inline-block w-4 h-4",
              children: e.jsx(I, {}),
            }),
          }),
          e.jsxs("div", {
            className: "relative mx-auto max-w-xl grid gap-4",
            children: [
              e.jsxs("h1", {
                className: "markup-h1",
                children: [s.uuid && "Edit server", !s.uuid && "Add server"],
              }),
              e.jsx("div", {
                children: e.jsxs("div", {
                  className: "grid gap-2 w-2/3",
                  children: [
                    e.jsx(p, { htmlFor: "label", children: "Label" }),
                    e.jsx(x, { id: "label", onChange: l, value: i }),
                  ],
                }),
              }),
              e.jsxs("div", {
                className: "flex space-x-2",
                children: [
                  e.jsxs("div", {
                    className: "grid gap-2 w-2/3",
                    children: [
                      e.jsx(p, { htmlFor: "host", children: "Host" }),
                      e.jsx(x, { id: "host", onChange: d, value: n }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "grid gap-2 w-1/3",
                    children: [
                      e.jsx(p, { htmlFor: "port", children: "Port" }),
                      e.jsx(x, { id: "port", onChange: C, value: c }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "grid gap-2",
                children: [
                  e.jsx(p, { htmlFor: "username", children: "Username" }),
                  e.jsx(x, { id: "username", onChange: b, value: w }),
                ],
              }),
              e.jsxs("nav", {
                className: "mt-4 flex overflow-hidden",
                children: [
                  e.jsx("button", {
                    onClick: U,
                    className: `
                                    ${
                                      h
                                        ? "bg-indigo-500 text-white"
                                        : "bg-gray-100 dark:bg-gray-700"
                                    }
                                    pl-5 pr-4 py-2 text-xs font-semibold rounded-l-full focus:outline-none ring-0
                                `,
                    children: "SSH",
                  }),
                  e.jsx("button", {
                    onClick: F,
                    className: `
                                    ${
                                      h
                                        ? "bg-gray-100 dark:bg-gray-700"
                                        : "bg-indigo-500 text-white"
                                    }
                                    pl-4 pr-5 py-2 text-xs font-semibold rounded-r-full focus:outline-none ring-0
                                `,
                    children: "Password",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "grid gap-4 content-start",
                children: [
                  !h &&
                    e.jsxs("div", {
                      className: "grid gap-2",
                      children: [
                        e.jsx(p, { htmlFor: "password", children: "Password" }),
                        e.jsx(x, {
                          id: "password",
                          type: "password",
                          onChange: f,
                          value: u,
                        }),
                      ],
                    }),
                  h &&
                    e.jsxs("div", {
                      className: "grid gap-2",
                      children: [
                        e.jsx(p, {
                          htmlFor: "privateKeyPath",
                          children: "Private key path",
                        }),
                        e.jsx(x, {
                          id: "privateKeyPath",
                          value: y,
                          placeholder: "~/.ssh/id_rsa",
                          onChange: j,
                        }),
                      ],
                    }),
                ],
              }),
              e.jsx(P, { onClick: o, children: "Save" }),
            ],
          }),
        ],
      }),
    }),
  });
}
let E = [],
  N = new Set();
const k = {
  subscribe(s) {
    return (
      N.add(s),
      () => {
        N.delete(s);
      }
    );
  },
  getSnapshot() {
    return E;
  },
  async init() {
    (E = await window.Ray.servers.get()), J();
  },
};
function S() {
  k.init();
}
k.init();
function J() {
  N.forEach((s) => s());
}
function Q() {
  return r.useSyncExternalStore(k.subscribe, k.getSnapshot);
}
function W() {
  const s = Q(),
    [t, a] = r.useState();
  r.useEffect(() => {
    S();
  }, []);
  function i() {
    a({
      label: "",
      uuid: "",
      host: "localhost",
      port: 22,
      password: "",
      privateKeyPath: "",
      privateKeyPassphrase: "",
      username: "",
    });
  }
  const l = s.some((n) => n.needsCredentialsUpdate);
  return e.jsxs("main", {
    className: "p-4 flex flex-col gap-4 mx-auto max-w-xl",
    children: [
      e.jsx("h1", { className: "markup-h1", children: "Servers" }),
      l &&
        e.jsxs("p", {
          className:
            "text-yellow-600 bg-yellow-100 border-yellow-200 border-opacity-50 text-sm rounded py-2 px-4",
          children: [
            "In",
            " ",
            e.jsx("a", {
              className:
                "hover:text-yellow-500 font-bold underline cursor-pointer",
              href: "https://spatie.be/products/ray/release-notes#1.18.0",
              children: "Ray 1.18.0",
            }),
            " ",
            "we've changed how your server credentials are stored, which means any formerly saved server passwords and private key passphrases need to be entered again.",
            " ",
            e.jsx("a", {
              className:
                "hover:text-yellow-500 font-bold underline cursor-pointer",
              href: "https://freek.dev/2103-replacing-keytar-with-electrons-safestorage-in-ray",
              children: "Read our blog post about why we made this change",
            }),
            ".",
          ],
        }),
      e.jsx("ul", {
        className: "select-text",
        children: s.map((n) =>
          e.jsx(
            O,
            {
              server: n,
              onRemove: () => S(),
              onChange: () => S(),
              onEdit: () => a(n),
            },
            n.uuid,
          ),
        ),
      }),
      t &&
        e.jsx(G, {
          server: t,
          onChange: () => {
            a(null), S();
          },
          onCancel: () => a(null),
        }),
      e.jsx("div", {
        children:
          !t && e.jsx(P, { onClick: () => i(), children: "Add server" }),
      }),
    ],
  });
}
function X() {
  return e.jsx("span", {
    className:
      "text-sm font-bold absolute inset-0 flex justify-center items-center text-center",
    children: "Servers",
  });
}
export { X as Header, W as default };
