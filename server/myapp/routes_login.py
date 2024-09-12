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



def encode_token(user_id):
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

@login.route('/auth/gereate-password/<string:pwd>', methods=['GET'])
def gereate_password(pwd):
    return hash_password(pwd)

@login.route('/auth/check-token/<token>', methods=['GET'])
def check_token(token):
    check_token = Token.query.filter_by(token=token).first()
    if check_token:
        user_iid = decode_token(token)  #User_id
        user = User.query.get(user_iid)
        print('check --------------------', user.username)
        
        return jsonify({'success': True, 'id': user.id, 'username': user.username}), 200 
    print('CHECK FAIL', 'lỖI TOKEN')
    return jsonify({'success': False, 'username': None}), 401
    
@login.route('/login', methods=['GET', 'POST'])
def log_in():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    print(user)

    if user and verify_password(user.password, password):
        token = encode_token(user.id)
        new_token = Token(token=token, user_id=user.id)
        try:
            db.session.add(new_token)
            db.session.commit()
            return jsonify({"token": token})
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": str(e)}), 500

    return jsonify({"message": "Login Failed"}), 401


@login.route('/auth/logout', methods=['POST'])
def log_out():
    token = request.cookies.get('token')
    print(token)
    return jsonify({'success': False})



    
    
    
    



