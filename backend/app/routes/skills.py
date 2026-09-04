from flask_restful import Resource, reqparse
from app import db
from app.models.skill import Skill
from app.models.quiz import Quiz
from app.services.assessment import generate_quiz
from flask_jwt_extended import jwt_required, get_jwt_identity

class SkillsList(Resource):
    def get(self):
        skills = Skill.query.all()
        return {'skills': [skill.to_dict() for skill in skills]}, 200

class SkillDetail(Resource):
    def get(self, skill_id):
        skill = Skill.query.get_or_404(skill_id)
        return skill.to_dict(), 200

class AssessSkills(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('skills', type=list, location='json', required=True)
        args = parser.parse_args()

        quiz = generate_quiz(user_id, args['skills'])
        return {'quiz': quiz}, 200