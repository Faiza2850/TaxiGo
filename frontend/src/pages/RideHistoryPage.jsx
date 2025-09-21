import React from 'react'
import Layout from '../layout/index'
import RideHistory from '../components/RideHistory'
import { useEffect, useRef } from 'react'
const RideHistoryPage = () => {
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
    <RideHistory/>
    </div>
    </Layout>
    </div>
  )
}

export default RideHistoryPage