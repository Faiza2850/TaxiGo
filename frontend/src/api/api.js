import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
const host = "http://localhost:8080";


export const fetchAllCars  = async  () => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.get(`${host}/api/allcar`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching vehicle data");
  }
};

export const getCarByCategory = async (selectedVehicle) => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.get(
      `${host}/api/car-by-category/${selectedVehicle}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching the data");
  }
};

export const Adminlogin = async (email, password, navigate) => {
 
  try {
    const response = await axios.post(
      `${host}/api/admin/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    const { token } = response.data;
  
    Cookies.set("authToken", token, { expires: 7 });
    const decodedToken = jwtDecode(token);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message || "Login successful!",
    });
   
  if(decodedToken.role=='admin'){
      navigate("/admin/add-fleet");
    }else{
      navigate("/admin/login")
    }
   
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.error,
    });
  }
}

export const login = async (email, password, navigate) => {
  try {
    const response = await axios.post(
      `${host}/api/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    const { token } = response.data;

    Cookies.set("authToken", token, { expires: 7 });
    const decodedToken = jwtDecode(token);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message || "Login successful!",
    });
    if(decodedToken.role=='customer'|| decodedToken.role=='guest' ){
      navigate("/profile");
    } else if (decodedToken.role == "admin") {
      navigate("/admin/add-fleet");
    } else {
      navigate("/login");
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.error,
    });
  }
}
 

export const signup = async (rawData) => {

    const userData = {
        first_name: rawData.firstName,
        last_name: rawData.lastName,
        email: rawData.email,
        password: rawData.passwordi,
        phone_number: rawData.phoneNumber,
        address: rawData.billingAddress,
        city: rawData.city,
        country: rawData.country,
        postal_code: rawData.postcode
    };

    try {
        const response = await axios.post(`${host}/api/signup`, userData, {
            withCredentials: true,
        });

        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Signup successful!",
        });
    } 
    catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
        });
    }

};
// INSERT_YOUR_REWRITE_HERE

export const getPlaceByName = async (placeName) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${host}/api/get-place/${placeName}`,
      requestOptions
    );
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    throw new Error("Error fetching place data: " + error.message);
  }
};



export const forgetpass = async (email) => {
  const response = await axios.post(`${host}/api/forgot-password`, { email });
  return response;
};
// eidit profile api

export const editProfileApi = async (rawData) => {
  const token = Cookies.get('authToken');

  const updatedUserData = {
    firstname: rawData.firstname,
    lastname: rawData.lastname,
    email: rawData.email,
    phone_number: rawData.phone_number,
    address: rawData.address,
    city: rawData.city,
    country: rawData.country,
    postcode: rawData.postcode.toString(),
  };

  try {
    const response = await axios.patch(
      `${host}/api/edit-profile`,
      updatedUserData,
      {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message || "Profile updated successfully!",
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        err.response?.data?.message,
    });
  }
};

export const getUserById = async () => {
  const token = Cookies.get("authToken");
  try {
    const response = await axios.get(`${host}/api/get-user-by-id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching the User data");
  }
};

export const getRideHistory = async () => {
  try {
    const token = Cookies.get("authToken"); // Retrieve the token from cookies

    const response = await axios.get(`${host}/api/ride-history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });

}
}


export const getBookings = async () => {
  try {
    const token = Cookies.get("authToken"); // Retrieve the token from cookies

    const response = await axios.get(`${host}/api/view-booking`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
 
} 
catch (err) {
    Swal.fire({
      icon: "info",
      title: "info",
      text: "No Bookings",
      timer: 3000,
      timerProgressBar: true,
    });
  }
};

export const Passengers_details = async ({car_id,location_id,firstname,lastname,phone_number,email,number_of_passengers,number_of_suitcases,flight_number,flight_arriving_from,flight_date_time,
  meet_and_greet,has_pet,two_way,multiple_journey_disc,quote_ids
  }) => {

    const payload = {
      car_id,
      location_id,
      firstname,
      lastname,
      phone_number,
      email,
      number_of_passengers,
      number_of_suitcases,
      flight_number,
      flight_arriving_from,
      flight_date_time,
      meet_and_greet,
      has_pet,
      two_way,
      multiple_journey_disc,
      quote_ids
    };
    const token = Cookies.get('authToken');
    try {
      const res = await axios.post(`${host}/api/bookme`, payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `${token}` } : {}),
        },
      });
      if (res.data.guest_token){ 
      Cookies.set("authToken", res.data.guest_token, { expires: 7 });  
}
      return res.data;
    } catch (error) {
      console.error("Error occurred while booking passengers details:", error);
      throw error;
    }

  } 

// api to save location
export const saveLocationApi = async (formdata) => {

  const token = Cookies.get('authToken');
  const locationData = {
    start_point: {
      description: formdata.start.description,
      place_id: formdata.start.place_id,
      reference: formdata.start.place_id,
      city: formdata.start.description,
      country: formdata.start.description,
    },
    end_point: {
      description: formdata.end.description,
      place_id: formdata.end.place_id,
      reference: formdata.end.place_id,
      city: formdata.end.description,
      country: formdata.end.description,
    },
    waypoints: formdata.vias
      ? formdata.vias.map((waypoint) => ({
          description: waypoint.address,
          place_id: waypoint.locationId,
          reference: waypoint.locationId,
          city: waypoint.address,
          country: waypoint.address,
        }))
      : [],
  };
  try {
    let response;

    if (token) {
      // Call the authenticated API if token exists
      response = await axios.post(`${host}/api/save-locations`, locationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // Call the guest API if no token
      response = await axios.post(
        `${host}/api/save-locations-for-guest`,
        locationData
      );
    }

    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.error || "Something went wrong",
    });
  }
};



