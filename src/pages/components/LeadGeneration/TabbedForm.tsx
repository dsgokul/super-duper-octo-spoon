// components/LeadGeneration/TabbedForm.tsx
import React, { useState } from 'react';
import TargetAttributes from './TargetAttributes';
import InformationTab from './InformationTab';
import AdditionalDetails from './AdditionalDetails';

interface TabbedFormProps {
  targetAttributes: Record<string, string>;
  information: {
    objectives: string[];
    strategies: string[];
    notes: string[];
  };
  additionalDetails: {
    uploadedFile?: string;
  };
  onAddAttribute: (key: string, value: string) => void;
  onRemoveAttribute: (key: string) => void;
  onUpdateInformation: (field: string, value: string[]) => void;
  onFileUpload: (file: File) => void;
  onNext: () => void;
  onCancel: () => void;
}

const TabbedForm: React.FC<TabbedFormProps> = ({
  targetAttributes,
  information,
  additionalDetails,
  onAddAttribute,
  onRemoveAttribute,
  onUpdateInformation,
  onFileUpload,
  onNext,
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

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Lead Generation Request</h1>
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
            onNext={onNext}
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
            editable={true}
            onNext={onNext}
          />
        )}
        {activeTab === 'additional-details' && (
          <AdditionalDetails
            uploadedFile={additionalDetails.uploadedFile}
            onFileUpload={onFileUpload}
          />
        )}
      </div>
      
      {/* Form Actions */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
        >
          Submit Request
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
};

export default TabbedForm;