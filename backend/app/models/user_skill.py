from app import db
from datetime import datetime

class UserSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    proficiency_level = db.Column(db.Float, default=0.0)
    last_assessed = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'skill_id': self.skill_id,
            'proficiency_level': self.proficiency_level,
            'last_assessed': self.last_assessed.isoformat()
        }
    