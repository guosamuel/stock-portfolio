export const login = user => {
  return {
    type: "LOGIN",
    payload: user
  }
}

export const logout = () => {
  return {
    type: "LOGOUT"
  }
}

export const updateBalance = updatedBalance => {
  return {
    type: "UPDATE_BALANCE",
    payload: updatedBalance
  }
}
