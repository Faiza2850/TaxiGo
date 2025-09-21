import React from 'react'
import Payout from '../components/Payout'
import Layout from '../layout/index'
import { useRef, useEffect } from 'react'
const Register = () => {
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
          <Payout />
        </div>
      </Layout>
    </div>
  )
}

export default Register