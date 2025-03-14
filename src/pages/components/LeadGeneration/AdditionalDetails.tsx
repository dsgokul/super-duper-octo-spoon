// components/LeadGeneration/AdditionalDetails.tsx
import React from 'react';

interface AdditionalDetailsProps {
  uploadedFile?: string;
  onFileUpload: (file: File) => void;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  uploadedFile,
  onFileUpload
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Lead Generation Objectives */}
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-3">Lead Generation Objectives</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Build a database of 500 potential trainers.</li>
          <li>Gather information on trainer qualifications, expertise, and availability.</li>
          <li>Identify trainers with specific skill sets aligned with our anticipated training needs.</li>
        </ul>
      </div>

      {/* Strategies/Instructions */}
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-3">Strategies/Instructions</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Try to source from the corporate trainers' communities.</li>
          <li>Potential channels – Source from LinkedIn and other trainer communities.</li>
          <li>Both individuals and institutes are okay.</li>
          <li>Check for high-level credibility of the trainer before including them in the leads.</li>
        </ul>
      </div>

      {/* Additional Notes */}
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-3">Additional Notes</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Please ensure that all lead generation activities comply with relevant data privacy regulations.</li>
          <li>These leads are for a role-specific training, so Automotive Domain knowledge is important for the trainers to have.</li>
        </ul>
      </div>

      {/* Upload Template */}
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-3">Upload Template</h3>
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <div className="text-center">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
              />
              <button
                type="button"
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Upload a File
              </button>
            </div>
            {uploadedFile && (
              <div className="mt-3 text-sm text-green-600">
                {uploadedFile}
              </div>
            )}
            <div className="mt-2 text-xs text-gray-500">
              <div>Supported formats: Excel, CSV</div>
              <div>Maximum Size: 10MB</div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default AdditionalDetails;