import  { UserService } from './userService';

export class GamificationService {
  static ACHIEVEMENTS = {
    FIRST_ASSESSMENT: {
      id: 'first_assessment',
      title: 'Getting Started',
      description: 'Complete your first assessment',
      xp: 100,
      icon: 'CheckCircle',
      rarity: 'common'
    },
    STREAK_7: {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      xp: 200,
      icon: 'Zap',
      rarity: 'uncommon'
    },
    STREAK_30: {
      id: 'streak_30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day learning streak',
      xp: 500,
      icon: 'Award',
      rarity: 'rare'
    },
    LEVEL_10: {
      id: 'level_10',
      title: 'Rising Star',
      description: 'Reach level 10',
      xp: 300,
      icon: 'Star',
      rarity: 'uncommon'
    },
    PERFECT_SCORE: {
      id: 'perfect_score',
      title: 'Perfectionist',
      description: 'Score 100% on an assessment',
      xp: 250,
      icon: 'Trophy',
      rarity: 'rare'
    },
    SKILL_MASTER: {
      id: 'skill_master',
      title: 'Skill Master',
      description: 'Reach expert level in any skill',
      xp: 400,
      icon: 'Award',
      rarity: 'epic'
    }
  };

  static async updateStreak() {
    const userData = UserService.getUserData();
    if (!userData) return null;

    const today = new Date().toDateString();
    const lastActivity = userData.lastActivityDate;
    const currentStreak = userData.streak || 0;

    let newStreak = currentStreak;

    if (lastActivity === today) {
      // Already counted today
      return userData;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActivity === yesterday.toDateString()) {
      // Continue streak
      newStreak = currentStreak + 1;
    } else if (!lastActivity || lastActivity !== today) {
      // Start new streak or reset
      newStreak = 1;
    }

    // Check for streak achievements
    this.checkStreakAchievements(newStreak);

    return UserService.saveUserData({
      ...userData,
      streak: newStreak,
      lastActivityDate: today,
      longestStreak: Math.max(userData.longestStreak || 0, newStreak)
    });
  }

  static checkStreakAchievements(streak) {
    if (streak === 7) {
      this.unlockAchievement('STREAK_7');
    } else if (streak === 30) {
      this.unlockAchievement('STREAK_30');
    }
  }

  static async unlockAchievement(achievementId) {
    const userData = UserService.getUserData();
    if (!userData) return null;

    const achievement = this.ACHIEVEMENTS[achievementId];
    if (!achievement) return null;

    // Check if already unlocked
    const unlockedAchievements = userData.achievements || [];
    if (unlockedAchievements.some(a => a.id === achievementId)) {
      return null; // Already unlocked
    }

    // Unlock achievement
    const unlockedAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString()
    };

    unlockedAchievements.push(unlockedAchievement);

    // Add XP reward
    UserService.addXP(achievement.xp, `Achievement: ${achievement.title}`);

    // Save data
    const result = UserService.saveUserData({
      ...userData,
      achievements: unlockedAchievements
    });

    // Trigger achievement notification
    this.triggerAchievementNotification(unlockedAchievement);

    return result;
  }

  static triggerAchievementNotification(achievement) {
    const event = new CustomEvent('achievementUnlocked', {
      detail: achievement
    });
    window.dispatchEvent(event);
  }

  static calculateSkillCoins(xp, level, assessmentCount) {
    // Base coins from XP (1 coin per 10 XP)
    const xpCoins = Math.floor(xp / 10);
    
    // Bonus coins from level (level * 10)
    const levelBonus = level * 10;
    
    // Assessment completion bonus (50 coins per assessment)
    const assessmentBonus = assessmentCount * 50;
    
    return xpCoins + levelBonus + assessmentBonus;
  }

  static getLeaderboard(timeframe = 'week') {
    // In a real app, this would fetch from backend
    // For now, return mock data
    return [
      { rank: 1, name: 'Alice Chen', xp: 2450, level: 8 },
      { rank: 2, name: 'Bob Smith', xp: 2100, level: 7 },
      { rank: 3, name: 'Carol Davis', xp: 1890, level: 6 },
      { rank: 4, name: 'David Wilson', xp: 1650, level: 6 },
      { rank: 5, name: 'Eve Johnson', xp: 1420, level: 5 }
    ];
  }

  static checkLevelAchievements(level) {
    const achievementLevels = [5, 10, 15, 20, 25];
    
    if (achievementLevels.includes(level)) {
      const achievementId = `LEVEL_${level}`;
      if (this.ACHIEVEMENTS[achievementId]) {
        this.unlockAchievement(achievementId);
      }
    }
  }

  static async recordActivity(activityType, metadata = {}) {
    try {
      const userData = UserService.getUserData();
      if (!userData) return null;

      const activity = {
        type: activityType,
        timestamp: new Date().toISOString(),
        metadata
      };

      // Add to activity history
      if (!userData.activityHistory) userData.activityHistory = [];
      userData.activityHistory.push(activity);

      // Update streak
      await this.updateStreak();

      // Check for activity-specific achievements
      this.checkActivityAchievements(activityType, metadata);

      return UserService.saveUserData(userData);
    } catch (error) {
      console.error('Failed to record activity:', error);
      return null;
    }
  }

  static checkActivityAchievements(activityType, metadata) {
    switch (activityType) {
      case 'assessment_complete':
        if (metadata.percentage === 100) {
          this.unlockAchievement('PERFECT_SCORE');
        }
        if (metadata.isFirstAssessment) {
          this.unlockAchievement('FIRST_ASSESSMENT');
        }
        break;
      
      case 'skill_level_up':
        if (metadata.newLevel === 'Expert') {
          this.unlockAchievement('SKILL_MASTER');
        }
        break;
    }
  }
}
 