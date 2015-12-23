import { SEARCH_COMPLETE, SEARCH_BEGIN, SEARCH_ERROR } from './actions';

var INITIAL_STATE = {
	ui : {
		queryInProgress: false
	},
	search: {
		type: "cryptic muse",
		query: "enter a word and click a button",
	},
  results: []
};

function reduce(state = INITIAL_STATE, action) {
	switch(action.type) {
		case SEARCH_BEGIN:
			return {
				ui: {queryInProgress: true},
				search: action.search,
				results: []
			}
		case SEARCH_COMPLETE:
			return {
				ui: {queryInProgress: false},
				search: state.search,
				results: action.results
			};
		case SEARCH_ERROR:
			return {
				ui: {queryInProgress: false},
				search: {type: 'ERROR', query: action.err},
				results: []
			};
		default:
			return state;
	}
}

export default reduce;