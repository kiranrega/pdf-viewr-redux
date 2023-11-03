import React, { useState } from "react";
import { styled } from "@mui/system";
export {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Container,
  Box,
  Button,
} from "@mui/material";

import pdfIcon from "../assets/image 1574.png";
import wordIcon from "../assets/image 2314.png";
import sheetsIcon from "../assets/slides 1.png";
import excelIcon from "../assets/image 2315.png";
import { useDropzone } from "react-dropzone";
import { FaFileUpload, FaPlus } from "react-icons/fa";

import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { handleSingleFile, uploadFile } from "../redux/fileSlice";
import { Document, Page, pdfjs } from "react-pdf";
//  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppRoot = styled("div")({
  display: "flex",
});

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
}));

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: `${drawerWidth}px`,
  flexShrink: 0,
}));

const DrawerPaper = styled("div")({
  width: `${drawerWidth}px`,
});

const ContentContainer = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: theme.spacing(6),
}));

const Dashboard = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (files) => {
      dispatch(uploadFile(files[0]));
    },
  });
  const [showDropzone, setShowDropzone] = useState(true);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const navigate = useNavigate();
  const gotoSingleFilePage = (file) => {
    dispatch(handleSingleFile(file));
    navigate("/pdfviwer", { replace: true });
  };

  return (
    <AppRoot>
      {console.log(files)}
      <CssBaseline />
      <AppBarContainer
        position="fixed"
        style={{ background: "#fff" }}
        elevation={0}
      >
        {files.length !== 0 && (
          <Toolbar>
            <Typography
              variant="h1"
              className="upload-files-title"
              width={200}
              fontSize={"small"}
            >
              All Files
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button variant="contained" onClick={() => setShowDropzone(true)}>
                <FaPlus /> Add New Pdf{" "}
              </Button>
            </Box>
          </Toolbar>
        )}
      </AppBarContainer>
      <DrawerContainer variant="permanent" anchor="left">
        <DrawerPaper>
          <List>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </DrawerPaper>
      </DrawerContainer>

      {files && files.length !== 0 ? (
        <ContentContainer>
          <Typography className="upload-files-heading">
            Uploaded PDF Files
          </Typography>
          <Grid container>
            {files.map((file, index) => (
              <Grid
                item
                key={index}
                sm={3}
                style={{
                  width: "max-content",
                  marginLeft: 10,
                  marginRight: 10,
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={2}
                className="pdf-thumbnail"
                onClick={() => gotoSingleFilePage(file)}
              >
                <Document file={file}>
                  <Page pageNumber={1} width={100} />
                </Document>
                <Typography style={{ fontSize: 14 }}>{file.name}</Typography>
              </Grid>
            ))}
          </Grid>
        </ContentContainer>
      ) : (
        showDropzone && (
          <ContentContainer>
            <Container maxWidth="lg" className="upload-files-main-container">
              <Typography variant="h1" className="upload-files-title">
                Upload Files
              </Typography>
              <Typography variant="subtitle1" className="upload-files-subtitle">
                Upload documents you want to chat and share with your team
              </Typography>
              <Box className="icons-container">
                <img
                  src={pdfIcon}
                  alt="pdfIcon"
                  className="document-icon pdf-icon"
                />
                <img
                  src={wordIcon}
                  alt="wordIcon"
                  className="document-icon word-icon"
                />
              </Box>
              <Box className="icons-container">
                <img
                  src={excelIcon}
                  alt="excelIcon"
                  className="document-icon excel-icon"
                />
                <img
                  src={sheetsIcon}
                  alt="sheetsIcon"
                  className="document-icon sheets-icon"
                />
              </Box>
            </Container>
            <Container
              style={{ width: 500, bottom: 150, position: "relative" }}
            >
              <section className="drop-zone-container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <FaFileUpload fontSize={40} />
                  <p className="dropzone-text">
                    Drag and drop files here to upload{" "}
                  </p>
                  <p className="dropzone-text" style={{ fontSize: 20 }}>
                    -OR-
                  </p>
                  <Button variant="contained">Browse Files</Button>
                </div>
              </section>
            </Container>
          </ContentContainer>
        )
      )}
    </AppRoot>
  );
};

export default Dashboard;
