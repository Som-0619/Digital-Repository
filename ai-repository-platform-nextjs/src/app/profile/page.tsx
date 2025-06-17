'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Building2, Mail, Phone,
  Award, TrendingUp, Users, FileText, Star, Calendar, MapPin,
  Edit, Share, Download, Eye, Heart, MessageCircle, Target, DollarSign
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileData {
  id: string;
  type: 'contributor' | 'company';
  name: string;
  avatar: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  // Contributor specific
  college?: string;
  graduationYear?: number;
  skills?: string[];
  projects?: Project[];
  rank?: number;
  score?: number;
  badges?: Badge[];
  // Company specific
  companySize?: string;
  industry?: string;
  founded?: number;
  problemStatements?: ProblemStatement[];
  totalInvestment?: number;
  solutionsSelected?: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemo?: string;
  category: string;
  views: number;
  likes: number;
  createdAt: string;
}

interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  budget: number;
  applications: number;
  status: 'active' | 'reviewing' | 'completed';
  deadline: string;
  category: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}

export default function Profile() {
  const { userProfile } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    const mockProfileData: ProfileData = {
      id: '1',
      type: userProfile?.role === 'professional' ? 'company' : 'contributor',
      name: userProfile?.name || 'Alex Johnson',
      avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: userProfile?.bio || 'Passionate full-stack developer with expertise in React, Node.js, and AI/ML. Love building innovative solutions that make a difference.',
      location: 'San Francisco, CA',
      email: userProfile?.email || 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      college: 'Stanford University',
      graduationYear: 2024,
      skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'],
      rank: userProfile?.rank || 45,
      score: userProfile?.score || 2840,
      projects: [
        {
          id: '1',
          title: 'AI-Powered Chatbot',
          description: 'An intelligent chatbot using natural language processing to provide customer support.',
          technologies: ['React', 'Python', 'TensorFlow', 'FastAPI'],
          githubLink: 'https://github.com/alexjohnson/ai-chatbot',
          liveDemo: 'https://ai-chatbot.demo.com',
          category: 'AI & ML',
          views: 1250,
          likes: 89,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'E-commerce Platform',
          description: 'A full-stack e-commerce platform with payment integration and inventory management.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          githubLink: 'https://github.com/alexjohnson/ecommerce',
          category: 'Web Development',
          views: 890,
          likes: 67,
          createdAt: '2023-12-20',
        },
      ],
      badges: [
        {
          id: '1',
          name: 'Innovation Badge',
          description: 'Awarded for exceptional innovative thinking',
          icon: '🚀',
          color: 'bg-purple-100 text-purple-800',
          earnedAt: '2024-01-20',
        },
        {
          id: '2',
          name: 'Top Contributor',
          description: 'Recognized as a top contributor',
          icon: '🏆',
          color: 'bg-yellow-100 text-yellow-800',
          earnedAt: '2024-01-15',
        },
        {
          id: '3',
          name: 'Problem Solver',
          description: 'Successfully solved 10+ problems',
          icon: '💡',
          color: 'bg-green-100 text-green-800',
          earnedAt: '2024-01-10',
        },
      ],
    };

    setProfileData(mockProfileData);
  }, [userProfile]);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isContributor = profileData.type === 'contributor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Share className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <div className="text-center mb-6">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                <p className="text-gray-600 mb-2">{profileData.bio}</p>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{profileData.rank}</div>
                  <div className="text-xs text-gray-600">Rank</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{profileData.score}</div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{profileData.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{profileData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'projects'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {isContributor ? 'Projects' : 'Problem Statements'}
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'activity'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Activity
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Skills */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills?.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Badges */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {profileData.badges?.map((badge) => (
                            <div
                              key={badge.id}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <span className="text-2xl">{badge.icon}</span>
                              <div>
                                <div className="font-medium text-gray-900">{badge.name}</div>
                                <div className="text-sm text-gray-600">{badge.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'projects' && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {profileData.projects?.map((project) => (
                        <div
                          key={project.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{project.title}</h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {project.category}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{project.views}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{project.likes}</span>
                              </span>
                            </div>
                            <a
                              href={project.githubLink}
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View on GitHub
                            </a>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm text-gray-700">Project "AI Chatbot" received 5 new views</p>
                        <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-gray-700">Earned "Innovation Badge" for React project</p>
                        <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="text-sm text-gray-700">Rank improved from #52 to #45</p>
                        <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 