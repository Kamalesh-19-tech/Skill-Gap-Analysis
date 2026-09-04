import  React, { useState } from 'react';
import { Clock, Book, Award, Target, ChevronRight, ChevronDown, ExternalLink, Play } from 'lucide-react';
import { domainRoadmaps } from '../data/domainRoadmaps';

const DetailedRoadmap = ({ selectedRole }) => {
  const [expandedPhase, setExpandedPhase] = useState(0);
  const [expandedModule, setExpandedModule] = useState(null);
  
  const roadmap = domainRoadmaps[selectedRole];
  
  if (!roadmap) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-2xl font-bold text-white mb-4">Roadmap Coming Soon</h3>
        <p className="text-blue-200">Detailed roadmap for {selectedRole} is being prepared.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Roadmap Header */}
      <div className="dynamic-glassmorphism p-8 rounded-3xl border-glow">
        <div className="flex items-center mb-6">
          <div className={`text-6xl mr-6`}>{roadmap.icon}</div>
          <div>
            <h2 className="text-4xl font-bold text-white text-glow mb-2">{roadmap.name}</h2>
            <p className="text-xl text-blue-200 mb-4">{roadmap.description}</p>
            <div className="flex flex-wrap gap-4">
              <span className={`px-4 py-2 bg-gradient-to-r ${roadmap.color} text-white rounded-xl font-semibold flex items-center`}>
                <Clock className="w-4 h-4 mr-2" />
                {roadmap.estimatedTime}
              </span>
              <span className="px-4 py-2 dynamic-glassmorphism text-blue-300 rounded-xl font-semibold">
                {roadmap.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="dynamic-glassmorphism rounded-3xl overflow-hidden border-glow">
            {/* Phase Header */}
            <button
              onClick={() => setExpandedPhase(expandedPhase === phaseIndex ? -1 : phaseIndex)}
              className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <div className="flex items-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${roadmap.color} rounded-2xl flex items-center justify-center mr-6`}>
                  <span className="text-white font-bold text-xl">{phaseIndex + 1}</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{phase.phase}</h3>
                  <p className="text-blue-300 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {phase.duration}
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-blue-400 transition-transform ${
                expandedPhase === phaseIndex ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Phase Content */}
            {expandedPhase === phaseIndex && (
              <div className="px-8 pb-8 space-y-6">
                {phase.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                    {/* Module Header */}
                    <button
                      onClick={() => setExpandedModule(
                        expandedModule === `${phaseIndex}-${moduleIndex}` ? null : `${phaseIndex}-${moduleIndex}`
                      )}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center">
                        <Book className="w-6 h-6 text-cyan-400 mr-4" />
                        <div className="text-left">
                          <h4 className="text-xl font-bold text-white mb-1">{module.title}</h4>
                          <p className="text-blue-300 text-sm">
                            {module.topics.length} topics • {module.resources.length} resources
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-blue-400 transition-transform ${
                        expandedModule === `${phaseIndex}-${moduleIndex}` ? 'rotate-90' : ''
                      }`} />
                    </button>

                    {/* Module Details */}
                    {expandedModule === `${phaseIndex}-${moduleIndex}` && (
                      <div className="px-6 pb-6 space-y-6">
                        {/* Topics */}
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-green-400" />
                            Learning Topics
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {module.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center p-3 bg-white/5 rounded-xl">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span className="text-blue-200">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <Book className="w-5 h-5 mr-2 text-blue-400" />
                            Learning Resources
                          </h5>
                          <div className="space-y-3">
                            {module.resources.map((resource, resourceIndex) => (
                              <a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group border border-white/5 hover:border-blue-500/30"
                              >
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                                    resource.type === 'documentation' ? 'bg-blue-500/20 text-blue-400' :
                                    resource.type === 'book' ? 'bg-green-500/20 text-green-400' :
                                    resource.type === 'course' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-gray-500/20 text-gray-400'
                                  }`}>
                                    {resource.type === 'documentation' ? '📚' :
                                     resource.type === 'book' ? '📖' :
                                     resource.type === 'course' ? '🎓' : '🔗'}
                                  </div>
                                  <div>
                                    <span className="text-white font-medium">{resource.title}</span>
                                    <div className="text-xs text-blue-300 capitalize">{resource.type}</div>
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        {module.projects && (
                          <div>
                            <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                              <Award className="w-5 h-5 mr-2 text-yellow-400" />
                              Hands-on Projects
                            </h5>
                            <div className="space-y-3">
                              {module.projects.map((project, projectIndex) => (
                                <div key={projectIndex} className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                                  <div className="flex items-center">
                                    <Play className="w-5 h-5 text-yellow-400 mr-3" />
                                    <span className="text-white font-medium">{project}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="dynamic-glassmorphism p-8 rounded-3xl text-center border-glow">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
        <p className="text-blue-200 mb-6">
          Begin with our AI-powered assessment to get personalized recommendations for your {roadmap.name} path.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-8 py-4 bg-gradient-to-r ${roadmap.color} text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105`}>
            Start Assessment
          </button>
          <button className="px-8 py-4 dynamic-glassmorphism text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
            View All Roadmaps
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedRoadmap;
 