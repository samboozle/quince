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
  const buttonsLeft  = [
    { text: props.sample, className: `${theme}-button h-8 w-28`,     fn: _ => props.cycleChannelSamples(props.chIdx, props.sample) },
    { text: "!",          className: `${theme}-button h-8 w-8 ml-2`, fn: playDrums },
    { text: "X",          className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeChannel(props.chIdx) },
  ];
  const buttonsRight = [
    { text: "+", className: `${theme}-button h-8 w-8`,      fn: _ => props.addStepToChannel(props.chIdx) },
    { text: "-", className: `${theme}-button h-8 w-8 ml-2`, fn: _ => props.removeStepFromChannel(props.chIdx) },
  ];

  useEffect(_ => {
    const isActive = !!props.steps[activeStep];
    if (props.playing && isActive) {
      playDrums();
    }
  });

  return (
    <div className={ `${theme}-b flex w-full items-start pt-1` }>
      <div className={`${theme}-r pr-2 mb-1 flex w-48 h-full`}>
        { buttonsLeft.map(({text, fn, className}) => (
          <div key={ `${text}-btn` } className={ className } onClick={ fn }> { text } </div>
        ))}
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