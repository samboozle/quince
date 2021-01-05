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
  const { drum } = props;
  const theme = props.selectedDrumkit;
  const playDrums = _ => {
    drum.stop();
    drum.play(theme);
  }
  const activeStep = props.currentTick % props.steps.length;
  const buttonsRight = [
    { text: "+", className: `${theme}-button h-8 w-8`,      fn: _ => props.addStepToChannel(props.sample) },
    { text: "-", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeStepFromChannel(props.sample) },
  ];

  useEffect(_ => {
    const isActive = !!props.steps[activeStep];
    if (props.playing && isActive) {
      playDrums();
    }
  });

  return (
    <div className={ `${ theme }-b flex w-full items-start pt-1` }>
      <div className={ `${ theme }-r pr-2 mb-1 flex w-40 h-full` }>
        <div className="flex items-center justify-center w-28"> { props.sample } </div>
        <button
          className={ `${ theme }-button${ drum._muted ? "-invert" : "" } h-8 w-8 ml-auto` }
          onClick={ _ => drum._muted ? drum.mute(false) : drum.mute(true) }
        >
          { drum._muted ? "." : "!" }
        </button>
      </div>
      <div className="flex flex-wrap items-center px-1">
        { props.steps.map((step, idx) => {
          let active = props.playing && activeStep === idx;
          return (
            <div
              className={ `${theme}-${active ? "active" : step ? "on" : "off" }` }
              key={ props.sample + "-st-" + idx }
              onClick={ _ => props.toggleStep(props.sample, idx) }
            />
          );
        }) }
      </div>
      <div className={ `flex ml-auto pl-2 ${theme}-l` }>
        { buttonsRight.map(({ text, className, fn })=> (
          <div key={ `btn-${text}` } className={ className } onClick={ fn }> { text } </div>
        ))}
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