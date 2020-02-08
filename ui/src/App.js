import React from 'react';
import './css/App.css';
import './css/Button.css'
import Login from './components/login';
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import Button from './components/Button'
import mockData from './data/mockTableData.json'
/**
 * This is a root component 
 * 
 * It coontains, header, the table and the group of buttons
 */

// assigns data variable to the mock json file data
const data = mockData;
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
/**
 *Tthe button that is placed in the status column cells
  it has props of classname for css, onClick listener that is not currently created, and the color that will change
   depending on the machine status 
 */
function StatusButton(props) {

  return (   
    <button className= "status-button" onClick={props.handleClick}>
    </button>   
  );
}
/** filter UI for the global filter and the search field in the title of the table */ 
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  }) {

  return (
    // contains search and input field
    <div style = {{marginLeft: '1px', fontSize: '16pt', float: 'right', marginTop: '1.5%', marginRight: '1.5%', minWidth: '60%'}}>
      Search:{' '}
      <input
        value={globalFilter || ''}
        // displays values user enters in the field
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          // prints target value everytime new
          console.log(e.target.value)
        }}
        placeholder={`Search machine list...`}
       // style for the search input field
        style={{
          fontSize: '1.1rem',
          padding: '2px',
          minWidth: '70%',
          border: '1',
         
          borderRadius: '8pt'
        }}
      />
    </div>
  )
}

// matches words to the input
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Create a default prop getter
const defaultPropGetter = () => ({})


/** The table component, which displays machines, and contains the filter function */ 
function Table({ 
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
    <Title> <p style= {{fontSize: '24pt', fontWeight: 'bold', float: 'left', margin: '5px 0 9px 20px'}}>Machines List</p>
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

// table columns array
const columns = [
      {
        Header: "Machine",
        accessor: "id",
      },
      {
        Header: "Vendor",
        accessor: "vendor"
      },
      {
        Header: "Address",
        accessor: "address"
      },  
      {
        Header: "Status",
        accessor: "status",
        // Cell: (cellInfo) => (
        //   <StatusButton/>     
        // ),
        Cell: ({cellInfo}) =>
    (<StatusButton 
      
    />)

        
      }
]

/**
 * The root App component
 */
export default  class App extends React.Component { 

render(){
  return (
    <div className="App">
    <div className="login">
    < Login />
    </div>
      <header className="App-header">     
      </header> 
      {/* Rendering the outer wrapper */}
      <div className = "outer" style = {{width: '90%', border: '1px solid red', position: 'absolute', margin: '1% 1% 1% 1%'}}>
      {/* Button container  that holds Home and Work area buttons on a left form table*/}
      <div className = "buttonGroup">
          <Button class = "home" label = "Home">
          </Button>
          <Button class = "work-areas" label = "Area 1">
          </Button>
          <Button class = "work-areas" label = "Area 2">
          </Button>
          <Button class = "work-areas" label = "Area 3">
          </Button>        
      </div>
      
      {/* <Styles> */}
      {/* Rendering the table with machinese */}
        <div className = "table-container">
           <Table 
           columns={columns} 
           data={data}
          //  Do Not Remove this
          // used to change the color of cell in the Status column depending on the status in it
          // getCellProps = {cellInfo => ({ 
              
          //     style: {
          //       // backgroundColor: `red`,
               
          //       background: cellInfo.column.Header === "Status" & (cellInfo.value === "broken" || cellInfo.value === "broken water pipe" || cellInfo.value === "broken dispencer") ? "pink" : 
          //                   cellInfo.column.Header === "Status" & (cellInfo.value === "coffee jam" || cellInfo.value === "possible motor wear")? "yellow" :
          //                   cellInfo.column.Header === "Status" ? "green" : "#fffdfa",
                       
          //       // cellInfo.column.header === "Status"
          //     },
          // })}
           />  
        </div>    
            
    {/* </Styles>    */}
    </div>  
    </div>
  );

}
  
}

