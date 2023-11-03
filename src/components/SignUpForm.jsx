import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  FormControl,
  Checkbox,
  Button,
  InputAdornment,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { FaMobileScreenButton } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import Layout from "./Layout";
import "../App.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    mobileNumber: "",
    acceptConditions: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("*please enter a username"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be a 10-digit number")
      .required("*please enter a mobile number"),
    acceptConditions: Yup.boolean().oneOf(
      [true],
      "You must accept the conditions"
    ),
  });

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
    navigate("/otpverification", { replace: true });
  };

  return (
    <Layout>
      <Typography variant="h1" className="signup-title">
        Sign Up
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, errors, touched }) => (
          <Form>
            <FormControl fullWidth>
              <Field
                as={TextField}
                variant="outlined"
                name="username"
                placeholder="Username"
                fullWidth
                margin="normal"
                error={errors.username && touched.username}
                helperText={
                  errors.username && touched.username && errors.username
                }
                InputProps={{
                  startAdornment: (
                    <React.Fragment>
                      <InputAdornment position="start">
                        <BsFillPersonFill />
                      </InputAdornment>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="divider"
                      />
                    </React.Fragment>
                  ),
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <Field
                as={TextField}
                placeholder="Mobile Number"
                variant="outlined"
                name="mobileNumber"
                fullWidth
                margin="normal"
                error={errors.mobileNumber && touched.mobileNumber}
                helperText={
                  errors.mobileNumber &&
                  touched.mobileNumber &&
                  errors.mobileNumber
                }
                InputProps={{
                  startAdornment: (
                    <React.Fragment>
                      <InputAdornment position="start">
                        <FaMobileScreenButton />
                      </InputAdornment>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="divider"
                      />
                    </React.Fragment>
                  ),
                }}
              />
            </FormControl>

            <FormControl
              fullWidth
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Field type="checkbox" name="acceptConditions" as={Checkbox} />
              <label htmlFor="acceptConditions" className="checbox-text-style">
                I accept the <Link> terms and conditions</Link>
              </label>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty}
              className="sign-up-button"
              disableElevation
            >
              Create an account
            </Button>
            <Typography className="to-login-link-text">
              Already have an account?{" "}
              <Link onClick={() => navigate("/")}> Login </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default SignupForm;
