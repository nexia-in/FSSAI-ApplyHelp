import { useMemo } from "react";
import { cn } from "../../utils/cn";
import { DOCUMENTS, WHATSAPP_DISPLAY } from "../../lib/data";
import { whatsappUrl } from "../../lib/utils";
import { Icon, InfoNote, StepHeader, type StepProps } from "../ui";

export function StepDocuments({ form, update }: StepProps) {
  const suggested = useMemo(() => {
    const s = new Set<string>(["photo", "idProof", "addressProof"]);
    if (form.ownership === "Rented" || form.ownership === "Leased") {
      s.add("rental");
      s.add("noc");
    }
    if (form.localBodyLicense === "Yes") s.add("localBody");
    if (form.gstAvailable === "Yes") s.add("gst");
    if (form.constitution === "Partnership") s.add("deed");
    if (
      form.constitution === "LLP" ||
      form.constitution === "Private Limited Company" ||
      form.constitution === "Public Limited Company"
    ) {
      s.add("company");
    }
    if (
      form.existingFssai.trim() !== "" &&
      (form.applicationType === "Renewal" || form.applicationType === "Modification")
    ) {
      s.add("existing");
    }
    return s;
  }, [form]);

  const setDoc = (id: string, status: "ready" | "pending") => {
    update("docStatus", { ...form.docStatus, [id]: status });
  };

  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 05 · Documents"
        icon="fileText"
        title="Documents & Photos"
        subtitle="Please keep the following documents ready. Our team will guide you on which documents are applicable to your application."
      />

      <InfoNote icon="info" tone="amber" className="mb-5">
        Applicable documents will depend on your business type and application requirement — you do
        not need every document listed below.
      </InfoNote>

      <div className="grid gap-2.5">
        {DOCUMENTS.map((d) => {
          const status = form.docStatus[d.id] ?? "pending";
          return (
            <div
              key={d.id}
              className="rounded-xl border border-slate-200/90 bg-white p-3.5 transition-colors hover:border-slate-300"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon name="fileText" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] font-extrabold leading-snug text-slate-800">
                    {d.label}
                    {suggested.has(d.id) && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.08em] text-emerald-700">
                        Likely applicable
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{d.note}</p>
                </div>
              </div>
              <div className="mt-3 sm:pl-12">
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5" role="group">
                  <button
                    type="button"
                    aria-pressed={status === "ready"}
                    onClick={() => setDoc(d.id, "ready")}
                    className={cn(
                      "flex min-h-[34px] items-center gap-1.5 rounded-[7px] px-3.5 text-[11.5px] font-extrabold transition-all",
                      status === "ready"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {status === "ready" && (
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    )}
                    Ready
                  </button>
                  <button
                    type="button"
                    aria-pressed={status === "pending"}
                    onClick={() => setDoc(d.id, "pending")}
                    className={cn(
                      "flex min-h-[34px] items-center rounded-[7px] px-3.5 text-[11.5px] font-extrabold transition-all",
                      status === "pending"
                        ? "bg-white text-slate-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    To arrange
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp instruction card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <Icon name="whatsapp" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[16px] font-extrabold leading-snug text-slate-900">
              Documents / Photos — Please Send on WhatsApp
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
              After submitting your application details, please send clear photos or PDF scans of
              the required documents to Nexia Virtual Desk through WhatsApp.
            </p>
            <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] font-bold leading-relaxed text-emerald-800">
              <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0" />
              Please make sure the document text is clearly visible and the complete document is
              included.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-md shadow-emerald-600/30 transition-all hover:bg-emerald-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
            <Icon name="whatsapp" className="h-4 w-4" />
            Send Documents on WhatsApp
          </a>
          <p className="text-[11.5px] font-semibold leading-relaxed text-slate-500">
            Documents are not uploaded on this website — you share them directly on WhatsApp
            ({WHATSAPP_DISPLAY}) after submitting.
          </p>
        </div>
      </div>

      {/* Privacy note */}
      <InfoNote icon="lock" className="mt-4">
        <span>
          Your information is used only to assist with the requested application/service. Please
          share only the documents and details required for your application.
        </span>
        <span className="mt-1 block text-emerald-700">
          Nexia Virtual Desk is providing application support and is not the official FSSAI
          authority.
        </span>
      </InfoNote>
    </div>
  );
}
