export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_COMPLETE = 'SEARCH_COMPLETE';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_CHANGE = 'SEARCH_CHANGE';

export function beginSearch(type, query) {
	return {
		type: SEARCH_BEGIN,
		search: {
			type: type,
			query: query
		}
	};
}

export function completeSearch(results) {
  return {
    type: SEARCH_COMPLETE,
    results: results
  };
}

export function errorSearch(err) {
  return {
    type: SEARCH_ERROR,
    err: err
  };
}

export function changeSearch(text) {
  return {
    type: SEARCH_CHANGE,
    text: text
  };
}
