import { Camera } from "@mediapipe/camera_utils/camera_utils";
import { Objectron, mpObjectron } from "@mediapipe/objectron/objectron";
import { drawingUtils } from "@mediapipe/drawing_utils/drawing_utils";

export default function ccc(webcamRef, canvasRef) {
  const objectron = new Objectron({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`;
    },
  });
  objectron.setOptions({
    modelName: "Chair",
    maxNumObjects: 3,
  });
  objectron.onResults((results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.objectDetections) {
      for (const detectedObject of results.objectDetections) {
        // Reformat keypoint information as landmarks, for easy drawing.
        const landmarks = detectedObject.keypoints.map((x) => x.point2d);
        // Draw bounding box.
        drawingUtils.drawConnectors(
          canvasCtx,
          landmarks,
          mpObjectron.BOX_CONNECTIONS,
          { color: "#FF0000" }
        );
        // Draw centroid.
        drawingUtils.drawLandmarks(canvasCtx, [landmarks[0]], {
          color: "#FFFFFF",
        });
      }
    }
    canvasCtx.restore();
  });

  const camera = new Camera(webcamRef.current.video, {
    onFrame: async () => {
      await objectron.send({ image: webcamRef.current.video });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
}
