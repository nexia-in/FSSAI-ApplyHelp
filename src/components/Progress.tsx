import { Fragment } from "react";
import { cn } from "../utils/cn";
import { STEPS } from "../lib/data";
import { Icon } from "./ui";

/* --------------------------- Desktop stepper -------------------------- */

export function DesktopStepper({
  step,
  onGo,
}: {
  step: number;
  onGo: (s: number) => void;
}) {
  return (
    <ol className="hidden items-center lg:flex">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <Fragment key={s.key}>
            <li>
              <button
                type="button"
                disabled={i >= step}
                onClick={() => onGo(i)}
                className={cn(
                  "group flex items-center gap-2.5 rounded-xl p-1.5 transition-all",
                  i < step
                    ? "cursor-pointer hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                    : "cursor-default"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[12.5px] font-extrabold transition-all duration-300",
                    done && "border-emerald-600 bg-emerald-600 text-white",
                    active &&
                      "border-emerald-600 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100",
                    !done && !active && "border-slate-200 bg-white text-slate-400"
                  )}
                >
                  {done ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : s.num}
                </span>
                <span className="text-left">
                  <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Step {s.num}
                  </span>
                  <span
                    className={cn(
                      "block text-[13px] font-bold leading-tight",
                      active && "text-emerald-800",
                      done && "text-slate-700 group-hover:text-emerald-700",
                      !done && !active && "text-slate-400"
                    )}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
            </li>
            {i < STEPS.length - 1 && (
              <li
                aria-hidden="true"
                className={cn(
                  "mx-1 h-[3px] w-3 shrink-0 rounded-full transition-colors duration-300 xl:w-6",
                  done ? "bg-emerald-500" : "bg-slate-200"
                )}
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}

/* ---------------------------- Mobile progress -------------------------- */

export function MobileProgress({ step }: { step: number }) {
  const pct = ((step + 1) / STEPS.length) * 100;
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
          Step <span className="text-emerald-700">{step + 1}</span> of {STEPS.length}
        </p>
        <p className="flex items-center gap-1.5 text-[12px] font-extrabold text-slate-700">
          <Icon name={STEPS[step].icon} className="h-3.5 w-3.5 text-emerald-600" />
          {STEPS[step].title}
        </p>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
