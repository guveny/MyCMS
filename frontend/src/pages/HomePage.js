// File: MyCMS/frontend/src/pages/HomePage.js

import React from 'react';

const HomePage = () => {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Welcome to MyCMS</h1>
          <p>A platform to showcase my portfolio and blog about my experiences.</p>
          
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Customizable content</li>
            <li>Manage your profile</li>
            <li>Blog management</li>
            <li>Contact management</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MyCMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
