import React from "react";
import BookmeeMap from "../components/BookmeeMap";
import Layout from "../layout/index";
import { useParams } from "react-router-dom";
import { getLocationbyId } from "../api/api.js";
import { useRef, useEffect } from "react";


const FleetSection = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  const id = useParams().id;

 
  const [distance, setDistance] = React.useState("");
  const [location, setLocation] = React.useState();
  const [startLocation, setStartLocation] = React.useState();
  const [endLocation, setEndLocation] = React.useState();
  const [vias, setVias] = React.useState();
  const[startName, setStartName] = React.useState(); 
  const [endName, setEndName] = React.useState(); 

  const fetchLocationById = async () => {
    try {
      const location = await getLocationbyId(id);
      const startLocation = [
        location.location?.start_point.Point?.latitude,
        location.location.start_point.Point.longitude,
      ];
      setStartLocation(startLocation);

      const endLocation = [
        location.location?.end_point.Point?.latitude,
        location.location.end_point.Point.longitude,
      ];
      const vias = location.location?.waypoints || []; 

      setDistance(location.location.total_distance);
      setLocation(location.location);
      setEndLocation(endLocation);
      setEndName(location.location.end_point.name);
      setStartName(location.location.start_point.name);
      setVias(vias);
    } catch (error) {
      console.error( error);
    }
  };
  React.useEffect(() => {
    if (id) {
      fetchLocationById();
    }
  }, [id]);
  // Manchester Airport coordinates
  // London Heathrow Airport coordinates

  return (
    <div>
      <Layout>
      <div ref={componentRef}>
        <BookmeeMap
          startLocation={startLocation}
          endLocation={endLocation}
          vias={vias}
          distance={distance}
          startName={startName}
          endName={endName}
        />
        </div>
      </Layout>
    </div>
  );
};

export default FleetSection;
