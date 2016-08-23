
export function add(state, action) {
  const newState = [...state, action];
  return newState;
}

export function clear(state, action) {
  const newState = [];
  return newState;
}
