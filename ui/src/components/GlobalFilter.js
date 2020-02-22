import React from "react";
import '../css/GlobalFilter.css'


/** filter UI for the global filter and the search field in the title of the table */ 
export default function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  }) {

  return (
    // contains search and input field
     <div className = "global-filter-wrap">
     {/* style = {{marginLeft: '1px', fontSize: '16pt', float: 'right', marginTop: '1.5%', marginRight: '1.5%', minWidth: '60%'}}> */}
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
        className= "global-filter-input"
      />
    </div>
  )
}