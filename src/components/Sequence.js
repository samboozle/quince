import React from 'react';
import { Howl } from 'howler';
import kit from '../sprite-maps/vinyl-01';

export default _ => {
  const vinylKit = new Howl({
    src: ['/samples/vinyl-01.mp3'],
    sprite: Object.entries(kit).reduce((acc, [drum, { start, end }]) => {
      drum = drum.replace(/[^-]+-/i, "");
      start = Math.floor(+start.toFixed(4) * 1000)
      end = Math.ceil(+end.toFixed(4) * 1000)
      acc[drum] = [start, end - start];
      return acc;
    }, {})
  });

  const renderPads = _ => {
    return Object.entries(vinylKit._sprite).map(([drum, [_, duration]], idx) => {
      return (
        <div
          onClick={ _ => vinylKit.play(drum) }
          className="p-2 border-4 border-blue-800 hover:bg-yellow-200"
          key={ "pad-" + idx }
        >
          <div> { drum } </div>
          <div> Duration: { duration }ms </div>
        </div>
      );
    });
  }

  return <>{ renderPads() }</>;
};