/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { Link, useHistory } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import DataTable from "../../../components/CustomElements/dataTable/DataTable";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";

const ProductsList = () => {
    const history = useHistory();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const [categoriesList, setCategoriesList] = useState([])
    const [productsList, setProductsList] = useState([])
    const [showProducts, setShowProducts] = useState("all");
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        getCategoriesList();
        const user_id = JSON.parse(localStorage.getItem("usersdata"))?._id;
        getProductsList(user_id);
    }, [])

    console.log("productsList", productsList)

    const getCategoriesList = async () => {
        await axios({
            method: 'GET',
            url: URL + "/categories",
        }).then((response) => {
            console.log("getCategoriesList-response", response)
            const allCategories = response.data.data;
            setCategoriesList(allCategories)
        }).catch((error) => {
            console.log("getCategoriesList-response-error", error)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
        })
    }

    const getProductsList = async (seller_id) => {
        setDataLoading(true)

        let products_url = `/products/${seller_id}`;
        if (JSON.parse(localStorage.getItem('usersdata'))?.role == "admin") {
            products_url = `/products`;
        } else {
            products_url = `/products/${seller_id}`;
        }

        await axios({
            method: 'GET',
            url: URL + products_url,
        }).then((response) => {
            console.log("getProductsList-response", response)
            setDataLoading(false)
            const allProducts = response.data.data;
            allProducts.map((item, index) => (item["index"] = index + 1));
            setProductsList(allProducts)
        }).catch((error) => {
            console.log("getProductsList-response-error", error)
            setDataLoading(false)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
        })
    }


    const getProductsBySellerCategory = async (seller_id, category_id) => {
        setDataLoading(true)
        await axios({
            method: 'GET',
            url: URL + `/products/${seller_id}/${category_id}`,
        }).then((response) => {
            console.log("getProductsBySellerCategories-response", response)
            const allProducts = response.data.data;
            allProducts.map((item, index) => (item["index"] = index + 1));
            setProductsList(allProducts)
            setDataLoading(false)
        }).catch((error) => {
            console.log("getProductsBySellerCategories-response-error", error)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
            setDataLoading(false)
        })
    }

    const DeleteAlert = (id) => {
        console.log(id)
        SweetAlert.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "error",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                DeleteData(id);
            }
        });
    }

    const DeleteData = async (id) => {
        await axios.delete(`${URL}/product/delete/${id}`, {
            headers: {
                Authorization: localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",

            },
        }).then((response) => {
            console.log("product-response", response);
            /** -> jab product delete ho jay ga, to phir ye products ke array ko filter kr ga, aur jo 
                product delete ho gaya ha us ko products ke list sy nikal day ga. Agr filter na kryn
                toh phir page ko refresh krna paray ga.
             */
            const allProducts = productsList.filter((item) => item._id != id);
            allProducts.map((item, index) => (item["index"] = index + 1));
            setProductsList(allProducts);
            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Product has been deleted successfully",
                confirmButtonText: "OK",
            });
        }).catch((error) => {
            console.log("product-response-error:", error.response);
            toast.error("Failed to Delete", {
                position: toast.POSITION.TOP_RIGHT,
            })
        });
    }

    const columns = [
        {
            field: "index",
            title: "#",
            minWidth: 70,
            maxWidth: 70,
        },
        {
            field: "name",
            title: "Product Name",
            flex: 1.8,
            minWidth: 200,
            render: (cellValues) => {
                return cellValues.name;
            },
        },
        {
            field: "image",
            title: "Product Image",
            flex: 1.2,
            minWidth: 120,
            render: (cellValues) => {
                return (
                    <div style={{ width: 120, overflow: 'hidden' }}>
                        <img style={{ width: "100%" }} src={cellValues.image} alt="" />
                    </div>
                );
            },
        },
        {
            field: "prod_price",
            title: "Price (Rs.)",
            flex: 1,
            minWidth: 120,
            render: (cellValues) => {
                return (
                    <p>Rs. {cellValues.prod_price}</p>
                );
            },
        },
        {
            field: "discount_available",
            title: "Discount Available",
            flex: 1.5,
            minWidth: 120,
            render: (cellValues) => {
                if (cellValues.discount_available == 0) {
                    return "Not Available";
                } else {
                    return "Available";
                }
            },
        },
        {
            field: "discount_percentage",
            title: "Discount Percentage (%)",
            flex: 1.5,
            minWidth: 120,
            /** render ma hum apne marze sy view show kr saktay hain */
            render: (cellValues) => {
                if (cellValues.discount_percentage) {
                    return cellValues.discount_percentage + " %";
                } else {
                    return "0 %";
                }
            },
        },
        {
            field: "stock",
            title: "Stock",
            flex: 1.8,
            minWidth: 150,
        },
        {
            ...(JSON.parse(localStorage.getItem('usersdata'))?.role == "seller" && {
                field: "action",
                title: "Action",
                cellClassName: "MuiDataGrid-cell-action-customstyles",
                minWidth: 200,
                /** render ma hum apne marze sy view show kr saktay hain */
                render: (cellValues) => {
                    return (
                        <div>
                            <Button
                                className="me-2"
                                color="danger"
                                outline
                                onClick={(e) => DeleteAlert(cellValues._id)}
                            >
                                <i className="fa fa-trash" title="Delete" />
                            </Button>
                            <Link to={`/product/edit/${cellValues._id}`}>
                                <Button
                                    color="primary"
                                    outline
                                >
                                    <i className="fa fa-edit" title="Edit" />
                                </Button>
                            </Link>
                        </div>
                    )
                }
            })
        },
    ];

    const handleOnChangeProducts = (event) => {
        const value = event.target.value;
        console.log(value);
        const user_id = JSON.parse(localStorage.getItem("usersdata"))?._id;
        if (value == "all") {
            getProductsList(user_id)
        } else {
            const user_id = JSON.parse(localStorage.getItem("usersdata"))?._id;
            getProductsBySellerCategory(user_id, value)
        }
    }

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Products List"}
                        parent={"Ecommerce"}
                        title={"Products"}
                        breadcrumbActive={"List"}
                    />
                    <Card className='card_border'>
                        <CardHeader>
                            <Row>
                                {
                                    JSON.parse(localStorage.getItem('usersdata'))?.role == "seller" && (
                                        <Col className="d-flex align-items-center mb-0" md="6 mb-1" sm="12">
                                            <p className="mb-0" style={{ minWidth: 110 }}>Show Products: </p>
                                            <Input
                                                type="select" onChange={handleOnChangeProducts}>
                                                <option value={"all"} selected>All Products</option>
                                                {
                                                    categoriesList && categoriesList.length > 0 &&
                                                    categoriesList.map((item) => <option value={item._id}>{item.name}</option>)
                                                }
                                            </Input>
                                        </Col>
                                    )
                                }
                                <Col md="6 mb-1" sm="12" className="d-flex justify-content-end">
                                    {
                                        JSON.parse(localStorage.getItem('usersdata'))?.role == "seller" && (
                                            <Button onClick={() => history.push("/product/create")} color="primary">{"Create Product"}</Button>
                                        )
                                    }
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={productsList}
                                isLoading={dataLoading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default withTranslation()(ProductsList)