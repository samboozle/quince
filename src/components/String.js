import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addBeatToString,
  addStepToString,
  removeBeatFromString,
  removeStepFromString
} from '../actions';
import { FretPad } from './';

const String = props => {
  console.log("String rerenders...")

  const { guitarString, howl, theme } = props;
  const buttonsRight = [
    { text:  "+", className: `${theme}-button h-8 w-8`,      fn: _ => props.addStepToString(guitarString) },
    { text:  "-", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeStepFromString(guitarString) },
    { text: "++", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.addBeatToString(guitarString) },
    { text: "--", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeBeatFromString(guitarString) },
  ];
  const [muted, mute] = useState(false);
  const playGuitar = fret => {
    if (!muted) {
      howl.stop();
      if (fret !== "X") {
        howl.play(fret);
      }
    }
  }

  const renderPads = (
    <div className={ `${ props.small ? `${ theme }-b mt-1` : "" } flex flex-wrap items-center px-1`}>
      { props.steps.map((fret, idx) => (
          <FretPad
            guitarString={ guitarString }
            idx={ idx }
            key={ guitarString + "-st-" + idx }
            playGuitar={ playGuitar }
            fret={ fret }
            makesNoise={ !!fret }
          />
        )) }
    </div>
  );

  return (
    <>
      <div className={ `${ theme }-b flex w-full items-start pt-1 ${ props.small ? "justify-center" : "" }` }>
        <div className={ `${ theme }-r pr-2 mb-1 flex w-40 h-full` }>
          <div className={ `flex items-center ${ props.small ? "" : "justify-center" } w-28` }> { guitarString } </div>
          <button
            className={ `${ theme }-button${ muted ? "-invert" : "" } h-8 w-8 ml-auto` }
            onClick={ _ => { mute(!muted); howl.stop() } }
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
  return ({ selectedDrumkit, selectedQuince }) => ({
    steps: selectedQuince.guitar[guitarString],
    theme: selectedDrumkit,
  });
}

const actions = {
  addBeatToString,
  addStepToString,
  removeBeatFromString,
  removeStepFromString,
}

const connector = connect(
  makeMapStateToProps,
  actions
);

export default connector(String);
