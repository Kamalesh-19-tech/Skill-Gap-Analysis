from app import db
from datetime import datetime

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    material_id = db.Column(db.Integer, db.ForeignKey('learning_material.id'), nullable=False)
    status = db.Column(db.String(20), default='incomplete')
    completion_date = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'material_id': self.material_id,
            'status': self.status,
            'completion_date': self.completion_date.isoformat() if self.completion_date else None
        }