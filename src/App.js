import React from 'react';
import { connect } from 'react-redux';

import { Navbar, Sequence, Transport } from './components';
import { usePlayback } from './hooks';

import {
  tick,
  toggleHelp,
} from './actions';

const App = props => {

  usePlayback(
    _ => props.tick(),
    props.playing
      ? 60000 / props.selectedQuince.tempo / 4 
      : null
  );

  const helpMessage = _ => {
    return (
      <div className="mb-2">
        Click each drum's name to cycle through available sounds for a given kit.
        <br />
        Click the "!" box to hear the sample.
        <br />
        Click the "x" box to remove a channel from your sequence.
        <div
          className="hover:text-yellow-600"
          onClick={toggleHelp}
        >
          Click this line to hide the help!
        </div>
        <br />
        You can add different amounts of steps to each channel. Usually, you'll want them to all be the same length, but if you so choose, your parts can be offset from one another (or more consise, if one drum part repeats itself -- see the preset for "Fifteen Step" by Radiohead.)
      </div>
    );
  }

  return (
    <div className={`${props.theme}-page h-screen`}>
      <Navbar theme={props.theme} />
      <div className="container mx-auto h-auto pt-16">
        <Transport />
        { props.help && helpMessage() }
        <Sequence />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  help: state.help,
  playing: state.playing,
  selectedQuince: state.selectedQuince,
  theme: state.selectedDrumkit.name,
});

const actions = {
  tick, toggleHelp
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(App);