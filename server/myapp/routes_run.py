from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Section, Testcase, Priority, Casetype, Run, User
from sqlalchemy import case, asc, desc
from sqlalchemy.orm import aliased
from datetime import datetime

run = Blueprint('run', __name__)

@run.route('/api/get-run-detail/<int:run_id>', methods=['GET'])
def get_run_detail(run_id):
    run = Run.query.get(run_id)
    if run:
        return jsonify({
            'id': run.id,
            'name': run.name,
            'description': run.description,
            'project_id': run.project_id,
            'created_date': run.created_date,
            'created_by': run.created_by,
            'assigned_to': run.assigned_to
        }), 200
    else:
        return jsonify({'error': 'Run not found'}), 404

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


@run.route('/run-api/get-cases-by-project-id/<int:project_id>', methods=['GET'])
def get_cases_by_project_id(project_id):
    runs = db.session.query(Run, User)\
        .filter(Run.project_id == project_id, Run.is_actived == 1)\
        .join(User, Run.assigned_to == User.id)
    
    result = [{
        'id': run.id,
        'name': run.name,
        'created_by': user.username,
        'created_date': run.created_date,
        'is_completed': run.is_completed
    } for run, user in runs]

    print(result)
    return jsonify(result), 200
    
