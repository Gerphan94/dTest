from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
# class Module(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255))
#     project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
#     project = db.relationship("Project", backref=backref("modules", uselist=True))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    
class Authtoken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auth_token = db.Column(db.String(255))

class Priority(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    parent_id = db.Column(db.Integer)
    level = db.Column(db.Integer)
    description = db.Column(db.String(1000))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship("Project", backref=backref("modules", uselist=True))
    
class Testcase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(1000))
    precondition = db.Column(db.String(1000))
    step = db.Column(db.String(1000))
    expectation = db.Column(db.String(1000))
    priority_id = db.Column(db.Integer, db.ForeignKey('priority.id'), nullable=False)
    priority = db.relationship("Priority", backref=backref("testcases", uselist=True))
    estimate = db.Column(db.Integer)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    section = db.relationship("Section", backref=backref("testcases", uselist=True))
    


class Worklog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    worklog_date = db.Column(db.Date)
    month = db.Column(db.String(10))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", backref=backref("worklogs", uselist=True))

class Worktask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer)
    task_name = db.Column(db.String(255))
    status = db.Column(db.String(255))
    testrun_id = db.Column(db.Integer)
    worklog_id = db.Column(db.Integer, db.ForeignKey('worklog.id'), nullable=False)
    worklog = db.relationship("Worklog", backref=backref("worktasks", uselist=True))
    
    