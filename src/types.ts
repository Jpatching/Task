export interface Connection {
  id: string;
  type: 'co-author' | 'workplace' | 'education' | 'referral' | 'mentor';
  description: string;
  strength: number; // 1-5, connection strength
  details: string[];
}

export interface HealthcareProfessional {
  id: string;
  name: string;
  specialty: string;
  education: string;
  workplaces: string[];
  experience: string;
  publications: string[];
  peersCount: number;
  followingCount: number;
  patientsServed: number;
  successRate: number;
  about: string;
  connections: Connection[];
  avatar?: string;
  position: {
    x: number;
    y: number;
  };
  yearsExperience: number;
  certifications: string[];
  researchAreas: string[];
}

export interface NetworkNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    professional: HealthcareProfessional;
    isSelected: boolean;
    onClick: (professional: HealthcareProfessional) => void;
  };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}