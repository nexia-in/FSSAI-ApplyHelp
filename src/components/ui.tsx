import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";
import { icons } from "../lib/icons";
import type { BusinessTypeOption, FormData } from "../lib/data";
import type { FormErrors } from "../lib/utils";

/* ------------------------------- Icon ------------------------------- */

export function Icon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

/* ---------------------------- Button styles -------------------------- */

export const btnPrimary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-sm shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 disabled:pointer-events-none disabled:opacity-50";

export const btnGhost =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[14px] font-extrabold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:pointer-events-none disabled:opacity-50";

export const btnWhatsApp =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-md shadow-emerald-600/30 transition-all hover:bg-emerald-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200";

/* ------------------------------- Field ------------------------------- */

export function Field({
  id,
  label,
  required = false,
  optional = false,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[13.5px] font-bold text-slate-700"
      >
        <span>{label}</span>
        {optional && (
          <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
            Optional
          </span>
        )}
        {required && (
          <span className="text-emerald-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{hint}</p>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-[13px] font-semibold leading-snug text-rose-600"
    >
      <Icon name="alertCircle" className="mt-px h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------- Inputs ------------------------------ */

const baseInput =
  "w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] font-semibold text-slate-900 shadow-sm transition placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { error?: string };

export function TextInput({ error, className, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      aria-invalid={error ? true : undefined}
      className={cn(
        baseInput,
        error
          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
          : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100",
        className
      )}
    />
  );
}

export function PhoneInput({ error, className, ...props }: TextInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 border-r border-slate-200 pr-2 text-[13px] font-bold text-slate-400">
        +91
      </span>
      <TextInput
        error={error}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        maxLength={10}
        placeholder="10-digit number"
        className={cn("pl-[4.3rem]", className)}
        {...props}
      />
    </div>
  );
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  placeholder?: string;
};

export function SelectInput({
  error,
  className,
  placeholder = "Please select",
  children,
  ...props
}: SelectInputProps) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={error ? true : undefined}
        className={cn(
          baseInput,
          "cursor-pointer appearance-none pr-10",
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100",
          !props.value && "text-slate-400",
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      <Icon
        name="chevronDown"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function TextareaInput({ error, className, ...props }: TextareaInputProps) {
  return (
    <textarea
      {...props}
      aria-invalid={error ? true : undefined}
      className={cn(
        baseInput,
        "resize-y leading-relaxed",
        error
          ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
          : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100",
        className
      )}
    />
  );
}

/* --------------------------- Choice groups --------------------------- */

export function ChoiceGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div
      className={cn("grid gap-2", options.length === 2 ? "grid-cols-2" : "grid-cols-3")}
      role="group"
    >
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "" : o.value)}
            className={cn(
              "flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border px-2 text-center text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2",
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-600/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50"
            )}
          >
            {active && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />}
            <span className="leading-tight">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ChipGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "" : o)}
            className={cn(
              "flex min-h-[42px] items-center gap-1.5 rounded-full border px-4 text-[13px] font-bold transition-all",
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-600/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-800"
            )}
          >
            {active && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function MultiChips({
  values,
  onToggle,
  options,
}: {
  values: string[];
  onToggle: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => {
        const active = values.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(o)}
            className={cn(
              "flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2",
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-600/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-800"
            )}
          >
            {active && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function OptionList({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; hint: string }[];
}) {
  return (
    <div className="grid gap-2.5" role="group">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
              active
                ? "border-emerald-500 bg-emerald-50/80 shadow-sm shadow-emerald-600/10"
                : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                active ? "border-emerald-600 bg-emerald-600" : "border-slate-300 bg-white"
              )}
            >
              {active && <Icon name="check" className="h-3 w-3 text-white" strokeWidth={3.5} />}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block text-[14px] font-bold leading-snug",
                  active ? "text-emerald-900" : "text-slate-700"
                )}
              >
                {o.label}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-slate-500">{o.hint}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function BusinessTypeGrid({
  selected,
  onToggle,
  options,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  options: BusinessTypeOption[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="group">
      {options.map((o) => {
        const active = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(o.id)}
            className={cn(
              "group relative flex min-h-[92px] flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-200",
              active
                ? "border-emerald-500 bg-emerald-50/80 shadow-sm shadow-emerald-600/10"
                : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-slate-900/5"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                active
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"
              )}
            >
              <Icon name={o.icon} className="h-[18px] w-[18px]" />
            </span>
            <span
              className={cn(
                "text-[12px] font-bold leading-snug",
                active ? "text-emerald-900" : "text-slate-600"
              )}
            >
              {o.label}
            </span>
            {active && (
              <span className="anim-scale-in absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Icon name="check" className="h-3 w-3" strokeWidth={3.5} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ Checkbox ----------------------------- */

export function CheckboxRow({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer select-none items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 border-slate-300 bg-white transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-focus-visible:ring-4 peer-focus-visible:ring-emerald-200">
        <Icon name="check" className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
      </span>
      <span className="text-[13.5px] font-semibold leading-relaxed text-slate-600">
        {children}
      </span>
    </label>
  );
}

/* --------------------------- Step furniture -------------------------- */

export function StepHeader({
  badge,
  title,
  subtitle,
  icon,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  icon: string;
}) {
  return (
    <div className="mb-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
        <Icon name={icon} className="h-3.5 w-3.5" />
        {badge}
      </span>
      <h2 className="mt-3 font-display text-[25px] font-semibold leading-tight text-slate-900 sm:text-[30px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

export function SubCard({
  icon,
  title,
  subtitle,
  children,
  className,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5", className)}>
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200/80">
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[15px] font-extrabold leading-snug text-slate-800">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function InfoNote({
  icon = "info",
  tone = "mint",
  children,
  className,
}: {
  icon?: string;
  tone?: "mint" | "amber" | "slate";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl p-3.5 text-[13px] font-semibold leading-relaxed",
        tone === "mint" && "border border-emerald-200/80 bg-emerald-50/70 text-emerald-900",
        tone === "amber" && "border border-amber-200/80 bg-amber-50 text-amber-900",
        tone === "slate" && "border border-slate-200 bg-slate-50 text-slate-600",
        className
      )}
    >
      <Icon
        name={icon}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "mint" && "text-emerald-600",
          tone === "amber" && "text-amber-500",
          tone === "slate" && "text-slate-400"
        )}
      />
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------ Step props --------------------------- */

export interface StepProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  errors: FormErrors;
}
