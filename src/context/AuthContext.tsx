import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProfile, createUserProfile } from '../services/firebaseService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: any;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserProfile: (updates: any) => Promise<void>;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user profile from Firestore
        const profileResult = await getUserProfile(user.uid);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        } else {
          // Create new user profile if it doesn't exist
          const newProfile = {
            name: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email,
            avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`,
            role: 'contributor', // Default role
            createdAt: new Date(),
            score: 0,
            rank: 0,
            projects: 0,
            badges: 0,
            views: 0,
            likes: 0
          };
          
          await createUserProfile(user.uid, newProfile);
          setUserProfile(newProfile);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUserProfile = async (updates: any) => {
    if (currentUser) {
      // Update local state
      setUserProfile(prev => ({ ...prev, ...updates }));
      
      // Update in Firestore
      const { updateUserProfile: updateProfile } = await import('../services/firebaseService');
      await updateProfile(currentUser.uid, updates);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 