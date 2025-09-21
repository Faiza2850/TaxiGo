import React from 'react'
import Layout from '../layout/index'
import QuotesHistory from '../components/QuotesHistory'
import { useEffect, useRef } from 'react'
const QuotesHistoryPage = () => {
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
    <QuotesHistory/>
    </div>
    </Layout>
    </div>
  )
}

export default QuotesHistoryPage