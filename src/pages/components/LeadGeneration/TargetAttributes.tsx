// components/LeadGeneration/TargetAttributes.tsx
import React, { useState } from 'react';

interface TargetAttributesProps {
  attributes: Record<string, string>; 
  onAddAttribute: (key: string, value: string) => void;
  onRemoveAttribute: (key: string) => void;
  onNext: () => void;
}

const TargetAttributes: React.FC<TargetAttributesProps> = ({
  attributes,
  onAddAttribute,
  onRemoveAttribute,
  onNext
}) => {
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');

  // Sample initial data
  const initialAttributes = {
    'Industry Domain': 'Data science, ML, MLOps, DevOps, Embedded programming, Model-based design and development, Testing and validation',
    'Tools Specialization': 'Simulink, Vector, IPG Car Maker',
    'Technology Specialization': 'Sensor fusion, IoT and Edge, Cloud, C, C++, Python, Deep Learning, ML, Automotive OS, DevOps',
    'Country': 'India',
    'Channels': 'YouTube, LinkedIn, etc.',
    'Target Learner': 'Student'
  };

  const handleAddAttribute = () => {
    if (newAttributeName && newAttributeValue) {
      onAddAttribute(newAttributeName, newAttributeValue);
      setNewAttributeName('');
      setNewAttributeValue('');
    }
  };

  return (
    <div className="mx-auto">
      {/* Attributes Table */}
      <div className="mb-6">
        <div className="  mb-4 rounded-lg">
          <div className="grid grid-cols-2 px-6 py-3 mb-4 bg-[#E2EBF3]  rounded-t-lg">
            <div className="text-sm font-medium text-[#00213D]">Attribute</div>
            <div className="text-sm font-medium text-[#00213D]">Value</div>
          </div>
          
          {Object.entries({ ...initialAttributes, ...attributes }).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-2 px-6 py-4 border-t border-gray-200 hover:bg-gray-50">
              <div className="text-sm text-gray-900">{key}</div>
              <div className="text-sm text-gray-900 flex justify-between items-center">
                {value}
                <button
                  onClick={() => onRemoveAttribute(key)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Attribute Form */}
      <div className="grid grid-cols-12 gap-4 mb-6">
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

      {/* Next Button */}
      <div className="flex justify-start">
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

export default TargetAttributes;