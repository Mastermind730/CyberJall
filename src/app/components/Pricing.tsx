import { CheckCircle, Database, Lock, Shield } from 'lucide-react';
import React from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


const Pricing = () => {

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
    const router = useRouter();
       const plans = [
        {
          title: "Basic Security Assessment",
          price: "$1,499",
          duration: "4 Month Plan",
          features: [
            "Short-term, intensive assessment",
            "Fast-track security enhancement",
            "Initial vulnerability scan",
            "Focused reporting with remediation recommendations",
            "Critical vulnerability identification and fixes"
          ],
          includes: [
            "Free Membership of CyberJall Insights",
            "1 Month Add on Service by CyberJall"
          ],
          icon: <Shield className="h-12 w-12" />,
          popular: false
        },
        {
          title: "Advanced Protection",
          price: "$2,999",
          duration: "8 Month Plan",
          features: [
            "Mid-term solution with periodic assessments",
            "Balanced, proactive coverage",
            "Extended security focus",
            "Bi-monthly vulnerability scans",
            "Detailed technical reporting",
            "Remediation follow-up",
            "Regular threat updates"
          ],
          includes: [
            "You will get one Cyber-Security Consultant for particular time",
            "Free Membership of CyberJall Insights"
          ],
          icon: <Lock className="h-12 w-12" />,
          popular: true
        },
        {
          title: "Enterprise Shield",
          price: "$4,999",
          duration: "12 Month Plan",
          features: [
            "Year-round comprehensive security",
            "Continuous improvement system",
            "Monthly in-depth scans",
            "Comprehensive reporting",
            "Continuous monitoring",
            "Priority response support",
            "Complete security management"
          ],
          includes: [
            "You will get one more additional Cyber-Security Partner by CyberJall",
            "Free Membership of CyberJall Insights"
          ],
          icon: <Database className="h-12 w-12" />,
          popular: false
        }
      ];
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                        plan.popular ? 'border-2 border-red-600 relative' : 'border border-gray-800'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-red-500 text-white px-4 py-1 text-sm font-bold">
                            MOST POPULAR
                          </div>
                        </div>
                      )}
                      <div className="p-8">
                        <div className="mb-6 text-center">
                          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                            plan.popular ? 'bg-gradient-to-br from-red-600 to-orange-500' : 'bg-gray-800'
                          }`}>
                            {plan.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                          <p className="text-gray-400 text-sm">{plan.duration}</p>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                          <h4 className="text-orange-400 font-semibold mb-2">Includes:</h4>
                          <ul className="space-y-2">
                            {plan.includes.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-red-400 mr-2">•</span>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <motion.button
                        onClick={()=>{router.push("/contact_us")}}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-red-700 to-orange-900 text-white' 
                              : 'bg-gray-800 text-white border border-gray-700 hover:border-red-500'
                          }`}
                        >
                          Get Started
                        </motion.button>
                      </div>
                      
                    </motion.div>
                    
                    
                  ))}
                  
                </div>
  )
}

export default Pricing


