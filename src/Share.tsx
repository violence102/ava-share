import React from 'react';
import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import './App.css';
import { ItemType, Status, Item, Person } from './domain'

const Share: React.FC = () => {
  const items: Array<Item> = [
    {
      title: 'JS in one week',
      type: ItemType.BOOK,
      owner: {
        firstName: 'Krzysztof',
        lastName: 'Głogocki',
        city: 'Wrocław'
      },
      status: Status.AVAILABLE
    },
    {
      title: 'React in one week',
      type: ItemType.BOOK,
      owner: {
        firstName: 'Krzysztof',
        lastName: 'Głogocki',
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
  
  const dataSource = items.map(convertToDisplay);

  function convertToDisplay(item: Item) {
    return {
      Title: item.title,
      Type: item.type,
      Status: item.status,
      Lender: `${personGetter(item.lender)}`
    }
  };

  const columns = [
    new ColumnModel('Title'),
    new ColumnModel('Type'),
    new ColumnModel('Status'),
    new ColumnModel('Lender')
  ];

  function personGetter(person?: Person) {
    return person ? `${person.firstName} ${person.lastName}, ${person.city}` : '-';
  };

  return (
    <div>
      <DataGrid
        columns={columns}
        dataSource={dataSource}
        gridName='Grid'
      />
    </div>
  );
}

export default Share;
