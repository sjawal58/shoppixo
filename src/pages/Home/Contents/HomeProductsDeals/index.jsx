/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "./HomeProductsDeals.css"
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import { HomeProductsDealsList } from "../../../../database/HomeDB";
import ProductCard from '../../../../components/ProductCard/ProductCard';

const HomeProductsDeals = () => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    return (
        <>
            {
                HomeProductsDealsList && HomeProductsDealsList.length > 0 && (
                    <div className="home-products-deals-wrapper">
                        <Nav pills horizontal="center">
                            {
                                HomeProductsDealsList.map((item, index) => (
                                    <NavItem key={index}>
                                        <NavLink
                                            className={`${classnames({ active: activeTab == (index + 1).toString() })}`}
                                            onClick={() => { toggle((index + 1).toString()); }}
                                        >
                                            {item.dealTitle}
                                        </NavLink>
                                    </NavItem>
                                ))
                            }
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            {
                                HomeProductsDealsList.map((item, index) => (
                                    <TabPane tabId={(index + 1).toString()}>
                                        {
                                            item.dealProducts && item.dealProducts.length > 0 ? (
                                                <Row className='mx-0'>
                                                    {
                                                        item.dealProducts.map((dealItem) => (
                                                            <Col className="col_mb_4_not_last" xs="12" sm="6" md="4" lg="3">
                                                                <ProductCard
                                                                    image={dealItem.image}
                                                                    title={dealItem.title}
                                                                    description={dealItem.description}
                                                                    price={dealItem.price}
                                                                    cardSettings={item.cardSettings}
                                                                />
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            ) : (
                                                <Alert color="warning">No Deal Available !!</Alert>
                                            )
                                        }

                                    </TabPane>
                                ))
                            }
                        </TabContent>
                    </div>
                )
            }
        </>
    )
}

export default HomeProductsDeals