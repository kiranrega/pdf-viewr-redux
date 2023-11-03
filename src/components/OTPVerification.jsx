import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import Layout from "./Layout";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const navigate = useNavigate();

  // Function to stop the timer
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          stopTimer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  return (
    <Layout>
      <Typography className="verification-title">
        Mobile Number Verification
      </Typography>
      <Typography className="verification-decription">
        We have sent an OTP to your mobile number
      </Typography>
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span style={{ marginLeft: 10 }}> </span>}
        renderInput={(props) => <input {...props} />}
        containerStyle="otp-container"
        inputStyle="otp-input"
      />
      <Typography className="otp-timer">
        {formatTime(timer)} secs remaining
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="sign-up-button"
        disableElevation
        disabled={otp.length !== 6}
        onClick={() => navigate("/dashboard")}
      >
        Continue
      </Button>
      <Button variant="text" className="resend-otp-button">
        Resend OTP
      </Button>
    </Layout>
  );
};

export default OTPVerification;
