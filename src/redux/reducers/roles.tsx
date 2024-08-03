export default (
    state = [],
    action: any
  ) => {
    switch (action.type) {
      case "SET_ROLES":
        return action.payload;
      default:
        return state;
    }
  };
  