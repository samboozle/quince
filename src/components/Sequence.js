import React from 'react';
import { Howl } from 'howler';

import { Channel } from './';

export default (props) => {

  const { 
    addChannel, addStepToChannel, cycleSamples, 
    drumKit, playing, quince, removeChannel,
    removeStepFromChannel, tick, toggleStep
  } = props;

  const kit = new Howl({
    src: [ drumKit.sample ],
    sprite: Object.entries(drumKit.spritemap).reduce((acc, [ drum, { start, end } ]) => {
      drum = drum.replace(/[^-]+-/i, "");
      start = start * 1000; // start = Math.floor(+start.toFixed(4) * 1000);
      end = end * 1000;     // end = Math.ceil(+end.toFixed(4) * 1000);
      acc[drum] = [start, end - start];
      return acc;
    }, {})
    // The Howl `sprite` property is a key-value store
    // that maps the name of a sample to its starting and ending
    // timestamps in seconds (e.g., `"kick": { start: 0, end: 0.7 }`).
    // I used the `audiosprite` tool to take a folder containing one drum kit's
    // samples and generate a sprite from those sounds. `audiosprite` also
    // generates a .json file -- this is what I'm reducing my drumKit from.
  });

  const renderChannels = _ => {
    return quince.channels.map(({ sample, steps }, idx) => {
      let key = "ch-" + idx;
      let activeStep = tick % steps.length;
      return (
        <Channel
          activeStep={ activeStep }
          addStep={ _ => addStepToChannel(idx) }
          chIdx={ idx }
          sample={ sample }
          cycleSamples={ _ => cycleSamples(idx, sample) }
          key={ key }
          playDrums={ _ => kit.play(sample) }
          playing={ playing }
          removeChannel={ _ => removeChannel(idx) }
          removeStep={ _ => removeStepFromChannel(idx) }
          steps={ steps }
          toggleStep={ toggleStep(idx) }
        />
      )
    });
  }

  return (
    <>
      { renderChannels() }
      <div
        onClick={ addChannel }
        className="p-2 border-4 border-blue-800 hover:bg-yellow-200 w-40 h-12 flex justify-center items-center"
      >
        Add Channel
      </div>
    </>
  );
}
