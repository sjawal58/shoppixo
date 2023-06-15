/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import DataTable from "../../../components/CustomElements/dataTable/DataTable";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";

const SellersList = () => {
    const history = useHistory();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const [sellersList, setSellersList] = useState([])
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        getSellersList();
    }, [])

    const getSellersList = async () => {
        setDataLoading(true)
        await axios({
            method: 'GET',
            url: URL + "/sellers",
        }).then((response) => {
            console.log("getSellersList-response", response)
            setDataLoading(false)
            const allSellers = response.data.data;
            allSellers.map((item, index) => (item["index"] = index + 1));
            setSellersList(allSellers)
            setDataLoading(false)
        }).catch((error) => {
            console.log("getSellersList-response-error", error)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
        })
    }

    console.log("sellersList", sellersList)

    const DeleteAlert = (id) => {
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
        await axios.delete(`${URL}/admin/delete/${id}`, {
            headers: {
                Authorization: localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setSellersList(sellersList.filter((item) => item._id != id));
            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Seller has been deleted successfully",
                confirmButtonText: "OK",
            });
        }).catch((error) => {
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
            title: "Name",
            flex: 2,
            minWidth: 220,
            render: (cellValues) => {
                return cellValues.firstname + " " + cellValues.lastname;
            },
        },
        {
            field: "email",
            title: "Email",
            flex: 2,
            minWidth: 220,
        },
        {
            field: "action",
            title: "Action",
            cellClassName: "MuiDataGrid-cell-action-customstyles",
            minWidth: 200,
            render: (cellValues) => {
                return (
                    <div>
                        <Button
                            color="danger"
                            outline
                            onClick={(e) => DeleteAlert(cellValues._id)}
                        >
                            <i className="fa fa-trash" title="Delete" />
                        </Button>
                    </div>
                )
            }
        }
    ];


    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Sellers List"}
                        parent={"Administration"}
                        title={"Sellers"}
                        breadcrumbActive={"List"}
                    />
                    <Card className='card_border'>
                        {/* <CardHeader className="d-flex justify-content-end">
                        </CardHeader> */}
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={sellersList}
                                isLoading={dataLoading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default SellersList