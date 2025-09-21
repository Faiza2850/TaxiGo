import React from 'react'
import Layout from '../layout/index'
import Cardlist from '../components/Cardlist';
import { useRef, useEffect } from 'react';

const Cardpage = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    console.log(componentRef.current, "ewe")
  }, []);
  return (
    <div>
      <Layout>
        <div ref={componentRef}>
          <Cardlist />
        </div>
      </Layout>
    </div>
  )
}

export default Cardpage;