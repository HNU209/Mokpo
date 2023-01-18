import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Trip from "./components/Trip";
import Splash from "./components/Splash";
import "./css/app.css";

const getData = (name) => {
  const res = axios.get(`data/${name}.json`);
  // const res = axios.get(`https://raw.githubusercontent.com/HNU209/Kaist-campus/main/src/data/${name}.json`);
  const data = res.then((r) => r.data);
  return data;
};

const App = () => {
  const minTime = 480;
  const maxTime = 660;
  const [time, setTime] = useState(minTime);
  const [busTrip, setBusTrip] = useState([]);
  const [electricCarTrip, setElectricCarTrip] = useState([]);
  const [tourLoc, setTourLoc] = useState([]);
  const [parkingLoc, setParkingLoc] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getFetchData = async () => {
      const busTrip = await getData("electric_car_trip");
      const electricCarTrip = await getData("bus_trip");
      const tourLoc = await getData("tour_loc");
      const parkingLoc = await getData("parking_loc");

      if (busTrip && electricCarTrip && tourLoc && parkingLoc) {
        setBusTrip((prev) => busTrip);
        setElectricCarTrip((prev) => electricCarTrip);
        setTourLoc((prev) => tourLoc);
        setParkingLoc((prev) => parkingLoc);
        setLoaded(true);
      }
    };

    getFetchData();
  }, []);

  return (
    <div className="container">
      {loaded ? 
        <>
          <Trip
            busTrip={busTrip}
            tourLoc={tourLoc}
            parkingLoc={parkingLoc}
            minTime={minTime}
            maxTime={maxTime}
            time={time}
            setTime={setTime}
          ></Trip>
          <Trip
            electricCarTrip={electricCarTrip}
            tourLoc={tourLoc}
            parkingLoc={parkingLoc}
            minTime={minTime}
            maxTime={maxTime}
            time={time}
            setTime={setTime}
          ></Trip>
        </>
      :
      <Splash></Splash>
      }
    </div>
  );
};

export default App;
