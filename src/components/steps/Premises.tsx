import { DISTRICTS, LOCAL_BODY_TYPES, OWNERSHIP_TYPES } from "../../lib/data";
import {
  ChoiceGroup,
  ChipGroup,
  Field,
  PhoneInput,
  SelectInput,
  StepHeader,
  SubCard,
  TextInput,
  TextareaInput,
  type StepProps,
} from "../ui";

const YES_NO = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const YES_NO_NA = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "Not Applicable", label: "Not Applicable" },
];

export function StepPremises({ form, update, errors }: StepProps) {
  const rented = form.ownership === "Rented" || form.ownership === "Leased";

  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 04 · Premises"
        icon="mapPin"
        title="Business Premises"
        subtitle="Where is your food business located?"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="address"
          label="Full Business Address"
          required
          error={errors.address}
          className="sm:col-span-2"
        >
          <TextareaInput
            id="address"
            rows={3}
            placeholder={"House / building name, street, ward, locality\nLandmark (if any)"}
            value={form.address}
            error={errors.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </Field>

        <Field id="district" label="District" required error={errors.district}>
          <SelectInput
            id="district"
            value={form.district}
            error={errors.district}
            placeholder="Select district"
            onChange={(e) => update("district", e.target.value)}
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d} className="text-slate-900">
                {d}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field id="pincode" label="Pincode" required error={errors.pincode}>
          <TextInput
            id="pincode"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit pincode"
            value={form.pincode}
            error={errors.pincode}
            onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
        </Field>

        <Field
          id="localBodyType"
          label="Local Body Type"
          required
          error={errors.localBodyType}
          className="sm:col-span-2"
        >
          <ChipGroup
            value={form.localBodyType}
            onChange={(v) => update("localBodyType", v)}
            options={LOCAL_BODY_TYPES}
          />
        </Field>

        <Field
          id="localBodyName"
          label="Local Body Name"
          required
          error={errors.localBodyName}
          className="sm:col-span-2"
          hint="The Grama Panchayat, Municipality or Corporation where the business is located."
        >
          <TextInput
            id="localBodyName"
            placeholder="e.g. Olarikkara Grama Panchayat"
            value={form.localBodyName}
            error={errors.localBodyName}
            onChange={(e) => update("localBodyName", e.target.value)}
          />
        </Field>

        <Field
          id="ownership"
          label="Premises Ownership"
          required
          error={errors.ownership}
          className="sm:col-span-2"
        >
          <ChipGroup
            value={form.ownership}
            onChange={(v) => update("ownership", v)}
            options={OWNERSHIP_TYPES}
          />
        </Field>

        {form.ownership === "Other" && (
          <Field
            id="ownershipOther"
            label="Please specify the premises ownership"
            optional
            className="anim-fade-in sm:col-span-2"
          >
            <TextInput
              id="ownershipOther"
              placeholder="Tell us about the premises arrangement"
              value={form.ownershipOther}
              onChange={(e) => update("ownershipOther", e.target.value)}
            />
          </Field>
        )}

        {rented && (
          <div className="anim-fade-in sm:col-span-2">
            <SubCard
              icon="home"
              title="Landlord / Property Details"
              subtitle="These details are required when the premises is rented or leased."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="landlordName"
                  label="Landlord / Property Owner Name"
                  required
                  error={errors.landlordName}
                >
                  <TextInput
                    id="landlordName"
                    placeholder="Landlord's full name"
                    value={form.landlordName}
                    error={errors.landlordName}
                    onChange={(e) => update("landlordName", e.target.value)}
                  />
                </Field>
                <Field id="landlordContact" label="Landlord Contact Number" optional>
                  <PhoneInput
                    id="landlordContact"
                    value={form.landlordContact}
                    onChange={(e) =>
                      update("landlordContact", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </Field>
                <Field
                  id="landlordNoc"
                  label="Is a landlord NOC available?"
                  required
                  error={errors.landlordNoc}
                  className="sm:col-span-2"
                >
                  <div id="landlordNoc">
                    <ChoiceGroup
                      value={form.landlordNoc}
                      onChange={(v) => update("landlordNoc", v)}
                      options={[
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                        { value: "Not sure", label: "Not sure" },
                      ]}
                    />
                  </div>
                </Field>
              </div>
            </SubCard>
          </div>
        )}

        <div className="sm:col-span-2">
          <SubCard
            icon="info"
            title="A few more quick questions"
            subtitle="This helps us check which documents are applicable for your application."
          >
            <div className="grid gap-5">
              <Field id="currentlyOperating" label="Is the business currently operating?">
                <ChoiceGroup
                  value={form.currentlyOperating}
                  onChange={(v) => update("currentlyOperating", v)}
                  options={YES_NO}
                />
              </Field>
              <Field
                id="localBodyLicense"
                label="Is there an existing local body license / D&O license?"
              >
                <ChoiceGroup
                  value={form.localBodyLicense}
                  onChange={(v) => update("localBodyLicense", v)}
                  options={YES_NO_NA}
                />
              </Field>
              <Field id="gstAvailable" label="Is GST registration available?">
                <ChoiceGroup
                  value={form.gstAvailable}
                  onChange={(v) => update("gstAvailable", v)}
                  options={YES_NO_NA}
                />
              </Field>
              <Field id="homeBased" label="Is the business operated from home?">
                <ChoiceGroup
                  value={form.homeBased}
                  onChange={(v) => update("homeBased", v)}
                  options={YES_NO}
                />
              </Field>
              {form.homeBased === "No" && (
                <Field
                  id="commercialPremises"
                  label="Is the business operated from a commercial premises?"
                  className="anim-fade-in"
                >
                  <ChoiceGroup
                    value={form.commercialPremises}
                    onChange={(v) => update("commercialPremises", v)}
                    options={YES_NO}
                  />
                </Field>
              )}
            </div>
          </SubCard>
        </div>
      </div>
    </div>
  );
}
