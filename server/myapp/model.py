from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(1000))
    
class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", backref=backref("tokens", uselist=True))
    

class Priority(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

class Casetype(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
  
class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    parent_id = db.Column(db.Integer)
    description = db.Column(db.String(1000))
    sort = db.Column(db.Integer)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship("Project", backref=backref("section", uselist=True))
    
class Testcase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(1000))
    precondition = db.Column(db.String(1000))
    step = db.Column(db.String(1000))
    expectation = db.Column(db.String(1000))
    priority_id = db.Column(db.Integer, db.ForeignKey('priority.id'), nullable=False)
    priority = db.relationship("Priority", backref=backref("testcases", uselist=True))
    estimate = db.Column(db.String(255))
    uat = db.Column(db.Integer, default = 0)
    active = db.Column(db.Integer, default = 1)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    section = db.relationship("Section", backref=backref("testcases", uselist=True))
    casetype_id = db.Column(db.Integer, db.ForeignKey('casetype.id'), nullable=False)
    casetype = db.relationship("Casetype", backref=backref("testcases", uselist=True))
    created_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    updated_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_by_user = db.relationship("User", foreign_keys=[created_by], backref=backref("created_testcases", uselist=True))
    updated_by_user = db.relationship("User", foreign_keys=[updated_by], backref=backref("updated_testcases", uselist=True))

class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String(1000))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship("Project", backref=backref("modules", uselist=True))
    created_date = db.Column(db.DateTime)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_by_user = db.relationship("User", foreign_keys=[created_by], backref=backref("created_runs", uselist=True))
    assigned_to = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    assigned_to_user = db.relationship("User", foreign_keys=[assigned_to], backref=backref("assignedto_runs", uselist=True))
    completed_date = db.Column(db.DateTime)
    is_actived = db.Column(db.Integer, default = 1)
    is_completed = db.Column(db.Integer, default = 0)

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
    
    