import { GET_ALL_TRANSACTIONS, ADD_TRANSACTION } from '../constants/Constants'

export default (state = {transactions: []}, action) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      }
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    default:
      return state
  }
}
