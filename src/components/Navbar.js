import React from 'react';

const Navbar = ({ theme }) => {
  return (
    <nav className={`${theme} flex top-0 w-full items-center p-4 fixed`}>
      <div className="flex items-center w-full">
        <span className="text-xl font-semibold px-2">
          quince
        </span>
        <a href="https://github.com/Samboozle/quince"
          target="_blank" rel="noopener noreferrer"
          className="ml-auto text-xl font-semibold px-2 hover:text-yellow-200"
        >
          Source
        </a>
      </div>
    </nav>
  );

}

export default Navbar;
