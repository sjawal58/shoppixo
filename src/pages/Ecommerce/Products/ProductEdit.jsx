/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react"
import {
    Container, Row, Col, Button, Card, CardBody, Form, Input, CardHeader, Label, Spinner,
} from "reactstrap"
import ButtonSpinner from "../../../components/Common/ButtonSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumb from 'components/Common/Breadcrumb';
import { useHistory, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from "ckeditor4-react";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify"
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from "axios";
import { URL } from "env";
import SweetAlert from "sweetalert2";

const ProductEdit = () => {
    const hitory = useHistory();
    const params = useParams()

    /** params ma wo 'id' get ho ge jo edit ho ge, jo hum nay listing ma pass ke ha. */
    const productID = params?.id;

    console.log("productID", params)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ shouldFocusError: true });

    // is ma products ka sara data aa jay ga jo database ma save ha.
    const [productData, setProductData] = useState(null);
    const [productGallery, setProductGallery] = useState([]);
    const [categoriesList, setCategoriesList] = useState([])
    const [content, setContent] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [dataLoader, setDataLoader] = useState(false)
    const [deleteImageLoading, setDeleteImageLoading] = useState(null);

    useEffect(() => {
        getCategoriesList();
        getProductData()
    }, [])

    const getProductData = async () => {
        setDataLoader(true)
        await axios({
            method: "GET",
            url: `${URL}/product/${productID}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log("getProductData-response", response)
            const product_data = response.data.data;
            setProductData(product_data)
            setDataLoader(false)

            /** Is ma hum sare fields ma default data set kr rahay hain, jo database sy aay ga */
            setValue("category_id", product_data.category_id)
            setValue("name", product_data.name)
            setValue("prod_price", product_data.prod_price)
            setValue("discount_available", product_data.discount_available)
            setValue("discount_percentage", product_data.discount_percentage)
            setValue("stock", product_data?.stock)
            setContent(product_data?.description || "");
            setValue("description", product_data?.description || "")
            setProductGallery(product_data?.product_gallery)

        }).catch((error) => {
            console.log("getProductData-response-error", error)
            setDataLoader(false)
            toast.error("Failed to load Data, Please refreh", {
                position: "top-right"
            })
        })
    }

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

    const handleDeleteGalleryImage = (image_id) => {
        console.log("image_id", image_id)
        SweetAlert.fire({
            title: "Are you sure? Do you want to delete Image?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "error",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                DeleteImage(productID, image_id);
            }
        });
    }

    const DeleteImage = async (product_id, image_id) => {
        setDeleteImageLoading(image_id)
        await axios({
            method: "POST",
            url: `${URL}/product/delete-gallery/${product_id}/${image_id}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log("product-gallery-delete-response", response);
            if (response.data.status == true) {
                getProductData()
                setDeleteImageLoading(null)
                SweetAlert.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Product Image has been deleted successfully",
                    confirmButtonText: "OK",
                });
            } else {
                if (response.data?.message) {
                    toast.error(response.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Delete Image!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            }
            setDeleteImageLoading(null)
        }).catch((error) => {
            console.log("product-gallery-delete-response-error:", error);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                toast.error("Failed to Delete Image!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
            setDeleteImageLoading(null)
        });
    }

    const [imageGallery, setImageGallery] = useState([])

    const handleProductGalleryChangeStatus = ({ meta, file }, status, allFiles) => {
        const maxId_Gallery = productGallery.reduce((max, item) => (item.id > max ? item.id : max), 0);
        console.log("maxId_Gallery", maxId_Gallery)
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
                    base64ImageArr.push({ id: maxId_Gallery + (index + 1), image: reader.result })
                };
            })
        }
        setImageGallery(base64ImageArr)
    };


    const onSubmit = async (data) => {
        console.log("onSubmit-ProductEdit", data)

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

        console.log("onSubmit-newProductGallery-imageGallery-useState", imageGallery)

        const form_data = new FormData();
        form_data.append("product_gallery", JSON.stringify(imageGallery))
        form_data.append("seller_id", user_id);
        form_data.append("category_id", data.category_id);
        form_data.append("name", data.name);
        form_data.append("prod_price", data.prod_price);
        form_data.append("discount_available", data.discount_available);
        form_data.append("discount_percentage", prodPercentage);
        form_data.append("stock", data.stock);
        form_data.append("description", data.description);
        form_data.append("image", data?.image || productData.image);

        if (user_id) {
            updateProduct(form_data)
        } else {
            toast.error("No Seller Id Exist!!", {
                position: 'top-right'
            })
        }
    }

    const updateProduct = async (form_data) => {
        setBtnLoading(true)

        await axios({
            method: "PUT",
            url: `${URL}/product/update/${productID}`,
            headers: {
                "Authorization": localStorage.getItem("usersdatatoken"),
                "Content-Type": "application/json",
            },
            data: form_data,
        }).then((response) => {
            console.log("product-update-response", response);
            if (response.data.status == true) {
                toast.success("Product Updated!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                getProductData()
            } else {
                if (response.data?.message) {
                    toast.error(response.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else {
                    toast.error("Failed to Update Product!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            }
            setBtnLoading(false)
        }).catch((error) => {
            console.log("product-update-response-error:", error.response);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            } else {
                toast.error("Failed to Update Product!", {
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
                        breadcrumbTitle={"Edit Product"}
                        parent={"Ecommerce"}
                        title={"Product"}
                        breadcrumbActive={"Edit"}
                    />
                    <Card className='card_border'>
                        <CardHeader className="d-flex justify-content-end">
                            <Button onClick={goBack} color="primary">{"Go Back"}</Button>
                        </CardHeader>
                        <CardBody>
                            {
                                dataLoader && productData == null && (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Spinner className="me-2" /> <span>Loading data.....</span>
                                    </div>
                                )
                            }
                            {
                                productData == null && dataLoader == false && (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Button onClick={() => getProductData()}>Reload</Button>
                                    </div>
                                )
                            }
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
                                                    placeholder={"Enter Product Name"}
                                                />
                                            )}
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
                                                required: false,
                                            }}
                                            render={({ field }) => (
                                                <Dropzone
                                                    maxFiles={1}
                                                    multiple={false}
                                                    canCancel={false}
                                                    minSizeBytes={0}
                                                    maxSizeBytes={2000000}
                                                    inputContent={"Drop A File"}
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
                                        {/* Image Preview */}
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={productData?.image} alt=""
                                                style={{ width: 100, padding: 4, marginTop: 5, border: '1px solid gray' }} />
                                        </div>
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
                                        {/* Gallery Images Preview */}
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', flexWrap: 'wrap' }}>
                                            {
                                                productGallery && productGallery.length > 0 && productGallery?.map((item) => (
                                                    <div className="img" style={{ position: 'relative', margin: 6, marginTop: 15, border: '1px solid gray', }} >
                                                        {
                                                            (deleteImageLoading && deleteImageLoading != item.id) || (deleteImageLoading == null) && (
                                                                <HighlightOffRoundedIcon
                                                                    style={{ color: '#dd2525', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: -10, right: -10, cursor: 'pointer' }}
                                                                    onClick={() => handleDeleteGalleryImage(item.id)}
                                                                />
                                                            )
                                                        }
                                                        <img src={item?.image} alt=""
                                                            style={{ width: 100, padding: 4, }} />
                                                        {
                                                            deleteImageLoading && deleteImageLoading == item.id && (
                                                                <div className="d-flex align-items-center justify-content-center"
                                                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0101019e' }}>
                                                                    <Spinner style={{ width: 30, height: 30, color: 'white' }} />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                    <Col className="text-start" sm={12}>
                                        <ButtonSpinner
                                            className="w-md"
                                            type="submit"
                                            color="success"
                                            text={"Update"}
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

export default withTranslation()(ProductEdit)