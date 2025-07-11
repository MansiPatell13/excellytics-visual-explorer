import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GithubAuthHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');
    if (user) {
      localStorage.setItem('githubUser', user);
      window.history.replaceState({}, document.title, '/dashboard');
      navigate('/dashboard');
    }
  }, [navigate]);
  return null;
};

export default GithubAuthHandler; 