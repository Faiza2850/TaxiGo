import React from 'react'
import TC from '../components/T&C/TC'
import Layout from '../layout/index'
import PoliciesandNotices from '../components/T&C/Policies&Notices'
import { useEffect, useRef } from 'react'

const TandC = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    console.log(componentRef)
  }, []);
  return (
    <div >
      <Layout>
        <div ref={componentRef}>
          <TC />
        </div>
        <PoliciesandNotices />
      </Layout>
    </div>
  )
}

export default TandC;


