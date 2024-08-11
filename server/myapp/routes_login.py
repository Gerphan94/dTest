import jwt
from flask import Blueprint, jsonify, request, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from .model import db, User, Authtoken

import datetime

login = Blueprint('login', __name__)

def hash_password(password):
    return generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

def verify_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)

def store_token_cookie(response, token):
    response.set_cookie('access_token', 'YOUR_ACCESS_TOKEN')
    response.set_cookie('refresh_token', 'YOUR_REFRESH_TOKEN')
    response.set_cookie('auth_token', token, httponly=True, secure=True)

    return response

def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        a = jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        print(e)
        return e
    
@staticmethod
def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

@login.route('/auth/login', methods=['GET', 'POST'])
def log_in():
    # Generate or retrieve your token (e.g., JWT, session token, etc.)
    data = request.get_json()
    username = data['username']
    password = data['password']
    print(username, password)
    user = User.query.filter_by(username=username).first()

    if user and verify_password(user.password, password):
        token = encode_auth_token(user.id)
        response = make_response(jsonify({"message": "Success Login "}))
        new_token = Authtoken(auth_token=token)
        try:
            db.session.add(new_token)
            db.session.commit()
            store_token_cookie(response, token)
            return response
        except:
            db.session.rollback()
        
        
    
    return jsonify({"message": "Login Failed"})
    
    
    
    



