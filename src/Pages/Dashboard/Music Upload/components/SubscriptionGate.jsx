import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, ArrowRight } from "lucide-react";

export default function SubscriptionGate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 lg:p-10 max-w-lg w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-5">
          <BadgeCheck size={28} className="text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe to upload a release</h2>
        <p className="text-sm text-gray-500 mb-6">
          You need an active subscription before you can create and distribute releases. Choose a plan to get started.
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/subscription")}
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition inline-flex items-center justify-center gap-2"
        >
          Go to Subscription plans <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

SubscriptionGate.propTypes = { onSubscribed: PropTypes.func };
