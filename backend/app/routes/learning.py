from flask_restful import Resource
from app.services.recommendation import recommend_learning_path
from flask_jwt_extended import jwt_required, get_jwt_identity

class LearningPath(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        path = recommend_learning_path(user_id)
        return {'learning_path': path}, 200