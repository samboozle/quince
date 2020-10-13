import React from 'react';
import { Howl } from 'howler';

import { Channel } from './';

export default ({ drumKit }) => {

  const kit = new Howl({
    src: [ drumKit.sample ],
    sprite: Object.entries(drumKit.spritemap).reduce((acc, [ drum, { start, end } ]) => {
      drum = drum.replace(/[^-]+-/i, "");
      start = start * 1000; // start = Math.floor(+start.toFixed(4) * 1000);
      end = end * 1000;     // end = Math.ceil(+end.toFixed(4) * 1000);
      acc[drum] = [start, end - start];
      return acc;
    }, {})
    // The Howl `sprite` property is a key-value store
    // that maps the name of a sample to its starting and ending
    // timestamps in seconds (e.g., `"kick": { start: 0, end: 0.7 }`).
    // I used the `audiosprite` tool to take a folder containing one drum kit's
    // samples and generate a sprite from those sounds. `audiosprite` also
    // generates a .json file -- this is what I'm reducing my drumKit from.
  });

  const renderPads = _ => {
    return Object.entries(kit._sprite).map(([ drum, [ _, duration ] ], idx) => {
      return (
        <Channel
          callback={ _ => kit.play(drum) }
          drumName={ drum }
          duration={ duration }
          key={ "channel-" + idx }
        />
      );
    });
  }

  return <>{ renderPads() }</>;
};