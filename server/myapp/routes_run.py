from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Section, Testcase, Priority, Casetype, Run, User
from sqlalchemy import case, asc, desc
from sqlalchemy.orm import aliased
from datetime import datetime

run = Blueprint('run', __name__)

@run.route('/api/get-runs/<int:project_id>', methods=['GET'])
def get_runs_by_project_id(project_id):
    runs = db.session.query(Run, User)\
        .filter(Run.project_id == project_id, Run.is_actived == 1)\
        .join(User, Run.created_by == User.id)
    
    result = [{
        'id': run.id,
        'name': run.name,
        'created_by': user.username,
        'created_date': run.created_date,
        'is_completed': run.is_completed
    } for run, user in runs]

    print(result)
    return jsonify(result), 200


@run.route('/api/abc/<int:project_id>', methods=['GET'])
def abc(project_id):
    # runs = db.session.query(Run, User)\
    #     .filter(Run.project_id == project_id, Run.is_actived == 1)\
    #     .join(User, Run.created_by == User.id)
   
    return jsonify({'message': 'ok'}), 200
    
