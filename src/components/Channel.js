import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  addBeatToChannel,
  addStepToChannel,
  // cycleChannelSamples,
  // removeChannel,
  removeBeatFromChannel,
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
    { text: "++", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.addBeatToChannel(props.sample) },
    { text: "--", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeBeatFromChannel(props.sample) },
  ];
  const [muted, mute] = useState(false);

  useEffect(_ => {
    const isActive = !!props.steps[activeStep];
    if (!muted && props.playing && isActive) {
      playDrums();
    }
  });

  const renderBeats = (
    <div className={ `${props.small ? `${ theme }-b mt-1` : "" } flex flex-wrap items-center px-1`}>
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
  );

  return (
    <>
      <div className={ `${ theme }-b flex w-full items-start pt-1 ${ props.small ? "justify-center" : "" }` }>
        <div className={ `${ theme }-r pr-2 mb-1 flex w-40 h-full` }>
          <div className={ `flex items-center ${ props.small ? "" : "justify-center" } w-28` }> { props.sample } </div>
          <button
            className={ `${ theme }-button${ drum._muted ? "-invert" : "" } h-8 w-8 ml-auto` }
            onClick={ _ => mute(!muted) }
          >
            { muted ? "." : "!" }
          </button>
        </div>
        { props.small || renderBeats }
        <div className={ `flex ${ props.small ? "" : `${theme}-l ml-auto`} pl-2` }>
          { buttonsRight.map(({ text, className, fn })=> (
            <div key={ `btn-${text}` } className={ className } onClick={ fn }> { text } </div>
          ))}
        </div>
      </div>
      { props.small && renderBeats }
    </>
  );
};

const mapStateToProps = state => ({
  currentTick: state.currentTick,
  playing: state.playing,
  selectedDrumkit: state.selectedDrumkit,
});

const actions = {
  addBeatToChannel,
  addStepToChannel,
  // cycleChannelSamples,
  removeBeatFromChannel,
  removeStepFromChannel,
  toggleStep
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(Channel);