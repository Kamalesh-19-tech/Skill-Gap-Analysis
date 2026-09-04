from app.models.user_skill import UserSkill
from app.models.learning_material import LearningMaterial

def recommend_learning_path(user_id):
    # Find skills with low proficiency
    user_skills = UserSkill.query.filter_by(user_id=user_id).all()
    skill_gaps = [us.skill_id for us in user_skills if us.proficiency_level < 50.0]
    
    # Recommend materials for skill gaps
    materials = LearningMaterial.query.filter(LearningMaterial.skill_id.in_(skill_gaps)).order_by(LearningMaterial.difficulty).all()
    return [material.to_dict() for material in materials]