import { Icon, btnGhost, btnWhatsApp } from "./ui";
import { downloadTxt, whatsappUrl } from "../lib/utils";
import { WHATSAPP_DISPLAY, type FormData } from "../lib/data";

const STATUS_CARDS = [
  {
    icon: "checkCircle",
    title: "Details prepared",
    text: "Your application details have been prepared successfully.",
  },
  {
    icon: "download",
    title: "Application summary downloaded",
    text: "A text summary was saved to your device for your reference.",
  },
  {
    icon: "messageCircle",
    title: "WhatsApp message ready",
    text: "WhatsApp opened with your details — press Send there to share them with our team.",
  },
];

export function SuccessScreen({
  form,
  onRestart,
}: {
  form: FormData;
  onRestart: () => void;
}) {
  return (
    <div className="anim-step-in">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lift">
        <div className="relative bg-gradient-to-b from-emerald-50/90 to-white px-5 pb-8 pt-10 text-center sm:px-10 sm:pt-12">
          <span className="anim-scale-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 shadow-lg shadow-emerald-600/30 ring-8 ring-emerald-100">
            <Icon name="check" className="h-8 w-8 text-white" strokeWidth={2.5} />
          </span>
          <h2 className="mt-5 font-display text-[26px] font-semibold leading-tight text-slate-900 sm:text-[32px]">
            Application Details Received
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-slate-600">
            Thank you for sharing your details with Nexia Virtual Desk.
          </p>
          <p className="mx-auto mt-1 max-w-md text-[14.5px] font-bold leading-relaxed text-emerald-800">
            Your application details have been prepared successfully.
          </p>
        </div>

        <div className="px-5 pb-8 sm:px-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {STATUS_CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 text-left"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/25">
                  <Icon name={c.icon} className="h-[18px] w-[18px]" />
                </span>
                <p className="mt-3 text-[13.5px] font-extrabold text-slate-800">{c.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Next step — WhatsApp documents */}
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-50/40 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                <Icon name="whatsapp" className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[16.5px] font-extrabold leading-snug text-slate-900">
                  Next Step: Send Your Documents
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                  Please send the required document photos / PDF files through WhatsApp so our team
                  can review the application requirement.
                </p>
                <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] font-bold leading-relaxed text-emerald-800">
                  <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0" />
                  Please make sure the document text is clearly visible and the complete document is
                  included.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={btnWhatsApp}>
                <Icon name="whatsapp" className="h-4 w-4" />
                Open WhatsApp
              </a>
              <button
                type="button"
                onClick={() => downloadTxt(form)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-3 text-[14px] font-extrabold text-emerald-800 transition-all hover:border-emerald-400 hover:bg-emerald-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              >
                <Icon name="download" className="h-4 w-4" />
                Download Summary Again
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <button type="button" onClick={onRestart} className={btnGhost}>
              <Icon name="refreshCw" className="h-4 w-4" />
              Start Again
            </button>
            <p className="text-center text-[12.5px] font-semibold text-slate-500">
              Need Help? Contact Nexia Virtual Desk —{" "}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-emerald-700 underline decoration-emerald-300 underline-offset-2 transition hover:text-emerald-800"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
