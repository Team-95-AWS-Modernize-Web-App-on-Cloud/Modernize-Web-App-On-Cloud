import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User
from datetime import datetime
from sqlalchemy import extract, desc
from auth import AuthError, requires_auth
from flask_migrate import Migrate
from typing import List, Dict, Optional
from config import production_config

def create_app(test_config=None):
    
  # create and configure the app
    APP = Flask(__name__)
    APP.config.from_mapping(production_config)
    CORS(APP)
    if test_config is not None:
        APP.config.from_mapping(test_config)
    db.APP = APP
    db.init_app(APP)
    with APP.app_context():
        migrate = Migrate(APP, db)
        #   db.drop_all()
        #   db.create_all()  
    APP.app_context().push()
    
    @APP.route('/hello', methods=['GET'])
    def hello():
        return jsonify({'message': 'Hello World!'})

    def check_user_exist(payload) -> Optional[User]:
        subject = payload['sub']
        print(subject)
        user = User.query.filter_by(subject=subject).one_or_none()
        if user:
            return user
        return None
        
    # ------------------ user ------------------

    # ---------------- endpoint for "users" resource

    @APP.route('/check-user', methods=['GET'])
    @requires_auth()
    def check_user(payload):
        user = check_user_exist(payload)
        if user:
            return jsonify({'user': user.format()})
        return jsonify({'message': 'user not found, please create a user account'}), 404


    @APP.route('/validate-jwt', methods=['POST'])
    @requires_auth()
    def validate_jwt(payload):
        return jsonify({
            'success': True,
            'message': 'JWT is valid',
            'payload': payload
        }), 200
    
    @APP.route('/users', methods=['POST'])
    @requires_auth()
    def create_user(payload):
        check_user = check_user_exist(payload)
        if check_user:
            return jsonify({'message': 'user already exists', 'user': check_user.format()}), 409
        user = request.get_json()
        if user is None:
            abort(400, description="The request body is empty")
        first_name = user.get('first_name', None)
        last_name = user.get('last_name', None)
        age = user.get('age', None)
        occupation = user.get('occupation', None)
        
        # subject = user.get('subject', None)
        # print('subject is', subject)
        subject = payload.get('sub', None)
        if subject is None:
            abort(400, description="The subject is required in the payload")
        if first_name is None or last_name is None or age is None or occupation is None:
            abort(400, description="first_name, last_name, age, and occupation are required in the request body")
        # user = User(first_name=first_name, last_name=last_name, age=age, occupation=occupation, subject=subject)
        # print('user is', user.format())
        # user.insert()

        try:
            
            
            user = User(**user, subject=subject)
            user.insert()
            return jsonify({'user': user.format()}), 201
        except:
            abort(422, description="The user could not be created due to the request body is not valid or the server is not able to process the request at the moment")

    #----- endpoint for "users" resource

    # ---------------- Error Handling -------------------

    @APP.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": error.description
        }), 400

    @APP.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": error.description
        }), 404

    @APP.errorhandler(422)
    def unprocessable_entity(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": error.description
        }), 422

    @APP.errorhandler(409)
    def conflict(error):
        return jsonify({
            "success": False,
            "error": 409,
            "message": error.description
        }), 409

    @APP.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False,
            "error": 500,
            "message": 'Internal Server Error'
        }), 500

    @APP.errorhandler(AuthError)
    def auth_error(error):
        return jsonify({
            "success": False,
            "error": error.status_code,
            "message": error.error['description']
        }), error.status_code

    if __name__ == '__main__':
        APP.run(host='0.0.0.0', port=8083, debug=True)
    return APP