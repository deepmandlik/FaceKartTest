// import React, { useRef, useEffect } from "react";
import {
  Holistic,
  POSE_CONNECTIONS,
  HAND_CONNECTIONS,
  FACEMESH_TESSELATION
} from "@mediapipe/holistic/holistic";
import { Camera } from "@mediapipe/camera_utils/camera_utils";
import Webcam from "react-webcam";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils/drawing_utils";
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh } from "@mediapipe/face_mesh";

export default function  zzz(webcamRef, canvasRef){
  const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  }});
  holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  holistic.onResults((results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");


    canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.drawImage(results.segmentationMask, 0, 0,
  //                     canvasElement.width, canvasElement.height);

  // // Only overwrite existing pixels.
  // canvasCtx.globalCompositeOperation = 'source-in';
  // canvasCtx.fillStyle = '#00FF00';
  // canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // // Only overwrite missing pixels.
  // canvasCtx.globalCompositeOperation = 'destination-atop';
  // canvasCtx.drawImage(
  //     results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
                 {color: '#C0C0C070', lineWidth: 1});
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                 {color: '#CC0000', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
                {color: '#00FF00', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                 {color: '#00CC00', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  });
  
  const camera = new Camera( webcamRef.current.video, {
    onFrame: async () => {
      await holistic.send({image:  webcamRef.current.video});
    },
    width: 1280,
    height: 720
  });
  camera.start();
  

};



