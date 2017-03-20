const DEFAULT_STATE = {
  power: 0,
  turn: 0,
  blue: false,
  green: false,
  yellow: false,
  red: false
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_POWER':
    break;
    default:
      return state;
  }
};