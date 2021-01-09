import React from 'react';

const Navbar = ({ theme }) => {
  return (
    <nav className={`${theme} flex top-0 w-full items-center p-4 lg:fixed rounded-none z-50`}>
      <div className="flex items-center w-full">
        <span className="px-2 text-xl font-semibold">
          quince
        </span>
        <a href="https://github.com/Samboozle/quince"
          target="_blank" rel="noopener noreferrer"
          className="px-2 ml-auto text-xl font-semibold hover:text-yellow-200"
        >
          Source
        </a>
      </div>
    </nav>
  );

}

export default Navbar;
