from app import db

class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    questions = db.Column(db.JSON)  # List of questions
    answers = db.Column(db.JSON)   # List of correct answers

    def to_dict(self):
        return {
            'id': self.id,
            'skill_id': self.skill_id,
            'questions': self.questions
        }