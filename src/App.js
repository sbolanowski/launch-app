import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import LaunchList from './components/LaunchList';
import Nav from './components/Navbar';
import { Spinner } from "@nextui-org/react";

//import background from './assets/background.jpg';
import Starfield from './components/Starfield';


function App() {
  const [launches, setLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState("Upcoming");
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {

    const cacheKey = currentPage === "Previous" ? 'cachedLaunchesPrevious' : currentPage === "Upcoming" ? 'cachedLaunchesUpcoming' : 'cachedLaunchesSpaceX';
    const cacheTimestampKey = currentPage === "Previous" ? 'launchesCacheTimestampPrevious' : currentPage === "Upcoming" ? 'launchesCacheTimestampUpcoming' : 'launchesCacheTimestampSpaceX';

    const cachedLaunches = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheTimestampKey);

    const cacheDuration = 4 * 60 * 60 * 1000;

    if (cachedLaunches && cacheTimestamp) {
        const now = new Date().getTime();
        if (now - Number(cacheTimestamp) < cacheDuration) {
            setLaunches(JSON.parse(cachedLaunches));
            setShowSpinner(true);
            setTimeout(() => {
                setShowSpinner(false); // Ocultar el spinner
            }, 2000);
            console.log("Launches loaded from cache...");
            return;
        }
    }

    let apiEndpoint;
    if (currentPage === "Previous") {
        apiEndpoint = 'https://lldev.thespacedevs.com/2.2.0/launch/previous/?format=json&limit=10';
    } else if (currentPage === "SpaceX") {
        apiEndpoint = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=10&rocket__configuration__manufacturer__name=SpaceX';
    } 
    else {
        apiEndpoint = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=10';
    }

    axios
        .get(apiEndpoint)
        .then((response) => {
            localStorage.setItem(cacheKey, JSON.stringify(response.data.results));
            localStorage.setItem(cacheTimestampKey, new Date().getTime());
            setLaunches(response.data.results);
            setShowSpinner(true);
            setTimeout(() => {
                setShowSpinner(false); // Ocultar el spinner
            }, 2000);
        })
        .catch((error) => {
            console.error('Error al obtener los lanzamientos:', error);
        });
  }, [currentPage]);

  return (
    <div className="App">
      <Starfield stars={1000} />
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {showSpinner ? ( 
        <div className="container">
          <Spinner size="lg"></Spinner>
        </div>
      ) : (
        <div className="container">
          <LaunchList launches={launches} />
        </div>
      )}
    </div>
  );
}

export default App;
