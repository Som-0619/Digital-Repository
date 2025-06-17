import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Medal, Crown, Search, Filter, TrendingUp, Users, Award, 
  Star, Eye, Heart, MessageCircle, Calendar, MapPin, Github, Linkedin
} from 'lucide-react';

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

const Leaderboard: React.FC = () => {
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
      {
        id: '6',
        rank: 6,
        name: 'David Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        college: 'Georgia Tech',
        location: 'Atlanta, GA',
        score: 7380,
        projects: 11,
        badges: 9,
        views: 11500,
        likes: 850,
        category: 'web-development',
        isOnline: false,
        lastActive: '2 hours ago',
        socialLinks: {
          github: 'https://github.com/davidthompson',
          linkedin: 'https://linkedin.com/in/davidthompson',
        },
        recentAchievement: 'Full-stack project featured in weekly highlights',
      },
      {
        id: '7',
        rank: 7,
        name: 'Lisa Zhang',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        college: 'University of Michigan',
        location: 'Ann Arbor, MI',
        score: 7150,
        projects: 13,
        badges: 10,
        views: 12200,
        likes: 780,
        category: 'data-science',
        isOnline: true,
        lastActive: '10 minutes ago',
        socialLinks: {
          github: 'https://github.com/lisazhang',
          linkedin: 'https://linkedin.com/in/lisazhang',
        },
        recentAchievement: 'Data visualization project went viral',
      },
      {
        id: '8',
        rank: 8,
        name: 'James Anderson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        college: 'University of Texas',
        location: 'Austin, TX',
        score: 6920,
        projects: 12,
        badges: 8,
        views: 10800,
        likes: 720,
        category: 'mobile-app',
        isOnline: false,
        lastActive: '4 hours ago',
        socialLinks: {
          github: 'https://github.com/jamesanderson',
          linkedin: 'https://linkedin.com/in/jamesanderson',
        },
        recentAchievement: 'iOS app reached 1000+ downloads',
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setLeaderboardData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter data based on category and search
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
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-amber-500 to-orange-600';
    return 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Contributors</p>
                <p className="text-2xl font-bold text-blue-600">1,250</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active This Week</p>
                <p className="text-2xl font-bold text-green-600">847</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Badges Awarded</p>
                <p className="text-2xl font-bold text-purple-600">2,340</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Score</p>
                <p className="text-2xl font-bold text-orange-600">8,920</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contributors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
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
                      Projects
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Badges
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredData.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(entry.rank)}`}>
                              {getRankIcon(entry.rank)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 relative">
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={entry.avatar}
                                alt={entry.name}
                              />
                              {entry.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                              <div className="text-sm text-gray-500">{entry.college}</div>
                              <div className="flex items-center text-xs text-gray-400">
                                <MapPin className="w-3 h-3 mr-1" />
                                {entry.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">{entry.score.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{entry.projects}</div>
                          <div className="text-xs text-gray-500">projects</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{entry.badges}</div>
                          <div className="text-xs text-gray-500">badges</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{entry.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{entry.likes.toLocaleString()}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${entry.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="text-sm text-gray-600">{entry.lastActive}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            {entry.socialLinks.github && (
                              <a
                                href={entry.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {entry.socialLinks.linkedin && (
                              <a
                                href={entry.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.slice(0, 6).map((entry) => (
              <div key={entry.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{entry.name}</p>
                  <p className="text-xs text-gray-600 truncate">{entry.recentAchievement}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard; 