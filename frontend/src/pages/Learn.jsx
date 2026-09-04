import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { AIRoadmapGenerator } from '../utils/aiRoadmapGenerator';
import  { Play, Code, Award, Globe, Book, ArrowRight, Target, CheckCircle, MessageCircle, Clock, Cpu, HelpCircle } from 'lucide-react';
import  { Link, useNavigate } from 'react-router-dom';  
import { useBackend, useProgress } from '../hooks/useBackend';
import { CompilerService } from '../services/compilerService';
import learningModules from '../data/learningModules.json';

const learningTracks = learningModules.tracks;

const Learn = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null); 
  const [selectedTrack, setSelectedTrack] = useState('frontend');
  const [aiRoadmap, setAiRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [userCode, setUserCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileResult, setCompileResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showQuizSection, setShowQuizSection] = useState(false);
  const codeChallengeRef = useRef(null);
  const quizRef = useRef(null);
  const { getModule, submitExercise, recordActivity } = useBackend();
  const { progress, updateModuleProgress } = useProgress(); 
  const [aiVideos, setAiVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('practice');

  // Fetch AI roadmap on mount or when selectedTrack changes
  useEffect(() => {
    async function fetchRoadmap() {
      setLoadingRoadmap(true);
      const userProfile = { skills: [], level: 'Beginner', experience: 1 };
      const role = selectedTrack === 'frontend' ? 'Frontend Developer' : selectedTrack === 'backend' ? 'Java Full Stack Developer' : selectedTrack;
      const roadmapData = await AIRoadmapGenerator.generatePersonalizedRoadmap(userProfile, role, 'Beginner');
      console.log('Gemini AI Roadmap:', roadmapData);
      setAiRoadmap(roadmapData?.roadmap || null);
      setAiVideos(roadmapData?.videos || []);
      setLoadingRoadmap(false);
    }
    fetchRoadmap();
  }, [selectedTrack]);

  const handleLanguageTab = (lang) => {
    setSelectedLanguage(lang);
    setUserCode(CompilerService.getCodeTemplate(lang));
  };

  const handleRunCode = async () => {
    setIsCompiling(true);
    try {
      const result = await CompilerService.compileAndRun(userCode, selectedLanguage);
      console.log('CompilerService result:', result);
      setCompileResult(result);
      setCodeOutput(result.output);
    } catch (err) {
      console.error('Error running code:', err);
      setCompileResult({
        success: false,
        output: '',
        error: String(err),
        executionTime: 0,
        memory: 'N/A',
        cpuTime: 'N/A',
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A'
      });
      setCodeOutput('');
    }
    setIsCompiling(false);
  };

  const handleSubmitSolution = async () => {
    // Logic to submit the solution
  };

  // Scroll to code challenge when Practice is clicked
  const handlePracticeClick = () => {
    setShowReference(false);
    setShowQuizSection(false);
    setShowQuiz(false);
    setActiveTab('practice');
    setTimeout(() => {
      codeChallengeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Scroll to quiz when Quiz is clicked
  const handleQuizClick = () => {
    setShowQuiz(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReferenceClick = () => {
    setShowReference(true);
    setShowQuizSection(false);
    setShowQuiz(false);
    setActiveTab('reference');
  };
  const handleQuizSectionClick = () => {
    setShowQuizSection(true);
    setShowReference(false);
    setShowQuiz(false);
    setActiveTab('quiz');
  };

  // Helper to extract YouTube video ID from URL
  function extractYouTubeId(url) {
    const match = url.match(/(?:v=|be\/|embed\/)([\w-]{11})/);
    return match ? match[1] : '';
  }
  

  // Quiz questions for each track (can be expanded or made dynamic)
  const quizQuestions = {
    frontend: [
      {
        question: 'What is the main responsibility of a Frontend Developer?',
        options: [
          'Designing UI',
          'Writing backend logic',
          'Managing databases',
          'All of the above'
        ],
        answer: 0
      },
      {
        question: 'Which tool is commonly used by Frontend Developers?',
        options: [
          'VS Code',
          'Postman',
          'Git',
          'All of the above'
        ],
        answer: 3
      },
      {
        question: 'What is a key skill for a Frontend Developer?',
        options: [
          'Problem solving',
          'Communication',
          'Teamwork',
          'All of the above'
        ],
        answer: 3
      }
    ],
    backend: [
      {
        question: 'Which language is commonly used for backend development?',
        options: [
          'JavaScript', 'Python', 'Java', 'All of the above'
        ],
        answer: 3
      },
      {
        question: 'What is a REST API?',
        options: [
          'A type of database', 'A web service interface', 'A frontend framework', 'A CSS library'
        ],
        answer: 1
      },
      {
        question: 'Which database is NoSQL?',
        options: [
          'MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'
        ],
        answer: 1
      }
    ],
    'java full stack developer': [
      {
        question: 'Which stack is used in Java Full Stack?',
        options: [
          'MERN', 'MEAN', 'Spring Boot + React', 'LAMP'
        ],
        answer: 2
      },
      {
        question: 'Which is a Java build tool?',
        options: [
          'Maven', 'Webpack', 'Gulp', 'Parcel'
        ],
        answer: 0
      },
      {
        question: 'Which is a frontend technology?',
        options: [
          'Spring Boot', 'React', 'Hibernate', 'JUnit'
        ],
        answer: 1
      }
    ]
  };

  const [userQuizAnswers, setUserQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizOptionChange = (qIdx, optIdx) => {
    const updated = [...userQuizAnswers];
    updated[qIdx] = optIdx;
    setUserQuizAnswers(updated);
  };

  const handleQuizSubmit = () => {
    const trackKey = selectedTrack === 'frontend' ? 'frontend' : selectedTrack === 'backend' ? 'backend' : 'java full stack developer';
    const questions = quizQuestions[trackKey] || [];
    let score = 0;
    questions.forEach((q, idx) => {
      if (userQuizAnswers[idx] === q.answer) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* 1. Roadmap at the top */}
        <div className="glassmorphism p-6 rounded-2xl mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">My Learning Roadmap</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              {Object.keys(learningTracks).map(trackId => (
                <button
                  key={trackId}
                  onClick={() => setSelectedTrack(trackId)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${selectedTrack === trackId ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-200 hover:bg-white/20'}`}
                >
                  {learningTracks[trackId].name}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto py-6">
            {/* Gamified Flowchart */}
            <div className="flex items-center gap-0 min-w-[700px]">
              {(aiRoadmap && Array.isArray(aiRoadmap.phases) && aiRoadmap.phases.length > 0) ? (
                aiRoadmap.phases.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col items-center group">
                    {/* Node */}
                    <div className={`dynamic-glassmorphism flex flex-col items-center justify-center px-6 py-4 rounded-2xl border-2 ${item.completed ? 'border-green-400 shadow-green-400/30' : 'border-accent'} shadow-lg transition-all`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${item.completed ? 'bg-green-500 text-white' : 'bg-accent text-white'} shadow-md`}>{idx + 1}</span>
                        <span className="font-bold text-white text-lg">{item.title}</span>
                      </div>
                      <p className="text-blue-200 text-sm text-center mb-2 max-w-xs">{item.description}</p>
                      {/* Material Recommendations */}
                      {item.resources && item.resources.length > 0 && (
                        <div className="mt-2 w-full">
                          <h5 className="text-accent text-xs font-bold mb-1 text-center">Recommended Materials</h5>
                          <ul className="flex flex-col gap-1">
                            {item.resources.map((res, rIdx) => (
                              <li key={rIdx} className="text-xs text-blue-200 text-center">
                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="btn-accent px-2 py-1 text-xs">{res.title}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* Arrow to next node */}
                    {idx < aiRoadmap.phases.length - 1 && (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <ArrowRight className="w-8 h-8 text-accent animate-pulse-slow" />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-blue-200 py-8">No roadmap steps available.</div>
              )}
            </div>
          </div>

          {/* AI-Generated Roadmap section moved here */}
          {aiRoadmap && aiRoadmap.schedule && (
            <div className="p-8 rounded-2xl mb-8 border border-blue-400/30 bg-transparent">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-900/60 p-2 rounded-full">
                  <Globe className="w-6 h-6 text-blue-300" />
                </span>
                <h2 className="text-2xl font-bold text-white">AI-Generated Roadmap</h2>
              </div>
              {/* Daily Schedule */}
              {aiRoadmap.schedule.theoreticalLearning && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2 text-white">Daily Schedule</h3>
                  <div className="bg-[#23224a] rounded-xl p-4 border border-blue-400/30 mb-4 text-center">
                    <span className="font-semibold text-blue-100 mr-6">Theoretical Learning: {aiRoadmap.schedule.theoreticalLearning}</span>
                    <span className="font-semibold text-blue-100 mr-6">Practical Coding: {aiRoadmap.schedule.practicalCoding}</span>
                    <span className="font-semibold text-blue-100 mr-6">Project Work: {aiRoadmap.schedule.projectWork}</span>
                    <span className="font-semibold text-blue-100">Community Engagement: {aiRoadmap.schedule.communityEngagement}</span>
                  </div>
                </div>
              )}
              {/* Weekly Goals */}
              {Array.isArray(aiRoadmap.schedule.weeklyGoals) && aiRoadmap.schedule.weeklyGoals.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2 text-white">Weekly Goals</h3>
                  <div className="bg-[#23224a] rounded-xl p-4 border border-blue-400/30 mb-4">
                    <ul className="list-disc list-inside text-blue-100 space-y-1">
                      {aiRoadmap.schedule.weeklyGoals.map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {/* Milestones */}
              {Array.isArray(aiRoadmap.schedule.milestones) && aiRoadmap.schedule.milestones.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Milestones</h3>
                  <div className="bg-[#23224a] rounded-xl p-4 border border-blue-400/30">
                    <ul className="space-y-1 text-blue-100">
                      {aiRoadmap.schedule.milestones.map((milestone, idx) => (
                        <li key={idx}>{milestone}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {/* If no schedule info, show fallback */}
              {!(aiRoadmap.schedule.theoreticalLearning || (Array.isArray(aiRoadmap.schedule.weeklyGoals) && aiRoadmap.schedule.weeklyGoals.length > 0) || (Array.isArray(aiRoadmap.schedule.milestones) && aiRoadmap.schedule.milestones.length > 0)) && (
                <div className="text-center text-blue-200 py-8">No AI-generated roadmap available.</div>
              )}
            </div>
          )}

        </div>

        {/* 2. YouTube Suggestions */}
        <div className="glassmorphism p-6 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold mb-4">Recommended YouTube Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiVideos.length > 0 ? (
              aiVideos.map((vid, idx) => (
                <div key={idx} className="glassmorphism p-4 rounded-2xl flex flex-col gap-2">
                  <div className="rounded-xl overflow-hidden mb-2">
                    <iframe
                      width="100%"
                      height="180"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(vid.url)}`}
                      title={vid.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="text-white text-base font-semibold mb-1">{vid.title}</div>
                </div>
              ))
            ) : (
              <div>No AI video recommendations available.</div>
            )}
          </div>
        </div>

        {/* 3. Practice & Quiz Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={handlePracticeClick}
            className={`px-6 py-2 rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === 'practice' ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-white shadow-lg scale-105' : 'bg-transparent text-white hover:bg-white/10'}`}
          >
            Practice
          </button>
          <button
            onClick={handleReferenceClick}
            className={`px-6 py-2 rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === 'reference' ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-white shadow-lg scale-105' : 'bg-transparent text-white hover:bg-white/10'}`}
          >
            Reference
          </button>
          <button
            onClick={handleQuizSectionClick}
            className={`px-6 py-2 rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === 'quiz' ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-white shadow-lg scale-105' : 'bg-transparent text-white hover:bg-white/10'}`}
          >
            Quiz
          </button>
        </div>

        {/* 4. Main Learning Path Modules (existing feature, still visible) */}
        <div className="glassmorphism p-6 rounded-2xl mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">My Learning Path Modules</h2>
          </div>
          {activeModule ? (
            <div>
              {/* Detailed module view */}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningTracks[selectedTrack].modules.map(module => (
                <div
                  key={module.id}
                  className="glassmorphism p-6 rounded-xl hover:bg-gray-700/50 transition-all cursor-pointer"
                  onClick={() => navigate(`/reading/${module.id}`)} // <-- Updated route
                >
                  <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                  <p className="text-blue-200 text-sm mb-4">{module.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{module.estimatedTime}</span>
                    <span className="capitalize">{module.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Code Challenge Section */}
        <div ref={codeChallengeRef}>
          <div className="lg:col-span-1">
            <div className="glassmorphism p-6 rounded-2xl">
              {/* Documentation/Help Panel */}
              <div className="mb-6 p-4 bg-white/5 rounded-xl">
                <h3 className="text-lg font-bold text-blue-300 mb-2">How to Use the Code Challenge</h3>
                <ul className="list-disc list-inside text-blue-200 text-sm space-y-1">
                  <li>Select your preferred language tab above the editor.</li>
                  <li>Read the problem statement and starter code in the editor.</li>
                  <li>Write your solution in the editor. Test cases are provided below the function.</li>
                  <li>Click <span className="font-bold text-green-400">Run Code</span> to see the output and check your solution.</li>
                  <li>Click <span className="font-bold text-blue-400">Submit Solution</span> to save your answer and track progress.</li>
                  <li>Use <span className="font-bold text-blue-200">Reset Code</span> to restore the starter template.</li>
                </ul>
              </div>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Multi-Language Code Challenge</h3>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  {[
                    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
                    { id: 'java', name: 'Java', color: 'bg-red-500' },
                    { id: 'python', name: 'Python', color: 'bg-blue-500' },
                    { id: 'c', name: 'C', color: 'bg-gray-600' },
                    { id: 'cpp', name: 'C++', color: 'bg-blue-600' }
                  ].map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageTab(lang.id)}
                      className={`px-5 py-2 rounded-md font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                        ${selectedLanguage === lang.id
                          ? 'bg-yellow-400 text-gray-900 shadow-lg'
                          : 'bg-white/10 text-blue-100 hover:bg-white/20'}
                      `}
                      style={selectedLanguage === lang.id ? { boxShadow: '0 2px 8px 0 #0002' } : {}}
                      aria-label={`Switch to ${lang.name} editor`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Code Editor */}
              <div className="bg-[#181f2a] rounded-xl p-6 mb-6 relative shadow-lg" style={{ minHeight: 320 }}>
                {/* Editor header */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">
                      {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Editor
                    </span>
                  </div>
                  <span className="ml-auto text-gray-400 text-xs">
                    Lines: {userCode.split('\n').length}
                  </span>
                </div>
                {/* Editor textarea */}
                <textarea
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  className="w-full h-56 bg-[#181f2a] text-green-400 text-base font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-3"
                  style={{ minHeight: 220 }}
                  spellCheck={false}
                  aria-label="Code editor"
                  placeholder={`// Your ${selectedLanguage} code here`}
                />
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-4">
                <button
                  onClick={handleRunCode}
                  className="flex items-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Run your code and see the output"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Run Code
                </button>
                <button
                  onClick={handleSubmitSolution}
                  className="flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Submit your solution"
                >
                  Submit Solution
                </button>
                <button
                  onClick={() => setUserCode(CompilerService.getCodeTemplate(selectedLanguage))}
                  className="flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 text-blue-100 rounded-lg font-semibold shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
                  aria-label="Reset code to starter template"
                >
                  Reset Code
                </button>
              </div>
              {/* Output Panel */}
              {compileResult && (
                <div className="mt-6">
                  {/* Output Bar */}
                  <div className="p-4 bg-gray-800 rounded-t border-l-4 border-blue-400 flex flex-wrap items-center gap-4">
                    <p className="text-blue-300 text-sm font-semibold mr-4">Output:</p>
                    {compileResult.success ? (
                      <span className="text-green-400 flex items-center gap-1 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" /> Success
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1 text-xs font-semibold">
                        <HelpCircle className="w-4 h-4" /> Error
                      </span>
                    )}
                    <span className="text-blue-200 flex items-center gap-1 text-xs">
                      <Clock className="w-4 h-4" /> {compileResult.executionTime || '0'}ms (approximate)
                    </span>
                    <span className="text-purple-200 flex items-center gap-1 text-xs">
                      <Cpu className="w-4 h-4" /> {compileResult.memory || 'N/A'}
                    </span>
                    <pre className="text-white text-sm ml-auto whitespace-pre-wrap break-words max-w-full">{compileResult.output}</pre>
                    {compileResult.error && (
                      <pre className="text-red-400 text-sm ml-auto whitespace-pre-wrap break-words max-w-full">{compileResult.error}</pre>
                    )}
                  </div>
                  {/* Algorithm Analysis */}
                  <div className="p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-b border border-purple-500/30 mt-0">
                    <div className="flex items-center mb-3">
                      <HelpCircle className="w-5 h-5 text-purple-400 mr-2" />
                      <h4 className="text-white font-semibold">Algorithm Analysis (Estimated)</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm">Time Complexity (guess):</p>
                        <p className="text-orange-400 font-mono text-lg">{compileResult.timeComplexity || 'O(?)'}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Space Complexity (guess):</p>
                        <p className="text-blue-400 font-mono text-lg">{compileResult.spaceComplexity || 'O(?)'}</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">Execution Time:</p>
                        <p className="text-green-400 font-mono">{compileResult.executionTime || '0'}ms (approximate)</p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">CPU Time:</p>
                        <p className="text-cyan-400 font-mono">{compileResult.cpuTime || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6. Quiz Section (conditionally shown) */}
        {showQuiz && (
          <div ref={quizRef} className="glassmorphism p-6 rounded-2xl mt-8">
            <h3 className="text-xl font-bold mb-2">Quiz</h3>
            {/* ...your quiz component here... */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Documentation & References</h4>
              <ul className="list-disc list-inside text-blue-200">
                <li><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">MDN Web Docs</a></li>
                <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React Documentation</a></li>
                {/* ...add more as needed... */}
              </ul>
            </div>
          </div>
        )}

        {showReference && (
          <div className="glassmorphism p-6 rounded-2xl mt-8">
            <h3 className="text-xl font-bold mb-2">Reference</h3>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Documentation & References</h4>
              <ul className="list-disc list-inside text-blue-200">
                <li><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">MDN Web Docs</a></li>
                <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React Documentation</a></li>
                <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">GeeksforGeeks</a></li>
                <li><a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">W3Schools</a></li>
              </ul>
            </div>
          </div>
        )}
        {showQuizSection && (
          <div className="glassmorphism p-6 rounded-2xl mt-8">
            <h3 className="text-xl font-bold mb-2">Quiz: {selectedTrack.replace(/(^|\s)\S/g, l => l.toUpperCase())}</h3>
            <div className="mt-4">
              <form onSubmit={e => { e.preventDefault(); handleQuizSubmit(); }}>
                <ul className="list-decimal list-inside text-blue-200 space-y-6">
                  {(quizQuestions[selectedTrack === 'frontend' ? 'frontend' : selectedTrack === 'backend' ? 'backend' : 'java full stack developer'] || []).map((q, qIdx) => (
                    <li key={qIdx} className="mb-2">
                      <div className="font-semibold text-white mb-2">{q.question}</div>
                      <ul className="list-none ml-4">
                        {q.options.map((opt, optIdx) => (
                          <li key={optIdx} className="mb-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`quiz-q${qIdx}`}
                                value={optIdx}
                                checked={userQuizAnswers[qIdx] === optIdx}
                                onChange={() => handleQuizOptionChange(qIdx, optIdx)}
                                disabled={quizSubmitted}
                              />
                              <span
                                className={
                                  quizSubmitted
                                    ? (optIdx === q.answer
                                        ? 'text-green-400 font-bold'
                                        : userQuizAnswers[qIdx] === optIdx
                                          ? 'text-red-400'
                                          : '')
                                    : ''
                                }
                              >
                                {opt}
                                {quizSubmitted && optIdx === q.answer && ' (Correct)'}
                                {quizSubmitted && userQuizAnswers[qIdx] === optIdx && optIdx !== q.answer && ' (Your answer)'}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                {!quizSubmitted && (
                  <button
                    type="submit"
                    className="mt-6 px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-white shadow-lg transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Submit Quiz
                  </button>
                )}
                {quizSubmitted && (
                  <div className="mt-6 text-lg font-bold text-green-400">Your Score: {quizScore} / {(quizQuestions[selectedTrack === 'frontend' ? 'frontend' : selectedTrack === 'backend' ? 'backend' : 'java full stack developer'] || []).length}</div>
                )}
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Learn;