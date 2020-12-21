import drumkits from '../drum-kits';

const init = {
  name: "Electro",
  drumkit: drumkits["Electro"]
}

export default (selectedDrumkit = init, { type, payload }) => {
  switch (type) {
    case "SELECT_DRUMKIT":
      return payload;
    default:
      return selectedDrumkit;
  }
}