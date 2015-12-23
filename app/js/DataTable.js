import React from 'react';

var DataTable = React.createClass({
  render: function() {
    return (
      <table className="table table-bordered data-table">
        <DataTableHeader searchHeader={this.props.searchHeader} queryHeader={this.props.queryHeader}/>
        <DataTableBody data={this.props.data}/>
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
              <DataTableRow key={i} values={d}/>
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
            return (<DataTableCell key={i}>{v}</DataTableCell>);
          })
        }
      </td></tr>
    );
  }
});

var DataTableCell = React.createClass({
  render: function() {
    return (
      <span className="data-word">{this.props.children}</span>
    );
  }
});

export default DataTable;