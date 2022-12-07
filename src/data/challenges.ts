import ampForecourt from '../assets/photos/amp-forecourt.png'
import blighBarneyReserve from '../assets/photos/bligh-barney-reserve.png'
import firstFleetPark from '../assets/photos/first-fleet-park.png'
import foundationPark from '../assets/photos/foundation-park.png'
import justiceAndPoliceMuseum from '../assets/photos/justice-and-police-museum.png'
import mcaCafe from '../assets/photos/mca-cafe.png'
import mcaForecourt from '../assets/photos/mca-forecourt.png'
import mca from '../assets/photos/mca.png'
import memoryIsCreationWithoutEnd from '../assets/photos/memory-is-creation-without-end.png'
import messina from '../assets/photos/messina.png'
import observatoryHill from '../assets/photos/observatory-hill.png'
import rocksMarket from '../assets/photos/rocks-market.png'
import susannahPlace from '../assets/photos/susannah-place.png'
import argyle from '../assets/photos/argyle.png'
import bridge from '../assets/photos/bridge.png'

export type State = 'locked' | 'unlocked' | 'done'
export const challengeOrder: State[] = ['unlocked', 'locked', 'done']

export type Challenge = {
  id: string
  location?: {
    coords: [number, number]
    name: string
    link: string
    photo: string
  }
  name: string
  description: string
  points: number | null
  scoring: 'photo' | 'video' | 'answer' | 'manned'
}

