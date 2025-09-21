import React from 'react'
import BookmeeLocation from '../components/BookmeeLocations'
import Layout from '../layout/index'
import { useRef, useEffect } from 'react'
const HomePage = () => {
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
            <BookmeeLocation />
            </div>
        </Layout>
    </div>
  )
}

export default HomePage