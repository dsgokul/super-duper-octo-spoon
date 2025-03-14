// pages/LeadGeneration.tsx
import { useState, useEffect } from 'react';
import { useLeadGenerationStore, LeadRequest } from '../store/useLeadGenerationStore';
import CombinedForm from './components/LeadGeneration/CombinedForm';
import RequestList from './components/LeadGeneration/RequestList';
import LeadRequestDetail from './components/LeadRequestDetail';

// Steps in the workflow
type Step = 'request-list' | 'combined-form' | 'request-detail';

const LeadGeneration = () => {
  // Get store methods and data
  const { 
    requests, 
    currentRequest, 
    successMessage, 
    updateCurrentRequest, 
    addTargetAttribute, 
    removeTargetAttribute, 
    submitRequest, 
    resetCurrentRequest,
    setSuccessMessage
  } = useLeadGenerationStore();
  
  // Local state for form workflow
  const [step, setStep] = useState<Step>('request-list');
  
  // State to track the currently viewed request in detail view
  const [selectedRequest, setSelectedRequest] = useState<LeadRequest | null>(null);
  
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
  
  // Function to update information fields (objectives, strategies, notes)
  const handleUpdateInformation = (field: string, value: string[]) => {
    const currentInfo = currentRequest.information || {
      objectives: [],
      strategies: [],
      notes: []
    };
    
    updateCurrentRequest({
      information: {
        ...currentInfo,
        [field]: value
      }
    });
  };
  
  // Function to handle file upload
  const handleFileUpload = (file: File) => {
    updateCurrentRequest({
      additionalDetails: {
        ...currentRequest.additionalDetails,
        uploadedFile: file.name
      }
    });
  };
  
  // Function to handle new request button
  const handleNewRequest = () => {
    resetCurrentRequest();
    // Set some default values for the request
    updateCurrentRequest({
      title: "",
      description: "",
      assignTo: "",
      assignedBy: "Admin User",
      date: new Date().toISOString().split("T")[0],
      purpose: "",
      targetAttributes: {},
      information: {
        objectives: [
          'Build a database of 500 potential trainers.',
          'Gather information on trainer qualifications, expertise, and availability.',
          'Identify trainers with specific skill sets aligned with our anticipated training needs.'
        ],
        strategies: [
          'Try to source from the corporate trainer\'s communities.',
          'Potential channels - Source from LinkedIn and other trainer communities.',
          'Both individuals and institutes are okay.',
          'Check for high-level credibility of the trainer before including them in the leads.'
        ],
        notes: [
          'Please ensure that all lead-generation activities comply with relevant data privacy regulations.',
          'These leads are for a role-specific training, so Automotive Domain knowledge is important for the trainers to have.'
        ]
      },
      additionalDetails: {}
    });
    // Go to combined form
    setStep('combined-form');
  };
  
  // Function to handle form submission
  const handleSubmitForm = () => {
    // Submit the form
    submitRequest();
    setStep('request-list');
    // Clear form for next time
    resetCurrentRequest();
  };
  
  // Function to handle cancel button
  const handleCancel = () => {
    // Reset to initial state
    resetCurrentRequest();
    setStep('request-list');
  };
  
  // Function to view request details
  const handleViewRequestDetail = (request: LeadRequest) => {
    setSelectedRequest(request);
    setStep('request-detail');
  };
  
  // Function to go back to request list from detail view
  const handleBackToList = () => {
    setSelectedRequest(null);
    setStep('request-list');
  };
  
  // Render based on current step
  if (step === 'combined-form') {
    return (
      <CombinedForm
        // Initial form fields
        title={currentRequest.title}
        description={currentRequest.description}
        assignTo={currentRequest.assignTo}
        assignedBy={currentRequest.assignedBy}
        date={currentRequest.date}
        purpose={currentRequest.purpose}
        
        // Tab fields
        targetAttributes={currentRequest.targetAttributes || {}}
        information={currentRequest.information || { objectives: [], strategies: [], notes: [] }}
        additionalDetails={currentRequest.additionalDetails || {}}
        
        // Event handlers
        onUpdateField={handleUpdateField}
        onAddAttribute={addTargetAttribute}
        onRemoveAttribute={removeTargetAttribute}
        onUpdateInformation={handleUpdateInformation}
        onFileUpload={handleFileUpload}
        onSubmit={handleSubmitForm}
        onCancel={handleCancel}
      />
    );
  } else if (step === 'request-detail' && selectedRequest) {
    return (
      <LeadRequestDetail
        request={selectedRequest}
        onBackToList={handleBackToList}
      />
    );
  } else {
    return (
      <RequestList
        requests={requests}
        successMessage={successMessage}
        onDismissMessage={() => setSuccessMessage(null)}
        onNewRequest={handleNewRequest}
        onViewRequest={handleViewRequestDetail}
      />
    );
  }
};

export default LeadGeneration;