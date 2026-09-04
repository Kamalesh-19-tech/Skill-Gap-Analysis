export  class ProctorService {
  static initializeProctoring(onViolation) {
    const violations = {
      tabSwitches: 0,
      copyAttempts: 0,
      rightClicks: 0,
      devToolsAttempts: 0
    };

    // Tab switch detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        violations.tabSwitches++;
        onViolation('tab_switch', violations);
      }
    };

    // Copy/paste prevention
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
        e.preventDefault();
        violations.copyAttempts++;
        onViolation('copy_attempt', violations);
      }
      
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        violations.devToolsAttempts++;
        onViolation('devtools_attempt', violations);
      }
    };

    // Right-click prevention
    const handleContextMenu = (e) => {
      e.preventDefault();
      violations.rightClicks++;
      onViolation('right_click', violations);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }

  static calculateTrustScore(violations, timeSpent, questionsAnswered) {
    let score = 100;
    
    // Deduct points for violations
    score -= violations.tabSwitches * 10;
    score -= violations.copyAttempts * 15;
    score -= violations.rightClicks * 5;
    score -= violations.devToolsAttempts * 20;
    
    // Consider time spent (too fast or too slow is suspicious)
    const avgTimePerQuestion = timeSpent / questionsAnswered;
    if (avgTimePerQuestion < 10) score -= 20; // Too fast
    if (avgTimePerQuestion > 300) score -= 10; // Too slow
    
    return Math.max(0, score);
  }
}
 