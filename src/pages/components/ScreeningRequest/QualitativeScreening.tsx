// components/QualitativeScreening.tsx
import React, { useState } from "react";
import { useTrainerStore } from "../../../store/useTrainerStore";
import TrainerTable from "../TrainerTable";
import ScreeningDetailsCard from "./ScreeningDetailsCard";

interface QualitativeScreeningProps {
  // Called when the user clicks "Submit for Next Screening"
  onSubmitNext: () => void;
}

const QualitativeScreening: React.FC<QualitativeScreeningProps> = ({
  onSubmitNext,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"details" | "screening">(
    "details"
  );
  const { trainers } = useTrainerStore();
  const shorted = trainers.slice(0, 6);
  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Contextual Screening
        </h2>
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
          <ScreeningDetailsCard title="Contextual Screening Details" />
        </div>
      ) : (
        // SCREENING SUB‐TAB
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <TrainerTable
            trainers={shorted}
            onSelectTrainer={(trainer) =>
              console.log("Selected trainer:", trainer)
            }
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

export default QualitativeScreening;
