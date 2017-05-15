// logging reducer
export default (state={}, action) => {
  if(action.type.charAt(0) != '@')
  {
    console.log(action)
  }
  return state
}
