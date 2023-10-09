import React from 'react'
import { Link } from 'react-router-dom';
import Search from './Search';
// import image1 from '../assets/image1.jpg'

function Navbar() {
  return (
    <nav className="flex">
      <Link to="/">
        <span>Recipe</span>
        <span>Share</span>
      </Link>
      <Search/>
      <ul className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">
          Profile
          {/* <img
            className="bg-black-500"
            src=""
            alt=""
          /> */}
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar