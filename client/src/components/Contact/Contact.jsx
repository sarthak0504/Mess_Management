import React from 'react'



export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto p-5">
          <h2 className="text-2xl font-bold mb-5">Select Subscription Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div
              className={`p-5 border rounded-lg cursor-pointer transition-shadow ${selectedPlan === 'basic' ? 'shadow-lg bg-gray-200' : ''}`}
              onClick={() => handlePlanSelect('basic')}
            >
              <h3 className="text-xl font-semibold mb-2">One Plan</h3>
              <p>50Rs/ Day</p>
            </div>
            <div
              className={`p-5 border rounded-lg cursor-pointer transition-shadow ${selectedPlan === 'premium' ? 'shadow-lg bg-gray-200' : ''}`}
              onClick={() => handlePlanSelect('premium')}
            >
              <h3 className="text-xl font-semibold mb-2">Monthly Plan</h3>
              <p>1200Rs/30 Days</p>
            </div>
            <div
              className={`p-5 border rounded-lg cursor-pointer transition-shadow ${selectedPlan === 'deluxe' ? 'shadow-lg bg-gray-200' : ''}`}
              onClick={() => handlePlanSelect('deluxe')}
            >
              <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
              <p>2000Rs/60 Days</p>
            </div>
          </div>
    
          <h2 className="text-2xl font-bold mb-5">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div
              className={`p-5 border rounded-lg cursor-pointer transition-shadow ${paymentMethod === 'card' ? 'shadow-lg bg-gray-200' : ''}`}
              onClick={() => handlePaymentMethodSelect('card')}
            >
              <h3 className="text-xl font-semibold mb-2">Card</h3>
              <p>Pay with Debit/Credit Card</p>
            </div>
            <div
              className={`p-5 border rounded-lg cursor-pointer transition-shadow ${paymentMethod === 'upi' ? 'shadow-lg bg-gray-200' : ''}`}
              onClick={() => handlePaymentMethodSelect('upi')}
            >
              <h3 className="text-xl font-semibold mb-2">UPI</h3>
              <p>Pay with UPI</p>
            </div>
          </div>
    
          <button
            className={`w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg transition-opacity ${!selectedPlan || !paymentMethod ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            onClick={handlePaymentSubmit}
            disabled={!selectedPlan || !paymentMethod}
          >
            Proceed to Payment
          </button>
        </div>
      );
}