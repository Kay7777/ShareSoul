import { createSelector } from 'reselect';

// choose which state to select
const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
