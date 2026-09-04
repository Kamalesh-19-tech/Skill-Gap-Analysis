import  React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Heart, Zap, ArrowLeft } from 'lucide-react';

const BossAssessment = () => {
  const { bossId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
   const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userHP, setUserHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [bossData, setBossData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [totalPossibleXP, setTotalPossibleXP] = useState(0); 

  const bosses = {
    'java-master': {
      name: 'The Java Dragon',
      icon: '🐉',
      color: 'from-red-600 to-orange-600',
      hp: 100
    },
    'react-expert': {
      name: 'The React Phoenix', 
      icon: '🔥',
      color: 'from-blue-600 to-purple-600',
      hp: 120
    }
  };

   const bossQuestions = {
    'java-master': [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        xp: 25,
        explanation: "Binary search divides the search space in half each iteration, resulting in O(log n) complexity."
      },
      {
        question: "Which keyword is used to create a class in Java?",
        options: ["function", "class", "create", "new"],
        correct: 1,
        xp: 20,
        explanation: "The 'class' keyword is used to define a class in Java."
      },
      {
        question: "Solve this problem: Find the maximum element in an array efficiently.",
        options: ["Linear search O(n)", "Binary search O(log n)", "Quick select O(n)", "Heap sort O(n log n)"],
        correct: 0,
        xp: 35,
        explanation: "Linear search is the most efficient for finding maximum in unsorted array - single pass O(n)."
      },
      {
        question: "Debug this code: Why does 'String s1 = \"hello\"; String s2 = \"hello\"; s1 == s2' return true?",
        options: ["Strings are primitives", "String interning in pool", "Memory allocation", "Compiler optimization"],
        correct: 1,
        xp: 40,
        explanation: "Java uses string interning - identical string literals are stored in the string pool."
      },
      {
        question: "Design challenge: How would you implement a thread-safe singleton?",
        options: ["Synchronized method", "Double-checked locking", "Enum singleton", "All of the above"],
        correct: 3,
        xp: 50,
        explanation: "All approaches work: synchronized methods, double-checked locking, and enum singletons are all thread-safe."
      },
      {
        question: "Performance puzzle: Which is faster for string concatenation?",
        options: ["String +", "StringBuilder", "StringBuffer", "String.concat()"],
        correct: 1,
        xp: 30,
        explanation: "StringBuilder is fastest for multiple concatenations as it's mutable and not synchronized."
      },
      {
        question: "Algorithm challenge: Implement bubble sort's time complexity.",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 2,
        xp: 25,
        explanation: "Bubble sort has O(n²) time complexity due to nested loops comparing adjacent elements."
      },
      {
        question: "Memory management: What happens when you run out of heap space?",
        options: ["StackOverflowError", "OutOfMemoryError", "NullPointerException", "IllegalStateException"],
        correct: 1,
        xp: 35,
        explanation: "OutOfMemoryError is thrown when the JVM cannot allocate more heap memory."
      },
      {
        question: "Concurrency challenge: What's the difference between wait() and sleep()?",
        options: ["No difference", "wait() releases monitor, sleep() doesn't", "sleep() is faster", "wait() is deprecated"],
        correct: 1,
        xp: 45,
        explanation: "wait() releases the object monitor allowing other threads to acquire it, sleep() keeps the monitor."
      },
      {
        question: "Advanced problem: Design a custom exception handling strategy.",
        options: ["Catch all exceptions", "Specific exception handling", "Try-with-resources", "All approaches combined"],
        correct: 3,
        xp: 55,
        explanation: "Best practice combines specific handling, try-with-resources for cleanup, and strategic catching."
      }
    ],
    'react-expert': [
      {
        question: "Performance optimization: How do you prevent unnecessary re-renders?",
        options: ["React.memo", "useCallback", "useMemo", "All of the above"],
        correct: 3,
        xp: 40,
        explanation: "All three techniques help: React.memo for components, useCallback for functions, useMemo for values."
      },
      {
        question: "Debug this: Why is my useEffect running infinitely?",
        options: ["Missing dependency", "Object in dependency array", "Function in dependency array", "All possible causes"],
        correct: 3,
        xp: 35,
        explanation: "All can cause infinite loops: missing deps, object/function references changing on each render."
      },
      {
        question: "Architecture challenge: How would you share state between distant components?",
        options: ["Props drilling", "Context API", "Redux/Zustand", "Context or state management"],
        correct: 3,
        xp: 45,
        explanation: "Both Context API and state management libraries are valid solutions for distant component communication."
      },
      {
        question: "Custom hook problem: Create a hook that tracks window size.",
        options: ["useState only", "useEffect + useState", "useLayoutEffect + useState", "useRef + useEffect"],
        correct: 2,
        xp: 50,
        explanation: "useLayoutEffect + useState ensures measurements happen before browser paint, preventing flicker."
      },
      {
        question: "Rendering puzzle: What's the difference between controlled and uncontrolled components?",
        options: ["Performance difference", "State management approach", "Validation method", "Event handling"],
        correct: 1,
        xp: 30,
        explanation: "Controlled components have React manage state, uncontrolled use DOM refs for form values."
      },
      {
        question: "Error boundary challenge: How do you catch async errors in React?",
        options: ["Error boundaries catch all", "Try-catch in useEffect", "Error boundaries + promise catching", "Not possible"],
        correct: 2,
        xp: 55,
        explanation: "Error boundaries don't catch async errors - need try-catch in effects plus error boundaries."
      },
      {
        question: "Optimization problem: When should you use useCallback?",
        options: ["Always", "Never", "When passing functions to memoized components", "For all event handlers"],
        correct: 2,
        xp: 40,
        explanation: "useCallback is most beneficial when passing functions to memoized child components."
      },
      {
        question: "State management: How do you handle complex state logic?",
        options: ["Multiple useState", "useReducer", "Custom hooks", "useReducer or custom hooks"],
        correct: 3,
        xp: 35,
        explanation: "useReducer handles complex state transitions, custom hooks can encapsulate state logic."
      },
      {
        question: "Testing challenge: How do you test custom hooks?",
        options: ["Mount in component", "React Testing Library", "@testing-library/react-hooks", "Jest only"],
        correct: 2,
        xp: 45,
        explanation: "@testing-library/react-hooks (now in RTL) provides renderHook for testing hooks in isolation."
      },
      {
        question: "Advanced pattern: Implement a compound component pattern.",
        options: ["Props drilling", "Context + children", "Render props", "Higher-order components"],
        correct: 1,
        xp: 60,
        explanation: "Compound components use Context to share state between parent and children implicitly."
      }
    ]
  }; 

   useEffect(() => {
    const boss = bossId || searchParams.get('boss');
    if (boss && bosses[boss] && bossQuestions[boss]) {
      setBossData(bosses[boss]);
      setBossHP(bosses[boss].hp);
      const questionsForBoss = bossQuestions[boss];
      setQuestions(questionsForBoss);
      const totalXP = questionsForBoss.reduce((sum, q) => sum + q.xp, 0);
      setTotalPossibleXP(totalXP);
    }
  }, [bossId, searchParams]); 

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

   const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    const currentQuestionData = questions[currentQuestion];
    
    setTimeout(() => {
      if (isCorrect) {
        // Award XP for correct answer
        const xpGained = currentQuestionData.xp;
        setEarnedXP(prev => prev + xpGained);
        
        // Deal damage to boss
        const baseDamage = Math.floor(Math.random() * 20) + 15;
        const xpMultiplier = 1 + (xpGained / 100); // Higher XP questions deal more damage
        const damage = Math.floor(baseDamage * xpMultiplier);
        
        setBossHP(prev => {
          const newHP = Math.max(0, prev - damage);
          if (newHP <= 0) {
            setVictory(true);
            setGameOver(true);
          }
          return newHP;
        });
      } else {
        const damage = Math.floor(Math.random() * 15) + 10;
        setUserHP(prev => {
          const newHP = Math.max(0, prev - damage);
          if (newHP <= 0) {
            setGameOver(true);
          }
          return newHP;
        });
      }
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1 && !gameOver) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
        } else if (!gameOver) {
          setGameOver(true);
          setVictory(bossHP <= 0);
        }
      }, 1000);
    }, 1000);
  }; 

  if (!bossData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Boss not found</div>
      </div>
    );
  }

   if (gameOver) {
    const xpPercentage = Math.round((earnedXP / totalPossibleXP) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">{victory ? '🏆' : '💀'}</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {victory ? 'Victory!' : 'Defeat!'}
          </h2>
          <p className="text-blue-200 mb-6">
            {victory 
              ? `You have defeated ${bossData.name}! Your coding skills are legendary!`
              : `${bossData.name} has defeated you. Train harder and return stronger!`
            }
          </p>
          
          {/* XP Rewards */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">XP Earned</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {earnedXP} / {totalPossibleXP} XP
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <div className="text-sm text-gray-300 mt-1">{xpPercentage}% Performance</div>
          </div>

          {/* Boss Challenge Stats */}
          <div className="text-sm text-blue-300 mb-6 space-y-1">
            <p>Questions Answered: {currentQuestion + 1} / {questions.length}</p>
            <p>Correct Answers: {Math.floor(earnedXP / (totalPossibleXP / questions.length))}</p>
            <p>Time Remaining: {formatTime(timeLeft)}</p>
          </div>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      {/* Header with HP bars and timer */}
           <div className="max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-4 gap-4 items-center">
          {/* User HP */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Your HP</span>
              <span className="text-green-400 font-bold">{userHP}/100</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${userHP}%` }}
              />
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">XP Earned</span>
              <span className="text-yellow-400 font-bold">{earnedXP}/{totalPossibleXP}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${totalPossibleXP > 0 ? (earnedXP / totalPossibleXP) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
            </div>
          </div>

          {/* Boss HP */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">{bossData.name}</span>
              <span className="text-red-400 font-bold">{bossHP}/{bossData.hp}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(bossHP / bossData.hp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div> 

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Panel */}
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6">
                   <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm">
                  {questions[currentQuestion]?.xp} XP
                </span>
              </div>
            </div>
            <p className="text-blue-200 text-lg leading-relaxed">
              {questions[currentQuestion]?.question}
            </p>
          </div> 

          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  selectedAnswer === null
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white'
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : index === questions[currentQuestion].correct
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700/30 text-gray-400'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retreat</span>
          </button>
        </div>

        {/* Boss Panel */}
        <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 text-center">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${bossData.color} flex items-center justify-center text-6xl mx-auto mb-6 shadow-2xl`}>
            {bossData.icon}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">{bossData.name}</h2>
          <p className="text-blue-200 mb-8">
            The boss awaits your attack. Complete the challenges to deal damage!
          </p>

          <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl mb-6 flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Attack!</span>
          </button>

                   <div className="text-left text-sm text-blue-300 space-y-1">
            <p>• Higher XP questions deal more damage</p>
            <p>• Correct answers earn XP and damage boss</p>
            <p>• Wrong answers damage your HP</p>
            <p>• Defeat the boss before time runs out!</p>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default BossAssessment;
 