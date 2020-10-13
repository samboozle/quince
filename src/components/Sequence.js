import React from 'react';
import { Howl } from 'howler';

import { Channel } from './';
import kit from '../sprite-maps/vinyl-01';

export default _ => {
  const vinylKit = new Howl({
    src: ['/samples/vinyl-01.mp3'],
    sprite: Object.entries(kit).reduce((acc, [ drum, { start, end } ]) => {
      drum = drum.replace(/[^-]+-/i, "");
      start = start * 1000; // start = Math.floor(+start.toFixed(4) * 1000);
      end = end * 1000;     // end = Math.ceil(+end.toFixed(4) * 1000);
      acc[drum] = [start, end - start];
      return acc;
    }, {})
  });

  const renderPads = _ => {
    return Object.entries(vinylKit._sprite).map(([ drum, [ _, duration ] ], idx) => {
      return (
        <Channel
          callback={ _ => vinylKit.play(drum) }
          drumName={ drum }
          duration={ duration }
          key={ "channel-" + idx }
        />
      );
    });
  }

  return <>{ renderPads() }</>;
};