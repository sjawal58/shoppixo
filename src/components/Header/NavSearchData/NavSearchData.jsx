/* eslint-disable no-unused-vars */
import React, { useState, } from 'react'
import './NavSearchData.css'
import { useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, } from 'reactstrap';
import { useEffect } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
const NavSearchData = () => {

    // ye search wali state ha jo redux ma store ha. (Redux global state hoti ha, aur wo state pure website ma use kr saktay hain)
    const navSearchQuery = useSelector((state) => state.navSearchQuery);

    /** is ma mure websites k products store hain, jo redux ma parri ha. */
    const allProductsList = useSelector((state) => state.productsList.singleListProducts || []);
    /** is filter wali list ma wo items filter ho kr aa jayn gay jo find ho jayn gay. */
    const [searchFilterList, setSearchFilterList] = useState([]);

    useEffect(() => {
        /** yahan pr jo bhe hum search kryn gay us ko products ke list say filter kry ga aur search wala result dakhay ga. */
        let prodsFilterList = allProductsList.filter(item => item.name?.toLowerCase()?.includes(navSearchQuery?.toLowerCase()))
        setSearchFilterList(prodsFilterList)

    }, [navSearchQuery])

    return (
        <div className='nav_seach-wrapper'>
            {
                searchFilterList && searchFilterList.length > 0 ? (
                    <Row>
                        <div className='col-12 mb-4'>
                            <Card>
                                <CardBody className='py-2'>
                                    <p style={{ fontSize: 18, fontWeight: 600, textAlign: 'center', marginBottom: 0, }}>Searched Products</p>
                                </CardBody>
                            </Card>
                        </div>
                        {/* jab search wala product mill jay ga, phr us ko yahan pr show kry ga, aur jab product ni millay ga 
                            pher (:) k bad wala show ho ga. */}
                        {
                            searchFilterList.map((item) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                    <ProductCard
                                        image={item?.image}
                                        name={item?.name}
                                        description={item?.description}
                                        prod_price={item?.prod_price}
                                        seller_id={item?.seller_id}
                                        cardSettings={{
                                            allowButtons: true,
                                            buttonsHeight: true
                                        }}
                                    />
                                </div>
                            ))
                        }
                    </Row>
                ) : (
                    <Card>
                        <CardBody>
                            <p className='nav_search-not-found'>No Product Found</p>
                        </CardBody>
                    </Card>
                )
            }
        </div>
    )
}

export default NavSearchData