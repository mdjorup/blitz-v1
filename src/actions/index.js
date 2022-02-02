export const submitPicks = (picks) => {
  return {
    type: 'UPDATE_PICKS',
    payload: picks
  }
}