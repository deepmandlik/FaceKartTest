import React, { useRef } from "react";
import Webcam from "react-webcam";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  webcam: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    zindex: 9,
    width: 740,
    height: 460,
    [theme.breakpoints.down('sm')]: {
        width: 360,
        height : 600
    }
  },
}));

export default function WebCam() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <React.Fragment>
      <Webcam ref={webcamRef} className={classes.webcam} />
      <canvas ref={canvasRef} className={classes.webcam} />
    </React.Fragment>
  );
}
