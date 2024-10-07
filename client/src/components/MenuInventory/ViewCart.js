// import React from 'react';

// const ViewCart = ({ cartItems, onRemoveFromCart, onCheckout }) => {
//   // Calculate total amount with GST (assuming a GST rate of 18%)
//   const GST_RATE = 0.18;
//   const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
//   const totalWithGST = totalAmount + totalAmount * GST_RATE;

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

//       <div className="overflow-x-auto w-full max-w-4xl">
//         {cartItems.length > 0 ? (
//           <>
//             <table className="min-w-full bg-white border border-gray-200 text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b border-gray-200">Item Name</th>
//                   <th className="py-2 px-4 border-b border-gray-200">Price</th>
//                   <th className="py-2 px-4 border-b border-gray-200">Remove</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map(item => (
//                   <tr key={item._id}>
//                     <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
//                     <td className="py-2 px-4 border-b border-gray-200">{item.price} ₹</td>
//                     <td className="py-2 px-4 border-b border-gray-200">
//                       <button
//                         onClick={() => onRemoveFromCart(item._id)}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="mt-4">
//               <h3 className="text-xl font-bold">Total Amount (including GST): {totalWithGST.toFixed(2)} ₹</h3>
//             </div>

//             <div className="mt-4">
//               <h3 className="text-lg font-bold">Payment Method:</h3>
              <div className="flex space-x-4 m/t-2">
//                 <button
//                   onClick={() => onCheckout('UPI')}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Pay with UPI
//                 </button>
//                 <button
//                   onClick={() => onCheckout('Cash')}
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Pay with Cash
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewCart;
