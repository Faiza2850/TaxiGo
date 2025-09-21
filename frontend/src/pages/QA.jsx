import React from 'react'
import FAQ from '../components/FAQ'
import Layout from '../layout/index'
import { useEffect, useRef } from 'react'
const QA = () => {
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
          <FAQ />
        </div>
      </Layout>
    </div>
  )
}

export default QA


