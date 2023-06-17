/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { Button, Card, CardBody, Col, Row, Spinner, } from "reactstrap"
import { useForm } from "react-hook-form";
import { Form, } from "react-bootstrap";
import axios from 'axios';
import { URL } from "../../../env"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileEdit = () => {
  const navigate = useNavigate();

  /* => react-hook-form ke libraray sy in ko get kia ha form validation k liyay. 
    => ye saray variables/objects useForm ma store hotay hain.  */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const [userProfileData, setUserProfileData] = useState(null)
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);

  useEffect(() => {
    getUserProfileData()
  }, [])

  const getUserProfileData = async () => {
    await axios({
      method: 'GET',
      url: URL + `/customer/${localStorage.getItem('user_id')}`,
    }).then((response) => {
      console.log("getUserProfileData", response)
      const data = response.data.data;
      setUserProfileData(data)

      setValue('firstname', data?.firstname)
      setValue('lastname', data?.lastname)
      setValue('email', data?.email)
      setValue('phone_number', data?.phone_number)
      setValue('date_of_birth', data?.date_of_birth)
      setValue('gender', data?.gender)
    }).catch((error) => {

    })
  }

  /* ye onSubmit bhe react-hook-form sy aaya ha jo useForm ma store tha. Is ko hum form k onsubmit click ma pass krtay hain,
    jis ma form ke sare values is maa aa jate hain aur ye un values ko validate krta ha. */
  const onSubmit = async (data) => {
    console.log("edit-profile-onSubmit", data);

    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setLoginBtnLoading(true)

      const formData = {
        customer_id: user_id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        phone_number: data?.phone_number,
        date_of_birth: data?.date_of_birth,
        gender: data?.gender,
      }

      await axios({
        method: "PUT",
        url: URL + `/customer/update/${user_id}`,
        data: formData,
      }).then((response) => {
        console.log("edit-profile-response", response)
        setLoginBtnLoading(false)

        if (response?.data?.status == true) {
          localStorage.setItem('username', data?.firstname + " " + data?.lastname)

          toast.success('Profile Updated', {
            position: "top-right"
          });

          navigate('/profile');
        } else {
          toast.error(response?.data?.message, {
            position: "top-right"
          });
        }

      }).catch((error) => {
        console.log("edit-profile-response-error", error)

        if (error.response?.data?.message) {
          toast.error(error.response.data.message, {
            position: "top-right"
          });
        } else if (error?.message) {
          toast.error(error?.message, {
            position: "top-right"
          });
        } else {
          toast.error("Failed", {
            position: "top-right"
          });
        }
        setLoginBtnLoading(false)
      })
    } else {
      toast.error("User Id not Found", {
        position: "top-right"
      });
    }
  }

  return (
    <div className="profile_edit_page_wrapper">
      <Card>
        <Col className='mx-2 mb-0'>
          <span className='fa fa-left-arrow' style={{
            fontSize: 12, color: 'var(--color-primary)',
            cursor: 'pointer'
          }} onClick={() => navigate('/profile')}>Back</span>
        </Col>
        <CardBody>
          <h4 className='mb-3'>Edit Profile</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="Please enter first name"
                    defaultValue={userProfileData?.firstname}
                    {...register("firstname", {
                      required: true,
                      pattern: /^[a-zA-Z0-9.\s]+$/,
                    })}
                  />
                  <span className="error" style={{ fontSize: 12 }}>
                    {errors.firstname?.type == "required" &&
                      "First Name is required"}
                    {errors.firstname?.type == "pattern" &&
                      "Please write alphanumeric values"}
                  </span>
                </Form.Group>
              </Col>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Please enter last name"
                    defaultValue={userProfileData?.lastname}
                    {...register("lastname", {
                      required: true,
                      pattern: /^[a-zA-Z0-9.\s]+$/,
                    })}
                  />
                  <span className="error" style={{ fontSize: 12 }}>
                    {errors.lastname?.type == "required" &&
                      "Last Name is required"}
                    {errors.lastname?.type == "pattern" &&
                      "Please write alphanumeric values"}
                  </span>
                </Form.Group>
              </Col>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    defaultValue={userProfileData?.email}
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  <span className="error">
                    {errors.email?.type == "required" && "Email is required"}
                    {errors.email?.type == "pattern" &&
                      "Please enter valid email"}
                  </span>
                </Form.Group>
              </Col>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-30" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    placeholder="Please enter phone no."
                    defaultValue={userProfileData?.phone_number}
                    {...register("phone_number", {
                      required: true,
                      minLength: 11,
                      pattern: /^[0-9-+]+$/,
                    })}
                  />
                  <span className="error">
                    {errors.phone_number?.type == "required" && "Phone Number is required"}
                    {errors.phone_number?.type == "minLength" && "Minimum Length is 11"}
                    {errors.phone_number?.type == "pattern" &&
                      "Please enter valid phone number"}
                  </span>
                </Form.Group>
              </Col>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_birth"
                    placeholder="Please enter phone no."
                    {...register("date_of_birth", {
                      required: true,
                    })}
                  />
                  <span className="error">
                    {errors.date_of_birth?.type == "required" && "Date of Birth is required"}
                  </span>
                </Form.Group>
              </Col>
              <Col className='mb-3' xs="12" sm="6" md="4">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    defaultValue={userProfileData?.gender}
                    aria-label="Default select example"
                    {...register("gender", {
                      required: true,
                    })}
                  >
                    <option value="" disabled selected>Select Gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                  </Form.Select>
                  <span className="error">
                    {errors.gender?.type == "required" && "Gender is required"}
                    {errors.gender?.message || ""}
                  </span>
                </Form.Group>
              </Col>
              <Col className='' xs="12" sm="12" md="12">
                <Button className='profile_edit_btn' type='submit'>
                  {
                    loginBtnLoading && (<Spinner style={{ width: 18, height: 18, marginRight: 5, }} />)
                  }
                  <span>Save Profile Changes</span>
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default ProfileEdit