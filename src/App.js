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
    props.tick,
    props.playing
      ? (60000
          / props.tempo
          / props.subdivision)
      : null
  );

  const helpMessage = (
    <div className="m-2">
      <div className="text-lg font-semibold text-center"> Welcome to quince! </div>
      <div className="font font-semibold"> What is a "quince"? </div>
      <div className="pl-4 text-sm">
        It's a sequence, a musical invention built with simple instructions!
        <br />
        Each channel below represents an instrument, either a piece of a drumkit or a string on a guitar.
        <br />
        A channel comprises an arbitrary number of pads, each of which in turn represents an instance in time.
        <br />
        The pad instructs the channel to either play the instrument sound or not based on its own state.
        <br />
        Drum pads are toggled from off to on and back with just a click.
        <br />
        Guitar pads have more playback options than just "on" or "off". Choose a fret to be played!
        <br/>
        You can add different amounts of steps to each channel. Usually, you'll want them to all be the same length, but if you so choose, your channels can be offset from one another. This can be used for rhythmic displacement or concise partwriting.
      </div>
      <br />
      <div className="font font-semibold"> Playback </div>
      <div className="pl-4 text-sm">
        Press the play button to initiate playback.
        <br />
        While your sequence is playing, every channel will advance one tick per period.
        <br />
        The period is determined by the tempo and the selected subdivision.
        <br />
        Playback is continuous! The contents of each channel loop independently.
      </div>
      <br />
      <div className="font font-semibold"> Controls </div>
      <div className="pl-4 text-sm">
        Freely add ticks to an instrument with the buttons on at each channel's end.
        <br />
        "+" and "-" add or remove one pad at a time.
        <br />
        "++" and "--" add or remove one beat (as many ticks as your currently selected subdivision).
        <br />
        The "!" button next to each instrument's name mutes playback for that channel.
        <br />
        Change the drumkit for different sounds (and colors!).
      </div>
    </div>
  );

  return (
    <div className={`${ props.theme }-page h-screen`}>
      <Navbar theme={ props.theme } />
      <div className="w-full h-auto mx-0 lg:container lg:mx-auto lg:pt-16">
        <Transport />
        { props.help && helpMessage }
        <Sequence />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  help: state.help,
  playing: state.playing,
  subdivision: state.selectedQuince.subdivision,
  tempo: state.selectedQuince.tempo,
  theme: state.selectedDrumkit,
});

const actions = {
  tick, toggleHelp
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(App);