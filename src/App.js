import React from 'react';

import { Navbar, Sequence } from './components';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto h-auto pt-12">
        <Sequence />
      </div>
    </>
  );
}

export default App;
