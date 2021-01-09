import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  addBeatToString,
  addStepToString,
  removeBeatFromString,
  removeStepFromString,
  // selectFret
} from '../actions';

const String = props => {
  const { guitarString, howl, theme } = props;
  const playGuitar = fret => {
    howl.stop();
    if (fret !== "X") {
      howl.play(fret);
    }
  }
  const activeStep = props.currentTick % props.steps.length;
  const fret = props.steps[activeStep];
  const buttonsRight = [
    { text:  "+", className: `${theme}-button h-8 w-8`,      fn: _ => props.addStepToString(guitarString) },
    { text:  "-", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeStepFromString(guitarString) },
    { text: "++", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.addBeatToString(guitarString) },
    { text: "--", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeBeatFromString(guitarString) },
  ];
  const [muted, mute] = useState(false);

  useEffect(_ => {
    const isActive = !!fret;
    if (!muted && props.playing && isActive) {
      playGuitar(fret);
    }
  });

  const renderPads = (
    <div className={ `${ props.small ? `${ theme }-b mt-1` : "" } flex flex-wrap items-center px-1`}>
      { props.steps.map((step, idx) => {
        let active = props.playing && activeStep === idx;
        return (
          <div
            className={ `${ theme }-${ active ? "active" : step ? "on" : "off" } flex items-center justify-center` }
            key={ props.sample + "-st-" + idx }
            // onClick={ _ => props.toggleStep(guitarString, idx) }
          >
            { step && step }
          </div>
        );
      }) }
    </div>
  );

  return (
    <>
      <div className={ `${ theme }-b flex w-full items-start pt-1 ${ props.small ? "justify-center" : "" }` }>
        <div className={ `${ theme }-r pr-2 mb-1 flex w-40 h-full` }>
          <div className={ `flex items-center ${ props.small ? "" : "justify-center" } w-28` }> { guitarString } </div>
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
}

const makeMapStateToProps = (_initState, ownProps) => {
  const { guitarString } = ownProps;
  const mapStateToProps = state => ({
    currentTick: state.currentTick,
    playing: state.playing,
    steps: state.selectedQuince.guitar[guitarString],
    theme: state.selectedDrumkit,
  });
  return mapStateToProps;
}

const actions = {
  addBeatToString,
  addStepToString,
  removeBeatFromString,
  removeStepFromString,
  // selectFret
}

const connector = connect(
  makeMapStateToProps,
  actions
);

export default connector(String);
