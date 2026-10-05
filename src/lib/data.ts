/* ------------------------------------------------------------------ */
/*  Nexia Virtual Desk — FSSAI Application Support                     */
/*  Form model, option lists and app constants                         */
/* ------------------------------------------------------------------ */

export interface FormData {
  /* Step 01 — Applicant Details */
  fullName: string;
  mobile: string;
  sameAsMobile: boolean;
  whatsapp: string;
  email: string;
  dob: string;
  applicantType: string;
  applicantTypeOther: string;

  /* Step 02 — Business Details */
  businessName: string;
  constitution: string;
  constitutionOther: string;
  businessMobile: string;
  businessEmail: string;
  startDate: string;
  existingFssai: string;
  applicationType: string;
  applicationTypeOther: string;

  /* Step 03 — Food Business Details */
  businessTypes: string[];
  businessTypeOther: string;
  turnoverCategory: string;
  productionCapacity: string;
  capacityUnit: string;
  dailyProduction: string;
  seatingCapacity: string;
  dailyCustomers: string;
  storageCapacity: string;
  storageUnit: string;
  productCategories: string[];
  productCategoryOther: string;
  foodProducts: string;

  /* Step 04 — Business Premises */
  address: string;
  district: string;
  localBodyType: string;
  localBodyName: string;
  pincode: string;
  ownership: string;
  ownershipOther: string;
  landlordName: string;
  landlordContact: string;
  landlordNoc: string;
  currentlyOperating: string;
  localBodyLicense: string;
  gstAvailable: string;
  homeBased: string;
  commercialPremises: string;

  /* Step 05 — Documents */
  docStatus: Record<string, "ready" | "pending">;
}

export const initialForm: FormData = {
  fullName: "",
  mobile: "",
  sameAsMobile: false,
  whatsapp: "",
  email: "",
  dob: "",
  applicantType: "",
  applicantTypeOther: "",

  businessName: "",
  constitution: "",
  constitutionOther: "",
  businessMobile: "",
  businessEmail: "",
  startDate: "",
  existingFssai: "",
  applicationType: "",
  applicationTypeOther: "",

  businessTypes: [],
  businessTypeOther: "",
  turnoverCategory: "",
  productionCapacity: "",
  capacityUnit: "",
  dailyProduction: "",
  seatingCapacity: "",
  dailyCustomers: "",
  storageCapacity: "",
  storageUnit: "",
  productCategories: [],
  productCategoryOther: "",
  foodProducts: "",

  address: "",
  district: "",
  localBodyType: "",
  localBodyName: "",
  pincode: "",
  ownership: "",
  ownershipOther: "",
  landlordName: "",
  landlordContact: "",
  landlordNoc: "",
  currentlyOperating: "",
  localBodyLicense: "",
  gstAvailable: "",
  homeBased: "",
  commercialPremises: "",

  docStatus: {},
};

/* ------------------------------ Steps ------------------------------ */

export interface StepDef {
  num: string;
  key: string;
  title: string;
  icon: string;
}

export const STEPS: StepDef[] = [
  { num: "01", key: "applicant", title: "Applicant", icon: "user" },
  { num: "02", key: "business", title: "Business", icon: "briefcase" },
  { num: "03", key: "food", title: "Food Business", icon: "utensils" },
  { num: "04", key: "premises", title: "Premises", icon: "mapPin" },
  { num: "05", key: "documents", title: "Documents", icon: "fileText" },
  { num: "06", key: "review", title: "Review", icon: "clipboardCheck" },
];

/* --------------------------- Option lists -------------------------- */

export const DISTRICTS: string[] = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

export const APPLICANT_TYPES: string[] = [
  "Proprietor",
  "Partner",
  "Director",
  "Authorized Person",
  "Other",
];

export const CONSTITUTIONS: string[] = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited Company",
  "Public Limited Company",
  "Society / Trust",
  "Self Help Group",
  "Other",
];

export const APPLICATION_TYPES: string[] = [
  "New Application",
  "Renewal",
  "Modification",
  "Other",
];

export const LOCAL_BODY_TYPES: string[] = [
  "Grama Panchayat",
  "Municipality",
  "Corporation",
];

export const OWNERSHIP_TYPES: string[] = ["Owned", "Rented", "Leased", "Other"];

export interface BusinessTypeOption {
  id: string;
  label: string;
  icon: string;
}

