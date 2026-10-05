import { Icon } from "./ui";
import { whatsappUrl } from "../lib/utils";
import { WHATSAPP_DISPLAY } from "../lib/data";

/* ------------------------------- Top bar ----------------------------- */

export function TopBar() {
  return (
    <header className="relative z-40 border-b border-white/10 bg-ink-950">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
              <path d="M6.5 4h2.6l6 9.2V4h2.4v16h-2.6l-6-9.2V20H6.5z" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[17px] font-semibold leading-none text-white">
              Nexia Virtual Desk
            </span>
            <span className="mt-1 block truncate text-[10.5px] font-bold tracking-wide text-emerald-300/80">
              Your online application supporting team
            </span>
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-300 lg:flex">
            <Icon name="shieldCheck" className="h-3.5 w-3.5 text-emerald-400" />
            16+ years of service
          </span>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-emerald-500 px-3.5 py-2 text-[12.5px] font-extrabold text-white shadow-md shadow-emerald-500/25 transition-all hover:bg-emerald-400 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- Hero ------------------------------- */

const HERO_CHIPS = [
  { icon: "clock", label: "5–8 minutes" },
  { icon: "messageCircle", label: "Documents via WhatsApp" },
  { icon: "mapPin", label: "Support across Kerala" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-12%] h-[460px] w-[460px] rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-45%] left-[-12%] h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
            <Icon name="utensils" className="h-3.5 w-3.5" />
            FSSAI Application Support
          </span>

          <h1 className="mt-5 font-display text-[34px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[52px]">
            FSSAI Registration <span className="text-emerald-400">&amp;</span> License Support
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300/90 sm:text-[16.5px]">
            Provide your details below and our team will review the requirement and assist you with
            the application submission process.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {HERO_CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11.5px] font-bold text-slate-300"
              >
                <Icon name={c.icon} className="h-3.5 w-3.5 text-emerald-400" />
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#application"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-[14.5px] font-extrabold text-ink-950 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Start Your Application Details
              <Icon name="arrowDown" className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-[14.5px] font-extrabold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              How this works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Disclaimer --------------------------- */

export function DisclaimerCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-200/90 bg-amber-50 p-4 sm:p-5">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 ring-1 ring-amber-200">
          <Icon name="info" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-700">
            Please note
          </p>
          <p className="mt-1 text-[13.5px] font-bold leading-relaxed text-slate-800">
            Important: This is a Nexia Virtual Desk application support service. This is NOT the
            official FSSAI or Government of India website.
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
            ശ്രദ്ധിക്കുക: ഇത് Nexia Virtual Desk നൽകുന്ന അപേക്ഷാ സഹായ സേവനമാണ്. ഇത് ഔദ്യോഗിക FSSAI /
            Government of India website അല്ല.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- How it works -------------------------- */

const HOW_STEPS = [
  { icon: "user", text: "Enter your applicant and business details." },
  { icon: "utensils", text: "Select your food business activities." },
  { icon: "clipboardCheck", text: "Review the information you entered." },
  { icon: "whatsapp", text: "Send the required documents/photos to Nexia through WhatsApp." },
  { icon: "shieldCheck", text: "Our team will review the requirement and assist with the application submission." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-header">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Simple process
            </p>
            <h2 className="mt-1.5 font-display text-[22px] font-semibold text-slate-900 sm:text-[26px]">
              How this works
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-[11.5px] font-extrabold text-emerald-800">
            <Icon name="clock" className="h-3.5 w-3.5 text-emerald-600" />
            Usually takes about 5–8 minutes
          </span>
        </div>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_STEPS.map((s, i) => (
            <li
              key={s.text}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4"
            >
              <span
                className="pointer-events-none absolute right-3 top-2 font-display text-[28px] font-semibold leading-none text-emerald-600/15"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200/70">
                <Icon name={s.icon} className="h-[17px] w-[17px]" />
              </span>
              <p className="mt-3 text-[12.5px] font-semibold leading-relaxed text-slate-600">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ----------------------------- */

const SERVICES = [
  { icon: "monitor", label: "Online Application Support" },
  { icon: "utensils", label: "FSSAI Application Support" },
  { icon: "fileText", label: "CV / Resume Services" },
  { icon: "sparkles", label: "Digital Services" },
  { icon: "printer", label: "Print & DTP Services" },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-ink-950 text-slate-300">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_1.15fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 4h2.6l6 9.2V4h2.4v16h-2.6l-6-9.2V20H6.5z" />
                </svg>
              </span>
              <div>
                <p className="font-display text-[18px] font-semibold leading-none text-white">
                  Nexia Virtual Desk
                </p>
                <p className="mt-1 text-[11px] font-bold text-emerald-300/80">
                  Your online application supporting team
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-300">
                <Icon name="shieldCheck" className="h-3.5 w-3.5 text-emerald-400" />
                16+ years of service
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-300">
                <Icon name="mapPin" className="h-3.5 w-3.5 text-emerald-400" />
                Technical wing: Nexia.in Olarikkara
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.label} className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400">
                    <Icon name={s.icon} className="h-3.5 w-3.5" />
                  </span>
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Need another service?
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
              Contact Nexia Virtual Desk — our team will be happy to assist you with your
              requirement.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-[13.5px] font-extrabold text-ink-950 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Contact Nexia Virtual Desk
            </a>
            <p className="mt-3.5 flex items-center gap-1.5 text-[12px] font-bold text-slate-400">
              <Icon name="whatsapp" className="h-3.5 w-3.5 text-emerald-400" />
              {WHATSAPP_DISPLAY}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-[11.5px] font-semibold text-slate-400">
            © {new Date().getFullYear()} Nexia Virtual Desk — Your online application supporting
            team.
          </p>
          <p className="mx-auto mt-1.5 max-w-2xl text-center text-[11px] leading-relaxed text-slate-500">
            Nexia Virtual Desk provides application support and assistance services only. We are
            not the official FSSAI authority, a government department, or a government website.
            Final eligibility, document requirements and approval remain subject to the applicable
            authority and current rules.
          </p>
        </div>
      </div>
    </footer>
  );
}
