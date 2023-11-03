import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid,
  Paper,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PDFViewer = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            <BiArrowBack />
          </IconButton>
          <Typography variant="h6">{files[0] && files[0].name}</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        {/* Sidebar with page numbers */}
        <Grid item xs={2} display={"flex"}>
          <Paper elevation={0} width={"100%"}>
            <Box
              p={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  onClick={() => handlePageChange(i + 1)}
                >
                  Page {i + 1}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* PDF viewer in the center */}
        <Grid item xs={10} style={{ height: "100vh" }}>
          <Box
            display="flex"
            justifyContent="center"
            style={{ height: "100%" }}
          >
            <Document file={files[0]} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
        </Grid>
        <Box textAlign="center" display={"flex"} alignItems={"center"} gap={5}>
          <Button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous Page
          </Button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Button
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber === numPages}
          >
            Next Page
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default PDFViewer;
