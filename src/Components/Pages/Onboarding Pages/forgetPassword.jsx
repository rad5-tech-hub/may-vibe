import { useState } from 'react';
import '../../../index.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="min-h-screen login font-display flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Outer container removed extra padding on small screens */}
        <div className="bg-black/70 backdrop-blur-sm px-6 py-10 sm:px-12 sm:py-12 md:px-20 md:py-16 lg:px-24 lg:py-16">
          {/* Inner card - responsive padding & width */}
          <div className="max-w-lg lg:max-w-3xl mx-auto bg-black/70 backdrop-blur-sm p-8 lg:p-12 border-2 border-orange-500 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-white text-xl lg:text-3xl font-bold">Forgot Password?</h2>
              <p className="text-gray-400 mt-2 text-xs lg:text-sm">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 text-white py-3 px-0 focus:outline-none focus:border-orange-500 placeholder-gray-500 transition-colors"
                required
              />

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-semibold py-4 rounded transition-colors"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/login" className="text-orange-500 hover:text-orange-400 text-sm">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;