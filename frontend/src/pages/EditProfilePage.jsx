import React from 'react'
import EditProfile from '../components/EditProfile'
import Layout from '../layout/index'
import { useRef, useEffect } from 'react'
const EditProfilePage = () => {
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
    <EditProfile/>
    </div>
    </Layout>
    </div>
  )
}

export default EditProfilePage