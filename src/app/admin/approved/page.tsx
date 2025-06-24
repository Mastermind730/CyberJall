"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AnimatedWrapper from '../components/AnimatedWrapper';
import axios from 'axios';

interface ValidatedUser {
  id: string;
  work_email: string;
  company_name: string;
  contact: string;
  message: string;
  password: string;
  approvedAt: string;
}

export default function ApprovedCompanies() {
  const [approvedUsers, setApprovedUsers] = useState<ValidatedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/getApproved');
        setApprovedUsers(response.data);
      } catch (error) {
        console.error('Error fetching approved users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedUsers();
  }, []);

  const filteredUsers = approvedUsers.filter((user) =>
    user.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.work_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format date for consistent display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AnimatedWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Approved Companies</h1>
        <p className="text-gray-400">
          Manage all companies that have been approved for platform access
        </p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-700/80 text-white pl-10 pr-4 py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 border border-gray-600 transition-all duration-200"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">
              Showing <span className="font-medium text-white">{paginatedUsers.length}</span> of{' '}
              <span className="font-medium text-white">{filteredUsers.length}</span> companies
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : paginatedUsers.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/80">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">
                      Approved On
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                  {paginatedUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {user.company_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-orange-300 hover:text-orange-400 transition-colors">
                          <a href={`mailto:${user.work_email}`}>{user.work_email}</a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {user.contact || 'Not provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {formatDate(user.approvedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full bg-green-900/40 text-green-400 border border-green-800/50">
                          <FiCheckCircle className="mr-1.5" />
                          Approved
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 px-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <FiChevronLeft className="mr-1.5" /> Previous
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-orange-600/90 text-white shadow-md shadow-orange-500/10'
                        : 'text-gray-400 hover:bg-gray-700/60 hover:text-white'
                    } transition-colors duration-200`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                Next <FiChevronRight className="ml-1.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mb-5 border border-dashed border-gray-600">
              <FiCheckCircle className="text-orange-400 text-4xl opacity-80" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {searchTerm ? 'No matching companies found' : 'No approved companies yet'}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchTerm
                ? 'Try adjusting your search query'
                : 'Approved companies will appear here once available'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 text-sm text-orange-400 hover:text-orange-300 bg-gray-700/50 rounded-lg transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
}