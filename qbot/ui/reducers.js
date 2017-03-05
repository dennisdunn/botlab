export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_POWER':
      return { position: action.payload }
    default:
      return state;
  }
};