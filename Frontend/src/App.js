import React, { useRef, useEffect, useState } from "react";
import BodyPoseDetection, {
  bodyPose,
} from "./components/features/bodyPoseDetection";
import FaceLandmarkDetection from "./components/features/faceLandmarkDetection";
import HandShapeDetection from "./components/features/handShapeDetection";
import SelfieSegmentationDetection from "./components/features/selfieSegmentation";
import FaceShapeDetection from "./components/features/faceDetection";
import Webcam from "react-webcam";
import "./App.css";
import IconButton from "@material-ui/core/IconButton";
import { Box, Grid, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import { mergeClasses } from "@material-ui/styles";
import solve from "./components/features/bodyPoseDetection";
import xxx from "./components/features/handShapeDetection";
import yyy from "./components/features/selfieSegmentation";
import zzz from "./components/features/bodyPoseDetection";
import aaa from "./components/features/faceLandmarkDetection";
import ccc from "./components/features/objectronDetection";
import ddd from "./components/features/faceDetection";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url()",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100wh",
    background: "#0002",
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // fontSize: 'calc(10px + 2vmin)',
    // color: 'white'
  },
  buttonGrp: {
    position: "absolute",
    bottom: 50,
    zIndex: 20,
  },
  sideButton: {
    position: "absolute",
    bottom: 270,
    width: 640,
    // background : '#0002',
    zIndex: 20,
  },
}));

function App() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [value, setValue] = useState(0);
  const [URL, setURL] = useState(null);

  const leftChange = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const rightChange = () => {
    if (value < 3) {
      setValue(value + 1);
    }
    console.log(value);
  };

  useEffect(() => {
    if (value === 0) {
      xxx(webcamRef, canvasRef);
    } else if (value === 1) {
      yyy(webcamRef, canvasRef);
    } else if (value === 2) {
      zzz(webcamRef, canvasRef);
    } else if (value === 3) {
      aaa(webcamRef, canvasRef);
    }
    //xxx(webcamRef, canvasRef);
  }, [value]);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setURL(imageSrc);
  };

  return (
    <div className="App">
      <Box>
        <center>
          <div className="App">
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            />{" "}
            <canvas
              ref={canvasRef}
              className="output_canvas"
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            ></canvas>
          </div>
        </center>

        {/* <BodyPoseDetection /> */}
        {/* <FaceLandmarkDetection /> */}
        {/* <SelfieSegmentationDetection /> */}
        {/* <HandShapeDetection /> */}
        {/* <FaceShapeDetection /> */}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.sideButton}
      >
        <IconButton
          style={{ color: "#FFF", fontSize: 20 }}
          onClick={leftChange}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          style={{ color: "#FFF", fontSize: 20 }}
          onClick={rightChange}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box className={classes.buttonGrp}>
      <IconButton
          style={{ color: "#FFF", fontSize: 20 }}
          onClick={capturePhoto }
        >
          <ArrowForwardIosIcon />
        </IconButton>
                
        {URL && <img
              style={{ height: "100px", width: "100px" }}
              src={URL} //show pic in state
              alt="Screenshot"
              //onClick={() => this.selectPic(x)} // click pic to select that pic, and remove others
            />}
      </Box>
    </div>
  );
}

export default App;
