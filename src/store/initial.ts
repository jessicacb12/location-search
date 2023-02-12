import { LocationSearchStateType } from './types';

const initialState: LocationSearchStateType = {
  predictions: [],
  searchHistory: [],
  loading: false,
  errorMessage: '',
  isSearching: false,
};
export default initialState;
