import * as React from 'react';
import {DataTable} from 'react-native-paper';

const ConversionTable = () => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Currency</DataTable.Title>
        <DataTable.Title numeric>Old Leones</DataTable.Title>
        <DataTable.Title numeric>New Leones</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Notes</DataTable.Cell>
        <DataTable.Cell numeric>1,000</DataTable.Cell>
        <DataTable.Cell numeric>1</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>2,000</DataTable.Cell>
        <DataTable.Cell numeric>2</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>5,000</DataTable.Cell>
        <DataTable.Cell numeric>5</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>10,000</DataTable.Cell>
        <DataTable.Cell numeric>10</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Coins</DataTable.Cell>
        <DataTable.Cell numeric>10</DataTable.Cell>
        <DataTable.Cell numeric>1 cent</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>50</DataTable.Cell>
        <DataTable.Cell numeric>5 cent</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>100</DataTable.Cell>
        <DataTable.Cell numeric>10 cent</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell></DataTable.Cell>
        <DataTable.Cell numeric>500</DataTable.Cell>
        <DataTable.Cell numeric>50 cent</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

export default ConversionTable;
