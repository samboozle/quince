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

  const playDrums = _ => props.selectedDrumkit.drumkit.play(props.sample);
  const activeStep = props.currentTick % props.steps.length;

  useEffect(_ => {
    const isActive = !!props.steps[activeStep];
    if (props.playing && isActive) {
      playDrums();
    }
  });

  return (
    <div className="flex flex-row my-1 w-full items-center">
      <div className="p-2 border-4 border-blue-800 w-48 h-12 flex justify-between items-center">
        <div
          className="flex items-center justify-center w-24 h-8 border-blue-800 border-2 hover:bg-yellow-200"
          onClick={_ => props.cycleChannelSamples(props.chIdx, props.sample) }
        >
          { props.sample }
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 bg-white border-blue-800 border-2 hover:bg-yellow-200"
          onClick={ playDrums }
        >
          !
        </div>
        <div
          className="flex justify-center items-center w-8 h-8 border-2 border-blue-800 hover:bg-red-400"
          onClick={ _ => props.removeChannel(props.chIdx) }
        >
          x
        </div>
      </div>
      <div className="mx-2 border-2 border-blue-800 w-auto flex flex-row flex-wrap items-center">
        { props.steps.map((step, idx) => {
          let active = activeStep === idx;
          return (
            <div
              className={ "flex justify-center items-center m-1 w-8 h-8 border-2 border-blue-800 hover:border-green-400" + ( active ? " bg-green-300" : step ? " bg-blue-400" : " bg-gray-200") }
              key={ "ch-" + props.chIdx + "st-" + idx }
              onClick={ _ => props.toggleStep(props.chIdx, idx) }
            />
          );
        }) }
      </div>
      <div
        className="ml-auto flex self-center self-end shadow rounded-full border-blue-800 border-2 active:shadow-none w-10 h-10 justify-center items-center hover:bg-yellow-200"
        onClick={ _ => props.addStepToChannel(props.chIdx) }
      >
        +
      </div>
      <div
        className="ml-1 flex self-center self-end shadow rounded-full border-blue-800 border-2 active:shadow-none w-10 h-10 justify-center items-center hover:bg-yellow-200"
        onClick={ _ => props.removeStepFromChannel(props.chIdx) }
      >
        -
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