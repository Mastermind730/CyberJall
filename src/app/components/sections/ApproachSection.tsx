import React from 'react';

const ApproachSection = () => {
  return (
    <div className="bg-black text-white p-10 rounded-lg shadow-2xl max-w-6xl mx-auto my-10">
      {/* Unique Approach Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-red-600">Our Unique</span>{' '}
          <span className="text-orange-500">Approach</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          CyberJall makes cybersecurity simple and collaborative.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Benefits List */}
          <div className="space-y-5">
            {[
              "Verified service providers",
              "Build multi-vendor custom packages",
              "Transparent pricing & scope",
              "AI-powered health score & improvement tips",
              "Community insights and expert-led webinars"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className={`text-2xl mr-4 ${index % 2 === 0 ? 'text-orange-500' : 'text-red-600'}`}>✔️</span>
                <span className="text-gray-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
          
          {/* Highlight Box */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border-2 border-orange-500/30 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-center text-orange-500 mb-4">
              One subscription. Multiple service providers. Real protection.
            </h3>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">
          <span className="text-red-600">How CyberJall</span>{' '}
          <span className="text-orange-500">Works</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 text-center">
          (3-Step Flow) How CyberJall Helps Your Business Stay Secure
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-900 p-6 rounded-xl border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
              <h3 className="text-xl font-bold text-orange-500">Browse & Compare Services</h3>
            </div>
            <p className="text-gray-300">
              Explore cybersecurity solutions across cloud, mobile, web, compliance, and more.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-gray-900 p-6 rounded-xl border-t-4 border-orange-500">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
              <h3 className="text-xl font-bold text-red-600">Choose Providers You Trust</h3>
            </div>
            <p className="text-gray-300">
              Review verified profiles, certifications, and case studies.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-gray-900 p-6 rounded-xl border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
              <h3 className="text-xl font-bold text-orange-500">Request a Customized Package</h3>
            </div>
            <p className="text-gray-300">
              Tell us your needs and get a tailored cybersecurity plan.
            </p>
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default ApproachSection;