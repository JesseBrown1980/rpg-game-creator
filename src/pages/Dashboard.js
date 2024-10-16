import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../auth';

const Dashboard = () => {
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
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;