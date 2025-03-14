// components/LeadGeneration/RequestList.tsx
import React from 'react';
import { LeadRequest } from '../../../store/useLeadGenerationStore';
import SuccessMessage from './Successmessage';

interface RequestListProps {
  requests: LeadRequest[];
  successMessage: string | null;
  onDismissMessage: () => void;
  onNewRequest: () => void;
  onViewRequest: (request: LeadRequest) => void;
}

const RequestList: React.FC<RequestListProps> = ({ 
  requests, 
  successMessage, 
  onDismissMessage, 
  onNewRequest,
  onViewRequest
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Lead Generation</h1>
        <button
          onClick={onNewRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Generate Leads
        </button>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <SuccessMessage message={successMessage} onDismiss={onDismissMessage} />
      )}
      
      {/* Requests */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 uppercase">{request.id}</h3>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{request.description}</p>
              
              {/* Display assignee and date */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                <div>
                  <span className="font-medium">Assigned to:</span> {request.assignTo}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {request.date}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end mt-2">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => onViewRequest(request)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {requests.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="text-gray-500">No requests found. Click "Generate Leads" to create your first request.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestList;