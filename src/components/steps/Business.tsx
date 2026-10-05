import { APPLICATION_TYPES, CONSTITUTIONS } from "../../lib/data";
import {
  ChipGroup,
  Field,
  PhoneInput,
  StepHeader,
  SubCard,
  TextInput,
  type StepProps,
} from "../ui";

export function StepBusiness({ form, update, errors }: StepProps) {
  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 02 · Business"
        icon="briefcase"
        title="Business Details"
        subtitle="Tell us about your food business or establishment."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="businessName"
          label="Food Business / Establishment Name"
          required
          error={errors.businessName}
          className="sm:col-span-2"
        >
          <TextInput
            id="businessName"
            placeholder="e.g. Sunrise Bakery, Thrissur"
            autoComplete="organization"
            value={form.businessName}
            error={errors.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
        </Field>

        <Field
          id="constitution"
          label="Business Constitution"
          required
          error={errors.constitution}
          className="sm:col-span-2"
        >
          <div id="constitution">
            <ChipGroup
              value={form.constitution}
              onChange={(v) => update("constitution", v)}
              options={CONSTITUTIONS}
            />
          </div>
        </Field>

        {form.constitution === "Other" && (
          <Field
            id="constitutionOther"
            label="Please specify the business constitution"
            required
            error={errors.constitutionOther}
            className="anim-fade-in sm:col-span-2"
          >
            <TextInput
              id="constitutionOther"
              placeholder="e.g. Hindu Undivided Family, Co-operative Society"
              value={form.constitutionOther}
              error={errors.constitutionOther}
              onChange={(e) => update("constitutionOther", e.target.value)}
            />
          </Field>
        )}

        <Field id="businessMobile" label="Business Mobile Number" required error={errors.businessMobile}>
          <PhoneInput
            id="businessMobile"
            value={form.businessMobile}
            error={errors.businessMobile}
            onChange={(e) =>
              update("businessMobile", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />
        </Field>

        <Field id="businessEmail" label="Business Email Address" optional error={errors.businessEmail}>
          <TextInput
            id="businessEmail"
            type="email"
            inputMode="email"
            placeholder="business@example.com"
            value={form.businessEmail}
            error={errors.businessEmail}
            onChange={(e) => update("businessEmail", e.target.value)}
          />
        </Field>

        <Field
          id="startDate"
          label="Business Start Date / Expected Start Date"
          required
          error={errors.startDate}
          hint="If the business has not started yet, enter the expected start date."
        >
          <TextInput
            id="startDate"
            type="date"
            value={form.startDate}
            error={errors.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />
        </Field>

        <Field
          id="existingFssai"
          label="Existing FSSAI Registration / License Number"
          optional
          error={errors.existingFssai}
          hint="Leave this blank if you do not have one."
        >
          <TextInput
            id="existingFssai"
            inputMode="numeric"
            placeholder="e.g. 12345678901234"
            value={form.existingFssai}
            error={errors.existingFssai}
            onChange={(e) => update("existingFssai", e.target.value.replace(/\s/g, ""))}
          />
        </Field>

        {form.existingFssai.trim() !== "" && (
          <div className="anim-fade-in sm:col-span-2">
            <SubCard
              icon="refreshCw"
              title="Application Type"
              subtitle="Are you applying for New Registration, Renewal, Modification or Other?"
            >
              <Field id="applicationType" label="Application Type" required error={errors.applicationType}>
                <ChipGroup
                  value={form.applicationType}
                  onChange={(v) => update("applicationType", v)}
                  options={APPLICATION_TYPES}
                />
              </Field>
              {form.applicationType === "Other" && (
                <Field
                  id="applicationTypeOther"
                  label="Please specify the application type"
                  required
                  error={errors.applicationTypeOther}
                  className="anim-fade-in mt-4"
                >
                  <TextInput
                    id="applicationTypeOther"
                    placeholder="Tell us what you need help with"
                    value={form.applicationTypeOther}
                    error={errors.applicationTypeOther}
                    onChange={(e) => update("applicationTypeOther", e.target.value)}
                  />
                </Field>
              )}
            </SubCard>
          </div>
        )}
      </div>
    </div>
  );
}
