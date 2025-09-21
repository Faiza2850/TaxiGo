import React from 'react'
import Layout from "../../layout";
import AdminLogin from '../../components/admin components/adminLogin'
import { useEffect, useRef } from 'react';
const AdminLoginPage = () => {
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
    <AdminLogin/>
    </div>
    </Layout>
    </div>
  )
}

export default AdminLoginPage