export const getAllTransactions = transactions => {
  return {
    type: "GET_ALL_TRANSACTIONS",
    payload: transactions
  }
}

export const addTransaction = transaction => {
  return {
    type: "ADD_TRANSACTION",
    payload: transaction
  }
}
