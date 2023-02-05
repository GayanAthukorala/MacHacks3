import logo from "./logo.svg";
import axios, * as others from "axios";
import "./App.css";
import React, { Component, useState } from "react";
import title from "./images/Logo.PNG";
import upload from "./images/upload.png";

function App() {
  const [index, setIndex] = useState(0);
  // const [plantList, setPlantList] = useState([]);
  const [plant, setPlant] = useState("");
  const [name, setName] = useState("");
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [toleratedLight, setToleratedLight] = useState("");
  const [water, setWater] = useState("");
  const plantList = [];

  const sendIdentification = (e) => {
    e.preventDefault();
    const files = [...document.querySelector("input[type=file]").files];
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          console.log(res);
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64files) => {
      console.log(base64files);

      const data = {
        api_key: "DhcmcJKc1JVWCtkoTOq7s3c3sg4Pvx8IdncoNDcnL4RKMMDE1L",
        images: base64files,
        // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };

      fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          console.log(data.suggestions[0].plant_details.common_names);
          data.suggestions[0].plant_details.common_names.map((plantName) => {
            plantList.push(plantName);
          });
          console.log(plantList);
          handleSubmit();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const handleChange = (e) => {
    setPlant(e.target.value);
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f743b6a069msh0362574c454b5d8p16d83bjsn4881277212b2",
      "X-RapidAPI-Host": "house-plants.p.rapidapi.com",
    },
  };

  const handleSubmit = () => {
    // console.log(plantList.length);
    // console.log(plantList);
    // setPlant(plantList[index]);
    // console.log(plantList[index]);
    // console.log(plant);
    // setPlant(plant.replace(/\s/g, ""));
    // console.log(plant);
    for (var i = 0; i < plantList.length; i++) {
      const url = `https://house-plants.p.rapidapi.com/common/${plantList[i]}`;
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
      if (name !== "") {
        break;
      }
    }
    setIndex(index + 1);
    console.log(index);
  };

  return (
    <div className="body">
      <div className="titleAlign">
        <img src={title} style={{ height: 230, width: 1000 }} />
        {/* <div className="plantcare">Plant Care</div> */}
      </div>
      <div className="plantWrapper">
        <div className="imageWrapper">
          <div>
            <div className="insertPrompt">Insert Photo Here:</div>
            {/* <input onChange={handleChange} />
            <button onClick={handleSubmit}>Enter</button> */}
            <div className="uploadButtonAlign">
              <form>
                <input type="file" multiple className="custom-file-input" />
              </form>
              <button
                type="button"
                className="classifyButton"
                onClick={sendIdentification}
              >
                CLASSIFY
              </button>
            </div>
          </div>
        </div>
        <div className="textAlign">
          <div className="promptText">Plant Name: {name}</div>
          <div className="promptText">Max Temperature: {maxTemp}°C</div>
          <div className="promptText">Min Temperature: {minTemp}°C</div>
          <div className="promptText">Tolerated Light: {toleratedLight}</div>
          <div className="promptText">Watering: {water}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
