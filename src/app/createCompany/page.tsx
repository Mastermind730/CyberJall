// pages/company-profile.js
"use client";
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import axios from 'axios'; // Import axios

export default function CompanyProfile() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    control,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      company_name: '',
      overview: '',
      services_offered: [{ name: '', description: '' }],
      expertise_and_certifications: [{ type: '', name: '' }],
      case_studies: [{ title: '', client: '', challenge: '', solution: '', result: '' }],
      website: '',
      logo: '',
    }
  });
  
  // Field arrays for structured data
  const { fields: serviceFields, append: appendService, remove: removeService } = 
    useFieldArray({ control, name: "services_offered" });
  
  const { fields: certFields, append: appendCert, remove: removeCert } = 
    useFieldArray({ control, name: "expertise_and_certifications" });
  
  const { fields: caseFields, append: appendCase, remove: removeCase } = 
    useFieldArray({ control, name: "case_studies" });
  
  // Watch the logo to display the preview
  const logo = watch('logo');
  
  const handleLogoUpload = (result) => {
    if (result?.info?.secure_url) {
      setValue('logo', result?.info?.secure_url, {
        shouldValidate: true
      });
      setIsUploading(false);
      setUploadProgress(100);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: 'info', message: 'Submitting your company profile...' });
      
      console.log(data,"data");
      const response = await axios.post('/api/createCompany', data);
      
      console.log('API Response:', response.data);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Company profile submitted successfully!' 
      });
      
    
      
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.response) {
        const errorMessage = error.response.data.error || 'Failed to submit company profile';
        setSubmitStatus({ 
          type: 'error', 
          message: errorMessage 
        });
      } else if (error.request) {
        // The request was made but no response was received
        setSubmitStatus({ 
          type: 'error', 
          message: 'No response from server. Please check your connection and try again.' 
        });
      } else {
        // Something happened in setting up the request
        setSubmitStatus({ 
          type: 'error', 
          message: 'An unexpected error occurred. Please try again later.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-64 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 overflow-hidden"
      >
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(0,0,0,0.2)" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Company Profile</h1>
            <p className="mt-2 text-lg md:text-xl">Showcase your cybersecurity expertise</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
            className="hidden md:block"
          >
            <div className="w-24 h-24 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Form Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Complete Your Company Profile</h2>
            
            {/* Status Messages */}
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-900 text-green-200' :
                  submitStatus.type === 'error' ? 'bg-red-900 text-red-200' :
                  'bg-blue-900 text-blue-200'
                }`}
              >
                <div className="flex items-center">
                  {submitStatus.type === 'success' && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {submitStatus.type === 'error' && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {submitStatus.type === 'info' && (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Name */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-orange-400 mb-2 font-medium">Company Name</label>
                <input
                  {...register("company_name", { 
                    required: "Company name is required" 
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your company name"
                />
                {errors.company_name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.company_name.message}</p>
                )}
              </motion.div>
              
              {/* Logo Upload with Cloudinary */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label className="block text-orange-400 mb-2 font-medium">Company Logo</label>
                <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex-1 w-full">
                    <div className="flex flex-col items-center px-4 py-6 bg-gray-800 text-orange-400 rounded-lg border border-gray-700 border-dashed cursor-pointer hover:bg-gray-700 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <CldUploadButton 
                        uploadPreset="CompanyLogo"
                        onUpload={handleLogoUpload}
                        onProgress={(progress) => {
                          setIsUploading(true);
                          setUploadProgress(Math.round(progress));
                        }}
                      />
                    </div>

                    {/* Upload Progress Bar */}
                    {isUploading && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <motion.div 
                            className="bg-gradient-to-r from-red-600 to-orange-500 h-2.5 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 text-right">{uploadProgress}% uploaded</p>
                      </div>
                    )}
                    
                    {/* Hidden field for storing logo URL */}
                    <input 
                      type="hidden" 
                      {...register("logo")}
                    />
                  </div>
                  
                  {logo && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0"
                    >
                      <Image
                        width={70}
                        height={70}
                        src={logo} 
                        alt="Company logo" 
                        className="w-full h-full object-contain" 
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              {/* Company Overview */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-orange-400 mb-2 font-medium">Company Overview</label>
                <textarea
                  {...register("overview", { 
                    required: "Company overview is required",
                    minLength: {
                      value: 50,
                      message: "Please provide at least 50 characters"
                    }
                  })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Provide a brief introduction about your company"
                ></textarea>
                {errors.overview && (
                  <p className="mt-1 text-red-500 text-sm">{errors.overview.message}</p>
                )}
              </motion.div>
              
              {/* Services Offered (JSON Structure) */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-orange-400 font-medium">Services Offered</label>
                  <button
                    type="button"
                    onClick={() => appendService({ name: '', description: '' })}
                    className="px-3 py-1 bg-orange-600 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
                  >
                    + Add Service
                  </button>
                </div>
                
                {serviceFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-orange-400 font-medium">Service #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Service Name</label>
                      <input
                        {...register(`services_offered.${index}.name`, { required: "Service name required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Penetration Testing"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Service Description</label>
                      <textarea
                        {...register(`services_offered.${index}.description`, { required: "Description required" })}
                        rows="3"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe this service in detail"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Expertise & Certifications (JSON Structure) */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-orange-400 font-medium">Expertise & Certifications</label>
                  <button
                    type="button"
                    onClick={() => appendCert({ type: '', name: '' })}
                    className="px-3 py-1 bg-orange-600 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
                  >
                    + Add Certification
                  </button>
                </div>
                
                {certFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-orange-400 font-medium">Certification #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeCert(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Type</label>
                      <select
                        {...register(`expertise_and_certifications.${index}.type`, { required: "Type required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="certification">Certification</option>
                        <option value="partnership">Partnership</option>
                        <option value="expertise">Expertise</option>
                        <option value="achievement">Achievement</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Name/Description</label>
                      <input
                        {...register(`expertise_and_certifications.${index}.name`, { required: "Name required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., CISSP, ISO 27001, etc."
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Case Studies (JSON Structure) */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-orange-400 font-medium">Case Studies & Testimonials</label>
                  <button
                    type="button"
                    onClick={() => appendCase({ title: '', client: '', challenge: '', solution: '', result: '' })}
                    className="px-3 py-1 bg-orange-600 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
                  >
                    + Add Case Study
                  </button>
                </div>
                
                {caseFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-orange-400 font-medium">Case Study #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeCase(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Title</label>
                        <input
                          {...register(`case_studies.${index}.title`, { required: "Title required" })}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Case study title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Client (optional)</label>
                        <input
                          {...register(`case_studies.${index}.client`)}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Client name or industry"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Challenge</label>
                      <textarea
                        {...register(`case_studies.${index}.challenge`, { required: "Challenge required" })}
                        rows="2"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe the challenge faced"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Solution</label>
                      <textarea
                        {...register(`case_studies.${index}.solution`, { required: "Solution required" })}
                        rows="2"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe your solution"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Results</label>
                      <textarea
                        {...register(`case_studies.${index}.result`, { required: "Results required" })}
                        rows="2"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe the outcomes achieved"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Website */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-orange-400 mb-2 font-medium">Website</label>
                <input
                  type="url"
                  {...register("website", { 
                    required: "Website URL is required",
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your company website link"
                />
                {errors.website && (
                  <p className="mt-1 text-red-500 text-sm">{errors.website.message}</p>
                )}
              </motion.div>
              
              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transform hover:scale-105'
                  } text-white font-bold rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-300`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Submit Company Profile"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
          
          {/* Decorative Elements */}
          <div className="relative h-8 bg-gradient-to-r from-red-800 via-red-600 to-orange-500">
            <svg className="absolute bottom-0 left-0 w-full h-16 -mb-8" viewBox="0 0 1440 320">
              <path fill="#111827" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}