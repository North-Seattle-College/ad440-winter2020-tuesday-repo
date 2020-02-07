import React from 'react';
import './css/App.css';
import './css/Button.css'
import Login from './components/login';
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import Button from './components/Button'


// style for the search bar on top
// TODO - move to a separate CSS file
const style = {
  fontSize: '20px',
  padding: '2px',
  fontWeight: 'bold',
  textAlign: 'center',
  border: '1px solid black',
  width: '750px',
  float: 'right',
  
};

const styleWrapper= {
  padding: '10px',
  margin: '10px',
  border: '2px solid gold',
  width: '90%'
}

const data = [
  { id: 1, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken'},
  { id: 2, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'possible motor wear'},
  { id: 3, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'working'},
  { id: 4, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'broken water pipe'},
  { id: 5, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'coffee jam'},
  { id: 6, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken dispencer'},
  { id: 7, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken'},
  { id: 8, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'possible motor wear'},
  { id: 9, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'working'},
  { id: 10, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'broken water pipe'},
  { id: 11, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'coffee jam'},
  { id: 12, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken dispencer'},
  { id: 13, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken'},
  { id: 14, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'possible motor wear'},
  { id: 15, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'working'},
  { id: 16, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'broken water pipe'},
  { id: 17, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'coffee jam'},
  { id: 18, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken dispencer'},
  { id: 19, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken'},
  { id: 20, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'possible motor wear'},
  { id: 21, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'working'},
  { id: 22, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'broken water pipe'},
  { id: 23, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'coffee jam'},
  { id: 24, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken dispencer'}
]
// style for the div around table
const Title = styled.div`

  border:'2px solid red';
  display: 'inline-block';
  float: 'left';
  margin-left: 10%;
  fontWeight: 'bold';
  max-width: 100%;
},
`

const Styles = styled.div`
  margin-top: 2%;
  martin-bottom: 20px;
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid gold;
  border-radius:15px;
  height: 1000px;
  background-color: #fffdfa;
  display: inline-block;
  width: 75%;
  box-sizing: border-box;
   
  table {
   display: inline;
    position: relative;
    overflow: none;
    width: 97%;
    float: right;
    border-spacing: 0;
    border: 2px solid black;
    margin: 5px;
    border-radius: 15px;
    tr {
      
      :last-child {
        td {
          border-bottom: 0;
         
        }
      }
    }
    th,
    td {
      margin: auto;
      width: 20%;
      padding: 0.8rem;
      border-bottom: 1px solid gray;
      
      :last-child {
        border-right: 0;
      }
    }
  }
`
// filter UI
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {

  return (
    <div style = {{marginLeft: '1px', fontSize: '16pt', float: 'right', marginTop: '1.5%', marginRight: '1.5%', minWidth: '60%'}}>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          // prints target value everytime new
          console.log(e.target.value)
        }}
        placeholder={`Search machine list...`}
       
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


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// The table component, which displays machines
function Table({ columns, data }) {
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

  
// flat column - for searching
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
      // defaultColumn,
      // Be sure to pass the defaultColumn option
      filterTypes,
    },
    //useFilters, // useFilters! - temporary removed to match wireframe
    useGlobalFilter // useGlobalFilter!
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    
    <>
    <Title> <p style= {{fontSize: '24pt', fontWeight: 'bold', float: 'left', margin: '5px 0 9px 20px'}}>Machines List</p>
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
                <th   {...column.getHeaderProps()}>
                
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
        accessor: "status"
      }
]

export default  class App extends React.Component { 

  
// columns with the top column containing the title of a table

// broken(filter, dispencer) - red, loud motor noise - orange, out of some type of coffee but has a different one - yellow
// working - green
//   const data = React.useMemo(() => [
//     { id: 1, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken'},
//     { id: 2, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'possible motor wear'},
//     { id: 3, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'working'},
//     { id: 4, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'broken water pipe'},
//     { id: 5, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'coffee jam'},
//     { id: 6, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'broken dispencer'}

// ]);
render(){
  return (
    <div className="App">
    <div className="login">
    < Login />
    </div>
      <header className="App-header">     
      </header> 
      <div className = "outer" style = {{width: '90%', border: '1px solid red', position: 'absolute', margin: '1% 1% 1% 1%'}}>
      {/* Button container */}
      <div className = "buttonGroup">
          <Button label = "Home">
          </Button>
          <Button label = "Area 1">
          </Button>
          <Button label = "Area 2">
          </Button>
          <Button label = "Area 3">
          </Button>        
      </div>
      
      <Styles>    
          <Table columns={columns} data={data}/>    
    </Styles>   
    </div>  
    </div>
  );


}
  
}

