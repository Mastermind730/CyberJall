import { ReactNode } from 'react';
import Head from 'next/head';
import AdminHeader from './components/AdminHeader';

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
      <div className="min-h-screen bg-gradient-to-b mt-20 from-black to-gray-900">
        <AdminHeader />
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;