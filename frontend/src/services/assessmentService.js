import  { AIService } from '../utils/aiService'; 
import { UserService } from './userService';

export class AssessmentService {
  static async createAssessment(skills, role, difficulty = 'mixed') {
    try {
      const questions = await AIService.generateQuestions(skills, role, 10);
      
      const assessment = {
        id: `assessment_${Date.now()}`,
        skills,
        role,
        difficulty,
        questions: questions.map((q, index) => ({
          ...q,
          id: `q_${index + 1}`,
          timeLimit: 60 // seconds per question
        })),
        createdAt: new Date().toISOString(),
        totalQuestions: questions.length,
        estimatedTime: questions.length * 60 // seconds
      };

      return assessment;
    } catch (error) {
      console.error('Failed to create assessment:', error);
      throw new Error('Unable to generate assessment. Please try again.');
    }
  }

  static calculateScore(answers, questions) {
    if (!answers || !questions || answers.length !== questions.length) {
      throw new Error('Invalid answers or questions provided');
    }

    let correct = 0;
    let totalPoints = 0;
    const results = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i];
      const isCorrect = userAnswer === question.correct;
      
      if (isCorrect) correct++;

      // Different points based on difficulty
      const points = this.getQuestionPoints(question.difficulty, isCorrect);
      totalPoints += points;

      results.push({
        questionId: question.id,
        correct: isCorrect,
        points,
        userAnswer,
        correctAnswer: question.correct,
        explanation: question.explanation
      });
    }

    const percentage = Math.round((correct / questions.length) * 100);
    const level = this.determineSkillLevel(percentage, totalPoints);

    return {
      correct,
      total: questions.length,
      percentage,
      totalPoints,
      level,
      results,
      completedAt: new Date().toISOString()
    };
  }

  static getQuestionPoints(difficulty, isCorrect) {
    if (!isCorrect) return 5; // Participation points

    const pointsMap = {
      beginner: 10,
      intermediate: 15,
      advanced: 20
    };

    return pointsMap[difficulty] || 10;
  }

  static determineSkillLevel(percentage, totalPoints) {
    if (percentage >= 90 && totalPoints >= 150) return 'Expert';
    if (percentage >= 75 && totalPoints >= 120) return 'Advanced';
    if (percentage >= 60 && totalPoints >= 90) return 'Intermediate';
    if (percentage >= 40) return 'Beginner';
    return 'Novice';
  }

    static async saveAssessmentResult(assessmentId, result) { 
    try {
      let userData = UserService.getUserData();
      
      // Initialize userData if null
      if (!userData) {
        userData = {
          assessmentHistory: [],
          skillLevels: {},
          stats: { xp: 0, level: 1, totalActivities: 0 },
          lastUpdated: new Date().toISOString()
        };
      }

      if (!userData.assessmentHistory) {
        userData.assessmentHistory = [];
      }

      const assessmentRecord = {
        id: assessmentId,
        result,
        timestamp: new Date().toISOString()
      };

      userData.assessmentHistory.push(assessmentRecord);
      
      // Update user stats based on assessment
      const xpGained = result.totalPoints;
      UserService.addXP(xpGained, 'Assessment completion');

      // Update skill levels
      this.updateUserSkillLevels(userData, result);

      return UserService.saveUserData(userData);
    } catch (error) {
      console.error('Failed to save assessment result:', error);
      return null;
    }
  } 

  static updateUserSkillLevels(userData, result) {
    if (!userData.skillLevels) {
      userData.skillLevels = {};
    }

    // Update based on assessment performance
    const skills = result.skills || [];
    skills.forEach(skill => {
      const currentLevel = userData.skillLevels[skill] || 'Novice';
      const assessmentLevel = result.level;
      
      // Only update if assessment shows higher proficiency
      if (this.isHigherLevel(assessmentLevel, currentLevel)) {
        userData.skillLevels[skill] = assessmentLevel;
      }
    });
  }

  static isHigherLevel(newLevel, currentLevel) {
    const levelHierarchy = ['Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return levelHierarchy.indexOf(newLevel) > levelHierarchy.indexOf(currentLevel);
  }

  static getAssessmentHistory(userId) {
    const userData = UserService.getUserData();
    return userData?.assessmentHistory || [];
  }

  static getSkillGapAnalysis(userSkills, targetRole) {
    const roleRequirements = this.getRoleRequirements(targetRole);
    const gaps = [];
    const strengths = [];

    roleRequirements.forEach(requirement => {
      const userLevel = userSkills[requirement.skill] || 'Novice';
      const requiredLevel = requirement.level;

      if (this.isHigherLevel(requiredLevel, userLevel)) {
        gaps.push({
          skill: requirement.skill,
          current: userLevel,
          required: requiredLevel,
          priority: requirement.priority || 'medium'
        });
      } else {
        strengths.push({
          skill: requirement.skill,
          level: userLevel
        });
      }
    });

    return { gaps, strengths };
  }

    static getRoleRequirements(role) { 
    const requirements = {
      'Java Full Stack Developer': [
        { skill: 'Java', level: 'Advanced', priority: 'high' },
        { skill: 'JavaScript', level: 'Advanced', priority: 'high' },
        { skill: 'React', level: 'Intermediate', priority: 'high' },
        { skill: 'SQL', level: 'Advanced', priority: 'high' },
        { skill: 'REST APIs', level: 'Advanced', priority: 'high' }
      ],
      'Frontend Developer': [
        { skill: 'JavaScript', level: 'Advanced', priority: 'high' },
        { skill: 'React', level: 'Advanced', priority: 'high' },
        { skill: 'TypeScript', level: 'Intermediate', priority: 'high' },
        { skill: 'REST APIs', level: 'Intermediate', priority: 'medium' }
      ],
      'Backend Developer': [
        { skill: 'Node.js', level: 'Advanced', priority: 'high' },
        { skill: 'SQL', level: 'Advanced', priority: 'high' },
        { skill: 'REST APIs', level: 'Advanced', priority: 'high' },
        { skill: 'MongoDB', level: 'Intermediate', priority: 'medium' }
      ],
      'DevOps Engineer': [
        { skill: 'Docker', level: 'Advanced', priority: 'high' },
        { skill: 'Kubernetes', level: 'Advanced', priority: 'high' },
        { skill: 'Jenkins', level: 'Intermediate', priority: 'high' },
        { skill: 'AWS', level: 'Advanced', priority: 'high' },
        { skill: 'Git', level: 'Advanced', priority: 'medium' }
      ],
      'Cloud Architect': [
        { skill: 'AWS', level: 'Advanced', priority: 'high' },
        { skill: 'Docker', level: 'Advanced', priority: 'high' },
        { skill: 'Kubernetes', level: 'Advanced', priority: 'high' },
        { skill: 'Python', level: 'Intermediate', priority: 'medium' }
      ],
      'QA Engineer': [
        { skill: 'Java', level: 'Intermediate', priority: 'high' },
        { skill: 'Python', level: 'Intermediate', priority: 'high' },
        { skill: 'SQL', level: 'Intermediate', priority: 'medium' },
        { skill: 'REST APIs', level: 'Intermediate', priority: 'medium' }
      ]
    };

    return requirements[role] || requirements['Frontend Developer'];
  } 
}
 