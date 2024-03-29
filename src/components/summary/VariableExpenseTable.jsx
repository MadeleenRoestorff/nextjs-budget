import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import CustomTable from '../general/CustomTable';
import { convertCentToRand } from '../../lib/utils';

const columns = [
  {
    Header: 'Variable Expense',
    accessor: 'col1', // accessor is the "key" in the data
  },
  {
    Header: 'Budgeted',
    accessor: 'col2',
  },
  {
    Header: 'Actual',
    accessor: 'col3',
  },
  {
    Header: 'Remaining',
    accessor: 'col4',
  },
];

const defaultColumn = {
  minWidth: 80,
  width: 200,
  maxWidth: 500,
};

export default function VariableExpenseTable({ result = null }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  function filterprocessData(result = null, searchInput = '') {
    var processedData = [];
    var filteredData = [];
    if (result) {
      processedData = Object.keys(result.variable_expense)?.map(v_expense => ({
        col1: v_expense,
        col2: convertCentToRand(result.variable_expense[v_expense]['budgeted']),
        col3: convertCentToRand(result.variable_expense[v_expense]['actual']),
        col4: convertCentToRand(
          result.remaining_by_category_in_cents[v_expense]
        ),
      }));

      filteredData = processedData.filter(item => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    }
    return filteredData;
  }

  const data = useMemo(() => filterprocessData(result, searchInput), [
    result,
    searchInput,
  ]);

  console.log(data);

  return (
    <div>
      <TextField
        id="search"
        label="Search"
        value={searchInput}
        onChange={handleChange}
        autoComplete="off"
      />
      <CustomTable
        data={data}
        columns={columns}
        defaultColumn={defaultColumn}
      />
    </div>
  );
}
