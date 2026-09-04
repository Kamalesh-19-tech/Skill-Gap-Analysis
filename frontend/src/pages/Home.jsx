import  React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Star, ChevronDown, Play, CheckCircle, Zap, Target, Brain, Rocket } from 'lucide-react'; 

const Home = () => {
  const features = [
    { icon: <Brain className="w-8 h-8" />, title: 'AI Skill Assessment', desc: 'Dynamic evaluation powered by advanced AI algorithms that adapt to your learning style' },
    { icon: <Target className="w-8 h-8" />, title: 'Personalized Roadmaps', desc: 'Custom learning paths tailored to your career goals and current skill level' },
    { icon: <Zap className="w-8 h-8" />, title: 'Gamified Learning', desc: 'Earn XP, unlock achievements, maintain streaks, and compete on leaderboards' },
    { icon: <Rocket className="w-8 h-8" />, title: 'Interactive Mindmaps', desc: 'Visual skill trees with progressive unlocking and detailed learning modules' }
  ]; 

  const howItWorks = [
    { step: '01', title: 'Skills & Role Selection', desc: 'Choose your current skills and target role from our comprehensive database' },
    { step: '02', title: 'AI-Powered Assessment', desc: 'Take adaptive quizzes that adjust difficulty based on your responses' },
    { step: '03', title: 'Personalized Roadmap', desc: 'Receive a custom learning path with interactive mindmaps and resources' },
    { step: '04', title: 'Track Progress', desc: 'Monitor your advancement with XP, achievements, and skill progression' }
  ];

  const faqs = [
    { q: 'How does the AI assessment work?', a: 'Our AI dynamically adjusts question difficulty based on your responses, providing accurate skill level evaluation.' },
    { q: 'Can I change my learning path?', a: 'Yes, you can update your goals and skills anytime to generate new personalized roadmaps.' },
    { q: 'What makes the learning gamified?', a: 'Earn XP points, maintain learning streaks, unlock achievements, and compete on leaderboards.' },
    { q: 'Are the resources free?', a: 'Yes, MellowersAI is completely free with access to all features and learning materials.' }
  ];

   return (
    <div data-aos="fade-right" className="min-h-screen bg-pattern">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-10 floating-animation"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 floating-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 floating-animation"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 parallax">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30 mb-6">
                🚀 Next-Generation Learning Platform
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight">
              <span className="block text-glow">AI-Powered</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 block animate-pulse-slow">
                SkillPath
              </span>
              <span className="block text-4xl lg:text-5xl font-semibold mt-4 text-blue-200">
                Learning Revolution
              </span>
            </h1>
            <p className="text-2xl text-blue-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your career with <span className="text-cyan-400 font-semibold">personalized AI-driven assessments</span>, 
              <span className="text-purple-400 font-semibold"> interactive mindmaps</span>, 
              and <span className="text-green-400 font-semibold">gamified learning experiences</span> designed for ambitious professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/assessment"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-110 hover-lift border-glow"
              >
                <Brain className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Start AI Assessment
              </Link>
              <button className="group inline-flex items-center px-10 py-5 dynamic-glassmorphism text-white rounded-2xl font-bold text-xl hover:bg-white hover:bg-opacity-20 transition-all hover-lift">
                <Play className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform" />
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
              {[
                { number: '10K+', label: 'Active Learners' },
                { number: '50+', label: 'Skill Domains' },
                { number: '95%', label: 'Success Rate' },
                { number: '24/7', label: 'AI Support' }
              ].map((stat, idx) => (
                <div key={idx} className="glassmorphism p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-white text-glow mb-2">{stat.number}</div>
                  <div className="text-blue-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> 

           <div className="section-divider"></div>

       {/* Features Section */}
       <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-lg font-semibold border border-purple-500/30 mb-8">
              ✨ Platform Features
            </span>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 text-glow">Powerful Features</h2>
            <p className="text-2xl text-blue-200 max-w-3xl mx-auto">Everything you need for accelerated skill development and career growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group relative">
                <div className="dynamic-glassmorphism p-10 rounded-3xl text-center hover-lift group-hover:border-glow transition-all h-full">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <div className="text-white group-hover:rotate-12 transition-transform">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity animate-pulse-slow"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-glow transition-all">{feature.title}</h3>
                  <p className="text-blue-200 text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> 

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-blue-200">Your journey to skill mastery in 4 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-blue-200">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glassmorphism rounded-2xl">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                    <ChevronDown className="w-5 h-5 text-accent group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-blue-200">{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glassmorphism p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Skills?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of professionals advancing their careers with AI-powered learning
            </p>
            <Link
              to="/assessment"
              className="btn-accent"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
 