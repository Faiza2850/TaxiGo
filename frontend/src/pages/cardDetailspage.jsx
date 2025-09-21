import React from 'react'
import CardDetails from '../components/CardDetails'
import Layout from '../layout/index'
import { useRef, useEffect } from 'react'
const CardDetailsPage = () => {
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
          <CardDetails />
        </div>
      </Layout>
    </div>
  )
}

export default CardDetailsPage;