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
    title: string;
    date: string;
    time: string;
    venue: string;
    description: string;
    image: string;
    rules: string[];
    requirements: string[];
    coordinators: {
      name: string;
      role: string;
      phone: string;
    }[];
  }