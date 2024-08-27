from flask import Blueprint, jsonify, request, make_response
from .model import db, Project, Section, Testcase, Priority, Casetype, Worklog, Worktask, User
from sqlalchemy import case, asc, desc
from sqlalchemy.orm import aliased

from datetime import datetime
import base64

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
    
@main.route('/api/get-project-by-id/<int:project_id>', methods=['GET'])
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


    
# SECTION #######################################################################

@main.route('/api/getSectionMainByModule/<int:module_id>', methods=['GET'])
def getSectionMainByModule(module_id):
    
    return jsonify([{
        'id': section.id, 
        'name': section.name,
        } for section in Section.query.filter_by(module_id=module_id, parent_id=0)])



# SECTION #######################################################################

@main.route('/api/get-section-list/<project_id>', methods=['GET'])
def get_section_list(project_id):
    def init_section(section):
        return {
            "id": section.id,
            "name": section.name,
            "sub": fetch_subsections(section.id)
        }
    def fetch_subsections(parent_id):
        sections = Section.query.filter_by(parent_id=parent_id).order_by(Section.sort)
        return [init_section(section) for section in sections]

    root_sections = Section.query.filter_by(project_id=project_id, parent_id=0).order_by(Section.sort)
    result_ar = [init_section(section) for section in root_sections]
    return jsonify(result_ar)


@main.route('/api/insert-section', methods=['POST'])
def create_section():
    data = request.get_json()
    section = Section(
        name = data['name'],
        description = data['description'],
        project_id = data['project_id'],
        parent_id = data['parent_id']
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
        sections = Section.query.filter_by(parent_id=parent_id).order_by(Section.sort)
        return [init_case(section) for section in sections]

    root_sections = Section.query.filter_by(project_id=projectId, parent_id=0).order_by(
        case(
            (Section.sort == None, 1),
            else_=0
        ),
        Section.sort.asc()
    ).all()
    
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
            casetype_id = data['case_type'],
            section_id = section_id,
            created_date = datetime.now(),
            created_by = data['user_id'],
            updated_date = datetime.now(),
            updated_by = data['user_id']
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify({
            "id" : new_case.id,
            "title": title
        })
        
    return jsonify({"error": "title is EMPTY"})

@main.route('/api/update-case/<int:case_id>', methods=['POST'])
def update_case(case_id):
    case = Testcase.query.get(case_id)
    if (case):
        data = request.get_json()
        case.title = data["title"]
        case.description = data["description"]
        case.precondition = data["precondition"]
        case.step = data["step"]
        case.expectation = data["expectation"]
        case.priority_id = data["priority_id"]
        case.estimate = data["estimate"]
        case.casetype_id = data["casetype_id"]
        case.section_id = data["section_id"]
        case.updated_date = datetime.now()
        case.updated_by = data["user_id"]
        
        db.session.commit()
        return jsonify({"message": "Case updated successfully"}), 200
    return jsonify({"error": "Case not found"}), 404


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

@main.route('/api/get-case-by-id/<int:case_id>', methods=['GET'])
def get_caseDetail(case_id):
    CreatedByUser = aliased(User)
    UpdatedByUser = aliased(User)
    try:
        # Query to fetch the Testcase along with its related Priority and Casetype
        case_detail = db.session.query(Testcase)\
                                .join(Section, Testcase.section_id == Section.id) \
                                .join(Priority, Testcase.priority_id == Priority.id) \
                                .join(Casetype, Testcase.casetype_id == Casetype.id) \
                                .join(CreatedByUser, Testcase.created_by == CreatedByUser.id) \
                                .join(UpdatedByUser, Testcase.updated_by == UpdatedByUser.id) \
                                .filter(Testcase.id == case_id)\
                                .first()
                              
        if case_detail:
            return jsonify({
                'id': case_detail.id,
                'title': case_detail.title,
                'description': case_detail.description,
                'precondition': case_detail.precondition,
                'step': case_detail.step,
                'expectation': case_detail.expectation,
                'estimate': case_detail.estimate,
                'priority': {
                    'id': case_detail.priority.id, 
                    'name': case_detail.priority.name
                },
                'type': {
                    'id': case_detail.casetype.id, 
                    'name': case_detail.casetype.name
                },
                'section': {
                    'id': case_detail.section.id,
                    'name': case_detail.section.name
                },
                'created_date': case_detail.created_date,
                'created_by': {
                    'id': case_detail.created_by_user.id,
                    'username': case_detail.created_by_user.username
                },                    
                'updated_date': case_detail.updated_date,
                'updated_by': {
                    'id': case_detail.updated_by_user.id,
                    'username': case_detail.updated_by_user.username
                }
                
            })
        else:
            return jsonify({'error': 'Case not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/api/get-case/<int:case_id>', methods=['GET'])
def get_case(case_id):
    try:
        case_detail = db.session.query(Testcase, Priority, Casetype) \
                                .join(Priority, Testcase.priority_id == Priority.id) \
                                .join(Casetype, Testcase.casetype_id == Casetype.id) \
                                .filter(Testcase.id == case_id) \
                                .first()
        
        if case_detail:
            testcase, priority, casetype = case_detail
            return jsonify({
                'id': testcase.id,
                'title': testcase.title,
                'priority': priority.name,
                'type': casetype.name,
                'description': testcase.description,
                'precondition': testcase.precondition,
                'step': testcase.step,
                'estimate': testcase.estimate,
                'section': testcase.section.name,
                'expectation': testcase.expectation
            })
        else:
            return jsonify({'error': 'Case not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# WORKLOG ROUTE

    

    
    
    
    
    
    
        
    

    
    
    