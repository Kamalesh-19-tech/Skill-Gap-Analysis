from flask import Flask
from flask_cors import CORS
from app.config import Config
from app import db, jwt, api
from app.routes.auth import Register, Login, Profile
from app.routes.skills import SkillsList, SkillDetail, AssessSkills
from app.routes.learning import LearningPath
from app.routes.progress import UserProgressResource
from app.routes.gamification import GamificationResource, DailyLogin

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)
CORS(app)

# Register API resources
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Profile, '/profile')
api.add_resource(SkillsList, '/skills')
api.add_resource(SkillDetail, '/skills/<int:skill_id>')
api.add_resource(AssessSkills, '/user/skills/assess')
api.add_resource(LearningPath, '/user/learning-path')
api.add_resource(UserProgressResource, '/user/progress')
api.add_resource(GamificationResource, '/user/gamification')
api.add_resource(DailyLogin, '/user/gamification/login')

api.init_app(app)

@app.route('/')
def home():
    return {"message": "Welcome to the Personalized Learning API!"}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)