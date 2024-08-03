export default (
    state = "",
    action: any
  ) => {
    switch (action.type) {
      case "SET_ROLE_TOKEN":
        return action.payload;
      default:
        return state;
    }
  };
  