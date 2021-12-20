import styled from 'styled-components';
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
} from 'react-table';
import { motion, AnimatePresence } from 'framer-motion';

import Arrowdown from '../../icons/Arrowdown';

const spring = {
  type: 'spring',
  damping: 50,
  stiffness: 100,
};

export default function CustomTable({
  data = [],
  columns = [],
  defaultColumn = {},
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  return (
    <ExpenseTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                <ToggleSortBy {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  <span>
                    <Arrowdown
                      isSorted={column.isSorted}
                      isSortedDesc={column.isSortedDesc}
                    />
                  </span>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                </ToggleSortBy>
              </th>
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
                  exit: { opacity: 0 },
                })}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </motion.tr>
            );
          })}
        </AnimatePresence>
      </tbody>
    </ExpenseTable>
  );
}

const ExpenseTable = styled.table`
  border: 0;
  border-spacing: 0px;

  td,
  th {
    margin: 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid white;
  }
  position: relative;

  :last-child {
    border-right: 0;
  }

  .resizer {
    display: inline-block;
    background: transparent;
    width: 5px;
    height: 80%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    border-left: 1px dotted white;
    /* border-right: 1px dotted white; */
    margin: 0 7px;
    /* prevents from scrolling while dragging on touch devices  */
    touch-action: none;

    &.isResizing {
      background: pink;
    }
  }
`;
const ToggleSortBy = styled.div`
  width: fit-content;
  /* margin:auto; */

  & span {
    margin-left: 8px;
    & svg {
      transform-origin: center !important;
    }
  }
`;
