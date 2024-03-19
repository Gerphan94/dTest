from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Module, Section, Testcase, Priority

main = Blueprint('main', __name__)

@main.errorhandler(404)
def handle_404_error(_error):
    """Return a http 404 error to client"""
    return make_response(jsonify({'error': 'Not found'}), 404)

@main.route('/api/priority', methods=['GET'])
def get_priority():
    return jsonify([{
        'id': priority.id, 
        'name': priority.name 
        } for priority in Priority.query.all()])

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
    
@main.route('/api/get_sections_of_module/<int:module_id>', methods=['GET'])
def get_sections_of_module(module_id):
    result_ar = []
    sections = Section.query.filter_by(module_id=module_id, level= 0)
    for section in sections:
        obj = {}
        obj['id'] = section.id
        obj['name'] = section.name
        obj['level'] = section.level
        result_ar.append(obj)
        # LEVEL 1
        section_child1s = Section.query.filter_by(parent_id=section.id)
        for child1 in section_child1s:
            obj_child1 = {}
            obj_child1['id'] = child1.id
            obj_child1['name'] = child1.name
            obj_child1['level'] = child1.level
            result_ar.append(obj_child1)
            # LEVEL 2
            section_child2s = Section.query.filter_by(parent_id=child1.id)
            for child2 in section_child2s:
                obj_child2 = {}
                obj_child2['id'] = child2.id
                obj_child2['name'] = child2.name
                obj_child2['level'] = child2.level
                result_ar.append(obj_child2)
                # LEVEL 3
                section_chil3s = Section.query.filter_by(parent_id=child2.id)
                for child3 in section_chil3s:
                    obj_child3 = {}
                    obj_child3['id'] = child3.id
                    obj_child3['name'] = child3.name
                    obj_child3['level'] = child3.level
                    result_ar.append(obj_child3)
    return jsonify(result_ar)
            
    
    
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


def init_case(section):
    obj = {}
    obj["section_id"] = section.id
    obj["section_name"] = section.name
    obj["section_level"] = section.level
    obj["section_des"] = section.description
    obj['cases'] = get_cases_by_section(section.id)
    return obj
    

@main.route('/api/cases_by_module/<int:module_id>', methods=['GET'])
def get_cases_by_module(module_id):
    sections = Section.query.filter_by(module_id=module_id, level= 0)
    result_ar = []
    for section in sections:
        obj = init_case(section)
        # LEVEL 1
        level1_sections = Section.query.filter_by(parent_id = section.id)
        child_ar = []
        for sec in level1_sections:
            child1_obj = init_case(sec)
            level2_sections = Section.query.filter_by(parent_id = sec.id)
            child2_ar = []
            for sec2 in level2_sections:
                child2_obj = init_case(sec2)
                child2_ar.append(child2_obj)
            
            child1_obj['sub'] = child2_ar
            child_ar.append(child1_obj)
        obj['sub'] = child_ar
        result_ar.append(obj)
    return jsonify(result_ar)

@main.route('/api/add_section/<int:module_id>', methods=['POST'])
def add_section(module_id):
    data = request.get_json()
    name = data['section_name']
    des = data['section_des']
    parent_id = data['p_section_id']
    level = data['level']
    if (name  != ''):
        new_section = Section(
            name = name,
            parent_id = parent_id,
            module_id = module_id,
            level = level,
            description = des
        )
        db.session.add(new_section)
        db.session.commit()
        return jsonify({"id": new_section.id,"name": name})
    return jsonify({"Error": "Section name is Empty"})

@main.route('/api/update_section/<int:section_id>', methods=['POST'])
def update_section(section_id):
    section = Section.query.get(section_id)
    if (section):
        data = request.get_json()
        section.name = data["section_name"]
        section.description = data["section_des"]
        db.session.commit()
        return jsonify({"id":section_id, "name":data["section_name"]})
    return jsonify({"error": "Section not found"})
    

@main.route('/api/add_case/<int:section_id>', methods=['POST'])
def add_case(section_id):
    data = request.get_json()
    title = data['case_title']
    if (title  != ''):
        new_case = Testcase(
            title = title,
            description = data['description'],
            precondition = data['precondition'],
            step = data['step'],
            expectation = data['expectation'],
            priority_id = data['priority'],
            estimate = data['estimate'],
            section_id =section_id
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify({
            "id" : new_case.id,
            "title": title
        })
        
        
    return jsonify({"error": "title is EMPTY"})
    
    