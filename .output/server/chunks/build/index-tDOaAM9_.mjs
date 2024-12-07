import { jsx, jsxs } from 'react/jsx-runtime';
import { e as eventHandler, y as ye, L as Le, f as ft$1, b as be, W, d as dt, M } from '../../index.mjs';
import j from 'tiny-invariant';
import { defaultTransformer, isRedirect, isNotFound, isPlainObject, encode } from '@tanstack/react-router';
import b from 'pino';
import { drizzle } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm/sql';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql as sql$1, eq } from 'drizzle-orm';
import { ChevronDown, Star, Clock, ChefHat, Heart, Utensils } from 'lucide-react';
import * as y from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import * as N from '@radix-ui/react-accordion';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:async_hooks';
import 'jsesc';
import 'isbot';
import 'react-dom/server';
import '@tanstack/react-cross-context';

function k(e, n) {
  const t = n || e || {};
  return typeof t.method > "u" && (t.method = "GET"), { options: t, middleware: (r) => k(void 0, Object.assign(t, { middleware: r })), validator: (r) => k(void 0, Object.assign(t, { validator: r })), handler: (...r) => {
    const [i, c] = r;
    Object.assign(t, { ...i, extractedFn: i, serverFn: c }), j(i.url, "createServerFn must be called with a function that is marked with the 'use server' pragma. Are you using the @tanstack/start-vite-plugin ?");
    const s = [...t.middleware || [], Se(t)];
    return Object.assign(async (l) => J(s, "client", { ...i, method: t.method, data: l == null ? void 0 : l.data, headers: l == null ? void 0 : l.headers, context: Object.assign({}, i) }).then((d) => d.result), { ...i, __executeServer: (l) => {
      const d = l instanceof FormData ? Te(l) : l;
      return J(s, "server", { ...i, ...d }).then((p) => ({ result: p.result, context: p.sendContext }));
    } });
  } };
}
function Te(e) {
  const n = e.get("__TSR_CONTEXT");
  if (e.delete("__TSR_CONTEXT"), typeof n != "string") return { context: {}, data: e };
  try {
    return { context: defaultTransformer.parse(n), data: e };
  } catch {
    return { data: e };
  }
}
function Re(e) {
  const n = [], t = (r) => {
    r.forEach((i) => {
      i.options.middleware && t(i.options.middleware), n.push(i);
    });
  };
  return t(e), n;
}
const $ = (e, n, t) => e({ data: n.data, context: n.context, sendContext: n.sendContext, method: n.method, next: (r) => {
  var _a, _b;
  const i = { ...n.context, ...r == null ? void 0 : r.context }, c = { ...n.sendContext, ...(_a = r == null ? void 0 : r.sendContext) != null ? _a : {} }, s = M(n.headers, r == null ? void 0 : r.headers);
  return t({ method: n.method, data: n.data, context: i, sendContext: c, headers: s, result: (_b = r == null ? void 0 : r.result) != null ? _b : n.result });
} });
function Ce(e, n) {
  if (e == null) return {};
  if ("~standard" in e) {
    const t = e["~standard"].validate(n);
    if (t instanceof Promise) throw new Error("Async validation not supported");
    if (t.issues) throw new Error(JSON.stringify(t.issues, void 0, 2));
    return t.value;
  }
  if ("parse" in e) return e.parse(n);
  if (typeof e == "function") return e(n);
  throw new Error("Invalid validator type!");
}
async function J(e, n, t) {
  const r = Re(e), i = async (c) => {
    const s = r.shift();
    if (!s) return c;
    s.options.validator && (n !== "client" || s.options.validateClient) && (c.data = await Ce(s.options.validator, c.data));
    const l = n === "client" ? s.options.client : s.options.server;
    return l ? $(l, c, async (d) => {
      if (n === "client" && s.options.clientAfter) {
        const p = await i(d);
        return $(s.options.clientAfter, p, (w) => w);
      }
      return i(d);
    }) : i(c);
  };
  return i({ ...t, headers: t.headers || {}, sendContext: t.sendContext || {}, context: t.context || {} });
}
function Se(e) {
  return { _types: void 0, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: n, sendContext: t, ...r }) => {
    var i;
    const c = await ((i = e.extractedFn) == null ? void 0 : i.call(e, { ...r, context: t }));
    return n(c);
  }, server: async ({ next: n, ...t }) => {
    var r;
    const i = await ((r = e.serverFn) == null ? void 0 : r.call(e, t));
    return n({ result: i });
  } } };
}
async function Ee(e, n, t) {
  var r;
  const i = n[0];
  if (isPlainObject(i) && i.method) {
    const p = i, w = p.data instanceof FormData ? "formData" : "payload", f = new Headers({ ...w === "payload" ? { "content-type": "application/json", accept: "application/json" } : {}, ...p.headers instanceof Headers ? Object.fromEntries(p.headers.entries()) : p.headers || {} });
    if (p.method === "GET") {
      const R = encode({ payload: defaultTransformer.stringify({ data: p.data, context: p.context }) });
      R && (e += `&${R}`);
    }
    const h = new Request(e, { method: p.method, headers: f, ...Oe(p) }), E = await t(h), T = await z(E);
    if ((r = T.headers.get("content-type")) != null && r.includes("application/json")) {
      const R = await T.text(), O = R ? defaultTransformer.parse(R) : void 0;
      if (isRedirect(O) || isNotFound(O)) throw O;
      return O;
    }
    return T;
  }
  const c = new Request(e, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(n) }), s = await z(await t(c)), l = s.headers.get("content-type"), d = await s.text();
  return l && l.includes("application/json") ? d ? JSON.parse(d) : void 0 : d;
}
function Oe(e) {
  var _a;
  return e.method === "POST" ? e.data instanceof FormData ? (e.data.set("__TSR_CONTEXT", defaultTransformer.stringify(e.context)), { body: e.data }) : { body: defaultTransformer.stringify({ data: (_a = e.data) != null ? _a : null, context: e.context }) } : {};
}
async function z(e) {
  if (!e.ok) {
    const n = e.headers.get("content-type"), t = n && n.includes("application/json"), r = await (async () => t ? await e.json() : await e.text())(), i = `Request failed with status ${e.status}`;
    throw t ? new Error(JSON.stringify({ message: i, body: r })) : new Error([i, `${JSON.stringify(r, null, 2)}`].join(`

`));
  }
  return e;
}
function je(e) {
  return e.replace(/^\/|\/$/g, "");
}
function Fe(e, n, t) {
  return `${e}/${je("/_server")}/?_serverFnId=${encodeURI(n)}&_serverFnName=${encodeURI(t)}`;
}
eventHandler(Me);
async function Me(e) {
  return X(ye(e));
}
async function X(e, n) {
  var t, r;
  const i = e.method, c = new URL(e.url, "http://localhost:3000"), s = Object.fromEntries(c.searchParams.entries()), l = s._serverFnId, d = s._serverFnName;
  if (!l || !d) throw new Error("Invalid request");
  j(typeof l == "string", "Invalid server action");
  const p = (r = await ((t = Le("server").chunks[l]) == null ? void 0 : t.import())) == null ? void 0 : r[d], w = await (async () => {
    try {
      const f = await (async () => {
        var E;
        if ((E = e.headers.get("Content-Type")) != null && E.includes("multipart/form-data")) return j(i.toLowerCase() !== "get", "GET requests with FormData payloads are not supported"), await e.formData();
        if (i.toLowerCase() === "get") return s.payload ? defaultTransformer.parse(s.payload) : void 0;
        const T = await e.text();
        return defaultTransformer.parse(T);
      })(), h = await p(f);
      return h instanceof Response ? h : isRedirect(h) || isNotFound(h) ? B(h) : new Response(h !== void 0 ? defaultTransformer.stringify(h) : void 0, { status: ft$1(be()), headers: { "Content-Type": "application/json" } });
    } catch (f) {
      return f instanceof Response ? f : isRedirect(f) || isNotFound(f) ? B(f) : (console.error("Server Fn Error!"), console.error(f), console.info(), new Response(JSON.stringify(f), { status: 500, headers: { "Content-Type": "application/json" } }));
    }
  })();
  if (w.headers.get("Content-Type") === "application/json") {
    const h = await w.clone().text();
    h && JSON.stringify(JSON.parse(h));
  }
  return w;
}
function B(e) {
  const { headers: n, ...t } = e;
  return new Response(JSON.stringify(t), { status: 200, headers: { "Content-Type": "application/json", ...e.headers || {} } });
}
const K = "http://localhost:3000";
function Ae(e, n, t) {
  const r = Fe(K, n, t);
  return Object.assign((...c) => (j(c.length === 1, "Server functions can only accept a single argument"), Ee(r, c, async (s) => {
    const l = be(), d = dt(l);
    return Object.entries(d).forEach(([p, w]) => {
      s.headers.has(p) || s.headers.append(p, w);
    }), X(s);
  })), { url: r.replace(K, ""), filename: n, functionId: t });
}
const F = sqliteTable("category", { id: integer("id").primaryKey(), slug: text("slug").unique().notNull(), name: text("name").notNull(), type: text("type"), icon_path: text("icon_path"), icon_link: text("icon_link"), created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`), updated_at: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`) }), g = sqliteTable("recipes", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), category_id: integer("category_id").notNull().references(() => F.id, { onDelete: "cascade" }), name: text("name").notNull(), slug: text("slug").notNull(), headline: text("headline"), description: text("description"), difficulty: text("difficulty"), prep_time: text("prep_time"), total_time: text("total_time"), image_path: text("image_path"), card_link: text("card_link"), average_rating: text("average_rating"), ratings_count: text("ratings_count"), favorites_count: text("favorites_count"), is_premium: text("is_premium"), website_url: text("website_url"), created_at: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`), updated_at: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`) }), I = sqliteTable("ingredients", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), recipe_id: integer("recipe_id").notNull().references(() => g.id, { onDelete: "cascade" }), name: text("name").notNull() }), q = sqliteTable("utensils", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), recipe_id: integer("recipe_id").notNull().references(() => g.id, { onDelete: "cascade" }), name: text("name").notNull() }), S = sqliteTable("steps", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), recipe_id: integer("recipe_id").notNull().references(() => g.id, { onDelete: "cascade" }), index: integer("index").notNull(), instructions: text("instructions").notNull() }), ke = sqliteTable("images", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), step_id: integer("step_id").notNull().references(() => S.id, { onDelete: "cascade" }), link: text("link"), path: text("path"), caption: text("caption") }), Ie = sqliteTable("timers", { id: integer("id").primaryKey(), oid: text("oid").unique().notNull(), step_id: integer("step_id").notNull().references(() => S.id, { onDelete: "cascade" }), name: text("name"), duration: text("duration"), temperature: text("temperature"), temperature_unit: text("temperature_unit"), oven_mode: text("oven_mode") }), qe = Object.freeze(Object.defineProperty({ __proto__: null, categories: F, images: ke, ingredients: I, recipes: g, steps: S, timers: Ie, utensils: q }, Symbol.toStringTag, { value: "Module" })), V = drizzle("file:recipes.db", { schema: qe }), Pe = b(), Q = k({ method: "GET" }).handler(Ae(De, "c_tnh0t1", "$$function0"), async () => {
  Pe.info("fetching random recipe");
  const n = (await V.select({ id: g.id }).from(g).where(sql$1`(SELECT COUNT(*) FROM ingredients WHERE ingredients.recipe_id = recipes.id) > 3`).orderBy(sql$1`RANDOM()`).limit(1))[0].id, t = await V.select().from(g).leftJoin(F, eq(g.category_id, F.id)).leftJoin(S, eq(g.id, S.recipe_id)).leftJoin(I, eq(I.recipe_id, g.id)).leftJoin(q, eq(q.recipe_id, g.id)).where(eq(g.id, n)), r = t.map((d) => {
    var _a;
    return (_a = d.steps) == null ? void 0 : _a.instructions;
  }), i = t.map((d) => {
    var _a;
    return (_a = d.ingredients) == null ? void 0 : _a.name;
  }), c = new Set(r.filter((d) => d !== void 0)), s = new Set(i.filter((d) => d !== void 0));
  return { ...t[0].recipes, id: void 0, steps: Array.from(c), ingredients: Array.from(s) };
});
function De(e) {
  return Q.__executeServer(e);
}
function v(...e) {
  return twMerge(clsx(e));
}
const Y = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("rounded-xl border bg-card text-card-foreground shadow", e), ...n }));
Y.displayName = "Card";
const Z = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("flex flex-col space-y-1.5 p-6", e), ...n }));
Z.displayName = "CardHeader";
const ee = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("font-semibold leading-none tracking-tight", e), ...n }));
ee.displayName = "CardTitle";
const te = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("text-sm text-muted-foreground", e), ...n }));
te.displayName = "CardDescription";
const ne = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("p-6 pt-0", e), ...n }));
ne.displayName = "CardContent";
const Ue = y.forwardRef(({ className: e, ...n }, t) => jsx("div", { ref: t, className: v("flex items-center p-6 pt-0", e), ...n }));
Ue.displayName = "CardFooter";
const He = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", { variants: { variant: { default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80", secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80", outline: "text-foreground" } }, defaultVariants: { variant: "default" } });
function L({ className: e, variant: n, ...t }) {
  return jsx("div", { className: v(He({ variant: n }), e), ...t });
}
const $e = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", { variants: { variant: { default: "bg-primary text-primary-foreground shadow hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90", outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-9 px-4 py-2", sm: "h-8 rounded-md px-3 text-xs", lg: "h-10 rounded-md px-8", icon: "h-9 w-9" } }, defaultVariants: { variant: "default", size: "default" } }), re = y.forwardRef(({ className: e, variant: n, size: t, asChild: r = false, ...i }, c) => jsx(r ? Slot : "button", { className: v($e({ variant: n, size: t, className: e })), ref: c, ...i }));
re.displayName = "Button";
const Je = N.Root, P = y.forwardRef(({ className: e, ...n }, t) => jsx(N.Item, { ref: t, className: v("border-b", e), ...n }));
P.displayName = "AccordionItem";
const D = y.forwardRef(({ className: e, children: n, ...t }, r) => jsx(N.Header, { className: "flex", children: jsxs(N.Trigger, { ref: r, className: v("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", e), ...t, children: [n, jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })] }) }));
D.displayName = N.Trigger.displayName;
const U = y.forwardRef(({ className: e, children: n, ...t }, r) => jsx(N.Content, { ref: r, className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", ...t, children: jsx("div", { className: v("pb-4 pt-0", e), children: n }) }));
U.displayName = N.Content.displayName;
const ze = (e) => e.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function Be({ recipe: e }) {
  const n = { 1: "Easy", 2: "Medium", 3: "Hard" };
  return jsx("div", { className: "max-w-4xl mx-auto p-4", children: jsxs(Y, { children: [jsxs(Z, { children: [jsx(ee, { className: "text-3xl font-bold", children: e.name }), jsx(te, { className: "text-lg", children: e.headline })] }), jsxs(ne, { children: [jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6", children: [jsxs("div", { className: "flex items-center", children: [jsx(Star, { className: "w-5 h-5 text-yellow-400 mr-2" }), jsxs("span", { children: [e.average_rating, " (", ze(e.ratings_count), " ratings)"] })] }), jsxs("div", { className: "flex items-center", children: [jsx(Clock, { className: "w-5 h-5 text-blue-500 mr-2" }), jsxs("span", { children: ["Prep: ", e.prep_time.replace("PT", "").replace("M", " min")] })] }), jsxs("div", { className: "flex items-center", children: [jsx(ChefHat, { className: "w-5 h-5 text-green-500 mr-2" }), jsxs("span", { children: [e.ingredients.length, " ingredients"] })] }), jsxs("div", { className: "flex items-center", children: [jsx(Heart, { className: "w-5 h-5 text-red-500 mr-2" }), jsxs("span", { children: [e.favorites_count, " favorites"] })] }), jsxs("div", { className: "flex items-center", children: [jsx(Utensils, { className: "w-5 h-5 text-purple-500 mr-2" }), jsxs("span", { children: [e.steps.length, " steps"] })] })] }), jsxs("div", { className: "flex gap-2 mb-6", children: [jsxs(L, { variant: "secondary", children: [n[e.difficulty] || "Unknown", " Difficulty"] }), e.is_premium === "true" && jsx(L, { variant: "destructive", children: "Premium" })] }), jsx("p", { className: "mb-6 text-gray-700", children: e.description }), jsx(re, { asChild: true, className: "w-full mb-6", children: jsx("a", { href: e.card_link, target: "_blank", rel: "noopener noreferrer", children: "View Full Recipe Card" }) }), jsxs(Je, { type: "single", collapsible: true, className: "w-full", children: [jsxs(P, { value: "ingredients", children: [jsx(D, { children: "Ingredients" }), jsx(U, { children: jsx("ul", { className: "list-disc pl-5", children: e.ingredients.map((t, r) => jsx("li", { className: "mb-2", children: t }, r)) }) })] }), jsxs(P, { value: "steps", children: [jsx(D, { children: "Cooking Steps" }), jsx(U, { children: jsx("ol", { className: "list-decimal pl-5", children: e.steps.map((t, r) => jsx("li", { className: "mb-4", children: t }, r)) }) })] })] })] })] }) });
}
const mt = function() {
  const n = W.useLoaderData();
  return jsx("div", { children: jsx(Be, { recipe: n }) });
}, ft = async () => await Q();

export { mt as component, ft as loader };
//# sourceMappingURL=index-tDOaAM9_.mjs.map
