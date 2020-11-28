import * as acoustic from './acoustic.json';
import * as electro from './electro.json';
import * as vinyl from './vinyl.json';

import { Howl } from 'howler';

const makeHowl = drumkit => {
  console.log(drumkit)
  return new Howl({
    src: [drumkit.sample],
    sprite: Object.entries(drumkit.spritemap).reduce((acc, [drum, { start, end }]) => {
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
}

export default [
  acoustic,
  electro,
  vinyl
]
.map(obj => obj.default)
.reduce((acc, drumkit) => {
  acc[drumkit.name] = makeHowl(drumkit);
  return acc;
}, {});

