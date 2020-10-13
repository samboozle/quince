import React from 'react';

export default ({ callback, drumName, duration }) => {
  return (
    <div
      onClick={ callback }
      className="p-2 border-4 border-blue-800 hover:bg-yellow-200"
    >
      <div> { drumName } </div>
      <div> Duration: { duration }ms </div>
    </div>
  );
};