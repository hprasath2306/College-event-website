import OopsBanner from '../assets/oops-banner.svg'
import DejavuBanner from '../assets/dejavu-banner.svg'
import CodeFreeBanner from '../assets/code-free-banner.svg'
import LogicalBatonBanner from '../assets/logical-baton-banner.svg'
import PitchPerfectBanner from '../assets/pitch-perfect-banner.svg'
import DesignUnderPressureBanner from '../assets/design-pressure-banner.svg'
import BiteBiddersBanner from '../assets/bite-bidders-banner.svg'
import CodeWithComaliBanner from '../assets/code-comali-banner.svg'
import FlameLessBanner from '../assets/flameless-feast-banner.svg'
import EscapeRoomBanner from '../assets/escape-room-banner.svg'
import DigitalDynamoBanner from '../assets/digital-dynamo-banner.svg'
import TechPictionaryBanner from '../assets/tech-pictionary-banner.svg'
import IplAuctionBanner from '../assets/ipl-auction-banner.svg'
import ClipcraftBanner from '../assets/clip-craft-banner.svg'
import axios from "axios";

export const Aevents = [
  "Oops! Fix It",
  "Code Dejavu",
  "Code Free",
  "Logical Baton",
  "Pitch Perfect",
  "Design Under Pressure",
  "Bite Bidders",
  "Code with Comali",
  "Flame free Feast",
  "Digital Dynamo",
  "Escape Room",
  "Tech Pictionary",
  "IPL Auction",
  "Clip Craft"
]

export const eventsData: any[] = [
  {
    id: 'oops-fix-it',
    name: 'Oops! Fix It',
    startDate: '2025-03-15',
    endDate: '2025-03-15',
    type: 'SINGLE',
    category: 'TECHNICAL',
    isTeamEvent: false,
    maxTeamSize: 1,
    venue: 'TBA',
    image: OopsBanner,
    description: 'A solo debugging competition where participants identify, fix, and optimize buggy code under time constraints across three rounds.',
    rules: [
      'Individual participation only.',
      'Participants must fix and optimize code within the given time limit.',
      'Code must be written on-site.',
      'Judging will be based on correctness, efficiency, and optimization.',
    ],
    requirements: ['Laptop with required development tools', 'Valid college ID', 'Power adapters'],
    coordinators: [
      { name: 'John Doe', role: 'Technical Head', phone: '9944645980' },
      { name: 'Jane Smith', role: 'Event Coordinator', phone: '9876543211' },
    ],
  },
  {
    id: 'code-dejavu',
    name: 'Code Dejavu',
    startDate: '2025-03-20',
    endDate: '2025-03-20',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: DejavuBanner,
    description: 'A team-based coding competition with unique constraints such as no loops or using a single variable, emphasizing creativity and efficiency.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Each round will introduce a new coding constraint.',
      'Code must be written during the event.',
      'Judging will be based on correctness, adherence to constraints, and efficiency.',
    ],
    requirements: ['Laptop with required development tools', 'Valid college ID'],
    coordinators: [
      { name: 'Emily Brown', role: 'Technical Lead', phone: '9988776655' },
      { name: 'Michael Johnson', role: 'Event Coordinator', phone: '9123456789' },
    ],
  },
  {
    id: 'pitch-perfect',
    name: 'Pitch Perfect',
    startDate: '2025-03-19',
    endDate: '2025-03-19',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 3,
    venue: 'TBA',
    image: PitchPerfectBanner,
    description: 'A team-based idea pitching competition where teams present and defend innovative tech solutions, followed by a Q&A round.',
    rules: [
      'Teams must consist of exactly 3 members.',
      'Each pitch must be structured and address problem-solving, technology, and impact.',
      'Judging will be based on clarity, innovation, feasibility, and presentation skills.',
    ],
    requirements: ['Presentation slides (if applicable)', 'Valid college ID'],
    coordinators: [
      { name: 'Sarah Lee', role: 'Event Lead', phone: '9876123456' },
      { name: 'David White', role: 'Technical Advisor', phone: '9198765432' },
    ],
  },
  {
    id: 'escape-room',
    name: 'Escape Room',
    startDate: '2025-03-30',
    endDate: '2025-03-30',
    type: 'TEAM',
    category: 'NON_TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: EscapeRoomBanner,
    description: 'A puzzle-solving competition where teams solve clues and challenges to escape within a time limit.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Participants must solve all puzzles to "escape" within the given time.',
      'No use of mobile phones or external help allowed.',
    ],
    requirements: ['Valid college ID'],
    coordinators: [
      { name: 'Rachel Green', role: 'Event Organizer', phone: '9234567890' },
      { name: 'Ross Geller', role: 'Puzzle Designer', phone: '9123456788' },
    ],
  },
  {
    id: 'logical-baton',
    name: 'Logical Baton',
    startDate: '2025-03-18',
    endDate: '2025-03-18',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 3,
    venue: 'TBA',
    image: LogicalBatonBanner,
    description: 'A team-based coding relay competition where teams work sequentially, with each member handling a specific part of the program: declarations, core logic, and final output.',
    rules: [
      'Teams must consist of exactly 3 members.',
      'Each member works on a specific section of the program.',
      'Judging will be based on accuracy, teamwork, and efficiency.',
    ],
    requirements: ['Laptop with required development tools', 'Valid college ID'],
    coordinators: [
      { name: 'Tom Hardy', role: 'Event Lead', phone: '9876543210' },
      { name: 'Emma Watson', role: 'Technical Coordinator', phone: '9998887776' },
    ],
  },
  {
    id: 'flame-free-feast',
    name: 'Flame Free Feast',
    startDate: '2025-03-25',
    endDate: '2025-03-25',
    type: 'TEAM',
    category: 'NON_TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 4,
    venue: 'TBA',
    image: FlameLessBanner,
    description: 'A cooking competition where teams create miniature, visually appealing dishes using raw, edible ingredients.',
    rules: [
      'Teams must consist of exactly 4 members.',
      'Dishes must be prepared without using fire.',
      'Judging will be based on visual appeal, creativity, and taste.',
    ],
    requirements: ['Raw ingredients', 'Valid college ID'],
    coordinators: [
      { name: 'Gordon Ramsay', role: 'Event Judge', phone: '9876543212' },
      { name: 'Jamie Oliver', role: 'Event Coordinator', phone: '9234567891' },
    ],
  },
  {
    id: 'digital-dynamo',
    name: 'DIGITAL DYNAMO',
    startDate: '2025-03-26',
    endDate: '2025-03-26',
    type: 'TEAM',
    category: 'NON_TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 3,
    venue: 'TBA',
    image: DigitalDynamoBanner,
    description: 'A fun quiz competition focusing on tech knowledge, computer science basics, and innovations. Includes multiple rounds like MCQs and rapid-fire.',
    rules: [
      'Teams must consist of 2 to 3 members.',
      'Round 1: Multiple choice questions on tech topics.',
      'Round 2: Visual questions, tech trivia, and rapid-fire rounds.',
    ],
    requirements: ['Laptop with internet access', 'Valid college ID'],
    coordinators: [
      { name: 'Bill Gates', role: 'Event Host', phone: '9123456780' },
      { name: 'Elon Musk', role: 'Event Lead', phone: '9876543213' },
    ],
  },
  {
    id: 'tech-pictionary',
    name: 'TECH PICTIONARY',
    startDate: '2025-03-27',
    endDate: '2025-03-27',
    type: 'TEAM',
    category: 'NON_TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: TechPictionaryBanner,
    description: 'A team-based drawing and guessing game where teams draw technical terms for others to guess, with easy, intermediate, and rapid-fire rounds.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Judging will be based on the speed of correct guesses.',
    ],
    requirements: ['Laptop with drawing tools', 'Valid college ID'],
    coordinators: [
      { name: 'Martha Stewart', role: 'Event Manager', phone: '9765432100' },
      { name: 'Simon Cowell', role: 'Event Host', phone: '9456789098' },
    ],
  },
  {
    id: 'ipl-auction',
    name: 'IPL Auction',
    startDate: '2025-03-28',
    endDate: '2025-03-28',
    type: 'TEAM',
    category: 'NON_TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 3,
    venue: 'TBA',
    image: IplAuctionBanner,
    description: 'A team-based competition where teams first answer IPL trivia questions and then build a roster in a live auction, using a fixed budget to bid for players.',
    rules: [
      'Teams must consist of exactly 3 members.',
      'First round: IPL trivia quiz.',
      'Second round: Live player auction based on trivia performance.',
    ],
    requirements: ['Laptop with internet access', 'Valid college ID'],
    coordinators: [
      { name: 'Shane Warne', role: 'Event Coordinator', phone: '9876543214' },
      { name: 'Chris Gayle', role: 'Event Host', phone: '9123456785' },
    ],
  },
  {
    id: 'clipcraft',
    name: 'CLIPCRAFT',
    startDate: '2025-03-29',
    endDate: '2025-03-29',
    type: 'SINGLE',
    category: 'NON_TECHNICAL',
    isTeamEvent: false,
    maxTeamSize: 1,
    venue: 'TBA',
    image: ClipcraftBanner,
    description: 'A solo event where participants create 1-2 minute video clips on technology, college life, or social themes, showcasing creativity and engagement.',
    rules: [
      'Individual participation only.',
      'Videos must be original and clear.',
      'Judging will be based on creativity and clarity.',
    ],
    requirements: ['Smartphone or camera for video recording', 'Valid college ID'],
    coordinators: [
      { name: 'Steven Spielberg', role: 'Event Judge', phone: '9245678901' },
      { name: 'Martin Scorsese', role: 'Event Coordinator', phone: '9234567890' },
    ],
  },
  {
    id: 'code-free',
    name: 'Code Free',
    startDate: '2025-03-17',
    endDate: '2025-03-17',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: CodeFreeBanner,
    description: 'A team-based competition where participants solve problems without writing actual code, using pseudocode or flowcharts to analyze and solve real-world problems.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Participants must analyze code and create pseudocode or flowcharts.',
      'Judging will be based on problem-solving, creativity, and clarity.',
    ],
    requirements: ['Laptop with required tools', 'Valid college ID'],
    coordinators: [
      { name: 'Alice Cooper', role: 'Event Lead', phone: '9876543217' },
      { name: 'John Cena', role: 'Event Coordinator', phone: '9132456789' },
    ],
  },
  {
    id: 'design-under-pressure',
    name: 'Design Under Pressure',
    startDate: '2025-03-22',
    endDate: '2025-03-22',
    type: 'SINGLE',
    category: 'TECHNICAL',
    isTeamEvent: false,
    maxTeamSize: 1,
    venue: 'TBA',
    image: DesignUnderPressureBanner,
    description: 'A solo design challenge where participants create a poster using Figma or Adobe XD, adapting to unexpected design constraints every 20 minutes.',
    rules: [
      'Individual participation only.',
      'Participants will face new constraints every 20 minutes.',
      'Judging will be based on creativity, adherence to constraints, and design aesthetics.',
    ],
    requirements: ['Laptop with Figma or Adobe XD', 'Valid college ID'],
    coordinators: [
      { name: 'Steve Jobs', role: 'Design Expert', phone: '9356789013' },
      { name: 'Bill Gates', role: 'Event Coordinator', phone: '9123456783' },
    ],
  },
  {
    id: 'bite-bidders',
    name: 'Bite Bidders',
    startDate: '2025-03-23',
    endDate: '2025-03-23',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: BiteBiddersBanner,
    description: 'A team-based competition where participants take a tech quiz and bid on coding challenges, with the highest-scoring team winning.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Round 1: Tech quiz to accumulate points.',
      'Round 2: Use quiz points to bid on coding problems.',
    ],
    requirements: ['Laptop with internet access', 'Valid college ID'],
    coordinators: [
      { name: 'Mark Zuckerberg', role: 'Event Host', phone: '9432112345' },
      { name: 'Elon Musk', role: 'Event Coordinator', phone: '9876543210' },
    ],
  },
  {
    id: 'code-with-comali',
    name: 'Code with Comali',
    startDate: '2025-03-24',
    endDate: '2025-03-24',
    type: 'TEAM',
    category: 'TECHNICAL',
    isTeamEvent: true,
    maxTeamSize: 2,
    venue: 'TBA',
    image: CodeWithComaliBanner,
    description: 'A team-based coding and design challenge where one team member explains a coding problem while the other writes the code, followed by a design task.',
    rules: [
      'Teams must consist of exactly 2 members.',
      'Round 1: Comali explains a coding problem while Coder writes the code.',
      'Round 2: Coder explains a design, while Comali recreates it.',
      'Judging will be based on communication, accuracy, and efficiency.',
    ],
    requirements: ['Laptop with coding tools', 'Valid college ID'],
    coordinators: [
      { name: 'Chris Pratt', role: 'Event Coordinator', phone: '9123456780' },
      { name: 'Benedict Cumberbatch', role: 'Technical Advisor', phone: '9245678901' },
    ],
  }
];

export const fetchEventsDetails = async () => {
  const response = await axios.get('https://symposium-api-production.up.railway.app/api/events');
  return (response.data);
}

export const events = [
  {
    "id": "oops-fix-it",
    "title": "Oops! Fix It",
    "description": "A solo debugging competition where participants identify, fix, and optimize buggy code under time constraints across three rounds. The event is open to all students of any branch and year.",
    "duration": "90 Minutes",
    "teamSize": "1 member",
    "category": "technical",
    "date": "2025-03-15",
    "image": OopsBanner
  },
  {
    "id": "code-free",
    "title": "Code Free",
    "description": "A team-based competition where participants solve problems without writing actual code, using pseudocode or flowcharts to analyze and solve real-world problems.",
    "duration": "90 Minutes",
    "teamSize": "2 members",
    "category": "technical",
    "date": "2025-03-17",
    "image": CodeFreeBanner
  },
  {
    "id": "logical-baton",
    "title": "Logical Baton",
    "description": "A team-based coding relay competition where teams work sequentially, with each member handling a specific part of the program: declarations, core logic, and final output.",
    "duration": "35 Minutes",
    "teamSize": "3 members",
    "category": "technical",
    "date": "2025-03-18",
    "image": LogicalBatonBanner
  },
  {
    "id": "pitch-perfect",
    "title": "Pitch Perfect",
    "description": "A team-based idea pitching competition where teams present and defend innovative tech solutions, followed by a Q&A to justify feasibility and scalability.",
    "duration": "17 Minutes",
    "teamSize": "3 members",
    "category": "technical",
    "date": "2025-03-19",
    "image": PitchPerfectBanner
  },
  {
    "id": "code-dejavu",
    "title": "Code Dejavu",
    "description": "A team-based competition where participants solve coding problems with unique constraints such as no loops or using a single variable, focusing on creativity and efficiency.",
    "duration": "90 Minutes",
    "teamSize": "2 members",
    "category": "technical",
    "date": "2025-03-20",
    "image": DejavuBanner
  },
  {
    "id": "design-under-pressure",
    "title": "Design Under Pressure",
    "description": "A solo design challenge where participants create a poster using Figma or Adobe XD, adapting to unexpected design constraints every 20 minutes focusing on creativity and time management.",
    "duration": "60 Minutes",
    "teamSize": "1 member",
    "category": "technical",
    "date": "2025-03-22",
    "image": DesignUnderPressureBanner
  },
  {
    "id": "bite-bidders",
    "title": "Bite Bidders",
    "description": "A team-based competition where participants take a tech quiz and bid on coding challenges, with the highest-scoring team winning. The event is open to all students of CSE branch.",
    "duration": "40 Minutes",
    "teamSize": "2 members",
    "category": "technical",
    "date": "2025-03-23",
    "image": BiteBiddersBanner
  },
  {
    "id": "code-with-comali",
    "title": "Code with Comali",
    "description": "A team-based coding and design challenge where one team member explains a coding problem while the other writes the code, followed by a design task.",
    "duration": "35 Minutes",
    "teamSize": "2 members",
    "category": "technical",
    "date": "2025-03-24",
    "image": CodeWithComaliBanner
  },
  {
    "id": "flame-free-feast",
    "title": "Flame Free Feast",
    "description": "A fireless cooking competition where teams create miniature, visually appealing dishes using raw, edible ingredients within a 1-hour limit. The event is open to all students of CSE branch.",
    "duration": "1 Hour",
    "teamSize": "1 to 2 members",
    "category": "non-technical",
    "date": "2025-03-25",
    "image": FlameLessBanner
  },
  {
    "id": "digital-dynamo",
    "title": "DIGITAL DYNAMO",
    "description": "A quiz competition where teams test their knowledge on tech, computer science, famous personalities, and innovations through MCQs, visual questions, and rapid-fire rounds.",
    "duration": "Variable (2 Rounds)",
    "teamSize": "2 to 3 members",
    "category": "non-technical",
    "date": "2025-03-26",
    "image": DigitalDynamoBanner
  },
  {
    "id": "tech-pictionary",
    "title": "TECH PICTIONARY",
    "description": "A drawing and guessing game where teams draw technical terms for others to guess, with easy, intermediate, and rapid-fire rounds. The event is open to all students of CSE branch.",
    "duration": "Variable (3 Rounds)",
    "teamSize": "2 members",
    "category": "non-technical",
    "date": "2025-03-27",
    "image": TechPictionaryBanner
  },
  {
    "id": "ipl-auction",
    "title": "IPL Auction",
    "description": "A team-based competition where teams first answer IPL trivia questions and then build a roster in a live auction, using a fixed budget to bid for players.",
    "duration": "Variable (2 Rounds)",
    "teamSize": "3 members",
    "category": "non-technical",
    "date": "2025-03-28",
    "image": IplAuctionBanner
  },
  {
    "id": "clipcraft",
    "title": "CLIPCRAFT",
    "description": "A solo event where participants create 1-2 minute video clips on technology, college life, or social themes, with the best videos judged on creativity and engagement.",
    "duration": "1-2 Minutes",
    "teamSize": "1 member",
    "category": "non-technical",
    "date": "2025-03-29",
    "image": ClipcraftBanner
  },
  {
    "id": "escape-room",
    "title": "ESCAPE ROOM",
    "description": "A puzzle-solving competition where teams solve clues and challenges to escape within a time limit, with the fastest team to complete the puzzles winning.",
    "duration": "TBD",
    "teamSize": "2 members",
    "category": "non-technical",
    "date": "2025-03-30",
    "image": EscapeRoomBanner
  }
];
