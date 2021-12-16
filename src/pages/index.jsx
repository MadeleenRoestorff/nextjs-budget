import styled from 'styled-components';
import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState, useReducer, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
} from 'react-table';
import { motion, AnimatePresence } from 'framer-motion';

import TextField from '@mui/material/TextField';

export default function HomePage() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setResult(null);
    setError(null);
    async function getResult() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/budget/budget/'
        );
        setResult(response?.data?.results);
      } catch (err) {
        setResult(null);
        setError(err);

        console.error(err);
      }
    }
    getResult();
  }, []);

  function filterprocessData(result, searchInput) {
    var processedData = [];
    var filteredData = [];
    if (result) {
      processedData = Object.keys(result[0].variable_expenses)?.map(
        v_expense => ({
          col1: v_expense,
          col2: result[0].variable_expenses[v_expense]['budgeted'],
          col3: result[0].variable_expenses[v_expense]['actual'],
          col4: result[0].remaining_by_category_in_cents[v_expense],
        })
      );

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

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      minWidth: 50,
      width: 180,
      maxWidth: 500,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    resetResizing,
  } = useTable(
    { columns, data, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  const spring = useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  );
  return (
    <Layout isHomePage>
      <Main>
        <h1>Summary</h1>
        <CssTextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={handleChange}
        />
        <ExpenseTable {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <motion.th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    </div>
                  </motion.th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <AnimatePresence>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <motion.tr
                    {...row.getRowProps({
                      layout: spring,
                      //   exit: { opacity: 0, maxHeight: 0 },
                    })}
                  >
                    {row.cells.map(cell => {
                      return (
                        <motion.td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </motion.td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </ExpenseTable>

        {/* <SummaryCardContainer>
          {cardTitles.map(title => (
            <SummaryCard key={title}>{title}</SummaryCard>
          ))}
        </SummaryCardContainer> */}
        <div>
          {result?.map(budget => {
            return (
              <div key={budget?.id}>
                <h2>{`You have R${budget?.total_remaining_in_cents} left this month`}</h2>
                <p>{budget?.timestamp}</p>
                <SummaryCardContainer key="fixed">
                  <SummaryCard key="income">
                    <h3>Income</h3>
                    {Object.keys(budget?.income_in_cents)?.map(income => (
                      <div key={`${budget?.id}-${income}`}>
                        <span>{income}</span>
                        <span>{budget?.income_in_cents[income]}</span>
                      </div>
                    ))}
                  </SummaryCard>

                  <SummaryCard key="fixedexpenses">
                    <h3>Fixed Expenses</h3>
                    {Object.keys(budget?.fixed_expenses)?.map(fixed_expense => (
                      <div key={`${budget?.id}-${fixed_expense}`}>
                        <span>{fixed_expense}</span>
                        <span>{budget?.fixed_expenses[fixed_expense]}</span>
                      </div>
                    ))}
                  </SummaryCard>
                </SummaryCardContainer>
                <SummaryCardContainer key="variableexpenses">
                  <SummaryCard>
                    <h3>Variable Expenses</h3>
                    {Object.keys(budget?.variable_expenses)?.map(v_expense => (
                      <div key={`${budget?.id}-${v_expense}`}>
                        <span>{v_expense}</span>
                        <span>Budgeted</span>
                        <span>
                          {budget?.variable_expenses[v_expense]['budgeted']}
                        </span>
                        <span>Actual</span>
                        <span>
                          {budget?.variable_expenses[v_expense]['actual']}
                        </span>

                        <span>Remaining</span>
                        <span>
                          {budget?.remaining_by_category_in_cents[v_expense]}
                        </span>
                      </div>
                    ))}
                  </SummaryCard>
                </SummaryCardContainer>
              </div>
            );
          })}
        </div>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
`;
const SummaryCardContainer = styled.div`
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap; */
`;
const SummaryCard = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 40px;

  background-color: hsla(0, 100%, 100%, 0.05);
  box-shadow:
		/* offset-x | offset-y | blur-radius | spread-radius | color */ 0px
      12px 17px 2px hsla(0, 0%, 0%, 0.14),
    0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
`;
const ExpenseTable = styled.table`
  /* width: 50%; */
  /* table-layout: fixed; */
  border: 0;
  border-spacing: 0px;

  td,
  th {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid white;
  }
  position: relative;

  :last-child {
    border-right: 0;
  }

  .resizer {
    display: inline-block;
    background: transparent;
    width: 10px;
    height: 80%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    border-left: 1px dotted white;
    margin-right: 5px;
    /* prevents from scrolling while dragging on touch devices  */
    touch-action: none;

    &.isResizing {
      background: pink;
    }
  }
`;

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputBase-colorPrimary': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});
