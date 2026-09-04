import  { useState, useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import { useAchievements } from '../hooks/useBackend';

const AchievementNotification = () => {
  const { newAchievement } = useAchievements();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (newAchievement) {
      setIsVisible(true);
    }
  }, [newAchievement]);

  if (!isVisible || !newAchievement) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
      <div className="glassmorphism p-6 rounded-2xl border-2 border-yellow-400 max-w-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Achievement Unlocked!</h3>
              <p className="text-yellow-400 text-sm">{newAchievement.rarity}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <h4 className="text-white font-semibold mb-2">{newAchievement.title}</h4>
        <p className="text-blue-200 text-sm mb-3">{newAchievement.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-semibold">+{newAchievement.xp} XP</span>
          <div className="text-xs text-blue-300">
            {new Date(newAchievement.unlockedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;
 