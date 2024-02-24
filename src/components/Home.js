import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS for styling cards

export default function Home() {
  return (
    <div className="home-container ">
      <h1 id='heading'>Welcome to Star Wars App</h1>
      <div className="card-container">
        <Link to="/planets" className="option-card" id='card'>
          <h2 className='heading' id='heading1'>Explore Planets</h2>
          <p>Discover planets from the Star Wars universe</p>
        </Link>
        <Link to="/people" className="option-card" id='card'>
          <h2 className='heading' id='heading1'>Meet People</h2>
          <p>Meet characters from the Star Wars saga</p>
        </Link>
      </div>
    </div>
  );
}
