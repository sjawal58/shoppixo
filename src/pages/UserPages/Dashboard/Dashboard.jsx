/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { URL } from '../../../env'
import { Card, CardBody, CardHeader, Col, Row, Spinner, } from 'reactstrap'
import logo from '../../../assets/img/shoppixo_logo.png'
import OrderDataCard from './OrderDataCard'

const Dashboard = () => {

    const [ordersDataList, setOrdersDataList] = useState([])
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        getOrdersData();
    }, [])

    const getOrdersData = async () => {
        setLoadingData(true)
        await axios({
            method: 'GET',
            url: URL + `/orders/customer/${localStorage.getItem('user_id')}`,
        }).then((response) => {
            console.log("getOrdersData-response", response)

            const data = response?.data?.data;
            setOrdersDataList(data)

            setLoadingData(false)
        }).catch((error) => {
            console.log("getOrdersData-response-error", error?.response)
            setLoadingData(false)
        })
    }

    return (
        <div className="app_container">
            <div className="dashboard_page_wrapper">
                <h6 className='dashboard-title'>Orders History</h6>
                {
                    loadingData ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                            <Spinner className='me-3' /> Loading Data, please wait.....
                        </div>
                    ) : (
                        ordersDataList && ordersDataList.length > 0 ? ordersDataList.map((item) => (
                            <OrderDataCard
                                orderNo={item?._id}
                                createdDate={item?.createdAt}
                                ordersList={item?.orders_list || []}
                                delivery_address={item?.delivery_address}
                            />)
                        ) : (
                            <Card>
                                <CardBody>
                                    <p className='mb-0' style={{ fontWeight: 600 }}>Orders List is Empty</p>
                                </CardBody>
                            </Card>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard