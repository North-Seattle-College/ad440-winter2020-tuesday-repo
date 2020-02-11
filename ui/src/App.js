import React from 'react';
import './css/App.css';
import './css/Button.css'
import Login from './components/login';
import mockData from './data/mockTableData.json';
import StatusButton from './components/StatusButton';
import MachinesTable from './components/MachinesTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/SideNav';
import PageTabs from './components/PageTabs';

/**
 * This is a root component 
 * 
 * It coontains, header, the table and the group of buttons
 */

// assigns data variable to the mock json file data
const data = mockData;

// table columns array to be passed as a prop to the table component
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
    // adding the button that will change color depending on machine status
    Cell: ({cellInfo}) =>
       (<StatusButton  
        />)   
  }
]

/**
 * The root App component
 * 
 * It contains table with failing machines and a wrapper around it.
 */
export default  class App extends React.Component { 

   // The state of this root component will be passed to child components as props
  // right now the app.js containes only elements nessesary for the table with failing machines - col and rows
  constructor(){
    super()
    this.state = {
      columns: columns,
      data: mockData
    }
  }

render(){
  return (
    <div className="App">
    <div className="login">
    < Login />
    </div>
      <header className="App-header">     
      </header> 
          <MuiThemeProvider>
        <SideNav/>
        <PageTabs/>
      </MuiThemeProvider>
    
      {/* Rendering the outer wrapper */}
      <div className = "outer" style = {{width: '90%', border: '1px solid red', position: 'absolute', margin: '30% 1% 1% 1%'}}>
      {/* Button container  that holds Home and Work area buttons on a left form table*/}
      
      {/* <div className = "buttonGroup">
          <Button class = "home" label = "Home">
          </Button>
          <Button class = "work-areas" label = "Area 1">
          </Button>
          <Button class = "work-areas" label = "Area 2">
          </Button>
          <Button class = "work-areas" label = "Area 3">
          </Button>        
      </div> */}
      
      {/* <Styles> */}
      {/* Rendering the table with machinese */}
        <div className = "table-container">
           <MachinesTable
           columns={this.state.columns} 
           data={this.state.data}
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

