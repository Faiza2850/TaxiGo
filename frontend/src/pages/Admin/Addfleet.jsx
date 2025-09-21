import React from "react";
import AddNewFleet from "../../components/admin components/AddNewFleet";
import Layout from "../../layout";
import { useEffect, useRef } from "react";
function Addfleet() {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div >
    <Layout>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[112%] z-10 w-full max-w-7xl p-4" ref={componentRef}>
        <AddNewFleet />
      </div>
    </Layout>
  </div>
  
  );
}

export default Addfleet;