import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import useScreenNavigatingStore from "../store/useScreenNavigatingStore";

// Example interfaces if you store attribute data
interface AttributeItem {
  attribute: string;
  value: string;
}
interface Criteria {
  title: string;
  content: string;
}


const RfiqPage: React.FC = () => {

  const { trainerName } = useParams(); // e.g. /rfiq/Raghu%20K

  // ----------------------------------------------------------------
  // INFORMATION COLLECTED TAB STATE
  // ----------------------------------------------------------------
  const [attributes, setAttributes] = useState<AttributeItem[]>([
    { attribute: "Trainer Type", value: "Individual/Institutional/corporate" },
    { attribute: "Class size", value: "30 trainers" },
    { attribute: "Region", value: "Some region" },
    { attribute: "Domain", value: "Automotive SDV" },
    { attribute: "Domain focus", value: "Niche/Customized" },
    {
      attribute: "Orientation",
      value: "Domain Centric, Technology Centric, Process centric",
    },
    { attribute: "Domain specialization", value: "ADAS, BMS, EV, V2X" },
  ]);
  const [newAttribute, setNewAttribute] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddAttribute = () => {
    if (!newAttribute.trim()) return;
    setAttributes((prev) => [
      ...prev,
      { attribute: newAttribute, value: newValue },
    ]);
    setNewAttribute("");
    setNewValue("");
  };

  // Assessment – separate states for each field:
  const [newToolSupport, setNewToolSupport] = useState("");
  const [toolSupportList, setToolSupportList] = useState<string[]>([]);

  const [newExperienceExpertise, setNewExperienceExpertise] = useState("");
  const [experienceExpertiseList, setExperienceExpertiseList] = useState<
    string[]
  >([]);

  const [newAssessment, setNewAssessment] = useState("");
  const [assessmentList, setAssessmentList] = useState<string[]>([]);

  const handleAddToolSupport = () => {
    if (!newToolSupport.trim()) return;
    setToolSupportList((prev) => [...prev, newToolSupport]);
    setNewToolSupport("");
  };

  const handleAddExperienceExpertise = () => {
    if (!newExperienceExpertise.trim()) return;
    setExperienceExpertiseList((prev) => [...prev, newExperienceExpertise]);
    setNewExperienceExpertise("");
  };

  const handleAddAssessment = () => {
    if (!newAssessment.trim()) return;
    setAssessmentList((prev) => [...prev, newAssessment]);
    setNewAssessment("");
  };

  // ----------------------------------------------------------------
  // ACTION TAB STATES
  // ----------------------------------------------------------------
  const [showSaveForLaterSection, setShowSaveForLaterSection] = useState(false);
  const [showNdaSection, setShowNdaSection] = useState(false);

  // Negative/Positive Criteria states
  const [negativeCriteria, setNegativeCriteria] = useState<Criteria[]>([]);
  const [newCriteria, setNewCriteria] = useState("");
  const [positiveCriteria, setPositiveCriteria] = useState<Criteria[]>([]);
  const [newPositive, setNewPositive] = useState("");

  // Add negative criteria
  const handleAddNegativeCriteria = () => {
    if (!newCriteria.trim()) return;
    const newCrit = { title: newCriteria, content: "" };
    setNegativeCriteria((prev) => [...prev, newCrit]);
    setNewCriteria("");
  };

  // Add positive criteria
  const handleAddPositive = () => {
    if (!newPositive.trim()) return;
    const newPoint = { title: newPositive, content: "" };
    setPositiveCriteria((prev) => [...prev, newPoint]);
    setNewPositive("");
  };

  // "Notify Trainer" button
  const handleNotifyTrainer = () => {
    alert("Trainer has been notified (demo)!");
    // Add your real logic here: e.g. send an API request, etc.
  };

  // Helper to reset the other snippet if needed
  const handleShowSaveForLater = () => {
    setShowNdaSection(false);
    setShowSaveForLaterSection(true);
  };
  const handleShowNda = () => {
    setShowSaveForLaterSection(false);
    setShowNdaSection(true);
  };

  const handleBack = () => {
    setShowSaveForLaterSection(false);
    setShowNdaSection(false);
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => {
          useScreenNavigatingStore.setState({
            activeTab: "shortlisted",
            step: "request-detail",
          });
        }}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Shortlisted Trainers
      </button>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            RFIQ for {trainerName ?? "Unknown Trainer"}
          </h1>
          <p className="text-gray-600">
            Trainer requisition details and screening process
          </p>
        </div>
      </div>

      {/* Radix Tabs */}
      <Tabs.Root className="flex flex-col" defaultValue="request">
        <Tabs.List
          className="flex space-x-4 border-b mb-4"
          aria-label="RFIQ Tabs"
        >
          <Tabs.Trigger
            value="request"
            className="py-2 px-4 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Request
          </Tabs.Trigger>
          <Tabs.Trigger
            value="info-collected"
            className="py-2 px-4 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Information collected
          </Tabs.Trigger>
          <Tabs.Trigger
            value="action"
            className="py-2 px-4 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600"
          >
            Action
          </Tabs.Trigger>
        </Tabs.List>

        {/* REQUEST TAB */}
        <Tabs.Content value="request" className="flex-grow">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="mb-4 font-semibold">
              Subject: Request for Information and Qualifications (RFIQ) -
              [Training Area]
            </p>
            <p className="mb-4">Dear {trainerName},</p>
            <p className="mb-4">
              Your Company Name is actively building a network of highly
              qualified trainers to support ongoing and future training
              initiatives. We are impressed with your expertise in [Trainer's
              Area of Expertise], which aligns with our current training needs.
            </p>
            <p className="mb-4">
              We are sending you this Request for Information and Qualifications
              (RFIQ) to gather more detailed information about your experience,
              qualifications, and capabilities. This will help us determine if
              you are a good fit for our upcoming projects.
            </p>
            <p className="mb-4">
              Please complete the following form to provide your information and
              qualifications [Link to the form].
            </p>
            <p className="mb-4 font-semibold">Introductory Call:</p>
            <p className="mb-4">
              To further discuss your qualifications, answer any questions you
              may have, and understand your approach in more detail, we propose
              scheduling a brief introductory call with you.
            </p>
          </div>
        </Tabs.Content>

        {/* INFORMATION COLLECTED TAB */}
        {/* INFORMATION COLLECTED TAB */}
        <Tabs.Content value="info-collected" className="flex-grow">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Trainer Information */}
            <div className="w-full lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-[#F8FAFC] border-b px-4 py-3 rounded-t-lg">
                <h3 className="text-lg font-semibold text-[#1E3A8A]">
                  Trainer Information
                </h3>
              </div>
              <div className="p-4">
                <div className="mb-4 rounded-lg overflow-hidden">
                  {/* Header row */}
                  <div className="grid grid-cols-2 px-4 py-3 bg-[#E2EBF3]">
                    <div className="text-sm font-medium text-[#00213D]">
                      Attribute
                    </div>
                    <div className="text-sm font-medium text-[#00213D]">
                      Value
                    </div>
                  </div>
                  {/* Data rows */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {attributes.map((item, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-2 px-4 py-3 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } border-t border-gray-200`}
                      >
                        <div className="text-sm font-medium text-gray-700">
                          {item.attribute}
                        </div>
                        <div className="text-sm text-gray-800">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Attribute */}
                <div className="mt-5 space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Add New Attribute
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Attribute Name"
                      value={newAttribute}
                      onChange={(e) => setNewAttribute(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Attribute Value"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleAddAttribute}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Add Attribute
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Assessment Comments */}
            <div className="w-full lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-[#F8FAFC] border-b px-4 py-3 rounded-t-lg">
                <h3 className="text-lg font-semibold text-[#1E3A8A]">
                  Assessment Comments
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  {/* Tool Support Section */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-[#E2EBF3] px-4 py-3">
                      <h4 className="text-sm font-medium text-[#00213D]">
                        Tool Support
                      </h4>
                    </div>
                    <div className="p-4">
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="Enter relevant tool support information (e.g., proficiency with specific training tools, LMS platforms, etc.)"
                        value={newToolSupport}
                        onChange={(e) => setNewToolSupport(e.target.value)}
                      />
                      <button
                        onClick={handleAddToolSupport}
                        className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Add Entry
                      </button>

                      {toolSupportList.length > 0 && (
                        <div className="mt-3 pl-2 border-l-4 border-blue-200">
                          <ul className="space-y-1">
                            {toolSupportList.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start"
                              >
                                <span className="text-blue-500 mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience and Expertise Section */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-[#E2EBF3] px-4 py-3">
                      <h4 className="text-sm font-medium text-[#00213D]">
                        Experience & Expertise
                      </h4>
                    </div>
                    <div className="p-4">
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="Enter details about trainer's experience and domain expertise (years of experience, industry background, etc.)"
                        value={newExperienceExpertise}
                        onChange={(e) =>
                          setNewExperienceExpertise(e.target.value)
                        }
                      />
                      <button
                        onClick={handleAddExperienceExpertise}
                        className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Add Entry
                      </button>

                      {experienceExpertiseList.length > 0 && (
                        <div className="mt-3 pl-2 border-l-4 border-blue-200">
                          <ul className="space-y-1">
                            {experienceExpertiseList.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start"
                              >
                                <span className="text-blue-500 mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Assessment Section */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-[#E2EBF3] px-4 py-3">
                      <h4 className="text-sm font-medium text-[#00213D]">
                        Additional Assessment
                      </h4>
                    </div>
                    <div className="p-4">
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="Enter any additional assessment notes, observations, or evaluation criteria"
                        value={newAssessment}
                        onChange={(e) => setNewAssessment(e.target.value)}
                      />
                      <button
                        onClick={handleAddAssessment}
                        className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Add Entry
                      </button>

                      {assessmentList.length > 0 && (
                        <div className="mt-3 pl-2 border-l-4 border-blue-200">
                          <ul className="space-y-1">
                            {assessmentList.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 flex items-start"
                              >
                                <span className="text-blue-500 mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        {/* ACTION TAB */}
        {/* ACTION TAB */}
        <Tabs.Content value="action" className="flex-grow">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="bg-[#F8FAFC] border-b px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold text-[#1E3A8A]">
                Actions for {trainerName}
              </h3>
            </div>

            <div className="p-6">
              {/* If neither snippet is shown, display the two main buttons */}
              {!showSaveForLaterSection && !showNdaSection && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Please select how you would like to proceed with this
                    trainer.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md border border-gray-300 transition-colors flex items-center justify-center"
                      onClick={handleShowSaveForLater}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        ></path>
                      </svg>
                      Save for Later
                    </button>
                    <button
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center"
                      onClick={handleShowNda}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        ></path>
                      </svg>
                      Initiate Partnership
                    </button>
                  </div>
                </div>
              )}

              {/* SAVE FOR LATER SECTION */}
              {showSaveForLaterSection && !showNdaSection && (
                <div className="space-y-8">
                  {/* Negative Criteria Section */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-[#E2EBF3] px-4 py-3">
                      <h3 className="text-md font-semibold text-[#00213D]">
                        Criteria That Did Not Meet Requirements
                      </h3>
                    </div>

                    <div className="p-4">
                      {/* List of negative criteria items */}
                      {negativeCriteria.length > 0 && (
                        <div className="mb-6 space-y-4">
                          {negativeCriteria.map((criteria, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                            >
                              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <h4 className="font-medium text-gray-700">
                                  {criteria.title}
                                </h4>
                              </div>
                              <div className="p-3">
                                <textarea
                                  placeholder="Enter criteria details..."
                                  className="border border-gray-300 rounded-md p-3 w-full min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={criteria.content}
                                  onChange={(e) => {
                                    const updated = [...negativeCriteria];
                                    updated[index].content = e.target.value;
                                    setNegativeCriteria(updated);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add new negative criteria */}
                      <div className="space-y-3">
                        <textarea
                          placeholder="Enter new criteria that did not meet requirements..."
                          className="border border-gray-300 rounded-md p-3 w-full min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newCriteria}
                          onChange={(e) => setNewCriteria(e.target.value)}
                        />

                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white w-fit px-4 py-2.5 rounded-md text-sm transition-colors flex items-center justify-center"
                          onClick={handleAddNegativeCriteria}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          Add Criteria
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Positive Criteria Section */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-[#E2EBF3] px-4 py-3">
                      <h3 className="text-md font-semibold text-[#00213D]">
                        Points Considered Positive
                      </h3>
                    </div>

                    <div className="p-4">
                      {/* List of positive criteria items */}
                      {positiveCriteria.length > 0 && (
                        <div className="mb-6 space-y-4">
                          {positiveCriteria.map((point, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                            >
                              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <h4 className="font-medium text-gray-700">
                                  {point.title}
                                </h4>
                              </div>
                              <div className="p-3">
                                <textarea
                                  placeholder="Enter positive point details..."
                                  className="border border-gray-300 rounded-md p-3 w-full min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={point.content}
                                  onChange={(e) => {
                                    const updated = [...positiveCriteria];
                                    updated[index].content = e.target.value;
                                    setPositiveCriteria(updated);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add new positive criteria */}
                      <div className="space-y-3">
                        <textarea
                          placeholder="Enter new positive qualities or attributes..."
                          className="border border-gray-300 rounded-md p-3 w-full min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newPositive}
                          onChange={(e) => setNewPositive(e.target.value)}
                        />

                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white  px-4 py-2.5 rounded-md text-sm transition-colors flex items-center justify-center"
                          onClick={handleAddPositive}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          Add Positive Point
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center"
                      onClick={handleNotifyTrainer}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Notify Trainer
                    </button>
                    <button
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md border border-gray-300 transition-colors flex items-center justify-center"
                      onClick={handleBack}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        ></path>
                      </svg>
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* NDA SECTION (INITIATE PARTNERSHIP) */}
              {showNdaSection && !showSaveForLaterSection && (
                <div className="max-w-4xl mx-auto space-y-4 border rounded-md p-6 bg-white">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Request for Information and Qualifications (RFIQ) -{" "}
                    {trainerName} - [Training Area]
                  </h2>

                  <div className="pt-4 text-gray-700">Dear {trainerName},</div>

                  <div className="pt-2 text-gray-700">
                    [Your Company Name] is actively building a network of highly
                    qualified trainers to support our ongoing and future
                    training initiatives. We are impressed with your expertise
                    in [Trainer's Area of Expertise], which aligns with our
                    current training needs.
                  </div>

                  <div className="pt-2 text-gray-700">
                    We are sending you this Request for Information and
                    Qualifications (RFIQ) to gather more detailed information
                    about your experience, qualifications, and capabilities.
                    This will help us determine if you are a good fit for
                    potential training engagements with our organization.
                  </div>

                  <div className="pt-2 text-gray-700">
                    Please complete the following form to provide your
                    information and qualifications:
                    <a
                      href="[Link of the form]"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      Link of the form
                    </a>
                  </div>

                  <div className="pt-4 font-medium text-gray-800">
                    Introductory Call:
                  </div>
                  <div className="pt-1 text-gray-700">
                    To further discuss your qualifications, answer any questions
                    you may have, and understand your approach in more detail,
                    we would like to schedule a brief introductory call with
                    you.
                  </div>

                  <div className="pt-2 text-gray-700">
                    <ul className="list-disc pl-6">
                      <li>[Date 1] - [Time Range]</li>
                      <li>[Date 2] - [Time Range]</li>
                      <li>[Date 3] - [Time Range]</li>
                    </ul>
                  </div>

                  <div className="pt-2 text-gray-700">
                    • Please provide the best phone number to reach you at.
                  </div>

                  <div className="pt-1 text-gray-700">
                    • Please provide your preferred video conferencing platform
                    (e.g., Zoom, Microsoft Teams, Google Meet).
                  </div>

                  <div className="pt-4 font-medium text-gray-800">
                    Submission Instructions:
                  </div>
                  <div className="pt-1 text-gray-700">
                    Please complete the Google Form linked above and include
                    your availability for the introductory call within the form
                    or in a separate email response. Please submit your
                    responses by [Date].
                  </div>

                  <div className="pt-2 text-gray-700">
                    We appreciate your time and effort in completing this RFIQ.
                    We will review your responses and schedule the introductory
                    call based on your availability.
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4 items-start">
                    <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Invite Trainer
                    </button>
                    <button
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md border border-gray-300 transition-colors flex items-center justify-center"
                      onClick={handleBack}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        ></path>
                      </svg>
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default RfiqPage;
