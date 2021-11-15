import React from "react";

export const Filter = ({ filterPerson, setFilterPerson }) => {

    const handleFilter = (e) => {
        setFilterPerson(e.target.value)
    }
    
    return(
        <div>
            Filter: <input value={filterPerson} onChange={handleFilter}/>
        </div>
    )
}

export default Filter;