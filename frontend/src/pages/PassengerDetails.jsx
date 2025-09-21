import React, { useEffect, useRef } from 'react';
import Layout from '../layout/index';
import BookmeeForm from '../components/BookmeeForm';

const PassengerDetails = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div ref={componentRef}>
      <Layout>
      <div ref={componentRef}>
        <BookmeeForm />
        </div>
      </Layout>
    </div>
  );
};

export default PassengerDetails;