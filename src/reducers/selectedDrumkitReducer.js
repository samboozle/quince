export default (selectedDrumkit = "Vinyl", { type, payload }) => {
  switch (type) {
    case "SELECT_DRUMKIT":
      return payload;
    default:
      return selectedDrumkit;
  }
}