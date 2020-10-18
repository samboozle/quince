import React, { useEffect } from 'react';

export default props => {

  const {
    activeStep, addStep, chIdx,
    cycleSamples, playDrums, playing,
    removeChannel, removeStep, sample,
    steps, toggleStep
  } = props;

  useEffect(() =>{
    if (playing && steps[activeStep]) {
      playDrums(sample);
    }
  });

  return (
    <div className="flex flex-row my-1 w-full items-center">
      <div
        className="p-2 border-4 border-blue-800 w-48 h-12 flex justify-between items-center"
      >
        <div
          className="flex items-center justify-center w-24 h-8 border-blue-800 border-2 hover:bg-yellow-200"
          onClick={ cycleSamples }
        >
          { sample }
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 bg-white border-blue-800 border-2 hover:bg-yellow-200"
          onClick={ playDrums }
        >
          !
        </div>
        <div
          className="flex justify-center items-center w-8 h-8 border-2 border-blue-800 hover:bg-red-400"
          onClick={ removeChannel }
        >
          x
      </div>
      </div>
      <div className="mx-2 border-2 border-blue-800 w-auto flex flex-row flex-wrap items-center">
        { steps.map((step, idx) => {
          let active = activeStep === idx;
          return (
            <div
              className={ "flex justify-center items-center m-1 w-8 h-8 border-2 border-blue-800 hover:border-green-400" + ( playing && active ? " bg-green-300" : step ? " bg-blue-400" : " bg-gray-200") }
              key={ "ch-" + chIdx + "st-" + idx }
              onClick={ _ => toggleStep(idx) }
            />
          );
        }) }
      </div>
      <div
        className="ml-auto flex self-center self-end shadow rounded-full border-blue-800 border-2 active:shadow-none w-10 h-10 justify-center items-center hover:bg-yellow-200"
        onClick={ addStep }
      >
        +
      </div>
      <div
        className="ml-1 flex self-center self-end shadow rounded-full border-blue-800 border-2 active:shadow-none w-10 h-10 justify-center items-center hover:bg-yellow-200"
        onClick={ removeStep }
      >
        -
      </div>
    </div>
  );
};