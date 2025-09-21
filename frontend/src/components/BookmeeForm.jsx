import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import BackYellow from "../assets/BackYellow.svg";
import Continue from "../assets/continue.svg";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Passengers_details } from "../api/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const CustomDropdown = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };
  const customDatePickerStyle = {
    width: "100%", // Full width
  };
  return (
    <div className="relative">
      <div
        className="bg-white border border-[#666666] text-[#666666] rounded-md p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
        <ChevronDown size={20} />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border text-[#666666] border-[#666666] rounded-md mt-1 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PhoneNumberInput = ({ onPhoneChange }) => {
  const [selectedCode, setSelectedCode] = useState("+1"); // Default code
  const [phoneNumber, setPhoneNumber] = useState("");

  const countryCodes = ["+1", "+44", "+91", "+61", "+81", "+86", "+49"];

  const handleSelectCode = (code) => {
    setSelectedCode(code);
    onPhoneChange(phoneNumber);
    console.log("handleselectedcode",selectedCode, phoneNumber)
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    onPhoneChange(value);
    
  };

  return (
    <div className="flex items-center">
      <PhoneInput
        defaultCountry="US"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="+44 12345679"
        className="ml-1 w-full border border-[#666666] rounded-lg p-3"
      />
    </div>
  );
};

const BookmeeForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [number_of_passengers, setPassengers] = useState(1);
  const [number_of_suitcases, setSuitcases] = useState(1);
  const [flight_number, setFlightNumber] = useState("");
  const [flight_arriving_from, setFlightFrom] = useState("");
  const [meet_and_greet, setMeetGreet] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [has_pet, setPet] = useState(false);
  const [two_way, setTwoway] = useState(false);
  const [userid, setuserid] = useState(null);
  const [bid, setbid] = useState(null);
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [flightError, setFlightError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [flightArrError, setFlightArrError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [SelectDateError, setSelectDateError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const componentRef = useRef(null); // Create a ref for the component

  useEffect(() => {
    const cookie=Cookies.get("authToken");
    console.log(cookie)
    if(cookie){
      setIsAuthenticated(true);
      const decoded=jwtDecode(cookie);
      setFirstName(decoded.firstname);
      setLastName(decoded.lastname);
      setEmail(decoded.email);
    }
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the start of the component
    }
  },[])

  const navigate = useNavigate();
  const { twoway, carid, lid } = useParams();
  useEffect(() => {
    if (twoway === "true") {
      setTwoway(true);
    } else if (twoway === "false") {
      setTwoway(false);
    } else {
      Swal.fire({
        title: "Error!",
        text: "journey is undefined",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [twoway]);
  const handleContinue = async (e) => {
    e.preventDefault();

    const formData = {
      car_id: parseInt(carid, 10), // Convert carid to number
      location_id: parseInt(lid, 10), //This is the dummy data. Actual data will get BookmeMap_Component
      firstname,
      lastname,
      email,
      phone_number,
      number_of_passengers,
      number_of_suitcases,
      flight_number,
      flight_arriving_from,
      meet_and_greet: meet_and_greet === "Yes" ? true : false,
      flight_date_time: selectedDate,
      has_pet: has_pet === "Yes" ? true : false,
      two_way, //This is the dummy data. Actual data will get BookmeMap_Component
      multiple_journey_disc: 300.3, //This is the dummy data. Actual data will get BookmeMap_Component
    };
    let valid = true;
    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (flight_number === "") {
      setFlightError("Flight number is required");
      valid = false;
    }
    if (phone_number === "") {
      setPhoneError("Phone number is required");
      valid = false;
    }

    if (flight_arriving_from === "") {
      setFlightArrError("Flight Arriving from  is required");
      valid = false;
    }
    if (firstname === "") {
      setFirstError("First Name is required");
      valid = false;
    }
    if (lastname === "") {
      setLastError("Last Name is required");
      valid = false;
    }
    if (selectedDate === null) {
      setSelectDateError("Date is Required");
    }
    console.log(formData);

    if (!valid) return;
    let guestQuotesIDs = [];
    try {
      const storedData = localStorage.getItem('locationIds');
      if (storedData) {
        guestQuotesIDs = JSON.parse(storedData);
      }
// console.log("guest locations",storedData)
      const form_data = {
        ...formData,
        quote_ids: guestQuotesIDs, 
      };
      const res = await Passengers_details(form_data);
      setuserid(res.data.user_id);
      setbid(res.data.id);
      
      // console.log(res.data.user_id);
      localStorage.removeItem('locationIds');


      Swal.fire({
        title: "Success!",
        text: "Your booking details have been submitted successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigate(`/order-summary?user_id=${res.data.user_id}&bid=${res.data.id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was a problem submitting your booking details. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-[-1rem] md:mt-[-4rem]">
      <h2 className="text-3xl font-bold mb-4 text-[#333333]">TAXIGO</h2>
      <h3 className="text-lg mb-6 text-[#666666]">Enter Passenger Details</h3>

      <form onSubmit={handleContinue}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[#FEB601] block mb-2">First Name *</label>
            <input
              type="text"
              placeholder="John"
              className="border text-[#666666] rounded-md p-3 w-full"
              value={firstname}
              disabled={isAuthenticated}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstError && (
              <p className="text-redfive text-sm mt-1">{firstError}</p>
            )}
          </div>
          <div>
            <label className="text-[#FEB601] block mb-2">Last Name *</label>
            <input
              type="text"
              placeholder="Doe"
              className="border text-[#666666] rounded-md p-3 w-full"
              value={lastname}
              disabled={isAuthenticated}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastError && (
              <p className="text-redfive text-sm mt-1">{lastError}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="text-[#FEB601] block mb-2">Mobile Number *</label>
            <PhoneNumberInput onPhoneChange={setPhone} />
            {phoneError && (
              <p className="text-redfive text-sm mt-1">{phoneError}</p>
            )}
          </div>

          <div>
            <label className="text-[#FEB601] block mb-2">E-mail *</label>
            <input
              type="email"
              placeholder="Email@yahoo.com"
              className="border text-[#666666] rounded-md p-3 w-full"
              value={email}
              disabled={isAuthenticated}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="text-redfive text-sm">{emailError}</div>
            )}
          </div>

          <div>
            <label className="text-[#FEB601] block mb-2">Passengers</label>
            <CustomDropdown
              options={[
                "1 Person",
                "2 Persons",
                "3 Persons",
                "4 Persons",
                "5 Persons",
              ]}
              placeholder="1 Person"
              onChange={(option) => setPassengers(parseInt(option, 10))}
            />
          </div>
          <div>
            <label className="text-[#FEB601] block mb-2">
              Number of Suitcases
            </label>
            <CustomDropdown
              options={[
                "1 Suitcase",
                "2 Suitcases",
                "3 Suitcases",
                "4 Suitcases",
                "5 Suitcases",
              ]}
              placeholder="1 Suitcase"
              onChange={(option) => setSuitcases(parseInt(option, 10))}
            />
          </div>

          <div>
            <label className="text-[#FEB601] block mb-2">Flight Number</label>
            <input
              type="text"
              placeholder="DEX-001100"
              className="border text-[#666666] rounded-md p-3 w-full"
              value={flight_number}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            {flightError && (
              <p className="text-redfive text-sm mt-1">{flightError}</p>
            )}
          </div>
          <div>
            <label className="text-[#FEB601] block mb-2">
              Flight Arriving From
            </label>
            <input
              type="text"
              placeholder="Manchester"
              className="border text-[#666666] rounded-md p-3 w-full"
              value={flight_arriving_from}
              onChange={(e) => setFlightFrom(e.target.value)}
            />
            {flightArrError && (
              <p className="text-redfive text-sm mt-1">{flightArrError}</p>
            )}
          </div>

          <div>
            <label className="text-[#FEB601] block mb-2">
              Meet & Greet on Arrival
            </label>
            <CustomDropdown
              options={["No", "Yes"]}
              placeholder="Select"
              onChange={setMeetGreet}
            />
          </div>
          <div>
            <label className="text-[#FEB601] block mb-2">
              Flight Arrival Date & Time
            </label>
            <div className="relative ">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="customdatapicker border text-[#666666] rounded-md p-3 w-full"
                placeholderText="Select a date and time"
              />
            </div>
          </div>

          <div>
            <label className="text-[#FEB601] block mb-2">
              Do you have a pet with you?
            </label>
            <CustomDropdown
              options={["No", "Yes"]}
              placeholder="No"
              onChange={setPet}
            />
          </div>
        </div>

        <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:px-9 md:px-32 mt-8 lg:justify-center lg:space-x-9 md:space-x-16">
          <Link to={`/fleet/${lid}`}>
            <button className="text-[#FFCA09] bg-black gap-2 font-bold lg:px-4 py-2 max-sm:w-[250px] lg:w-[280px] md:w-[200px] w-[120px] rounded-lg flex items-center justify-center">
              Back
              <img src={BackYellow} alt="Back Icon" className="h-3 w-3" />
            </button>
          </Link>
          <button
            onClick={handleContinue}
            className="text-black gap-2 bg-[#FFCA09] font-bold lg:px-4 py-2 max-sm:w-[250px] lg:w-[300px] md:w-[200px] w-[120px] rounded-lg flex items-center justify-center"
            type="submit"
          >
            Continue
            <img src={Continue} alt="" className="h-3 w-3" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookmeeForm;
