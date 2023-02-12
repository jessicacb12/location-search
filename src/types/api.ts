interface MatchedSubstringType {
  length: number;
  offset: number;
}

interface TermType {
  offset: number;
  value: string;
}

interface PlaceAutoCompleteResponseType {
  description: string;
  matched_substrings: MatchedSubstringType[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: MatchedSubstringType[];
    secondary_text: string;
  };
  terms: TermType[];
  types: string[];
}

export interface PlaceAutoCompleteAPIResponseType {
  predictions: PlaceAutoCompleteResponseType[];
  status: string;
  error_message?: string;
}
