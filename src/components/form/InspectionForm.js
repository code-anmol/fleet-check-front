import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/vehicles";
const { v4: uuidv4 } = require("uuid");

export const InspectionForm = () => {
  const location = useLocation();
  const vehicleID = location.state.vehicleID;

  useEffect(() => {
    const fetchInspectionForm = async () => {
      try {
        const response = await api.get("/v1/getform/", {
          params: { vehicleID: vehicleID },
        });
        setInspectionForm(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e);
      }
    };
    fetchInspectionForm();
  }, []);

  const [inspectionForm, setInspectionForm] = useState(
    {
      operatorTagNumber: "",
    },
    {
      vehicleNumber: "",
    },
    {
      inspectionDtoList: [],
    },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInspectionForm({ ...inspectionForm, [e.target.name]: value });
  };
  const handleListChange = (e) => {
    const list = inspectionForm.inspectionDtoList;
    


    list.map((item) => {
      if(item.inspectionName === e.target.name){
        
        item.result = e.target.value;
      }
    })

    setInspectionForm({...inspectionForm,[inspectionForm.inspectionDtoList]:list})
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const inspectionFormResult = {
      inspectionDtoList: inspectionForm.inspectionDtoList,
      operatorTagNumber:inspectionForm.operatorTagNumber,
      vehicleNumber:inspectionForm.vehicleNumber

    }
    try{
        console.log(inspectionFormResult);
        api.post("/v1/saveInspectionReport/", inspectionFormResult)
        
      
    }catch(e){
        console.log(e);
    }
  }

  return (
    <div>
      <div >
        <h1>Inspection Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="operatorTagNumber">
            Operator Tag Number
          </label>
          <input
            type="text"
            placeholder="Operator Tag"
            value={inspectionForm.operatorTagNumber || ""}
            name="operatorTagNumber"
            id={inspectionForm.operatorTagNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="vehicleNumber" className="block">
            Vehicle License Plate
          </label>
          <input
            type="text"
            placeholder="License Plate"
            value={inspectionForm.vehicleNumber || ""}
            name="vehicleNumber"
            id={inspectionForm.vehicleNumber}
            onChange={handleChange}
          />
        </div>

     


        <ul>
          {inspectionForm.inspectionDtoList !== undefined ? (
            inspectionForm.inspectionDtoList.map((inspection, index) => {
                            
              return (
                <li key={index}>
                  <div >
                  <div>{inspection.inspectionName}</div>
                    <label>
                      <input
                        type="radio"
                        name={`${inspection.inspectionName}`}
                        value="good"
                        onChange={handleListChange}
                      />
                      Good
                    </label>
                    <label>
                      <input
                        type="radio"
                        onChange={handleListChange}
                        name={`${inspection.inspectionName}`}
                        value="bad"
                                              />
                      Bad
                    </label>
                  </div>
                </li>
              );
            })
          ) : (
            <li>No list found</li>
          )}
        </ul>
        <button>Submit</button>
      </form>
    </div>
  );
};
