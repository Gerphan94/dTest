from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Section, Testcase, Priority, Casetype, Worklog, Worktask
from sqlalchemy import desc
from datetime import datetime

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

@main.route('/api/get-all-projects', methods=['GET'])
def getProjects():
    print("đang fetching ...")
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

# MODULE #######################################################################

@main.route('/api/modules/<int:project_id>', methods=['GET'])
def get_modules(project_id):
    return jsonify([{
        'id': module.id, 
        'name': module.name,
        'project_id': module.project_id
        } for module in Module.query.filter_by(project_id=project_id)])
    
# SECTION #######################################################################

@main.route('/api/getSectionMainByModule/<int:module_id>', methods=['GET'])
def getSectionMainByModule(module_id):
    
    return jsonify([{
        'id': section.id, 
        'name': section.name,
        } for section in Section.query.filter_by(module_id=module_id, parent_id=0)])

@main.route('/c', methods=['GET'])
def initSectionTree(project_id):
    result = []
    lvl0Sections = Section.query.filter_by(project_id = project_id, level= 0)
    for lvl0 in lvl0Sections:
        sub0 = []
        lvl1Sections = Section.query.filter_by(parent_id = lvl0.id, level= 1)
        for lvl1 in lvl1Sections:
            sub1 = []
            lvl2Sections = Section.query.filter_by(parent_id = lvl1.id, level= 2)
            for lvl2 in lvl2Sections:
                sub2 = []
                lvl3Sections = Section.query.filter_by(parent_id = lvl2.id, level= 3)
                for lvl3 in lvl3Sections:
                    sub3 = []
                    sub2.append({'id': lvl3.id, 'name':lvl3.name, 'sub': sub3})
                sub1.append({'id': lvl2.id, 'name':lvl2.name, 'sub': sub2})
            sub0.append({'id': lvl1.id, 'name':lvl1.name, 'sub': sub1})
        result.append({'id': lvl0.id, 'name':lvl0.name, 'sub': sub0})
    return jsonify(result), 200

# SECTION #######################################################################


@main.route('/api/insert-section', methods=['POST'])
def create_section():
    data = request.get_json()
    section = Section(
        name=data['name'],
        description=data['description'],
        project_id=data['project_id'],
        parent_id=data['parent_id'],
        created_date = datetime.now(),
        updated_date = datetime.now()
    )
    db.session.add(section)
    db.session.commit()
    return jsonify({"id": section.id,"name": section.name}), 200
    

@main.route('/api/get_child_section_count/<int:section_id>', methods=['GET'])
def is_delete_section(section_id):
    child_section = Section.query.filter_by(parent_id = section_id).count()
    return jsonify({"total": child_section})


# TESTCASE  
#######################################################################   
    
@main.route('/api/cases_by_section/<int:section_id>', methods=['GET'])
def get_cases(section_id):
    return jsonify([{
        'id': case.id, 
        'title': case.title
        } for case in Testcase.query.filter_by(section_id=section_id)])

def get_cases_by_section(section_id):
    cases = db.session.query(Testcase, Priority).join(Priority, Testcase.priority_id == Priority.id).filter(Testcase.section_id == section_id).all()
    case_ar = []
    for testcase, priority in cases:
        case_obj = {}
        case_obj['case_id'] = testcase.id
        case_obj['case_title'] = testcase.title
        case_obj['priority_name'] = priority.name
        case_obj['expectation'] = testcase.expectation
        case_ar.append(case_obj)
    return case_ar


def init_case(section):
    obj = {}
    obj["section_id"] = section.id
    obj["section_name"] = section.name
    obj["section_des"] = section.description
    obj['cases'] = get_cases_by_section(section.id)
    return obj
    
@main.route('/api/get-case-by-project/<int:projectId>', methods=['GET'])
def getCasesByProject(projectId):
    def init_case(section):
        return {
            "section_id": section.id,
            "section_name": section.name,
            "section_des": section.description,
            "cases": get_cases_by_section(section.id),
            "case_count": Testcase.query.filter_by(section_id=section.id).count(),
            "sub": fetch_subsections(section.id)
        }
    def fetch_subsections(parent_id):
        sections = Section.query.filter_by(parent_id=parent_id).order_by(Section.stt)
        return [init_case(section) for section in sections]

    root_sections = Section.query.filter_by(project_id=projectId, parent_id=0).order_by(Section.stt)
    result_ar = [init_case(section) for section in root_sections]

    return jsonify(result_ar)



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

@main.route('/api/add-case/<int:section_id>', methods=['POST'])
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
            case_type = data['case_type'],
            section_id =section_id,
            created_date = datetime.now(),
            updated_date = datetime.now()
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify({
            "id" : new_case.id,
            "title": title
        })
        
    return jsonify({"error": "title is EMPTY"})


@main.route('/api/copy-case', methods=['POST'])
def copy_case():
    case_id = request.get_json()["case_id"]
    copied_case = Testcase.query.get(case_id)
    if (copied_case):
        new_case = Testcase(
            title = copied_case.title,
            description = copied_case.description,
            precondition = copied_case.precondition,
            step = copied_case.step,
            expectation = copied_case.expectation,
            priority_id = copied_case.priority_id,
            estimate = copied_case.estimate,
            case_type = copied_case.case_type,
            section_id = copied_case.section_id,
            created_date = datetime.now(),
            updated_date = datetime.now()
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify({
            "id" : new_case.id,
            "title": new_case.title
        })
    return jsonify({"error": "Case not found"})

@main.route('/api/get-case/<int:case_id>', methods=['GET'])
def get_case(case_id):
    try:
        case_detail = db.session.query(Testcase, Priority, Casetype) \
                                .join(Priority, Testcase.priority_id == Priority.id) \
                                .join(Casetype, Testcase.case_type == Casetype.id) \
                                .filter(Testcase.id == case_id) \
                                .first()
        
        if case_detail:
            testcase, priority, casetype = case_detail
            return jsonify({
                'id': testcase.id,
                'title': testcase.title,
                'priority': priority.name,
                'type': casetype.name
            })
        else:
            return jsonify({'error': 'Case not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# WORKLOG ROUTE

    

    
    
    
    
    
    
        
    

    
    
    