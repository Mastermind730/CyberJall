import { User } from '@prisma/client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ApprovalCardProps {
  user: User;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApprovalCard = ({ user, onApprove, onReject }: ApprovalCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 border-orange-500 hover:border-red-600 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{user.company_name}</h3>
            <p className="text-orange-400 mt-1">{user.work_email}</p>
          </div>
          <span className="bg-red-900 text-orange-100 text-xs px-3 py-1 rounded-full">
            Pending
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-gray-400">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{user.contact}</span>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <p className="text-gray-300">{user.message}</p>
          </motion.div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
          >
            {isExpanded ? 'Show Less' : 'View Details'}
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => onReject(user.id)}
              className="px-4 py-2 bg-transparent border border-red-600 text-red-400 rounded-lg hover:bg-red-900 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(user.id)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-red-900/30"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApprovalCard;