// components/ScreeningRequest/ScreeningRequestList.tsx
import React from 'react';
import { ScreeningRequest } from '../../../store/useScreeningRequestStore';

interface ScreeningRequestListProps {
  requests: ScreeningRequest[];
  successMessage: string | null;
  onDismissMessage: () => void;
  onCreateRequest: () => void;
  onViewRequest: (request: ScreeningRequest) => void;
}

const ScreeningRequestList: React.FC<ScreeningRequestListProps> = ({
  requests,
  successMessage,
  onDismissMessage,
  onCreateRequest,
  onViewRequest
}) => {
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Screening Requests</h1>
        <button
          onClick={onCreateRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Request
        </button>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{successMessage}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={onDismissMessage}
          >
            <svg className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      )}
      
      {/* Requests */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">{request.id}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                {request.status.replace('_', ' ')}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
              
              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                <div>
                  <span className="font-medium">Created:</span> {request.createdAt}
                </div>
                <div>
                  <span className="font-medium">Attributes:</span> {Object.keys(request.attributes).length}
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
            <p className="text-gray-500">No screening requests found. Click "Create Request" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningRequestList;