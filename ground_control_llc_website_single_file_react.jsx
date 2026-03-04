import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Construction,
  Handshake,
  LandPlot,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X,
  Zap,
  Workflow,
} from "lucide-react";

/**
 * Ground Control, LLC — high-end, fast, accessible marketing site
 * Single-file React component (Canvas preview-ready)
 *
 * Notes:
 * - Replace placeholders in SITE at bottom (phone/email/address/service areas)
 * - Wire form submission to your endpoint (Formspree, HubSpot, custom API) in handleSubmit
 * - For production, move into Next.js/Remix and generate true pages + sitemap/robots
 */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = { id: string; label: string };

const nav: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "locations", label: "Locations" },
  { id: "process", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const STATE_PAGES = [
  {
    id: "iowa",
    state: "Iowa",
    abbr: "IA",
    headline: "Iowa land services for wind, solar, storage, and transmission",
    bullets: [
      "Lease/option/easement support and exhibit coordination",
      "Landowner outreach, meetings, and follow-up documentation",
      "County engagement and permitting support",
      "Construction access coordination and issue resolution",
    ],
    faq: [
      {
        q: "Do you cover the entire state?",
        a: "Yes. We operate statewide and can deploy across multiple counties based on footprint and schedule.",
      },
      {
        q: "Can you support transmission and interconnect corridors?",
        a: "Yes. We routinely support ROW / easement work and stakeholder coordination tied to transmission and interconnect needs.",
      },
    ],
  },
  {
    id: "nebraska",
    state: "Nebraska",
    abbr: "NE",
    headline: "Nebraska site acquisition and stakeholder execution",
    bullets: [
      "Site control scale-up for utility projects",
      "Landowner relations and signature logistics",
      "Permit documentation support and local engagement",
      "Construction communication with landowners and contractors",
    ],
    faq: [
      {
        q: "Do you handle rural outreach and door-to-door meetings?",
        a: "Yes. We’re field-first and comfortable in high-touch, relationship-driven outreach.",
      },
      {
        q: "Can you integrate with our internal reporting tools?",
        a: "Yes. We align to your cadence and deliverables (weekly status, risks, next actions, parcel tracking).",
      },
    ],
  },
  {
    id: "kansas",
    state: "Kansas",
    abbr: "KS",
    headline: "Kansas land and ROW support for energy development",
    bullets: [
      "ROW / easement coordination and exhibit QA",
      "Landowner meetings and objection handling",
      "Permit coordination support across jurisdictions",
      "Field reporting and issue escalation",
    ],
    faq: [
      {
        q: "Do you support pipeline and natural gas projects in Kansas?",
        a: "Yes. We support ROW execution, landowner engagement, and contractor alignment for infrastructure work.",
      },
      {
        q: "Can you surge staffing for tight timelines?",
        a: "Yes. We can deploy quickly for focused pushes (signatures, access planning, construction coordination).",
      },
    ],
  },
  {
    id: "missouri",
    state: "Missouri",
    abbr: "MO",
    headline: "Missouri permitting support and landowner coordination",
    bullets: [
      "Landowner outreach with clear documentation",
      "County/stakeholder engagement support",
      "Site control coordination across large footprints",
      "Construction access and communications",
    ],
    faq: [
      {
        q: "Can you work alongside our local consultants?",
        a: "Yes. We coordinate cleanly with local teams and keep one source of truth for actions and documentation.",
      },
      {
        q: "Do you provide project-based scopes?",
        a: "Yes—project-based, hourly, or daily models depending on phase and urgency.",
      },
    ],
  },
  {
    id: "south-dakota",
    state: "South Dakota",
    abbr: "SD",
    headline: "South Dakota field execution for utility-scale projects",
    bullets: [
      "Land services and site control logistics",
      "Landowner relations with consistent follow-up",
      "Stakeholder engagement support",
      "Construction coordination and access planning",
    ],
    faq: [
      {
        q: "Do you cover large rural footprints?",
        a: "Yes. We’re built for multi-county footprints and remote coordination.",
      },
      {
        q: "Can you support both renewables and infrastructure?",
        a: "Yes. We support wind/solar/BESS as well as ROW-heavy infrastructure work.",
      },
    ],
  },
  {
    id: "colorado",
    state: "Colorado",
    abbr: "CO",
    headline: "Colorado land services for energy and infrastructure",
    bullets: [
      "Site control and ROW coordination",
      "Landowner engagement and documentation discipline",
      "Permitting coordination support",
      "Construction-phase communication and issue resolution",
    ],
    faq: [
      {
        q: "Do you support multi-state rollouts that include Colorado?",
        a: "Yes. We commonly support multi-state footprints and maintain consistent reporting across regions.",
      },
      {
        q: "Can you handle stakeholder complexity in mixed-use areas?",
        a: "Yes. We prioritize clear communication, accurate exhibits, and early issue identification.",
      },
    ],
  },
] as const;

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
      {children}
    </span>
  );
}

