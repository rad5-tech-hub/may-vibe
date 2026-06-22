export default function PricingSection() {
  const plans = [
    { name: "Starter Plan", price: 99, popular: false },
    { name: "Standard", price: 150, popular: true },
    { name: "Premium Plan", price: 390, popular: false },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida pellentesque lorem convallis blandum. Integer a felis est. Fusce finibus.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 border-2 ${
                plan.popular
                  ? 'bg-orange-600 text-white border-orange-600 scale-105 shadow-2xl'
                  : 'bg-white border-orange-200'
              } transition transform hover:scale-105`}
            >
              {plan.popular && (
                <span className="bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </span>
              )}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <p className="text-sm opacity-80 my-4">Lorem ipsum dolor sit amet</p>
              <div className="text-5xl font-bold my-6">
                ${plan.price}
              </div>
              <button
                className={`cursor-pointer w-full py-3 rounded-full font-medium transition ${
                  plan.popular
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
                }`}
              >
                Get Started
              </button>
              <ul className="mt-8 space-y-3 text-left">
                {[...Array(6)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-orange-400">✔</span>
                    <span className="text-sm opacity-90">Lorem ipsum dolor sit amet</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}