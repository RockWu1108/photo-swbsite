import React ,{useState}from 'react'

const Search = ({handleSearch , setInput}) => {
 
    const handleChange = (e)=>{
        setInput(e.target.value);  
    }

    return (
        <div className="search">
            <input type="text" onChange={handleChange}></input>
            <button onClick={handleSearch}>Submit</button>
        </div>
    )
}

export default Search
