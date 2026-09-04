import  React, { useState } from 'react';
import { Trophy, Users, Zap, Star, Crown, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overall');

  const leaderboardData = {
    overall: [
      { rank: 1, name: 'Alex Johnson', level: 15, streak: 25, xp: 12500, coins: 450, badges: ['Dragon Slayer', 'Algorithm Master'], isUser: false },
      { rank: 2, name: 'Sarah Chen', level: 14, streak: 18, xp: 11200, coins: 380, badges: ['Dragon Slayer', 'Quick Learner'], isUser: false },
      { rank: 3, name: 'Mike Rodriguez', level: 13, streak: 22, xp: 10800, coins: 320, badges: ['Dragon Slayer'], isUser: false },
      { rank: 4, name: user?.name || 'You', level: 8, streak: 7, xp: 2450, coins: 150, badges: ['Quick Learner'], isUser: true },
      { rank: 5, name: 'Emma Wilson', level: 12, streak: 15, xp: 9500, coins: 290, badges: ['Consistent Learner'], isUser: false }
    ],
    weekly: [
      { rank: 1, name: 'Sarah Chen', xp: 850, activities: 12, streak: 7, isUser: false },
      { rank: 2, name: 'Alex Johnson', xp: 720, activities: 10, streak: 7, isUser: false },
      { rank: 3, name: user?.name || 'You', xp: 680, activities: 9, streak: 7, isUser: true },
      { rank: 4, name: 'Mike Rodriguez', xp: 620, activities: 8, streak: 6, isUser: false }
    ],
    monthly: [
      { rank: 1, name: 'Alex Johnson', xp: 3200, activities: 45, completedModules: 8, isUser: false },
      { rank: 2, name: 'Sarah Chen', xp: 2850, activities: 38, completedModules: 7, isUser: false },
      { rank: 3, name: 'Mike Rodriguez', xp: 2400, activities: 32, completedModules: 6, isUser: false },
      { rank: 4, name: user?.name || 'You', xp: 2100, activities: 28, completedModules: 5, isUser: true }
    ],
    bossSlayers: [
      { rank: 1, name: 'Alex Johnson', bossesDefeated: 8, difficulty: 'Nightmare', lastBoss: 'Java Master', isUser: false },
      { rank: 2, name: 'Sarah Chen', bossesDefeated: 6, difficulty: 'Hard', lastBoss: 'React Expert', isUser: false },
      { rank: 3, name: 'Mike Rodriguez', bossesDefeated: 4, difficulty: 'Hard', lastBoss: 'Python Guru', isUser: false },
      { rank: 4, name: user?.name || 'You', bossesDefeated: 2, difficulty: 'Medium', lastBoss: 'CSS Wizard', isUser: true }
    ]
  };

  const stats = {
    activeLearners: 1234,
    bossSlayers: 89,
    bestStreak: 45,
    totalTitles: 156
  };

   const getRankDisplay = (rank) => {
    switch(rank) {
      case 1: return { icon: '👑', bg: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600', text: 'text-black', shadow: 'shadow-yellow-500/50' };
      case 2: return { icon: '🥈', bg: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500', text: 'text-black', shadow: 'shadow-gray-400/50' };
      case 3: return { icon: '🥉', bg: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700', text: 'text-white', shadow: 'shadow-amber-500/50' };
      default: return { icon: '#' + rank, bg: 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800', text: 'text-white', shadow: 'shadow-gray-600/30' };
    }
  }; 

   const renderLeaderboardContent = () => {
    const data = leaderboardData[activeTab];
    
    return (
      <div className="space-y-4">
        {data.map((player, idx) => {
          const rankDisplay = getRankDisplay(player.rank);
          const isTopThree = player.rank <= 3;
          
          return (
            <div key={idx} className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
              player.isUser 
                ? 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 border-2 border-blue-400/50 shadow-2xl shadow-blue-500/25' 
                : isTopThree 
                  ? 'bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 border border-yellow-500/30 shadow-xl shadow-yellow-500/20'
                  : 'bg-gradient-to-r from-gray-800/60 via-gray-700/60 to-gray-800/60 border border-gray-600/30 hover:border-gray-500/50'
            }`}>
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
              </div>
              
              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center space-x-6">
                  {/* Rank Badge */}
                  <div className={`w-16 h-16 rounded-full ${rankDisplay.bg} ${rankDisplay.shadow} shadow-xl flex items-center justify-center font-bold text-xl ${rankDisplay.text} border-4 border-white/20`}>
                    {player.rank <= 3 ? rankDisplay.icon : `#${player.rank}`}
                  </div>
                  
                  {/* Player Info */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-xl text-white">{player.name}</span>
                      {player.isUser && (
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">YOU</span>
                          <Crown className="w-5 h-5 text-yellow-400 animate-bounce" />
                        </div>
                      )}
                      {isTopThree && !player.isUser && <Crown className="w-5 h-5 text-yellow-400" />}
                    </div>
                    
                    <div className="text-sm text-blue-300 font-medium">
                      {activeTab === 'overall' && (
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>Level {player.level}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-orange-400" />
                            <span>{player.streak} day streak</span>
                          </span>
                        </div>
                      )}
                      {activeTab === 'weekly' && `${player.activities} activities • ${player.streak} day streak`}
                      {activeTab === 'monthly' && `${player.completedModules} modules completed • ${player.activities} activities`}
                      {activeTab === 'bossSlayers' && (
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400 font-bold">{player.difficulty}</span>
                          <span>•</span>
                          <span>Last: {player.lastBoss}</span>
                        </div>
                      )}
                    </div>
                    
                    {activeTab === 'overall' && player.badges && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {player.badges.map((badge, i) => (
                          <span key={i} className="inline-flex items-center space-x-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
                            <Award className="w-3 h-3" />
                            <span>{badge}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="text-right space-y-1">
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {activeTab === 'bossSlayers' ? `${player.bossesDefeated}` : player.xp.toLocaleString()}
                    </div>
                    <div className="text-sm text-yellow-300 font-medium">
                      {activeTab === 'bossSlayers' ? 'bosses defeated' : 'XP'}
                    </div>
                  </div>
                  {activeTab === 'overall' && (
                    <div className="flex items-center space-x-1 text-green-400 font-semibold">
                      <span className="text-lg">💰</span>
                      <span>{player.coins}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Glow effect for top 3 */}
              {isTopThree && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }; 

   return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Leaderboard
              </h3>
              <p className="text-blue-300 font-medium">Compete with fellow learners and climb the ranks!</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-yellow-400">
            <Star className="w-5 h-5 animate-spin" />
            <span className="text-sm font-semibold">Live Rankings</span>
          </div>
        </div> 
      
             {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-blue-600/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="relative text-center p-6">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:animate-pulse" />
              <div className="text-3xl font-bold text-blue-400 mb-1">{stats.activeLearners.toLocaleString()}</div>
              <div className="text-sm text-blue-300 font-medium">Active Learners</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 via-red-600/20 to-orange-500/20 border border-red-400/30 hover:border-red-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10 group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="relative text-center p-6">
              <Zap className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-3xl font-bold text-red-400 mb-1">{stats.bossSlayers}</div>
              <div className="text-sm text-red-300 font-medium">Boss Slayers</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/20 via-green-600/20 to-emerald-500/20 border border-green-400/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="relative text-center p-6">
              <div className="text-3xl mb-3">🔥</div>
              <div className="text-3xl font-bold text-green-400 mb-1">{stats.bestStreak}</div>
              <div className="text-sm text-green-300 font-medium">Best Streak</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 via-yellow-600/20 to-orange-500/20 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="relative text-center p-6">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:animate-spin" />
              <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.totalTitles}</div>
              <div className="text-sm text-yellow-300 font-medium">Total Titles</div>
            </div>
          </div>
        </div> 

             {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'overall', name: 'Overall', icon: '🎯', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/50', glow: 'from-blue-500/20 to-cyan-500/20' },
            { id: 'weekly', name: 'Weekly', icon: '⚡', gradient: 'from-yellow-500 to-orange-500', shadow: 'shadow-yellow-500/50', glow: 'from-yellow-500/20 to-orange-500/20' },
            { id: 'monthly', name: 'Monthly', icon: '📅', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', glow: 'from-green-500/20 to-emerald-500/20' },
            { id: 'bossSlayers', name: 'Boss Slayers', icon: '⚔️', gradient: 'from-red-500 to-pink-500', shadow: 'shadow-red-500/50', glow: 'from-red-500/20 to-pink-500/20' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-bold transition-all duration-500 transform ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl ${tab.shadow} scale-110 border-2 border-white/30`
                  : 'bg-gradient-to-r from-gray-800/90 via-gray-700/90 to-gray-800/90 text-gray-300 hover:text-white border-2 border-gray-600/30 hover:border-gray-500/50 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {/* Active button glow effect */}
              {activeTab === tab.id && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 animate-pulse"></div>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${tab.glow} rounded-2xl blur-sm opacity-75 animate-pulse`}></div>
                </>
              )}
              
              {/* Hover shimmer effect for inactive buttons */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Button content */}
              <span className="relative flex items-center space-x-3">
                <span className={`text-2xl transition-transform duration-300 ${activeTab === tab.id ? 'animate-bounce' : 'group-hover:scale-125'}`}>
                  {tab.icon}
                </span>
                <span className="font-extrabold tracking-wide">{tab.name}</span>
              </span>
              
              {/* Active indicator dot */}
              {activeTab === tab.id && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping"></div>
              )}
            </button>
          ))}
        </div> 

             {/* Leaderboard Content */}
        {renderLeaderboardContent()}
      </div>
    </div>
  ); 
};

export default Leaderboard;
 