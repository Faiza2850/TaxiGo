import React from 'react'
import { useRef, useEffect } from 'react'
import Contact from '../components/ContactForm'
import Layout from '../layout/index'

const Contactus = () => {
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
          <Contact />
        </div>
      </Layout>
    </div>
  )
}

export default Contactus