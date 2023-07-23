import { useState } from "react";
import axios from "axios";
//1. Fix start
//2. create fix for typing error
// 3. Add icons

function App() {

  const [location,setLocation] =useState('');
  const [data, setData]= useState([]);
  const [error,setError]=useState('');
  const [iserror, setIsError]= useState(false);
  const [isPending, setIsPending]= useState(false);
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8030fc652f98c76e3aa6c829af8ce63f`;
  const searchLocation=(e)=>{
    if(e.key === 'Enter')
    {
      axios.get(url)
      .then((response)=>{
        setData(response.data);
        setIsPending(true);
        setIsError(false);
        console.log(response.data);
      })
      .catch((error)=>{
        if(error.response)
        {
          console.error('Server Error: ', error.response.status);
          setError('ERROR: No such City/Place found');
          setIsError(true);
        }
        else if(error.request)
        {
          console.error('Network Error:', error.request);
          setError('ERROR: Failed to connect to the servers');
          setIsError(true);
        }
        else
        {
          console.error('Error :', error.message);
          setError('ABORT: Some Unexpected Error Occured');
          setIsError(true);
        }
      })
      setLocation('');
    }

  }
  return (

    <div className="app">
      <div className="search">
        <input value={location} onChange={(e)=>(setLocation(e.target.value))} onKeyPress={searchLocation} type="text" placeholder="Enter Location" />
      </div>
      { 
       iserror && 
         <div className="error-block">
          <h2>{error}</h2>
         </div>
      }
       {isPending && !iserror && 
       <div className="container">  
          <div className="top">
           <div className="location">
             <p>{data.name}</p>
           </div>
           <div className="temp">
             <h1>{data.main.temp.toFixed()} °C</h1>
           </div>
           <div className="description">
             <p>{data.weather[0].main}</p>
           </div>
        </div>
         <div className="bottom">
            <div className="feels">
              <div className="cred">
              <p style={{color: "black"}}>Feels like</p>
              <p >{data.main.feels_like.toFixed()} °C</p>
              </div>
              
            </div>
            <div className="humidity">
              <div className="cred">
              <p style={{color: "black"}}>Humidity</p>
              <p>{data.main.humidity.toFixed()}%</p>
              </div>
              
            </div>
            <div className="wind">
              <div className="cred">
              <p style={{color: "black"}}>Wind Speed</p>
              <p>{data.wind.speed.toFixed()} MPH</p>
              </div>
              
            </div>
            <div className="wind-deg">
              <div className="cred">
              <p style={{color: "black"}}>Wind Degree</p>
              <p>{data.wind.deg.toFixed()} deg</p>
              </div>
              
            </div>
            <div className="pressure">
              <div className="cred">
              <p style={{color: "black"}}>Pressure</p>
              <p>{data.main.pressure.toFixed()} hPa</p>
              </div>
              
            </div>
            <div className="max-temp">
              <div className="cred">
              <p style={{color: "black"}}>Max. Temperature</p>
              <p>{data.main.temp_max.toFixed()} °C</p>
              </div>
              
            </div>
            <div className="min-temp">
              <div className="cred">
              <p style={{color: "black"}}>Min. Temperature</p>
              <p>{data.main.temp_min.toFixed()} °C</p>
              </div>
              
            </div>
         </div>
        </div>  
        }
      </div>
      
  );
}

export default App;