export const EditLocationApi = async (formdata) => {
console.log(formdata,"formdata")
  const locationData = {
    id: formdata.id,
    start_point: {
      description: formdata.start.description,
      place_id: formdata.start.place_id,
      reference: formdata.start.place_id,
      city: formdata.start.description,
      country: formdata.start.description,
    },
    end_point: {
      description: formdata.end.description,
      place_id: formdata.end.place_id,
      reference: formdata.end.place_id,
      city: formdata.end.description,
      country: formdata.end.description,
    },
    waypoints: formdata.vias
      ? formdata.vias.map((waypoint) => ({
          description: waypoint.address,
          place_id: waypoint.locationId,
          reference: waypoint.locationId,
          city: waypoint.address,
          country: waypoint.address,
        }))
      : [],
  };
  try {
      // Call the guest API if no token
     let response = await axios.put(
        `${host}/api/edit-location`,
        locationData
      );
    

    return response.data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.error || "Something went wrong",
    });
  }
};



export const getLocations = async () => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.get(`${host}/api/allcar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    return response.data;
  } catch (error) {
    throw new Error("Error fetching location data");
  }
};

export const updateCar = async (carData) => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.patch(`${host}/api/updte-car`, carData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message || "Car data updated successfully!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reload the page to get the latest data after the user clicks "OK"
        window.location.reload();
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating the car data");
  }
}
  

export const getLocationbyId = async (id) => {
  try {
    const response = await axios.get(`${host}/api/get-location/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    throw new Error("Failed to fetch location by ID");
  }
};


export const getQuotebyId = async () => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.get(`${host}/api/get/quote`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    throw new Error("Failed to fetch location by ID");
  }
};

export const saveCardDetails = async (cardDetails) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    card_number: cardDetails.card_number,
    exp_month: cardDetails.exp_month,
    exp_year: cardDetails.exp_year,
    cvc: cardDetails.cvc,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    // First, get the token from the Stripe API
    const stripeResponse = await fetch(
      `${host}/api/get-stripe-token`,
      requestOptions
    );
    const stripeResult = await stripeResponse.json();
    const token = stripeResult.data?.id;
    if (!token) {
      throw new Error("Failed to retrieve token from Stripe");
    }

    // Use the token to save card details
    const saveCardHeaders = new Headers();
    saveCardHeaders.append("Content-Type", "application/json");

    const saveCardRaw = JSON.stringify({
      user_id: cardDetails.user_id, // Use dynamic user_id if provided
      token: token,
      first_name: cardDetails.first_name,
      last_name: cardDetails.last_name,
      phone_number: cardDetails.phone_number,
      email: cardDetails.email,
      name_on_card: cardDetails.name_on_card,
    });

    const saveCardRequestOptions = {
      method: "POST",
      headers: saveCardHeaders,
      body: saveCardRaw,
      redirect: "follow",
    };

    const saveCardResponse = await fetch(
      `${host}/api/save-card`,
      saveCardRequestOptions
    );
    var saveCardResult = await saveCardResponse.text();
    try {
      saveCardResult = JSON.parse(saveCardResult);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    // Show success message using Swal
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Card details saved successfully!",
    });

    return saveCardResult;
  } catch (error) {
    console.error("Error saving card details:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Failed to save card details",
    });
    throw new Error("Failed to save card details");
  }
};

export const getAllCards = async (userId) => {
  try {
    const response = await axios.post(
      `${host}/api/getallcards`,
      {
        user_id: parseInt(userId, 10),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch cards");
  }
};

  
export const getCurrentBooking = async (user_id,id ) => {
  try {
    const response = await axios.post(`${host}/api/current-booking`, {
      user_id: parseInt(user_id, 10),
      id: parseInt(id, 10),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the booking:", error);
    throw error;
  }
};

export const processPayment = async (user_id, card_id ,bookingId) => {
  try {
    const response = await axios.post(
      `${host}/api/process-payment`,
      {
        user_id: parseInt(user_id, 10),
        card_id: parseInt(card_id, 10),
        booking_id:parseInt(bookingId)
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

export const deleteCard = async (id) => {
  try {
    const res = await axios.delete(`${host}/api/delete-card`, {
      headers: {
        'Content-Type': 'application/json', 
      },
      data: {
        card_id: id 
      }
    });
    return res.data;
  } catch (error) {
    console.error(error.response?.data?.error || 'Error occurred during deletion');
  }
};
export const contactUsApi = async (data) => {
  try {
    const response = await axios.post(`${host}/api/contactUs`, data);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.message || "Message send successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
      error.response?.data?.message ||
        "Error  sending message",

    });
  }
};
export const resetPasswordApi = async (newPassword, resettoken, navigate) => {
  console.log("resettoken   123", resettoken);
  try {
    const data = { password: String(newPassword) };

    const res = await axios.post(
      `${host}/api/reset-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${resettoken}`,
        },
        withCredentials: true,
      }
    );
    console.log("resp", res)
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Password has been successfully updated!",
      confirmButtonText: "OK",
      confirmButtonColor: "#FEB601",
    });
    navigate("/login");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response ? err.response.data : err.message,
    });
  }
};