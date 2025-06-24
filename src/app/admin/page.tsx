"use client";
import { useEffect, useState } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiUserPlus, FiRefreshCw } from 'react-icons/fi';
import ApprovalCard from './components/ApprovalCard';
import StatsCard from './components/StatsCard';
import AnimatedWrapper from './components/AnimatedWrapper';
import axios from 'axios';

interface User {
  id: string;
  work_email: string;
  company_name: string;
  contact: string;
  message: string;
  password: string;
}

export default function PendingApprovals() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pendingResponse, statsResponse] = await Promise.all([
        axios.get('/api/getPending'),
        axios.get('/api/getStats')
      ]);
      
      setPendingUsers(pendingResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await axios.post('/api/approve', { id });
      fetchData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.post('/api/reject', { id });
      fetchData();
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <AnimatedWrapper>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Registration Dashboard</h1>
            <p className="text-gray-400">
              Review and manage company registration requests
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-4 py-2 text-sm bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="Pending Approvals"
          value={stats.pending}
          change={10}
          icon={<FiClock className="text-blue-400" size={20} />}
          trend="up"
        />
        <StatsCard
          title="Approved Companies"
          value={stats.approved}
          change={5}
          icon={<FiCheckCircle className="text-green-400" size={20} />}
          trend="up"
        />
        <StatsCard
          title="Rejected Requests"
          value={stats.rejected}
          change={-2}
          icon={<FiXCircle className="text-red-400" size={20} />}
          trend="down"
        />
        <StatsCard
          title="Total Requests"
          value={stats.total}
          change={8}
          icon={<FiUserPlus className="text-purple-400" size={20} />}
          trend="up"
        />
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-white">
            Pending Approval Requests
          </h2>
          <div className="flex items-center gap-3">
            <span className="bg-blue-900/30 text-blue-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
              <FiClock className="mr-1.5" size={14} />
              {pendingUsers.length} pending request{pendingUsers.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : pendingUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pendingUsers.map((user) => (
              <ApprovalCard
                key={user.id}
                user={user}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mb-5 border border-dashed border-gray-600">
              <FiCheckCircle className="text-green-500 text-4xl opacity-80" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              All caught up!
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-4">
              There are no pending approval requests at this time.
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              <FiRefreshCw className="mr-2" />
              Check for new requests
            </button>
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
}