import { Link } from 'react-router-dom';
import UserMore from './Login/UserMore';
import { useParams, } from 'react-router-dom';
import { matchPath } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useRouteMatch } from "react-router-dom";

//----

function Navbar({usernameLogin, setLoggedIn, removeCookie }) {

  const urlWEB = process.env.REACT_APP_WEB_URL;

  const { projectId } = useParams();

  console.log("-----------------------------", projectId)
  //----
  const menuClass =
    'px-2 h-full text-gray-200 hover:text-white cursor-pointer hover:border-b-2 hover:border-white';
  return (
    <div className="bg-[#0e3754] w-full h-20 z-50">
      <nav className="w-full h-full">
        <div className='w-full h-14 flex'>
          <div className='flex gap-2 w-56 items-center text-white'>
            <div className=" text-2xl font-semibold px-2">
              dTest |
            </div>
            <div>
              {console.log(projectId)}
              {projectId === 0 ?
                <>
                  <div className='mb-0 mt-2 cursor-pointer select-none flex gap-1'>
                    dTest QA
                  </div>
                </> :
                <>
                  <div className='mb-0 mt-2 cursor-pointer select-none flex gap-1'>
                    TÊN PROJECT
                  </div>
                </>
              }
            </div>
          </div>
        </div>

        <div className='w-full h-6 px-2'>
          <ul className="h-full flex gap-3 text-[12px] text-[#aecade] py-0.5 uppercase">
            <Link className={menuClass} to="/">
              Dashboard
            </Link>
            <Link className={menuClass} to="/work-log">
              WorkLog
            </Link>
            {
              projectId !== 0 &&
              <>
                <Link className={menuClass} to="/cases/1">
                  overview
                </Link>
                <Link className={menuClass} to={`/cases/view/${projectId}`}>
                  TestCases
                </Link>
                <Link className={menuClass} to="/cases/1">
                  report
                </Link>
              </>
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
