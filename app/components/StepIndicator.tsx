"use client";

export default function StepIndicator({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="w-full">
      <div className="step-track">
        {steps.map((step, i) => (
          <div key={i} className="contents">
            <div
              className={`step-dot ${
                i < currentStep
                  ? "complete"
                  : i === currentStep
                  ? "active"
                  : ""
              }`}
            >
              {i < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < steps.length - 1 && (
              <div className={`step-line ${i < currentStep ? "complete" : ""}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, i) => (
          <span
            key={i}
            className={`text-[11px] font-medium transition-colors ${
              i <= currentStep
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)]"
            }`}
            style={{ width: `${100 / steps.length}%`, textAlign: i === 0 ? "left" : i === steps.length - 1 ? "right" : "center" }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
