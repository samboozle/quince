const emptyQuince = {
  title: "Empty Quince",
  tempo: 120,
  channels: {
    "kick": [],
    "snare": [],
    "snare-alt": [],
    "hat-open": [],
    "hat-closed": [],
    "tom-hi": [],
    "tom-lo": [],
    "crash": [],
    "misc": [],
  },
  subdivision: 4,
  defaultKit: "Acoustic"
}

const fifteenStep = {
  title: "Fifteen Step",
  tempo: 100,
  channels: {
    "kick": [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
    "snare": [ 0, 0, 0, 1, 0, 1, 0, 0, 1, 0 ],
    "snare-alt": [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0 ],
    "hat-open": [],
    "hat-closed": [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
    "tom-hi": [],
    "tom-lo": [],
    "crash": [],
    "misc": [],
  },
  subdivision: 4,
  defaultKit: "Electro"
}

const waltz = {
  title: "Papa Waltz",
  tempo: 144,
  channels: {
    "kick": [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    "snare": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
    "snare-alt": [],
    "hat-open": [],
    "hat-closed": [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1 ],
    "tom-hi": [],
    "tom-lo": [],
    "crash": [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
    "misc": [],
  },
  subdivision: 3,
  defaultKit: "Vinyl"
}

export default [
  emptyQuince,
  fifteenStep,
  waltz
]
.reduce((acc, quince) => {
  acc[quince.title] = quince;
  return acc;
}, {});