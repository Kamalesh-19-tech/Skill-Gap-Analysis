import  { useState, useEffect } from 'react';
import { UserService } from '../services/userService';
import { GamificationService } from '../services/gamificationService';
import { AssessmentService } from '../services/assessmentService';
import { LearningService } from '../services/learningService';

export const useBackend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsync = async (asyncFn, loadingState = true) => {
    try {
      if (loadingState) setLoading(true);
      setError(null);
      const result = await asyncFn();
      return result;
    } catch (err) {
      console.error('Backend operation failed:', err);
      setError(err.message || 'Operation failed');
      throw err;
    } finally {
      if (loadingState) setLoading(false);
    }
  };

  return {
    loading,
    error,
    
    // User Operations
    saveUser: (userData) => handleAsync(() => UserService.saveUserData(userData)),
    getUser: () => UserService.getUserData(),
    updateStats: (stats) => handleAsync(() => UserService.updateUserStats(stats)),
    addXP: (amount, reason) => handleAsync(() => UserService.addXP(amount, reason)),
    
    // Assessment Operations
    createAssessment: (skills, role) => 
      handleAsync(() => AssessmentService.createAssessment(skills, role)),
    submitAssessment: (assessmentId, answers, questions) =>
      handleAsync(async () => {
        const result = AssessmentService.calculateScore(answers, questions);
        await AssessmentService.saveAssessmentResult(assessmentId, result);
        return result;
      }),
    getAssessmentHistory: () => AssessmentService.getAssessmentHistory(),
    
    // Learning Operations
    getModule: (moduleId, trackId) =>
      handleAsync(() => LearningService.getModuleContent(moduleId, trackId)),
    submitExercise: (moduleId, exerciseId, answer) =>
      handleAsync(() => LearningService.submitExercise(moduleId, exerciseId, answer)),
    trackProgress: (moduleId, progress) =>
      handleAsync(() => LearningService.trackProgress(moduleId, progress)),
    generateCertificate: (courseId, userId) =>
      handleAsync(() => LearningService.generateCertificate(courseId, userId)),
    
    // Gamification Operations
    updateStreak: () => handleAsync(() => GamificationService.updateStreak()),
    unlockAchievement: (achievementId) =>
      handleAsync(() => GamificationService.unlockAchievement(achievementId)),
    recordActivity: (type, metadata) =>
      handleAsync(() => GamificationService.recordActivity(type, metadata)),
    getLeaderboard: (timeframe) => GamificationService.getLeaderboard(timeframe),
    
    clearError: () => setError(null)
  };
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    const userData = UserService.getUserData();
    if (userData?.achievements) {
      setAchievements(userData.achievements);
    }

    const handleAchievement = (event) => {
      setNewAchievement(event.detail);
      setAchievements(prev => [...prev, event.detail]);
      
      // Clear notification after 5 seconds
      setTimeout(() => setNewAchievement(null), 5000);
    };

    const handleLevelUp = (event) => {
      // Handle level up notifications
      console.log('Level up!', event.detail);
    };

    window.addEventListener('achievementUnlocked', handleAchievement);
    window.addEventListener('levelUp', handleLevelUp);

    return () => {
      window.removeEventListener('achievementUnlocked', handleAchievement);
      window.removeEventListener('levelUp', handleLevelUp);
    };
  }, []);

  return { achievements, newAchievement };
};

export const useProgress = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const userData = UserService.getUserData();
    if (userData?.moduleProgress) {
      setProgress(userData.moduleProgress);
    }
  }, []);

  const updateModuleProgress = async (moduleId, progressPercent) => {
    const result = await LearningService.trackProgress(moduleId, progressPercent);
    if (result?.moduleProgress) {
      setProgress(result.moduleProgress);
    }
  };

  return { progress, updateModuleProgress };
};
 