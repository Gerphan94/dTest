from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Module, Section, Testcase

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
    
@main.route('/api/project_by_id/<int:project_id>', methods=['GET'])
def get_project_by_id(project_id):
    try:
        # Query the database to get the project by ID
        project = Project.query.get(project_id)

        if project:
            # If the project exists, return its details
            return jsonify({'id': project.id, 'name': project.name})
        else:
            # If the project doesn't exist, return a 404 response
            return jsonify({'error': 'Project not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
   
    
@main.route('/api/modules/<int:project_id>', methods=['GET'])
def get_modules(project_id):
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

# Fu8nction get case by sectionID
def get_cases_by_section(sectionId):
    cases = Testcase.query.filter_by(section_id=sectionId)
    case_ar = []
    for case in cases:
            case_obj = {}
            case_obj['case_id'] = case.id
            case_obj['case_title'] = case.title
            case_obj['priority_id'] = case.priority_id
            case_ar.append(case_obj)
    return case_ar

@main.route('/api/cases_by_module/<int:module_id>', methods=['GET'])
def get_cases_by_module(module_id):
    sections = Section.query.filter_by(module_id=module_id, level= 0)
    result_ar = []
    for section in sections:
        obj = {}
        obj["section_id"] = section.id
        obj["section_name"] = section.name
        obj['cases'] = get_cases_by_section(section.id)
        # LEVEL 1
        level1_sections = Section.query.filter_by(parent_id = section.id)
        child_ar = []
        for sec in level1_sections:
            childobj = {}
            childobj["section_id"] = sec.id
            childobj["section_name"] = sec.name
            childobj['cases'] = get_cases_by_section(sec.id)
            child_ar.append(childobj)
        obj['sub'] = child_ar
        result_ar.append(obj)
    return jsonify(result_ar)

@main.route('/api/add_section/<int:module_id>', methods=['POST'])
def add_section(module_id):
    data = request.get_json()
    name = data['section_name']
    parent_id = data['p_section_id']
    level = data['level']
    if (name  != ''):
        new_section = Section(
            name = name,
            parent_id = parent_id,
            module_id = module_id,
            level = level
        )
        db.session.add(new_section)
        db.session.commit()
    return jsonify({"msg": "pass"})

@main.route('/api/add_case/<int:section_id>', methods=['POST'])
def add_case(section_id):
    data = request.get_json()
    title = data['case_title']
    if (title  != ''):
        new_case = Testcase(
            title = title,
            description ='',
            precondition = '',
            step = '',
            expectation = '',
            priority_id = 2,
            estimate = 0,
            section_id =section_id
        )
        db.session.add(new_case)
        db.session.commit()
    return jsonify({"msg": "pass"})
    
    