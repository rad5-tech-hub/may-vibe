import { Check } from "lucide-react";
import { toast } from "sonner";
import { ReleaseWizardProvider, useReleaseWizard } from "./context/ReleaseWizardContext";
import Step1ReleaseDetails from "./steps/Step1ReleaseDetails";
import Step2TrackList from "./steps/Step2TrackList";
import Step3TrackDetails from "./steps/Step3TrackDetails";
import Step4CoverArt from "./steps/Step4CoverArt";
import Step5DeliveryReview from "./steps/Step5DeliveryReview";

function Stepper() {
  const { steps, step, goToStep, errors } = useReleaseWizard();

  const stepHasErrors = (s) => {
    const prefixes =
      s === 1 ? ["title", "primary_artist_ids", "genre_id", "sub_genre_id", "copyright", "upc"] :
      s === 2 ? ["audio_", "title_", "tracks"] :
      s === 3 ? ["title_", "ai_", "explicit_", "language_", "instrumental_", "isrc_", "version_", "artwork_"] :
      s === 4 ? ["artwork"] :
      ["release_date", "artwork"];
    return Object.keys(errors).some((k) => prefixes.some((p) => k === p || k.startsWith(p)));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 mb-6 overflow-x-auto">
      <ol className="flex items-center gap-1 min-w-max">
        {steps.map((s, i) => {
          const isDone = s.id < step;
          const isCurrent = s.id === step;
          const hasErr = isCurrent && stepHasErrors(s.id);
          return (
            <li key={s.id} className="flex items-center">
              <button
                type="button"
                onClick={() => s.id < step && goToStep(s.id)}
                disabled={s.id > step}
                className={`cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  isCurrent
                    ? "bg-orange-500 text-white shadow"
                    : isDone
                      ? "text-green-700 hover:bg-green-50"
                      : s.id < step
                        ? "text-gray-600 hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                } ${hasErr ? "ring-2 ring-red-300" : ""}`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isCurrent ? "bg-white text-orange-500" : isDone ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? <Check size={11} strokeWidth={3} /> : s.id}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.label.split(" ")[0]}</span>
              </button>
              {i < steps.length - 1 && <span className="w-4 sm:w-8 h-px bg-gray-200 mx-1" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepBody() {
  switch (useReleaseWizard().step) {
    case 1:
      return <Step1ReleaseDetails />;
    case 2:
      return <Step2TrackList />;
    case 3:
      return <Step3TrackDetails />;
    case 4:
      return <Step4CoverArt />;
    case 5:
      return <Step5DeliveryReview />;
    default:
      return null;
  }
}

function NavFooter() {
  const { step, goToStep, validateStep, getStepErrors, tracks, setSelectedTrackKey, scrollToTop, submitting, submitted } = useReleaseWizard();
  if (submitted) return null;

  const handleNext = () => {
    if (validateStep(step)) {
      goToStep(step + 1);
      return;
    }
    const errs = getStepErrors(step);
    const firstKey = Object.keys(errs)[0];
    toast.error(errs[firstKey] || "Fix the highlighted fields before continuing.");
    if (step === 3 && firstKey) {
      const trackKey = firstKey.slice(firstKey.indexOf("_") + 1);
      if (tracks.some((t) => t.key === trackKey)) setSelectedTrackKey(trackKey);
      requestAnimationFrame(() => document.getElementById("track-details-anchor")?.scrollIntoView({ block: "start" }));
    } else {
      scrollToTop();
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={() => goToStep(step - 1)}
        disabled={step === 1 || submitting}
        className="cursor-pointer bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm"
      >
        Back
      </button>
      {step < 5 && (
        <button
          type="button"
          onClick={handleNext}
          disabled={submitting}
          className="cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl text-sm"
        >
          Next
        </button>
      )}
    </div>
  );
}

function WizardInner() {
  const { step } = useReleaseWizard();
  return (
    <div>
      <Stepper />
      <StepBody key={step} />
      <NavFooter />
    </div>
  );
}

export default function ReleaseWizard() {
  return (
    <ReleaseWizardProvider>
      <WizardInner />
    </ReleaseWizardProvider>
  );
}
