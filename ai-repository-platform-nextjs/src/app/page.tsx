'use client';

import Link from 'next/link';
import { User, Pen, FileText, Sparkles, Building2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 px-2 overflow-hidden">
      {/* Floating Elements */}
      <div className="pointer-events-none select-none">
        {/* Robot Head (User icon) */}
        <div className="absolute left-4 top-8 animate-float-slow opacity-70">
          <div className="bg-gradient-to-br from-blue-500 to-purple-400 rounded-full p-2 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        {/* Pen */}
        <div className="absolute right-6 top-20 animate-float-medium opacity-60">
          <div className="bg-gradient-to-br from-pink-400 to-blue-300 rounded-full p-2 shadow-lg">
            <Pen className="w-7 h-7 text-white" />
          </div>
        </div>
        {/* Paper */}
        <div className="absolute left-10 bottom-16 animate-float-medium opacity-60">
          <div className="bg-gradient-to-br from-green-400 to-blue-200 rounded-full p-2 shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
        </div>
        {/* Sparkles */}
        <div className="absolute right-10 bottom-10 animate-float-fast opacity-50">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
      </div>
      <div className="bg-white/90 p-6 sm:p-10 rounded-2xl shadow-2xl border border-blue-100 w-full max-w-xs sm:max-w-md text-center space-y-6 sm:space-y-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 drop-shadow">Welcome to Scorix</h1>
        <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Showcase your projects or post problem statements. Get started by creating an account:</p>
        <div className="space-y-6 sm:space-y-8">
          <Link href="/signup/contributor">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition shadow">Create Contributor Account</button>
          </Link>
          <Link href="/signup/company">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 transition shadow">Create Company Account</button>
          </Link>
        </div>
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">Login</Link>
        </div>
      </div>
      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3.5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
