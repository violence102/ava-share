import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';
import { ItemType, Status, Item, Person } from './domain'

const App: React.FC = () => {
  const items: Array<Item> = [
    {
      title: 'JS in one week',
      type: ItemType.BOOK,
      owner: {
        firstName: 'Krzysztof',
        lastName: 'Głogocki',
        city: "Wrocław"
      },
      status: Status.AVAILABLE
    },
    {
      title: 'Scala for Dummies',
      type: ItemType.BOOK,
      owner: {
        firstName: 'Przemysław',
        lastName: 'Wierzbicki',
        city: 'Stamford'
      },
      lender: {
        firstName: 'Przemysław',
        lastName: 'Zajadlak',
        city: 'Wrocław'
      },
      status: Status.NOT_AVAILABLE
    }
  ];
  
  const columnDefs: Array<any> = [{
    headerName: "Title",
    field: "title"
  }, {
    headerName: "Type",
    field: "type"
  }, {
    headerName: "Owner",
    valueGetter: function(params: any) {
      return `${personGetter(params.node.data.owner)}`;
    }
  }, {
    headerName: "Status",
    field: "status"
  }, {
    headerName: "Lender",
    field: "lender",
    valueGetter: function(params: any) {
      return `${personGetter(params.node.data.lender)}`;
    }
  }];

  function personGetter(person: Person) {
    return person ? `${person.firstName} ${person.lastName}, ${person.city}` : '-';
  };

  /**
   * Cram all columns to fit into the grid initially.
   */
  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  /**
   * Auto-size all columns once the initial data is rendered.
   */
  const autoSizeColumns = (params: any) => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map((col: any) => col.getColId());

    params.columnApi.autoSizeColumns(colIds);
  };

  return (
    <div
      className = "ag-theme-balham"
      style = {{
        height: '200px',
        width: '100%' 
      }}>
      <AgGridReact
        columnDefs = { columnDefs }
        rowData = { items }
        onGridReady={ onGridReady }
        onFirstDataRendered={ autoSizeColumns }>
      </AgGridReact>
    </div>
  );
}

export default App;
