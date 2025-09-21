import React from 'react'
import Layout from '../layout'
import ForgetUserPass from '../components/ForgetUserPass';
import { useRef, useEffect } from 'react';
const ForgetPasswordPage = () => {
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
        <ForgetUserPass/>
        </div>
        </Layout>

    </div>
  )
}

export default ForgetPasswordPage