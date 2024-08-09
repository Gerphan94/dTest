from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Section, Testcase, Priority, Worklog, Worktask
from sqlalchemy import desc
from datetime import datetime

worklog = Blueprint('worklog', __name__)

@worklog.errorhandler(404)
def handle_404_error(_error):
    """Return a http 404 error to client"""
    return make_response(jsonify({'error': 'Not found'}), 404)


# get worklog month
@worklog.route('/api/get-worklog-month', methods=['GET'])
def get_worklog_month():
    result = []
    try:
        month = Worklog.query.with_entities(Worklog.month).distinct().order_by(desc(Worklog.month)).all()
        for m in month:
            result.append(m[0])
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@worklog.route('/api/get-worklog/<yyyymm>', methods=['GET'])
def get_worklog(yyyymm):
    userId = 1
    result = []
    try:
        worklogs = Worklog.query.filter_by(user_id=userId, month=yyyymm).order_by(desc(Worklog.worklog_date)).all()
        for worklog in worklogs:
            worktasks = Worktask.query.filter_by(worklog_id=worklog.id).all()
            task_ar = []
            print(type(worklog.worklog_date))
            for worktask in worktasks:
                task_ar.append({
                    'id': worktask.id,
                    'task_id': worktask.task_id,
                    'task_name': worktask.task_name,
                    'status': worktask.status
                })
            result.append({
                'id': worklog.id,
                'name': worklog.name,
                'date': worklog.worklog_date.strftime('%d/%m/%Y'),
                'task': task_ar
            })
           
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500