import { Howl } from 'howler';

const intersperseSubdivisions = (obj, subdivision, offset, fill) => {
  const intersperser = (arr, prev) => {
    return arr.reduce(
      (acc, ele, idx) =>
        !((idx + 1) % prev)
          ? offset === 1
            ? [ ...acc, ele, fill ]
            : [ ...acc ]
          : [ ...acc, ele ],
      []
    );
  }

  return Object.entries(obj).reduce((acc, [ key, val ]) => {
    acc[key] = intersperser(val, subdivision);
    return acc;
  }, {})
}

const makeHowl = ({ sample, spritemap }) => {
  return new Howl({
    src: [".m4a", ".ogg"].map(format => `${ sample }${ format }`),
    sprite: Object.entries(spritemap).reduce((acc, [drum, { start, end }]) => {
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

export {
  intersperseSubdivisions,
  makeHowl
}