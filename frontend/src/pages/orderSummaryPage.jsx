import React from 'react'
import Layout from '../layout/index'
import OrderSummary from '../components/OrderSummary'


const orderSummaryPage = () => {
  return (
    <div>
    <Layout>
    {/* False for two way and True for one way */}
    <OrderSummary isOneWay={true} fare={"315"}/> 
    </Layout>

    </div>
  )
}

export default orderSummaryPage