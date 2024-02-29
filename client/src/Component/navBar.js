import { Link } from 'react-router-dom';



function Navbar({ clicked, setClick }) {
  const menuClass =
    'p-3 rounded-md text-white hover:text-yellow-300 cursor-pointer hover:bg-blue-300';

  return (
    <div className="bg-blue-500 fixed top-0 w-screen h-16 p-2 z-50">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">VOLcabulary</div>
        <ul className="flex space-x-4 mr-20">
          <div className='flex gap-2 bg-blue-400 w-[20px]'>

          </div>
          <Link className={menuClass} to="/cases">
            Test Cases
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
