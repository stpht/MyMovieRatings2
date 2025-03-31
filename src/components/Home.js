import React from 'react';
import useAuthStore from '../store/useAuthStore'; // Import the Auth Store

function Home() {
  const user = useAuthStore((state) => state.user); // Get the user from the store

  return (
    <div>
      <h1>Welcome {user ? user.username : 'Guest'}!</h1>
      <p>This is the home page. You are {user ? 'logged in' : 'not logged in'}.</p>
    </div>
  );
}

export default Home;