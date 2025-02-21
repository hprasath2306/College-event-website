import { EventDetailsType } from "../types/event";
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

  export const eventsData: EventDetailsType[] = [
    {
      id: 'oops-fix-it',
      title: '',
      date: '2025-03-15',
      time: '90 Minutes',
      venue: 'TBA',
      image: OopsBanner,
      description: 'It is a solo debugging competition with three rounds.Participants identify, fix, and optimize buggy code under time constraints. ',
      rules: [
        'Teams must consist of exactly 4 members',
        'All code must be written during the hackathon',
        'Use of open-source libraries is allowed',
        'Projects must be original work',
        'Final submission must include source code and documentation',
        'Use of open-source libraries is allowed',
        'Projects must be original work',
        'Final submission must include source code and documentation',
        'Use of open-source libraries is allowed',
        'Projects must be original work',
        'Final submission must include source code and documentation',
        
      ],
      requirements: ['Laptop with required development tools', 'Valid college ID', 'Power adapters'],
      
      coordinators: [
        { name: 'John Doe', role: 'Technical Head', phone: '9944645980' },
        { name: 'Jane Smith', role: 'Event Coordinator', phone: '9876543211' },
      ],
    },
  ];

  export const events = [
    {
      "id": "oops-fix-it",
      "title": "Oops! Fix It",
      "description": "This coding competition challenges participants to identify and fix bugs in various programming tasks across multiple rounds. Teams will demonstrate their debugging skills and coding efficiency to become the Bug Busters Champion.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-15",
      "image": OopsBanner
    },
    {
      "id": "code-free",
      "title": "Code Free",
      "description": "This unique competition challenges participants to solve problems without writing any code. Teams will explain their solutions using words, pseudocode, or diagrams, emphasizing clarity and creativity.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-17",
      "image": CodeFreeBanner
    },
    {
      "id": "logical-baton",
      "title": "Logical Baton",
      "description": "This collaborative coding competition requires teams to work sequentially on a program, with each member responsible for a specific part. Teams must ensure their final program compiles and runs correctly, emphasizing teamwork.",
      "duration": "35 Minutes",
      "teamSize": "Exactly 3 members (no substitutions allowed)",
      "category": "technical",
      "date": "2025-03-18",
      "image": LogicalBatonBanner
    },
    {
      "id": "pitch-perfect",
      "title": "Pitch Perfect",
      "description": "This competition challenges teams to present innovative ideas and defend them in a Q&A session. Teams will showcase their creativity, feasibility, and impact through structured presentations and articulate responses to judges.",
      "duration": "17 Minutes",
      "teamSize": "1 to 3 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-19",
      "image": PitchPerfectBanner
    },
    {
      "id": "code-dejavu",
      "title": "Code Dejavu",
      "description": "This unique competition challenges participants to solve problems without writing any code. Teams will explain their solutions using words, pseudocode, or diagrams, emphasizing clarity and creativity.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-20",
      "image": DejavuBanner
    },
    {
      "id": "design-under-pressure",
      "title": "Design Under Pressure",
      "description": "A design competition where teams of two work under time pressure to create a poster with an open theme. Every 20 minutes, a new hindrance or element will be added, testing creativity which leads to a better design.",
      "duration": "60 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-22",
      "image": DesignUnderPressureBanner
    },
    {
      "id": "bite-bidders",
      "title": "Bite Bidders",
      "description": "A competitive event where teams of two participate in a tech quiz and a coding bidding challenge. Teams will test their technical knowledge and coding skills to become the BITE BIDDERS CHAMPIONS!",
      "duration": "40 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-23",
      "image": BiteBiddersBanner
    },
    {
      "id": "code-with-comali",
      "title": "Code with Comali",
      "description": "A unique coding competition where teams of two work together, with one member guiding the other in solving coding problems and recreating designs. Effective communication and teamwork are essential for success.",
      "duration": "35 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "technical",
      "date": "2025-03-24",
      "image": CodeWithComaliBanner
    },
    {
      "id": "mini-marvels",
      "title": "MINI MARVELS",
      "description": "This fireless cooking competition celebrates the artistic presentation of miniature dishes. Teams will transform raw, edible ingredients into visually stunning, bite-sized creations, showcasing their culinary artistry.",
      "duration": "1 Hour",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "category": "non-technical",
      "date": "2025-03-25",
      "image": FlameLessBanner
    },
    {
      "id": "digital-dynamo",
      "title": "DIGITAL DYNAMO",
      "description": "A fun quiz competition focusing on general tech knowledge, computer science basics, famous personalities, trends, and innovations. Teams will compete in multiple rounds to showcase their knowledge and skills.",
      "duration": "Variable (2 Rounds)",
      "teamSize": "2 to 3 members per team",
      "category": "non-technical",
      "date": "2025-03-26",
      "image": DigitalDynamoBanner
    },
    {
      "id": "tech-pictionary",
      "title": "TECH PICTIONARY",
      "description": "A fun and interactive game where players draw technical terms while their team guesses the term within a time limit. Teams will showcase their creativity and knowledge of tech vocabulary and trends.",
      "duration": "Variable (3 Rounds)",
      "teamSize": "3 to 6 players per team",
      "category": "non-technical",
      "date": "2025-03-27",
      "image": TechPictionaryBanner
    },
    {
      "id": "ipl-auction",
      "title": "IPL Auction",
      "description": "A competitive event where teams participate in an IPL trivia quiz followed by a player auction. Teams will build their rosters based on trivia performance and strategic bidding to create the strongest lineup.",
      "duration": "Variable (2 Rounds)",
      "teamSize": "3 players per team",
      "category": "non-technical",
      "date": "2025-03-28",
      "image": IplAuctionBanner
    },
    {
      "id": "clipcraft",
      "title": "CLIPCRAFT",
      "description": "An exciting event where participants create short reel-like video clips (1-2 minutes) that convey interesting concepts related to technology, college life, or social themes. The best reel will be selected based on creativity, clarity, and audience.",
      "duration": "1-2 Minutes",
      "teamSize": "Individual participation 3 members",
      "category": "non-technical",
      "date": "2025-03-29",
      "image": ClipcraftBanner
    },
    {
      "id": "escape-room",
      "title": "ESCAPE ROOM",
      "description": "A mystery-based puzzle-solving game where teams solve a series of clues, riddles, and challenges to 'escape' from the room within a given time limit. Teams will participate in a tabletop escape challenge, solving puzzles.",
      "duration": "TBD",
      "teamSize": "2 members per team",
      "category": "non-technical",
      "date": "2025-03-30",
      "image": EscapeRoomBanner
    }
  ]