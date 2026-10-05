import {
  BUSINESS_TYPES,
  CAPACITY_UNITS,
  HOSPITALITY_TYPES,
  PRODUCT_CATEGORIES,
  PRODUCTION_TYPES,
  STORAGE_TYPES,
  STORAGE_UNITS,
  TURNOVER_OPTIONS,
} from "../../lib/data";
import {
  BusinessTypeGrid,
  ErrorText,
  Field,
  InfoNote,
  MultiChips,
  OptionList,
  SelectInput,
  StepHeader,
  SubCard,
  TextInput,
  TextareaInput,
  type StepProps,
} from "../ui";

export function StepFoodBusiness({ form, update, errors }: StepProps) {
  const types = form.businessTypes;
  const showProduction = PRODUCTION_TYPES.some((t) => types.includes(t));
  const showHospitality = HOSPITALITY_TYPES.some((t) => types.includes(t));
  const showStorage = STORAGE_TYPES.some((t) => types.includes(t));

  const toggleType = (id: string) => {
    update(
      "businessTypes",
      types.includes(id) ? types.filter((t) => t !== id) : [...types, id]
    );
  };

  const toggleCategory = (c: string) => {
    update(
      "productCategories",
      form.productCategories.includes(c)
        ? form.productCategories.filter((x) => x !== c)
        : [...form.productCategories, c]
    );
  };

  return (
    <div className="anim-step-in">
      <StepHeader
        badge="Step 03 · Food Business"
        icon="utensils"
        title="What type of food business do you operate?"
        subtitle="Select all that apply — you can choose more than one."
      />

      <BusinessTypeGrid selected={types} onToggle={toggleType} options={BUSINESS_TYPES} />
      {errors.businessTypes && (
        <div className="mt-2.5">
          <ErrorText>{errors.businessTypes}</ErrorText>
        </div>
      )}

      {types.includes("other") && (
        <Field
          id="businessTypeOther"
          label="Please describe your food business"
          required
          error={errors.businessTypeOther}
          className="anim-fade-in mt-5"
        >
          <TextareaInput
            id="businessTypeOther"
            rows={3}
            placeholder="Describe your food business in a few words"
            value={form.businessTypeOther}
            error={errors.businessTypeOther}
            onChange={(e) => update("businessTypeOther", e.target.value)}
          />
        </Field>
      )}

      <div className="mt-6 grid gap-5">
        <SubCard
          icon="sparkles"
          title="Business Scale & Turnover"
          subtitle="Your approximate annual turnover helps identify the right application category."
        >
          <Field
            id="turnoverCategory"
            label="Approximate annual turnover"
            required
            error={errors.turnoverCategory}
          >
            <div id="turnoverCategory">
              <OptionList
                value={form.turnoverCategory}
                onChange={(v) => update("turnoverCategory", v)}
                options={TURNOVER_OPTIONS}
              />
            </div>
          </Field>
          <InfoNote icon="shieldCheck" className="mt-4">
            These are the currently applicable FSSAI turnover categories. Your final category will
            be verified by our team before submission, based on your business details and current
            rules.
          </InfoNote>
        </SubCard>

        {showProduction && (
          <SubCard
            icon="factory"
            title="Production Capacity"
            subtitle="Approximate figures are enough — this helps identify the right application category."
            className="anim-fade-in"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="productionCapacity" label="Production Capacity" optional>
                <TextInput
                  id="productionCapacity"
                  placeholder="e.g. 500"
                  value={form.productionCapacity}
                  onChange={(e) => update("productionCapacity", e.target.value)}
                />
              </Field>
              <Field id="capacityUnit" label="Unit" optional>
                <SelectInput
                  id="capacityUnit"
                  value={form.capacityUnit}
                  onChange={(e) => update("capacityUnit", e.target.value)}
                >
                  {CAPACITY_UNITS.map((u) => (
                    <option key={u} value={u} className="text-slate-900">
                      {u}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field id="dailyProduction" label="Approximate Daily Production" optional>
                <TextInput
                  id="dailyProduction"
                  placeholder="e.g. 100 kg per day"
                  value={form.dailyProduction}
                  onChange={(e) => update("dailyProduction", e.target.value)}
                />
              </Field>
            </div>
          </SubCard>
        )}

        {showHospitality && (
          <SubCard
            icon="chefHat"
            title="Service Capacity"
            subtitle="Approximate figures help our team verify the right application category."
            className="anim-fade-in"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="seatingCapacity" label="Seating Capacity" optional>
                <TextInput
                  id="seatingCapacity"
                  inputMode="numeric"
                  placeholder="e.g. 40 seats"
                  value={form.seatingCapacity}
                  onChange={(e) => update("seatingCapacity", e.target.value)}
                />
              </Field>
              <Field id="dailyCustomers" label="Approximate Daily Customers" optional>
                <TextInput
                  id="dailyCustomers"
                  inputMode="numeric"
                  placeholder="e.g. 150"
                  value={form.dailyCustomers}
                  onChange={(e) => update("dailyCustomers", e.target.value)}
                />
              </Field>
            </div>
          </SubCard>
        )}

        {showStorage && (
          <SubCard
            icon="warehouse"
            title="Storage Capacity"
            subtitle="Approximate figures help our team verify the right application category."
            className="anim-fade-in"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="storageCapacity" label="Storage Capacity" optional>
                <TextInput
                  id="storageCapacity"
                  placeholder="e.g. 2000"
                  value={form.storageCapacity}
                  onChange={(e) => update("storageCapacity", e.target.value)}
                />
              </Field>
              <Field id="storageUnit" label="Unit" optional>
                <SelectInput
                  id="storageUnit"
                  value={form.storageUnit}
                  onChange={(e) => update("storageUnit", e.target.value)}
                >
                  {STORAGE_UNITS.map((u) => (
                    <option key={u} value={u} className="text-slate-900">
                      {u}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
          </SubCard>
        )}

        <SubCard
          icon="package"
          title="Food Products / Activities"
          subtitle="What food products do you manufacture, sell, prepare, store, transport or serve?"
        >
          <Field id="foodProducts" label="Food products / activities" required error={errors.foodProducts}>
            <TextareaInput
              id="foodProducts"
              rows={4}
              placeholder="Example: Bakery products, snacks, packaged food, beverages, dairy products, ready-to-eat food"
              value={form.foodProducts}
              error={errors.foodProducts}
              onChange={(e) => update("foodProducts", e.target.value)}
            />
          </Field>
          <Field
            id="productCategories"
            label="Main food products / product categories"
            optional
            className="mt-5"
          >
            <MultiChips
              values={form.productCategories}
              onToggle={toggleCategory}
              options={PRODUCT_CATEGORIES}
            />
          </Field>
          {form.productCategories.includes("Other") && (
            <Field
              id="productCategoryOther"
              label="Please specify the product category"
              required
              error={errors.productCategoryOther}
              className="anim-fade-in mt-4"
            >
              <TextInput
                id="productCategoryOther"
                placeholder="e.g. Pet food, Food supplements"
                value={form.productCategoryOther}
                error={errors.productCategoryOther}
                onChange={(e) => update("productCategoryOther", e.target.value)}
              />
            </Field>
          )}
        </SubCard>
      </div>
    </div>
  );
}
