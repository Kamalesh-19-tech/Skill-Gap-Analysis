import  { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react'; 

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'The Future of AI in Personalized Education',
      excerpt: 'Exploring how artificial intelligence is revolutionizing personalized learning experiences and transforming the way we acquire new skills in the digital age.',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `Artificial Intelligence is fundamentally changing how we approach education and skill development. 
      
      Traditional one-size-fits-all learning models are being replaced by sophisticated AI systems that can adapt to individual learning styles, pace, and preferences. This personalization extends beyond simple content recommendations to include adaptive questioning, real-time difficulty adjustment, and customized learning paths.

      The impact of AI in education includes:
      
      • **Adaptive Learning Systems**: AI can analyze learning patterns and adjust content difficulty in real-time
      • **Intelligent Tutoring**: Virtual tutors that provide personalized guidance and support 24/7
      • **Predictive Analytics**: Identifying potential learning challenges before they become obstacles
      • **Automated Assessment**: Instant feedback and detailed performance analytics
      
      As we move forward, the integration of AI in education will continue to create more engaging, effective, and accessible learning experiences for learners worldwide.`,
      category: 'AI & Technology'
    },
    {
      id: 2,
      title: 'Gamification in Professional Development',
      excerpt: 'Discover how game design principles are being applied to professional learning to increase engagement, motivation, and retention rates among adult learners.',
      date: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `Gamification has emerged as a powerful tool for making professional development more engaging and effective. By incorporating game design elements into learning experiences, organizations can significantly improve learner engagement and knowledge retention.

      Key gamification elements that drive learning success:

      • **Points and Scoring Systems**: Immediate feedback and progress tracking through XP and point systems
      • **Achievements and Badges**: Recognition for completing milestones and mastering skills
      • **Leaderboards and Competition**: Social motivation through friendly competition with peers
      • **Progression Systems**: Clear advancement paths that maintain long-term motivation
      • **Challenges and Quests**: Structured learning activities that feel like meaningful challenges

      Research shows that gamified learning experiences can increase engagement by up to 75% and improve knowledge retention by 40%. The key is implementing gamification thoughtfully, ensuring that game elements support rather than distract from learning objectives.

      Successful gamification in professional development creates intrinsic motivation by making learning feel rewarding, social, and personally meaningful.`,
      category: 'Learning Strategy'
    },
    {
      id: 3,
      title: 'Building Effective Learning Roadmaps',
      excerpt: 'A comprehensive guide to creating structured learning paths that guide professionals from their current skill level to their career goals efficiently.',
      date: '2024-01-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `Creating effective learning roadmaps requires careful planning, clear objectives, and a deep understanding of both current capabilities and target goals. A well-designed roadmap serves as a GPS for professional development, providing clear direction and measurable milestones.

      Essential components of effective learning roadmaps:

      **1. Skills Assessment and Gap Analysis**
      - Comprehensive evaluation of current competencies
      - Identification of skill gaps relative to target roles
      - Prioritization based on impact and career goals

      **2. Learning Path Design**
      - Sequential skill building from foundational to advanced concepts
      - Multiple learning modalities (videos, practice, projects)
      - Interconnected skills that build upon each other

      **3. Milestone and Progress Tracking**
      - Clear checkpoints and assessments
      - Regular progress reviews and adjustments
      - Celebration of achievements to maintain motivation

      **4. Resource Curation**
      - High-quality, relevant learning materials
      - Mix of theoretical knowledge and practical application
      - Updated content that reflects industry standards

      The most effective roadmaps are dynamic, allowing for adjustments based on learner progress, industry changes, and evolving career goals. They balance structure with flexibility, providing clear guidance while accommodating individual learning preferences and pace.`,
      category: 'Career Development'
    },
    {
      id: 4,
      title: 'The Science of Skill Acquisition',
      excerpt: 'Understanding the cognitive processes behind skill development and how to optimize learning strategies for faster and more durable skill acquisition.',
      date: '2024-01-01',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `The science of skill acquisition reveals fascinating insights into how our brains learn, adapt, and master new competencies. Understanding these principles can dramatically improve the efficiency and effectiveness of professional development efforts.

      **The Four Stages of Skill Acquisition:**

      **1. Unconscious Incompetence**
      - Unaware of skill gaps or learning needs
      - Focus on awareness and motivation building
      - Assessment and goal setting are crucial

      **2. Conscious Incompetence** 
      - Aware of skill gaps and committed to learning
      - High motivation but frequent mistakes
      - Structured practice and patience required

      **3. Conscious Competence**
      - Can perform skills with concentrated effort
      - Requires conscious thought and attention
      - Practice leads to increased fluency

      **4. Unconscious Competence**
      - Skills become automatic and intuitive
      - Can teach others and multitask
      - Mastery achieved through sustained practice

      **Optimization Strategies:**

      • **Deliberate Practice**: Focused, goal-oriented practice with immediate feedback
      • **Spaced Repetition**: Distributing practice sessions over time for better retention
      • **Interleaving**: Mixing different skills or concepts in practice sessions
      • **Mental Models**: Building conceptual frameworks that organize knowledge effectively

      Modern learning platforms can leverage these principles through AI-powered personalization, adaptive difficulty, and optimized practice scheduling to accelerate skill development.`,
      category: 'Learning Science'
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
           <div data-aos="zoom-in" className="pt-24 pb-20 px-4 bg-gradient-to-br from-purple-900 via-blue-800 to-cyan-700">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-cyan-300 hover:text-yellow-400 mb-8 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Blog
          </button>
          
          <article className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg border border-cyan-400/20 p-8 rounded-2xl shadow-2xl shadow-cyan-500/20">
            <div className="mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">{article.title}</h1>
            
            <div className="flex items-center text-cyan-300 mb-8 space-x-6">
              <div className="flex items-center bg-blue-800/30 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                {new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
              <div className="flex items-center bg-purple-800/30 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                {article.readTime}
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none"> 
                           {article.content.split('\n').map((paragraph, idx) => {
                if (paragraph.trim() === '') return <br key={idx} />;
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mt-8 mb-6">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                if (paragraph.startsWith('• ')) {
                  return (
                    <li key={idx} className="text-cyan-200 ml-6 mb-3 pl-2 border-l-2 border-cyan-400/50">
                      {paragraph.slice(2)}
                    </li>
                  );
                }
                return (
                  <p key={idx} className="text-cyan-200 mb-6 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                );
              })} 
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
       <div className="pt-24 pb-20 px-4 bg-gradient-to-br from-purple-900 via-blue-800 to-cyan-700 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Learning Insights</h1>
          <p className="text-2xl text-cyan-200">Discover the latest trends and insights in AI-powered education</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <article key={article.id} className={`bg-gradient-to-br ${
              idx % 4 === 0 ? 'from-purple-900/80 to-pink-900/80 border-purple-400/30' :
              idx % 4 === 1 ? 'from-blue-900/80 to-cyan-900/80 border-cyan-400/30' :
              idx % 4 === 2 ? 'from-indigo-900/80 to-purple-900/80 border-indigo-400/30' :
              'from-teal-900/80 to-blue-900/80 border-teal-400/30'
            } backdrop-blur-lg border-2 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-2`}>
              <div className={`h-2 ${
                idx % 4 === 0 ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                idx % 4 === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                idx % 4 === 2 ? 'bg-gradient-to-r from-indigo-400 to-purple-400' :
                'bg-gradient-to-r from-teal-400 to-blue-400'
              }`}></div>
              <div className="p-6"> 
                               <div className="flex items-center justify-between mb-4">
                  <span className={`${
                    idx % 4 === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    idx % 4 === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    idx % 4 === 2 ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                    'bg-gradient-to-r from-teal-500 to-blue-500'
                  } text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {article.category}
                  </span>
                  <div className="flex items-center text-cyan-300 text-sm space-x-4">
                    <div className="flex items-center bg-blue-800/30 px-2 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-1 text-cyan-400" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center bg-purple-800/30 px-2 py-1 rounded-full">
                      <Clock className="w-4 h-4 mr-1 text-purple-400" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-4 line-clamp-2">{article.title}</h2>
                <p className="text-cyan-200 mb-6 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                
                <button
                  onClick={() => setSelectedArticle(article.id)}
                  className={`flex items-center ${
                    idx % 4 === 0 ? 'text-purple-400 hover:text-pink-300' :
                    idx % 4 === 1 ? 'text-cyan-400 hover:text-blue-300' :
                    idx % 4 === 2 ? 'text-indigo-400 hover:text-purple-300' :
                    'text-teal-400 hover:text-blue-300'
                  } font-bold transition-all duration-300 group hover:scale-105`}
                >
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-all duration-300" />
                </button> 
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
 