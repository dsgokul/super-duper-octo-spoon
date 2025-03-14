// components/ScreeningRequest/CombinedScreeningForm.tsx
import React, { useState, useEffect } from 'react';
import AttributesTable from './AttributesTable';
import { useScreeningRequestStore } from '../../../store/useScreeningRequestStore';

interface CombinedScreeningFormProps {
  // Initial form fields
  title: string | undefined;
  description: string | undefined;
  purpose: string | undefined;
  
  // Tab data
  attributes: Record<string, string>;
  quantitativeScreening: {
    metrics: string[];
    thresholds: string[];
  };
  qualitativeScreening: {
    criteria: string[];
    evaluation: string[];
  };
  assignment: {
    shortlistingProcess: string[];
    timeline: string;
  };
  
  // Event handlers
  onUpdateField: (field: string, value: string) => void;
  onAddAttribute: (key: string, value: string) => void;
  onRemoveAttribute: (key: string) => void;
  onUpdateQuantitative: (field: string, value: string[]) => void;
  onUpdateQualitative: (field: string, value: string[]) => void;
  onUpdateAssignment: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CombinedScreeningForm: React.FC<CombinedScreeningFormProps> = ({
  // Initial form fields
  title,
  description,
  purpose,
  
  // Tab data
  attributes,
 // quantitativeScreening,
  qualitativeScreening,
//  assignment,
  
  // Event handlers
  onUpdateField,
  onAddAttribute,
  onRemoveAttribute,
 // onUpdateQuantitative,
  onUpdateQualitative,
 // onUpdateAssignment,
 // onSubmit,
  onCancel
}) => {
  // Get current tab from the store
  const { currentTab, setCurrentTab } = useScreeningRequestStore();
  
  const [newAttributeKey, setNewAttributeKey] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');
  
  // Auto-generate criteria based on attributes
  useEffect(() => {
    // Only generate suggestions if no criteria exist yet and we have attributes
    if (Object.keys(attributes).length > 0 && 
        qualitativeScreening.criteria.length === 0 &&
        currentTab === 'contextual-screening') {
      
      // Use a local variable for suggestions rather than immediately updating state
      const suggestedCriteria = ['Communication skills'];
      
      // Add technical skills based on attributes
      const technicalSkills = Object.keys(attributes).find(key => 
        key.toLowerCase().includes('skill') || key.toLowerCase().includes('expertise')
      );
      
      if (technicalSkills) {
        suggestedCriteria.push('Depth of technical knowledge in ' + attributes[technicalSkills]);
        suggestedCriteria.push('Ability to explain complex concepts');
      }
      
      // Generate evaluation methods
      const evaluationMethods = [
        'Based on sample videos or interviews',
        'Technical assessment through problem-solving',
        'Demo session evaluation'
      ];
      
      // Use a timeout to prevent the infinite loop
      const timer = setTimeout(() => {
        onUpdateQualitative('criteria', suggestedCriteria);
        onUpdateQualitative('evaluation', evaluationMethods);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [attributes, currentTab]); // Remove qualitativeScreening.criteria and onUpdateQualitative from dependencies
  
  // Handler for adding a new attribute
  const handleAddAttribute = () => {
    if (newAttributeKey && newAttributeValue) {
      onAddAttribute(newAttributeKey, newAttributeValue);
      setNewAttributeKey('');
      setNewAttributeValue('');
    }
  };
  
  // Handlers for updating arrays of strings
  const handleUpdateCriteria = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const criteria = e.target.value.split('\n').filter(line => line.trim());
    onUpdateQualitative('criteria', criteria);
  };
  
  const handleUpdateEvaluation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const evaluation = e.target.value.split('\n').filter(line => line.trim());
    onUpdateQualitative('evaluation', evaluation);
  };
  
  const renderQuantitativeTab = () => (
    <div>
      {/* Attributes Table */}
      <div className="mb-6">
        <AttributesTable 
          attributes={attributes}
          onRemoveAttribute={onRemoveAttribute}
        />
        
        {/* Add New Attribute */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-5">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Attribute"
              value={newAttributeKey}
              onChange={(e) => setNewAttributeKey(e.target.value)}
            />
          </div>
          <div className="md:col-span-5">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Value"
              value={newAttributeValue}
              onChange={(e) => setNewAttributeValue(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleAddAttribute}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
      
      {/* Next button */}
      <div className="flex space-x-3 mt-8">
        <button
          type="button"
          onClick={() => setCurrentTab('contextual-screening')}
          disabled={Object.keys(attributes).length === 0}
          className={`${
            Object.keys(attributes).length === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-6 rounded-lg`}
        >
          Next
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 py-2 px-6 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  
  const renderQualitativeTab = () => (
    <div>
      {Object.keys(attributes).length > 0 ? (
        <div>
          <div className="mb-6">
            <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 mb-2">
              Criteria
            </label>
            <textarea
              id="criteria"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter each criterion on a new line"
              value={qualitativeScreening.criteria.join('\n')}
              onChange={handleUpdateCriteria}
            />
            <p className="text-xs text-gray-500 mt-1">
              Criteria will be used to evaluate trainers during the screening process.
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="evaluation" className="block text-sm font-medium text-gray-700 mb-2">
              Evaluation Method
            </label>
            <textarea
              id="evaluation"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter each evaluation method on a new line"
              value={qualitativeScreening.evaluation.join('\n')}
              onChange={handleUpdateEvaluation}
            />
            <p className="text-xs text-gray-500 mt-1">
              Methods used to evaluate each criterion.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-500">
            Please add attributes in the Quantitative Screening tab before proceeding.
          </p>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex space-x-3 mt-8">
        <button
          type="button"
          onClick={() => setCurrentTab('assignment')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('metrics-screening')}
          className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 py-2 px-6 rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
  
  const renderAssignmentTab = () => (
    <div className=' mx-auto'>
      {/* Purpose section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Purpose</h3>
        <p className="text-sm text-gray-700 mb-4">
          This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers for potential future training engagements. We are seeking to develop a robust database of trainers with diverse expertise to meet our evolving training needs.
        </p>
      </div>
      
      {/* Form layout with grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Request Type</h3>
          <div className="relative">
            <select 
              className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
            >
              <option>Select Team Member</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned To</h3>
          <div className="relative">
            <select 
              className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
            >
              <option>Admin User</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned By</h3>
          <div className="relative">
            <select 
              className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
            >
              <option>Admin User</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Date</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
   
      
      {/* Shortlisting Process section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Shortlisting Process:</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-2 text-sm text-gray-700">
          <li>Review each trainer lead against the defined attributes and criteria.</li>
          <li>Capture the results of the evaluation for each attribute.</li>
          <li>Filter out trainers who do not meet the minimum threshold for all or key attributes.</li>
          <li>Create a shortlist of trainers who meet the defined criteria.</li>
        </ol>
      </div>
      
      {/* Timeline section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Timeline:</h3>
        <p className="text-sm text-gray-700">To be determined</p>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-3 mt-8">
        <button
          type="button"
          onClick={() => window.location.href = '/screening-request'}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Submit Requisition
        </button>
        <button
          type="button"
          className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 py-2 px-6 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Screening Request</h1>
      
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
            placeholder="This request is to initiate a screening campaign to identify qualified trainers for potential future training engagements."
            value={description || ''}
            onChange={(e) => onUpdateField('description', e.target.value)}
            required
          />
        </div>
      </div>
      
      {/* Purpose - Shown before tabs */}
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
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              currentTab === 'metrics-screening'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setCurrentTab('metrics-screening')}
          >
            Metrics screening
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              currentTab === 'contextual-screening'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setCurrentTab('contextual-screening')}
          >
         Contextual screening 
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              currentTab === 'assignment'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setCurrentTab('assignment')}
          >
            Assignment
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mb-6">
        {currentTab === 'metrics-screening' && renderQuantitativeTab()}
        {currentTab === 'contextual-screening' && renderQualitativeTab()}
        {currentTab === 'assignment' && renderAssignmentTab()}
      </div>
    </div>
  );
};

export default CombinedScreeningForm;