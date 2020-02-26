/***
The purpose of Constants.js is to have a single file
that contains all of the strings that are used more than once.

This includes the strings used within the same component and
strings used for the Redux store.
***/

//***** COMPONENTS *****//

// Token for making fetch requests
export const TOKEN = `pk_43864b7d191c4bf4a768d4b932e8e4d7`

// Login.js, SignUp.js
export const EMAIL = "email"
export const PASSWORD = "password"
export const NAME = "name"

// Purchase.js
export const INPUT_TICKER = "input-ticker"
export const INPUT_SHARES = "input-shares"

//***** REDUX *****//

// transactionActions.js, transactionsReducer.js
export const GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS"
export const ADD_TRANSACTION = "ADD_TRANSACTION"

// userActions.js, usersReducer.js
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const UPDATE_BALANCE = "UPDATE_BALANCE"
