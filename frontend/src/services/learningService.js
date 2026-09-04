import  { UserService } from './userService';

export class LearningService {
  static async getModuleContent(moduleId, trackId) {
    try {
      // Simulate API call - in real app, this would fetch from backend
      const modules = await import('../data/learningModules.json');
      const track = modules.tracks[trackId];
      
      if (!track) {
        throw new Error(`Track ${trackId} not found`);
      }

      const module = track.modules.find(m => m.id === moduleId);
      if (!module) {
        throw new Error(`Module ${moduleId} not found in track ${trackId}`);
      }

      return module;
    } catch (error) {
      console.error('Failed to fetch module content:', error);
      return this.getFallbackModule(moduleId);
    }
  }

  static async submitExercise(moduleId, exerciseId, userAnswer) {
    try {
      // Simulate exercise validation
      const isCorrect = this.validateExercise(exerciseId, userAnswer);
      const points = isCorrect ? 50 : 10; // Participation points even if wrong

      // Update user progress
      UserService.addXP(points, `Exercise ${exerciseId} completion`);

      return {
        success: true,
        correct: isCorrect,
        points,
        feedback: isCorrect ? 'Great job!' : 'Keep trying! Review the material and try again.',
        explanation: this.getExerciseExplanation(exerciseId)
      };
    } catch (error) {
      console.error('Failed to submit exercise:', error);
      return {
        success: false,
        error: 'Failed to submit exercise. Please try again.'
      };
    }
  }

  static validateExercise(exerciseId, userAnswer) {
    // This would normally validate against stored correct answers
    const correctAnswers = {
      'html-basics-1': 'semantic-html',
      'css-flexbox-1': 'flex-container',
      'js-variables-1': 'let-const',
      'react-components-1': 'functional-component'
    };

    return correctAnswers[exerciseId] === userAnswer;
  }

  static getExerciseExplanation(exerciseId) {
    const explanations = {
      'html-basics-1': 'Semantic HTML uses meaningful tags like <header>, <nav>, <main>, and <footer> to structure content logically.',
      'css-flexbox-1': 'Flexbox container properties control how child elements are arranged and aligned within the container.',
      'js-variables-1': 'Use let and const instead of var for better scoping and to prevent accidental reassignments.',
      'react-components-1': 'Functional components are simpler and use hooks for state management in modern React.'
    };

    return explanations[exerciseId] || 'Keep practicing to improve your understanding!';
  }

  static async trackProgress(moduleId, progressPercent) {
    try {
      const result = UserService.updateUserProgress(moduleId, progressPercent);
      
      // Award XP for progress milestones
      if (progressPercent === 25) {
        UserService.addXP(25, 'Module 25% complete');
      } else if (progressPercent === 50) {
        UserService.addXP(50, 'Module 50% complete');
      } else if (progressPercent === 75) {
        UserService.addXP(75, 'Module 75% complete');
      } else if (progressPercent === 100) {
        UserService.addXP(100, 'Module completed');
      }

      return result;
    } catch (error) {
      console.error('Failed to track progress:', error);
      return null;
    }
  }

  static getFallbackModule(moduleId) {
    return {
      id: moduleId,
      title: 'Learning Module',
      description: 'Interactive learning content',
      content: 'This module is currently being loaded. Please try again.',
      exercises: [],
      resources: [],
      estimatedTime: '30 minutes'
    };
  }

  static async generateCertificate(courseId, userId) {
    try {
      const userData = UserService.getUserData();
      if (!userData) {
        throw new Error('User data not found');
      }

      const certificate = {
        id: `cert_${courseId}_${userId}_${Date.now()}`,
        courseId,
        userId,
        userName: userData.name,
        completedAt: new Date().toISOString(),
        skills: userData.completedSkills || [],
        level: userData.stats?.level || 1,
        xp: userData.stats?.xp || 0
      };

      // In real app, this would be sent to backend for verification and storage
      console.log('Certificate generated:', certificate);
      
      return certificate;
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      return null;
    }
  }
}
 