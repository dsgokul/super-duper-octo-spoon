import { ScreeningRequest } from "../../store/useScreeningRequestStore";

export interface ScreeningRequestListProps {
  requests: ScreeningRequest[];
  successMessage: string | null;
  onDismissMessage: () => void;
  onCreateRequest: () => void;
  onViewRequest: (request: ScreeningRequest) => void;
} 