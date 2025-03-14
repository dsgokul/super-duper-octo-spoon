// pages/ScreeningRequest.tsx
import {  useEffect } from 'react';
import { useScreeningRequestStore, ScreeningRequest } from '../store/useScreeningRequestStore';
import CombinedScreeningForm from './components/ScreeningRequest/CombinedScreeningForm';
import ScreeningRequestList from './components/ScreeningRequest/ScreeningRequestList';
import ScreeningRequestDetail from './components/ScreeningRequest/ScreeningRequestDetail';
import useScreenNavigatingStore from '../store/useScreenNavigatingStore';
// Steps in the workflow

const ScreeningRequestPage = () => {
  // Get store methods and data
  const { 
    requests, 
    currentRequest, 
    successMessage, 
    updateCurrentRequest, 
    addAttribute, 
    removeAttribute, 
    submitRequest, 
    resetCurrentRequest,
    setSuccessMessage
  } = useScreeningRequestStore();
  
  // Local state for form workflow
 /*  const [step, setStep] = useState<Step>('request-list');
  
  // State to track the currently viewed request in detail view
  const [selectedRequest, setSelectedRequest] = useState<ScreeningRequest | null>(null);
  
  */
  const { step, setStep, selectedRequest, setSelectedRequest } = useScreenNavigatingStore();
 
 
  // Reset message when navigating
  useEffect(() => {
    if (step === 'request-list' && successMessage) {
      // Clear success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [step, successMessage, setSuccessMessage]);
  
  // Function to handle field updates
  const handleUpdateField = (field: string, value: string) => {
    updateCurrentRequest({ [field]: value });
  };
  
  // Function to update quantitative screening fields
  const handleUpdateQuantitative = (field: string, value: string[]) => {
    const current = currentRequest.quantitativeScreening || {
      metrics: [],
      thresholds: []
    };
    
    updateCurrentRequest({
      quantitativeScreening: {
        ...current,
        [field]: value
      }
    });
  };
  
  // Function to update qualitative screening fields
  const handleUpdateQualitative = (field: string, value: string[]) => {
    const current = currentRequest.qualitativeScreening || {
      criteria: [],
      evaluation: []
    };
    
    updateCurrentRequest({
      qualitativeScreening: {
        ...current,
        [field]: value
      }
    });
  };
  
  // Function to update assignment fields
  const handleUpdateAssignment = (field: string, value: any) => {
    const current = currentRequest.assignment || {
      shortlistingProcess: [
        'Review each trainer lead against the defined attributes and criteria.',
        'Capture the results of the evaluation for each attribute.',
        'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
        'Create a shortlist of trainers who meet the defined criteria.'
      ],
      timeline: 'To be determined'
    };
    
    updateCurrentRequest({
      assignment: {
        ...current,
        [field]: value
      }
    });
  };
  
  // Function to handle new request button
  const handleCreateRequest = () => {
    resetCurrentRequest();
    // Set default values
    updateCurrentRequest({
      title: '',
      description: '',
      purpose: '',
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
    });
    setStep('create-form');
  };
  
  // Function to handle form submission
  const handleSubmitForm = () => {
    submitRequest();
    setStep('request-list');
    resetCurrentRequest();
  };
  
  // Function to handle cancel button
  const handleCancel = () => {
    resetCurrentRequest();
    setStep('request-list');
  };
  
  // Function to view request details
  const handleViewRequest = (request: ScreeningRequest) => {
    setSelectedRequest(request);
    setStep('request-detail');
  };
  
  // Function to go back to request list
  const handleBackToList = () => {
    setSelectedRequest(null);
    setStep('request-list');
  };
  
  // Render based on current step
  if (step === 'create-form') {
    return (
      <CombinedScreeningForm
        // Initial form fields
        title={currentRequest.title}
        description={currentRequest.description}
        purpose={currentRequest.purpose}
        
        // Tab fields
        attributes={currentRequest.attributes || {}}
        quantitativeScreening={currentRequest.quantitativeScreening || { metrics: [], thresholds: [] }}
        qualitativeScreening={currentRequest.qualitativeScreening || { criteria: [], evaluation: [] }}
        assignment={currentRequest.assignment || { 
          shortlistingProcess: [
            'Review each trainer lead against the defined attributes and criteria.',
            'Capture the results of the evaluation for each attribute.',
            'Filter out trainers who do not meet the minimum threshold for all or key attributes.',
            'Create a shortlist of trainers who meet the defined criteria.'
          ],
          timeline: 'To be determined'
        }}
        
        // Event handlers
        onUpdateField={handleUpdateField}
        onAddAttribute={addAttribute}
        onRemoveAttribute={removeAttribute}
        onUpdateQuantitative={handleUpdateQuantitative}
        onUpdateQualitative={handleUpdateQualitative}
        onUpdateAssignment={handleUpdateAssignment}
        onSubmit={handleSubmitForm}
        onCancel={handleCancel}
      />
    );
  } else if (step === 'request-detail' && selectedRequest) {
    return (
      <ScreeningRequestDetail
        request={selectedRequest}
        onBack={handleBackToList}
      />
    );
  } else {
    return (
      <ScreeningRequestList
        requests={requests}
        successMessage={successMessage}
        onDismissMessage={() => setSuccessMessage(null)}
        onCreateRequest={handleCreateRequest}
        onViewRequest={handleViewRequest}
      />
    );
  }
};

export default ScreeningRequestPage;