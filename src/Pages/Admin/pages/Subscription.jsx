import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, CheckCircle2, ChevronDown, X, Infinity as InfinityIcon } from "lucide-react";
import adminApi from "../adminApi";
import { getErrorMessage } from "../../../utils/errorHelper";
import { formatFeatureKey } from "../../../utils/subscription";

const formatCurrency = (amount, currency = "USD") => {
  const num = Number(amount);
  if (isNaN(num)) return "—";
  return `${num.toFixed(2)} ${currency}`;
};

const featureLabels = {
  musicDistribution: "Music Distribution",
  analyticsDashboard: "Analytics Dashboard",
  prioritySupport: "Priority Support",
  royaltyReporting: "Royalty Reporting",
  musicVideoDistribution: "Music Video Distribution",
  videoQC: "Video QC",
  thumbnailOptimization: "Thumbnail Optimization",
  vevoSubmission: "Vevo Submission",
};

const defaultFeatures = Object.fromEntries(Object.keys(featureLabels).map((k) => [k, false]));

const planTypes = ["monthly", "annual"];
const currencies = ["USD", "NGN", "EUR", "GBP"];

const toBool = (v) => {
  if (typeof v === "boolean") return v;
  if (v == null || v === "") return false;
  if (v === 0 || v === "0" || v === false || v === "No" || v === "no" || v === "false") return false;
  return true;
};

const pick = (obj, camel, snake) => (obj[camel] !== undefined ? obj[camel] : obj[snake]);

const Section = ({ title, subtitle, open, onToggle, children }) => (
  <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
    >
      <span>
        <span className="block text-lg font-bold text-gray-900">{title}</span>
        {subtitle && <span className="block text-sm text-gray-500">{subtitle}</span>}
      </span>
      <ChevronDown
        size={18}
        className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
    </button>
    {open && <div className="border-t border-gray-100 p-5 sm:p-6">{children}</div>}
  </section>
);

