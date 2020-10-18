import React from 'react';

const Navbar = _ => {
  return (
    <nav className="flex top-0 w-full items-center py-2 px-4 bg-yellow-500 border-b-2 border-blue-800 fixed">
      <div className="flex items-center text-white w-full">
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
