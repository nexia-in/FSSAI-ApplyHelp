import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { DOCUMENTS, type FormData } from "../../lib/data";
import {
  applicationTypeValue,
  businessTypeLabels,
  capacitySummary,
  productCategoryLabels,
  turnoverLabel,
  type FormErrors,
} from "../../lib/utils";
import {
  CheckboxRow,
  ErrorText,
  Icon,
  InfoNote,
  StepHeader,
} from "../ui";

interface ReviewSectionProps {
  icon: string;
  title: string;
  onEdit: () => void;
  children: ReactNode;
}

function ReviewSection({ icon, title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Icon name={icon} className="h-4 w-4" />
          </span>
          <h3 className="text-[14px] font-extrabold text-slate-800">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-extrabold text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
        >
          <Icon name="edit" className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-slate-100 px-4 sm:px-5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[106px_1fr] gap-3 py-2.5 sm:grid-cols-[172px_1fr]">
          <dt className="pt-px text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
            {r.label}
          </dt>
          <dd className="whitespace-pre-line break-words text-[13.5px] font-semibold leading-relaxed text-slate-800">
            {r.value && r.value.trim() ? r.value : "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StepReview({
  form,
  onEdit,
  confirmChecked,
  setConfirmChecked,
  errors,
}: {
  form: FormData;
  onEdit: (step: number) => void;
  confirmChecked: boolean;
  setConfirmChecked: (v: boolean) => void;
  errors: FormErrors;
}) {
  const rented = form.ownership === "Rented" || form.ownership === "Leased";
  const capacity = capacitySummary(form);
  const categories = productCategoryLabels(form);

  const sections: { icon: string; title: string; step: number; rows: { label: string; value: string }[] }[] = [
    {
      icon: "user",
      title: "Applicant",
      step: 0,
      rows: [
        { label: "Full Name", value: form.fullName },
        { label: "Mobile Number", value: form.mobile ? `+91 ${form.mobile}` : "" },
        {
          label: "WhatsApp Number",
          value: form.sameAsMobile
            ? form.whatsapp
              ? `+91 ${form.whatsapp} (same as mobile)`
              : ""
            : form.whatsapp
              ? `+91 ${form.whatsapp}`
              : "",
        },
        { label: "Email Address", value: form.email },
        { label: "Date of Birth", value: form.dob },
        {
          label: "Applicant Type",
          value: form.applicantType === "Other" ? form.applicantTypeOther : form.applicantType,
        },
      ],
    },
    {
      icon: "briefcase",
      title: "Business",
      step: 1,
      rows: [
        { label: "Business Name", value: form.businessName },
        {
          label: "Constitution",
          value: form.constitution === "Other" ? form.constitutionOther : form.constitution,
        },
        { label: "Business Mobile", value: form.businessMobile ? `+91 ${form.businessMobile}` : "" },
        { label: "Business Email", value: form.businessEmail },
        { label: "Start Date", value: form.startDate },
        { label: "Existing FSSAI No.", value: form.existingFssai },
        { label: "Application Type", value: applicationTypeValue(form) },
      ],
    },
    {
      icon: "utensils",
      title: "Food Business",
      step: 2,
      rows: [
        { label: "Business Type(s)", value: businessTypeLabels(form) },
        { label: "Annual Turnover", value: turnoverLabel(form) },
        { label: "Capacity", value: capacity },
        { label: "Product Categories", value: categories },
        { label: "Food Products", value: form.foodProducts },
      ],
    },
    {
      icon: "mapPin",
      title: "Premises",
      step: 3,
      rows: [
        { label: "Address", value: form.address },
        { label: "District", value: form.district },
        {
          label: "Local Body",
          value:
            form.localBodyType && form.localBodyName
              ? `${form.localBodyType} — ${form.localBodyName}`
              : "",
        },
        { label: "Pincode", value: form.pincode },
        {
          label: "Ownership",
          value: form.ownership === "Other" ? form.ownershipOther : form.ownership,
        },
        ...(rented
          ? [
              { label: "Landlord Name", value: form.landlordName },
              { label: "Landlord Contact", value: form.landlordContact },
              { label: "Landlord NOC", value: form.landlordNoc },
            ]
          : []),
        { label: "Currently Operating", value: form.currentlyOperating },
        { label: "Local Body License", value: form.localBodyLicense },
        { label: "GST Registration", value: form.gstAvailable },
        { label: "Home-based", value: form.homeBased },
        ...(form.homeBased === "No"
          ? [{ label: "Commercial Premises", value: form.commercialPremises }]
          : []),
      ],
    },
  ];

  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 06 · Review"
        icon="clipboardCheck"
        title="Review Your Details"
        subtitle="Please check the information below. You can edit any section before submitting."
      />

      <div className="grid gap-4">
        {sections.map((s) => (
          <ReviewSection key={s.title} icon={s.icon} title={s.title} onEdit={() => onEdit(s.step)}>
            <ReviewRows rows={s.rows} />
          </ReviewSection>
        ))}

        {/* Documents to prepare */}
        <ReviewSection icon="fileText" title="Documents to Prepare" onEdit={() => onEdit(4)}>
          <ul className="divide-y divide-slate-100 px-4 sm:px-5">
            {DOCUMENTS.map((d) => {
              const ready = form.docStatus[d.id] === "ready";
              return (
                <li key={d.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="text-[13px] font-semibold leading-snug text-slate-700">
                    {d.label}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide",
                      ready ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {ready ? "Ready" : "To arrange"}
                  </span>
                </li>
              );
            })}
          </ul>
        </ReviewSection>
      </div>

      {/* Confirmation */}
      <div
        className={cn(
          "mt-5 rounded-2xl border p-4 transition-colors sm:p-5",
          errors.confirm ? "border-rose-300 bg-rose-50/60" : "border-slate-200 bg-slate-50/70"
        )}
      >
        <CheckboxRow id="confirm" checked={confirmChecked} onChange={setConfirmChecked}>
          I confirm that the information entered above is correct to the best of my knowledge.
        </CheckboxRow>
        {errors.confirm && (
          <div className="mt-2.5 pl-8">
            <ErrorText>{errors.confirm}</ErrorText>
          </div>
        )}
      </div>

      <InfoNote icon="send" className="mt-4">
        When you submit, your application summary will download automatically and WhatsApp will
        open with your details — just press Send there.
      </InfoNote>
    </div>
  );
}
