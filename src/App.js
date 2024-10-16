import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Workshop from './pages/Workshop';
import Library from './pages/Library';
import Communication from './pages/Communication';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Layout><Marketplace /></Layout></ProtectedRoute>} />
        <Route path="/workshop" element={<ProtectedRoute><Layout><Workshop /></Layout></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
        <Route path="/communication" element={<ProtectedRoute><Layout><Communication /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
