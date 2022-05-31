import api from "../api/vehicles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'


export const VehicleList = (props) => {
  const [vehicleID, setVehicleID] = useState("1");
  const [vehicleList, setVehicleList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/v1/home");
        setVehicleList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicles();
  }, []);

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    navigate("/inspection", {
      state: {
        vehicleID: vehicleID,
      },
    });
  };

  const handleChange = (event) => {
    setVehicleID(event.target.value);
  };

  return (
    <form onSubmit={handleVehicleSubmit}>
      <ul>
        {vehicleList.map((vehicle) => (
          <li key={vehicle.id}>
            <input
              type="radio"
              value={vehicle.id}
              name="vehicle"
              id={vehicle.id}
              onChange={handleChange}
            />
            <label htmlFor={vehicle.id}>{vehicle.name}</label>
          </li>
        ))}
      </ul>

      <button>Submit</button>
    </form>



  );
};
