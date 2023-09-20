import React, { useState } from 'react';

function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(1); // Initialize the current step

  // Define the total number of steps
  const totalSteps = 5; // Change this to match your desired number of steps

  // Function to handle the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="progress-bar-o">
      <div className="steps-o">
        {/* Render step buttons */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`step-o ${currentStep === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            Step {index + 1}
          </div>
        ))}
      </div>

      <div className="progress-o">
        {/* Render the progress bar */}
        <div
          className="progress-fill-o"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
