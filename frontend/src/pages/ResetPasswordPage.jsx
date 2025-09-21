import React from 'react'
import Layout from '../layout/index';
import ResetPassword from '../components/ResetPassword';
import { useEffect, useRef } from 'react';
function ResetPasswordPage() {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div>
        <Layout >
        <div ref={componentRef}>
        <ResetPassword/>
        </div>
        </Layout>


    </div>
  )
}

export default ResetPasswordPage