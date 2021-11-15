import React from "react";

export const Languages = ({country}) => {
    const langArray = Object.values(country.languages)
    
    return(
        <>
        {langArray.map((language, i) => 
            <li key={i}>{language}</li>    
        )}
        </>
    )
}

export default Languages;