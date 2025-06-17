import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-8w8QwQwQwQwQwQwQwQwQwQwQwQwQwQ",
  authDomain: "ai-repository-platform.firebaseapp.com",
  projectId: "ai-repository-platform",
  storageBucket: "ai-repository-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Firestore collections
export const collections = {
  users: 'users',
  projects: 'projects',
  problemStatements: 'problemStatements',
  badges: 'badges',
  leaderboard: 'leaderboard',
  activities: 'activities'
};

// User roles
export const userRoles = {
  CONTRIBUTOR: 'contributor',
  PROFESSIONAL: 'professional'
};

// Project categories
export const projectCategories = [
  'web-development',
  'mobile-app',
  'ai-ml',
  'data-science',
  'blockchain',
  'iot',
  'cybersecurity',
  'other'
];

// Badge types
export const badgeTypes = {
  DEVELOPER: 'developer',
  INNOVATION: 'innovation',
  PROBLEM_SOLVER: 'problem-solver',
  TOP_CONTRIBUTOR: 'top-contributor',
  MENTOR: 'mentor'
}; 