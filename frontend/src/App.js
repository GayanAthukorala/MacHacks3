import logo from "./logo.svg";
import axios, * as others from "axios";
import "./App.css";
import React, { Component, useState } from "react";
function App() {
  const [plant, setPlant] = useState("");
  const [name, setName] = useState("");
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [toleratedLight, setToleratedLight] = useState("");
  const [water, setWater] = useState("");

  const handleChange = (e) => {
    setPlant(e.target.value);
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6a0f522b4amsh3c5ada809153b86p1714d8jsnd5afd2c3ff3b",
      "X-RapidAPI-Host": "house-plants.p.rapidapi.com",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(plant);
    const url = `https://house-plants.p.rapidapi.com/common/${plant}`;
    console.log(url);
    fetch(url, options)
      .then((response) => response.json())
      .then(
        (response) => (
          console.log(response),
          setName(response[0].common[0]),
          setMaxTemp(response[0].tempmax.celsius),
          setMinTemp(response[0].tempmin.celsius),
          setToleratedLight(response[0].toleratedlight),
          setWater(response[0].watering)
        )
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className="body">
      <div className="plantcare">Plant Care</div>
      <div className="plantWrapper">
        <div className="imageWrapper">
          <div>
            <input onChange={handleChange} />
            <button onClick={handleSubmit}>Enter</button>
          </div>
        </div>
        <div>
          <div>Plant Name: {name}</div>
          <div>Max Temperature: {maxTemp}</div>
          <div>Min Temperature: {minTemp}</div>
          <div>Tolerated Light: {toleratedLight}</div>
          <div>Watering: {water}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
