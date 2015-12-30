import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {value: '', selectedSearch:0, classNames:['btn btn-default active', 'btn btn-default', 'btn btn-default', 'btn btn-default']};
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.searchText === this.state.value) return;
    console.log('componentWillReceiveProps: '+JSON.stringify(nextProps));
    this.setState({value: nextProps.searchText, selectedSearch:this.state.selectedSearch, classNames:this.state.classNames});
  },

  handleChange: function(event) {
    //this.props.onSearchChange(event.target.value);
    this.setState({value: event.target.value, selectedSearch:this.state.selectedSearch, classNames: this.state.classNames});
  },

  handleSearchClick: function(event) {
    //const node = this.refs.input;
    //const text = node.value.trim();
    if (this.state.value.trim() === '') return;
    var searchTypes = ['anagram', 'hidden', 'deletion', 'wildcard'];
    this.props.onSearchClick(searchTypes[this.state.selectedSearch], this.state.value);
  },

  handleRadioClick: function(radioId, event) {
    var cns = ['btn btn-default','btn btn-default','btn btn-default','btn btn-default']
    cns[radioId] = 'btn btn-default active';
    this.setState({value: this.state.value, selectedSearch: radioId, classNames: cns});
  },

  render: function() {
    return (
      <span className="form-group-md" role="group">
        <input className="right-spacer" type="text" value={this.state.value} onChange={this.handleChange} disabled={this.props.queryInProgress}/>
        <div className="btn-group right-spacer" data-toggle="options">
          <label className={this.state.classNames[0]} onClick={(e) => this.handleRadioClick(0, e)}>anagram</label>
          <label className={this.state.classNames[1]} onClick={(e) => this.handleRadioClick(1, e)}>hidden</label>
          <label className={this.state.classNames[2]} onClick={(e) => this.handleRadioClick(2, e)}>deletion</label>
          <label className={this.state.classNames[3]} onClick={(e) => this.handleRadioClick(3, e)}>wildcard</label>
        </div>
        <button type="button" className="btn btn-primary" onClick={(e) => this.handleSearchClick(e)}>search</button>
      </span>
  );
  }
});

/*
        <div className="btn-group" data-toggle="options">
          <label className={this.state.classNames[0]} onClick={(e) => this.handleRadioClick(0, e)}>
            <input type="radio" name="options" id="anagram" disabled={this.props.queryInProgress}>anagram</input>
          </label>
          <label className={this.state.classNames[1]} onClick={(e) => this.handleRadioClick(1, e)}>
            <input type="radio" name="options" id="hidden" disabled={this.props.queryInProgress}>hidden</input>
          </label>
          <label className={this.state.classNames[2]} onClick={(e) => this.handleRadioClick(2, e)}>
            <input type="radio" name="options" id="deletion" disabled={this.props.queryInProgress}>deletion</input>
          </label>
          <label className={this.state.classNames[3]} onClick={(e) => this.handleRadioClick(3, e)}>
            <input type="radio" name="options" id="wildcard" disabled={this.props.queryInProgress}>wildcard</input>
          </label>
        </div>
*/
/*
        <button type="button" onClick={(e) => this.handleClick("anagram", e)} disabled={this.props.queryInProgress}>anagram</button>
        <button type="button" onClick={(e) => this.handleClick("hidden", e)} disabled={this.props.queryInProgress}>hidden</button>
        <button type="button" onClick={(e) => this.handleClick("deletion", e)} disabled={this.props.queryInProgress}>deletion</button>
        <button type="button" onClick={(e) => this.handleClick("wildcard", e)} disabled={this.props.queryInProgress}>wildcard</button>
*/