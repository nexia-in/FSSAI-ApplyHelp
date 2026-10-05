import { useMemo } from "react";
import { APPLICANT_TYPES } from "../../lib/data";
import {
  CheckboxRow,
  ChipGroup,
  Field,
  PhoneInput,
  StepHeader,
  TextInput,
  type StepProps,
} from "../ui";

export function StepApplicant({ form, update, errors }: StepProps) {
  const maxDob = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split("T")[0];
  }, []);

  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 01 · Applicant"
        icon="user"
        title="Applicant Details"
        subtitle="Please enter the details of the person who will be associated with the application."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="fullName"
          label="Full Name"
          required
          error={errors.fullName}
          className="sm:col-span-2"
          hint="Please enter the name as it appears on the applicant's ID proof."
        >
          <TextInput
            id="fullName"
            placeholder="e.g. Arun Kumar"
            autoComplete="name"
            value={form.fullName}
            error={errors.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </Field>

        <Field id="mobile" label="Mobile Number" required error={errors.mobile}>
          <PhoneInput
            id="mobile"
            value={form.mobile}
            error={errors.mobile}
            autoComplete="tel-national"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 10);
              update("mobile", v);
              if (form.sameAsMobile) update("whatsapp", v);
            }}
          />
        </Field>

        <Field
          id="whatsapp"
          label="WhatsApp Number"
          required={!form.sameAsMobile}
          error={errors.whatsapp}
        >
          <PhoneInput
            id="whatsapp"
            value={form.sameAsMobile ? form.mobile : form.whatsapp}
            error={errors.whatsapp}
            disabled={form.sameAsMobile}
            aria-disabled={form.sameAsMobile}
            onChange={(e) =>
              update("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />
          <div className="mt-3">
            <CheckboxRow
              id="sameAsMobile"
              checked={form.sameAsMobile}
              onChange={(v) => {
                update("sameAsMobile", v);
                if (v) update("whatsapp", form.mobile);
              }}
            >
              WhatsApp number is the same as mobile number
            </CheckboxRow>
          </div>
        </Field>

        <Field id="email" label="Email Address" required error={errors.email}>
          <TextInput
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            error={errors.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>

        <Field id="dob" label="Date of Birth" required error={errors.dob}>
          <TextInput
            id="dob"
            type="date"
            max={maxDob}
            value={form.dob}
            error={errors.dob}
            onChange={(e) => update("dob", e.target.value)}
          />
        </Field>

        <Field
          id="applicantType"
          label="Applicant Type / Role"
          required
          error={errors.applicantType}
          className="sm:col-span-2"
        >
          <div id="applicantType">
            <ChipGroup
              value={form.applicantType}
              onChange={(v) => update("applicantType", v)}
              options={APPLICANT_TYPES}
            />
          </div>
        </Field>

        {form.applicantType === "Other" && (
          <Field
            id="applicantTypeOther"
            label="Please specify the applicant type / role"
            required
            error={errors.applicantTypeOther}
            className="anim-fade-in sm:col-span-2"
          >
            <TextInput
              id="applicantTypeOther"
              placeholder="e.g. Trustee, Managing Committee Member"
              value={form.applicantTypeOther}
              error={errors.applicantTypeOther}
              onChange={(e) => update("applicantTypeOther", e.target.value)}
            />
          </Field>
        )}
      </div>
    </div>
  );
}
