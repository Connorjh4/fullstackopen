import React from "react";


export const Filter = ({ filterCountry, setFilterCountry }) => {
    const handleFilter = (e) => {
        setFilterCountry(e.target.value)
      }
   
    return(
        <div>
            Find country <input value={filterCountry} onChange={handleFilter}/>
        </div>
    )
}

export default Filter;