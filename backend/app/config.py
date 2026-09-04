class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///learning_platform.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'super-secret-key'  # Replace with a secure key in production
    DEBUG = True