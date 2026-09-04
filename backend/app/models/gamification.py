from app import db
from datetime import datetime

class Gamification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    streak = db.Column(db.Integer, default=0)
    xp = db.Column(db.Integer, default=0)
    skillcoins = db.Column(db.Integer, default=0)
    last_login = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'streak': self.streak,
            'xp': self.xp,
            'skillcoins': self.skillcoins,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }