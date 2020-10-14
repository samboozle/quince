import React from 'react';

export default props => {
  return (
    <div className="flex flex-row my-2 bg-yellow-500 p-4 w-full">
      <div
        className="mr-1"
        onClick={ props.toggleIsPlaying }
      >
        { props.isPlaying ? "Stop" : "Play" }
      </div>
      <div 
        className="mx-1"
      >
        Tempo: { props.tempo }bpm
      </div>
      <div 
        className="mx-1"
      >
        Ticker: { props.ticker }
      </div>
    </div>
  );
}