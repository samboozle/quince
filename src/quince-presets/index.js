const bootsAndCats = {
  title: "Boots 'n' Cats",
  tempo: 120,
  channels: [
    { sample: "kick", steps: [ 1, 0, 0, 0, 0, 0, 0, 0 ] },
    { sample: "snare", steps: [ 0, 0, 0, 0, 1, 0, 0, 0 ] },
    { sample: "hat-closed", steps: [ 0, 0, 1, 0, 0, 0, 1, 0 ] }
  ],
  subdivision: 4
}

const emptyQuince = {
  title: "New Quince",
  tempo: 120,
  channels: [],
  subdivision: 4
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
  subdivision: 4
}

export default [
  emptyQuince,
  bootsAndCats,
  fifteenStep
]
.reduce((acc, quince) => {
  acc[quince.title] = quince;
  return acc;
}, {});