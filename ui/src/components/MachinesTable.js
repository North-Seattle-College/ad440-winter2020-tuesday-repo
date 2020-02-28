
// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React from "react";
//import  '../css/StatusButton.css'
// import '../css/MachinesTable.css'
import styled from 'styled-components'
// A great library for fuzzy filtering/sorting items
import { useTable, useGlobalFilter } from 'react-table'
import matchSorter from 'match-sorter'
import GlobalFilter from './GlobalFilter'


// assigns data variable to the mock json file data
//const data = mockData;
// styled component using styled components library
const Title = styled.div`
  border:'2px solid red';
  display: 'inline-block';
  float: 'left';
  margin-left: 10%;
  fontWeight: 'bold';
  max-width: 100%;
},
`

// matches words to the input
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Create a default prop getter
const defaultPropGetter = () => ({})


/** The table component, which displays machines, and contains the filter function */
export default function MachinesTable({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,

}) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
   // table hooks used
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useGlobalFilter // useGlobalFilter!
  )

  // Specifies how many rows to show on page - currently 20
  //
  const firstPageRows = rows.slice(0, 20)

  return (

    <>
    <Title> <p className = "table-style">Machines List</p>
      {/* Render the global filter UI */}
      <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />

    </Title>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr  style={{fontSize: '18pt'}} {...headerGroup.getHeaderGroupProps()}>

              {headerGroup.headers.map(column => (
                <th
                // Return an array of prop objects and react-table will merge them appropriately

                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style,
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                ])}>

                  {column.render('Header')}

                  <div className = "canFilter">{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map(cell => {
                  return (
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                        button: cell.column.button,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}>
                    {cell.render('Cell')}
                    </td>)
                  })}
                </tr>
              )
          })}
        </tbody>
      </table>
      <br />
      {/* <div style={{margin: "5px"}}> Showing the first 20 results of {rows.length} rows</div> */}
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}
