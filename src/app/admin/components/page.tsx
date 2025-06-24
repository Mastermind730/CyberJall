import { ReactNode } from 'react';
import Sidebar from './AdminHeader';
import Head from 'next/head';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title = 'Admin Portal' }: AdminLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} | Company Approval System</title>
        <meta name="description" content="Admin portal for company approvals" />
      </Head>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 bg-gradient-to-b from-black to-gray-900 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;