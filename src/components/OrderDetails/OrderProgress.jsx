import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const OrderProgress = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('orderDetails.progress.orderReview') },
    { id: 2, label: t('orderDetails.progress.inProgress') },
    { id: 3, label: t('orderDetails.progress.onTheWay') },
    { id: 4, label: t('orderDetails.progress.delivered') }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (stepId, status) => {
    if (status === 'completed') {
      return <Check className="w-4 h-4 text-white" />;
    }
    return <span className="text-sm font-medium">{stepId.toString().padStart(2, '0')}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    status === 'completed' || status === 'current'
                      ? 'bg-green-600'
                      : 'bg-gray-200 border-2 border-dashed border-gray-300'
                  }`}
                >
                  {getStepIcon(step.id, status)}
                </div>
                <span className={`text-sm mt-2 text-center ${
                  status === 'completed' || status === 'current'
                    ? 'text-gray-900'
                    : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {/* Connecting Line */}
              {!isLast && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step.id < currentStep
                    ? 'bg-green-600'
                    : 'bg-gray-200 border-t border-dashed border-gray-300'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgress;

