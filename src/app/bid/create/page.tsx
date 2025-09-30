"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';
import { 
  FiArrowLeft, 
  FiUpload, 
  FiBriefcase, 
  FiDollarSign, 
  FiCheck,
  FiFileText,
  FiShield,
  FiClock,
  FiX,
  FiFile
} from 'react-icons/fi';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
  publicId: string;
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string;
    public_id: string;
    original_filename: string;
    bytes: number;
    format: string;
    resource_type: string;
  };
}

export default function CreateBidPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    serviceTypes: [] as string[],
    description: '',
    infrastructureSize: '',
    urgency: 'standard',
    complianceGoals: [] as string[],
    budget: '',
    additionalNotes: '',
    documents: [] as UploadedFile[],
  });

  const serviceOptions = [
    "VAPT", "Compliance", "Cloud Security", "Network Security",
    "Application Security", "Incident Response", "Risk Assessment",
    "Security Training", "Penetration Testing", "Threat Intelligence"
  ];

  const complianceOptions = [
    "ISO 27001", "SOC 2", "GDPR", "PCI DSS",
    "HIPAA", "NIST", "CIS", "CREST", "OSCP"
  ];

  const infrastructureSizes = [
    "Small (1-50 employees)",
    "Medium (51-500 employees)",
    "Large (501-5000 employees)",
    "Enterprise (5000+ employees)"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'serviceTypes' | 'complianceGoals', value: string) => {
    setFormData(prev => {
      const currentValues = [...prev[name]];
      if (currentValues.includes(value)) {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    const uploadedFile: UploadedFile = {
      name: result.info.original_filename + '.' + result.info.format,
      url: result.info.secure_url,
      size: result.info.bytes,
      type: `${result.info.resource_type}/${result.info.format}`,
      publicId: result.info.public_id
    };

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, uploadedFile]
    }));
    
    setUploading(false);
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
    alert('Error uploading file. Please try again.');
    setUploading(false);
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        documents: formData.documents.map(doc => ({
          name: doc.name,
          url: doc.url,
          size: doc.size,
          type: doc.type,
          publicId: doc.publicId
        }))
      };

      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        router.push('/bid/success');
      } else {
        console.error('Failed to submit bid');
        alert('Failed to submit bid. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Error submitting bid. Please try again.');
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-orange-400 hover:text-orange-300 mr-4"
          >
            <FiArrowLeft className="mr-1" /> Back
          </button>
          <h1 className="text-3xl font-bold">Security Assessment Bid Request</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-orange-500 -z-10 transition-all duration-300" 
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}
              >
                {step > stepNumber ? <FiCheck size={24} /> : stepNumber}
              </div>
              <span className={`mt-2 text-sm ${step >= stepNumber ? 'text-orange-400' : 'text-gray-400'}`}>
                {stepNumber === 1 ? 'Company Info' : stepNumber === 2 ? 'Requirements' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FiBriefcase className="mr-2 text-orange-400" />
                Company Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-1">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Industry</option>
                    <option value="Finance & Banking">Finance & Banking</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Technology">Technology</option>
                    <option value="Government">Government</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FiShield className="mr-2 text-orange-400" />
                Security Requirements
              </h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Required Services *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceOptions.map(service => (
                    <div key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`service-${service}`}
                        checked={formData.serviceTypes.includes(service)}
                        onChange={() => handleCheckboxChange('serviceTypes', service)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`service-${service}`} className="ml-2 text-sm">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your security needs, current infrastructure, and any specific concerns..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="infrastructureSize" className="block text-sm font-medium mb-1">
                    Infrastructure Size *
                  </label>
                  <select
                    id="infrastructureSize"
                    name="infrastructureSize"
                    value={formData.infrastructureSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Size</option>
                    {infrastructureSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium mb-1">
                    Project Urgency *
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="standard">Standard (4-6 weeks)</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="critical">Critical (3-5 days)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Compliance Requirements
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {complianceOptions.map(compliance => (
                    <div key={compliance} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`compliance-${compliance}`}
                        checked={formData.complianceGoals.includes(compliance)}
                        onChange={() => handleCheckboxChange('complianceGoals', compliance)}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded bg-gray-700"
                      />
                      <label htmlFor={`compliance-${compliance}`} className="ml-2 text-sm">
                        {compliance}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-1">
                    Estimated Budget (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Supporting Documents
                  </label>
                  
                  <CldUploadButton
                    uploadPreset={"Bid_document"}
                    options={{
                      multiple: true,
                      maxFiles: 3,
                      maxFileSize: 5000000, // 5MB
                      // resourceType: "auto",
                      // folder: "bid-documents",
                      // allowedFormats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"],
                      clientAllowedFormats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"]
                    }}
                    onUpload={(result) => {
                      setUploading(false);
                      handleUploadSuccess(result as CloudinaryUploadResult);
                    }}
                    onError={handleUploadError}
                    onOpen={() => setUploading(true)}
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-3"></div>
                          <p className="text-sm text-gray-400">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="text-sm text-gray-400">Upload files (PDF, DOC, PNG, JPG)</p>
                          <p className="text-xs text-gray-500">Max 10MB per file</p>
                        </>
                      )}
                    </div>
                  </CldUploadButton>
                  
                  {/* Display uploaded files */}
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-600 p-2 rounded">
                          <div className="flex items-center">
                            <FiFile className="text-orange-400 mr-2" />
                            <div>
                              <p className="text-sm font-medium truncate max-w-48">{doc.name}</p>
                              <p className="text-xs text-gray-400">{formatFileSize(doc.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Any other information that might help providers understand your needs..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FiFileText className="mr-2 text-orange-400" />
                Review Your Bid Request
              </h2>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-medium mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Company Name</p>
                    <p className="font-medium">{formData.companyName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Industry</p>
                    <p className="font-medium">{formData.industry || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Contact Name</p>
                    <p className="font-medium">{formData.contactName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{formData.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Website</p>
                    <p className="font-medium">{formData.website || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-medium mb-4">Security Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Required Services</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.serviceTypes.length > 0 ? (
                        formData.serviceTypes.map(service => (
                          <span key={service} className="px-2 py-1 bg-orange-900/50 text-orange-200 rounded text-xs">
                            {service}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400">No services selected</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Project Description</p>
                    <p className="mt-1 whitespace-pre-line">
                      {formData.description || 'Not provided'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Infrastructure Size</p>
                      <p className="font-medium">{formData.infrastructureSize || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Project Urgency</p>
                      <p className="font-medium">
                        {formData.urgency === 'standard' ? 'Standard (4-6 weeks)' : 
                         formData.urgency === 'urgent' ? 'Urgent (1-2 weeks)' : 
                         formData.urgency === 'critical' ? 'Critical (3-5 days)' : 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Compliance Requirements</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.complianceGoals.length > 0 ? (
                        formData.complianceGoals.map(compliance => (
                          <span key={compliance} className="px-2 py-1 bg-orange-900/50 text-orange-200 rounded text-xs">
                            {compliance}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400">No compliance requirements</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Estimated Budget</p>
                      <p className="font-medium">
                        {formData.budget ? `$${formData.budget}` : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Documents</p>
                      <p className="font-medium">
                        {formData.documents.length > 0 ? `${formData.documents.length} files` : 'No documents'}
                      </p>
                    </div>
                  </div>
                  
                  {formData.documents.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Uploaded Documents</p>
                      <div className="space-y-1">
                        {formData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <FiFile className="text-orange-400 mr-2" />
                            <span className="truncate">{doc.name}</span>
                            <span className="text-gray-400 ml-2">({formatFileSize(doc.size)})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-400">Additional Notes</p>
                    <p className="mt-1 whitespace-pre-line">
                      {formData.additionalNotes || 'No additional notes'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <FiClock className="flex-shrink-0 mr-2 mt-0.5 text-orange-400" />
                    Your request will be reviewed by our team within 24 hours
                  </li>
                  <li className="flex items-start">
                    <FiShield className="flex-shrink-0 mr-2 mt-0.5 text-orange-400" />
                    Qualified security providers will submit proposals
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="flex-shrink-0 mr-2 mt-0.5 text-orange-400" />
                    You&apos;ll be able to compare offers and select the best match
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-600 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Submit Bid Request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}