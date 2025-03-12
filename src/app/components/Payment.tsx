// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';
// import { useState, useEffect } from 'react';
// import Script from 'next/script';
// import { motion } from 'framer-motion';

// function Payment() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [amount, setAmount] = useState('0');
//   const [currency, setCurrency] = useState('INR');
//   const [loading, setLoading] = useState(false);
//   const [formStep, setFormStep] = useState(0);

//   const createOrderId = async () => {
//     try {
//       const response = await fetch('/api/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: parseFloat(amount) * 100,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       return data.orderId;
//     } catch (error) {
//       console.error('There was a problem with your fetch operation:', error);
//     }
//   };

//   const processPayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const orderId = await createOrderId();
//       const options = {
//         key: process.env.key_id,
//         amount: parseFloat(amount) * 100,
//         currency: currency,
//         name: 'name',
//         description: 'description',
//         order_id: orderId,
//         handler: async function (response) {
//           const data = {
//             orderCreationId: orderId,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           };

//           const result = await fetch('/api/verify', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: { 'Content-Type': 'application/json' },
//           });
//           const res = await result.json();
//           setLoading(false);
          
//           if (res.isOk) {
//             setFormStep(2); // Success step
//           } else {
//             alert(res.message);
//           }
//         },
//         prefill: {
//           name: name,
//           email: email,
//         },
//         theme: {
//           color: '#6C63FF',
//         },
//       };
      
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.on('payment.failed', function (response) {
//         setLoading(false);
//         alert(response.error.description);
//       });
//       paymentObject.open();
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   const validateAndProceed = (e) => {
//     e.preventDefault();
//     if (name && email && parseFloat(amount) >= 5) {
//       setFormStep(1);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { type: "spring", stiffness: 300, damping: 24 }
//     }
//   };

//   const stepVariants = {
//     initial: { x: "100%", opacity: 0 },
//     animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
//     exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } }
//   };

//   return (
//     <>
//       <Script
//         id="razorpay-checkout-js"
//         src="https://checkout.razorpay.com/v1/checkout.js"
//       />

//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-100 p-4">
//         <div className="w-full max-w-md">
//           <motion.div 
//             className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Top Vector Wave */}
//             <div className="absolute top-0 left-0 w-full h-24 overflow-hidden">
//               <svg className="absolute top-0 w-full" viewBox="0 0 500 150" preserveAspectRatio="none">
//                 <path 
//                   d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" 
//                   className="fill-indigo-600"
//                 ></path>
//               </svg>
//             </div>
            
//             {/* Content */}
//             <div className="px-8 pt-28 pb-12">
//               {formStep === 0 && (
//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="hidden"
//                 >
//                   <motion.div variants={itemVariants} className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
//                     <p className="text-gray-600 mt-2">Please provide your details below</p>
//                   </motion.div>
                  
//                   <form onSubmit={validateAndProceed}>
//                     <motion.div variants={itemVariants} className="mb-5">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <div className="relative">
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                           </svg>
//                         </span>
//                         <input
//                           type="text"
//                           required
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
//                           placeholder="John Doe"
//                         />
//                       </div>
//                     </motion.div>
                    
//                     <motion.div variants={itemVariants} className="mb-5">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                       <div className="relative">
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                             <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                           </svg>
//                         </span>
//                         <input
//                           type="email"
//                           placeholder="you@example.com"
//                           required
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
//                         />
//                       </div>
//                     </motion.div>
                    
//                     <motion.div variants={itemVariants} className="mb-8">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
//                       <div className="relative">
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
//                         <input
//                           type="number"
//                           step="1"
//                           min={5}
//                           required
//                           value={amount}
//                           onChange={(e) => setAmount(e.target.value)}
//                           className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
//                           placeholder="Amount in INR"
//                         />
//                       </div>
//                     </motion.div>
                    
//                     <motion.div variants={itemVariants}>
//                       <button
//                         type="submit"
//                         className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//                       >
//                         Continue
//                       </button>
//                     </motion.div>
//                   </form>
//                 </motion.div>
//               )}
              
//               {formStep === 1 && (
//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <motion.div variants={itemVariants} className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800">Confirm Payment</h2>
//                     <p className="text-gray-600 mt-2">Please review your payment details</p>
//                   </motion.div>

//                   <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-5 mb-6">
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-600">Name:</span>
//                       <span className="font-medium">{name}</span>
//                     </div>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-600">Email:</span>
//                       <span className="font-medium">{email}</span>
//                     </div>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-600">Amount:</span>
//                       <span className="font-medium">₹{parseFloat(amount).toFixed(2)}</span>
//                     </div>
//                   </motion.div>
                  
//                   <div className="flex space-x-4">
//                     <motion.button
//                       variants={itemVariants}
//                       onClick={() => setFormStep(0)}
//                       className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200"
//                     >
//                       Back
//                     </motion.button>
                    
//                     <motion.button
//                       variants={itemVariants}
//                       onClick={processPayment}
//                       className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                       ) : null}
//                       {loading ? 'Processing...' : 'Pay Now'}
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
              
//               {formStep === 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="text-center"
//                 >
//                   <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
                  
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
//                   <p className="text-gray-600 mb-8">Your payment has been processed successfully.</p>
                  
//                   <button
//                     onClick={() => {
//                       setName('');
//                       setEmail('');
//                       setAmount('0');
//                       setFormStep(0);
//                     }}
//                     className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
//                   >
//                     Make Another Payment
//                   </button>
//                 </motion.div>
//               )}
//             </div>
            
//             {/* Bottom Vector Wave */}
//             <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden">
//               <svg className="absolute bottom-0 w-full" viewBox="0 0 500 150" preserveAspectRatio="none">
//                 <path 
//                   d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
//                   className="fill-indigo-100"
//                 ></path>
//               </svg>
//             </div>
//           </motion.div>
          
//           {/* Secure Payment Indicator */}
//           <motion.div 
//             className="flex items-center justify-center mt-4 text-gray-500 text-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//             </svg>
//             Secure Payment • Powered by Razorpay
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Payment;

import React from 'react'

const Payment = () => {
  return (
    <div>Payment</div>
  )
}

export default Payment