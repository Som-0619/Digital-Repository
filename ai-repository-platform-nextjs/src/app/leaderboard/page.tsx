'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Medal, Crown, Search, Filter, TrendingUp, Users, Award, 
  Star, Eye, Heart, MessageCircle, Calendar, MapPin, Github, Linkedin, FileText
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  college: string;
  location: string;
  score: number;
  projects: number;
  badges: number;
  views: number;
  likes: number;
  category: string;
  isOnline: boolean;
  lastActive: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
  };
  recentAchievement?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories: Category[] = [
    { id: 'all', name: 'All Categories', icon: '🏆', color: 'bg-gradient-to-r from-yellow-400 to-orange-500', count: 1250 },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖', color: 'bg-gradient-to-r from-purple-400 to-pink-500', count: 320 },
    { id: 'web-development', name: 'Web Development', icon: '🌐', color: 'bg-gradient-to-r from-blue-400 to-cyan-500', count: 450 },
    { id: 'mobile-app', name: 'Mobile Apps', icon: '📱', color: 'bg-gradient-to-r from-green-400 to-emerald-500', count: 280 },
    { id: 'data-science', name: 'Data Science', icon: '📊', color: 'bg-gradient-to-r from-indigo-400 to-purple-500', count: 200 },
  ];

  // Mock data - in real app, this would come from API with real-time updates
  useEffect(() => {
    const mockData: LeaderboardEntry[] = [
      {
        id: '1',
        rank: 1,
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        college: 'MIT',
        location: 'Boston, MA',
        score: 8920,
        projects: 15,
        badges: 12,
        views: 15420,
        likes: 1240,
        category: 'ai-ml',
        isOnline: true,
        lastActive: '2 minutes ago',
        socialLinks: {
          github: 'https://github.com/sarahchen',
          linkedin: 'https://linkedin.com/in/sarahchen',
        },
        recentAchievement: 'Earned "AI Pioneer" badge',
      },
      {
        id: '2',
        rank: 2,
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        college: 'Stanford University',
        location: 'San Francisco, CA',
        score: 8450,
        projects: 12,
        badges: 10,
        views: 12850,
        likes: 980,
        category: 'web-development',
        isOnline: false,
        lastActive: '1 hour ago',
        socialLinks: {
          github: 'https://github.com/alexrodriguez',
          linkedin: 'https://linkedin.com/in/alexrodriguez',
        },
        recentAchievement: 'Project "E-commerce Platform" reached 500 views',
      },
      {
        id: '3',
        rank: 3,
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        college: 'UC Berkeley',
        location: 'Berkeley, CA',
        score: 8120,
        projects: 18,
        badges: 15,
        views: 16500,
        likes: 1350,
        category: 'data-science',
        isOnline: true,
        lastActive: '5 minutes ago',
        socialLinks: {
          github: 'https://github.com/priyapatel',
          linkedin: 'https://linkedin.com/in/priyapatel',
        },
        recentAchievement: 'Ranked #1 in Data Science category',
      },
      {
        id: '4',
        rank: 4,
        name: 'Michael Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        college: 'Harvard University',
        location: 'Cambridge, MA',
        score: 7850,
        projects: 14,
        badges: 11,
        views: 14200,
        likes: 1100,
        category: 'mobile-app',
        isOnline: false,
        lastActive: '3 hours ago',
        socialLinks: {
          github: 'https://github.com/michaelkim',
          linkedin: 'https://linkedin.com/in/michaelkim',
        },
        recentAchievement: 'Mobile app "Fitness Tracker" launched successfully',
      },
      {
        id: '5',
        rank: 5,
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        college: 'Carnegie Mellon',
        location: 'Pittsburgh, PA',
        score: 7620,
        projects: 16,
        badges: 13,
        views: 13800,
        likes: 920,
        category: 'ai-ml',
        isOnline: true,
        lastActive: '1 minute ago',
        socialLinks: {
          github: 'https://github.com/emmawilson',
          linkedin: 'https://linkedin.com/in/emmawilson',
        },
        recentAchievement: 'AI chatbot project selected by TechCorp',
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setLeaderboardData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredData = leaderboardData.filter(entry => {
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-600">{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
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
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Live Updates</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contributor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recent Achievement
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(entry.rank)}`}>
                          {getRankIcon(entry.rank)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">#{entry.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={entry.avatar}
                            alt={entry.name}
                            className="w-10 h-10 rounded-full"
                          />
                          {entry.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                          <div className="text-sm text-gray-500">{entry.college}</div>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />
                            <span>{entry.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span>{entry.projects} projects</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span>{entry.badges} badges</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Eye className="w-4 h-4 text-green-500" />
                          <span>{entry.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{entry.recentAchievement}</div>
                      <div className="text-xs text-gray-500 mt-1">{entry.lastActive}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {entry.socialLinks.github && (
                          <a
                            href={entry.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {entry.socialLinks.linkedin && (
                          <a
                            href={entry.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 