export const BUSINESS_TYPES: BusinessTypeOption[] = [
  { id: "restaurant", label: "Restaurant", icon: "utensils" },
  { id: "hotel", label: "Hotel", icon: "building" },
  { id: "bakery", label: "Bakery", icon: "croissant" },
  { id: "home", label: "Home-based Food Business", icon: "home" },
  { id: "catering", label: "Catering", icon: "chefHat" },
  { id: "cloudKitchen", label: "Cloud Kitchen", icon: "cloud" },
  { id: "manufacturing", label: "Food Manufacturing", icon: "factory" },
  { id: "processing", label: "Food Processing", icon: "processing" },
  { id: "packing", label: "Food Packing / Repacking", icon: "package" },
  { id: "wholesale", label: "Wholesale", icon: "boxes" },
  { id: "retail", label: "Retail / Grocery", icon: "cart" },
  { id: "distributor", label: "Food Distributor", icon: "truck" },
  { id: "storage", label: "Food Storage / Warehouse", icon: "warehouse" },
  { id: "transport", label: "Food Transport", icon: "route" },
  { id: "beverage", label: "Juice / Beverage Business", icon: "glass" },
  { id: "sweets", label: "Sweet Shop", icon: "candy" },
  { id: "meat", label: "Meat / Fish / Poultry Business", icon: "fish" },
  { id: "dairy", label: "Dairy / Milk Products", icon: "milk" },
  { id: "online", label: "Online Food Business", icon: "globe" },
  { id: "other", label: "Other", icon: "plus" },
];

export const PRODUCT_CATEGORIES: string[] = [
  "Bakery & Confectionery",
  "Snacks & Savouries",
  "Packaged / Ready-to-Eat Food",
  "Beverages & Juices",
  "Dairy & Milk Products",
  "Sweets & Desserts",
  "Meat / Fish / Poultry Products",
  "Grains, Cereals & Pulses",
  "Spices & Masalas",
  "Edible Oils & Fats",
  "Fruits & Vegetables",
  "Frozen & Preserved Foods",
  "Health & Organic Foods",
  "Other",
];

export interface TurnoverOption {
  id: string;
  label: string;
  hint: string;
}

export const TURNOVER_OPTIONS: TurnoverOption[] = [
  {
    id: "upto12l",
    label: "Up to ₹12 lakh per year",
    hint: "Basic Registration category",
  },
  {
    id: "12l20c",
    label: "₹12 lakh – ₹20 crore per year",
    hint: "State License category",
  },
  {
    id: "above20c",
    label: "Above ₹20 crore per year",
    hint: "Central License category",
  },
  {
    id: "unsure",
    label: "Not sure / need assistance",
    hint: "Our team will help identify the right category",
  },
];

export interface DocumentItem {
  id: string;
  label: string;
  note: string;
}

export const DOCUMENTS: DocumentItem[] = [
  { id: "photo", label: "Applicant Passport-size Photo", note: "A recent colour photograph" },
  { id: "idProof", label: "Applicant ID Proof", note: "Aadhaar / PAN / Passport / Voter ID / Driving Licence" },
  { id: "addressProof", label: "Address Proof", note: "For the applicant" },
  { id: "premisesProof", label: "Business Premises Address Proof", note: "Electricity bill, tax receipt or similar" },
  { id: "rental", label: "Rental / Lease Agreement", note: "If the premises is rented or leased" },
  { id: "noc", label: "Landlord NOC", note: "If the premises is rented or leased" },
  { id: "localBody", label: "Local Body License / D&O License", note: "If already issued by the local body" },
  { id: "gst", label: "GST Certificate", note: "If GST registration is available" },
  { id: "deed", label: "Partnership Deed", note: "For partnership firms" },
  { id: "company", label: "Company / LLP Documents", note: "Incorporation certificate and related documents" },
  { id: "foodDocs", label: "Food-related Supporting Documents", note: "Product list, labels or similar, if applicable" },
  { id: "existing", label: "Existing FSSAI Certificate / License", note: "For renewal or modification" },
  { id: "otherDoc", label: "Any Other Supporting Document", note: "If requested by the Nexia team" },
];

/* ------------------------- Capacity mapping ------------------------ */

export const PRODUCTION_TYPES = [
  "manufacturing",
  "processing",
  "packing",
  "bakery",
  "home",
  "sweets",
  "beverage",
  "meat",
  "dairy",
];

export const HOSPITALITY_TYPES = ["restaurant", "hotel", "catering", "cloudKitchen"];

export const STORAGE_TYPES = ["storage"];

export const CAPACITY_UNITS: string[] = [
  "Kilograms (kg)",
  "Litres (L)",
  "Units / Packets",
  "Boxes / Crates",
  "Other",
];

export const STORAGE_UNITS: string[] = [
  "Square feet (sq ft)",
  "Metric tonnes (MT)",
  "Kilograms (kg)",
  "Litres (L)",
  "Other",
];

/* --------------------------- Nexia contact ------------------------- */

export const WHATSAPP_NUMBER = "919961850698";
export const WHATSAPP_DISPLAY = "+91 99618 50698";

export const STORAGE_KEY = "nexia-fssai-application-v1";
