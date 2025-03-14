import React, { useState, useRef, useEffect } from "react";
import { Trainer } from "../types/TrainerTypes";

interface TrainerTableProps {
  trainers: Trainer[];
  onSelectTrainer?: (trainer: Trainer) => void;
}

interface CommentPopupProps {
  isOpen: boolean;
  comment: string;
  onClose: () => void;
  onSave: (comment: string) => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({
  isOpen,
  comment,
  onClose,
  onSave,
}) => {
  const [editedComment, setEditedComment] = useState(comment);

  // Update local state if comment prop changes (e.g., opening a different trainer's comment)
  useEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add/Edit Comment</h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          placeholder="Enter your comment here..."
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              onSave(editedComment);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const TrainerTable: React.FC<TrainerTableProps> = ({ trainers, onSelectTrainer }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for tracking selected trainers
  const [selectedTrainers, setSelectedTrainers] = useState<number[]>([]);
  // State for filters
  const [filters, setFilters] = useState({
    name: [] as string[],
    skill: [] as string[],
    tool: [] as string[],
    technology: [] as string[],
  });

  // State for managing dropdown visibility
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // New states for comments
  const [comments, setComments] = useState<Record<number, string>>({});
  const [activeCommentPopup, setActiveCommentPopup] = useState<number | null>(null);

  // Function to toggle a filter value
  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      if (prev[filterType].includes(value)) {
        return {
          ...prev,
          [filterType]: prev[filterType].filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [filterType]: [...prev[filterType], value],
        };
      }
    });
  };

  // Function to check if a trainer matches the filters
  const matchesFilters = (trainer: Trainer) => {
    const nameMatch = filters.name.length === 0 || filters.name.includes(trainer.name);
    const skillMatch = filters.skill.length === 0 || filters.skill.includes(trainer.skill);
    const toolMatch = filters.tool.length === 0 || filters.tool.includes(trainer.tool);
    const technologyMatch = filters.technology.length === 0 || filters.technology.includes(trainer.technology);

    return nameMatch && skillMatch && toolMatch && technologyMatch;
  };

  // Function to handle dropdown visibility
  const handleDropdownVisibility = (columnName: string, isVisible: boolean) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    if (!isVisible) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setVisibleDropdown(null);
      }, 2000);
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

  // Filtered trainers based on search query and filters
  const filteredTrainers = trainers.filter((trainer: Trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch && matchesFilters(trainer);
  });

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
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
      </div>

      {/* Table */}
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
                        setSelectedTrainers(filteredTrainers.map((t) => t.trainerID));
                      } else {
                        setSelectedTrainers([]);
                      }
                    }}
                    checked={
                      selectedTrainers.length === filteredTrainers.length &&
                      filteredTrainers.length > 0
                    }
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Name</span>
                  <div className="relative">
                    <button
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility("name", true)}
                      onMouseLeave={() => handleDropdownVisibility("name", false)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${
                        visibleDropdown === "name" ? "block" : "hidden"
                      }`}
                      onMouseEnter={() => keepDropdownVisible("name")}
                      onMouseLeave={() => handleDropdownVisibility("name", false)}
                    >
                      <div className="p-2">
                        <input
                          type="text"
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by name..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map((t) => t.name))).map((name) => (
                            <label key={name} className="flex items-center p-1 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={filters.name.includes(name)}
                                onChange={() => toggleFilter("name", name)}
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
              {/* Other columns for Skill, Tool, and Technology with similar dropdown filters */}
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Skill</span>
                  <div className="relative">
                    <button
                      className="p-1 rounded hover:bg-gray-200"
                      onMouseEnter={() => handleDropdownVisibility("skill", true)}
                      onMouseLeave={() => handleDropdownVisibility("skill", false)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${
                        visibleDropdown === "skill" ? "block" : "hidden"
                      }`}
                      onMouseEnter={() => keepDropdownVisible("skill")}
                      onMouseLeave={() => handleDropdownVisibility("skill", false)}
                    >
                      <div className="p-2">
                        <input
                          type="text"
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by skill..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map((t) => t.skill))).map((skill) => (
                            <label key={skill} className="flex items-center p-1 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={filters.skill.includes(skill)}
                                onChange={() => toggleFilter("skill", skill)}
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
                      onMouseEnter={() => handleDropdownVisibility("tool", true)}
                      onMouseLeave={() => handleDropdownVisibility("tool", false)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${
                        visibleDropdown === "tool" ? "block" : "hidden"
                      }`}
                      onMouseEnter={() => keepDropdownVisible("tool")}
                      onMouseLeave={() => handleDropdownVisibility("tool", false)}
                    >
                      <div className="p-2">
                        <input
                          type="text"
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by tool..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map((t) => t.tool))).map((tool) => (
                            <label key={tool} className="flex items-center p-1 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={filters.tool.includes(tool)}
                                onChange={() => toggleFilter("tool", tool)}
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
                      onMouseEnter={() => handleDropdownVisibility("technology", true)}
                      onMouseLeave={() => handleDropdownVisibility("technology", false)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 ${
                        visibleDropdown === "technology" ? "block" : "hidden"
                      }`}
                      onMouseEnter={() => keepDropdownVisible("technology")}
                      onMouseLeave={() => handleDropdownVisibility("technology", false)}
                    >
                      <div className="p-2">
                        <input
                          type="text"
                          className="w-full p-2 mb-2 text-sm border border-gray-300 rounded"
                          placeholder="Filter by technology..."
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="max-h-40 overflow-y-auto">
                          {Array.from(new Set(trainers.map((t) => t.technology))).map((tech) => (
                            <label key={tech} className="flex items-center p-1 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={filters.technology.includes(tech)}
                                onChange={() => toggleFilter("technology", tech)}
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
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                Location
              </th>
              {/* Updated Comments column */}
              <th scope="col" className="px-6 py-4 font-medium border-b border-gray-200">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map((trainer) => (
              <tr
                key={trainer.trainerID}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedTrainers.includes(trainer.trainerID) ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  const newSelected = selectedTrainers.includes(trainer.trainerID)
                    ? selectedTrainers.filter((id) => id !== trainer.trainerID)
                    : [...selectedTrainers, trainer.trainerID];
                  setSelectedTrainers(newSelected);
                  if (onSelectTrainer) onSelectTrainer(trainer);
                }}
              >
                <td className="px-3 py-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedTrainers.includes(trainer.trainerID)}
                    onChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
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
                      <div className="text-sm text-gray-500">
                        {trainer.name.toLowerCase().replace(/\s+/g, ".") + "@example.com"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="max-w-xs truncate" title={trainer.skill}>
                    {trainer.skill}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">{trainer.tool}</td>
                <td className="px-6 py-4 border-b border-gray-200">{trainer.technology}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {trainer.city}, {trainer.state}, {trainer.country}
                </td>
                {/* Updated Comments cell */}
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 flex-1">
                      {comments[trainer.trainerID] || "No comment"}
                    </span>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCommentPopup(trainer.trainerID);
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      {comments[trainer.trainerID] && (
                        <span className="absolute w-2 h-2 bg-blue-500 rounded-full -top-1 -right-1"></span>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activeCommentPopup !== null && (
        <CommentPopup
          isOpen={true}
          comment={comments[activeCommentPopup] || ""}
          onClose={() => setActiveCommentPopup(null)}
          onSave={(comment) =>
            setComments((prev) => ({
              ...prev,
              [activeCommentPopup]: comment,
            }))
          }
        />
      )}
    </div>
  );
};

export default TrainerTable;
  