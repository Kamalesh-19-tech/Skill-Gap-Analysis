export  class UserService {
  static STORAGE_KEY = 'mellowersai_user';

  static saveUserData(userData) {
    try {
      const existingData = this.getUserData() || {};
      const updatedData = {
        ...existingData,
        ...userData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      console.error('Failed to save user data:', error);
      return null;
    }
  }

  static getUserData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  static updateUserProgress(moduleId, progress) {
    const userData = this.getUserData();
    if (!userData) return null;

    if (!userData.moduleProgress) {
      userData.moduleProgress = {};
    }

    userData.moduleProgress[moduleId] = {
      progress,
      completedAt: progress >= 100 ? new Date().toISOString() : null,
      lastAccessed: new Date().toISOString()
    };

    return this.saveUserData(userData);
  }

   static updateUserStats(newStats) {
    let userData = this.getUserData();
    
    // Initialize userData if null
    if (!userData) {
      userData = {
        stats: {},
        lastUpdated: new Date().toISOString()
      };
    }

    userData.stats = {
      ...userData.stats,
      ...newStats,
      lastUpdated: new Date().toISOString()
    };

    return this.saveUserData(userData);
  } 

  static calculateLevel(xp) {
    // XP thresholds for levels
    const levels = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200, 6500];
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i]) {
        return i + 1;
      }
    }
    return 1;
  }

   static addXP(amount, reason = 'Activity completion') {
    let userData = this.getUserData();
    
    // Initialize userData if null
    if (!userData) {
      userData = {
        stats: { xp: 0, level: 1, totalActivities: 0 },
        xpHistory: [],
        lastUpdated: new Date().toISOString()
      };
    }

    const currentXP = userData.stats?.xp || 0;
    const newXP = currentXP + amount;
    const newLevel = this.calculateLevel(newXP);
    const oldLevel = this.calculateLevel(currentXP);

    const updatedStats = {
      ...userData.stats,
      xp: newXP,
      level: newLevel,
      totalActivities: (userData.stats?.totalActivities || 0) + 1
    };

    // Add XP history entry
    if (!userData.xpHistory) userData.xpHistory = [];
    userData.xpHistory.push({
      amount,
      reason,
      timestamp: new Date().toISOString(),
      totalXP: newXP
    });

    const result = this.updateUserStats(updatedStats);

    // Level up notification
    if (newLevel > oldLevel) {
      this.triggerLevelUpEvent(newLevel);
    }

    return result;
  } 

  static triggerLevelUpEvent(newLevel) {
    const event = new CustomEvent('levelUp', {
      detail: { level: newLevel }
    });
    window.dispatchEvent(event);
  }

  static clearUserData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear user data:', error);
      return false;
    }
  }
}
 