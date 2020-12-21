import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addStepToChannel,
  cycleChannelSamples,
  removeChannel,
  removeStepFromChannel,
  toggleStep
} from '../actions';


const Channel = props => {

  const theme = props.selectedDrumkit.name;

  const playDrums = _ => props.selectedDrumkit.drumkit.play(props.sample);
  const activeStep = props.currentTick % props.steps.length;
  const buttons = [
    { text: "+", fn: _ => props.addStepToChannel(props.chIdx)      },
    { text: "-", fn: _ => props.removeStepFromChannel(props.chIdx) },
  ];

  useEffect(_ => {
    const isActive = !!props.steps[activeStep];
    if (props.playing && isActive) {
      playDrums();
    }
  });

  return (
    <div className={ `${theme}-b flex w-full items-center py-1` }>
      <div className={`${theme}-r pr-2 flex justify-between items-start w-48 h-full`}>
        <div
          className={`${theme}-button`}
          onClick={_ => props.cycleChannelSamples(props.chIdx, props.sample) }
        >
          { props.sample }
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-800 hover:bg-yellow-200"
          onClick={ playDrums }
        >
          !
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 border-2 border-blue-800 hover:bg-red-400"
          onClick={ _ => props.removeChannel(props.chIdx) }
        >
          X
        </div>
      </div>
      <div className="flex flex-wrap items-center px-1">
        { props.steps.map((step, idx) => {
          let active = props.playing && activeStep === idx;
          return (
            <div
              className={ `${theme}-${active ? "active" : step ? "on" : "off" }` }
              key={ "ch-" + props.chIdx + "st-" + idx }
              onClick={ _ => props.toggleStep(props.chIdx, idx) }
            />
          );
        }) }
      </div>
      <div className="flex ml-auto">
        { buttons.map(({ text, fn })=> <div key={`btn-${text}`} className={`${theme}-button w-6`} onClick={fn}>{ text }</div>) }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentTick: state.currentTick,
  playing: state.playing,
  selectedDrumkit: state.selectedDrumkit,
});

const actions = {
  addStepToChannel,
  cycleChannelSamples,
  removeChannel,
  removeStepFromChannel,
  toggleStep
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(Channel);