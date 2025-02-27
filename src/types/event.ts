export interface Event {
    id: string;
    name: string;
    title: string;
    date: string;
    maxTeamSize: number;
    startDate: string;
    endDate: string;
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
    duration: number;
    image: string;
    rules: Array<{ id: string; eventId: string; rule: string } | string>;
    requirements: Array<{ id: string; eventId: string; requirement: string } | string>;
    coordinators: {
      name: string;
      role: string;
      phone: string;
    }[];
    whatsappLink: string;
  }