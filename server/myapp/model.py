from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class Module(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship("Project", backref=backref("modules", uselist=True))

class Priority(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    parent_id = db.Column(db.Integer)
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'), nullable=False)
    level = db.Column(db.Integer)
    module = db.relationship("Module", backref=backref("sections", uselist=True))
    
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
