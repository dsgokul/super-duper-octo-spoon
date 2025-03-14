// store/useLeadGenerationStore.ts
import { create } from 'zustand';

export interface LeadRequest {
  id: string;
  title: string;
  description: string;
  assignTo: string;
  assignedBy: string;
  date: string;
  purpose: string;
  targetAttributes: {
    [key: string]: string;
  };
  information: {
    objectives: string[];
    strategies: string[];
    notes: string[];
  };
  additionalDetails: {
    uploadedFile?: string;
  };
}

interface LeadGenerationState {
  requests: LeadRequest[];
  currentRequest: Partial<LeadRequest>;
  successMessage: string | null;
  
  // Actions
  updateCurrentRequest: (data: Partial<LeadRequest>) => void;
  addTargetAttribute: (key: string, value: string) => void;
  removeTargetAttribute: (key: string) => void;
  submitRequest: () => void;
  resetCurrentRequest: () => void;
  setSuccessMessage: (message: string | null) => void;
}

// Generate a unique ID for each request
const generateId = () => `REQUEST_${Math.floor(Math.random() * 10000).toString().padStart(2, '0')}`;

export const useLeadGenerationStore = create<LeadGenerationState>((set) => ({
  requests: [
    {
      id: 'REQUEST 01',
      title: 'AI & ML Trainer Outreach',
      description: 'Seeking experienced trainers in AI and Machine Learning to support corporate upskilling programs. Focus on deep learning, NLP, and MLOps expertise.',
      assignTo: 'John Doe',
      assignedBy: 'Admin User',
      date: '2023-03-15',
      purpose: 'To find qualified AI trainers for upcoming corporate training sessions.',
      targetAttributes: {
        'Industry Domain': 'Data science, ML, MLOps, DevOps',
        'Size in case of Institute': '30 trainers',
        'Region': 'Asia-Pacific (APAC)',
        'Domain focus': 'Single / Multiple',
        'Specialization': 'Niche / Commoditized',
        'Orientation': 'Domain Centric, Technology Centric, Process Centric',
        'Targeted Learner Fraternity': 'Corporate Employees / Students / Individual Professionals / All',
        'Source Link': ''
      },
      information: {
        objectives: [
          'Build a database of 500 potential trainers.',
          'Gather information on trainer qualifications, expertise, and availability.',
          'Identify trainers with specific skill sets aligned with our anticipated training needs.'
        ],
        strategies: [
          'Try to source from the corporate trainer\'s communities.',
          'Scout out channels - Source from LinkedIn and other trainer communities.',
          'Run a two-stage qualification for trainers.',
          'Check for high-level credibility of the trainer before including them in the leads.'
        ],
        notes: [
          'Please ensure that all lead-generation activities comply with relevant data privacy regulations.',
          'These leads are for a role-specific training, so Automotive Domain knowledge is important for the trainers to have.'
        ]
      },
      additionalDetails: {}
    },
    {
      id: 'REQUEST 02',
      title: 'Embedded Systems Instructor Search',
      description: 'Identifying trainers specializing in embedded systems, RTOS, and microcontroller programming. Preference for professionals with hands-on industry experience.',
      assignTo: 'Jane Smith',
      assignedBy: 'Admin User',
      date: '2023-03-20',
      purpose: 'To build a pool of qualified embedded systems instructors for upcoming training programs.',
      targetAttributes: {
        'Industry Domain': 'Embedded programming, RTOS, Microcontrollers',
        'Size in case of Institute': '20 trainers',
        'Region': 'Global',
        'Domain focus': 'Single',
        'Specialization': 'Niche',
        'Orientation': 'Technology Centric',
        'Targeted Learner Fraternity': 'Corporate Employees / Students',
        'Source Link': ''
      },
      information: {
        objectives: [
          'Identify 50 trainers with hands-on embedded systems experience.',
          'Focus on trainers with industry background rather than just academic knowledge.',
          'Create a database of qualified instructors for future reference.'
        ],
        strategies: [
          'Target industry professionals with teaching experience.',
          'Look for trainers with certification in relevant embedded technologies.',
          'Prioritize trainers with experience in specific microcontroller platforms.'
        ],
        notes: [
          'Trainers should have practical project experience to share with students.',
          'Look for instructors who can design hands-on lab exercises.'
        ]
      },
      additionalDetails: {}
    }
  ],
  
  currentRequest: {
    targetAttributes: {},
    information: {
      objectives: [],
      strategies: [],
      notes: []
    },
    additionalDetails: {}
  },
  successMessage: null,
  
  updateCurrentRequest: (data) => set((state) => ({
    currentRequest: {
      ...state.currentRequest,
      ...data
    }
  })),
  
  addTargetAttribute: (key, value) => set((state) => ({
    currentRequest: {
      ...state.currentRequest,
      targetAttributes: {
        ...state.currentRequest.targetAttributes,
        [key]: value
      }
    }
  })),
  
  removeTargetAttribute: (key) => set((state) => {
    const updatedAttributes = { ...state.currentRequest.targetAttributes };
    delete updatedAttributes[key];
    
    return {
      currentRequest: {
        ...state.currentRequest,
        targetAttributes: updatedAttributes
      }
    };
  }),
  
  submitRequest: () => set((state) => {
    const newRequest: LeadRequest = {
      id: generateId(),
      title: state.currentRequest.title || 'Untitled Request',
      description: state.currentRequest.description || '',
      assignTo: state.currentRequest.assignTo || '',
      assignedBy: state.currentRequest.assignedBy || 'Admin User',
      date: state.currentRequest.date || new Date().toISOString().split('T')[0],
      purpose: state.currentRequest.purpose || '',
      targetAttributes: state.currentRequest.targetAttributes || {},
      information: state.currentRequest.information || {
        objectives: [],
        strategies: [],
        notes: []
      },
      additionalDetails: state.currentRequest.additionalDetails || {}
    };
    
    return {
      requests: [...state.requests, newRequest],
      successMessage: 'Lead Generation Request Submitted Successfully'
    };
  }),
  
  resetCurrentRequest: () => set({
    currentRequest: {
      targetAttributes: {},
      information: {
        objectives: [],
        strategies: [],
        notes: []
      },
      additionalDetails: {}
    }
  }),
  
  setSuccessMessage: (message) => set({
    successMessage: message
  })
}));