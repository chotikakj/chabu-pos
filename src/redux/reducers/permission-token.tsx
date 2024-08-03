export default (
    state = [],
    action: any
  ) => {
    switch (action.type) {
      case "SET_PERMISSION_TOKEN":
        return action.payload;
      default:
        return state;
    }
  };
  