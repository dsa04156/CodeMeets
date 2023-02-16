import React from 'react';
import { useTable, useBlockLayout } from 'react-table';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function CreateTable({ columns, data, TableNavHandler }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout
    );

  // Render the UI for your table
  return (
    <Styles>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <HeadSize {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </HeadSize>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div
                {...row.getRowProps()}
                className="tr"
                onClick={() => {
                  TableNavHandler(row);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <NavBarStyle {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </NavBarStyle>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}
export default CreateTable;

const Styles = styled.div`
  text-align: center;
  line-height: 2.5;
  padding: 1rem;
  padding-top: 0px;
  table {
    border-spacing: 0;
    font-size: 5em;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const NavBarStyle = styled(NavLink)`
  color: black;
  outline: invert;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #10f14c;
  }
`;

const HeadSize = styled.div`
  font-size: large;
`;
