import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Building2, Github, Linkedin, Twitter, Globe, Mail, Phone,
  Award, TrendingUp, Users, FileText, Star, Calendar, MapPin,
  Edit, Share, Download, Eye, Heart, MessageCircle, Target, DollarSign
} from 'lucide-react';

interface ProfileData {
  id: string;
  type: 'contributor' | 'company';
  name: string;
  avatar: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
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

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    const mockProfileData: ProfileData = {
      id: userId || '1',
      type: 'contributor', // or 'company'
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate full-stack developer with expertise in React, Node.js, and AI/ML. Love building innovative solutions that make a difference.',
      location: 'San Francisco, CA',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      website: 'https://alexjohnson.dev',
      socialLinks: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson',
      },
      college: 'Stanford University',
      graduationYear: 2024,
      skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'],
      rank: 45,
      score: 2840,
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
  }, [userId]);

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
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
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
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border p-6 sticky top-8"
            >
              {/* Avatar and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    {isContributor ? <User className="w-4 h-4 text-white" /> : <Building2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.bio}</p>
                {isContributor && profileData.rank && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Rank #{profileData.rank}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
                {profileData.website && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profileData.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mb-6">
                {profileData.socialLinks.github && (
                  <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profileData.socialLinks.linkedin && (
                  <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </a>
                )}
                {profileData.socialLinks.twitter && (
                  <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                    <Twitter className="w-5 h-5 text-blue-600" />
                  </a>
                )}
              </div>

              {/* Additional Info */}
              {isContributor && (
                <div className="space-y-4">
                  {profileData.college && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                      <p className="text-sm text-gray-600">{profileData.college}</p>
                      {profileData.graduationYear && (
                        <p className="text-sm text-gray-500">Class of {profileData.graduationYear}</p>
                      )}
                    </div>
                  )}
                  
                  {profileData.skills && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isContributor && (
                <div className="space-y-4">
                  {profileData.industry && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Industry</h4>
                      <p className="text-sm text-gray-600">{profileData.industry}</p>
                    </div>
                  )}
                  {profileData.companySize && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Company Size</h4>
                      <p className="text-sm text-gray-600">{profileData.companySize}</p>
                    </div>
                  )}
                  {profileData.founded && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Founded</h4>
                      <p className="text-sm text-gray-600">{profileData.founded}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
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
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {isContributor ? (
                      <>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Projects</p>
                              <p className="text-2xl font-bold text-blue-600">{profileData.projects?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Score</p>
                              <p className="text-2xl font-bold text-green-600">{profileData.score?.toLocaleString() || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Badges</p>
                              <p className="text-2xl font-bold text-purple-600">{profileData.badges?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Target className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Problems Posted</p>
                              <p className="text-2xl font-bold text-green-600">{profileData.problemStatements?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Solutions Selected</p>
                              <p className="text-2xl font-bold text-blue-600">{profileData.solutionsSelected || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                              <DollarSign className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Investment</p>
                              <p className="text-2xl font-bold text-orange-600">${profileData.totalInvestment?.toLocaleString() || 0}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Badges (Contributor only) */}
                  {isContributor && profileData.badges && profileData.badges.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges Earned</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {profileData.badges.map((badge) => (
                          <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl">{badge.icon}</div>
                            <div>
                              <p className="font-medium text-gray-900">{badge.name}</p>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
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
                        <p className="text-sm text-gray-700">Rank improved from #52 to #{profileData.rank}</p>
                        <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                      </div>
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
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {isContributor ? (
                    // Contributor Projects
                    profileData.projects?.map((project) => (
                      <div key={project.id} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.map((tech, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{project.views}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{project.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            {project.liveDemo && (
                              <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                              >
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Company Problem Statements
                    profileData.problemStatements?.map((problem) => (
                      <div key={problem.id} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                            <p className="text-gray-600 mb-3">{problem.description}</p>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {problem.category}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            problem.status === 'active' ? 'bg-green-100 text-green-800' : 
                            problem.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{problem.applications} applications</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${problem.budget.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Due: {new Date(problem.deadline).toLocaleDateString()}</span>
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                            View Applications
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New project uploaded</p>
                        <p className="text-sm text-gray-600">AI-Powered Chatbot project was uploaded</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Badge earned</p>
                        <p className="text-sm text-gray-600">Innovation Badge awarded for exceptional work</p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Rank improved</p>
                        <p className="text-sm text-gray-600">Moved from rank #52 to #{profileData.rank}</p>
                        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 