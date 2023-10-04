import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // If you have any logout logic or token removal, add here
    localStorage.removeItem('token');
    navigate("/register");
  };

  return (
    <div className="bg-blue-900 p-4 text-center">
      <div className="flex justify-end space-x-4">
        {location.pathname === "/cart" ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/register"
              className="text-white hover:text-blue-300 transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-blue-300 transition duration-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>

  );
}

export default Navbar;
