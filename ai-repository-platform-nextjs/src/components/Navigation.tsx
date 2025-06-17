'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, Building2, Trophy, Award, LogOut, Settings, 
  Menu, X, Home, FileText, Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { path: '/contributor-portal', label: 'Contributor Portal', icon: User, role: 'contributor' },
    { path: '/problem-statement-uploader', label: 'Problem Statements', icon: Target, role: 'professional' },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy, role: 'all' },
    { path: '/profile', label: 'Profile', icon: User, role: 'all' },
    { path: '/badges', label: 'Badges', icon: Award, role: 'all' },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.role === 'all' || item.role === userProfile?.role
  );

  // Only show user dropdown in desktop mode
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">Scorix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop only) */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={userProfile?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[100px]">{userProfile?.name || 'User'}</span>
                  <Menu className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">{userProfile?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userProfile?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/badges"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Award className="w-4 h-4" />
                      <span>Badges</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t py-4 bg-white rounded-b-xl shadow-xl"
          >
            <div className="space-y-2 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg font-medium transition-all duration-200 text-base ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {currentUser && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 w-full text-left text-base"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 