import React from 'react'
import Layout from '../layout/index'
import Profile from '../components/Profile'
import { useEffect, useRef } from 'react'

const ProfilePage = () => {

  const isLoggedIn = false;
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (

    <div>
      <Layout isLoggedIn={isLoggedIn}>
        <div ref={componentRef}>
          <Profile />
        </div>
      </Layout>
    </div>
  )
}

export default ProfilePage