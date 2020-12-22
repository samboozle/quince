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
  }

  const curriedTempo = offset => _ => handleChangeTempo(offset);

  const littleButton = (fn, text) => (
      <button className={ `ml-1 ${props.theme}-button` } onClick={fn}>
       { text }
      </button>
  );

  const buttonGroups = [
    [{ fn: curriedTempo(1),  text: "+1" }, { fn: curriedTempo(10),  text: "+10" }],
    [{ fn: curriedTempo(-1), text: "-1" }, { fn: curriedTempo(-10), text: "-10" }]
  ];

  return (
    <div className={ props.theme }>
      <div className="flex flex-row w-full p-2 my-2">
        <button
          className={ `mr-1 focus:outline-none w-16 text-xl ${props.theme}-button${(props.playing ? "-red" : "")}` }
          onClick={ props.togglePlaying }
        >
          { props.playing ? "||" : "|>" }
        </button>
        <div className={ `mr-1 ${props.theme}-bubble flex` }>
          <div 
            className="flex mx-1 align-center"
          >
            { props.selectedQuince.tempo }bpm
          </div>
          <div class="flex flex-col">
            { buttonGroups.map((group, idx) => (
                <div className={ `flex justify-between ${idx ? "mt-1" : ""}` }>
                  { group.map(({ fn, text }) => littleButton(fn, text)) }
                </div>
              ))
            }
          </div>
        </div>
        {/* <div className="p-3 mx-1 bg-white rounded active:shadow-inner">
          Tick: { props.currentTick }
        </div> */}
        <DropdownMenu
          title={ "Drumkit" }
          items={ Object.keys(props.drumkits) }
          selected={ props.theme }
          selector={ props.selectDrumkit }
          theme={ props.theme }
        />
        <DropdownMenu
          title={ "Quince" }
          items={ Object.keys(props.quinces) }
          selected={ props.selectedQuince.title }
          selector={ props.selectQuince }
          theme={ props.theme }
        />
        <div
          className={`${props.theme}-button ml-auto w-16`}
          onClick={ props.toggleHelp }
        >
          Help!
        </div>
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
  theme: state.selectedDrumkit.name,
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
