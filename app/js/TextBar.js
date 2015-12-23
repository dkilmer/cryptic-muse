import React from 'react';

export default React.createClass({
  handleClick: function(searchType, event) {
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.onSearchClick(searchType, text);
  },

  render: function() {
    return (
      <span className="form-group-md" role="group">
        <input type="text" ref="input" disabled={this.props.queryInProgress}/>
        <button type="button" onClick={(e) => this.handleClick("anagram", e)} disabled={this.props.queryInProgress}>anagram</button>
        <button type="button" onClick={(e) => this.handleClick("hidden", e)} disabled={this.props.queryInProgress}>hidden</button>
        <button type="button" onClick={(e) => this.handleClick("deletion", e)} disabled={this.props.queryInProgress}>deletion</button>
        <button type="button" onClick={(e) => this.handleClick("wildcard", e)} disabled={this.props.queryInProgress}>wildcard</button>
      </span>
  );
  }
});

