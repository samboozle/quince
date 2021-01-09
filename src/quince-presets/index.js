const emptyQuince = {
  title: "Empty Quince",
  tempo: 120,
  channels: {
    "kick":       [],
    "snare":      [],
    "snare-alt":  [],
    "hat-open":   [],
    "hat-closed": [],
    "tom-hi":     [],
    "tom-lo":     [],
    "crash":      [],
    "misc":       [],
  },
  guitar: {
    "e": [],
    "B": [],
    "G": [],
    "D": [],
    "A": [],
    "E": [],
  },
  subdivision: 4,
  defaultKit: "Acoustic"
}

const fifteenStep = {
  title: "Fifteen Step",
  tempo: 100,
  channels: {
    "kick":       [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
    "snare":      [ 0, 0, 0, 1, 0, 1, 0, 0, 1, 0 ],
    "snare-alt":  [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0 ],
    "hat-open":   [],
    "hat-closed": [ 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
    "tom-hi":     [],
    "tom-lo":     [],
    "crash":      [],
    "misc":       [],
  },
  guitar: {
    "e": [],
    "B": [],
    "G": [],
    "D": [],
    "A": [],
    "E": [],
  },
  subdivision: 4,
  defaultKit: "Electro"
}

const hemophilia = {
  title: "Hemophilia",
  tempo: 66,
  channels: {
    "kick":       [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ],
    "snare":      [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
    "snare-alt":  [],
    "hat-open":   [],
    "hat-closed": [ 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0 ],
    "tom-hi":     [],
    "tom-lo":     [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    "crash":      [ 1, 0, 0, 0, 0, 0, 0, 0 ],
    "misc":       [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
  },
  guitar: {
    "e": [],
    "B": [],
    "G": [],
    "D": [],
    "A": [],
    "E": [],
  },
  subdivision: 8,
  defaultKit: "Vinyl"
}

const waltz = {
  title: "Papa Waltz",
  tempo: 144,
  channels: {
    "kick":       [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    "snare":      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
    "snare-alt":  [],
    "hat-open":   [],
    "hat-closed": [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1 ],
    "tom-hi":     [],
    "tom-lo":     [],
    "crash":      [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
    "misc":       [],
  },
  guitar: {
    "e": [],
    "B": [],
    "G": [],
    "D": [],
    "A": [],
    "E": [],
  },
  subdivision: 3,
  defaultKit: "Vinyl"
}

const whatIGaveAway = {
  title: "What I Gave Away",
  tempo: 150,
  channels: {
    "kick":       [],
    "snare":      [],
    "snare-alt":  [],
    "hat-open":   [],
    "hat-closed": [],
    "tom-hi":     [],
    "tom-lo":     [],
    "crash":      [],
    "misc":       [],
  },
  guitar: {
    "e": [],
    "B": [
      "X", null, null, null, "12", "X", "10",
      "X", null, null, null, "12", "X", "10",
      "X", null, null, null, "10", "X", "08",
      "X", null, null, null, "10", "X", "08",
      "X", null, null, null, "08", "X", "07",
      "X", null, null, null, "08", "X", "07",
      "X", null, null, null, "08", "X", "07",
      "X", null, null, null, "08", "X", "07",
    ],
    "G": [
      null, null, null, "09", "X", "09", "X",
      null, null, null, "09", "X", "09", "X",
      null, null, null, "07", "X", "07", "X",
      null, null, null, "07", "X", "07", "X",
      null, null, null, "05", "X", "05", "X",
      null, null, null, "05", "X", "05", "X",
      null, null, null, "05", "X", "05", "X",
      null, null, null, "05", "X", "05", "X",
    ],
    "D": [
      null, null, "12", "X", null, null, null,
      null, null, "12", "X", null, null, null,
      null, null, "10", "X", null, null, null,
      null, null, "10", "X", null, null, null,
      null, null, "09", "X", null, null, null,
      null, null, "09", "X", null, null, null,
      null, null, "09", "X", null, null, null,
      null, null, "09", "X", null, null, null,
    ],
    "A": [
      null, "10", "X", null, null, null, null,
      null, "10", "X", null, null, null, null,
      null, "09", "X", null, null, null, null,
      null, "09", "X", null, null, null, null,
      null, "07", "X", null, null, null, null,
      null, "07", "X", null, null, null, null,
      null, "06", "X", null, null, null, null,
      null, "06", "X", null, null, null, null,
    ],
    "E": [
      "08", "X", null, null, null, null, null,
      "08", "X", null, null, null, null, null,
      "07", "X", null, null, null, null, null,
      "07", "X", null, null, null, null, null,
      "05", "X", null, null, null, null, null,
      "05", "X", null, null, null, null, null,
      "05", "X", null, null, null, null, null,
      "05", "X", null, null, null, null, null,
    ],
  },
  subdivision: 2,
  defaultKit: "Vinyl"
}

export default [
  emptyQuince,
  fifteenStep,
  hemophilia,
  waltz,
  whatIGaveAway
]
.reduce((acc, quince) => {
  acc[quince.title] = quince;
  return acc;
}, {});