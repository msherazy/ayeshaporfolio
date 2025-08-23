'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Plus, List, LogOut, User, Menu, X, Folder, Briefcase, Settings, Database } from 'lucide-react';
import { AuthProvider } from '@/components/auth/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/components/auth/AuthContext';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { href: '/admin', label: 'Dashboard', icon: Home },
      ]
    },
    {
      title: 'Content',
      items: [
        { href: '/admin/projects', label: 'Projects', icon: Folder },
        { href: '/admin/projects/new', label: 'New Project', icon: Plus },
        { href: '/admin/experiences', label: 'Experiences', icon: Briefcase },
        { href: '/admin/experiences/new', label: 'New Experience', icon: Plus },
      ]
    },
    {
      title: 'Settings',
      items: [
        { href: '/admin/portfolio', label: 'Portfolio Info', icon: Settings },
        { href: '/admin/migrate-portfolio', label: 'Import Data', icon: Database },
        { href: '/admin/debug-permissions', label: 'Debug Permissions', icon: User },
        { href: '/admin/debug-browser', label: 'Browser Debug', icon: Settings },
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin" className="text-lg font-bold text-gray-900">
              Portfolio Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="mt-4 px-2">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top header */}
          <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4">
              {/* User info */}
              {user && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="max-w-32 truncate">{user.displayName || user.email}</span>
                </div>
              )}

              <Button asChild variant="outline" size="sm">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>

              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
} 