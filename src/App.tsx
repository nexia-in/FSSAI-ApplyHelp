import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./utils/cn";
import { DisclaimerCard, Footer, Hero, HowItWorks, TopBar } from "./components/Layout";
import { DesktopStepper, MobileProgress } from "./components/Progress";
import { SuccessScreen } from "./components/Success";
import { StepApplicant } from "./components/steps/Applicant";
import { StepBusiness } from "./components/steps/Business";
import { StepFoodBusiness } from "./components/steps/FoodBusiness";
import { StepPremises } from "./components/steps/Premises";
import { StepDocuments } from "./components/steps/Documents";
import { StepReview } from "./components/steps/Review";
import { Icon, btnGhost, btnPrimary } from "./components/ui";
import { STEPS, initialForm, type FormData } from "./lib/data";
import {
  buildWhatsAppMessage,
  clearSavedForm,
  downloadTxt,
  hasAnyData,
  loadForm,
  saveForm,
  validateStep,
  whatsappUrl,
  type FormErrors,
} from "./lib/utils";

export default function App() {
  const [form, setForm] = useState<FormData>(() => {
    const saved = loadForm();
    return saved ? { ...initialForm, ...saved } : initialForm;
  });
  const [restored, setRestored] = useState(() => {
    const saved = loadForm();
    return Boolean(saved && hasAnyData(saved));
  });
  const [showRestored, setShowRestored] = useState(restored);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [clearOpen, setClearOpen] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedTick, setSavedTick] = useState(0);

  const wizardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  /* Auto-save to this browser */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      saveForm(form);
      setSavedTick((x) => x + 1);
    }, 350);
    return () => window.clearTimeout(t);
  }, [form]);

  /* Close clear-dialog on Escape */
  useEffect(() => {
    if (!clearOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setClearOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [clearOpen]);

  const update = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => {
        if (!(key in e)) return e;
        const next = { ...e };
        delete next[key];
        return next;
      });
    },
    []
  );

  const scrollToWizard = useCallback(() => {
    requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const goToStep = useCallback(
    (s: number) => {
      setStep(s);
      setErrors({});
      scrollToWizard();
    },
    [scrollToWizard]
  );

  const focusFirstError = useCallback((errs: FormErrors) => {
    requestAnimationFrame(() => {
      const firstKey = Object.keys(errs)[0];
      if (!firstKey) return;
      const el = document.getElementById(firstKey);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus({ preventScroll: true });
      }
    });
  }, []);

  const submit = useCallback(() => {
    const all: FormErrors = {};
    for (let i = 0; i < 4; i++) Object.assign(all, validateStep(i, form));
    if (!confirmChecked)
      all.confirm =
        "Please confirm that the information entered above is correct before submitting.";

    if (Object.keys(all).length > 0) {
      setErrors(all);
      const firstBad = [0, 1, 2, 3].find((i) => Object.keys(validateStep(i, form)).length > 0);
      if (firstBad !== undefined) setStep(firstBad);
      focusFirstError(all);
      return;
    }

    downloadTxt(form);
    window.open(whatsappUrl(buildWhatsAppMessage(form)), "_blank", "noopener");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [form, confirmChecked, focusFirstError]);

  const next = useCallback(() => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    if (step === STEPS.length - 1) {
      submit();
      return;
    }
    goToStep(step + 1);
  }, [step, form, focusFirstError, goToStep, submit]);

  const prev = useCallback(() => {
    if (step > 0) goToStep(step - 1);
  }, [step, goToStep]);

  const resetAll = useCallback(
    (toTop: boolean) => {
      clearSavedForm();
      setForm(initialForm);
      setStep(0);
      setErrors({});
      setConfirmChecked(false);
      setSubmitted(false);
      setRestored(false);
      setShowRestored(false);
      firstRender.current = true;
      if (toTop) window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToWizard();
    },
    [scrollToWizard]
  );

  const isLast = step === STEPS.length - 1;

  return (
    <div id="top" className="min-h-screen">
      <TopBar />
      <Hero />

      <main className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="pt-8">
          <DisclaimerCard />
        </div>

        <div className="mt-6">
          <HowItWorks />
        </div>

        <section id="application" className="mt-8 scroll-mt-header sm:mt-10">
          {submitted ? (
            <SuccessScreen form={form} onRestart={() => resetAll(true)} />
          ) : (
            <>
              {/* Section header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                    <Icon name="clipboardCheck" className="h-3.5 w-3.5" />
                    FSSAI Application Support
                  </p>
                  <h2 className="mt-1.5 font-display text-[24px] font-semibold leading-tight text-slate-900 sm:text-[28px]">
                    Submit Your Details
                  </h2>
                  <p className="mt-1.5 max-w-lg text-[13.5px] leading-relaxed text-slate-500">
                    Our team will review the requirement and assist you with the application
                    submission process.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    key={savedTick}
                    className="anim-saved inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-extrabold text-emerald-700"
                  >
                    <Icon name="checkCircle" className="h-3.5 w-3.5" />
                    Saved in this browser
                  </span>
                  <button
                    type="button"
                    onClick={() => setClearOpen(true)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-extrabold text-slate-500 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                  >
                    <Icon name="trash" className="h-3.5 w-3.5" />
                    Clear Form
                  </button>
                </div>
              </div>

              {/* Restored notice */}
              {showRestored && restored && (
                <div className="anim-fade-in mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                    <Icon name="refreshCw" className="h-4 w-4" />
                  </span>
                  <p className="flex-1 text-[13px] font-semibold leading-relaxed text-emerald-900">
                    Your previously entered details have been restored.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRestored(false)}
                    aria-label="Dismiss notice"
                    className="rounded-lg p-1.5 text-emerald-600 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <Icon name="x" className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Wizard card */}
              <div
                ref={wizardRef}
                className="scroll-mt-header mt-4 rounded-3xl border border-slate-200/80 bg-white p-4 pb-5 shadow-lift sm:p-6 sm:pb-6 lg:p-8"
              >
                <div className="mb-6 border-b border-slate-100 pb-5">
                  <DesktopStepper step={step} onGo={goToStep} />
                  <MobileProgress step={step} />
                </div>

                {step === 0 && <StepApplicant form={form} update={update} errors={errors} />}
                {step === 1 && <StepBusiness form={form} update={update} errors={errors} />}
                {step === 2 && <StepFoodBusiness form={form} update={update} errors={errors} />}
                {step === 3 && <StepPremises form={form} update={update} errors={errors} />}
                {step === 4 && <StepDocuments form={form} update={update} errors={errors} />}
                {step === 5 && (
                  <StepReview
                    form={form}
                    onEdit={goToStep}
                    confirmChecked={confirmChecked}
                    setConfirmChecked={setConfirmChecked}
                    errors={errors}
                  />
                )}

                {/* Sticky navigation */}
                <div className="sticky bottom-3 z-30 mt-7 sm:bottom-4">
                  <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-lift backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={prev}
                          className={cn(btnGhost, "flex-1 sm:flex-none")}
                        >
                          <Icon name="chevronLeft" className="h-4 w-4" strokeWidth={2.2} />
                          Previous
                        </button>
                      ) : (
                        <p className="hidden flex-1 text-[12px] font-semibold text-slate-400 sm:block">
                          Your details stay saved in this browser as you type.
                        </p>
                      )}
                      {step === 0 && <div className="flex-1 sm:hidden" />}
                      {step > 0 && <div className="hidden flex-1 sm:block" />}
                      <button
                        type="button"
                        onClick={next}
                        className={cn(btnPrimary, "flex-1 sm:min-w-[200px] sm:flex-none")}
                      >
                        {isLast
                          ? "Submit Details to Nexia"
                          : step === STEPS.length - 2
                            ? "Review Details"
                            : "Continue"}
                        <Icon
                          name={isLast ? "send" : "chevronRight"}
                          className="h-4 w-4"
                          strokeWidth={2.2}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />

      {/* Clear form confirmation dialog */}
      {clearOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-dialog-title"
        >
          <div
            className="anim-fade-in absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setClearOpen(false)}
          />
          <div className="anim-scale-in relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-lift">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-100">
              <Icon name="trash" className="h-5 w-5" />
            </span>
            <h3
              id="clear-dialog-title"
              className="mt-4 font-display text-xl font-semibold text-slate-900"
            >
              Clear saved information?
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
              Are you sure you want to clear the information saved in this browser?
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => resetAll(false)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-md shadow-rose-600/25 transition-all hover:bg-rose-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
              >
                Clear Form
              </button>
              <button type="button" onClick={() => setClearOpen(false)} className={btnGhost}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
