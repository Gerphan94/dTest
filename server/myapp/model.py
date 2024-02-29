from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class Module(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    project_id = db.Column(db.Integer, db.ForeignKey('Project.id'), nullable=False)

    
class Priority(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    
class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    module_id = db.Column(db.Integer, db.ForeignKey('Project.id'), nullable=False)
    
class Testcase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(1000))
    precondition = db.Column(db.String(1000))
    step = db.Column(db.String(1000))
    expectation = db.Column(db.String(1000))
    priority_id = db.Column(db.Integer, db.ForeignKey('Priority.id'), nullable=False)
    estimate = db.Column(db.Integer)
    section_id = db.Column(db.Integer, db.ForeignKey('Section.id'), nullable=False)