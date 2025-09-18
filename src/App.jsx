import React, { useMemo, useState, useEffect } from "react";

// ───────────────────────────────────────────────────────────
//  Inline brand‑match SVG icons (no external deps)
// ───────────────────────────────────────────────────────────
const baseIcon = (props) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});
const Phone = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.37a2 2 0 0 1-.45 2.11L9 10.5a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 2.11-.45c.77.24 1.56.42 2.37.54A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const ChevronRight = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const Check = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Shield = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const Wrench = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <path d="M14.7 6.3A4 4 0 1 0 9.3 11.7L2 19v3h3l7-7a4 4 0 0 0 2.7-8.7z" />
  </svg>
);
const Truck = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <rect x="1.5" y="7" width="12" height="8" rx="1" />
    <path d="M13.5 8h4l3 3v4h-7" />
    <circle cx="6" cy="17" r="1.6" />
    <circle cx="18" cy="17" r="1.6" />
  </svg>
);
const Info = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="8" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);
const MessageSquareText = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    <line x1="7" y1="8.5" x2="17" y2="8.5" />
    <line x1="7" y1="12.5" x2="14" y2="12.5" />
  </svg>
);
const ShoppingCart = ({ className }) => (
  <svg {...baseIcon({ className })}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

// ───────────────────────────────────────────────────────────
//  Runtime assets (kept as URLs so the preview resolves at run‑time)
// ───────────────────────────────────────────────────────────
const HERO_URL = "/freepik_edit.png"; // coloque o arquivo na raiz/public do sandbox
const LOGO_URL = "/STAGETEK_logo-11.png";
const HERO_PLACEHOLDER =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230e0f12'/%3E%3Cstop offset='1' stop-color='%231a1f2a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23g)'/%3E%3Ctext x='60' y='840' fill='rgba(255,255,255,0.15)' font-family='system-ui,Segoe UI,Roboto,Helvetica,Arial' font-size='40'%3EUpload hero image%3C/text%3E%3C/svg%3E";
const PRODUCT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // 1x1 transparente

// ───────────────────────────────────────────────────────────
//  Shipping mode (PROD): hides edit/upload UI and uses constants
// ───────────────────────────────────────────────────────────
const PROD = true; // ← Coloque true para produção (Vercel). Troque para false se quiser editar no preview.
const CONTENT = {
  heroHeadline:
    "Rig-UP™ is a rigging structural connector, engineered to integrate elements and ensure stability in professional assemblies.",
  heroSub:
    "P/Q25, P/Q30, P/Q50, L15 and LED Q30/Q50 — engineered by Stagetek for fast assembly and high reliability.",
  wa: "5511981728855",
  email: "contato@stagetek.com.br",
};
// Opcional: mapeie imagens finais quando estiverem no /public do Vercel
const DEFAULT_PRODUCT_IMAGES = {
  "Rig-UP P/Q25": "/Foto_Q25.png",
  "Rig-UP P/Q30": "/Foto_Q30.png",
  "Rig-UP P/Q50": "/Foto_Q50.png",
  "Rig-UP L15": "/Foto_L15.png",
  "Rig-UP LED Q30": "/Foto_Rig-UP LED Q30.png",
  "RIG-UPs - Black Versions": "/Foto_Riig_ups_Black.png",
  // ...
};

const getQS = () => {
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
};
const safeGet = (k) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};
const fmtPhone = (n) => (n ? (n.startsWith("+") ? n : "+" + n) : "");
const usd = (n) => `$${Number(n).toFixed(2)}`;

// ───────────────────────────────────────────────────────────
//  Inline tokens (brand colors + effects)
// ───────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────
//  Data
// ───────────────────────────────────────────────────────────
const PRODUCTS = [
  { sku: "Rig-UP P/Q25", variant: ["Silver", "Black"], pitch: "Modular 250–300 mm class system (triangular/square compatible) — lightweight, robust, fast to assemble.", specs: { "for box truss applications (External dimensions)": "P/Q25 250mm", capacity: "Up to 1.0 t (FS 8:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
  { sku: "Rig-UP P/Q30", variant: ["Silver", "Black"], pitch: "Modular 300 mm class for versatile use and great rigidity.", specs: { "for box truss applications (External dimensions)": "P/Q30 300mm", capacity: "High load (FS 8:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
  { sku: "Rig-UP P/Q50", variant: ["Silver", "Black"], pitch: "Modular 500 mm class for long spans and higher loads.", specs: { "for box truss applications (External dimensions)": "P/Q50 500mm", capacity: "High load (FS 8:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
  { sku: "Rig-UP L15", variant: ["Silver", "Black"], pitch: "Perfect for 150 mm box truss setups in hotels and corporate events where safety meets premium design.", specs: { "for box truss applications (External dimensions)": "L15 150mm", capacity: "Project dependent (FS 7:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
  { sku: "Rig-UP LED Q30", variant: ["Silver", "Black"], pitch: "LED Q30 delivers strength and seamless integration for LED panels, line arrays, lighting, stages and scenic designs.", specs: { "for box truss applications (External dimensions)": "P/Q30 300mm", capacity: "Project dependent (FS 8:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
  { sku: "RIG-UPs - Black Versions", variant: ["Silver", "Black"], pitch: "Optimized 500 mm square system for LED panel support.", specs: { "for box truss applications (External dimensions)": "L15 150mm, P/Q25 250mm, P/Q30 300mm, P/Q50 500mm", capacity: "Project dependent (FS 8:1) *", "Innovation & Trust": "Rig-UP is an original Stagetek innovation, engineered, tested and proven in the field, already trusted by major companies across Brazil", material: "Structural steel with chemical treatment for enhanced durability and corrosion resistance" } },
];

const FEATURES = [
  { icon: Shield, title: "Proven Safety", desc: "International patent application registered, tested with F.S. up to 8:1. Does not break under friction with sharp surfaces. Fire resistant and equipped with a safety Lock Pin. Certified engineering product report." },
  { icon: Wrench, title: "Fast & Efficient Assembly", desc: "Smart design, ensuring precise, fast, and reliable installation. Replaces straps and steel cables with more practicality and less risk. Ideal for suspending LED panels, sound systems, lighting, stage design, and lifting box truss structures." },
  { icon: Truck, title: "Optimized Logistics", desc: "Available in Black and Silver models for multiple applications (L15, P25, P30, and P50). Load capacity up to 1 Ton, adaptable to different needs of the event industry." },
];

const EXCHANGE_RATE = "R$5.50 = USD 1.00";
const EXPORT_ITEMS = [
  { model: "P/Q25 Silver", pack: 4, dims: "31.5 × 19.5 × 13 cm", volume: 0.007985, weight: 7.07, pricePack: 335, priceUnit: 83.75 },
  { model: "P/Q30 Silver", pack: 4, dims: "36 × 21.5 × 12.5 cm", volume: 0.009675, weight: 8.6, pricePack: 389, priceUnit: 97.25 },
  { model: "P/Q50 Silver", pack: 2, dims: "55 × 13 × 9.5 cm", volume: 0.006793, weight: 7.4, pricePack: 269, priceUnit: 134.5 },
  { model: "P/Q25 Black", pack: 4, dims: "31.5 × 19.5 × 13 cm", volume: 0.007985, weight: 7.07, pricePack: 345, priceUnit: 86.25 },
  { model: "P/Q30 Black", pack: 4, dims: "36 × 21.5 × 12.5 cm", volume: 0.009675, weight: 8.6, pricePack: 400, priceUnit: 100 },
  { model: "P/Q50 Black", pack: 2, dims: "55 × 13 × 9.5 cm", volume: 0.006793, weight: 7.4, pricePack: 275, priceUnit: 137.5 },
];

const CONTAINER_LOADS = {
  "20’ Dry": [
    { model: "P/Q25", packs: 1260, units: 5040, tons: 8.9 },
    { model: "P/Q30", packs: 960, units: 3840, tons: 8.2 },
    { model: "P/Q50", packs: 1260, units: 2520, tons: 9.3 },
  ],
  "40’ Dry / 40HC": [
    { model: "P/Q25", packs: 2520, units: 10080, tons: 17.8 },
    { model: "P/Q30", packs: 1920, units: 7680, tons: 16.5 },
    { model: "P/Q50", packs: 2520, units: 5040, tons: 18.6 },
  ],
};

const PILOT_ORDER = {
  config: [
    { label: "P25", packs: 40, units: 160, cost: 13600 },
    { label: "P30", packs: 30, units: 120, cost: 11835 },
    { label: "P50", packs: 20, units: 40, cost: 5440 },
  ],
  cost: 30875,
  totalUnits: 420,
};

// ───────────────────────────────────────────────────────────
//  UI helpers
// ───────────────────────────────────────────────────────────
const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({ over, title, desc }) => (
  <div className="mb-10 text-center">
    {over && (
      <p className="text-sm uppercase tracking-widest text-[var(--stagetek-gray)]">{over}</p>
    )}
    <h2 className="mt-2 text-3xl font-semibold text-[var(--stagetek-white)] md:text-4xl">{title}</h2>
    {desc && <p className="mx-auto mt-3 max-w-2xl text-white/80">{desc}</p>}
  </div>
);

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-[var(--stagetek-white)]/90 border-white/20">
      {children}
    </span>
  );
}

function ProductCard({ p, onSpec, waNumber, imgSrc, onUpload, prodMode }) {
  const inputId = `img-${p.sku.replace(/[^a-z0-9]+/gi, "-")}`;
  return (
    <div className="group card-hover relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--stagetek-gray-light)]/40 to-black/20 p-4 shadow-xl">
      <div className="absolute inset-0 metal-sheen opacity-60 transition-opacity group-hover:opacity-80" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-[var(--stagetek-white)]">{p.sku}</h3>
          <Badge>{p.sku === "Rig-UP L15" ? "FS 7:1" : "FS 8:1"}</Badge>
        </div>
        <p className="mt-2 text-sm text-[var(--stagetek-white)]/80">{p.pitch}</p>
        <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 relative">
          <img src={imgSrc || PRODUCT_PLACEHOLDER} alt={`${p.sku} connector`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <input id={inputId} type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(p.sku, e)} />
          {!prodMode && (
            <button onClick={() => document.getElementById(inputId)?.click()} className="absolute right-2 top-2 z-20 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white shadow hover:bg-black/80">
              Upload
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {p.variant.map((v) => (
            <span key={v} className="rounded-full border px-3 py-1 text-xs text-[var(--stagetek-white)]/85 border-white/20">
              {v}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button onClick={() => onSpec(p)} className="btn btn-outline btn-sm">
            <Info className="h-4 w-4" /> View specs
          </button>
          <a href={`https://wa.me/${waNumber}?text=Interested%20in%20Rig-UP%20specs`} target="_blank" className="btn btn-primary btn-sm">
            <ShoppingCart className="h-4 w-4" /> Request a quote
          </a>
        </div>
      </div>
    </div>
  );
}

function SpecModal({ open, onClose, data }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f12] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--stagetek-white)] leading-tight">{data?.sku}</h4>
            <p className="mt-1 text-sm text-[var(--stagetek-white)]/75">Technical specifications</p>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-sm sm:btn">Close</button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3">
          {Object.entries(data?.specs || {}).map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wide text-[var(--stagetek-gray)] mb-1">{k}</p>
              <p className="text-sm text-[var(--stagetek-white)] leading-relaxed">{String(v)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--stagetek-gray)] leading-relaxed">* Load capacity depends on configuration, spans, bracing, and accessories. Contact Stagetek engineering for sizing. All dimensions are in metric system as used in Brazil.</p>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
//  Main page
// ───────────────────────────────────────────────────────────
export default function Page() {
  const [specOpen, setSpecOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const [heroUrl, setHeroUrl] = useState(() => (PROD ? HERO_URL : getQS().get("hero") || safeGet("heroURL") || HERO_URL));
  const [logoUrl, setLogoUrl] = useState(() => (PROD ? LOGO_URL : getQS().get("logo") || safeGet("logoURL") || LOGO_URL));
  const [waNumber, setWaNumber] = useState(() => (PROD ? CONTENT.wa : getQS().get("wa") || safeGet("wa") || CONTENT.wa));
  const [emailAddr, setEmailAddr] = useState(() => (PROD ? CONTENT.email : getQS().get("email") || safeGet("email") || CONTENT.email));

  // Robust migration of product image keys stored in localStorage
  const [productImages, setProductImages] = useState(() => (PROD ? DEFAULT_PRODUCT_IMAGES : (() => {
    try {
      const rawStr = safeGet("productImages");
      if (!rawStr) return {};
      const raw = JSON.parse(rawStr || "{}");
      const validSkus = new Set(PRODUCTS.map((p) => p.sku));
      const mapKeyToSku = (k) => {
        const s = String(k).toLowerCase().replace(/rig[- ]?up/g, "").replace(/[^a-z0-9]/g, "");
        if (s.includes("l15")) return "Rig-UP L15";
        if (/(ledq30|q30led)/.test(s)) return "Rig-UP LED Q30";
        if (/(ledq50|q50led)/.test(s)) return "Rig-UP LED Q50";
        if (/(pq?25|p25)/.test(s)) return "Rig-UP P/Q25";
        if (/(pq?30|p30)/.test(s)) return "Rig-UP P/Q30";
        if (/(pq?50|p50)/.test(s)) return "Rig-UP P/Q50";
        return null;
      };
      const migrated = {};
      Object.entries(raw).forEach(([k, v]) => {
        let sku = mapKeyToSku(k);
        if (!sku) {
          const tmp = String(k)
            .replace(/RigUP/g, "Rig-UP")
            .replace(/P25/g, "P/Q25")
            .replace(/P30/g, "P/Q30")
            .replace(/P50/g, "P/Q50");
          sku = validSkus.has(tmp) ? tmp : null;
        }
        if (sku && validSkus.has(sku)) migrated[sku] = v;
      });
      if (Object.keys(migrated).length) {
        safeSet("productImages", JSON.stringify(migrated));
        return migrated;
      }
      return raw;
    } catch { return {}; }
  })()));

  const [heroHeadline, setHeroHeadline] = useState(() => (PROD ? CONTENT.heroHeadline : getQS().get("headline") || safeGet("headline") || CONTENT.heroHeadline));
  const [heroSub, setHeroSub] = useState(() => (PROD ? CONTENT.heroSub : getQS().get("sub") || safeGet("sub") || CONTENT.heroSub));

  // Fullscreen helpers
  const [isFs, setIsFs] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const toggleFS = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
        setImmersive(false);
      } else {
        const p = document.documentElement.requestFullscreen?.();
        if (p && typeof p.then === "function") {
          p.catch(() => setImmersive((v) => !v));
        } else {
          setImmersive((v) => !v);
        }
      }
    } catch {
      setImmersive((v) => !v);
    }
  };
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const openSpecs = (p) => {
    setCurrent(p);
    setSpecOpen(true);
  };

  const fileToDataURL = (file) =>
    new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.readAsDataURL(file);
    });

  const onPickHero = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const data = await fileToDataURL(f);
    setHeroUrl(data);
    safeSet("heroURL", data);
    e.target.value = "";
  };

  const onPickLogo = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const data = await fileToDataURL(f);
    setLogoUrl(data);
    safeSet("logoURL", data);
    e.target.value = "";
  };

  const setProductImageFor = (sku, url) => {
    setProductImages((prev) => {
      const next = { ...prev, [sku]: url };
      safeSet("productImages", JSON.stringify(next));
      return next;
    });
  };
  const onPickProduct = async (sku, e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const data = await fileToDataURL(f);
    setProductImageFor(sku, data);
    e.target.value = "";
  };

  const onEditContent = () => {
    const h = prompt("Hero headline:", heroHeadline);
    if (h !== null) {
      setHeroHeadline(h);
      safeSet("headline", h);
    }
    const s = prompt("Hero subtext:", heroSub);
    if (s !== null) {
      setHeroSub(s);
      safeSet("sub", s);
    }
    const w = prompt("WhatsApp number (digits only, e.g., 5511999999999):", waNumber);
    if (w !== null) {
      setWaNumber(w);
      safeSet("wa", w);
    }
    const e2 = prompt("Contact email:", emailAddr);
    if (e2 !== null) {
      setEmailAddr(e2);
      safeSet("email", e2);
    }
  };

  const exportPreset = () => {
    const payload = {
      heroUrl,
      logoUrl,
      waNumber,
      emailAddr,
      heroHeadline,
      heroSub,
      productImages,
      ts: new Date().toISOString(),
      v: 1,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rigup-landing-preset.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 300);
  };

  const importPreset = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const data = JSON.parse(text);
      if (data.heroUrl) {
        setHeroUrl(data.heroUrl);
        safeSet("heroURL", data.heroUrl);
      }
      if (data.logoUrl) {
        setLogoUrl(data.logoUrl);
        safeSet("logoURL", data.logoUrl);
      }
      if (data.waNumber) {
        setWaNumber(data.waNumber);
        safeSet("wa", data.waNumber);
      }
      if (data.emailAddr) {
        setEmailAddr(data.emailAddr);
        safeSet("email", data.emailAddr);
      }
      if (data.heroHeadline) {
        setHeroHeadline(data.heroHeadline);
        safeSet("headline", data.heroHeadline);
      }
      if (data.heroSub) {
        setHeroSub(data.heroSub);
        safeSet("sub", data.heroSub);
      }
      if (data.productImages) {
        setProductImages(data.productImages);
        safeSet("productImages", JSON.stringify(data.productImages));
      }
    } catch {
      alert("Invalid preset file.");
    }
    e.target.value = "";
  };

  const perks = useMemo(
    () => [
      "Patent pending",
      "Rated up to 1.0 t (FS 8:1)",
      "Fast, modular assembly",
      "On‑demand engineering support",
    ],
    []
  );

  return (
    <div className={`min-h-screen bg-[#0d0f14] text-[var(--stagetek-white)] grain ${
      immersive ? "immersive" : ""
    }`}>

      {/* NAV */}
      <header className="hide-immersive sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
        <Container>
          <input id="hero-file" type="file" accept="image/*" className="hidden" onChange={onPickHero} />
          <input id="logo-file" type="file" accept="image/*" className="hidden" onChange={onPickLogo} />
          <input id="import-file" type="file" accept="application/json" className="hidden" onChange={importPreset} />
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Stagetek logo"
                className="h-10 w-auto md:h-12"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <a href="#products" className="text-sm text-[var(--stagetek-white)]/85 hover:text-white">
                Products
              </a>
              <a href="#export" className="hidden sm:block text-sm text-[var(--stagetek-white)]/85 hover:text-white">
                Export
              </a>
              <a href="#benefits" className="hidden sm:block text-sm text-[var(--stagetek-white)]/85 hover:text-white">
                Benefits
              </a>
              <a href="#contact" className="text-sm text-[var(--stagetek-white)]/85 hover:text-white">
                Contact
              </a>
              <a href={`https://wa.me/${waNumber}?text=Interested%20in%20Rig-UP`} target="_blank" className="btn btn-primary btn-sm md:btn">
                <Phone className="h-4 w-4" /> <span className="hidden sm:inline">Chat on WhatsApp</span><span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </nav>
        </Container>
      </header>
      {immersive && (
        <button onClick={toggleFS} className="fixed top-4 right-4 z-[60] rounded-full bg-black/60 px-3 py-1 text-xs text-white shadow hover:bg-black/80">
          Exit Fullscreen
        </button>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0e0f12] hero-smoke hero-full">
        <div className="absolute inset-0 z-0">
          <img
            src={heroUrl || HERO_PLACEHOLDER}
            alt="Rig-UP connector hero"
            className="h-full w-full object-cover opacity-90 hero-img"
            onError={(e) => {
              if (e.currentTarget.src !== HERO_PLACEHOLDER) {
                e.currentTarget.src = HERO_PLACEHOLDER;
              } else {
                e.currentTarget.style.display = "none";
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-10 hero-overlay" />
        </div>
        <Container>
          <div className="relative z-20 grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>Professional rigging</Badge>
                <Badge>Patent pending</Badge>
                <Badge>FS 8:1</Badge>
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight text-white md:text-4xl">{heroHeadline}</h1>
              <p className="mt-4 max-w-xl text-lg text-white/80">{heroSub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#products" className="btn btn-primary">
                  See products <ChevronRight className="h-4 w-4" />
                </a>
                <a href={`https://wa.me/${waNumber}?text=Interested%20in%20Rig-UP`} target="_blank" className="btn btn-outline">
                  Request a quote
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
                {perks.map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block" />
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section id="benefits" className="border-b border-white/10 bg-black/30 py-14">
        <Container>
          <SectionTitle over="Benefits" title="Why Rig-UP?" desc="Designed by stage professionals for productive, safe assemblies." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <f.icon className="h-6 w-6 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--stagetek-white)]">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--stagetek-white)]/80">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="border-b border-white/10 bg-[#0e0f12] py-16 products-smoke">
        <Container>
          <SectionTitle over="Products" title="Rig-UP product line" desc="Systems for different spans, loads and scenarios." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.sku} p={p} onSpec={openSpecs} waNumber={waNumber} imgSrc={productImages[p.sku]} onUpload={onPickProduct} prodMode={PROD} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[var(--stagetek-white)]/60">Images and technical data may vary by configuration. Contact us for engineering and sizing.</p>
        </Container>
      </section>

      {/* EXPORT PRICING & PACKAGING */}
      <section id="export" className="border-b border-white/10 bg-black/30 py-16">
        <Container>
          <SectionTitle over="Section 1" title="Export Pricing & Packaging" desc={`Exchange rate applied: ${EXCHANGE_RATE}. Prices are based on the official São Paulo full price list (gross prices, no discounts).`} />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/90">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Product</th>
                  <th className="px-3 py-2 text-left font-semibold">Pack size</th>
                  <th className="px-3 py-2 text-left font-semibold">Dimensions</th>
                  <th className="px-3 py-2 text-left font-semibold">Volume (m³)</th>
                  <th className="px-3 py-2 text-left font-semibold">Gross weight (kg)</th>
                  <th className="px-3 py-2 text-left font-semibold">Export price / pack</th>
                  <th className="px-3 py-2 text-left font-semibold">Unit price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/85">
                {EXPORT_ITEMS.map((it) => (
                  <tr key={it.model} className="hover:bg-white/3">
                    <td className="px-3 py-2">{it.model}</td>
                    <td className="px-3 py-2">{it.pack} units</td>
                    <td className="px-3 py-2">{it.dims}</td>
                    <td className="px-3 py-2">{it.volume.toFixed(6)}</td>
                    <td className="px-3 py-2">{it.weight.toFixed(2)}</td>
                    <td className="px-3 py-2">{usd(it.pricePack)}</td>
                    <td className="px-3 py-2">{usd(it.priceUnit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* CONTAINER LOADING */}
      <section className="border-b border-white/10 bg-[#0e0f12] py-16">
        <Container>
          <SectionTitle over="Section 2" title="Container Loading (Full Loads – Single Model)" desc="All calculations based on palletized cargo (1.20 × 1.00 m, 1.20 m high, ~1,000 kg per pallet). Payloads remain below container limits." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.entries(CONTAINER_LOADS).map(([label, rows]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white">{label} Container</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-3 py-2 text-left">Model</th>
                        <th className="px-3 py-2 text-left">Packs</th>
                        <th className="px-3 py-2 text-left">Units</th>
                        <th className="px-3 py-2 text-left">≈ Tons</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white/85">
                      {rows.map((r) => (
                        <tr key={r.model}>
                          <td className="px-3 py-2">{r.model}</td>
                          <td className="px-3 py-2">{r.packs.toLocaleString()}</td>
                          <td className="px-3 py-2">{r.units.toLocaleString()}</td>
                          <td className="px-3 py-2">{r.tons.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PILOT ORDER */}
      <section className="border-b border-white/10 bg-black/30 py-16">
        <Container>
          <SectionTitle over="Section 3" title="Pilot Order (Mixed Models)" desc="For distributors starting with RigUP®, we recommend a pilot order to test market acceptance:" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ul className="grid grid-cols-1 gap-3 text-white/85 sm:grid-cols-3">
              {PILOT_ORDER.config.map((c) => (
                <li key={c.label} className="rounded-lg bg-white/[0.04] p-4">
                  <div className="font-semibold text-white">{c.packs} packs {c.label} ({c.units} units)</div>
                  <div className="text-brand font-semibold mt-1">→ {usd(c.cost)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-white">
              <p className="text-lg font-semibold">
                Pilot Order Cost (FOB São Paulo): <span className="text-brand">{usd(PILOT_ORDER.cost)}</span>
              </p>
              <p className="text-white/85">
                Total Units: <span className="font-semibold">{PILOT_ORDER.totalUnits}</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* DISTRIBUTOR PROGRAM */}
      <section className="border-b border-white/10 bg-[#0e0f12] py-16">
        <Container>
          <SectionTitle over="Section 4" title="Distributor Partnerships & Market Opportunities" desc="We are committed to long-term, strategic relationships with international distributors." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white">Official Distributor Program</h3>
              <ul className="mt-3 space-y-2 text-white/85">
                <li>Exclusive rights by country: negotiable, subject to joint analysis of forecasts and commitments.</li>
                <li>Flexible conditions: terms tailored to projected demand and investment scenarios.</li>
                <li>Support package: technical docs, marketing materials, and priority launch updates.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white">Private Label & Custom Branding</h3>
              <p className="mt-2 text-white/85">Rig-UP® devices can be manufactured under your own brand (OEM). Customization options include:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-white/85">
                <li>Logo engraving or printing on the product</li>
                <li>Branded packaging and documentation</li>
                <li>Tailored marketing and promotional assets</li>
              </ul>
              <p className="mt-3 text-white/85">This flexibility empowers distributors to strengthen local presence while leveraging our Brazilian manufacturing standards.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* NOTES */}
      <section className="border-b border-white/10 bg-black/30 py-16">
        <Container>
          <SectionTitle over="Section 5" title="Notes" />
          <ul className="mx-auto max-w-3xl list-disc space-y-2 pl-5 text-white/85">
            <li>All prices are FOB São Paulo, Brazil.</li>
            <li>Prices are based on the São Paulo full price list (gross prices, no discounts).</li>
            <li>Exchange rate applied for this table: {EXCHANGE_RATE}.</li>
            <li>Shipping, insurance, and import duties are not included.</li>
            <li>Customized mixes and alternative packaging available on request.</li>
            <li>MOQ for full container loads: 1×20’ or 1×40’ container.</li>
            <li>More details on exclusivity, pricing structures, and private label may be shared under mutual NDA.</li>
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-brand py-14 text-[var(--stagetek-white)]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">
                Want to accelerate your next show with <span className="whitespace-nowrap">Rig‑UP</span>?
              </h3>
              <p className="mt-2 text-white/85">Talk to our technical team and get a tailored sizing.</p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 md:justify-end">
              <a href={`https://wa.me/${waNumber}?text=Interested%20in%20Rig-UP`} target="_blank" className="btn btn-primary">
                <MessageSquareText className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a href="#contact" className="btn btn-outline-inverse">See contact channels</a>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#0e0f12] py-16">
        <Container>
          <SectionTitle over="Contact" title="Contact Stagetek" desc="Corporate service, consulting engineering and commercial terms." />
          <div className={`grid grid-cols-1 gap-6 ${PROD ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h4 className="font-semibold text-[var(--stagetek-white)]">WhatsApp</h4>
              <p className="mt-1 text-sm text-[var(--stagetek-white)]/80">{fmtPhone(waNumber)}</p>
              <a className="mt-3 inline-block text-sm text-brand hover:underline" target="_blank" href={`https://wa.me/${waNumber}`}>
                Open chat
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h4 className="font-semibold text-[var(--stagetek-white)]">E‑mail</h4>
              <p className="mt-1 text-sm text-[var(--stagetek-white)]/80">{emailAddr}</p>
              <a className="mt-3 inline-block text-sm text-brand hover:underline" href={`mailto:${emailAddr}`}>
                Send e‑mail
              </a>
            </div>
{!PROD && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h4 className="font-semibold text-[var(--stagetek-white)]">Preset</h4>
              <p className="mt-1 text-sm text-[var(--stagetek-white)]/80">Export or import your current configuration.</p>
              <div className="mt-3 flex gap-3">
                <button onClick={exportPreset} className="btn btn-outline btn-sm">Save preset</button>
                <button onClick={() => document.getElementById("import-file")?.click()} className="btn btn-outline btn-sm">Load preset</button>
              </div>
            </div>
            )}
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/70 py-6 text-center text-sm text-white/70">
        <Container>
          <p>© {new Date().getFullYear()} STAGETEK — Systems & Solutions. All rights reserved.</p>
        </Container>
      </footer>

      <SpecModal open={specOpen} onClose={() => setSpecOpen(false)} data={current} />
    </div>
  );
}
