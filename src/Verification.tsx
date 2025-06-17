import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2 } from 'lucide-react';

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'contributor' | 'professional' | null>(null);

  const handleRoleSelection = (role: 'contributor' | 'professional') => {
    setSelectedRole(role);
    // Navigate to appropriate portal after role selection
    if (role === 'contributor') {
      navigate('/contributor-portal');
    } else {
      navigate('/problem-statement-uploader');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Role</h2>
        <p className="text-gray-600 text-center mb-8">
          Please select your role to continue to the appropriate portal
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contributor Card */}
          <div 
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRole === 'contributor' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
            onClick={() => handleRoleSelection('contributor')}
          >
            <div className="flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Contributor</h3>
            <p className="text-gray-600 text-center text-sm">
              I am a student or individual contributor looking to showcase my projects, 
              track my growth, and connect with industry opportunities.
            </p>
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">• Upload project details</span><br />
              <span className="text-xs text-gray-500">• Track rankings & scores</span><br />
              <span className="text-xs text-gray-500">• Earn badges & recognition</span>
            </div>
          </div>

          {/* Working Professional Card */}
          <div 
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRole === 'professional' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
            }`}
            onClick={() => handleRoleSelection('professional')}
          >
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Working Professional</h3>
            <p className="text-gray-600 text-center text-sm">
              I represent a company or organization looking to post problem statements, 
              find talent, and provide mentorship opportunities.
            </p>
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">• Upload problem statements</span><br />
              <span className="text-xs text-gray-500">• Review contributor profiles</span><br />
              <span className="text-xs text-gray-500">• Offer mentorship & funding</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            You can change your role later in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification; 