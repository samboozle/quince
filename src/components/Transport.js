import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changeTempo,
  selectDrumkit,
  selectQuince,
  toggleHelp,
  togglePlaying,
} from '../actions';

import DropdownMenu from './DropdownMenu';

const Transport = props => {

  const [queuedTempoChange, setQueuedTempoChange] = useState(0);

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
  };

  return (
    <div className="flex flex-row my-2 bg-yellow-500 p-2 w-full rounded shadow-sm">
      <div
        className="mr-1 p-3 rounded shadow-sm bg-white hover:bg-yellow-200 active:shadow-none"
        onClick={ props.togglePlaying }
      >
        { props.playing ? "Stop" : "Play" }
      </div>
      <div 
        className="mx-1 p-3 rounded shadow-sm bg-white flex flex-row align-center"
      >
        Tempo: { props.selectedQuince.tempo }bpm
      </div>
      <div className="flex flex-col justify-between mr-1">
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => handleChangeTempo(1) }
        >
          +
        </div>
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => handleChangeTempo(-1) }
        >
          -
        </div>
      </div>
      <div className="flex flex-col justify-between mr-1">
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => handleChangeTempo(10) }
        >
          +10
        </div>
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => handleChangeTempo(-10) }
        >
          -10
        </div>
      </div>
      <div className="mx-1 p-3 rounded shadow-sm bg-white">
        Tick: { props.currentTick }
      </div>
      <DropdownMenu
        title={ "Drumkit" }
        items={ Object.keys(props.drumkits) }
        selected={ props.selectedDrumkit.name }
        selector={ props.selectDrumkit }
      />
      <DropdownMenu
        title={ "Quince" }
        items={ Object.keys(props.quinces) }
        selected={ props.selectedQuince.title }
        selector={ props.selectQuince }
      />
      <div
        className="mx-1 p-3 rounded shadow-sm bg-white hover:bg-yellow-200 active:shadow-none"
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
  selectedDrumkit: state.selectedDrumkit,
  selectedQuince: state.selectedQuince
});

const actions = {
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