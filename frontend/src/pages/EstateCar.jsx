import React from 'react'

import EstateCar from '../components/EstateCar'
import Layout from '../layout/index'
import { useRef, useEffect } from 'react'
const Estatecar = () => {
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
    <EstateCar/>
    </div>
    </Layout>
    </div>
  )
}

export default Estatecar