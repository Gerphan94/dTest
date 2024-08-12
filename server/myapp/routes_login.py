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

def store_token_cookie(response, token):
    print(token)
    # response.set_cookie('access_token', 'YOUR_ACCESS_TOKEN')
    # response.set_cookie('access_token', token)
    response.set_cookie('auth_token', token)
    return response

def read_token_cookie(request):
    return request.cookies.get('auth_token')

def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
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
def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
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
            current_user = decode_auth_token(token)
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(current_user, *args, **kwargs)
    return decorator

@login.route('/test-cookie')
def test_cookie(response):
    print(response)
    response.set_cookie('test', 'This is a test cookie')
    return response

        
@login.route('/login', methods=['GET', 'POST'])
def log_in():
    data = request.get_json()
    username = data['username']
    password = data['password']
    print(username, password)

    user = User.query.filter_by(username=username).first()

    if user and verify_password(user.password, password):
        token = encode_auth_token(user.id)
        new_token = Token(token=token)
        try:
            db.session.add(new_token)
            db.session.commit()
            print("Generated Token:", token)
            response = make_response(jsonify({"message": "Success Login "}))
            test_cookie(response)
            # response.set_cookie('token', token, path='/', domain='localhost', httponly=True)  # Adjust domain as needed
            return response
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({"message": "Login Failed"}), 500

    return jsonify({"message": "Login Failed"}), 401


@login.route('/auth/logged_user', methods=['GET'])
def logged_user():
    user_id = ''
    user_id= decode_auth_token(read_token_cookie(request))
    return user_id
    
    
    
    



