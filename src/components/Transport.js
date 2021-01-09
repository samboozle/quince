import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changeSubdivision,
  changeTempo,
  selectDrumkit,
  selectQuince,
  toggleHelp,
  togglePlaying,
} from '../actions';

import DropdownMenu from './DropdownMenu';

const Transport = props => {

  const [queuedTempoChange, setQueuedTempoChange] = useState(0);
  const [controls, setControls] = useState(true);

  useEffect(_ => {
    if (queuedTempoChange) {
      props.changeTempo(queuedTempoChange);
      setQueuedTempoChange(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentTick]);

  const handleChangeTempo = offset => {
    props.playing
      ? setQueuedTempoChange(queuedTempoChange + offset)
      : props.changeTempo(offset);
  }

  const curriedTempo = offset => _ => handleChangeTempo(offset);

  const littleButton = (fn, text) => (
      <button key={ text + "-button" } className={ `ml-1 ${ props.theme }-button` } onClick={fn}>
       { text }
      </button>
  );

  const subdivisionButtonGroup = [
    { fn: _ => props.changeSubdivision( 1), text: "+" },
    { fn: _ => props.changeSubdivision(-1), text: "-" }
  ];

  const tempoButtonGroups = [
    [{ fn: curriedTempo(1),  text: "+1" }, { fn: curriedTempo(10),  text: "+10" }],
    [{ fn: curriedTempo(-1), text: "-1" }, { fn: curriedTempo(-10), text: "-10" }]
  ];

  return (
    <div className={ `${props.theme} flex flex-wrap justify-center lg:justify-start w-full lg:w-full p-2 lg:my-2` }>
      <button
        className={ `mb-1 sm:mr-1 sm:mb-0 focus:outline-none h-16 w-4/5 lg:w-16 lg:h-auto text-xl ${props.theme}-button${(props.playing ? "-invert" : "")}` }
        onClick={ props.togglePlaying }
      >
        { props.playing ? "||" : "|>" }
      </button>
      <div className={ `mr-1 ${ props.theme }-bubble ${ controls ? "flex" : "hidden lg:flex" }` }>
        <div 
          className="flex items-center mx-1"
        >
          { props.selectedQuince.tempo }bpm
        </div>
        <div className="flex flex-col">
          { tempoButtonGroups.map((group, idx) => (
              <div key={ "btngroup-" + idx } className={ `flex ${idx ? "mt-1" : ""}` }>
                { group.map(({ fn, text }) => littleButton(fn, text)) }
              </div>
            ))}
        </div>
      </div>
      <div className={ `mr-1 ${ props.theme }-bubble ${ controls ? "flex" : "hidden lg:flex" }` }>
        <div className="flex items-center mx-1">
          { props.selectedQuince.subdivision } ticks/beat
        </div>
        <div className="flex flex-col justify-between h-full">
          { subdivisionButtonGroup.map(({ fn, text }) => littleButton(fn, text)) }
        </div>
      </div>
      <DropdownMenu
        title={ "Drumkit" }
        items={ props.drumkits }
        selected={ props.theme }
        selector={ props.selectDrumkit }
        theme={ props.theme }
        css={ controls ? "flex" : "hidden lg:flex" }
      />
      <DropdownMenu
        title={ "Quince" }
        items={ Object.keys(props.quinces) }
        selected={ props.selectedQuince.title }
        selector={ props.selectQuince }
        theme={ props.theme }
        css={ controls ? "flex" : "hidden lg:flex" }
      />
      <div className={ `${ props.theme }-button w-2/5 lg:hidden h-12 my-1 mr-1` } onClick={_ => setControls(!controls) }>
        { controls ? "Hide" : "Show" } Controls
      </div>
      <div
        className={ `${ props.theme }-button w-2/5 h-12 md:h-auto my-1 lg:my-0 mr-1 lg:mr-0 lg:ml-auto lg:w-16` }
        onClick={ props.toggleHelp }
      >
        Help!
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currentTick: state.currentTick,
  drumkits: state.drumkits,
  playing: state.playing,
  quinces: state.quinces,
  samples: state.samples,
  theme: state.selectedDrumkit,
  selectedQuince: state.selectedQuince
});

const actions = {
  changeSubdivision,
  changeTempo,
  selectDrumkit,
  selectQuince,
  toggleHelp,
  togglePlaying,
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(Transport);
