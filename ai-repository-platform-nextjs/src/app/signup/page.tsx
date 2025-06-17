'use client';

import Link from 'next/link';
import { User, Building2, Pen, FileText, Sparkles } from 'lucide-react';

export default function SignupLanding() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 px-2 overflow-hidden">
      {/* Floating Elements */}
      <div className="pointer-events-none select-none">
        {/* Robot Head (using User icon as placeholder) */}
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
      <div className="bg-white/90 p-6 sm:p-10 rounded-2xl shadow-2xl border border-blue-100 w-full max-w-xs sm:max-w-md flex flex-col items-center space-y-6 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 drop-shadow text-center">Choose Your Account Type</h2>
        <p className="text-gray-600 mb-2 text-center text-sm sm:text-base">Select the type of account you want to create:</p>
        <div className="w-full flex flex-col gap-4">
          <a href="/signup/contributor" className="group block w-full">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow hover:from-blue-100 hover:to-purple-100 hover:shadow-lg transition cursor-pointer">
              <div className="bg-blue-600 group-hover:bg-blue-700 transition text-white rounded-full p-2">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-lg">Contributor</div>
                <div className="text-xs text-gray-500">Showcase your projects and connect with opportunities</div>
              </div>
            </div>
          </a>
          <a href="/signup/company" className="group block w-full">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 shadow hover:from-green-100 hover:to-blue-100 hover:shadow-lg transition cursor-pointer">
              <div className="bg-green-600 group-hover:bg-green-700 transition text-white rounded-full p-2">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-lg">Company</div>
                <div className="text-xs text-gray-500">Post problem statements and find top talent</div>
              </div>
            </div>
          </a>
        </div>
        <div className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 font-semibold hover:underline">Login</a>
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