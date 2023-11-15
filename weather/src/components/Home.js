import { useState, useEffect } from "react";
import classes from "./Home.module.css";
import axios from "axios";
import React from "react";

const Home = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState("")
    const key = "c178a151e62048ca78f372b7385a0c7b"

    const cityNameHandler = (event) => {
        setCity(event.target.value)
    }

    const weatherDataHandler = () => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })


    }

    useEffect(() => {
        weatherDataHandler()
    },[])

    return (
        <div className={classes.weather}>
            <header>
                <h1>Weather App</h1>
                <section>
                    <input type="text" onChange={cityNameHandler} /><br/>
                    <button type="button" onClick={weatherDataHandler}>Search</button>
                </section>
            </header>
            {Object.keys(data).length > 0 && <main>
                <img src="https://cdn.jim-nielsen.com/ios/512/weather-2021-12-07.png" alt=""/>
                <p className={classes.city}>{data?.name.toUpperCase()}</p><br/>
                <h4>{Math.floor((data?.main.temp - 273.15))}°C</h4>
                <p className={classes.feel}>Feels like {Math.floor(data?.main.feels_like - 273.15)}°</p>
            </main>}

        </div>
    );
};
export default Home;