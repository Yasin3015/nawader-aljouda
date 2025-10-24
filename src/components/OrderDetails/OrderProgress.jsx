import React from 'react';
import { Check } from 'lucide-react';

const OrderProgress = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, label: 'Order received' },
    { id: 2, label: 'Processing' },
    { id: 3, label: 'On the way' },
    { id: 4, label: 'Delivered' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId <= currentStep) return 'completed';
    return 'pending';
  };

  return (
    <div className="py-3">
      <div className="py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      status === 'completed'
                        ? 'bg-green-500 border-2 border-green-500'
                        : 'bg-white border-2 border-dashed border-gray-300'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    ) : (
                      <span className="text-sm font-semibold text-gray-400">
                        {step.id.toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs mt-3 whitespace-nowrap ${
                    status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {step.label}
                  </span>
                </div>
                
                {/* Connecting Line */}
                {!isLast && (
                  <div className="flex-1 -mt-8 relative" style={{ marginLeft: '-6px', marginRight: '-6px' }}>
                    {step.id < currentStep ? (
                      // Fully completed line
                      <div className="h-1 bg-green-500" />
                    ) : step.id === currentStep ? (
                      // Half completed line (current step)
                      <div className="h-1 relative">
                        <div className="absolute inset-0 border-t-2 border-dashed border-gray-300" />
                        <div className="absolute top-0 left-0 h-1 bg-green-500" style={{ width: '50%' }} />
                      </div>
                    ) : (
                      // Not started line
                      <div className="h-1 border-t-2 border-dashed border-gray-300" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;