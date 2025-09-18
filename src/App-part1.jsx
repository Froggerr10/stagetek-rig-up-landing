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