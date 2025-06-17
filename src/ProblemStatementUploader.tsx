import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Upload, Building2, Target, Users, Award, TrendingUp, FileText, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const schema = yup.object().shape({
  problemTitle: yup.string().required('Problem title is required'),
  description: yup.string().min(100, 'Description must be at least 100 characters').required('Description is required'),
  requirements: yup.string().min(50, 'Requirements must be at least 50 characters').required('Requirements are required'),
  expectedOutcome: yup.string().min(50, 'Expected outcome must be at least 50 characters').required('Expected outcome is required'),
  budget: yup.number().positive('Budget must be positive').required('Budget is required'),
  deadline: yup.date().min(new Date(), 'Deadline must be in the future').required('Deadline is required'),
  category: yup.string().required('Category is required'),
  companyName: yup.string().required('Company name is required'),
  contactEmail: yup.string().email('Invalid email').required('Contact email is required'),
  mentorshipOffered: yup.boolean(),
  fundingOffered: yup.boolean(),
});

type ProblemStatementFormInputs = {
  problemTitle: string;
  description: string;
  requirements: string;
  expectedOutcome: string;
  budget: number;
  deadline: string;
  category: string;
  companyName: string;
  contactEmail: string;
  mentorshipOffered: boolean;
  fundingOffered: boolean;
};

const ProblemStatementUploader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload'>('dashboard');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProblemStatementFormInputs>({ resolver: yupResolver(schema) });

  const watchMentorship = watch('mentorshipOffered');
  const watchFunding = watch('fundingOffered');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const onSubmit = async (data: ProblemStatementFormInputs) => {
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Problem statement data:', data);
    console.log('Uploaded files:', uploadedFiles);
    setIsUploading(false);
    reset();
    setUploadedFiles([]);
    setActiveTab('dashboard');
  };

  const stats = [
    { icon: Target, label: 'Problems Posted', value: '8', color: 'text-green-600' },
    { icon: Users, label: 'Contributors Applied', value: '156', color: 'text-blue-600' },
    { icon: Award, label: 'Solutions Selected', value: '12', color: 'text-purple-600' },
    { icon: DollarSign, label: 'Total Investment', value: '$45K', color: 'text-orange-600' },
  ];

  const recentProblems = [
    {
      title: 'AI-Powered Customer Service Bot',
      category: 'AI & ML',
      applications: 23,
      budget: '$8,000',
      status: 'Active',
      daysLeft: 12,
    },
    {
      title: 'Blockchain Supply Chain Tracker',
      category: 'Blockchain',
      applications: 18,
      budget: '$12,000',
      status: 'Reviewing',
      daysLeft: 5,
    },
    {
      title: 'IoT Smart Home Security',
      category: 'IoT',
      applications: 31,
      budget: '$6,500',
      status: 'Active',
      daysLeft: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Problem Statement Portal</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'upload'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Post Problem
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Problems */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Problem Statements</h3>
                <div className="space-y-4">
                  {recentProblems.map((problem, index) => (
                    <motion.div
                      key={problem.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{problem.title}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{problem.category}</span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{problem.applications} applications</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{problem.budget}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          problem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {problem.status}
                        </span>
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{problem.daysLeft} days left</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Problem Statement</h2>
                  <p className="text-gray-600">Connect with talented contributors and find innovative solutions</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Problem Title *
                      </label>
                      <input
                        type="text"
                        {...register('problemTitle')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter problem title"
                      />
                      {errors.problemTitle && (
                        <p className="text-red-500 text-sm mt-1">{errors.problemTitle.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        {...register('category')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="data-science">Data Science</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="iot">IoT</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Problem Description *
                    </label>
                    <textarea
                      {...register('description')}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Describe the problem in detail, its context, and why it needs to be solved..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements *
                    </label>
                    <textarea
                      {...register('requirements')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="List the technical requirements, skills needed, and deliverables..."
                    />
                    {errors.requirements && (
                      <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Outcome *
                    </label>
                    <textarea
                      {...register('expectedOutcome')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="What should the final solution look like? What are the success criteria?"
                    />
                    {errors.expectedOutcome && (
                      <p className="text-red-500 text-sm mt-1">{errors.expectedOutcome.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget (USD) *
                      </label>
                      <input
                        type="number"
                        {...register('budget')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="5000"
                        min="0"
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deadline *
                      </label>
                      <input
                        type="date"
                        {...register('deadline')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors.deadline && (
                        <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        {...register('companyName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your company name"
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      {...register('contactEmail')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="contact@company.com"
                    />
                    {errors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Additional Opportunities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <input
                          type="checkbox"
                          {...register('mentorshipOffered')}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Mentorship Offered</span>
                          <p className="text-sm text-gray-600">Provide guidance and support to contributors</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <input
                          type="checkbox"
                          {...register('fundingOffered')}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Additional Funding</span>
                          <p className="text-sm text-gray-600">Offer extra funding for exceptional solutions</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drop files here or click to upload (PDF, DOC, images)
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Choose Files
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isUploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Posting Problem Statement...</span>
                      </div>
                    ) : (
                      'Post Problem Statement'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProblemStatementUploader; 