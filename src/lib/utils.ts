import {
  BUSINESS_TYPES,
  DOCUMENTS,
  STORAGE_KEY,
  TURNOVER_OPTIONS,
  WHATSAPP_NUMBER,
  initialForm,
  type FormData,
} from "./data";

/* ----------------------------- Helpers ------------------------------ */

export const digitsOnly = (s: string): string => s.replace(/\D/g, "");

export const isValidMobile = (s: string): boolean => {
  const d = digitsOnly(s);
  return d.length === 10 && /^[6-9]/.test(d);
};

export const isValidEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

export const isValidPincode = (s: string): boolean => /^[1-9]\d{5}$/.test(s.trim());

const ageFromDob = (dob: string): number => {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return -1;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
};

export const hasAnyData = (form: FormData): boolean =>
  Boolean(
    form.fullName.trim() ||
      form.businessName.trim() ||
      form.mobile.trim() ||
      form.whatsapp.trim() ||
      form.email.trim()
  );

/* ---------------------------- Validation ----------------------------- */

export type FormErrors = Record<string, string>;

export function validateStep(step: number, form: FormData): FormErrors {
  const e: FormErrors = {};
  const req = (v: string) => v.trim().length > 0;

  if (step === 0) {
    if (!req(form.fullName)) e.fullName = "Please enter the applicant's full name.";
    if (!isValidMobile(form.mobile)) e.mobile = "Please enter a valid 10-digit mobile number.";
    if (!form.sameAsMobile && !isValidMobile(form.whatsapp))
      e.whatsapp = "Please enter a valid WhatsApp number.";
    if (!isValidEmail(form.email)) e.email = "Please enter a valid email address.";
    if (!req(form.dob)) e.dob = "Please enter the applicant's date of birth.";
    else if (ageFromDob(form.dob) < 18)
      e.dob = "Applicant should be 18 years or older. Please check the date of birth.";
    if (!req(form.applicantType)) e.applicantType = "Please select the applicant type.";
    else if (form.applicantType === "Other" && !req(form.applicantTypeOther))
      e.applicantTypeOther = "Please specify the applicant type.";
  }

  if (step === 1) {
    if (!req(form.businessName))
      e.businessName = "Please enter your food business or establishment name.";
    if (!req(form.constitution)) e.constitution = "Please select the business constitution.";
    else if (form.constitution === "Other" && !req(form.constitutionOther))
      e.constitutionOther = "Please specify the business constitution.";
    if (!isValidMobile(form.businessMobile))
      e.businessMobile = "Please enter a valid business mobile number.";
    if (form.businessEmail.trim() && !isValidEmail(form.businessEmail))
      e.businessEmail = "Please enter a valid business email address.";
    if (!req(form.startDate))
      e.startDate = "Please enter the business start date or expected start date.";
    if (req(form.existingFssai)) {
      if (!req(form.applicationType)) e.applicationType = "Please select the application type.";
      else if (form.applicationType === "Other" && !req(form.applicationTypeOther))
        e.applicationTypeOther = "Please specify the application type.";
    }
  }

  if (step === 2) {
    if (form.businessTypes.length === 0)
      e.businessTypes = "Please select at least one food business type.";
    else if (form.businessTypes.includes("other") && !req(form.businessTypeOther))
      e.businessTypeOther = "Please describe your food business.";
    if (!req(form.turnoverCategory))
      e.turnoverCategory = "Please select your approximate annual turnover.";
    if (form.productCategories.includes("Other") && !req(form.productCategoryOther))
      e.productCategoryOther = "Please specify the product category.";
    if (!req(form.foodProducts))
      e.foodProducts = "Please tell us about the food products you deal with.";
  }

  if (step === 3) {
    if (!req(form.address)) e.address = "Please enter the full business address.";
    if (!req(form.district)) e.district = "Please select your district.";
    if (!req(form.localBodyType)) e.localBodyType = "Please select the local body type.";
    if (!req(form.localBodyName)) e.localBodyName = "Please enter the local body name.";
    if (!isValidPincode(form.pincode)) e.pincode = "Please enter a valid 6-digit pincode.";
    if (!req(form.ownership)) e.ownership = "Please select the premises ownership.";
    if (form.ownership === "Rented" || form.ownership === "Leased") {
      if (!req(form.landlordName)) e.landlordName = "Please enter the landlord / property owner name.";
      if (!req(form.landlordNoc)) e.landlordNoc = "Please select whether a landlord NOC is available.";
    }
  }

  return e;
}

/* --------------------------- localStorage ---------------------------- */

export function loadForm(): FormData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FormData>;
    return {
      ...initialForm,
      ...parsed,
      businessTypes: Array.isArray(parsed.businessTypes) ? parsed.businessTypes : [],
      productCategories: Array.isArray(parsed.productCategories) ? parsed.productCategories : [],
      docStatus:
        parsed.docStatus && typeof parsed.docStatus === "object" ? parsed.docStatus : {},
    };
  } catch {
    return null;
  }
}

