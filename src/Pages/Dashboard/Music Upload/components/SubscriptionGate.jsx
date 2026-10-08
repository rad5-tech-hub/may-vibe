import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { BadgeCheck, Loader2 } from "lucide-react";
import { subscribe } from "../../../../utils/subscription";
import { getErrorMessage } from "../../../../utils/errorHelper";

export default function SubscriptionGate({ onSubscribed }) {
  const [labelName, setLabelName] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!labelName.trim()) {
      toast.error("Enter a label name — a label is required for contributors and releases.");
      return;
    }
    setBusy(true);
    try {
      const data = await subscribe(labelName);
      toast.success(`Subscribed to ${data?.plan?.name || "Free"} plan`);
      onSubscribed(data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Subscription failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 lg:p-10 max-w-lg w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-5">
          <BadgeCheck size={28} className="text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">A subscription is required</h2>
        <p className="text-sm text-gray-500 mb-6">
          You need an active subscription before you can create and distribute releases.
        </p>

        <form onSubmit={handleSubscribe} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-medium text-gray-600">Label name *</label>
            <input
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              placeholder="e.g. Nightshift Records"
              className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
            <p className="text-[11px] text-gray-400 mt-1">Required — contributors and releases are created under your label.</p>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {busy ? "Subscribing..." : "Start Free Plan"}
          </button>
          <p className="text-[11px] text-gray-400 text-center">
            Test environment — the free plan is applied instantly.
          </p>
        </form>
      </div>
    </div>
  );
}

SubscriptionGate.propTypes = { onSubscribed: PropTypes.func.isRequired };
