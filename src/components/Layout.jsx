import React from "react";
import sideIcon from "../assets/circleIcon.svg";
import { Container, Grid } from "@mui/material";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <Grid
      container
      style={{ width: "100vw", height: "100vh", maxWidth: "100%" }}
    >
      <Grid item md={8} xs={12} className="input-fields-container">
        <Grid item className="input-fields-sub-container">
          {children}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        style={{ background: "#0360D7" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img src={sideIcon} alt="sideIcon" style={{ width: "90%" }} />
      </Grid>
    </Grid>
  );
};

export default Layout;
