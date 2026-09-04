
// Gemini API setup
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export  class AIRoadmapGenerator {
  static async generatePersonalizedRoadmap(userProfile, targetRole, skillLevel) {
    if (!GEMINI_API_KEY) {
      console.log('Using fallback roadmap - Gemini API key needed for AI generation');
      return this.getFallbackRoadmap(targetRole, skillLevel);
    }
    try {
      const prompt = `Generate a personalized learning roadmap for transitioning to ${targetRole}.

      User Profile:
      - Current Level: ${skillLevel}
      - Target Role: ${targetRole}
      - Skills: ${userProfile.skills?.join(', ') || 'Beginner level'}

      Return ONLY a valid JSON object with this structure:
      {
        "roadmap": {
          "title": "Personalized ${targetRole} Learning Path",
          "totalDuration": "6-8 months",
          "phases": [ ... ],
          "dailySchedule": { ... },
          "weeklyGoals": [ ... ],
          "milestones": [ ... ]
        },
        "videos": [
          { "title": "Video Title 1", "url": "https://youtube.com/..." },
          { "title": "Video Title 2", "url": "https://youtube.com/..." }
        ]
      }

      Also, recommend 3-5 YouTube videos (with title and link) for a beginner ${targetRole}. Return them as a 'videos' array in the JSON.`;
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        const jsonMatch = text && text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            roadmap: parsed.roadmap,
            videos: parsed.videos || []
          };
        }
      }
    } catch (error) {
      console.error('Gemini roadmap generation failed:', error);
    }
    // Fallback to predefined roadmap
    return this.getFallbackRoadmap(targetRole, skillLevel);
  }

  static getFallbackRoadmap(targetRole, skillLevel) {
    const roadmaps = {
      'Java Full Stack Developer': {
        roadmap: {
          title: `Personalized Java Full Stack Developer Path - ${skillLevel} Level`,
          totalDuration: '6-8 months',
          phases: [
            {
              id: 1,
              title: 'Java Foundation',
              duration: '6-8 weeks',
              description: 'Master core Java programming concepts',
              modules: [
                {
                  id: 'java-core',
                  title: 'Core Java Programming',
                  duration: '3 weeks',
                  description: 'Learn Java syntax, OOP principles, and core APIs',
                  topics: ['Variables & Data Types', 'Control Structures', 'OOP Concepts', 'Collections Framework'],
                  resources: [
                    { title: 'Oracle Java Tutorial', url: '#', type: 'documentation' },
                    { title: 'Java Programming Course', url: '#', type: 'course' }
                  ],
                  dailyGoals: {
                    theory: 45,
                    practice: 75,
                    projects: 30
                  }
                },
                {
                  id: 'java-advanced',
                  title: 'Advanced Java Concepts',
                  duration: '3 weeks',
                  description: 'Exception handling, I/O, threading, and design patterns',
                  topics: ['Exception Handling', 'File I/O', 'Multithreading', 'Design Patterns'],
                  resources: [
                    { title: 'Java Concurrency Guide', url: '#', type: 'book' },
                    { title: 'Design Patterns Course', url: '#', type: 'course' }
                  ],
                  dailyGoals: {
                    theory: 40,
                    practice: 80,
                    projects: 40
                  }
                }
              ]
            },
            {
              id: 2,
              title: 'Backend Development',
              duration: '8-10 weeks',
              description: 'Build enterprise applications with Spring',
              modules: [
                {
                  id: 'spring-framework',
                  title: 'Spring Framework Mastery',
                  duration: '4 weeks',
                  description: 'Learn Spring Core, MVC, and Data JPA',
                  topics: ['Dependency Injection', 'Spring MVC', 'Spring Data JPA', 'REST APIs'],
                  resources: [
                    { title: 'Spring Framework Docs', url: '#', type: 'documentation' },
                    { title: 'Spring Boot Course', url: '#', type: 'course' }
                  ],
                  dailyGoals: {
                    theory: 35,
                    practice: 90,
                    projects: 45
                  }
                }
              ]
            }
          ],
          dailySchedule: {
            theoreticalLearning: 45,
            practicalCoding: 90,
            projectWork: 60,
            communityEngagement: 15
          },
          weeklyGoals: [
            'Complete 5 coding challenges',
            'Build 1 mini-project',
            'Participate in community discussions',
            'Review and refactor previous code'
          ],
          milestones: [
            { week: 4, title: 'Java Fundamentals Complete', description: 'Master core Java concepts and OOP principles' },
            { week: 8, title: 'First Backend API', description: 'Build your first REST API with Spring Boot' },
            { week: 16, title: 'Full Stack Application', description: 'Deploy a complete full-stack application' }
          ]
        }
      },
      'Frontend Developer': {
        roadmap: {
          title: `Personalized Frontend Developer Path - ${skillLevel} Level`,
          totalDuration: '4-6 months',
          phases: [
            {
              id: 1,
              title: 'Web Fundamentals',
              duration: '4-6 weeks',
              description: 'Master HTML, CSS, and JavaScript basics',
              modules: [
                {
                  id: 'html-css',
                  title: 'HTML5 & CSS3 Mastery',
                  duration: '2 weeks',
                  description: 'Semantic markup and modern styling',
                  topics: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design'],
                  resources: [
                    { title: 'MDN Web Docs', url: '#', type: 'documentation' },
                    { title: 'CSS Complete Guide', url: '#', type: 'course' }
                  ],
                  dailyGoals: {
                    theory: 30,
                    practice: 90,
                    projects: 60
                  }
                }
              ]
            }
          ],
          dailySchedule: {
            theoreticalLearning: 30,
            practicalCoding: 120,
            projectWork: 90,
            communityEngagement: 20
          },
          weeklyGoals: [
            'Build 2 responsive layouts',
            'Complete JavaScript challenges',
            'Contribute to open source',
            'Share learning progress'
          ],
          milestones: [
            { week: 3, title: 'Responsive Web Pages', description: 'Create mobile-first responsive designs' },
            { week: 6, title: 'Interactive JavaScript', description: 'Build dynamic user interactions' },
            { week: 12, title: 'React Application', description: 'Deploy a complete React application' }
          ]
        }
      }
    };

    return roadmaps[targetRole] || roadmaps['Frontend Developer'];
  }

  static async generateDailyPlan(userProgress, targetRole) {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      date: today,
      tasks: [
        {
          id: 1,
          type: 'theory',
          title: 'Read React Hooks documentation',
          duration: 30,
          completed: false,
          xp: 25
        },
        {
          id: 2,
          type: 'practice',
          title: 'Complete 3 coding challenges',
          duration: 60,
          completed: false,
          xp: 50
        },
        {
          id: 3,
          type: 'project',
          title: 'Add new feature to portfolio',
          duration: 90,
          completed: false,
          xp: 75
        },
        {
          id: 4,
          type: 'community',
          title: 'Answer 2 questions in forum',
          duration: 15,
          completed: false,
          xp: 20
        }
      ],
      totalXP: 170,
      estimatedTime: 195
    };
  }
}
 