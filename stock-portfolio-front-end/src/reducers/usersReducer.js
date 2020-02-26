import { LOGIN, LOGOUT, UPDATE_BALANCE } from '../constants/Constants'

export default (state = {currentUser: null}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        currentUser: null
      }
    case UPDATE_BALANCE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          balance: action.payload
        }
      }
    default:
      return state
  }
}
