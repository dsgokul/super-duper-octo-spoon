// types.ts
export interface Trainer {
    trainerID: number;
    name: string;
    skill: string;
    tool: string;
    technology: string;
    city: string;
    state: string;
    country: string;
    source: string;
    prequalified: "Yes" | "No";
    trainerType: "Individual" | "Institute";
    ratings: number;
  }
  