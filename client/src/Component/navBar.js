import { Link } from 'react-router-dom';
import UserMore from './Login/UserMore';

function Navbar({ usernameLogin, setLoggedIn, removeCookie }) {
  const menuClass =
    'px-4 h-full rounded-md text-white hover:text-yellow-300 cursor-pointer hover:bg-blue-300';
  return (
    <div className="bg-[#0e3754] fixed top-0 w-screen h-16 z-50">
      <nav className="flex items-center justify-between h-full">
        <div className='flex gap-2 items-center text-white w-64'>
          <div className=" text-2xl font-semibold">
            dTest |
          </div>
          <div className='mb-0 mt-auto cursor-pointer select-none flex gap-1'>
            TÊN PROJECT
          </div>
        </div>

        <div className='w-full h-full flex flex-col justify-between'>


          <div className='bg-white ml-auto mr-0 cursor-pointer select-none flex flex-end gap-1 w-40 '>
            <div className='hover:underline font-bold' >{usernameLogin}</div>
            <div className='size-6'>
              <UserMore setLoggedIn={setLoggedIn} removeCookie={removeCookie} />
            </div>

          </div>
          <ul className="flex text-sm">
            <Link className={menuClass} to="/cases/1">
              Test Cases
            </Link>
            <Link className={menuClass} to="/work-log">
              Worklogs
            </Link>

          </ul>

        </div>


      </nav>
    </div>
  );
}

export default Navbar;
