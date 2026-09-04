import  React from 'react'; 
import { Users, Target, Award, Brain } from 'lucide-react'; 

const About = () => {
  const agents = [
    { 
      name: 'Profile Agent', 
      desc: 'Analyzes user skills, background, and learning preferences to create detailed learner profiles', 
      icon: <Users className="w-8 h-8" />,
      features: ['Skill Assessment', 'Learning Style Analysis', 'Goal Setting', 'Progress Tracking']
    },
    { 
      name: 'Assessment Agent', 
      desc: 'Creates adaptive quizzes and evaluations that adjust difficulty based on user responses', 
      icon: <Target className="w-8 h-8" />,
      features: ['Dynamic Questions', 'Difficulty Adaptation', 'Real-time Scoring', 'Gap Analysis']
    },
    { 
      name: 'Recommender Agent', 
      desc: 'Generates personalized learning paths with curated content and optimal sequencing', 
      icon: <Brain className="w-8 h-8" />,
      features: ['Custom Roadmaps', 'Content Curation', 'Learning Paths', 'Resource Matching']
    },
    { 
      name: 'Tracker Agent', 
      desc: 'Monitors progress, maintains streaks, and provides achievement-based motivation', 
      icon: <Award className="w-8 h-8" />,
      features: ['Progress Monitoring', 'Achievement System', 'Streak Tracking', 'Performance Analytics']
    }
  ];

  const values = [
    {
      title: 'AI-Powered Personalization',
      desc: 'Every learning experience is tailored to individual needs, skills, and goals using advanced AI algorithms.',
      icon: <Brain className="w-12 h-12 text-blue-400" />
    },
    {
      title: 'Gamified Engagement',
      desc: 'Learning becomes addictive through XP systems, achievements, streaks, and competitive elements.',
      icon: <Award className="w-12 h-12 text-green-400" />
    },
    {
      title: 'Adaptive Assessment',
      desc: 'Dynamic evaluations that adjust to your skill level, providing accurate and meaningful feedback.',
      icon: <Target className="w-12 h-12 text-purple-400" />
    },
    {
      title: 'Community Learning',
      desc: 'Connect with peers, share progress, and learn together in a supportive environment.',
      icon: <Users className="w-12 h-12 text-orange-400" />
    }
  ];

  return (
    <div data-aos="fade-left" className="pt-24 pb-20 px-4">
      <div data-aos="fade-left" className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div data-aos="fade-left" className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About MellowersAI</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing professional development through AI-powered personalized learning experiences. 
            We combine cutting-edge technology with proven educational methodologies to accelerate skill development.
          </p>
        </div>

        {/* Mission Section */}
        <div className="glassmorphism p-12 rounded-2xl mb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-blue-200 leading-relaxed mb-8">
              To democratize access to personalized, high-quality professional development by leveraging AI to understand 
              each learner's unique needs, creating adaptive learning experiences that are engaging, effective, and aligned 
              with career goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
                <div className="text-blue-200">Active Learners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-blue-200">Skill Improvement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-blue-200">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">AI-Powered Learning Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent, idx) => (
              <div key={idx} className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform">
                <div className="flex items-center mb-6">
                  <div className="text-blue-400 mr-4">{agent.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                </div>
                <p className="text-blue-200 mb-6 leading-relaxed">{agent.desc}</p>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                  {agent.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center text-blue-200">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-blue-200">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="glassmorphism p-12 rounded-2xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How MellowersAI Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Skill Assessment</h3>
                    <p className="text-blue-200">Take our AI-powered assessment to evaluate your current skills and identify learning gaps.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Personalized Roadmap</h3>
                    <p className="text-blue-200">Receive a custom learning path with interactive mindmaps, curated content, and clear milestones.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Gamified Learning</h3>
                    <p className="text-blue-200">Earn XP, unlock achievements, maintain streaks, and compete with peers while mastering new skills.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Continuous Improvement</h3>
                    <p className="text-blue-200">Track progress, receive AI-powered insights, and adapt your learning journey based on performance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl">
                <Brain className="w-24 h-24 text-white mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Intelligence</h3>
                <p className="text-blue-100">
                  Our advanced AI algorithms continuously learn from your interactions, 
                  preferences, and progress to provide increasingly personalized experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
 