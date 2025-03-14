import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrainerStore } from "../../../store/useTrainerStore";

// Same interface, unchanged
interface Trainer {
  trainerID: number;
  name: string;
  skill: string;
  tool: string;
  technology: string;
  city: string;
  state: string;
  country: string;
  source: string;
  prequalified: string;
  trainerType: string;
  ratings: number;
}

interface FilterState {
  skill: string;
  tool: string;
  technology: string;
  location: string;
}

const ShortlistedTrainers: React.FC = () => {
  const navigate = useNavigate();
  const { shortlistedTrainers } = useTrainerStore();
  
  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    skill: "",
    tool: "",
    technology: "",
    location: ""
  });
  
  // State for filtered trainers
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>(shortlistedTrainers);
  
  // State for filter visibility
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique values for each filterable field
  const getUniqueValues = (field: keyof Trainer | 'location') => {
    if (field === 'location') {
      return Array.from(new Set(shortlistedTrainers.map(
        trainer => `${trainer.city}, ${trainer.state}, ${trainer.country}`
      ))).sort();
    }
    return Array.from(new Set(shortlistedTrainers.map(
      trainer => trainer[field as keyof Trainer]
    ))).sort();
  };
  
  // Handle filter changes
  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      skill: "",
      tool: "",
      technology: "",
      location: ""
    });
  };
  
  // Apply filters whenever they change
  useEffect(() => {
    let result = [...shortlistedTrainers];
    
    // Apply skill filter
    if (filters.skill) {
      result = result.filter(trainer => 
        trainer.skill.toLowerCase().includes(filters.skill.toLowerCase())
      );
    }
    
    // Apply tool filter
    if (filters.tool) {
      result = result.filter(trainer => 
        trainer.tool.toLowerCase().includes(filters.tool.toLowerCase())
      );
    }
    
    // Apply technology filter
    if (filters.technology) {
      result = result.filter(trainer => 
        trainer.technology.toLowerCase().includes(filters.technology.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(trainer => {
        const trainerLocation = `${trainer.city}, ${trainer.state}, ${trainer.country}`;
        return trainerLocation.toLowerCase().includes(filters.location.toLowerCase());
      });
    }
    
    setFilteredTrainers(result);
  }, [filters, shortlistedTrainers]);

  // Navigate handler (unchanged)
  const handleViewRfiq = (trainer: Trainer) => {
    navigate(`/rfiq/${trainer.name}`);
  };

  return (
    <div className="p-6">
      {/* Header: Title + "Add Filters" */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Shortlisted Trainers
        </h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      
      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Skill Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill
              </label>
              <select 
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.skill}
                onChange={(e) => handleFilterChange('skill', e.target.value)}
              >
                <option value="">All Skills</option>
                {getUniqueValues('skill').map((skill, idx) => (
                  <option key={idx} value={skill as string}>
                    {skill as string}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Tool Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tool
              </label>
              <select 
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.tool}
                onChange={(e) => handleFilterChange('tool', e.target.value)}
              >
                <option value="">All Tools</option>
                {getUniqueValues('tool').map((tool, idx) => (
                  <option key={idx} value={tool as string}>
                    {tool as string}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technology
              </label>
              <select 
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.technology}
                onChange={(e) => handleFilterChange('technology', e.target.value)}
              >
                <option value="">All Technologies</option>
                {getUniqueValues('technology').map((tech, idx) => (
                  <option key={idx} value={tech as string}>
                    {tech as string}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select 
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {getUniqueValues('location').map((location, idx) => (
                  <option key={idx} value={location as string}>
                    {location as string}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTrainers.length} of {shortlistedTrainers.length} trainers
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Skill
                {filters.skill && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Filtered
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Tool
                {filters.tool && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Filtered
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Technology
                {filters.technology && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Filtered
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Location
                {filters.location && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Filtered
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer: Trainer) => (
                <tr key={trainer.trainerID} className="hover:bg-gray-50">
                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trainer.name}
                  </td>
                  {/* Skill */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trainer.skill}
                  </td>
                  {/* Tool */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trainer.tool}
                  </td>
                  {/* Technology */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trainer.technology}
                  </td>
                  {/* Location */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {trainer.city}, {trainer.state}, {trainer.country}
                  </td>
                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewRfiq(trainer)}
                    >
                      View RFIQ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                  No trainers match the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom row: "SEND RFQ to all" button */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          {filteredTrainers.length > 0 && showFilters ? 
            `${filteredTrainers.length} trainer${filteredTrainers.length === 1 ? '' : 's'} selected` : ''}
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          disabled={filteredTrainers.length === 0}
        >
          SEND RFQ to {filteredTrainers.length > 0 ? 'selected' : 'all'}
        </button>
      </div>
    </div>
  );
};

export default ShortlistedTrainers;