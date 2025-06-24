import { ReactNode } from 'react';
import type { Metadata } from 'next';
import AdminHeader from './components/AdminHeader';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Admin Portal | Company Approval System',
  description: 'Admin portal for company approvals',
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-20 from-black to-gray-900">
      <AdminHeader />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}