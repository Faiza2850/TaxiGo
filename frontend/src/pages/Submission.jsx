import React from 'react'
import SubmitCheckout from '../components/SubmitCheckout'
import Layout from '../layout/index'
import { useEffect, useRef } from 'react'
const Submission = () => {
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
          <SubmitCheckout />
        </div>
      </Layout>
    </div>
  )
}

export default Submission
