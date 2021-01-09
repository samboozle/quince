import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBeatToChannel,
  addStepToChannel,
  removeBeatFromChannel,
  removeStepFromChannel
} from '../actions';
import { DrumPad } from './';

const Channel = props => {

  const { drum, howl, theme } = props;
  const playDrums = _ => {
    howl.stop();
    howl.play(theme);
  }
  // const activeStep = props.currentTick % props.steps.length;
  const buttonsRight = [
    { text:  "+", className: `${theme}-button h-8 w-8`,      fn: _ => props.addStepToChannel(drum) },
    { text:  "-", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeStepFromChannel(drum) },
    { text: "++", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.addBeatToChannel(drum) },
    { text: "--", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeBeatFromChannel(drum) },
  ];
  const [muted, mute] = useState(false);



  const renderPads = (
    <div className={ `${ props.small ? `${ theme }-b mt-1` : "" } flex flex-wrap items-center px-1`}>
      { props.steps.map((step, idx) => (
          <DrumPad
            drum={ drum }
            idx={ idx }
            key={ drum + "-st-" + idx }
            playDrums={ playDrums }
            makesNoise={ !!step && !muted }
          />
        )) }
    </div>
  );

  return (
    <>
      <div className={ `${ theme }-b flex w-full items-start pt-1 ${ props.small ? "justify-center" : "" }` }>
        <div className={ `${ theme }-r pr-2 mb-1 flex w-40 h-full` }>
          <div className={ `flex items-center ${ props.small ? "" : "justify-center" } w-28` }> { drum } </div>
          <button
            className={ `${ theme }-button${ muted ? "-invert" : "" } h-8 w-8 ml-auto` }
            onClick={ _ => mute(!muted) }
          >
            { muted ? "." : "!" }
          </button>
        </div>
        { props.small || renderPads }
        <div className={ `flex ${ props.small ? "" : `${theme}-l ml-auto`} pl-2` }>
          { buttonsRight.map(({ text, className, fn })=> (
            <div key={ `btn-${text}` } className={ className } onClick={ fn }> { text } </div>
          ))}
        </div>
      </div>
      { props.small && renderPads }
    </>
  );
};

const makeMapStateToProps = (_initState, ownProps) => {
  const { drum } = ownProps;
  return ({ selectedDrumkit, selectedQuince }) => {
    const steps = selectedQuince.channels[drum];
    return {
      steps,
      theme: selectedDrumkit,
    }
  };
}

const actions = {
  addBeatToChannel,
  addStepToChannel,
  removeBeatFromChannel,
  removeStepFromChannel,
  // toggleStep
}

const connector = connect(
  makeMapStateToProps,
  actions
);

export default connector(Channel);