const LimitField = ({ label, value, unlimited, onValueChange, onToggleUnlimited, placeholder }) => (
  <div>
    <label className="text-xs font-medium text-gray-500">{label}</label>
    <input
      type="number"
      min="0"
      value={unlimited ? "" : value}
      disabled={unlimited}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={unlimited ? "Unlimited" : placeholder}
      onWheel={(e) => e.currentTarget.blur()}
      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
    />
    <button
      type="button"
      onClick={onToggleUnlimited}
      className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
        unlimited
          ? "border-orange-500 bg-orange-50 text-orange-600"
          : "border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-600"
      }`}
    >
      <InfinityIcon size={13} /> Unlimited
    </button>
  </div>
);

const PriceEditor = ({ prices, onChange }) => {
  const update = (i, patch) => onChange(prices.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  return (
    <div className="space-y-3">
      {prices.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={p.amount}
            onChange={(e) => update(i, { amount: e.target.value })}
            placeholder="Amount"
            onWheel={(e) => e.currentTarget.blur()}
            className="w-40 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
          />
          <select
            value={p.currency}
            onChange={(e) => update(i, { currency: e.target.value })}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {prices.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(prices.filter((_, idx) => idx !== i))}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
              title="Remove price"
            >
              <X size={15} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...prices, { amount: "", currency: "USD" }])}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-xs font-medium text-gray-500 hover:border-orange-400 hover:text-orange-600"
      >
        <Plus size={13} /> Add price
      </button>
    </div>
  );
};

const FeaturePicker = ({ features, onChange, extraLabels, onAddExtra }) => {
  const [adding, setAdding] = useState(false);
  const [newKey, setNewKey] = useState("");

  const entries = [
    ...Object.entries(featureLabels),
    ...Object.entries(extraLabels || {}),
  ];

  const handleAdd = () => {
    const raw = newKey.trim();
    if (!raw) return;
    const key = raw.replace(/\s+/g, "_").toLowerCase();
    if (entries.some(([k]) => k === key)) {
      toast.error("That feature already exists");
      return;
    }
    onAddExtra(key, raw);
    setNewKey("");
    setAdding(false);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {entries.map(([key, label]) => (
          <label
            key={key}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
              features[key] ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={!!features[key]}
              onChange={(e) => onChange(key, e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            {label}
          </label>
        ))}
        {adding ? (
          <div className="flex items-center gap-2 rounded-xl border border-orange-400 bg-orange-50/40 px-3 py-2">
            <input
              autoFocus
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); handleAdd(); }
                if (e.key === "Escape") { setAdding(false); setNewKey(""); }
              }}
              placeholder="Feature name"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button type="button" onClick={handleAdd} className="text-orange-600 hover:text-orange-700" title="Add">
              <CheckCircle2 size={15} />
            </button>
            <button type="button" onClick={() => { setAdding(false); setNewKey(""); }} className="text-gray-400 hover:text-gray-600" title="Cancel">
              <X size={15} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-orange-600"
          >
            <Plus size={15} /> Add feature
          </button>
        )}
      </div>
    </div>
  );
};

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [savingEdit, setSavingEdit] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreate, setShowCreate] = useState(true);
  const [showPlans, setShowPlans] = useState(true);
  const [extraFeatureLabels, setExtraFeatureLabels] = useState({});

  const [form, setForm] = useState({
    name: "",
    type: "monthly",
    max_artists: "",
    max_artists_unlimited: false,
    prices: [{ amount: "", currency: "USD" }],
    features: { ...defaultFeatures },
  });

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/subscription/subscription-plans");
      const list = res.data?.plans || res.data?.data || [];
      setPlans(list);
      const extras = {};
      list.forEach((p) => {
        Object.keys(p.features || {}).forEach((k) => {
          if (!featureLabels[k] && !extras[k]) extras[k] = formatFeatureKey(k);
        });
      });
      setExtraFeatureLabels(extras);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load plans"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const buildLimit = (value, unlimited) => (unlimited || value === "" || value == null ? undefined : Number(value));

  const buildPrices = (prices) =>
    prices
      .filter((p) => p.amount !== "" && p.amount != null && !isNaN(Number(p.amount)))
      .map((p) => ({ amount: Number(p.amount), currency: p.currency }));

  const handleFeatureChange = (key, value) => {
    setForm((prev) => ({ ...prev, features: { ...prev.features, [key]: value } }));
  };

  const handleEditFeatureChange = (key, value) => {
    setEditForm((prev) => ({ ...prev, features: { ...prev.features, [key]: value } }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Plan name is required");
    const prices = buildPrices(form.prices);
    const payload = {
      name: form.name.trim(),
      type: form.type,
      maxArtists: buildLimit(form.max_artists, form.max_artists_unlimited),
      isUnlimitedArtists: form.max_artists_unlimited,
      prices,
      features: form.features,
    };
    setCreating(true);
    try {
      const res = await adminApi.post("/subscription/create-subscription-plan", payload);
      if (res.data?.success) {
        toast.success("Plan created");
        setForm((prev) => ({
          ...prev,
          name: "",
          max_artists: "",
          max_artists_unlimited: false,
          prices: [{ amount: "", currency: "USD" }],
          features: { ...defaultFeatures },
        }));
        loadPlans();
      } else {
        toast.error(res.data?.message || res.data?.error || "Failed to create plan");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create plan"));
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (plan) => {
    const planPrices = (plan.prices || [])
      .map((p) => ({ amount: p.amount ?? "", currency: p.currency || "USD" }))
      .filter((p) => p.amount !== "");
    if (!planPrices.length && (plan.price_amount != null || plan.priceAmount != null)) {
      planPrices.push({
        amount: plan.price_amount ?? plan.priceAmount,
        currency: plan.price_currency || plan.priceCurrency || "USD",
      });
    }
    if (!planPrices.length) planPrices.push({ amount: "", currency: "USD" });

    const maxArtists = pick(plan, "maxArtists", "max_artists");
    const unlimitedArtists =
      plan.isUnlimitedArtists !== undefined ? !!plan.isUnlimitedArtists : maxArtists == null;

    const rawFeatures = plan.features || {};
    const features = {};
    new Set([...Object.keys(featureLabels), ...Object.keys(extraFeatureLabels), ...Object.keys(rawFeatures)]).forEach((k) => {
      features[k] = rawFeatures[k] !== undefined ? toBool(rawFeatures[k]) : false;
    });

    setEditingId(plan.id);
    setEditForm({
      name: plan.name,
      type: plan.type,
      max_artists: maxArtists ?? "",
      max_artists_unlimited: unlimitedArtists,
      prices: planPrices,
      features,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return toast.error("Plan name is required");
    const id = editingId;
    const payload = {
      name: editForm.name.trim(),
      type: editForm.type,
      maxArtists: buildLimit(editForm.max_artists, editForm.max_artists_unlimited),
      isUnlimitedArtists: editForm.max_artists_unlimited,
      prices: buildPrices(editForm.prices),
      features: editForm.features,
    };
    setSavingEdit(id);
    try {
      const res = await adminApi.patch(`/subscription/edit-plan/${id}`, payload);
      if (res.data?.success) {
        toast.success("Plan updated");
        setEditingId(null);
        loadPlans();
      } else {
        toast.error(res.data?.message || "Failed to update plan");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update plan"));
    } finally {
      setSavingEdit(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await adminApi.delete(`/subscription/delete-plan/${id}`);
      if (res.data?.success) {
        toast.success("Plan deleted");
        setPendingDelete(null);
        loadPlans();
      } else {
        toast.error(res.data?.message || "Failed to delete plan");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete plan"));
    } finally {
      setDeletingId(null);
    }
  };

  const renderPrices = (plan) => {
    const prices = plan.prices || [];
    if (prices.length) return prices;
    if (plan.price_amount != null) return [{ amount: plan.price_amount, currency: plan.price_currency || "USD" }];
    return [];
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-sm text-gray-500">Manage pricing, limits, and features for each tier</p>
        </div>
      </div>

      <Section
        title="Create New Plan"
        open={showCreate}
        onToggle={() => setShowCreate((v) => !v)}
      >
        <form onSubmit={handleCreate} className="space-y-5 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Plan Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Pro Annual" className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500">
                {planTypes.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <LimitField
              label="Max Artists"
              value={form.max_artists}
              unlimited={form.max_artists_unlimited}
              onValueChange={(v) => setForm({ ...form, max_artists: v })}
              onToggleUnlimited={() => setForm({ ...form, max_artists_unlimited: !form.max_artists_unlimited, max_artists: "" })}
              placeholder="e.g. 5"
            />
          </div>

          <div className="border-t pt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Prices</h3>
            <PriceEditor prices={form.prices} onChange={(prices) => setForm({ ...form, prices })} />
          </div>

          <div className="border-t pt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
            <FeaturePicker features={form.features} onChange={handleFeatureChange} extraLabels={extraFeatureLabels} onAddExtra={(key, label) => { setExtraFeatureLabels((p) => ({ ...p, [key]: label })); setForm((p) => ({ ...p, features: { ...p.features, [key]: false } })); }} />
          </div>

          <button type="submit" disabled={creating} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-70">
            {creating && <Loader2 size={15} className="animate-spin" />}
            <Plus size={15} /> Create Plan
          </button>
        </form>
      </Section>

      <Section
        title="Existing Plans"
        subtitle={`${plans.length} plan${plans.length === 1 ? "" : "s"}`}
        open={showPlans}
        onToggle={() => setShowPlans((v) => !v)}
      >
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-orange-500" /></div>
        ) : plans.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No plans found</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => {
              const prices = renderPrices(plan);
              const period = plan.type === "monthly" ? "/mo" : plan.type === "annual" ? "/yr" : "";
              const maxArtists = pick(plan, "maxArtists", "max_artists");
              const unlimitedArtists =
                plan.isUnlimitedArtists !== undefined ? !!plan.isUnlimitedArtists : maxArtists == null;
              const activeFeatures = Object.entries(plan.features || {}).filter(([, v]) => toBool(v));
              return (
                <div key={plan.id} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="inline-flex w-fit items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {plan.type}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-gray-900">{plan.name}</h3>

                  <div className="mt-4 space-y-1">
                    {prices.length ? (
                      prices.map((p, i) => (
                        <div key={i} className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-gray-900">{formatCurrency(p.amount, p.currency)}</span>
                          <span className="text-sm font-medium text-gray-400">{period}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-2xl font-extrabold text-gray-900">—</span>
                    )}
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-gray-100 pt-5 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                      <span>{unlimitedArtists ? "Unlimited" : maxArtists ?? "Unlimited"} artists</span>
                    </li>
                    {activeFeatures.map(([k, v]) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                        <span>{featureLabels[k] || formatFeatureKey(k)}{typeof v === "string" && v !== "Yes" ? `: ${v}` : ""}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-2 border-t border-gray-100 pt-4">
                    <button onClick={() => startEdit(plan)} className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-600">
                      Edit Plan
                    </button>
                    <button onClick={() => setPendingDelete(plan)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-red-500 hover:border-red-300 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {editingId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-5">Edit Plan</h3>
            <form onSubmit={handleEdit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">Plan Name *</label>
                  <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Type *</label>
                  <select value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500">
                    {planTypes.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <LimitField
                  label="Max Artists"
                  value={editForm.max_artists}
                  unlimited={editForm.max_artists_unlimited}
                  onValueChange={(v) => setEditForm({ ...editForm, max_artists: v })}
                  onToggleUnlimited={() => setEditForm({ ...editForm, max_artists_unlimited: !editForm.max_artists_unlimited, max_artists: "" })}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Prices</h4>
                <PriceEditor prices={editForm.prices || []} onChange={(prices) => setEditForm({ ...editForm, prices })} />
              </div>

              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
                <FeaturePicker features={editForm.features || {}} onChange={handleEditFeatureChange} extraLabels={extraFeatureLabels} onAddExtra={(key, label) => { setExtraFeatureLabels((p) => ({ ...p, [key]: label })); setEditForm((p) => ({ ...p, features: { ...(p.features || {}), [key]: false } })); }} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setEditingId(null)} disabled={savingEdit === editingId} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={savingEdit === editingId} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-70">
                  {savingEdit === editingId && <Loader2 size={14} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-center font-bold text-lg text-gray-900">Delete this plan?</h3>
            <p className="mt-2 text-center text-sm text-gray-500">
              You're about to delete <span className="font-semibold text-gray-700">"{pendingDelete.name}"</span>. This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={deletingId === pendingDelete.id}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(pendingDelete.id)}
                disabled={deletingId === pendingDelete.id}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-70"
              >
                {deletingId === pendingDelete.id && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
