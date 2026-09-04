from app import db

class LearningMaterial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    type = db.Column(db.String(50))  # e.g., video, article
    content = db.Column(db.Text)
    difficulty = db.Column(db.String(20))

    def to_dict(self):
        return {
            'id': self.id,
            'skill_id': self.skill_id,
            'type': self.type,
            'content': self.content,
            'difficulty': self.difficulty
        }