export function saveForm(form: FormData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  } catch {
    /* storage unavailable — ignore gracefully */
  }
}

export function clearSavedForm(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------- Output generation ------------------------- */

const orNA = (v: string): string => (v && v.trim() ? v.trim() : "Not provided");

export const businessTypeLabels = (form: FormData): string => {
  const labels = form.businessTypes.map(
    (id) => BUSINESS_TYPES.find((b) => b.id === id)?.label ?? id
  );
  if (form.businessTypes.includes("other") && form.businessTypeOther.trim()) {
    const idx = labels.indexOf("Other");
    labels[idx] = `Other — ${form.businessTypeOther.trim()}`;
  }
  return labels.join(", ");
};

export const turnoverLabel = (form: FormData): string => {
  const t = TURNOVER_OPTIONS.find((o) => o.id === form.turnoverCategory);
  return t ? t.label : "Not selected";
};

export const productCategoryLabels = (form: FormData): string => {
  const list = form.productCategories.filter((c) => c !== "Other");
  if (form.productCategories.includes("Other") && form.productCategoryOther.trim()) {
    list.push(`Other — ${form.productCategoryOther.trim()}`);
  }
  return list.join(", ");
};

export const applicationTypeValue = (form: FormData): string => {
  if (!form.existingFssai.trim()) return "New Application";
  if (form.applicationType === "Other" && form.applicationTypeOther.trim())
    return `Other — ${form.applicationTypeOther.trim()}`;
  return form.applicationType || "New Application";
};

export const capacitySummary = (form: FormData): string => {
  const parts: string[] = [];
  if (form.productionCapacity.trim() || form.dailyProduction.trim()) {
    const pc = form.productionCapacity.trim()
      ? `Production capacity: ${form.productionCapacity.trim()}${form.capacityUnit ? ` ${form.capacityUnit}` : ""}`
      : "";
    const dp = form.dailyProduction.trim()
      ? `Daily production: ${form.dailyProduction.trim()}`
      : "";
    parts.push([pc, dp].filter(Boolean).join(" | "));
  }
  if (form.seatingCapacity.trim())
    parts.push(`Seating capacity: ${form.seatingCapacity.trim()}`);
  if (form.dailyCustomers.trim())
    parts.push(`Daily customers (approx.): ${form.dailyCustomers.trim()}`);
  if (form.storageCapacity.trim())
    parts.push(
      `Storage capacity: ${form.storageCapacity.trim()}${form.storageUnit ? ` ${form.storageUnit}` : ""}`
    );
  return parts.join(" | ");
};

const docValue = (form: FormData, id: string): string =>
  form.docStatus[id] === "ready" ? "Ready" : "To be sent";

export function formatDateTime(): string {
  return new Date().toLocaleString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

export function sanitizeFilename(name: string): string {
  const clean = name
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
  return clean || "Business";
}

export function buildTxt(form: FormData): string {
  const W = 66;
  const hr = "-".repeat(W);
  const dhr = "=".repeat(W);
  const line = (k: string, v: string) => `${k.padEnd(26, " ")}: ${orNA(v)}`;
  const section = (title: string) => `\n${hr}\n ${title}\n${hr}`;

  const capacity = capacitySummary(form);
  const landlord =
    form.ownership === "Rented" || form.ownership === "Leased"
      ? [
          line("Landlord / Owner Name", form.landlordName),
          line("Landlord Contact", form.landlordContact),
          line("Landlord NOC Available", form.landlordNoc),
        ].join("\n")
      : line("Landlord / Owner Name", "Not applicable");

  const extra = [
    line("Business Currently Operating", form.currentlyOperating || "Not answered"),
    line("Local Body License", form.localBodyLicense || "Not answered"),
    line("GST Registration", form.gstAvailable || "Not answered"),
    line("Operated from Home", form.homeBased || "Not answered"),
    line("Commercial Premises", form.commercialPremises || "Not answered"),
  ].join("\n");

  const docs = DOCUMENTS.map(
    (d) => `[${form.docStatus[d.id] === "ready" ? " READY " : "TO ARRANGE"}] ${d.label}`
  ).join("\n");

  return [
    dhr,
    " NEXIA VIRTUAL DESK - FSSAI APPLICATION SUPPORT",
    " Application Details Summary",
    dhr,
    `Generated on : ${formatDateTime()}`,
    "",
    section("APPLICANT DETAILS"),
    line("Full Name", form.fullName),
    line("Mobile Number", form.mobile ? `+91 ${digitsOnly(form.mobile)}` : ""),
    line("WhatsApp Number", form.sameAsMobile ? `+91 ${digitsOnly(form.whatsapp)} (same as mobile)` : form.whatsapp ? `+91 ${digitsOnly(form.whatsapp)}` : ""),
    line("Email Address", form.email),
    line("Date of Birth", form.dob),
    line("Applicant Type", form.applicantType === "Other" ? form.applicantTypeOther : form.applicantType),
    "",
    section("BUSINESS DETAILS"),
    line("Business / Establishment Name", form.businessName),
    line("Business Constitution", form.constitution === "Other" ? form.constitutionOther : form.constitution),
    line("Business Mobile Number", form.businessMobile ? `+91 ${digitsOnly(form.businessMobile)}` : ""),
    line("Business Email", form.businessEmail),
    line("Start / Expected Start Date", form.startDate),
    line("Existing FSSAI Number", form.existingFssai),
    line("Application Type", applicationTypeValue(form)),
    "",
    section("FOOD BUSINESS DETAILS"),
    line("Business Type(s)", businessTypeLabels(form)),
    line("Annual Turnover (approx.)", turnoverLabel(form)),
    line("Business Capacity", capacity),
    line("Main Product Categories", productCategoryLabels(form)),
    "Food Products / Activities  :",
    ...(form.foodProducts.trim() ? form.foodProducts.trim().split("\n").map((l) => `    ${l}`) : ["    Not provided"]),
    "",
    section("BUSINESS PREMISES"),
    "Full Business Address     :",
    ...(form.address.trim() ? form.address.trim().split("\n").map((l) => `    ${l}`) : ["    Not provided"]),
    line("District", form.district),
    line("Local Body", form.localBodyType && form.localBodyName ? `${form.localBodyType} - ${form.localBodyName}` : ""),
    line("Pincode", form.pincode),
    line("Premises Ownership", form.ownership === "Other" ? form.ownershipOther : form.ownership),
    landlord,
    "",
    section("ADDITIONAL DETAILS"),
    extra,
    "",
    section("DOCUMENTS TO PREPARE"),
    docs,
    "",
    section("NOTES"),
    "- The customer will send the required document photos / PDF scans",
    "  to Nexia Virtual Desk through WhatsApp.",
    "- Applicable documents depend on the business type and application",
    "  requirement. The Nexia team will guide the customer accordingly.",
    "- Final category, document requirement and approval remain subject",
    "  to the applicable authority and current rules.",
    "",
    dhr,
    " Nexia Virtual Desk - Your online application supporting team",
    " Application support service only. Not the official FSSAI /",
    " Government of India website.",
    dhr,
    "",
  ].join("\n");
}

export function downloadTxt(form: FormData): void {
  const blob = new Blob([buildTxt(form)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `FSSAI_Application_Details_${sanitizeFilename(form.businessName)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function whatsappUrl(message?: string): string {
  return message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}

export function buildWhatsAppMessage(form: FormData): string {
  const mob = (s: string) => (s ? `+91 ${digitsOnly(s)}` : "Not provided");
  const capacity = capacitySummary(form) || "Not specified";
  const products = [productCategoryLabels(form), form.foodProducts.trim()]
    .filter(Boolean)
    .join(" | ");

  return [
    "*FSSAI APPLICATION SUPPORT - NEW REQUEST*",
    "",
    "*Applicant Details*",
    `Name: ${orNA(form.fullName)}`,
    `Mobile: ${mob(form.mobile)}`,
    `WhatsApp: ${form.sameAsMobile ? `${mob(form.whatsapp)} (same as mobile)` : mob(form.whatsapp)}`,
    `Email: ${orNA(form.email)}`,
    `Applicant Type: ${orNA(form.applicantType === "Other" ? form.applicantTypeOther : form.applicantType)}`,
    "",
    "*Business Details*",
    `Business Name: ${orNA(form.businessName)}`,
    `Business Constitution: ${orNA(form.constitution === "Other" ? form.constitutionOther : form.constitution)}`,
    `Application Type: ${applicationTypeValue(form)}`,
    "",
    "*Food Business*",
    `Business Type: ${businessTypeLabels(form)}`,
    `Annual Turnover: ${turnoverLabel(form)}`,
    `Capacity: ${capacity}`,
    `Food Products: ${products || "Not provided"}`,
    "",
    "*Business Premises*",
    `Address: ${orNA(form.address)}`,
    `District: ${orNA(form.district)}`,
    `Local Body: ${form.localBodyType && form.localBodyName ? `${form.localBodyType} - ${form.localBodyName}` : "Not provided"}`,
    `Pincode: ${orNA(form.pincode)}`,
    `Ownership: ${orNA(form.ownership === "Other" ? form.ownershipOther : form.ownership)}`,
    "",
    "*Documents*",
    `Applicant Photo: ${docValue(form, "photo")}`,
    `ID Proof: ${docValue(form, "idProof")}`,
    `Address Proof: ${docValue(form, "addressProof")}`,
    `Other applicable documents: To be sent`,
    "",
    "*Customer Note*",
    "Customer will send the required document photos/PDF files through WhatsApp.",
    "",
    "Please review the details and contact the customer for any clarification or additional documents.",
  ].join("\n");
}
