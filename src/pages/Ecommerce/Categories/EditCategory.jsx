/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from "ckeditor4-react";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify"
import axios from "axios";
import { URL } from "env";

const EditCategory = () => {
    const hitory = useHistory();
    const params = useParams()

    /** params ma wo 'id' get ho ge jo edit ho ge, jo hum nay listing ma pass ke ha. */
    const categoryID = params?.id;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const [categoryData, setCategoryData] = useState([])
    const [content, setContent] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        getCategoryData()
    }, [])

    const getCategoryData = async () => {
        await axios({
            method: "GET",
            url: `${URL}/category/${categoryID}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log("getCategoryData-response", response)
            const data_list = response.data.data;
            setCategoryData(data_list)

            /** Is ma hum sare fields ma default data set kr rahay hain, jo database sy aay ga */
            setValue("name", data_list.name)
            setValue("show_flash", data_list.show_flash)
            setValue("show_sub_flash", data_list.show_sub_flash)
            setValue("main_flash_title", data_list.main_flash_title)
            setValue("main_flash_text", data_list.main_flash_text)
            setValue("main_flash_image", data_list?.main_flash_image)
            setValue("sub_flash_title", data_list?.sub_flash_title)
            setValue("sub_flash_text", data_list?.sub_flash_text)

        }).catch((error) => {
            console.log("getCategoryData-response-error", error.response)
            toast.error("Failed to load Data, Please refreh", {
                position: "top-right"
            })
        })
    }

    const handleImageChangeStatus = ({ meta, file }, status, allFiles) => {
        console.log("file", file)
        if (file.type?.includes("image")) {
            if (status == "error_file_size") {
                allFiles.forEach((f) => f.remove());
                setValue("main_flash_image", null);
                setError(
                    "main_flash_image",
                    {
                        type: "string",
                        message: "Maximum file size is 2 MB",
                    },
                    {
                        shouldFocus: true,
                    }
                );
            } else {

            }
        } else {
            allFiles.forEach((f) => f.remove());
            setValue("main_flash_image", null);
            setError(
                "main_flash_image",
                {
                    type: "string",
                    message: "Only images files required",
                },
                {
                    shouldFocus: true,
                }
            );
        }
        if (status == "removed") {
            setValue("main_flash_image", null);
        }
        if (status == "done") {
            // converting the image to base-64 string.
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                /** Uploading the base-64 to "image" field. */
                setValue("main_flash_image", reader.result);
                setError("main_flash_image", {
                    shouldFocus: false,
                });
            };
        }
    };

    const onSubmit = (data) => {
        console.log("onSubmit-CategoryEdit", data)

        if (data.show_flash == 1) {
            if (!data.main_flash_title && !data.main_flash_text && !data.main_flash_image) {
                setError("main_flash_title", { message: "Main Flash Title is required" })
                setError("main_flash_text", { message: "Main Flash Text is required" })
                // setError("main_flash_image", { message: "Main Flash Image is required" })
                return;
            }
            if (!data.main_flash_title) {
                setError("main_flash_title", { message: "Main Flash Title is required" })
                return;
            }
            if (!data.main_flash_text) {
                setError("main_flash_text", { message: "Main Flash Text is required" })
                return;
            }
            if (!data.main_flash_image) {
                setError("main_flash_image", { message: "Main Flash Image is required" })
                return;
            }
        }

        if (data.show_sub_flash == 1) {
            if (!data.sub_flash_title && !data.sub_flash_text) {
                setError("sub_flash_title", { message: "Sub Flash Title is required" })
                setError("sub_flash_text", { message: "Sub Flash Text is required" })
                return;
            }
            if (!data.sub_flash_title) {
                setError("sub_flash_title", { message: "Sub Flash Title is required" })
                return;
            }
            if (!data.sub_flash_text) {
                setError("sub_flash_text", { message: "Sub Flash Text is required" })
                return;
            }
        }

        // Edit new Category
        handleEditCategory(data);
    }

    const handleEditCategory = async (data) => {

        const formData = {
            name: data.name,
            show_flash: data.show_flash,
            show_sub_flash: data.show_sub_flash,
            main_flash_title: data.main_flash_title,
            main_flash_text: data.main_flash_text,
            main_flash_image: data?.main_flash_image || categoryData?.image,
            sub_flash_title: data.sub_flash_title,
            sub_flash_text: data.sub_flash_text,
        }

        setBtnLoading(true)

        await axios({
            method: "PUT",
            url: `${URL}/category/update/${categoryID}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
            data: formData,
        }).then((response) => {
            console.log("category-response", response);
            if (response.data.status == true) {
                toast.success("Category Updated!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                if (response.data?.message) {
                    toast.error(response.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Update Category!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            }
            setBtnLoading(false)
        }).catch((error) => {
            console.log("category-response-error:", error.response);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                toast.error("Failed to Update Category!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
            setBtnLoading(false)
        });
    }

    const goBack = () => {
        hitory.push("/categories/list")
    };

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Edit Category"}
                        parent={"Ecommerce"}
                        title={"Category"}
                        breadcrumbActive={"Edit"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                            <Button onClick={goBack} color="primary">{"Go Back"}</Button>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Category Name"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='name'
                                            rules={{
                                                required: true,
                                                maxLength: 50,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.&\s]+$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Enter Categoty Name"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.name?.type == "required" && "Categoty Name is required"}
                                            {errors.name?.type == "maxLength" && "Maximum Length: " + "50"}
                                            {errors.name?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Show Flash?"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='show_flash'
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="select">
                                                    <option value={null} selected disabled>Show Flash?</option>
                                                    <option value={0}>No</option>
                                                    <option value={1}>Yes</option>
                                                </Input>
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.show_flash?.type == "required" && "Field is required"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Show Sub Flash?"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='show_sub_flash'
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="select">
                                                    <option value={null} selected disabled>Show Sub Flash?</option>
                                                    <option value={0}>No</option>
                                                    <option value={1}>Yes</option>
                                                </Input>
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.show_sub_flash?.type == "required" && "Field is required"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Main Flash Title"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='main_flash_title'
                                            rules={{
                                                required: false,
                                                maxLength: 50,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.&\s]+$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Main Flash Title"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.main_flash_title?.type == "required" && "Field is required"}
                                            {errors.main_flash_title?.type == "maxLength" && "Maximum Length: " + "50"}
                                            {errors.main_flash_title?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.main_flash_title?.type == "pattern" && "Please write alphanumeric values"}
                                            {errors.main_flash_title?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Main Flash Text"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='main_flash_text'
                                            rules={{
                                                required: false,
                                                maxLength: 100,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.&\s]+$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    style={{ maxHeight: 35 }}
                                                    type="textarea"
                                                    onKeyDown={(e) => {
                                                        if (e.key == "Enter") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder={"Main Flash Text"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.main_flash_text?.type == "required" && "Field is required"}
                                            {errors.main_flash_text?.type == "maxLength" && "Maximum Length: " + "100"}
                                            {errors.main_flash_text?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.main_flash_text?.type == "pattern" && "Please write alphanumeric values"}
                                            {errors.main_flash_text?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Main Flash Image"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='main_flash_image'
                                            rules={{
                                                required: false,
                                            }}
                                            render={({ field }) => (
                                                <Dropzone
                                                    maxFiles={1}
                                                    multiple={false}
                                                    canCancel={false}
                                                    minSizeBytes={0}
                                                    maxSizeBytes={2000000}
                                                    inputContent={"Drop An Image"}
                                                    styles={{
                                                        dropzone: { height: 200 },
                                                        dropzoneActive: { borderColor: "green" },
                                                    }}
                                                    accept="image/*"
                                                    onChangeStatus={handleImageChangeStatus}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.main_flash_image?.type == "required" && "Main Flash Image is required"}
                                            {errors.main_flash_image?.message || ""}
                                        </span>
                                        {/* Image Preview */}
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={categoryData?.main_flash_image} alt=""
                                                style={{ width: 100, padding: 4, marginTop: 5, border: '1px solid gray' }} />
                                        </div>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Sub Flash Title"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='sub_flash_title'
                                            rules={{
                                                required: false,
                                                maxLength: 50,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.&\s]+$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Sub Flash Title"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.sub_flash_title?.type == "required" && "Field is required"}
                                            {errors.sub_flash_title?.type == "maxLength" && "Maximum Length: " + "50"}
                                            {errors.sub_flash_title?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.sub_flash_title?.type == "pattern" && "Please write alphanumeric values"}
                                            {errors.sub_flash_title?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Sub Flash Text"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='sub_flash_text'
                                            rules={{
                                                required: false,
                                                maxLength: 100,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.&\s]+$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    style={{ maxHeight: 35 }}
                                                    type="textarea"
                                                    onKeyDown={(e) => {
                                                        if (e.key == "Enter") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder={"Sub Flash Text"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.sub_flash_text?.type == "required" && "Field is required"}
                                            {errors.sub_flash_text?.type == "maxLength" && "Maximum Length: " + "100"}
                                            {errors.sub_flash_text?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.sub_flash_text?.type == "pattern" && "Please write alphanumeric values"}
                                            {errors.sub_flash_text?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="text-start" sm={12}>
                                        <ButtonSpinner
                                            className="w-md"
                                            type="submit"
                                            color="success"
                                            text={"Submit"}
                                            loading={btnLoading}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default withTranslation()(EditCategory)