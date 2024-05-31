import json
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# db = SQLAlchemy()

# DB_USERNAME = os.getenv('DB_USERNAME')
# DB_PASSWORD = os.getenv('DB_PASSWORD')
# DB_HOST = os.getenv('DB_HOST')
# DB_PORT = os.getenv('DB_PORT')
# DB_NAME = os.getenv('DB_NAME')

# TEST_DB_USERNAME = os.getenv('TEST_DB_USERNAME')
# TEST_DB_PASSWORD = os.getenv('TEST_DB_PASSWORD')
# TEST_DB_HOST = os.getenv('TEST_DB_HOST')
# TEST_DB_PORT = os.getenv('TEST_DB_PORT')
# TEST_DB_NAME = os.getenv('TEST_DB_NAME')

# if not os.getenv('DATABASE_URL'):
#     database_path = 'postgresql://{}:{}@{}:{}/{}'.format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)
# else:
#     database_path = os.getenv('DATABASE_URL')
#     if database_path.startswith("postgres://"):
#         database_path = database_path.replace("postgres://", "postgresql://", 1)
db = SQLAlchemy()

# def setup_db(app, database_path=database_path):
#     # if test != True:
#     app.config["SQLALCHEMY_DATABASE_URI"] = database_path
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# # else:
#     # database_path = f'postgresql://{TEST_DB_USERNAME}:{TEST_DB_PASSWORD}@{TEST_DB_HOST}:{TEST_DB_PORT}/{TEST_DB_NAME}'
#     # app.config["SQLALCHEMY_DATABASE_URI"] = database_path
#     # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#     db.app = app
#     db.init_app(app)
#     # migrate = Migrate(app, db)
#     # with app.app_context():
#     #     # db.drop_all()
#     #     db.create_all()

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    occupation = db.Column(db.String, nullable=False)
    

    def insert(self):
        db.session.add(self)
        db.session.commit()
    def update(self):
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    def format(self):
        return {'id': self.id, 'first_name': self.first_name, 'last_name': self.last_name, 'age': self.age, 'occupation': self.occupation}
    def __repr__(self):
        return json.dumps(self.format())