export const challenges: Record<string, Challenge> = {
  /** Local */
  convict: {
    id: 'convict',
    location: {
      coords: [-33.85783831563544, 151.20870355471794],
      name: 'The Rocks Market',
      link: 'https://goo.gl/maps/FVpLztKbFBBJBgZA8',
      photo: rocksMarket,
    },
    name: 'Early settlers',
    description:
      'Find the sandy trio and show us your best impression of a weary convict.',
    points: 1,
    scoring: 'photo',
  },
  tower: {
    id: 'tower',
    location: {
      coords: [-33.85913981928262, 151.20921873974578],
      name: 'Bligh & Barney Reserve',
      link: 'https://goo.gl/maps/XQ4B4bVstaUZZFb39',
      photo: blighBarneyReserve,
    },
    name: 'Faulty towers',
    description: `
Build a spaghetti tower in 5 minutes.
      
Earn 1 point for each achievement:
- it stands up for at least 10 seconds
- is at least 3 spaghettis tall

Highest tower gets bonus points.`,
    points: 2,
    scoring: 'manned',
  },
  house: {
    id: 'house',
    location: {
      coords: [-33.85829707395864, 151.20801120391684],
      name: 'Foundation Park',
      link: 'https://goo.gl/maps/r9DiHFKWTmpUKztd7',
      photo: foundationPark,
    },
    name: 'House call',
    description: `
Three tasks:
1. What items are on the dresser?
2. Take a team photo by the fire.
3. Take a photo of the creepiest room you can find. Creepiest photo gets bonus points.`,
    points: 1,
    scoring: 'photo',
  },
  icecream: {
    id: 'icecream',
    location: {
      coords: [-33.86175629580389, 151.20973598544367],
      name: 'Messina',
      link: 'https://goo.gl/maps/qUxEdetmivejGz1G8',
      photo: messina,
    },
    name: 'Enjoy a free ice cream',
    description:
      'The hardest challenge of all. Enjoy a free ice cream or drink on us! Check your kit for the $$',
    points: 1,
    scoring: 'photo',
  },
  jump: {
    id: 'jump',
    location: {
      coords: [-33.859130348828415, 151.20498740923128],
      name: 'Observatory Hill',
      link: 'https://goo.gl/maps/Skt5w7hHj382N3zv5',
      photo: observatoryHill,
    },
    name: 'Space Jam',
    description:
      'Jump higher than Jordan and shoot for the stars! Get a team pic of everyone airborne. No points if anyone is touching the ground.',
    points: 3,
    scoring: 'photo',
  },
  copycat: {
    id: 'copycat',
    location: {
      coords: [-33.85992717236538, 151.20902509839397],
      name: 'Museum of Contemporary Art',
      link: 'https://goo.gl/maps/wmCrc2GV2pPWajcu8',
      photo: mca,
    },
    name: 'Copy cat',
    description: `
Head to Level 1 and find the artwork that captures matching poses. 

Capture your team doing matching poses and share it with us.
    `,
    points: 2,
    scoring: 'photo',
  },
  flags: {
    id: 'flags',
    location: {
      coords: [-33.85967253800222, 151.20921908762242],
      name: 'MCA Cafe',
      link: 'https://goo.gl/maps/rJ4oay17VLcJAj6Z6',
      photo: mcaCafe,
    },
    name: '8 flags',
    description: 'Can you spot them? Take a photo of 8 flags in one shot.',
    points: 1,
    scoring: 'photo',
  },
  zodiac: {
    id: 'zodiac',
    location: {
      coords: [-33.859603355862205, 151.20947615269063],
      name: 'MCA forecourt',
      link: 'https://goo.gl/maps/vLKGEZyYwcWghceZ7',
      photo: mcaForecourt,
    },
    name: 'Year of the Tiger',
    description: `
As a team, pose as your favourite Chinese zodiac animal, in front of Lindy Lee’s sculpture, *Secret World of a Starlight Ember*.

Bonus points if your team chooses a Zodiac animal that no other team has chosen.`,
    points: 2,
    scoring: 'photo',
  },
  feast: {
    id: 'feast',
    location: {
      coords: [-33.8608043691319, 151.20911977033663],
      name: 'First Fleet Park',
      link: 'https://goo.gl/maps/Ep13PDQRuGWe4PXc7',
      photo: firstFleetPark,
    },
    name: 'Tastes like Australia',
    description: `Enjoy a well-loved Aussie favourite for your arvo snack. They’re small in size but pack a punch.`,
    points: 1,
    scoring: 'manned',
  },
  criminal: {
    id: 'criminal',
    location: {
      coords: [-33.86201488638533, 151.21231129103194],
      name: 'Justice and Police Museum',
      link: 'https://goo.gl/maps/bYTLykpcSt7gU49v8',
      photo: justiceAndPoliceMuseum,
    },
    name: `It's mug shot time`,
    description: 'Take a team selfie with a gangster.',
    points: 1,
    scoring: 'photo',
  },
  grammy: {
    id: 'grammy',
    location: {
      coords: [-33.861298860180725, 151.21364714072686],
      name: 'Memory is Creation without End',
      link: 'https://goo.gl/maps/pSNy6EcpzDscL3V1A',
      photo: memoryIsCreationWithoutEnd,
    },
    name: 'And the Grammy goes to...',
    description:
      'Pretend you’re in a band. Pose for your new album cover and tell us the genre and band name.',
    points: 3,
    scoring: 'photo',
  },
  dance: {
    id: 'dance',
    location: {
      coords: [-33.86015139708767, 151.20741046830878],
      name: 'Susannah Place',
      link: 'https://goo.gl/maps/VkgEyhuEGNV51M2D7',
      photo: susannahPlace,
    },
    name: 'Dance battle',
    description:
      'Get ready for tonight’s dancefloor. Show us your moves by recreating this [tiktok dance](https://www.tiktok.com/@thebrandonwarr/video/6805026774775385349). Best video gets bonus points.',
    points: 3,
    scoring: 'video',
  },
  scout: {
    id: 'scout',
    location: {
      coords: [-33.861757115149274, 151.21167693399258],
      name: 'Alfred St',
      link: 'https://goo.gl/maps/Wpy7Mj2tvKu6EuMu8',
      photo: ampForecourt,
    },
    name: `Blowin’ in the wind`,
    description:
      'Beneath the compass, lies a pyramid. In which direction will it be found?',
    points: 2,
    scoring: 'answer',
  },
  argyle: {
    id: 'argyle',
    name: 'Portrait of the year',
    location: {
      coords: [-33.85881380387812, 151.20727299120992],
      name: 'Argyle Stairs',
      link: 'https://goo.gl/maps/dehKvoxV6VApejXdA',
      photo: argyle,
    },
    description:
      'Pose for a team photo on the stairs. Most creative pic gets bonus points.',
    points: 1,
    scoring: 'photo',
  },
  stairs: {
    id: 'stairs',
    name: 'Going up',
    location: {
      coords: [-33.85900484100437, 151.20676620552234],
      name: 'Bridge Stairs',
      link: 'https://goo.gl/maps/BJzQaodxPqQ3FCA5A',
      photo: bridge,
    },
    description: 'Here’s an easy one. How many steps to the top of the stairs?',
    points: 1,
    scoring: 'answer',
  },
  /** Global */
  steal: {
    id: 'steal',
    name: 'Steal some points mwahahahah!',
    description: `
Take photos of other teams without them noticing, and you’ll get one of their points.

Remember, it works both ways. Keep a lookout for other teams taking your photo!`,
    points: null,
    scoring: 'photo',
  },
  performer: {
    id: 'performer',
    name: 'Take a selfie with a street performer',
    description: 'Remember to thank them with a tip! Check your kit for the $$',
    points: 1,
    scoring: 'photo',
  },
  tourist: {
    id: 'tourist',
    name: 'Photobomb a tourist pic',
    description:
      'Leave a lasting impression in someone else’s photo. Remember to share your photographic evidence with us!',
    points: 1,
    scoring: 'photo',
  },
  boat: {
    id: 'boat',
    name: 'Snap some seafaring vessels',
    description: `
Take two snaps:
1. Biggest seafaring vessel
2. Smallest seafaring vessel`,
    points: 2,
    scoring: 'photo',
  },
  creative: {
    id: 'creative',
    name: 'Creative photo contest',
    description:
      'Let your inner artist shine! Send us the most creative photo that you come up with. Best photo wins bonus points.',
    points: 2,
    scoring: 'photo',
  },
  christmas: {
    id: 'christmas',
    name: 'Share the Xmas spirit',
    description: `
Discovered the magic of Christmas along your route? Sing a carol in front of some Xmas decorations. 

Snap a team selfie for bonus points.
    `,
    points: 3,
    scoring: 'video',
  },
}

export const locationChallenges: string[] = [
  'convict',
  'tower',
  'house',
  'icecream',
  'jump',
  'copycat',
  'flags',
  'zodiac',
  'feast',
  'dance',
  'criminal',
  'grammy',
  'scout',
  'argyle',
  'stairs',
]

export const anywhereChallenges: string[] = [
  'steal',
  'performer',
  'tourist',
  'boat',
  'creative',
  'christmas',
]
