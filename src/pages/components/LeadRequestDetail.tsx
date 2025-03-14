// components/LeadGeneration/LeadRequestDetail.tsx
import React, { useState } from 'react';
import { LeadRequest } from '../../store/useLeadGenerationStore';

interface LeadRequestDetailProps {
  request: LeadRequest;
  onBackToList: () => void;
}

const LeadRequestDetail: React.FC<LeadRequestDetailProps> = ({ 
  request, 
  onBackToList 
}) => {
  const [activeTab, setActiveTab] = useState('target-attributes');

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Lead Generation Request</h1>
        
        {/* Title and Description */}
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{request.title}</h2>
        <p className="text-gray-600 mt-1">{request.description}</p>
      </div>
      
      {/* Request Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-50 p-4 rounded-md">
        <div>
          <div className="text-sm text-gray-500">REQUEST ID</div>
          <div className="font-medium">{request.id}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">STATUS</div>
          <div className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-md">INPROGRESS</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">CREATED ON</div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{formatDate(request.date)}</span>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">ASSIGNED TO</div>
          <div className="font-medium">{request.assignTo}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">ASSIGNED BY</div>
          <div className="font-medium">{request.assignedBy}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">DEADLINE</div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>December 31, 2024</span>
          </div>
        </div>
      </div>
      
      {/* Purpose */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Purpose</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700">{request.purpose}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'target-attributes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('target-attributes')}
          >
            Target Attributes
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'information-collect'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('information-collect')}
          >
            Information to collect
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'additional-details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('additional-details')}
          >
            Additional details
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'upload-lead'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('upload-lead')}
          >
            Upload Leads
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 'target-attributes' && (
          <div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/3">Attribute</th>
                    <th scope="col" className="px-6 py-3 w-2/3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(request.targetAttributes || {}).map(([key, value], index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {key}
                      </td>
                      <td className="px-6 py-3">
                        {value}
                      </td>
                    </tr>
                  ))}
                  {Object.keys(request.targetAttributes || {}).length === 0 && (
                    <tr className="border-b">
                      <td colSpan={2} className="px-6 py-3 text-center text-gray-500 italic">
                        No attributes have been defined.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'information-collect' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Lead Generation Objectives</h3>
              {request.information?.objectives && request.information.objectives.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-md">
                  {request.information.objectives.map((objective, index) => (
                    <li key={index} className="text-gray-700">{objective}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic bg-gray-50 p-4 rounded-md">No objectives have been defined.</p>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Strategies/Instructions</h3>
              {request.information?.strategies && request.information.strategies.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-md">
                  {request.information.strategies.map((strategy, index) => (
                    <li key={index} className="text-gray-700">{strategy}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic bg-gray-50 p-4 rounded-md">No strategies have been defined.</p>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Notes</h3>
              {request.information?.notes && request.information.notes.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded-md">
                  {request.information.notes.map((note, index) => (
                    <li key={index} className="text-gray-700">{note}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic bg-gray-50 p-4 rounded-md">No additional notes have been added.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'additional-details' && (
          <div>
            {request.additionalDetails?.uploadedFile ? (
              <div className="bg-gray-50 p-4 rounded-md flex items-center">
                <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="text-gray-700">{request.additionalDetails.uploadedFile}</span>
                <a href="#download" className="ml-auto text-blue-600 hover:text-blue-800 text-sm">Download</a>
              </div>
            ) : (
              <p className="text-gray-500 italic bg-gray-50 p-4 rounded-md">No files have been uploaded.</p>
            )}
          </div>
        )}
        
        {activeTab === 'upload-lead' && (
          <div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <button 
                  type="button"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Upload Lead Data
                </button>
                <p className="mt-1 text-xs text-gray-500">Supported formats: Excel, CSV</p>
                <p className="mt-1 text-xs text-gray-500">Maximum Size: 10MB</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Back Button */}
      <div>
        <button
          onClick={onBackToList}
          className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LeadRequestDetail;