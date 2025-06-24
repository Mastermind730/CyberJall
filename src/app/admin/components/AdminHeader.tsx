"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCheckSquare, FiUsers, FiLogOut } from 'react-icons/fi';

const AdminHeader = () => {
  const pathName= usePathname();

  return (
    <header className="bg-black text-orange-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500 mb-4 md:mb-0">
            <span className="text-red-600">Admin</span> Portal
          </h1>
          
          <nav className="flex space-x-1 md:space-x-4">
            <Link href="/admin" passHref>
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-900 hover:text-white cursor-pointer ${
                  pathName === '/admin' ? 'bg-red-900 text-white' : ''
                }`}
              >
                <FiHome className="mr-2" />
                <span>Pending Approvals</span>
              </div>
            </Link>
            <Link href="/admin/approved" passHref>
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-900 hover:text-white cursor-pointer ${
                  pathName === '/admin/approved' ? 'bg-red-900 text-white' : ''
                }`}
              >
                <FiCheckSquare className="mr-2" />
                <span>Approved Companies</span>
              </div>
            </Link>
            <div className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-900 hover:text-white cursor-pointer">
              <FiUsers className="mr-2" />
              <span>User Management</span>
            </div>
            <div className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-900 hover:text-white cursor-pointer">
              <FiLogOut className="mr-2" />
              <span>Logout</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;