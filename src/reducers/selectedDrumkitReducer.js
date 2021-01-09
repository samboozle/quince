export default (selectedDrumkit = "Acoustic", { type, payload }) => {
  switch (type) {
    case "SELECT_DRUMKIT":
      return payload;
    default:
      return selectedDrumkit;
  }
}