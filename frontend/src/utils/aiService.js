// Extract skills from resume text (simple keyword match or AI call)
export async function extractSkillsFromText(text) {
  // List of common tech skills (expand as needed)
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes',
    'HTML', 'CSS', 'Express', 'Redux', 'Git', 'Jenkins', 'PostgreSQL', 'REST', 'API', 'C++', 'C#', 'Angular', 'Vue',
    'Machine Learning', 'Data Science', 'DevOps', 'Spring', 'Django', 'Flask', 'GraphQL', 'SASS', 'LESS', 'Tailwind',
    'Next.js', 'GCP', 'Azure', 'CI/CD', 'Testing', 'Jest', 'Mocha', 'Chai', 'Selenium', 'Cypress', 'PHP', 'Laravel',
    'Go', 'Rust', 'Swift', 'Objective-C', 'Android', 'iOS', 'Figma', 'UI/UX', 'Agile', 'Scrum', 'Project Management'
  ];
  const found = [];
  const lowerText = text.toLowerCase();
  skillKeywords.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      found.push(skill);
    }
  });
  // Remove duplicates
  return [...new Set(found)];
}


// Use Gemini 2.0 Flash endpoint and API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export  class AIService { 
  static async generateQuestions(skills, role, count = 10) {
    console.log(`Generating ${count} questions for ${role} with skills: ${skills.join(', ')} using Gemini 2.0 Flash`);
    if (!GEMINI_API_KEY) {
      console.log('Using fallback questions - Gemini API key needed for AI generation');
      return this.getFallbackQuestions(skills, role, count);
    }
    try {
      const prompt = `Generate ${count} technical interview questions for a ${role} position focusing on these skills: ${skills.join(', ')}. Return ONLY a valid JSON array with objects containing: question, options (4 choices), correct (0-3), explanation, difficulty. Shuffle questions and answer options randomly.`;
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
        const jsonMatch = text && text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Gemini question generation failed:', error);
    }
    // Fallback to predefined questions
    return this.getFallbackQuestions(skills, role, count);
    
    /* AI Integration temporarily disabled due to quota limits
    try {
      const response = await fetch(`https://hooks.jdoodle.net/proxy?url=${encodeURIComponent(AI_ENDPOINTS[provider])}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
                        body: JSON.stringify({ 
            model: provider === 'openai' ? 'gpt-3.5-turbo' : 'grok-beta',
            messages: [{
              role: 'system',
              content: `Generate ${count} technical interview questions for a ${role} position focusing on these skills: ${skills.join(', ')}. Return ONLY a valid JSON array with objects containing: question, options (4 choices), correct (0-3), explanation, difficulty.`
            }],
            temperature: 0.7,
            max_tokens: 2000
          }) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content.trim();
      
      // Clean the response to ensure it's valid JSON
      const jsonStart = content.indexOf('[');
      const jsonEnd = content.lastIndexOf(']') + 1;
      const jsonContent = content.substring(jsonStart, jsonEnd);
      
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error('AI question generation failed:', error);
      return this.getFallbackQuestions(skills, role, count);
    }
    */
  }  

  static async generateLearningPath(userProfile, targetRole, skills) {
    if (!GEMINI_API_KEY) {
      console.log('Using fallback learning path - Gemini API key needed for AI generation');
      return this.getDefaultLearningPath(targetRole);
    }
    try {
      const prompt = `Create a personalized learning roadmap for transitioning to ${targetRole}.\nCurrent skills: ${skills.join(', ')}\nUser level: ${userProfile.level}\n\nReturn JSON with:\n- modules: array of learning modules\n- estimatedTimeWeeks: number\n- prerequisites: array of required skills\n- resources: curated learning resources\n- milestones: key checkpoints`;
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
        if (text) {
          return JSON.parse(text);
        }
      }
    } catch (error) {
      console.error('Gemini learning path generation failed:', error);
    }
    return this.getDefaultLearningPath(targetRole);
  }

      static getFallbackQuestions(skills, role, count = 10) { 
    console.log(`Generating questions for role: ${role} with skills: ${skills.join(', ')}`);
    
    // Get role-specific questions first
    let selectedQuestions = [];
    
    // Role-based questions (higher priority)
    const roleQuestions = this.getRoleSpecificQuestions(role);
    selectedQuestions.push(...roleQuestions);
    
    // Skill-based questions for selected skills only
    const skillQuestions = this.getSkillSpecificQuestions(skills);
    selectedQuestions.push(...skillQuestions);
    
    // If still not enough questions, add generic ones
    if (selectedQuestions.length < count) {
      const genericQuestions = this.getGenericQuestions();
      selectedQuestions.push(...genericQuestions);
    }
    
       // Shuffle questions and answer options
    const shuffled = selectedQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map(question => ({
        ...question,
        options: [...question.options].sort(() => 0.5 - Math.random()),
        correct: question.options.findIndex(option => 
          option === question.options[question.correct]
        )
      }));
    
    return shuffled; 
  }

  static getRoleSpecificQuestions(role) {
    const roleQuestions = {
      'QA Engineer': [
        {
          question: "What is the difference between manual testing and automated testing?",
          options: ["Manual is faster", "Automated testing uses tools to execute tests", "No difference", "Manual testing is always better"],
          correct: 1,
          explanation: "Automated testing uses tools and scripts to execute test cases, while manual testing is performed by human testers.",
          difficulty: "beginner"
        },
        {
          question: "What is a test case in software testing?",
          options: ["Bug report", "Set of conditions to verify functionality", "Code review", "Performance metric"],
          correct: 1,
          explanation: "A test case is a set of conditions or variables under which a tester determines if a software application is working correctly.",
          difficulty: "beginner"
        },
        {
          question: "What is regression testing?",
          options: ["Testing new features only", "Re-testing after bug fixes to ensure no new issues", "Performance testing", "Security testing"],
          correct: 1,
          explanation: "Regression testing ensures that recent code changes haven't broken existing functionality.",
          difficulty: "intermediate"
        },
        {
          question: "What is the purpose of boundary value analysis?",
          options: ["Test UI elements", "Test input values at boundaries", "Test database connections", "Test user permissions"],
          correct: 1,
          explanation: "Boundary value analysis tests input values at the edges of input domains where errors are more likely to occur.",
          difficulty: "intermediate"
        },
        {
          question: "What is a test automation framework?",
          options: ["Testing tool", "Set of guidelines and practices for automated testing", "Bug tracking system", "Code editor"],
          correct: 1,
          explanation: "A test automation framework provides guidelines, standards, and best practices for creating and maintaining automated tests.",
          difficulty: "advanced"
        }
      ],
      'Java Full Stack Developer': [
        {
          question: "What is Spring Boot and its advantages?",
          options: ["Database", "Framework for building Java applications with auto-configuration", "Testing tool", "IDE"],
          correct: 1,
          explanation: "Spring Boot is a framework that simplifies Spring application development with auto-configuration and embedded servers.",
          difficulty: "intermediate"
        },
        {
          question: "What is JPA in Java?",
          options: ["Java Persistence API", "Java Programming Application", "Java Performance Analyzer", "Java Package Archive"],
          correct: 0,
          explanation: "JPA (Java Persistence API) is a specification for managing relational data in Java applications.",
          difficulty: "intermediate"
        },
        {
          question: "What is the difference between @Controller and @RestController?",
          options: ["No difference", "@RestController combines @Controller and @ResponseBody", "@Controller is newer", "@RestController is for databases only"],
          correct: 1,
          explanation: "@RestController is a combination of @Controller and @ResponseBody, making it ideal for RESTful web services.",
          difficulty: "advanced"
        }
      ],
      'Frontend Developer': [
        {
          question: "What is responsive web design?",
          options: ["Fast loading websites", "Websites that adapt to different screen sizes", "Websites with animations", "Server-side rendering"],
          correct: 1,
          explanation: "Responsive web design ensures websites work well on various devices and screen sizes.",
          difficulty: "beginner"
        },
        {
          question: "What is the CSS Box Model?",
          options: ["Container design", "Content, padding, border, margin structure", "Layout system", "Animation framework"],
          correct: 1,
          explanation: "The CSS Box Model describes how elements are structured with content, padding, border, and margin.",
          difficulty: "intermediate"
        },
        {
          question: "What is the Virtual DOM in React?",
          options: ["A real DOM element", "A JavaScript representation of the DOM", "A CSS framework", "A testing tool"],
          correct: 1,
          explanation: "The Virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.",
          difficulty: "intermediate"
        }
      ],
      'Backend Developer': [
        {
          question: "What is API rate limiting?",
          options: ["API speed optimization", "Controlling request frequency to prevent abuse", "API testing method", "Database optimization"],
          correct: 1,
          explanation: "API rate limiting controls how frequently a user can make requests to an API to prevent abuse and ensure fair usage.",
          difficulty: "intermediate"
        },
        {
          question: "What is database sharding?",
          options: ["Data backup", "Horizontal partitioning of data across multiple databases", "Data encryption", "Index optimization"],
          correct: 1,
          explanation: "Database sharding is a method of horizontally partitioning data across multiple databases to improve performance and scalability.",
          difficulty: "advanced"
        },
        {
          question: "What is middleware in web applications?",
          options: ["Database layer", "Software that sits between applications and services", "Frontend framework", "Testing tool"],
          correct: 1,
          explanation: "Middleware is software that provides common services and capabilities to applications outside of what's offered by the operating system.",
          difficulty: "intermediate"
        }
      ],
      'DevOps Engineer': [
        {
          question: "What is Infrastructure as Code (IaC)?",
          options: ["Manual server setup", "Managing infrastructure through code", "Programming servers", "Code deployment only"],
          correct: 1,
          explanation: "Infrastructure as Code manages and provisions infrastructure through machine-readable definition files rather than manual processes.",
          difficulty: "intermediate"
        },
        {
          question: "What is container orchestration?",
          options: ["Manual container management", "Automated container deployment and management", "Container testing", "Container monitoring only"],
          correct: 1,
          explanation: "Container orchestration automates the deployment, management, scaling, and networking of containerized applications.",
          difficulty: "advanced"
        },
        {
          question: "What is CI/CD?",
          options: ["Database management", "Continuous Integration/Continuous Deployment", "Code testing only", "Server monitoring"],
          correct: 1,
          explanation: "CI/CD is a practice that automates the integration and deployment of code changes, enabling faster and more reliable software delivery.",
          difficulty: "beginner"
        }
      ],
      'Cloud Architect': [
        {
          question: "What is cloud elasticity?",
          options: ["Fixed resources", "Dynamic resource scaling based on demand", "Cost optimization tool", "Security feature"],
          correct: 1,
          explanation: "Cloud elasticity is the ability to dynamically scale resources up or down based on current demand.",
          difficulty: "intermediate"
        },
        {
          question: "What is the shared responsibility model in cloud computing?",
          options: ["Cloud provider handles everything", "Security responsibilities split between provider and customer", "Customer handles everything", "No security responsibilities"],
          correct: 1,
          explanation: "The shared responsibility model defines how security responsibilities are divided between the cloud provider and the customer.",
          difficulty: "advanced"
        },
        {
          question: "What is multi-cloud strategy?",
          options: ["Using one cloud provider", "Using multiple cloud providers", "Cloud storage only", "Private cloud only"],
          correct: 1,
          explanation: "Multi-cloud strategy involves using services from multiple cloud providers to avoid vendor lock-in and improve reliability.",
          difficulty: "advanced"
        }
      ],
      'Data Engineer': [
        {
          question: "What is ETL in data processing?",
          options: ["Error Testing Logic", "Extract, Transform, Load", "Efficient Transfer Layer", "Enterprise Technology License"],
          correct: 1,
          explanation: "ETL stands for Extract, Transform, Load - a process of moving data from source systems to data warehouses.",
          difficulty: "beginner"
        },
        {
          question: "What is data pipeline?",
          options: ["Data storage method", "Series of data processing steps", "Database backup", "Data visualization tool"],
          correct: 1,
          explanation: "A data pipeline is a series of data processing steps that move data from source to destination, often transforming it along the way.",
          difficulty: "intermediate"
        },
        {
          question: "What is the difference between data lake and data warehouse?",
          options: ["No difference", "Data lake stores raw data, warehouse stores structured data", "Data lake is faster", "Data warehouse is newer"],
          correct: 1,
          explanation: "Data lakes store raw, unstructured data while data warehouses store structured, processed data optimized for analysis.",
          difficulty: "advanced"
        }
      ],
      'Mobile Developer': [
        {
          question: "What is the difference between native and cross-platform mobile development?",
          options: ["No difference", "Native uses platform-specific languages, cross-platform uses shared codebase", "Native is slower", "Cross-platform is always better"],
          correct: 1,
          explanation: "Native development uses platform-specific languages and tools, while cross-platform development uses frameworks that work across multiple platforms.",
          difficulty: "beginner"
        },
        {
          question: "What is responsive design in mobile development?",
          options: ["Fast app performance", "UI that adapts to different screen sizes", "Push notifications", "App store optimization"],
          correct: 1,
          explanation: "Responsive design ensures that mobile applications provide optimal user experience across different device screen sizes and orientations.",
          difficulty: "intermediate"
        }
      ]
    };
    
    return roleQuestions[role] || [];
  }

  static getSkillSpecificQuestions(skills) { 
       const skillBasedQuestions = { 
      'JavaScript': [
        {
          question: "What is the difference between let, const, and var in JavaScript?",
          options: ["No difference", "let is block-scoped, var is function-scoped", "const can be reassigned", "var is the newest"],
          correct: 1,
          explanation: "let and const are block-scoped while var is function-scoped. const cannot be reassigned.",
          difficulty: "intermediate"
        },
        {
          question: "What is closure in JavaScript?",
          options: ["A loop structure", "Function accessing outer scope variables", "A conditional statement", "An error handling method"],
          correct: 1,
          explanation: "A closure is when a function has access to variables from its outer/enclosing scope even after the outer function has finished executing.",
          difficulty: "advanced"
        }
      ],
      'React': [
        {
          question: "What is the purpose of React hooks?",
          options: ["Manage component state", "Handle side effects", "Reuse stateful logic", "All of the above"],
          correct: 3,
          explanation: "React hooks allow you to manage state, handle side effects, and reuse stateful logic between components.",
          difficulty: "intermediate"
        },
        {
          question: "What is the Virtual DOM in React?",
          options: ["A real DOM element", "A JavaScript representation of the DOM", "A CSS framework", "A testing tool"],
          correct: 1,
          explanation: "The Virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.",
          difficulty: "intermediate"
        }
      ],
      'Node.js': [
        {
          question: "What is the event loop in Node.js?",
          options: ["A database feature", "A mechanism for handling asynchronous operations", "A testing framework", "A security feature"],
          correct: 1,
          explanation: "The event loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.",
          difficulty: "advanced"
        },
        {
          question: "What is middleware in Express.js?",
          options: ["Database connection", "Functions that execute during request-response cycle", "File storage", "User authentication only"],
          correct: 1,
          explanation: "Middleware functions have access to the request object, response object, and the next middleware function in the application's request-response cycle.",
          difficulty: "intermediate"
        }
      ],
      'Python': [
        {
          question: "What is the difference between list and tuple in Python?",
          options: ["No difference", "Lists are mutable, tuples are immutable", "Tuples are faster", "Lists use more memory"],
          correct: 1,
          explanation: "Lists are mutable (can be changed) while tuples are immutable (cannot be changed after creation).",
          difficulty: "beginner"
        },
        {
          question: "What is a Python decorator?",
          options: ["A design pattern", "A function that modifies another function", "A data structure", "An error handler"],
          correct: 1,
          explanation: "A decorator is a function that takes another function and extends its behavior without explicitly modifying it.",
          difficulty: "advanced"
        }
      ],
      'Java': [
        {
          question: "What is the difference between JDK, JRE, and JVM?",
          options: ["They are the same", "JDK contains JRE and JVM", "JVM contains JDK", "JRE is fastest"],
          correct: 1,
          explanation: "JDK (Development Kit) contains JRE (Runtime Environment) which contains JVM (Virtual Machine).",
          difficulty: "intermediate"
        },
        {
          question: "What is polymorphism in Java?",
          options: ["Multiple inheritance", "Same interface, different implementations", "Error handling", "Memory management"],
          correct: 1,
          explanation: "Polymorphism allows objects of different types to be treated as objects of a common base type, with each type providing its own implementation.",
          difficulty: "advanced"
        }
      ],
      'SQL': [
        {
          question: "What is the difference between INNER JOIN and LEFT JOIN?",
          options: ["No difference", "INNER returns matching rows, LEFT returns all left rows", "LEFT is faster", "INNER is newer"],
          correct: 1,
          explanation: "INNER JOIN returns only matching rows from both tables, LEFT JOIN returns all rows from left table and matching rows from right table.",
          difficulty: "intermediate"
        },
        {
          question: "What is database normalization?",
          options: ["Data encryption", "Organizing data to reduce redundancy", "Database backup", "Performance optimization"],
          correct: 1,
          explanation: "Database normalization is the process of organizing data to reduce redundancy and improve data integrity.",
          difficulty: "advanced"
        }
      ],
      'AWS': [
        {
          question: "What is the difference between S3 and EBS?",
          options: ["No difference", "S3 is object storage, EBS is block storage", "EBS is cheaper", "S3 is faster"],
          correct: 1,
          explanation: "S3 is object storage for web-accessible data, EBS provides block-level storage for EC2 instances.",
          difficulty: "intermediate"
        },
        {
          question: "What is AWS Lambda?",
          options: ["Database service", "Serverless compute service", "Storage service", "Monitoring service"],
          correct: 1,
          explanation: "AWS Lambda is a serverless compute service that runs code in response to events without managing servers.",
          difficulty: "beginner"
        }
      ],
      'Docker': [
        {
          question: "What is containerization?",
          options: ["Data storage method", "Application packaging technology", "Network protocol", "Database system"],
          correct: 1,
          explanation: "Containerization packages applications with their dependencies for consistent deployment across environments.",
          difficulty: "intermediate"
        },
        {
          question: "What is the difference between Docker image and container?",
          options: ["No difference", "Image is blueprint, container is running instance", "Container is faster", "Image uses more memory"],
          correct: 1,
          explanation: "A Docker image is a read-only template, while a container is a running instance of an image.",
          difficulty: "beginner"
        }
      ],
      'Kubernetes': [
        {
          question: "What is a Kubernetes pod?",
          options: ["A container", "Smallest deployable unit with one or more containers", "A service", "A storage unit"],
          correct: 1,
          explanation: "A pod is the smallest deployable unit in Kubernetes that can contain one or more containers that share storage and network.",
          difficulty: "intermediate"
        },
        {
          question: "What is kubectl?",
          options: ["Kubernetes dashboard", "Command-line tool for Kubernetes", "Container runtime", "Load balancer"],
          correct: 1,
          explanation: "kubectl is the command-line tool for communicating with the Kubernetes API server.",
          difficulty: "beginner"
        }
      ],
      'Jenkins': [
        {
          question: "What is CI/CD?",
          options: ["Database management", "Continuous Integration/Continuous Deployment", "Code testing only", "Server monitoring"],
          correct: 1,
          explanation: "CI/CD is a practice that automates the integration and deployment of code changes.",
          difficulty: "beginner"
        },
        {
          question: "What is a Jenkins pipeline?",
          options: ["Database connection", "Automated workflow definition", "Testing framework", "Monitoring tool"],
          correct: 1,
          explanation: "A Jenkins pipeline is a suite of plugins that supports implementing continuous delivery pipelines.",
          difficulty: "intermediate"
        }
      ],
      'Git': [
        {
          question: "What is the difference between git merge and git rebase?",
          options: ["No difference", "Merge preserves history, rebase rewrites it", "Rebase is faster", "Merge is newer"],
          correct: 1,
          explanation: "Git merge preserves commit history while git rebase rewrites commit history for a linear timeline.",
          difficulty: "advanced"
        },
        {
          question: "What is a git branch?",
          options: ["A copy of repository", "Independent line of development", "A backup", "A testing environment"],
          correct: 1,
          explanation: "A git branch is an independent line of development that allows you to work on features without affecting the main codebase.",
          difficulty: "beginner"
        }
      ],
      'MongoDB': [
        {
          question: "What is the difference between SQL and NoSQL databases?",
          options: ["SQL is faster", "NoSQL is more structured", "SQL uses structured data, NoSQL is flexible", "No difference"],
          correct: 2,
          explanation: "SQL databases use structured data with predefined schemas, while NoSQL databases offer flexible, schema-less data storage.",
          difficulty: "intermediate"
        },
        {
          question: "What is a MongoDB collection?",
          options: ["Database instance", "Group of documents", "Index structure", "Query result"],
          correct: 1,
          explanation: "A MongoDB collection is a group of documents, similar to a table in relational databases.",
          difficulty: "beginner"
        }
      ],
      'PostgreSQL': [
        {
          question: "What is ACID in database systems?",
          options: ["Database type", "Transaction properties", "Query language", "Storage engine"],
          correct: 1,
          explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions.",
          difficulty: "advanced"
        },
        {
          question: "What is a database index?",
          options: ["Table backup", "Data structure for faster queries", "Storage location", "User permission"],
          correct: 1,
          explanation: "A database index is a data structure that improves the speed of data retrieval operations on a table.",
          difficulty: "intermediate"
        }
      ],
      'REST APIs': [
        {
          question: "What does REST stand for?",
          options: ["Random Execution State Transfer", "Representational State Transfer", "Reliable State Transaction", "Resource State Transfer"],
          correct: 1,
          explanation: "REST stands for Representational State Transfer, an architectural style for web services.",
          difficulty: "beginner"
        },
        {
          question: "Which HTTP status code indicates successful creation?",
          options: ["200", "201", "204", "301"],
          correct: 1,
          explanation: "HTTP status code 201 indicates that a request has succeeded and has led to the creation of a resource.",
          difficulty: "intermediate"
        }
      ],
      'TypeScript': [
        {
          question: "What is the main benefit of TypeScript over JavaScript?",
          options: ["Faster execution", "Static type checking", "Smaller file size", "Better performance"],
          correct: 1,
          explanation: "TypeScript provides static type checking which helps catch errors at compile time rather than runtime.",
          difficulty: "beginner"
        },
        {
          question: "What is a TypeScript interface?",
          options: ["Class implementation", "Contract for object shape", "Function definition", "Variable declaration"],
          correct: 1,
          explanation: "A TypeScript interface defines the contract for the shape of an object, specifying what properties and methods it should have.",
          difficulty: "intermediate"
        }
      ]
    };

    // Get questions for the selected skills only
    const skillQuestions = [];
    skills.forEach(skill => {
      if (skillBasedQuestions[skill]) {
        skillQuestions.push(...skillBasedQuestions[skill]);
      }
    });

    return skillQuestions;
  }

  static getGenericQuestions() {
    return [
      {
        question: "What is version control?",
        options: ["Code backup only", "System to track code changes", "Database management", "Testing framework"],
        correct: 1,
        explanation: "Version control systems track changes to code over time and enable collaboration.",
        difficulty: "beginner"
      },
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Automated Program Integration", "Advanced Protocol Implementation", "Application Process Integration"],
        correct: 0,
        explanation: "API stands for Application Programming Interface, which allows different software applications to communicate.",
        difficulty: "beginner"
      },
      {
        question: "What is the main purpose of testing in software development?",
        options: ["Find bugs", "Ensure quality", "Meet requirements", "All of the above"],
        correct: 3,
        explanation: "Testing serves multiple purposes including finding bugs, ensuring quality, and verifying requirements are met.",
        difficulty: "intermediate"
      },
      {
        question: "What is agile methodology?",
        options: ["Database design", "Iterative software development approach", "Testing framework", "Programming language"],
        correct: 1,
        explanation: "Agile is an iterative approach to software development that emphasizes collaboration and flexibility.",
        difficulty: "beginner"
      },
      {
        question: "What is software architecture?",
        options: ["UI design", "High-level structure of software systems", "Database design only", "Testing strategy"],
        correct: 1,
        explanation: "Software architecture defines the high-level structure of a software system and the disciplines of creating such structures.",
        difficulty: "intermediate"
      }
    ];
  } 

  static getDefaultLearningPath(role) {
    const pathTemplates = {
      'Frontend Developer': {
        modules: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Testing'],
        estimatedTimeWeeks: 12,
        prerequisites: ['Basic programming knowledge'],
        resources: ['MDN Documentation', 'React Official Docs'],
        milestones: ['Build first component', 'Complete project', 'Deploy application']
      },
      'Backend Developer': {
        modules: ['Server Architecture', 'Database Design', 'API Development', 'Security', 'Deployment'],
        estimatedTimeWeeks: 16,
        prerequisites: ['Programming fundamentals'],
        resources: ['Node.js Docs', 'Database Tutorials'],
        milestones: ['Create REST API', 'Implement authentication', 'Deploy to cloud']
      }
    };

    return pathTemplates[role] || pathTemplates['Frontend Developer'];
  }
}
 