function Pill({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="relative flex items-start gap-4">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5 text-white/90" />
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-white/70">{desc}</p>
    </div>
  );
}

function DividerGlow() {
  return (
    <div className="mx-auto mt-14 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );
}

function PrimaryButton({
  children,
  onClick,
  href,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const common = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
    "bg-white text-black shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
    "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    className
  );

  if (href) {
    return (
      <a className={common} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={common} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  href,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const common = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
    "border border-white/15 bg-white/[0.04] text-white",
    "transition-colors duration-200 hover:bg-white/[0.07]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    className
  );

  if (href) {
    return (
      <a className={common} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={common} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
        {label}
      </div>
    </div>
  );
}

function Card({
  title,
  bullets,
  icon: Icon,
}: {
  title: string;
  bullets: string[];
  icon: any;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Icon className="h-5 w-5 text-white/90" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-white/75">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/75" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-white/70 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-white/75">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useStickyHeaderShadow() {
  const [shadow, setShadow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return shadow;
}

export default function GroundControlWebsite() {
  const reducedMotion = useReducedMotionSafe();
  const active = useActiveSection(nav.map((n) => n.id));
  const headerShadow = useStickyHeaderShadow();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [faqOpen, setFaqOpen] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("​idle");

  const SITE = useMemo(
    () => ({
      businessName: "Ground Control, LLC",
      tagline: "On-the-ground execution for energy development.",
      phone: "402-669-2419",
      phoneHref: "tel:+14026692419",
      email: "contact@groundcontrol-llc.com",
      emailHref: "mailto:contact@groundcontrol-llc.com",
      locationLine: "Omaha, Nebraska • Serving IA, NE, KS, MO, SD & CO",
      serviceAreas: "Iowa • Nebraska • Kansas • Missouri • South Dakota • Colorado",
      heroTitle: "Site Control. Permitting. Execution.",
      heroSubtitle:
        "We help developers move energy projects forward—from concept through construction—by solving the on-the-ground work that determines speed, certainty, and results.",
      ctaPrimary: "Request a Call",
      ctaSecondary: "View Services",
      seoDescription:
        "Ground Control, LLC provides site acquisition, landowner relations, permitting coordination, and construction support for wind, solar, BESS, transmission, pipeline, and natural gas infrastructure across IA, NE, KS, MO, SD, and CO.",
      seoDescription:
        "Ground Control, LLC provides site acquisition, landowner relations, permitting coordination, and construction support for wind, solar, storage, pipeline, and natural gas infrastructure projects across the United States.",
      seoKeywords:
        "land services, site acquisition, landowner relations, wind development, solar development, BESS, transmission, pipeline development, natural gas infrastructure, permitting coordination, easements, right-of-way, Iowa, Nebraska, Kansas, Missouri, South Dakota, Colorado",
      legalName: "Ground Control, LLC",
      // Replace with your real URL when deployed
      websiteUrl: "https://groundcontrol-llc.com",
    }),
    []
  );

  // Basic SEO in a single-file component (works if embedded in an app with head access)
  useEffect(() => {
    document.title = SITE.seoTitle;

    const ensureMeta = (name: string, content: string, attr: "name" | "property") => {
      const selector = attr === "name" ? `meta[name='${name}']` : `meta[property='${name}']`;
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta("description", SITE.seoDescription, "name");
    ensureMeta("keywords", SITE.seoKeywords, "name");
    ensureMeta("og:title", SITE.seoTitle, "property");
    ensureMeta("og:description", SITE.seoDescription, "property");
    ensureMeta("og:type", "website", "property");

    // JSON-LD LocalBusiness schema
    const ldId = "gc-jsonld";
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = ldId;
    script.text = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.legalName,
        url: SITE.websiteUrl,
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: SITE.serviceAreas,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Omaha",
          addressRegion: "NE",
          addressCountry: "US",
        },
      },
      null,
      2
    );
    document.head.appendChild(script);

    // Smooth focus outline visibility only when keyboarding
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") document.documentElement.classList.add("user-is-tabbing");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [SITE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("sending");

    try {
      // TODO: Replace with your form handler
      // Example: await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) })
      await new Promise((r) => setTimeout(r, 650));
      setSubmitState("sent");
      setForm({ name: "", email: "", phone: "", company: "", state: "", message: "" });

      // Reset message after a moment
      setTimeout(() => setSubmitState("idle"), 2500);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 2500);
    }
  };

  const heroMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
      };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* Tailwind-only styles + a11y focus helper */}
      <style>{`
        html { scroll-behavior: smooth; }
        .user-is-tabbing :focus { outline: none; }
        .user-is-tabbing :focus-visible { outline: 2px solid rgba(255,255,255,0.9); outline-offset: 2px; }
      `}</style>

      {/* Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_circle_at_80%_30%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(1100px_circle_at_50%_90%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Skip link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      {/* Header */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full",
          "backdrop-blur-xl",
          headerShadow
            ? "border-b border-white/10 bg-black/65"
            : "bg-black/35"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Zap className="h-5 w-5 text-white/90" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{SITE.businessName}</div>
              <div className="text-xs text-white/60">{SITE.tagline}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active === n.id
                    ? "bg-white/10 text-white"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                )}
              >
                {n.label}
              </button>
            ))}
            <PrimaryButton
              onClick={() => scrollToId("contact")}
              className="ml-2"
            >
              {SITE.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </nav>

          <button
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-4 w-[92%] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div className="text-sm font-semibold">Menu</div>
                <button
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-2"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-3 pb-4">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium",
                      active === n.id ? "bg-white/10" : "hover:bg-white/5"
                    )}
                    onClick={() => {
                      setMobileOpen(false);
                      scrollToId(n.id);
                    }}
                  >
                    <span>{n.label}</span>
                    <ArrowRight className="h-4 w-4 text-white/60" />
                  </button>
                ))}
                <div className="mt-3 px-3">
                  <PrimaryButton
                    onClick={() => {
                      setMobileOpen(false);
                      scrollToId("contact");
                    }}
                    className="w-full"
                  >
                    {SITE.ctaPrimary} <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="relative pt-24 pb-24 md:pb-0">
        {/* HERO */}
        <section id="home" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...heroMotion}>
              <div className="flex flex-wrap gap-2">
                <Badge>Site Acquisition</Badge>
                <Badge>Permitting & Stakeholders</Badge>
                <Badge>Construction Coordination</Badge>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {SITE.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                {SITE.heroSubtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton onClick={() => scrollToId("contact")}>
                  {SITE.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton onClick={() => scrollToId("services")}
                  >
                  {SITE.ctaSecondary}
                </SecondaryButton>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
                <Stat value="25+" label="Years Combined" />
                <Stat value="Multi-State" label="Field Coverage" />
                <Stat value="End-to-End" label="Project Support" />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {SITE.locationLine}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Operator-minded execution
                </span>
              </div>
            </motion.div>

            {/* Hero visual */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-white/15 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Capabilities</div>
                  <div className="text-xs text-white/60">Fast. Accurate. Accountable.</div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Pill
                    icon={LandPlot}
                    title="Site Control"
                    desc="Easements, leases, options, title coordination, landowner negotiations."
                  />
                  <Pill
                    icon={ClipboardList}
                    title="Permitting Support"
                    desc="Local engagement, documentation, agency coordination, hearing prep."
                  />
                  <Pill
                    icon={Handshake}
                    title="Stakeholder Management"
                    desc="Landowners, counties, utilities, contractors—clear communication."
                  />
                  <Pill
                    icon={Construction}
                    title="Construction Coordination"
                    desc="Field execution, access plans, schedule alignment, issue resolution."
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-sm font-semibold">Industries</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Wind", "Solar", "BESS", "Transmission", "Pipeline", "Natural Gas"].map((x) => (
                      <span
                        key={x}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/80"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DividerGlow />

          <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Developer-focused</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We plug into your team as a reliable field arm—reducing friction and
                increasing certainty.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Landowner-first</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Clear expectations, respectful outreach, and documentation that
                prevents problems later.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold">Execution discipline</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We operate like owners—tracking details, timelines, and deliverables.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="What we do"
            title="Field execution that moves projects forward"
            desc="Pick the scope you need. We support developers with site control, permitting coordination, stakeholder management, and construction-phase problem solving."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={LandPlot}
              title="Site Acquisition & Title Coordination"
              bullets={[
                "Lease/option/easement negotiation support",
                "Landowner outreach and relationship management",
                "Title, survey, and exhibit coordination",
                "Right-of-way access planning",
              ]}
            />
            <Card
              icon={ClipboardList}
              title="Permitting & Local Engagement"
              bullets={[
                "County and township coordination",
                "Permit application documentation support",
                "Public meeting support and messaging alignment",
                "Stakeholder Q&A and objection handling",
              ]}
            />
            <Card
              icon={Workflow}
              title="Project Ops & Schedule Alignment"
              bullets={[
                "Cross-team coordination and reporting",
                "Constraint tracking and issue escalation",
                "Contractor interface support",
                "Risk/impact documentation",
              ]}
            />
            <Card
              icon={Construction}
              title="Construction Coordination"
              bullets={[
                "Access road and laydown coordination",
                "Landowner communication during construction",
                "On-site issue resolution",
                "Punch list support and closeout docs",
              ]}
            />
            <Card
              icon={Handshake}
              title="Stakeholder Management"
              bullets={[
                "Landowners, utilities, agencies, and contractors",
                "Clear cadence, notes, and follow-ups",
                "Conflict de-escalation",
                "Professional representation in the field",
              ]}
            />
            <Card
              icon={ShieldCheck}
              title="Compliance & Documentation"
              bullets={[
                "Chain-of-custody for exhibits and signatures",
                "Data hygiene for project records",
                "Change tracking",
                "Audit-ready organization",
              ]}
            />
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Where we operate"
            title="Renewables + traditional energy infrastructure"
            desc="We’re built for complex, multi-stakeholder development environments—expanding beyond renewables into pipelines, natural gas, and integrated energy solutions."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Renewable Energy</div>
                  <div className="text-sm text-white/70">Wind • Solar • BESS • Transmission</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {["Site control at scale", "Permitting and county engagement", "Landowner communications", "Construction access and coordination"].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Energy Infrastructure</div>
                  <div className="text-sm text-white/70">Pipeline • Natural Gas • Integrated Solutions</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {["ROW and easement coordination", "Stakeholder and landowner engagement", "Field documentation and reporting", "Schedule alignment with contractors"].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold">Primary coverage area</div>
                <div className="mt-1 text-sm text-white/70">{SITE.serviceAreas}</div>
              </div>
              <SecondaryButton onClick={() => scrollToId("contact")}>Discuss a project <ArrowRight className="h-4 w-4" /></SecondaryButton>
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section id="locations" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Service areas"
            title="IA • NE • KS • MO • SD • CO"
            desc="Search-friendly, state-specific coverage. Click a state for a detailed overview of what we deliver on the ground."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATE_PAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToId(s.id)}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{s.state}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">{s.abbr}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5" />
                </div>
                <div className="mt-4 text-sm leading-relaxed text-white/75">{s.headline}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Land Services", "Site Control", "ROW", "Permitting"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            {STATE_PAGES.map((s, idx) => (
              <div key={s.id} id={s.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      {s.state}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{s.headline}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Ground Control provides land services and field execution in {s.state} for wind, solar, BESS, transmission, and infrastructure development. We support developers with site control, landowner relations, permitting coordination, and construction-phase communication.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <SecondaryButton href={SITE.phoneHref}><Phone className="h-4 w-4" /> Call</SecondaryButton>
                    <SecondaryButton href={SITE.emailHref}><Mail className="h-4 w-4" /> Email</SecondaryButton>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="text-sm font-semibold">What we deliver in {s.abbr}</div>
                      <ul className="mt-4 space-y-2 text-sm text-white/75">
                        {s.bullets.map((x) => (
                          <li key={x} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="text-sm font-semibold">FAQs</div>
                      <div className="mt-4 space-y-3">
                        {s.faq.map((f, i) => (
                          <FAQItem
                            key={f.q}
                            q={f.q}
                            a={f.a}
                            open={faqOpen === 1000 + idx * 10 + i}
                            onToggle={() =>
                              setFaqOpen(
                                faqOpen === 1000 + idx * 10 + i ? -1 : 1000 + idx * 10 + i
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="How we work"
            title="Simple process. Clear deliverables. High accountability."
            desc="We keep momentum by aligning scope, cadence, and reporting—so your internal team stays focused on the big moves while we handle the field execution."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold">1) Scope + timeline</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Define geography, target parcels, deliverables, reporting cadence,
                and escalation rules.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Handshake className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold">2) Field execution</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Landowner meetings, exhibit coordination, permitting support, and
                on-the-ground issue resolution.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Workflow className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold">3) Reporting + closeout</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Weekly status, risks, next actions, and clean handoff of
                documentation—ready for the next phase.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-sm font-semibold">What you get</div>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {[
                  "Clear deliverables + cadence",
                  "Reduced landowner churn and re-work",
                  "Faster site control and fewer surprises",
                  "Documentation that keeps legal, permitting, and construction aligned",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-sm font-semibold">Engagement models</div>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {[
                  "Daily rate / hourly",
                  "Project-based scope",
                  "Multi-state deployment",
                  "Short-term surge support",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Experience"
            title="Representative project support"
            desc="Add specific projects later if you want. This section is designed to build authority for developers and improve search trust signals—without disclosing confidential details."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[{
              title: "Utility-Scale Wind — Multi-County Footprint",
              items: [
                "Site control push: landowner meetings, exhibits, signature logistics",
                "Stakeholder coordination: counties, utilities, and internal dev teams",
                "Documentation discipline: parcel tracking + audit-ready records",
              ],
            },{
              title: "Solar + BESS — Permitting & Local Engagement",
              items: [
                "Permit documentation support and local messaging alignment",
                "Landowner communication and objection handling",
                "Construction access coordination and on-site issue resolution",
              ],
            },{
              title: "Transmission / Interconnect — ROW & Easements",
              items: [
                "ROW / easement support and exhibit QA",
                "Landowner coordination tied to corridor constraints",
                "Reporting cadence + risk tracking to reduce surprises",
              ],
            },{
              title: "Pipeline / Natural Gas — Field Execution Support",
              items: [
                "ROW execution and landowner engagement",
                "Contractor interface and schedule alignment",
                "Field reporting and issue escalation",
              ],
            }].map((p) => (
              <div key={p.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Construction className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold">{p.title}</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/75">
                  {p.items.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Site Control", "Permitting", "Stakeholders", "Construction"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold">Want this section to be specific?</div>
                <div className="mt-1 text-sm text-white/70">We can add anonymized metrics (counties covered, parcels contacted, signature velocity, etc.) while staying NDA-safe.</div>
              </div>
              <PrimaryButton onClick={() => scrollToId("contact")}>
                Add project details <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Who we are"
            title="Built for high-stakes development environments"
            desc="Independent, field-first operators who know what it takes to move projects from concept through construction—while protecting relationships and timelines."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="text-sm font-semibold">Summary</div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Ground Control partners with developers and infrastructure teams to
                  deliver strategic, on-the-ground solutions—site acquisition,
                  permitting support, stakeholder management, and construction
                  coordination. We operate with a business-owner mindset: details,
                  speed, and accountability.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Clear communication", "High integrity", "Fast execution", "Documentation discipline"].map((x) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <CheckCircle2 className="h-4 w-4" /> {x}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <SecondaryButton href={SITE.phoneHref}>
                    <Phone className="h-4 w-4" /> {SITE.phone}
                  </SecondaryButton>
                  <SecondaryButton href={SITE.emailHref}>
                    <Mail className="h-4 w-4" /> {SITE.email}
                  </SecondaryButton>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="text-sm font-semibold">FAQ</div>
                <div className="mt-4 space-y-3">
                  <FAQItem
                    q="Do you work only with renewables?"
                    a="No. Our background is renewables, but we’re expanding into pipelines, natural gas, and other energy infrastructure where stakeholder management and ROW execution matter." 
                    open={faqOpen === 0}
                    onToggle={() => setFaqOpen(faqOpen === 0 ? -1 : 0)}
                  />
                  <FAQItem
                    q="How do you engage landowners?"
                    a="Respectfully and directly—clear expectations, accurate exhibits, documented follow-ups, and consistent communication to prevent churn and re-work." 
                    open={faqOpen === 1}
                    onToggle={() => setFaqOpen(faqOpen === 1 ? -1 : 1)}
                  />
                  <FAQItem
                    q="Where do you operate?"
                    a={`Primary coverage includes ${SITE.serviceAreas}, and we support multi-state rollouts as needed.`}
                    open={faqOpen === 2}
                    onToggle={() => setFaqOpen(faqOpen === 2 ? -1 : 2)}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="text-sm font-semibold">Ready for a quick scope call?</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Tell us your state(s), timeline, and what phase you’re in. We’ll respond
                  with availability and a clean scope proposal.
                </p>
                <div className="mt-4">
                  <PrimaryButton onClick={() => scrollToId("contact")}>
                    {SITE.ctaPrimary} <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s talk scope"
            desc="Share a few details and we’ll get back quickly with next steps and availability."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="text-sm font-semibold">Direct</div>
                <div className="mt-4 space-y-3 text-sm text-white/75">
                  <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05]" href={SITE.phoneHref}>
                    <Phone className="h-4 w-4" /> <span className="font-semibold text-white">{SITE.phone}</span>
                  </a>
                  <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.05]" href={SITE.emailHref}>
                    <Mail className="h-4 w-4" /> <span className="font-semibold text-white">{SITE.email}</span>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <MapPin className="h-4 w-4" /> <span>{SITE.locationLine}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-sm font-semibold">What to include</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {["State(s) + county", "Project phase", "Timeline + urgency", "Preferred engagement model"].map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 text-xs text-white/55">
                  By submitting, you agree we can contact you about your request.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    <span className="text-white/75">Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="text-white/75">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="you@company.com"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="text-white/75">Phone (optional)</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="(###) ###-####"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="text-white/75">Company (optional)</span>
                    <input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="Developer / EPC / Investor"
                    />
                  </label>
                  <label className="text-sm sm:col-span-2">
                    <span className="text-white/75">State(s) / region</span>
                    <input
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="NE / IA / KS / MO / SD / CO"
                    />
                  </label>
                  <label className="text-sm sm:col-span-2">
                    <span className="text-white/75">Project details</span>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-2 min-h-[140px] w-full resize-y rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35"
                      placeholder="What phase are you in? What do you need handled on the ground? Timeline?"
                    />
                  </label>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-white/55">
                    Typical response: same day or next business day.
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitState === "sending"}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
                        "bg-white text-black",
                        "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
                        "disabled:opacity-60 disabled:hover:translate-y-0",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      )}
                    >
                      {submitState === "sending" ? "Sending…" : "Send message"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    {submitState === "sent" && (
                      <span className="text-sm text-white/75">Sent.</span>
                    )}
                    {submitState === "error" && (
                      <span className="text-sm text-white/75">Error. Try again.</span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/40">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold">{SITE.businessName}</div>
                <div className="mt-1 text-sm text-white/60">{SITE.locationLine}</div>
                <div className="mt-1 text-xs text-white/50">{SITE.serviceAreas}</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => scrollToId(n.id)}
                    className="rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/50">
                © {new Date().getFullYear()} {SITE.businessName}. All rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={SITE.phoneHref}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 hover:bg-white/[0.06]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> {SITE.phone}
                  </span>
                </a>
                <a
                  href={SITE.emailHref}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 hover:bg-white/[0.06]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> {SITE.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      {/* Mobile sticky CTA (shows on small screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-[55] border-t border-white/10 bg-black/75 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a
            href={SITE.phoneHref}
            className="flex-1 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" /> Call
            </span>
          </a>
          <a
            href={SITE.emailHref}
            className="flex-1 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </span>
          </a>
        </div>
      </div>

      </main>
    </div>
  );
}
