import  React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Code, HelpCircle, Clock, CheckCircle, Bookmark, MessageCircle, Book } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../hooks/useBackend'; 

const VideoLesson = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateModuleProgress } = useProgress();
  
  const [activeTab, setActiveTab] = useState('video');
  const [watchProgress, setWatchProgress] = useState(0);
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    // Load module data
    const loadModule = () => {
      const modules = {
        'programming-fundamentals': {
          title: 'Programming Fundamentals',
          description: 'Core programming concepts and principles',
          progress: 65,
          videoUrl: 'https://www.youtube.com/embed/zOjov-2OZ0E',
          videoTitle: 'Introduction to Programming and Computer Science - Full Course',
          duration: '15:30',
          stats: {
            videosWatched: 3,
            totalVideos: 5,
            practiceProblems: 2,
            totalPractice: 3,
            quizzes: 0,
            totalQuizzes: 1
          }
        }
      };
      
      setModuleData(modules[moduleId] || modules['programming-fundamentals']);
    };
    
    loadModule();
  }, [moduleId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!moduleData) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold">{moduleData.title}</h1>
              <p className="text-slate-400">{moduleData.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">{moduleData.progress}%</div>
            <div className="text-sm text-slate-400">Complete</div>
          </div>
        </div>
      </div>

           {/* Tab Navigation */}
      <div className="bg-slate-800 px-6 border-b border-slate-700">
        <div className="flex space-x-1 justify-center">
          <button 
            onClick={() => setActiveTab('video')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'video' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Video Lessons</span>
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'practice' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Practice Exercises</span>
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'quiz' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz</span>
          </button>
          <button 
            onClick={() => setActiveTab('reference')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'reference' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>Reference Material</span>
          </button>
          <button 
            onClick={() => setActiveTab('challenge')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'challenge' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code Challenge</span>
          </button>
        </div>
      </div> 

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'video' && (
            <div className="space-y-6">
              {/* Video Player */}
              <div className="bg-slate-800 rounded-lg overflow-hidden">
                <iframe
                  src={moduleData.videoUrl}
                  title={moduleData.videoTitle}
                  className="w-full h-96"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Introduction to Programming Logic</h3>
                  </div>
                  <div className="flex items-center text-slate-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{moduleData.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

                   {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-bold">Practice Exercises</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Semantic HTML Structure</span>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Review</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>CSS Flexbox Layout</span>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Review</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <span>CSS Grid System</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Start</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                      <span>Responsive Design</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Start</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Knowledge Quiz</h3>
              <p className="text-slate-400">Quiz will be available here.</p>
            </div>
          )}

          {activeTab === 'reference' && (
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <Book className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold">Reference Materials</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center">
                      <Book className="w-5 h-5 text-blue-400 mr-3" />
                      <span>MDN HTML Documentation</span>
                    </div>
                    <button 
                      onClick={() => navigate('/module/html-documentation')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Read Module
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center">
                      <Book className="w-5 h-5 text-blue-400 mr-3" />
                      <span>CSS-Tricks Flexbox Guide</span>
                    </div>
                    <button 
                      onClick={() => navigate('/module/flexbox-guide')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Read Module
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center">
                      <Book className="w-5 h-5 text-blue-400 mr-3" />
                      <span>CSS Grid Garden Game</span>
                    </div>
                    <button 
                      onClick={() => navigate('/module/css-grid-guide')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Read Module
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-purple-500/30">
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 text-purple-400 mr-3" />
                      <span>Join Study Group Discussion</span>
                    </div>
                    <button 
                      onClick={() => navigate('/community')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                    >
                      Join Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challenge' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <Code className="w-6 h-6 text-green-400 mr-3" />
                  <h3 className="text-xl font-bold">Code Challenge</h3>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-sm">
{`// Complete this function to find the longest palindrome substring
function longestPalindrome(str) {
  // Your code here
  
}

// Test cases
console.log(longestPalindrome("babad")); // Should output: "bab" or "aba"
console.log(longestPalindrome("cbbd")); // Should output: "bb"`}
                  </pre>
                </div>
                <div className="flex space-x-3">
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </button>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Submit Solution
                  </button>
                  <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">
                    Get Hint
                  </button>
                </div>
              </div>
            </div>
          )} 
        </div>

        {/* Sidebar */}
        <div className="w-80 p-6 space-y-6">
          {/* Module Progress */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Module Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Videos Watched</span>
                <span>{moduleData.stats.videosWatched}/{moduleData.stats.totalVideos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Practice Problems</span>
                <span>{moduleData.stats.practiceProblems}/{moduleData.stats.totalPractice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Quizzes</span>
                <span>{moduleData.stats.quizzes}/{moduleData.stats.totalQuizzes}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Take Notes</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span>Ask Question</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <Bookmark className="w-5 h-5 text-yellow-400" />
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLesson;
 