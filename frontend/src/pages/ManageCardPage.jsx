import React from 'react'
import Layout from '../layout'
import ManageCard from '../components/ManageCards'
import { useRef, useEffect } from 'react'
const ManageCardPage = () => {
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
        <ManageCard/>
        </div>
        </Layout>
    </div>
  )
}

export default ManageCardPage