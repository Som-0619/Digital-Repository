'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  mockSignInWithEmailAndPassword, 
  mockCreateUserWithEmailAndPassword, 
  mockGetUserProfile, 
  mockUpdateUserProfile, 
  mockSignOut,
  MockUser, 
  MockUserProfile 
} from '@/lib/mockAuth';

interface AuthContextType {
  currentUser: MockUser | null;
  userProfile: MockUserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<MockUserProfile>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role?: 'contributor' | 'professional', name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [userProfile, setUserProfile] = useState<MockUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        
        // Get user profile
        const profile = await mockGetUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await mockSignInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      localStorage.setItem('mockUser', JSON.stringify(user));
      
      // Get user profile
      const profile = await mockGetUserProfile(user.uid);
      if (profile) {
        setUserProfile(profile);
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: 'contributor' | 'professional' = 'contributor', name?: string) => {
    try {
      const user = await mockCreateUserWithEmailAndPassword(email, password, role, name);
      setCurrentUser(user);
      localStorage.setItem('mockUser', JSON.stringify(user));
      
      // Get user profile
      const profile = await mockGetUserProfile(user.uid);
      if (profile) {
        setUserProfile(profile);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await mockSignOut();
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.removeItem('mockUser');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<MockUserProfile>) => {
    if (currentUser) {
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
      
      // Update in mock database
      await mockUpdateUserProfile(currentUser.uid, updates);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    logout,
    updateUserProfile,
    signIn,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 