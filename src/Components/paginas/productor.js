import React from 'react';
import Stepper from 'react-stepper-horizontal'; // Import Stepper from react-stepper-horizontal

const stages = [
  'Start',
  'Verification',
  'Processing',
  'Completion',
  'Completed'
];

const Producer = () => {
  // Set the current stage index to 2 to mark up to the third option
  const stageIndex = 2;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">CHANGE TRANSACTION</h1>
      <Stepper
        steps={stages.map(stage => ({ title: stage }))}
        activeStep={stageIndex} // Index 2 will mark up to step 3
      />
      <div className="mt-4">
        <h3>Transaction Status</h3>
        <p>Current status: {stages[stageIndex]}</p> {/* Displays the current status */}
      </div>
    </div>
  );
}

export default Producer;
