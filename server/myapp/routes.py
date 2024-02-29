from flask import Blueprint, jsonify, request, make_response
from .model import Project, Module, Section, Testcase

main = Blueprint('main', __name__)

@main.errorhandler(404)
def handle_404_error(_error):
    """Return a http 404 error to client"""
    return make_response(jsonify({'error': 'Not found'}), 404)

@main.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify([{
        'id': project.id, 
        'name': project.name 
        } for project in Project.query.all()])
    
@main.route('/api/modules/<int:project_id>', methods=['GET'])
def get_modules(project_id):
    print("Tesstttt")
    return jsonify([{
        'id': module.id, 
        'name': module.name,
        'project_id': module.project_id
        } for module in Module.query.filter_by(project_id=project_id)])
    
@main.route('/api/cases_by_section/<int:section_id>', methods=['GET'])
def get_cases(section_id):
    return jsonify([{
        'id': case.id, 
        'title': case.title
        } for case in Testcase.query.filter_by(section_id=section_id)])


@main.route('/api/cases_by_module/<int:module_id>', methods=['GET'])
def get_cases_by_module(module_id):
    
    sections = Section.query.filter_by(module_id=module_id)
    result_ar = []
    for section in sections:
        obj = {}
        obj["section_id"] = section.id
        obj["section_name"] = section.name
        case_ar = []
        cases = Testcase.query.filter_by(section_id=section.id)
        for case in cases:
            case_obj = {}
            case_obj['case_id'] = case.id
            case_obj['case_title'] = case.title
            case_obj['priority_id'] = case.priority_id
            case_ar.append(case_obj)
        obj['cases'] = case_ar
        result_ar.append(obj)
    return jsonify(result_ar)
    
    