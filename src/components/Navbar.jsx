// src/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar(props) {
    const{userEmail,lastVisit}=props;
    
    const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'GET',
        credentials: 'include' 
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Logout successful:', data);
        window.location.href = '/login'; 
        //setErrorMessage(data.message || 'Logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ marginBottom: '1.5rem' }}>
          Easily
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/jobs">Jobs</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Recruiter
              </a>
              <ul className="dropdown-menu">
                {userEmail ? (
                  <li><Link className="dropdown-item" onClick={handleLogout}>Log Out</Link></li>
                ) : (
                  <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                )}
                <li><Link className="dropdown-item" to="/register">Register</Link></li>
                <li><Link className="dropdown-item" to="/postJob">Post new job</Link></li>
              </ul>
            </li>

            {lastVisit && (
              <li>
                <div className="alert alert-primary" role="alert">
                  Your last visit was on {lastVisit}
                </div>
              </li>
            )}
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
