/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory, Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import DataTable from "../../../components/CustomElements/dataTable/DataTable";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";

const OrdersList = () => {
    const history = useHistory();

    // order_id (params)

    const [ordersListData, setOrdersListData] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        getOrdersList();
    }, [])

    const getOrdersList = async () => {
        setDataLoading(true)

        const seller_id = JSON.parse(localStorage.getItem('usersdata'))?._id;
        console.log('seller_id-----', seller_id)

        let orders_url = `/orders/seller/${seller_id}`;
        if (JSON.parse(localStorage.getItem('usersdata'))?.role == "admin") {
            orders_url = `/orders`;
        } else {
            orders_url = `/orders/seller/${seller_id}`;
        }

        await axios({
            method: 'GET',
            url: URL + orders_url,
        }).then((response) => {
            console.log("getOrdersList-response", response)
            setDataLoading(false)
            const allOrders = response.data.data;
            allOrders.map((item, index) => (item["index"] = index + 1));
            setOrdersListData(allOrders)
        }).catch((error) => {
            console.log("getOrdersList-response-error", error)
            setDataLoading(false)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
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
        await axios.delete(`${URL}/order/delete/${id}`, {
            headers: {
                Authorization: localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",

            },
        }).then((response) => {
            console.log("order-response", response);
            /** -> jab order delete ho jay ga, to phir ye orders ke array ko filter kr ga, aur jo 
                order delete ho gaya ha us ko orders ke list sy nikal day ga. Agr filter na kryn
                toh phir page ko refresh krna paray ga.
             */
            setOrdersListData(ordersListData.filter((item) => item._id != id));

            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Order has been deleted successfully",
                confirmButtonText: "OK",
            });
        }).catch((error) => {
            console.log("category-response-error:", error.response);
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
            title: "Order No.",
            flex: 1,
            minWidth: 140,
            render: (cellValues) => {
                return ("Order No #" + cellValues?._id);
            },
        },
        {
            field: "name",
            title: "Customer Name",
            flex: 0.3,
            minWidth: 180,
            render: (cellValues) => {
                return cellValues?.delivery_address?.full_name
            },
        },
        {
            field: "email",
            title: "Email",
            flex: 1.8,
            minWidth: 180,
            render: (cellValues) => {
                return cellValues?.delivery_address?.email;
            },
        },
        {
            field: "main_flash_title",
            title: "Payment Method",
            flex: 1.8,
            minWidth: 150,
            render: (cellValues) => {
                return cellValues?.payment_method;
            },
        },
        {
            title: "Action",
            cellClassName: "MuiDataGrid-cell-action-customstyles",
            minWidth: 200,
            flex: 2,
            /** render ma hum apne marze sy view show kr saktay hain */
            render: (cellValues) => {
                return (
                    <div>
                        {
                            JSON.parse(localStorage.getItem('usersdata'))?.role == "seller" && (
                                <Button
                                    className="me-2"
                                    color="danger"
                                    outline
                                    onClick={(e) => DeleteAlert(cellValues?._id)}
                                >
                                    <i className="fa fa-trash" title="Delete" />
                                </Button>
                            )
                        }
                        <Link to={`/order/view/${cellValues?._id}`}>
                            <Button
                                color="primary"
                                outline
                            >
                                <i className="fa fa-eye" title="View" />
                            </Button>
                        </Link>
                    </div>
                )
            }
        },
    ];


    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Orders List"}
                        parent={"Ecommerce"}
                        title={"Orders"}
                        breadcrumbActive={"List"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={ordersListData}
                                isLoading={dataLoading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default OrdersList