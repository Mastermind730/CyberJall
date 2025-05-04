/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';

interface ServiceOffered {
  name: string;
  description: string;
  image: string; 
}

interface ExpertiseCertification {
  type: string;
  name: string;
}

interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
}

interface ClientReview {
  clientName: string;
  position: string;
  company: string;
  review: string;
  rating: number;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface CompanyFormData {
  company_name: string;
  overview: string;
  year_founded: string;
  headquarters_city: string;
  headquarters_country: string;
  services_offered: ServiceOffered[];
  expertise_and_certifications: ExpertiseCertification[];
  case_studies: CaseStudy[];
  client_reviews: ClientReview[];
  social_links: SocialLink[];
  website: string;
  logo: string;
}

// Define type for submission status
interface SubmitStatus {
  type: 'success' | 'error' | 'info' | '';
  message: string;
}

export default function CompanyProfile() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: '', message: '' });
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    control,
    formState: { errors } 
  } = useForm<CompanyFormData>({
    defaultValues: {
      company_name: '',
      overview: '',
      year_founded: '',
      headquarters_city: '',
      headquarters_country: '',
      services_offered: [{ name: '', description: '', image: '' }],
      expertise_and_certifications: [{ type: '', name: '' }],
      case_studies: [{ title: '', client: '', challenge: '', solution: '', result: '' }],
      client_reviews: [
        { clientName: '', position: '', company: '', review: '', rating: 0 }
      ],
      social_links: [
        { platform: 'linkedin', url: '' },
        { platform: 'twitter', url: '' },
        { platform: 'facebook', url: '' },
        { platform: 'instagram', url: '' }
      ],
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



  const { fields: socialFields } = 
    useFieldArray({ control, name: "social_links" });
  
    const { fields: reviewFields, append: appendReview, remove: removeReview } = 
  useFieldArray({ control, name: "client_reviews" });

  
  // Watch the logo to display the preview
  const logo = watch('logo');
  
  const handleLogoUpload = (result:CloudinaryUploadWidgetResults) => {
    console.log(result);
    if (result && typeof result.info !== 'string') {
      const info = result.info as { secure_url: string };
      if (info?.secure_url) {
        setValue('logo', info.secure_url, {
          shouldValidate: true
        });
        setIsUploading(false);
        setUploadProgress(100);
      }
    }
  };

  const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: 'info', message: 'Submitting your company profile...' });
      
      const response = await axios.post('/api/createCompany', data);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Company profile submitted successfully!' 
      });
      
    } catch (error: unknown) {
      console.error('Submission error:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Failed to submit company profile';
        setSubmitStatus({ 
          type: 'error', 
          message: errorMessage 
        });
      } else if (error instanceof Error) {
        setSubmitStatus({ 
          type: 'error', 
          message: error.message || 'An unexpected error occurred. Please try again later.' 
        });
      } else {
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
                        onSuccess={handleLogoUpload}
                        
                        options={{
                          multiple: false,
                          resourceType: "image",
                          maxFileSize: 5000000,
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
                        src={logo}
                        alt="Company logo"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              {/* Company Basic Info */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Year Founded */}
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">Year Founded</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    {...register("year_founded", {
                      required: "Year founded is required",
                      min: {
                        value: 1900,
                        message: "Year must be after 1900"
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., 2010"
                  />
                  {errors.year_founded && (
                    <p className="mt-1 text-red-500 text-sm">{errors.year_founded.message}</p>
                  )}
                </div>
                
                {/* Headquarters City */}
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">Headquarters City</label>
                  <input
                    {...register("headquarters_city", {
                      required: "City is required"
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., San Francisco"
                  />
                  {errors.headquarters_city && (
                    <p className="mt-1 text-red-500 text-sm">{errors.headquarters_city.message}</p>
                  )}
                </div>
                
                {/* Headquarters Country */}
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">Headquarters Country</label>
                  <input
                    {...register("headquarters_country", {
                      required: "Country is required"
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., United States"
                  />
                  {errors.headquarters_country && (
                    <p className="mt-1 text-red-500 text-sm">{errors.headquarters_country.message}</p>
                  )}
                </div>
              </motion.div>
              
              {/* Company Overview */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
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
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Provide a brief introduction about your company"
                ></textarea>
                {errors.overview && (
                  <p className="mt-1 text-red-500 text-sm">{errors.overview.message}</p>
                )}
              </motion.div>
              
              {/* Social Media Links */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <label className="block text-orange-400 font-medium">Social Media Profiles</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        {field.platform === 'linkedin' && (
                          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {field.platform === 'twitter' && (
                          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        )}
                        {field.platform === 'facebook' && (
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                          </svg>
                        )}
                        {field.platform === 'instagram' && (
                          <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        )}
                      </div>
                      <input
                        type="url"
                        {...register(`social_links.${index}.url`, {
                          pattern: {
                            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                            message: "Invalid URL"
                          }
                        })}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder={`${field.platform.charAt(0).toUpperCase() + field.platform.slice(1)} profile URL`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Services Offered (JSON Structure) */}
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 1.1 }}
  className="space-y-4"
>
  <div className="flex justify-between items-center">
    <label className="block text-orange-400 font-medium">Services Offered</label>
    <button
      type="button"
      onClick={() => appendService({ name: '', description: '', image: '' })}
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
        {errors.services_offered?.[index]?.name && (
          <p className="mt-1 text-red-500 text-sm">{errors.services_offered[index]?.name?.message}</p>
        )}
      </div>
      
      {/* Service Image Upload */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Service Image</label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex flex-col items-center px-4 py-3 bg-gray-700 text-orange-400 rounded-lg border border-gray-600 border-dashed cursor-pointer hover:bg-gray-600 transition-colors">
              <CldUploadButton 
                uploadPreset="ServiceImages"
                onSuccess={(result) => {
                  if (result && typeof result.info !== 'string') {
                    const info = result.info as { secure_url: string };
                    if (info?.secure_url) {
                      setValue(`services_offered.${index}.image`, info.secure_url);
                    }
                  }
                }}
                options={{
                  multiple: false,
                  resourceType: "image",
                  maxFileSize: 5000000,
                }}
                className="w-full"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm">Upload Service Image</span>
                </div>
              </CldUploadButton>
            </div>
          </div>
          {watch(`services_offered.${index}.image`) && (
            <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
              <Image
                src={watch(`services_offered.${index}.image`)}
                alt={`Service ${index + 1} image`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-300 mb-1">Service Description</label>
        <textarea
          {...register(`services_offered.${index}.description`, { required: "Description required" })}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Describe this service in detail"
        ></textarea>
        {errors.services_offered?.[index]?.description && (
          <p className="mt-1 text-red-500 text-sm">{errors.services_offered[index]?.description?.message}</p>
        )}
      </div>
    </div>
  ))}
</motion.div>
              {/* Expertise & Certifications (JSON Structure) */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
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
                      {errors.expertise_and_certifications?.[index] && (
  <p className="mt-1 text-red-500 text-sm">
    {errors.expertise_and_certifications[index]?.message}
  </p>
)}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Name/Description</label>
                      <input
                        {...register(`expertise_and_certifications.${index}.name`, { required: "Name required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., CISSP, ISO 27001, etc."
                      />
                      {errors.expertise_and_certifications?.[index]?.name && (
                        <p className="mt-1 text-red-500 text-sm">{errors.expertise_and_certifications[index]?.name?.message}</p>
                      )}
                    </div>
                    </div>
                ))}
              </motion.div>
              
              {/* Case Studies (JSON Structure) */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-orange-400 font-medium">Case Studies</label>
                  <button
                    type="button"
                    onClick={() => appendCase({ 
                      title: '', 
                      client: '', 
                      challenge: '', 
                      solution: '', 
                      result: '' 
                    })}
                    className="px-3 py-1 bg-orange-600 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
                  >
                    + Add Case Study
                  </button>
                </div>
                
                {caseFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
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
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Title</label>
                      <input
                        {...register(`case_studies.${index}.title`, { required: "Title required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Case study title"
                      />
                      {errors.case_studies?.[index]?.title && (
                        <p className="mt-1 text-red-500 text-sm">{errors.case_studies[index]?.title?.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Client</label>
                      <input
                        {...register(`case_studies.${index}.client`, { required: "Client name required" })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Client name"
                      />
                      {errors.case_studies?.[index]?.client && (
                        <p className="mt-1 text-red-500 text-sm">{errors.case_studies[index]?.client?.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Challenge</label>
                      <textarea
                        {...register(`case_studies.${index}.challenge`, { required: "Challenge description required" })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe the client's challenge"
                      ></textarea>
                      {errors.case_studies?.[index]?.challenge && (
                        <p className="mt-1 text-red-500 text-sm">{errors.case_studies[index]?.challenge?.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Solution</label>
                      <textarea
                        {...register(`case_studies.${index}.solution`, { required: "Solution description required" })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe your solution"
                      ></textarea>
                      {errors.case_studies?.[index]?.solution && (
                        <p className="mt-1 text-red-500 text-sm">{errors.case_studies[index]?.solution?.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Result</label>
                      <textarea
                        {...register(`case_studies.${index}.result`, { required: "Results description required" })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Describe the results achieved"
                      ></textarea>
                      {errors.case_studies?.[index]?.result && (
                        <p className="mt-1 text-red-500 text-sm">{errors.case_studies[index]?.result?.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Client Reviews */}
              <motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 1.4 }}
  className="space-y-4"
>
  <div className="flex justify-between items-center">
    <label className="block text-orange-400 font-medium">Client Reviews</label>
    <button
      type="button"
      onClick={() => {
        if (reviewFields.length < 5) {
          appendReview({ clientName: '', position: '', company: '', review: '', rating: 0 });
        }
      }}
      disabled={reviewFields.length >= 5}
      className={`px-3 py-1 rounded-lg text-white text-sm transition-colors ${
        reviewFields.length >= 5 
          ? 'bg-gray-600 cursor-not-allowed' 
          : 'bg-orange-600 hover:bg-orange-700'
      }`}
    >
      + Add Review (Max 5)
    </button>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {reviewFields.map((field, index) => (
      <div key={field.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-orange-400 font-medium">Review #{index + 1}</h4>
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeReview(index)}
              className="text-red-400 hover:text-red-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Client Name</label>
          <input
            {...register(`client_reviews.${index}.clientName`, { required: "Client name required" })}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Client name"
          />
          {errors.client_reviews?.[index]?.clientName && (
            <p className="mt-1 text-red-500 text-sm">{errors.client_reviews[index]?.clientName?.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Position</label>
            <input
              {...register(`client_reviews.${index}.position`, { required: "Position required" })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Position"
            />
            {errors.client_reviews?.[index]?.position && (
              <p className="mt-1 text-red-500 text-sm">{errors.client_reviews[index]?.position?.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Company</label>
            <input
              {...register(`client_reviews.${index}.company`, { required: "Company required" })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Company"
            />
            {errors.client_reviews?.[index]?.company && (
              <p className="mt-1 text-red-500 text-sm">{errors.client_reviews[index]?.company?.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Rating (1-5)</label>
          <select
            {...register(`client_reviews.${index}.rating`, {
              valueAsNumber: true,
              required: "Rating required",
              min: 1,
              max: 5
            })}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select rating</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
          {errors.client_reviews?.[index]?.rating && (
            <p className="mt-1 text-red-500 text-sm">{errors.client_reviews[index]?.rating?.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Review</label>
          <textarea
            {...register(`client_reviews.${index}.review`, { required: "Review required" })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Client testimonial"
          ></textarea>
          {errors.client_reviews?.[index]?.review && (
            <p className="mt-1 text-red-500 text-sm">{errors.client_reviews[index]?.review?.message}</p>
          )}
        </div>
      </div>
    ))}
  </div>
</motion.div>
              {/* Website */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <label className="block text-orange-400 mb-2 font-medium">Company Website</label>
                <input
                  type="url"
                  {...register("website", {
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://yourcompany.com"
                />
                {errors.website && (
                  <p className="mt-1 text-red-500 text-sm">{errors.website.message}</p>
                )}
              </motion.div>
              
              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Submit Company Profile'
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}