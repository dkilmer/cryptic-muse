import React from 'react';
import { connect } from 'react-redux'
import TextBar from './TextBar';
import DataTable from './DataTable';
import { beginSearch, completeSearch, errorSearch } from './actions';
import d3 from 'd3';

var App = React.createClass({
  onSearchClick: function(searchType, text) {
    this.props.dispatch(beginSearch(searchType, text));
    var self = this;
    d3.json(searchType+"/"+text, function(error, json) {
      if (error) {
        self.props.dispatch(errorSearch(error));
        return console.warn(error);
      }
      self.props.dispatch(completeSearch(json));
    });
  },

  render: function() {
    return (
      <div className="container" style={{'marginTop' : '20px'}}>
        <h2>cryptic muse</h2>
        <div>
          <TextBar 
            onSearchClick={this.onSearchClick}
            queryInProgress={this.props.ui.queryInProgress}
          />
        </div>
        <DataTable
            searchHeader={this.props.search.type}
            queryHeader={this.props.search.query}
            data={this.props.results}
        />
      </div>
    );
  }
});

function select(state) {
  return state;
}

export default connect(select)(App);