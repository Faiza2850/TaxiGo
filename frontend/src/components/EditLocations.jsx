import React, { useEffect, useState, useRef } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import BluePin from "../assets/BluePin.svg";
import RedArrow from "../assets/RedArrow.svg";
import Plus from "../assets/Plus.svg";
import Minus from "../assets/Minus.svg";
import Line from "../assets/line.svg";
import { getPlaceByName, EditLocationApi, getLocationbyId } from "../api/api";
import { logout } from "../assets";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const EditLocations = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const { id } = useParams(); 
  const [locationData, setLocationData] = useState(null);
  const [startName, setStartName] = useState('');
  const [endName, setEndName] = useState('');

  useEffect(() => {
    const isLogged = Cookies.get("authToken");
    setIsLogIn(isLogged);
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const logoutfunc = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("authToken");
        setIsLogIn(false);
        navigate("/login");
      }
    });
  };

  const [vias, setVias] = useState([]);
  const [predictions, setPredictions] = useState({
    start: [],
    end: [],
    vias: {},
  });
  const [locationId, setLocationId] = useState({
    start: null,
    end: null,
    via: null,
  });

  const addVia = () => {
    if (vias.length < 10) {
      setVias([...vias, { id: Date.now(), address: "" }]);
    }
  };

  const removeVia = (id) => {
    setVias(vias.filter((via) => via.id !== id));
  };

  const fetchPredictions = async (value, key, id = null) => {
    try {
      const response = await getPlaceByName(value);
      if (response && !response.error) {
        setPredictions((prev) => {
          if (key === "via") {
            return {
              ...prev,
              vias: { ...prev.vias, [id]: response?.data?.predictions },
            };
          }
          return { ...prev, [key]: response?.data?.predictions };
        });
      }
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  const handleInputChange = (e, key, id = null) => {
    try {
      const { value } = e.target;

      if (key === "via") {
        setVias(
          vias.map((via) => (via.id === id ? { ...via, address: value } : via))
        );
      }

      fetchPredictions(value, key, id);
    } catch (error) {
      console.error("Error handling input change:", error);
    }
  };

  const handlePredictionClick = (prediction, key, id = null) => {
    const placeId = prediction.place_id;
    console.log(placeId,"sdrdtd")
    if (key === "via") {
      setVias(
        vias.map((via) =>
          via.id === id
            ? { ...via, address: prediction.description, locationId: placeId }
            : via
        )
      );
      setPredictions((prev) => ({ ...prev, vias: { ...prev.vias, [id]: [] } }));
    } else if (key === "start") {
      setStartName(prediction.description);
      document.getElementById("start").value = prediction.description;
      setPredictions((prev) => ({ ...prev, start: [] }));

      setLocationId({ ...locationId, start: placeId });
    } else if (key === "end") {
      setEndName(prediction.description);
      document.getElementById("end").value = prediction.description;
      setPredictions((prev) => ({ ...prev, end: [] }));

      setLocationId({ ...locationId, end: placeId });
    }
  };

  const handleSubmit = async () => {
    const formData = {
      id: parseInt(id, 10),
      start: {
        description: document.getElementById("start").value,
        place_id: locationId.start,
        reference: predictions.start.reference,
        city: "",
        country: "",
      },
      vias: vias.map((via) => ({
        address: via.address,
        locationId: via.locationId,
      })),
      end: {
        description: document.getElementById("end").value,
        place_id: locationId.end,
        reference: predictions.end.reference,
      },
    };

    try {
      const response = await EditLocationApi(formData);
      const locationId = response.data.id;
      navigate(`/fleet/${locationId}`);
    } catch (error) {
      console.error("Error saving location data:", error);
    }
  };

  // Change handlers for start and end inputs
  const handleStartChange = (e) => {
    setStartName(e.target.value);
    fetchPredictions(e.target.value, 'start');
  };

  const handleEndChange = (e) => {
    setEndName(e.target.value);
    fetchPredictions(e.target.value, 'end');
  };

  // Fetch location data by ID
  useEffect(() => {
    const fetchLocationData = async () => {
      if (id) {
        try {
          const data = await getLocationbyId(id);

          console.log("data----------------",data)
          setLocationData(data);
          // Additional logic to handle fetched data can be added here
        } catch (error) {
          console.log("error-------")
          console.error("Failed to fetch location data:", error);
        }
      }
    };

    fetchLocationData();
  }, [id]); // Dependency array includes id to refetch when it changes

  useEffect(() => {
    const fetchLocationData = async () => {
      if (id) {
        try {
          const { location } = await getLocationbyId(id);
          if (location) {
            setStartName(location.start_point?.name || '');
            setEndName(location.end_point?.name || '');
          }
        } catch (error) {
          console.error("Failed to fetch location data:", error);
        }
      }
    };

    fetchLocationData();
  }, [id]); // Ensure this runs when `id` changes

  return (
    <div className="bg-white rounded-3xl -mt-6 md:-mt-16 shadow-lg p-6 max-w-xl mx-auto">
      <div className="ml-5 md:ml-8">
        <h2 className="text-2xl font-bold mb-2 text-[#333333]">TAXIGO</h2>
        <p className="text-[#666666] mb-4 font-medium">Enter Your Locations</p>
        <div className="space-y-4">
          {/* Start input */}
          <div className={`relative ${vias.length === 0 ? "-mb-4" : ""}`}>
            <label className="text-[#FEB601] mb-3 font-semibold text-lg block">
              Start
            </label>
            <input
              id="start"
              type="text"
              placeholder="Pickup Address"
              value={startName}
              onChange={handleStartChange}
              className="md:w-[90%] w-[85%] border text-[#666666] rounded-md p-3 pr-10"
            />
            <img
              src={RedArrow}
              alt="Red Arrow"
              className="absolute right-4 top-1/2 transform -translate-y-1/4 w-7 h-7 mt-3 cursor-pointer"
            />
            {predictions.start.length > 0 && (
              <ul className="absolute bg-white border border-[#666666] mt-1 max-h-60 md:w-[90%] w-[85%] z-50">
                {predictions.start.map((prediction, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handlePredictionClick(prediction, "start")}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Via inputs */}
          {vias.map((via) => (
            <div key={via.id} className="relative">
              <label className="text-[#FEB601] mb-1 block">Via</label>
              <div className="flex items-center">
                <input
                  id={`via-${via.id}`}
                  type="text"
                  placeholder="Via Address"
                  value={via.address}
                  onChange={(e) => handleInputChange(e, "via", via.id)}
                  className="md:w-[90%] w-[85%] border text-[#666666] rounded-md p-3 pr-20"
                />
                {predictions.vias[via.id]?.length > 0 && (
                  <ul className="absolute bg-white border border-[#666666] mt-60 max-h-60 md:w-[90%] w-[85%] z-50">
                    {predictions.vias[via.id].map((prediction, i) => (
                      <li
                        key={i}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() =>
                          handlePredictionClick(prediction, "via", via.id)
                        }
                      >
                        {prediction.description}
                      </li>
                    ))}
                  </ul>
                )}
                {/* <div className="absolute right-4 flex flex-col items-center">
                  <img src={Line} alt="Line" className="w-0.5 h-4" />
                  <img src={Plus} alt="Add" className="w-6 h-6 cursor-pointer" onClick={addVia} />
                  <img src={Line} alt="Line" className="w-0.5 h-[29px]" />
                  <img src={Minus} alt="Remove" className="w-6 h-6 cursor-pointer" onClick={() => removeVia(via.id)} />
                </div> */}
                <div className="absolute right-4 flex flex-col  items-center">
                  <img src={Line} alt="Line" className="w-0.5 h-[20px] mt-1" />
                  <img
                    src={Plus}
                    alt="Add"
                    className="w-6 h-6 cursor-pointer"
                    onClick={addVia}
                  />
                  <img src={Line} alt="Line" className="w-0.5 h-[20px]" />
                  <div className="flex items-center space-x-1 ">
                    <img
                      src={Minus}
                      alt="Remove"
                      className="w-6 h-[29px] cursor-pointer"
                      onClick={() => removeVia(via.id)}
                    />
                  </div>
                  <img src={Line} alt="Line" className="w-0.5 h-[20px]" />
                  <img
                    src={Plus}
                    alt="Add"
                    className="w-6 h-6 cursor-pointer z-10"
                    onClick={addVia}
                  />
                  <img src={Line} alt="Line" className="w-0.5 h-[20px]" />
                </div>
              </div>
            </div>
          ))}

          {/* Add Via button */}
          {vias.length === 0 && (
            <div className="relative flex justify-end right-4">
              <div className="flex flex-col items-center -mt-2 z-10">
                <img src={Line} alt="Line" className="w-0.5 h-6" />
                <img
                  src={Plus}
                  alt="Add"
                  className="w-6 h-6 cursor-pointer"
                  onClick={addVia}
                />
                <img src={Line} alt="Line" className="w-0.5 h-6" />
              </div>
            </div>
          )}

          {/* End input */}
          <div className="relative">
          <label
                className={`${
                  vias.length === 0 ? "-mt-16" : ""
                } text-[#FEB601] mb-3 font-semibold text-lg block`}
              >
              End
            </label>
            <input
              id="end"
              type="text"
              placeholder="Destination Address"
              value={endName}
              onChange={handleEndChange}
              className="md:w-[90%] w-[85%] border text-[#666666] rounded-md p-3 pr-10"
            />
            <img
              src={BluePin}
              alt="Blue Pin"
              className="absolute right-3 top-1/2 transform -translate-y-1/4 mt-3 w-8 h-8"
            />
            {predictions.end.length > 0 && (
              <ul className="absolute bg-white border border-[#666666] mt-1 max-h-60 md:w-[90%] w-[85%] z-50">
                {predictions.end.map((prediction, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handlePredictionClick(prediction, "end")}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex md:justify-center md:-ml-8 gap-4 md:gap-6">
            {!isLogIn ? (
              <Link
                to="/login"
                className="bg-[#000000] poppins text-[#FFC107] my-8 lg:text-[18px] md:text-[16px] text-[80%] font-bold px-2 md:px-10 h-10 md:h-12 w-[40%] md:w-52 rounded-xl md:rounded-md flex items-center justify-center"
              >
                Log In
              </Link>
            ) : (
              <button
                onClick={logoutfunc}
                className="bg-[#000000] poppins text-[#FFC107] my-8 lg:text-[18px] md:text-[16px] text-[80%] font-bold px-2 md:px-10  h-10 md:h-12 w-[40%] md:w-52 rounded-xl md:rounded-md"
              >
                Log Out
              </button>
            )}
            <Link to="/fleet" />
            <button
              className="bg-[#FFC107] poppins text-[#333333] my-8 lg:text-[18px] md:text-[16px] text-[80%] font-bold px-2 md:px-10  h-10 md:h-12 py-2 w-[40%] md:w-52 rounded-xl md:rounded-md"
              onClick={handleSubmit}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLocations;