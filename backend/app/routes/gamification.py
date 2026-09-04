from flask_restful import Resource
from app import db
from app.models.gamification import Gamification
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

class GamificationResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        gamification = Gamification.query.filter_by(user_id=user_id).first()
        if not gamification:
            gamification = Gamification(user_id=user_id)
            db.session.add(gamification)
            db.session.commit()
        return gamification.to_dict(), 200

class DailyLogin(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        gamification = Gamification.query.filter_by(user_id=user_id).first()
        if not gamification:
            gamification = Gamification(user_id=user_id)
            db.session.add(gamification)

        now = datetime.utcnow()
        if gamification.last_login:
            last_login = gamification.last_login
            if now.date() == last_login.date():
                return {'message': 'Already logged in today'}, 200
            elif (now.date() - last_login.date()).days == 1:
                gamification.streak += 1
            else:
                gamification.streak = 1
        else:
            gamification.streak = 1

        gamification.last_login = now
        gamification.xp += 10
        gamification.skillcoins += 5
        db.session.commit()
        return gamification.to_dict(), 200