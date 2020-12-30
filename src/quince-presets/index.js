const bootsAndCats = {
  title: "Boots 'n' Cats",
  tempo: 120,
  channels: [
    { sample: "kick", steps: [ 1, 0, 0, 0, 0, 0, 0, 0 ] },
    { sample: "snare", steps: [ 0, 0, 0, 0, 1, 0, 0, 0 ] },
    { sample: "hat-closed", steps: [ 0, 0, 1, 0, 0, 0, 1, 0 ] }
  ],
  subdivision: 4,
  defaultKit: "Acoustic"
}

const emptyQuince = {
  title: "Empty Quince",
  tempo: 120,
  channels: [],
  subdivision: 4,
  defaultKit: "Acoustic"
}

const fifteenStep = {
  title: "Fifteen Step",
  tempo: 100,
  channels: [
    { sample: "kick", steps: [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0 ] },
    { sample: "snare", steps: [ 0, 0, 0, 1, 0, 1, 0, 0, 1, 0 ] },
    { sample: "hat-closed", steps: [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ] },
    { sample: "fx", steps: [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0 ] },
  ],
  subdivision: 4,
  defaultKit: "Electro"
}

const waltz = {
  title: "Papa Waltz",
  tempo: 144,
  channels: [
    { sample: "kick", steps: [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] },
    { sample: "snare", steps: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,] },
    { sample: "hat-closed", steps: [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1 ] },
    { sample: "cymbal", steps: [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ] },
  ],
  subdivision: 3,
  defaultKit: "Vinyl"
}

export default [
  emptyQuince,
  bootsAndCats,
  fifteenStep,
  waltz
]
.reduce((acc, quince) => {
  acc[quince.title] = quince;
  return acc;
}, {});