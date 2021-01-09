import { combineReducers } from 'redux';

import selectedDrumkit from './selectedDrumkitReducer';
import selectedQuince from './selectedQuinceReducer';

import drums from '../drum-kits';
import strings from '../guitar-strings';
import quinces from '../quince-presets';

const intersperse = (bool = true, { type }) => {
  switch (type) {
    case "INTERSPERSE_ON_SUBDIVISION_CHANGE":
      return !bool;
    default:
      return bool;
  }
}

const tick = (prev = 0, { type }) => {
  switch (type) {
    case "TICK":
      return prev + 1;
    case "TOGGLE_PLAYING":
      return 0;
    default:
      return prev;
  }
}

const toggleHelp = (help = false, { type }) => {
  switch (type) {
    case "TOGGLE_HELP":
      return !help;
    default:
      return help;
  }
}

const togglePlaying = (playing = false, { type }) => {
  switch (type) {
    case "TOGGLE_PLAYING":
      return !playing;
    default:
      return playing;
  }
}

export default combineReducers({
  currentTick: tick,
  drums: _ => drums,
  drumkits: _ => ["Acoustic", "Electro", "Vinyl"],
  help: toggleHelp,
  intersperse,
  playing: togglePlaying,
  quinces: _ => quinces,
  samples: _ => ["kick", "snare", "snare-alt", "hat-open", "hat-closed", "tom-hi", "tom-lo", "crash", "misc"],
  selectedDrumkit,
  selectedQuince,
  strings: _ => strings,
});
