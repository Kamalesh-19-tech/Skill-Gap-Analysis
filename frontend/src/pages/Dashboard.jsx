import  React, { useState, useEffect } from 'react';
import  { useLocation, Link, useNavigate } from 'react-router-dom'; 
import  { Award, Star, Zap, Clock, CheckCircle, ArrowRight, Play, Trophy, Target, Layout, Brain, User, Users } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
import { useBackend, useAchievements, useProgress } from '../hooks/useBackend';
import   { domainRoadmaps } from '../data/domainRoadmaps';
import { AIRoadmapGenerator } from '../utils/aiRoadmapGenerator';
import  Leaderboard from '../components/Leaderboard';
import BossChallenge from '../components/BossChallenge';      

const   Dashboard = () => { 
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { updateStreak, recordActivity } = useBackend();
  const { achievements: userAchievements } = useAchievements();
  const { progress } = useProgress(); 

  const [userStats, setUserStats] = useState({
    score: user?.score ?? 0,
    level: user?.level ?? 1,
    xp: user?.xp ?? 0,
    skillCoins: 250, // Always 250 coins for everyone
    streak: user?.streak ?? 0,
    completedModules: user?.completedModules ?? 0,
    totalModules: user?.totalModules ?? 12,
    rank: user?.rank ?? 'Bronze',
    skillLevel: user?.skillLevel ?? 'Beginner'
  });

   const [skillNodes, setSkillNodes] = useState([]);
  const [selectedPath, setSelectedPath] = useState('Java Full Stack Developer');
  const [dailyProgress, setDailyProgress] = useState({
    streak: 7,
    todayMinutes: 0,
    weeklyGoal: 10,
    completedToday: 0,
    totalToday: 4
  });
  const [aiRoadmap, setAiRoadmap] = useState(null); 

  const getPathData = (selectedRole) => {
    const pathMappings = {
      'Java Full Stack Developer': {
        skills: [
          { id: 'java-core', name: 'Java Core', level: 1, progress: 100 },
          { id: 'spring-boot', name: 'Spring Boot', level: 1, progress: 85 },
          { id: 'database-sql', name: 'Database/SQL', level: 1, progress: 90 },
          { id: 'rest-apis', name: 'REST APIs', level: 2, progress: 70 },
          { id: 'frontend-integration', name: 'Frontend Integration', level: 2, progress: 40 },
          { id: 'microservices', name: 'Microservices', level: 3, progress: 20 },
          { id: 'docker-k8s', name: 'Docker/K8s', level: 3, progress: 0 },
          { id: 'cloud-aws', name: 'Cloud/AWS', level: 3, progress: 0 }
        ]
      },
      'QA Engineer': {
        skills: [
          { id: 'manual-testing', name: 'Manual Testing', level: 1, progress: 100 },
          { id: 'test-planning', name: 'Test Planning', level: 1, progress: 90 },
          { id: 'automation-selenium', name: 'Selenium', level: 2, progress: 75 },
          { id: 'api-testing', name: 'API Testing', level: 2, progress: 60 },
          { id: 'performance-testing', name: 'Performance Testing', level: 2, progress: 30 },
          { id: 'security-testing', name: 'Security Testing', level: 3, progress: 10 },
          { id: 'ci-cd-testing', name: 'CI/CD Testing', level: 3, progress: 0 }
        ]
      },
      'DevOps Engineer': {
        skills: [
          { id: 'linux-admin', name: 'Linux Admin', level: 1, progress: 95 },
          { id: 'git-version-control', name: 'Git/VCS', level: 1, progress: 100 },
          { id: 'docker-containers', name: 'Docker', level: 2, progress: 80 },
          { id: 'kubernetes', name: 'Kubernetes', level: 2, progress: 55 },
          { id: 'ci-cd-pipelines', name: 'CI/CD', level: 2, progress: 65 },
          { id: 'infrastructure-code', name: 'IaC', level: 3, progress: 25 },
          { id: 'monitoring-logging', name: 'Monitoring', level: 3, progress: 15 },
          { id: 'cloud-platforms', name: 'Cloud Platforms', level: 3, progress: 0 }
        ]
      },
      'Frontend Developer': {
        skills: [
          { id: 'html-css', name: 'HTML/CSS', level: 1, progress: 100 },
          { id: 'javascript', name: 'JavaScript', level: 1, progress: 85 },
          { id: 'react', name: 'React', level: 2, progress: 60 },
          { id: 'typescript', name: 'TypeScript', level: 2, progress: 30 },
          { id: 'state-management', name: 'State Mgmt', level: 2, progress: 45 },
          { id: 'testing-jest', name: 'Testing', level: 3, progress: 20 },
          { id: 'build-tools', name: 'Build Tools', level: 3, progress: 0 }
        ]
      }
    };
    return pathMappings[selectedRole] || pathMappings['Java Full Stack Developer'];
  };
  
  const pathData = getPathData(selectedPath); 

   useEffect(() => {
    // Update daily streak when dashboard loads
    updateStreak();
    
    if (location.state) {
      const { score, total, role, skills, level, percentage, points } = location.state; 
           setUserStats(prev => ({
        ...prev,
        score: score,
        level: points ? Math.floor(points / 100) + 1 : (score <= 3 ? 1 : score <= 7 ? 2 : 3),
        xp: prev.xp + (points || score * 50),
        skillLevel: level || (score <= 3 ? 'Beginner' : score <= 7 ? 'Intermediate' : 'Advanced'),
        rank: (points && points >= 150) ? 'Gold' : (points && points >= 100) ? 'Silver' : 'Bronze'
      }));
      
      // Record assessment completion activity
      recordActivity('assessment_complete', {
        score,
        percentage: percentage || Math.round((score / total) * 100),
        role,
        skills
      }); 
      
           // Set appropriate learning path based on role
      setSelectedPath(role || 'Frontend Developer');
      
      // Generate AI roadmap
      generatePersonalizedRoadmap(role || 'Frontend Developer');
    }
    
    // Start daily progress tracking
    startDailyProgressTracking(); 
   }, [location.state, selectedPath]);

   const generatePersonalizedRoadmap = async (role) => {
    try {
      const userProfile = {
        skills: location.state?.skills || [],
        level: userStats.skillLevel,
        experience: userStats.level
      };
      
      const roadmap = await AIRoadmapGenerator.generatePersonalizedRoadmap(
        userProfile, 
        role, 
        userStats.skillLevel
      );
      
      if (roadmap && roadmap.roadmap) {
        setAiRoadmap(roadmap.roadmap);
      } else {
        console.log('Using fallback roadmap - API key needed for personalized AI roadmap');
      }
    } catch (error) {
      console.error('Roadmap generation using fallback - API key needed:', error);
    }
  }; 

  const startDailyProgressTracking = () => {
    // Simulate real-time progress tracking
    const interval = setInterval(() => {
      setDailyProgress(prev => ({
        ...prev,
        todayMinutes: prev.todayMinutes + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }; 

  const mockAchievements = [
    { name: 'Quick Learner', desc: 'Complete your first assessment', earned: true, icon: <Zap className="w-6 h-6" /> },
    { name: 'Consistency Master', desc: '7-day learning streak', earned: true, icon: <Clock className="w-6 h-6" /> },
    { name: 'Knowledge Seeker', desc: 'Complete 5 modules', earned: false, icon: <Star className="w-6 h-6" /> },
    { name: 'Expert Level', desc: 'Reach advanced level', earned: userStats.skillLevel === 'Advanced', icon: <Trophy className="w-6 h-6" /> }
  ];

  const overallProgress = Math.round(pathData.skills.reduce((acc, skill) => acc + (progress[skill.id] || skill.progress), 0) / pathData.skills.length);

   const handleSkillClick = (skill) => {
    if (skill.type === 'video') {
      navigate(`/video/${skill.id}`);
    } else {
      navigate(`/module/${skill.id}`);
    }
  };  

  const nextSteps = [
    { title: 'Continue Current Module', desc: 'React Fundamentals - 60% complete', action: 'Continue', link: '/learn' },
    { title: 'Take Skill Quiz', desc: 'Test your JavaScript knowledge', action: 'Start Quiz', link: '/assessment' },
    { title: 'Join Study Group', desc: 'Connect with fellow learners', action: 'Join', link: '#' }
  ];

  // Helper to determine achievements based on userStats
  const getUserAchievements = (userStats) => [
    {
      name: 'Quick Learner',
      desc: 'Complete your first assessment',
      earned: userStats.score > 0,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: 'Consistency Master',
      desc: '7-day learning streak',
      earned: userStats.streak >= 7,
      icon: <Clock className="w-6 h-6" />
    },
    {
      name: 'Knowledge Seeker',
      desc: 'Complete 5 modules',
      earned: userStats.completedModules >= 5,
      icon: <Star className="w-6 h-6" />
    },
    {
      name: 'Expert Level',
      desc: 'Reach advanced level',
      earned: userStats.skillLevel === 'Advanced',
      icon: <Trophy className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-24 pb-24 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Welcome Header */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome back, {user?.name}! <span role="img" aria-label="rocket">🚀</span>
              </h1>
              <p className="text-blue-200 text-lg">Ready to level up your skills today?</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="glassmorphism px-6 py-3 rounded-2xl text-white font-semibold shadow-lg border border-accent-light">
                {userStats.skillLevel} • {userStats.rank} Rank
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-4 mb-0 -mb-4">
          {/* Level */}
          <div className="glassmorphism p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{userStats.level}</h3>
            <p className="text-blue-200 text-sm">Level</p>
          </div>
          {/* XP Points */}
          <div className="glassmorphism p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{userStats.xp}</h3>
            <p className="text-blue-200 text-sm">XP Points</p>
          </div>
          {/* SkillCoins */}
          <div className="glassmorphism p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{userStats.skillCoins}</h3>
            <p className="text-blue-200 text-sm">SkillCoins</p>
          </div>
          {/* Day Streak */}
          <div className="glassmorphism p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{userStats.streak}</h3>
            <p className="text-blue-200 text-sm">Day Streak</p>
          </div>
        </section>
        <div className="section-divider" />

                             {/* Daily Progress Tracking */}
        <div className="mb-8">
          <div className="dynamic-glassmorphism p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Clock className="w-6 h-6 mr-2 text-cyan-400" />
                Daily Progress Tracker
              </h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{dailyProgress.streak}</div>
                <div className="text-sm text-blue-300">Day Streak 🔥</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-cyan-400">{dailyProgress.todayMinutes}</div>
                <div className="text-sm text-blue-300">Minutes Today</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400">{dailyProgress.completedToday}/{dailyProgress.totalToday}</div>
                <div className="text-sm text-blue-300">Tasks Done</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-yellow-400">{dailyProgress.weeklyGoal}</div>
                <div className="text-sm text-blue-300">Weekly Goal</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round((dailyProgress.completedToday / dailyProgress.totalToday) * 100)}%
                </div>
                <div className="text-sm text-blue-300">Completion</div>
              </div>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(dailyProgress.completedToday / dailyProgress.totalToday) * 100}%` }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-blue-200 text-sm">
                Keep it up! Complete {dailyProgress.totalToday - dailyProgress.completedToday} more tasks to maintain your streak
              </p>
            </div>
          </div>
        </div>

        {/* AI-Generated Roadmap */}
        {aiRoadmap && (
          <div className="mb-8">
            <div className="dynamic-glassmorphism p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-purple-400" />
                  AI-Personalized Learning Path
                </h3>
                <div className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-lg">
                  Generated for {userStats.skillLevel}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 glassmorphism rounded-xl">
                  <div className="text-xl font-bold text-white">{aiRoadmap.totalDuration}</div>
                  <div className="text-sm text-blue-300">Total Duration</div>
                </div>
                <div className="text-center p-4 glassmorphism rounded-xl">
                  <div className="text-xl font-bold text-white">{aiRoadmap.dailySchedule?.practicalCoding || 90} min</div>
                  <div className="text-sm text-blue-300">Daily Coding</div>
                </div>
                <div className="text-center p-4 glassmorphism rounded-xl">
                  <div className="text-xl font-bold text-white">{aiRoadmap.phases?.length || 4}</div>
                  <div className="text-sm text-blue-300">Learning Phases</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Weekly Goals:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiRoadmap.weeklyGoals?.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 glassmorphism rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-blue-200 text-sm">{goal}</span>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contribution Grid Section */}
        <div className="mb-8">
          <div className="dynamic-glassmorphism p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-cyan-400" />
              Daily Activity Tracker
            </h3>
            <p className="text-blue-200 text-sm mb-4">
              Track your daily learning streak! Each square shows your activity for that day.
            </p>
            <ContributionGrid activity={userActivity} />
            <div className="mt-3 text-blue-300 text-xs">
              Total active days: <span className="font-bold text-green-400">{userActivity.filter(a => a > 0).length}</span>
              &nbsp;|&nbsp; Max streak: <span className="font-bold text-green-400">{getMaxStreak(userActivity)}</span>
            </div>
          </div>
        </div> 

                      {/* Enhanced Leaderboard Section */}
        <div className="mb-8">
          <Leaderboard />
        </div> 

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8"> 
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <div className="glassmorphism p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
              <div className="space-y-4">
                {nextSteps.map((step, idx) => (
                  <Link
                    key={idx}
                    to={step.link}
                    className="block p-4 glassmorphism hover:bg-accent/10 rounded-xl transition-all border border-accent group"
                  >
                    <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-blue-200 text-xs mb-3">{step.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-xs font-medium">{step.action}</span>
                      <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glassmorphism p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Achievements
              </h2> 
              <div className="space-y-4">
                {getUserAchievements(userStats).map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                      ${achievement.earned
                        ? 'border-yellow-400 bg-white/5'
                        : 'border-gray-600 bg-transparent opacity-60'
                      }`}
                  >
                    <div className={`text-2xl flex-shrink-0 ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`} >
                      {achievement.icon}
                    </div>
                    <div>
                      <div className={`font-bold ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-blue-200 text-xs">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mindmap Section */}
          <div className="xl:col-span-2 space-y-8"> 
                       <div className="dynamic-glassmorphism p-10 rounded-3xl border-glow">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-bold text-white flex items-center text-glow">
                  <Layout className="w-8 h-8 mr-4 text-cyan-400" />
                  Interactive Learning Mindmap
                </h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-blue-300">Click nodes to explore</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Instructions Panel */}
              <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  How to Use This Mindmap
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-200">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-green-400 font-medium">Completed:</span> Skills you've mastered
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-blue-400 font-medium">Available:</span> Ready to start learning
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-xs text-white">🔒</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Locked:</span> Complete prerequisites first
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 rounded-2xl p-16 min-h-[600px] overflow-hidden border border-blue-500/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none" />
                
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-40 h-40 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 relative group hover:scale-110 transition-all duration-500">
                                       <div className="text-center">
                      <span className="text-white font-bold text-lg block">{selectedPath ? selectedPath.split(' ')[0] : 'Java'}</span>
                      <span className="text-white font-bold text-lg block">{selectedPath ? selectedPath.split(' ').slice(1).join(' ') : 'Developer'}</span>
                      <span className="text-blue-100 text-sm block mt-2">Learning Path</span>
                    </div> 
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-pulse-slow"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-ping"></div>
                  </div>
                </div> 

                               {/* Skill Nodes with Enhanced Design */}
                {pathData.skills.map((skill, index) => {
                  const angle = (index * 360) / pathData.skills.length;
                  const radius = 200;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  const isCompleted = progress[skill.id] >= 100 || skill.progress >= 100;
                  const isUnlocked = skill.level <= userStats.level;
                  const currentProgress = progress[skill.id] || skill.progress;

                  return (
                    <div key={skill.id}>
                      {/* Enhanced Connection Line */}
                      <svg className="absolute top-1/2 left-1/2 pointer-events-none z-10" style={{ transform: 'translate(-50%, -50%)' }}>
                        <defs>
                          <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={isCompleted ? "#10b981" : isUnlocked ? "#3b82f6" : "#6b7280"} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={isCompleted ? "#059669" : isUnlocked ? "#1d4ed8" : "#4b5563"} stopOpacity="0.4" />
                          </linearGradient>
                        </defs>
                        <line
                          x1="0"
                          y1="0"
                          x2={x}
                          y2={y}
                          stroke={`url(#gradient-${skill.id})`}
                          strokeWidth="4"
                          className={isCompleted ? "" : isUnlocked ? "mindmap-connection" : ""}
                          strokeDasharray={isUnlocked ? (isCompleted ? "0" : "8,4") : "12,6"}
                          opacity={isCompleted ? "1" : isUnlocked ? "0.8" : "0.4"}
                        />
                      </svg>

                      {/* Enhanced Skill Node */}
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-15"
                        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                        onClick={() => handleSkillClick(skill)}
                      >
                        <div className={`
                          w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl border-2 transition-all duration-500 relative skill-node
                          ${isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300 text-white shadow-green-500/40' 
                            : isUnlocked 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-300 text-white hover:from-blue-600 hover:to-cyan-700 shadow-blue-500/40 hover:shadow-blue-500/60' 
                            : 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500 text-gray-400 cursor-not-allowed shadow-gray-500/20'
                          }
                        `}>
                          <div className="text-center relative z-10">
                            {isCompleted ? (
                              <CheckCircle className="w-10 h-10 mb-1" />
                            ) : isUnlocked ? (
                              <Play className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                            ) : (
                              <span className="text-2xl">🔒</span>
                            )}
                          </div>
                          
                          {/* Glow Effects */}
                          {isCompleted && (
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/30 to-emerald-400/30 animate-pulse-slow"></div>
                          )}
                          {isUnlocked && !isCompleted && (
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 group-hover:from-blue-400/40 group-hover:to-cyan-400/40 transition-all" />
                          )}
                        </div>
                        
                        {/* Enhanced Skill Label */}
                        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                            isCompleted 
                              ? 'bg-green-500/20 text-green-200 border border-green-500/40 shadow-green-500/20' :
                            isUnlocked 
                              ? 'bg-blue-500/20 text-blue-200 border border-blue-500/40 shadow-blue-500/20 group-hover:bg-blue-500/30' 
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          } shadow-lg`}>
                            {skill.name}
                          </div>
                        </div>
                        
                        {/* Enhanced Progress Ring */}
                        {currentProgress > 0 && currentProgress < 100 && (
                          <div className="absolute -inset-2">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="rgba(59, 130, 246, 0.2)"
                                strokeWidth="6"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="url(#progressGradient)"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${currentProgress * 2.83} 283`}
                                strokeLinecap="round"
                                className="transition-all duration-700 progress-glow"
                              />
                              <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                              <span className="text-xs bg-blue-600/90 text-white px-2 py-1 rounded-lg font-bold">
                                {Math.round(currentProgress)}%
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Completion Badge */}
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })} 

                               {/* Enhanced Progress Panel */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="dynamic-glassmorphism p-8 rounded-2xl border border-cyan-500/30 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                      <div>
                        <span className="text-white font-bold text-xl flex items-center">
                          <Target className="w-6 h-6 mr-2 text-cyan-400" />
                          Learning Path Progress
                        </span>
                        <p className="text-blue-300 text-sm mt-1">Track your journey to mastery</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {Math.round(pathData.skills.reduce((acc, skill) => acc + (progress[skill.id] || skill.progress), 0) / pathData.skills.length)}%
                        </span>
                        <span className="text-blue-300 text-sm block text-center mt-1">Complete</span>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="relative w-full h-4 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/50 mb-6">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 via-purple-500 to-green-500 transition-all duration-1000 relative progress-glow"
                        style={{ width: `${pathData.skills.reduce((acc, skill) => acc + (progress[skill.id] || skill.progress), 0) / pathData.skills.length}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
                        <div className="absolute right-0 top-0 w-4 h-full bg-white/50 rounded-r-full animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Detailed Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                          <span className="text-2xl font-bold text-green-400">
                            {pathData.skills.filter(skill => (progress[skill.id] || skill.progress) >= 100).length}
                          </span>
                        </div>
                        <span className="text-green-300 text-sm font-medium">Mastered Skills</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Play className="w-5 h-5 text-blue-400 mr-2" />
                          <span className="text-2xl font-bold text-blue-400">
                            {pathData.skills.filter(skill => (progress[skill.id] || skill.progress) > 0 && (progress[skill.id] || skill.progress) < 100).length}
                          </span>
                        </div>
                        <span className="text-blue-300 text-sm font-medium">In Progress</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-xl mr-2">🔒</span>
                          <span className="text-2xl font-bold text-gray-400">
                            {pathData.skills.filter(skill => !(progress[skill.id] || skill.progress) || (progress[skill.id] || skill.progress) === 0).length}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm font-medium">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div> 

          
        </div>

        {/* Place Boss Challenges BELOW the grid, spanning full width on desktop */}
        <div className="mt-8">
          <div className="dynamic-glassmorphism p-6 rounded-2xl mt-0">
            <BossChallenge />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to generate activity for 365 days: only the last day is green, rest are black
const getPastYearActivity = () => {
  const days = 365;
  const arr = Array(days - 1).fill(0); // All black
  arr.push(4); // Last day is max green
  return arr;
};

// Helper to get max streak
function getMaxStreak(activity) {
  let max = 0, cur = 0;
  for (let i = 0; i < activity.length; i++) {
    if (activity[i] > 0) {
      cur++;
      max = Math.max(max, cur);
    } else {
      cur = 0;
    }
  }
  return max;
}

// Place this at the top of your Dashboard component
const userActivity = getPastYearActivity();

// ContributionGrid component
function ContributionGrid({ activity }) {
  // 7 days per week, up to 53 weeks
  const weeks = [];
  for (let w = 0; w < 53; w++) {
    weeks.push(activity.slice(w * 7, w * 7 + 7));
  }

  // Calculate the start date (365 days ago, rounded to the previous Sunday)
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Prepare month labels with their starting week index
  const monthLabels = [];
  let lastMonth = null;
  for (let w = 0; w < weeks.length; w++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + w * 7);
    const month = weekStart.toLocaleString('default', { month: 'short' });
    const year = weekStart.getFullYear();
    if (month !== lastMonth) {
      monthLabels.push({
        week: w,
        label: `${month}${weekStart.getMonth() === 0 ? ' ' + year : ''}`,
      });
      lastMonth = month;
    }
  }

  // Color scale (GitHub style)
  const colors = [
    "bg-gray-800 border-gray-700", // 0
    "bg-green-900 border-green-800", // 1
    "bg-green-700 border-green-600", // 2
    "bg-green-500 border-green-400", // 3
    "bg-green-300 border-green-200", // 4+
  ];

  // Get date for tooltip
  const getDate = (week, day) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + week * 7 + day);
    return d.toLocaleDateString();
  };

  // Calculate how many weeks each month label should span
  const monthSpans = monthLabels.map((label, idx) => {
    const start = label.week;
    const end = monthLabels[idx + 1]?.week ?? weeks.length;
    return end - start;
  });

  return (
    <div>
      {/* Month labels as grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
          marginLeft: '24px', // aligns with grid below
        }}
      >
        {monthLabels.map((label, idx) => (
          <div
            key={label.label}
            className="text-xs text-gray-400"
            style={{
              gridColumn: `span ${monthSpans[idx]}`,
              textAlign: 'left',
              minWidth: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label.label}
          </div>
        ))}
      </div>
      {/* Contribution grid as grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: '2px',
        }}
      >
        {Array.from({ length: 7 }).map((_, dayIdx) =>
          weeks.map((week, weekIdx) => {
            const count = week[dayIdx] ?? 0;
            return (
              <div
                key={`${weekIdx}-${dayIdx}`}
                title={`${getDate(weekIdx, dayIdx)}: ${count} activity`}
                className={`w-4 h-4 rounded-sm border ${colors[Math.min(count, 4)]} transition-all`}
                style={{ margin: 0 }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Dashboard;
