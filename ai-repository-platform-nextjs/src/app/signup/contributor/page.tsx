'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { User, Pen, FileText, Sparkles } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type ContributorSignupInputs = {
  name: string;
  email: string;
  password: string;
};

export default function ContributorSignup() {
  const router = useRouter();
  const { signUp, updateUserProfile } = useAuth();
  const [firebaseError, setFirebaseError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContributorSignupInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: ContributorSignupInputs) => {
    setLoading(true);
    setFirebaseError('');
    try {
      await signUp(data.email, data.password, 'contributor', data.name);
      router.push('/contributor-portal');
    } catch (error: any) {
      if (error.message === 'auth/email-already-in-use') {
        setFirebaseError('An account with this email already exists. Please login instead.');
      } else {
        setFirebaseError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl border border-blue-100 w-full max-w-xs sm:max-w-md flex flex-col items-center relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 drop-shadow text-center">Create Your Contributor Account</h2>
        <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">Sign up to showcase your projects and connect with opportunities.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white/80 placeholder-gray-400"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white/80 placeholder-gray-400"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white/80 placeholder-gray-400"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          {firebaseError && <p className="text-red-500 text-xs mb-2">{firebaseError}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition text-base sm:text-lg shadow"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
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