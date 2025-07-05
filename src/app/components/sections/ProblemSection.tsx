import React from 'react';

const ProblemSection = () => {
  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto my-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-red-600">The Problem</span>{' '}
          <span className="text-orange-500">We&apos;re Solving</span>
        </h2>
        <p className="text-xl text-gray-300">
          Cybersecurity is broken for most businesses.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div>
          <p className="text-gray-300 mb-6">
            The market is fragmented. It&apos;s hard to know who to trust. Budgets are unclear. 
            And threats keep evolving.
          </p>
          
          {/* Problem List */}
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">🔸</span>
              <span className="text-gray-300">Confusing service options</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 mt-1">🔸</span>
              <span className="text-gray-300">No pricing or quality transparency</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">🔸</span>
              <span className="text-gray-300">Rigid, one-size-fits-all offerings</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 mt-1">🔸</span>
              <span className="text-gray-300">No collaboration between service providers</span>
            </li>
          </ul>
        </div>

        {/* Visual Element */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-orange-500 mb-2">Fragmented Market</h3>
            <p className="text-gray-300">Making cybersecurity simple, transparent, and collaborative</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-300 mb-4">Ready to fix your cybersecurity challenges?</p>
        
      </div>
    </div>
  );
};

export default ProblemSection;