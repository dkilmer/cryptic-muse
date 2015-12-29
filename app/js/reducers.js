import { SEARCH_COMPLETE, SEARCH_BEGIN, SEARCH_ERROR, SEARCH_CHANGE } from './actions';

var INITIAL_STATE = {
	ui : {
		queryInProgress: false,
		searchText: ''
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
				ui: {queryInProgress: true, searchText: state.ui.searchText},
				search: action.search,
				results: []
			};
		case SEARCH_COMPLETE:
			return {
				ui: {queryInProgress: false, searchText: state.ui.searchText},
				search: state.search,
				results: action.results
			};
		case SEARCH_ERROR:
			return {
				ui: {queryInProgress: false, searchText: state.ui.searchText},
				search: {type: 'ERROR', query: action.err},
				results: []
			};
		case SEARCH_CHANGE:
			return {
				ui: {queryInProgress: state.ui.queryInProgress, searchText: action.text},
				search: state.search,
				results: state.results
			};
		default:
			return state;
	}
}

export default reduce;