import React from 'react';
import { Link } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

const Header = () => {
  return (
    <header className="bg-gray-800 px-3 py-3 lg:px-6 border-gray-200 text-white">
      <nav className="flex flex-wrap justify-between items-center">
        <Link to={'/'} className="flex items-center">
          <img
            className="mr-3 h-6 sm:h-9"
            src="/logoo.svg"
            alt="logo"
          />
          <span className="text-white text-xl font-semibold">
            Flow
          </span>
        </Link>

        <ProfileInfo />
      </nav>
    </header>
  );
};

export default Header;
