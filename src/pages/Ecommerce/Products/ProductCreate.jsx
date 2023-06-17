/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from "ckeditor4-react";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify"
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from "axios";
import { URL } from "env";

const ProductCreate = () => {
    const hitory = useHistory();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    const [categoriesList, setCategoriesList] = useState([])
    const [content, setContent] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        getCategoriesList()
    }, [])

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

    const onChangeEditor = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent);
        setValue("description", newContent);
    };

    const handleImageChangeStatus = ({ meta, file }, status, allFiles) => {
        console.log("file", file)
        if (file.type?.includes("image")) {
            if (status == "error_file_size") {
                allFiles.forEach((f) => f.remove());
                setValue("image", null);
                setError(
                    "image",
                    {
                        type: "string",
                        message: "Maximum file size is 2 MB",
                    },
                    {
                        shouldFocus: true,
                    }
                );
            }
        } else {
            allFiles.forEach((f) => f.remove());
            setValue("image", null);
            setError(
                "image",
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
            setValue("image", null);
        }
        if (status == "done") {
            // converting the image to base-64 string.
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                /** Uploading the base-64 to "image" field. */
                setValue("image", reader.result);
                setError("image", {
                    shouldFocus: false,
                });
            };
        }
    };

    const [imageGallery, setImageGallery] = useState([])

    const handleProductGalleryChangeStatus = ({ meta, file }, status, allFiles) => {
        console.log("file", file)
        // console.log("allFiles:", allFiles)
        let base64ImageArr = [];
        let allImages = allFiles;
        // if (status == "error_file_size") allFiles.forEach((f) => f.remove());
        if (file.type?.includes("image")) {
            if (status == "error_file_size") {
                let files_size_error = allFiles.find(
                    (item) => item.file.name == file.name
                );
                files_size_error.remove();
                let files_array = allFiles.filter((item) => item.file.name != file.name);
                setValue("product_gallery", files_array);
                setError(
                    "product_gallery",
                    {
                        type: "string",
                        message: "Maximum file size is 2 MB for each file.",
                    },
                    {
                        shouldFocus: true,
                    }
                );
            }
        } else {
            setError(
                "product_gallery",
                {
                    type: "string",
                    message: "Only images files required",
                },
                {
                    shouldFocus: true,
                }
            );
        }
        console.log("status:", status)
        if (status == "removed") {
            allImages = allImages?.filter(img => img.file.name != file.name);
            console.log("allFiles:", allImages)
            setValue("product_gallery", allImages);
            setError("product_gallery", {
                shouldFocus: false,
            });
            // converting the image to base-64 string.
            allImages?.map((item, index) => {
                // console.log("file----", item.file)
                const reader = new FileReader();
                reader.readAsDataURL(item.file);
                reader.onload = () => {
                    /** Uploading the base-64 to "image" field. */
                    base64ImageArr.push({ id: index, image: reader.result })
                };
            })
        }
        if (status == "done") {
            console.log("allFiles:", allImages)
            setValue("product_gallery", allImages);
            setError("product_gallery", {
                shouldFocus: false,
            });
            // converting the image to base-64 string.
            allImages?.map((item, index) => {
                // console.log("file----", item.file)
                const reader = new FileReader();
                reader.readAsDataURL(item.file);
                reader.onload = () => {
                    /** Uploading the base-64 to "image" field. */
                    base64ImageArr.push({ id: index, image: reader.result })
                };
            })
        }
        setImageGallery(base64ImageArr)
    };

    const onSubmit = (data) => {
        console.log("onSubmit-ProductCreate", data)

        const discount_available = data.discount_available;
        const discount_percentage = data.discount_percentage;

        /** discount ke validation ko top pr likhna zaruri ha */
        /** Ye check kr raha ha k agr discount available ha lakin us ke value/percentage ni ha to error show kry ga. */
        /** retun jahan pr aata ha, code us sy agay ni chalta, wahan pr ruk jata ha, matlab k return kr jata ha. */
        if (discount_available == 1 && discount_percentage == null) {
            setError("discount_percentage", { message: "Discount value is required" })
            return;
        }
        if (discount_available == 1) {
            if (discount_percentage <= 1) {
                setError("discount_percentage", { message: "Discount value must be greater than 1" })
                return;
            }
            if (discount_percentage > 90) {
                setError("discount_percentage", { message: "Discount value must be less than 91" })
                return;
            }
        }

        let prodPercentage;
        if (discount_percentage) {
            prodPercentage = discount_percentage;
        } else {
            prodPercentage = 0;
        }

        const user_id = JSON.parse(localStorage.getItem("usersdata"))?._id;

        const form_data = new FormData();
        form_data.append("product_gallery", JSON.stringify(imageGallery))
        console.log("onSubmit-newProductGallery-imageGallery-useState", imageGallery)

        form_data.append("seller_id", user_id);
        form_data.append("category_id", data.category_id);
        form_data.append("name", data.name);
        form_data.append("prod_price", data.prod_price);
        form_data.append("discount_available", data.discount_available);
        form_data.append("discount_percentage", prodPercentage);
        form_data.append("stock", data.stock);
        form_data.append("description", data.description);
        form_data.append("image", data.image);

        if (user_id) {
            createNewProduct(form_data)
        } else {
            toast.error("No Seller Id Exist!!", {
                position: 'top-right'
            })
        }
    }

    const createNewProduct = async (formData) => {
        setBtnLoading(true)

        await axios({
            method: "POST",
            url: `${URL}/product-create`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
            data: formData,
        }).then((response) => {
            console.log("product-response", response);
            if (response.data.status == true) {
                toast.success("Product Created!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                if (response.data?.message) {
                    toast.error(response.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Created Product!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            }
            setBtnLoading(false)
        }).catch((error) => {
            console.log("product-response-error:", error);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                toast.error("Failed to Created Product!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
            setBtnLoading(false)
        });
    }

    const goBack = () => {
        hitory.push("/products/list")
    };

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb
                        breadcrumbTitle={"Create Product"}
                        parent={"Ecommerce"}
                        title={"Product"}
                        breadcrumbActive={"Create"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                            <Button onClick={goBack} color="primary">{"Go Back"}</Button>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Select Category"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='category_id'
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <div className="d-flex align-items-center">
                                                    <Input
                                                        {...field}
                                                        type="select">
                                                        <option value={null} disabled selected>Please Select Category</option>
                                                        {
                                                            categoriesList && categoriesList.length > 0 &&
                                                            categoriesList.map((item) => <option value={item._id}>{item.name}</option>)
                                                        }
                                                    </Input>
                                                    {categoriesList && categoriesList.length == 0
                                                        && <p className="btn btn-dark mb-0 ms-1" onClick={getCategoriesList}><RefreshIcon /></p>}
                                                </div>
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.category_id?.type == "required" && "Category is required"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Product Name"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='name'
                                            rules={{
                                                required: true,
                                                maxLength: 200,
                                                minLength: 3,
                                                pattern: /^[a-zA-Z0-9.,-_&\s]+$/,
                                            }}
                                            render={({ field }) => {
                                                return (
                                                    <Input
                                                        {...field}
                                                        style={{ maxHeight: 35 }}
                                                        type="textarea"
                                                        onKeyDown={(e) => {
                                                            if (e.key == "Enter") {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        placeholder={"Enter Product Name"} />
                                                );
                                            }}
                                        />
                                        <span className="field_error">
                                            {errors.name?.type == "required" && "Product Name is required"}
                                            {errors.name?.type == "maxLength" && "Maximum Length: " + "200"}
                                            {errors.name?.type == "minLength" && "Minumum Length: " + "3"}
                                            {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Price"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='prod_price'
                                            rules={{
                                                required: true,
                                                pattern: /^[0-9][0-9\d,]*\.?[0-9\d,]*$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Enter Product Price"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.prod_price?.type == "required" && "Price is required"}
                                            {errors.prod_price?.type == "pattern" && "Please enter valid price"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Discount Available"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='discount_available'
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="select">
                                                    <option value={null} selected disabled>Select is discount available?</option>
                                                    <option value={0}>No Discount</option>
                                                    <option value={1}>Discount Available</option>
                                                </Input>
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.discount_available?.type == "required" && "Discount is required"}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Discount Percentage"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='discount_percentage'
                                            rules={{
                                                required: false,
                                                pattern: /^[0-9]*$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Enter Discount Percentage"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.discount_percentage?.type == "required" && "Price is required"}
                                            {errors.discount_percentage?.type == "pattern" && "Please enter percentage"}
                                            {errors.discount_percentage?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={6}>
                                        <Label for="">{"Stock"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='stock'
                                            rules={{
                                                required: true,
                                                pattern: /^[0-9]*$/,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder={"Enter Stock"}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.stock?.type == "required" && "Stock is required"}
                                            {errors.stock?.type == "pattern" && "Please write integers"}
                                            {errors.stock?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Product Description"}</Label>
                                        <Controller
                                            control={control}
                                            name='description'
                                            rules={{
                                                required: false,
                                            }}
                                            render={({ field }) => (
                                                <CKEditor
                                                    {...field}
                                                    activeclassName="p10"
                                                    initData={content}
                                                    onChange={onChangeEditor}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.description?.type == "required" && "Description is required"}
                                            {errors.description?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Product Image"} <span className="text-danger">*</span></Label>
                                        <Controller
                                            control={control}
                                            name='image'
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <Dropzone
                                                    maxFiles={1}
                                                    multiple={false}
                                                    canCancel={false}
                                                    minSizeBytes={0}
                                                    maxSizeBytes={2000000}
                                                    inputContent={"Drop an Image"}
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
                                            {errors.image?.type == "required" && "Product Image is required"}
                                            {errors.image?.message || ""}
                                        </span>
                                    </Col>
                                    <Col className="mb-3" md={12}>
                                        <Label for="">{"Product Gallery Images"} <span className="text-danger"></span></Label>
                                        <Controller
                                            control={control}
                                            name='product_gallery'
                                            rules={{
                                                required: false,
                                            }}
                                            render={({ field }) => (
                                                <Dropzone
                                                    maxFiles={10}
                                                    multiple={true}
                                                    canCancel={false}
                                                    canRemove={true}
                                                    minSizeBytes={0}
                                                    maxSizeBytes={2000000}
                                                    inputContent={"Drop an Image"}
                                                    styles={{
                                                        dropzone: { height: 200 },
                                                        dropzoneActive: { borderColor: "green" },
                                                    }}
                                                    accept="image/*"
                                                    onChangeStatus={handleProductGalleryChangeStatus}
                                                />
                                            )}
                                        />
                                        <span className="field_error">
                                            {errors.product_gallery?.type == "required" && "Product Gallery Images is required"}
                                            {errors.product_gallery?.message || ""}
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

export default withTranslation()(ProductCreate)