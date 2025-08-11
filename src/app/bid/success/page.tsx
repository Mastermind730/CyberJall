"use client";
import Link from 'next/link';
import { FiCheckCircle, FiMail, FiClock, FiShield } from 'react-icons/fi';

export default function BidSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-900/50 mb-4">
            <FiCheckCircle className="h-8 w-8 text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Bid Request Submitted Successfully!</h1>
          <p className="text-lg text-gray-400 mb-8">
            Your security assessment request has been received and will be broadcast to qualified providers.
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mt-8">
          <h2 className="text-xl font-semibold mb-6">What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiMail className="h-5 w-5 text-orange-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Confirmation Email</h3>
                <p className="text-gray-400 mt-1">
                  You&apos;ll receive a confirmation email with your bid details and a tracking number.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiClock className="h-5 w-5 text-orange-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Provider Responses</h3>
                <p className="text-gray-400 mt-1">
                  Qualified security providers will submit their proposals within 1-3 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiShield className="h-5 w-5 text-orange-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Review & Selection</h3>
                <p className="text-gray-400 mt-1">
                  You&apos;ll be able to review all proposals and select the best match for your needs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/partners"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-center"
            >
              Back to Partners
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-600 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-center"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}