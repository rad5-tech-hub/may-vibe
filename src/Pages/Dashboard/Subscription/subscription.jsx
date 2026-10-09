import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { BadgeCheck, Calendar, Tag, Loader2, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { fetchAllPlans, fetchMyPlan, initiateSubscriptionPayment, refreshContextAndFetchPlan, formatFeatureKey, getSubscription, getLabel, hasLabel } from "../../../utils/subscription";
import { getErrorMessage } from "../../../utils/errorHelper";

const formatPrice = (amount, currency = "USD") => {
  const num = Number(amount);
  if (isNaN(num)) return "—";
  return `${num.toFixed(2)} ${currency}`;
};

const typeLabel = (t) =>
  ({ monthly: "Monthly", annual: "Annual", custom: "Custom", per_video: "Per Video" }[t] || t);

export default function SubscriptionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSub, setActiveSub] = useState(() => getSubscription());
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null);
  const checkingRef = useRef(false);
  const tokenLabel = getLabel();
  const labelLinked = hasLabel();

  useEffect(() => {
    const paymentStatus = searchParams.get("status");
    const txRef = searchParams.get("tx_ref") || searchParams.get("transaction_id");
    const isPaymentReturn = !!(paymentStatus || txRef);

    const load = async () => {
      if (isPaymentReturn) {
        setVerifying(true);
        try {
          const plan = await refreshContextAndFetchPlan();
          if (plan) setActiveSub(getSubscription() || plan);
          if (paymentStatus === "successful" || paymentStatus === "success") {
            toast.success("Payment confirmed — subscription activated");
          } else if (paymentStatus) {
            toast.info(`Payment ${paymentStatus}`);
          }
        } catch (err) {
          toast.error(getErrorMessage(err, "Payment received, but refreshing your subscription failed. It may take a moment — refresh the page shortly."));
        } finally {
          setVerifying(false);
          setSearchParams({}, { replace: true });
        }
      }

      const plansRes = await fetchAllPlans().catch((err) => {
        toast.error(getErrorMessage(err, "Failed to load plans"));
        return [];
      });
      setPlans(plansRes);

      if (!isPaymentReturn && !getSubscription()) {
        fetchMyPlan()
          .then(() => {
            const cached = getSubscription();
            if (cached) setActiveSub(cached);
          })
          .catch(() => {});
      }
      setLoadingPlans(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Payment opens in a new tab, so re-check when the user returns to this tab.
  useEffect(() => {
    if (!paymentModal) return;
    const check = async () => {
      if (checkingRef.current) return;
      checkingRef.current = true;
      try {
        const plan = await refreshContextAndFetchPlan();
        if (plan) {
          setActiveSub(getSubscription() || plan);
          setPaymentModal(null);
          toast.success("Payment confirmed — subscription activated");
        }
      } catch {
        /* not paid yet */
      } finally {
        checkingRef.current = false;
      }
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentModal]);

  const handleSubscribe = async (plan) => {
    setPayingId(plan.id);
    try {
      const data = await initiateSubscriptionPayment(plan.id);
      const link = data?.payment_link;
      if (link) {
        setPaymentModal({ plan, link });
      } else {
        toast.error("No payment link returned. Please try again.");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to initiate payment"));
    } finally {
      setPayingId(null);
    }
  };

  const subscribedPlanId = activeSub?.plan?.id || activeSub?.plan_id || activeSub?.planId;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        <p className="text-sm text-gray-500">Choose the plan that fits your release needs</p>
      </div>

      {verifying && (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
          <Loader2 size={16} className="animate-spin" /> Confirming your payment...
        </div>
      )}

      {activeSub && (
        <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white shadow-lg lg:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <BadgeCheck size={14} /> Active subscription
              </div>
              <h2 className="text-2xl font-extrabold">{activeSub.plan?.name || activeSub.name || "Current Plan"}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {activeSub.expires_at ? `Expires ${new Date(activeSub.expires_at).toLocaleDateString()}` : "No expiry"}
                </span>
                <span>Type: {typeLabel(activeSub.plan?.type || activeSub.type)}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Tag size={14} />
                  {tokenLabel?.name || (labelLinked ? "Label linked" : "No label set")}
                </span>
              </div>
            </div>
            <div className="text-right">
              {(activeSub.plan?.display_price || activeSub.display_price) && (
                <p className="text-3xl font-extrabold">
                  {formatPrice(activeSub.plan?.display_price ?? activeSub.display_price, activeSub.plan?.display_currency ?? activeSub.display_currency ?? "USD")}
                </p>
              )}
            </div>
          </div>
          {!labelLinked && (
            <div className="relative mt-5 rounded-xl bg-white/15 p-3 text-xs backdrop-blur-sm">
              <span className="font-bold">Note:</span> No label found on your account. You need a label before you can create and submit releases.
            </div>
          )}
        </div>
      )}

      {loadingPlans ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-orange-500" /></div>
      ) : plans.length === 0 ? (
        <p className="py-12 text-center text-gray-500">No plans available yet.</p>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = subscribedPlanId && subscribedPlanId === plan.id;
            const activeFeatures = Object.entries(plan.features || {}).filter(([, v]) => v === true || v === 1 || v === "true");
            return (
              <div
                key={plan.id}
                className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition ${
                  isCurrent ? "border-orange-400 ring-2 ring-orange-200" : "border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {typeLabel(plan.type)}
                  </span>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                      <Sparkles size={12} /> Current
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">{formatPrice(plan.display_price, plan.display_currency)}</span>
                  {plan.type === "monthly" && <span className="text-sm font-medium text-gray-400">/mo</span>}
                  {plan.type === "annual" && <span className="text-sm font-medium text-gray-400">/yr</span>}
                </div>
                {plan.royalty_share != null && (
                  <p className="mt-1 text-xs text-gray-500">{plan.royalty_share}% royalty share</p>
                )}

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-gray-100 pt-5 text-sm text-gray-700">
                  {plan.max_artists != null && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                      <span>{plan.max_artists} artists</span>
                    </li>
                  )}
                  {plan.max_releases_per_year != null && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                      <span>{plan.max_releases_per_year} releases / year</span>
                    </li>
                  )}
                  {activeFeatures.map(([k, v]) => (
                    <li key={k} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{formatFeatureKey(k)}{typeof v === "string" && v !== "Yes" ? `: ${v}` : ""}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={payingId === plan.id || isCurrent}
                    className={`w-full rounded-xl py-2.5 text-sm font-semibold transition disabled:opacity-60 ${
                      isCurrent
                        ? "cursor-default bg-emerald-50 text-emerald-600"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {payingId === plan.id ? (
                      <span className="inline-flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Processing...</span>
                    ) : isCurrent ? (
                      "Your current plan"
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {paymentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
              <ExternalLink size={22} className="text-orange-500" />
            </div>
            <h3 className="text-center font-bold text-lg text-gray-900">Completing your payment</h3>
            <p className="mt-2 text-center text-sm text-gray-500">
              You're being redirected to our secure payment provider in a new tab to complete your
              subscription to <span className="font-semibold text-gray-700">"{paymentModal.plan.name}"</span>.
              Come back to this page once you've finished — your plan will activate automatically.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPaymentModal(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={paymentModal.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPaymentModal(null)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Continue to payment <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
