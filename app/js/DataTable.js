import React from 'react';

var DataTable = React.createClass({
  render: function() {
    return (
      <table className="table table-bordered data-table">
        <DataTableHeader searchHeader={this.props.searchHeader} queryHeader={this.props.queryHeader}/>
        <DataTableBody data={this.props.data} onSearchChange={this.props.onSearchChange}/>
      </table>
    );
  }
});

var DataTableHeader = React.createClass({
  render: function() {
    return (
      <thead><tr>
      <th>{this.props.searchHeader}: {this.props.queryHeader}</th>
      </tr></thead>
    );
  }
});

var DataTableBody = React.createClass({
  render: function() {
    return (
      <tbody>
      {
        this.props.data.map((d,i) => {
          return (
              <DataTableRow key={i} values={d} onSearchChange={this.props.onSearchChange}/>
          );
        })
      }
      </tbody>
    );
  }
});

var DataTableRow = React.createClass({
  render: function() {
    return (
      <tr><td>
        {
          this.props.values.map((v,i) => {
            return (<DataTableCell key={i} onSearchChange={this.props.onSearchChange}>{v}</DataTableCell>);
          })
        }
      </td></tr>
    );
  }
});

var DataTableCell = React.createClass({
  wordClick: function(event) {
    this.props.onSearchChange(this.props.children);
  },

  render: function() {
    return (
      <span className="data-word" onClick={this.wordClick}>{this.props.children}</span>
    );
  }
});

export default DataTable;