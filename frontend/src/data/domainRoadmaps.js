export  const domainRoadmaps = { 
   'QA Engineer': {
    name: 'QA Engineer',
    icon: '🧪',
    color: 'from-green-500 to-emerald-500',
    title: 'QA Engineer Career Path', 
    description: 'Master testing methodologies, automation frameworks, and quality assurance practices',
    totalDuration: '4-6 months',
    phases: [
      {
        id: 1,
        title: 'Testing Fundamentals',
        duration: '4-6 weeks',
        description: 'Learn core testing concepts and methodologies',
        modules: [
          {
            id: 'testing-basics',
            title: 'Testing Basics & SDLC',
            duration: '1 week',
            description: 'Understand software testing principles and lifecycle',
            topics: ['SDLC Models', 'Test Planning', 'Test Design', 'Test Execution'],
            resources: [
              { title: 'ISTQB Foundation Level', url: '#', type: 'certification' },
              { title: 'Software Testing Fundamentals', url: '#', type: 'course' }
            ]
          },
          {
            id: 'manual-testing',
            title: 'Manual Testing Techniques',
            duration: '2 weeks',
            description: 'Master manual testing approaches and techniques',
            topics: ['Black Box Testing', 'White Box Testing', 'Test Case Design', 'Bug Reporting'],
            resources: [
              { title: 'Manual Testing Course', url: '#', type: 'course' },
              { title: 'Test Case Writing Best Practices', url: '#', type: 'article' }
            ]
          },
          {
            id: 'test-management',
            title: 'Test Management Tools',
            duration: '1 week',
            description: 'Learn to use test management and bug tracking tools',
            topics: ['JIRA', 'TestRail', 'Zephyr', 'Test Metrics'],
            resources: [
              { title: 'JIRA for Testers', url: '#', type: 'course' },
              { title: 'Test Management Tools Comparison', url: '#', type: 'article' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Automation Testing',
        duration: '6-8 weeks',
        description: 'Build expertise in test automation frameworks and tools',
        modules: [
          {
            id: 'java-basics',
            title: 'Java for Testers',
            duration: '2 weeks',
            description: 'Learn Java programming essentials for test automation',
            topics: ['Java Syntax', 'OOP Concepts', 'Collections', 'Exception Handling'],
            resources: [
              { title: 'Java Programming for Testers', url: '#', type: 'course' },
              { title: 'Java Fundamentals', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'selenium-webdriver',
            title: 'Selenium WebDriver',
            duration: '3 weeks',
            description: 'Master web automation using Selenium WebDriver',
            topics: ['WebDriver API', 'Element Locators', 'Page Object Model', 'Waits & Synchronization'],
            resources: [
              { title: 'Selenium WebDriver with Java', url: '#', type: 'course' },
              { title: 'Selenium Documentation', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'test-frameworks',
            title: 'Testing Frameworks',
            duration: '2 weeks',
            description: 'Learn TestNG and Maven for test organization',
            topics: ['TestNG Annotations', 'Test Suites', 'Maven Project Structure', 'Reporting'],
            resources: [
              { title: 'TestNG Complete Tutorial', url: '#', type: 'course' },
              { title: 'Maven Build Tool', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'advanced-selenium',
            title: 'Advanced Selenium',
            duration: '1 week',
            description: 'Advanced Selenium concepts and best practices',
            topics: ['Cross-browser Testing', 'Parallel Execution', 'Grid Setup', 'CI/CD Integration'],
            resources: [
              { title: 'Advanced Selenium Techniques', url: '#', type: 'course' },
              { title: 'Selenium Grid Setup', url: '#', type: 'tutorial' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'API & Performance Testing',
        duration: '4-5 weeks',
        description: 'Learn API testing and performance testing methodologies',
        modules: [
          {
            id: 'api-testing',
            title: 'REST API Testing',
            duration: '2 weeks',
            description: 'Master API testing with REST Assured and Postman',
            topics: ['REST Concepts', 'Postman Testing', 'REST Assured', 'API Automation'],
            resources: [
              { title: 'API Testing with REST Assured', url: '#', type: 'course' },
              { title: 'Postman Complete Guide', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'database-testing',
            title: 'Database Testing',
            duration: '1 week',
            description: 'Learn database testing techniques and SQL',
            topics: ['SQL Queries', 'Data Validation', 'Database Connectivity', 'Test Data Management'],
            resources: [
              { title: 'SQL for Testers', url: '#', type: 'course' },
              { title: 'Database Testing Guide', url: '#', type: 'article' }
            ]
          },
          {
            id: 'performance-testing',
            title: 'Performance Testing',
            duration: '2 weeks',
            description: 'Introduction to performance testing with JMeter',
            topics: ['Performance Concepts', 'JMeter Scripting', 'Load Testing', 'Performance Analysis'],
            resources: [
              { title: 'JMeter Performance Testing', url: '#', type: 'course' },
              { title: 'Performance Testing Best Practices', url: '#', type: 'article' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Advanced QA Practices',
        duration: '3-4 weeks',
        description: 'Advanced testing practices and career development',
        modules: [
          {
            id: 'mobile-testing',
            title: 'Mobile Testing',
            duration: '1 week',
            description: 'Learn mobile application testing approaches',
            topics: ['Mobile Testing Types', 'Appium Basics', 'Device Testing', 'Mobile-specific Challenges'],
            resources: [
              { title: 'Mobile Testing Fundamentals', url: '#', type: 'course' },
              { title: 'Appium Tutorial', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'security-testing',
            title: 'Security Testing Basics',
            duration: '1 week',
            description: 'Introduction to security testing concepts',
            topics: ['Security Vulnerabilities', 'OWASP Top 10', 'Security Testing Tools', 'Best Practices'],
            resources: [
              { title: 'Security Testing Introduction', url: '#', type: 'course' },
              { title: 'OWASP Testing Guide', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'ci-cd-testing',
            title: 'CI/CD & DevOps for QA',
            duration: '1 week',
            description: 'Integration of testing in CI/CD pipelines',
            topics: ['Jenkins Integration', 'Docker for Testing', 'Test Pipeline Setup', 'Reporting Integration'],
            resources: [
              { title: 'Jenkins for QA', url: '#', type: 'course' },
              { title: 'Docker Testing Environment', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'career-development',
            title: 'QA Career Growth',
            duration: '1 week',
            description: 'Career paths and professional development in QA',
            topics: ['QA Career Paths', 'Certifications', 'Interview Preparation', 'Industry Trends'],
            resources: [
              { title: 'QA Career Guide', url: '#', type: 'article' },
              { title: 'ISTQB Certification Path', url: '#', type: 'certification' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['Basic computer skills', 'Understanding of software applications'],
    careerOutcomes: [
      'Manual Test Engineer',
      'Automation Test Engineer',
      'QA Analyst',
      'Test Lead',
      'QA Manager'
    ],
    averageSalary: '$65,000 - $95,000',
    jobGrowth: '25% (Much faster than average)'
  },

   'Java Full Stack Developer': {
    name: 'Java Full Stack',
    icon: '☕',
    color: 'from-orange-500 to-red-500',
    title: 'Java Full Stack Developer Path', 
    description: 'Complete full-stack development with Java backend and modern frontend technologies',
    totalDuration: '6-8 months',
    phases: [
      {
        id: 1,
        title: 'Java Fundamentals',
        duration: '6-8 weeks',
        description: 'Master core Java programming concepts',
        modules: [
          {
            id: 'java-basics',
            title: 'Java Core Concepts',
            duration: '3 weeks',
            description: 'Learn Java syntax, OOP principles, and core APIs',
            topics: ['Variables & Data Types', 'Control Structures', 'OOP Principles', 'Collections Framework'],
            resources: [
              { title: 'Oracle Java Tutorial', url: '#', type: 'documentation' },
              { title: 'Java Programming Masterclass', url: '#', type: 'course' }
            ]
          },
          {
            id: 'advanced-java',
            title: 'Advanced Java',
            duration: '3 weeks',
            description: 'Exception handling, I/O, threading, and design patterns',
            topics: ['Exception Handling', 'File I/O', 'Multithreading', 'Design Patterns'],
            resources: [
              { title: 'Java Concurrency in Practice', url: '#', type: 'book' },
              { title: 'Java Design Patterns', url: '#', type: 'course' }
            ]
          },
          {
            id: 'java-8-features',
            title: 'Modern Java Features',
            duration: '2 weeks',
            description: 'Java 8+ features including streams, lambdas, and functional programming',
            topics: ['Lambda Expressions', 'Stream API', 'Optional Class', 'Method References'],
            resources: [
              { title: 'Java 8 New Features', url: '#', type: 'course' },
              { title: 'Functional Programming in Java', url: '#', type: 'tutorial' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Backend Development',
        duration: '8-10 weeks',
        description: 'Build robust backend applications with Spring ecosystem',
        modules: [
          {
            id: 'spring-framework',
            title: 'Spring Framework',
            duration: '3 weeks',
            description: 'Learn dependency injection and Spring core concepts',
            topics: ['Dependency Injection', 'Spring Container', 'Aspect-Oriented Programming', 'Spring Configuration'],
            resources: [
              { title: 'Spring Framework Documentation', url: '#', type: 'documentation' },
              { title: 'Spring Core Deep Dive', url: '#', type: 'course' }
            ]
          },
          {
            id: 'spring-boot',
            title: 'Spring Boot',
            duration: '3 weeks',
            description: 'Rapid application development with Spring Boot',
            topics: ['Auto-configuration', 'Spring Boot Starters', 'Actuator', 'Configuration Properties'],
            resources: [
              { title: 'Spring Boot Reference Guide', url: '#', type: 'documentation' },
              { title: 'Spring Boot Masterclass', url: '#', type: 'course' }
            ]
          },
          {
            id: 'spring-data-jpa',
            title: 'Spring Data JPA',
            duration: '2 weeks',
            description: 'Database operations with Spring Data JPA',
            topics: ['JPA Entities', 'Repository Pattern', 'Query Methods', 'Database Relationships'],
            resources: [
              { title: 'Spring Data JPA Guide', url: '#', type: 'documentation' },
              { title: 'JPA and Hibernate Tutorial', url: '#', type: 'course' }
            ]
          },
          {
            id: 'rest-apis',
            title: 'RESTful Web Services',
            duration: '2 weeks',
            description: 'Design and implement REST APIs',
            topics: ['REST Principles', 'HTTP Methods', 'Status Codes', 'API Documentation'],
            resources: [
              { title: 'RESTful Web Services with Spring', url: '#', type: 'course' },
              { title: 'API Design Best Practices', url: '#', type: 'article' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Frontend Development',
        duration: '6-8 weeks',
        description: 'Modern frontend development with React and TypeScript',
        modules: [
          {
            id: 'html-css-js',
            title: 'Frontend Fundamentals',
            duration: '2 weeks',
            description: 'HTML5, CSS3, and modern JavaScript',
            topics: ['Semantic HTML', 'CSS Grid & Flexbox', 'ES6+ Features', 'DOM Manipulation'],
            resources: [
              { title: 'MDN Web Docs', url: '#', type: 'documentation' },
              { title: 'Modern JavaScript Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'react-fundamentals',
            title: 'React Fundamentals',
            duration: '3 weeks',
            description: 'Component-based UI development with React',
            topics: ['JSX', 'Components', 'Props & State', 'Event Handling', 'Hooks'],
            resources: [
              { title: 'React Official Tutorial', url: '#', type: 'documentation' },
              { title: 'Complete React Developer Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'typescript',
            title: 'TypeScript',
            duration: '2 weeks',
            description: 'Type-safe JavaScript development',
            topics: ['Type Annotations', 'Interfaces', 'Generics', 'Advanced Types'],
            resources: [
              { title: 'TypeScript Handbook', url: '#', type: 'documentation' },
              { title: 'TypeScript Masterclass', url: '#', type: 'course' }
            ]
          },
          {
            id: 'state-management',
            title: 'State Management',
            duration: '1 week',
            description: 'Managing application state with Context API or Redux',
            topics: ['Context API', 'Redux Toolkit', 'State Design Patterns', 'Performance Optimization'],
            resources: [
              { title: 'Redux Toolkit Tutorial', url: '#', type: 'tutorial' },
              { title: 'React State Management', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Full Stack Integration',
        duration: '4-5 weeks',
        description: 'Integrate frontend and backend, deployment, and best practices',
        modules: [
          {
            id: 'api-integration',
            title: 'Frontend-Backend Integration',
            duration: '2 weeks',
            description: 'Connect React frontend with Spring Boot backend',
            topics: ['HTTP Client Libraries', 'Authentication', 'Error Handling', 'Loading States'],
            resources: [
              { title: 'Full Stack Integration Guide', url: '#', type: 'tutorial' },
              { title: 'Axios and Fetch API', url: '#', type: 'course' }
            ]
          },
          {
            id: 'testing',
            title: 'Testing Strategies',
            duration: '1 week',
            description: 'Unit testing, integration testing, and E2E testing',
            topics: ['JUnit', 'Mockito', 'Jest', 'React Testing Library'],
            resources: [
              { title: 'Java Testing with JUnit', url: '#', type: 'course' },
              { title: 'React Testing Best Practices', url: '#', type: 'article' }
            ]
          },
          {
            id: 'deployment',
            title: 'Deployment & DevOps',
            duration: '1 week',
            description: 'Deploy applications to cloud platforms',
            topics: ['Docker', 'CI/CD Pipelines', 'Cloud Deployment', 'Monitoring'],
            resources: [
              { title: 'Docker for Java Developers', url: '#', type: 'course' },
              { title: 'AWS Deployment Guide', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'security',
            title: 'Security Best Practices',
            duration: '1 week',
            description: 'Implement security in full-stack applications',
            topics: ['Spring Security', 'JWT Authentication', 'CORS', 'Input Validation'],
            resources: [
              { title: 'Spring Security Tutorial', url: '#', type: 'course' },
              { title: 'Web Security Fundamentals', url: '#', type: 'article' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['Basic programming knowledge', 'Understanding of web technologies'],
    careerOutcomes: [
      'Full Stack Java Developer',
      'Backend Java Developer',
      'Senior Software Engineer',
      'Technical Lead',
      'Software Architect'
    ],
    averageSalary: '$85,000 - $130,000',
    jobGrowth: '22% (Much faster than average)'
  },

   'Frontend Developer': {
    name: 'Frontend Dev',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500', 
    title: 'Frontend Developer Career Path', 
    description: 'Modern frontend development with React, TypeScript, and cutting-edge tools',
    totalDuration: '4-5 months',
    phases: [
      {
        id: 1,
        title: 'Web Fundamentals',
        duration: '4-5 weeks',
        description: 'Master HTML, CSS, and JavaScript foundations',
        modules: [
          {
            id: 'html-css',
            title: 'HTML5 & CSS3',
            duration: '2 weeks',
            description: 'Semantic markup and modern styling techniques',
            topics: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design', 'CSS Variables'],
            resources: [
              { title: 'MDN HTML Guide', url: '#', type: 'documentation' },
              { title: 'CSS Complete Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'javascript-fundamentals',
            title: 'JavaScript Fundamentals',
            duration: '3 weeks',
            description: 'Core JavaScript concepts and ES6+ features',
            topics: ['Variables & Functions', 'Objects & Arrays', 'DOM Manipulation', 'Events', 'Async Programming'],
            resources: [
              { title: 'JavaScript.info', url: '#', type: 'tutorial' },
              { title: 'Modern JavaScript Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Modern JavaScript & Tools',
        duration: '5-6 weeks',
        description: 'Advanced JavaScript and development tools',
        modules: [
          {
            id: 'advanced-javascript',
            title: 'Advanced JavaScript',
            duration: '2 weeks',
            description: 'Advanced concepts and patterns',
            topics: ['Closures', 'Prototypes', 'Modules', 'Design Patterns', 'Functional Programming'],
            resources: [
              { title: 'You Dont Know JS', url: '#', type: 'book' },
              { title: 'Advanced JavaScript Concepts', url: '#', type: 'course' }
            ]
          },
          {
            id: 'typescript',
            title: 'TypeScript',
            duration: '2 weeks',
            description: 'Type-safe JavaScript development',
            topics: ['Type System', 'Interfaces', 'Generics', 'Advanced Types', 'Configuration'],
            resources: [
              { title: 'TypeScript Official Docs', url: '#', type: 'documentation' },
              { title: 'TypeScript Complete Guide', url: '#', type: 'course' }
            ]
          },
          {
            id: 'build-tools',
            title: 'Build Tools & Package Managers',
            duration: '1 week',
            description: 'Modern development workflow tools',
            topics: ['npm/yarn', 'Webpack', 'Vite', 'ESLint', 'Prettier'],
            resources: [
              { title: 'Webpack Guide', url: '#', type: 'documentation' },
              { title: 'Modern Build Tools', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'version-control',
            title: 'Git & GitHub',
            duration: '1 week',
            description: 'Version control and collaboration',
            topics: ['Git Basics', 'Branching', 'Merging', 'GitHub Workflow', 'Pull Requests'],
            resources: [
              { title: 'Pro Git Book', url: '#', type: 'book' },
              { title: 'Git Complete Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'React Development',
        duration: '6-7 weeks',
        description: 'Component-based UI development with React ecosystem',
        modules: [
          {
            id: 'react-fundamentals',
            title: 'React Fundamentals',
            duration: '3 weeks',
            description: 'Core React concepts and patterns',
            topics: ['Components', 'JSX', 'Props & State', 'Event Handling', 'Lifecycle Methods'],
            resources: [
              { title: 'React Official Tutorial', url: '#', type: 'documentation' },
              { title: 'React - The Complete Guide', url: '#', type: 'course' }
            ]
          },
          {
            id: 'react-hooks',
            title: 'React Hooks',
            duration: '2 weeks',
            description: 'Modern React development with hooks',
            topics: ['useState', 'useEffect', 'useContext', 'Custom Hooks', 'Performance Hooks'],
            resources: [
              { title: 'React Hooks Documentation', url: '#', type: 'documentation' },
              { title: 'React Hooks Masterclass', url: '#', type: 'course' }
            ]
          },
          {
            id: 'react-router',
            title: 'React Router',
            duration: '1 week',
            description: 'Client-side routing in React applications',
            topics: ['Route Configuration', 'Navigation', 'Route Parameters', 'Protected Routes'],
            resources: [
              { title: 'React Router Tutorial', url: '#', type: 'tutorial' },
              { title: 'React Router v6 Guide', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'state-management',
            title: 'State Management',
            duration: '1 week',
            description: 'Managing complex application state',
            topics: ['Context API', 'Redux Toolkit', 'Zustand', 'State Patterns'],
            resources: [
              { title: 'Redux Toolkit Tutorial', url: '#', type: 'tutorial' },
              { title: 'State Management Patterns', url: '#', type: 'article' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Professional Frontend Development',
        duration: '4-5 weeks',
        description: 'Testing, performance, and production-ready applications',
        modules: [
          {
            id: 'testing',
            title: 'Frontend Testing',
            duration: '2 weeks',
            description: 'Unit, integration, and E2E testing strategies',
            topics: ['Jest', 'React Testing Library', 'Cypress', 'Test-Driven Development'],
            resources: [
              { title: 'React Testing Guide', url: '#', type: 'tutorial' },
              { title: 'Complete Testing Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'performance',
            title: 'Performance Optimization',
            duration: '1 week',
            description: 'Optimize React applications for production',
            topics: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Bundle Analysis'],
            resources: [
              { title: 'React Performance Guide', url: '#', type: 'documentation' },
              { title: 'Web Performance Optimization', url: '#', type: 'course' }
            ]
          },
          {
            id: 'deployment',
            title: 'Deployment & CI/CD',
            duration: '1 week',
            description: 'Deploy and maintain frontend applications',
            topics: ['Netlify', 'Vercel', 'GitHub Actions', 'Environment Variables'],
            resources: [
              { title: 'Frontend Deployment Guide', url: '#', type: 'tutorial' },
              { title: 'CI/CD for Frontend', url: '#', type: 'course' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['Basic computer literacy', 'Problem-solving mindset'],
    careerOutcomes: [
      'Frontend Developer',
      'React Developer',
      'UI Developer',
      'Senior Frontend Engineer',
      'Frontend Team Lead'
    ],
    averageSalary: '$70,000 - $120,000',
    jobGrowth: '13% (Faster than average)'
  },

   'Backend Developer': {
    name: 'Backend Dev',
    icon: '⚙️',
    color: 'from-purple-500 to-indigo-500',
    title: 'Backend Developer Career Path', 
    description: 'Server-side development with Node.js, databases, and cloud services',
    totalDuration: '5-6 months',
    phases: [
      {
        id: 1,
        title: 'Backend Fundamentals',
        duration: '4-5 weeks',
        description: 'Core backend concepts and technologies',
        modules: [
          {
            id: 'server-concepts',
            title: 'Server & Web Concepts',
            duration: '1 week',
            description: 'Understanding client-server architecture',
            topics: ['HTTP Protocol', 'REST Architecture', 'Client-Server Model', 'Web Security Basics'],
            resources: [
              { title: 'HTTP Protocol Guide', url: '#', type: 'documentation' },
              { title: 'Web Architecture Basics', url: '#', type: 'course' }
            ]
          },
          {
            id: 'nodejs-fundamentals',
            title: 'Node.js Fundamentals',
            duration: '3 weeks',
            description: 'Server-side JavaScript development',
            topics: ['Node.js Runtime', 'NPM', 'Modules', 'File System', 'Event Loop'],
            resources: [
              { title: 'Node.js Official Docs', url: '#', type: 'documentation' },
              { title: 'Complete Node.js Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Web Framework & APIs',
        duration: '6-7 weeks',
        description: 'Build web applications and APIs with Express.js',
        modules: [
          {
            id: 'express-fundamentals',
            title: 'Express.js Framework',
            duration: '3 weeks',
            description: 'Web application framework for Node.js',
            topics: ['Routing', 'Middleware', 'Request/Response', 'Error Handling', 'Static Files'],
            resources: [
              { title: 'Express.js Guide', url: '#', type: 'documentation' },
              { title: 'Express.js Masterclass', url: '#', type: 'course' }
            ]
          },
          {
            id: 'rest-api-design',
            title: 'RESTful API Design',
            duration: '2 weeks',
            description: 'Design and implement REST APIs',
            topics: ['REST Principles', 'HTTP Methods', 'Status Codes', 'API Versioning', 'Documentation'],
            resources: [
              { title: 'REST API Design Guide', url: '#', type: 'article' },
              { title: 'API Development Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'authentication',
            title: 'Authentication & Authorization',
            duration: '2 weeks',
            description: 'Implement secure user authentication',
            topics: ['JWT Tokens', 'Session Management', 'OAuth', 'Password Hashing', 'Role-based Access'],
            resources: [
              { title: 'JWT Authentication Guide', url: '#', type: 'tutorial' },
              { title: 'Web Security Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Database Management',
        duration: '5-6 weeks',
        description: 'Work with SQL and NoSQL databases',
        modules: [
          {
            id: 'sql-databases',
            title: 'SQL Databases',
            duration: '3 weeks',
            description: 'Relational database design and operations',
            topics: ['SQL Queries', 'Database Design', 'Relationships', 'Indexing', 'Transactions'],
            resources: [
              { title: 'PostgreSQL Tutorial', url: '#', type: 'tutorial' },
              { title: 'SQL Complete Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'nosql-databases',
            title: 'NoSQL Databases',
            duration: '2 weeks',
            description: 'Document and key-value databases',
            topics: ['MongoDB', 'Document Design', 'Queries', 'Aggregation', 'Performance'],
            resources: [
              { title: 'MongoDB University', url: '#', type: 'course' },
              { title: 'NoSQL Database Guide', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'orm-odm',
            title: 'ORM/ODM Tools',
            duration: '1 week',
            description: 'Database abstraction layers',
            topics: ['Sequelize', 'Mongoose', 'Migrations', 'Model Relationships', 'Query Optimization'],
            resources: [
              { title: 'Sequelize Documentation', url: '#', type: 'documentation' },
              { title: 'Mongoose Guide', url: '#', type: 'tutorial' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Advanced Backend Development',
        duration: '4-5 weeks',
        description: 'Scalability, testing, and deployment',
        modules: [
          {
            id: 'microservices',
            title: 'Microservices Architecture',
            duration: '2 weeks',
            description: 'Design distributed systems',
            topics: ['Service Design', 'API Gateway', 'Service Communication', 'Data Management'],
            resources: [
              { title: 'Microservices Patterns', url: '#', type: 'book' },
              { title: 'Microservices Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'testing-debugging',
            title: 'Testing & Debugging',
            duration: '1 week',
            description: 'Ensure code quality and reliability',
            topics: ['Unit Testing', 'Integration Testing', 'API Testing', 'Debugging Techniques'],
            resources: [
              { title: 'Node.js Testing Guide', url: '#', type: 'tutorial' },
              { title: 'Backend Testing Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'deployment-devops',
            title: 'Deployment & DevOps',
            duration: '2 weeks',
            description: 'Deploy and monitor backend applications',
            topics: ['Docker', 'CI/CD', 'Cloud Platforms', 'Monitoring', 'Logging'],
            resources: [
              { title: 'Docker for Backend', url: '#', type: 'course' },
              { title: 'AWS Deployment Guide', url: '#', type: 'tutorial' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['JavaScript fundamentals', 'Basic command line usage'],
    careerOutcomes: [
      'Backend Developer',
      'Node.js Developer',
      'API Developer',
      'Senior Backend Engineer',
      'Backend Architect'
    ],
    averageSalary: '$75,000 - $125,000',
    jobGrowth: '22% (Much faster than average)'
  },

   'DevOps Engineer': {
    name: 'DevOps',
    icon: '🚀',
    color: 'from-teal-500 to-cyan-500',
    title: 'DevOps Engineer Career Path', 
    description: 'Infrastructure automation, CI/CD, and cloud technologies',
    totalDuration: '6-7 months',
    phases: [
      {
        id: 1,
        title: 'DevOps Fundamentals',
        duration: '4-5 weeks',
        description: 'Core DevOps concepts and practices',
        modules: [
          {
            id: 'devops-culture',
            title: 'DevOps Culture & Practices',
            duration: '1 week',
            description: 'Understanding DevOps philosophy and methodologies',
            topics: ['DevOps Principles', 'Agile Practices', 'Collaboration', 'Continuous Improvement'],
            resources: [
              { title: 'DevOps Handbook', url: '#', type: 'book' },
              { title: 'DevOps Fundamentals', url: '#', type: 'course' }
            ]
          },
          {
            id: 'linux-basics',
            title: 'Linux System Administration',
            duration: '2 weeks',
            description: 'Linux fundamentals for DevOps',
            topics: ['Command Line', 'File System', 'Process Management', 'Networking', 'Shell Scripting'],
            resources: [
              { title: 'Linux Command Line Tutorial', url: '#', type: 'tutorial' },
              { title: 'Linux System Administration', url: '#', type: 'course' }
            ]
          },
          {
            id: 'networking-security',
            title: 'Networking & Security',
            duration: '2 weeks',
            description: 'Network concepts and security fundamentals',
            topics: ['TCP/IP', 'DNS', 'Load Balancing', 'SSL/TLS', 'Firewalls', 'VPN'],
            resources: [
              { title: 'Networking for DevOps', url: '#', type: 'course' },
              { title: 'Security Best Practices', url: '#', type: 'article' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Version Control & CI/CD',
        duration: '5-6 weeks',
        description: 'Automation and continuous integration/deployment',
        modules: [
          {
            id: 'git-advanced',
            title: 'Advanced Git & GitHub',
            duration: '1 week',
            description: 'Advanced version control workflows',
            topics: ['Branching Strategies', 'Merge Strategies', 'Git Hooks', 'GitHub Actions'],
            resources: [
              { title: 'Pro Git Book', url: '#', type: 'book' },
              { title: 'Advanced Git Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'jenkins',
            title: 'Jenkins CI/CD',
            duration: '2 weeks',
            description: 'Continuous integration and deployment with Jenkins',
            topics: ['Pipeline as Code', 'Jenkinsfile', 'Build Automation', 'Plugin Management'],
            resources: [
              { title: 'Jenkins Documentation', url: '#', type: 'documentation' },
              { title: 'Jenkins Complete Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'github-actions',
            title: 'GitHub Actions',
            duration: '1 week',
            description: 'Automation with GitHub Actions',
            topics: ['Workflow Syntax', 'Actions Marketplace', 'Secrets Management', 'Matrix Builds'],
            resources: [
              { title: 'GitHub Actions Guide', url: '#', type: 'documentation' },
              { title: 'GitHub Actions Tutorial', url: '#', type: 'tutorial' }
            ]
          },
          {
            id: 'testing-automation',
            title: 'Automated Testing',
            duration: '2 weeks',
            description: 'Integrate testing into CI/CD pipelines',
            topics: ['Unit Testing', 'Integration Testing', 'Security Testing', 'Performance Testing'],
            resources: [
              { title: 'DevOps Testing Strategy', url: '#', type: 'article' },
              { title: 'Automated Testing Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Containerization & Orchestration',
        duration: '6-7 weeks',
        description: 'Docker and Kubernetes for container management',
        modules: [
          {
            id: 'docker-fundamentals',
            title: 'Docker Fundamentals',
            duration: '3 weeks',
            description: 'Containerization with Docker',
            topics: ['Docker Images', 'Containers', 'Dockerfile', 'Docker Compose', 'Registry Management'],
            resources: [
              { title: 'Docker Official Tutorial', url: '#', type: 'tutorial' },
              { title: 'Docker Deep Dive', url: '#', type: 'course' }
            ]
          },
          {
            id: 'kubernetes-basics',
            title: 'Kubernetes Fundamentals',
            duration: '3 weeks',
            description: 'Container orchestration with Kubernetes',
            topics: ['Pods', 'Services', 'Deployments', 'ConfigMaps', 'Secrets', 'Ingress'],
            resources: [
              { title: 'Kubernetes Documentation', url: '#', type: 'documentation' },
              { title: 'Kubernetes for Developers', url: '#', type: 'course' }
            ]
          },
          {
            id: 'helm',
            title: 'Helm Package Manager',
            duration: '1 week',
            description: 'Kubernetes application deployment with Helm',
            topics: ['Helm Charts', 'Templates', 'Values', 'Chart Repository', 'Release Management'],
            resources: [
              { title: 'Helm Documentation', url: '#', type: 'documentation' },
              { title: 'Helm Tutorial', url: '#', type: 'tutorial' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Cloud & Infrastructure',
        duration: '6-7 weeks',
        description: 'Cloud platforms and infrastructure as code',
        modules: [
          {
            id: 'aws-fundamentals',
            title: 'AWS Cloud Services',
            duration: '3 weeks',
            description: 'Amazon Web Services for DevOps',
            topics: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation', 'IAM'],
            resources: [
              { title: 'AWS Documentation', url: '#', type: 'documentation' },
              { title: 'AWS Solutions Architect', url: '#', type: 'course' }
            ]
          },
          {
            id: 'terraform',
            title: 'Infrastructure as Code',
            duration: '2 weeks',
            description: 'Infrastructure automation with Terraform',
            topics: ['Terraform Syntax', 'Providers', 'Modules', 'State Management', 'Best Practices'],
            resources: [
              { title: 'Terraform Documentation', url: '#', type: 'documentation' },
              { title: 'Terraform Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'monitoring-logging',
            title: 'Monitoring & Logging',
            duration: '2 weeks',
            description: 'Observability and system monitoring',
            topics: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'Alerting'],
            resources: [
              { title: 'Monitoring with Prometheus', url: '#', type: 'course' },
              { title: 'ELK Stack Tutorial', url: '#', type: 'tutorial' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['Basic Linux knowledge', 'Programming fundamentals', 'System administration basics'],
    careerOutcomes: [
      'DevOps Engineer',
      'Site Reliability Engineer',
      'Cloud Engineer',
      'Infrastructure Engineer',
      'DevOps Architect'
    ],
    averageSalary: '$90,000 - $140,000',
    jobGrowth: '21% (Much faster than average)'
  },

   'Cloud Architect': {
    name: 'Cloud Architect',
    icon: '☁️',
    color: 'from-sky-500 to-blue-500',
    title: 'Cloud Architect Career Path', 
    description: 'Design and implement scalable cloud solutions and architectures',
    totalDuration: '7-8 months',
    phases: [
      {
        id: 1,
        title: 'Cloud Fundamentals',
        duration: '5-6 weeks',
        description: 'Core cloud computing concepts and services',
        modules: [
          {
            id: 'cloud-concepts',
            title: 'Cloud Computing Basics',
            duration: '2 weeks',
            description: 'Understanding cloud models and services',
            topics: ['Cloud Models (IaaS, PaaS, SaaS)', 'Deployment Models', 'Cloud Benefits', 'Service Models'],
            resources: [
              { title: 'Cloud Computing Fundamentals', url: '#', type: 'course' },
              { title: 'NIST Cloud Definition', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'aws-core-services',
            title: 'AWS Core Services',
            duration: '3 weeks',
            description: 'Essential AWS services and concepts',
            topics: ['EC2', 'S3', 'VPC', 'IAM', 'RDS', 'CloudFormation', 'Route 53'],
            resources: [
              { title: 'AWS Cloud Practitioner', url: '#', type: 'certification' },
              { title: 'AWS Core Services Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'networking-basics',
            title: 'Cloud Networking',
            duration: '1 week',
            description: 'Networking concepts in cloud environments',
            topics: ['VPC Design', 'Subnets', 'Security Groups', 'Load Balancers', 'CDN'],
            resources: [
              { title: 'AWS Networking Guide', url: '#', type: 'documentation' },
              { title: 'Cloud Networking Course', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Advanced AWS Services',
        duration: '6-7 weeks',
        description: 'Deep dive into AWS ecosystem and services',
        modules: [
          {
            id: 'compute-storage',
            title: 'Compute & Storage Services',
            duration: '2 weeks',
            description: 'Advanced compute and storage solutions',
            topics: ['EC2 Advanced', 'ECS/EKS', 'Lambda', 'EBS', 'EFS', 'S3 Advanced Features'],
            resources: [
              { title: 'AWS Compute Services', url: '#', type: 'course' },
              { title: 'AWS Storage Guide', url: '#', type: 'documentation' }
            ]
          },
          {
            id: 'database-services',
            title: 'Database Services',
            duration: '2 weeks',
            description: 'Managed database solutions',
            topics: ['RDS', 'DynamoDB', 'ElastiCache', 'Redshift', 'Database Migration'],
            resources: [
              { title: 'AWS Database Services', url: '#', type: 'course' },
              { title: 'Database Architecture Patterns', url: '#', type: 'article' }
            ]
          },
          {
            id: 'security-compliance',
            title: 'Security & Compliance',
            duration: '2 weeks',
            description: 'Cloud security best practices',
            topics: ['IAM Advanced', 'KMS', 'CloudTrail', 'Config', 'Security Hub', 'Compliance Frameworks'],
            resources: [
              { title: 'AWS Security Best Practices', url: '#', type: 'whitepaper' },
              { title: 'Cloud Security Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'monitoring-optimization',
            title: 'Monitoring & Cost Optimization',
            duration: '1 week',
            description: 'Monitor and optimize cloud resources',
            topics: ['CloudWatch', 'Cost Explorer', 'Trusted Advisor', 'Performance Monitoring'],
            resources: [
              { title: 'AWS Monitoring Guide', url: '#', type: 'documentation' },
              { title: 'Cost Optimization Strategies', url: '#', type: 'whitepaper' }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Architecture Design Patterns',
        duration: '6-7 weeks',
        description: 'Design scalable and resilient cloud architectures',
        modules: [
          {
            id: 'well-architected',
            title: 'AWS Well-Architected Framework',
            duration: '2 weeks',
            description: 'Design principles for cloud architectures',
            topics: ['5 Pillars', 'Design Principles', 'Architecture Reviews', 'Best Practices'],
            resources: [
              { title: 'Well-Architected Framework', url: '#', type: 'whitepaper' },
              { title: 'Architecture Review Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'microservices-architecture',
            title: 'Microservices on AWS',
            duration: '2 weeks',
            description: 'Design and implement microservices architecture',
            topics: ['Service Mesh', 'API Gateway', 'Container Services', 'Event-Driven Architecture'],
            resources: [
              { title: 'Microservices on AWS', url: '#', type: 'whitepaper' },
              { title: 'Serverless Microservices', url: '#', type: 'course' }
            ]
          },
          {
            id: 'data-architecture',
            title: 'Data Architecture Patterns',
            duration: '2 weeks',
            description: 'Design data pipelines and analytics solutions',
            topics: ['Data Lakes', 'ETL Pipelines', 'Real-time Analytics', 'ML Integration'],
            resources: [
              { title: 'Data Architecture on AWS', url: '#', type: 'whitepaper' },
              { title: 'Big Data Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'disaster-recovery',
            title: 'Disaster Recovery & Business Continuity',
            duration: '1 week',
            description: 'Design resilient systems for business continuity',
            topics: ['Backup Strategies', 'Multi-Region Design', 'RTO/RPO Planning', 'Testing Procedures'],
            resources: [
              { title: 'Disaster Recovery on AWS', url: '#', type: 'whitepaper' },
              { title: 'Business Continuity Planning', url: '#', type: 'course' }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Multi-Cloud & Advanced Topics',
        duration: '4-5 weeks',
        description: 'Multi-cloud strategies and emerging technologies',
        modules: [
          {
            id: 'multi-cloud',
            title: 'Multi-Cloud Architecture',
            duration: '2 weeks',
            description: 'Design solutions across multiple cloud providers',
            topics: ['Azure Basics', 'GCP Fundamentals', 'Hybrid Cloud', 'Cloud Migration Strategies'],
            resources: [
              { title: 'Multi-Cloud Strategy Guide', url: '#', type: 'whitepaper' },
              { title: 'Cloud Migration Course', url: '#', type: 'course' }
            ]
          },
          {
            id: 'emerging-technologies',
            title: 'Emerging Cloud Technologies',
            duration: '1 week',
            description: 'Stay current with cloud innovation',
            topics: ['Edge Computing', 'IoT Integration', 'Quantum Computing', 'AI/ML Services'],
            resources: [
              { title: 'Emerging Cloud Trends', url: '#', type: 'article' },
              { title: 'Future of Cloud Computing', url: '#', type: 'webinar' }
            ]
          },
          {
            id: 'architecture-governance',
            title: 'Architecture Governance',
            duration: '1 week',
            description: 'Establish architecture standards and governance',
            topics: ['Architecture Reviews', 'Standards Development', 'Team Leadership', 'Documentation'],
            resources: [
              { title: 'Architecture Governance Guide', url: '#', type: 'book' },
              { title: 'Technical Leadership Course', url: '#', type: 'course' }
            ]
          }
        ]
      }
    ],
    prerequisites: ['Cloud computing basics', 'Networking knowledge', 'System administration experience'],
    careerOutcomes: [
      'Cloud Architect',
      'Solutions Architect',
      'Enterprise Architect',
      'Cloud Consultant',
      'Technical Director'
    ],
    averageSalary: '$120,000 - $180,000',
    jobGrowth: '15% (Much faster than average)'
  }
};
 