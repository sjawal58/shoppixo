import React from 'react'
import './CategoriesProducts.css'
import { useParams, } from "react-router-dom"
import { useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard/ProductCard'
import { Card, CardBody, Col, Row } from 'reactstrap'

const CategoriesProducts = (props) => {
    const params = useParams();

    const { productsList } = useSelector((state) => state.productsList);
    const categoryName = params.category_name;

    const productsByCategory = productsList.filter((item) => item?.category?.name?.includes(categoryName))[0]?.products || [];

    console.log('categoryName', categoryName)
    console.log('productsByCategory', productsByCategory)

    return (
        <div className='app_container'>
            <div className="categories-products-wrapper">
                <Card style={{ marginBottom: 40 }}>
                    <CardBody>
                        <h6 className='categories-prod-title'>{categoryName}</h6>
                    </CardBody>
                </Card>
                {
                    productsByCategory && productsByCategory.length > 0 ? (
                        <Row>
                            {
                                productsByCategory.map((item) => (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                        <ProductCard
                                            product_id={item._id}
                                            image={item.image}
                                            name={item.name}
                                            description={item.description}
                                            prod_price={item.prod_price}
                                            cardSettings={{
                                                allowButtons: true,
                                                buttonsHeight: true
                                            }}
                                            seller_id={item.seller_id}
                                        />
                                    </div>
                                ))
                            }
                        </Row>
                    ) : (
                        <Card>
                            <CardBody>
                                <p className='mb-0 text-center'>No Products Found with this Category</p>
                            </CardBody>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

export default CategoriesProducts