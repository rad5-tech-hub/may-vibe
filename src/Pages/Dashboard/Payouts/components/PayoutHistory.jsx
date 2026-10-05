// src/components/payouts/PayoutHistory.jsx
const PayoutHistory = () => {
  const payouts = [
    { amount: '$1,000', date: '08/03/2022' },
    { amount: '$3,500', date: '09/03/2022' },
    { amount: '$2,300', date: '19/03/2022' },
    { amount: '$1,400', date: '20/03/2022' },
    { amount: '$700', date: '08/03/2022' },
    { amount: '$3,800', date: '09/03/2022' },
  ];

  return (
    <div className="flex-1 bg-gray-50 rounded-3xl px-8 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Payout history</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-2 text-sm font-medium text-gray-600 border-b pb-3">
          <span>Amount</span>
          <span className="text-right">Date</span>
        </div>

        {payouts.map((payout, i) => (
          <div key={i} className="grid grid-cols-2 text-sm text-gray-800">
            <span className="font-bold">{payout.amount}</span>
            <span className="text-gray-600 text-right">{payout.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutHistory;