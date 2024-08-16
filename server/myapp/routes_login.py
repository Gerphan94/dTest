import jwt
from flask import Blueprint, jsonify, request, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from .model import db, User, Token

import datetime
from functools import wraps

login = Blueprint('login', __name__)

def hash_password(password):
    return generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

def verify_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)


def encode_token(user_name):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_name
        }
        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        print(e)
        return e
    
@staticmethod
def decode_token(token):
 # Specify the list of allowed algorithms

    try:
        payload = jwt.decode(
            token,
            current_app.config.get('SECRET_KEY'),
            algorithms=['HS256']  # Specify the list of allowed algorithms
        )
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
    
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # Check if token is in cookies
        if 'token' in request.cookies:
            token = request.cookies.get('auth_token')
        # Check if token is in Authorization header (Bearer token)
        elif 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            current_user = decode_token(token)
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(current_user, *args, **kwargs)
    return decorator

@login.route('/auth/check_token/<token>', methods=['GET'])
def check_token(token):
    check_token = Token.query.filter_by(token=token).first()
    print((check_token))
    if check_token:
        user = decode_token(token)
        return jsonify({'success': True, 'username': user}), 200 
    return jsonify({'success': False, 'username': None}), 401
    

@login.route('/login', methods=['GET', 'POST'])
def log_in():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and verify_password(user.password, password):
        token = encode_token(user.username)
        new_token = Token(token=token)
        try:
            db.session.add(new_token)
            db.session.commit()
            print("Generated Token:", token)
            return jsonify({"token": token})
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({"message": "Login Failed"}), 500

    return jsonify({"message": "Login Failed"}), 401


@login.route('/auth/logout', methods=['POST'])
def log_out():
    token = request.cookies.get('token')
    print(token)
    return jsonify({'success': False})
    
    
    
    



