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

const CategoriesList = () => {
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
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        getCategoriesList();
    }, [])

    const getCategoriesList = async () => {
        setDataLoading(true)
        await axios({
            method: 'GET',
            url: URL + "/categories",
        }).then((response) => {
            console.log("getCategoriesList-response", response)
            setDataLoading(false)
            const allCategories = response.data.data;
            allCategories.map((item, index) => (item["index"] = index + 1));
            setCategoriesList(allCategories)
        }).catch((error) => {
            console.log("getCategoriesList-response-error", error)
            setDataLoading(false)
            toast.error("Failed to get Data", {
                position: "top-right"
            })
        })
    }

    console.log("categoriesList", categoriesList)

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
        await axios.delete(`${URL}/category/delete/${id}`, {
            headers: {
                Authorization: localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",

            },
        }).then((response) => {
            console.log("category-response", response);
            /** -> jab category delete ho jay ga, to phir ye categories ke array ko filter kr ga, aur jo 
                category delete ho gaya ha us ko categories ke list sy nikal day ga. Agr filter na kryn
                toh phir page ko refresh krna paray ga.
             */
            setCategoriesList(categoriesList.filter((item) => item._id != id));

            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Category has been deleted successfully",
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
            title: "Category Name",
            flex: 1.8,
            minWidth: 200,
            render: (cellValues) => {
                return cellValues.name;
            },
        },
        {
            field: "show_flash",
            title: "Show Flash",
            flex: 0.3,
            minWidth: 40,
            render: (cellValues) => {
                return cellValues.show_flash == 1 ? "Yes" : "No";
            },
        },
        {
            field: "show_sub_flash",
            title: "Show Sub Flash",
            flex: 1,
            minWidth: 150,
            render: (cellValues) => {
                return cellValues.show_sub_flash == 1 ? "Yes" : "No";
            },
        },
        {
            field: "main_flash_title",
            title: "Main Flash Title",
            flex: 1.8,
            minWidth: 180,
            render: (cellValues) => {
                return cellValues?.main_flash_title;
            },
        },
        {
            field: "main_flash_text",
            title: "Main Flash Text",
            flex: 2.2,
            minWidth: 260,
            render: (cellValues) => {
                return cellValues?.main_flash_text;
            },
        },
        {
            field: "main_flash_image",
            title: "Main Flash Image",
            flex: 1,
            minWidth: 100,
            render: (cellValues) => {
                return (
                    cellValues?.main_flash_image ? (
                        <div style={{ width: 100, overflow: 'hidden' }}>
                            <img style={{ width: "100%" }} src={cellValues?.main_flash_image} alt="" />
                        </div>
                    ) : "No Image"
                );
            },
        },
        {
            field: "sub_flash_title",
            title: "Sub Flash Title",
            flex: 1.8,
            minWidth: 180,
            render: (cellValues) => {
                return cellValues?.sub_flash_title;
            },
        },
        {
            field: "sub_flash_text",
            title: "Sub Flash Text",
            flex: 2.2,
            minWidth: 260,
            render: (cellValues) => {
                return cellValues?.sub_flash_text;
            },
        },
        {
            ...(JSON.parse(localStorage.getItem('usersdata'))?.role == "admin" && {
                field: "action",
                title: "Action",
                cellClassName: "MuiDataGrid-cell-action-customstyles",
                minWidth: 200,
                flex: 2,
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
                            <Link to={`/category/edit/${cellValues._id}`}>
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
        }
    ];


    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Categories List"}
                        parent={"Ecommerce"}
                        title={"Categories"}
                        breadcrumbActive={"List"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                            {
                                JSON.parse(localStorage.getItem('usersdata'))?.role == "admin" && (
                                    <Button onClick={() => history.push("/category/create")} color="primary">{"Create Category"}</Button>
                                )
                            }
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={categoriesList}
                                isLoading={dataLoading}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default withTranslation()(CategoriesList)