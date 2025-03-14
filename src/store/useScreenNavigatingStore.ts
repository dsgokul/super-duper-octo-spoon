// store/useRequestStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your types; adjust these as per your requirements.
export type Tab = "details" | "quantitative" | "qualitative" | "shortlisted";
export type Step = "request-list" | "create-form" | "request-detail";

export interface ScreeningRequest {
  id: string;
  title: string;
  description: string;
  purpose: string;
  attributes: {
    [key: string]: string;
  };
  quantitativeScreening: {
    metrics: string[];
    thresholds: string[];
  };
  qualitativeScreening: {
    criteria: string[];
    evaluation: string[];
  };
  assignment: {
    shortlistingProcess: string[];
    timeline: string;
  };
  status: "DRAFT" | "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
}

// Define the store interface.
interface RequestStore {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  step: Step;
  setStep: (step: Step) => void;
  selectedRequest: ScreeningRequest | null;
  setSelectedRequest: (request: ScreeningRequest | null) => void;
}

// Create the Zustand store with persistence in localStorage.
const useScreenNavigatingStore = create<RequestStore>()(
  persist(
    (set) => ({
      activeTab: "quantitative",
      setActiveTab: (tab: Tab) => set({ activeTab: tab }),
      step: "request-list",
      setStep: (step: Step) => set({ step }),
      selectedRequest: null,
      setSelectedRequest: (request: ScreeningRequest | null) =>
        set({ selectedRequest: request }),
    }),
    {
      name: "screen-navigating-store", // unique name in localStorage
    }
  )
);

export default useScreenNavigatingStore;
