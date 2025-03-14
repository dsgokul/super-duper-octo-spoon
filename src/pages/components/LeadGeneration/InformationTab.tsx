// components/LeadGeneration/InformationTab.tsx
import React, { useState } from 'react';

interface InformationTabProps {
  objectives: string[];
  strategies: string[];
  notes: string[];
  onUpdateObjectives?: (objectives: string[]) => void;
  onUpdateStrategies?: (strategies: string[]) => void;
  onUpdateNotes?: (notes: string[]) => void;
  onNext: () => void;
  onAddAttribute?: (key: string, value: string) => void;
  editable?: boolean;
}

const InformationTab: React.FC<InformationTabProps> = ({
  objectives,
  strategies,
  notes,
/*   onUpdateObjectives,
  onUpdateStrategies,
  onUpdateNotes, */
  onNext,
  onAddAttribute,
  editable = false
}) => {
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');

  // Initial attributes data - changed to useState with setter
  const [attributes, setAttributes] = useState({
    'Industry Domain': 'Individual / Institutional / Corporate / Platform Trainers (Udemy)',
    'Size in case of institute': '30 trainers',
    'Region': 'Asia-Pacific (APAC)',
    'Domain focus': 'Single / Multiple',
    'Specialization': 'Niche / Commoditized',
    'Orientation': 'Domain Centric, Technology Centric, Process Centric',
    'Targeted Learner Fraternity': 'Corporate Employees / Students / Individual Professionals / All',
    'Source Link': ''
  });

/*   // Helper handlers for editable mode
  const handleObjectivesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUpdateObjectives) {
      const newObjectives = e.target.value.split('\n').filter(line => line.trim());
      onUpdateObjectives(newObjectives);
    }
  };

  const handleStrategiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUpdateStrategies) {
      const newStrategies = e.target.value.split('\n').filter(line => line.trim());
      onUpdateStrategies(newStrategies);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUpdateNotes) {
      const newNotes = e.target.value.split('\n').filter(line => line.trim());
      onUpdateNotes(newNotes);
    }
  }; */

  const handleAddAttribute = () => {
    if (newAttributeName && newAttributeValue) {
      // Update local state
      setAttributes(prev => ({
        ...prev,
        [newAttributeName]: newAttributeValue
      }));
      
      // Call parent callback if provided
      if (onAddAttribute) {
        onAddAttribute(newAttributeName, newAttributeValue);
      }
      
      // Reset input fields
      setNewAttributeName('');
      setNewAttributeValue('');
    }
  };

  return (
    <div>
      {/* Target Attributes Table */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 px-6 py-3 bg-gray-100">
            <div className="text-sm font-medium text-gray-700">Attribute</div>
            <div className="text-sm font-medium text-gray-700">Value</div>
          </div>
          
          {Object.entries(attributes).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-2 px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-700">{key}</div>
              <div className="text-sm text-gray-900">
                <input
                  type="text"
                  value={value}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2"
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Attribute Form */}
      <div className="grid grid-cols-12 gap-4 mb-8">
        <div className="col-span-5">
          <input
            type="text"
            placeholder="Attribute"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
          />
        </div>
        <div className="col-span-5">
          <input
            type="text"
            placeholder="Value"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button
            onClick={handleAddAttribute}
            disabled={!newAttributeName || !newAttributeValue}
            className="w-full h-full bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span className="mr-1">+</span>
            Add
          </button>
        </div>
      </div>

      {editable ? (
      null
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lead Generation Objectives</h3>
            {objectives.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No objectives have been defined.</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Strategies/Instructions</h3>
            {strategies.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {strategies.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No strategies have been defined.</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Notes</h3>
            {notes.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No additional notes have been added.</p>
            )}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-start mt-6">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InformationTab;