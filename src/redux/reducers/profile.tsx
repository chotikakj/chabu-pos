export default (
  state = {
    user_id: "",
    username: "",
    firstname: "",
    lastname: "",
    store_id: "",
  },
  action: any
) => {
  switch (action.type) {
    case "SET_PROFILE":
      return action.payload;
    default:
      return state;
  }
};
