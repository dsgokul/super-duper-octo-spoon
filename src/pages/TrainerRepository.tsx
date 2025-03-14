// pages/TrainerRepository.tsx
import { useState, useEffect, useRef } from 'react';
import { useTrainerStore } from '../store/useTrainerStore';
import { Trainer } from '../types/TrainerTypes';

const TrainerRepository = () => {
  // Get trainers from Zustand store
  const { trainers } = useTrainerStore();
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for tracking selected trainers
  const [selectedTrainers, setSelectedTrainers] = useState<number[]>([]);
  
  // State for filters
  const [filters, setFilters] = useState({
    name: [] as string[],
    prequalified: [] as string[],
    skill: [] as string[],
    tool: [] as string[],
    technology: [] as string[]
  });
  
  // Add new state for managing dropdown visibility
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to toggle a filter value
  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => {
      if (prev[filterType].includes(value)) {
        return {
          ...prev,
          [filterType]: prev[filterType].filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...prev[filterType], value]
        };
      }
    });
  };
  
  // Function to check if a trainer matches the filters
  const matchesFilters = (trainer: Trainer) => {
    // If no filters are set for a category, it automatically passes
    const nameMatch = filters.name.length === 0 || filters.name.includes(trainer.name);
    const prequalifiedMatch = filters.prequalified.length === 0 || filters.prequalified.includes(trainer.prequalified);
    const skillMatch = filters.skill.length === 0 || filters.skill.includes(trainer.skill);
    const toolMatch = filters.tool.length === 0 || filters.tool.includes(trainer.tool);
    const technologyMatch = filters.technology.length === 0 || filters.technology.includes(trainer.technology);
    
    return nameMatch && prequalifiedMatch && skillMatch && toolMatch && technologyMatch;
  };

  // Filtered trainers based on search query and filters
  const filteredTrainers = trainers.filter((trainer: Trainer) => {
    // Search filter
    const matchesSearch = 
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply both search and column filters
    return matchesSearch && matchesFilters(trainer);
  });

  // Function to generate email from name (since it's not in the store)
  const generateEmail = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
  };
  
  // Function to handle row selection
  const toggleSelectTrainer = (trainerId: number) => {
    setSelectedTrainers(prev => {
      if (prev.includes(trainerId)) {
        return prev.filter(id => id !== trainerId);
      } else {
        return [...prev, trainerId];
      }
    });
  };
  
  // Function to handle initiating screening
  const initiateScreening = () => {
    console.log("Initiating screening for trainers:", selectedTrainers);
    // Add your screening logic here
    alert(`Initiating screening for ${selectedTrainers.length} trainer(s)`);
  };

  // Function to handle dropdown visibility
  const handleDropdownVisibility = (columnName: string, isVisible: boolean) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    if (!isVisible) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setVisibleDropdown(null);
      }, 300);
    } else {
      setVisibleDropdown(columnName);
    }
  };

  // Function to keep dropdown visible when interacting with its content
  const keepDropdownVisible = (columnName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setVisibleDropdown(columnName);
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trainer Insights Dashboard</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Search for Trainer, Skill, etc" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 ml-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            Generate lead
          </button>
          
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg flex items-center">
            <span>Import Data</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* Bulk Actions Button */}
        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg flex items-center">
          Bulk Actions
          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        
        {/* Initiate Screening Button - only visible when trainers are selected */}
        {selectedTrainers.length > 0 && (
          <button 
            onClick={initiateScreening}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            Initiate Screening ({selectedTrainers.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2 w-4 h-4"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTrainers(filteredTrainers.map(t => t.trainerID));
                      } else {
                        setSelectedTrainers([]);
                      }
                    }}
                    checked={selectedTrainers.length === filteredTrainers.length && filteredTrainers.length > 0}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Name</span>
                  <div className="relative">
                    <button 
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility('name', true)}
                      onMouseLeave={() => handleDropdownVisibility('name', false)}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${visibleDropdown === 'name' ? 'block' : 'hidden'}`}
                      onMouseEnter={() => keepDropdownVisible('name')}
                      onMouseLeave={() => handleDropdownVisibility('name', false)}
                    >
                      <div className="p-2">
                        <input 
                          type="text" 
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by name..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map(t => t.name))).map(name => (
                            <label key={name} className="flex items-center p-1 hover:bg-gray-100">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={filters.name.includes(name)}
                                onChange={() => toggleFilter('name', name)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="truncate">{name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Pre-Qualified</span>
                  <div className="relative">
                    <button 
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility('prequalified', true)}
                      onMouseLeave={() => handleDropdownVisibility('prequalified', false)}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${visibleDropdown === 'prequalified' ? 'block' : 'hidden'}`}
                      onMouseEnter={() => keepDropdownVisible('prequalified')}
                      onMouseLeave={() => handleDropdownVisibility('prequalified', false)}
                    >
                      <div className="p-2">
                        <label className="flex items-center p-1 hover:bg-gray-100">
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            checked={filters.prequalified.includes('Yes')}
                            onChange={() => toggleFilter('prequalified', 'Yes')}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center p-1 hover:bg-gray-100">
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            checked={filters.prequalified.includes('No')}
                            onChange={() => toggleFilter('prequalified', 'No')}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Skill</span>
                  <div className="relative">
                    <button 
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility('skill', true)}
                      onMouseLeave={() => handleDropdownVisibility('skill', false)}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${visibleDropdown === 'skill' ? 'block' : 'hidden'}`}
                      onMouseEnter={() => keepDropdownVisible('skill')}
                      onMouseLeave={() => handleDropdownVisibility('skill', false)}
                    >
                      <div className="p-2">
                        <input 
                          type="text" 
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by skill..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map(t => t.skill))).map(skill => (
                            <label key={skill} className="flex items-center p-1 hover:bg-gray-100">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={filters.skill.includes(skill)}
                                onChange={() => toggleFilter('skill', skill)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="truncate">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Tool</span>
                  <div className="relative">
                    <button 
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility('tool', true)}
                      onMouseLeave={() => handleDropdownVisibility('tool', false)}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${visibleDropdown === 'tool' ? 'block' : 'hidden'}`}
                      onMouseEnter={() => keepDropdownVisible('tool')}
                      onMouseLeave={() => handleDropdownVisibility('tool', false)}
                    >
                      <div className="p-2">
                        <input 
                          type="text" 
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by tool..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map(t => t.tool))).map(tool => (
                            <label key={tool} className="flex items-center p-1 hover:bg-gray-100">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={filters.tool.includes(tool)}
                                onChange={() => toggleFilter('tool', tool)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="truncate">{tool}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Technology</span>
                  <div className="relative">
                    <button 
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility('technology', true)}
                      onMouseLeave={() => handleDropdownVisibility('technology', false)}
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${visibleDropdown === 'technology' ? 'block' : 'hidden'}`}
                      onMouseEnter={() => keepDropdownVisible('technology')}
                      onMouseLeave={() => handleDropdownVisibility('technology', false)}
                    >
                      <div className="p-2">
                        <input 
                          type="text" 
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by technology..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map(t => t.technology))).map(tech => (
                            <label key={tech} className="flex items-center p-1 hover:bg-gray-100">
                              <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={filters.technology.includes(tech)}
                                onChange={() => toggleFilter('technology', tech)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="truncate">{tech}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map((trainer) => (
              <tr 
                key={trainer.trainerID} 
                className={`hover:bg-gray-50 transition-colors ${selectedTrainers.includes(trainer.trainerID) ? 'bg-blue-50' : ''}`}
                onClick={() => toggleSelectTrainer(trainer.trainerID)}
              >
                <td className="px-3 py-4 border-b border-gray-200">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={selectedTrainers.includes(trainer.trainerID)}
                    onChange={() => {}} // Controlled by row click
                    onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {trainer.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                      <div className="text-sm text-gray-500">{generateEmail(trainer.name)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    trainer.prequalified === 'Yes' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trainer.prequalified}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="max-w-xs truncate" title={trainer.skill}>
                    {trainer.skill}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {trainer.tool}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {trainer.technology}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg flex items-center">
          Export
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrainerRepository;