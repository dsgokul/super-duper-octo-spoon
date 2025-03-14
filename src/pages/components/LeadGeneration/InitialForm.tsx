// components/LeadGeneration/InitialForm.tsx
import React from 'react';

interface InitialFormProps {
  title: string | undefined;
  description: string | undefined;
  assignTo: string | undefined;
  assignedBy: string | undefined;
  date: string | undefined;
  purpose: string | undefined;
  onUpdateField: (field: string, value: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

const InitialForm: React.FC<InitialFormProps> = ({
  title,
  description,
  assignTo,
  assignedBy,
  date,
  purpose,
  onUpdateField,
  onNext,
  onCancel
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Lead Generation Request</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Request Title */}
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
        
        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description for the Request
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers for potential future training engagements."
            value={description || ''}
            onChange={(e) => onUpdateField('description', e.target.value)}
            required
          />
        </div>
        
        {/* Assign To and Assigned By */}
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
                <option value="John Doe">John Doe</option>
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
        
        {/* Date */}
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
        
        {/* Purpose */}
        <div className="mb-6">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
            Purpose
          </label>
          <textarea
            id="purpose"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers..."
            value={purpose || ''}
            onChange={(e) => onUpdateField('purpose', e.target.value)}
            required
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
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
      </form>
    </div>
  );
};

export default InitialForm;