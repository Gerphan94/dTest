import { Link } from 'react-router-dom';
import UserMore from './Login/UserMore';

function Navbar({ clicked, setClick }) {
  const menuClass =
    'p-3 rounded-md text-white hover:text-yellow-300 cursor-pointer hover:bg-blue-300';
  return (
    <div className="bg-[#0e3754] fixed top-0 w-screen h-16 p-2 z-50">
      <nav className="flex items-center justify-between">
        <div className='flex gap-2 items-center text-white'>
        <div className=" text-2xl font-semibold">
          dTest |
          </div>
          <div className='mb-0 mt-auto cursor-pointer select-none flex gap-1'>
            <div className='hover:underline font-bold' >username</div>
          
            
            <div className='size-6'>
              <UserMore />
            </div>

          </div>
        </div>
        
          
          
         
        <ul className="flex space-x-4 mr-20">
          <Link className={menuClass} to="/cases/1">
            Test Cases
          </Link>
          <Link className={menuClass} to="/work-log">
            Worklogs
          </Link>

        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
