from app import db

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    user_skills = db.relationship('UserSkill', backref='skill', lazy=True)
    learning_materials = db.relationship('LearningMaterial', backref='skill', lazy=True)
    quizzes = db.relationship('Quiz', backref='skill', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }