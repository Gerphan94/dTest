import { Link } from 'react-router-dom';

function Navbar({ clicked, setClick }) {
  const menuClass =
    'p-3 rounded-md text-white hover:text-yellow-300 cursor-pointer hover:bg-blue-300';

  return (
    <div className="bg-blue-500 fixed top-0 w-screen h-16 p-2 z-50">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">VOLcabulary</div>
        <ul className="flex space-x-4 mr-20">
          <li className={`relative group ${menuClass}`}>
            Topic
            <ul className="mt-2 absolute hidden bg-blue-500 p-2 space-y-2 group-hover:block z-50 w-40">
              <li className='inline-block'>
                <Link className="text-white inline-block opacity-80 hover:opacity-100" to="/detail/common">Animal</Link>
              </li>

              <Link className="text-white inline-block opacity-80 hover:opacity-100" to="/detail/common">Animal</Link>
              {/* Add more sub-menu items as needed */}
            </ul>
          </li>
          <Link className={menuClass} to="/subjects">
            Words Flash
          </Link>
          <Link className={menuClass} to="/manager">
            Words List
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
