import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../auth';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="layout">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/workshop">Workshop</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/communication">Communication</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;