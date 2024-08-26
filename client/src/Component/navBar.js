import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaChevronDown  } from "react-icons/fa6";
//----

import { useGlobalVariables } from "../Store/AppContext";
import UserMore from './Login/UserMore';

function Navbar({ usernameLogin, setLoggedIn, removeCookie }) {

  const urlWEB = process.env.REACT_APP_WEB_URL;
  const { projectId, logginUser } = useGlobalVariables();

  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (projectId) {
      const urlAPI = process.env.REACT_APP_API_URL;
      fetch(urlAPI + 'api/get-project-by-id/' + projectId)
        .then((res) => res.json())
        .then((data) => {
          setProjectName(data.name)
        })
    }
  }, [projectId])

  const projectMenuList = [
    { id: 'overview', name: 'Overview', url: urlWEB + 'project/overview/' + projectId },
    { id: 'todos', name: 'Todos', url: urlWEB + 'project/overview/' + projectId },
    { id: 'milestones', name: 'Milestones', url: urlWEB + 'project/overview/' + projectId },
    { id: 'testrun', name: 'Test Runs & Results', url: urlWEB + 'project/overview/' + projectId },
    { id: 'testcases', name: 'Test Cases', url: urlWEB + 'cases/view/' + projectId },
    { id: 'issues', name: 'Issues', url: urlWEB + 'issues/view/' + projectId },
    { id: 'report', name: 'Report', url: urlWEB + 'report/view/' + projectId }
  ]

  const [selectedMenu, setSelectedMenu] = useState('');


  const handleClickLink = (id) => {
    setSelectedMenu(id);
  }

  //----
  const menuClass =
    'px-2 h-full text-gray-200 hover:text-white cursor-pointer hover:border-b-2 hover:border-white';

  return (
    <div className="bg-[#0e3754] fixed top-0 w-full h-20 z-50">
      <nav className="w-full h-full">
        <div className='w-full h-14 flex justify-between'>
          <div className='flex gap-2 w-56 items-center text-white'>
            <div className=" text-2xl font-semibold px-2">
              dTest |
            </div>
            <div>
              {projectId ?
                <>
                  <div className='mb-0 mt-2 cursor-pointer select-none text-left '>
                    <Link className='text-[12px] hover:underline' to={urlWEB} >
                      <span className='flex gap-1 items-center'>
                        <FaArrowLeftLong />
                        back to Dashboard
                      </span>

                    </Link>
                    <Link 
                      className='font-bold hover:underline text-left'
                      to={urlWEB + 'project/overview/' + projectId}
                    >{projectName}</Link>
                  </div>
                </> :
                <>
                  <div className='mb-0 mt-2 cursor-pointer select-none flex gap-1'>
                    dTest QA
                  </div>
                </>

              }
            </div>
          </div>
          <div className='relative bg-[#376789] w-64 h-6 flex items-center gap-1 px-4 text-[#e0e3f4] hover:underline cursor-pointer'>
            {logginUser.username}
           <div>
             <UserMore usernameLogin={usernameLogin} setLoggedIn={setLoggedIn} removeCookie={removeCookie} />
           </div>
            </div>
        </div>
        <div className='w-full h-6 px-2'>
          <ul className="h-full flex gap-3 text-[12px] text-[#aecade] py-0.5 uppercase">
            <Link className={menuClass} to="/work-log">
              WorkLog
            </Link>
            {
              projectId && projectMenuList.map((item) => (
                <Link
                  key={item.id}
                  className={`${selectedMenu === item.id ? 'border-b-2 border-white' : ''} px-2 h-full text-gray-200 hover:text-white cursor-pointer hover:border-b-2 hover:border-white`}
                  to={item.url}
                  onClick={() => handleClickLink(item.id)}
                >
                  {item.name}
                </Link>
              ))

            }
          </ul>
        </div>


        <div className='flex gap-2 items-center text-white w-full'>
         
        </div>



      </nav>
    </div>
  );
}

export default Navbar;
