import ActionKeywordEnum from '../keywords';

interface SearchHistoryType {
  query: string;
  date: string;
}

export interface LocationSearchStateType {
  predictions: string[];
  searchHistory: SearchHistoryType[];
  loading: boolean;
  errorMessage: string;
  isSearching: boolean;
}

type GenActionMapType<T extends { [index: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? {
        payload?: T[Key];
        type: Key;
      }
    : {
        payload: T[Key];
        type: Key;
      };
};

interface LocationSearchReducerPayloadType {
  [ActionKeywordEnum.SHOW_LOADING]: undefined;
  [ActionKeywordEnum.SAVE_AUTOCOMPLETE]: {
    predictions: string[];
    query: string;
    error?: string;
  };
  [ActionKeywordEnum.FETCH_PREDICTION]: string;
  [ActionKeywordEnum.STOP_SEARCH_MODE]: undefined;
}

export type LocationSearchReducerType<
  K extends keyof LocationSearchReducerPayloadType,
> = GenActionMapType<LocationSearchReducerPayloadType>[K];

export interface StoreType {
  'location-search': LocationSearchStateType;
}
