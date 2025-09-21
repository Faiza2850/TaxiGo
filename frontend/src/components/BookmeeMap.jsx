import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import { fetchAllCars, getLocationbyId } from "../api/api.js";
import { PencilIco, PencilIcoyellow, Back } from "../assets/index.js";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BookmeeMap = ({
  startLocation,
  endLocation,
  vias = [],
  distance,
  startName,
  endName,
}) => {
  const [mapCenter, setMapCenter] = useState([54.5, -4]); // Default to UK center
  const [mapZoom, setMapZoom] = useState(5);
  const navigate = useNavigate();
  const route = [startLocation, ...vias, endLocation].filter(Boolean);
  //
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_IMAGE_URL = "http://localhost:3000/cars";

  const id = useParams().id;

  useEffect(() => {
    if (startLocation && endLocation) {
      const bounds = L.latLngBounds(startLocation, endLocation);
      setMapCenter(bounds.getCenter());
      setMapZoom(6);
    }
  }, [startLocation, endLocation]);

  const [oneWayPrices, setOneWayPrices] = useState([
    100, 120, 140, 160, 180, 200, 220,
  ]);
  const [returnPrices, setReturnPrice] = useState([
    200, 240, 260, 280, 300, 320, 340,
  ]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchAllCars();
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  const handleSelect = ({ twoway, carid }) => {
    navigate(`/details/${twoway}/${carid}/${id}`);

    // navigate(`/details`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-6 max-w-6xl mx-auto mt-[-1rem] md:mt-[-4rem]">
      <div className="mx-4 md:mx-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">TAXIGO</h2>
        <p className="text-gray-600 mb-4 mt-3 font-normal text-lg md:text-xl">
          Choose Your Fleet
        </p>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div className="bg-[#FFCA09] text-black px-4 py-2 text-lg md:text-xl rounded-md flex justify-between items-center mb-4 md:mb-0 w-full md:w-[50%]">
            <span>
              <strong>Start:</strong> {startName}
            </span>
            <Link to={`/edit-fleet/${id}`} className="flex items-center hover:text-gray-700">
              <button className="bg-transparent border-none cursor-pointer">
                <img src={PencilIco} alt="Edit" className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="bg-black text-[#FFCA09] px-4 py-2 text-lg md:text-xl rounded-md flex justify-between items-center w-full md:w-[50%]">
            <span>
              <strong>End:</strong> {endName}
            </span>
            <Link to={`/edit-fleet/${id}`} className="flex items-center hover:text-gray-700">
              <button className="bg-transparent border-none cursor-pointer">
                <img src={PencilIcoyellow} alt="Edit" className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        <div className="border-4 border-[#FFAE00] rounded-lg overflow-hidden mb-6">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "300px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {startLocation && <Marker position={startLocation} />}
            {endLocation && <Marker position={endLocation} />}
            {Array.isArray(vias) &&
              vias.length > 0 &&
              vias.map((via, index) => <Marker key={index} position={via} />)}
            {route.length > 1 && <Polyline positions={route} color="#FFAE00" />}
          </MapContainer>
        </div>

        <h3 className="text-2xl md:text-3xl mt-6 md:mt-10 font-bold text-[#FFAE00] mb-4">
          Journey Fares
        </h3>
        <hr className="my-6 text-[#bcbfc8]" />

        {/*  */}

        {vehicle
          ?.sort((a, b) => (a.id === 1 ? -1 : b.id === 1 ? 1 : 0))
          .map((v, index) => (
            <div key={v.id} className="mb-10">
              <div className="flex flex-col md:flex-row items-start mt-12 mb-10">
                <img
                  src={`${BASE_IMAGE_URL}/${v.image.replace(".png", ".svg")}`}
                  alt={v.car_category}
                  className="w-full md:w-[270px] h-[160px] object-contain ml-0 md:ml-10 mr-4"
                />

                <div className="mt-4 ml-[5%] h-[60%]  w-[90%] md:mt-0">
                  <h4 className="text-2xl  md:text-4xl font-bold mb-2 text-[#FEB601]">
                    {v.car_category}
                  </h4>
                  <p className="text-xl justify-center  md:text-2xl text-gray-600">
                    {v.metadata}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:justify-center md:space-y-0 md:space-x-32">
                <button
                  onClick={() => handleSelect({ twoway: false, carid: v.id })}
                  className="bg-black text-[#FFAE00] font-bold w-full md:w-1/3 px-4 py-2 md:py-4 text-xl md:text-3xl rounded-lg flex justify-between items-center"
                >
                  <span>One Way</span>
                  <span>£{(v.mileage_price * distance).toFixed(2)}</span>
                </button>
                <button
                  onClick={() => handleSelect({ twoway: true, carid: v.id })}
                  className="bg-[#FEB601] text-black font-bold w-full md:w-1/3 px-4 py-2 md:py-4 text-xl md:text-3xl rounded-lg flex justify-between items-center"
                >
                  <span>Return</span>
                  <span>
                    £{((v.mileage_price * distance - 15) * 2).toFixed(2)}
                  </span>
                </button>
              </div>

              <hr className="my-6 text-[#bcbfc8]" />
            </div>
          ))}

        <Link to={`/edit-fleet/${id}`}>
          <button className="bg-[#FFCA09] text-black font-bold my-10 w-full h-12  md:h-20 px-4 py-2 text-2xl md:text-3xl rounded-lg flex items-center justify-center">
            Edit Route
            <img
              src={Back}
              alt="Back Icon"
              className="ml-4 w-8 h-8 md:w-12 md:h-12"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookmeeMap;
