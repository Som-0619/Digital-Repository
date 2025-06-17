import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Verification from './Verification';
import ContributorPortal from './ContributorPortal';
import ProblemStatementUploader from './ProblemStatementUploader';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import Badges from './Badges';
import Navigation from './components/Navigation';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout component that includes navigation for authenticated pages
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

// Public layout for login/signup pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/contributor-portal" />;
  }

  return <div>{children}</div>;
};

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{name} Page</h1>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Public routes */}
          <Route path="/login" element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          } />
          <Route path="/signup" element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          } />
          
          {/* Authenticated routes */}
          <Route path="/verify" element={
            <AuthenticatedLayout>
              <Verification />
            </AuthenticatedLayout>
          } />
          <Route path="/contributor-portal" element={
            <AuthenticatedLayout>
              <ContributorPortal />
            </AuthenticatedLayout>
          } />
          <Route path="/problem-statement-uploader" element={
            <AuthenticatedLayout>
              <ProblemStatementUploader />
            </AuthenticatedLayout>
          } />
          <Route path="/profile" element={
            <AuthenticatedLayout>
              <Profile />
            </AuthenticatedLayout>
          } />
          <Route path="/leaderboard" element={
            <AuthenticatedLayout>
              <Leaderboard />
            </AuthenticatedLayout>
          } />
          <Route path="/badges" element={
            <AuthenticatedLayout>
              <Badges />
            </AuthenticatedLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 