// components/LeadGeneration/SuccessMessage.tsx
import React from 'react';

interface SuccessMessageProps {
  message: string;
  onDismiss: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative flex items-center">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{message}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={onDismiss}
      >
        <svg className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
};

export default SuccessMessage;