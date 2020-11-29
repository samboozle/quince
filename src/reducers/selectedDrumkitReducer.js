import drumkits from '../drum-kits';

const init = {
  name: "Acoustic",
  drumkit: drumkits["Acoustic"]
}

export default (selectedDrumkit = init, { type, payload }) => {
  switch (type) {
    case "SELECT_DRUMKIT":
      return payload;
    default:
      return selectedDrumkit;
  }
}