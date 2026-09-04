import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, Trophy, Lock, CheckCircle } from 'lucide-react';

const BossChallenge = ({ module = "Java Fundamentals" }) => {
  const navigate = useNavigate();

  const bossChallenges = [
    {
      id: 'java-master',
      name: 'Java Master Boss',
      difficulty: 'NIGHTMARE',
      questions: 25,
      timeLimit: 45,
      xpReward: 500,
      description: 'The ultimate Java challenge with advanced concepts',
      requirements: ['Complete Java Fundamentals', 'Score 80%+ on OOP Assessment'],
      unlocked: true,
      attempts: 0,
      bestScore: null,
      icon: '☕',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'react-expert',
      name: 'React Expert Boss',
      difficulty: 'HARD',
      questions: 20,
      timeLimit: 35,
      xpReward: 400,
      description: 'Master React hooks, context, and performance optimization',
      requirements: ['Complete React Basics', 'Build 2 React Projects'],
      unlocked: true,
      attempts: 0,
      bestScore: null,
      icon: '⚛️',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'algorithm-demon',
      name: 'Algorithm Demon',
      difficulty: 'NIGHTMARE',
      questions: 30,
      timeLimit: 60,
      xpReward: 600,
      description: 'Face the most challenging algorithmic problems',
      requirements: ['Complete Data Structures', 'Solve 50+ Problems'],
      unlocked: false,
      attempts: 0,
      bestScore: null,
      icon: '🧠',
      gradient: 'from-red-600 to-purple-600'
    },
    {
      id: 'system-design-titan',
      name: 'System Design Titan',
      difficulty: 'LEGENDARY',
      questions: 15,
      timeLimit: 90,
      xpReward: 800,
      description: 'Design large-scale systems like a senior architect',
      requirements: ['Complete System Design Course', 'Build Scalable App'],
      unlocked: false,
      attempts: 0,
      bestScore: null,
      icon: '🏗️',
      gradient: 'from-yellow-500 to-red-500'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'EASY': return 'bg-green-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'HARD': return 'bg-orange-500';
      case 'NIGHTMARE': return 'bg-red-500';
      case 'LEGENDARY': return 'bg-gradient-to-r from-yellow-500 to-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleChallengeBoss = (bossId) => {
    navigate(`/boss-assessment/${bossId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">💀</span>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚔️</span>
            </div>
            <h1 className="text-5xl font-bold text-white">Boss Challenges</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Face the ultimate coding challenges and prove your mastery
          </p>
        </div>

        {/* Boss Challenge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bossChallenges.map((boss) => (
            <div
              key={boss.id}
              className={`relative p-8 rounded-3xl shadow-2xl border border-accent/30 glassmorphism transition-all duration-300 hover:scale-105 hover:shadow-3xl ${!boss.unlocked ? 'opacity-75' : ''}`}
            >
              {/* Lock Overlay */}
              {!boss.unlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-8 h-8 text-white/60" />
                </div>
              )}

              {/* Boss Icon & Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {boss.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{boss.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${getDifficultyColor(boss.difficulty)}`}>
                    {boss.difficulty}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">{boss.questions}</div>
                  <div className="text-sm text-white/80">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">{boss.timeLimit}m</div>
                  <div className="text-sm text-white/80">Time Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">{boss.xpReward}</div>
                  <div className="text-sm text-white/80">XP Reward</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                {boss.description}
              </p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                <div className="space-y-2">
                  {boss.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${boss.unlocked ? 'text-green-400' : 'text-gray-400'}`} />
                      <span className={`text-sm ${boss.unlocked ? 'text-white/90' : 'text-white/60'}`}>
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Button */}
              <button
                onClick={() => boss.unlocked && handleChallengeBoss(boss.id)}
                disabled={!boss.unlocked}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  boss.unlocked
                    ? 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Zap className="w-5 h-5" />
                Challenge Boss
              </button>

              {/* Stats Footer */}
              <div className="mt-4 flex justify-between text-sm text-white/70">
                <span>Best Score: {boss.bestScore || '--'}</span>
                <span>Attempts: {boss.attempts}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">More Bosses Coming Soon!</h3>
            <p className="text-blue-200 mb-6">
              We're preparing even more challenging bosses to test your skills across different domains.
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐉</span>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BossChallenge;
 