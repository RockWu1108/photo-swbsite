import React,{useState , useEffect} from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture';
const HomePage = () => {

    const [input , setInput] = useState("");
    const [data , setData] = useState(null);
    const [page , setPage] = useState(1);
    const [currentSearch , setCurrentSearch]= useState("");
    const SEARCH_URL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`
    const API_KEY = "563492ad6f9170000100000195557a57140b449db2019f6af6437401";
    const POPULAR_URL = "https://api.pexels.com/v1/curated?page=1&per_page=15"

    useEffect(()=>{
        handleSearch(POPULAR_URL);
    } ,[]);

    useEffect(()=>{
        if(currentSearch === ""){
            handleSearch(POPULAR_URL);
            console.log("popular:",POPULAR_URL);

        }
        else{
            console.log("search:",SEARCH_URL);
            handleSearch(SEARCH_URL);
        }
        
    } , [currentSearch]);

    const handleSearch = async (url)=>{
        setPage(2);
        const fetchData = await fetch(url , {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:API_KEY
            },
        });
        
        const parseData = await fetchData.json();
        setData(parseData.photos);
    }
    
    const morePictures = async()=>{
        let newUrl ;
        if(currentSearch === ""){
            newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`   
        }
        else{
            newUrl =`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
            
        }
        setPage(page +1);
        const fetchData = await fetch(newUrl , {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:API_KEY
            },
        });
        
        const parseData = await fetchData.json();
        console.log("data",parseData);
        setData(data.concat(parseData.photos));
}

    return (
        
        <div style={{minHeight:'100vh'}}>
           

            <Search handleSearch={()=>{
                setCurrentSearch(input);
                }} setInput={setInput}/>
                 
            <div className="pictures">
                {
                   data && data.map( data =>{
                        return <Picture data={data} />
                    })
                }
            </div>
            <div className="morepicture">
                <button onClick={morePictures}>Load more ...</button>
            </div>
        </div>
    )
}

export default HomePage
