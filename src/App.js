import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Splash from "./components/Splash";
import Trip from "./components/Trip";
import "./css/app.css";

const fetchData = (name) => {
  const res = axios.get(
    `https://raw.githubusercontent.com/HNU209/Mokpo/main/src/data/${name}.json`
  );
  const data = res.then((r) => r.data);
  return data;
};

const App = () => {
  const [electricCarTrip, setElectricCarTrip] = useState([]);
  const [busTrip, setBusTrip] = useState([]);
  const [tourLoc, setTourLoc] = useState([]);
  const [electricCarParkingLotLoc, setElectricCarParkingLotLoc] = useState([]); // 초소형 전기차 주차장
  const [isloaded, setIsLoaded] = useState(false);

  const getData = useCallback(async () => {
    const electricCarTrip = await fetchData("electric_car_trip");
    const busTrip = await fetchData("bus_trip");
    const tourLoc = await fetchData("tour_loc");
    const electricCarParkingLotLoc = await fetchData("electric_parking_loc");

    setElectricCarTrip((prev) => electricCarTrip);
    setBusTrip((prev) => busTrip);
    setTourLoc((prev) => tourLoc);
    setElectricCarParkingLotLoc((prev) => electricCarParkingLotLoc);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="container">
      {!isloaded && <Splash />}
      {isloaded && (
        <>
          <Trip name={"버스"} busTrip={busTrip} tourLoc={tourLoc}></Trip>
          <Trip
            name={"초소형 전기차"}
            electricCarTrip={electricCarTrip}
            tourLoc={tourLoc}
            electricCarParkingLotLoc={electricCarParkingLotLoc}
          ></Trip>
        </>
      )}
    </div>
  );
};

export default App;
