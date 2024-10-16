import React from 'react';
import { signInWithGoogle } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to RPG Nexus</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;