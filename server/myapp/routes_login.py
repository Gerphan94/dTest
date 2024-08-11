import jwt
from flask import Blueprint, jsonify, request, make_response, current_app

import datetime

login = Blueprint('login', __name__)


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
        print(user_id,a)
        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        print(e)
        return e

@login.route('/api/login', methods=['GET', 'POST'])
def log_in():
    secret_key = current_app.config['SECRET_KEY']
    
    # Generate or retrieve your token (e.g., JWT, session token, etc.)
    token = "your_generated_token_here"

    # Create a response object
    response = make_response(jsonify({"message": "Success Login " + str(secret_key)}))
    # Set the token as a cookie in the response
    response.set_cookie('auth_token', token, httponly=True, secure=True)
    
    encode_auth_token(1)
    
    
    return response



