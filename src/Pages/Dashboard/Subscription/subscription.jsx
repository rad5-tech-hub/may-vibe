import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Calendar, Tag, Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import { getSubscription, hasActiveSubscription, subscribe } from "../../../utils/subscription";
import { getErrorMessage } from "../../../utils/errorHelper";
import userApi from "../../../utils/userApi";

export default function SubscriptionPage() {
  const [sub, setSub] = useState(() => (hasActiveSubscription() ? getSubscription() : null));
  const [labelName, setLabelName] = useState("");
  const [busy, setBusy] = useState(false);
  // undefined = not checked yet, null = server says NO label, string = label id present
  const [serverLabelId, setServerLabelId] = useState(undefined);

  useEffect(() => {
    userApi
      .get("/contributors")
      .then((res) => setServerLabelId(res.data?.scope?.label_id ?? null))
      .catch(() => setServerLabelId(undefined));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!labelName.trim()) {
      toast.error("Enter a label name — a label is required for contributors and releases.");
      return;
    }
    setBusy(true);
    try {
      const data = await subscribe(labelName);
      setSub(data);
      setServerLabelId(data?.label?.id ?? null);
      toast.success(`Subscribed to ${data?.plan?.name || "Free"} plan — label linked`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Subscription failed"));
    } finally {
      setBusy(false);
    }
  };

  const serverMissingLabel = serverLabelId === null;

  if (sub) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <BadgeCheck size={24} className="text-green-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{sub.plan?.name || "Free"} Plan</p>
              <p className="text-xs text-gray-500 capitalize">Type: {sub.plan?.type || "free"} · Active</p>
            </div>
          </div>

          <dl className="text-sm space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <dt className="text-gray-500 flex items-center gap-2">
                <Calendar size={14} /> Expires
              </dt>
              <dd className="font-medium text-gray-900">{sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : "—"}</dd>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <dt className="text-gray-500 flex items-center gap-2">
                <Tag size={14} /> Label
              </dt>
              <dd className="font-medium text-gray-900">
                {sub.label?.name || (serverLabelId ? "Linked to this account" : "No label set")}
              </dd>
            </div>
            <div className="flex items-center justify-between py-2">
              <dt className="text-gray-500">Default artist</dt>
              <dd className="font-medium text-gray-900">{sub.artist?.stage_name || "—"}</dd>
            </div>
          </dl>

          {serverMissingLabel && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800 flex gap-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <span>
                <span className="font-bold">The server reports no label on this account.</span> Adding contributors and creating releases will fail
                until a label is linked. Use the form below — a label created on another account does not apply here.
              </span>
            </div>
          )}
        </div>

        {(serverMissingLabel || !sub.label) && (
          <form onSubmit={handleSubscribe} className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Link a label to this account *</h3>
            <input
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              placeholder="Label name"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
            <button
              type="submit"
              disabled={busy}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-xl text-sm inline-flex items-center gap-2"
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
              {busy ? "Linking..." : "Create / link label"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
      <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <BadgeCheck size={28} className="text-orange-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">No active subscription</h2>
          <p className="text-sm text-gray-500">A subscription is required to create and distribute releases.</p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-4">
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
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition inline-flex items-center justify-center gap-2"
          >
            {busy && <Loader2 size={16} className="animate-spin" />}
            {busy ? "Subscribing..." : "Start Free Plan"}
          </button>
          <p className="text-[11px] text-gray-400 text-center">Test environment — the free plan is applied instantly.</p>
        </form>
      </div>
    </div>
  );
}
