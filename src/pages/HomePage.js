import React,{useState , useEffect} from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture';
const HomePage = () => {

    const [input , setInput] = useState("");
    const [data , setData] = useState(null);
    const SEARCH_URL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`
    const API_KEY = "563492ad6f9170000100000195557a57140b449db2019f6af6437401";
    const POPULAR_URL = "https://api.pexels.com/v1/curated?per_page=15"

    useEffect(()=>{
        handleSearch(POPULAR_URL);
    } ,[]);

    const handleSearch = async (url)=>{
        
        const fetchData = await fetch(url , {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:API_KEY
            },
        });
        
        const parseData = await fetchData.json();
        console.log(parseData);
        setData(parseData.photos);
    }
    
    return (
        <div style={{minHeight:'100vh'}}>
            <Search handleSearch={()=>{handleSearch(SEARCH_URL)}} setInput={setInput}/>
            <div className="pictures">
                {
                   data && data.map( data =>{
                        return <Picture data={data} />
                    })
                }
            </div>
        </div>
    )
}

export default HomePage
