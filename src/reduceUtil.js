
export function add(state, action) {
  const newState = [...state, action];
  return newState;
}