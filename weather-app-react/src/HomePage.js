import React,{useState} from 'react'
import './HomePage.css'
import axios from 'axios'

const HomePage = () => {
  const[data,setData]=useState({
    celcius: "",
    description: "",
    name: "Place",
    humidity: "",
    like: "",
    image: '/imagecloudsun.png'
  })

  const[name,setName]=useState('');

  const[error,setError]=useState('');

  const handleClick=()=>{
    if(name!==""){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2962f608bcaae1e4e4d53529e71c396f&&units=metric`;
    axios.get(apiUrl)
   /*  .then(res=> console.log(res)) */
   .then((res)=>{
    let imagePath= ''
    if (res.data.weather[0].main === "Clouds"){
      imagePath="/clouds.png"
    } else if(res.data.weather[0].main === "Clear"){
      imagePath="/sunny.png"
    } else if(res.data.weather[0].main === "Rain"){
      imagePath="/hail.png"
    } else if(res.data.weather[0].main === "Drizzle"){
      imagePath="/snowy.png"
    } else if(res.data.weather[0].main === "Mist"){
      imagePath="/foog.png"
    } else{
      imagePath="/imagecloudsun.png"
    }
    setData({
      ...data,
      celcius: res.data.main.temp,
      description: res.data.weather[0].description,
      name: res.data.name,
      humidity: res.data.main.humidity,
      like: res.data.main.feels_like,
      image: imagePath
    });

    console.log(res.data);
    setError(" ");

  })

  .catch((err)=>{
    if(err.response.status===404){
      setError("Invalid City Name! Try Again!")
    }else if(err.response.status === 401 || 429 || 500 || 502 || 503 || 504){
      setError("OOPS something went wrong! Try again later")
    } else{
      setError(" ")
    }
    console.log(err)
  })

    }
  }

  return (
    <div className='container'>
        <div className='weather'>
        <div className="heading">
        <h1>Weather App</h1>
      </div>
            <div className='search'>
                <input type='text' placeholder='Enter the City Name' onChange={e=>setName(e.target.value)}/>
                <button onClick={handleClick}><img src='/Searchicon.png' alt=""/></button>
            </div>
            <div className='error'>{error}</div>
            <div className='winfo'>
              <img src={data.image} alt='' className='icon'/>
              <h1>{Math.round(data.celcius)}°C</h1>
              <p>{data.description}</p>
              <img src="/location.png" alt='' className='locationIcon'></img>
              <h2>{data.name}</h2>
              <div className='details'>
                <div className='col'>
                  <img src="/humidity.png" alt=""/>
                  <div className='humidity'>
                    <p><b>{Math.round(data.humidity)} %</b></p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='col'>
                  <img src="/temperature.png" alt=""/>
                  <div className='wind'>
                    <p><b>{Math.round(data.like)} °C</b></p>
                    <p>Feels like</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;