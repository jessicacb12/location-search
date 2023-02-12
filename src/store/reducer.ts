import { createSlice } from '@reduxjs/toolkit';

import initialState from './initial';
import ActionKeywordEnum from './keywords';
import { LocationSearchReducerType } from './types';

const locationSearchSlice = createSlice({
  name: 'location-search',
  initialState,
  reducers: {
    stopSearchMode(state) {
      state.isSearching = false;
      state.errorMessage = '';
    },
    showLoading(state) {
      state.isSearching = true;
      state.loading = true;
      state.errorMessage = '';
    },
    saveAutoComplete(
      state,
      action: LocationSearchReducerType<ActionKeywordEnum.SAVE_AUTOCOMPLETE>,
    ) {
      if (action.payload.error) state.errorMessage = action.payload.error;

      state.loading = false;
      state.predictions = action.payload.predictions;

      const currentDate = new Date();

      state.searchHistory.push({
        query: action.payload.query,
        date: `${currentDate.toDateString()}, ${currentDate.toLocaleTimeString()}`,
      });
    },
  },
});

export const { saveAutoComplete, stopSearchMode, showLoading } =
  locationSearchSlice.actions;
export default locationSearchSlice.reducer;
