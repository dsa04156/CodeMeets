import React from 'react'
import { useTable, useBlockLayout } from 'react-table'
import { useRecoilState } from 'recoil'
import { TableData } from '../Store'

function CreateTable({ columns, data, TableNavHandler}) {
  // Use the state and functions returned from useTable to build your UI
  const [tableData, setTableData] = useRecoilState(TableData)



  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  )

  // Render the UI for your table
  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
            
      <div {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} 
              className="tr" 
              onClick={() => {TableNavHandler(row);
                console.log(row.original)
                setTableData(row.original)
              
              }}>
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </div>
            )}
        )}
      </div>
    </div>
  )
}
export default CreateTable;