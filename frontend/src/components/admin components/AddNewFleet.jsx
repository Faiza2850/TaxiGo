import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Car } from '../../assets/index';
import { getLocations , updateCar } from "../../api/api";

function AddNewFleet() {
  const [selectedVehicle, setSelectedVehicle] = useState({
    car_category: '',
    image: '',
    id: '',
    mileage_price: '',
  });
  const [farePerMile, setFarePerMile] = useState('');
  const BASE_IMAGE_URL = 'http://localhost:3000/cars';
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocations();
  }, []);

 
    const updateCarData = async () => {

      const data = {
        car_id: parseInt(selectedVehicle.id),
        mileage_price: parseFloat(farePerMile),}
      try {
        const response = await updateCar(data);
      } catch (err) {
        console.error(err);
      }
    };
  


  const handleChange = (e) => {
    const [car_category, image, id, mileage_price] = e.target.value.split(',');
    setSelectedVehicle({ car_category, image, id, mileage_price });
    setFarePerMile(mileage_price);  
  };

  const handleFareChange = (e) => {
    setFarePerMile(e.target.value);
  };

  const handleNewFleet = () => {
    if (selectedVehicle.car_category.trim() === "" || farePerMile.trim() === "") {
      alert("Both fields are required!");
      return;
    }


    // Reset the form after submission
    setSelectedVehicle({
      car_category: '',
      image: '',
      id: '',
      mileage_price: '',
    });
    updateCarData();

    setFarePerMile('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 max-w-7xl mx-auto mt-10">
      <div className="mx-4 md:mx-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#333333]">Bookmee</h2>
        <p className="text-2xl mb-2">Add New Fleet</p>
        <h2 className=" text-[#FFCA09] mb-3 mt-3 font-bold text-lg">Car Category</h2>
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full lg:w-[60%]">
            <div className="flex justify-start bg-white">
              <select
                className="pl-[2%] mb-3 mt-3 font-bold text-lg w-full xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[100%] h-[54.99px] rounded-xl border bg-white text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                style={{ borderRadius: "6px 6px 6px" }}
                onChange={handleChange}
                value={`${selectedVehicle.car_category},${selectedVehicle.image},${selectedVehicle.id},${selectedVehicle.mileage_price}`}
              >
                <option className=" bg-[#B3B8C7]" value="">
                  Select Category
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={`${location.car_category},${location.image},${location.id},${location.mileage_price}`}>
                    {location.car_category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h2 className="text-[#FFCA09] mb-3 mt-3 font-bold text-lg md:text-xl">Fare Per Mile</h2>
              <div className="flex w-full h-[54.99px] justify-start">
                <input
                  type="text"
                  value={farePerMile}
                  className="pl-[2%] w-full xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[100%] h-[54.99px] rounded-tl-lg border"
                  style={{ borderRadius: "8px 8px 8px 8px" }}
                  onChange={handleFareChange}
                />
              </div>
            </div>
          </div>

          <div className="ml-8 mt-4 lg:mt-0 w-[25%] h-[20%]">
            {selectedVehicle.image && (
              <img
                src={`${BASE_IMAGE_URL}/${selectedVehicle.image}`}
                alt={selectedVehicle.car_category}
                className="w-full h-full"
              />
            )}
          </div>
        </div>

        <button
          onClick={handleNewFleet}
          className="bg-[#FFCA09] text-2xl mb-2 font-bold my-10 w-[80%] h-16 md:h-20 px-4 py-2 md:text-3xl rounded-lg flex items-center justify-center"
        >
          Add New Fleet
          <img
            src={Car}
            alt="Back-Icon"
            className="ml-4 w-8 h-8 md:w-12 md:h-12"
          />
        </button>
      </div>
    </div>
  );
}

export default AddNewFleet;