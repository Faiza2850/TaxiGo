import React from 'react'
import LoginRegister from '../components/LoginRegister'
import Layout from '../layout/index'
import { useEffect, useRef } from 'react'
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
    <LoginRegister/>
    </div>
    </Layout>
    </div>
  )
}

export default Register