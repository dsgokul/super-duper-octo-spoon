// components/LeadGeneration/CombinedForm.tsx
import React, { useState } from 'react';
import TargetAttributes from './TargetAttributes';
import InformationTab from './InformationTab';
import AdditionalDetails from './AdditionalDetails';

interface CombinedFormProps {
  // Initial form fields
  title: string | undefined;
  description: string | undefined;
  assignTo: string | undefined;
  assignedBy: string | undefined;
  date: string | undefined;
  purpose: string | undefined;
  
  // Tab fields
  targetAttributes: Record<string, string>;
  information: {
    objectives: string[];
    strategies: string[];
    notes: string[];
  };
  additionalDetails: {
    uploadedFile?: string;
  };
  
  // Event handlers
  onUpdateField: (field: string, value: string) => void;
  onAddAttribute: (key: string, value: string) => void;
  onRemoveAttribute: (key: string) => void;
  onUpdateInformation: (field: string, value: string[]) => void;
  onFileUpload: (file: File) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CombinedForm: React.FC<CombinedFormProps> = ({
  // Initial form fields
  title,
  description,
  assignTo,
  assignedBy,
  date,
  purpose,
  
  // Tab fields
  targetAttributes,
  information,
  additionalDetails,
  
  // Event handlers
  onUpdateField,
  onAddAttribute,
  onRemoveAttribute,
  onUpdateInformation,
  onFileUpload,
  onSubmit,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('target-attributes');
  
  const handleUpdateObjectives = (objectives: string[]) => {
    onUpdateInformation('objectives', objectives);
  };

  const handleUpdateStrategies = (strategies: string[]) => {
    onUpdateInformation('strategies', strategies);
  };

  const handleUpdateNotes = (notes: string[]) => {
    onUpdateInformation('notes', notes);
  };

  // Handle tab switching
  const handleNextTab = () => {
    switch (activeTab) {
      case 'target-attributes':
        setActiveTab('information-collect');
        break;
      case 'information-collect':
        setActiveTab('additional-details');
        break;
      case 'additional-details':
        onSubmit(); // Submit form on last tab
        break;
    }
  };
  
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trainer Lead Generation Request</h1>
      
      {/* Top section - Initial form fields */}
      <div className="mb-8 border-b pb-6">
        <div className="mb-6">
          <label htmlFor="requestTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Request Title
          </label>
          <input
            type="text"
            id="requestTitle"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="AI & ML Trainer Outreach"
            value={title || ''}
            onChange={(e) => onUpdateField('title', e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description for the Request
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers for potential future training engagements."
            value={description || ''}
            onChange={(e) => onUpdateField('description', e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700 mb-2">
              Assign To
            </label>
            <div className="relative">
              <select
                id="assignTo"
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={assignTo || ''}
                onChange={(e) => onUpdateField('assignTo', e.target.value)}
                required
              >
                <option value="">Select Team Member</option>
                <option value="John Smith">John Smith</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="assignedBy" className="block text-sm font-medium text-gray-700 mb-2">
              Assigned By
            </label>
            <div className="relative">
              <select
                id="assignedBy"
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={assignedBy || 'Admin User'}
                onChange={(e) => onUpdateField('assignedBy', e.target.value)}
              >
                <option value="Admin User">Admin User</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={date || ''}
              onChange={(e) => onUpdateField('date', e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
            Purpose
          </label>
          <textarea
            id="purpose"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers..."
            value={purpose || ''}
            onChange={(e) => onUpdateField('purpose', e.target.value)}
            required
          />
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
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 'target-attributes' && (
          <TargetAttributes
            attributes={targetAttributes}
            onAddAttribute={onAddAttribute}
            onRemoveAttribute={onRemoveAttribute}
            onNext={handleNextTab}
          />
        )}
        {activeTab === 'information-collect' && (
          <InformationTab
            objectives={information.objectives}
            strategies={information.strategies}
            notes={information.notes}
            onUpdateObjectives={handleUpdateObjectives}
            onUpdateStrategies={handleUpdateStrategies}
            onUpdateNotes={handleUpdateNotes}
            onNext={handleNextTab}
            onAddAttribute={onAddAttribute}
            editable={true}
          />
        )}
        {activeTab === 'additional-details' && (
          <div>
            <AdditionalDetails
              uploadedFile={additionalDetails.uploadedFile}
              onFileUpload={onFileUpload}
            />
            
            {/* Submit and Cancel buttons in the Additional Details tab */}
            <div className="flex space-x-3 mt-8">
              <button
                type="button"
                onClick={onSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                Submit Request
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedForm;