import * as crash from './crash.json';
import * as hatClosed from './hat-cl.json';
import * as hatOpen from './hat-op.json';
import * as kick from './kick.json';
import * as misc from './misc.json';
import * as snareAlt from './snare-alt.json';
import * as snare from './snare.json';
import * as tomHi from './tom-hi.json';
import * as tomLo from './tom-lo.json';

import { Howl } from 'howler';

const makeHowl = drumkit => {
  return new Howl({
    src: [drumkit.sample],
    sprite: Object.entries(drumkit.spritemap).reduce((acc, [drum, { start, end }]) => {
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
}

export default [
  crash, hatClosed, hatOpen,
  kick, misc, snareAlt,
  snare, tomHi, tomLo
]
.map(obj => obj.default)
.reduce((acc, drumkit) => {
  acc[drumkit.name] = makeHowl(drumkit);
  return acc;
}, {});
