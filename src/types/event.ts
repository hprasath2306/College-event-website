export interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    duration: string;
    teamSize: string;
    category?: string | undefined;
  }

  export interface EventDetailsType {
    id: string;
    name: string;
    description: string;
    venue: string;
    category: 'TECHNICAL' | 'NON_TECHNICAL';
    type: 'SINGLE' | 'TEAM';
    startDate: string;
    endDate: string;
    isTeamEvent: boolean;
    maxTeamSize?: number;
    rules: Array<{ id: string; eventId: string; rule: string } | string>;
    requirements: Array<{ id: string; eventId: string; requirement: string } | string>;
    coordinators: {
      name: string;
      role: string;
      phone: string;
    }[];
    image: string;
  }