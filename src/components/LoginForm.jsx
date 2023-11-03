import React from "react";
import Layout from "./Layout";
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

import "../App.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    mobileNumber: "",
  };

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be a 10-digit number")
      .required("*please enter a mobile number"),
  });

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
    navigate("/otpverification", { replace: true });
  };

  return (
    <Layout>
      <Typography variant="h1" className="signup-title">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, errors, touched }) => (
          <Form>
            <FormControl fullWidth style={{ marginBottom: 60 }}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty}
              className="sign-up-button"
              disableElevation
            >
              Login
            </Button>
            <Typography className="to-login-link-text">
              Don’t have an account?{" "}
              <Link onClick={() => navigate("signup", { replace: true })}>
                {" "}
                Sign Up{" "}
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default LoginForm;
