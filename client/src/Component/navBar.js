import { Link } from 'react-router-dom';

import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
//----

import { useGlobalVariables } from "../Store/AppContext";

function Navbar({ usernameLogin, setLoggedIn, removeCookie }) {

  const urlWEB = process.env.REACT_APP_WEB_URL;

  // const { projectId } = useParams();
  const { projectId } = useGlobalVariables();
  console.log('project_id = ', projectId)

  const menuList = [
    { id: 1, name: 'Dashboard', url: urlWEB + 'project/overview/' + projectId },
    { id: 2, name: 'Worklog', url: urlWEB + 'project/report/' + projectId },
    { id: 3, name: 'Overview', url: urlWEB + 'project/setting/' + projectId },
    { id: 4, name: 'User', url: urlWEB + 'project/user/' + projectId },
    { id: 5, name: 'Log', url: urlWEB + 'project/log/' + projectId },
    { id: 6, name: 'More', url: urlWEB + 'project/more/' + projectId }
  ]

  const projectMenuList = [
    { id: 'overview', name: 'Overview', url: urlWEB + 'project/overview/' + projectId },
    { id: 'testcases', name: 'Testcases', url: urlWEB + 'cases/view/' + projectId },
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
        <div className='w-full h-14 flex'>
          <div className='flex gap-2 w-56 items-center text-white'>
            <div className=" text-2xl font-semibold px-2">
              dTest |
            </div>
            <div>
              {console.log(projectId)}
              {projectId ?
                <>
                  <div className='mb-0 mt-2 cursor-pointer select-none'>
                    <Link className='text-[12px] hover:underline' to={urlWEB} >
                      <span className='flex gap-1 items-center'>
                        <FaArrowLeftLong />
                        back to Dashboard
                      </span>

                    </Link>
                    <h2>{projectId}</h2>

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
          {/* <div className='flex gap-2'>
            <div className=" text-2xl font-semibold px-2">
              dTest |
            </div>
            <div className='mb-0 mt-auto cursor-pointer select-none flex gap-1'>
              TÊN PROJECT
            </div>
          </div> */}

          {/* <div className='w-full'>
            <div className='bg-white ml-auto mr-0 cursor-pointer select-none flex flex-end gap-1 w-40 '>
              <div className='hover:underline font-bold' >{usernameLogin}</div>
              <div className='size-6'>
                <UserMore setLoggedIn={setLoggedIn} removeCookie={removeCookie} />
              </div>

            </div>

          </div> */}


        </div>



      </nav>
    </div>
  );
}

export default Navbar;
