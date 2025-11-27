// src/components/payouts/PayoutHistory.jsx
const PayoutHistory = () => {
  const payouts = [
    { id: 'MV1345', amount: '$1,000', date: '08/03/2022' },
    { id: 'MV1345', amount: '$3,500', date: '09/03/2022' },
    { id: 'MV1345', amount: '$2,300', date: '19/03/2022' },
    { id: 'MV1345', amount: '$1,400', date: '20/03/2022' },
    { id: 'MV1345', amount: '$700', date: '08/03/2022' },
    { id: 'MV1345', amount: '$3,800', date: '09/03/2022' },
  ];

  return (
    <div className="bg-gray-200 rounded-3xl px-8 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Payout history</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-3 text-sm font-medium text-gray-600 border-b pb-3">
          <span>ID</span>
          <span>Amount</span>
          <span>Date</span>
        </div>

        {payouts.map((payout, i) => (
          <div key={i} className="grid grid-cols-3 text-sm text-gray-800">
            <span className="font-medium">{payout.id}</span>
            <span className="font-bold">{payout.amount}</span>
            <span className="text-gray-600">{payout.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutHistory;