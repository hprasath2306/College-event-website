// src/types/event.ts
export interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    duration: string;
    teamSize: string;
    prize: string;
    category?: string | undefined;
  }