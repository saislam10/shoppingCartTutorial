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
    <div>
      {location.pathname !== "/register" && (
        <Link to="/register">Register</Link>
      )}
      {location.pathname !== "/login" && (
        <Link to="/login">Login</Link>
      )}
      {location.pathname === "/cart" && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
