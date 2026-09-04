from flask_restful import Resource, reqparse
from app import db
from app.models.user_progress import UserProgress
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

class UserProgressResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        progress = UserProgress.query.filter_by(user_id=user_id).all()
        return {'progress': [p.to_dict() for p in progress]}, 200

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('material_id', type=int, required=True)
        parser.add_argument('status', type=str, required=True)
        args = parser.parse_args()

        progress = UserProgress.query.filter_by(user_id=user_id, material_id=args['material_id']).first()
        if progress:
            progress.status = args['status']
            progress.completion_date = datetime.utcnow()
        else:
            progress = UserProgress(user_id=user_id, material_id=args['material_id'], status=args['status'], completion_date=datetime.utcnow())
        db.session.add(progress)
        db.session.commit()
        return {'message': 'Progress updated'}, 200