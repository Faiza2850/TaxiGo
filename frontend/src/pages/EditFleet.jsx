import React, { useContext, useRef, useState, useEffect } from 'react'
import BookmeeLocation from '../components/BookmeeLocations'
import Layout from '../layout/index'
import EditLocations from '../components/EditLocations'

const EditFleet = () => {
  const componentRef = useRef(null);

const [startPoint, setStartPoint] = useState(null);
const [endPoint, setEndPoint] = useState(null);


  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div>
        <Layout>
           <div ref={componentRef}>
            <EditLocations setStartPoint={setStartPoint} setEndPoint={setEndPoint} />
            </div>
        </Layout>
    </div>
  )
}

export default EditFleet;