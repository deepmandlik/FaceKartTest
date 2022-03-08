import React from "react";
import FaceLandmarkDetection from "./components/features/faceLandmarkDetection";
import HandShapeDetection from "./components/features/handShapeDetection";
import SelfieSegmentationDetection from "./components/features/selfieSegmentation";

function App() {
  
  return (
    <center>
      <div className="App">
        {/* <FaceLandmarkDetection /> */}
        {/* <SelfieSegmentationDetection /> */}
        <HandShapeDetection />
      </div>
    </center>
  );
}

export default App;
