// components/ScreeningRequest/AttributesTable.tsx
import React from 'react';

interface AttributesTableProps {
  attributes: Record<string, string>;
  onRemoveAttribute: (key: string) => void;
}

const AttributesTable: React.FC<AttributesTableProps> = ({ attributes, onRemoveAttribute }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/3">Attribute</th>
            <th scope="col" className="px-6 py-3 w-2/3">Value</th>
            <th scope="col" className="px-6 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attributes).map(([key, value], index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-3 font-medium text-gray-900">
                {key}
              </td>
              <td className="px-6 py-3">
                {value}
              </td>
              <td className="px-6 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onRemoveAttribute(key)}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
          {Object.keys(attributes).length === 0 && (
            <tr className="border-b">
              <td colSpan={3} className="px-6 py-3 text-center text-gray-500 italic">
                No attributes added yet. Use the form below to add attributes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttributesTable;