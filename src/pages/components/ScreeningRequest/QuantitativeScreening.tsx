// components/QuantitativeScreening.tsx
import React, { useState } from "react";
import { useTrainerStore } from "../../../store/useTrainerStore";
import TrainerTable from "../TrainerTable";
// If you have a dedicated card/snippet for "Quantitative Screening Details":
import ScreeningDetailsCard from "./ScreeningDetailsCard";

interface QuantitativeScreeningProps {
  // Called when the user clicks "Submit for Next Screening"
  onSubmitNext: () => void;
}

const QuantitativeScreening: React.FC<QuantitativeScreeningProps> = ({ onSubmitNext }) => {
  // Local sub‐tab state: "details" or "screening"
  const [activeSubTab, setActiveSubTab] = useState<"details" | "screening">("details");
  const { trainers } = useTrainerStore(); // or fetch trainers from your store

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Metrics Screening</h2>
      </div>

      {/* Sub‐Tab Buttons */}
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setActiveSubTab("details")}
          className={`py-2 px-4 ${
            activeSubTab === "details"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveSubTab("screening")}
          className={`py-2 px-4 ${
            activeSubTab === "screening"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Screening
        </button>
      </div>

      {/* Sub‐Tab Content */}
      {activeSubTab === "details" ? (
        // DETAILS SUB‐TAB
        <div>
          {/* You can replace this with your own snippet or a dedicated component */}
          <ScreeningDetailsCard title="Metrics Screening Details" />
        </div>
      ) : (
        // SCREENING SUB‐TAB
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <TrainerTable
            trainers={trainers}
            onSelectTrainer={(trainer) => console.log("Selected trainer:", trainer)}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={onSubmitNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit for Next Screening
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantitativeScreening;
