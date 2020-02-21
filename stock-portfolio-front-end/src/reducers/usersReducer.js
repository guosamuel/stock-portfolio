export default (state = {currentUser: null}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}
