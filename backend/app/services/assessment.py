from app.models.quiz import Quiz
import random

def generate_quiz(user_id, skill_ids):
    quizzes = Quiz.query.filter(Quiz.skill_id.in_(skill_ids)).all()
    if not quizzes:
        return {'questions': [], 'message': 'No quizzes available for selected skills'}
    
    # Select 1-3 questions per skill randomly
    selected_questions = []
    for quiz in quizzes:
        questions = quiz.questions if quiz.questions else []
        num_questions = min(len(questions), random.randint(1, 3))
        selected_questions.extend(random.sample(questions, num_questions))
    
    return {'questions': selected_questions}