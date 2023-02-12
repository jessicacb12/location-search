import { createAction } from '@reduxjs/toolkit';
import { mergeMap } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';

import type { PlaceAutoCompleteAPIResponseType } from '@/types/api';

import {
  mockAutoCompleteEmpty,
  mockAutoCompleteError,
  mockAutoCompleteFilled,
} from '@/__mock_data__/placeAutoComplete';

import { LocationSearchReducerType } from '../types';
import ActionKeywordEnum from '../keywords';
import { saveAutoComplete } from '../reducer';

const PARIS = 'paris';
const ERROR = 'error';

// action$ has to be any due to epicMiddleware run requirement
const fetchLocationAutoCompleteEpic = (action$: any) =>
  action$.pipe(
    ofType(ActionKeywordEnum.FETCH_PREDICTION),
    mergeMap(
      async (
        action: LocationSearchReducerType<ActionKeywordEnum.FETCH_PREDICTION>,
      ) => {
        // to replicate API fetch
        const { predictions, error_message } =
          await new Promise<PlaceAutoCompleteAPIResponseType>((resolve) => {
            setTimeout(() => {
              if (action.payload?.toLowerCase()?.includes(PARIS))
                resolve(mockAutoCompleteFilled);
              else if (action.payload?.toLowerCase()?.includes(ERROR))
                resolve(mockAutoCompleteError);
              else resolve(mockAutoCompleteEmpty);
            }, 2000);
          });

        return saveAutoComplete({
          predictions: predictions.map(({ description }) => description),
          query: action.payload,
          ...(error_message && { error: error_message }),
        });
      },
    ),
  );

export const fetchLocationAutoComplete = createAction<string>(
  ActionKeywordEnum.FETCH_PREDICTION,
);

export default combineEpics(fetchLocationAutoCompleteEpic);
