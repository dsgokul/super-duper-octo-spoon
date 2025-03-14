// components/ScreeningRequest/ScreeningRequestDetail.tsx
import React, { useState } from "react";
import { ScreeningRequest } from "../../../store/useScreeningRequestStore";
//import { useTrainerStore } from "../../../store/useTrainerStore";
import QuantitativeScreening from "./QuantitativeScreening";
import QualitativeScreening from "./QualitativeScreening";
import ShortlistedTrainers from "./ShortlistedTrainers";

interface ScreeningRequestDetailProps {
  request: ScreeningRequest;
  onBack: () => void;
}

type Tab = "details" | "quantitative" | "qualitative" | "shortlisted";

const ScreeningRequestDetail: React.FC<ScreeningRequestDetailProps> = ({
  request,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('quantitative');
 // const {trainers} = useTrainerStore()
  // Decide the "next" tab from the current one
  const handleNextScreening = (currentTab: Tab) => {
    if (currentTab === "quantitative") {
      setActiveTab("qualitative");
    } else if (currentTab === "qualitative") {
      setActiveTab("shortlisted");
    }
  };

  // Example "Details" tab content
  const renderMainDetails = () => (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Request Details</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Request Type: Trainer requisition
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-600">Assign To:</div>
        <div className="text-right font-medium">
          Team Responsible for Shortlisting
        </div>
        <div className="text-gray-600">Assigned By:</div>
        <div className="text-right font-medium">Your Name/Team</div>
        <div className="text-gray-600">Date:</div>
        <div className="text-right font-medium">
          {request.createdAt || "13/3/2025"}
        </div>
      </div>
    </div>
  );

  // Render each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return renderMainDetails();
      case "quantitative":
        // Pass the callback so the child can trigger "next screening"
        return (
          <QuantitativeScreening
            onSubmitNext={() => handleNextScreening("quantitative")}
          />
        );
      case "qualitative":
        return (
          <QualitativeScreening
            onSubmitNext={() => handleNextScreening("qualitative")}
          />
        );
      case "shortlisted":
        return <ShortlistedTrainers   />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={onBack}
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
        Back to Lead Generation
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Requisition {request.id.split("_")[1]}
        </h1>
        <p className="text-gray-600">
          Trainer requisition details and screening process
        </p>
      </div>

      {/* Main tabs */}
      <div className="flex mb-6 space-x-2">
      {/*   <button
          onClick={() => setActiveTab("details")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "details"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          Details
        </button> */}
        <button
          onClick={() => setActiveTab("quantitative")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "quantitative"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          Metrics Screening
        </button>
        <button
          onClick={() => setActiveTab("qualitative")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "qualitative"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          Contextual Screening
        </button>
        <button
          onClick={() => setActiveTab("shortlisted")}
          className={`py-2 px-4 rounded-md ${
            activeTab === "shortlisted"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          Shortlisted Trainers
        </button>
      </div>

      {/* Render active tab */}
      {renderTabContent()}
    </div>
  );
};

export default ScreeningRequestDetail;
