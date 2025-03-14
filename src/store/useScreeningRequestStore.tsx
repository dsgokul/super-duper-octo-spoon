// store/useScreeningRequestStore.ts
import { create } from 'zustand';

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
  status: 'DRAFT' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

interface ScreeningRequestState {
  requests: ScreeningRequest[];
  currentRequest: Partial<ScreeningRequest>;
  successMessage: string | null;
  currentTab: 'metrics-screening' | 'contextual-screening' | 'assignment';
  
  // Actions
  updateCurrentRequest: (data: Partial<ScreeningRequest>) => void;
  addAttribute: (key: string, value: string) => void;
  removeAttribute: (key: string) => void;
  submitRequest: () => void;
  resetCurrentRequest: () => void;
  setSuccessMessage: (message: string | null) => void;
  setCurrentTab: (tab: 'metrics-screening' | 'contextual-screening' | 'assignment') => void;
}

// Generate a unique ID for each request
const generateId = () => `SR_${Math.floor(Math.random() * 10000).toString().padStart(2, '0')}`;

export const useScreeningRequestStore = create<ScreeningRequestState>((set) => ({
  requests: [
    {
      id: 'SR_01',
      title: 'AI & ML Trainer Outreach',
      description: 'This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers for potential future training engagements. We are seeking to develop a robust database of trainers with diverse expertise to meet our evolving training needs.',
      purpose: 'This request is to initiate a lead generation campaign to identify and build a pool of qualified trainers for potential future training engagements. We are seeking to develop a robust database of trainers with diverse expertise to meet our evolving training needs.',
      attributes: {
        'Specific Skill/Expertise': 'Data science, ML, MLOps, DevOps, Embedded programming, Model-based design and development, Testing and validation',
        'Geographic Availability': 'India'
      },
      quantitativeScreening: {
        metrics: [
          'Years of experience in the domain',
          'Number of training sessions conducted',
          'Rating from previous trainings'
        ],
        thresholds: [
          'Minimum 5 years of experience',
          'At least 10 training sessions conducted',
          'Average rating of 4/5 or higher'
        ]
      },
      qualitativeScreening: {
        criteria: [
          'Communication skills',
          'Depth of technical knowledge',
          'Ability to explain complex concepts'
        ],
        evaluation: [
          'Based on sample videos or interviews',
          'Technical assessment through problem-solving',
          'Demo session evaluation'
        ]
      },
      assignment: {
        shortlistingProcess: [
          'Review each trainer lead against the defined attributes and criteria.',
          'Capture the results of the evaluation for each attribute.',
          'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
          'Create a shortlist of trainers who meet the defined criteria.'
        ],
        timeline: 'To be determined'
      },
      status: 'IN_PROGRESS',
      createdAt: '2024-03-15'
    }
  ],
  
  currentRequest: {
    attributes: {},
    quantitativeScreening: {
      metrics: [],
      thresholds: []
    },
    qualitativeScreening: {
      criteria: [],
      evaluation: []
    },
    assignment: {
      shortlistingProcess: [
        'Review each trainer lead against the defined attributes and criteria.',
        'Capture the results of the evaluation for each attribute.',
        'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
        'Create a shortlist of trainers who meet the defined criteria.'
      ],
      timeline: 'To be determined'
    }
  },
  successMessage: null,
  currentTab: 'metrics-screening',
  
  updateCurrentRequest: (data) => set((state) => ({
    currentRequest: {
      ...state.currentRequest,
      ...data
    }
  })),
  
  addAttribute: (key, value) => set((state) => ({
    currentRequest: {
      ...state.currentRequest,
      attributes: {
        ...state.currentRequest.attributes,
        [key]: value
      }
    }
  })),
  
  removeAttribute: (key) => set((state) => {
    const updatedAttributes = { ...state.currentRequest.attributes };
    delete updatedAttributes[key];
    
    return {
      currentRequest: {
        ...state.currentRequest,
        attributes: updatedAttributes
      }
    };
  }),
  
  submitRequest: () => set((state) => {
    const newRequest: ScreeningRequest = {
      id: generateId(),
      title: state.currentRequest.title ?? 'Untitled Request',
      description: state.currentRequest.description ?? '',
      purpose: state.currentRequest.purpose ?? '',
      attributes: state.currentRequest.attributes ?? {},
      quantitativeScreening: state.currentRequest.quantitativeScreening ?? {
        metrics: [],
        thresholds: []
      },
      qualitativeScreening: state.currentRequest.qualitativeScreening || {
        criteria: [],
        evaluation: []
      },
      assignment: state.currentRequest.assignment || {
        shortlistingProcess: [
          'Review each trainer lead against the defined attributes and criteria.',
          'Capture the results of the evaluation for each attribute.',
          'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
          'Create a shortlist of trainers who meet the defined criteria.'
        ],
        timeline: 'To be determined'
      },
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    return {
      requests: [...state.requests, newRequest],
      successMessage: 'Screening Request Submitted Successfully'
    };
  }),
  
  resetCurrentRequest: () => set({
    currentRequest: {
      attributes: {},
      quantitativeScreening: {
        metrics: [],
        thresholds: []
      },
      qualitativeScreening: {
        criteria: [],
        evaluation: []
      },
      assignment: {
        shortlistingProcess: [
          'Review each trainer lead against the defined attributes and criteria.',
          'Capture the results of the evaluation for each attribute.',
          'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
          'Create a shortlist of trainers who meet the defined criteria.'
        ],
        timeline: 'To be determined'
      }
    },
    currentTab: 'metrics-screening'
  }),
  
  setSuccessMessage: (message) => set({
    successMessage: message
  }),
  
  setCurrentTab: (tab) => set({
    currentTab: tab
  })
}));