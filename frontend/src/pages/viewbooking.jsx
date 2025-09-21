import React from 'react'
import Layout from '../layout/index'
import ViewBookings from '../components/ViewBookings'
import { useEffect, useRef } from 'react'
const ViewBookingPage = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div>
      <Layout>
        <div ref={componentRef}>
          <ViewBookings />
        </div>
      </Layout>
    </div>
  )
}

export default ViewBookingPage